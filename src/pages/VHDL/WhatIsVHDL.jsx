import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import VHDLSidebar from "../../components/VHDLSidebar";

function WhatIsVHDL() {
  const sections = [
    {
      id: "what-is-vhdl",
      title: "What is VHDL?"
    },
    {
      id: "hardware-description-language",
      title: "Hardware Description Language"
    },
    {
      id: "vhdl-vs-programming",
      title: "VHDL vs Programming Languages"
    },
    {
      id: "structure-of-vhdl",
      title: "Structure of a VHDL Design"
    },
    {
      id: "entity-and-architecture",
      title: "Entity and Architecture"
    },
    {
      id: "concurrent-hardware",
      title: "Concurrent Hardware"
    },
    {
      id: "where-vhdl-is-used",
      title: "Where is VHDL Used?"
    },
    {
      id: "simple-example",
      title: "Simple VHDL Example"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="What is VHDL?"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Introduction"
      previousPath="/vhdl"
      nextLesson="Basic Syntax"
      nextPath="/vhdl/basic-syntax"
    >

      {/* WHAT IS VHDL */}

      <LessonSection
        id="what-is-vhdl"
        title="What is VHDL?"
      >
        <p>
          <strong>VHDL</strong> stands for
          <strong> Very High Speed Integrated Circuit Hardware
          Description Language</strong>.
        </p>

        <p>
          It is a Hardware Description Language used to describe
          the behavior and structure of digital electronic systems.
        </p>

        <p>
          VHDL allows engineers to describe hardware using text
          and then simulate that description before implementing
          it on an FPGA or as part of an ASIC design flow.
        </p>

        <LessonVisual
          type="diagram"
          caption="VHDL provides a way to describe digital hardware using a textual hardware description."
        >
          <div className="vhdl-definition-diagram">

            <div className="vhdl-definition-box">
              VHDL
              <br />
              Description
            </div>

            <div className="vhdl-definition-arrow">
              →
            </div>

            <div className="vhdl-definition-box">
              Digital
              <br />
              Hardware
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Simple Definition"
        >
          <p>
            VHDL is a language used to describe how digital
            hardware is structured and how it behaves.
          </p>
        </LearningNote>
      </LessonSection>


      {/* HDL */}

      <LessonSection
        id="hardware-description-language"
        title="Hardware Description Language"
      >
        <p>
          A Hardware Description Language, or
          <strong> HDL</strong>, is designed specifically for
          describing electronic hardware.
        </p>

        <p>
          Languages such as VHDL and Verilog allow engineers to
          describe circuits such as:
        </p>

        <ul>
          <li>Logic gates</li>
          <li>Multiplexers</li>
          <li>Adders</li>
          <li>Registers</li>
          <li>Counters</li>
          <li>Finite State Machines</li>
          <li>Processors</li>
          <li>Memory controllers</li>
        </ul>

        <LessonVisual
          type="diagram"
          caption="HDLs can describe hardware at different levels of complexity."
        >
          <div className="vhdl-hdl-levels">

            <div className="vhdl-hdl-level">
              Logic Gates
            </div>

            <div className="vhdl-hdl-arrow">
              →
            </div>

            <div className="vhdl-hdl-level">
              RTL
            </div>

            <div className="vhdl-hdl-arrow">
              →
            </div>

            <div className="vhdl-hdl-level">
              Digital System
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Think Hardware"
        >
          <p>
            When learning VHDL, always ask:
            <strong> "What hardware will this code describe?" </strong>
          </p>
        </LearningNote>
      </LessonSection>


      {/* VHDL VS PROGRAMMING */}

      <LessonSection
        id="vhdl-vs-programming"
        title="VHDL vs Programming Languages"
      >
        <p>
          VHDL looks similar to a programming language because it
          uses keywords, variables, expressions, and statements.
          However, its purpose is different.
        </p>

        <div className="vhdl-comparison-table">

          <div className="vhdl-comparison-header">
            <strong>VHDL</strong>
          </div>

          <div className="vhdl-comparison-header">
            <strong>Programming Language</strong>
          </div>

          <div className="vhdl-comparison-cell">
            Describes hardware
          </div>

          <div className="vhdl-comparison-cell">
            Describes software
          </div>

          <div className="vhdl-comparison-cell">
            Represents circuits and signals
          </div>

          <div className="vhdl-comparison-cell">
            Represents program data
          </div>

          <div className="vhdl-comparison-cell">
            Supports concurrent hardware behavior
          </div>

          <div className="vhdl-comparison-cell">
            Usually focuses on software execution
          </div>

          <div className="vhdl-comparison-cell">
            Can be synthesized into hardware
          </div>

          <div className="vhdl-comparison-cell">
            Normally compiled into software
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Important Difference"
        >
          <p>
            VHDL code should not be thought of simply as a normal
            software program. Its main purpose is to describe
            hardware.
          </p>
        </LearningNote>
      </LessonSection>


      {/* STRUCTURE */}

      <LessonSection
        id="structure-of-vhdl"
        title="Structure of a VHDL Design"
      >
        <p>
          A typical VHDL design is organized into several parts.
        </p>

        <p>
          Two of the most important parts are the
          <strong> entity </strong>
          and the
          <strong> architecture</strong>.
        </p>

        <LessonVisual
          type="diagram"
          caption="The entity and architecture form the core structure of a VHDL design."
        >
          <div className="vhdl-structure-diagram">

            <div className="vhdl-structure-box">
              <strong>Entity</strong>
              <br />
              External Interface
            </div>

            <div className="vhdl-structure-arrow">
              →
            </div>

            <div className="vhdl-structure-box">
              <strong>Architecture</strong>
              <br />
              Internal Implementation
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="Basic VHDL Structure">
{`entity design_name is

    port (
        input_signal  : in  std_logic;
        output_signal : out std_logic
    );

end design_name;


architecture Behavioral of design_name is

begin

    -- Hardware description

end Behavioral;`}
        </CodeExample>
      </LessonSection>


      {/* ENTITY ARCHITECTURE */}

      <LessonSection
        id="entity-and-architecture"
        title="Entity and Architecture"
      >
        <p>
          The <strong>entity</strong> describes the external
          interface of a design.
        </p>

        <p>
          It defines the inputs and outputs through ports.
        </p>

        <p>
          The <strong>architecture</strong> describes the internal
          behavior or structure of the design.
        </p>

        <LessonVisual
          type="diagram"
          caption="The entity is the outside view, while the architecture describes what happens inside."
        >
          <div className="vhdl-entity-architecture-visual">

            <div className="vhdl-entity-visual">

              <strong>ENTITY</strong>

              <div className="vhdl-port">
                Input A
              </div>

              <div className="vhdl-port">
                Input B
              </div>

              <div className="vhdl-port">
                Output Y
              </div>

            </div>

            <div className="vhdl-entity-arrow">
              →
            </div>

            <div className="vhdl-architecture-visual">

              <strong>ARCHITECTURE</strong>

              <div className="vhdl-internal-logic">
                Internal Logic
              </div>

            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Easy Way to Remember"
        >
          <p>
            <strong>Entity = What the outside world sees.</strong>
          </p>

          <p>
            <strong>
              Architecture = How the design works internally.
            </strong>
          </p>
        </LearningNote>
      </LessonSection>


      {/* CONCURRENT HARDWARE */}

      <LessonSection
        id="concurrent-hardware"
        title="Concurrent Hardware"
      >
        <p>
          One of the most important ideas when learning VHDL is
          <strong> concurrency</strong>.
        </p>

        <p>
          Digital hardware contains many elements that operate at
          the same time.
        </p>

        <LessonVisual
          type="diagram"
          caption="Multiple hardware operations can occur concurrently."
        >
          <div className="vhdl-concurrent-diagram">

            <div className="vhdl-concurrent-input">
              Inputs
            </div>

            <div className="vhdl-concurrent-arrow">
              →
            </div>

            <div className="vhdl-concurrent-blocks">

              <div className="vhdl-concurrent-block">
                AND Gate
              </div>

              <div className="vhdl-concurrent-block">
                OR Gate
              </div>

              <div className="vhdl-concurrent-block">
                Register
              </div>

            </div>

            <div className="vhdl-concurrent-arrow">
              →
            </div>

            <div className="vhdl-concurrent-output">
              Outputs
            </div>

          </div>
        </LessonVisual>

        <p>
          VHDL provides constructs that allow these hardware
          relationships to be described clearly.
        </p>

        <LearningNote
          type="info"
          title="Hardware Thinking"
        >
          <p>
            This is one reason HDL design is different from writing
            ordinary software.
          </p>
        </LearningNote>
      </LessonSection>


      {/* WHERE USED */}

      <LessonSection
        id="where-vhdl-is-used"
        title="Where is VHDL Used?"
      >
        <p>
          VHDL is used in several areas of digital hardware
          development.
        </p>

        <LessonVisual
          type="diagram"
          caption="Common areas where VHDL can be used."
        >
          <div className="vhdl-application-diagram">

            <div className="vhdl-application-box">
              FPGA Design
            </div>

            <div className="vhdl-application-box">
              RTL Design
            </div>

            <div className="vhdl-application-box">
              Simulation
            </div>

            <div className="vhdl-application-box">
              Verification
            </div>

            <div className="vhdl-application-box">
              Digital Systems
            </div>

            <div className="vhdl-application-box">
              Academic Projects
            </div>

          </div>
        </LessonVisual>

        <p>
          It is particularly important to understand VHDL if you
          plan to work with FPGA-based digital design.
        </p>
      </LessonSection>


      {/* SIMPLE EXAMPLE */}

      <LessonSection
        id="simple-example"
        title="Simple VHDL Example"
      >
        <p>
          Let's look at a simple AND gate.
        </p>

        <LessonVisual
          type="diagram"
          caption="An AND gate produces 1 only when both inputs are 1."
        >
          <div className="vhdl-and-gate-diagram">

            <div className="vhdl-and-inputs">

              <div>
                A
              </div>

              <div>
                B
              </div>

            </div>

            <div className="vhdl-and-arrow">
              →
            </div>

            <div className="vhdl-and-gate">
              AND
            </div>

            <div className="vhdl-and-arrow">
              →
            </div>

            <div className="vhdl-and-output">
              Y
            </div>

          </div>
        </LessonVisual>

        <CodeExample title="AND Gate in VHDL">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity and_gate is

    port (
        A : in  std_logic;
        B : in  std_logic;
        Y : out std_logic
    );

end and_gate;


architecture Behavioral of and_gate is

begin

    Y <= A and B;

end Behavioral;`}
        </CodeExample>

        <p>
          The statement:
        </p>

        <CodeExample>
{`Y <= A and B;`}
        </CodeExample>

        <p>
          describes the AND operation between inputs
          <code>A</code> and <code>B</code>, with the result assigned
          to output <code>Y</code>.
        </p>

        <LearningNote
          type="info"
          title="Notice"
        >
          <p>
            The same hardware concept can be described using
            different HDLs. You learned how to describe an AND gate
            using Verilog earlier; here we are describing the same
            hardware using VHDL.
          </p>
        </LearningNote>
      </LessonSection>


      {/* TAKEAWAYS */}

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>VHDL is a Hardware Description Language.</li>
          <li>VHDL is used to describe digital hardware.</li>
          <li>VHDL is different from ordinary programming languages.</li>
          <li>An entity describes the external interface.</li>
          <li>An architecture describes the implementation.</li>
          <li>VHDL supports concurrent hardware behavior.</li>
          <li>VHDL can be used for RTL and FPGA development.</li>
          <li>VHDL designs can be simulated before hardware implementation.</li>
        </ul>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          <p>
            Now that you understand what VHDL is, the next lesson
            will introduce the basic syntax and structure used when
            writing VHDL code.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default WhatIsVHDL;