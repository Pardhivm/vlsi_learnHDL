/*
 * Turns the netlist from the backend (Yosys data) into a graph that the
 * ELK layout engine can arrange, plus "meta" information used for drawing
 * (names, colours, labels).
 *
 * Only plain JavaScript here, no React, so it is easy to test.
 */

const CHAR_WIDTH = 7;
const PORT_SPACING = 20;
const HEADER_WITH_NAME = 36;
const HEADER_PLAIN = 24;

/* ---------- names ---------- */

const TYPE_NAMES = {
  $and: "AND", $or: "OR", $xor: "XOR", $xnor: "XNOR", $not: "NOT",
  $logic_and: "AND", $logic_or: "OR", $logic_not: "NOT",
  $reduce_and: "REDUCE AND", $reduce_or: "REDUCE OR", $reduce_xor: "REDUCE XOR",
  $reduce_bool: "BOOL",
  $add: "ADD", $sub: "SUB", $mul: "MUL", $div: "DIV", $mod: "MOD",
  $neg: "NEG", $pos: "BUF", $alu: "ALU",
  $eq: "EQ", $ne: "NE", $lt: "LT", $le: "LE", $gt: "GT", $ge: "GE",
  $shl: "SHL", $shr: "SHR", $sshl: "SHL", $sshr: "ASHR", $shift: "SHIFT",
  $mux: "MUX", $pmux: "PMUX", $bmux: "MUX",
  $dff: "DFF", $dffe: "DFF + EN", $adff: "DFF + ASYNC RST",
  $adffe: "DFF + ASYNC RST + EN", $sdff: "DFF + SYNC RST",
  $sdffe: "DFF + SYNC RST + EN", $sdffce: "DFF + SYNC RST + EN",
  $dlatch: "LATCH", $mem: "MEMORY", $mem_v2: "MEMORY"
};

export const isPublicName = (name) => !name.startsWith("$");

const SEQUENTIAL = /^\$(a?s?d?l?dff|dlatch|aldff|dffsr|sr)/;
const ARITHMETIC = /^\$(add|sub|mul|div|mod|neg|alu|eq|ne|lt|le|gt|ge|shl|shr|sshl|sshr|shift)$/;
const MUX = /^\$(mux|pmux|bmux)$/;
const LOGIC = /^\$(and|or|xor|xnor|not|logic_|reduce_)/;

export function cellColor(type) {
  if (!type.startsWith("$")) return "#e0e7ff";      // user module
  if (SEQUENTIAL.test(type)) return "#fef3c7";
  if (MUX.test(type)) return "#fae8ff";
  if (ARITHMETIC.test(type)) return "#dcfce7";
  if (LOGIC.test(type)) return "#dbeafe";
  return "#f1f5f9";
}

function widthParameter(parameters) {
  const raw = parameters?.Y_WIDTH ?? parameters?.WIDTH ?? parameters?.A_WIDTH;

  if (raw === undefined) return null;

  const value = typeof raw === "number" ? raw : parseInt(String(raw), 2);

  return Number.isFinite(value) && value > 1 ? value : null;
}

export function prettyType(type, parameters) {
  if (!type.startsWith("$")) return type;

  const base = TYPE_NAMES[type] ?? type.slice(1).toUpperCase();
  const width = widthParameter(parameters);

  return width ? `${base} · ${width}-bit` : base;
}

const textWidth = (text, size = CHAR_WIDTH) => text.length * size;

/* ---------- constants ---------- */

function constantLabel(bits) {
  const text = [...bits].reverse().join("");      // most significant bit first

  if (/[xz]/.test(text)) {
    return /^x+$/.test(text) ? "x" : `${bits.length}'b${text}`;
  }

  if (bits.length <= 4) {
    return `${bits.length}'b${text}`;
  }

  return `${bits.length}'h${parseInt(text, 2).toString(16)}`;
}

const isNumberBit = (bit) => typeof bit === "number";

/* ---------- main ---------- */

