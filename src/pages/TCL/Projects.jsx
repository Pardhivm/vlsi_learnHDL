import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TCLSidebar from "../../components/TCLSidebar";
import CodeExample from "../../components/CodeExample";

function TCLProjects() {
  const sections = [
    { id: "introduction", title: "TCL Projects" },
    { id: "project-1", title: "Project 1: RTL File Manager" },
    { id: "project-2", title: "Project 2: Design Flow Script" },
    { id: "project-3", title: "Project 3: Report Generator" },
    { id: "project-4", title: "Project 4: Vivado Automation" },
    { id: "project-5", title: "Project 5: Mini EDA Flow" },
    { id: "skills", title: "Skills You Practiced" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="TCL Projects"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Design Automation"
      previousPath="/tcl/automation"
    >
      <LessonSection
        id="introduction"
        title="TCL Projects"
      >
        <p>
          Projects help you combine individual TCL concepts
          into practical automation workflows used in VLSI,
          FPGA, and EDA environments.
        </p>

        <LessonVisual
          type="custom"
          caption="TCL concepts combine to create complete automation projects."
        >
          <div className="tcl-project-roadmap">
            <div>
              <span>01</span>
              <strong>Basics</strong>
              <small>Variables & commands</small>
            </div>

            <div className="tcl-project-arrow">→</div>

            <div>
              <span>02</span>
              <strong>Logic</strong>
              <small>Conditions & loops</small>
            </div>

            <div className="tcl-project-arrow">→</div>

            <div>
              <span>03</span>
              <strong>Automation</strong>
              <small>Procedures & files</small>
            </div>

            <div className="tcl-project-arrow">→</div>

            <div>
              <span>04</span>
              <strong>EDA</strong>
              <small>Tool automation</small>
            </div>
          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Project-based learning"
        >
          The projects below gradually move from general TCL
          scripting toward practical EDA automation.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-1"
        title="Project 1: RTL File Manager"
      >
        <p>
          Build a TCL script that stores RTL files in a list
          and processes them one by one.
        </p>

        <CodeExample title="RTL File Manager">
{`set rtl_files {
    rtl/top.v
    rtl/uart.v
    rtl/fifo.v
    rtl/register.v
}

puts "RTL Files:"
puts "----------"

foreach file $rtl_files {
    puts $file
}

puts "----------"
puts "Total files: [llength $rtl_files]"`}
        </CodeExample>

        <div className="tcl-project-objectives">
          <strong>Project objectives</strong>

          <ul>
            <li>Create and manage a TCL list.</li>
            <li>Use <code>foreach</code> to process files.</li>
            <li>Use <code>llength</code> to count files.</li>
            <li>Display useful information using <code>puts</code>.</li>
          </ul>
        </div>
      </LessonSection>

      <LessonSection
        id="project-2"
        title="Project 2: Design Flow Script"
      >
        <p>
          Create a simplified design-flow script that changes
          its behavior depending on the selected mode.
        </p>

        <CodeExample title="Design Flow Script">
{`set mode "synthesis"

puts "Starting design flow..."
puts "Selected mode: $mode"

if {$mode eq "synthesis"} {
    puts "Reading RTL..."
    puts "Running synthesis..."
} elseif {$mode eq "implementation"} {
    puts "Running implementation..."
} else {
    puts "Unknown design mode."
}

puts "Flow completed."`}
        </CodeExample>

        <div className="tcl-project-flow-visual">
          <div>
            <span>INPUT</span>
            <strong>Mode</strong>
          </div>

          <div>→</div>

          <div>
            <span>DECISION</span>
            <strong>if / elseif</strong>
          </div>

          <div>→</div>

          <div>
            <span>ACTION</span>
            <strong>Design Flow</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection
        id="project-3"
        title="Project 3: Report Generator"
      >
        <p>
          Build a small TCL script that collects design
          information and generates a simple report.
        </p>

        <CodeExample title="Simple Report Generator">
{`set project "UART"
set top "uart"
set files 4

puts "=========================="
puts "       DESIGN REPORT"
puts "=========================="
puts "Project : $project"
puts "Top     : $top"
puts "RTL     : $files files"
puts "Status  : Completed"
puts "=========================="`}
        </CodeExample>

        <div className="tcl-project-report">
          <div>
            <span>PROJECT</span>
            <strong>UART</strong>
          </div>

          <div>
            <span>TOP MODULE</span>
            <strong>uart</strong>
          </div>

          <div>
            <span>RTL FILES</span>
            <strong>4</strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong>Completed</strong>
          </div>
        </div>

        <LearningNote
          type="tip"
          title="Extension"
        >
          You can extend this project by writing the generated
          report into a file using TCL file-handling commands.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-4"
        title="Project 4: Vivado Automation"
      >
        <p>
          Create a TCL script that demonstrates the structure
          of an automated Vivado project flow.
        </p>

        <CodeExample title="Vivado Automation Structure">
{`create_project uart_project ./uart_project \\
    -part xc7a100tcsg324-1

add_files ./rtl/uart.v
add_files ./rtl/uart_tx.v
add_files ./rtl/uart_rx.v

add_files -fileset constrs_1 ./constraints/uart.xdc

set_property top uart [current_fileset]

launch_runs synth_1
wait_on_run synth_1

report_timing
report_utilization`}
        </CodeExample>

        <div className="tcl-project-vivado-flow">
          <div>
            <span>01</span>
            <strong>Project</strong>
          </div>

          <div>→</div>

          <div>
            <span>02</span>
            <strong>RTL</strong>
          </div>

          <div>→</div>

          <div>
            <span>03</span>
            <strong>Constraints</strong>
          </div>

          <div>→</div>

          <div>
            <span>04</span>
            <strong>Synthesis</strong>
          </div>

          <div>→</div>

          <div>
            <span>05</span>
            <strong>Reports</strong>
          </div>
        </div>

        <LearningNote
          type="warning"
          title="Run inside Vivado"
        >
          Commands such as <code>create_project</code>,
          <code>add_files</code>, and <code>launch_runs</code>
          require a Vivado environment. They are shown here
          as examples of real EDA automation.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-5"
        title="Project 5: Mini EDA Flow"
      >
        <p>
          This final project combines the major TCL concepts
          learned throughout the course into one simplified
          EDA-style automation script.
        </p>

        <CodeExample title="Mini EDA Automation Flow">
{`set project "uart_project"
set mode "synthesis"

set rtl_files {
    rtl/uart.v
    rtl/uart_tx.v
    rtl/uart_rx.v
}

proc process_rtl {file} {
    puts "Reading RTL: $file"
}

puts "================================"
puts "       MINI EDA FLOW"
puts "================================"
puts "Project: $project"

foreach file $rtl_files {
    process_rtl $file
}

if {$mode eq "synthesis"} {
    puts "Starting synthesis..."
    puts "Generating timing report..."
    puts "Generating utilization report..."
}

puts "================================"
puts "Flow completed."
puts "================================"`}
        </CodeExample>

        <div className="tcl-project-final-flow">
          <div className="tcl-project-final-step">
            <span>INPUT</span>
            <strong>RTL Files</strong>
          </div>

          <div>→</div>

          <div className="tcl-project-final-step">
            <span>PROCESS</span>
            <strong>Procedures + Loops</strong>
          </div>

          <div>→</div>

          <div className="tcl-project-final-step">
            <span>CONTROL</span>
            <strong>Conditions</strong>
          </div>

          <div>→</div>

          <div className="tcl-project-final-step">
            <span>EDA</span>
            <strong>Design Flow</strong>
          </div>

          <div>→</div>

          <div className="tcl-project-final-step">
            <span>OUTPUT</span>
            <strong>Reports</strong>
          </div>
        </div>

        <LearningNote
          type="tip"
          title="Final challenge"
        >
          Try extending this project with file handling,
          command-line arguments, error checking, and
          tool-specific EDA commands.
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="skills"
        title="Skills You Practiced"
      >
        <div className="tcl-project-skills">
          <div>
            <span>01</span>
            <strong>Variables</strong>
            <p>Store project and configuration information.</p>
          </div>

          <div>
            <span>02</span>
            <strong>Lists</strong>
            <p>Manage collections of RTL files.</p>
          </div>

          <div>
            <span>03</span>
            <strong>Conditions</strong>
            <p>Control different design-flow paths.</p>
          </div>

          <div>
            <span>04</span>
            <strong>Loops</strong>
            <p>Process multiple design objects.</p>
          </div>

          <div>
            <span>05</span>
            <strong>Procedures</strong>
            <p>Create reusable automation functions.</p>
          </div>

          <div>
            <span>06</span>
            <strong>File Handling</strong>
            <p>Read and generate project information.</p>
          </div>

          <div>
            <span>07</span>
            <strong>EDA Commands</strong>
            <p>Interact with design tools through TCL.</p>
          </div>

          <div>
            <span>08</span>
            <strong>Automation</strong>
            <p>Combine everything into repeatable flows.</p>
          </div>
        </div>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <div className="tcl-project-tryit">
          <div className="tcl-project-tryit-header">
            <div>
              <h3>Build Your Own Mini Flow</h3>
              <p>
                Modify the project name and RTL file list.
              </p>
            </div>

            <span>TCL</span>
          </div>

          <div className="tcl-project-editor">
            <div>Example</div>

            <pre>{`set project "counter_project"

set files {
    counter.v
    register.v
    clock_divider.v
}

puts "Project: $project"

foreach file $files {
    puts "Processing: $file"
}

puts "Flow completed."`}</pre>
          </div>

          <div className="tcl-project-output">
            <div>Expected Output</div>

            <pre>{`Project: counter_project
Processing: counter.v
Processing: register.v
Processing: clock_divider.v
Flow completed.`}</pre>
          </div>

          <div className="tcl-project-task">
            <strong>Challenge:</strong>

            <span>
              Add <code>timer.v</code> to the list and change
              the project name to <code>timer_project</code>.
            </span>
          </div>
        </div>

        <LearningNote
          type="info"
          title="Course complete"
        >
          You have now covered the core TCL concepts needed
          to begin writing scripts for VLSI and EDA workflows.
          The next step is to practice these concepts in an
          actual TCL-capable EDA environment.
        </LearningNote>
      </LessonSection>
    </LessonPage>
  );
}

export default TCLProjects;