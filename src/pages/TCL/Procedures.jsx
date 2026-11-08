import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Procedures() {
  const sections = [
    {
      id: "introduction",
      title: "TCL Procedures"
    },
    {
      id: "creating",
      title: "Creating a Procedure"
    },
    {
      id: "parameters",
      title: "Parameters"
    },
    {
      id: "return",
      title: "Return Values"
    },
    {
      id: "scope",
      title: "Variable Scope"
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
      title="TCL Procedures"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Loops"
      previousPath="/tcl/loops"
      nextLesson="File Handling"
      nextPath="/tcl/file-handling"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Procedures"
      >
        <p>
          A procedure is a reusable block of TCL commands
          that performs a specific task.
        </p>

        <p>
          Procedures help make large scripts easier to
          organize, reuse, and maintain.
        </p>

        <LessonVisual
          type="tcl-procedure-flow"
          caption="A procedure accepts inputs, performs operations, and can return a result"
        >
          <div className="tcl-procedure-flow">

            <div className="tcl-procedure-input">
              <span>Input</span>
              <strong>Arguments</strong>
            </div>

            <div className="tcl-procedure-arrow">
              →
            </div>

            <div className="tcl-procedure-block">
              <span>Procedure</span>
              <strong>Reusable Commands</strong>
            </div>

            <div className="tcl-procedure-arrow">
              →
            </div>

            <div className="tcl-procedure-output">
              <span>Output</span>
              <strong>Result</strong>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          CREATING
      ================================================== */}

      <LessonSection
        id="creating"
        title="Creating a Procedure"
      >
        <p>
          TCL procedures are created using the
          <code>proc</code> command.
        </p>

        <CodeExample title="Basic Procedure">
{`proc greet {} {
    puts "Welcome to TCL"
}

greet`}
        </CodeExample>

        <CodeExample title="Output">
{`Welcome to TCL`}
        </CodeExample>

        <p>
          The general structure is:
        </p>

        <CodeExample title="Procedure Syntax">
{`proc procedureName {arguments} {
    commands
}`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Important"
        >
          Defining a procedure does not execute it.
          The procedure runs when you call its name.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          PARAMETERS
      ================================================== */}

      <LessonSection
        id="parameters"
        title="Procedure Parameters"
      >
        <p>
          Procedures can accept arguments so that the same
          procedure can work with different input values.
        </p>

        <CodeExample title="Procedure with Parameters">
{`proc addNumbers {a b} {
    return [expr $a + $b]
}

set result [addNumbers 12 8]

puts "Result = $result"`}
        </CodeExample>

        <CodeExample title="Output">
{`Result = 20`}
        </CodeExample>

        <LessonVisual
          type="tcl-procedure-parameters"
          caption="Arguments are passed into the procedure"
        >
          <div className="tcl-procedure-parameters">

            <div className="tcl-parameter">
              <span>Argument 1</span>
              <strong>12</strong>
            </div>

            <div className="tcl-parameter-plus">
              +
            </div>

            <div className="tcl-parameter">
              <span>Argument 2</span>
              <strong>8</strong>
            </div>

            <div className="tcl-parameter-arrow">
              →
            </div>

            <div className="tcl-parameter-result">
              <span>Procedure Result</span>
              <strong>20</strong>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          RETURN
      ================================================== */}

      <LessonSection
        id="return"
        title="Return Values"
      >
        <p>
          The <code>return</code> command sends a value
          back to the code that called the procedure.
        </p>

        <CodeExample title="Returning a Value">
{`proc calculatePower {voltage current} {

    set power [expr $voltage * $current]

    return $power
}

set result [calculatePower 5 2]

puts "Power = $result W"`}
        </CodeExample>

        <CodeExample title="Output">
{`Power = 10 W`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Tip"
        >
          Using <code>return</code> makes procedures useful
          for calculations and reusable automation tasks.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          SCOPE
      ================================================== */}

      <LessonSection
        id="scope"
        title="Variable Scope"
      >
        <p>
          Variables created inside a procedure are normally
          local to that procedure.
        </p>

        <CodeExample title="Local Variable">
{`proc showValue {} {

    set value 100

    puts "Inside procedure: $value"
}

showValue`}
        </CodeExample>

        <p>
          If a procedure needs to access a variable from the
          surrounding scope, TCL provides the
          <code>global</code> command.
        </p>

        <CodeExample title="Global Variable">
{`set clock_period 10

proc showClock {} {

    global clock_period

    puts "Clock period = $clock_period"
}

showClock`}
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
          Procedures are very useful in EDA automation.
          A frequently used operation can be written once
          and called multiple times.
        </p>

        <CodeExample title="Clock Report Procedure">
{`proc reportClock {name period} {

    puts "Clock Name   = $name"
    puts "Clock Period = $period ns"
    puts "------------------------"
}

reportClock "clk_main" 10
reportClock "clk_bus" 20`}
        </CodeExample>

        <CodeExample title="Output">
{`Clock Name   = clk_main
Clock Period = 10 ns
------------------------
Clock Name   = clk_bus
Clock Period = 20 ns
------------------------`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Why This Matters in EDA"
        >
          Large VLSI scripts often contain repeated
          operations. Procedures allow these operations to
          be packaged into reusable commands.
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
          Create a reusable procedure that calculates the
          total number of bits in a group of registers.
        </p>

        <TryIt
          title="Try TCL Procedures"
          language="TCL"
          initialCode={`# TCL Procedure Practice

proc registerBits {registers width} {

    set total [expr $registers * $width]

    return $total
}

set registers 8
set width 32

set total_bits [registerBits $registers $width]

puts "Registers = $registers"
puts "Bits per register = $width"
puts "Total bits = $total_bits"`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Procedures;