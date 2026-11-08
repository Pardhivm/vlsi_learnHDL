import { useEffect, useId, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { runCode } from "../utils/runcode";
import WaveformPanel from "./WaveformPanel";

const LANGUAGE_IDS = {
  Verilog: "verilog",
  SystemVerilog: "systemverilog",
  VHDL: "vhdl",
  TCL: "tcl",
  Perl: "perl"
};

const DESIGN_FILE_NAMES = {
  Verilog: "design.v",
  SystemVerilog: "design.sv",
  VHDL: "design.vhd",
  TCL: "script.tcl",
  Perl: "script.pl"
};

const TESTBENCH_FILE_NAMES = {
  Verilog: "testbench.v",
  SystemVerilog: "testbench.sv",
  VHDL: "testbench.vhd"
};

/*
 * Usage in a lesson page:
 *
 *   <TryIt language="Verilog" starterCode={code} />
 *
 *   <TryIt
 *     language="Verilog"
 *     starterCode={designCode}
 *     starterTestbench={testbenchCode}
 *     height={260}
 *   />
 *
 * Props:
 *   language          Verilog | SystemVerilog | VHDL | TCL | Perl
 *   starterCode       code shown in the editor (design / script)
 *   starterTestbench  optional. If given, a testbench tab appears
 *   height            editor height in px (default 220)
 *   title             optional heading, default "TryIt - <language>"
 */
function TryIt({
  language = "Verilog",
  initialCode,        // used by the lesson pages
  testbenchCode,      // used by the lesson pages
  starterCode,        // alias
  starterTestbench,   // alias
  mode = "normal",    // "beginner" = testbench runs but its tab is hidden
  height = 220,
  title
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const startCode = initialCode ?? starterCode ?? "";
  const startTestbench = testbenchCode ?? starterTestbench ?? "";

  const hasTestbench = startTestbench.trim() !== "";

  const [design, setDesign] = useState(startCode);
  const [testbench, setTestbench] = useState(startTestbench);
  const [activeTab, setActiveTab] = useState("design");
  const [output, setOutput] = useState("");
  const [waveform, setWaveform] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | running | success | error

  const isRunning = status === "running";
  const isDesignTab = activeTab === "design";

  /* ---------- RUN ---------- */

  const handleRun = async () => {
    if (isRunning) return;

    setStatus("running");
    setOutput("▶ Running...");
    setWaveform(null);

    const result = await runCode({
      language,
      design,
      testbench: hasTestbench ? testbench : ""
    });

    setOutput(result.output);
    setWaveform(result.waveform ?? null);
    setStatus(result.success ? "success" : "error");
  };

  // Ctrl+Enter inside the editor always calls the latest handleRun
  const runRef = useRef(handleRun);

  useEffect(() => {
    runRef.current = handleRun;
  });

  const handleEditorMount = (editor, monaco) => {
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => runRef.current()
    );
  };

  /* ---------- RESET ---------- */

  const handleReset = () => {
    setDesign(startCode);
    setTestbench(startTestbench);
    setActiveTab("design");
    setOutput("");
    setWaveform(null);
    setStatus("idle");
  };

  /* ---------- RENDER ---------- */

  return (
    <div className="tryit">

      {/* HEADER */}
      <div className="tryit-header">
        <span className="tryit-title">
          {title ?? `TryIt - ${language}`}
        </span>

        <div className="tryit-actions">
          <button
            className="tryit-btn tryit-btn-reset"
            onClick={handleReset}
            disabled={isRunning}
          >
            ↻ Reset
          </button>

          <button
            className="tryit-btn tryit-btn-run"
            onClick={handleRun}
            disabled={isRunning}
            title="Ctrl + Enter"
          >
            {isRunning ? "⏳ Running..." : "▶ Run Code"}
          </button>
        </div>
      </div>

      {/* FILE TABS (only when a testbench exists) */}
      {hasTestbench && mode !== "beginner" && (
        <div className="tryit-tabs">
          <button
            className={`tryit-tab ${isDesignTab ? "active" : ""}`}
            onClick={() => setActiveTab("design")}
          >
            {DESIGN_FILE_NAMES[language]}
          </button>

          <button
            className={`tryit-tab ${!isDesignTab ? "active" : ""}`}
            onClick={() => setActiveTab("testbench")}
          >
            {TESTBENCH_FILE_NAMES[language]}
          </button>
        </div>
      )}

      {/* EDITOR */}
      <div className="tryit-editor" style={{ height }}>
        <Editor
          height="100%"
          path={`${id}-${activeTab}`}
          language={LANGUAGE_IDS[language] ?? "plaintext"}
          theme="vs-dark"
          value={isDesignTab ? design : testbench}
          onChange={(value) =>
            isDesignTab
              ? setDesign(value ?? "")
              : setTestbench(value ?? "")
          }
          onMount={handleEditorMount}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            tabSize: 4,
            insertSpaces: true,
            padding: { top: 10, bottom: 10 }
          }}
        />
      </div>

      {/* OUTPUT */}
      <div className="tryit-output-header">
        <span>Output</span>
        <span className={`tryit-status tryit-status-${status}`}>
          {status === "running" && "● Running"}
          {status === "success" && "● Success"}
          {status === "error" && "● Error"}
          {status === "idle" && "● Ready"}
        </span>
      </div>

      <pre className={`tryit-output tryit-output-${status}`}>
        {output || "Click “Run Code” (or press Ctrl + Enter) to see the output here."}
      </pre>

      {waveform && <WaveformPanel waveform={waveform} />}

    </div>
  );
}

export default TryIt;