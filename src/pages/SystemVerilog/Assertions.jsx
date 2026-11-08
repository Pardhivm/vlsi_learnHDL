import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Assertions() {
  const sections = [
    {
      id: "what-are-assertions",
      title: "What are Assertions?"
    },
    {
      id: "why-use-assertions",
      title: "Why Use Assertions?"
    },
    {
      id: "immediate",
      title: "Immediate Assertions"
    },
    {
      id: "concurrent",
      title: "Concurrent Assertions"
    },
    {
      id: "properties",
      title: "Properties"
    },
    {
      id: "sequences",
      title: "Sequences"
    },
    {
      id: "clocked",
      title: "Clocked Assertions"
    },
    {
      id: "practical-example",
      title: "Practical Examples"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="SystemVerilog Assertions"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Classes"
      previousPath="/systemverilog/classes"
      nextLesson="Verification"
      nextPath="/systemverilog/verification"
    >

      <LessonSection
        id="what-are-assertions"
        title="What are Assertions?"
      >
        <p>
          An <strong>assertion</strong> is a statement used to
          check whether something is true during simulation.
        </p>

        <p>
          In hardware verification, assertions help us detect
          incorrect behavior automatically instead of manually
          checking every signal.
        </p>

        <p>
          For example, we might want to make sure that a reset
          signal is active when the design is supposed to be
          reset.
        </p>

        <LessonVisual
          type="diagram"
          caption="An assertion checks expected behavior and reports a failure when the behavior is incorrect."
        >
          <div className="assertion-flow-diagram">

            <div className="assertion-design-box">
              <strong>Hardware</strong>
              <span>Actual behavior</span>
            </div>

            <div className="assertion-arrow">
              →
            </div>

            <div className="assertion-check-box">
              <strong>Assertion</strong>
              <span>Expected behavior</span>
            </div>

            <div className="assertion-arrow">
              →
            </div>

            <div className="assertion-result-box">
              <strong>PASS / FAIL</strong>
              <span>Verification result</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="why-use-assertions"
        title="Why Use Assertions?"
      >
        <p>
          Without assertions, a verification engineer may need to
          manually inspect waveforms or write additional checking
          code.
        </p>

        <p>
          Assertions allow many expected behaviors to be checked
          automatically during simulation.
        </p>

        <p>
          They can help detect:
        </p>

        <ul>
          <li>Incorrect signal values</li>
          <li>Invalid protocol behavior</li>
          <li>Unexpected state transitions</li>
          <li>Timing-related behavior</li>
          <li>Incorrect reset behavior</li>
        </ul>

        <LearningNote
          type="tip"
          title="Simple idea"
        >
          <p>
            Think of an assertion as a
            <strong> rule that the hardware must follow</strong>.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="immediate"
        title="Immediate Assertions"
      >
        <p>
          An <strong>immediate assertion</strong> checks a condition
          at the point where the assertion is executed.
        </p>

        <p>
          The basic syntax is:
        </p>

        <CodeExample title="Immediate assertion">
{`assert (condition);`}
        </CodeExample>

        <p>
          We can also provide messages for success and failure.
        </p>

        <CodeExample title="Assertion with messages">
{`assert (a == b)
  $display("PASS");
else
  $display("FAIL");`}
        </CodeExample>

        <p>
          If the condition is true, the assertion passes.
          Otherwise, the failure branch executes.
        </p>

        <CodeExample title="Simple example">
{`module assertion_demo;

  logic [3:0] a;
  logic [3:0] b;

  initial begin

    a = 4'd10;
    b = 4'd10;

    assert (a == b)
      $display("Values are equal");
    else
      $display("Values are different");

  end

endmodule`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Remember"
        >
          <p>
            Immediate assertions are evaluated
            <strong> immediately </strong>
            when the statement is executed.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="concurrent"
        title="Concurrent Assertions"
      >
        <p>
          <strong>Concurrent assertions</strong> are used to check
          relationships between signals over time.
        </p>

        <p>
          They are particularly useful for checking clocked
          protocols and sequential behavior.
        </p>

        <p>
          A concurrent assertion commonly uses a property.
        </p>

        <CodeExample title="Basic concurrent assertion">
{`property p_valid;

  @(posedge clk)
  valid |-> ready;

endproperty`}
        </CodeExample>

        <p>
          This describes a relationship that is evaluated with
          respect to the clock.
        </p>

        <LessonVisual
          type="diagram"
          caption="Concurrent assertions can check how signals behave across clock cycles."
        >
          <div className="assertion-clock-diagram">

            <div className="assertion-clock-box">
              <strong>Clock</strong>
              <span>↑ &nbsp; ↑ &nbsp; ↑ &nbsp; ↑</span>
            </div>

            <div className="assertion-arrow">
              →
            </div>

            <div className="assertion-signal-box">
              <strong>Signal behavior</strong>
              <span>valid → ready</span>
            </div>

            <div className="assertion-arrow">
              →
            </div>

            <div className="assertion-result-box">
              <strong>Check</strong>
              <span>PASS / FAIL</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="properties"
        title="Properties"
      >
        <p>
          A <strong>property</strong> describes behavior that we
          want to verify.
        </p>

        <p>
          Properties are commonly used with concurrent assertions.
        </p>

        <CodeExample title="Simple property">
{`property valid_ready;

  @(posedge clk)
  valid |-> ready;

endproperty`}
        </CodeExample>

        <p>
          The property can then be checked using an assertion.
        </p>

        <CodeExample title="Using the property">
{`assert property (valid_ready);`}
        </CodeExample>

        <p>
          Separating the property from the assertion makes complex
          verification rules easier to organize and reuse.
        </p>
      </LessonSection>


      <LessonSection
        id="sequences"
        title="Sequences"
      >
        <p>
          A <strong>sequence</strong> describes a pattern of
          events that occurs over time.
        </p>

        <p>
          This is useful when we need to check multiple clock
          cycles.
        </p>

        <CodeExample title="Simple sequence">
{`sequence request_then_grant;

  request ##1 grant;

endsequence`}
        </CodeExample>

        <p>
          Here:
        </p>

        <ul>
          <li>
            <strong>request</strong> occurs first.
          </li>

          <li>
            <strong>##1</strong> means one clock cycle later.
          </li>

          <li>
            <strong>grant</strong> should then occur.
          </li>
        </ul>

        <LessonVisual
          type="diagram"
          caption="A sequence can describe a required pattern across multiple clock cycles."
        >
          <div className="sequence-diagram">

            <div className="sequence-step">
              <strong>Cycle 1</strong>
              <span>request = 1</span>
            </div>

            <div className="sequence-arrow">
              →
            </div>

            <div className="sequence-step">
              <strong>Cycle 2</strong>
              <span>grant = 1</span>
            </div>

            <div className="sequence-arrow">
              →
            </div>

            <div className="sequence-result">
              <strong>PASS</strong>
              <span>Expected sequence</span>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="important"
          title="Think in time"
        >
          <p>
            A sequence is useful when the verification rule is
            not about one instant, but about
            <strong> what happens over several clock cycles</strong>.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="clocked"
        title="Clocked Assertions"
      >
        <p>
          Many hardware behaviors are synchronized to a clock.
          SystemVerilog assertions can therefore use a clock event
          to define when the property should be evaluated.
        </p>

        <CodeExample title="Clocked property">
{`property reset_check;

  @(posedge clk)
  reset |-> (count == 0);

endproperty

assert property (reset_check);`}
        </CodeExample>

        <p>
          This property checks the relationship at every rising
          edge of <strong>clk</strong>.
        </p>

        <p>
          When reset is active, the counter is expected to be zero.
        </p>

        <LearningNote
          type="tip"
          title="Hardware perspective"
        >
          <p>
            Clocked assertions are especially useful for checking
            registers, counters, state machines, and communication
            protocols.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Examples"
      >
        <h3>Example 1: Checking a counter</h3>

        <p>
          Suppose a counter should never become greater than 15.
        </p>

        <CodeExample title="Counter assertion">
{`assert property (
  @(posedge clk)
  count <= 15
);`}
        </CodeExample>

        <h3>Example 2: Checking reset</h3>

        <CodeExample title="Reset assertion">
{`assert property (
  @(posedge clk)
  reset |-> (count == 0)
);`}
        </CodeExample>

        <h3>Example 3: Checking valid data</h3>

        <CodeExample title="Valid data assertion">
{`assert property (
  @(posedge clk)
  valid |-> data_valid
);`}
        </CodeExample>

        <p>
          These examples show how assertions can describe expected
          hardware behavior in a compact form.
        </p>

        <LessonVisual
          type="diagram"
          caption="Assertions can check different types of RTL behavior."
        >
          <div className="assertion-check-list">

            <div className="assertion-check-item">
              <strong>Counter</strong>
              <span>count ≤ 15</span>
            </div>

            <div className="assertion-check-item">
              <strong>Reset</strong>
              <span>reset → count = 0</span>
            </div>

            <div className="assertion-check-item">
              <strong>Protocol</strong>
              <span>valid → ready</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Try an immediate assertion that checks whether two
          values are equal.
        </p>

        <TryIt
          title="Experiment with Assertions"
          language="SystemVerilog"
          initialCode={`module assertion_demo;

  logic [7:0] expected;
  logic [7:0] actual;

  initial begin

    expected = 8'hA5;
    actual = 8'hA5;

    assert (actual == expected)
      $display("PASS: Values are equal");
    else
      $display("FAIL: Values are different");

    #10;

    actual = 8'h3C;

    assert (actual == expected)
      $display("PASS: Values are equal");
    else
      $display("FAIL: Values are different");

    #10 $finish;

  end

endmodule`}
        />
      </LessonSection>


      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>

          <li>
            Assertions are used to check expected hardware
            behavior automatically.
          </li>

          <li>
            <strong>Immediate assertions</strong> check a condition
            when the statement executes.
          </li>

          <li>
            <strong>Concurrent assertions</strong> check behavior
            across time and clock cycles.
          </li>

          <li>
            A <strong>property</strong> describes behavior that
            should be true.
          </li>

          <li>
            A <strong>sequence</strong> describes a pattern of
            events over time.
          </li>

          <li>
            Clocked assertions are useful for checking
            clock-synchronized RTL behavior.
          </li>

          <li>
            Assertions can automatically report incorrect
            behavior during simulation.
          </li>

          <li>
            Assertions are an important part of SystemVerilog
            verification.
          </li>

        </ul>

        <LearningNote
          type="important"
          title="Next Step"
        >
          <p>
            Now that we understand how SystemVerilog can
            automatically check hardware behavior, the next lesson
            will bring these concepts together in
            <strong> Verification</strong>.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Assertions;