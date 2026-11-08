import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";
import TryIt from "../../components/TryIt";

function BasicSyntax() {
  return (
    <LessonPage
      title="SystemVerilog Basic Syntax"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}

      sections={[
        {
          id: "source-file",
          title: "SystemVerilog Source File"
        },
        {
          id: "module",
          title: "SystemVerilog Module"
        },
        {
          id: "ports",
          title: "Ports"
        },
        {
          id: "logic",
          title: "Logic Data Type"
        },
        {
          id: "comments",
          title: "Comments"
        },
        {
          id: "simple-example",
          title: "Simple Example"
        },
        {
          id: "key-takeaways",
          title: "Key Takeaways"
        }
      ]}

      previousLesson="What is SystemVerilog?"
      previousPath="/systemverilog/what-is-systemverilog"

      nextLesson="Data Types"
      nextPath="/systemverilog/data-types"
    >

      {/* ========================= */}
      {/* Source File */}
      {/* ========================= */}

      <LessonSection
        id="source-file"
        title="SystemVerilog Source File"
      >

        <p>
          SystemVerilog source files normally use the
          <strong> .sv </strong>
          file extension.
        </p>

        <p>
          A SystemVerilog design is usually organized into
          modules. A module represents a hardware block or
          component.
        </p>

        <CodeExample title="Basic SystemVerilog File">
{`module example;

    // Hardware description

endmodule`}
        </CodeExample>

        <p>
          The <strong>module</strong> keyword starts a module,
          while <strong>endmodule</strong> marks the end of it.
        </p>

        <LearningNote
          type="important"
          title="Remember"
        >
          SystemVerilog files normally use the .sv extension.
          Traditional Verilog files commonly use the .v extension.
        </LearningNote>

      </LessonSection>


      {/* ========================= */}
      {/* Module */}
      {/* ========================= */}

      <LessonSection
        id="module"
        title="SystemVerilog Module"
      >

        <p>
          A module is one of the most important building blocks
          of SystemVerilog.
        </p>

        <p>
          It can contain input ports, output ports, internal
          signals and the logic required to describe the hardware.
        </p>

        <CodeExample title="Basic Module">
{`module and_gate (
    input  logic A,
    input  logic B,
    output logic Y
);

    assign Y = A & B;

endmodule`}
        </CodeExample>

        <p>
          In this example, the module is called
          <strong> and_gate</strong>.
        </p>

        <p>
          It has two inputs, <strong>A</strong> and
          <strong>B</strong>, and one output,
          <strong>Y</strong>.
        </p>

        <LearningNote
          type="tip"
          title="Think of a module as a circuit block"
        >
          You can think of a module like a block in a circuit
          diagram. Signals enter through the inputs and leave
          through the outputs.
        </LearningNote>

      </LessonSection>
<TryIt
  title="Try SystemVerilog Yourself"
  initialCode={`module and_gate(
  input logic a,
  input logic b,
  output logic y
);

  assign y = a & b;

endmodule`}
/>

      {/* ========================= */}
      {/* Ports */}
      {/* ========================= */}

      <LessonSection
        id="ports"
        title="Ports"
      >

        <p>
          Ports allow a SystemVerilog module to communicate with
          other hardware blocks.
        </p>

        <p>
          The two most common port directions are
          <strong> input </strong>
          and
          <strong> output</strong>.
        </p>

        <CodeExample title="Input and Output Ports">
{`module example (
    input  logic clk,
    input  logic reset,
    output logic done
);

endmodule`}
        </CodeExample>

        <ul>
          <li>
            <strong>input</strong> — signal entering the module
          </li>

          <li>
            <strong>output</strong> — signal leaving the module
          </li>

          <li>
            <strong>logic</strong> — commonly used SystemVerilog
            data type
          </li>
        </ul>

        <LearningNote
          type="tip"
          title="Hardware View"
        >
          Imagine the module as a box. Inputs enter the box,
          the hardware inside processes them, and outputs leave
          the box.
        </LearningNote>

      </LessonSection>


      {/* ========================= */}
      {/* Logic */}
      {/* ========================= */}

      <LessonSection
        id="logic"
        title="Logic Data Type"
      >

        <p>
          One of the most commonly used SystemVerilog data types
          is <strong>logic</strong>.
        </p>

        <p>
          It can represent a digital signal that can have four
          possible states:
        </p>

        <ul>
          <li><strong>0</strong> — Logic LOW</li>
          <li><strong>1</strong> — Logic HIGH</li>
          <li><strong>X</strong> — Unknown</li>
          <li><strong>Z</strong> — High impedance</li>
        </ul>

        <CodeExample title="Declaring Logic Signals">
{`logic A;
logic B;
logic Y;`}
        </CodeExample>

        <p>
          These declarations create three signals called
          <strong>A</strong>, <strong>B</strong> and
          <strong>Y</strong>.
        </p>

        <LearningNote
          type="important"
          title="Four-State Logic"
        >
          Digital simulation can represent more than just 0 and 1.
          Unknown and high-impedance states are useful for finding
          problems during simulation.
        </LearningNote>

      </LessonSection>


      {/* ========================= */}
      {/* Comments */}
      {/* ========================= */}

      <LessonSection
        id="comments"
        title="Comments"
      >

        <p>
          Comments are used to explain the purpose and behavior
          of your code. They are ignored by the simulator and
          synthesis tools.
        </p>

        <p>
          SystemVerilog supports single-line and multi-line comments.
        </p>

        <CodeExample title="Single-Line Comment">
{`// This is a single-line comment

logic enable;`}
        </CodeExample>

        <CodeExample title="Multi-Line Comment">
{`/*
   This is a
   multi-line comment
*/

logic data;`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Good Practice"
        >
          Use comments to explain important design decisions and
          hardware behavior. Good comments make RTL easier to
          understand and maintain.
        </LearningNote>

      </LessonSection>


      {/* ========================= */}
      {/* Simple Example */}
      {/* ========================= */}

      <LessonSection
        id="simple-example"
        title="Simple Example"
      >

        <p>
          Let's combine the concepts we have learned so far and
          create a simple AND gate.
        </p>

        <CodeExample title="AND Gate in SystemVerilog">
{`module and_gate (
    input  logic A,
    input  logic B,
    output logic Y
);

    assign Y = A & B;

endmodule`}
        </CodeExample>

        <p>
          The statement:
        </p>

        <CodeExample title="Continuous Assignment">
{`assign Y = A & B;`}
        </CodeExample>

        <p>
          continuously assigns the result of
          <strong> A & B </strong>
          to the output <strong>Y</strong>.
        </p>

        <p>
          Therefore, when both A and B are 1, Y becomes 1.
          Otherwise, Y becomes 0.
        </p>

        <LearningNote
          type="important"
          title="Hardware Thinking"
        >
          This code describes an AND gate. It does not mean that
          a processor executes the statement once from top to
          bottom.
        </LearningNote>

      </LessonSection>


      {/* ========================= */}
      {/* Key Takeaways */}
      {/* ========================= */}

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >

        <p>
          After completing this lesson, you should understand:
        </p>

        <ul>
          <li>SystemVerilog files normally use the .sv extension.</li>

          <li>
            Modules are fundamental building blocks of
            SystemVerilog designs.
          </li>

          <li>
            Ports allow modules to communicate with other
            hardware blocks.
          </li>

          <li>
            The logic type is widely used for SystemVerilog signals.
          </li>

          <li>
            SystemVerilog supports single-line and multi-line comments.
          </li>

          <li>
            SystemVerilog describes hardware rather than ordinary
            software instructions.
          </li>
        </ul>

        <LearningNote
          type="tip"
          title="Next Lesson"
        >
          Next, we will learn about SystemVerilog data types and
          understand when different types should be used.
        </LearningNote>

      </LessonSection>

    </LessonPage>
  );
}

export default BasicSyntax;