import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Loops() {
  const sections = [
    {
      id: "introduction",
      title: "TCL Loops"
    },
    {
      id: "for",
      title: "for Loop"
    },
    {
      id: "foreach",
      title: "foreach Loop"
    },
    {
      id: "while",
      title: "while Loop"
    },
    {
      id: "break-continue",
      title: "break and continue"
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
      title="TCL Loops"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="If / Else"
      previousPath="/tcl/if-else"
      nextLesson="Procedures"
      nextPath="/tcl/procedures"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Loops"
      >
        <p>
          Loops allow a TCL script to execute the same
          group of commands repeatedly.
        </p>

        <p>
          Loops are especially useful in VLSI automation
          because an EDA script may need to process many
          files, modules, ports, clocks, or design objects.
        </p>

        <LessonVisual
          type="tcl-loop-flow"
          caption="A loop repeatedly executes commands while its condition or collection allows"
        >
          <div className="tcl-loop-flow">

            <div className="tcl-loop-start">
              Start
            </div>

            <div className="tcl-loop-arrow">
              ↓
            </div>

            <div className="tcl-loop-condition">
              <span>Check</span>
              <strong>Condition</strong>
            </div>

            <div className="tcl-loop-branches">

              <div className="tcl-loop-branch">
                <span className="tcl-loop-yes">
                  YES
                </span>
                <div>
                  Execute commands
                </div>
              </div>

              <div className="tcl-loop-branch">
                <span className="tcl-loop-no">
                  NO
                </span>
                <div>
                  Exit loop
                </div>
              </div>

            </div>

            <div className="tcl-loop-repeat">
              ↻ Repeat
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          FOR LOOP
      ================================================== */}

      <LessonSection
        id="for"
        title="for Loop"
      >
        <p>
          The <code>for</code> loop is useful when the
          number of iterations is known or controlled by
          an initialization, condition, and update expression.
        </p>

        <CodeExample title="Basic for Loop">
{`for {set i 0} {$i < 5} {incr i} {
    puts "Iteration $i"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4`}
        </CodeExample>

        <LessonVisual
          type="tcl-for"
          caption="A for loop contains initialization, condition, and update"
        >
          <div className="tcl-for-visual">

            <div className="tcl-for-step">
              <span>1</span>
              <strong>Initialize</strong>
              <code>set i 0</code>
            </div>

            <div className="tcl-for-arrow">
              →
            </div>

            <div className="tcl-for-step">
              <span>2</span>
              <strong>Check</strong>
              <code>$i &lt; 5</code>
            </div>

            <div className="tcl-for-arrow">
              →
            </div>

            <div className="tcl-for-step">
              <span>3</span>
              <strong>Execute</strong>
              <code>puts ...</code>
            </div>

            <div className="tcl-for-arrow">
              →
            </div>

            <div className="tcl-for-step">
              <span>4</span>
              <strong>Update</strong>
              <code>incr i</code>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          FOREACH
      ================================================== */}

      <LessonSection
        id="foreach"
        title="foreach Loop"
      >
        <p>
          The <code>foreach</code> loop processes each
          element of a list one at a time.
        </p>

        <CodeExample title="foreach Example">
{`set modules {
    UART
    SPI
    I2C
    GPIO
}

foreach module $modules {
    puts "Checking $module"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Checking UART
Checking SPI
Checking I2C
Checking GPIO`}
        </CodeExample>

        <LessonVisual
          type="tcl-foreach"
          caption="foreach processes every item in a collection"
        >
          <div className="tcl-foreach-visual">

            <div className="tcl-foreach-list">
              <span>Modules</span>

              <div>
                UART
              </div>

              <div>
                SPI
              </div>

              <div>
                I2C
              </div>

              <div>
                GPIO
              </div>
            </div>

            <div className="tcl-foreach-arrow">
              →
            </div>

            <div className="tcl-foreach-result">
              <span>Process</span>
              <strong>One item at a time</strong>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Tip"
        >
          <code>foreach</code> is often easier to use than
          <code>for</code> when working directly with a list
          of design objects.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          WHILE
      ================================================== */}

      <LessonSection
        id="while"
        title="while Loop"
      >
        <p>
          The <code>while</code> loop continues executing
          commands as long as its condition remains true.
        </p>

        <CodeExample title="while Example">
{`set count 1

while {$count <= 4} {
    puts "Step $count"
    incr count
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Step 1
Step 2
Step 3
Step 4`}
        </CodeExample>

        <LearningNote
          type="warning"
          title="Important"
        >
          Make sure the condition eventually becomes false.
          Otherwise, the loop can continue indefinitely.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          BREAK AND CONTINUE
      ================================================== */}

      <LessonSection
        id="break-continue"
        title="break and continue"
      >
        <p>
          TCL provides <code>break</code> and
          <code>continue</code> to control loop execution.
        </p>

        <div className="tcl-loop-control-grid">

          <div className="tcl-loop-control-card">
            <code>break</code>
            <h3>Stop the loop</h3>
            <p>
              Immediately exits the current loop.
            </p>
          </div>

          <div className="tcl-loop-control-card">
            <code>continue</code>
            <h3>Skip an iteration</h3>
            <p>
              Skips the remaining commands in the current
              iteration and moves to the next one.
            </p>
          </div>

        </div>

        <CodeExample title="break Example">
{`for {set i 1} {$i <= 10} {incr i} {

    if {$i == 5} {
        break
    }

    puts "Value = $i"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Value = 1
Value = 2
Value = 3
Value = 4`}
        </CodeExample>

        <CodeExample title="continue Example">
{`for {set i 1} {$i <= 5} {incr i} {

    if {$i == 3} {
        continue
    }

    puts "Value = $i"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Value = 1
Value = 2
Value = 4
Value = 5`}
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
          Loops are commonly used in automation scripts to
          process multiple design objects.
        </p>

        <CodeExample title="Checking Design Modules">
{`set modules {
    CPU
    UART
    SPI
    GPIO
    TIMER
}

foreach module $modules {
    puts "Analyzing module: $module"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Analyzing module: CPU
Analyzing module: UART
Analyzing module: SPI
Analyzing module: GPIO
Analyzing module: TIMER`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Why This Matters in EDA"
        >
          Instead of writing the same command separately
          for every module, a loop can process the entire
          collection automatically.
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
          This example uses a loop to examine several
          clock frequencies and identify high-speed clocks.
        </p>

        <TryIt
          title="Try TCL Loops"
          language="TCL"
          initialCode={`# TCL Loop Practice

set frequencies {
    50
    75
    100
    125
    150
}

foreach frequency $frequencies {

    if {$frequency >= 100} {
        puts "$frequency MHz -> High-speed clock"
    } else {
        puts "$frequency MHz -> Standard clock"
    }
}`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Loops;