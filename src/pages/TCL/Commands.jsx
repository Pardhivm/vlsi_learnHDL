import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Commands() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Commands"
    },
    {
      id: "set",
      title: "set Command"
    },
    {
      id: "puts",
      title: "puts Command"
    },
    {
      id: "expr",
      title: "expr Command"
    },
    {
      id: "command-substitution",
      title: "Command Substitution"
    },
    {
      id: "eda-commands",
      title: "EDA Commands"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="TCL Commands"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Variables"
      previousPath="/tcl/variables"
      nextLesson="Strings"
      nextPath="/tcl/strings"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Commands"
      >

        <p>
          TCL programs are built using commands.
          Each command performs a specific operation
          and can receive one or more arguments.
        </p>

        <LessonVisual
          type="tcl-command"
          caption="A TCL command consists of a command name followed by its arguments."
        >

          <div className="tcl-command-visual">

            <div className="tcl-command-node tcl-command-name">
              <span>Command</span>
              <strong>puts</strong>
            </div>

            <div className="tcl-command-connector">
              →
            </div>

            <div className="tcl-command-node tcl-command-argument">
              <span>Argument</span>
              <strong>"Hello"</strong>
            </div>

            <div className="tcl-command-connector">
              →
            </div>

            <div className="tcl-command-node tcl-command-result">
              <span>Result</span>
              <strong>Hello</strong>
            </div>

          </div>

        </LessonVisual>

        <CodeExample title="Basic TCL Command">
{`puts "Hello TCL"`}
        </CodeExample>

      </LessonSection>


      {/* ==================================================
          SET COMMAND
      ================================================== */}

      <LessonSection
        id="set"
        title="set Command"
      >

        <p>
          The <code>set</code> command is used to create
          a variable or change the value of an existing
          variable.
        </p>

        <CodeExample title="Creating Variables">
{`set width 8
set height 4
set module "UART"`}
        </CodeExample>

        <p>
          The general syntax is:
        </p>

        <CodeExample title="Syntax">
{`set variable value`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Remember"
        >
          The <code>set</code> command assigns a value
          to a variable. If the variable already exists,
          its value is updated.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          PUTS COMMAND
      ================================================== */}

      <LessonSection
        id="puts"
        title="puts Command"
      >

        <p>
          The <code>puts</code> command displays text or
          variable values in the output.
        </p>

        <CodeExample title="Printing Text">
{`puts "Welcome to VLSI Learn"
puts "TCL is useful in EDA tools"`}
        </CodeExample>

        <CodeExample title="Printing Variables">
{`set tool "Vivado"
set version "2025.1"

puts "Tool    = $tool"
puts "Version = $version"`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Tip"
        >
          Use <code>$variable</code> when you want to
          print the value stored in a variable.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          EXPR COMMAND
      ================================================== */}

      <LessonSection
        id="expr"
        title="expr Command"
      >

        <p>
          The <code>expr</code> command evaluates
          mathematical and logical expressions.
        </p>

        <CodeExample title="Addition">
{`set a 10
set b 5

set result [expr $a + $b]

puts "Result = $result"`}
        </CodeExample>

        <CodeExample title="Multiplication">
{`set width 8
set count 4

set total [expr $width * $count]

puts "Total = $total"`}
        </CodeExample>

        <LessonVisual
          type="tcl-expression"
          caption="The expr command evaluates an expression and produces a result."
        >

          <div className="tcl-expression-visual">

            <div className="tcl-expression-box">
              <span>Input</span>
              <strong>$width * $count</strong>
            </div>

            <div className="tcl-expression-arrow">
              →
            </div>

            <div className="tcl-expression-box tcl-expression-command">
              <span>Command</span>
              <strong>expr</strong>
            </div>

            <div className="tcl-expression-arrow">
              →
            </div>

            <div className="tcl-expression-box tcl-expression-result">
              <span>Result</span>
              <strong>32</strong>
            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          COMMAND SUBSTITUTION
      ================================================== */}

      <LessonSection
        id="command-substitution"
        title="Command Substitution"
      >

        <p>
          TCL uses square brackets <code>[ ]</code> to
          execute a command and substitute its result
          into another command.
        </p>

        <CodeExample title="Example">
{`set width 8
set height 4

set area [expr $width * $height]

puts "Area = $area"`}
        </CodeExample>

        <LessonVisual
          type="tcl-substitution"
          caption="Command substitution executes the inner command first."
        >

          <div className="tcl-substitution-visual">

            <div className="tcl-substitution-node">
              <span>TCL Command</span>
              <strong>[expr 8 * 4]</strong>
            </div>

            <div className="tcl-substitution-arrow">
              →
            </div>

            <div className="tcl-substitution-node tcl-substitution-result">
              <span>Result</span>
              <strong>32</strong>
            </div>

            <div className="tcl-substitution-arrow">
              →
            </div>

            <div className="tcl-substitution-node">
              <span>Stored Value</span>
              <strong>set total 32</strong>
            </div>

          </div>

        </LessonVisual>

        <LearningNote
          type="info"
          title="Remember"
        >
          The command inside <code>[ ]</code> is executed
          first. Its result is then inserted into the
          surrounding command.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          EDA COMMANDS
      ================================================== */}

      <LessonSection
        id="eda-commands"
        title="TCL Commands in EDA"
      >

        <p>
          EDA tools provide their own TCL commands for
          hardware design, synthesis, implementation,
          timing analysis, and reporting.
        </p>

        <CodeExample title="Common EDA-Style Commands">
{`read_verilog uart.v
create_clock -period 10 [get_ports clk]
report_timing
report_utilization`}
        </CodeExample>

        <div className="tcl-eda-command-grid">

          <div className="tcl-eda-command-card">
            <code>read_verilog</code>
            <p>Reads Verilog RTL files.</p>
          </div>

          <div className="tcl-eda-command-card">
            <code>create_clock</code>
            <p>Defines a clock constraint.</p>
          </div>

          <div className="tcl-eda-command-card">
            <code>report_timing</code>
            <p>Generates timing information.</p>
          </div>

          <div className="tcl-eda-command-card">
            <code>report_utilization</code>
            <p>Reports design resource usage.</p>
          </div>

        </div>

        <LearningNote
          type="vlsi"
          title="TCL in VLSI"
        >
          EDA commands are usually tool-specific.
          The exact commands available depend on the
          EDA tool being used.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          TRY IT
      ================================================== */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >

        <p>
          Practice TCL commands by calculating the
          number of bits processed by several registers.
        </p>

        <TryIt
          title="Try TCL Commands"
          language="TCL"
          initialCode={`# Calculate total register bits

set registers 6
set bits_per_register 16

set total_bits [expr $registers * $bits_per_register]

puts "Registers = $registers"
puts "Bits per register = $bits_per_register"
puts "Total register bits = $total_bits"`}
        />

        <LearningNote
          type="tip"
          title="Try changing the values"
        >
          Change <code>registers</code> or
          <code>bits_per_register</code>, then click
          <strong>Run</strong> again and observe the
          updated result.
        </LearningNote>

      </LessonSection>

    </LessonPage>
  );
}

export default Commands;