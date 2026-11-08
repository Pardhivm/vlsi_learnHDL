import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";
import LessonVisual from "../../components/LessonVisual";

function Architecture() {
  const sections = [
    {
      id: "overview",
      title: "What is an Architecture?"
    },
    {
      id: "purpose",
      title: "Purpose of Architecture"
    },
    {
      id: "syntax",
      title: "Architecture Syntax"
    },
    {
      id: "declaration",
      title: "Declaration Area"
    },
    {
      id: "behavioral",
      title: "Behavioral Architecture"
    },
    {
      id: "structural",
      title: "Structural Architecture"
    },
    {
      id: "example",
      title: "Complete Example"
    },
    {
      id: "tryit",
      title: "Try It Yourself"
    },
    {
      id: "takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="VHDL Architecture"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Basic Syntax"
      previousPath="/vhdl/basic-syntax"
      nextLesson="Signals"
      nextPath="/vhdl/signals"
    >

      {/* ==================================================
          1. OVERVIEW
          ================================================== */}

      <LessonSection
        id="overview"
        title="1. What is an Architecture?"
      >
        <p className="lesson-intro">
          An architecture describes the internal behavior or
          structure of a VHDL entity.
        </p>

        <p>
          If the entity represents the outside of a hardware
          component, the architecture represents what is
          happening inside that component.
        </p>

        <div className="vhdl-arch-inside-diagram">

          <div className="vhdl-arch-external">

            <div className="vhdl-arch-label">
              OUTSIDE
            </div>

            <strong>ENTITY</strong>

            <div className="vhdl-arch-pins">
              <span>A</span>
              <span>B</span>
              <span>Y</span>
            </div>

          </div>

          <div className="vhdl-arch-arrow">
            →
          </div>

          <div className="vhdl-arch-internal">

            <div className="vhdl-arch-label">
              INSIDE
            </div>

            <strong>ARCHITECTURE</strong>

            <div className="vhdl-arch-logic">
              Hardware Logic
            </div>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Easy Way to Remember"
        >
          <strong>Entity</strong> describes the interface.
          <br />
          <strong>Architecture</strong> describes the
          implementation.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. PURPOSE
          ================================================== */}

      <LessonSection
        id="purpose"
        title="2. Purpose of Architecture"
      >
        <p>
          The architecture is where we describe how the
          hardware should behave or how its components are
          connected.
        </p>

        <div className="vhdl-arch-purpose-grid">

          <div className="vhdl-arch-purpose-card">

            <div className="vhdl-arch-purpose-number">
              01
            </div>

            <div>
              <strong>Describe Behavior</strong>

              <span>
                Define what the circuit should do.
              </span>
            </div>

          </div>

          <div className="vhdl-arch-purpose-card">

            <div className="vhdl-arch-purpose-number">
              02
            </div>

            <div>
              <strong>Define Logic</strong>

              <span>
                Describe relationships between signals.
              </span>
            </div>

          </div>

          <div className="vhdl-arch-purpose-card">

            <div className="vhdl-arch-purpose-number">
              03
            </div>

            <div>
              <strong>Connect Components</strong>

              <span>
                Build larger designs from smaller blocks.
              </span>
            </div>

          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          3. SYNTAX
          ================================================== */}

      <LessonSection
        id="syntax"
        title="3. Architecture Syntax"
      >
        <p>
          The basic structure of an architecture is:
        </p>

        <CodeExample title="Architecture Structure">
{`architecture architecture_name of entity_name is

    -- declarations

begin

    -- hardware description

end architecture_name;`}
        </CodeExample>

        <div className="vhdl-arch-code-anatomy">

          <div className="vhdl-arch-code-row">

            <div className="vhdl-arch-code-tag">
              01
            </div>

            <code>architecture architecture_name</code>

            <span>
              Architecture name
            </span>

          </div>

          <div className="vhdl-arch-code-row">

            <div className="vhdl-arch-code-tag">
              02
            </div>

            <code>of entity_name</code>

            <span>
              Entity being implemented
            </span>

          </div>

          <div className="vhdl-arch-code-row">

            <div className="vhdl-arch-code-tag">
              03
            </div>

            <code>declarations</code>

            <span>
              Internal declarations
            </span>

          </div>

          <div className="vhdl-arch-code-row">

            <div className="vhdl-arch-code-tag">
              04
            </div>

            <code>begin</code>

            <span>
              Starts implementation
            </span>

          </div>

          <div className="vhdl-arch-code-row">

            <div className="vhdl-arch-code-tag">
              05
            </div>

            <code>hardware description</code>

            <span>
              Actual hardware logic
            </span>

          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          4. DECLARATION
          ================================================== */}

      <LessonSection
        id="declaration"
        title="4. Declaration Area"
      >
        <p>
          The declaration area is located between the
          architecture header and the <code>begin</code>
          keyword.
        </p>

        <p>
          This area can contain internal signals, constants,
          components, and other declarations.
        </p>

        <div className="vhdl-arch-code-block">

          <div className="vhdl-arch-code-header">
            ARCHITECTURE
          </div>

          <div className="vhdl-arch-code-content">

            <div className="vhdl-arch-highlight">
              <span>DECLARATIONS</span>

              <code>
                signal temp : std_logic;
              </code>

              <code>
                constant WIDTH : integer := 8;
              </code>
            </div>

            <div className="vhdl-arch-begin">
              begin
            </div>

            <div className="vhdl-arch-implementation">
              <span>IMPLEMENTATION</span>

              <code>
                Y &lt;= A xor B;
              </code>
            </div>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Remember"
        >
          Declarations come <strong>before</strong>
          <code>begin</code>. Hardware statements come
          <strong>after</strong> <code>begin</code>.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          5. BEHAVIORAL
          ================================================== */}

      <LessonSection
        id="behavioral"
        title="5. Behavioral Architecture"
      >
        <p>
          A behavioral architecture describes what the
          hardware does without explicitly describing every
          internal component.
        </p>

        <CodeExample title="Behavioral NAND Gate">
{`architecture Behavioral of NAND_GATE is

begin

    Y <= A nand B;

end Behavioral;`}
        </CodeExample>

       <LessonVisual
          type="diagram"
          src="/diagrams/nandgate.png"
        />
        <p>
          The statement:
        </p>

        <CodeExample title="Hardware Behavior">
{`Y <= A nand B;`}
        </CodeExample>

        <p>
          directly describes the required logic behavior.
        </p>
      </LessonSection>


      {/* ==================================================
          6. STRUCTURAL
          ================================================== */}

      <LessonSection
        id="structural"
        title="6. Structural Architecture"
      >
        <p>
          A structural architecture describes a circuit by
          connecting components together.
        </p>

        <div className="vhdl-arch-structural-diagram">

          <div className="vhdl-arch-structural-input">
            A
          </div>

          <div className="vhdl-arch-structural-line"></div>

          <div className="vhdl-arch-component">
            <small>U1</small>
            <strong>GATE</strong>
          </div>

          <div className="vhdl-arch-structural-line"></div>

          <div className="vhdl-arch-structural-output">
            Y
          </div>

        </div>

        <CodeExample title="Structural Architecture">
{`architecture Structural of example is

    component SOME_GATE
        port (
            A : in  std_logic;
            Y : out std_logic
        );
    end component;

begin

    U1 : SOME_GATE
        port map (
            A => A,
            Y => Y
        );

end Structural;`}
        </CodeExample>

        <div className="vhdl-arch-comparison">

          <div className="vhdl-arch-comparison-card">

            <div className="vhdl-arch-comparison-title">
              BEHAVIORAL
            </div>

            <strong>
              What does it do?
            </strong>

            <span>
              Describes the behavior of the circuit.
            </span>

          </div>

          <div className="vhdl-arch-comparison-card">

            <div className="vhdl-arch-comparison-title">
              STRUCTURAL
            </div>

            <strong>
              How is it connected?
            </strong>

            <span>
              Describes components and their connections.
            </span>

          </div>

        </div>

        <LearningNote
          type="info"
          title="We'll Go Deeper Later"
        >
          Component declarations and component
          instantiation are covered in the
          <strong> Components</strong> lesson.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          7. COMPLETE EXAMPLE
          ================================================== */}

      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Let's create a complete NAND gate using an entity
          and a behavioral architecture.
        </p>

        <CodeExample title="Complete NAND Gate">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NAND_GATE is

    port (
        A : in  std_logic;
        B : in  std_logic;
        Y : out std_logic
    );

