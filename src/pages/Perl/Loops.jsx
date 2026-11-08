import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Loops() {
  const sections = [
    { id: "introduction", title: "Loops in Perl" },
    { id: "while", title: "while Loop" },
    { id: "until", title: "until Loop" },
    { id: "for", title: "for Loop" },
    { id: "foreach", title: "foreach Loop" },
    { id: "nested", title: "Nested Loops" },
    { id: "control", title: "Loop Control" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Loops"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="If / Else"
      previousPath="/perl/if-else"
      nextLesson="Subroutines"
      nextPath="/perl/subroutines"
    >
      <LessonSection title="Loops in Perl" id="introduction">
        <p>
          Loops allow a Perl program to execute the same block of code
          repeatedly. They are useful when processing arrays, files, test
          cases, or repeated design operations.
        </p>

        <LessonVisual
          type="custom"
          caption="A loop repeats a block of instructions until its condition changes."
        >
          <div className="perl-loop-cycle">
            <div className="perl-loop-start">
              <span>Start</span>
              <strong>Initialize</strong>
            </div>

            <div className="perl-loop-arrow">→</div>

            <div className="perl-loop-check">
              <span>Condition</span>
              <strong>TRUE?</strong>
            </div>

            <div className="perl-loop-arrow">→</div>

            <div className="perl-loop-action">
              <span>Execute</span>
              <strong>Code</strong>
            </div>

            <div className="perl-loop-return">↺ Repeat</div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl provides several loop structures, including
          <code>while</code>, <code>until</code>, <code>for</code>, and
          <code>foreach</code>.
        </LearningNote>
      </LessonSection>

      <LessonSection title="while Loop" id="while">
        <p>
          A <code>while</code> loop continues executing as long as its
          condition remains true.
        </p>

        <CodeExample title="while Loop Example">
{`my $count = 1;

while ($count <= 5) {
    print "Count = $count\\n";
    $count++;
}`}
        </CodeExample>

        <div className="perl-loop-number-flow">
          <div>1</div>
          <span>→</span>
          <div>2</div>
          <span>→</span>
          <div>3</div>
          <span>→</span>
          <div>4</div>
          <span>→</span>
          <div>5</div>
          <span>→</span>
          <strong>Stop</strong>
        </div>
      </LessonSection>

      <LessonSection title="until Loop" id="until">
        <p>
          An <code>until</code> loop continues executing until its condition
          becomes true. It is useful when the stopping condition is easier
          to express directly.
        </p>

        <CodeExample title="until Loop Example">
{`my $count = 1;

until ($count > 5) {
    print "Count = $count\\n";
    $count++;
}`}
        </CodeExample>

        <div className="perl-until-visual">
          <div>
            <span>Current Value</span>
            <strong>$count</strong>
          </div>

          <div className="perl-until-condition">
            <span>Stop when</span>
            <strong>$count &gt; 5</strong>
          </div>

          <div>
            <span>Action</span>
            <strong>Repeat</strong>
          </div>
        </div>

        <LearningNote type="tip" title="Tip">
          <code>while</code> repeats while a condition is true.
          <code>until</code> repeats while a condition is false.
        </LearningNote>
      </LessonSection>

      <LessonSection title="for Loop" id="for">
        <p>
          A <code>for</code> loop is useful when the initialization, condition,
          and update operation can be written together.
        </p>

        <CodeExample title="for Loop Example">
{`for (my $i = 0; $i < 5; $i++) {
    print "Index = $i\\n";
}`}
        </CodeExample>

        <div className="perl-for-structure">
          <div>
            <span>Initialization</span>
            <strong>my $i = 0</strong>
          </div>

          <div>→</div>

          <div>
            <span>Condition</span>
            <strong>$i &lt; 5</strong>
          </div>

          <div>→</div>

          <div>
            <span>Update</span>
            <strong>$i++</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="foreach Loop" id="foreach">
        <p>
          The <code>foreach</code> loop is especially convenient for
          processing every element in an array.
        </p>

        <CodeExample title="foreach Example">
{`my @modules = ("UART", "SPI", "I2C", "GPIO");

foreach my $module (@modules) {
    print "Module: $module\\n";
}`}
        </CodeExample>

        <LessonVisual
          type="custom"
          caption="foreach processes each array element one at a time."
        >
          <div className="perl-foreach-flow">
            <div className="perl-foreach-array">
              <span>Array</span>
              <strong>UART</strong>
              <strong>SPI</strong>
              <strong>I2C</strong>
              <strong>GPIO</strong>
            </div>

            <div className="perl-foreach-arrow">→</div>

            <div className="perl-foreach-current">
              <span>Current Element</span>
              <strong>$module</strong>
            </div>
          </div>
        </LessonVisual>
      </LessonSection>

      <LessonSection title="Nested Loops" id="nested">
        <p>
          A nested loop is a loop placed inside another loop. This is useful
          when processing rows and columns or multiple levels of data.
        </p>

        <CodeExample title="Nested Loop Example">
{`for (my $row = 1; $row <= 2; $row++) {
    for (my $col = 1; $col <= 3; $col++) {
        print "Row $row, Column $col\\n";
    }
}`}
        </CodeExample>

        <div className="perl-nested-grid">
          <div>R1 C1</div>
          <div>R1 C2</div>
          <div>R1 C3</div>
          <div>R2 C1</div>
          <div>R2 C2</div>
          <div>R2 C3</div>
        </div>
      </LessonSection>

      <LessonSection title="Loop Control" id="control">
        <p>
          Perl provides <code>last</code> and <code>next</code> to control
          loop execution.
        </p>

        <div className="perl-control-grid">
          <div>
            <strong>last</strong>
            <span>Immediately exits the loop.</span>
          </div>

          <div>
            <strong>next</strong>
            <span>Skips to the next iteration.</span>
          </div>
        </div>

        <CodeExample title="last Example">
{`for (my $i = 1; $i <= 10; $i++) {

    if ($i == 5) {
        last;
    }

    print "$i\\n";
}`}
        </CodeExample>

        <CodeExample title="next Example">
{`for (my $i = 1; $i <= 5; $i++) {

    if ($i == 3) {
        next;
    }

    print "$i\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Loops are very useful in VLSI automation. A script can iterate
          through modules, timing paths, test cases, source files, or design
          stages.
        </p>

        <LessonVisual
          type="custom"
          caption="A loop can process every stage in a VLSI design flow."
        >
          <div className="perl-vlsi-loop">
            <div>
              <small>1</small>
              <strong>RTL</strong>
            </div>

            <span>→</span>

            <div>
              <small>2</small>
              <strong>Synthesis</strong>
            </div>

            <span>→</span>

            <div>
              <small>3</small>
              <strong>Timing</strong>
            </div>

            <span>→</span>

            <div>
              <small>4</small>
              <strong>Report</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Flow Loop">
{`my @stages = (
    "RTL",
    "Synthesis",
    "Timing",
    "Report"
);

foreach my $stage (@stages) {
    print "Running stage: $stage\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Use the editor to simulate a simple VLSI verification flow. Each
          test case is processed using a loop.
        </p>

        <TryIt
          title="Try Perl Loops"
          language="Perl"
          initialCode={`use strict;
use warnings;

my @tests = (
    "Reset Test",
    "UART TX Test",
    "UART RX Test",
    "Loopback Test"
);

print "VERIFICATION TESTS\\n";
print "==================\\n";

my $count = 1;

foreach my $test (@tests) {
    print "Test $count : $test\\n";
    $count++;
}

print "\\nTotal Tests: " . scalar(@tests) . "\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Loops;