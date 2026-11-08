import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function WhatIsPerl() {
  const sections = [
    {
      id: "definition",
      title: "What is Perl?"
    },
    {
      id: "how-perl-works",
      title: "How Perl Works"
    },
    {
      id: "interpreter",
      title: "Perl Interpreter"
    },
    {
      id: "perl-vlsi",
      title: "Perl in VLSI"
    },
    {
      id: "example",
      title: "Simple Example"
    },
    {
      id: "advantages",
      title: "Key Characteristics"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="What is Perl?"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="Introduction"
      previousPath="/perl"
      nextLesson="Basic Syntax"
      nextPath="/perl/basic-syntax"
    >

      {/* =========================
          WHAT IS PERL
      ========================= */}

      <LessonSection
        id="definition"
        title="What is Perl?"
      >
        <div className="perl-definition">

          <div className="perl-definition-mark">
            <span>P</span>
            <small>PERL</small>
          </div>

          <div className="perl-definition-content">
            <span className="perl-section-label">
              PROGRAMMING LANGUAGE
            </span>

            <h2>
              Perl is a scripting language
            </h2>

            <p>
              Perl is a high-level, general-purpose programming
              language designed with a strong focus on text
              processing and scripting.
            </p>

            <p>
              It can be used to create scripts that read files,
              process information, search for patterns, generate
              reports, and automate repetitive tasks.
            </p>
          </div>

        </div>

        <LearningNote
          type="info"
          title="In Simple Words"
        >
          Perl allows you to write scripts that perform
          repetitive tasks automatically instead of doing
          each task manually.
        </LearningNote>
      </LessonSection>


      {/* =========================
          HOW PERL WORKS
      ========================= */}

      <LessonSection
        id="how-perl-works"
        title="How Perl Works"
      >
        <p>
          A Perl program is normally written in a source file
          and then executed by the Perl interpreter.
        </p>

        <LessonVisual
          type="diagram"
          caption="Basic execution flow of a Perl program."
        >
          <div className="perl-execution-flow">

            <div className="perl-execution-box">
              <span>01</span>
              <strong>Perl Source</strong>
              <small>
                program.pl
              </small>
            </div>

            <div className="perl-execution-arrow">
              →
            </div>

            <div className="perl-execution-box perl-execution-main">
              <span>02</span>
              <strong>Perl Interpreter</strong>
              <small>
                Executes the script
              </small>
            </div>

            <div className="perl-execution-arrow">
              →
            </div>

            <div className="perl-execution-box">
              <span>03</span>
              <strong>Output</strong>
              <small>
                Results
              </small>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* =========================
          INTERPRETER
      ========================= */}

      <LessonSection
        id="interpreter"
        title="The Perl Interpreter"
      >
        <p>
          The Perl interpreter reads a Perl program and
          executes the instructions contained in the script.
        </p>

        <div className="perl-interpreter-layout">

          <div className="perl-interpreter-code">
            <div className="perl-code-header">
              program.pl
            </div>

            <pre>
{`my $name = "VLSI";

print "Hello $name\\n";`}
            </pre>
          </div>

          <div className="perl-interpreter-arrow">
            →
          </div>

          <div className="perl-interpreter-result">
            <div className="perl-result-header">
              Output
            </div>

            <pre>
{`Hello VLSI`}
            </pre>
          </div>

        </div>

        <CodeExample title="Running a Perl Program">
{`perl program.pl`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Remember"
        >
          The <code>.pl</code> file contains the Perl source
          code, while the Perl interpreter executes that code.
        </LearningNote>
      </LessonSection>


      {/* =========================
          PERL IN VLSI
      ========================= */}

      <LessonSection
        id="perl-vlsi"
        title="Perl in VLSI"
      >
        <p>
          Perl can be useful in VLSI because many design
          tools produce text-based files such as logs,
          reports, configuration files, and source files.
        </p>

        <div className="perl-vlsi-usecases">

          <div>
            <span>01</span>
            <strong>Log Processing</strong>
            <p>
              Search logs for errors and important messages.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Report Processing</strong>
            <p>
              Extract timing, area, or utilization information.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>File Automation</strong>
            <p>
              Create, modify, copy, and organize files.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Flow Automation</strong>
            <p>
              Automate repetitive design-flow operations.
            </p>
          </div>

        </div>
      </LessonSection>


      {/* =========================
          EXAMPLE
      ========================= */}

      <LessonSection
        id="example"
        title="Simple Perl Example"
      >
        <p>
          The following program stores a project name in a
          variable and displays it.
        </p>

        <CodeExample title="Project Information">
{`use strict;
use warnings;

my $project = "UART";
my $tool = "Vivado";

print "Project : $project\\n";
print "Tool    : $tool\\n";`}
        </CodeExample>

        <p>
          Here, <code>$project</code> and <code>$tool</code>
          are scalar variables containing text values.
        </p>
      </LessonSection>


      {/* =========================
          CHARACTERISTICS
      ========================= */}

      <LessonSection
        id="advantages"
        title="Key Characteristics"
      >
        <div className="perl-characteristics">

          <div className="perl-characteristic">
            <div className="perl-characteristic-symbol">
              S
            </div>

            <strong>
              Scripting
            </strong>

            <span>
              Excellent for automation scripts.
            </span>
          </div>

          <div className="perl-characteristic">
            <div className="perl-characteristic-symbol">
              T
            </div>

            <strong>
              Text Processing
            </strong>

            <span>
              Powerful tools for handling text.
            </span>
          </div>

          <div className="perl-characteristic">
            <div className="perl-characteristic-symbol">
              R
            </div>

            <strong>
              Regular Expressions
            </strong>

            <span>
              Useful for pattern matching.
            </span>
          </div>

          <div className="perl-characteristic">
            <div className="perl-characteristic-symbol">
              A
            </div>

            <strong>
              Automation
            </strong>

            <span>
              Automates repetitive workflows.
            </span>
          </div>

        </div>
      </LessonSection>


      
    </LessonPage>
  );
}

export default WhatIsPerl;