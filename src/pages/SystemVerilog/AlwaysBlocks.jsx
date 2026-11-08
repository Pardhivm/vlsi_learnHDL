import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function AlwaysBlocks() {
  const sections = [
    {
      id: "what-is-always",
      title: "What is an always block?"
    },
    {
      id: "always-comb",
      title: "always_comb"
    },
    {
      id: "always-ff",
      title: "always_ff"
    },
    {
      id: "combinational",
      title: "Combinational Logic"
    },
    {
      id: "sequential",
      title: "Sequential Logic"
    },
    {
      id: "comb-vs-ff",
      title: "always_comb vs always_ff"
    },
    {
      id: "blocking-nonblocking",
      title: "Blocking vs Non-blocking"
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
      title="SystemVerilog Always Blocks"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Logic"
      previousPath="/systemverilog/logic"
      nextLesson="Interfaces"
      nextPath="/systemverilog/interfaces"
    >

      <LessonSection
        id="what-is-always"
        title="What is an always block?"
      >
        <p>
          An <strong>always block</strong> is a procedural block
          that describes behavior that happens repeatedly during
          simulation.
        </p>

        <p>
          Always blocks are commonly used to describe digital
          hardware such as combinational logic, flip-flops,
          registers, counters, and state machines.
        </p>

        <p>
          SystemVerilog provides specialized forms of always blocks
          that make the designer's intention clearer.
        </p>

        <LessonVisual
          type="diagram"
          caption="Always blocks are commonly used to describe combinational and sequential hardware."
        >
          <div className="always-block-diagram">

            <div className="always-source">
              <strong>Inputs</strong>
              <span>Signals</span>
            </div>

            <div className="always-arrow">
              →
            </div>

            <div className="always-block-box">
              <strong>always block</strong>
              <span>Hardware behavior</span>
            </div>

            <div className="always-arrow">
              →
            </div>

            <div className="always-source">
              <strong>Outputs</strong>
              <span>Signals</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="always-comb"
        title="always_comb"
      >
        <p>
          The <strong>always_comb</strong> block is used to describe
          combinational logic.
        </p>

        <p>
          Combinational logic produces an output based on the
          current values of its inputs.
        </p>

        <CodeExample title="Basic always_comb">
{`always_comb begin

  y = a & b;

end`}
        </CodeExample>

        <p>
          Whenever a signal used by the block changes,
          the block is automatically evaluated again.
        </p>

        <LearningNote
          type="tip"
          title="Remember"
        >
          <p>
            Think of <strong>always_comb</strong> as:
            <strong> "Describe combinational hardware."</strong>
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="always-ff"
        title="always_ff"
      >
        <p>
          The <strong>always_ff</strong> block is used to describe
          sequential logic, such as flip-flops and registers.
        </p>

        <p>
          Sequential logic normally changes its stored value in
          response to a clock edge.
        </p>

        <CodeExample title="D Flip-Flop">
{`always_ff @(posedge clk) begin

  q <= d;

end`}
        </CodeExample>

        <p>
          The statement executes when the rising edge of
          <strong> clk </strong>
          occurs.
        </p>

        <LessonVisual
          type="diagram"
          caption="A flip-flop captures the input value on a clock edge."
        >
          <div className="flip-flop-diagram">

            <div className="flip-flop-input">
              <strong>D</strong>
              <span>Data</span>
            </div>

            <div className="flip-flop-arrow">
              →
            </div>

            <div className="flip-flop-box">
              <strong>D FF</strong>
              <span>Clocked storage</span>
            </div>

            <div className="flip-flop-arrow">
              →
            </div>

            <div className="flip-flop-output">
              <strong>Q</strong>
              <span>Output</span>
            </div>

            <div className="flip-flop-clock">
              CLK ↑
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="combinational"
        title="Combinational Logic"
      >
        <p>
          In combinational logic, the output depends only on the
          current input values.
        </p>

        <p>
          Examples include:
        </p>

        <ul>
          <li>AND gates</li>
          <li>OR gates</li>
          <li>Multiplexers</li>
          <li>Decoders</li>
          <li>Comparators</li>
          <li>Arithmetic logic</li>
        </ul>

        <CodeExample title="2-to-1 Multiplexer">
{`always_comb begin

  if (sel)
    y = b;
  else
    y = a;

end`}
        </CodeExample>

        <p>
          There is no clock in this example. The output changes
          according to the current inputs.
        </p>

        <LessonVisual
          type="diagram"
          caption="A multiplexer is an example of combinational logic."
        >
          <div className="combination-diagram">

            <div className="combination-input">
              A
            </div>

            <div className="combination-input">
              B
            </div>

            <div className="combination-block">
              2:1 MUX
            </div>

            <div className="combination-output">
              Y
            </div>

            <div className="combination-select">
              SEL
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="sequential"
        title="Sequential Logic"
      >
        <p>
          Sequential logic contains storage. Its output can depend
          on previous values as well as current inputs.
        </p>

        <p>
          Common examples include:
        </p>

        <ul>
          <li>Flip-flops</li>
          <li>Registers</li>
          <li>Counters</li>
          <li>Shift registers</li>
          <li>Finite state machines</li>
        </ul>

        <CodeExample title="4-bit Counter">
{`always_ff @(posedge clk) begin

  count <= count + 1;

end`}
        </CodeExample>

        <p>
          Each rising clock edge causes the counter to update.
        </p>

        <LessonVisual
          type="diagram"
          caption="A counter updates its stored value on clock edges."
        >
          <div className="counter-diagram">

            <div className="counter-clock">
              CLK
              <strong>↑ ↑ ↑ ↑</strong>
            </div>

            <div className="counter-arrow">
              →
            </div>

            <div className="counter-box">
              <strong>Counter</strong>
              <span>Stored value</span>
            </div>

            <div className="counter-arrow">
              →
            </div>

            <div className="counter-output">
              <strong>0 → 1 → 2 → 3</strong>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="comb-vs-ff"
        title="always_comb vs always_ff"
      >
        <p>
          The two specialized blocks have different purposes.
        </p>

        <div className="comparison-table-container">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Feature</th>
                <th>always_comb</th>
                <th>always_ff</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Purpose</td>
                <td>Combinational logic</td>
                <td>Sequential logic</td>
              </tr>

              <tr>
                <td>Clock</td>
                <td>Usually no clock</td>
                <td>Uses a clock event</td>
              </tr>

              <tr>
                <td>Storage</td>
                <td>No intentional storage</td>
                <td>Represents storage</td>
              </tr>

              <tr>
                <td>Common examples</td>
                <td>MUX, decoder, comparator</td>
                <td>Flip-flop, register, counter</td>
              </tr>

              <tr>
                <td>Typical assignment</td>
                <td>Blocking =</td>
                <td>Non-blocking &lt;=</td>
              </tr>

            </tbody>

          </table>

        </div>

        <LearningNote
          type="important"
          title="Easy way to remember"
        >
          <p>
            <strong>always_comb → combinational</strong>
            <br />
            <strong>always_ff → flip-flop / sequential</strong>
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="blocking-nonblocking"
        title="Blocking vs Non-blocking"
      >
        <p>
          SystemVerilog provides two important assignment operators
          for procedural code.
        </p>

        <div className="comparison-table-container">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Operator</th>
                <th>Name</th>
                <th>Common Usage</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>=</td>
                <td>Blocking assignment</td>
                <td>Combinational logic</td>
              </tr>

              <tr>
                <td>&lt;=</td>
                <td>Non-blocking assignment</td>
                <td>Sequential logic</td>
              </tr>

            </tbody>

          </table>

        </div>

        <h3>Blocking assignment</h3>

        <p>
          A blocking assignment updates the left-hand side before
          the next statement executes.
        </p>

        <CodeExample title="Blocking assignment">
{`always_comb begin

  y = a;
  z = y;

end`}
        </CodeExample>

        <h3>Non-blocking assignment</h3>

        <p>
          A non-blocking assignment schedules the update so that
          clocked hardware can model simultaneous register updates.
        </p>

        <CodeExample title="Non-blocking assignment">
{`always_ff @(posedge clk) begin

  q1 <= d;
  q2 <= q1;

end`}
        </CodeExample>

        <LearningNote
          type="warning"
          title="Important"
        >
          <p>
            A common beginner rule is:
            <strong> use = for always_comb </strong>
            and
            <strong> use &lt;= for always_ff</strong>.
            Following this convention makes RTL easier to understand
            and avoids many common mistakes.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Examples"
      >
        <h3>Example 1: Combinational ALU operation</h3>

        <p>
          We can use <strong>always_comb</strong> to describe a
          simple arithmetic operation.
        </p>

        <CodeExample title="Simple ALU">
{`always_comb begin

  if (sel)
    result = a + b;
  else
    result = a - b;

end`}
        </CodeExample>

        <h3>Example 2: Register</h3>

        <p>
          A register can be described using
          <strong> always_ff</strong>.
        </p>

        <CodeExample title="4-bit register">
{`always_ff @(posedge clk) begin

  q <= d;

end`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="Combinational logic calculates values while sequential logic stores values."
        >
          <div className="rtl-flow-diagram">

            <div className="rtl-flow-box">
              <strong>Inputs</strong>
              <span>A, B, SEL</span>
            </div>

            <div className="rtl-flow-arrow">
              →
            </div>

            <div className="rtl-flow-box">
              <strong>Combinational</strong>
              <span>always_comb</span>
            </div>

            <div className="rtl-flow-arrow">
              →
            </div>

            <div className="rtl-flow-box">
              <strong>Sequential</strong>
              <span>always_ff</span>
            </div>

            <div className="rtl-flow-arrow">
              →
            </div>

            <div className="rtl-flow-box">
              <strong>Output</strong>
              <span>Stored result</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Experiment with a clocked counter using
          <strong> always_ff</strong>.
        </p>

        <TryIt
          title="Experiment with always_ff"
          language="SystemVerilog"
          initialCode={`module counter_demo;

  logic clk;
  logic [3:0] count;

  always_ff @(posedge clk) begin
    count <= count + 1;
  end

  initial begin

    clk = 0;
    count = 0;

    #5 clk = 1;
    #5 clk = 0;

    #5 clk = 1;
    #5 clk = 0;

    #5 clk = 1;
    #5 clk = 0;

    #5 clk = 1;
    #5 clk = 0;

    #5 $finish;

  end

  always @(count) begin
    $display("Time=%0t count=%0d", $time, count);
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
            Always blocks describe procedural hardware behavior.
          </li>

          <li>
            <strong>always_comb</strong> is used for combinational
            logic.
          </li>

          <li>
            <strong>always_ff</strong> is used for sequential logic
            such as flip-flops and registers.
          </li>

          <li>
            Combinational logic does not intentionally store
            previous values.
          </li>

          <li>
            Sequential logic uses storage and commonly responds to
            clock edges.
          </li>

          <li>
            Blocking assignment <strong>=</strong> is commonly used
            in combinational logic.
          </li>

          <li>
            Non-blocking assignment <strong>&lt;=</strong> is
            commonly used in sequential logic.
          </li>

          <li>
            Understanding always blocks is essential for writing
            synthesizable RTL.
          </li>

        </ul>

        <LearningNote
          type="important"
          title="Next Step"
        >
          <p>
            Now that we understand how SystemVerilog describes
            combinational and sequential behavior, the next lesson
            will introduce <strong>Interfaces</strong> and how they
            simplify connections between modules.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default AlwaysBlocks;