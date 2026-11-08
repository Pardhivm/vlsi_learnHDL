import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Variables() {
  const sections = [
    {
      id: "introduction",
      title: "Perl Variables"
    },
    {
      id: "scalar",
      title: "Scalar Variables"
    },
    {
      id: "arrays",
      title: "Array Variables"
    },
    {
      id: "hashes",
      title: "Hash Variables"
    },
    {
      id: "variable-rules",
      title: "Variable Rules"
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
      title="Perl Variables"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Basic Syntax"
      previousPath="/perl/basic-syntax"
      nextLesson="Data Types"
      nextPath="/perl/data-types"
    >

      <LessonSection
        id="introduction"
        title="Perl Variables"
      >
        <p>
          Variables are used to store information that a Perl
          program can use and modify while it is running.
        </p>

        <div className="perl-variable-map">

          <div className="perl-variable-title">
            <span>PERL</span>
            <strong>Variable Types</strong>
          </div>

          <div className="perl-variable-types">

            <div className="perl-variable-type scalar">
              <div className="perl-variable-symbol">
                $
              </div>
              <strong>Scalar</strong>
              <small>
                One value
              </small>
            </div>

            <div className="perl-variable-type array">
              <div className="perl-variable-symbol">
                @
              </div>
              <strong>Array</strong>
              <small>
                Ordered values
              </small>
            </div>

            <div className="perl-variable-type hash">
              <div className="perl-variable-symbol">
                %
              </div>
              <strong>Hash</strong>
              <small>
                Key-value pairs
              </small>
            </div>

          </div>
        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          The symbol before a variable name tells Perl what
          type of variable is being accessed.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="scalar"
        title="Scalar Variables"
      >
        <p>
          A scalar variable stores a single value. The value
          can be a number, string, or another scalar value.
        </p>

        <CodeExample title="Scalar Variables">
{`my $project = "UART";
my $width = 32;
my $frequency = 100;

print "Project   : $project\\n";
print "Width     : $width bits\\n";
print "Frequency : $frequency MHz\\n";`}
        </CodeExample>

        <div className="perl-variable-example">
          <div className="perl-variable-code">
            <span>Variable</span>
            <code>$width</code>
          </div>

          <div className="perl-variable-arrow">
            →
          </div>

          <div className="perl-variable-value">
            <span>Stored Value</span>
            <strong>32</strong>
          </div>
        </div>
      </LessonSection>


      <LessonSection
        id="arrays"
        title="Array Variables"
      >
        <p>
          An array stores an ordered collection of values.
          Array variables begin with the <code>@</code>
          symbol.
        </p>

        <CodeExample title="Array Example">
{`my @stages = (
    "Synthesis",
    "Implementation",
    "Timing",
    "Bitstream"
);

print "First stage: $stages[0]\\n";
print "Second stage: $stages[1]\\n";`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Array Index"
        >
          Perl arrays use zero-based indexing. Therefore,
          the first element is at index <code>0</code>.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="hashes"
        title="Hash Variables"
      >
        <p>
          A hash stores information as key-value pairs.
          Hash variables begin with the <code>%</code>
          symbol.
        </p>

        <CodeExample title="Hash Example">
{`my %fpga = (
    device => "Artix-7",
    tool   => "Vivado",
    clock  => "100MHz"
);

print "Device : $fpga{device}\\n";
print "Tool   : $fpga{tool}\\n";
print "Clock  : $fpga{clock}\\n";`}
        </CodeExample>

        <div className="perl-hash-visual">

          <div>
            <span>KEY</span>
            <strong>device</strong>
          </div>

          <div className="perl-hash-arrow">
            →
          </div>

          <div>
            <span>VALUE</span>
            <strong>Artix-7</strong>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="variable-rules"
        title="Variable Naming Rules"
      >
        <p>
          Good variable names make Perl programs easier to
          understand.
        </p>

        <div className="perl-variable-rules">

          <div>
            <span className="rule-symbol">✓</span>
            <strong>Use meaningful names</strong>
            <p>
              Example: <code>$clock_frequency</code>
            </p>
          </div>

          <div>
            <span className="rule-symbol">✓</span>
            <strong>Use underscores when useful</strong>
            <p>
              Example: <code>$total_bits</code>
            </p>
          </div>

          <div>
            <span className="rule-symbol">✓</span>
            <strong>Keep names readable</strong>
            <p>
              Avoid unnecessarily short names.
            </p>
          </div>

          <div>
            <span className="rule-symbol">!</span>
            <strong>Watch the variable symbol</strong>
            <p>
              <code>$</code>, <code>@</code>, and <code>%</code>
              have different meanings.
            </p>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="vlsi-example"
        title="Variables in a VLSI Example"
      >
        <p>
          Variables can store design parameters and make
          scripts easier to modify.
        </p>

        <CodeExample title="Design Parameters">
{`my $module = "UART";
my $data_width = 8;
my $clock_frequency = 100;

my $total_bits = $data_width * 16;

print "Module          : $module\\n";
print "Data Width      : $data_width bits\\n";
print "Clock Frequency : $clock_frequency MHz\\n";
print "Total Bits      : $total_bits\\n";`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Why This Helps"
        >
          Instead of changing values throughout a script,
          you can change a variable once and reuse it in
          multiple places.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Practice creating different Perl variables and
          using them in a simple VLSI calculation.
        </p>

        <TryIt
          title="Try Perl Variables"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $module = "UART";
my $data_width = 8;
my $registers = 16;

my $total_bits = $data_width * $registers;

print "DESIGN PARAMETERS\\n";
print "=================\\n";
print "Module      : $module\\n";
print "Data Width  : $data_width bits\\n";
print "Registers   : $registers\\n";
print "Total Bits  : $total_bits\\n";`}
        />

        <LearningNote
          type="success"
          title="Experiment"
        >
          Try changing <code>$data_width</code> and{" "}
          <code>$registers</code>. Then run the program and
          observe how <code>$total_bits</code> changes.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Variables;