import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TCLSidebar from "../../components/TCLSidebar";

function WhatIsTCL() {
  const sections = [
    {
      id: "definition",
      title: "What is TCL?"
    },
    {
      id: "how-it-works",
      title: "How TCL Works"
    },
    {
      id: "example",
      title: "Simple TCL Example"
    },
    {
      id: "vlsi",
      title: "TCL in VLSI"
    },
    {
      id: "eda",
      title: "TCL and EDA Tools"
    },
    {
      id: "why-learn",
      title: "Why Learn TCL?"
    }
  ];

  return (
    <LessonPage
      title="What is TCL?"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Introduction"
      previousPath="/tcl"
      nextLesson="Basic Syntax"
      nextPath="/tcl/basic-syntax"
    >

      {/* =========================
          WHAT IS TCL
         ========================= */}

      <LessonSection
        id="definition"
        title="What is TCL?"
      >

        <div className="tcl-definition">

          <div className="tcl-definition-badge">
            TCL
          </div>

          <div className="tcl-definition-text">

            <p>
              <strong>TCL</strong> stands for
              <strong> Tool Command Language</strong>.
            </p>

            <p>
              TCL is a scripting language used to execute
              commands, automate tasks, process information,
              and control applications.
            </p>

            <p>
              In the VLSI industry, TCL is particularly useful
              because many EDA tools provide TCL-based command
              interfaces.
            </p>

          </div>

        </div>

        <LearningNote
          type="info"
          title="In simple words"
        >
          TCL allows you to tell a tool what to do using
          commands instead of performing every operation
          manually through a graphical interface.
        </LearningNote>

      </LessonSection>


      {/* =========================
          HOW TCL WORKS
         ========================= */}

      <LessonSection
        id="how-it-works"
        title="How TCL Works"
      >

        <p>
          A TCL script contains a sequence of commands.
          The TCL interpreter reads these commands and
          executes them one by one.
        </p>

        <LessonVisual
          type="custom"
          caption="Basic TCL execution flow"
        >

          <div className="tcl-execution-flow">

            <div className="tcl-flow-block tcl-script-block">
              <div className="tcl-flow-number">
                01
              </div>

              <div className="tcl-flow-icon">
                &lt;/&gt;
              </div>

              <strong>TCL Script</strong>

              <span>
                Commands written by the engineer
              </span>
            </div>


            <div className="tcl-flow-connector">
              <div></div>
              <span>execute</span>
              <div></div>
            </div>


            <div className="tcl-flow-block tcl-interpreter-block">
              <div className="tcl-flow-number">
                02
              </div>

              <div className="tcl-flow-icon">
                ⚙
              </div>

              <strong>TCL Interpreter</strong>

              <span>
                Reads and executes commands
              </span>
            </div>


            <div className="tcl-flow-connector">
              <div></div>
              <span>control</span>
              <div></div>
            </div>


            <div className="tcl-flow-block tcl-tool-block">
              <div className="tcl-flow-number">
                03
              </div>

              <div className="tcl-flow-icon">
                ▣
              </div>

              <strong>Application / EDA Tool</strong>

              <span>
                Performs the requested operation
              </span>
            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* =========================
          SIMPLE EXAMPLE
         ========================= */}

      <LessonSection
        id="example"
        title="Simple TCL Example"
      >

        <p>
          Let's start with a very simple TCL program.
          We will create a variable and then print its value.
        </p>

        <div className="tcl-example-layout">

          <div className="tcl-example-code">

            <div className="tcl-example-header">
              <span>TCL</span>
              <span>Example 1</span>
            </div>

            <pre>{`set name "VLSI"

puts "Learning $name"`}</pre>

          </div>


          <div className="tcl-example-output">

            <div className="tcl-output-title">
              OUTPUT
            </div>

            <div className="tcl-output-screen">
              <span>&gt;</span>
              <span>Learning VLSI</span>
            </div>

          </div>

        </div>

        <div className="tcl-command-explanation">

          <div>
            <code>set</code>
            <span>
              Creates a variable or assigns a value to it.
            </span>
          </div>

          <div>
            <code>puts</code>
            <span>
              Prints text or a variable value.
            </span>
          </div>

          <div>
            <code>$name</code>
            <span>
              Reads the value stored in the variable.
            </span>
          </div>

        </div>

      </LessonSection>


      {/* =========================
          TCL IN VLSI
         ========================= */}

      <LessonSection
        id="vlsi"
        title="TCL in VLSI"
      >

        <p>
          TCL becomes especially useful in VLSI because
          engineers frequently perform large numbers of
          repetitive operations during design and verification.
        </p>

        <LessonVisual
          type="custom"
          caption="Examples of VLSI activities that can be automated using TCL"
        >

          <div className="tcl-vlsi-diagram">

            <div className="tcl-vlsi-core">
              <span className="tcl-core-symbol">
                TCL
              </span>

              <strong>
                Automation
              </strong>

              <small>
                VLSI Workflow
              </small>
            </div>


            <div className="tcl-vlsi-line line-top"></div>
            <div className="tcl-vlsi-line line-right"></div>
            <div className="tcl-vlsi-line line-bottom"></div>
            <div className="tcl-vlsi-line line-left"></div>


            <div className="tcl-vlsi-node node-top">
              <strong>RTL Design</strong>
              <span>Run design commands</span>
            </div>

            <div className="tcl-vlsi-node node-right">
              <strong>Synthesis</strong>
              <span>Automate synthesis tasks</span>
            </div>

            <div className="tcl-vlsi-node node-bottom">
              <strong>Implementation</strong>
              <span>Control implementation flow</span>
            </div>

            <div className="tcl-vlsi-node node-left">
              <strong>Reports</strong>
              <span>Generate and process reports</span>
            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* =========================
          TCL AND EDA
         ========================= */}

      <LessonSection
        id="eda"
        title="TCL and EDA Tools"
      >

        <p>
          EDA tools can provide a TCL command interface.
          Engineers can enter commands directly or place
          multiple commands inside a TCL script.
        </p>

        <div className="tcl-terminal">

          <div className="tcl-terminal-bar">

            <div className="tcl-terminal-title">
              EDA TOOL
            </div>

            <div className="tcl-terminal-label">
              TCL CONSOLE
            </div>

          </div>


          <div className="tcl-terminal-content">

            <div className="tcl-terminal-line">
              <span className="tcl-terminal-prompt">
                %
              </span>

              <span>
                create_project my_design
              </span>
            </div>

            <div className="tcl-terminal-line">
              <span className="tcl-terminal-prompt">
                %
              </span>

              <span>
                read_verilog design.v
              </span>
            </div>

            <div className="tcl-terminal-line">
              <span className="tcl-terminal-prompt">
                %
              </span>

              <span>
                report_timing
              </span>
            </div>

            <div className="tcl-terminal-response">
              Commands are interpreted by the EDA tool.
            </div>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Why this is useful"
        >
          A script can contain many commands and execute
          them in a consistent order. This reduces repetitive
          manual work and makes workflows easier to reproduce.
        </LearningNote>

      </LessonSection>


      {/* =========================
          WHY LEARN TCL
         ========================= */}

      <LessonSection
        id="why-learn"
        title="Why Learn TCL?"
      >

        <div className="tcl-learning-points">

          <div className="tcl-learning-point">
            <div className="tcl-point-number">
              01
            </div>

            <div>
              <strong>Automation</strong>
              <p>
                Automate repetitive tasks instead of performing
                them manually.
              </p>
            </div>
          </div>


          <div className="tcl-learning-point">
            <div className="tcl-point-number">
              02
            </div>

            <div>
              <strong>EDA Tool Control</strong>
              <p>
                Execute commands and control supported EDA
                tools through scripts.
              </p>
            </div>
          </div>


          <div className="tcl-learning-point">
            <div className="tcl-point-number">
              03
            </div>

            <div>
              <strong>Repeatable Workflows</strong>
              <p>
                Run the same sequence of operations consistently.
              </p>
            </div>
          </div>


          <div className="tcl-learning-point">
            <div className="tcl-point-number">
              04
            </div>

            <div>
              <strong>Report Processing</strong>
              <p>
                Work with information generated by design tools.
              </p>
            </div>
          </div>

        </div>

        <div className="tcl-takeaway">

          <span className="tcl-takeaway-label">
            KEY IDEA
          </span>

          <p>
            <strong>
              TCL is more than a scripting language in VLSI.
            </strong>
            It is a practical way to automate and control
            engineering tools and workflows.
          </p>

        </div>

      </LessonSection>

    </LessonPage>
  );
}

export default WhatIsTCL;