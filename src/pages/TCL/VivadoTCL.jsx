import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Vivado() {
  const sections = [
    {
      id: "introduction",
      title: "Vivado TCL"
    },
    {
      id: "console",
      title: "Vivado TCL Console"
    },
    {
      id: "project",
      title: "Creating a Project"
    },
    {
      id: "sources",
      title: "Adding Sources"
    },
    {
      id: "synthesis",
      title: "Running Synthesis"
    },
    {
      id: "reports",
      title: "Generating Reports"
    },
    {
      id: "automation",
      title: "Automating a Flow"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="Vivado TCL"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="TCL in EDA"
      previousPath="/tcl/eda"
      nextLesson="Design Automation"
      nextPath="/tcl/automation"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="Vivado TCL"
      >
        <p>
          Vivado provides a TCL command interface that can
          be used to control FPGA design operations.
        </p>

        <p>
          Instead of performing every operation manually
          through the Vivado GUI, many project and design
          tasks can be performed using TCL commands.
        </p>

        <LessonVisual
          type="tcl-vivado-flow"
          caption="TCL commands can control different stages of a Vivado FPGA flow"
        >
          <div className="tcl-vivado-flow">

            <div className="tcl-vivado-script">
              <span>TCL Script</span>
              <strong>Vivado Commands</strong>
            </div>

            <div className="tcl-vivado-arrow">
              →
            </div>

            <div className="tcl-vivado-stages">

              <div className="tcl-vivado-stage">
                Project
              </div>

              <div className="tcl-vivado-stage">
                Sources
              </div>

              <div className="tcl-vivado-stage">
                Synthesis
              </div>

              <div className="tcl-vivado-stage">
                Implementation
              </div>

              <div className="tcl-vivado-stage">
                Reports
              </div>

            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="vlsi"
          title="Important"
        >
          Vivado TCL commands are specific to the Vivado
          environment. They are different from ordinary TCL
          commands such as <code>set</code>, <code>puts</code>,
          and <code>foreach</code>.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          CONSOLE
      ================================================== */}

      <LessonSection
        id="console"
        title="Vivado TCL Console"
      >
        <p>
          Vivado contains a TCL Console where commands can
          be entered interactively.
        </p>

        <LessonVisual
          type="tcl-vivado-console"
          caption="The Vivado TCL Console is used to enter commands"
        >
          <div className="tcl-vivado-console">

            <div className="tcl-console-header">
              Vivado Tcl Console
            </div>

            <div className="tcl-console-body">
              <div>
                <span className="tcl-console-prompt">
                  Vivado%
                </span>
                <code>puts "Hello Vivado"</code>
              </div>

              <div className="tcl-console-output">
                Hello Vivado
              </div>

              <div>
                <span className="tcl-console-prompt">
                  Vivado%
                </span>
                <code>get_projects</code>
              </div>

              <div className="tcl-console-output">
                project_1
              </div>
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Example">
{`puts "Starting Vivado automation"

get_projects`}
        </CodeExample>
      </LessonSection>


      {/* ==================================================
          PROJECT
      ================================================== */}

      <LessonSection
        id="project"
        title="Creating a Project"
      >
        <p>
          Vivado TCL provides commands for creating and
          configuring projects.
        </p>

        <CodeExample title="Create a Vivado Project">
{`create_project uart_project ./uart_project \
    -part xc7a100tcsg324-1`}
        </CodeExample>

        <p>
          The exact FPGA part number depends on the target
          development board or device.
        </p>

        <LearningNote
          type="warning"
          title="Check Your FPGA Part"
        >
          Do not blindly copy the part number from this
          example. Use the device corresponding to your
          actual FPGA board.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          SOURCES
      ================================================== */}

      <LessonSection
        id="sources"
        title="Adding Sources"
      >
        <p>
          HDL source files can be added to a Vivado project
          using TCL commands.
        </p>

        <CodeExample title="Add a Verilog Source">
{`add_files ./src/uart.v`}
        </CodeExample>

        <CodeExample title="Add a VHDL Source">
{`add_files ./src/uart.vhd`}
        </CodeExample>

        <CodeExample title="Add a Constraint File">
{`add_files ./constraints/uart.xdc`}
        </CodeExample>

        <p>
          These commands allow a script to construct a
          project without manually adding every file through
          the GUI.
        </p>
      </LessonSection>


      {/* ==================================================
          SYNTHESIS
      ================================================== */}

      <LessonSection
        id="synthesis"
        title="Running Synthesis"
      >
        <p>
          After adding the required design sources, Vivado
          TCL can be used to launch synthesis.
        </p>

        <CodeExample title="Launch Synthesis">
{`launch_runs synth_1

wait_on_run synth_1

puts "Synthesis completed"`}
        </CodeExample>

        <LessonVisual
          type="tcl-vivado-synthesis"
          caption="TCL can start synthesis and wait for the run to finish"
        >
          <div className="tcl-vivado-synthesis">

            <div className="tcl-synth-step">
              <span>1</span>
              <strong>launch_runs</strong>
              <small>Start synthesis</small>
            </div>

            <div className="tcl-synth-arrow">
              →
            </div>

            <div className="tcl-synth-step">
              <span>2</span>
              <strong>wait_on_run</strong>
              <small>Wait for completion</small>
            </div>

            <div className="tcl-synth-arrow">
              →
            </div>

            <div className="tcl-synth-step">
              <span>3</span>
              <strong>Report</strong>
              <small>Continue automation</small>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          REPORTS
      ================================================== */}

      <LessonSection
        id="reports"
        title="Generating Reports"
      >
        <p>
          Reports are an important part of FPGA design.
          Vivado provides TCL commands for generating
          different types of reports.
        </p>

        <CodeExample title="Timing Report">
{`report_timing_summary`}
        </CodeExample>

        <CodeExample title="Utilization Report">
{`report_utilization`}
        </CodeExample>

        <CodeExample title="Clock Information">
{`report_clocks`}
        </CodeExample>

        <LearningNote
          type="info"
          title="EDA Automation"
        >
          Report commands can be combined with file
          handling and conditional statements to create
          automated analysis flows.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          AUTOMATION
      ================================================== */}

      <LessonSection
        id="automation"
        title="Automating a Vivado Flow"
      >
        <p>
          Multiple Vivado commands can be placed into one
          TCL script and executed as an automated flow.
        </p>

        <CodeExample title="Basic Vivado Flow">
{`create_project uart_project ./uart_project \
    -part xc7a100tcsg324-1

add_files ./src/uart.v
add_files ./constraints/uart.xdc

update_compile_order -fileset sources_1

launch_runs synth_1
wait_on_run synth_1

report_timing_summary
report_utilization

puts "Vivado flow completed"`}
        </CodeExample>

        <LessonVisual
          type="tcl-vivado-automation"
          caption="A single TCL script can connect multiple Vivado operations"
        >
          <div className="tcl-vivado-automation">

            <div className="tcl-auto-node">
              Project
            </div>

            <div className="tcl-auto-line">
              →
            </div>

            <div className="tcl-auto-node">
              Sources
            </div>

            <div className="tcl-auto-line">
              →
            </div>

            <div className="tcl-auto-node">
              Synthesis
            </div>

            <div className="tcl-auto-line">
              →
            </div>

            <div className="tcl-auto-node">
              Reports
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
    TRY IT
