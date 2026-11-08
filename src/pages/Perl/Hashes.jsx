import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Hashes() {
  const sections = [
    { id: "introduction", title: "Hashes in Perl" },
    { id: "creating", title: "Creating a Hash" },
    { id: "accessing", title: "Accessing Values" },
    { id: "modify", title: "Adding and Modifying" },
    { id: "delete", title: "Deleting Values" },
    { id: "keys-values", title: "Keys and Values" },
    { id: "exists", title: "Checking Keys" },
    { id: "loop", title: "Looping Through Hashes" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Hashes"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Arrays"
      previousPath="/perl/arrays"
      nextLesson="If / Else"
      nextPath="/perl/if-else"
    >
      <LessonSection title="Hashes in Perl" id="introduction">
        <p>
          A hash is a collection of key-value pairs. Unlike an array, which
          uses numeric indexes, a hash uses meaningful keys to access values.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl hash connects each key with its corresponding value."
        >
          <div className="perl-hash-visual">
            <div className="perl-hash-title">
              <span>Hash</span>
              <strong>%device</strong>
            </div>

            <div className="perl-hash-pairs">
              <div>
                <span>family</span>
                <b>Artix-7</b>
              </div>

              <div>
                <span>tool</span>
                <b>Vivado</b>
              </div>

              <div>
                <span>width</span>
                <b>32</b>
              </div>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          A hash uses the <code>%</code> symbol when referring to the complete
          hash. Individual values are accessed using the <code>$</code>
          symbol and a key.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Creating a Hash" id="creating">
        <p>
          A hash is created using key-value pairs inside parentheses. The
          <code>=&gt;</code> operator is commonly used to separate a key from
          its value.
        </p>

        <CodeExample title="Creating a Hash">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado",
    width  => 32
);

print $device{family};`}
        </CodeExample>

        <div className="perl-hash-declaration">
          <div>
            <span>Key</span>
            <strong>family</strong>
          </div>

          <div className="perl-hash-arrow">→</div>

          <div>
            <span>Value</span>
            <strong>Artix-7</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Accessing Values" id="accessing">
        <p>
          Individual values are accessed by placing the key inside curly
          braces.
        </p>

        <LessonVisual
          type="custom"
          caption="A hash key is used to retrieve its associated value."
        >
          <div className="perl-hash-access">
            <div className="perl-hash-key">
              <span>Key</span>
              <strong>tool</strong>
            </div>

            <div className="perl-hash-access-arrow">→</div>

            <div className="perl-hash-value">
              <span>Value</span>
              <strong>Vivado</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Accessing Hash Values">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado",
    width  => 32
);

print "Family: $device{family}\\n";
print "Tool  : $device{tool}\\n";
print "Width : $device{width}\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Adding and Modifying" id="modify">
        <p>
          A new key-value pair can be added simply by assigning a value to a
          new key. Existing values can also be changed the same way.
        </p>

        <CodeExample title="Adding and Modifying Values">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado"
);

$device{board} = "Nexys 4 DDR";

$device{tool} = "Vivado 2025.1";

print "Board: $device{board}\\n";
print "Tool : $device{tool}\\n";`}
        </CodeExample>

        <div className="perl-hash-update">
          <div>
            <span>Before</span>
            <strong>tool → Vivado</strong>
          </div>

          <div className="perl-hash-update-arrow">→</div>

          <div>
            <span>After</span>
            <strong>tool → Vivado 2025.1</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Deleting Values" id="delete">
        <p>
          The <code>delete</code> function removes a key-value pair from a
          hash.
        </p>

        <CodeExample title="Deleting a Hash Entry">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado",
    board  => "Nexys 4 DDR"
);

delete $device{board};

