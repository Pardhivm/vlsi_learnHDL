import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Automation() {
  const sections = [
    { id: "introduction", title: "Design Automation" },
    { id: "automation-flow", title: "Automation Flow" },
    { id: "batch-processing", title: "Batch Processing" },
    { id: "command-execution", title: "Command Execution" },
    { id: "reports", title: "Report Automation" },
    { id: "regression", title: "Regression Automation" },
    { id: "vlsi-example", title: "VLSI Automation Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Design Automation"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Perl in EDA"
      previousPath="/perl/eda"
      nextLesson="Projects"
      nextPath="/perl/projects"
    >
      <LessonSection title="Design Automation" id="introduction">
        <p>
          Design automation means using scripts and tools to perform
          repetitive engineering tasks automatically. In VLSI, automation
          can reduce manual work during RTL processing, simulation,
          synthesis, timing analysis, and report generation.
        </p>

        <LessonVisual
          type="custom"
          caption="Perl can coordinate multiple steps in a VLSI workflow."
        >
          <div className="perl-auto-overview">
            <div>
              <span>Input</span>
              <strong>Design Files</strong>
            </div>

            <div className="perl-auto-arrow">→</div>

            <div className="perl-auto-script">
              <span>Automation</span>
              <strong>Perl Script</strong>
            </div>

            <div className="perl-auto-arrow">→</div>

            <div>
              <span>Processing</span>
              <strong>EDA Tools</strong>
            </div>

            <div className="perl-auto-arrow">→</div>

            <div>
              <span>Output</span>
              <strong>Reports</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Key Idea">
          Instead of performing the same sequence of commands manually,
          a script can organize the sequence and process many inputs
          consistently.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Automation Flow" id="automation-flow">
        <p>
          A typical automation script follows a sequence of steps. The
          script prepares the input, performs processing, checks the result,
          and produces a summary.
        </p>

        <div className="perl-auto-flow">
          <div>
            <small>01</small>
            <strong>Prepare</strong>
            <span>Inputs</span>
          </div>

          <div>→</div>

          <div>
            <small>02</small>
            <strong>Execute</strong>
            <span>Tasks</span>
          </div>

          <div>→</div>

          <div>
            <small>03</small>
            <strong>Check</strong>
            <span>Results</span>
          </div>

          <div>→</div>

          <div>
            <small>04</small>
            <strong>Report</strong>
            <span>Summary</span>
          </div>
        </div>

        <CodeExample title="Basic Automation Structure">
{`my @steps = (
    "Prepare design",
    "Run simulation",
    "Check results",
    "Generate report"
);

foreach my $step (@steps) {
    print "STEP: $step\\n";
}

print "Automation completed.\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Batch Processing" id="batch-processing">
        <p>
          Batch processing allows a script to perform the same operation on
          multiple files or design blocks.
        </p>

        <div className="perl-batch-grid">
          <div>
            <span>Design 1</span>
            <strong>UART</strong>
          </div>

          <div>
            <span>Design 2</span>
            <strong>SPI</strong>
          </div>

          <div>
            <span>Design 3</span>
            <strong>I2C</strong>
          </div>

          <div>
            <span>Design 4</span>
            <strong>GPIO</strong>
          </div>
        </div>

        <CodeExample title="Batch Processing Example">
{`my @designs = (
    "UART",
    "SPI",
    "I2C",
    "GPIO"
);

foreach my $design (@designs) {
    print "Processing $design design...\\n";
}

print "All designs processed.\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Command Execution" id="command-execution">
        <p>
          Perl can be used as an automation layer around command-line
          programs. The exact command depends on the EDA tool and operating
          environment.
        </p>

        <CodeExample title="Command Execution Structure">
{`my $command = "echo Running simulation";

my $result = system($command);

if ($result == 0) {
    print "Command completed successfully.\\n";
} else {
    print "Command failed.\\n";
}`}
        </CodeExample>

        <LearningNote type="warning" title="EDA Environment">
          Actual synthesis, simulation, or implementation commands must
          match the EDA tools installed on the machine. The example above
          demonstrates the Perl automation structure.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Report Automation" id="reports">
        <p>
          Automation scripts can collect important information from
          generated reports and create a smaller summary for the designer.
        </p>

        <div className="perl-report-pipeline">
          <div>
            <strong>Tool Report</strong>
            <span>Large text file</span>
          </div>

          <div>→</div>

          <div className="perl-report-script">
            <strong>Perl</strong>
            <span>Search + Extract</span>
          </div>

          <div>→</div>

          <div>
            <strong>Summary</strong>
            <span>Important values</span>
          </div>
        </div>

        <CodeExample title="Report Summary Example">
{`my $timing = 1.28;
my $area = 2450;
my $power = 18.6;

print "DESIGN SUMMARY\\n";
print "==============\\n";
print "Timing Slack : $timing ns\\n";
print "Area         : $area um2\\n";
print "Power        : $power mW\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Regression Automation" id="regression">
        <p>
          Regression testing runs multiple tests to check whether a design
          continues to behave correctly after changes.
        </p>

        <div className="perl-regression">
          <div>
            <small>TEST 01</small>
            <strong>UART TX</strong>
            <span>PASS</span>
          </div>

          <div>
            <small>TEST 02</small>
            <strong>UART RX</strong>
            <span>PASS</span>
          </div>

          <div>
            <small>TEST 03</small>
            <strong>FIFO</strong>
            <span>PASS</span>
          </div>

          <div>
            <small>TEST 04</small>
            <strong>Clock</strong>
            <span>PASS</span>
          </div>
        </div>

        <CodeExample title="Simple Regression Script">
{`my @tests = (
    "UART_TX",
    "UART_RX",
    "FIFO",
    "CLOCK"
);

foreach my $test (@tests) {
    print "Running test: $test\\n";
}

print "\\nRegression completed.\\n";`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="VLSI Automation Example" id="vlsi-example">
        <p>
          Consider a simple RTL project. A Perl script can organize its
          source files, run a sequence of project steps, and generate a
          final summary.
        </p>

        <LessonVisual
          type="custom"
          caption="Example of a project-level automation flow."
        >
          <div className="perl-vlsi-auto">
            <div>
              <span>Source</span>
              <strong>RTL</strong>
            </div>

            <div>→</div>

            <div>
              <span>Step 1</span>
              <strong>Compile</strong>
            </div>

            <div>→</div>

            <div>
              <span>Step 2</span>
              <strong>Test</strong>
            </div>

            <div>→</div>

            <div>
              <span>Step 3</span>
              <strong>Analyze</strong>
            </div>

            <div>→</div>

            <div>
              <span>Output</span>
              <strong>Summary</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Complete Mini Automation Example">
{`my @files = (
    "counter.v",
    "uart.v",
    "top.v"
);

print "VLSI AUTOMATION FLOW\\n";
print "====================\\n";

print "\\nSource files:\\n";

foreach my $file (@files) {
    print "- $file\\n";
}

print "\\nCompilation step completed.\\n";
print "Analysis step completed.\\n";
print "Report generated.\\n";`}
        </CodeExample>

        <LearningNote type="success" title="Remember">
          Perl does not replace the EDA tool itself. It can automate and
          connect many repetitive tasks around the tool.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try creating a small regression automation script. It processes
          several test names and counts how many tests are included.
        </p>

        <TryIt
          title="Try Perl Design Automation"
          language="Perl"
          initialCode={`use strict;
use warnings;

my @tests = (
    "ALU",
    "UART",
    "FIFO",
    "COUNTER",
    "FSM"
);

print "REGRESSION TEST RUN\\n";
print "===================\\n";

foreach my $test (@tests) {
    print "Running: $test\\n";
}

my $count = scalar(@tests);

print "\\nTotal Tests: $count\\n";
print "Regression setup completed.\\n";`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Automation;