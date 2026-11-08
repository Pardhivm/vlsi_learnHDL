import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import TryIt from "../../components/TryIt";
import PerlSidebar from "../../components/PerlSidebar";

function Regex() {
  const sections = [
    { id: "introduction", title: "Regular Expressions" },
    { id: "matching", title: "Pattern Matching" },
    { id: "characters", title: "Character Patterns" },
    { id: "quantifiers", title: "Quantifiers" },
    { id: "anchors", title: "Anchors" },
    { id: "replace", title: "Search and Replace" },
    { id: "split", title: "Splitting Text" },
    { id: "vlsi-example", title: "VLSI Example" },
    { id: "try-it", title: "Try It Yourself" }
  ];

  return (
    <LessonPage
      title="Perl Regular Expressions"
      courseName="Perl"
      sidebar={<PerlSidebar />}
      sections={sections}
      previousLesson="File Handling"
      previousPath="/perl/file-handling"
      nextLesson="Perl in EDA"
      nextPath="/perl/eda"
    >
      <LessonSection title="Regular Expressions" id="introduction">
        <p>
          Regular expressions, commonly called regex, are patterns used to
          search, match, and modify text. Perl has powerful built-in support
          for regular expressions.
        </p>

        <LessonVisual
          type="custom"
          caption="A regular expression searches text for a particular pattern."
        >
          <div className="perl-regex-flow">
            <div className="perl-regex-input">
              <span>Input Text</span>
              <strong>UART module</strong>
            </div>

            <div className="perl-regex-arrow">→</div>

            <div className="perl-regex-pattern">
              <span>Pattern</span>
              <strong>/UART/</strong>
            </div>

            <div className="perl-regex-arrow">→</div>

            <div className="perl-regex-result">
              <span>Match</span>
              <strong>Found</strong>
            </div>
          </div>
        </LessonVisual>

        <LearningNote type="info" title="Remember">
          Regular expressions are useful when exact text is not enough and
          you need to search for a pattern.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Pattern Matching" id="matching">
        <p>
          Perl uses the <code>=~</code> operator together with
          <code>/pattern/</code> to perform pattern matching.
        </p>

        <CodeExample title="Basic Pattern Matching">
{`my $text = "UART controller";

if ($text =~ /UART/) {
    print "UART found\\n";
}`}
        </CodeExample>

        <div className="perl-match-visual">
          <div>
            <span>Text</span>
            <strong>UART controller</strong>
          </div>

          <div className="perl-match-arrow">=~</div>

          <div>
            <span>Pattern</span>
            <strong>/UART/</strong>
          </div>

          <div className="perl-match-arrow">→</div>

          <div className="perl-match-result">
            <span>Result</span>
            <strong>MATCH</strong>
          </div>
        </div>

        <LearningNote type="tip" title="Tip">
          The <code>=~</code> operator applies a regular expression to a
          string.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Character Patterns" id="characters">
        <p>
          Regular expressions provide special characters that can match
          different kinds of text.
        </p>

        <div className="perl-regex-pattern-grid">
          <div>
            <strong>.</strong>
            <span>Any character</span>
          </div>

          <div>
            <strong>\d</strong>
            <span>A digit</span>
          </div>

          <div>
            <strong>\w</strong>
            <span>Word character</span>
          </div>

          <div>
            <strong>\s</strong>
            <span>Whitespace</span>
          </div>

          <div>
            <strong>[A-Z]</strong>
            <span>Uppercase letter</span>
          </div>

          <div>
            <strong>[0-9]</strong>
            <span>Digit range</span>
          </div>
        </div>

        <CodeExample title="Character Pattern Example">
{`my $text = "Clock frequency: 100 MHz";

if ($text =~ /\\d+/) {
    print "A number was found\\n";
}`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Quantifiers" id="quantifiers">
        <p>
          Quantifiers specify how many times a pattern can occur.
        </p>

        <div className="perl-quantifier-grid">
          <div>
            <strong>*</strong>
            <span>Zero or more</span>
          </div>

          <div>
            <strong>+</strong>
            <span>One or more</span>
          </div>

          <div>
            <strong>?</strong>
            <span>Zero or one</span>
          </div>

          <div>
            <strong>{"{n}"}</strong>
            <span>Exactly n times</span>
          </div>
        </div>

        <CodeExample title="Quantifier Example">
{`my $text = "Clock: 100 MHz";

if ($text =~ /\\d+/) {
    print "Number found\\n";
}`}
        </CodeExample>

        <LearningNote type="info" title="Example">
          The pattern <code>\d+</code> means one or more consecutive digits.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Anchors" id="anchors">
        <p>
          Anchors specify the position of a pattern within a string.
        </p>

        <div className="perl-anchor-visual">
          <div>
            <strong>^</strong>
            <span>Beginning of string</span>
          </div>

          <div>
            <strong>$</strong>
            <span>End of string</span>
          </div>
        </div>

        <CodeExample title="Anchor Example">
{`my $module = "UART";

if ($module =~ /^UART$/) {
    print "Exact UART match\\n";
}`}
        </CodeExample>

        <p>
          Using both <code>^</code> and <code>$</code> makes the pattern match
          the entire string rather than only part of it.
        </p>
      </LessonSection>

      <LessonSection title="Search and Replace" id="replace">
        <p>
          Perl uses the <code>s///</code> operator to search for a pattern and
          replace it with different text.
        </p>

        <LessonVisual
          type="custom"
          caption="The substitution operator searches for matching text and replaces it."
        >
          <div className="perl-replace-regex">
            <div>
              <span>Before</span>
              <strong>UART Controller</strong>
            </div>

            <div className="perl-replace-regex-arrow">
              <code>s/UART/SPI/</code>
              <span>→</span>
            </div>

            <div>
              <span>After</span>
              <strong>SPI Controller</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Search and Replace">
{`my $text = "UART Controller";

$text =~ s/UART/SPI/;

print $text;`}
        </CodeExample>
      </LessonSection>

      <LessonSection title="Splitting Text" id="split">
        <p>
          The <code>split()</code> function separates a string into multiple
          pieces using a specified delimiter or pattern.
        </p>

        <CodeExample title="split() Example">
{`my $modules = "UART,SPI,I2C,GPIO";

my @list = split(/,/, $modules);

foreach my $module (@list) {
    print "$module\\n";
}`}
        </CodeExample>

        <div className="perl-split-visual">
          <div>
            <span>Original</span>
            <strong>UART,SPI,I2C,GPIO</strong>
          </div>

          <div className="perl-split-arrow">→</div>

          <div className="perl-split-items">
            <span>UART</span>
            <span>SPI</span>
            <span>I2C</span>
            <span>GPIO</span>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="VLSI Example" id="vlsi-example">
        <p>
          Regular expressions are useful in VLSI automation for extracting
          timing values, detecting tool messages, checking module names, and
          processing reports.
        </p>

        <LessonVisual
          type="custom"
          caption="Regex can extract a timing value from a tool-generated report."
        >
          <div className="perl-timing-regex">
            <div className="perl-report-line">
              <span>Report</span>
              <strong>Slack = 1.25 ns</strong>
            </div>

            <div className="perl-timing-arrow">→</div>

            <div className="perl-report-pattern">
              <span>Pattern</span>
              <strong>/\d+\.\d+/</strong>
            </div>

            <div className="perl-timing-arrow">→</div>

            <div className="perl-report-value">
              <span>Extracted</span>
              <strong>1.25</strong>
            </div>
          </div>
        </LessonVisual>

        <CodeExample title="Extracting Timing Data">
{`my $report = "Slack = 1.25 ns";

if ($report =~ /(\\d+\\.\\d+)/) {
    my $slack = $1;
    print "Slack = $slack ns\\n";
}`}
        </CodeExample>

        <LearningNote type="tip" title="VLSI Use">
          Report-processing scripts can use regex to find values from
          synthesis, timing, simulation, and implementation reports.
        </LearningNote>
      </LessonSection>

      <LessonSection title="Try It Yourself" id="try-it">
        <p>
          Try extracting a timing value and checking whether the report
          contains a valid slack measurement.
        </p>

        <TryIt
          title="Try Perl Regular Expressions"
          language="Perl"
          initialCode={`use strict;
use warnings;

my $report = "Path 1: Slack = 1.75 ns";

if ($report =~ /(\\d+\\.\\d+)/) {
    my $slack = $1;

    print "Timing Report\\n";
    print "==============\\n";
    print "Slack = $slack ns\\n";

    if ($slack >= 0) {
        print "Status = PASS\\n";
    } else {
        print "Status = FAIL\\n";
    }
} else {
    print "Slack value not found\\n";
}`}
        />
      </LessonSection>
    </LessonPage>
  );
}

export default Regex;