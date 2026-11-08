import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function BasicSyntax() {
  const sections = [
    {
      id: "overview",
      title: "What You Will Learn"
    },
    {
      id: "library",
      title: "Library and Use"
    },
    {
      id: "entity",
      title: "Entity"
    },
    {
      id: "architecture",
      title: "Architecture"
    },
    {
      id: "ports",
      title: "Ports"
    },
    {
      id: "signals",
      title: "Signals"
    },
    {
      id: "complete",
      title: "Complete VHDL Structure"
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
      title="VHDL Basic Syntax"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="What is VHDL?"
      previousPath="/vhdl/what-is-vhdl"
      nextLesson="Entity"
      nextPath="/vhdl/entity"
    >

      {/* ========================================
          1. OVERVIEW
      ======================================== */}

      <LessonSection
        id="overview"
        title="1. What You Will Learn"
      >
        <p className="lesson-intro">
          Before writing larger VHDL designs, you need to
          understand the basic structure of a VHDL design.
        </p>

        <p>
          A typical VHDL design contains an entity and an
          architecture. Libraries and packages provide the
          definitions needed by the design.
        </p>

        <div className="vhdl-basic-structure">

          <div className="vhdl-basic-structure-item">
            <div className="vhdl-basic-number">01</div>
            <div>
              <strong>Library</strong>
              <span>Packages and definitions</span>
            </div>
          </div>

          <div className="vhdl-basic-connector">→</div>

          <div className="vhdl-basic-structure-item">
            <div className="vhdl-basic-number">02</div>
            <div>
              <strong>Entity</strong>
              <span>External interface</span>
            </div>
          </div>

          <div className="vhdl-basic-connector">→</div>

          <div className="vhdl-basic-structure-item">
            <div className="vhdl-basic-number">03</div>
            <div>
              <strong>Architecture</strong>
              <span>Hardware implementation</span>
            </div>
          </div>

          <div className="vhdl-basic-connector">→</div>

          <div className="vhdl-basic-structure-item">
            <div className="vhdl-basic-number">04</div>
            <div>
              <strong>Simulation</strong>
              <span>Verify behavior</span>
            </div>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Basic Idea"
        >
          Think of the entity as the outside
          interface of your circuit and the
          architecture as the implementation
          inside it.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          2. LIBRARY
      ======================================== */}

      <LessonSection
        id="library"
        title="2. Library and Use"
      >
        <p>
          VHDL libraries contain packages that provide useful
          definitions and functionality.
        </p>

        <p>
          The IEEE library is commonly used when describing
          digital hardware.
        </p>

        <CodeExample title="IEEE Library">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;`}
        </CodeExample>

        <div className="vhdl-basic-library-card">

          <div className="vhdl-basic-library-icon">
            IEEE
          </div>

          <div className="vhdl-basic-library-content">
            <strong>STD_LOGIC_1164</strong>

            <span>
              Provides commonly used digital logic types
              such as std_logic and std_logic_vector.
            </span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Remember"
        >
          When using <code>std_logic</code>, include the
          appropriate IEEE package.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          3. ENTITY
      ======================================== */}

      <LessonSection
        id="entity"
        title="3. Entity"
      >
        <p>
          The entity defines the external interface of a
          VHDL design.
        </p>

        <p>
          Inputs and outputs are declared using ports.
        </p>

        <CodeExample title="Entity Syntax">
{`entity circuit_name is

    port (
        input1  : in  std_logic;
        input2  : in  std_logic;
        output1 : out std_logic
    );

end circuit_name;`}
        </CodeExample>

        <div className="vhdl-entity-mini-diagram">

          <div className="vhdl-entity-side">
            <span>INPUT</span>
            <strong>A</strong>
          </div>

          <div className="vhdl-entity-line"></div>

          <div className="vhdl-entity-chip">
            <small>VHDL DESIGN</small>
            <strong>ENTITY</strong>
            <span>Interface</span>
          </div>

          <div className="vhdl-entity-line"></div>

          <div className="vhdl-entity-side">
            <span>OUTPUT</span>
            <strong>Y</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Hardware View"
        >
          An entity is similar to the pins of a hardware
          component. It tells other parts of the design how
          to connect to the circuit.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          4. ARCHITECTURE
      ======================================== */}

      <LessonSection
        id="architecture"
        title="4. Architecture"
      >
        <p>
          The architecture describes the internal behavior
          or structure of an entity.
        </p>

        <CodeExample title="Architecture Syntax">
{`architecture Behavioral of circuit_name is

begin

    -- hardware description

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-basic-architecture-card">

          <div className="vhdl-basic-architecture-part entity-part">
            <span>OUTSIDE</span>
            <strong>ENTITY</strong>
            <small>Ports & interface</small>
          </div>

          <div className="vhdl-basic-architecture-arrow">
            →
          </div>

          <div className="vhdl-basic-architecture-part architecture-part">
            <span>INSIDE</span>
            <strong>ARCHITECTURE</strong>
            <small>Hardware behavior</small>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Simple Rule"
        >
          <strong>Entity = Interface</strong>
          
          <strong>Architecture = Implementation</strong>
        </LearningNote>
      </LessonSection>


      {/* ========================================
          5. PORTS
      ======================================== */}

      <LessonSection
        id="ports"
        title="5. Ports"
      >
        <p>
          Ports define how signals enter and leave a VHDL
          component.
        </p>

        <div className="vhdl-port-types">

          <div className="vhdl-port-card">
            <div className="vhdl-port-badge">IN</div>
            <strong>Input</strong>
            <span>
              Signal enters the design.
            </span>
          </div>

          <div className="vhdl-port-card">
            <div className="vhdl-port-badge">OUT</div>
            <strong>Output</strong>
            <span>
              Signal leaves the design.
            </span>
          </div>

          <div className="vhdl-port-card">
            <div className="vhdl-port-badge">INOUT</div>
            <strong>Bidirectional</strong>
            <span>
              Signal can travel both directions.
            </span>
          </div>

        </div>

        <CodeExample title="Port Example">
{`entity example is

    port (
        A   : in  std_logic;
        B   : in  std_logic;
        SEL : in  std_logic;
        Y   : out std_logic
    );

end example;`}
        </CodeExample>
      </LessonSection>


      {/* ========================================
          6. SIGNALS
      ======================================== */}

      <LessonSection
        id="signals"
        title="6. Signals"
      >
        <p>
          Signals represent connections between different
          parts of a VHDL design.
        </p>

        <CodeExample title="Signal Declaration">
{`architecture Behavioral of example is

    signal temp : std_logic;

begin

    temp <= A xor B;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-signal-flow">

          <div className="vhdl-signal-node">
            <span>INPUT</span>
            <strong>A</strong>
          </div>

          <div className="vhdl-signal-operator">
            XOR
          </div>

          <div className="vhdl-signal-node">
            <span>INPUT</span>
            <strong>B</strong>
          </div>

          <div className="vhdl-signal-arrow">
            →
          </div>

          <div className="vhdl-signal-node signal-result">
            <span>SIGNAL</span>
            <strong>temp</strong>
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Important"
        >
          Signals are commonly used to model hardware
          connections and communicate between concurrent
          parts of a design.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          7. COMPLETE STRUCTURE
      ======================================== */}

      <LessonSection
        id="complete"
        title="7. Complete VHDL Structure"
      >
        <p>
          Let's combine the basic elements into a complete
          VHDL design.
        </p>

        <CodeExample title="Complete XOR Gate">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity XOR_GATE is

    port (
        A : in  std_logic;
        B : in  std_logic;
        Y : out std_logic
    );

end XOR_GATE;


architecture Behavioral of XOR_GATE is

begin

    Y <= A xor B;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-complete-design">

          <div className="vhdl-complete-header">
            <span>VHDL DESIGN</span>
            <strong>XOR_GATE</strong>
          </div>

          <div className="vhdl-complete-body">

            <div className="vhdl-complete-section">
              <span>INTERFACE</span>
              <strong>ENTITY</strong>
              <small>A, B → Y</small>
            </div>

            <div className="vhdl-complete-divider">
              +
            </div>

            <div className="vhdl-complete-section">
              <span>IMPLEMENTATION</span>
              <strong>ARCHITECTURE</strong>
              <small>Y = A XOR B</small>
            </div>

          </div>

        </div>

        <LearningNote
          type="success"
          title="You Have the Structure"
        >
          You now know the basic building blocks needed to
          start writing VHDL designs.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          8. TRY IT
      ======================================== */}

      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Now simulate an XOR gate. The example contains both
          the hardware design and its testbench.
        </p>

        <TryIt
          title="VHDL XOR Gate"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity XOR_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end XOR_GATE;

architecture Behavioral of XOR_GATE is
begin
    Y <= A xor B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity XOR_GATE_TB is
end XOR_GATE_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of XOR_GATE_TB is

    signal A : std_logic := '0';
    signal B : std_logic := '0';
    signal Y : std_logic;

begin

    UUT : entity work.XOR_GATE
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

        report "VHDL XOR gate simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* ========================================
          9. TAKEAWAYS
      ======================================== */}

      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-basic-takeaways">

          <div>
            <strong>Library</strong>
            <span>
              Provides packages and definitions.
            </span>
          </div>

          <div>
            <strong>Entity</strong>
            <span>
              Defines the external interface.
            </span>
          </div>

          <div>
            <strong>Architecture</strong>
            <span>
              Describes the implementation.
            </span>
          </div>

          <div>
            <strong>Ports</strong>
            <span>
              Define inputs and outputs.
            </span>
          </div>

          <div>
            <strong>Signals</strong>
            <span>
              Represent internal connections.
            </span>
          </div>

          <div>
            <strong>Simulation</strong>
            <span>
              Helps verify the design.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll take a deeper look at the
           Entity and learn how to define
          hardware interfaces properly.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default BasicSyntax;