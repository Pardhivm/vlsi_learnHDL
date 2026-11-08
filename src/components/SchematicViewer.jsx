import { useEffect, useRef, useState } from "react";
import { buildGraph } from "../utils/netlistGraph";
import SchematicDiagram from "./SchematicDiagram";
import PanelButtons from "./PanelButtons";

/*
 * Shows the RTL schematic of a design, with instance names, port names
 * and net names (similar to the Vivado schematic viewer).
 *
 * netlist = data from the backend /schematic endpoint
 *
 * Needs:  npm install elkjs
 */

/*
 * The layout engine is about 1.5 MB, so it is only downloaded the first
 * time a schematic is opened instead of slowing down every page.
 */
let elkPromise = null;

function getElk() {
  if (!elkPromise) {
    elkPromise = import("elkjs/lib/elk.bundled.js").then((module) => {
      const ELK = module.default ?? module;
      return new ELK();
    });
  }

  return elkPromise;
}

function SchematicViewer({ netlist, maximized = false, onMinimize, onMaximize, onClose }) {
  const [state, setState] = useState({
    source: null,
    layout: null,
    meta: null,
    error: ""
  });

  const [zoom, setZoom] = useState(1);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const { graph, meta } = buildGraph(netlist);
        const elk = await getElk();
        const layout = await elk.layout(graph);

        if (!cancelled) {
          setState({ source: netlist, layout, meta, error: "" });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            source: netlist,
            layout: null,
            meta: null,
            error: error?.message || String(error)
          });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [netlist]);

  const loading = state.source !== netlist;

  const handleDownload = () => {
    if (!svgRef.current) return;

    const text = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([text], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "schematic.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="schematic">

      <div className="schematic-toolbar">
        <span className="schematic-title">RTL SCHEMATIC</span>

        <div className="schematic-controls">
          <button className="schematic-btn"
                  onClick={() => setZoom((z) => Math.max(0.3, z / 1.25))}>
            −
          </button>

          <button className="schematic-btn" onClick={() => setZoom(1)}>
            100%
          </button>

          <button className="schematic-btn"
                  onClick={() => setZoom((z) => Math.min(5, z * 1.25))}>
            +
          </button>

          <button className="schematic-btn" onClick={handleDownload}
                  disabled={!state.layout}>
            ⬇ SVG
          </button>

          <PanelButtons
            maximized={maximized}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
        </div>
      </div>

      <div className="schematic-body">
        {loading && <p className="schematic-message">Drawing schematic...</p>}

        {!loading && state.error && (
          <p className="schematic-message">
            ✕ Could not draw the schematic: {state.error}
          </p>
        )}

        {!loading && state.layout && (
          <SchematicDiagram
            layout={state.layout}
            meta={state.meta}
            zoom={zoom}
            svgRef={svgRef}
          />
        )}
      </div>

    </div>
  );
}

export default SchematicViewer;