import { useEffect, useRef, useState } from "react";
import PanelButtons from "./PanelButtons";

const ROW_HEIGHT = 36;
const AXIS_HEIGHT = 26;
const NAME_WIDTH = 170;      // width of the signal-name column
const PAD = 10;

/* ---------- value formatting ---------- */

function extendBits(value, width) {
  if (!/^[01xz]+$/.test(value) || value.length >= width) return value;

  const first = value[0];
  const fill = first === "x" || first === "z" ? first : "0";

  return fill.repeat(width - value.length) + value;
}

function formatValue(value, width, radix) {
  if (width === 1) return value;

  const bits = extendBits(value, width);

  if (!/^[01xz]+$/.test(bits)) return bits; // real numbers etc.
  if (radix === "bin") return bits;

  if (radix === "dec") {
    if (bits.includes("x")) return "x";
    if (bits.includes("z")) return "z";
    return BigInt("0b" + bits).toString();
  }

  // hex
  const fill = bits[0] === "x" || bits[0] === "z" ? bits[0] : "0";
  const padded = bits.padStart(Math.ceil(bits.length / 4) * 4, fill);

  let out = "";

  for (let i = 0; i < padded.length; i += 4) {
    const group = padded.slice(i, i + 4);

    if (group.includes("x")) out += "x";
    else if (group.includes("z")) out += "z";
    else out += parseInt(group, 2).toString(16);
  }

  return out;
}

/* ---------- axis helpers ---------- */

function niceStep(raw) {
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / power;

  if (n <= 1) return power;
  if (n <= 2) return 2 * power;
  if (n <= 5) return 5 * power;
  return 10 * power;
}

function colorFor(value) {
  if (/x/.test(value)) return "#f87171"; // unknown
  if (/z/.test(value)) return "#60a5fa"; // high impedance
  return "#4ade80";
}

/* ---------- component ---------- */

/*
 * waveform = { timescale, endtime, signals: [{ name, width, changes: [[t, value], ...] }] }
 */