end NAND_GATE;


architecture Behavioral of NAND_GATE is

begin

    Y <= A nand B;

end Behavioral;`}
        </CodeExample>

       <LessonVisual
          type="diagram"
          src="/diagrams/noorgate.png"
        />
        <p>
          The architecture contains the actual logic:
        </p>

        <CodeExample title="Architecture Logic">
{`Y <= A nand B;`}
        </CodeExample>
      </LessonSection>


      {/* ==================================================
          8. TRY IT
          ================================================== */}

      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the NAND gate below and observe how the
          architecture describes the circuit behavior.
        </p>

        <TryIt
          title="VHDL NAND Gate"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NAND_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end NAND_GATE;

architecture Behavioral of NAND_GATE is
begin
    Y <= A nand B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NAND_GATE_TB is
end NAND_GATE_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of NAND_GATE_TB is

    signal A : std_logic := '0';
    signal B : std_logic := '0';
    signal Y : std_logic;

begin

    UUT : entity work.NAND_GATE
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

        report "VHDL NAND gate simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* ==================================================
          9. TAKEAWAYS
          ================================================== */}

      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-architecture-takeaways">

          <div>
            <strong>Architecture</strong>
            <span>
              Describes the implementation of an entity.
            </span>
          </div>

          <div>
            <strong>Declaration Area</strong>
            <span>
              Contains internal declarations.
            </span>
          </div>

          <div>
            <strong>begin</strong>
            <span>
              Starts the implementation section.
            </span>
          </div>

          <div>
            <strong>Behavioral</strong>
            <span>
              Describes what the hardware does.
            </span>
          </div>

          <div>
            <strong>Structural</strong>
            <span>
              Describes component connections.
            </span>
          </div>

          <div>
            <strong>Entity + Architecture</strong>
            <span>
              Together describe a complete design unit.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Signals and how they are used
          to represent connections inside a VHDL design.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Architecture;