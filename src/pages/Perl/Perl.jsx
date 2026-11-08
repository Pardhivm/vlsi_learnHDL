import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Perl() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction"
    },
    {
      id: "why-perl",
      title: "Why Perl?"
    },
    {
      id: "perl-vlsi",
      title: "Perl in VLSI"
    },
    {
      id: "workflow",
      title: "Automation Workflow"
    },
    {
      id: "first-program",
      title: "First Perl Program"
    },
    {
      id: "features",
      title: "Key Features"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="Learn Perl"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      nextLesson="What is Perl?"
      nextPath="/perl/what-is-perl"
    >

      {/* Introduction */}

      <LessonSection
        id="introduction"
        title="Introduction to Perl"
      >
        <div className="perl-intro">

          <div className="perl-intro-terminal">
            <div className="perl-terminal-top">
              <span></span>
              <span></span>
              <span></span>

              <strong>perl.pl</strong>
            </div>

            <div className="perl-terminal-body">
              <p>
                <span className="perl-prompt">$</span>{" "}
                perl automation.pl
              </p>

              <p className="perl-output">
                Starting VLSI automation...
              </p>

              <p className="perl-output">
                Processing design files...
              </p>

              <p className="perl-output">
                Automation completed.
              </p>

              <p>
                <span className="perl-prompt">$</span>
                <span className="perl-cursor">_</span>
              </p>
            </div>
          </div>

          <div className="perl-intro-text">
            <span className="perl-badge">
              SCRIPTING LANGUAGE
            </span>

            <h2>
              Perl for VLSI Engineers
            </h2>

            <p>
              Perl is a general-purpose scripting language
              widely known for text processing, file
              manipulation, pattern matching, and automation.
            </p>

            <p>
              These capabilities make Perl useful for
              automating repetitive tasks in engineering
              and Electronic Design Automation workflows.
            </p>

            <div className="perl-mini-stats">
              <div>
                <strong>Text</strong>
                <span>Processing</span>
              </div>

              <div>
                <strong>Files</strong>
                <span>Handling</span>
              </div>

              <div>
                <strong>EDA</strong>
                <span>Automation</span>
              </div>
            </div>
          </div>

        </div>
      </LessonSection>


      {/* Why Perl */}

      <LessonSection
        id="why-perl"
        title="Why Learn Perl?"
      >
        <p>
          Perl is useful when you need to process text,
          manipulate files, search for patterns, or automate
          repetitive tasks.
        </p>

        <div className="perl-feature-grid">

          <div className="perl-feature">
            <span className="perl-feature-index">
              01
            </span>

            <div className="perl-feature-icon">
              {"<>"}
            </div>

            <h3>
              Text Processing
            </h3>

            <p>
              Process logs, reports, source files, and other
              text-based information.
            </p>
          </div>

          <div className="perl-feature">
            <span className="perl-feature-index">
              02
            </span>

            <div className="perl-feature-icon">
              {"{ }"}
            </div>

            <h3>
              Data Handling
            </h3>

            <p>
              Work with variables, arrays, hashes, and
              structured data.
            </p>
          </div>

          <div className="perl-feature">
            <span className="perl-feature-index">
              03
            </span>

            <div className="perl-feature-icon">
              {"=~"}
            </div>

            <h3>
              Pattern Matching
            </h3>

            <p>
              Search and extract information using regular
              expressions.
            </p>
          </div>

          <div className="perl-feature">
            <span className="perl-feature-index">
              04
            </span>

            <div className="perl-feature-icon">
              {"$>"}
            </div>

            <h3>
              Automation
            </h3>

            <p>
              Automate repetitive engineering and design
              tasks with scripts.
            </p>
          </div>

        </div>
      </LessonSection>


      {/* Perl in VLSI */}

      <LessonSection
        id="perl-vlsi"
        title="Perl in VLSI"
      >
        <p>
          VLSI design flows generate many source files,
          reports, logs, and configuration files. Perl can
          help process this information and automate
          repetitive operations.
        </p>

        <LessonVisual
          type="diagram"
          caption="Perl can act as an automation layer around an EDA workflow."
        >
          <div className="perl-vlsi-flow">

            <div className="perl-flow-card">
              <span>01</span>
              <strong>RTL</strong>
              <small>
                Verilog / VHDL
              </small>
            </div>

            <div className="perl-flow-arrow">
              →
            </div>

            <div className="perl-flow-card perl-flow-main">
              <span>02</span>
              <strong>Perl</strong>
              <small>
                Automation
              </small>
            </div>

            <div className="perl-flow-arrow">
              →
            </div>

            <div className="perl-flow-card">
              <span>03</span>
              <strong>EDA Tools</strong>
              <small>
                Design Flow
              </small>
            </div>

            <div className="perl-flow-arrow">
              →
            </div>

            <div className="perl-flow-card">
              <span>04</span>
              <strong>Reports</strong>
              <small>
                Analysis
              </small>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="VLSI Connection"
        >
          Perl can be used to process synthesis reports,
          timing reports, simulation logs, source files,
          configuration files, and other text-based data.
        </LearningNote>
      </LessonSection>


      {/* Workflow */}

      <LessonSection
        id="workflow"
        title="Perl Automation Workflow"
      >
        <p>
          A Perl script can perform several operations in
          sequence to automate a design-related task.
        </p>

        <div className="perl-workflow">

          <div className="perl-workflow-step">
            <span>01</span>
            <strong>READ</strong>
            <small>
              Read files or logs
            </small>
          </div>

          <div className="perl-workflow-connector">
              →
          </div>

          <div className="perl-workflow-step">
            <span>02</span>
            <strong>PROCESS</strong>
            <small>
              Search and modify
            </small>
          </div>

          <div className="perl-workflow-connector">
              →
          </div>

          <div className="perl-workflow-step">
            <span>03</span>
            <strong>ANALYZE</strong>
            <small>
              Extract information
            </small>
          </div>

          <div className="perl-workflow-connector">
              →
          </div>

          <div className="perl-workflow-step">
            <span>04</span>
            <strong>REPORT</strong>
            <small>
              Generate output
            </small>
          </div>

        </div>
      </LessonSection>


      {/* First Program */}

      <LessonSection
        id="first-program"
        title="Your First Perl Program"
      >
        <p>
          Perl programs are commonly saved with the{" "}
          <code>.pl</code> file extension.
        </p>

        <CodeExample title="Hello VLSI World">
{`#!/usr/bin/perl

use strict;
use warnings;

print "Hello, VLSI World!\\n";
print "Welcome to Perl.\\n";`}
        </CodeExample>

        <p>
          The <code>print</code> statement is used to display
          information in the program output.
        </p>

        <LearningNote
          type="tip"
          title="Good Practice"
        >
          <code>use strict</code> and{" "}
          <code>use warnings</code> help detect common
          programming mistakes.
        </LearningNote>
      </LessonSection>


      {/* Key Features */}

      <LessonSection
        id="features"
        title="Key Features of Perl"
      >
        <div className="perl-concepts">

          <div className="perl-concept">
            <div className="perl-symbol">
              $
            </div>

            <strong>
              Variables
            </strong>

            <span>
              Store individual values
            </span>
          </div>

          <div className="perl-concept">
            <div className="perl-symbol">
              @
            </div>

            <strong>
              Arrays
            </strong>

            <span>
              Store ordered collections
            </span>
          </div>

          <div className="perl-concept">
            <div className="perl-symbol">
              %
            </div>

            <strong>
              Hashes
            </strong>

            <span>
              Store key-value data
            </span>
          </div>

          <div className="perl-concept">
            <div className="perl-symbol">
              =~
            </div>

            <strong>
              Regex
            </strong>

            <span>
              Match text patterns
            </span>
          </div>

        </div>
      </LessonSection>


      {/* Try It */}


    </LessonPage>
  );
}

export default Perl;