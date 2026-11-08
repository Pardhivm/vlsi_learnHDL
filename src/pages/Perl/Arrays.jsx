import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Arrays() {
  const sections = [
    { id: "introduction", title: "Arrays in Perl" },
    { id: "creating", title: "Creating Arrays" },
    { id: "accessing", title: "Accessing Elements" },
    { id: "modify", title: "Modifying Elements" },
    { id: "push-pop", title: "Push and Pop" },
    { id: "shift-unshift", title: "Shift and Unshift" },
    { id: "length", title: "Array Length" },
    { id: "loop", title: "Looping Through Arrays" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Arrays"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Strings"
      previousPath="/perl/strings"
      nextLesson="Hashes"
      nextPath="/perl/hashes"
    >
      <LessonSection title="Arrays in Perl" id="introduction">
        <p>
          An array is an ordered collection of multiple values stored under
          one variable name. Arrays are useful when a program needs to work
          with a group of related items.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl array stores multiple values in an ordered sequence."
        >
          <div className="perl-array-visual">
            <div className="perl-array-label">
              <span>Array</span>
              <strong>@modules</strong>
            </div>

            <div className="perl-array-cells">
              <div>
                <small>[0]</small>
                <strong>UART</strong>
              </div>
              <div>
                <small>[1]</small>
                <strong>SPI</strong>
              </div>
              <div>
                <small>[2]</small>
                <strong>I2C</strong>
              </div>
              <div>
                <small>[3]</small>
                <strong>GPIO</strong>
              </div>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl arrays use the <code>@</code> symbol when referring to the
          complete array. Individual elements are accessed using
          <code>$</code> followed by their index.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Creating Arrays" id="creating">
        <p>
          You can create an array by assigning multiple values inside
          parentheses.
        </p>

        <CodeExample title="Creating an Array">
{`my @modules = ("UART", "SPI", "I2C", "GPIO");

print "@modules";`}
        </CodeExample>

        <div className="perl-array-declaration">
          <div>
            <span>Array Name</span>
            <strong>@modules</strong>
          </div>

          <div className="perl-array-equals">=</div>

          <div>
            <span>Values</span>
            <strong>("UART", "SPI", "I2C")</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Accessing Elements" id="accessing">
        <p>
          Array indexing starts at <strong>0</strong>. The first element is
          therefore at index 0.
        </p>

        <LessonVisual
          type="custom"
          caption="Array indexing starts from zero."
        >
          <div className="perl-index-visual">
            <div className="perl-index-cell">
              <small>Index 0</small>
              <strong>UART</strong>
            </div>

            <div className="perl-index-cell selected">
              <small>Index 1</small>
              <strong>SPI</strong>
            </div>

            <div className="perl-index-cell">
              <small>Index 2</small>
              <strong>I2C</strong>
            </div>

            <div className="perl-index-cell">
              <small>Index 3</small>
              <strong>GPIO</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Accessing Elements">
{`my @modules = ("UART", "SPI", "I2C", "GPIO");

print "First  : $modules[0]\\n";
print "Second : $modules[1]\\n";
print "Third  : $modules[2]\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Modifying Elements" id="modify">
        <p>
          An individual array element can be changed by assigning a new value
          to its index.
        </p>

        <CodeExample title="Modifying an Array Element">
{`my @modules = ("UART", "SPI", "I2C");

$modules[1] = "CAN";

print "@modules";`}
        </CodeExample>

        <div className="perl-array-change">
          <div>
            <span>Before</span>
            <strong>UART | SPI | I2C</strong>
          </div>

          <div className="perl-array-change-arrow">→</div>

          <div>
            <span>After</span>
            <strong>UART | CAN | I2C</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Push and Pop" id="push-pop">
        <p>
          <code>push()</code> adds an element to the end of an array, while
          <code>pop()</code> removes the last element.
        </p>

        <div className="perl-array-operation">
          <div className="perl-array-stack">
            <span>Original</span>
            <strong>UART</strong>
            <strong>SPI</strong>
            <strong>I2C</strong>
          </div>

          <div className="perl-array-operation-arrow">
            <strong>push()</strong>
            <span>→</span>
          </div>

          <div className="perl-array-stack updated">
            <span>Updated</span>
            <strong>UART</strong>
            <strong>SPI</strong>
            <strong>I2C</strong>
            <strong>GPIO</strong>
          </div>
        </div>

        <CodeExample title="push() and pop()">
{`my @modules = ("UART", "SPI", "I2C");

push(@modules, "GPIO");

print "@modules\\n";

pop(@modules);

print "@modules\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Shift and Unshift" id="shift-unshift">
        <p>
          <code>shift()</code> removes the first element, while
          <code>unshift()</code> adds an element to the beginning.
        </p>

        <div className="perl-array-operation">
          <div className="perl-array-stack">
            <span>Original</span>
            <strong>UART</strong>
            <strong>SPI</strong>
            <strong>I2C</strong>
          </div>

          <div className="perl-array-operation-arrow">
            <strong>shift()</strong>
            <span>←</span>
          </div>

          <div className="perl-array-stack updated">
            <span>Remaining</span>
            <strong>SPI</strong>
            <strong>I2C</strong>
          </div>
        </div>

        <CodeExample title="shift() and unshift()">
{`my @modules = ("UART", "SPI", "I2C");

unshift(@modules, "GPIO");

print "@modules\\n";

shift(@modules);

print "@modules\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Array Length" id="length">
        <p>
          The scalar form of an array gives the number of elements it
          contains.
        </p>

        <LessonVisual
          type="custom"
          caption="The scalar value of an array represents its number of elements."
        >
          <div className="perl-array-length">
            <div className="perl-array-length-items">
              <span>UART</span>
              <span>SPI</span>
              <span>I2C</span>
              <span>GPIO</span>
              <span>CAN</span>
            </div>

            <div className="perl-array-length-arrow">→</div>

            <div className="perl-array-length-result">
              <small>Number of Elements</small>
              <strong>5</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Finding Array Length">
{`my @modules = ("UART", "SPI", "I2C", "GPIO");

my $count = scalar @modules;

print "Number of modules: $count\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Looping Through Arrays" id="loop">
        <p>
          A <code>foreach</code> loop can process every element of an array
          one by one.
        </p>

        <CodeExample title="foreach Example">
{`my @modules = ("UART", "SPI", "I2C", "GPIO");

foreach my $module (@modules) {
    print "Module: $module\\n";
}`}
        </CodeExample>

        <div className="perl-loop-flow">
          <div>Array</div>
          <span>→</span>
          <div>Element 1</div>
          <span>→</span>
          <div>Element 2</div>
          <span>→</span>
          <div>Element 3</div>
          <span>→</span>
          <div>...</div>
        </div>

        <LearningNote type="tip" title="Tip">
          <code>foreach</code> is convenient when you want to perform the
          same operation on every item in an array.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Arrays are useful in VLSI automation for storing module names,
          source files, simulation stages, test configurations, and tool
          commands.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl array can represent the stages of a VLSI design flow."
        >
          <div className="perl-flow-array">
            <div>
              <small>Stage 0</small>
              <strong>RTL</strong>
            </div>

            <span>→</span>

            <div>
              <small>Stage 1</small>
              <strong>Synthesis</strong>
            </div>

            <span>→</span>

            <div>
              <small>Stage 2</small>
              <strong>Implementation</strong>
            </div>

            <span>→</span>

            <div>
              <small>Stage 3</small>
              <strong>Bitstream</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Flow Array">
{`my @stages = (
    "RTL",
    "Synthesis",
    "Implementation",
    "Bitstream"
);

foreach my $stage (@stages) {
    print "Running: $stage\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Use the editor to process a list of VLSI design stages and display
          each stage with its position.
        </p>

        <TryIt
          title="Try Perl Arrays"
          language="Perl"
          initialCode={`use strict;
use warnings;

my @stages = (
    "RTL",
    "Synthesis",
    "Implementation",
    "Timing"
);

print "VLSI DESIGN FLOW\\n";
print "================\\n";

my $count = scalar @stages;

print "Total Stages: $count\\n\\n";

for (my $i = 0; $i < $count; $i++) {
    print "Stage $i : $stages[$i]\\n";
}

push(@stages, "Bitstream");

print "\\nFinal Stage: $stages[-1]\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Arrays;