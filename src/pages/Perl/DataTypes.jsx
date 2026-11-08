import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function DataTypes() {
  const sections = [
    {
      id: "introduction",
      title: "Perl Data Types"
    },
    {
      id: "scalar",
      title: "Scalar Data"
    },
    {
      id: "strings",
      title: "Strings"
    },
    {
      id: "numbers",
      title: "Numbers"
    },
    {
      id: "arrays",
      title: "Arrays"
    },
    {
      id: "hashes",
      title: "Hashes"
    },
    {
      id: "type-conversion",
      title: "Type Conversion"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="Perl Data Types"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Variables"
      previousPath="/perl/variables"
      nextLesson="Operators"
      nextPath="/perl/operators"
    >

      {/* INTRODUCTION */}

      <LessonSection
        id="introduction"
        title="Perl Data Types"
      >
        <p>
          Perl does not require you to explicitly declare a
          variable's data type. The type of variable is mainly
          determined by the variable sigil and the value being
          stored.
        </p>

        <LessonVisual
          type="diagram"
          caption="The three main Perl variable categories."
        >
          <div className="perl-data-type-map">

            <div className="perl-data-type-card">
              <div className="perl-data-symbol">
                $
              </div>

              <strong>Scalar</strong>

              <span>
                One value
              </span>
            </div>

            <div className="perl-data-type-connector">
              +
            </div>

            <div className="perl-data-type-card">
              <div className="perl-data-symbol">
                @
              </div>

              <strong>Array</strong>

              <span>
                Ordered values
              </span>
            </div>

            <div className="perl-data-type-connector">
              +
            </div>

            <div className="perl-data-type-card">
              <div className="perl-data-symbol">
                %
              </div>

              <strong>Hash</strong>

              <span>
                Key-value pairs
              </span>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Important"
        >
          Perl uses sigils such as <code>$</code>,{" "}
          <code>@</code>, and <code>%</code> to identify
          different variable contexts.
        </LearningNote>
      </LessonSection>


      {/* SCALAR */}

      <LessonSection
        id="scalar"
        title="Scalar Data"
      >
        <p>
          A scalar represents a single value. It can contain
          text, an integer, a floating-point number, or other
          scalar data.
        </p>

        <CodeExample title="Scalar Values">
{`my $name = "UART";
my $width = 32;
my $frequency = 100.5;

print "$name\\n";
print "$width\\n";
print "$frequency\\n";`}
        </CodeExample>

        <div className="perl-scalar-types">

          <div>
            <span>TEXT</span>
            <code>"UART"</code>
          </div>

          <div>
            <span>INTEGER</span>
            <code>32</code>
          </div>

          <div>
            <span>DECIMAL</span>
            <code>100.5</code>
          </div>

        </div>
      </LessonSection>


      {/* STRINGS */}

      <LessonSection
        id="strings"
        title="Strings"
      >
        <p>
          Strings are sequences of characters. They are
          commonly written using single or double quotation
          marks.
        </p>

        <CodeExample title="String Values">
{`my $module = "UART";
my $tool = 'Vivado';

print "Module: $module\\n";
print "Tool: $tool\\n";`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Double vs Single Quotes"
        >
          Double-quoted strings can interpolate variables,
          while single-quoted strings generally treat their
          contents literally.
        </LearningNote>
      </LessonSection>


      {/* NUMBERS */}

      <LessonSection
        id="numbers"
        title="Numbers"
      >
        <p>
          Perl supports both integer and floating-point
          numeric values.
        </p>

        <div className="perl-number-visual">

          <div className="perl-number-card">
            <span>INTEGER</span>
            <strong>100</strong>
            <small>
              Whole number
            </small>
          </div>

          <div className="perl-number-operation">
            +
          </div>

          <div className="perl-number-card">
            <span>DECIMAL</span>
            <strong>0.25</strong>
            <small>
              Floating-point value
            </small>
          </div>

          <div className="perl-number-operation">
            =
          </div>

          <div className="perl-number-card perl-number-result">
            <span>RESULT</span>
            <strong>100.25</strong>
            <small>
              Numeric result
            </small>
          </div>

        </div>

        <CodeExample title="Numeric Calculation">
{`my $frequency = 100;
my $margin = 0.25;

my $result = $frequency + $margin;

print "Result = $result MHz\\n";`}
        </CodeExample>
      </LessonSection>


      {/* ARRAYS */}

      <LessonSection
        id="arrays"
        title="Arrays"
      >
        <p>
          An array stores an ordered list of values. Array
          variables use the <code>@</code> sigil.
        </p>

        <CodeExample title="Array Example">
{`my @tools = (
    "Vivado",
    "Icarus",
    "GHDL"
);

print "First tool : $tools[0]\\n";
print "Second tool: $tools[1]\\n";
print "Third tool : $tools[2]\\n";`}
        </CodeExample>

        <div className="perl-array-visual">

          <div className="perl-array-index">
            <span>INDEX</span>
            <strong>0</strong>
          </div>

          <div className="perl-array-value">
            Vivado
          </div>

          <div className="perl-array-index">
            <span>INDEX</span>
            <strong>1</strong>
          </div>

          <div className="perl-array-value">
            Icarus
          </div>

          <div className="perl-array-index">
            <span>INDEX</span>
            <strong>2</strong>
          </div>

          <div className="perl-array-value">
            GHDL
          </div>

        </div>
      </LessonSection>


      {/* HASHES */}

      <LessonSection
        id="hashes"
        title="Hashes"
      >
        <p>
          A hash stores data as key-value pairs. Hashes use
          the <code>%</code> sigil.
        </p>

        <CodeExample title="Hash Example">
{`my %device = (
    family => "Artix-7",
    part   => "xc7a100t",
    tool   => "Vivado"
);

print "Family: $device{family}\\n";
print "Part  : $device{part}\\n";
print "Tool  : $device{tool}\\n";`}
        </CodeExample>

        <div className="perl-hash-grid">

          <div>
            <span>family</span>
            <strong>Artix-7</strong>
          </div>

          <div>
            <span>part</span>
            <strong>xc7a100t</strong>
          </div>

          <div>
            <span>tool</span>
            <strong>Vivado</strong>
          </div>

        </div>
      </LessonSection>


      {/* TYPE CONVERSION */}

      <LessonSection
        id="type-conversion"
        title="Type Conversion"
      >
        <p>
          Perl can convert values between numeric and string
          contexts depending on how they are used.
        </p>

        <CodeExample title="Numeric Conversion">
{`my $text_number = "25";
my $multiplier = 4;

my $result = $text_number * $multiplier;

print "Result = $result\\n";`}
        </CodeExample>

        <LearningNote
          type="warning"
          title="Be Careful"
        >
          Perl's flexible type system is convenient, but you
          should still understand whether a value is being used
          as text or as a number.
        </LearningNote>
      </LessonSection>


      {/* TRY IT */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Practice working with strings, numbers, an array,
          and a hash in the same Perl program.
        </p>

        <TryIt
          title="Try Perl Data Types"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $project = "UART";
my $frequency = 100;

my @stages = (
    "Synthesis",
    "Timing",
    "Implementation"
);

my %device = (
    family => "Artix-7",
    tool   => "Vivado"
);

print "PROJECT INFORMATION\\n";
print "===================\\n";

print "Project    : $project\\n";
print "Frequency  : $frequency MHz\\n";

print "First Stage: $stages[0]\\n";
print "Last Stage : $stages[2]\\n";

print "FPGA Family: $device{family}\\n";
print "EDA Tool   : $device{tool}\\n";`}
        />

        <LearningNote
          type="success"
          title="Experiment"
        >
          Change the project name, frequency, stages, and FPGA
          family. Then run the program and observe the output.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default DataTypes;