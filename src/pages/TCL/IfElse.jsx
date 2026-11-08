import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function IfElse() {
  const sections = [
    {
      id: "introduction",
      title: "TCL If / Else"
    },
    {
      id: "if",
      title: "if Statement"
    },
    {
      id: "if-else",
      title: "if / else"
    },
    {
      id: "elseif",
      title: "if / elseif / else"
    },
    {
      id: "comparison",
      title: "Comparison Operators"
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
      title="TCL If / Else"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Arrays"
      previousPath="/tcl/arrays"
      nextLesson="Loops"
      nextPath="/tcl/loops"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL If / Else"
      >
        <p>
          Conditional statements allow a TCL script to
          make decisions based on a condition.
        </p>

        <p>
          The most commonly used conditional statements
          are <code>if</code>, <code>if / else</code>, and
          <code>if / elseif / else</code>.
        </p>

        <LessonVisual
          type="tcl-if-flow"
          caption="A conditional statement selects an action based on a condition"
        >
          <div className="tcl-if-flow">

            <div className="tcl-if-start">
              <span>Input</span>
              <strong>Condition</strong>
            </div>

            <div className="tcl-if-branches">

              <div className="tcl-if-branch">
                <span className="tcl-if-true">TRUE</span>
                <div className="tcl-if-action">
                  Execute Action A
                </div>
              </div>

              <div className="tcl-if-branch">
                <span className="tcl-if-false">FALSE</span>
                <div className="tcl-if-action">
                  Execute Action B
                </div>
              </div>

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          IF
      ================================================== */}

      <LessonSection
        id="if"
        title="if Statement"
      >
        <p>
          The <code>if</code> statement executes a block
          of code only when its condition is true.
        </p>

        <CodeExample title="Basic if Statement">
{`set frequency 100

if {$frequency >= 100} {
    puts "High-speed clock"
}`}
        </CodeExample>

        <p>
          The condition is written inside curly braces.
          The statements inside the braces execute when the
          condition evaluates to true.
        </p>

        <LessonVisual
          type="tcl-condition"
          caption="The action executes only when the condition is true"
        >
          <div className="tcl-condition-visual">

            <div className="tcl-condition-box">
              <code>$frequency &gt;= 100</code>
            </div>

            <div className="tcl-condition-arrow">
              ↓
            </div>

            <div className="tcl-condition-result">
              TRUE → Execute command
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          IF ELSE
      ================================================== */}

      <LessonSection
        id="if-else"
        title="if / else"
      >
        <p>
          The <code>else</code> block provides an
          alternative when the condition is false.
        </p>

        <CodeExample title="if / else Example">
{`set frequency 80

if {$frequency >= 100} {
    puts "High-speed clock"
} else {
    puts "Standard-speed clock"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Standard-speed clock`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Remember"
        >
          Only one of the two branches is executed:
          either the <code>if</code> block or the
          <code>else</code> block.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          ELSEIF
      ================================================== */}

      <LessonSection
        id="elseif"
        title="if / elseif / else"
      >
        <p>
          When there are multiple possible conditions,
          TCL allows you to use <code>elseif</code>.
        </p>

        <CodeExample title="Multiple Conditions">
{`set utilization 72

if {$utilization >= 90} {
    puts "Critical utilization"
} elseif {$utilization >= 70} {
    puts "High utilization"
} elseif {$utilization >= 40} {
    puts "Normal utilization"
} else {
    puts "Low utilization"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`High utilization`}
        </CodeExample>

        <LessonVisual
          type="tcl-elseif"
          caption="TCL checks conditions from top to bottom"
        >
          <div className="tcl-elseif-visual">

            <div className="tcl-elseif-step">
              <span>1</span>
              <code>$utilization &gt;= 90</code>
              <strong>?</strong>
            </div>

            <div className="tcl-elseif-step">
              <span>2</span>
              <code>$utilization &gt;= 70</code>
              <strong>?</strong>
            </div>

            <div className="tcl-elseif-step">
              <span>3</span>
              <code>$utilization &gt;= 40</code>
              <strong>?</strong>
            </div>

            <div className="tcl-elseif-step final">
              <span>4</span>
              <strong>else</strong>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          COMPARISON OPERATORS
      ================================================== */}

      <LessonSection
        id="comparison"
        title="Comparison Operators"
      >
        <p>
          Conditions commonly use comparison operators to
          compare numbers or values.
        </p>

        <div className="tcl-if-operator-grid">

          <div className="tcl-if-operator-card">
            <code>==</code>
            <span>Equal to</span>
          </div>

          <div className="tcl-if-operator-card">
            <code>!=</code>
            <span>Not equal to</span>
          </div>

          <div className="tcl-if-operator-card">
            <code>&gt;</code>
            <span>Greater than</span>
          </div>

          <div className="tcl-if-operator-card">
            <code>&lt;</code>
            <span>Less than</span>
          </div>

          <div className="tcl-if-operator-card">
            <code>&gt;=</code>
            <span>Greater than or equal</span>
          </div>

          <div className="tcl-if-operator-card">
            <code>&lt;=</code>
            <span>Less than or equal</span>
          </div>

        </div>

        <CodeExample title="Comparison Example">
{`set voltage 1.0

if {$voltage == 1.0} {
    puts "Voltage is correct"
}`}
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
          Conditional statements are useful in EDA scripts
          when different actions are required depending on
          design conditions.
        </p>

        <CodeExample title="Timing Check">
{`set slack -0.25

if {$slack < 0} {
    puts "Timing violation detected"
} elseif {$slack == 0} {
    puts "Timing requirement met"
} else {
    puts "Positive timing slack"
}`}
        </CodeExample>

        <CodeExample title="Output">
{`Timing violation detected`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Why This Matters in EDA"
        >
          TCL scripts can inspect values such as timing
          slack, utilization, clock frequency, and resource
          usage and then perform different automation steps.
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
          Try changing the slack value and observe how the
          TCL script selects a different result.
        </p>

        <TryIt
          title="Try TCL If / Else"
          language="TCL"
          initialCode={`# TCL Timing Check

set slack -0.18

if {$slack < -0.5} {
    puts "Severe timing violation"
} elseif {$slack < 0} {
    puts "Timing violation detected"
} elseif {$slack == 0} {
    puts "Timing requirement exactly met"
} else {
    puts "Timing requirement satisfied"
}`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default IfElse;