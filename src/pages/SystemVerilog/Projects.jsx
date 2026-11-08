import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Projects() {
  const sections = [
    {
      id: "why-projects",
      title: "Why Build Projects?"
    },
    {
      id: "project-flow",
      title: "SystemVerilog Project Flow"
    },
    {
      id: "counter",
      title: "Project 1: Counter"
    },
    {
      id: "alu",
      title: "Project 2: ALU"
    },
    {
      id: "traffic-light",
      title: "Project 3: Traffic Light Controller"
    },
    {
      id: "fifo",
      title: "Project 4: FIFO"
    },
    {
      id: "verification-project",
      title: "Project 5: Verification Project"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    },
    {
      id: "what-next",
      title: "What to Learn Next"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];

 const counterCode = `module counter (
    input  logic clk,
    input  logic reset,
    output logic [3:0] count
);

    always_ff @(posedge clk) begin

        if (reset)
            count <= 4'b0000;
        else
            count <= count + 1'b1;

    end

endmodule


module top;

    logic clk;
    logic reset;
    logic [3:0] count;

    counter dut (
        .clk(clk),
        .reset(reset),
        .count(count)
    );

    initial begin

        clk = 0;
        reset = 1;

        // Keep reset active for more than one clock edge
        #12 reset = 0;

        #4;
        $display("Count = %0d", count);

        #10;
        $display("Count = %0d", count);

        #10;
        $display("Count = %0d", count);

        #10;
        $display("Count = %0d", count);

        $finish;

    end

    always #5 clk = ~clk;

endmodule`;

  return (
    <LessonPage
      title="SystemVerilog Projects"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Verification"
      previousPath="/systemverilog/verification"
    >

      {/* WHY PROJECTS */}

      <LessonSection
        id="why-projects"
        title="Why Build Projects?"
      >
        <p>
          Learning SystemVerilog becomes much easier when you start
          applying the concepts to real hardware and verification
          problems.
        </p>

        <p>
          Projects help you connect individual concepts such as
          <strong> logic, always blocks, data types, interfaces,
          classes, and assertions </strong>
          into complete designs.
        </p>

        <LessonVisual
          type="diagram"
          caption="Projects combine multiple SystemVerilog concepts into a complete design."
        >
          <div className="project-learning-diagram">

            <div className="project-learning-box">
              Concepts
            </div>

            <div className="project-learning-arrow">
              →
            </div>

            <div className="project-learning-box">
              RTL Design
            </div>

            <div className="project-learning-arrow">
              →
            </div>

            <div className="project-learning-box">
              Simulation
            </div>

            <div className="project-learning-arrow">
              →
            </div>

            <div className="project-learning-box">
              Project
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Learn by Building"
        >
          <p>
            Don't try to memorize every SystemVerilog keyword.
            Build small projects and learn the language while
            solving hardware problems.
          </p>
        </LearningNote>
      </LessonSection>


      {/* PROJECT FLOW */}

      <LessonSection
        id="project-flow"
        title="SystemVerilog Project Flow"
      >
        <p>
          A typical RTL project follows a sequence of steps from
          specification to verification.
        </p>

        <LessonVisual
          type="diagram"
          caption="A simplified SystemVerilog RTL project flow."
        >
          <div className="sv-project-flow">

            <div className="sv-project-flow-box">
              Specification
            </div>

            <div className="sv-project-flow-arrow">
              ↓
            </div>

            <div className="sv-project-flow-box">
              RTL Design
            </div>

            <div className="sv-project-flow-arrow">
              ↓
            </div>

            <div className="sv-project-flow-box">
              Testbench
            </div>

            <div className="sv-project-flow-arrow">
              ↓
            </div>

            <div className="sv-project-flow-box">
              Simulation
            </div>

            <div className="sv-project-flow-arrow">
              ↓
            </div>

            <div className="sv-project-flow-box">
              Debug
            </div>

          </div>
        </LessonVisual>

        <p>
          The same basic process is used for many RTL and
          verification projects.
        </p>
      </LessonSection>


      {/* COUNTER */}

      <LessonSection
        id="counter"
        title="Project 1: Counter"
      >
        <p>
          A counter is one of the best beginner projects because it
          introduces sequential logic and clocked behavior.
        </p>

        <p>
          The counter below increments its value on every rising
          edge of the clock.
        </p>

        <LessonVisual
          type="diagram"
          caption="A 4-bit counter increments its output on each clock edge."
        >
          <div className="counter-project-diagram">

            <div className="counter-project-input">
              Clock
            </div>

            <div className="counter-project-arrow">
              →
            </div>

            <div className="counter-project-box">
              4-bit
              <br />
              Counter
            </div>

            <div className="counter-project-arrow">
              →
            </div>

            <div className="counter-project-output">
              0000
              <br />
              ↓
              <br />
              0001
              <br />
              ↓
              <br />
              0010
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="4-bit Counter">
{`module counter (
    input  logic clk,
    input  logic reset,
    output logic [3:0] count
);

    always_ff @(posedge clk) begin

        if (reset)
            count <= 4'b0000;
        else
            count <= count + 1'b1;

    end

endmodule`}
        </CodeExample>

        <p>
          Important concepts used here are:
        </p>

        <ul>
          <li><code>logic</code> signals</li>
          <li><code>always_ff</code></li>
          <li>Clocked sequential logic</li>
          <li>Reset behavior</li>
          <li>Non-blocking assignment</li>
        </ul>
      </LessonSection>


      {/* ALU */}

      <LessonSection
        id="alu"
        title="Project 2: ALU"
      >
        <p>
          An Arithmetic Logic Unit, or
          <strong> ALU </strong>,
          performs arithmetic and logical operations.
        </p>

        <p>
          A simple ALU can perform operations such as addition,
          subtraction, AND, OR, and XOR.
        </p>

        <LessonVisual
          type="diagram"
          caption="A simple ALU selects an operation based on the control signal."
        >
          <div className="alu-project-diagram">

            <div className="alu-project-inputs">
              <div>Operand A</div>
              <div>Operand B</div>
            </div>

            <div className="alu-project-arrow">
              →
            </div>

            <div className="alu-project-box">
              ALU
              <br />
              + − &amp; | ^
            </div>

            <div className="alu-project-arrow">
              →
            </div>

            <div className="alu-project-output">
              Result
            </div>

            <div className="alu-project-control">
              Operation Select
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Simple ALU">
{`module alu (
    input  logic [3:0] a,
    input  logic [3:0] b,
    input  logic [2:0] op,
    output logic [3:0] result
);

    always_comb begin

        case (op)

            3'b000: result = a + b;
            3'b001: result = a - b;
            3'b010: result = a & b;
            3'b011: result = a | b;
            3'b100: result = a ^ b;

            default:
                result = 4'b0000;

        endcase

    end

endmodule`}
        </CodeExample>

        <LearningNote
          type="info"
          title="What You Learn"
        >
          <p>
            This project gives you practical experience with
            <strong> always_comb, case statements, operators,
            and combinational logic </strong>.
          </p>
        </LearningNote>
      </LessonSection>


      {/* TRAFFIC LIGHT */}

      <LessonSection
        id="traffic-light"
        title="Project 3: Traffic Light Controller"
      >
        <p>
          A traffic light controller is a classic
          <strong> Finite State Machine (FSM) </strong>
          project.
        </p>

        <p>
          The controller changes between states such as
          <strong> RED, GREEN, and YELLOW </strong>.
        </p>

        <LessonVisual
          type="diagram"
          caption="A simple traffic light controller can be modeled as a state machine."
        >
          <div className="traffic-project-diagram">

            <div className="traffic-state">
              RED
            </div>

            <div className="traffic-arrow">
              →
            </div>

            <div className="traffic-state">
              GREEN
            </div>

            <div className="traffic-arrow">
              →
            </div>

            <div className="traffic-state">
              YELLOW
            </div>

            <div className="traffic-arrow">
              →
            </div>

            <div className="traffic-state">
              RED
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Traffic Light States">
{`typedef enum logic [1:0] {
    RED,
    GREEN,
    YELLOW
} state_t;

state_t state;`}
        </CodeExample>

        <p>
          A complete traffic light controller would use sequential
          logic to store the current state and combinational logic
          to determine the next state.
        </p>

        <LearningNote
          type="tip"
          title="Recommended Project"
        >
          <p>
            This is an excellent project after learning
            <strong> always_ff, always_comb, case statements,
            and FSM design </strong>.
          </p>
        </LearningNote>
      </LessonSection>


      {/* FIFO */}

      <LessonSection
        id="fifo"
        title="Project 4: FIFO"
      >
        <p>
          FIFO stands for
          <strong> First In, First Out </strong>.
        </p>

        <p>
          The first piece of data written into the FIFO is the first
          piece of data that comes out.
        </p>

        <LessonVisual
          type="diagram"
          caption="Data enters the FIFO from one side and leaves in the same order."
        >
          <div className="fifo-project-diagram">

            <div className="fifo-input">
              Write
              <br />
              Data
            </div>

            <div className="fifo-arrow">
              →
            </div>

            <div className="fifo-memory">

              <div className="fifo-cell">
                Data 1
              </div>

              <div className="fifo-cell">
                Data 2
              </div>

              <div className="fifo-cell">
                Data 3
              </div>

              <div className="fifo-cell">
                Data 4
              </div>

            </div>

            <div className="fifo-arrow">
              →
            </div>

            <div className="fifo-output">
              Read
              <br />
              Data
            </div>

          </div>
        </LessonVisual>

        <p>
          A FIFO typically contains:
        </p>

        <ul>
          <li>Memory storage</li>
          <li>Write pointer</li>
          <li>Read pointer</li>
          <li>Full detection</li>
          <li>Empty detection</li>
        </ul>

        <LearningNote
          type="info"
          title="Why FIFO Matters"
        >
          <p>
            FIFOs are widely used for buffering data between different
            parts of digital systems and are an important RTL design
            concept.
          </p>
        </LearningNote>
      </LessonSection>


      {/* VERIFICATION PROJECT */}

      <LessonSection
        id="verification-project"
        title="Project 5: Verification Project"
      >
        <p>
          SystemVerilog is not only used for writing RTL. It is also
          extremely powerful for verification.
        </p>

        <p>
          A beginner verification project can verify a small RTL
          design such as an ALU, counter, or FIFO.
        </p>

        <LessonVisual
          type="diagram"
          caption="A basic verification flow compares the DUT behavior with expected results."
        >
          <div className="sv-verification-project-diagram">

            <div className="sv-verification-project-box">
              Stimulus
            </div>

            <div className="sv-verification-project-arrow">
              →
            </div>

            <div className="sv-verification-project-box">
              DUT
            </div>

            <div className="sv-verification-project-arrow">
              →
            </div>

            <div className="sv-verification-project-box">
              Monitor
            </div>

            <div className="sv-verification-project-arrow">
              →
            </div>

            <div className="sv-verification-project-box">
              Scoreboard
            </div>

          </div>
        </LessonVisual>

        <p>
          You can gradually add more verification features:
        </p>

        <ul>
          <li>Transactions</li>
          <li>Classes</li>
          <li>Interfaces</li>
          <li>Assertions</li>
          <li>Functional coverage</li>
          <li>Random stimulus</li>
          <li>UVM components</li>
        </ul>

        <LearningNote
          type="tip"
          title="Build Your Own"
        >
          <p>
            A great first verification project is to build a
            <strong> 4-bit ALU </strong>
            and create a SystemVerilog testbench that checks every
            operation.
          </p>
        </LearningNote>
      </LessonSection>


      {/* TRY IT */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with a simple 4-bit counter.
        </p>

        <TryIt
          title="Experiment with a Counter"
          language="SystemVerilog"
          initialCode={counterCode}
        />
      </LessonSection>


      {/* WHAT NEXT */}

      <LessonSection
        id="what-next"
        title="What to Learn Next"
      >
        <p>
          Congratulations! 🎉 You have completed the main
          SystemVerilog learning path on this website.
        </p>

        <p>
          But SystemVerilog is only one part of the VLSI design and
          verification ecosystem.
        </p>

        <LessonVisual
          type="diagram"
          caption="SystemVerilog connects to several important areas of VLSI."
        >
          <div className="sv-next-learning-diagram">

            <div className="sv-next-center">
              SystemVerilog
            </div>

            <div className="sv-next-item">
              RTL Design
            </div>

            <div className="sv-next-item">
              UVM
            </div>

            <div className="sv-next-item">
              FPGA
            </div>

            <div className="sv-next-item">
              ASIC
            </div>

            <div className="sv-next-item">
              Verification
            </div>

            <div className="sv-next-item">
              Linux
            </div>

          </div>
        </LessonVisual>

        <h3>Recommended Learning Path</h3>

        <ol>
          <li>Build RTL projects.</li>
          <li>Practice simulation and debugging.</li>
          <li>Learn advanced SystemVerilog verification.</li>
          <li>Learn UVM.</li>
          <li>Learn FPGA development.</li>
          <li>Learn ASIC design flow.</li>
          <li>Learn STA and timing concepts.</li>
          <li>Practice real VLSI interview problems.</li>
        </ol>

        <LearningNote
          type="info"
          title="Keep Practicing"
        >
          <p>
            The goal is not just to know SystemVerilog syntax.
            The goal is to be able to design, simulate, verify,
            debug, and explain digital hardware.
          </p>
        </LearningNote>
      </LessonSection>


      {/* TAKEAWAYS */}

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>Projects turn SystemVerilog concepts into practical skills.</li>
          <li>A counter is a good first sequential-logic project.</li>
          <li>An ALU is a good combinational-logic project.</li>
          <li>A traffic light controller teaches FSM design.</li>
          <li>A FIFO teaches memory and data buffering concepts.</li>
          <li>Verification projects teach how to check RTL behavior.</li>
          <li>Interfaces and classes become especially useful in verification.</li>
          <li>Assertions and coverage help improve verification quality.</li>
          <li>UVM is the next major step for advanced verification.</li>
        </ul>

        <LearningNote
          type="success"
          title="SystemVerilog Complete! 🎉"
        >
          <p>
            You have reached the end of the SystemVerilog section.
            Now it's time to put these concepts into real projects
            and continue into the wider VLSI design and verification
            flow.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Projects;