import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Strings() {
  const sections = [
    { id: "introduction", title: "Strings in Perl" },
    { id: "creating", title: "Creating Strings" },
    { id: "concatenation", title: "String Concatenation" },
    { id: "interpolation", title: "String Interpolation" },
    { id: "length", title: "String Length" },
    { id: "case", title: "Changing Case" },
    { id: "substr", title: "Extracting Text" },
    { id: "replace", title: "Replacing Text" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Strings"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Operators"
      previousPath="/perl/operators"
      nextLesson="Arrays"
      nextPath="/perl/arrays"
    >
      <LessonSection title="Strings in Perl" id="introduction">
        <p>
          A string is a sequence of characters such as letters, numbers,
          symbols, or spaces. Perl provides many built-in operations for
          creating and manipulating strings.
        </p>

        <LessonVisual
          type="custom"
          caption="A string is simply a sequence of characters."
        >
          <div className="perl-string-strip">
            <span>V</span>
            <span>L</span>
            <span>S</span>
            <span>I</span>
            <span>-</span>
            <span>L</span>
            <span>e</span>
            <span>a</span>
            <span>r</span>
            <span>n</span>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl strings can be written using single quotes or double quotes.
          Double-quoted strings support variable interpolation.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Creating Strings" id="creating">
        <p>
          Strings can be assigned to scalar variables using single or double
          quotation marks.
        </p>

        <CodeExample title="Creating Strings">
{`my $course = "Perl";
my $topic = 'Strings';

print $course;
print "\\n";
print $topic;`}
        </CodeExample>

        <div className="perl-quote-comparison">
          <div>
            <span>Single Quotes</span>
            <code>'Hello'</code>
            <small>Simple string</small>
          </div>

          <div>
            <span>Double Quotes</span>
            <code>"Hello $name"</code>
            <small>Supports interpolation</small>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="String Concatenation" id="concatenation">
        <p>
          The dot operator <code>.</code> joins two or more strings together.
        </p>

        <LessonVisual
          type="custom"
          caption="The dot operator combines separate strings into one string."
        >
          <div className="perl-concat-flow">
            <div>VLSI</div>
            <strong>.</strong>
            <div>Learn</div>
            <span>→</span>
            <b>VLSILearn</b>
          </div>
        </LessonVisual>

        <CodeExample title="Concatenation Example">
{`my $course = "VLSI";
my $name = "Learn";

my $title = $course . $name;

print $title;`}
        </CodeExample>

        <CodeExample title="Appending with .=">
{`my $message = "Welcome";

$message .= " to VLSI Learn";

print $message;`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="String Interpolation" id="interpolation">
        <p>
          String interpolation means inserting the value of a variable
          directly into a double-quoted string.
        </p>

        <div className="perl-interpolation-visual">
          <div className="perl-interpolation-variable">
            <span>Variable</span>
            <strong>$tool</strong>
            <small>Vivado</small>
          </div>

          <div className="perl-interpolation-arrow">+</div>

          <div className="perl-interpolation-text">
            <span>String</span>
            <strong>"Tool: $tool"</strong>
          </div>

          <div className="perl-interpolation-arrow">→</div>

          <div className="perl-interpolation-result">
            <span>Output</span>
            <strong>Tool: Vivado</strong>
          </div>
        </div>

        <CodeExample title="Interpolation Example">
{`my $tool = "Vivado";
my $device = "Artix-7";

print "Tool: $tool\\n";
print "Device: $device\\n";`}
        </CodeExample>

        <LearningNote type="tip" title="Tip">
          Use double quotes when you want Perl to replace variables with
          their values inside a string.
        </LearningNote>
      </LessonSection>

      <LessonSection title="String Length" id="length">
        <p>
          The <code>length()</code> function returns the number of characters
          in a string.
        </p>

        <LessonVisual
          type="custom"
          caption="length() counts the characters in a string."
        >
          <div className="perl-length-visual">
            <div className="perl-length-word">
              <span>String</span>
              <strong>UART</strong>
            </div>

            <div className="perl-length-arrow">→</div>

            <div className="perl-length-count">
              <span>length()</span>
              <strong>4</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Finding String Length">
{`my $module = "UART";

my $length = length($module);

print "Module: $module\\n";
print "Length: $length\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Changing Case" id="case">
        <p>
          Perl provides functions for converting strings to uppercase or
          lowercase.
        </p>

        <div className="perl-case-visual">
          <div>
            <span>Original</span>
            <strong>vlsi learn</strong>
          </div>

          <div>→</div>

          <div>
            <span>Uppercase</span>
            <strong>VLSI LEARN</strong>
          </div>

          <div>→</div>

          <div>
            <span>Lowercase</span>
            <strong>vlsi learn</strong>
          </div>
        </div>

        <CodeExample title="Case Conversion">
{`my $text = "VLSI Learn";

print uc($text);
print "\\n";

print lc($text);
print "\\n";`}
        </CodeExample>

        <div className="perl-function-pills">
          <span><code>uc()</code> → Uppercase</span>
          <span><code>lc()</code> → Lowercase</span>
        </div>
      </LessonSection>

      <LessonSection title="Extracting Text" id="substr">
        <p>
          The <code>substr()</code> function can extract a portion of a
          string.
        </p>

        <LessonVisual
          type="custom"
          caption="substr() can select a portion of a larger string."
        >
          <div className="perl-substr-visual">
            <div className="perl-substr-source">
              <span>Source String</span>
              <strong>VLSI_LEARN</strong>
            </div>

            <div className="perl-substr-selector">
              <span>substr()</span>
              <b>VLSI</b>
            </div>

            <div className="perl-substr-result">
              <span>Extracted</span>
              <strong>VLSI</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="substr() Example">
{`my $name = "VLSI_LEARN";

my $part = substr($name, 0, 4);

print "Extracted: $part\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Replacing Text" id="replace">
        <p>
          Perl can modify text using substitution with the
          <code> s/// </code> operator.
        </p>

        <CodeExample title="String Replacement">
{`my $tool = "Vivado Simulator";

$tool =~ s/Simulator/Synthesis/;

print $tool;`}
        </CodeExample>

        <div className="perl-replace-flow">
          <div>
            <span>Before</span>
            <strong>Vivado Simulator</strong>
          </div>

          <div className="perl-replace-arrow">s/// →</div>

          <div>
            <span>After</span>
            <strong>Vivado Synthesis</strong>
          </div>
        </div>

        <LearningNote type="warning" title="Important">
          The <code> =~ </code> operator applies a regular-expression
          operation to a string. Regular expressions will be covered in a
          later Perl lesson.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          String processing is useful in VLSI automation because scripts
          frequently work with project names, file paths, module names,
          reports, and tool messages.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl script can build and process VLSI-related filenames."
        >
          <div className="perl-file-builder">
            <div>
              <span>Module</span>
              <strong>uart</strong>
            </div>

            <div className="perl-file-plus">.</div>

            <div>
              <span>Extension</span>
              <strong>v</strong>
            </div>

            <div className="perl-file-arrow">→</div>

            <div className="perl-file-result">
              <span>Generated File</span>
              <strong>uart.v</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Filename Example">
{`my $module = "uart";
my $extension = ".v";

my $filename = $module . $extension;

print "Generated file: $filename\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try modifying the project name, tool name, and filename in this
          small VLSI string-processing program.
        </p>

        <TryIt
          title="Try Perl Strings"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $project = "UART";
my $tool = "Vivado";
my $extension = ".v";

my $filename = lc($project) . $extension;

print "PROJECT INFORMATION\\n";
print "===================\\n";
print "Project  : $project\\n";
print "Tool     : $tool\\n";
print "Filename : $filename\\n";
print "Length   : " . length($filename) . "\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Strings;