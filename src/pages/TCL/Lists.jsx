import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function Lists() {

  const sections = [
    {
      id: "introduction",
      title: "TCL Lists"
    },
    {
      id: "creating",
      title: "Creating Lists"
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
      id: "removing",
      title: "Removing Elements"
    },
    {
      id: "list-commands",
      title: "List Commands"
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
      title="TCL Lists"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Strings"
      previousPath="/tcl/strings"
      nextLesson="Arrays"
      nextPath="/tcl/arrays"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL Lists"
      >

        <p>
          A TCL list is an ordered collection of values.
          Lists are useful when several related values
          need to be stored and processed together.
        </p>

        <LessonVisual
          type="tcl-list"
          caption="A TCL list stores multiple elements in an ordered sequence"
        >

          <div className="tcl-list-visual">

            <div className="tcl-list-title">
              Source Files
            </div>

            <div className="tcl-list-items">

              <div className="tcl-list-item">
                <span>0</span>
                <strong>uart.v</strong>
              </div>

              <div className="tcl-list-item">
                <span>1</span>
                <strong>fifo.v</strong>
              </div>

              <div className="tcl-list-item">
                <span>2</span>
                <strong>counter.v</strong>
              </div>

              <div className="tcl-list-item">
                <span>3</span>
                <strong>top.v</strong>
              </div>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          CREATING LISTS
      ================================================== */}

      <LessonSection
        id="creating"
        title="Creating Lists"
      >

        <p>
          A list can be created using the
          <code>list</code> command or by placing values
          inside braces.
        </p>

        <CodeExample title="Creating a List">
{`set modules [list UART FIFO Counter]
puts $modules`}
        </CodeExample>

        <CodeExample title="Using Braces">
{`set modules {UART FIFO Counter}

puts $modules`}
        </CodeExample>

        <LessonVisual
          type="tcl-list-create"
          caption="A list contains multiple ordered elements"
        >

          <div className="tcl-list-create-visual">

            <div className="tcl-list-create-code">
              <code>
                {`{UART FIFO Counter}`}
              </code>
            </div>

            <div className="tcl-list-create-arrow">
              →
            </div>

            <div className="tcl-list-create-result">

              <div>
                <span>0</span>
                UART
              </div>

              <div>
                <span>1</span>
                FIFO
              </div>

              <div>
                <span>2</span>
                Counter
              </div>

            </div>

          </div>

        </LessonVisual>

      </LessonSection>


      {/* ==================================================
          ACCESSING ELEMENTS
      ================================================== */}

      <LessonSection
        id="accessing"
        title="Accessing List Elements"
      >

        <p>
          The <code>lindex</code> command is used to
          access an element at a specific index.
        </p>

        <p>
          TCL list indexes start from <strong>0</strong>.
        </p>

        <CodeExample title="Using lindex">
{`set modules {UART FIFO Counter}

puts [lindex $modules 0]
puts [lindex $modules 1]
puts [lindex $modules 2]`}
        </CodeExample>

        <LessonVisual
          type="tcl-list-index"
          caption="TCL list indexing starts at zero"
        >

          <div className="tcl-list-index-visual">

            <div className="tcl-list-index-item">
              <span>Index 0</span>
              <strong>UART</strong>
            </div>

            <div className="tcl-list-index-item">
              <span>Index 1</span>
              <strong>FIFO</strong>
            </div>

            <div className="tcl-list-index-item">
              <span>Index 2</span>
              <strong>Counter</strong>
            </div>

          </div>

        </LessonVisual>

        <LearningNote
          type="info"
          title="Remember"
        >
          The first element of a TCL list has index
          <code>0</code>, not <code>1</code>.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          ADDING ELEMENTS
      ================================================== */}

      <LessonSection
        id="adding"
        title="Adding Elements"
      >

        <p>
          The <code>lappend</code> command adds one or
          more elements to the end of a list.
        </p>

        <CodeExample title="Using lappend">
{`set modules {UART FIFO}

lappend modules Counter
lappend modules ALU

puts $modules`}
        </CodeExample>

        <CodeExample title="Output">
{`UART FIFO Counter ALU`}
        </CodeExample>

      </LessonSection>


      {/* ==================================================
          REMOVING ELEMENTS
      ================================================== */}

      <LessonSection
        id="removing"
        title="Removing Elements"
      >

        <p>
          The <code>lreplace</code> command can be used
          to replace or remove elements from a list.
        </p>

        <CodeExample title="Removing an Element">
{`set modules {UART FIFO Counter ALU}

set modules [lreplace $modules 1 1]

puts $modules`}
        </CodeExample>

        <CodeExample title="Output">
{`UART Counter ALU`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Tip"
        >
          <code>lreplace</code> uses index positions to
          determine which elements should be changed.
        </LearningNote>

      </LessonSection>


      {/* ==================================================
          LIST COMMANDS
      ================================================== */}

      <LessonSection
        id="list-commands"
        title="Useful List Commands"
      >

        <p>
          TCL provides several commands for working with
          lists.
        </p>

        <div className="tcl-list-command-grid">

          <div className="tcl-list-command-card">
            <code>lindex</code>
            <p>
              Returns an element at a specified index.
            </p>
          </div>

          <div className="tcl-list-command-card">
            <code>lappend</code>
            <p>
              Adds elements to the end of a list.
            </p>
          </div>

          <div className="tcl-list-command-card">
            <code>lreplace</code>
            <p>
              Replaces or removes list elements.
            </p>
          </div>

          <div className="tcl-list-command-card">
            <code>llength</code>
            <p>
              Returns the number of elements.
            </p>
          </div>

          <div className="tcl-list-command-card">
            <code>lrange</code>
            <p>
              Returns a range of elements.
            </p>
          </div>

        </div>

        <CodeExample title="llength Example">
{`set files {alu.v counter.v mux.v top.v}

set count [llength $files]

puts "Number of files = $count"`}
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
          Lists are especially useful in VLSI automation
          because a design often contains multiple RTL
          source files.
        </p>

        <CodeExample title="RTL Source File List">
{`set rtl_files {
    uart.v
    fifo.v
    counter.v
    baud_generator.v
    top.v
}

puts "RTL files:"
puts $rtl_files

puts "Number of files = [llength $rtl_files]"`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="TCL in EDA"
        >
          A TCL script can maintain lists of RTL files,
          modules, constraints, clocks, libraries, or
          other design objects and process them
          automatically.
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
          Practice TCL lists by creating a list of
          synthesis stages and accessing its elements.
        </p>

        <TryIt
          title="Try TCL Lists"
          language="TCL"
          initialCode={`# TCL List Practice

set stages {
    Elaboration
    Synthesis
    Optimization
    Implementation
}

puts "First stage = [lindex $stages 0]"
puts "Last stage = [lindex $stages end]"
puts "Total stages = [llength $stages]"

lappend stages Bitstream

puts "Updated stages:"
puts $stages`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default Lists;