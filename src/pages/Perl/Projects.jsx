import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Projects() {
  const sections = [
    { id: "introduction", title: "Perl Projects" },
    { id: "project-flow", title: "Project Workflow" },
    { id: "timing", title: "Timing Report Analyzer" },
    { id: "regression", title: "Regression Runner" },
    { id: "rtl-files", title: "RTL File Manager" },
    { id: "summary", title: "Project Summary" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Projects"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Design Automation"
      previousPath="/perl/automation"
    >
      <LessonSection title="Perl Projects" id="introduction">
        <p>
          Projects are the best way to combine Perl fundamentals with
          practical VLSI automation. The following examples use variables,
          arrays, hashes, loops, subroutines, file processing, and regular
          expressions.
        </p>

        <LessonVisual
          type="custom"
          caption="A Perl project combines multiple scripting concepts into one automation flow."
        >
          <div className="perl-project-overview">
            <div>
              <span>Input</span>
              <strong>Design Data</strong>
            </div>

            <div>→</div>

            <div className="perl-project-script">
              <span>Script</span>
              <strong>Perl</strong>
            </div>

            <div>→</div>

            <div>
              <span>Analysis</span>
              <strong>Processing</strong>
            </div>

            <div>→</div>

            <div>
              <span>Output</span>
              <strong>Report</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Project Goal">
          The objective is to use Perl as an automation layer for repetitive
          engineering tasks rather than manually processing every file or
          report.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Project Workflow" id="project-flow">
        <p>
          A typical Perl-based VLSI automation project can be divided into
          several stages.
        </p>

        <div className="perl-project-flow">
          <div>
            <small>01</small>
            <strong>Collect</strong>
            <span>Input files</span>
          </div>

          <div>→</div>

          <div>
            <small>02</small>
            <strong>Process</strong>
            <span>Perl script</span>
          </div>

          <div>→</div>

          <div>
            <small>03</small>
            <strong>Analyze</strong>
            <span>Results</span>
          </div>

          <div>→</div>

          <div>
            <small>04</small>
            <strong>Report</strong>
            <span>Summary</span>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Timing Report Analyzer" id="timing">
        <p>
          A timing analyzer can process timing information and determine
          whether the reported slack is positive or negative.
        </p>

        <CodeExample title="Timing Analyzer">
{`my @paths = (
    1.25,
    0.85,
    -0.20,
    2.10
);

foreach my $slack (@paths) {
    if ($slack >= 0) {
        print "PASS: Slack = $slack ns\\n";
    } else {
        print "FAIL: Slack = $slack ns\\n";
    }
}`}
        </CodeExample>

        <div className="perl-timing-project">
          <div>
            <span>Path 1</span>
            <strong>+1.25 ns</strong>
          </div>

          <div>
            <span>Path 2</span>
            <strong>+0.85 ns</strong>
          </div>

          <div className="perl-timing-fail">
            <span>Path 3</span>
            <strong>-0.20 ns</strong>
          </div>

          <div>
            <span>Path 4</span>
            <strong>+2.10 ns</strong>
          </div>
        </div>

        <LearningNote type="warning" title="Timing Concept">
          A negative slack value indicates that the corresponding timing
          requirement has not been met. This example only demonstrates
          processing the values; actual timing analysis is performed by
          specialized EDA tools.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Regression Runner" id="regression">
        <p>
          A regression script can maintain a list of tests and process them
          one after another.
        </p>

        <CodeExample title="Regression Runner">
{`my @tests = (
    "ALU",
    "UART",
    "FIFO",
    "COUNTER"
);

my $total = scalar(@tests);

print "Regression Tests: $total\\n";

foreach my $test (@tests) {
    print "Running $test...\\n";
}

print "Regression completed.\\n";`}
        </CodeExample>

        <div className="perl-regression-project">
          <div>
            <span>TEST 01</span>
            <strong>ALU</strong>
          </div>

          <div>
            <span>TEST 02</span>
            <strong>UART</strong>
          </div>

          <div>
            <span>TEST 03</span>
            <strong>FIFO</strong>
          </div>

          <div>
            <span>TEST 04</span>
            <strong>COUNTER</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="RTL File Manager" id="rtl-files">
        <p>
          Another useful project is an RTL file manager. It can maintain
          source-file information and organize files belonging to a design.
        </p>

        <CodeExample title="RTL File Manager">
{`my @rtl_files = (
    "alu.v",
    "register.v",
    "counter.v",
    "top.v"
);

print "RTL FILE LIST\\n";
print "=============\\n";

foreach my $file (@rtl_files) {
    print "$file\\n";
}

print "\\nTotal RTL Files: "
    . scalar(@rtl_files) . "\\n";`}
        </CodeExample>

        <div className="perl-rtl-project">
          <div>
            <span>Module</span>
            <strong>alu.v</strong>
          </div>

          <div>
            <span>Module</span>
            <strong>register.v</strong>
          </div>

          <div>
            <span>Module</span>
            <strong>counter.v</strong>
          </div>

          <div>
            <span>Top</span>
            <strong>top.v</strong>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Project Summary" id="summary">
        <p>
          These projects demonstrate how Perl concepts can be combined into
          useful automation scripts.
        </p>

        <div className="perl-project-summary">
          <div>
            <strong>Variables</strong>
            <span>Store values</span>
          </div>

          <div>
            <strong>Arrays</strong>
            <span>Store collections</span>
          </div>

          <div>
            <strong>Hashes</strong>
            <span>Organize data</span>
          </div>

          <div>
            <strong>Regex</strong>
            <span>Find patterns</span>
          </div>

          <div>
            <strong>Subroutines</strong>
            <span>Reuse logic</span>
          </div>

          <div>
            <strong>File Handling</strong>
            <span>Process reports</span>
          </div>
        </div>

        <LearningNote type="success" title="You Finished Perl">
          You have now covered the major Perl concepts needed to start
          building scripting and automation projects for VLSI workflows.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Projects;