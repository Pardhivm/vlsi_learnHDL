import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Variables() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Variables"
    },
    {
      id: "creating",
      title: "Creating Variables"
    },
    {
      id: "accessing",
      title: "Accessing Variables"
    },
    {
      id: "changing",
      title: "Changing Variables"
    },
    {
      id: "multiple",
      title: "Multiple Variables"
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
      title="TCL Variables"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Basic Syntax"
      previousPath="/tcl/basic-syntax"
      nextLesson="Commands"
      nextPath="/tcl/commands"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Variables"
      >

        <p>
          Variables are used to store values in a TCL
          script. A variable can contain numbers, text,
          or other types of data.
        </p>

        <LessonVisual
          type="tcl-variable"
          caption="A TCL variable stores a value that can be used later"
        >

          <div className="tcl-variable-flow">

            <div className="tcl-variable-box">

              <span>Variable</span>

              <strong>width</strong>

            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box tcl-variable-memory">

              <span>Stored Value</span>

              <strong>8</strong>

            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box">

              <span>Used as</span>

              <strong>$width</strong>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          CREATING VARIABLES
      ================================================== */}

      <LessonSection
        id="creating"
        title="Creating Variables"
      >

        <p>
          In TCL, variables are created using the
          <code>set</code> command.
        </p>

        <CodeExample title="Creating Variables">
{`set width 8
set count 4
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
          to a variable.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          ACCESSING VARIABLES
      ================================================== */}

      <LessonSection
        id="accessing"
        title="Accessing Variables"
      >

        <p>
          To access the value stored in a variable,
          use the <code>$</code> symbol before its name.
        </p>

        <CodeExample title="Accessing a Variable">
{`set width 8

puts $width`}
        </CodeExample>

        <p>
          The output will be:
        </p>

        <CodeExample title="Output">
{`8`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Important"
        >
          <code>width</code> refers to the variable name,
          while <code>$width</code> refers to the value
          stored in that variable.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          CHANGING VARIABLES
      ================================================== */}

      <LessonSection
        id="changing"
        title="Changing Variables"
      >

        <p>
          A variable's value can be changed simply by
          using the <code>set</code> command again.
        </p>

        <CodeExample title="Changing a Variable">
{`set width 8

puts "Initial width = $width"

set width 16

puts "New width = $width"`}
        </CodeExample>

        <LessonVisual
          type="tcl-variable"
          caption="The value of a TCL variable can be updated"
        >

          <div className="tcl-variable-flow">

            <div className="tcl-variable-box">

              <span>First value</span>

              <strong>width = 8</strong>

            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box tcl-variable-memory">

              <span>set width</span>

              <strong>16</strong>

            </div>

            <div className="tcl-variable-arrow">
              →
            </div>

            <div className="tcl-variable-box">

              <span>New value</span>

              <strong>$width = 16</strong>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          MULTIPLE VARIABLES
      ================================================== */}

      <LessonSection
        id="multiple"
        title="Using Multiple Variables"
      >

        <p>
          TCL allows you to create and use multiple
          variables in the same script.
        </p>

        <CodeExample title="Multiple Variables">
{`set width 8
set height 4
set depth 2

puts "Width  = $width"
puts "Height = $height"
puts "Depth  = $depth"`}
        </CodeExample>

        <p>
          Variables can also be used in expressions.
        </p>

        <CodeExample title="Using Variables in an Expression">
{`set width 8
set count 4

set total [expr $width * $count]

puts "Total = $total"`}
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
          TCL variables are very useful in VLSI
          automation scripts because design parameters
          can be stored and reused.
        </p>

        <CodeExample title="VLSI-Style Example">
{`set design "UART"
set top_module "uart_top"
set clock_period 10
set source_count 5

puts "Design       = $design"
puts "Top Module   = $top_module"
puts "Clock Period = $clock_period ns"
puts "Sources      = $source_count"`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Why Variables Matter in VLSI"
        >
          Variables allow automation scripts to store
          project names, file paths, clock periods,
          module names, tool settings, and other design
          parameters.
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
          Create variables, change their values, and
          use them in TCL expressions.
        </p>

        <TryIt
          title="Try TCL Variables"
          language="TCL"
          initialCode={`# TCL Variables

set width 8
set count 4

puts "Width = $width"
puts "Count = $count"

set total [expr $width * $count]

puts "Total = $total"`}
        />

      </LessonSection>

    </LessonPage>

  );
}

export default Variables;