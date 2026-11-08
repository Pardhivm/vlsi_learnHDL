import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function BasicSyntax() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Basic Syntax"
    },
    {
      id: "commands",
      title: "TCL Commands"
    },
    {
      id: "variables",
      title: "Variables"
    },
    {
      id: "comments",
      title: "Comments"
    },
    {
      id: "substitution",
      title: "Command Substitution"
    },
    {
      id: "eda-example",
      title: "VLSI Example"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (

    <LessonPage
      title="TCL Basic Syntax"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="What is TCL?"
      previousPath="/tcl/what-is-tcl"
      nextLesson="Variables"
      nextPath="/tcl/variables"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Basic Syntax"
      >

        <p>
          TCL programs are built using commands.
          A command usually contains a command name
          followed by one or more arguments.
        </p>


        <LessonVisual
          type="tcl-syntax"
          caption="Basic TCL command structure"
        >

          <div className="tcl-syntax-visual">

            <div className="tcl-syntax-part tcl-command">
              <span className="tcl-syntax-label">
                Command
              </span>

              <strong>puts</strong>
            </div>

            <div className="tcl-syntax-arrow">
              →
            </div>

            <div className="tcl-syntax-part tcl-argument">
              <span className="tcl-syntax-label">
                Argument
              </span>

              <strong>"Hello TCL"</strong>
            </div>

          </div>

        </LessonVisual>


        <CodeExample title="Basic TCL Command">
{`puts "Hello TCL"`}
        </CodeExample>

      </LessonSection>


      {/* ==================================================
          COMMANDS
      ================================================== */}

      <LessonSection
        id="commands"
        title="TCL Commands"
      >

        <p>
          A TCL script is made up of commands.
          Each command performs a particular operation.
        </p>


        <CodeExample title="Example">
{`puts "Welcome to VLSI Learn"
set width 8
set height 4`}
        </CodeExample>


        <LearningNote
          type="info"
          title="Remember"
        >
          TCL commands are normally separated by a
          newline. A semicolon can also be used to
          separate commands on the same line.
        </LearningNote>


        <CodeExample title="Multiple Commands">
{`set width 8
set height 4
puts "Width = $width"
puts "Height = $height"`}
        </CodeExample>

      </LessonSection>


      {/* ==================================================
          VARIABLES
      ================================================== */}

      <LessonSection
        id="variables"
        title="Variables"
      >

        <p>
          TCL variables are created using the
          <code>set</code> command.
        </p>


        <CodeExample title="Creating Variables">
{`set width 8
set count 4
set module "UART"

puts $width
puts $count
puts $module`}
        </CodeExample>


        <LessonVisual
          type="tcl-variable"
          caption="TCL variable flow"
        >

          <div className="tcl-variable-flow">

            <div className="tcl-variable-box">
              <span>set</span>
              <strong>width</strong>
              <small>8</small>
            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box tcl-variable-memory">
              <span>Variable</span>
              <strong>width</strong>
              <small>8</small>
            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box">
              <span>puts</span>
              <strong>$width</strong>
              <small>Output: 8</small>
            </div>

          </div>

        </LessonVisual>


        <LearningNote
          type="tip"
          title="Important"
        >
          When you want to access the value stored in
          a TCL variable, use the <code>$</code> symbol.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          COMMENTS
      ================================================== */}

      <LessonSection
        id="comments"
        title="Comments"
      >

        <p>
          Comments are used to explain the purpose of
          a TCL script or a particular command.
        </p>


        <p>
          TCL uses <code>#</code> to begin a comment.
        </p>


        <CodeExample title="TCL Comments">
{`# This is a comment

set width 8

# Display the width
puts "Width = $width"`}
        </CodeExample>


        <LearningNote
          type="info"
          title="Tip"
        >
          Comments are especially useful in VLSI
          automation scripts because scripts can
          contain many commands.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          COMMAND SUBSTITUTION
      ================================================== */}

      <LessonSection
        id="substitution"
        title="Command Substitution"
      >

        <p>
          TCL uses square brackets <code>[ ]</code> to
          execute a command and use its result inside
          another command.
        </p>


        <CodeExample title="Command Substitution">
{`set width 8
set count 4

set total [expr $width * $count]

puts "Total = $total"`}
        </CodeExample>


        <LessonVisual
          type="tcl-substitution"
          caption="Command substitution in TCL"
        >

          <div className="tcl-substitution-flow">

            <div className="tcl-substitution-code">
              <code>[expr $width * $count]</code>
            </div>

            <div className="tcl-substitution-arrow">
              ↓
            </div>

            <div className="tcl-substitution-result">
              <span>Command result</span>
              <strong>32</strong>
            </div>

            <div className="tcl-substitution-arrow">
              ↓
            </div>

            <div className="tcl-substitution-final">
              <code>set total 32</code>
            </div>

          </div>

        </LessonVisual>


        <LearningNote
          type="tip"
          title="Remember"
        >
          The command inside <code>[ ]</code> is executed
          first, and its result is substituted into the
          surrounding command.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="eda-example"
        title="VLSI Example"
      >

        <p>
          TCL is widely used in EDA tools to automate
          hardware design tasks.
        </p>


        <CodeExample title="Simple VLSI-Style Example">
{`set design "UART"
set source_files 5

puts "Design = $design"
puts "Source files = $source_files"

set total [expr $source_files * 2]

puts "Processing units = $total"`}
        </CodeExample>


        <LearningNote
          type="vlsi"
          title="TCL in VLSI"
        >
          In real EDA tools, TCL commands can be used
          to read RTL files, create clocks, configure
          synthesis options, run analysis, and generate
          reports.
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
          Write and run your own TCL commands.
          The code is executed using the TCL interpreter
          on the VLSI Learn simulation server.
        </p>


        <TryIt
          title="Try TCL Basic Syntax"
          language="TCL"
          initialCode={`# TCL Basic Syntax

set width 8
set count 4

set total [expr $width * $count]

puts "Width = $width"
puts "Count = $count"
puts "Total = $total"`}
        />

      </LessonSection>

    </LessonPage>

  );
}

export default BasicSyntax;