export function buildGraph(netlist) {
  const module = netlist.modules[netlist.top];

  if (!module) {
    throw new Error("The netlist has no top module.");
  }

  const children = [];
  const meta = { nodes: {}, edges: {} };

  const drivers = new Map();   // bit -> [port ids that drive it]
  const sinks = [];            // { portId, nodeId, bits, label }

  let counter = 0;
  const nextId = (prefix) => `${prefix}${counter++}`;

  const addDriver = (bit, portId) => {
    if (!drivers.has(bit)) drivers.set(bit, []);
    drivers.get(bit).push(portId);
  };

  /* ----- net names: bit -> {name, index, width} (first public name wins) ----- */

  const bitNames = new Map();

  Object.entries(module.netnames || {}).forEach(([name, net]) => {
    if (net.hide_name || !isPublicName(name)) return;

    net.bits.forEach((bit, index) => {
      if (isNumberBit(bit) && !bitNames.has(bit)) {
        bitNames.set(bit, { name, index, width: net.bits.length });
      }
    });
  });

  /* ----- helper: a node with ports at fixed positions ----- */

  const rangeText = (width) => (width > 1 ? `[${width - 1}:0]` : "");

  /* ----- top-level ports ----- */

  Object.entries(module.ports || {}).forEach(([name, port]) => {
    const isInput = port.direction === "input";
    const label = `${name}${rangeText(port.bits.length)}`;
    const width = Math.max(56, textWidth(label) + 34);
    const height = 24;
    const id = nextId("p");
    const portId = `${id}#${name}`;

    children.push({
      id,
      width,
      height,
      layoutOptions: {
        "elk.portConstraints": "FIXED_POS",
        "elk.layered.layering.layerConstraint": isInput ? "FIRST" : "LAST"
      },
      ports: [{
        id: portId,
        x: isInput ? width : 0,
        y: height / 2,
        width: 0,
        height: 0,
        layoutOptions: { "elk.port.side": isInput ? "EAST" : "WEST" }
      }]
    });

    meta.nodes[id] = {
      kind: isInput ? "input" : "output",
      title: label,
      baseName: name,
      ports: {}
    };

    if (isInput) {
      port.bits.forEach((bit) => isNumberBit(bit) && addDriver(bit, portId));
    } else {
      sinks.push({ portId, nodeId: id, bits: port.bits, label: name });
    }
  });

  /* ----- cells ----- */

  const constants = [];       // { bits, sinkPortId }
  const constantEdges = [];   // { from, to }

  Object.entries(module.cells || {}).forEach(([cellName, cell]) => {
    const connections = cell.connections || {};
    const directions = cell.port_directions || {};
    const portNames = Object.keys(connections);

    const directionOf = (portName) => {
      if (directions[portName]) return directions[portName];

      const declared = netlist.modules[cell.type]?.ports?.[portName]?.direction;
      if (declared) return declared;

      return /^(Y|Q|O|OUT|DOUT|Z)/i.test(portName) ? "output" : "input";
    };

    const inputs = portNames.filter((p) => directionOf(p) !== "output");
    const outputs = portNames.filter((p) => directionOf(p) === "output");

    const id = nextId("c");
    const typeText = prettyType(cell.type, cell.parameters);

    // Yosys gives generated cells names like $procdff$9. Like Vivado,
    // call a register after the signal it stores:  count_reg[3:0]
    let publicName = isPublicName(cellName) ? cellName : "";

    if (!publicName && SEQUENTIAL.test(cell.type)) {
      const stored = bitNames.get((connections.Q || [])[0]);

      if (stored) {
        publicName = `${stored.name}_reg${rangeText(connections.Q.length)}`;
      }
    }

    const headerHeight = publicName ? HEADER_WITH_NAME : HEADER_PLAIN;

    const portLabel = (p) =>
      `${p}${rangeText(connections[p].length)}`;

    const widestIn = Math.max(0, ...inputs.map((p) => textWidth(portLabel(p))));
    const widestOut = Math.max(0, ...outputs.map((p) => textWidth(portLabel(p))));

    const width = Math.max(
      110,
      textWidth(typeText) + 20,
      textWidth(publicName, 7) + 20,
      widestIn + widestOut + 36
    );

    const rows = Math.max(inputs.length, outputs.length, 1);
    const height = headerHeight + rows * PORT_SPACING + 8;

    const ports = [];
    const portMeta = {};

    const addPort = (portName, index, isOutput) => {
      const portId = `${id}#${portName}`;

      ports.push({
        id: portId,
        x: isOutput ? width : 0,
        y: headerHeight + 6 + index * PORT_SPACING + PORT_SPACING / 2,
        width: 0,
        height: 0,
        layoutOptions: { "elk.port.side": isOutput ? "EAST" : "WEST" }
      });

      portMeta[portId] = { label: portLabel(portName), output: isOutput };

      const bits = connections[portName];

      if (isOutput) {
        bits.forEach((bit) => isNumberBit(bit) && addDriver(bit, portId));
        return;
      }

      if (bits.length > 0 && bits.every((bit) => !isNumberBit(bit))) {
        constants.push({ bits, sinkPortId: portId });
      } else {
        sinks.push({ portId, nodeId: id, bits, label: null });
      }
    };

    inputs.forEach((p, i) => addPort(p, i, false));
    outputs.forEach((p, i) => addPort(p, i, true));

    children.push({
      id,
      width,
      height,
      layoutOptions: { "elk.portConstraints": "FIXED_POS" },
      ports
    });

    meta.nodes[id] = {
      kind: "cell",
      title: publicName,
      subtitle: typeText,
      color: cellColor(cell.type),
      headerHeight,
      ports: portMeta
    };
  });

  /* ----- constant nodes ----- */

  constants.forEach(({ bits, sinkPortId }) => {
    const label = constantLabel(bits);
    const width = Math.max(40, textWidth(label) + 16);
    const height = 22;
    const id = nextId("k");
    const portId = `${id}#out`;

    children.push({
      id,
      width,
      height,
      layoutOptions: {
        "elk.portConstraints": "FIXED_POS",
        "elk.layered.layering.layerConstraint": "FIRST"
      },
      ports: [{
        id: portId,
        x: width,
        y: height / 2,
        width: 0,
        height: 0,
        layoutOptions: { "elk.port.side": "EAST" }
      }]
    });

    meta.nodes[id] = { kind: "constant", title: label, ports: {} };

    // constants connect straight to their sink port (see edges below)
    constantEdges.push({ from: portId, to: sinkPortId });
  });

  /* ----- edges ----- */

  const edges = [];
  const seen = new Set();

  const addEdge = (from, to, label, bitCount) => {
    const key = `${from}->${to}`;

    if (seen.has(key)) return;
    seen.add(key);

    const id = `e${edges.length}`;
    const edge = { id, sources: [from], targets: [to] };

    if (label) {
      edge.labels = [{
        text: label,
        width: textWidth(label, 6) + 6,
        height: 12
      }];
    }

    edges.push(edge);
    meta.edges[id] = { label: label || "", bits: bitCount };
  };

  constantEdges.forEach(({ from, to }) => addEdge(from, to, "", 1));

  const netLabel = (bits, sinkLabel, driverLabel) => {
    const named = bits
      .map((bit) => bitNames.get(bit))
      .filter(Boolean);

    if (named.length === 0) return "";

    const first = named[0];

    // top-level port nodes already show their own name
    if (first.name === sinkLabel || first.name === driverLabel) return "";

    const indexes = named
      .filter((item) => item.name === first.name)
      .map((item) => item.index);

    if (first.width === 1) return first.name;

    const high = Math.max(...indexes);
    const low = Math.min(...indexes);

    if (indexes.length === first.width) return `${first.name}[${first.width - 1}:0]`;
    return high === low ? `${first.name}[${high}]` : `${first.name}[${high}:${low}]`;
  };

  const portOwner = {};
  children.forEach((child) => {
    (child.ports || []).forEach((port) => {
      portOwner[port.id] = child.id;
    });
  });

  sinks.forEach((sink) => {
    const byDriver = new Map();

    sink.bits.forEach((bit) => {
      if (!isNumberBit(bit)) return;

      (drivers.get(bit) || []).forEach((driverPort) => {
        if (driverPort === sink.portId) return;
        if (!byDriver.has(driverPort)) byDriver.set(driverPort, []);
        byDriver.get(driverPort).push(bit);
      });
    });

    byDriver.forEach((shared, driverPort) => {
      const driverNode = meta.nodes[portOwner[driverPort]];
      const driverLabel = driverNode?.kind === "input" ? driverNode.baseName : null;

      addEdge(
        driverPort,
        sink.portId,
        netLabel(shared, sink.label, driverLabel),
        shared.length
      );
    });
  });

  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.layered.spacing.nodeNodeBetweenLayers": "80",
      "elk.spacing.nodeNode": "30",
      "elk.spacing.edgeNode": "20",
      "elk.layered.spacing.edgeNodeBetweenLayers": "20",
      "elk.padding": "[top=20,left=20,bottom=20,right=20]"
    },
    children,
    edges
  };

  return { graph, meta };
}