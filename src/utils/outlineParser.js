/*
 * Reads source code and lists what is in it, for the Outline panel:
 *
 *   Verilog / SystemVerilog : modules  ->  input / output / inout / internal signals
 *   VHDL                    : entities ->  input / output / inout / signals
 *   TCL                     : variables and procedures
 *   Perl                    : variables and subs
 *
 * It uses simple pattern matching (not a full compiler), so it also works
 * while the student is still typing unfinished code.
 *
 * Result:  [{ name, line, kind, groups: [{ key, label, items: [{ name, detail, line }] }] }]
 */

/* ---------- small helpers ---------- */

// Replace comments by spaces so character positions (and line numbers) stay the same.
const blankOut = (match) => match.replace(/[^\n]/g, " ");

function stripComments(code, language) {
  if (language === "VHDL") {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, blankOut)
      .replace(/--[^\n]*/g, blankOut);
  }

  if (language === "TCL" || language === "Perl") {
    return code.replace(/(^|[\s;])#[^\n]*/g, (match, before) => before + blankOut(match.slice(before.length)));
  }

  return code
    .replace(/\/\*[\s\S]*?\*\//g, blankOut)
    .replace(/\/\/[^\n]*/g, blankOut);
}

const lineAt = (text, index) => {
  let line = 1;

  for (let i = 0; i < index && i < text.length; i++) {
    if (text[i] === "\n") line += 1;
  }

  return line;
};

const tidy = (text) => text.replace(/\s+/g, " ").trim();

/* index of the ")" that closes the "(" at openIndex, or -1 */
function matchParen(text, openIndex) {
  let depth = 0;

  for (let i = openIndex; i < text.length; i++) {
    if (text[i] === "(") depth += 1;
    if (text[i] === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

/* split at commas / separators that are not inside (), [] or {} */
function splitTopLevel(text, separator = ",") {
  const parts = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if ("([{".includes(char)) depth += 1;
    else if (")]}".includes(char)) depth -= 1;
    else if (char === separator && depth === 0) {
      parts.push({ text: text.slice(start, i), start });
      start = i + 1;
    }
  }

  parts.push({ text: text.slice(start), start });

  return parts;
}

const firstNonSpace = (text) => {
  const match = text.match(/\S/);
  return match ? match.index : 0;
};

function makeGroups(entries, labels) {
  return Object.entries(labels)
    .map(([key, label]) => ({
      key,
      label,
      items: entries.filter((entry) => entry.kind === key)
    }))
    .filter((group) => group.items.length > 0);
}


/* =========================================
   VERILOG / SYSTEMVERILOG
========================================= */

const VERILOG_TYPES =
  "wire|reg|logic|var|signed|unsigned|bit|byte|int|integer|tri|supply0|supply1";

const ANSI_PORT = new RegExp(
  `^\\s*(?:(input|output|inout)\\b)?\\s*((?:(?:${VERILOG_TYPES})\\s+)*)` +
  `\\s*((?:\\[[^\\]]*\\]\\s*)*)\\s*(\\w+)\\s*((?:\\[[^\\]]*\\]\\s*)*)\\s*(?:=.*)?$`
);

const detailOf = (width, type) =>
  [tidy(width || ""), tidy(type || "")].filter(Boolean).join(" ");

function parseVerilog(rawCode) {
  const code = stripComments(rawCode, "Verilog");
  const modules = [];
  const moduleRe = /\b(?:module|macromodule)\s+(\w+)/g;

  let found;

  while ((found = moduleRe.exec(code))) {
    const name = found[1];
    const line = lineAt(code, found.index);

    let i = moduleRe.lastIndex;
    const skipSpaces = () => {
      while (i < code.length && /\s/.test(code[i])) i += 1;
    };

    skipSpaces();

    // optional parameter list:  #( ... )
    if (code[i] === "#") {
      i += 1;
      skipSpaces();

      if (code[i] === "(") {
        const close = matchParen(code, i);
        i = close < 0 ? code.length : close + 1;
      }

      skipSpaces();
    }

    // port list
    let portText = "";
    let portOffset = i + 1;

    if (code[i] === "(") {
      const close = matchParen(code, i);
      const end = close < 0 ? code.length : close;

      portText = code.slice(i + 1, end);
      i = close < 0 ? code.length : close + 1;
    }

    const semicolon = code.indexOf(";", i);
    const bodyStart = semicolon < 0 ? i : semicolon + 1;

    const endMatch = /\bendmodule\b/g;
    endMatch.lastIndex = bodyStart;
    const endFound = endMatch.exec(code);
    const bodyEnd = endFound ? endFound.index : code.length;

    const body = code.slice(bodyStart, bodyEnd);
    const ports = [];

    /* ----- ports in the header:  (input [3:0] a, b, output y) ----- */

    let current = null;

    splitTopLevel(portText).forEach((part) => {
      const text = part.text;

      if (!text.trim()) return;

      const match = ANSI_PORT.exec(text);
      const index = portOffset + part.start + firstNonSpace(text);

      if (!match) {
        const word = text.match(/(\w+)\s*(?:\[[^\]]*\]\s*)*$/);

        if (word) ports.push({ name: word[1], kind: null, detail: "", line: lineAt(code, index) });
        return;
      }

      const [, direction, type, width, portName] = match;

      if (direction) {
        current = { direction, type: tidy(type), width: tidy(width) };
      } else if (match[3] || tidy(type)) {
        // "[3:0] b" without a direction keeps the previous direction
        current = current
          ? { direction: current.direction, type: tidy(type) || current.type, width: tidy(width) }
          : null;
      }

      ports.push({
        name: portName,
        kind: current ? current.direction : null,
        detail: current ? detailOf(current.width, current.type) : "",
        line: lineAt(code, index)
      });
    });

    /* ----- old style:  module m(a, b, y);  input a; output [3:0] y; ----- */

    if (ports.some((port) => !port.kind)) {
      const declaration = new RegExp(
        `\\b(input|output|inout)\\b\\s*((?:(?:${VERILOG_TYPES})\\s+)*)\\s*((?:\\[[^\\]]*\\]\\s*)*)([^;]+);`,
        "g"
      );

      let decl;

      while ((decl = declaration.exec(body))) {
        splitTopLevel(decl[4]).forEach((variable) => {
          const word = variable.text.match(/^\s*(\w+)/);
          const port = word && ports.find((item) => item.name === word[1] && !item.kind);

          if (port) {
            port.kind = decl[1];
            port.detail = detailOf(decl[3], decl[2]);
            port.line = lineAt(code, bodyStart + decl.index);
          }
        });
      }
    }

    ports.forEach((port) => {
      if (!port.kind) port.kind = "input";
    });

    /* ----- signals declared inside the module ----- */

    const signals = [];
    const portNames = new Set(ports.map((port) => port.name));
    const signalRe = /\b(wire|reg|logic|integer|bit|byte|int|real|time|tri)\b\s*((?:signed|unsigned)\s+)?((?:\[[^\]]*\]\s*)*)([^;]+);/g;

    let signal;

    while ((signal = signalRe.exec(body))) {
      // "output reg y;" is a port, not an internal signal
      const before = body.slice(Math.max(0, signal.index - 8), signal.index);

      if (/\b(input|output|inout)\s*$/.test(before)) continue;

      splitTopLevel(signal[4]).forEach((variable) => {
        const word = variable.text.match(/^\s*(\w+)/);

        if (word && !portNames.has(word[1])) {
          signals.push({
            name: word[1],
            kind: "internal",
            detail: detailOf(signal[3], signal[1] + (signal[2] ? " " + signal[2].trim() : "")),
            line: lineAt(code, bodyStart + signal.index)
          });
        }
      });
    }

    const entries = [...ports, ...signals];

    modules.push({
      name,
      line,
      kind: "module",
      groups: makeGroups(entries, {
        input: "input",
        output: "output",
        inout: "inout",
        internal: "internal signals"
      })
    });

    moduleRe.lastIndex = bodyEnd;
  }

  return modules;
}


/* =========================================
   VHDL
========================================= */

function parseVhdl(rawCode) {
  const code = stripComments(rawCode, "VHDL");
  const entities = [];
  const entityRe = /\bentity\s+(\w+)\s+is\b/gi;

  let found;

  while ((found = entityRe.exec(code))) {
    const name = found[1];
    const line = lineAt(code, found.index);

    const start = entityRe.lastIndex;
    const endRe = new RegExp(`\\bend\\s*(?:entity)?\\s*(?:${name})?\\s*;`, "gi");
    endRe.lastIndex = start;
    const endFound = endRe.exec(code);
    const end = endFound ? endFound.index : code.length;

    const header = code.slice(start, end);
    const entries = [];

    const portMatch = /\bport\s*\(/i.exec(header);

    if (portMatch) {
      const open = portMatch.index + portMatch[0].length - 1;
      const close = matchParen(header, open);
      const portText = header.slice(open + 1, close < 0 ? header.length : close);

      splitTopLevel(portText, ";").forEach((part) => {
        const item = /^\s*([\w\s,]+?)\s*:\s*(in|out|inout|buffer|linkage)?\s*([\s\S]+?)\s*(?::=[\s\S]*)?$/i.exec(part.text);

        if (!item) return;

        const direction = (item[2] || "in").toLowerCase();
        const kind = direction === "in" ? "input" : direction === "inout" ? "inout" : "output";
        const index = start + open + 1 + part.start + firstNonSpace(part.text);

        item[1].split(",").forEach((raw) => {
          const portName = raw.trim();

          if (portName) {
            entries.push({ name: portName, kind, detail: tidy(item[3]), line: lineAt(code, index) });
          }
        });
      });
    }

    // signals declared in the architecture(s) of this entity
    const archRe = new RegExp(`\\barchitecture\\s+\\w+\\s+of\\s+${name}\\s+is\\b([\\s\\S]*?)\\bbegin\\b`, "gi");
    let arch;

    while ((arch = archRe.exec(code))) {
      const regionStart = arch.index + arch[0].indexOf(arch[1]);
      const signalRe = /\bsignal\s+([\w\s,]+?)\s*:\s*([^;:=]+?)\s*(?::=[^;]*)?;/gi;
      let signal;

      while ((signal = signalRe.exec(arch[1]))) {
        signal[1].split(",").forEach((raw) => {
          const signalName = raw.trim();

          if (signalName) {
            entries.push({
              name: signalName,
              kind: "internal",
              detail: tidy(signal[2]),
              line: lineAt(code, regionStart + signal.index)
            });
          }
        });
      }
    }

    entities.push({
      name,
      line,
      kind: "entity",
      groups: makeGroups(entries, {
        input: "input",
        output: "output",
        inout: "inout",
        internal: "signals"
      })
    });

    entityRe.lastIndex = end;
  }

  return entities;
}


/* =========================================
   TCL / PERL  (one entry for the whole script)
========================================= */

function addUnique(list, entry) {
  if (!list.some((item) => item.name === entry.name && item.kind === entry.kind)) {
    list.push(entry);
  }
}

function parseTcl(rawCode, fileName) {
  const code = stripComments(rawCode, "TCL");
  const entries = [];

  let match;
  const setRe = /\b(?:set|variable)\s+(?:::)?([A-Za-z_]\w*)/g;

  while ((match = setRe.exec(code))) {
    addUnique(entries, { name: match[1], kind: "variable", detail: "", line: lineAt(code, match.index) });
  }

  const procRe = /\bproc\s+([\w:]+)\s*\{([^}]*)\}/g;

  while ((match = procRe.exec(code))) {
    addUnique(entries, {
      name: match[1],
      kind: "procedure",
      detail: tidy(match[2]) ? `(${tidy(match[2])})` : "()",
      line: lineAt(code, match.index)
    });
  }

  return [{
    name: fileName,
    line: 1,
    kind: "script",
    groups: makeGroups(entries, { variable: "variables", procedure: "procedures" })
  }];
}

function parsePerl(rawCode, fileName) {
  const code = stripComments(rawCode, "Perl");
  const entries = [];

  let match;
  const singleRe = /\b(?:my|our|local)\s+([$@%][A-Za-z_]\w*)/g;

  while ((match = singleRe.exec(code))) {
    addUnique(entries, { name: match[1], kind: "variable", detail: "", line: lineAt(code, match.index) });
  }

  const listRe = /\b(?:my|our|local)\s*\(([^)]*)\)/g;

  while ((match = listRe.exec(code))) {
    match[1].split(",").forEach((raw) => {
      const variable = raw.trim().match(/^[$@%][A-Za-z_]\w*$/);

      if (variable) {
        addUnique(entries, { name: variable[0], kind: "variable", detail: "", line: lineAt(code, match.index) });
      }
    });
  }

  const subRe = /\bsub\s+(\w+)/g;

  while ((match = subRe.exec(code))) {
    addUnique(entries, { name: match[1], kind: "subroutine", detail: "", line: lineAt(code, match.index) });
  }

  return [{
    name: fileName,
    line: 1,
    kind: "script",
    groups: makeGroups(entries, { variable: "variables", subroutine: "subs" })
  }];
}


/* =========================================
   PUBLIC FUNCTION  (with a small cache: typing re-reads only changed files)
========================================= */

const cache = new Map();
const CACHE_LIMIT = 80;

export function parseOutline(language, code, fileName = "script") {
  const key = `${language}\u0000${fileName}\u0000${code}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = [];

  try {
    if (language === "Verilog" || language === "SystemVerilog") result = parseVerilog(code);
    else if (language === "VHDL") result = parseVhdl(code);
    else if (language === "TCL") result = parseTcl(code, fileName);
    else if (language === "Perl") result = parsePerl(code, fileName);
  } catch {
    result = [];     // never let half-typed code break the page
  }

  if (cache.size >= CACHE_LIMIT) {
    cache.delete(cache.keys().next().value);
  }

  cache.set(key, result);

  return result;
}