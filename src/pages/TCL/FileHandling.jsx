import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import TCLSidebar from "../../components/TCLSidebar";

function FileHandling() {
  const sections = [
    {
      id: "introduction",
      title: "TCL File Handling"
    },
    {
      id: "open",
      title: "Opening a File"
    },
    {
      id: "read",
      title: "Reading a File"
    },
    {
      id: "write",
      title: "Writing to a File"
    },
    {
      id: "close",
      title: "Closing a File"
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
      title="TCL File Handling"
      courseName="TCL"
      sidebar={<TCLSidebar />}
      sections={sections}
      previousLesson="Procedures"
      previousPath="/tcl/procedures"
      nextLesson="TCL in EDA"
      nextPath="/tcl/eda"
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <LessonSection
        id="introduction"
        title="TCL File Handling"
      >
        <p>
          TCL provides commands for creating, opening,
          reading, writing, and closing files.
        </p>

        <p>
          File handling is important in VLSI automation
          because scripts often need to process source
          files, reports, constraints, logs, and generated
          configuration files.
        </p>

        <LessonVisual
          type="tcl-file-flow"
          caption="Typical TCL file handling flow"
        >
          <div className="tcl-file-flow">

            <div className="tcl-file-step">
              <span>1</span>
              <strong>Open</strong>
              <small>File</small>
            </div>

            <div className="tcl-file-arrow">
              →
            </div>

            <div className="tcl-file-step">
              <span>2</span>
              <strong>Read / Write</strong>
              <small>Data</small>
            </div>

            <div className="tcl-file-arrow">
              →
            </div>

            <div className="tcl-file-step">
              <span>3</span>
              <strong>Close</strong>
              <small>File</small>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          OPEN
      ================================================== */}

      <LessonSection
        id="open"
        title="Opening a File"
      >
        <p>
          The <code>open</code> command opens a file and
          returns a file handle.
        </p>

        <CodeExample title="Opening a File">
{`set fileId [open "design.txt" r]

puts "File opened successfully"

close $fileId`}
        </CodeExample>

        <p>
          The mode <code>r</code> means that the file is
          opened for reading.
        </p>

        <div className="tcl-file-mode-grid">

          <div className="tcl-file-mode-card">
            <code>r</code>
            <span>Read</span>
          </div>

          <div className="tcl-file-mode-card">
            <code>w</code>
            <span>Write</span>
          </div>

          <div className="tcl-file-mode-card">
            <code>a</code>
            <span>Append</span>
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          READ
      ================================================== */}

      <LessonSection
        id="read"
        title="Reading a File"
      >
        <p>
          The <code>read</code> command reads data from an
          opened file.
        </p>

        <CodeExample title="Reading File Contents">
{`set fileId [open "design.txt" r]

set data [read $fileId]

puts $data

close $fileId`}
        </CodeExample>

        <LessonVisual
          type="tcl-file-read"
          caption="Data flows from the file into a TCL variable"
        >
          <div className="tcl-file-read-visual">

            <div className="tcl-file-document">
              <span>design.txt</span>
              <code>
                module uart;
                <br />
                endmodule
              </code>
            </div>

            <div className="tcl-file-read-arrow">
              →
            </div>

            <div className="tcl-file-data">
              <span>TCL Variable</span>
              <code>$data</code>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* ==================================================
          WRITE
      ================================================== */}

      <LessonSection
        id="write"
        title="Writing to a File"
      >
        <p>
          A file can be opened using the <code>w</code>
          mode to write new content.
        </p>

        <CodeExample title="Writing to a File">
{`set fileId [open "report.txt" w]

puts $fileId "VLSI Design Report"
puts $fileId "Synthesis completed"

close $fileId`}
        </CodeExample>

        <p>
          When a file is opened with <code>w</code>, new
          content is written to the file.
        </p>

        <LearningNote
          type="warning"
          title="Be Careful"
        >
          Opening an existing file with <code>w</code> can
          overwrite its previous contents.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          CLOSE
      ================================================== */}

      <LessonSection
        id="close"
        title="Closing a File"
      >
        <p>
          The <code>close</code> command closes an opened
          file using its file handle.
        </p>

        <CodeExample title="Closing a File">
{`set fileId [open "report.txt" w]

puts $fileId "Synthesis completed"

close $fileId`}
        </CodeExample>

        <LessonVisual
          type="tcl-file-close"
          caption="Always close a file after finishing the operation"
        >
          <div className="tcl-file-close-visual">

            <div className="tcl-file-open-state">
              <span>File Handle</span>
              <strong>$fileId</strong>
            </div>

            <div className="tcl-file-close-arrow">
              →
            </div>

            <div className="tcl-file-closed-state">
              <span>Status</span>
              <strong>Closed</strong>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Good Practice"
        >
          Close files after reading or writing. This keeps
          file resources properly managed by the script.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          VLSI EXAMPLE
      ================================================== */}

      <LessonSection
        id="vlsi-example"
        title="VLSI Example"
      >
        <p>
          TCL file handling can be used to generate simple
          reports during an automated design flow.
        </p>

        <CodeExample title="Generate a VLSI Report">
{`set report [open "synthesis_report.txt" w]

puts $report "SYNTHESIS REPORT"
puts $report "================"
puts $report "Top Module : uart_top"
puts $report "Clock      : 100 MHz"
puts $report "Status     : PASS"

close $report

puts "Report generated successfully"`}
        </CodeExample>

        <CodeExample title="Generated File">
{`SYNTHESIS REPORT
================
Top Module : uart_top
Clock      : 100 MHz
Status     : PASS`}
        </CodeExample>

        <LearningNote
          type="vlsi"
          title="Why This Matters in EDA"
        >
          EDA tools generate many reports and log files.
          TCL scripts can read these files, extract useful
          information, and generate new reports automatically.
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
          This example creates a small timing report file,
          writes information into it, closes the file, and
          then reads the generated report.
        </p>

        <TryIt
          title="Try TCL File Handling"
          language="TCL"
          initialCode={`# TCL File Handling Practice

set reportFile "timing_report.txt"

set fileId [open $reportFile w]

puts $fileId "TIMING REPORT"
puts $fileId "=============="
puts $fileId "Clock : 100 MHz"
puts $fileId "Slack : 0.42 ns"
puts $fileId "Status: PASS"

close $fileId

set fileId [open $reportFile r]

set report [read $fileId]

close $fileId

puts $report`}
        />

      </LessonSection>

    </LessonPage>
  );
}

export default FileHandling;