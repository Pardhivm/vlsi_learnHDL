import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function VHDL() {
  const sections = [
    { id: "introduction", title: "Introduction to VHDL" },
    { id: "what", title: "What is VHDL?" },
    { id: "why", title: "Why Learn VHDL?" },
    { id: "vlsi", title: "VHDL in VLSI" },
    { id: "learn", title: "What You Will Learn" },
    { id: "example", title: "Your First VHDL Example" },
    { id: "flow", title: "VHDL Design Flow" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="SystemVerilog Projects"
      previousPath="/systemverilog/projects"
      nextLesson="What is VHDL?"
      nextPath="/vhdl/what-is-vhdl"
    >

      {/* HERO */}
      <section className="vhdl-intro-hero">
        <div className="vhdl-intro-hero-content">
          <div className="vhdl-intro-badge">
            HARDWARE DESCRIPTION LANGUAGE
          </div>

          <h2>Learn VHDL for Digital Hardware Design</h2>

          <p>
            Learn how to describe, simulate, verify, and design
            digital hardware using VHDL — from simple logic
            circuits to RTL designs and practical projects.
          </p>

          <div className="vhdl-intro-hero-points">
            <span>RTL Design</span>
            <span>Simulation</span>
            <span>Verification</span>
            <span>FPGA / ASIC</span>
          </div>
        </div>

        <div className="vhdl-intro-hero-diagram">
          <div className="vhdl-chip">
            <div className="vhdl-chip-label">VHDL</div>

            <div className="vhdl-chip-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="vhdl-chip-caption">
            Describe Hardware
          </div>
        </div>
      </section>


      {/* INTRODUCTION */}
      <LessonSection
        id="introduction"
        title="1. Introduction to VHDL"
      >
        <p className="lesson-intro">
          Welcome to the VHDL course! VHDL is a Hardware
          Description Language used to describe, model,
          simulate, and design digital hardware.
        </p>

        <p>
          In this course, we will start with the fundamentals
          of VHDL and gradually move toward RTL design,
          simulation, testbenches, FSMs, and practical
          hardware projects.
        </p>

        <div className="vhdl-intro-learning-path">
          <div className="vhdl-path-step">
            <div className="vhdl-path-number">01</div>
            <strong>Understand</strong>
            <span>Learn the hardware concept</span>
          </div>

          <div className="vhdl-path-connector">→</div>

          <div className="vhdl-path-step">
            <div className="vhdl-path-number">02</div>
            <strong>Describe</strong>
            <span>Write the VHDL code</span>
          </div>

          <div className="vhdl-path-connector">→</div>

          <div className="vhdl-path-step">
            <div className="vhdl-path-number">03</div>
            <strong>Simulate</strong>
            <span>Verify the design</span>
          </div>

          <div className="vhdl-path-connector">→</div>

          <div className="vhdl-path-step">
            <div className="vhdl-path-number">04</div>
            <strong>Build</strong>
            <span>Create practical designs</span>
          </div>
        </div>

        <LearningNote
          type="info"
          title="Learning Approach"
        >
          We will first understand the hardware concept,
          then learn the VHDL syntax used to describe it,
          and finally simulate the design.
        </LearningNote>
      </LessonSection>


      {/* WHAT IS VHDL */}
      <LessonSection
        id="what"
        title="2. What is VHDL?"
      >
        <div className="vhdl-intro-definition">
          <div className="vhdl-definition-main">
            <span>VHDL</span>
            <strong>
              VHSIC Hardware Description Language
            </strong>
          </div>

          <div className="vhdl-definition-side">
            <div>
              <span>DESCRIBE</span>
              <strong>Hardware</strong>
            </div>

            <div>
              <span>MODEL</span>
              <strong>Digital Systems</strong>
            </div>

            <div>
              <span>VERIFY</span>
              <strong>Designs</strong>
            </div>
          </div>
        </div>

        <p>
          It is used to describe the behavior and structure
          of digital electronic systems.
        </p>

        <p>
          VHDL can be used to describe circuits ranging from
          simple logic gates to large FPGA and ASIC designs.
        </p>

        <CodeExample title="Simple VHDL Statement">
{`Y <= A and B;`}
        </CodeExample>

        <p>
          The statement above describes an AND relationship
          between signals <code>A</code> and <code>B</code>.
        </p>

        <LearningNote
          type="tip"
          title="Remember"
        >
          VHDL describes hardware. It is not simply a
          programming language for writing software.
        </LearningNote>
      </LessonSection>


      {/* WHY LEARN */}
      <LessonSection
        id="why"
        title="3. Why Learn VHDL?"
      >
        <p>
          VHDL is widely used in digital design and FPGA
          development.
        </p>

        <div className="vhdl-intro-benefits">

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">⌁</span>
            <strong>RTL Design</strong>
            <p>Describe synthesizable digital hardware.</p>
          </div>

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">▣</span>
            <strong>FPGA Development</strong>
            <p>Design and implement FPGA-based systems.</p>
          </div>

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">◈</span>
            <strong>ASIC Design</strong>
            <p>Use HDL descriptions in ASIC workflows.</p>
          </div>

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">◉</span>
            <strong>Simulation</strong>
            <p>Verify hardware behavior before implementation.</p>
          </div>

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">⚙</span>
            <strong>Synthesis</strong>
            <p>Convert synthesizable VHDL into hardware logic.</p>
          </div>

          <div className="vhdl-benefit">
            <span className="vhdl-benefit-icon">⌘</span>
            <strong>Digital Systems</strong>
            <p>Build a stronger understanding of hardware.</p>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Career Benefit"
        >
          Learning both Verilog/SystemVerilog and VHDL gives
          you exposure to multiple HDL-based design flows.
        </LearningNote>
      </LessonSection>


      {/* VHDL IN VLSI */}
      <LessonSection
        id="vlsi"
        title="4. VHDL in VLSI"
      >
        <p>
          VHDL can be used at the RTL level to describe the
          behavior and structure of digital hardware.
        </p>

        <div className="vhdl-intro-hardware-flow">

          <div className="vhdl-flow-node vhdl-flow-source">
            <small>DESCRIPTION</small>
            <strong>VHDL</strong>
          </div>

          <div className="vhdl-flow-line">
            <span>RTL</span>
            <b>→</b>
          </div>

          <div className="vhdl-flow-node">
            <small>IMPLEMENTATION</small>
            <strong>RTL</strong>
          </div>

          <div className="vhdl-flow-line">
            <span>SYNTHESIS</span>
            <b>→</b>
          </div>

          <div className="vhdl-flow-node">
            <small>LOGIC</small>
            <strong>Gates</strong>
          </div>

          <div className="vhdl-flow-line">
            <span>IMPLEMENT</span>
            <b>→</b>
          </div>

          <div className="vhdl-flow-node vhdl-flow-hardware">
            <small>RESULT</small>
            <strong>Hardware</strong>
          </div>

        </div>

        <p>
          A VHDL description can be simulated to verify the
          design before it is synthesized and implemented on
          hardware.
        </p>
      </LessonSection>


      {/* WHAT YOU WILL LEARN */}
      <LessonSection
        id="learn"
        title="5. What You Will Learn"
      >
        <p>
          The VHDL course will gradually cover the following
          topics:
        </p>

        <div className="vhdl-intro-roadmap">

          <div className="vhdl-roadmap-item">
            <span>01</span>
            <div>
              <strong>Fundamentals</strong>
              <p>Syntax, entities, architectures, and signals</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>02</span>
            <div>
              <strong>Data Types</strong>
              <p>std_logic, vectors, signed, unsigned, and more</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>03</span>
            <div>
              <strong>Logic</strong>
              <p>Operators and concurrent statements</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>04</span>
            <div>
              <strong>Processes</strong>
              <p>Sequential and clocked hardware</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>05</span>
            <div>
              <strong>Control</strong>
              <p>If, case, and loops</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>06</span>
            <div>
              <strong>Design</strong>
              <p>Components, FSMs, and hierarchical designs</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>07</span>
            <div>
              <strong>Verification</strong>
              <p>Testbenches and simulation</p>
            </div>
          </div>

          <div className="vhdl-roadmap-item">
            <span>08</span>
            <div>
              <strong>Projects</strong>
              <p>Practical VHDL hardware projects</p>
            </div>
          </div>

        </div>
      </LessonSection>


      {/* FIRST EXAMPLE */}
      <LessonSection
        id="example"
        title="6. Your First VHDL Example"
      >
        <p>
          Let's look at a simple AND gate.
        </p>

        <div className="vhdl-intro-code-layout">

          <div className="vhdl-intro-code-explanation">
            <div className="vhdl-code-part">
              <span>01</span>
              <strong>Library</strong>
              <p>
                Provides the standard logic definitions.
              </p>
            </div>

            <div className="vhdl-code-part">
              <span>02</span>
              <strong>Entity</strong>
              <p>
                Defines the external interface.
              </p>
            </div>

            <div className="vhdl-code-part">
              <span>03</span>
              <strong>Architecture</strong>
              <p>
                Defines the circuit implementation.
              </p>
            </div>
          </div>

          <div className="vhdl-intro-code-wrapper">
            <CodeExample title="AND_GATE.vhd">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity AND_GATE is

    port (
        A : in  std_logic;
        B : in  std_logic;
        Y : out std_logic
    );

end AND_GATE;


architecture Behavioral of AND_GATE is

begin

    Y <= A and B;

end Behavioral;`}
            </CodeExample>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Two Important Parts"
        >
          Remember these two terms:
          Entity = Interface and
           Architecture = Implementation.
        </LearningNote>
      </LessonSection>


      {/* DESIGN FLOW */}
      <LessonSection
        id="flow"
        title="7. VHDL Design Flow"
      >
        <p>
          A typical VHDL development flow looks like this:
        </p>

        <div className="vhdl-intro-timeline">

          <div className="vhdl-timeline-item">
            <div className="vhdl-timeline-marker">1</div>
            <strong>Write</strong>
            <span>VHDL</span>
          </div>

          <div className="vhdl-timeline-arrow">→</div>

          <div className="vhdl-timeline-item">
            <div className="vhdl-timeline-marker">2</div>
            <strong>Analyze</strong>
            <span>Source</span>
          </div>

          <div className="vhdl-timeline-arrow">→</div>

          <div className="vhdl-timeline-item">
            <div className="vhdl-timeline-marker">3</div>
            <strong>Elaborate</strong>
            <span>Design</span>
          </div>

          <div className="vhdl-timeline-arrow">→</div>

          <div className="vhdl-timeline-item">
            <div className="vhdl-timeline-marker">4</div>
            <strong>Simulate</strong>
            <span>Verify</span>
          </div>

          <div className="vhdl-timeline-arrow">→</div>

          <div className="vhdl-timeline-item">
            <div className="vhdl-timeline-marker">5</div>
            <strong>Synthesize</strong>
            <span>Hardware</span>
          </div>

        </div>

        <div className="vhdl-intro-tool">
          <div className="vhdl-tool-icon">G</div>
          <div>
            <strong>Simulation with GHDL</strong>
            <p>
              In our website, the simulation step will use
              <strong> GHDL</strong> to execute VHDL testbenches.
            </p>
          </div>
        </div>
      </LessonSection>


      {/* TRY IT */}
      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Now try a complete VHDL AND gate simulation.
          The example contains both the design and its
          testbench.
        </p>

        <div className="vhdl-intro-tryit-label">
          <span>LIVE SIMULATION</span>
          <strong>Run the VHDL design and inspect the output</strong>
        </div>

        <TryIt
          title="VHDL AND Gate"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity AND_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end AND_GATE;

architecture Behavioral of AND_GATE is
begin
    Y <= A and B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity AND_GATE_TB is
end AND_GATE_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of AND_GATE_TB is

    signal A : std_logic := '0';
    signal B : std_logic := '0';
    signal Y : std_logic;

begin

    UUT : entity work.AND_GATE
        port map (
            A => A,
            B => B,
            Y => Y
        );

    process
    begin

        A <= '0';
        B <= '0';
        wait for 10 ns;

        report "A=0 B=0 Y=" & std_logic'image(Y);

        A <= '0';
        B <= '1';
        wait for 10 ns;

        report "A=0 B=1 Y=" & std_logic'image(Y);

        A <= '1';
        B <= '0';
        wait for 10 ns;

        report "A=1 B=0 Y=" & std_logic'image(Y);

        A <= '1';
        B <= '1';
        wait for 10 ns;

        report "A=1 B=1 Y=" & std_logic'image(Y);

        report "VHDL AND gate simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* TAKEAWAYS */}
      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-intro-summary">

          <div className="vhdl-summary-main">
            <span>VHDL</span>
            <p>
              A Hardware Description Language used to describe
              digital systems.
            </p>
          </div>

          <div className="vhdl-summary-grid">

            <div>
              <strong>Entity</strong>
              <span>External interface</span>
            </div>

            <div>
              <strong>Architecture</strong>
              <span>Implementation</span>
            </div>

            <div>
              <strong>Simulation</strong>
              <span>Design verification</span>
            </div>

            <div>
              <strong>GHDL</strong>
              <span>VHDL simulator</span>
            </div>

          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          You now have a basic understanding of VHDL.
          Next, we'll learn exactly what VHDL is and how
          it differs from ordinary programming languages.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default VHDL;