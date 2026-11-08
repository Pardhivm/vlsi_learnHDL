import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Operators() {
  const sections = [
    { id: "what-are-operators", title: "What are Operators?" },
    { id: "arithmetic", title: "Arithmetic Operators" },
    { id: "relational", title: "Relational Operators" },
    { id: "equality", title: "Equality Operators" },
    { id: "logical", title: "Logical Operators" },
    { id: "bitwise", title: "Bitwise Operators" },
    { id: "reduction", title: "Reduction Operators" },
    { id: "shift", title: "Shift Operators" },
    { id: "conditional", title: "Conditional Operator" },
    { id: "precedence", title: "Operator Precedence" },
    { id: "hardware-example", title: "Hardware Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Operators"
      sections={sections}
      previousLesson="Data Types"
      previousPath="/verilog/data-types"
      nextLesson="Assignments"
      nextPath="/verilog/assignments"
    >

      <LessonSection
        id="what-are-operators"
        title="What are Operators?"
      >
        <p>
          <strong>Operators</strong> are symbols used to perform operations
          on signals and values.
        </p>

        <p>
          In Verilog, operators allow us to describe things such as
          arithmetic, comparisons, logic gates, and bit manipulation.
        </p>

        <CodeExample title="Simple Example">
{`assign y = a & b;`}
        </CodeExample>

        <p>
          Here, <strong>&</strong> is the bitwise AND operator.
        </p>


        <LearningNote type="info" title="Think Like Hardware">
          <p>
            Operators are not just mathematical symbols. In RTL design,
            they can describe actual hardware behavior.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="arithmetic"
        title="Arithmetic Operators"
      >
        <p>
          Arithmetic operators perform mathematical operations.
        </p>

        <CodeExample title="Arithmetic Operators">
{`+    Addition
-    Subtraction
*    Multiplication
/    Division
%    Modulus`}
        </CodeExample>

        <CodeExample title="Example">
{`module arithmetic;

    reg [7:0] a;
    reg [7:0] b;
    reg [7:0] sum;

    assign sum = a + b;

endmodule`}
        </CodeExample>

        <p>
          In this example, the <strong>+</strong> operator adds
          <strong> a</strong> and <strong>b</strong>.
        </p>

        <LearningNote type="tip" title="Hardware Connection">
          <p>
            An arithmetic expression such as <strong>a + b</strong> can
            represent addition hardware such as an adder.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="relational"
        title="Relational Operators"
      >
        <p>
          Relational operators compare two values.
        </p>

        <CodeExample title="Relational Operators">
{`<     Less than
>     Greater than
<=    Less than or equal to
>=    Greater than or equal to`}
        </CodeExample>

        <CodeExample title="Example">
{`assign y = (a > b);`}
        </CodeExample>

        <p>
          The expression checks whether <strong>a</strong> is greater than
          <strong> b</strong>.
        </p>

        <LearningNote type="info" title="Result">
          <p>
            A comparison produces a logical result that can be used by other
            parts of your RTL design.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="equality"
        title="Equality Operators"
      >
        <p>
          Equality operators are used to check whether values are equal or
          different.
        </p>

        <CodeExample title="Equality Operators">
{`==     Equal
!=     Not equal
===    Case equality
!==    Case inequality`}
        </CodeExample>

        <CodeExample title="Example">
{`assign y = (a == b);`}
        </CodeExample>

        <p>
          If <strong>a</strong> and <strong>b</strong> are equal, the result
          is true.
        </p>

        <LearningNote type="warning" title="Important">
          <p>
            == and === are not the same.
          </p>

          <p>
            The case equality operator === also considers
             X and Z values during
            comparison.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="logical"
        title="Logical Operators"
      >
        <p>
          Logical operators combine or invert logical conditions.
        </p>

        <CodeExample title="Logical Operators">
{`&&    Logical AND
||    Logical OR
!     Logical NOT`}
        </CodeExample>

        <CodeExample title="Example">
{`assign y = (a && b);`}
        </CodeExample>

        <p>
          The logical AND operator checks whether both expressions are
          logically true.
        </p>

        <LearningNote type="info" title="Logical vs Bitwise">
          <p>
            Do not confuse && with &.
          </p>

          <p>
            && is logical AND, while & is bitwise AND.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="bitwise"
        title="Bitwise Operators"
      >
        <p>
          Bitwise operators operate on individual bits.
        </p>

        <CodeExample title="Bitwise Operators">
{`&     AND
|     OR
^     XOR
~     NOT`}
        </CodeExample>

        <CodeExample title="Bitwise AND Example">
{`a = 4'b1010;
b = 4'b1100;

y = a & b;`}
        </CodeExample>

        <CodeExample title="Result">
{`  1010
& 1100
------
  1000`}
        </CodeExample>

        <p>
          Each bit of <strong>a</strong> is ANDed with the corresponding bit
          of <strong>b</strong>.
        </p>

        <LearningNote type="tip" title="Very Important">
          <p>
            Bitwise operators are extremely important in RTL design because
            hardware signals are made of individual bits.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="reduction"
        title="Reduction Operators"
      >
        <p>
          Reduction operators take all the bits of a vector and reduce them
          to a single bit.
        </p>

        <CodeExample title="Reduction Operators">
{`&    Reduction AND
|    Reduction OR
^    Reduction XOR`}
        </CodeExample>

        <CodeExample title="Reduction AND Example">
{`reg [3:0] a;

assign y = &a;`}
        </CodeExample>

        <p>
          If <strong>a = 1111</strong>, the reduction AND produces
          <strong> 1</strong>.
        </p>

        <CodeExample title="How Reduction AND Works">
{`a = 4'b1111

& a

= 1 & 1 & 1 & 1

= 1`}
        </CodeExample>

        <LearningNote type="info" title="Remember">
          <p>
            Bitwise AND works bit-by-bit, while reduction
            AND combines all bits into one result.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="shift"
        title="Shift Operators"
      >
        <p>
          Shift operators move bits to the left or right.
        </p>

        <CodeExample title="Shift Operators">
{`<<    Left shift
>>    Right shift`}
        </CodeExample>

        <CodeExample title="Left Shift Example">
{`a = 4'b0011;

y = a << 1;`}
        </CodeExample>

        <CodeExample title="Result">
{`0011 << 1

0110`}
        </CodeExample>

        <p>
          The bits are shifted one position to the left.
        </p>

        <CodeExample title="Right Shift Example">
{`a = 4'b1100;

y = a >> 1;`}
        </CodeExample>

        <CodeExample title="Result">
{`1100 >> 1

0110`}
        </CodeExample>

        <LearningNote type="tip" title="Hardware Connection">
          <p>
            Shift operations are commonly useful when working with buses,
            registers, counters, and datapaths.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="conditional"
        title="Conditional Operator"
      >
        <p>
          The <strong>conditional operator</strong> is written as
          <strong> ?: </strong>.
        </p>

        <p>
          It is often used to choose between two values.
        </p>

        <CodeExample title="Syntax">
{`condition ? value_if_true : value_if_false`}
        </CodeExample>

        <CodeExample title="Example">
{`assign y = sel ? a : b;`}
        </CodeExample>

        <p>
          If <strong>sel</strong> is true, <strong>a</strong> is selected.
          Otherwise, <strong>b</strong> is selected.
        </p>


        <LearningNote type="info" title="Think of a MUX">
          <p>
            A conditional expression such as
            <strong> sel ? a : b</strong> can be used to describe the behavior
            of a multiplexer (MUX).
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="precedence"
        title="Operator Precedence"
      >
        <p>
          When an expression contains multiple operators, Verilog follows
          rules that determine which operation is performed first.
        </p>

        <CodeExample title="Example">
{`assign y = a + b * c;`}
        </CodeExample>

        <p>
          Multiplication has higher precedence than addition, so the
          multiplication is evaluated first.
        </p>

        <CodeExample title="Use Parentheses">
{`assign y = (a + b) * c;`}
        </CodeExample>

        <p>
          Parentheses make the intended order clear.
        </p>

        <LearningNote type="tip" title="Good Practice">
          <p>
            When an expression could be confusing, use
            parentheses to make your intention obvious.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="hardware-example"
        title="Hardware Example"
      >
        <p>
          Let's combine several operators to describe a simple ALU-style
          operation.
        </p>

        <CodeExample title="Simple ALU Example">
{`module simple_alu(
    input  [3:0] a,
    input  [3:0] b,
    input        sel,
    output [3:0] y
);

    assign y = sel ? (a + b) : (a & b);

endmodule`}
        </CodeExample>

        <p>
          Here, different operators describe different hardware behavior.
        </p>

        <ul>
          <li><strong>+</strong> performs addition.</li>
          <li><strong>&</strong> performs bitwise AND.</li>
          <li><strong>?:</strong> selects which result appears at the output.</li>
        </ul>

        <LearningNote type="important" title="RTL Perspective">
          <p>
            This is one of the key ideas of RTL design:
            <strong> Verilog expressions can describe hardware behavior.</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with Verilog operators.
        </p>

        <p>
          Try changing the operator in the design and observe how the output
          changes.
        </p>

        <TryIt
          title="Experiment with Operators"
          language="Verilog"
          mode="beginner"
          initialCode={`module operator_demo(
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

  operator_demo dut (
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
            Which operator performs bitwise AND?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>&amp;</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            Which operator performs logical AND?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The answer is <strong>&amp;&amp;</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What is the result of the following operation?
          </p>
        </LearningNote>

        <CodeExample>
{`4'b1010 & 4'b1100`}
        </CodeExample>

        <details>
          <summary>Show Answer</summary>
          <p>
            The result is <strong>4'b1000</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does the conditional expression below do?
          </p>
        </LearningNote>

        <CodeExample>
{`sel ? a : b`}
        </CodeExample>

        <details>
          <summary>Show Answer</summary>
          <p>
            It selects <strong>a</strong> when <strong>sel</strong> is true
            and <strong>b</strong> otherwise.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What is the difference between a bitwise AND and a logical AND?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            <strong>&amp;</strong> operates on bits, while
            <strong>&amp;&amp;</strong> performs a logical operation on
            expressions.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            Operators perform operations on signals and values.
          </li>

          <li>
            Arithmetic operators include <strong>+, -, *, /, %</strong>.
          </li>

          <li>
            Relational operators compare values.
          </li>

          <li>
            Equality operators check whether values are equal or different.
          </li>

          <li>
            Logical operators include <strong>&amp;&amp;, ||, !</strong>.
          </li>

          <li>
            Bitwise operators include <strong>&amp;, |, ^, ~</strong>.
          </li>

          <li>
            Reduction operators reduce a vector to a single bit.
          </li>

          <li>
            Shift operators move bits left or right.
          </li>

          <li>
            The conditional operator <strong>?:</strong> can select between
            two values.
          </li>

          <li>
            Operators are fundamental for describing RTL hardware behavior.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now know how to create signals and perform operations on
            them.
          </p>

          <p>
            Next, we'll learn how to actually
             assign values to signals.
          </p>

          <p>
            The next lesson is Assignments.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Operators;