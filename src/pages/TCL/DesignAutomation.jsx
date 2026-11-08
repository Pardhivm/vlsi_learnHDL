import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TCLSidebar from "../../components/TCLSidebar";
import CodeExample from "../../components/CodeExample";

function DesignAutomation() {
  const sections = [
    { id: "introduction", title: "Design Automation" },
    { id: "why-automation", title: "Why Automate?" },
    { id: "script-flow", title: "Automation Flow" },
    { id: "conditions", title: "Conditional Automation" },
    { id: "loops", title: "Loop-Based Automation" },
    { id: "procedure", title: "Reusable Automation" },
    { id: "complete-flow", title: "Complete Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="TCL Design Automation"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Vivado TCL"
      previousPath="/tcl/vivado"
      nextLesson="Projects"
      nextPath="/tcl/projects"
    >
      <LessonSection
        id="introduction"
        title="TCL Design Automation"
      >
        <p>
          Design automation means using scripts to perform
          repetitive design tasks automatically instead of
          performing every operation manually.
        </p>

        <LessonVisual
          type="custom"
          caption="TCL connects design inputs, automation logic, EDA commands, and results."
        >
          <div className="tcl-auto-overview">
            <div className="tcl-auto-node">
              <span>INPUT</span>
              <strong>Design Files</strong>
            </div>

            <div className="tcl-auto-arrow">→</div>

            <div className="tcl-auto-node tcl-auto-script">
              <span>AUTOMATION</span>
              <strong>TCL Script</strong>
            </div>

            <div className="tcl-auto-arrow">→</div>

            <div className="tcl-auto-node">
              <span>PROCESS</span>
              <strong>EDA Tool</strong>
            </div>

            <div className="tcl-auto-arrow">→</div>

            <div className="tcl-auto-node">
              <span>OUTPUT</span>
              <strong>Reports</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Key idea"
        >
          A good automation script turns a sequence of repetitive
          manual operations into a repeatable workflow.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="why-automation"
        title="Why Automate?"
      >
        <p>
          VLSI and FPGA design flows can contain many repetitive
          operations. TCL can help organize these operations into
          reusable scripts.
        </p>

        <div className="tcl-auto-benefits">
          <div>
            <span>01</span>
            <strong>Save Time</strong>
            <p>Reduce repetitive manual operations.</p>
          </div>

          <div>
            <span>02</span>
            <strong>Consistency</strong>
            <p>Run the same sequence of commands repeatedly.</p>
          </div>

          <div>
            <span>03</span>
            <strong>Scalability</strong>
            <p>Process multiple files or configurations.</p>
          </div>

          <div>
            <span>04</span>
            <strong>Reusability</strong>
            <p>Use the same scripts across projects.</p>
          </div>
        </div>

        <CodeExample title="Manual vs automated approach">
{`# Repeated manually
read_verilog rtl/a.v
read_verilog rtl/b.v
read_verilog rtl/c.v

# Automated approach
foreach file $rtl_files {
    read_verilog $file
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection
        id="script-flow"
        title="Automation Flow"
      >
        <p>
          A typical automation script can follow a sequence
          such as loading files, configuring the design, running
          tools, and generating reports.
        </p>

        <LessonVisual
          type="custom"
          caption="A simplified TCL automation workflow."
        >
          <div className="tcl-auto-flow">
            <div>
              <span>01</span>
              <strong>Collect Inputs</strong>
              <small>RTL / constraints</small>
            </div>

            <div className="tcl-auto-flow-arrow">→</div>

            <div>
              <span>02</span>
              <strong>Configure</strong>
              <small>Set parameters</small>
            </div>

            <div className="tcl-auto-flow-arrow">→</div>

            <div>
              <span>03</span>
              <strong>Run Flow</strong>
              <small>EDA operations</small>
            </div>

            <div className="tcl-auto-flow-arrow">→</div>

            <div>
              <span>04</span>
              <strong>Check Results</strong>
              <small>Reports</small>
            </div>
          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Think like a flow designer"
        >
          Break a large design task into small predictable
          steps. TCL can then connect those steps into one flow.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="conditions"
        title="Conditional Automation"
      >
        <p>
          Conditions allow a script to make decisions based on
          values, configuration settings, or results returned
          by the tool.
        </p>

        <CodeExample title="Example">
{`set mode "synthesis"

if {$mode eq "synthesis"} {
    puts "Starting synthesis..."
} elseif {$mode eq "implementation"} {
    puts "Starting implementation..."
} else {
    puts "Unknown flow"
}`}
        </CodeExample>

        <div className="tcl-auto-decision">
          <div className="tcl-auto-decision-start">
            <strong>Mode</strong>
            <span>Selected</span>
          </div>

          <div className="tcl-auto-decision-line">→</div>

          <div className="tcl-auto-condition">
            <strong>Check Mode</strong>
            <span>if / elseif / else</span>
          </div>

          <div className="tcl-auto-decision-line">→</div>

          <div className="tcl-auto-results">
            <div>Synthesis</div>
            <div>Implementation</div>
            <div>Other Flow</div>
          </div>
        </div>
      </LessonSection>

      <LessonSection
        id="loops"
        title="Loop-Based Automation"
      >
        <p>
          Loops are useful when the same operation needs to be
          performed on several design files, modules, reports,
          or configurations.
        </p>

        <CodeExample title="Processing multiple RTL files">
{`set rtl_files {
    uart.v
    fifo.v
    counter.v
    register.v
}

foreach file $rtl_files {
    puts "Processing: $file"
}`}
        </CodeExample>

        <div className="tcl-auto-list">
          <span>uart.v</span>
          <span>fifo.v</span>
          <span>counter.v</span>
          <span>register.v</span>
        </div>

        <LearningNote
          type="info"
          title="VLSI connection"
        >
          Instead of writing the same command once for every
          file, a loop can process the complete collection.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="procedure"
        title="Reusable Automation"
      >
        <p>
          Procedures allow frequently used automation steps to
          be packaged into reusable TCL commands.
        </p>

        <CodeExample title="Reusable procedure">
{`proc process_file {file} {
    puts "Processing $file"
}

process_file "uart.v"
process_file "fifo.v"
process_file "counter.v"`}
        </CodeExample>

        <div className="tcl-auto-procedure">
          <div>
            <span>DEFINE</span>
            <strong>process_file</strong>
          </div>

          <div className="tcl-auto-procedure-arrow">→</div>

          <div>
            <span>CALL</span>
            <strong>uart.v</strong>
          </div>

          <div className="tcl-auto-procedure-arrow">→</div>

          <div>
            <span>CALL</span>
            <strong>fifo.v</strong>
          </div>

          <div className="tcl-auto-procedure-arrow">→</div>

          <div>
            <span>CALL</span>
            <strong>counter.v</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection
        id="complete-flow"
        title="Complete Automation Example"
      >
        <p>
          The following example combines variables, lists,
          loops, conditions, and procedures into a simplified
          design automation flow.
        </p>

        <CodeExample title="Simplified VLSI automation script">
{`set project "uart_project"
set mode "synthesis"

set rtl_files {
    rtl/uart.v
    rtl/uart_tx.v
    rtl/uart_rx.v
}

proc process_file {file} {
    puts "Reading: $file"
}

puts "Project: $project"

foreach file $rtl_files {
    process_file $file
}

if {$mode eq "synthesis"} {
    puts "Running synthesis..."
}

puts "Generating reports..."
puts "Flow completed."`}
        </CodeExample>

        <div className="tcl-auto-complete">
          <div>
            <span>PROJECT</span>
            <strong>UART</strong>
          </div>

          <div>→</div>

          <div>
            <span>FILES</span>
            <strong>RTL</strong>
          </div>

          <div>→</div>

          <div>
            <span>LOOP</span>
            <strong>Process</strong>
          </div>

          <div>→</div>

          <div>
            <span>CONDITION</span>
            <strong>Synthesis</strong>
          </div>

          <div>→</div>

          <div>
            <span>OUTPUT</span>
            <strong>Reports</strong>
          </div>
        </div>

        <LearningNote
          type="tip"
          title="What you learned"
        >
          This example combines several TCL concepts into one
          automation workflow. Real EDA scripts can become much
          larger and may contain tool-specific commands.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <div className="tcl-auto-tryit">
          <div className="tcl-auto-tryit-header">
            <div>
              <h3>Practice TCL Automation</h3>
              <p>
                Follow the flow and predict the output.
              </p>
            </div>

            <span>TCL</span>
          </div>

          <div className="tcl-auto-editor">
            <div>Example</div>

            <pre>{`set files {
    uart.v
    fifo.v
    counter.v
}

foreach file $files {
    puts "Processing $file"
}

puts "Automation completed."`}</pre>
          </div>

          <div className="tcl-auto-output">
            <div>Expected Output</div>

            <pre>{`Processing uart.v
Processing fifo.v
Processing counter.v
Automation completed.`}</pre>
          </div>

          <div className="tcl-auto-task">
            <strong>Try this:</strong>

            <span>
              Add another file such as
              <code> alu.v </code>
              to the list and predict the output.
            </span>
          </div>
        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          This TryIt section demonstrates TCL automation
          concepts. Actual EDA commands are executed only
          inside the corresponding EDA tool environment.
        </LearningNote>
      </LessonSection>
    </LessonPage>
  );
}

export default DesignAutomation;