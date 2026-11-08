import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Subroutines() {
  const sections = [
    { id: "introduction", title: "Subroutines in Perl" },
    { id: "creating", title: "Creating a Subroutine" },
    { id: "calling", title: "Calling a Subroutine" },
    { id: "parameters", title: "Parameters" },
    { id: "return", title: "Return Values" },
    { id: "scope", title: "Variable Scope" },
    { id: "reusable", title: "Reusable Functions" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Subroutines"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Loops"
      previousPath="/perl/loops"
      nextLesson="File Handling"
      nextPath="/perl/file-handling"
    >
      <LessonSection title="Subroutines in Perl" id="introduction">
        <p>
          A subroutine is a reusable block of code that performs a specific
          task. Subroutines help divide a large Perl program into smaller,
          organized pieces.
        </p>

        <LessonVisual
          type="custom"
          caption="A subroutine receives input, performs a task, and can return a result."
        >
          <div className="perl-subroutine-flow">
            <div>
              <span>Input</span>
              <strong>Parameters</strong>
            </div>

            <div className="perl-subroutine-arrow">→</div>

            <div className="perl-subroutine-main">
              <span>Subroutine</span>
              <strong>Process</strong>
            </div>

            <div className="perl-subroutine-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>Result</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl subroutines are declared using the <code>sub</code> keyword.
          They can accept parameters and return values.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Creating a Subroutine" id="creating">
        <p>
          A subroutine is created using the <code>sub</code> keyword followed
          by a name and a block of code.
        </p>

        <CodeExample title="Basic Subroutine">
{`sub greet {
    print "Welcome to VLSI Learn!\\n";
}`}
        </CodeExample>

        <div className="perl-subroutine-declaration">
          <div>
            <span>Keyword</span>
            <strong>sub</strong>
          </div>

          <div>
            <span>Name</span>
            <strong>greet</strong>
          </div>

          <div>
            <span>Body</span>
            <strong>{"{ ... }"}</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Calling a Subroutine" id="calling">
        <p>
          After defining a subroutine, you can execute it by calling its
          name with the <code>&amp;</code> symbol or parentheses.
        </p>

        <CodeExample title="Calling a Subroutine">
{`sub greet {
    print "Hello from Perl!\\n";
}

greet();`}
        </CodeExample>

        <LessonVisual
          type="custom"
          caption="Calling a subroutine transfers execution to the reusable block."
        >
          <div className="perl-call-flow">
            <div>
              <span>Program</span>
              <strong>greet()</strong>
            </div>

            <div className="perl-call-arrow">→</div>

            <div className="perl-call-block">
              <span>Subroutine</span>
              <strong>greet</strong>
            </div>

            <div className="perl-call-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>Hello!</strong>
            </div>
          </div>
        </LessonVisual>
      </LessonSection>

      <LessonSection title="Parameters" id="parameters">
        <p>
          Parameters allow a subroutine to receive values from the calling
          code. Inside a Perl subroutine, arguments are available through
          the special <code>@_</code> array.
        </p>

        <CodeExample title="Subroutine with Parameters">
{`sub add_numbers {
    my ($a, $b) = @_;

    my $sum = $a + $b;

    print "Sum = $sum\\n";
}

add_numbers(10, 20);`}
        </CodeExample>

        <div className="perl-parameter-flow">
          <div>
            <span>Argument 1</span>
            <strong>10</strong>
          </div>

          <div>
            <span>Argument 2</span>
            <strong>20</strong>
          </div>

          <div className="perl-parameter-arrow">→</div>

          <div className="perl-parameter-function">
            <span>Subroutine</span>
            <strong>add_numbers()</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Return Values" id="return">
        <p>
          A subroutine can return a calculated value to the code that called
          it. The <code>return</code> keyword can be used explicitly.
        </p>

        <CodeExample title="Returning a Value">
{`sub calculate_bits {
    my ($width, $count) = @_;

    my $total = $width * $count;

    return $total;
}

my $bits = calculate_bits(8, 16);

print "Total bits = $bits\\n";`}
        </CodeExample>

        <LessonVisual
          type="custom"
          caption="The calculated value travels back to the calling code."
        >
          <div className="perl-return-flow">
            <div>
              <span>Input</span>
              <strong>8 × 16</strong>
            </div>

            <div>→</div>

            <div className="perl-return-function">
              <span>Subroutine</span>
              <strong>calculate_bits()</strong>
            </div>

            <div>→</div>

            <div>
              <span>Return</span>
              <strong>128</strong>
            </div>
          </div>
        </LessonVisual>
      </LessonSection>

      <LessonSection title="Variable Scope" id="scope">
        <p>
          Variables declared using <code>my</code> inside a subroutine are
          local to that subroutine. This helps prevent accidental changes to
          variables elsewhere in the program.
        </p>

        <CodeExample title="Local Variable Example">
{`my $project = "UART";

sub show_project {
    my $tool = "Vivado";

    print "Project: $project\\n";
    print "Tool: $tool\\n";
}

show_project();`}
        </CodeExample>

        <div className="perl-scope-visual">
          <div className="perl-scope-global">
            <span>Program Scope</span>
            <strong>$project</strong>
          </div>

          <div className="perl-scope-arrow">→</div>

          <div className="perl-scope-local">
            <span>Subroutine Scope</span>
            <strong>$tool</strong>
          </div>
        </div>

        <LearningNote type="tip" title="Tip">
          Prefer <code>my</code> variables for local data inside subroutines.
          This makes larger scripts easier to maintain.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Reusable Functions" id="reusable">
        <p>
          One major advantage of subroutines is that the same operation can
          be reused multiple times without rewriting the same code.
        </p>

        <CodeExample title="Reusable Subroutine">
{`sub register_bits {
    my ($width, $count) = @_;

    return $width * $count;
}

my $uart_bits = register_bits(8, 16);
my $spi_bits  = register_bits(16, 8);

print "UART bits = $uart_bits\\n";
print "SPI bits  = $spi_bits\\n";`}
        </CodeExample>

        <div className="perl-reusable-grid">
          <div>
            <span>Call 1</span>
            <strong>register_bits(8, 16)</strong>
            <small>→ 128 bits</small>
          </div>

          <div>
            <span>Call 2</span>
            <strong>register_bits(16, 8)</strong>
            <small>→ 128 bits</small>
          </div>

          <div>
            <span>Same Logic</span>
            <strong>One Subroutine</strong>
            <small>Reusable code</small>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Subroutines are particularly useful in VLSI automation because the
          same operations may need to be performed for many modules or
          projects.
        </p>

        <LessonVisual
          type="custom"
          caption="A reusable subroutine can calculate register storage for different hardware blocks."
        >
          <div className="perl-vlsi-subroutine">
            <div>
              <span>UART</span>
              <strong>8 × 16</strong>
            </div>

            <div>
              <span>SPI</span>
              <strong>16 × 8</strong>
            </div>

            <div>
              <span>GPIO</span>
              <strong>4 × 32</strong>
            </div>

            <div className="perl-vlsi-function">
              <span>Shared Logic</span>
              <strong>register_bits()</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Automation Subroutine">
{`sub register_bits {
    my ($width, $count) = @_;

    return $width * $count;
}

my $uart = register_bits(8, 16);
my $spi  = register_bits(16, 8);
my $gpio = register_bits(4, 32);

print "UART = $uart bits\\n";
print "SPI  = $spi bits\\n";
print "GPIO = $gpio bits\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Create reusable Perl subroutines to calculate the total storage
          required by different hardware blocks.
        </p>

        <TryIt
          title="Try Perl Subroutines"
          language="Perl"
          initialCode={`use strict;
use warnings;

sub calculate_storage {
    my ($width, $count) = @_;

    return $width * $count;
}

my $uart = calculate_storage(8, 16);
my $spi  = calculate_storage(16, 8);
my $gpio = calculate_storage(4, 32);

print "VLSI STORAGE ANALYSIS\\n";
print "=====================\\n";

print "UART Storage : $uart bits\\n";
print "SPI Storage  : $spi bits\\n";
print "GPIO Storage : $gpio bits\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Subroutines;