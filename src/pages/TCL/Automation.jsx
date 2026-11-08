import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Automation() {
  const sections = [
    {
      id: "introduction",
      title: "Design Automation"
    },
    {
      id: "automation-flow",
      title: "Automation Flow"
    },
    {
      id: "reusable-scripts",
      title: "Reusable Scripts"
    },
    {
      id: "batch-processing",
      title: "Batch Processing"
    },
    {
      id: "error-checking",
      title: "Error Checking"
    },
    {
      id: "vlsi-example",
      title: "VLSI Example"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="TCL Design Automation"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Vivado TCL"
      previousPath="/tcl/vivado"
      nextLesson="Projects"
      nextPath="/tcl/projects"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="Design Automation"
      >
        <p>
          Design automation means using scripts to perform
          repetitive engineering tasks automatically.
        </p>

        <p>
          In VLSI and FPGA development, TCL can combine
          variables, procedures, loops, conditions, file
          handling, and EDA commands into complete
          automation flows.
        </p>

        <LessonVisual
          type="tcl-automation-flow"
          caption="A TCL automation script can connect multiple design tasks"
        >
          <div className="tcl-automation-flow">

            <div className="tcl-automation-script">
              <span>TCL</span>
              <strong>Automation Script</strong>
            </div>

            <div className="tcl-automation-arrow">
              →
            </div>

            <div className="tcl-automation-pipeline">

              <div className="tcl-automation-node">
                Setup
              </div>

              <div className="tcl-automation-node">
                Build
              </div>

              <div className="tcl-automation-node">
                Analyze
              </div>

              <div className="tcl-automation-node">
                Report
              </div>

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          AUTOMATION FLOW
      ================================================== */}

      <LessonSection
        id="automation-flow"
        title="Automation Flow"
      >
        <p>
          A typical hardware automation script can divide
          the design process into several stages.
        </p>

        <div className="tcl-auto-flow-grid">

          <div className="tcl-auto-flow-card">
            <span>01</span>
            <strong>Setup</strong>
            <p>
              Configure project variables and paths.
            </p>
          </div>

          <div className="tcl-auto-flow-card">
            <span>02</span>
            <strong>Process</strong>
            <p>
              Run the required design operations.
            </p>
          </div>

          <div className="tcl-auto-flow-card">
            <span>03</span>
            <strong>Check</strong>
            <p>
              Examine results and conditions.
            </p>
          </div>

          <div className="tcl-auto-flow-card">
            <span>04</span>
            <strong>Report</strong>
            <p>
              Generate useful output information.
            </p>
          </div>

        </div>

        <CodeExample title="Simple Automation Structure">
{`set project "UART"

puts "Starting $project"

# Processing
puts "Running synthesis"
puts "Running implementation"

# Checking
puts "Checking timing"

# Reporting
puts "Generating reports"

puts "Flow completed"`}
        </CodeExample>
      </LessonSection>


      {/* ==================================================
          REUSABLE SCRIPTS
      ================================================== */}

      <LessonSection
        id="reusable-scripts"
        title="Reusable Scripts"
      >
        <p>
          Procedures allow frequently used operations to be
          packaged into reusable functions.
        </p>

        <CodeExample title="Reusable Report Procedure">
{`proc generateReport {name status} {

    puts "----------------------"
    puts "Report: $name"
    puts "Status: $status"
    puts "----------------------"
}

generateReport "Synthesis" "PASS"
generateReport "Timing" "PASS"
generateReport "Implementation" "PASS"`}
        </CodeExample>

        <CodeExample title="Output">
{`----------------------
Report: Synthesis
Status: PASS
----------------------
Report: Timing
Status: PASS
----------------------
Report: Implementation
Status: PASS
----------------------`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Automation Tip"
        >
          Reusable procedures reduce duplicated code and
          make large automation scripts easier to maintain.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          BATCH PROCESSING
      ================================================== */}

      <LessonSection
        id="batch-processing"
        title="Batch Processing"
      >
        <p>
          Loops can process multiple designs, modules,
          configurations, or files automatically.
        </p>

        <CodeExample title="Processing Multiple Designs">
{`set designs {
    UART
    SPI
    I2C
    GPIO
}

foreach design $designs {

    puts "Processing design: $design"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Processing design: UART
Processing design: SPI
Processing design: I2C
Processing design: GPIO`}
        </CodeExample>

        <LessonVisual
          type="tcl-batch"
          caption="One script can process multiple design items"
        >
          <div className="tcl-batch-visual">

            <div className="tcl-batch-source">
              <span>One TCL Script</span>
              <strong>Batch Process</strong>
            </div>

            <div className="tcl-batch-arrow">
              →
            </div>

            <div className="tcl-batch-items">

              <div>UART</div>
              <div>SPI</div>
              <div>I2C</div>
              <div>GPIO</div>

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          ERROR CHECKING
      ================================================== */}

      <LessonSection
        id="error-checking"
        title="Error Checking"
      >
        <p>
          Automation scripts should check important
          conditions before continuing to the next stage.
        </p>

        <CodeExample title="Checking a Result">
{`set slack -0.12

if {$slack < 0} {
    puts "ERROR: Timing violation"
} else {
    puts "Timing check passed"
}`}
        </CodeExample>

        <p>
          More advanced EDA scripts can also inspect command
          results, generated files, reports, and tool-specific
          status information.
        </p>

        <LearningNote
          type="warning"
          title="Good Practice"
        >
          Do not assume that every automation step
          succeeded. Important results should be checked
          before the script continues.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="vlsi-example"
        title="VLSI Example"
      >
        <p>
          The following example combines several TCL
          concepts into a small automated design flow.
        </p>

        <CodeExample title="Automated Design Flow">
{`set design "UART"
set slack 0.35

puts "Starting design flow for $design"
puts "Running synthesis..."
puts "Running implementation..."

if {$slack < 0} {
    puts "FAIL: Timing violation"
} else {
    puts "PASS: Timing requirement met"
}

puts "Generating final report..."
puts "Flow completed"`}
        </CodeExample>

        <CodeExample title="Output">
{`Starting design flow for UART
Running synthesis...
Running implementation...
PASS: Timing requirement met
Generating final report...
Flow completed`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Putting It Together"
        >
          Design automation becomes powerful when basic TCL
          programming features are combined with commands
          provided by an EDA tool.
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
          This exercise builds a small automated design
          checker. It processes several blocks and reports
          whether each block meets its timing requirement.
        </p>

        <TryIt
          title="Try TCL Design Automation"
          language="TCL"
          initialCode={`# TCL Design Automation Practice

set designs {
    UART
    SPI
    I2C
    GPIO
}

set slack(UART) 0.42
set slack(SPI) -0.08
set slack(I2C) 0.15
set slack(GPIO) 0.31

puts "DESIGN TIMING CHECK"
puts "==================="

foreach design $designs {

    puts ""
    puts "Checking $design..."

    if {$slack($design) < 0} {
        puts "Status: FAIL"
        puts "Slack : $slack($design) ns"
    } else {
        puts "Status: PASS"
        puts "Slack : $slack($design) ns"
    }
}

puts ""
puts "Automation completed."`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Automation;