import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Assignments() {
  const sections = [
    { id: "what-are-assignments", title: "What are Assignments?" },
    { id: "continuous-assignment", title: "Continuous Assignment" },
    { id: "assign-statement", title: "The assign Statement" },
    { id: "procedural-assignment", title: "Procedural Assignment" },
    { id: "blocking", title: "Blocking Assignment" },
    { id: "nonblocking", title: "Nonblocking Assignment" },
    { id: "blocking-vs-nonblocking", title: "Blocking vs Nonblocking" },
    { id: "combinational-example", title: "Combinational Example" },
    { id: "sequential-example", title: "Sequential Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Assignments"
      sections={sections}
      previousLesson="Operators"
      previousPath="/verilog/operators"
      nextLesson="Always Blocks"
      nextPath="/verilog/always-blocks"
    >

      <LessonSection
        id="what-are-assignments"
        title="What are Assignments?"
      >
        <p>
          An <strong>assignment</strong> in Verilog is used to give a value
          to a signal.
        </p>

        <p>
          Assignments are one of the most important parts of RTL design
          because they describe how signals change and how hardware behaves.
        </p>

        <CodeExample title="Simple Assignment">
{`assign y = a & b;`}
        </CodeExample>

        <p>
          This statement continuously drives <strong>y</strong> with the
          result of <strong>a AND b</strong>.
        </p>


        <LearningNote type="info" title="Think Like Hardware">
          <p>
            An assignment describes a relationship between signals.
          </p>

          <p>
            For example, <strong>y = a &amp; b</strong> describes AND logic
            between the input signals and the output.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="continuous-assignment"
        title="Continuous Assignment"
      >
        <p>
          A <strong>continuous assignment</strong> continuously drives a
          signal with the result of an expression.
        </p>

        <CodeExample title="Continuous Assignment">
{`assign y = a & b;`}
        </CodeExample>

        <p>
          Whenever <strong>a</strong> or <strong>b</strong> changes,
          the value of <strong>y</strong> is automatically updated.
        </p>

        <CodeExample title="Another Example">
{`assign sum = a + b;`}
        </CodeExample>

        <p>
          Here, <strong>sum</strong> continuously represents the result of
          adding <strong>a</strong> and <strong>b</strong>.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            Continuous assignments are commonly written using the
             assign keyword.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="assign-statement"
        title="The assign Statement"
      >
        <p>
          The <strong>assign</strong> keyword is used to create a continuous
          assignment.
        </p>

        <CodeExample title="Syntax">
{`assign signal = expression;`}
        </CodeExample>

        <CodeExample title="Example">
{`wire y;

assign y = a | b;`}
        </CodeExample>

        <p>
          In this example, <strong>y</strong> continuously receives the
          result of the OR operation.
        </p>

        <LearningNote type="important" title="Basic Rule">
          <p>
            In traditional Verilog, continuous assignments are commonly used
            with wire signals.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="procedural-assignment"
        title="Procedural Assignment"
      >
        <p>
          A <strong>procedural assignment</strong> is made inside a procedural
          block such as an <strong>always</strong> block.
        </p>

        <CodeExample title="Procedural Assignment">
{`reg y;

always @(*) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          The assignment to <strong>y</strong> happens inside the
          <strong> always</strong> block.
        </p>

        <LearningNote type="info" title="Coming Up">
          <p>
            We will study always blocks in much more detail
            in the next lessons.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="blocking"
        title="Blocking Assignment"
      >
        <p>
          A <strong>blocking assignment</strong> uses the
          <strong> = </strong> operator.
        </p>

        <CodeExample title="Blocking Assignment">
{`always @(*) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          The next statement executes after the blocking assignment has
          completed.
        </p>

        <CodeExample title="Example">
{`always @(*) begin
    x = a;
    y = x;
end`}
        </CodeExample>

        <p>
          Here, <strong>x</strong> is assigned first and then
          <strong> y</strong> uses the updated value of <strong>x</strong>
          within the procedural flow.
        </p>

        <LearningNote type="tip" title="Common Use">
          <p>
            Blocking assignments are commonly used when describing
            combinational logic inside procedural blocks.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="nonblocking"
        title="Nonblocking Assignment"
      >
        <p>
          A <strong>nonblocking assignment</strong> uses the
          <strong> &lt;= </strong> operator.
        </p>

        <CodeExample title="Nonblocking Assignment">
{`always @(posedge clk) begin
    q <= d;
end`}
        </CodeExample>

        <p>
          Nonblocking assignments are especially important when describing
          sequential logic such as flip-flops and registers.
        </p>

        <LearningNote type="important" title="Remember">
          <p>
            = → Blocking assignment
          </p>

          <p>
            &lt;= → Nonblocking assignment
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="blocking-vs-nonblocking"
        title="Blocking vs Nonblocking"
      >
        <p>
          Understanding the difference between these two assignments is
          extremely important in RTL design.
        </p>

        <CodeExample title="Blocking">
{`always @(*) begin
    y = a;
end`}
        </CodeExample>

        <CodeExample title="Nonblocking">
{`always @(posedge clk) begin
    y <= a;
end`}
        </CodeExample>

        <ul>
          <li>
            <strong>=</strong> is a blocking assignment.
          </li>

          <li>
            <strong>&lt;=</strong> is a nonblocking assignment.
          </li>

          <li>
            Blocking assignments are commonly used for combinational logic.
          </li>

          <li>
            Nonblocking assignments are commonly used for sequential logic.
          </li>
        </ul>

        <LearningNote type="warning" title="Very Important">
          <p>
            Using the wrong assignment type can cause simulation behavior that
            does not match the intended hardware behavior.
          </p>

          <p>
            We will revisit this topic when we learn
            Always Blocks.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="combinational-example"
        title="Combinational Example"
      >
        <p>
          Let's describe a simple combinational circuit using a continuous
          assignment.
        </p>

        <CodeExample title="Combinational AND Gate">
{`module and_gate(
    input a,
    input b,
    output y
);

    assign y = a & b;

endmodule`}
        </CodeExample>

        <p>
          There is no clock in this circuit.
        </p>

        <p>
          The output changes whenever the inputs change.
        </p>

        <LearningNote type="info" title="Combinational Logic">
          <p>
            In combinational logic, the output depends on the current input
            values.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="sequential-example"
        title="Sequential Example"
      >
        <p>
          Now let's look at a simple sequential circuit.
        </p>

        <CodeExample title="D Flip-Flop">
{`module dff(
    input clk,
    input d,
    output reg q
);

    always @(posedge clk) begin
        q <= d;
    end

endmodule`}
        </CodeExample>

        <p>
          The value of <strong>d</strong> is transferred to
          <strong> q</strong> on the active clock edge.
        </p>

        <p>
          Notice that the code uses a <strong>nonblocking assignment</strong>.
        </p>

        <LearningNote type="tip" title="Hardware View">
          <p>
            This describes storage behavior. The circuit remembers a value
            based on the clock.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with a continuous assignment.
        </p>

        <p>
          Change the operator in the design and observe how the output
          changes.
        </p>

        <TryIt
          title="Experiment with Assignments"
          language="Verilog"
          mode="beginner"
          initialCode={`module assignment_demo(
  input  [3:0] a,
  input  [3:0] b,
  output [3:0] y
);

  assign y = a & b;

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  wire [3:0] y;

  assignment_demo dut (
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
            Which keyword is used for a continuous assignment?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>assign</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            Which symbol represents a blocking assignment?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>=</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Which symbol represents a nonblocking assignment?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>&lt;=</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            Which assignment type is commonly used for sequential logic?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            <strong>Nonblocking assignment (&lt;=)</strong> is commonly used
            for sequential logic.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What does the following statement do?
          </p>
        </LearningNote>

        <CodeExample>
{`assign y = a & b;`}
        </CodeExample>

        <details>
          <summary>Show Answer</summary>
          <p>
            It continuously assigns the result of
            <strong> a AND b</strong> to <strong>y</strong>.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            Assignments are used to give values to signals.
          </li>

          <li>
            <strong>assign</strong> is used for continuous assignments.
          </li>

          <li>
            Procedural assignments are made inside blocks such as
            <strong> always</strong>.
          </li>

          <li>
            <strong>=</strong> represents a blocking assignment.
          </li>

          <li>
            <strong>&lt;=</strong> represents a nonblocking assignment.
          </li>

          <li>
            Blocking assignments are commonly used for combinational logic.
          </li>

          <li>
            Nonblocking assignments are commonly used for sequential logic.
          </li>

          <li>
            Choosing the correct assignment type is important for accurate RTL
            modeling.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now understand how Verilog assigns values to signals.
          </p>

          <p>
            Next, we'll dive deeper into the
           always block and learn how Verilog describes
            combinational and sequential hardware.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Assignments;