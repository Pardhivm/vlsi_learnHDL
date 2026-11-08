import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Functions() {
  const sections = [
    { id: "what-are-functions", title: "What are Functions?" },
    { id: "basic-syntax", title: "Basic Syntax" },
    { id: "simple-function", title: "Simple Function" },
    { id: "function-arguments", title: "Function Arguments" },
    { id: "function-return", title: "Function Return Value" },
    { id: "multiple-arguments", title: "Multiple Arguments" },
    { id: "function-in-expression", title: "Function in an Expression" },
    { id: "combinational-logic", title: "Functions and Combinational Logic" },
    { id: "function-vs-task", title: "Function vs Task" },
    { id: "hardware-example", title: "Hardware Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Functions"
      sections={sections}
      previousLesson="Loops"
      previousPath="/verilog/loops"
      nextLesson="Tasks"
      nextPath="/verilog/tasks"
    >

      <LessonSection
        id="what-are-functions"
        title="What are Functions?"
      >
        <p>
          A <strong>function</strong> is a reusable block of Verilog code
          that performs an operation and returns a value.
        </p>

        <p>
          Functions are useful when the same calculation or piece of
          combinational logic needs to be used multiple times.
        </p>


        <LessonVisual
          type="diagram"
          src="/diagrams/fun.png"
          alt="Reusable hardware block concept"
          caption="A function can represent a reusable piece of logic that produces a result."
        />

        <LearningNote type="info" title="Think Like Hardware">
          <p>
            Think of a function as a small reusable hardware calculation.
          </p>

          <p>
            Instead of writing the same calculation repeatedly, you can
            define it once and use it wherever needed.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="basic-syntax"
        title="Basic Syntax"
      >
        <p>
          The basic syntax of a Verilog function is:
        </p>

        <CodeExample title="Function Syntax">
{`function [width-1:0] function_name;

    input ...;
    
    begin
        // statements
    end

endfunction`}
        </CodeExample>

        <p>
          A function can have inputs and produces a return value.
        </p>

        <LearningNote type="tip" title="Important">
          <p>
            A function normally represents an operation that completes
            without consuming simulation time.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="simple-function"
        title="Simple Function"
      >
        <p>
          Let's create a simple function that performs an addition.
        </p>

        <CodeExample title="Addition Function">
{`function [3:0] add_numbers;

    input [3:0] a;
    input [3:0] b;

    begin
        add_numbers = a + b;
    end

endfunction`}
        </CodeExample>

        <p>
          The function receives two 4-bit values and returns their sum.
        </p>

        <LearningNote type="info" title="Function Name">
          <p>
            Notice that the function name,
             add_numbers, is assigned the result.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="function-arguments"
        title="Function Arguments"
      >
        <p>
          Functions can receive values through input arguments.
        </p>

        <CodeExample title="Function with Inputs">
{`function [3:0] add_numbers;

    input [3:0] a;
    input [3:0] b;

    begin
        add_numbers = a + b;
    end

endfunction`}
        </CodeExample>

        <p>
          Here, <strong>a</strong> and <strong>b</strong> are the inputs to
          the function.
        </p>

        <CodeExample title="Calling the Function">
{`result = add_numbers(a, b);`}
        </CodeExample>

        <p>
          The values of <strong>a</strong> and <strong>b</strong> are passed
          into the function.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            Function arguments allow the same function to work with different
            input values.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="function-return"
        title="Function Return Value"
      >
        <p>
          A Verilog function returns its result through the function name.
        </p>

        <CodeExample title="Return Value">
{`function [3:0] double_value;

    input [3:0] a;

    begin
        double_value = a + a;
    end

endfunction`}
        </CodeExample>

        <p>
          The expression:
        </p>

        <CodeExample>
{`double_value = a + a;`}
        </CodeExample>

        <p>
          assigns the result to the function itself.
        </p>

        <LearningNote type="important" title="Key Idea">
          <p>
            The function name acts as the place where the return value is
            stored.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="multiple-arguments"
        title="Multiple Arguments"
      >
        <p>
          A function can accept multiple input arguments.
        </p>

        <CodeExample title="Maximum Function">
{`function [3:0] maximum;

    input [3:0] a;
    input [3:0] b;

    begin

        if (a > b)
            maximum = a;
        else
            maximum = b;

    end

endfunction`}
        </CodeExample>

        <p>
          This function compares two 4-bit values and returns the larger
          value.
        </p>

        <CodeExample title="Calling the Function">
{`result = maximum(a, b);`}
        </CodeExample>

        <LearningNote type="info" title="Reusable Logic">
          <p>
            Once defined, the same function can be called with different
            signals throughout your design.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="function-in-expression"
        title="Function in an Expression"
      >
        <p>
          A function can be used directly inside an expression.
        </p>

        <CodeExample title="Example">
{`assign result = add_numbers(a, b);`}
        </CodeExample>

        <p>
          The function calculates the value and the result is assigned to
          <strong> result</strong>.
        </p>

        <CodeExample title="Combining Functions">
{`assign result = add_numbers(a, b) ^ mask;`}
        </CodeExample>

        <p>
          The output of the function can be used together with other
          operators.
        </p>

        <LearningNote type="tip" title="Useful Pattern">
          <p>
            Functions can make complicated expressions easier to organize and
            reuse.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="combinational-logic"
        title="Functions and Combinational Logic"
      >
        <p>
          Functions are commonly useful for describing
          <strong> combinational calculations</strong>.
        </p>

        <CodeExample title="Parity Function">
{`function parity;

    input [3:0] data;

    begin
        parity = data[3] ^
                 data[2] ^
                 data[1] ^
                 data[0];
    end

endfunction`}
        </CodeExample>

        <p>
          This function calculates the XOR of all four bits.
        </p>

        <CodeExample title="Using the Function">
{`assign parity_out = parity(data);`}
        </CodeExample>

        <LearningNote type="info" title="Hardware Connection">
          <p>
            The function can represent a combinational calculation such as
            parity generation, arithmetic, comparison, or bit manipulation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="function-vs-task"
        title="Function vs Task"
      >
        <p>
          Functions and tasks are both reusable procedural blocks, but they
          have important differences.
        </p>

        <CodeExample title="Function">
{`function [3:0] add_numbers;

    input [3:0] a;
    input [3:0] b;

    begin
        add_numbers = a + b;
    end

endfunction`}
        </CodeExample>

        <CodeExample title="Task">
{`task display_values;

    input [3:0] a;
    input [3:0] b;

    begin
        $display("a=%d b=%d", a, b);
    end

endtask`}
        </CodeExample>

        <ul>
          <li>
            A function returns a value.
          </li>

          <li>
            A task does not have to return a value.
          </li>

          <li>
            Functions are commonly used for calculations.
          </li>

          <li>
            Tasks are useful for sequences of operations and testbench
            activities.
          </li>
        </ul>

        <LearningNote type="important" title="Coming Next">
          <p>
            We will study tasks in the next lesson.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="hardware-example"
        title="Hardware Example"
      >
        <p>
          Let's create a function that calculates the larger of two values.
        </p>

        <CodeExample title="4-bit Maximum Function">
{`module max_unit(
    input  [3:0] a,
    input  [3:0] b,
    output [3:0] y
);

    function [3:0] maximum;

        input [3:0] x;
        input [3:0] z;

        begin

            if (x > z)
                maximum = x;
            else
                maximum = z;

        end

    endfunction

    assign y = maximum(a, b);

endmodule`}
        </CodeExample>

        <p>
          The function compares <strong>a</strong> and <strong>b</strong> and
          sends the larger value to <strong>y</strong>.
        </p>

        <CodeExample title="Example">
{`a = 1010
b = 0110

y = 1010`}
        </CodeExample>

        <LearningNote type="tip" title="RTL Perspective">
          <p>
            Functions help us organize reusable logic while keeping the
            overall RTL description easier to read.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with a function that calculates the larger of two
          4-bit numbers.
        </p>

        <p>
          Try changing the function's comparison or operation and observe
          the result.
        </p>

        <TryIt
          title="Experiment with a Function"
          language="Verilog"
          mode="beginner"
          initialCode={`module max_unit(
  input  [3:0] a,
  input  [3:0] b,
  output [3:0] y
);

  function [3:0] maximum;

    input [3:0] x;
    input [3:0] z;

    begin

      if (x > z)
        maximum = x;
      else
        maximum = z;

    end

  endfunction

  assign y = maximum(a, b);

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  wire [3:0] y;

  max_unit dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor(
      "a=%b b=%b maximum=%b",
      a,
      b,
      y
    );

    a = 4'b1010;
    b = 4'b0110;

    #10 a = 4'b0011;
    b = 4'b1100;

    #10 a = 4'b1111;
    b = 4'b0101;

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
            What is the main purpose of a Verilog function?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A function provides a reusable block of code that performs an
            operation and returns a value.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            How does a function return its result in traditional Verilog?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The result is assigned to the <strong>function name</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Can a function have multiple input arguments?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Yes. A function can accept multiple input arguments.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What type of logic are functions commonly useful for describing?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Functions are commonly useful for
            <strong> combinational calculations</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What is one major difference between a function and a task?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A function returns a value, while a task does not have to return
            a value.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            Functions are reusable blocks of Verilog code.
          </li>

          <li>
            A function performs an operation and returns a value.
          </li>

          <li>
            Functions can receive multiple input arguments.
          </li>

          <li>
            The function name is used to hold the return value.
          </li>

          <li>
            Functions are commonly useful for combinational calculations.
          </li>

          <li>
            Functions can be used inside expressions.
          </li>

          <li>
            Functions help make RTL code more organized and reusable.
          </li>

          <li>
            Functions and tasks are different constructs with different
            purposes.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now know how to create reusable calculations using
             functions.
          </p>

          <p>
            Next, we'll learn about Tasks and how they are
            used for reusable sequences of operations.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Functions;