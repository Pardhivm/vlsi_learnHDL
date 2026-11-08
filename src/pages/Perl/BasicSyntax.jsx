import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function BasicSyntax() {
  const sections = [
    {
      id: "introduction",
      title: "Perl Syntax"
    },
    {
      id: "program-structure",
      title: "Program Structure"
    },
    {
      id: "statements",
      title: "Statements"
    },
    {
      id: "comments",
      title: "Comments"
    },
    {
      id: "print",
      title: "Print Statement"
    },
    {
      id: "syntax-rules",
      title: "Basic Syntax Rules"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    }
  ];

  return (
    <LessonPage
      title="Perl Basic Syntax"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="What is Perl?"
      previousPath="/perl/what-is-perl"
      nextLesson="Variables"
      nextPath="/perl/variables"
    >

      {/* INTRODUCTION */}

      <LessonSection
        id="introduction"
        title="Perl Syntax"
      >
        <p>
          Perl syntax defines how instructions are written in
          a Perl program. Perl has a relatively flexible syntax,
          but following a consistent structure makes programs
          easier to understand and maintain.
        </p>

        <div className="perl-syntax-banner">
          <div className="perl-syntax-symbol">
            <span>$</span>
            <span>;</span>
            <span>{}</span>
          </div>

          <div>
            <span className="perl-syntax-label">
              PERL SYNTAX
            </span>

            <h2>
              Small rules, powerful scripts
            </h2>

            <p>
              Variables, statements, blocks, operators, and
              functions form the basic building blocks of a
              Perl program.
            </p>
          </div>
        </div>
      </LessonSection>


      {/* PROGRAM STRUCTURE */}

      <LessonSection
        id="program-structure"
        title="Basic Program Structure"
      >
        <p>
          A simple Perl program can contain a shebang line,
          pragmas, statements, variables, and output commands.
        </p>

        <CodeExample title="Basic Perl Program">
{`#!/usr/bin/perl

use strict;
use warnings;

my $project = "UART";

print "Project: $project\\n";`}
        </CodeExample>

        <div className="perl-syntax-parts">

          <div>
            <span>01</span>
            <strong>Shebang</strong>
            <p>
              Identifies the interpreter used to run the script
              on systems that support it.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Pragmas</strong>
            <p>
              <code>strict</code> and <code>warnings</code>
              help detect programming problems.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Variables</strong>
            <p>
              Values can be stored using Perl variables.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Statements</strong>
            <p>
              Statements perform the actual operations.
            </p>
          </div>

        </div>
      </LessonSection>


      {/* STATEMENTS */}

      <LessonSection
        id="statements"
        title="Statements"
      >
        <p>
          A Perl statement usually ends with a semicolon
          (<code>;</code>).
        </p>

        <CodeExample title="Perl Statements">
{`my $width = 32;
my $count = 8;

my $total = $width * $count;

print "Total bits = $total\\n";`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="A Perl program can be viewed as a sequence of statements."
        >
          <div className="perl-statement-flow">

            <div>
              <span>01</span>
              <strong>Declare</strong>
              <small>
                $width
              </small>
            </div>

            <div className="perl-statement-arrow">
              →
            </div>

            <div>
              <span>02</span>
              <strong>Calculate</strong>
              <small>
                $width * $count
              </small>
            </div>

            <div className="perl-statement-arrow">
              →
            </div>

            <div>
              <span>03</span>
              <strong>Display</strong>
              <small>
                print
              </small>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      {/* COMMENTS */}

      <LessonSection
        id="comments"
        title="Comments"
      >
        <p>
          Comments are notes written inside the source code.
          They are ignored when the program executes.
        </p>

        <CodeExample title="Perl Comments">
{`# This is a single-line comment

my $frequency = 100;

# Display the clock frequency
print "Clock = $frequency MHz\\n";`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Why Use Comments?"
        >
          Comments help explain what a section of code does,
          especially when scripts become larger.
        </LearningNote>
      </LessonSection>


      {/* PRINT */}

      <LessonSection
        id="print"
        title="The print Statement"
      >
        <p>
          The <code>print</code> statement is used to display
          text and values.
        </p>

        <CodeExample title="Printing Text">
{`print "Hello Perl\\n";
print "VLSI Automation\\n";`}
        </CodeExample>

        <CodeExample title="Printing Variables">
{`my $tool = "Vivado";
my $device = "Artix-7";

print "Tool   : $tool\\n";
print "Device : $device\\n";`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Newline"
        >
          <code>\n</code> represents a newline character.
          It moves the next output to a new line.
        </LearningNote>
      </LessonSection>


      {/* SYNTAX RULES */}

      <LessonSection
        id="syntax-rules"
        title="Basic Syntax Rules"
      >
        <div className="perl-rules">

          <div className="perl-rule">
            <span>;</span>
            <div>
              <strong>Semicolon</strong>
              <p>
                Use semicolons to terminate statements.
              </p>
            </div>
          </div>

          <div className="perl-rule">
            <span>#</span>
            <div>
              <strong>Comments</strong>
              <p>
                Use <code>#</code> for single-line comments.
              </p>
            </div>
          </div>

          <div className="perl-rule">
            <span>$</span>
            <div>
              <strong>Scalar Variables</strong>
              <p>
                Scalar variables begin with <code>$</code>.
              </p>
            </div>
          </div>

          <div className="perl-rule">
            <span>{}</span>
            <div>
              <strong>Blocks</strong>
              <p>
                Curly braces group statements together.
              </p>
            </div>
          </div>

        </div>
      </LessonSection>


      {/* TRY IT */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Practice the basic Perl syntax by creating a small
          project information program.
        </p>

        <TryIt
          title="Try Perl Basic Syntax"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $project = "UART";
my $tool = "Vivado";
my $device = "Artix-7";

print "PROJECT INFORMATION\\n";
print "===================\\n";

print "Project : $project\\n";
print "Tool    : $tool\\n";
print "Device  : $device\\n";`}
        />

        <LearningNote
          type="success"
          title="Practice"
        >
          Try changing the project, tool, and device values.
          Then run the program and observe the output.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default BasicSyntax;