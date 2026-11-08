import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Strings() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Strings"
    },
    {
      id: "creating",
      title: "Creating Strings"
    },
    {
      id: "double-quotes",
      title: "Double Quotes"
    },
    {
      id: "braces",
      title: "Braces"
    },
    {
      id: "string-commands",
      title: "String Commands"
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
      title="TCL Strings"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Commands"
      previousPath="/tcl/commands"
      nextLesson="Lists"
      nextPath="/tcl/lists"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Strings"
      >

        <p>
          A string is a sequence of characters such as
          a name, message, file name, module name, or
          file path.
        </p>

        <LessonVisual
          type="tcl-string"
          caption="A TCL string is a sequence of characters"
        >

          <div className="tcl-string-visual">

            <div className="tcl-string-label">
              String
            </div>

            <div className="tcl-string-value">
              VLSI Learn
            </div>

            <div className="tcl-string-characters">

              <span>V</span>
              <span>L</span>
              <span>S</span>
              <span>I</span>
              <span> </span>
              <span>L</span>
              <span>e</span>
              <span>a</span>
              <span>r</span>
              <span>n</span>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          CREATING STRINGS
      ================================================== */}

      <LessonSection
        id="creating"
        title="Creating Strings"
      >

        <p>
          Strings can be stored in variables using the
          <code>set</code> command.
        </p>

        <CodeExample title="Creating Strings">
{`set name "VLSI Learn"
set language "TCL"
set project "UART"`}
        </CodeExample>

        <p>
          The value can be accessed using the
          <code>$</code> symbol.
        </p>

        <CodeExample title="Using a String">
{`set project "UART"

puts "Project = $project"`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Remember"
        >
          Strings are commonly used in VLSI scripts for
          project names, module names, file names,
          directories, and tool settings.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          DOUBLE QUOTES
      ================================================== */}

      <LessonSection
        id="double-quotes"
        title="Double Quotes"
      >

        <p>
          Double quotes allow variable substitution and
          command substitution inside the string.
        </p>

        <CodeExample title="Variable Substitution">
{`set tool "Vivado"
set version "2025.1"

puts "Tool = $tool"
puts "Version = $version"`}
        </CodeExample>

        <CodeExample title="Command Substitution">
{`set width 8
set height 4

puts "Area = [expr $width * $height]"`}
        </CodeExample>

        <LessonVisual
          type="tcl-string-quotes"
          caption="Double quotes allow substitutions inside a string"
        >

          <div className="tcl-string-quotes-visual">

            <div className="tcl-string-code">
              <code>
                "Tool = $tool"
              </code>
            </div>

            <div className="tcl-string-arrow">
              →
            </div>

            <div className="tcl-string-result">

              <span>
                After substitution
              </span>

              <strong>
                Tool = Vivado
              </strong>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          BRACES
      ================================================== */}

      <LessonSection
        id="braces"
        title="Braces"
      >

        <p>
          Braces <code>{"{ }"}</code> prevent variable
          and command substitution inside the enclosed
          text.
        </p>

        <CodeExample title="Using Braces">
{`set tool "Vivado"

puts {$tool}
puts {The tool is $tool}`}
        </CodeExample>

        <p>
          The output remains literal because the contents
          inside braces are not substituted.
        </p>

        <CodeExample title="Output">
{`$tool
The tool is $tool`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Important"
        >
          Use double quotes when you want substitutions.
          Use braces when you want TCL to preserve the
          text exactly as written.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          STRING COMMANDS
      ================================================== */}

      <LessonSection
        id="string-commands"
        title="String Commands"
      >

        <p>
          TCL provides the <code>string</code> command
          with several subcommands for working with
          strings.
        </p>

        <CodeExample title="string length">
{`set module "UART"

set length [string length $module]

puts "Module = $module"
puts "Length = $length"`}
        </CodeExample>

        <CodeExample title="Changing Case">
{`set name "vlsi learn"

puts [string toupper $name]
puts [string tolower $name]`}
        </CodeExample>

        <CodeExample title="String Matching">
{`set filename "uart_top.v"

if {[string match "*.v" $filename]} {
    puts "Verilog file"
}`}
        </CodeExample>

        <div className="tcl-string-command-grid">

          <div className="tcl-string-command-card">

            <code>
              string length
            </code>

            <p>
              Returns the number of characters in a string.
            </p>

          </div>


          <div className="tcl-string-command-card">

            <code>
              string toupper
            </code>

            <p>
              Converts a string to uppercase.
            </p>

          </div>


          <div className="tcl-string-command-card">

            <code>
              string tolower
            </code>

            <p>
              Converts a string to lowercase.
            </p>

          </div>


          <div className="tcl-string-command-card">

            <code>
              string match
            </code>

            <p>
              Checks whether a string matches a pattern.
            </p>

          </div>

        </div>

      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="vlsi-example"
        title="VLSI Example"
      >

        <p>
          Strings are frequently used in VLSI automation
          to store design names, RTL files, module names,
          and tool configuration values.
        </p>

        <CodeExample title="VLSI-Style String Example">
{`set design "UART"
set top_module "uart_top"
set source_file "uart_top.v"

puts "Design      = $design"
puts "Top Module  = $top_module"
puts "Source File = $source_file"`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="TCL in EDA"
        >
          VLSI scripts often work with many filenames
          and configuration strings, making TCL string
          operations useful for automation.
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
          Practice TCL string operations by analyzing a
          VLSI source file and checking its file type.
        </p>

        <TryIt
          title="Try TCL Strings"
          language="TCL"
          initialCode={`# Analyze a VLSI source file

set filename "alu_controller.v"

set length [string length $filename]
set uppercase [string toupper $filename]

puts "Filename = $filename"
puts "Length = $length"
puts "Uppercase = $uppercase"

if {[string match "*.v" $filename]} {
    puts "File type = Verilog"
}`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Strings;