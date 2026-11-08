import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Projects() {
  const sections = [
    { id: "why-projects", title: "Why Build Projects?" },
    { id: "project-flow", title: "Verilog Project Flow" },
    { id: "project-1", title: "Project 1: 4-Bit ALU" },
    { id: "project-2", title: "Project 2: Digital Clock" },
    { id: "project-3", title: "Project 3: Traffic Light Controller" },
    { id: "project-4", title: "Project 4: UART Transmitter" },
    { id: "project-5", title: "Project 5: Counter" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "project-ideas", title: "More Project Ideas" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Projects"
      sections={sections}
      previousLesson="Testbench"
      previousPath="/verilog/testbench"
    >

      <LessonSection
        id="why-projects"
        title="Why Build Projects?"
      >
        <p>
          Learning Verilog syntax is important, but building projects helps
          you understand how RTL concepts are used in real digital designs.
        </p>

        <p>
          Projects allow you to combine modules, operators, sequential logic,
          FSMs, counters, testbenches, and simulation.
        </p>


        <LearningNote type="important" title="Learn by Building">
          <p>
            Don't try to memorize every Verilog keyword. Build circuits,
            simulate them, observe the waveforms, and understand why the
            hardware behaves that way.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-flow"
        title="Verilog Project Flow"
      >
        <p>
          A simple RTL project usually follows a flow like this:
        </p>

        <CodeExample title="Project Flow">
{`Specification
      ↓
RTL Design
      ↓
Testbench
      ↓
Simulation
      ↓
Debugging
      ↓
Verification
      ↓
Synthesis`}
        </CodeExample>

        <p>
          First, decide what the circuit should do. Then write the RTL,
          create a testbench, simulate the design, fix problems, and
          eventually synthesize it.
        </p>

        <LearningNote type="tip" title="Real VLSI Connection">
          <p>
            This basic workflow is similar to what you will encounter in
            professional RTL design, although real projects contain many more
            stages and tools.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-1"
        title="Project 1: 4-Bit ALU"
      >
        <p>
          An <strong>ALU</strong>, or Arithmetic Logic Unit, performs
          arithmetic and logical operations.
        </p>

        <p>
          Our beginner ALU will support four operations:
        </p>

        <ul>
          <li>Addition</li>
          <li>Subtraction</li>
          <li>AND</li>
          <li>OR</li>
        </ul>

        <CodeExample title="4-Bit ALU">
{`module alu_4bit(
    input [3:0] a,
    input [3:0] b,
    input [1:0] op,
    output reg [3:0] result
);

    always @(*) begin

        case (op)

            2'b00:
                result = a + b;

            2'b01:
                result = a - b;

            2'b10:
                result = a & b;

            2'b11:
                result = a | b;

            default:
                result = 4'b0000;

        endcase

    end

endmodule`}
        </CodeExample>

        <p>
          The <strong>op</strong> input selects which operation the ALU
          performs.
        </p>

        <CodeExample title="Operation Selection">
{`op = 00 → Addition
op = 01 → Subtraction
op = 10 → AND
op = 11 → OR`}
        </CodeExample>

        <LearningNote type="important" title="Concepts Used">
          <p>
            This project combines case statements,
            \operators, combinational logic,
            and 4-bit signals.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-2"
        title="Project 2: Digital Clock"
      >
        <p>
          A digital clock is a useful sequential-logic project because it
          requires counters and clock-driven state updates.
        </p>

        <CodeExample title="Clock Counter Concept">
{`Clock
  ↓
Seconds Counter
  ↓
Minutes Counter
  ↓
Hours Counter`}
        </CodeExample>

        <p>
          A practical digital clock can contain counters for seconds, minutes,
          and hours.
        </p>

        <CodeExample title="Simple Seconds Counter">
{`module seconds_counter(
    input clk,
    input reset,
    output reg [5:0] seconds
);

    always @(posedge clk) begin

        if (reset)
            seconds <= 0;

        else if (seconds == 59)
            seconds <= 0;

        else
            seconds <= seconds + 1;

    end

endmodule`}
        </CodeExample>

        <LearningNote type="info" title="Hardware Concepts">
          <p>
            A digital clock teaches you about clock signals, counters,
            registers, reset logic, and sequential always blocks.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-3"
        title="Project 3: Traffic Light Controller"
      >
        <p>
          A traffic light controller is a classic FSM project.
        </p>

        <CodeExample title="Traffic Light States">
{`RED
 ↓
GREEN
 ↓
YELLOW
 ↓
RED`}
        </CodeExample>

        <p>
          Each state controls the traffic-light outputs.
        </p>

        <CodeExample title="Traffic Light Outputs">
{`RED    → 3'b100
GREEN  → 3'b010
YELLOW → 3'b001`}
        </CodeExample>

        <p>
          The FSM changes state on clock edges.
        </p>

        <LearningNote type="tip" title="What You Practice">
          <p>
            This project reinforces FSM design, state registers, next-state
            logic, output logic, and testbench development.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-4"
        title="Project 4: UART Transmitter"
      >
        <p>
          A UART transmitter is a much more realistic RTL project.
        </p>

        <p>
          UART stands for <strong>Universal Asynchronous
          Receiver/Transmitter</strong>.
        </p>

        <p>
          A transmitter converts parallel data into a serial stream.
        </p>

        <CodeExample title="UART Transmitter Concept">
{`Parallel Data
     ↓
UART Transmitter
     ↓
Serial TX Output`}
        </CodeExample>

        <p>
          A basic UART frame commonly contains:
        </p>

        <CodeExample title="UART Frame">
{`Start
  ↓
Data Bits
  ↓
Stop`}
        </CodeExample>

        <LearningNote type="important" title="Advanced Beginner Project">
          <p>
            UART is a great project because it combines counters, FSMs,
            registers, timing, and serial communication.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-5"
        title="Project 5: Counter"
      >
        <p>
          Counters are one of the most fundamental sequential circuits in
          digital design.
        </p>

        <CodeExample title="4-Bit Up Counter">
{`module counter_4bit(
    input clk,
    input reset,
    output reg [3:0] count
);

    always @(posedge clk) begin

        if (reset)
            count <= 4'b0000;

        else
            count <= count + 1'b1;

    end

endmodule`}
        </CodeExample>

        <CodeExample title="Counter Sequence">
{`0000
 ↓
0001
 ↓
0010
 ↓
0011
 ↓
0100
 ↓
...`}
        </CodeExample>

        <LearningNote type="info" title="Why Counters Matter">
          <p>
            Counters appear in timers, frequency dividers, communication
            systems, control logic, memory interfaces, and many other RTL
            designs.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's build a small 4-bit ALU and test it using a testbench.
        </p>

        <p>
          Try changing the operation logic and observe how the output changes.
        </p>

        <TryIt
          title="Build a 4-Bit ALU"
          language="Verilog"
          mode="beginner"
          initialCode={`module alu_4bit(
  input [3:0] a,
  input [3:0] b,
  input [1:0] op,
  output reg [3:0] result
);

  always @(*) begin

    case (op)

      2'b00:
        result = a + b;

      2'b01:
        result = a - b;

      2'b10:
        result = a & b;

      2'b11:
        result = a | b;

      default:
        result = 4'b0000;

    endcase

  end

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  reg [1:0] op;

  wire [3:0] result;

  alu_4bit dut (
    .a(a),
    .b(b),
    .op(op),
    .result(result)
  );

  initial begin

    $monitor(
      "time=%0t a=%b b=%b op=%b result=%b",
      $time,
      a,
      b,
      op,
      result
    );

    a = 4'b0101;
    b = 4'b0011;

    op = 2'b00;
    #10;

    op = 2'b01;
    #10;

    op = 2'b10;
    #10;

    op = 2'b11;
    #10;

    $finish;

  end

endmodule`}
        />

        <LearningNote type="tip" title="Experiment">
          <p>
            Try changing the ALU operation.
          </p>

          <CodeExample title="For Example">
{`result = a | b;`}
          </CodeExample>

          <p>
            You can also change the values of <strong>a</strong> and
            <strong> b</strong> and run the simulation again.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="project-ideas"
        title="More Project Ideas"
      >
        <p>
          Once you are comfortable with the fundamentals, you can build
          larger RTL projects.
        </p>

        <ul>
          <li>4-bit ALU</li>
          <li>8-bit ALU</li>
          <li>Up/Down Counter</li>
          <li>Digital Clock</li>
          <li>Traffic Light Controller</li>
          <li>Sequence Detector</li>
          <li>FIFO</li>
          <li>UART Transmitter</li>
          <li>UART Receiver</li>
          <li>UART Transmitter and Receiver</li>
          <li>SPI Controller</li>
          <li>Vending Machine FSM</li>
          <li>Elevator Controller</li>
          <li>Pulse Width Modulation Generator</li>
          <li>Simple Memory Controller</li>
        </ul>

        <LearningNote type="important" title="Build in Stages">
          <p>
            Start with small combinational circuits, then move to sequential
            logic, FSMs, communication protocols, and larger systems.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote type="important" title="Question 1">
          <p>
            Why are projects important when learning Verilog?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Projects help you combine individual Verilog concepts into
            complete digital designs and understand how RTL is used in
            practice.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            What does ALU stand for?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            ALU stands for <strong>Arithmetic Logic Unit</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Which type of logic is commonly used to implement a traffic light
            controller?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A traffic light controller is commonly implemented using a
            <strong>Finite State Machine (FSM)</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does UART stand for?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            UART stands for
            <strong> Universal Asynchronous Receiver/Transmitter</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What is the purpose of a testbench in a project?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A testbench applies inputs to the DUT and helps verify whether
            the design produces the expected outputs.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            Projects help connect Verilog concepts together.
          </li>

          <li>
            A typical RTL flow includes design, simulation, verification,
            debugging, and synthesis.
          </li>

          <li>
            ALUs are useful for learning combinational RTL.
          </li>

          <li>
            Counters and digital clocks teach sequential logic.
          </li>

          <li>
            Traffic light controllers are excellent FSM projects.
          </li>

          <li>
            UART is a useful communication-oriented RTL project.
          </li>

          <li>
            Testbenches are essential for verifying RTL designs.
          </li>

          <li>
            Start with small projects and gradually increase complexity.
          </li>
        </ul>

        <LearningNote type="tip" title="Verilog Course Complete 🎉">
          <p>
            Congratulations! You have completed the main Verilog learning
            path.
          </p>

          <p>
            You have learned Verilog syntax, modules, ports, data types,
            operators, procedural logic, functions, tasks, FSMs, testbenches,
            and project development.
          </p>

          <p>
            Next, you can move deeper into the VLSI learning path with
            <strong> SystemVerilog.</strong>
          </p>

          <p>
            "More lessons coming soon."
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Projects;