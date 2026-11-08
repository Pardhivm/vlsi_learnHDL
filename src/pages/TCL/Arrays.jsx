import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Arrays() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Arrays"
    },
    {
      id: "creating",
      title: "Creating Arrays"
    },
    {
      id: "accessing",
      title: "Accessing Elements"
    },
    {
      id: "adding",
      title: "Adding Elements"
    },
    {
      id: "checking",
      title: "Checking Elements"
    },
    {
      id: "array-commands",
      title: "Array Commands"
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
      title="TCL Arrays"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Lists"
      previousPath="/tcl/lists"
      nextLesson="If / Else"
      nextPath="/tcl/if-else"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Arrays"
      >

        <p>
          A TCL array is a collection of values stored
          using named indexes called keys.
        </p>

        <p>
          Unlike lists, arrays do not use numerical
          positions as their main identifiers. Each value
          is accessed using a key.
        </p>

        <LessonVisual
          type="tcl-array"
          caption="A TCL array stores values using named keys"
        >

          <div className="tcl-array-visual">

            <div className="tcl-array-title">
              Design Configuration
            </div>

            <div className="tcl-array-grid">

              <div className="tcl-array-cell">
                <span>Key</span>
                <strong>clock</strong>
              </div>

              <div className="tcl-array-cell">
                <span>Value</span>
                <strong>100MHz</strong>
              </div>

              <div className="tcl-array-cell">
                <span>Key</span>
                <strong>top</strong>
              </div>

              <div className="tcl-array-cell">
                <span>Value</span>
                <strong>uart_top</strong>
              </div>

              <div className="tcl-array-cell">
                <span>Key</span>
                <strong>device</strong>
              </div>

              <div className="tcl-array-cell">
                <span>Value</span>
                <strong>Artix-7</strong>
              </div>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          CREATING ARRAYS
      ================================================== */}

      <LessonSection
        id="creating"
        title="Creating Arrays"
      >

        <p>
          TCL arrays are created by assigning a value to
          an array element.
        </p>

        <CodeExample title="Creating an Array">
{`set design(top) "uart_top"
set design(clock) "100MHz"
set design(device) "Artix-7"`}
        </CodeExample>

        <p>
          Here, <code>design</code> is the array name and
          <code>top</code>, <code>clock</code>, and
          <code>device</code> are the keys.
        </p>

        <LessonVisual
          type="tcl-array-structure"
          caption="Array name, key, and value"
        >

          <div className="tcl-array-structure">

            <div className="tcl-array-part">
              <span>Array</span>
              <strong>design</strong>
            </div>

            <div className="tcl-array-bracket">
              [
            </div>

            <div className="tcl-array-part">
              <span>Key</span>
              <strong>clock</strong>
            </div>

            <div className="tcl-array-bracket">
              ]
            </div>

            <div className="tcl-array-equals">
              =
            </div>

            <div className="tcl-array-part value">
              <span>Value</span>
              <strong>100MHz</strong>
            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          ACCESSING ELEMENTS
      ================================================== */}

      <LessonSection
        id="accessing"
        title="Accessing Array Elements"
      >

        <p>
          An array element can be accessed by specifying
          its key.
        </p>

        <CodeExample title="Accessing Array Values">
{`set design(top) "uart_top"
set design(clock) "100MHz"
set design(device) "Artix-7"

puts "Top = $design(top)"
puts "Clock = $design(clock)"
puts "Device = $design(device)"`}
        </CodeExample>

        <CodeExample title="Output">
{`Top = uart_top
Clock = 100MHz
Device = Artix-7`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Remember"
        >
          The key identifies the array element. For
          example, <code>design(clock)</code> accesses the
          value stored using the key <code>clock</code>.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          ADDING ELEMENTS
      ================================================== */}

      <LessonSection
        id="adding"
        title="Adding Array Elements"
      >

        <p>
          New elements can be added simply by assigning
          a value to a new key.
        </p>

        <CodeExample title="Adding Elements">
{`set config(clock) "100MHz"
set config(reset) "active_high"

set config(tool) "Vivado"
set config(part) "xc7a100tcsg324-1"

puts $config(clock)
puts $config(tool)`}
        </CodeExample>

        <p>
          Arrays can therefore be expanded whenever the
          script needs additional configuration values.
        </p>

      </LessonSection>


      {/* ==================================================
          CHECKING ELEMENTS
      ================================================== */}

      <LessonSection
        id="checking"
        title="Checking Array Elements"
      >

        <p>
          The <code>info exists</code> command checks
          whether a particular array element exists.
        </p>

        <CodeExample title="Checking an Element">
{`set design(top) "uart_top"
set design(clock) "100MHz"

if {[info exists design(clock)]} {
    puts "Clock information exists"
}

if {[info exists design(reset)]} {
    puts "Reset information exists"
} else {
    puts "Reset information does not exist"
}`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Tip"
        >
          Checking whether an element exists before using
          it can help prevent errors in automation scripts.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          ARRAY COMMANDS
      ================================================== */}

      <LessonSection
        id="array-commands"
        title="Useful Array Commands"
      >

        <p>
          TCL provides the <code>array</code> command for
          inspecting and managing arrays.
        </p>

        <div className="tcl-array-command-grid">

          <div className="tcl-array-command-card">
            <code>array exists</code>
            <p>
              Checks whether an array exists.
            </p>
          </div>

          <div className="tcl-array-command-card">
            <code>array names</code>
            <p>
              Returns the keys stored in an array.
            </p>
          </div>

          <div className="tcl-array-command-card">
            <code>array size</code>
            <p>
              Returns the number of elements.
            </p>
          </div>

          <div className="tcl-array-command-card">
            <code>array get</code>
            <p>
              Returns the array as key-value pairs.
            </p>
          </div>

        </div>

        <CodeExample title="array names">
{`set design(top) "uart_top"
set design(clock) "100MHz"
set design(device) "Artix-7"

puts [array names design]`}
        </CodeExample>

        <CodeExample title="array size">
{`set design(top) "uart_top"
set design(clock) "100MHz"
set design(device) "Artix-7"

puts "Number of settings = [array size design]"`}
        </CodeExample>

      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="vlsi-example"
        title="VLSI Example"
      >

        <p>
          Arrays are useful in VLSI automation for storing
          configuration information such as clock settings,
          device information, module names, and tool
          options.
        </p>

        <CodeExample title="VLSI Configuration Array">
{`set config(top_module) "uart_top"
set config(clock_period) "10ns"
set config(device) "xc7a100tcsg324-1"
set config(tool) "Vivado"

puts "Top Module    = $config(top_module)"
puts "Clock Period  = $config(clock_period)"
puts "Device        = $config(device)"
puts "Tool          = $config(tool)"`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="TCL in EDA"
        >
          TCL arrays can organize configuration data
          used by automated EDA scripts and design flows.
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
          Practice TCL arrays by creating a small FPGA
          configuration and accessing its values.
        </p>

        <TryIt
          title="Try TCL Arrays"
          language="TCL"
          initialCode={`# TCL Array Practice

set fpga(device) "Artix-7"
set fpga(clock) "100MHz"
set fpga(top) "uart_top"
set fpga(tool) "Vivado"

puts "FPGA Device = $fpga(device)"
puts "Clock = $fpga(clock)"
puts "Top Module = $fpga(top)"
puts "Tool = $fpga(tool)"

puts "Number of settings = [array size fpga]"

if {[info exists fpga(clock)]} {
    puts "Clock setting is available"
}`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Arrays;