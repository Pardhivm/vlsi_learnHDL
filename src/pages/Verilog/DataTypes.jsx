import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function DataTypes() {
  const sections = [
    { id: "what-are-data-types", title: "What are Data Types?" },
    { id: "wire", title: "wire" },
    { id: "reg", title: "reg" },
    { id: "wire-vs-reg", title: "wire vs reg" },
    { id: "scalar", title: "Scalar Signals" },
    { id: "vectors", title: "Vectors" },
    { id: "four-state", title: "Four-State Logic" },
    { id: "practical-example", title: "Practical Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Data Types"
      sections={sections}
      previousLesson="Ports"
      previousPath="/verilog/ports"
      nextLesson="Operators"
      nextPath="/verilog/operators"
    >

      <LessonSection
        id="what-are-data-types"
        title="What are Data Types?"
      >
        <p>
          In Verilog, <strong>data types</strong> describe how signals are
          represented and used inside a hardware design.
        </p>

        <p>
          They help us describe signals such as inputs, outputs, internal
          connections, and stored values.
        </p>


        <LearningNote type="info" title="Think Like Hardware">
          <p>
            Instead of thinking of a data type only as a programming concept,
            think about the <strong>kind of signal</strong> you are describing
            in the hardware.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection id="wire" title="wire">
        <p>
          The <strong>wire</strong> data type represents a physical-style
          connection between parts of a circuit.
        </p>

        <CodeExample title="wire Example">
{`wire a;
wire b;
wire y;`}
        </CodeExample>

        <p>
          A wire does not store a value by itself. It carries a value produced
          by something else.
        </p>

        <CodeExample title="Using wire">
{`wire a;
wire b;
wire y;

assign y = a & b;`}
        </CodeExample>

        <p>
          Here, <strong>y</strong> carries the result of the AND operation.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            Think of a wire like a real electrical wire
            carrying a signal from one point to another.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection id="reg" title="reg">
        <p>
          The <strong>reg</strong> data type is used for signals that are
          assigned inside procedural blocks such as <strong>always</strong>
          blocks.
        </p>

        <CodeExample title="reg Example">
{`reg a;
reg b;
reg y;`}
        </CodeExample>

        <p>
          A <strong>reg</strong> does not necessarily mean a physical
          hardware register.
        </p>

        <LearningNote type="warning" title="Important">
          <p>
            The name reg can be misleading for beginners.
          </p>

          <p>
            In Verilog, reg mainly means that the signal can
            be assigned inside a procedural block.
          </p>
        </LearningNote>

        <CodeExample title="reg inside an always block">
{`reg y;

always @(*) begin
    y = a & b;
end`}
        </CodeExample>
      </LessonSection>

      <LessonSection id="wire-vs-reg" title="wire vs reg">
        <p>
          One of the most common beginner questions is:
          <strong> What is the difference between wire and reg?</strong>
        </p>

        <CodeExample title="Basic Difference">
{`wire a;
reg  b;`}
        </CodeExample>

        <ul>
          <li>
            <strong>wire</strong> is commonly used for continuous connections.
          </li>

          <li>
            <strong>reg</strong> is commonly used for values assigned inside
            procedural blocks.
          </li>
        </ul>

        <LearningNote type="important" title="Beginner Rule">
          <p>
            For now, remember:
          </p>

          <p>
            <strong>assign → wire</strong>
          </p>

          <p>
            <strong>always → reg</strong>
          </p>

          <p>
            We will explore this more when we learn
             Always Blocks.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection id="scalar" title="Scalar Signals">
        <p>
          A <strong>scalar</strong> signal contains only one bit.
        </p>

        <CodeExample title="Scalar Signals">
{`wire a;
reg  b;`}
        </CodeExample>

        <p>
          Each signal above can contain one digital value.
        </p>

        <CodeExample title="Possible Values">
{`0
1
X
Z`}
        </CodeExample>

        <LearningNote type="info" title="One Bit">
          <p>
            A scalar signal is basically a single-bit signal.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection id="vectors" title="Vectors">
        <p>
          Sometimes a circuit needs more than one bit. Verilog allows us to
          group multiple bits together using a <strong>vector</strong>.
        </p>

        <CodeExample title="8-bit Vector">
{`wire [7:0] data;`}
        </CodeExample>

        <p>
          This creates an <strong>8-bit</strong> signal.
        </p>


        <p>
          The bits are numbered from <strong>7</strong> down to
          <strong> 0</strong>.
        </p>

        <CodeExample title="8-bit Vector">
{`[7] [6] [5] [4] [3] [2] [1] [0]
 |   |   |   |   |   |   |   |
 +---+---+---+---+---+---+---+
              data`}
        </CodeExample>

        <p>
          Therefore:
        </p>

        <ul>
          <li><strong>data[7]</strong> is the most significant bit.</li>
          <li><strong>data[0]</strong> is the least significant bit.</li>
          <li>The complete signal contains 8 bits.</li>
        </ul>

        <CodeExample title="Other Vector Sizes">
{`wire [3:0] nibble;    // 4 bits
wire [7:0] byte;      // 8 bits
wire [15:0] word;     // 16 bits
wire [31:0] data;     // 32 bits`}
        </CodeExample>

        <LearningNote type="tip" title="Remember">
          <p>
            <strong>[7:0]</strong> means there are 8 positions:
            7, 6, 5, 4, 3, 2, 1, and 0.
          </p>
        </LearningNote>
      </LessonSection>
       <LessonVisual
          type="diagram"
          src="/diagrams/vecsca.png"
          alt="Digital signal representation"
        />
      <LessonSection id="four-state" title="Four-State Logic">
        <p>
          Verilog commonly uses a <strong>four-state logic system</strong>.
        </p>

        <CodeExample title="The Four States">
{`0
1
X
Z`}
        </CodeExample>

        <ul>
          <li>
            <strong>0</strong> → Logic LOW
          </li>

          <li>
            <strong>1</strong> → Logic HIGH
          </li>

          <li>
            <strong>X</strong> → Unknown value
          </li>

          <li>
            <strong>Z</strong> → High impedance
          </li>
        </ul>

        <LearningNote type="important" title="Why X and Z Matter">
          <p>
            Real hardware simulations can encounter situations where a signal
            is unknown or not being driven.
          </p>

          <p>
            Verilog represents these situations using
             X and Z.
          </p>
        </LearningNote>

        <CodeExample title="Example">
{`wire a;

assign a = 1'bx;`}
        </CodeExample>

        <p>
          Here, the signal <strong>a</strong> has an unknown value.
        </p>
      </LessonSection>

      <LessonSection
        id="practical-example"
        title="Practical Example"
      >
        <p>
          Let's combine what we have learned into a simple 4-bit circuit.
        </p>

        <CodeExample title="4-bit AND Example">
{`module and_4bit(
    input  [3:0] a,
    input  [3:0] b,
    output [3:0] y
);

    assign y = a & b;

endmodule`}
        </CodeExample>

        <p>
          Here:
        </p>

        <ul>
          <li><strong>a</strong> is a 4-bit input vector.</li>
          <li><strong>b</strong> is a 4-bit input vector.</li>
          <li><strong>y</strong> is a 4-bit output vector.</li>
        </ul>

        <CodeExample title="Example Operation">
{`a = 1010
b = 1100

a & b = 1000`}
        </CodeExample>

        <LearningNote type="info" title="Hardware View">
          <p>
            Instead of one AND gate, you can imagine four AND gates working
            in parallel, one for each bit.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection id="try-it" title="Try It Yourself">
        <p>
          Now let's experiment with a 4-bit signal.
        </p>

        <p>
          Change the values of <strong>a</strong> and <strong>b</strong>
          and observe the output.
        </p>

        <TryIt
          title="Try 4-bit Verilog"
          language="Verilog"
          mode="beginner"
          initialCode={`module and_4bit(
  input [3:0] a,
  input [3:0] b,
  output [3:0] y
);

  assign y = a & b;

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  wire [3:0] y;

  and_4bit dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor("a=%b b=%b y=%b", a, b, y);

    a = 4'b1010;
    b = 4'b1100;

    #10 a = 4'b1111;
    b = 4'b0011;

    #10 a = 4'b0101;
    b = 4'b1010;

    #10 $finish;

  end

endmodule`}
        />
      </LessonSection>

      <LessonSection id="practice" title="Practice">

        <LearningNote type="important" title="Question 1">
          <p>
            Which data type is commonly used for a continuous connection?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>wire</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            How many bits are present in the following signal?
          </p>
        </LearningNote>

        <CodeExample>
{`wire [7:0] data;`}
        </CodeExample>

        <details>
          <summary>Show Answer</summary>
          <p>
            It contains <strong>8 bits</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What does <strong>X</strong> represent in Verilog?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            <strong>X</strong> represents an unknown value.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does <strong>[3:0]</strong> represent?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It represents a <strong>4-bit vector</strong>.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            <strong>wire</strong> is commonly used for continuous connections.
          </li>

          <li>
            <strong>reg</strong> is used for signals assigned in procedural
            blocks.
          </li>

          <li>
            A <strong>scalar</strong> contains one bit.
          </li>

          <li>
            A <strong>vector</strong> contains multiple bits.
          </li>

          <li>
            <strong>[7:0]</strong> represents an 8-bit vector.
          </li>

          <li>
            Verilog uses four common logic states:
            <strong> 0, 1, X, and Z</strong>.
          </li>

          <li>
            Vectors are very important when designing buses, registers,
            counters, ALUs, and processors.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            Now that you understand how Verilog represents signals and groups
            bits together, the next lesson will teach you how to
            perform operations on those signals.
          </p>

          <p>
            That means we are moving to Verilog Operators.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default DataTypes;