================================================== */}

<LessonSection
  id="try-it"
  title="Try It Yourself"
>
  <p>
    The editor below simulates a Vivado TCL flow.
    Your local TCL runner uses <code>tclsh</code>, so
    Vivado commands are represented by a small helper
    procedure instead of being sent to the real Vivado
    tool.
  </p>

  <CodeExample title="Actual Vivado TCL Commands">
{`create_project uart_project ./uart_project \\
    -part xc7a100tcsg324-1

add_files ./src/uart.v
add_files ./constraints/uart.xdc

update_compile_order -fileset sources_1

launch_runs synth_1
wait_on_run synth_1

report_timing_summary
report_utilization`}
  </CodeExample>

  <TryIt
    title="Try Vivado TCL Flow"
    language="TCL"
    initialCode={`# Vivado TCL Flow Simulator
# This runs with normal TCL (tclsh).
# The procedure below simulates Vivado commands.

proc vivado {command} {
    puts "Vivado> $command"
}

set project "uart_project"
set part "xc7a100tcsg324-1"

puts "Starting Vivado automation"
puts "=========================="

vivado "create_project $project ./uart_project -part $part"

vivado "add_files ./src/uart.v"
vivado "add_files ./constraints/uart.xdc"

vivado "update_compile_order -fileset sources_1"

puts ""
puts "Running synthesis..."

vivado "launch_runs synth_1"
vivado "wait_on_run synth_1"

puts ""
puts "Generating reports..."

vivado "report_timing_summary"
vivado "report_utilization"

puts ""
puts "Vivado flow completed successfully."`}
  />

  <LearningNote
    type="info"
    title="How This Works"
  >
    The <code>vivado</code> procedure does not execute
    real Vivado commands. It displays them so you can
    practice the structure of a Vivado automation script
    using your current TCL runner.
  </LearningNote>

</LessonSection>
    </LessonPage>
  );
}

export default Vivado;