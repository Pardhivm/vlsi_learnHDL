import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Verification() {
  const sections = [
    {
      id: "what-is-verification",
      title: "What is Verification?"
    },
    {
      id: "design-vs-verification",
      title: "Design vs Verification"
    },
    {
      id: "testbench",
      title: "SystemVerilog Testbench"
    },
    {
      id: "stimulus",
      title: "Generating Stimulus"
    },
    {
      id: "driver",
      title: "Driver"
    },
    {
      id: "monitor",
      title: "Monitor"
    },
    {
      id: "scoreboard",
      title: "Scoreboard"
    },
    {
      id: "coverage",
      title: "Functional Coverage"
    },
    {
      id: "assertions",
      title: "Assertions in Verification"
    },
    {
      id: "uvm",
      title: "SystemVerilog and UVM"
    },
    {
      id: "practical-example",
      title: "Practical Example"
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
      title="SystemVerilog Verification"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Assertions"
      previousPath="/systemverilog/assertions"
      nextLesson="Projects"
      nextPath="/systemverilog/projects"
    >

      <LessonSection
        id="what-is-verification"
        title="What is Verification?"
      >
        <p>
          <strong>Verification</strong> is the process of checking
          whether a hardware design behaves as expected.
        </p>

        <p>
          A designer creates the RTL, while a verification engineer
          creates tests and checks to find bugs in that RTL.
        </p>

        <p>
          The goal is not simply to run the design once. The goal
          is to exercise the design with many different conditions
          and detect incorrect behavior.
        </p>

        <LessonVisual
          type="diagram"
          caption="Verification compares the expected behavior with the actual behavior of the design."
        >
          <div className="verification-overview-diagram">

            <div className="verification-overview-box">
              <strong>Test</strong>
              <span>Stimulus</span>
            </div>

            <div className="verification-overview-arrow">
              →
            </div>

            <div className="verification-overview-box verification-dut">
              <strong>DUT</strong>
              <span>Design Under Test</span>
            </div>

            <div className="verification-overview-arrow">
              →
            </div>

            <div className="verification-overview-box">
              <strong>Check</strong>
              <span>Expected vs Actual</span>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Simple idea"
        >
          <p>
            <strong>Design</strong> creates the hardware.
            <br />
            <strong>Verification</strong> tries to prove that the
            hardware works correctly.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="design-vs-verification"
        title="Design vs Verification"
      >
        <p>
          Design and verification are closely related, but they
          have different responsibilities.
        </p>

        <div className="comparison-table-container">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Design</th>
                <th>Verification</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Creates RTL</td>
                <td>Checks RTL</td>
              </tr>

              <tr>
                <td>Describes hardware behavior</td>
                <td>Generates test scenarios</td>
              </tr>

              <tr>
                <td>Uses synthesizable code</td>
                <td>Uses testbench code</td>
              </tr>

              <tr>
                <td>Implements the specification</td>
                <td>Checks the implementation</td>
              </tr>

              <tr>
                <td>Produces the DUT</td>
                <td>Tests the DUT</td>
              </tr>

            </tbody>

          </table>

        </div>

        <LearningNote
          type="important"
          title="Important"
        >
          <p>
            Verification should try to find situations where the
            design does not behave according to its specification.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="testbench"
        title="SystemVerilog Testbench"
      >
        <p>
          A <strong>testbench</strong> is code used to verify a
          hardware design.
        </p>

        <p>
          A typical testbench generates inputs, sends them to the
          DUT, observes the outputs, and checks whether the outputs
          are correct.
        </p>

        <LessonVisual
          type="diagram"
          caption="A basic verification environment surrounds the DUT with stimulus and checking logic."
        >
          <div className="testbench-flow-diagram">

            <div className="testbench-component">
              <strong>Stimulus</strong>
              <span>Creates inputs</span>
            </div>

            <div className="testbench-arrow">
              →
            </div>

            <div className="testbench-component testbench-dut">
              <strong>DUT</strong>
              <span>Hardware design</span>
            </div>

            <div className="testbench-arrow">
              →
            </div>

            <div className="testbench-component">
              <strong>Checker</strong>
              <span>Checks outputs</span>
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Simple testbench structure">
{`module testbench;

  logic a;
  logic b;
  logic y;

  // DUT
  and_gate dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    a = 0;
    b = 0;

    #10;

    a = 1;
    b = 1;

    #10;

    $finish;

  end

endmodule`}
        </CodeExample>
      </LessonSection>


      <LessonSection
        id="stimulus"
        title="Generating Stimulus"
      >
        <p>
          <strong>Stimulus</strong> means the input values or
          conditions supplied to the DUT during verification.
        </p>

        <p>
          A good verification environment should exercise many
          different input combinations.
        </p>

        <CodeExample title="Generating stimulus">
{`initial begin

  a = 0;
  b = 0;

  #10 a = 0; b = 1;

  #10 a = 1; b = 0;

  #10 a = 1; b = 1;

  #10 $finish;

end`}
        </CodeExample>

        <p>
          For larger designs, SystemVerilog classes can be used to
          generate more complex transactions.
        </p>

        <LessonVisual
          type="diagram"
          caption="Stimulus drives different input combinations into the DUT."
        >
          <div className="stimulus-diagram">

            <div className="stimulus-box">
              <strong>Stimulus Generator</strong>
              <span>00</span>
              <span>01</span>
              <span>10</span>
              <span>11</span>
            </div>

            <div className="stimulus-arrow">
              →
            </div>

            <div className="stimulus-dut">
              <strong>DUT</strong>
              <span>Processes inputs</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="driver"
        title="Driver"
      >
        <p>
          A <strong>driver</strong> takes generated transactions
          and converts them into signal-level activity for the DUT.
        </p>

        <p>
          In a simple testbench, the stimulus code itself may drive
          the DUT directly. In larger verification environments,
          this responsibility is usually separated into a driver.
        </p>

        <LessonVisual
          type="diagram"
          caption="The driver converts transaction-level information into DUT signals."
        >
          <div className="verification-component-flow">

            <div className="verification-component-box">
              <strong>Transaction</strong>
              <span>High-level data</span>
            </div>

            <div className="verification-component-arrow">
              →
            </div>

            <div className="verification-component-box">
              <strong>Driver</strong>
              <span>Drives signals</span>
            </div>

            <div className="verification-component-arrow">
              →
            </div>

            <div className="verification-component-box verification-dut">
              <strong>DUT</strong>
              <span>Receives inputs</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="monitor"
        title="Monitor"
      >
        <p>
          A <strong>monitor</strong> observes signals coming from
          the DUT.
        </p>

        <p>
          Unlike a driver, a monitor normally does not control the
          DUT. Its job is to observe what happened and convert the
          signal activity into useful transaction information.
        </p>

        <LessonVisual
          type="diagram"
          caption="A monitor observes DUT activity and sends the observed information for checking."
        >
          <div className="verification-component-flow">

            <div className="verification-component-box verification-dut">
              <strong>DUT</strong>
              <span>Output signals</span>
            </div>

            <div className="verification-component-arrow">
              →
            </div>

            <div className="verification-component-box">
              <strong>Monitor</strong>
              <span>Observes signals</span>
            </div>

            <div className="verification-component-arrow">
              →
            </div>

            <div className="verification-component-box">
              <strong>Checker</strong>
              <span>Analyzes results</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="scoreboard"
        title="Scoreboard"
      >
        <p>
          A <strong>scoreboard</strong> compares the actual output
          from the DUT with the expected output.
        </p>

        <p>
          If the values match, the transaction passes. If they do
          not match, the scoreboard reports a failure.
        </p>

        <LessonVisual
          type="diagram"
          caption="The scoreboard compares expected results with actual DUT results."
        >
          <div className="scoreboard-diagram">

            <div className="scoreboard-input">
              <strong>Expected</strong>
              <span>Result = 15</span>
            </div>

            <div className="scoreboard-vs">
              VS
            </div>

            <div className="scoreboard-input">
              <strong>Actual</strong>
              <span>Result = 15</span>
            </div>

            <div className="scoreboard-arrow">
              →
            </div>

            <div className="scoreboard-result">
              <strong>PASS</strong>
              <span>Values match</span>
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Simple scoreboard idea">
{`if (actual == expected)
  $display("PASS");
else
  $display("FAIL");`}
        </CodeExample>
      </LessonSection>


      <LessonSection
        id="coverage"
        title="Functional Coverage"
      >
        <p>
          <strong>Functional coverage</strong> measures which
          important scenarios have been exercised by the
          verification environment.
        </p>

        <p>
          For example, if a design has several operating modes,
          functional coverage can help determine whether each mode
          has actually been tested.
        </p>

        <CodeExample title="Simple covergroup">
{`covergroup cg;

  coverpoint mode;

endgroup`}
        </CodeExample>

        <p>
          Coverage helps answer an important question:
          <strong> "What have we tested?"</strong>
        </p>

        <LessonVisual
          type="diagram"
          caption="Functional coverage tracks which important scenarios have been exercised."
        >
          <div className="coverage-diagram">

            <div className="coverage-title">
              Functional Coverage
            </div>

            <div className="coverage-items">

              <div className="coverage-item">
                <strong>Mode 0</strong>
                <span>Tested</span>
              </div>

              <div className="coverage-item">
                <strong>Mode 1</strong>
                <span>Tested</span>
              </div>

              <div className="coverage-item">
                <strong>Mode 2</strong>
                <span>Tested</span>
              </div>

              <div className="coverage-item">
                <strong>Mode 3</strong>
                <span>Not tested</span>
              </div>

            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Remember"
        >
          <p>
            Coverage tells us about the
            <strong> scenarios exercised</strong>.
            Assertions tell us whether
            <strong> expected rules are satisfied</strong>.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="assertions"
        title="Assertions in Verification"
      >
        <p>
          Assertions can automatically check rules that the DUT is
          expected to follow.
        </p>

        <p>
          For example, if a request is made, a response may be
          required within a certain number of clock cycles.
        </p>

        <CodeExample title="Protocol check">
{`assert property (
  @(posedge clk)
  request |-> ##1 response
);`}
        </CodeExample>

        <p>
          This allows the verification environment to detect
          protocol violations automatically.
        </p>

        <LessonVisual
          type="diagram"
          caption="Assertions continuously check important design rules during simulation."
        >
          <div className="assertion-verification-diagram">

            <div className="assertion-verification-box">
              <strong>Design Rule</strong>
              <span>request → response</span>
            </div>

            <div className="assertion-verification-arrow">
              →
            </div>

            <div className="assertion-verification-box">
              <strong>Assertion</strong>
              <span>Automatic check</span>
            </div>

            <div className="assertion-verification-arrow">
              →
            </div>

            <div className="assertion-verification-box">
              <strong>Result</strong>
              <span>PASS / FAIL</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="uvm"
        title="SystemVerilog and UVM"
      >
        <p>
          <strong>UVM</strong>, or Universal Verification
          Methodology, is a standardized methodology for building
          reusable verification environments.
        </p>

        <p>
          UVM is built using SystemVerilog and makes extensive use
          of classes, interfaces, transactions, drivers, monitors,
          scoreboards, and other verification components.
        </p>

        <LessonVisual
          type="diagram"
          caption="SystemVerilog provides the language features used to build UVM-based verification environments."
        >
          <div className="uvm-flow-diagram">

            <div className="uvm-flow-box">
              <strong>SystemVerilog</strong>
              <span>Classes + Interfaces</span>
            </div>

            <div className="uvm-flow-arrow">
              →
            </div>

            <div className="uvm-flow-box">
              <strong>UVM</strong>
              <span>Verification Framework</span>
            </div>

            <div className="uvm-flow-arrow">
              →
            </div>

            <div className="uvm-flow-box">
              <strong>Reusable TB</strong>
              <span>Scalable Verification</span>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="important"
          title="Why this matters"
        >
          <p>
            If you plan to work in functional verification,
            learning SystemVerilog is an important foundation before
            moving into UVM.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Example"
      >
        <p>
          Let's look at a simple verification flow for a 2-to-1
          multiplexer.
        </p>

        <CodeExample title="MUX design">
{`module mux2to1 (
  input  logic a,
  input  logic b,
  input  logic sel,
  output logic y
);

  always_comb begin

    if (sel)
      y = b;
    else
      y = a;

  end

endmodule`}
        </CodeExample>

        <p>
          The verification environment can apply different values
          to <strong>a</strong>, <strong>b</strong>, and
          <strong>sel</strong>, then calculate the expected result.
        </p>

        <CodeExample title="Expected result">
{`if (sel)
  expected = b;
else
  expected = a;`}
        </CodeExample>

        <p>
          The actual DUT output can then be compared with the
          expected result.
        </p>

        <LessonVisual
          type="diagram"
          caption="A simple MUX verification flow."
        >
          <div className="mux-verification-flow">

            <div className="mux-verification-box">
              <strong>Stimulus</strong>
              <span>a, b, sel</span>
            </div>

            <div className="mux-verification-arrow">
              →
            </div>

            <div className="mux-verification-box">
              <strong>MUX DUT</strong>
              <span>Actual output</span>
            </div>

            <div className="mux-verification-arrow">
              →
            </div>

            <div className="mux-verification-box">
              <strong>Scoreboard</strong>
              <span>Expected vs Actual</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Try a simple SystemVerilog verification example where a
          checker compares the actual result with the expected
          result.
        </p>

        <TryIt
          title="Experiment with Verification"
          language="SystemVerilog"
          initialCode={`module verification_demo;

  logic [3:0] a;
  logic [3:0] b;
  logic [3:0] result;
  logic [3:0] expected;

  always_comb begin

    result = a + b;

  end

  initial begin

    a = 4'd5;
    b = 4'd3;

    #1;

    expected = a + b;

    assert (result == expected)
      $display(
        "PASS: result=%0d expected=%0d",
        result,
        expected
      );
    else
      $display(
        "FAIL: result=%0d expected=%0d",
        result,
        expected
      );

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
            Verification checks whether the RTL behaves according
            to its specification.
          </li>

          <li>
            The <strong>DUT</strong> is the hardware design being
            tested.
          </li>

          <li>
            <strong>Stimulus</strong> provides inputs to the DUT.
          </li>

          <li>
            A <strong>driver</strong> converts transactions into
            DUT signal activity.
          </li>

          <li>
            A <strong>monitor</strong> observes DUT activity.
          </li>

          <li>
            A <strong>scoreboard</strong> compares expected and
            actual results.
          </li>

          <li>
            <strong>Functional coverage</strong> measures which
            important scenarios have been exercised.
          </li>

          <li>
            <strong>Assertions</strong> automatically check
            important design rules.
          </li>

          <li>
            SystemVerilog provides the foundation for
            class-based verification and UVM.
          </li>

        </ul>

        <LearningNote
          type="important"
          title="Next Step"
        >
          <p>
            You now have the core SystemVerilog concepts needed to
            understand RTL and verification. The next lesson will
            put these ideas into practice through
            <strong> SystemVerilog Projects</strong>.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Verification;