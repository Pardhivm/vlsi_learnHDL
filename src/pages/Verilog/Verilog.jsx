import LessonPage from "../../components/LessonPage";
import VerilogSidebar from "../../components/VerilogSidebar";
import LessonSection from "../../components/LessonSection";
import LearningNote from "../../components/LearningNote";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";

function Verilog() {
  return (
    <LessonPage
      title="Verilog"
      courseName="Verilog"
      sidebar={<VerilogSidebar />}
      sections={[
        {
          id: "introduction",
          title: "Introduction to Verilog"
        },
        {
          id: "why-learn-verilog",
          title: "Why Learn Verilog?"
        },
        {
          id: "what-you-will-learn",
          title: "What You Will Learn"
        },
        {
          id: "first-verilog-example",
          title: "Your First Verilog Example"
        },
        {
          id: "how-verilog-fits",
          title: "How Verilog Fits Into VLSI"
        }
      ]}
      nextLesson="What is Verilog?"
      nextPath="/verilog/what-is-verilog"
    >

      {/* Introduction */}

      <LessonSection
        id="introduction"
        title="Introduction to Verilog"
      >

        <p>
          Welcome to the Verilog course!
        </p>

        <p>
          Verilog is a Hardware Description Language (HDL) used
          to describe the behavior and structure of digital
          electronic systems. It allows hardware designers to
          describe circuits such as logic gates, multiplexers,
          counters, registers, processors and communication
          controllers using code.
        </p>

        <p>
          Unlike a normal programming language, Verilog is used
          to describe hardware. When Verilog code is synthesized,
          it can be converted into actual digital hardware
          consisting of gates, flip-flops, multiplexers and
          other circuit elements.
        </p>

      </LessonSection>


      {/* Why Learn Verilog */}

      <LessonSection
        id="why-learn-verilog"
        title="Why Learn Verilog?"
      >

        <p>
          Verilog is one of the fundamental skills for anyone
          interested in RTL design, FPGA development, ASIC design
          and digital hardware verification.
        </p>

        <p>
          Learning Verilog also helps you understand how software-like
          descriptions can represent real hardware structures.
        </p>

        <ul>
          <li>Design digital circuits using RTL.</li>
          <li>Develop FPGA-based systems.</li>
          <li>Create ASIC RTL designs.</li>
          <li>Build simulation testbenches.</li>
          <li>Understand digital hardware behavior.</li>
          <li>Prepare for RTL and VLSI interviews.</li>
        </ul>

        <LearningNote
          type="important"
          title="Important"
        >
          Verilog is not simply a programming language like C or
          Python. Your code represents hardware that can operate
          concurrently.
        </LearningNote>

      </LessonSection>


      {/* What You Will Learn */}

      <LessonSection
        id="what-you-will-learn"
        title="What You Will Learn"
      >

        <p>
          This course is designed to take you from the basics
          of Verilog to practical RTL design and verification.
        </p>

        <p>
          You will gradually learn:
        </p>

        <ul>
          <li>Verilog fundamentals</li>
          <li>Modules and ports</li>
          <li>Data types</li>
          <li>Operators</li>
          <li>Continuous assignments</li>
          <li>Always blocks</li>
          <li>Conditional statements</li>
          <li>Case statements</li>
          <li>Loops</li>
          <li>Functions and tasks</li>
          <li>Finite State Machines (FSMs)</li>
          <li>Testbench development</li>
          <li>RTL projects</li>
        </ul>

        <LearningNote
          type="tip"
          title="How to learn"
        >
          Don't just read the code. Try to predict what hardware
          the code represents and what the waveform should look like
          before running the simulation.
        </LearningNote>

      </LessonSection>


      {/* First Example */}

      <LessonSection
        id="first-verilog-example"
        title="Your First Verilog Example"
      >

        <p>
          Let's start with one of the simplest digital circuits:
          an AND gate.
        </p>

        <p>
          An AND gate has two inputs and one output. The output
          becomes 1 only when both inputs are 1.
        </p>

        <CodeExample
          title="AND Gate in Verilog"
        >
{`module and_gate (
    input A,
    input B,
    output Y
);

    assign Y = A & B;

endmodule`}
        </CodeExample>

        <p>
          Here, the <strong>module</strong> keyword creates a
          hardware module called <strong>and_gate</strong>.
        </p>

        <p>
          The inputs are <strong>A</strong> and <strong>B</strong>,
          while <strong>Y</strong> is the output.
        </p>

        <p>
          The statement:
        </p>

        <CodeExample
          title="Logic expression"
        >
{`assign Y = A & B;`}
        </CodeExample>

        <p>
          describes the AND operation between the two inputs.
        </p>

      </LessonSection>


      {/* VLSI Flow */}

      <LessonSection
        id="how-verilog-fits"
        title="How Verilog Fits Into VLSI"
      >

        <p>
          Verilog is an important part of the RTL design flow.
          A typical digital hardware development process looks
          something like this:
        </p>

        <ol>
          <li>Define the hardware requirements.</li>
          <li>Design the architecture.</li>
          <li>Write RTL using Verilog.</li>
          <li>Simulate the design.</li>
          <li>Verify the functionality.</li>
          <li>Synthesize the RTL.</li>
          <li>Perform timing and implementation.</li>
          <li>Generate the final FPGA or ASIC implementation.</li>
        </ol>

        <LearningNote
          type="tip"
          title="Think like a hardware designer"
        >
          Whenever you write Verilog, ask yourself:
          "What physical hardware will this code represent?"
          This question will help you understand RTL much faster.
        </LearningNote>

      </LessonSection>

    </LessonPage>
  );
}

export default Verilog;