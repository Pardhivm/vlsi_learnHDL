import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function FileHandling() {
  const sections = [
    { id: "introduction", title: "File Handling in Perl" },
    { id: "open", title: "Opening Files" },
    { id: "read", title: "Reading Files" },
    { id: "write", title: "Writing Files" },
    { id: "append", title: "Appending to Files" },
    { id: "close", title: "Closing Files" },
    { id: "file-test", title: "File Test Operators" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl File Handling"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Subroutines"
      previousPath="/perl/subroutines"
      nextLesson="Regular Expressions"
      nextPath="/perl/regex"
    >
      <LessonSection title="File Handling in Perl" id="introduction">
        <p>
          File handling allows Perl programs to create, read, write, append,
          and process files. This is especially useful for automation scripts
          that work with reports, source files, logs, and configuration data.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl script can open a file, process its contents, and close it."
        >
          <div className="perl-file-flow">
            <div>
              <span>1</span>
              <strong>Open</strong>
            </div>

            <div>→</div>

            <div>
              <span>2</span>
              <strong>Read / Write</strong>
            </div>

            <div>→</div>

            <div>
              <span>3</span>
              <strong>Close</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Perl uses filehandles to communicate with files. Always close a
          file after finishing the required file operation.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Opening Files" id="open">
        <p>
          The <code>open</code> function is used to open a file. Perl
          supports different modes for reading, writing, and appending.
        </p>

        <div className="perl-file-mode-grid">
          <div>
            <strong>&lt;</strong>
            <span>Read</span>
          </div>

          <div>
            <strong>&gt;</strong>
            <span>Write</span>
          </div>

          <div>
            <strong>&gt;&gt;</strong>
            <span>Append</span>
          </div>
        </div>

        <CodeExample title="Opening a File for Reading">
{`open(my $file, "<", "report.txt")
    or die "Cannot open file: $!";

print "File opened successfully\\n";

close($file);`}
        </CodeExample>

        <LearningNote type="warning" title="Important">
          The <code>or die</code> part stops the program and displays an
          error if the file cannot be opened.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Reading Files" id="read">
        <p>
          A file can be read line by line using a filehandle inside a
          <code>while</code> loop.
        </p>

        <CodeExample title="Reading a File Line by Line">
{`open(my $file, "<", "report.txt")
    or die "Cannot open file: $!";

while (my $line = <$file>) {
    print $line;
}

close($file);`}
        </CodeExample>

        <div className="perl-read-visual">
          <div className="perl-read-file">
            <span>report.txt</span>
            <strong>Line 1</strong>
            <strong>Line 2</strong>
            <strong>Line 3</strong>
          </div>

          <div className="perl-read-arrow">→</div>

          <div className="perl-read-output">
            <span>Perl Program</span>
            <strong>Process Each Line</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Writing Files" id="write">
        <p>
          Use the <code>&gt;</code> mode when a file needs to be written.
          Existing contents are replaced when the file is opened in this
          mode.
        </p>

        <CodeExample title="Writing to a File">
{`open(my $file, ">", "report.txt")
    or die "Cannot open file: $!";

print $file "VLSI Design Report\\n";
print $file "Timing Check: PASS\\n";

close($file);`}
        </CodeExample>

        <div className="perl-write-visual">
          <div>
            <span>Perl Program</span>
            <strong>print $file</strong>
          </div>

          <div className="perl-write-arrow">→</div>

          <div>
            <span>File</span>
            <strong>report.txt</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Appending to Files" id="append">
        <p>
          Use the <code>&gt;&gt;</code> mode when new information should be
          added to the end of an existing file.
        </p>

        <CodeExample title="Appending to a File">
{`open(my $file, ">>", "report.txt")
    or die "Cannot open file: $!";

print $file "Power Check: PASS\\n";

close($file);`}
        </CodeExample>

        <div className="perl-append-visual">
          <div>
            <span>Existing</span>
            <strong>Timing: PASS</strong>
          </div>

          <div className="perl-append-plus">+</div>

          <div>
            <span>New</span>
            <strong>Power: PASS</strong>
          </div>

          <div className="perl-append-result">
            <span>File</span>
            <strong>Both Entries</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Closing Files" id="close">
        <p>
          The <code>close</code> function closes an opened filehandle.
          Closing files helps ensure that resources are released correctly.
        </p>

        <CodeExample title="Closing a File">
{`open(my $file, "<", "report.txt")
    or die "Cannot open file: $!";

# File operations go here

close($file);`}
        </CodeExample>

        <LessonVisual
          type="custom"
          caption="A typical file operation follows the Open → Process → Close sequence."
        >
          <div className="perl-open-close-cycle">
            <div>
              <strong>OPEN</strong>
            </div>

            <span>→</span>

            <div>
              <strong>PROCESS</strong>
            </div>

            <span>→</span>

            <div>
              <strong>CLOSE</strong>
            </div>
          </div>
        </LessonVisual>
      </LessonSection>

      <LessonSection title="File Test Operators" id="file-test">
        <p>
          Perl provides file test operators to check properties of files
          before performing operations.
        </p>

        <div className="perl-file-test-grid">
          <div>
            <strong>-e</strong>
            <span>File exists</span>
          </div>

          <div>
            <strong>-f</strong>
            <span>Regular file</span>
          </div>

          <div>
            <strong>-d</strong>
            <span>Directory</span>
          </div>

          <div>
            <strong>-r</strong>
            <span>Readable</span>
          </div>

          <div>
            <strong>-w</strong>
            <span>Writable</span>
          </div>

          <div>
            <strong>-s</strong>
            <span>File size</span>
          </div>
        </div>

        <CodeExample title="Checking a File">
{`my $filename = "report.txt";

if (-e $filename) {
    print "File exists\\n";
} else {
    print "File does not exist\\n";
}`}
        </CodeExample>

        <LearningNote type="tip" title="Tip">
          Checking a file before opening it can make automation scripts
          easier to debug and more reliable.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          File handling is important in VLSI automation because scripts often
          generate reports, read constraint files, process RTL source lists,
          and collect tool output.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl automation script can generate a simple timing report."
        >
          <div className="perl-report-visual">
            <div>
              <span>Input</span>
              <strong>Timing Data</strong>
            </div>

            <div className="perl-report-arrow">→</div>

            <div className="perl-report-script">
              <span>Perl</span>
              <strong>Process</strong>
            </div>

            <div className="perl-report-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>timing_report.txt</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="VLSI Report Example">
{`open(my $report, ">", "timing_report.txt")
    or die "Cannot create report: $!";

my $slack = 1.25;

print $report "TIMING REPORT\\n";
print $report "=============\\n";
print $report "Slack : $slack ns\\n";

if ($slack >= 0) {
    print $report "Status: PASS\\n";
} else {
    print $report "Status: FAIL\\n";
}

close($report);`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try generating a small VLSI timing report. The script creates a
          file, writes information into it, and then reads the file back.
        </p>

        <TryIt
          title="Try Perl File Handling"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $filename = "timing_report.txt";
my $slack = 1.8;

open(my $report, ">", $filename)
    or die "Cannot create report: $!";

print $report "VLSI TIMING REPORT\\n";
print $report "=================\\n";
print $report "Slack  : $slack ns\\n";

if ($slack >= 0) {
    print $report "Status : PASS\\n";
} else {
    print $report "Status : FAIL\\n";
}

close($report);

print "Report created: $filename\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default FileHandling;