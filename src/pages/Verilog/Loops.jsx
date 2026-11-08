import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Loops() {
  const sections = [
    { id: "what-are-loops", title: "What are Loops?" },
    { id: "for-loop", title: "for Loop" },
    { id: "while-loop", title: "while Loop" },
    { id: "repeat-loop", title: "repeat Loop" },
    { id: "forever-loop", title: "forever Loop" },
    { id: "loop-variable", title: "Loop Variables" },
    { id: "generate", title: "generate Loops" },
    { id: "hardware-example", title: "Hardware Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Loops"
      sections={sections}
      previousLesson="Case"
      previousPath="/verilog/case"
      nextLesson="Functions"
      nextPath="/verilog/functions"
    >

      <LessonSection
        id="what-are-loops"
        title="What are Loops?"
      >
        <p>
          A <strong>loop</strong> allows us to repeat a set of statements
          multiple times.
        </p>

        <p>
          In Verilog, loops are useful when the same operation needs to be
          performed repeatedly.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/loops.png"
          alt="Repeated digital logic concept"
          caption="Loops can help describe repeated operations in RTL and testbench code."
        />

        <LearningNote type="info" title="Important">
          <p>
            A Verilog loop does not automatically mean that hardware contains
            a software-style loop.
          </p>

          <p>
            During synthesis, many loops are used to describe repeated
            hardware structures, while some loops are mainly useful in
            simulation and verification.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="for-loop"
        title="for Loop"
      >
        <p>
          The <strong>for loop</strong> is one of the most commonly used
          loops in Verilog.
        </p>

        <CodeExample title="Syntax">
{`for (initialization; condition; update) begin

    // statements

end`}
        </CodeExample>

        <CodeExample title="Example">
{`integer i;

always @(*) begin

    for (i = 0; i < 4; i = i + 1) begin
        y[i] = a[i];
    end

end`}
        </CodeExample>

        <p>
          The loop starts with <strong>i = 0</strong> and continues while
          <strong> i &lt; 4</strong>.
        </p>

        <p>
          After every iteration, <strong>i</strong> increases by 1.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            A for loop is especially useful when working with
            <strong> vectors and arrays.</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="while-loop"
        title="while Loop"
      >
        <p>
          A <strong>while loop</strong> continues executing as long as its
          condition is true.
        </p>

        <CodeExample title="Syntax">
{`while (condition) begin

    // statements

end`}
        </CodeExample>

        <CodeExample title="Example">
{`integer count;

initial begin

    count = 0;

    while (count < 4) begin
        count = count + 1;
    end

end`}
        </CodeExample>

        <p>
          The loop continues while <strong>count</strong> is less than 4.
        </p>

        <LearningNote type="warning" title="Be Careful">
          <p>
            Make sure the condition can eventually become false.
          </p>

          <p>
            Otherwise, the loop can continue indefinitely during simulation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="repeat-loop"
        title="repeat Loop"
      >
        <p>
          The <strong>repeat</strong> loop executes a statement a specified
          number of times.
        </p>

        <CodeExample title="Syntax">
{`repeat (number) begin

    // statements

end`}
        </CodeExample>

        <CodeExample title="Example">
{`initial begin

    repeat (4) begin
        $display("Hello");
    end

end`}
        </CodeExample>

        <p>
          The statement inside the loop executes exactly four times.
        </p>

        <LearningNote type="info" title="Where is repeat Used?">
          <p>
            repeat is particularly useful in
             testbenches and simulation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="forever-loop"
        title="forever Loop"
      >
        <p>
          A <strong>forever loop</strong> repeats continuously.
        </p>

        <CodeExample title="Syntax">
{`forever begin

    // statements

end`}
        </CodeExample>

        <p>
          There is no stopping condition in a forever loop.
        </p>

        <CodeExample title="Clock Generation Example">
{`reg clk;

initial begin

    clk = 0;

    forever begin
        #5 clk = ~clk;
    end

end`}
        </CodeExample>

        <p>
          This example repeatedly toggles the clock every 5 time units.
        </p>

        <LearningNote type="important" title="Simulation Use">
          <p>
            forever loops are commonly used in testbenches to generate
            repeating activities such as clocks.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="loop-variable"
        title="Loop Variables"
      >
        <p>
          A loop often uses a variable to keep track of the current iteration.
        </p>

        <CodeExample title="Loop Variable">
{`integer i;

for (i = 0; i < 8; i = i + 1) begin

    data[i] = 1'b0;

end`}
        </CodeExample>

        <p>
          Here, <strong>i</strong> takes the values:
        </p>

        <CodeExample title="Iteration Values">
{`i = 0
i = 1
i = 2
i = 3
i = 4
i = 5
i = 6
i = 7`}
        </CodeExample>

        <p>
          Each iteration accesses a different bit of the vector.
        </p>

        <LearningNote type="tip" title="Useful Pattern">
          <p>
            This pattern is very useful when processing every bit of a
            vector.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="generate"
        title="generate Loops"
      >
        <p>
          A <strong>generate loop</strong> is different from a procedural
          loop.
        </p>

        <p>
          Generate constructs are evaluated during elaboration and can be
          used to create repeated hardware structures.
        </p>

        <CodeExample title="Generate Example">
{`genvar i;

generate

    for (i = 0; i < 4; i = i + 1) begin : gen_xor

        xor (y[i], a[i], b[i]);

    end

endgenerate`}
        </CodeExample>

        <p>
          This example creates four XOR gates, one for each bit.
        </p>

        <CodeExample title="Hardware Structure">
{`a[0] ──┐
        XOR ── y[0]

a[1] ──┐
        XOR ── y[1]

a[2] ──┐
        XOR ── y[2]

a[3] ──┐
        XOR ── y[3]`}
        </CodeExample>

        <LearningNote type="important" title="Key Difference">
          <p>
            A procedural for loop executes as part of a
            procedural block.
          </p>

          <p>
            A generate for loop creates repeated hardware
            structures during elaboration.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="hardware-example"
        title="Hardware Example"
      >
        <p>
          Let's build a 4-bit XOR circuit using a generate loop.
        </p>

        <CodeExample title="4-bit XOR">
{`module xor_4bit(
    input  [3:0] a,
    input  [3:0] b,
    output [3:0] y
);

    genvar i;

    generate

        for (i = 0; i < 4; i = i + 1) begin : gen_xor

            xor (y[i], a[i], b[i]);

        end

    endgenerate

endmodule`}
        </CodeExample>

        <p>
          Instead of writing four separate XOR gates, the generate loop
          creates all four instances.
        </p>

        <CodeExample title="Equivalent Hardware">
{`xor (y[0], a[0], b[0]);
xor (y[1], a[1], b[1]);
xor (y[2], a[2], b[2]);
xor (y[3], a[3], b[3]);`}
        </CodeExample>

        <LearningNote type="tip" title="Why This Matters">
          <p>
            Generate loops make repetitive hardware descriptions shorter,
            cleaner, and easier to maintain.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's use a <strong>for loop</strong> to perform the same operation
          on every bit of a 4-bit vector.
        </p>

        <p>
          The circuit below performs a bitwise XOR operation.
        </p>

        <TryIt
          title="Experiment with a For Loop"
          language="Verilog"
          mode="beginner"
          initialCode={`module xor_4bit(
  input  [3:0] a,
  input  [3:0] b,
  output reg [3:0] y
);

  integer i;

  always @(*) begin

    for (i = 0; i < 4; i = i + 1) begin
      y[i] = a[i] ^ b[i];
    end

  end

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  wire [3:0] y;

  xor_4bit dut (
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

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote type="important" title="Question 1">
          <p>
            Which loop is commonly used when the number of iterations is
            known?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>for loop</strong> is commonly used when the number of
            iterations is known.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            Which loop repeats a statement a specified number of times?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>repeat</strong> loop.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Which loop continues until its condition becomes false?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>while</strong> loop.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            Which loop can run continuously without a stopping condition?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>forever</strong> loop.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What is a generate loop commonly used for?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It is commonly used to create repeated hardware structures during
            elaboration.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            Loops are used to repeat operations.
          </li>

          <li>
            The <strong>for</strong> loop is useful when the iteration count
            is known.
          </li>

          <li>
            The <strong>while</strong> loop continues while a condition is
            true.
          </li>

          <li>
            The <strong>repeat</strong> loop executes a fixed number of times.
          </li>

          <li>
            The <strong>forever</strong> loop repeats continuously.
          </li>

          <li>
            Loop variables keep track of iterations.
          </li>

          <li>
            Procedural loops are useful for describing repeated operations.
          </li>

          <li>
            Generate loops can create repeated hardware structures.
          </li>

          <li>
            Loops are especially useful when working with vectors and arrays.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now know how to repeat operations in Verilog.
          </p>

          <p>
            Next, we'll learn how to organize reusable pieces of Verilog code
            using <strong>Functions.</strong>
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Loops;