/*
 * Draws a laid-out schematic as SVG.
 *
 * layout  = result from the ELK layout engine (positions of everything)
 * meta    = names / colours prepared by buildGraph()
 *
 * Colours and fonts are written as attributes (not CSS classes) so the
 * downloaded SVG file looks the same as the one on screen.
 */

const FONT = "Consolas, 'Courier New', monospace";
const LINE = "#334155";

function pathFor(section) {
  const points = [
    section.startPoint,
    ...(section.bendPoints || []),
    section.endPoint
  ];

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
}

function SchematicDiagram({ layout, meta, zoom = 1, svgRef }) {
  const nodes = layout.children || [];
  const edges = layout.edges || [];

  const width = Math.ceil(layout.width || 400);
  const height = Math.ceil(layout.height || 300);

  const drawNode = (node) => {
    const info = meta.nodes[node.id];

    if (!info) return null;

    const { x, y, width: w, height: h } = node;

    /* ----- top-level input / output ----- */

    if (info.kind === "input" || info.kind === "output") {
      const isInput = info.kind === "input";

      const points = isInput
        ? `0,0 ${w - 12},0 ${w},${h / 2} ${w - 12},${h} 0,${h}`
        : `12,0 ${w},0 ${w},${h} 12,${h} 0,${h / 2}`;

      return (
        <g key={node.id} transform={`translate(${x},${y})`}>
          <polygon points={points} fill={isInput ? "#bbf7d0" : "#fecaca"}
                   stroke={LINE} strokeWidth="1.2" />
          <text x={isInput ? (w - 12) / 2 : (w + 12) / 2} y={h / 2 + 4}
                textAnchor="middle" fontSize="12" fontWeight="bold"
                fontFamily={FONT} fill="#0f172a">
            {info.title}
          </text>
        </g>
      );
    }

    /* ----- constant ----- */

    if (info.kind === "constant") {
      return (
        <g key={node.id} transform={`translate(${x},${y})`}>
          <rect width={w} height={h} rx="3" fill="#ffffff" stroke="#64748b"
                strokeWidth="1" strokeDasharray="3 2" />
          <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontSize="11"
                fontFamily={FONT} fill="#0f172a">
            {info.title}
          </text>
        </g>
      );
    }

    /* ----- cell ----- */

    const hasName = Boolean(info.title);

    return (
      <g key={node.id} transform={`translate(${x},${y})`}>
        <rect width={w} height={h} rx="4" fill={info.color}
              stroke={LINE} strokeWidth="1.3" />

        {hasName && (
          <text x={w / 2} y="15" textAnchor="middle" fontSize="12"
                fontWeight="bold" fontFamily={FONT} fill="#0f172a">
            {info.title}
          </text>
        )}

        <text x={w / 2} y={hasName ? 29 : 16} textAnchor="middle" fontSize="11"
              fontFamily={FONT} fill="#475569">
          {info.subtitle}
        </text>

        {(node.ports || []).map((port) => {
          const portInfo = info.ports[port.id];

          if (!portInfo) return null;

          return (
            <g key={port.id}>
              <circle cx={port.x} cy={port.y} r="2.5" fill={LINE} />
              <text x={portInfo.output ? port.x - 7 : port.x + 7} y={port.y + 4}
                    textAnchor={portInfo.output ? "end" : "start"}
                    fontSize="11" fontFamily={FONT} fill="#0f172a">
                {portInfo.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width={width * zoom}
      height={height * zoom}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="RTL schematic"
      style={{ display: "block", background: "#ffffff" }}
    >
      {/* wires first, so boxes sit on top */}
      {edges.map((edge) => {
        const info = meta.edges[edge.id] || {};
        const isBus = (info.bits || 1) > 1;

        return (
          <g key={edge.id}>
            {(edge.sections || []).map((section, index) => (
              <path key={index} d={pathFor(section)} fill="none"
                    stroke={LINE} strokeWidth={isBus ? 2.6 : 1.4}
                    strokeLinejoin="round" />
            ))}

            {(edge.labels || []).map((label, index) => (
              <text key={index} x={label.x + (label.width || 0) / 2}
                    y={label.y + (label.height || 12) - 2}
                    textAnchor="middle" fontSize="10.5" fontFamily={FONT}
                    fill="#1d4ed8">
                {label.text}
              </text>
            ))}
          </g>
        );
      })}

      {nodes.map(drawNode)}
    </svg>
  );
}

export default SchematicDiagram;