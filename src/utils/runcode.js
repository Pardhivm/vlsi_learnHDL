
/*
 * Shared helper that sends code to the FastAPI backend
 * and turns the response into text for the console.
 *
 * Local development:
 *   http://127.0.0.1:8000
 *
 * Production:
 *   https://vlsi-learn-api-docker.onrender.com
 *
 * Optional Vercel environment variable:
 *   VITE_API_URL=https://vlsi-learn-api-docker.onrender.com
 */

// =========================================
// BACKEND URL CONFIGURATION
// =========================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://vlsi-learn-api-docker.onrender.com")
).replace(/\/+$/, "");

// =========================================
// LANGUAGE CONFIGURATION
// =========================================

const SCRIPT_LANGUAGES = ["TCL", "Perl"];

// =========================================
// EMPTY OUTPUT MESSAGES
// =========================================

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

// =========================================
// RUN CODE
// =========================================

export async function runCode({
  language,
  design,
  testbench = ""
}) {
  const isScript = SCRIPT_LANGUAGES.includes(language);

  if (!design || !design.trim()) {
    return {
      success: false,
      output: isScript
        ? "✕ Script is empty."
        : "✕ Design file is empty."
    };
  }

  try {
    const response = await fetch(`${API_URL}/run`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        language,
        design,
        testbench
      })
    });

    // =====================================
    // HTTP ERROR HANDLING
    // =====================================

    if (!response.ok) {
      throw new Error(
        `Backend returned HTTP ${response.status}`
      );
    }

    const result = await response.json();

    // =====================================
    // SUCCESSFUL EXECUTION
    // =====================================

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

      return {
        success: true,
        output,
        waveform: result.waveform ?? null
      };
    }

    // =====================================
    // SIMULATION ERROR
    // =====================================

    let output =
      `✕ ${language} ${result.stage || "run"} failed\n\n`;

    if (result.stderr) {
      output += result.stderr;
    }

    if (result.stdout) {
      output += `\n\n${result.stdout}`;
    }

    return {
      success: false,
      output
    };

  } catch (error) {

    // =====================================
    // CONNECTION ERROR
    // =====================================

    console.error("EDA Backend Error:", error);

    return {
      success: false,

      output:
        `✕ Could not connect to the EDA backend.\n\n` +
        `${error.message}\n\n` +
        `Backend URL: ${API_URL}\n\n` +
        `Please check whether the Render backend is running.`
    };
  }
}
