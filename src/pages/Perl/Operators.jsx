import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Operators() {
  const sections = [
    { id: "introduction", title: "Operators in Perl" },
    { id: "arithmetic", title: "Arithmetic Operators" },
    { id: "assignment", title: "Assignment Operators" },
    { id: "comparison", title: "Comparison Operators" },
    { id: "logical", title: "Logical Operators" },
    { id: "string", title: "String Operators" },
    { id: "increment", title: "Increment & Decrement" },
    { id: "bitwise", title: "Bitwise Operators" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Operators"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Data Types"
      previousPath="/perl/data-types"
      nextLesson="Strings"
      nextPath="/perl/strings"
    >
      <LessonSection title="Operators in Perl" id="introduction">
        <p>
          Operators are symbols or keywords used to perform operations on
          values and variables.
        </p>

        <LessonVisual
          type="custom"
          caption="Operators connect values and perform calculations or comparisons."
        >
          <div className="perl-operator-flow">
            <div className="perl-operator-box">
              <span>Value A</span>
              <strong>8</strong>
            </div>

            <div className="perl-operator-symbol">+</div>

            <div className="perl-operator-box">
              <span>Value B</span>
              <strong>4</strong>
            </div>

            <div className="perl-operator-arrow">→</div>

            <div className="perl-operator-result">
              <span>Result</span>
              <strong>12</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl provides operators for arithmetic, comparison, logic,
          strings, assignment, and bit-level operations.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Arithmetic Operators" id="arithmetic">
        <p>
          Arithmetic operators are used for mathematical calculations.
        </p>

        <div className="perl-operator-table">
          <div className="perl-operator-row perl-operator-header">
            <span>Operator</span>
            <span>Meaning</span>
            <span>Example</span>
          </div>

          <div className="perl-operator-row">
            <span>+</span>
            <span>Addition</span>
            <span>$a + $b</span>
          </div>

          <div className="perl-operator-row">
            <span>-</span>
            <span>Subtraction</span>
            <span>$a - $b</span>
          </div>

          <div className="perl-operator-row">
            <span>*</span>
            <span>Multiplication</span>
            <span>$a * $b</span>
          </div>

          <div className="perl-operator-row">
            <span>/</span>
            <span>Division</span>
            <span>$a / $b</span>
          </div>

          <div className="perl-operator-row">
            <span>%</span>
            <span>Remainder</span>
            <span>$a % $b</span>
          </div>

          <div className="perl-operator-row">
            <span>**</span>
            <span>Exponentiation</span>
            <span>$a ** $b</span>
          </div>
        </div>

        <CodeExample title="Arithmetic Example">
{`my $width = 8;
my $count = 4;

my $total = $width * $count;
my $remaining = $total % 7;

print "Total bits = $total\\n";
print "Remainder  = $remaining\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Assignment Operators" id="assignment">
        <p>
          Assignment operators store values in variables. Perl also provides
          combined assignment operators for modifying an existing value.
        </p>

        <LessonVisual
          type="custom"
          caption="Assignment operators update the value stored in a variable."
        >
          <div className="perl-assignment-flow">
            <div className="perl-assignment-card">
              <span>Initial</span>
              <strong>$count = 10</strong>
            </div>

            <div className="perl-assignment-operation">
              <span>+= 5</span>
              <b>→</b>
            </div>

            <div className="perl-assignment-card active">
              <span>Updated</span>
              <strong>$count = 15</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Assignment Example">
{`my $count = 10;

$count += 5;
print "Count = $count\\n";

$count *= 2;
print "Count = $count\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Comparison Operators" id="comparison">
        <p>
          Comparison operators compare two values and produce a true or false
          result.
        </p>

        <div className="perl-comparison-grid">
          <div><strong>==</strong><span>Equal</span></div>
          <div><strong>!=</strong><span>Not equal</span></div>
          <div><strong>&gt;</strong><span>Greater than</span></div>
          <div><strong>&lt;</strong><span>Less than</span></div>
          <div><strong>&gt;=</strong><span>Greater or equal</span></div>
          <div><strong>&lt;=</strong><span>Less or equal</span></div>
        </div>

        <CodeExample title="Comparison Example">
{`my $required = 100;
my $actual = 120;

if ($actual >= $required) {
    print "Timing requirement satisfied\\n";
} else {
    print "Timing requirement not satisfied\\n";
}`}
        </CodeExample>

        <LearningNote type="warning" title="Important">
          For numeric values, use operators such as <code>==</code> and
          <code>!=</code>. Perl also provides separate string comparison
          operators.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Logical Operators" id="logical">
        <p>
          Logical operators combine multiple conditions.
        </p>

        <div className="perl-logic-chain">
          <div>Timing OK</div>
          <span>AND</span>
          <div>Power OK</div>
          <span>→</span>
          <strong>Design Ready</strong>
        </div>

        <CodeExample title="Logical Example">
{`my $timing_ok = 1;
my $power_ok = 1;

if ($timing_ok && $power_ok) {
    print "Design is ready\\n";
}`}
        </CodeExample>

        <div className="perl-logic-list">
          <div>
            <strong>&amp;&amp;</strong>
            <span>Logical AND</span>
          </div>
          <div>
            <strong>||</strong>
            <span>Logical OR</span>
          </div>
          <div>
            <strong>!</strong>
            <span>Logical NOT</span>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="String Operators" id="string">
        <p>
          Perl provides operators specifically for working with text.
        </p>

        <div className="perl-string-visual">
          <div>UART</div>
          <span>.</span>
          <div>Controller</div>
          <b>→</b>
          <strong>UARTController</strong>
        </div>

        <CodeExample title="String Concatenation">
{`my $module = "UART";
my $block = "Controller";

my $name = $module . $block;

print "Module = $name\\n";`}
        </CodeExample>

        <LearningNote type="tip" title="Tip">
          The <code>.</code> operator concatenates strings, while
          <code>.=</code> appends text to an existing string.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Increment & Decrement" id="increment">
        <p>
          The <code>++</code> operator increases a value by one, while
          <code>--</code> decreases it by one.
        </p>

        <div className="perl-counter-visual">
          <div>
            <span>Before</span>
            <strong>4</strong>
          </div>

          <div className="perl-counter-arrow">++ →</div>

          <div className="highlight">
            <span>After</span>
            <strong>5</strong>
          </div>
        </div>

        <CodeExample title="Counter Example">
{`my $counter = 4;

$counter++;
print "Counter = $counter\\n";

$counter--;
print "Counter = $counter\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Bitwise Operators" id="bitwise">
        <p>
          Bitwise operators work directly on the individual bits of integer
          values. They are useful when working with registers, masks, and
          hardware-oriented data.
        </p>

        <div className="perl-bitwise-visual">
          <div className="perl-bitwise-number">
            <span>Value A</span>
            <strong>1010</strong>
          </div>

          <div className="perl-bitwise-operation">
            <span>&amp;</span>
            <small>AND</small>
          </div>

          <div className="perl-bitwise-number">
            <span>Mask</span>
            <strong>1100</strong>
          </div>

          <div className="perl-bitwise-result">
            <span>Result</span>
            <strong>1000</strong>
          </div>
        </div>

        <div className="perl-bitwise-list">
          <div>
            <strong>&amp;</strong>
            <span>Bitwise AND</span>
          </div>
          <div>
            <strong>|</strong>
            <span>Bitwise OR</span>
          </div>
          <div>
            <strong>^</strong>
            <span>Bitwise XOR</span>
          </div>
          <div>
            <strong>&lt;&lt;</strong>
            <span>Left shift</span>
          </div>
          <div>
            <strong>&gt;&gt;</strong>
            <span>Right shift</span>
          </div>
        </div>

        <CodeExample title="Bit Mask Example">
{`my $value = 10;
my $mask  = 12;

my $result = $value & $mask;

print "Value  = $value\\n";
print "Mask   = $mask\\n";
print "Result = $result\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Operators are especially useful in hardware automation scripts.
          For example, Perl can calculate the total number of bits in a
          register bank and check whether a design meets a requirement.
        </p>

        <LessonVisual
          type="custom"
          caption="A simple operator-based calculation used in a VLSI design script."
        >
          <div className="perl-vlsi-calculation">
            <div>
              <span>Register Width</span>
              <strong>32 bits</strong>
            </div>

            <div className="multiply-symbol">×</div>

            <div>
              <span>Registers</span>
              <strong>16</strong>
            </div>

            <div className="equals-symbol">=</div>

            <div className="total">
              <span>Total Storage</span>
              <strong>512 bits</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Operator Example">
{`my $register_width = 32;
my $register_count = 16;

my $total_bits = $register_width * $register_count;

if ($total_bits >= 512) {
    print "Register bank capacity = $total_bits bits\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Use the editor below to calculate timing information using Perl
          operators.
        </p>

        <TryIt
          title="Try Perl Operators"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $clock_period = 10;
my $logic_delay = 7;
my $setup_time = 1;

my $available_time = $clock_period - $setup_time;
my $slack = $available_time - $logic_delay;

print "TIMING ANALYSIS\\n";
print "===============\\n";
print "Clock Period : $clock_period ns\\n";
print "Logic Delay  : $logic_delay ns\\n";
print "Setup Time   : $setup_time ns\\n";
print "Slack        : $slack ns\\n";

if ($slack >= 0) {
    print "Timing Status : PASS\\n";
} else {
    print "Timing Status : FAIL\\n";
}`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Operators;