print "Family: $device{family}\\n";
print "Tool  : $device{tool}\\n";`}
        </CodeExample>

        <div className="perl-hash-delete">
          <div className="perl-hash-entry">
            <span>board</span>
            <strong>Nexys 4 DDR</strong>
          </div>

          <div className="perl-delete-symbol">×</div>

          <div className="perl-hash-removed">
            <span>After delete</span>
            <strong>Entry removed</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Keys and Values" id="keys-values">
        <p>
          Perl provides <code>keys()</code> to retrieve the keys of a hash and
          <code>values()</code> to retrieve its values.
        </p>

        <div className="perl-key-value-flow">
          <div>
            <span>Hash</span>
            <strong>%device</strong>
          </div>

          <div>
            <code>keys()</code>
            <b>→</b>
            <small>family, tool, width</small>
          </div>

          <div>
            <code>values()</code>
            <b>→</b>
            <small>Artix-7, Vivado, 32</small>
          </div>
        </div>

        <CodeExample title="keys() and values()">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado",
    width  => 32
);

my @keys = keys(%device);
my @values = values(%device);

print "Keys: @keys\\n";
print "Values: @values\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Checking Keys" id="exists">
        <p>
          The <code>exists</code> operator checks whether a particular key is
          present in a hash.
        </p>

        <CodeExample title="Checking for a Key">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado"
);

if (exists $device{tool}) {
    print "Tool information is available\\n";
}`}
        </CodeExample>

        <div className="perl-exists-flow">
          <div>
            <span>Check</span>
            <strong>{"exists $device{tool}"}</strong>
          </div>

          <div className="perl-exists-arrow">→</div>

          <div className="perl-exists-result">
            <span>Result</span>
            <strong>TRUE</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Looping Through Hashes" id="loop">
        <p>
          The <code>foreach</code> loop can be combined with
          <code>keys()</code> to process every key-value pair.
        </p>

        <CodeExample title="Loop Through a Hash">
{`my %device = (
    family => "Artix-7",
    tool   => "Vivado",
    width  => 32
);

foreach my $key (keys %device) {
    print "$key : $device{$key}\\n";
}`}
        </CodeExample>

        <div className="perl-hash-loop">
          <div>keys()</div>
          <span>→</span>
          <div>foreach</div>
          <span>→</span>
          <div>key</div>
          <span>→</span>
          <div>value</div>
        </div>

        <LearningNote type="tip" title="Tip">
          Hashes are especially useful when each value needs a descriptive
          name instead of a numeric position.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          In VLSI automation, hashes can store configuration information such
          as FPGA family, board name, synthesis tool, clock frequency, and
          project name.
        </p>

        <LessonVisual
          type="custom"
          caption="A hash can represent configuration parameters for a VLSI project."
        >
          <div className="perl-config-grid">
            <div>
              <small>project</small>
              <strong>UART</strong>
            </div>

            <div>
              <small>device</small>
              <strong>Artix-7</strong>
            </div>

            <div>
              <small>board</small>
              <strong>Nexys 4 DDR</strong>
            </div>

            <div>
              <small>clock</small>
              <strong>100 MHz</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Configuration Hash">
{`my %config = (
    project => "UART",
    device  => "Artix-7",
    board   => "Nexys 4 DDR",
    clock   => 100
);

print "Project : $config{project}\\n";
print "Device  : $config{device}\\n";
print "Board   : $config{board}\\n";
print "Clock   : $config{clock} MHz\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Use the editor below to create a simple VLSI project configuration
          using a Perl hash.
        </p>

        <TryIt
          title="Try Perl Hashes"
          language="Perl"
          initialCode={`use strict;
use warnings;

my %config = (
    project => "UART",
    device  => "Artix-7",
    board   => "Nexys 4 DDR",
    clock   => 100
);

print "VLSI PROJECT CONFIGURATION\\n";
print "==========================\\n";

foreach my $key (keys %config) {
    print "$key : $config{$key}\\n";
}

if (exists $config{clock}) {
    print "\\nClock configuration found.\\n";
}`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Hashes;