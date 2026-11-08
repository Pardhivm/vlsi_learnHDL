import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function IfElse() {
  const sections = [
    { id: "introduction", title: "If / Else in Perl" },
    { id: "if", title: "if Statement" },
    { id: "if-else", title: "if / else" },
    { id: "elsif", title: "elsif" },
    { id: "nested", title: "Nested Conditions" },
    { id: "logical", title: "Multiple Conditions" },
    { id: "unless", title: "unless Statement" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl If / Else"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Hashes"
      previousPath="/perl/hashes"
      nextLesson="Loops"
      nextPath="/perl/loops"
    >
      <LessonSection title="If / Else in Perl" id="introduction">
        <p>
          Conditional statements allow a Perl program to make decisions.
          A block of code can be executed only when a particular condition
          is true.
        </p>

        <LessonVisual
          type="custom"
          caption="A condition determines which path the program follows."
        >
          <div className="perl-if-flow">
            <div className="perl-if-start">
              <span>Input</span>
              <strong>Condition</strong>
            </div>

            <div className="perl-if-branch">
              <div className="perl-if-path">
                <span>TRUE</span>
                <strong>Execute A</strong>
              </div>

              <div className="perl-if-path">
                <span>FALSE</span>
                <strong>Execute B</strong>
              </div>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl uses <code>if</code>, <code>elsif</code>, and <code>else</code>
          to create conditional logic.
        </LearningNote>
      </LessonSection>

      <LessonSection title="if Statement" id="if">
        <p>
          The <code>if</code> statement executes a block of code when its
          condition evaluates to true.
        </p>

        <CodeExample title="Basic if Statement">
{`my $frequency = 100;

if ($frequency >= 100) {
    print "Frequency requirement satisfied\\n";
}`}
        </CodeExample>

        <div className="perl-condition-card">
          <div>
            <span>Condition</span>
            <strong>$frequency &gt;= 100</strong>
          </div>

          <div className="perl-condition-arrow">→</div>

          <div className="perl-condition-result">
            <span>True</span>
            <strong>Execute block</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="if / else" id="if-else">
        <p>
          The <code>else</code> block executes when the <code>if</code>
          condition is false.
        </p>

        <LessonVisual
          type="custom"
          caption="if executes one path, while else handles the opposite condition."
        >
          <div className="perl-ifelse-diagram">
            <div className="perl-ifelse-condition">
              <span>Condition</span>
              <strong>Timing OK?</strong>
            </div>

            <div className="perl-ifelse-lines">
              <div>
                <small>YES</small>
                <strong>PASS</strong>
              </div>

              <div>
                <small>NO</small>
                <strong>FAIL</strong>
              </div>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="if / else Example">
{`my $slack = 2;

if ($slack >= 0) {
    print "Timing PASS\\n";
} else {
    print "Timing FAIL\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="elsif" id="elsif">
        <p>
          Use <code>elsif</code> when multiple conditions need to be checked
          one after another.
        </p>

        <CodeExample title="elsif Example">
{`my $frequency = 80;

if ($frequency >= 100) {
    print "High frequency\\n";
} elsif ($frequency >= 50) {
    print "Medium frequency\\n";
} else {
    print "Low frequency\\n";
}`}
        </CodeExample>

        <div className="perl-elsif-levels">
          <div>
            <small>Condition 1</small>
            <strong>≥ 100 MHz</strong>
            <span>High</span>
          </div>

          <div>
            <small>Condition 2</small>
            <strong>≥ 50 MHz</strong>
            <span>Medium</span>
          </div>

          <div>
            <small>Otherwise</small>
            <strong>&lt; 50 MHz</strong>
            <span>Low</span>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Nested Conditions" id="nested">
        <p>
          An <code>if</code> statement can be placed inside another
          <code>if</code> statement. This is called a nested condition.
        </p>

        <CodeExample title="Nested if Example">
{`my $timing_ok = 1;
my $power_ok = 1;

if ($timing_ok) {
    if ($power_ok) {
        print "Design checks passed\\n";
    }
}`}
        </CodeExample>

        <div className="perl-nested-flow">
          <div>
            <span>Check 1</span>
            <strong>Timing</strong>
          </div>

          <span>→</span>

          <div>
            <span>Check 2</span>
            <strong>Power</strong>
          </div>

          <span>→</span>

          <div className="perl-nested-result">
            <span>Result</span>
            <strong>PASS</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Multiple Conditions" id="logical">
        <p>
          Logical operators can combine multiple conditions inside an
          <code>if</code> statement.
        </p>

        <div className="perl-condition-chain">
          <div>
            <strong>Timing OK</strong>
          </div>

          <span>&amp;&amp;</span>

          <div>
            <strong>Power OK</strong>
          </div>

          <span>→</span>

          <div className="perl-condition-final">
            <strong>Design PASS</strong>
          </div>
        </div>

        <CodeExample title="Multiple Conditions">
{`my $timing_ok = 1;
my $power_ok = 1;

if ($timing_ok && $power_ok) {
    print "Design checks passed\\n";
} else {
    print "Design checks failed\\n";
}`}
        </CodeExample>

        <LearningNote type="tip" title="Tip">
          Use <code>&amp;&amp;</code> when all required conditions must be
          true. Use <code>||</code> when at least one condition can be true.
        </LearningNote>
      </LessonSection>

      <LessonSection title="unless Statement" id="unless">
        <p>
          The <code>unless</code> statement executes its block when the
          condition is false. It can be useful when you want to express
          an exception or failure condition directly.
        </p>

        <CodeExample title="unless Example">
{`my $error = 0;

unless ($error) {
    print "Design completed without errors\\n";
}`}
        </CodeExample>

        <div className="perl-unless-visual">
          <div>
            <span>Condition</span>
            <strong>Error?</strong>
          </div>

          <div className="perl-unless-symbol">NO →</div>

          <div className="perl-unless-result">
            <span>Action</span>
            <strong>Continue</strong>
          </div>
        </div>

        <LearningNote type="warning" title="Note">
          <code>unless</code> is essentially the opposite form of
          <code>if</code>. Use it when the false condition is the natural
          condition to express.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Conditional statements are commonly used in automation scripts to
          check timing results, tool status, file availability, and design
          conditions.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl script can use conditions to decide whether a design passes a check."
        >
          <div className="perl-vlsi-check">
            <div>
              <span>Required Slack</span>
              <strong>0 ns</strong>
            </div>

            <div className="perl-vlsi-check-arrow">←</div>

            <div className="perl-vlsi-slack">
              <span>Measured Slack</span>
              <strong>1.4 ns</strong>
            </div>

            <div className="perl-vlsi-check-arrow">→</div>

            <div className="perl-vlsi-result">
              <span>Status</span>
              <strong>PASS</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Timing Check">
{`my $slack = 1.4;

if ($slack > 0) {
    print "Timing PASS\\n";
} elsif ($slack == 0) {
    print "Timing meets the limit\\n";
} else {
    print "Timing FAIL\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try changing the timing, power, and area values to see how the
          conditional logic changes the design status.
        </p>

        <TryIt
          title="Try Perl If / Else"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $slack = 1.2;
my $power = 82;
my $area = 450;

print "DESIGN CHECK\\n";
print "============\\n";

if ($slack >= 0 && $power <= 100 && $area <= 500) {
    print "Timing : PASS\\n";
    print "Power  : PASS\\n";
    print "Area   : PASS\\n";
    print "Status : DESIGN PASS\\n";
} else {
    print "Status : DESIGN CHECK FAILED\\n";
}`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default IfElse;