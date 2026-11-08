import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Tasks() {
  const sections = [
    { id: "what-are-tasks", title: "What are Tasks?" },
    { id: "basic-syntax", title: "Basic Syntax" },
    { id: "task-with-inputs", title: "Task with Inputs" },
    { id: "task-with-outputs", title: "Task with Outputs" },
    { id: "multiple-arguments", title: "Multiple Arguments" },
    { id: "calling-task", title: "Calling a Task" },
    { id: "task-with-delay", title: "Tasks with Delay" },
    { id: "task-vs-function", title: "Task vs Function" },
    { id: "testbench-example", title: "Testbench Example" },
    { id: "hardware-example", title: "Hardware Example" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Tasks"
      sections={sections}
      previousLesson="Functions"
      previousPath="/verilog/functions"
      nextLesson="FSM"
      nextPath="/verilog/fsm"
    >

      <LessonSection
        id="what-are-tasks"
        title="What are Tasks?"
      >
        <p>
          A <strong>task</strong> is a reusable block of Verilog code that
          can perform a sequence of operations.
        </p>

        <p>
          Tasks are especially useful when several statements need to be
          grouped together and reused.
        </p>

        <CodeExample title="Basic Idea">
{`task task_name;

    // statements

endtask`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/task.png"
          alt="Reusable digital logic block"
          caption="A task groups related operations into a reusable block."
        />

        <LearningNote type="info" title="Think of a Task Like a Procedure">
          <p>
            You can think of a task as a named procedure that performs a
            group of operations whenever you call it.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="basic-syntax"
        title="Basic Syntax"
      >
        <p>
          The basic syntax of a Verilog task is:
        </p>

        <CodeExample title="Task Syntax">
{`task task_name;

    input ...;
    output ...;

    begin
        // statements
    end

endtask`}
        </CodeExample>

        <p>
          A task can have inputs, outputs, and internal statements.
        </p>

        <LearningNote type="tip" title="Remember">
          <p>
            A task starts with task and ends with
             endtask.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="task-with-inputs"
        title="Task with Inputs"
      >
        <p>
          A task can receive input values.
        </p>

        <CodeExample title="Task with Input">
{`task display_number;

    input [3:0] value;

    begin
        $display("Value = %b", value);
    end

endtask`}
        </CodeExample>

        <p>
          The task receives a 4-bit value and displays it.
        </p>

        <CodeExample title="Calling the Task">
{`display_number(4'b1010);`}
        </CodeExample>

        <p>
          The value <strong>1010</strong> is passed into the task.
        </p>
      </LessonSection>

      <LessonSection
        id="task-with-outputs"
        title="Task with Outputs"
      >
        <p>
          Tasks can also produce output values.
        </p>

        <CodeExample title="Addition Task">
{`task add_numbers;

    input  [3:0] a;
    input  [3:0] b;
    output [3:0] result;

    begin
        result = a + b;
    end

endtask`}
        </CodeExample>

        <p>
          The task receives two values and places the result into
          <strong> result</strong>.
        </p>

        <CodeExample title="Calling the Task">
{`add_numbers(a, b, sum);`}
        </CodeExample>

        <LearningNote type="important" title="Function vs Task">
          <p>
            Unlike a function, a task can have multiple output arguments.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="multiple-arguments"
        title="Multiple Arguments"
      >
        <p>
          Tasks can have several input and output arguments.
        </p>

        <CodeExample title="Comparator Task">
{`task compare_values;

    input  [3:0] a;
    input  [3:0] b;

    output greater;
    output equal;
    output less;

    begin

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

endtask`}
        </CodeExample>

        <p>
          This task produces three outputs:
        </p>

        <ul>
          <li><strong>greater</strong></li>
          <li><strong>equal</strong></li>
          <li><strong>less</strong></li>
        </ul>

        <LearningNote type="info" title="Reusable Operation">
          <p>
            A task can group several related results into one reusable
            operation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="calling-task"
        title="Calling a Task"
      >
        <p>
          A task is executed by writing its name followed by its arguments.
        </p>

        <CodeExample title="Task Call">
{`compare_values(
    a,
    b,
    greater,
    equal,
    less
);`}
        </CodeExample>

        <p>
          The task executes its statements and updates its output arguments.
        </p>

        <LearningNote type="tip" title="Think About Reuse">
          <p>
            Once a task is defined, it can be called multiple times with
            different values.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="task-with-delay"
        title="Tasks with Delay"
      >
        <p>
          One important difference between functions and tasks is that tasks
          can contain timing controls.
        </p>

        <CodeExample title="Task with Delay">
{`task send_data;

    input [7:0] data;

    begin
        #10;
        $display("Data = %h", data);
    end

endtask`}
        </CodeExample>

        <p>
          The task waits for 10 simulation time units before displaying the
          value.
        </p>

        <LearningNote type="important" title="Simulation">
          <p>
            Timing controls make tasks particularly useful in
            testbenches and verification.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="task-vs-function"
        title="Task vs Function"
      >
        <p>
          Functions and tasks are both reusable constructs, but they are not
          interchangeable.
        </p>

        <CodeExample title="Function">
{`function [3:0] add;

    input [3:0] a;
    input [3:0] b;

    begin
        add = a + b;
    end

endfunction`}
        </CodeExample>

        <CodeExample title="Task">
{`task add_task;

    input  [3:0] a;
    input  [3:0] b;
    output [3:0] result;

    begin
        result = a + b;
    end

endtask`}
        </CodeExample>

        <ul>
          <li>
            A function returns a value through its function name.
          </li>

          <li>
            A task can have input, output, and inout arguments.
          </li>

          <li>
            Tasks can contain timing controls.
          </li>

          <li>
            Functions are commonly used for calculations.
          </li>

          <li>
            Tasks are especially useful for sequences of operations and
            testbench activities.
          </li>
        </ul>

        <LearningNote type="warning" title="Important">
          <p>
            Tasks are often associated with verification and testbenches,
            while functions are commonly used for reusable calculations.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="testbench-example"
        title="Testbench Example"
      >
        <p>
          Tasks are very useful when writing testbenches because they can
          package repeated stimulus into reusable procedures.
        </p>

        <CodeExample title="Testbench Task">
{`task apply_inputs;

    input [3:0] a_value;
    input [3:0] b_value;

    begin

        a = a_value;
        b = b_value;

        #10;

    end

endtask`}
        </CodeExample>

        <p>
          The task applies two input values and waits for 10 simulation time
          units.
        </p>

        <CodeExample title="Using the Task">
{`initial begin

    apply_inputs(4'b1010, 4'b0011);
    apply_inputs(4'b1111, 4'b0101);
    apply_inputs(4'b0110, 4'b0010);

end`}
        </CodeExample>

        <LearningNote type="info" title="Verification Connection">
          <p>
            This makes testbenches shorter and easier to maintain when the
            same stimulus pattern needs to be repeated.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="hardware-example"
        title="Hardware Example"
      >
        <p>
          Although tasks are particularly useful in verification, they can
          also organize procedural operations in a design.
        </p>

        <CodeExample title="Task-Based Calculation">
{`module calculation_unit;

    reg [3:0] a;
    reg [3:0] b;
    reg [3:0] sum;

    task calculate_sum;

        input [3:0] x;
        input [3:0] y;

        begin
            sum = x + y;
        end

    endtask

    initial begin

        calculate_sum(4'b1010, 4'b0011);

        $display("Sum = %b", sum);

    end

endmodule`}
        </CodeExample>

        <p>
          The task groups the addition operation into a reusable block.
        </p>

        <LearningNote type="tip" title="Practical Perspective">
          <p>
            In real RTL projects, you will encounter tasks frequently in
            verification environments and testbenches.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's use a task to perform repeated calculations in a simple
          simulation.
        </p>

        <p>
          Try changing the values passed to the task and observe the output.
        </p>

        <TryIt
          title="Experiment with a Task"
          language="Verilog"
          mode="beginner"
          initialCode={`module task_demo;

  reg [3:0] a;
  reg [3:0] b;
  reg [3:0] result;

  task add_numbers;

    input [3:0] x;
    input [3:0] y;

    begin
      result = x + y;
    end

  endtask

  initial begin

    add_numbers(4'b1010, 4'b0011);
    $display("a=%b b=%b result=%b", 4'b1010, 4'b0011, result);

    add_numbers(4'b1111, 4'b0001);
    $display("a=%b b=%b result=%b", 4'b1111, 4'b0001, result);

    add_numbers(4'b0110, 4'b0010);
    $display("a=%b b=%b result=%b", 4'b0110, 4'b0010, result);

    #10 $finish;

  end

endmodule`}
          testbenchCode=""
        />
      </LessonSection>

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote type="important" title="Question 1">
          <p>
            What is the main purpose of a Verilog task?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A task provides a reusable block that can perform a sequence of
            operations.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            Which keyword starts a task?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The keyword is <strong>task</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Which keyword ends a task?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The keyword is <strong>endtask</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            Can a task have multiple output arguments?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Yes. A task can have multiple output arguments.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            Where are tasks particularly useful?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Tasks are particularly useful in
            <strong> testbenches and verification</strong>, especially for
            repeated sequences of operations.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            A task is a reusable block of Verilog code.
          </li>

          <li>
            Tasks can have input, output, and inout arguments.
          </li>

          <li>
            Tasks can produce multiple output values.
          </li>

          <li>
            Tasks can contain timing controls.
          </li>

          <li>
            Tasks are especially useful in testbenches and verification.
          </li>

          <li>
            A task starts with <strong>task</strong> and ends with
            <strong> endtask</strong>.
          </li>

          <li>
            Tasks and functions have different purposes.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now understand functions and tasks, which are useful for
            organizing reusable Verilog code.
          </p>

          <p>
            Next, we'll move into a major RTL concept:
            <strong> Finite State Machines (FSMs).</strong>
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Tasks;