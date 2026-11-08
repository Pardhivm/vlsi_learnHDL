import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import VHDLSidebar from "../../components/VHDLSidebar";

function Projects() {
  const sections = [
    { id: "why-projects", title: "Why Build Projects?" },
    { id: "project-flow", title: "VHDL Project Flow" },
    { id: "project-1", title: "Project 1: ALU" },
    { id: "project-2", title: "Project 2: Counter" },
    { id: "project-3", title: "Project 3: Traffic Controller" },
    { id: "project-4", title: "Project 4: UART" },
    { id: "verification", title: "Verification" },
    { id: "roadmap", title: "What to Build Next" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Projects"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Testbench"
      previousPath="/vhdl/testbench"
    >

      <LessonSection
        id="why-projects"
        title="1. Why Build Projects?"
      >
        <p className="lesson-intro">
          Projects are where individual VHDL concepts come
          together to create complete digital systems.
        </p>

        <p>
          After learning syntax and individual language
          constructs, the next step is to design, simulate,
          verify, and eventually implement complete RTL blocks.
        </p>

        <div className="vhdl-projects-purpose">

          <div>
            <span>LEARN</span>
            <strong>Concepts</strong>
            <small>Understand the RTL idea</small>
          </div>

          <div className="vhdl-projects-arrow">
            →
          </div>

          <div>
            <span>DESIGN</span>
            <strong>VHDL</strong>
            <small>Write the RTL</small>
          </div>

          <div className="vhdl-projects-arrow">
            →
          </div>

          <div>
            <span>VERIFY</span>
            <strong>Testbench</strong>
            <small>Check behavior</small>
          </div>

          <div className="vhdl-projects-arrow">
            →
          </div>

          <div>
            <span>IMPLEMENT</span>
            <strong>FPGA</strong>
            <small>Run on hardware</small>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Think Like an RTL Designer"
        >
          A good project is not only about writing VHDL code.
          You should understand the hardware, design the RTL,
          create a testbench, verify the behavior, and analyze
          the results.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="project-flow"
        title="2. VHDL Project Flow"
      >
        <p>
          A practical VHDL project normally follows a sequence
          from specification to verification and implementation.
        </p>

        <div className="vhdl-project-flow">

          <div>
            <span>01</span>
            <strong>Specification</strong>
            <small>Define what the circuit must do</small>
          </div>

          <div className="vhdl-project-flow-arrow">
            →
          </div>

          <div>
            <span>02</span>
            <strong>Architecture</strong>
            <small>Decide how it will work</small>
          </div>

          <div className="vhdl-project-flow-arrow">
            →
          </div>

          <div>
            <span>03</span>
            <strong>RTL</strong>
            <small>Write the VHDL design</small>
          </div>

          <div className="vhdl-project-flow-arrow">
            →
          </div>

          <div>
            <span>04</span>
            <strong>Simulation</strong>
            <small>Run the testbench</small>
          </div>

          <div className="vhdl-project-flow-arrow">
            →
          </div>

          <div>
            <span>05</span>
            <strong>Implementation</strong>
            <small>Synthesize for hardware</small>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="project-1"
        title="3. Project 1: ALU"
      >
        <p>
          An Arithmetic Logic Unit (ALU) performs arithmetic
          and logical operations on digital data.
        </p>

        <div className="vhdl-project-card-featured">

          <div className="vhdl-project-card-header">
            <span>PROJECT 01</span>
            <strong>4-bit ALU</strong>
          </div>

          <div className="vhdl-project-card-content">

            <div>
              <small>INPUTS</small>
              <strong>A, B</strong>
            </div>

            <div className="vhdl-project-operation">
              <small>OPERATION</small>
              <strong>ADD / SUB / AND / OR</strong>
            </div>

            <div>
              <small>OUTPUT</small>
              <strong>RESULT</strong>
            </div>

          </div>

        </div>

        <p>
          This project combines several concepts including
          data types, operators, case statements, processes,
          and testbenches.
        </p>

        <CodeExample title="Example ALU Operation">
{`case OP is

    when "00" =>
        RESULT <= A + B;

    when "01" =>
        RESULT <= A - B;

    when "10" =>
        RESULT <= A and B;

    when "11" =>
        RESULT <= A or B;

end case;`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="What You Practice"
        >
          Data types, arithmetic operators, logical operators,
          case statements, and verification.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="project-2"
        title="4. Project 2: Counter"
      >
        <p>
          Counters are fundamental sequential circuits. They
          are excellent projects for learning clocks, resets,
          processes, and registers.
        </p>

        <div className="vhdl-project-counter-visual">

          <div className="vhdl-counter-clock">
            CLK
          </div>

          <div className="vhdl-counter-arrow">
            →
          </div>

          <div className="vhdl-counter-block">
            <small>4-BIT</small>
            <strong>COUNTER</strong>
          </div>

          <div className="vhdl-counter-arrow">
            →
          </div>

          <div className="vhdl-counter-values">
            <span>0000</span>
            <span>0001</span>
            <span>0010</span>
            <span>0011</span>
          </div>

        </div>

        <CodeExample title="Counter Core">
{`process(CLK)

begin

    if rising_edge(CLK) then

        if RESET = '1' then
            COUNT <= "0000";
        else
            COUNT <= COUNT + 1;
        end if;

    end if;

end process;`}
        </CodeExample>

        <LearningNote
          type="info"
          title="What You Practice"
        >
          Clocked processes, synchronous behavior, reset logic,
          registers, and numeric operations.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="project-3"
        title="5. Project 3: Traffic Controller"
      >
        <p>
          A traffic-light controller is a classic FSM project.
          It demonstrates how states and transitions can control
          real-world behavior.
        </p>

        <div className="vhdl-project-traffic">

          <div className="vhdl-project-traffic-state">
            <small>STATE 1</small>
            <strong>RED</strong>
            <span>STOP</span>
          </div>

          <div className="vhdl-project-traffic-arrow">
            TIMER
            <strong>→</strong>
          </div>

          <div className="vhdl-project-traffic-state">
            <small>STATE 2</small>
            <strong>GREEN</strong>
            <span>GO</span>
          </div>

          <div className="vhdl-project-traffic-arrow">
            TIMER
            <strong>→</strong>
          </div>

          <div className="vhdl-project-traffic-state">
            <small>STATE 3</small>
            <strong>YELLOW</strong>
            <span>WAIT</span>
          </div>

        </div>

        <p>
          The controller can be extended with timers, pedestrian
          inputs, emergency modes, and multiple traffic signals.
        </p>

        <LearningNote
          type="tip"
          title="What You Practice"
        >
          FSM state types, state transitions, clocked processes,
          case statements, and output logic.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="project-4"
        title="6. Project 4: UART"
      >
        <p>
          UART is a more advanced RTL project that introduces
          serial communication and protocol-based design.
        </p>

        <div className="vhdl-project-uart">

          <div className="vhdl-uart-block">
            <small>PARALLEL DATA</small>
            <strong>10101010</strong>
          </div>

          <div className="vhdl-uart-arrow">
            →
          </div>

          <div className="vhdl-uart-block featured">
            <small>UART TX</small>
            <strong>SERIALIZE</strong>
          </div>

          <div className="vhdl-uart-arrow">
            →
          </div>

          <div className="vhdl-uart-frame">
            <span>START</span>
            <span>DATA</span>
            <span>STOP</span>
          </div>

        </div>

        <p>
          A UART project can contain separate transmitter and
          receiver blocks, baud-rate generation, FSMs, shift
          registers, and verification logic.
        </p>

        <CodeExample title="UART Project Building Blocks">
{`UART
│
├── Baud Rate Generator
│
├── Transmitter
│   ├── FSM
│   └── Shift Register
│
├── Receiver
│   ├── FSM
│   └── Shift Register
│
└── Testbench`}
        </CodeExample>

        <LearningNote
          type="warning"
          title="Advanced Project"
        >
          UART is significantly more complex than the earlier
          projects. Build the smaller blocks first and then
          integrate them.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="verification"
        title="7. Verification"
      >
        <p>
          Every serious RTL project should include verification.
          A testbench allows you to test different input
          combinations and corner cases before hardware
          implementation.
        </p>

        <div className="vhdl-project-verification">

          <div>
            <span>RTL</span>
            <strong>DUT</strong>
            <small>Design</small>
          </div>

          <div className="vhdl-project-verification-arrow">
            →
          </div>

          <div>
            <span>TESTBENCH</span>
            <strong>STIMULUS</strong>
            <small>Input cases</small>
          </div>

          <div className="vhdl-project-verification-arrow">
            →
          </div>

          <div>
            <span>CHECK</span>
            <strong>ASSERT</strong>
            <small>Expected result</small>
          </div>

          <div className="vhdl-project-verification-arrow">
            →
          </div>

          <div>
            <span>RESULT</span>
            <strong>PASS</strong>
            <small>Verified behavior</small>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Good Verification Habit"
        >
          Don't test only the normal case. Also test boundary
          values, reset behavior, invalid inputs, transitions,
          and other corner cases.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="roadmap"
        title="8. What to Build Next"
      >
        <p>
          Once you are comfortable with the VHDL fundamentals,
          progressively increase the complexity of your projects.
        </p>

        <div className="vhdl-project-roadmap">

          <div className="vhdl-roadmap-level">

            <small>LEVEL 1</small>

            <strong>Digital Blocks</strong>

            <span>
              MUX • Decoder • Encoder • Adder
            </span>

          </div>

          <div className="vhdl-roadmap-arrow">
            ↓
          </div>

          <div className="vhdl-roadmap-level">

            <small>LEVEL 2</small>

            <strong>Sequential RTL</strong>

            <span>
              Counter • Register • FIFO
            </span>

          </div>

          <div className="vhdl-roadmap-arrow">
            ↓
          </div>

          <div className="vhdl-roadmap-level">

            <small>LEVEL 3</small>

            <strong>Controllers</strong>

            <span>
              FSM • Traffic Light • UART
            </span>

          </div>

          <div className="vhdl-roadmap-arrow">
            ↓
          </div>

          <div className="vhdl-roadmap-level">

            <small>LEVEL 4</small>

            <strong>Complete Systems</strong>

            <span>
              CPU • Bus • SoC Blocks
            </span>

          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-project-takeaways">

          <div>
            <strong>Design</strong>
            <span>
              Start with a clear hardware specification.
            </span>
          </div>

          <div>
            <strong>RTL</strong>
            <span>
              Convert the specification into synthesizable VHDL.
            </span>
          </div>

          <div>
            <strong>Simulation</strong>
            <span>
              Use a simulator to observe circuit behavior.
            </span>
          </div>

          <div>
            <strong>Verification</strong>
            <span>
              Test normal cases and corner cases.
            </span>
          </div>

          <div>
            <strong>Integration</strong>
            <span>
              Connect smaller modules into larger systems.
            </span>
          </div>

          <div>
            <strong>Implementation</strong>
            <span>
              Move verified RTL toward FPGA or ASIC flows.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="VHDL Course Complete 🎉"
        >
          You have now covered the core VHDL concepts needed
          to start building RTL designs. The next step is to
          practice these concepts through progressively larger
          projects.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Projects;