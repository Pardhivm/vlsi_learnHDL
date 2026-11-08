/*
 * The small window buttons used by the console, waveform and schematic
 * panels: minimize, maximize / restore, close.
 *
 * Icons are drawn as SVG so they look the same on every computer.
 */

const icon = { width: 12, height: 12, viewBox: "0 0 12 12", fill: "none",
  stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true };

function PanelButtons({ maximized = false, onMinimize, onMaximize, onClose }) {
  return (
    <div className="panel-buttons">

      {onMinimize && (
        <button className="panel-btn" onClick={onMinimize}
                title="Minimize" aria-label="Minimize">
          <svg {...icon}><line x1="2" y1="9" x2="10" y2="9" /></svg>
        </button>
      )}

      {onMaximize && (
        <button className="panel-btn" onClick={onMaximize}
                title={maximized ? "Restore size" : "Maximize"}
                aria-label={maximized ? "Restore size" : "Maximize"}>
          {maximized ? (
            <svg {...icon}>
              <rect x="1.5" y="3.5" width="7" height="7" />
              <polyline points="3.5,3.5 3.5,1.5 10.5,1.5 10.5,8.5 8.5,8.5" />
            </svg>
          ) : (
            <svg {...icon}><rect x="1.5" y="1.5" width="9" height="9" /></svg>
          )}
        </button>
      )}

      {onClose && (
        <button className="panel-btn panel-btn-close" onClick={onClose}
                title="Close" aria-label="Close">
          <svg {...icon}>
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      )}

    </div>
  );
}

export default PanelButtons;