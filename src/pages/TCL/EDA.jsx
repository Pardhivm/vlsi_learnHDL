import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function EDA() {
  const sections = [
    {
      id: "introduction",
      title: "TCL in EDA"
    },
    {
      id: "why-tcl",
      title: "Why TCL is Used"
    },
    {
      id: "eda-flow",
      title: "TCL in the EDA Flow"
    },
    {
      id: "design-objects",
      title: "Design Objects"
    },
    {
      id: "automation",
      title: "EDA Automation"
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
      title="TCL in EDA"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="File Handling"
      previousPath="/tcl/file-handling"
      nextLesson="Vivado TCL"
      nextPath="/tcl/vivado"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL in EDA"
      >
        <p>
          TCL is widely used as a scripting language for
          controlling and automating Electronic Design
          Automation (EDA) tools.
        </p>

        <p>
          Instead of performing every operation manually
          through a graphical interface, engineers can use
          TCL commands to automate repetitive design tasks.
        </p>

        <LessonVisual
          type="tcl-eda-flow"
          caption="TCL can control multiple stages of a hardware design flow"
        >
          <div className="tcl-eda-flow">

            <div className="tcl-eda-tool">
              <span>TCL Script</span>
              <strong>Automation</strong>
            </div>

            <div className="tcl-eda-arrow">
              →
            </div>

            <div className="tcl-eda-stages">

              <div className="tcl-eda-stage">
                Design
              </div>

              <div className="tcl-eda-stage">
                Synthesis
              </div>

              <div className="tcl-eda-stage">
                Implementation
              </div>

              <div className="tcl-eda-stage">
                Reports
              </div>

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          WHY TCL
      ================================================== */}

      <LessonSection
        id="why-tcl"
        title="Why TCL is Used in EDA"
      >
        <p>
          EDA tools contain many operations that may need
          to be repeated for different designs,
          configurations, or implementation runs.
        </p>

        <div className="tcl-eda-reason-grid">

          <div className="tcl-eda-reason-card">
            <strong>Automation</strong>
            <p>
              Repeated design tasks can be scripted.
            </p>
          </div>

          <div className="tcl-eda-reason-card">
            <strong>Reproducibility</strong>
            <p>
              The same commands can be executed again
              consistently.
            </p>
          </div>

          <div className="tcl-eda-reason-card">
            <strong>Batch Processing</strong>
            <p>
              Large sets of operations can run without
              manual interaction.
            </p>
          </div>

          <div className="tcl-eda-reason-card">
            <strong>Reports</strong>
            <p>
              Design information can be extracted and
              processed automatically.
            </p>
          </div>

        </div>

        <LearningNote
          type="vlsi"
          title="VLSI Connection"
        >
          TCL is particularly useful when a design flow
          contains many repetitive commands or requires
          automated processing.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          EDA FLOW
      ================================================== */}

      <LessonSection
        id="eda-flow"
        title="TCL in the EDA Flow"
      >
        <p>
          TCL can be used to control different stages of
          FPGA and ASIC design flows, depending on the EDA
          tool.
        </p>

        <div className="tcl-eda-flow-grid">

          <div className="tcl-eda-flow-card">
            <span>01</span>
            <strong>Project Setup</strong>
            <p>
              Create or configure a design project.
            </p>
          </div>

          <div className="tcl-eda-flow-card">
            <span>02</span>
            <strong>Source Files</strong>
            <p>
              Add HDL source files and constraints.
            </p>
          </div>

          <div className="tcl-eda-flow-card">
            <span>03</span>
            <strong>Synthesis</strong>
            <p>
              Start synthesis and collect results.
            </p>
          </div>

          <div className="tcl-eda-flow-card">
            <span>04</span>
            <strong>Implementation</strong>
            <p>
              Run implementation operations.
            </p>
          </div>

          <div className="tcl-eda-flow-card">
            <span>05</span>
            <strong>Reports</strong>
            <p>
              Generate and process reports.
            </p>
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          DESIGN OBJECTS
      ================================================== */}

      <LessonSection
        id="design-objects"
        title="Design Objects"
      >
        <p>
          EDA tools expose information about the design as
          objects that can be queried or manipulated using
          tool-specific TCL commands.
        </p>

        <div className="tcl-eda-object-grid">

          <div className="tcl-eda-object-card">
            <code>modules</code>
            <span>Design hierarchy</span>
          </div>

          <div className="tcl-eda-object-card">
            <code>ports</code>
            <span>Input and output ports</span>
          </div>

          <div className="tcl-eda-object-card">
            <code>nets</code>
            <span>Connections between objects</span>
          </div>

          <div className="tcl-eda-object-card">
            <code>clocks</code>
            <span>Clock definitions</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Tool-Specific Commands"
        >
          The exact commands and object names depend on the
          EDA tool being used. The examples on this page
          illustrate the scripting concept rather than a
          universal command set.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          AUTOMATION
      ================================================== */}

      <LessonSection
        id="automation"
        title="EDA Automation"
      >
        <p>
          A TCL script can combine variables, conditions,
          loops, procedures, and file handling to create an
          automated design flow.
        </p>

        <CodeExample title="Simple Automation Structure">
{`set project "UART"

puts "Starting project: $project"

foreach step {
    "Read Sources"
    "Synthesis"
    "Implementation"
    "Generate Reports"
} {
    puts "Running: $step"
}

puts "Flow completed"`}
        </CodeExample>

        <CodeExample title="Output">
{`Starting project: UART
Running: Read Sources
Running: Synthesis
Running: Implementation
Running: Generate Reports
Flow completed`}
        </CodeExample>
      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="vlsi-example"
        title="VLSI Example"
      >
        <p>
          Consider a simple automation script that checks
          several design stages.
        </p>

        <CodeExample title="Design Flow Script">
{`set stages {
    Elaboration
    Synthesis
    Implementation
    Timing
}

foreach stage $stages {

    puts "Checking stage: $stage"

    if {$stage eq "Timing"} {
        puts "Generating timing report"
    }
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Checking stage: Elaboration
Checking stage: Synthesis
Checking stage: Implementation
Checking stage: Timing
Generating timing report`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Think Like an Automation Engineer"
        >
          The real power of TCL in EDA comes from combining
          basic programming concepts with commands provided
          by the EDA tool.
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
          This example simulates a small EDA flow. Change
          the stages or add your own stage and run the script.
        </p>

        <TryIt
          title="Try TCL in EDA"
          language="TCL"
          initialCode={`# TCL EDA Flow Practice

set project "UART"

set stages {
    Elaboration
    Synthesis
    Implementation
    Timing
    Bitstream
}

puts "Project: $project"
puts "--------------------"

foreach stage $stages {

    puts "Running: $stage"

    if {$stage eq "Timing"} {
        puts "Generating timing report..."
    }

    if {$stage eq "Bitstream"} {
        puts "Generating FPGA bitstream..."
    }
}

puts "--------------------"
puts "EDA flow completed"`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default EDA;