function WaveformPanel({ waveform, maximized = false, onMinimize, onMaximize, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [radix, setRadix] = useState("hex");

  // Width of the panel, so "Fit" really fits it (the panel is narrow when
  // the console and schematic are open beside it).
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(900);

  useEffect(() => {
    const element = viewportRef.current;

    if (!element || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(() => setViewportWidth(element.clientWidth));
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!waveform || !waveform.signals || waveform.signals.length === 0) {
    return null;
  }

  const { signals, timescale } = waveform;
  const end = Math.max(waveform.endtime, 1);

  // Icarus uses 1s when the code has no `timescale line
  const unitLabel = timescale === "1s" ? "time units" : timescale;

  const fitWidth = Math.max(240, viewportWidth - NAME_WIDTH - PAD * 2 - 16);
  const trackWidth = fitWidth * zoom;
  const totalWidth = trackWidth + PAD * 2;
  const totalHeight = AXIS_HEIGHT + signals.length * ROW_HEIGHT;

  const xOf = (t) => PAD + (t / end) * trackWidth;

  // ticks
  const step = niceStep(end / (8 * zoom));
  const ticks = [];
  for (let t = 0; t <= end; t += step) ticks.push(t);

  /* ---------- drawing one signal ---------- */

  const drawSignal = (signal, index) => {
    const top = AXIS_HEIGHT + index * ROW_HEIGHT + 8;
    const bottom = AXIS_HEIGHT + (index + 1) * ROW_HEIGHT - 8;
    const mid = (top + bottom) / 2;

    const elements = [];
    const changes = signal.changes;

    changes.forEach(([t0, value], i) => {
      const t1 = i + 1 < changes.length ? changes[i + 1][0] : end;
      const x0 = xOf(t0);
      const x1 = xOf(t1);
      const color = colorFor(value);
      const key = `${signal.name}-${i}`;
      const tip = `${signal.name} = ${formatValue(value, signal.width, radix)}  (${t0} to ${t1})`;

      /* ----- single bit ----- */

      if (signal.width === 1) {
        const level = value === "1" ? top : value === "0" ? bottom : mid;

        elements.push(
          <line key={`${key}-h`} x1={x0} y1={level} x2={x1} y2={level}
                stroke={color} strokeWidth="2">
            <title>{tip}</title>
          </line>
        );

        if (i > 0) {
          const prev = changes[i - 1][1];
          const prevLevel = prev === "1" ? top : prev === "0" ? bottom : mid;

          elements.push(
            <line key={`${key}-v`} x1={x0} y1={prevLevel} x2={x0} y2={level}
                  stroke={color} strokeWidth="2" />
          );
        }

        return;
      }

      /* ----- bus ----- */

      const label = formatValue(value, signal.width, radix);
      const slant = Math.min(4, (x1 - x0) / 2);

      const points = [
        `${x0 + slant},${top}`,
        `${x1 - slant},${top}`,
        `${x1},${mid}`,
        `${x1 - slant},${bottom}`,
        `${x0 + slant},${bottom}`,
        `${x0},${mid}`
      ].join(" ");

      elements.push(
        <polygon key={`${key}-p`} points={points} fill="none"
                 stroke={color} strokeWidth="1.5">
          <title>{tip}</title>
        </polygon>
      );

      if (x1 - x0 > label.length * 7 + 14) {
        elements.push(
          <text key={`${key}-t`} x={(x0 + x1) / 2} y={mid + 4}
                textAnchor="middle" className="wave-value-text">
            {label}
          </text>
        );
      }
    });

    return elements;
  };

  /* ---------- render ---------- */

  return (
    <div className="wave">

      {/* TOOLBAR */}
      <div className="wave-toolbar">
        <span className="wave-title">WAVEFORM</span>

        <div className="wave-controls">
          <span className="wave-unit">Time: {unitLabel}</span>

          <div className="wave-group">
            {["bin", "hex", "dec"].map((item) => (
              <button
                key={item}
                className={`wave-btn ${radix === item ? "active" : ""}`}
                onClick={() => setRadix(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="wave-group">
            <button className="wave-btn" onClick={() => setZoom((z) => Math.max(0.5, z / 1.5))}>−</button>
            <button className="wave-btn" onClick={() => setZoom(1)}>Fit</button>
            <button className="wave-btn" onClick={() => setZoom((z) => Math.min(16, z * 1.5))}>+</button>
          </div>

          <PanelButtons
            maximized={maximized}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
        </div>
      </div>

      {/* BODY: one scroll area. The names stay on the left while the
          waves scroll sideways, and both move together when scrolling down. */}
      <div className="wave-viewport" ref={viewportRef}>
        <div className="wave-canvas">

          <div className="wave-names">
            <div style={{ height: AXIS_HEIGHT }} />

            {signals.map((signal) => (
              <div key={signal.name} className="wave-name" style={{ height: ROW_HEIGHT }}
                   title={signal.name}>
                <span>{signal.name}</span>
                {signal.width > 1 && (
                  <span className="wave-width">[{signal.width - 1}:0]</span>
                )}
              </div>
            ))}
          </div>

          <svg width={totalWidth} height={totalHeight}
               className="wave-svg" role="img" aria-label="Simulation waveform">

            {/* grid + axis */}
            {ticks.map((t) => (
              <g key={`tick-${t}`}>
                <line x1={xOf(t)} y1={AXIS_HEIGHT - 6} x2={xOf(t)} y2={totalHeight}
                      className="wave-grid" />
                <text x={xOf(t)} y={14} textAnchor="middle" className="wave-axis-text">
                  {t}
                </text>
              </g>
            ))}

            {/* row separators */}
            {signals.map((signal, index) => (
              <line key={`row-${signal.name}`}
                    x1="0" x2={totalWidth}
                    y1={AXIS_HEIGHT + (index + 1) * ROW_HEIGHT}
                    y2={AXIS_HEIGHT + (index + 1) * ROW_HEIGHT}
                    className="wave-row-line" />
            ))}

            {signals.map((signal, index) => (
              <g key={signal.name}>{drawSignal(signal, index)}</g>
            ))}

          </svg>

        </div>
      </div>
    </div>
  );
}

export default WaveformPanel;