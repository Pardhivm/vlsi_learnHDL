/*
 * Shared helper that sends code to the FastAPI backend
 * and turns the response into text for the console.
 *
 * Set VITE_API_URL in a .env file when you deploy, e.g.
 *   VITE_API_URL=https://api.yourdomain.com
 */

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

const SCRIPT_LANGUAGES = ["TCL", "Perl"];

function emptyOutputMessage(language) {
  switch (language) {
    case "TCL":
      return '(No output. Use "puts" to print, e.g. puts "Hello".)';
    case "Perl":
      return '(No output. Use "print" to print, e.g. print "Hello\\n";)';
    case "VHDL":
      return '(No output. Use "report" in your testbench to print messages.)';
    default:
      return "(Simulation finished with no output. Add $display or $monitor to print values.)";
  }
}

export async function runCode({ language, design, testbench = "" }) {
  const isScript = SCRIPT_LANGUAGES.includes(language);

  if (!design.trim()) {
    return {
      success: false,
      output: isScript ? "✕ Script is empty." : "✕ Design file is empty."
    };
  }

  try {
    const response = await fetch(`${API_URL}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, design, testbench })
    });

    if (!response.ok) {
      throw new Error(`Backend returned HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      let output = isScript
        ? `✓ ${language} script finished\n\n`
        : `✓ ${language} simulation completed\n\n`;

      output += result.stdout?.trim()
        ? result.stdout
        : emptyOutputMessage(language);

      if (result.stderr?.trim()) {
        output += `\n\nWarnings:\n${result.stderr}`;
      }

      return { success: true, output, waveform: result.waveform ?? null };
    }

    let output = `✕ ${language} ${result.stage || "run"} failed\n\n`;
    if (result.stderr) output += result.stderr;
    if (result.stdout) output += `\n\n${result.stdout}`;

    return { success: false, output };

  } catch (error) {
    return {
      success: false,
      output:
        `✕ Could not connect to the EDA backend.\n\n${error.message}\n\n` +
        `Make sure the FastAPI server is running:\n` +
        `python -m uvicorn main:app --reload --port 8000`
    };
  }
}