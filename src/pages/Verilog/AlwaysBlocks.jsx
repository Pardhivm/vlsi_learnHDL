import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function AlwaysBlocks() {
  const sections = [
    { id: "what-is-always", title: "What is an Always Block?" },
    { id: "syntax", title: "Basic Syntax" },
    { id: "sensitivity-list", title: "Sensitivity List" },
    { id: "combinational", title: "Combinational Logic" },
    { id: "blocking-assignment", title: "Blocking Assignment" },
    { id: "sequential", title: "Sequential Logic" },
    { id: "nonblocking-assignment", title: "Nonblocking Assignment" },
    { id: "posedge", title: "posedge" },
    { id: "negedge", title: "negedge" },
    { id: "combinational-example", title: "Combinational Example" },
    { id: "sequential-example", title: "Sequential Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Always Blocks"
      sections={sections}
      previousLesson="Assignments"
      previousPath="/verilog/assignments"
      nextLesson="If / Else"
      nextPath="/verilog/if-else"
    >

      <LessonSection
        id="what-is-always"
        title="What is an Always Block?"
      >
        <p>
          An <strong>always block</strong> is a procedural block in Verilog
          that repeatedly executes when a specified event occurs.
        </p>

        <p>
          Always blocks are commonly used to describe
          <strong> combinational logic</strong> and
          <strong> sequential logic</strong>.
        </p>

        <CodeExample title="Simple Always Block">
{`always @(*) begin
    y = a & b;
end`}
        </CodeExample>


        <LearningNote type="info" title="Think Like Hardware">
          <p>
            An always block is not a software loop that runs forever on a
            processor.
          </p>

          <p>
            Instead, it describes how hardware should respond to changes in
            signals or clock events.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="syntax"
        title="Basic Syntax"
      >
        <p>
          The basic structure of an always block is:
        </p>

        <CodeExample title="Syntax">
{`always @(sensitivity_list) begin

    // statements

end`}
        </CodeExample>

        <p>
          The <strong>sensitivity list</strong> determines when the always
          block should execute.
        </p>

        <CodeExample title="Example">
{`always @(a or b) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          This block executes when <strong>a</strong> or
          <strong> b</strong> changes.
        </p>

        <LearningNote type="tip" title="Modern Style">
          <p>
            You will often see <strong>@(*)</strong> used for combinational
            logic because it automatically includes signals used by the block.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="sensitivity-list"
        title="Sensitivity List"
      >
        <p>
          A <strong>sensitivity list</strong> tells the simulator which signal
          changes should cause the always block to execute.
        </p>

        <CodeExample title="Example">
{`always @(a or b) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          The block executes whenever <strong>a</strong> or
          <strong> b</strong> changes.
        </p>

        <p>
          For combinational logic, a commonly used form is:
        </p>

        <CodeExample title="Automatic Sensitivity">
{`always @(*) begin
    y = a & b;
end`}
        </CodeExample>

        <LearningNote type="important" title="Remember">
          <p>
            <strong>@(*)</strong> means the block is sensitive to the signals
            used inside the block.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="combinational"
        title="Combinational Logic"
      >
        <p>
          Combinational logic produces outputs based on the current input
          values.
        </p>

        <CodeExample title="Combinational Always Block">
{`always @(*) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          There is no clock controlling this logic.
        </p>

        <p>
          When the inputs change, the output is recalculated.
        </p>


        <LearningNote type="info" title="Common Examples">
          <p>
            Combinational logic includes gates, multiplexers, decoders,
            encoders, comparators, and much of an ALU's logic.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="blocking-assignment"
        title="Blocking Assignment"
      >
        <p>
          Blocking assignments use the <strong>=</strong> operator.
        </p>

        <CodeExample title="Blocking Assignment">
{`always @(*) begin
    y = a & b;
end`}
        </CodeExample>

        <p>
          The assignment is executed in procedural order.
        </p>

        <CodeExample title="Example">
{`always @(*) begin
    x = a;
    y = x;
end`}
        </CodeExample>

        <p>
          Here, <strong>x</strong> is assigned before <strong>y</strong> uses
          it.
        </p>

        <LearningNote type="tip" title="Beginner Rule">
          <p>
            Blocking assignments are commonly used when describing
             combinational logic.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="sequential"
        title="Sequential Logic"
      >
        <p>
          <strong>Sequential logic</strong> depends on previous values and
          usually uses a clock.
        </p>

        <CodeExample title="Sequential Always Block">
{`always @(posedge clk) begin
    q <= d;
end`}
        </CodeExample>

        <p>
          This block executes when the clock changes from
          <strong> 0 to 1</strong>.
        </p>

        <p>
          The output <strong>q</strong> receives the value of
          <strong> d</strong>.
        </p>

        <LearningNote type="info" title="Hardware View">
          <p>
            This type of code can describe storage elements such as
            flip-flops.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="nonblocking-assignment"
        title="Nonblocking Assignment"
      >
        <p>
          Nonblocking assignments use the <strong>&lt;=</strong> operator.
        </p>

        <CodeExample title="Nonblocking Assignment">
{`always @(posedge clk) begin
    q <= d;
end`}
        </CodeExample>

        <p>
          Nonblocking assignments are commonly used for sequential logic.
        </p>

        <LearningNote type="important" title="Remember">
          <p>
            = → Blocking assignment
          </p>

          <p>
            &lt;= → Nonblocking assignment
          </p>

          <p>
            For clocked sequential logic, use
            nonblocking assignments.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="posedge"
        title="posedge"
      >
        <p>
          <strong>posedge</strong> means a positive or rising edge of a
          signal.
        </p>

        <p>
          For a clock, this means the transition:
        </p>

        <CodeExample title="Rising Edge">
{`0 → 1`}
        </CodeExample>

        <CodeExample title="Example">
{`always @(posedge clk) begin
    q <= d;
end`}
        </CodeExample>

        <p>
          The block executes when <strong>clk</strong> changes from
          <strong> 0</strong> to <strong>1</strong>.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            <strong>posedge = rising edge</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="negedge"
        title="negedge"
      >
        <p>
          <strong>negedge</strong> means a negative or falling edge of a
          signal.
        </p>

        <p>
          For a clock, this means the transition:
        </p>

        <CodeExample title="Falling Edge">
{`1 → 0`}
        </CodeExample>

        <CodeExample title="Example">
{`always @(negedge clk) begin
    q <= d;
end`}
        </CodeExample>

        <p>
          The block executes when <strong>clk</strong> changes from
          <strong> 1</strong> to <strong>0</strong>.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            <strong>negedge = falling edge</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="combinational-example"
        title="Combinational Example"
      >
        <p>
          Let's build a simple OR gate using an always block.
        </p>

        <CodeExample title="OR Gate">
{`module or_gate(
    input a,
    input b,
    output reg y
);

    always @(*) begin
        y = a | b;
    end

endmodule`}
        </CodeExample>

        <p>
          Because this is combinational logic, the output depends only on the
          current input values.
        </p>

        <LearningNote type="info" title="Important">
          <p>
            The reg keyword is used here because
             y is assigned inside an always block.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="sequential-example"
        title="Sequential Example"
      >
        <p>
          Now let's create a simple D flip-flop.
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
          The flip-flop captures <strong>d</strong> on the rising edge of
          <strong> clk</strong>.
        </p>

        <CodeExample title="Clock Behavior">
{`clk:  __/‾‾\\__/‾‾\\__/‾‾\\__

           ↑       ↑
        posedge  posedge`}
        </CodeExample>

        <LearningNote type="important" title="Key Idea">
          <p>
            The clock controls when the sequential logic
            updates.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with an always block.
        </p>

        <p>
          Try changing the operator inside the always block and observe the
          simulation output.
        </p>

        <TryIt
          title="Experiment with an Always Block"
          language="Verilog"
          mode="beginner"
          initialCode={`module logic_demo(
  input a,
  input b,
  output reg y
);

  always @(*) begin
    y = a & b;
  end

endmodule`}
          testbenchCode={`module tb;

  reg a;
  reg b;
  wire y;

  logic_demo dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor("a=%b b=%b y=%b", a, b, y);

    a = 0;
    b = 0;

    #10 a = 0;
    b = 1;

    #10 a = 1;
    b = 0;

    #10 a = 1;
    b = 1;

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
            What keyword is used to create an always block?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The keyword is <strong>always</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            What does <strong>posedge</strong> mean?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It means the <strong>rising edge</strong>, or a transition from
            0 to 1.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What does <strong>negedge</strong> mean?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It means the <strong>falling edge</strong>, or a transition from
            1 to 0.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            Which assignment is commonly used for sequential logic?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>nonblocking assignment (&lt;=)</strong> is commonly
            used for sequential logic.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What does <strong>@(*)</strong> commonly represent?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It makes the always block sensitive to signals used inside the
            block and is commonly used for combinational logic.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            An <strong>always block</strong> describes procedural hardware
            behavior.
          </li>

          <li>
            <strong>@(*)</strong> is commonly used for combinational logic.
          </li>

          <li>
            Combinational logic depends on current input values.
          </li>

          <li>
            Sequential logic commonly depends on a clock.
          </li>

          <li>
            <strong>posedge</strong> means rising edge.
          </li>

          <li>
            <strong>negedge</strong> means falling edge.
          </li>

          <li>
            Blocking assignment uses <strong>=</strong>.
          </li>

          <li>
            Nonblocking assignment uses <strong>&lt;=</strong>.
          </li>

          <li>
            Nonblocking assignments are commonly used for clocked sequential
            logic.
          </li>

          <li>
            Always blocks are fundamental to RTL design.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now understand how always blocks can describe both
            combinational and sequential hardware.
          </p>

          <p>
            Next, we'll learn how to make decisions in Verilog using
            <strong> If / Else.</strong>
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default AlwaysBlocks;