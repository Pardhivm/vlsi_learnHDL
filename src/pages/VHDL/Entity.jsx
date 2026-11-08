import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Entity() {
  const sections = [
    {
      id: "overview",
      title: "What is an Entity?"
    },
    {
      id: "purpose",
      title: "Purpose of an Entity"
    },
    {
      id: "syntax",
      title: "Entity Syntax"
    },
    {
      id: "ports",
      title: "Ports"
    },
    {
      id: "directions",
      title: "Port Directions"
    },
    {
      id: "example",
      title: "Entity Example"
    },
    {
      id: "architecture",
      title: "Entity and Architecture"
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
      title="VHDL Entity"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Basic Syntax"
      previousPath="/vhdl/basic-syntax"
      nextLesson="Architecture"
      nextPath="/vhdl/architecture"
    >

      {/* ========================================
          1. OVERVIEW
      ======================================== */}

      <LessonSection
        id="overview"
        title="1. What is an Entity?"
      >
        <p className="lesson-intro">
          An entity defines the external interface of a VHDL
          design. It tells the outside world which signals
          enter and leave the circuit.
        </p>

        <p>
          The internal implementation is not normally defined
          inside the entity. That job belongs to the
          architecture.
        </p>

        <div className="vhdl-entity-overview">

          <div className="vhdl-entity-port-column">

            <div className="vhdl-entity-port input">
              <span>IN</span>
              <strong>A</strong>
            </div>

            <div className="vhdl-entity-port input">
              <span>IN</span>
              <strong>B</strong>
            </div>

          </div>


          <div className="vhdl-entity-main">

            <div className="vhdl-entity-main-label">
              VHDL DESIGN
            </div>

            <strong>ENTITY</strong>

            <small>
              External Interface
            </small>

          </div>


          <div className="vhdl-entity-port-column">

            <div className="vhdl-entity-port output">
              <span>OUT</span>
              <strong>Y</strong>
            </div>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Think of It Like This"
        >
          The entity is like the outside view of an IC.
          It tells you about the pins without showing you
          how the internal circuit is built.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          2. PURPOSE
      ======================================== */}

      <LessonSection
        id="purpose"
        title="2. Purpose of an Entity"
      >
        <p>
          An entity provides a clear interface between a
          VHDL design and the rest of the system.
        </p>

        <div className="vhdl-entity-purpose-grid">

          <div>
            <div className="vhdl-entity-purpose-icon">
              IN
            </div>

            <strong>Inputs</strong>

            <span>
              Signals entering the design.
            </span>
          </div>

          <div>
            <div className="vhdl-entity-purpose-icon">
              OUT
            </div>

            <strong>Outputs</strong>

            <span>
              Signals leaving the design.
            </span>
          </div>

          <div>
            <div className="vhdl-entity-purpose-icon">
              I/O
            </div>

            <strong>Interface</strong>

            <span>
              Defines how the design connects.
            </span>
          </div>

        </div>
      </LessonSection>


      {/* ========================================
          3. SYNTAX
      ======================================== */}

      <LessonSection
        id="syntax"
        title="3. Entity Syntax"
      >
        <p>
          The general syntax of an entity is:
        </p>

        <CodeExample title="Entity Structure">
{`entity entity_name is

    port (
        signal_name : direction data_type
    );

end entity_name;`}
        </CodeExample>

        <div className="vhdl-entity-syntax-breakdown">

          <div>
            <code>entity_name</code>
            <span>
              Name of the design
            </span>
          </div>

          <div>
            <code>port</code>
            <span>
              Defines external signals
            </span>
          </div>

          <div>
            <code>direction</code>
            <span>
              in, out, or inout
            </span>
          </div>

          <div>
            <code>data_type</code>
            <span>
              std_logic, vector, etc.
            </span>
          </div>

        </div>
      </LessonSection>


      {/* ========================================
          4. PORTS
      ======================================== */}

      <LessonSection
        id="ports"
        title="4. Ports"
      >
        <p>
          Ports are signals declared in the entity that
          connect the design to the outside world.
        </p>

        <CodeExample title="Port Declaration">
{`port (
    A : in  std_logic;
    B : in  std_logic;
    Y : out std_logic
);`}
        </CodeExample>

        <div className="vhdl-entity-port-map">

          <div className="vhdl-entity-port-map-side">

            <span>INPUT PORTS</span>

            <strong>A</strong>
            <strong>B</strong>

          </div>

          <div className="vhdl-entity-port-map-chip">

            <small>ENTITY</small>
            <strong>LOGIC</strong>

          </div>

          <div className="vhdl-entity-port-map-side output-side">

            <span>OUTPUT PORT</span>

            <strong>Y</strong>

          </div>

        </div>
      </LessonSection>


      {/* ========================================
          5. DIRECTIONS
      ======================================== */}

      <LessonSection
        id="directions"
        title="5. Port Directions"
      >
        <p>
          VHDL provides different directions for describing
          how signals interact with a design.
        </p>

        <div className="vhdl-entity-directions">

          <div className="vhdl-entity-direction">

            <div className="direction-arrow">
              →
            </div>

            <strong>in</strong>

            <span>
              Signal enters the design.
            </span>

          </div>


          <div className="vhdl-entity-direction">

            <div className="direction-arrow">
              ←
            </div>

            <strong>out</strong>

            <span>
              Signal leaves the design.
            </span>

          </div>


          <div className="vhdl-entity-direction">

            <div className="direction-arrow">
              ↔
            </div>

            <strong>inout</strong>

            <span>
              Signal can travel in both directions.
            </span>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Most Common"
        >
          For basic RTL designs, <code>in</code> and
          <code>out</code> are the directions you will use
          most frequently.
        </LearningNote>
      </LessonSection>


      {/* ========================================
          6. EXAMPLE
      ======================================== */}

      <LessonSection
        id="example"
        title="6. Entity Example"
      >
        <p>
          Here is an entity for a simple NOT gate.
        </p>

        <CodeExample title="NOT Gate Entity">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOT_GATE is

    port (
        A : in  std_logic;
        Y : out std_logic
    );

end NOT_GATE;`}
        </CodeExample>

        <div className="vhdl-not-entity-diagram">

          <div className="vhdl-not-input">
            <span>INPUT</span>
            <strong>A</strong>
          </div>

          <div className="vhdl-not-wire"></div>

          <div className="vhdl-not-gate">
            <strong>NOT</strong>
          </div>

          <div className="vhdl-not-wire"></div>

          <div className="vhdl-not-output">
            <span>OUTPUT</span>
            <strong>Y</strong>
          </div>

        </div>

        <p>
          Notice that the entity only defines the interface.
          It does not yet describe how the NOT operation is
          implemented.
        </p>
      </LessonSection>


      {/* ========================================
          7. ENTITY + ARCHITECTURE
      ======================================== */}

      <LessonSection
        id="architecture"
        title="7. Entity and Architecture"
      >
        <p>
          A complete VHDL design normally combines an entity
          with an architecture.
        </p>

        <div className="vhdl-entity-architecture">

          <div className="vhdl-ea-card">

            <span>OUTSIDE VIEW</span>

            <strong>ENTITY</strong>

            <small>
              Inputs + Outputs
            </small>

          </div>

          <div className="vhdl-ea-connector">
            →
          </div>

          <div className="vhdl-ea-card">

            <span>INSIDE VIEW</span>

            <strong>ARCHITECTURE</strong>

            <small>
              Hardware behavior
            </small>

          </div>

        </div>

        <CodeExample title="Entity + Architecture">
{`entity NOT_GATE is

    port (
        A : in  std_logic;
        Y : out std_logic
    );

end NOT_GATE;


architecture Behavioral of NOT_GATE is

begin

    Y <= not A;

end Behavioral;`}
        </CodeExample>

        <LearningNote
          type="success"
          title="Key Concept"
        >
          The entity describes what connects to the
          circuit, while the architecture describes
          what the circuit does.
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
          Now simulate the NOT gate. Try changing the VHDL
          logic or the testbench inputs and observe the output.
        </p>

        <TryIt
          title="VHDL NOT Gate"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOT_GATE is
    port (
        A : in std_logic;
        Y : out std_logic
    );
end NOT_GATE;

architecture Behavioral of NOT_GATE is
begin
    Y <= not A;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOT_GATE_TB is
end NOT_GATE_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of NOT_GATE_TB is

    signal A : std_logic := '0';
    signal Y : std_logic;

begin

    UUT : entity work.NOT_GATE
        port map (
            A => A,
            Y => Y
        );

    process
    begin

        A <= '0';
        wait for 10 ns;

        report "A=0 Y=" & std_logic'image(Y);

        A <= '1';
        wait for 10 ns;

        report "A=1 Y=" & std_logic'image(Y);

        report "VHDL NOT gate simulation completed!";

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
        <div className="vhdl-entity-takeaways">

          <div>
            <strong>Entity</strong>
            <span>
              Defines the external interface.
            </span>
          </div>

          <div>
            <strong>Ports</strong>
            <span>
              Connect the design to the outside world.
            </span>
          </div>

          <div>
            <strong>in</strong>
            <span>
              Defines an input port.
            </span>
          </div>

          <div>
            <strong>out</strong>
            <span>
              Defines an output port.
            </span>
          </div>

          <div>
            <strong>inout</strong>
            <span>
              Defines a bidirectional port.
            </span>
          </div>

          <div>
            <strong>Architecture</strong>
            <span>
              Describes the internal implementation.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Now that you understand the VHDL entity, the next
          step is learning how the
           architecture describes the
          internal hardware.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Entity;