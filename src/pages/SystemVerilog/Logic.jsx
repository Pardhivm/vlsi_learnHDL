import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Logic() {
  const sections = [
    {
      id: "what-is-logic",
      title: "What is logic?"
    },
    {
      id: "four-states",
      title: "Four Logic States"
    },
    {
      id: "declaring-logic",
      title: "Declaring logic"
    },
    {
      id: "logic-vectors",
      title: "Logic Vectors"
    },
    {
      id: "logic-rtl",
      title: "logic in RTL Design"
    },
    {
      id: "logic-vs-wire",
      title: "logic vs wire"
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
      title="SystemVerilog logic"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Data Types"
      previousPath="/systemverilog/data-types"
      nextLesson="Always Blocks"
      nextPath="/systemverilog/always-blocks"
    >

      <LessonSection
        id="what-is-logic"
        title="What is logic?"
      >
        <p>
          The <strong>logic</strong> type is one of the most
          commonly used data types in SystemVerilog.
        </p>

        <p>
          It represents a signal that can have four possible
          values:
          <strong> 0, 1, X, and Z</strong>.
        </p>

        <p>
          In RTL design, logic is commonly used for signals,
          inputs, outputs, registers, and intermediate values.
        </p>

        <LessonVisual
          type="diagram"
          caption="A logic signal can represent four different simulation states."
        >
          <div className="logic-states-diagram">

            <div className="logic-state-box">
              <strong>0</strong>
              <span>LOW</span>
            </div>

            <div className="logic-state-box">
              <strong>1</strong>
              <span>HIGH</span>
            </div>

            <div className="logic-state-box">
              <strong>X</strong>
              <span>Unknown</span>
            </div>

            <div className="logic-state-box">
              <strong>Z</strong>
              <span>High-Z</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="four-states"
        title="Four Logic States"
      >
        <p>
          Unlike a simple Boolean value, a SystemVerilog
          <strong> logic </strong>
          signal can represent four states.
        </p>

        <div className="truth-table-container">
          <table className="truth-table">

            <thead>
              <tr>
                <th>Value</th>
                <th>Meaning</th>
                <th>Example Situation</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>0</td>
                <td>Logic LOW</td>
                <td>Signal is driven LOW</td>
              </tr>

              <tr>
                <td>1</td>
                <td>Logic HIGH</td>
                <td>Signal is driven HIGH</td>
              </tr>

              <tr>
                <td>X</td>
                <td>Unknown</td>
                <td>Value cannot be determined</td>
              </tr>

              <tr>
                <td>Z</td>
                <td>High impedance</td>
                <td>Signal is not being driven</td>
              </tr>

            </tbody>

          </table>
        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          <p>
            X and Z are especially useful during simulation because
            they can expose problems such as uninitialized signals
            or undriven connections.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="declaring-logic"
        title="Declaring logic"
      >
        <p>
          A logic signal is declared using the
          <strong> logic </strong>
          keyword.
        </p>

        <CodeExample title="Basic logic declarations">
{`logic enable;

logic data;

logic ready;`}
        </CodeExample>

        <p>
          A logic signal can also be used as a module input or
          output.
        </p>

        <CodeExample title="logic with module ports">
{`module example (
  input  logic a,
  input  logic b,
  output logic y
);

endmodule`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Beginner Tip"
        >
          <p>
            When you see
            <strong> input logic </strong>
            or
            <strong> output logic </strong>
            in SystemVerilog, it means the port is declared as a
            logic signal.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="logic-vectors"
        title="Logic Vectors"
      >
        <p>
          A single logic variable represents one bit.
          But digital circuits often need multiple bits.
        </p>

        <p>
          SystemVerilog allows us to create a group of logic bits
          using a vector.
        </p>

        <CodeExample title="4-bit logic vector">
{`logic [3:0] data;`}
        </CodeExample>

        <p>
          This creates a 4-bit signal containing bits
          <strong> 3, 2, 1, and 0</strong>.
        </p>

        <LessonVisual
          type="diagram"
          caption="A 4-bit logic vector contains four individual logic bits."
        >
          <div className="logic-vector-display">

            <div className="logic-vector-bit">
              <span>3</span>
              <strong>1</strong>
            </div>

            <div className="logic-vector-bit">
              <span>2</span>
              <strong>0</strong>
            </div>

            <div className="logic-vector-bit">
              <span>1</span>
              <strong>1</strong>
            </div>

            <div className="logic-vector-bit">
              <span>0</span>
              <strong>0</strong>
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Assigning a value">
{`logic [3:0] data;

assign data = 4'b1010;`}
        </CodeExample>

        <p>
          Here,
          <strong> 1010 </strong>
          is stored in the four-bit signal.
        </p>
      </LessonSection>


      <LessonSection
        id="logic-rtl"
        title="logic in RTL Design"
      >
        <p>
          The logic type is extremely useful when describing
          digital hardware.
        </p>

        <p>
          For example, consider a simple OR circuit.
        </p>

        <LessonVisual
          type="diagram"
          caption="The output of an OR circuit can be represented using a logic signal."
        >
          <div className="logic-circuit-diagram">

            <div className="logic-input">
              <span>A</span>
              <strong>logic</strong>
            </div>

            <div className="logic-input">
              <span>B</span>
              <strong>logic</strong>
            </div>

            <div className="logic-gate">
              OR
            </div>

            <div className="logic-output">
              <span>Y</span>
              <strong>logic</strong>
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="OR gate using logic">
{`module or_gate (
  input  logic a,
  input  logic b,
  output logic y
);

  assign y = a | b;

endmodule`}
        </CodeExample>

        <p>
          Here, <strong>a</strong>, <strong>b</strong>, and
          <strong> y </strong>
          are all declared as logic signals.
        </p>
      </LessonSection>


      <LessonSection
        id="logic-vs-wire"
        title="logic vs wire"
      >
        <p>
          If you have learned Verilog, you may have seen the
          <strong> wire </strong>
          keyword.
        </p>

        <p>
          SystemVerilog introduced
          <strong> logic </strong>
          as a more convenient variable type for many common
          design situations.
        </p>

        <div className="comparison-table-container">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Feature</th>
                <th>logic</th>
                <th>wire</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Four-state</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Can be used in RTL</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Common SystemVerilog choice</td>
                <td>Yes</td>
                <td>Less common</td>
              </tr>

              <tr>
                <td>Variable storage behavior</td>
                <td>Can be used for variables</td>
                <td>Net type</td>
              </tr>

            </tbody>

          </table>

        </div>

        <LearningNote
          type="warning"
          title="Important distinction"
        >
          <p>
            <strong>logic</strong> does not mean that every signal
            in SystemVerilog should automatically be declared as
            logic. Net types such as wire are still important,
            especially when modeling connections and multiple
            drivers.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Example"
      >
        <p>
          Let's use logic signals to build a simple 2-to-1
          multiplexer.
        </p>

        <p>
          A multiplexer selects one of two inputs based on a
          select signal.
        </p>

        <LessonVisual
          type="diagram"
          caption="A 2-to-1 multiplexer selects either A or B depending on the select signal."
        >
          <div className="mux-diagram">

            <div className="mux-inputs">

              <div>
                <strong>A</strong>
                <span>logic</span>
              </div>

              <div>
                <strong>B</strong>
                <span>logic</span>
              </div>

            </div>

            <div className="mux-block">
              2:1 MUX
            </div>

            <div className="mux-output">
              <strong>Y</strong>
              <span>logic</span>
            </div>

            <div className="mux-select">
              SEL
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="2-to-1 Multiplexer">
{`module mux_2to1 (
  input  logic a,
  input  logic b,
  input  logic sel,
  output logic y
);

  assign y = sel ? b : a;

endmodule`}
        </CodeExample>

        <p>
          When <strong>sel</strong> is 0, the output is
          <strong> a</strong>.
        </p>

        <p>
          When <strong>sel</strong> is 1, the output is
          <strong> b</strong>.
        </p>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Modify the inputs and experiment with the logic
          signals.
        </p>

        <TryIt
          title="Experiment with logic"
          language="SystemVerilog"
          initialCode={`module mux_2to1;

  logic a;
  logic b;
  logic sel;
  logic y;

  assign y = sel ? b : a;

  initial begin

    a = 0;
    b = 1;
    sel = 0;

    #10;
    $display("a=%b b=%b sel=%b y=%b", a, b, sel, y);

    sel = 1;

    #10;
    $display("a=%b b=%b sel=%b y=%b", a, b, sel, y);

    a = 1;
    b = 0;

    #10;
    $display("a=%b b=%b sel=%b y=%b", a, b, sel, y);

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
            <strong>logic</strong> is a commonly used
            SystemVerilog data type.
          </li>

          <li>
            It supports four states:
            <strong> 0, 1, X, and Z</strong>.
          </li>

          <li>
            A single logic variable represents one bit.
          </li>

          <li>
            Logic vectors can represent multiple bits, such as
            <strong> logic [7:0]</strong>.
          </li>

          <li>
            Logic is widely used for RTL signals and module ports.
          </li>

          <li>
            SystemVerilog also supports net types such as
            <strong> wire</strong>.
          </li>

          <li>
            Understanding logic is important before learning
            SystemVerilog procedural blocks such as
            <strong> always_comb </strong>
            and
            <strong> always_ff</strong>.
          </li>

        </ul>

        <LearningNote
          type="important"
          title="Next Step"
        >
          <p>
            In the next lesson, we will learn about
            <strong> Always Blocks </strong>
            and how SystemVerilog uses
            <strong> always_comb </strong>
            and
            <strong> always_ff </strong>
            to describe hardware behavior.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Logic;