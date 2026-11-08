import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function IfElse() {
  const sections = [
    { id: "what-is-if-else", title: "What is If / Else?" },
    { id: "basic-if", title: "Basic if Statement" },
    { id: "if-else", title: "if / else" },
    { id: "else-if", title: "else if" },
    { id: "multiple-conditions", title: "Multiple Conditions" },
    { id: "comparison", title: "Comparing Signals" },
    { id: "mux-example", title: "Multiplexer Example" },
    { id: "comparator-example", title: "Comparator Example" },
    { id: "nested-if", title: "Nested if" },
    { id: "combinational", title: "If / Else in Combinational Logic" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog If / Else"
      sections={sections}
      previousLesson="Always Blocks"
      previousPath="/verilog/always-blocks"
      nextLesson="Case"
      nextPath="/verilog/case"
    >

      <LessonSection
        id="what-is-if-else"
        title="What is If / Else?"
      >
        <p>
          The <strong>if / else</strong> statement is used to make decisions
          in Verilog.
        </p>

        <p>
          It allows us to describe different hardware behavior depending on
          whether a condition is true or false.
        </p>

        <CodeExample title="Basic Idea">
{`if (condition)
    statement1;
else
    statement2;`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/ifelse.png"
          alt="Decision based digital logic"
          caption="A condition determines which behavior should be selected."
        />

        <LearningNote type="info" title="Think Like Hardware">
          <p>
            In hardware, an if / else statement can describe selection logic,
            control logic, comparators, multiplexers, and other circuits.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="basic-if"
        title="Basic if Statement"
      >
        <p>
          The simplest form contains only an <strong>if</strong> statement.
        </p>

        <CodeExample title="Syntax">
{`if (condition) begin
    // statements
end`}
        </CodeExample>

        <CodeExample title="Example">
{`always @(*) begin

    if (enable)
        y = a;

end`}
        </CodeExample>

        <p>
          When <strong>enable</strong> is true, the value of
          <strong> a</strong> is assigned to <strong>y</strong>.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            The code inside the <strong>if</strong> block executes when the
            condition is true.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="if-else"
        title="if / else"
      >
        <p>
          An <strong>else</strong> block provides an alternative when the
          condition is false.
        </p>

        <CodeExample title="Example">
{`always @(*) begin

    if (enable)
        y = a;
    else
        y = b;

end`}
        </CodeExample>

        <p>
          If <strong>enable = 1</strong>, the output becomes
          <strong> a</strong>.
        </p>

        <p>
          If <strong>enable = 0</strong>, the output becomes
          <strong> b</strong>.
        </p>

        <LearningNote type="info" title="Hardware Connection">
          <p>
            This behavior is similar to a <strong>2-to-1 multiplexer.</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="else-if"
        title="else if"
      >
        <p>
          We can check multiple conditions using
          <strong> else if</strong>.
        </p>

        <CodeExample title="Syntax">
{`if (condition1) begin
    // statement
end
else if (condition2) begin
    // statement
end
else begin
    // statement
end`}
        </CodeExample>

        <CodeExample title="Example">
{`always @(*) begin

    if (sel == 2'b00)
        y = a;
    else if (sel == 2'b01)
        y = b;
    else if (sel == 2'b10)
        y = c;
    else
        y = d;

end`}
        </CodeExample>

        <p>
          Here, the value of <strong>sel</strong> determines which input is
          selected.
        </p>

        <LearningNote type="tip" title="Hardware View">
          <p>
            Multiple conditions can describe larger selection and control
            circuits.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="multiple-conditions"
        title="Multiple Conditions"
      >
        <p>
          Conditions can be combined using logical operators.
        </p>

        <CodeExample title="Logical AND">
{`always @(*) begin

    if (enable && valid)
        y = data;

end`}
        </CodeExample>

        <p>
          The statement executes when both <strong>enable</strong> and
          <strong>valid</strong> are true.
        </p>

        <CodeExample title="Logical OR">
{`always @(*) begin

    if (start || enable)
        y = 1'b1;
    else
        y = 1'b0;

end`}
        </CodeExample>

        <p>
          Here, the output becomes 1 when either condition is true.
        </p>

        <LearningNote type="important" title="Remember">
          <p>
            <strong>&amp;&amp;</strong> means logical AND.
          </p>

          <p>
            <strong>||</strong> means logical OR.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="comparison"
        title="Comparing Signals"
      >
        <p>
          If statements are frequently used with comparison operators.
        </p>

        <CodeExample title="Greater Than">
{`always @(*) begin

    if (a > b)
        y = 1'b1;
    else
        y = 1'b0;

end`}
        </CodeExample>

        <p>
          The output becomes 1 when <strong>a</strong> is greater than
          <strong> b</strong>.
        </p>

        <CodeExample title="Equality">
{`always @(*) begin

    if (a == b)
        equal = 1'b1;
    else
        equal = 1'b0;

end`}
        </CodeExample>

        <p>
          This describes equality checking between two signals.
        </p>

        <LearningNote type="info" title="Hardware Connection">
          <p>
            Comparison logic is commonly used in processors, ALUs, counters,
            control units, and digital systems.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="mux-example"
        title="Multiplexer Example"
      >
        <p>
          Let's use if / else to describe a 2-to-1 multiplexer.
        </p>
        <LessonVisual
          type="diagram"
          src="/diagrams/two1mux.png"
          alt="2-to-1 multiplexer"
        />
        <CodeExample title="2-to-1 Multiplexer">
{`module mux2to1(
    input a,
    input b,
    input sel,
    output reg y
);

    always @(*) begin

        if (sel)
            y = b;
        else
            y = a;

    end

endmodule`}
        </CodeExample>

        <CodeExample title="Selection">
{`sel = 0  →  y = a
sel = 1  →  y = b`}
        </CodeExample>

        <LearningNote type="tip" title="Important RTL Idea">
          <p>
            An if / else statement can describe a multiplexer because the
            condition selects between different signal values.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="comparator-example"
        title="Comparator Example"
      >
        <p>
          Let's create a simple 4-bit comparator.
        </p>
 
        <LessonVisual
          type="diagram"
          src="/diagrams/4bc.png"
          alt="4-bit comparator"
        />
        <CodeExample title="4-bit Comparator">
{`module comparator(
    input  [3:0] a,
    input  [3:0] b,
    output reg       greater,
    output reg       equal,
    output reg       less
);

    always @(*) begin

        if (a > b) begin
            greater = 1'b1;
            equal   = 1'b0;
            less    = 1'b0;
        end
        else if (a == b) begin
            greater = 1'b0;
            equal   = 1'b1;
            less    = 1'b0;
        end
        else begin
            greater = 1'b0;
            equal   = 1'b0;
            less    = 1'b1;
        end

    end

endmodule`}
        </CodeExample>

        <p>
          The circuit determines whether <strong>a</strong> is greater than,
          equal to, or less than <strong>b</strong>.
        </p>

        <LearningNote type="info" title="Where is This Used?">
          <p>
            Comparators are useful in processors, control circuits, address
            checking, counters, and digital control systems.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="nested-if"
        title="Nested if"
      >
        <p>
          An <strong>if</strong> statement can be placed inside another
          <strong> if</strong> statement.
        </p>

        <CodeExample title="Nested if Example">
{`always @(*) begin

    if (enable) begin

        if (valid)
            y = data;
        else
            y = 4'b0000;

    end
    else begin
        y = 4'b0000;
    end

end`}
        </CodeExample>

        <p>
          Here, <strong>valid</strong> is checked only when
          <strong> enable</strong> is true.
        </p>

        <LearningNote type="warning" title="Use Carefully">
          <p>
            Deeply nested if statements can make RTL difficult to understand.
          </p>

          <p>
            For multiple mutually exclusive choices, a
          case statement can sometimes be clearer.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="combinational"
        title="If / Else in Combinational Logic"
      >
        <p>
          If / else is frequently used inside an
          <strong> always @(*)</strong> block to describe combinational
          logic.
        </p>

        <CodeExample title="Combinational Example">
{`always @(*) begin

    if (sel)
        y = a | b;
    else
        y = a ^ b;

end`}
        </CodeExample>

        <p>
          This example selects between two different logic operations.
        </p>

        <ul>
          <li>
            When <strong>sel = 0</strong>, the output is
            <strong> a XOR b</strong>.
          </li>

          <li>
            When <strong>sel = 1</strong>, the output is
            <strong> a OR b</strong>.
          </li>
        </ul>

        <LearningNote type="important" title="Avoiding Latches">
          <p>
            When describing combinational logic, make sure every possible
            condition assigns a value to the output.
          </p>

          <p>
            Otherwise, unintended storage behavior can be inferred.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's build a small logic selector using
          <strong> if / else</strong>.
        </p>

        <p>
          Try changing the operators and observe the output.
        </p>

        <TryIt
          title="Experiment with If / Else"
          language="Verilog"
          mode="beginner"
          initialCode={`module logic_selector(
  input  [3:0] a,
  input  [3:0] b,
  input        sel,
  output reg [3:0] y
);

  always @(*) begin

    if (sel)
      y = a | b;
    else
      y = a ^ b;

  end

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  reg sel;
  wire [3:0] y;

  logic_selector dut (
    .a(a),
    .b(b),
    .sel(sel),
    .y(y)
  );

  initial begin

    $monitor(
      "sel=%b a=%b b=%b y=%b",
      sel,
      a,
      b,
      y
    );

    a = 4'b1010;
    b = 4'b1100;

    sel = 0;

    #10 sel = 1;

    #10 a = 4'b1111;
    b = 4'b0011;

    #10 sel = 0;

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
            What is the purpose of an if statement in Verilog?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It is used to make decisions based on a condition.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            What happens when an if condition is false and an else block
            exists?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The statements inside the <strong>else</strong> block execute.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What hardware can an if / else statement commonly describe?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It can describe selection logic such as a
            <strong> multiplexer</strong>, as well as comparison and control
            logic.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does <strong>posedge</strong> mean?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            <strong>posedge</strong> means a rising edge from 0 to 1.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            Why should combinational if / else logic assign an output in all
            possible conditions?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            To avoid unintended storage behavior, such as an inferred latch.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            <strong>if</strong> is used to make decisions based on conditions.
          </li>

          <li>
            <strong>else</strong> provides an alternative when the condition
            is false.
          </li>

          <li>
            <strong>else if</strong> allows multiple conditions to be checked.
          </li>

          <li>
            Conditions can use comparison and logical operators.
          </li>

          <li>
            If / else can describe multiplexers and comparison logic.
          </li>

          <li>
            Nested if statements allow decisions inside other decisions.
          </li>

          <li>
            If / else is commonly used inside
            <strong> always @(*)</strong> for combinational logic.
          </li>

          <li>
            Combinational outputs should be assigned for all possible
            conditions to avoid unintended latches.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now know how to make decisions using
            <strong> if / else.</strong>
          </p>

          <p>
            Next, we'll learn another powerful decision-making construct:
            the <strong>case statement.</strong>
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default IfElse;