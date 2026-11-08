import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function EDA() {
  const sections = [
    { id: "introduction", title: "Perl in EDA" },
    { id: "why-perl", title: "Why Perl is Used" },
    { id: "flow", title: "EDA Automation Flow" },
    { id: "reports", title: "Report Processing" },
    { id: "files", title: "File Processing" },
    { id: "automation", title: "Tool Automation" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl in EDA"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Regular Expressions"
      previousPath="/perl/regex"
      nextLesson="Design Automation"
      nextPath="/perl/automation"
    >
      <LessonSection title="Perl in EDA" id="introduction">
        <p>
          Perl has been widely used for scripting and automation in
          electronic design automation (EDA). It can process text files,
          analyze reports, automate repetitive tasks, and connect different
          steps in a design flow.
        </p>

        <LessonVisual
          type="custom"
          caption="Perl can act as a scripting layer around different EDA tasks."
        >
          <div className="perl-eda-overview">
            <div>
              <span>Input</span>
              <strong>RTL / Reports</strong>
            </div>

            <div className="perl-eda-arrow">→</div>

            <div className="perl-eda-script">
              <span>Automation</span>
              <strong>Perl Script</strong>
            </div>

            <div className="perl-eda-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>Reports / Results</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="EDA Connection">
          In VLSI workflows, scripting languages are useful for repetitive
          operations that would otherwise require many manual steps.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Why Perl is Used" id="why-perl">
        <p>
          Perl is useful for EDA scripting because it provides strong text
          processing, file handling, regular expressions, arrays, hashes,
          loops, and subroutines.
        </p>

        <div className="perl-eda-feature-grid">
          <div>
            <strong>Text Processing</strong>
            <span>Process tool-generated reports.</span>
          </div>

          <div>
            <strong>Regex</strong>
            <span>Find patterns and values.</span>
          </div>

          <div>
            <strong>File Handling</strong>
            <span>Read and generate files.</span>
          </div>

          <div>
            <strong>Automation</strong>
            <span>Reduce repetitive work.</span>
          </div>

          <div>
            <strong>Data Structures</strong>
            <span>Organize design information.</span>
          </div>

          <div>
            <strong>Reusable Code</strong>
            <span>Build modular scripts.</span>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="EDA Automation Flow" id="flow">
        <p>
          A scripting workflow can collect input information, execute
          processing steps, analyze the generated results, and produce a
          final report.
        </p>

        <LessonVisual
          type="custom"
          caption="A simplified Perl-based EDA automation workflow."
        >
          <div className="perl-eda-flow">
            <div>
              <small>1</small>
              <strong>Input</strong>
              <span>Source files</span>
            </div>

            <div>→</div>

            <div>
              <small>2</small>
              <strong>Process</strong>
              <span>Perl script</span>
            </div>

            <div>→</div>

            <div>
              <small>3</small>
              <strong>Analyze</strong>
              <span>Reports</span>
            </div>

            <div>→</div>

            <div>
              <small>4</small>
              <strong>Report</strong>
              <span>Results</span>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Simple EDA Flow Script">
{`my @stages = (
    "Read RTL",
    "Run checks",
    "Analyze report",
    "Generate summary"
);

foreach my $stage (@stages) {
    print "Running: $stage\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Report Processing" id="reports">
        <p>
          EDA tools generate many text-based reports. Perl can search these
          reports and extract useful information such as timing values,
          warnings, errors, and utilization data.
        </p>

        <div className="perl-report-processing">
          <div className="perl-report-input">
            <span>Tool Report</span>
            <strong>Slack = 1.42 ns</strong>
          </div>

          <div className="perl-report-arrow">→</div>

          <div className="perl-report-regex">
            <span>Perl + Regex</span>
            <strong>Extract</strong>
          </div>

          <div className="perl-report-arrow">→</div>

          <div className="perl-report-output">
            <span>Result</span>
            <strong>1.42 ns</strong>
          </div>
        </div>

        <CodeExample title="Extracting a Report Value">
{`my $line = "Slack = 1.42 ns";

if ($line =~ /(\\d+\\.\\d+)/) {
    my $slack = $1;

    print "Slack = $slack ns\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="File Processing" id="files">
        <p>
          Perl can process lists of source files, configuration files,
          constraints, logs, and generated reports.
        </p>

        <CodeExample title="Processing a Source List">
{`my @files = (
    "uart_tx.v",
    "uart_rx.v",
    "uart_top.v",
    "uart_tb.v"
);

foreach my $file (@files) {
    print "Processing: $file\\n";
}`}
        </CodeExample>

        <div className="perl-file-processing">
          <div>
            <span>Source 1</span>
            <strong>uart_tx.v</strong>
          </div>

          <div>
            <span>Source 2</span>
            <strong>uart_rx.v</strong>
          </div>

          <div>
            <span>Source 3</span>
            <strong>uart_top.v</strong>
          </div>

          <div>
            <span>Source 4</span>
            <strong>uart_tb.v</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Tool Automation" id="automation">
        <p>
          Perl scripts can also be used as automation wrappers around
          command-line EDA tools. A script can prepare inputs, launch
          commands, collect outputs, and organize results.
        </p>

        <CodeExample title="Automation Structure">
{`my @steps = (
    "Prepare sources",
    "Run synthesis",
    "Run timing analysis",
    "Collect reports"
);

foreach my $step (@steps) {
    print "Executing: $step\\n";
}

print "Automation flow completed.\\n";`}
        </CodeExample>

        <div className="perl-tool-automation">
          <div>
            <strong>Prepare</strong>
          </div>

          <span>→</span>

          <div>
            <strong>Synthesis</strong>
          </div>

          <span>→</span>

          <div>
            <strong>Timing</strong>
          </div>

          <span>→</span>

          <div>
            <strong>Reports</strong>
          </div>
        </div>

        <LearningNote type="warning" title="Important">
          The exact commands used to launch EDA tools depend on the specific
          tool and environment. Perl provides the automation logic around
          those commands.
        </LearningNote>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Consider a UART project containing multiple RTL files. A Perl
          script can maintain the source list, process each file, collect
          information, and generate a summary.
        </p>

        <LessonVisual
          type="custom"
          caption="Perl can organize repetitive project-level tasks."
        >
          <div className="perl-vlsi-automation">
            <div>
              <span>RTL Files</span>
              <strong>UART Sources</strong>
            </div>

            <div className="perl-vlsi-arrow">→</div>

            <div className="perl-vlsi-script">
              <span>Script</span>
              <strong>Perl</strong>
            </div>

            <div className="perl-vlsi-arrow">→</div>

            <div>
              <span>Analysis</span>
              <strong>Reports</strong>
            </div>

            <div className="perl-vlsi-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>Summary</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="UART Project Automation Example">
{`my @sources = (
    "uart_tx.v",
    "uart_rx.v",
    "uart_top.v"
);

print "UART PROJECT\\n";
print "============\\n";

foreach my $source (@sources) {
    print "Source: $source\\n";
}

print "\\nSource files processed: "
    . scalar(@sources) . "\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try building a small EDA automation script that processes RTL
          source files and reports the number of files in the project.
        </p>

        <TryIt
          title="Try Perl in EDA"
          language="Perl"
          initialCode={`use strict;
use warnings;

my @sources = (
    "uart_tx.v",
    "uart_rx.v",
    "uart_top.v",
    "uart_tb.v"
);

print "EDA PROJECT ANALYSIS\\n";
print "====================\\n";

foreach my $source (@sources) {
    print "Processing: $source\\n";
}

print "\\nTotal RTL Files: "
    . scalar(@sources) . "\\n";

print "Automation completed.\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default EDA;