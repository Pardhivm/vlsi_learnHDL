import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import LessonVisual from "../../components/LessonVisual";
import TCLSidebar from "../../components/TCLSidebar";

function TCL() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction to TCL"
    },
    {
      id: "what",
      title: "What is TCL?"
    },
    {
      id: "vlsi",
      title: "TCL in VLSI"
    },
    {
      id: "why",
      title: "Why Learn TCL?"
    },
    {
      id: "commands",
      title: "Your First TCL Commands"
    },
    {
      id: "eda",
      title: "TCL and EDA Tools"
    },
    {
      id: "flow",
      title: "TCL Automation Flow"
    },
    {
      id: "learn",
      title: "What You Will Learn"
    },
    {
      id: "takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="TCL"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="VHDL Projects"
      previousPath="/vhdl/projects"
      nextLesson="What is TCL?"
      nextPath="/tcl/what-is-tcl"
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="tcl-intro-hero">

        <div className="tcl-intro-hero-content">

          <div className="tcl-intro-badge">
            VLSI AUTOMATION &amp; EDA SCRIPTING
          </div>

          <h2>
            Learn TCL for VLSI &amp; EDA
          </h2>

          <p>
            Learn how TCL scripting is used to automate
            repetitive tasks, control EDA tools, run design
            flows, and build efficient VLSI workflows.
          </p>

          <div className="tcl-intro-points">
            <span>EDA Automation</span>
            <span>Tool Control</span>
            <span>Design Flow</span>
            <span>Scripting</span>
          </div>

        </div>


        <div className="tcl-terminal">

          <div className="tcl-terminal-header">
            <span></span>
            <span></span>
            <span></span>

            <strong>tcl_shell</strong>
          </div>

          <div className="tcl-terminal-body">

            <div>
              <span className="tcl-prompt">$</span>
              <span>set tool "Vivado"</span>
            </div>

            <div>
              <span className="tcl-prompt">$</span>
              <span>puts $tool</span>
            </div>

            <div className="tcl-terminal-output">
              Vivado
            </div>

            <div>
              <span className="tcl-prompt">$</span>
              <span>run_design</span>
            </div>

            <div className="tcl-terminal-output">
              Design flow started...
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <LessonSection
        id="introduction"
        title="1. Introduction to TCL"
      >
        <p className="lesson-intro">
          TCL is a scripting language widely used for
          automation and tool control. In the VLSI industry,
          TCL is especially important because many EDA tools
          provide TCL-based command interfaces.
        </p>

        <p>
          Instead of manually performing the same operations
          repeatedly, engineers can write TCL scripts to
          automate those operations.
        </p>

        <div className="tcl-intro-concept">

          <div className="tcl-concept-manual">
            <span>MANUAL WORK</span>

            <strong>
              Click → Configure → Run
            </strong>

            <small>
              Repeated for every design
            </small>
          </div>

          <div className="tcl-concept-arrow">
            →
          </div>

          <div className="tcl-concept-script">
            <span>TCL AUTOMATION</span>

            <strong>
              Write Once → Run
            </strong>

            <small>
              Repeatable and automated
            </small>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          TCL allows engineers to control software tools
          through commands and scripts instead of performing
          every operation manually.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          WHAT IS TCL
      ===================================================== */}

      <LessonSection
        id="what"
        title="2. What is TCL?"
      >
        <p>
          TCL stands for
          <strong> Tool Command Language</strong>.
        </p>

        <p>
          It is a scripting language designed around commands,
          variables, expressions, procedures, and automation.
        </p>

        <div className="tcl-definition">

          <div className="tcl-definition-title">
            <span>TCL</span>
            <strong>
              Tool Command Language
            </strong>
          </div>

          <div className="tcl-definition-items">

            <div>
              <strong>Commands</strong>
              <span>
                Tell a tool what to do
              </span>
            </div>

            <div>
              <strong>Variables</strong>
              <span>
                Store information
              </span>
            </div>

            <div>
              <strong>Procedures</strong>
              <span>
                Reuse automation logic
              </span>
            </div>

          </div>

        </div>

        <CodeExample title="Simple TCL">
{`set name "VLSI"

puts $name`}
        </CodeExample>

        <p>
          The <code>set</code> command creates a variable,
          while <code>puts</code> prints its value.
        </p>

        <LearningNote
          type="tip"
          title="Remember"
        >
          TCL is commonly used as a scripting and automation
          language. In VLSI, its importance comes from its
          integration with EDA tools.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          TCL IN VLSI
      ===================================================== */}

      <LessonSection
        id="vlsi"
        title="3. TCL in VLSI"
      >
        <p>
          TCL is used throughout many VLSI workflows to
          automate commands and control EDA tools.
        </p>

        <LessonVisual
          type="diagram"
          caption="TCL can sit between the engineer and the EDA tool, turning a sequence of manual operations into an automated flow."
        >
          <div className="tcl-vlsi-flow">

            <div className="tcl-vlsi-engineer">
              <small>ENGINEER</small>
              <strong>Design Flow</strong>
            </div>

            <div className="tcl-vlsi-wire">
              <span>TCL commands</span>
              <div></div>
            </div>

            <div className="tcl-vlsi-script">
              <small>SCRIPT</small>
              <strong>TCL</strong>
            </div>

            <div className="tcl-vlsi-wire">
              <span>Tool control</span>
              <div></div>
            </div>

            <div className="tcl-vlsi-tool">
              <small>EDA TOOL</small>
              <strong>Vivado / EDA</strong>
            </div>

          </div>
        </LessonVisual>

        <p>
          For example, a TCL script can be used to create a
          project, add RTL files, run synthesis, launch
          implementation, and inspect results.
        </p>
      </LessonSection>


      {/* =====================================================
          WHY LEARN TCL
      ===================================================== */}

      <LessonSection
        id="why"
        title="4. Why Learn TCL?"
      >
        <p>
          TCL is valuable because VLSI engineers frequently
          work with tools that expose command-line and
          scripting interfaces.
        </p>

        <div className="tcl-benefits">

          <div>
            <span>01</span>
            <strong>Automation</strong>
            <p>
              Automate repetitive design operations.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>EDA Tools</strong>
            <p>
              Control tools through scripting commands.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Repeatability</strong>
            <p>
              Run the same flow consistently.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Productivity</strong>
            <p>
              Reduce repetitive manual operations.
            </p>
          </div>

          <div>
            <span>05</span>
            <strong>Batch Flows</strong>
            <p>
              Run design tasks without constant interaction.
            </p>
          </div>

          <div>
            <span>06</span>
            <strong>Debugging</strong>
            <p>
              Inspect tool information and design results.
            </p>
          </div>

        </div>
      </LessonSection>


      {/* =====================================================
          FIRST COMMANDS
      ===================================================== */}

      <LessonSection
        id="commands"
        title="5. Your First TCL Commands"
      >
        <p>
          TCL is command-oriented. A simple TCL command
          consists of a command followed by its arguments.
        </p>

        <CodeExample title="Basic TCL Commands">
{`set width 8

puts $width

set language "TCL"

puts $language`}
        </CodeExample>

        <div className="tcl-command-breakdown">

          <div>
            <code>set</code>
            <strong>Command</strong>
            <span>Creates or changes a variable</span>
          </div>

          <div>
            <code>width</code>
            <strong>Variable</strong>
            <span>Name used to store the value</span>
          </div>

          <div>
            <code>8</code>
            <strong>Value</strong>
            <span>Information stored in the variable</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="TCL Syntax"
        >
          TCL commands are generally separated by spaces.
          Variables are accessed using the <code>$</code>
          symbol.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          TCL AND EDA
      ===================================================== */}

      <LessonSection
        id="eda"
        title="6. TCL and EDA Tools"
      >
        <p>
          Many EDA tools provide TCL command interfaces.
          This allows engineers to perform tool operations
          interactively or through scripts.
        </p>

        <CodeExample title="EDA-Style TCL Example">
{`create_project my_project ./my_project

add_files design.v

launch_runs synth_1

wait_on_run synth_1`}
        </CodeExample>

        <div className="tcl-eda-interface">

          <div className="tcl-eda-command">
            <code>create_project</code>
            <span>Create a project</span>
          </div>

          <div className="tcl-eda-command">
            <code>add_files</code>
            <span>Add design files</span>
          </div>

          <div className="tcl-eda-command">
            <code>launch_runs</code>
            <span>Start a tool run</span>
          </div>

          <div className="tcl-eda-command">
            <code>wait_on_run</code>
            <span>Wait for completion</span>
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Tool-Specific Commands"
        >
          EDA commands are often specific to the particular
          tool being used. We will study practical tool
          commands later in the TCL course.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          AUTOMATION FLOW
      ===================================================== */}

      <LessonSection
        id="flow"
        title="7. TCL Automation Flow"
      >
        <p>
          A typical automated VLSI flow can be represented
          like this:
        </p>

        <div className="tcl-automation-flow">

          <div>
            <span>01</span>
            <strong>Write</strong>
            <small>TCL script</small>
          </div>

          <div className="tcl-flow-arrow">
            →
          </div>

          <div>
            <span>02</span>
            <strong>Launch</strong>
            <small>EDA tool</small>
          </div>

          <div className="tcl-flow-arrow">
            →
          </div>

          <div>
            <span>03</span>
            <strong>Execute</strong>
            <small>Commands</small>
          </div>

          <div className="tcl-flow-arrow">
            →
          </div>

          <div>
            <span>04</span>
            <strong>Analyze</strong>
            <small>Results</small>
          </div>

          <div className="tcl-flow-arrow">
            →
          </div>

          <div>
            <span>05</span>
            <strong>Automate</strong>
            <small>Next run</small>
          </div>

        </div>

        <LearningNote
          type="success"
          title="VLSI Perspective"
        >
          The real power of TCL comes from combining basic
          scripting with EDA-tool commands to create complete
          repeatable design flows.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          WHAT YOU WILL LEARN
      ===================================================== */}

      <LessonSection
        id="learn"
        title="8. What You Will Learn"
      >
        <p>
          In this course, we will progress from basic TCL
          syntax to practical VLSI automation.
        </p>

        <div className="tcl-roadmap">

          <div>
            <span>01</span>
            <strong>Fundamentals</strong>
            <p>
              Syntax, commands, and variables
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Data Handling</strong>
            <p>
              Strings, lists, and arrays
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Control Flow</strong>
            <p>
              Conditions and loops
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Procedures</strong>
            <p>
              Reusable scripting logic
            </p>
          </div>

          <div>
            <span>05</span>
            <strong>Files</strong>
            <p>
              Reading and writing files
            </p>
          </div>

          <div>
            <span>06</span>
            <strong>EDA Automation</strong>
            <p>
              Control VLSI tools using TCL
            </p>
          </div>

          <div>
            <span>07</span>
            <strong>Vivado TCL</strong>
            <p>
              FPGA design automation examples
            </p>
          </div>

          <div>
            <span>08</span>
            <strong>Projects</strong>
            <p>
              Practical automation workflows
            </p>
          </div>

        </div>
      </LessonSection>


      {/* =====================================================
          TAKEAWAYS
      ===================================================== */}

      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="tcl-takeaways">

          <div>
            <strong>TCL</strong>
            <span>
              Tool Command Language
            </span>
          </div>

          <div>
            <strong>Commands</strong>
            <span>
              Control operations
            </span>
          </div>

          <div>
            <strong>Variables</strong>
            <span>
              Store information
            </span>
          </div>

          <div>
            <strong>Automation</strong>
            <span>
              Reduce repetitive work
            </span>
          </div>

          <div>
            <strong>EDA</strong>
            <span>
              Control design tools
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn what TCL really is, how its
          command-based syntax works, and how it differs
          from ordinary programming languages.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default TCL;