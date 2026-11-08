import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";
import LessonVisual from "../../components/LessonVisual";

function Signals() {
  const sections = [
    {
      id: "overview",
      title: "What is a Signal?"
    },
    {
      id: "purpose",
      title: "Why Use Signals?"
    },
    {
      id: "declaration",
      title: "Signal Declaration"
    },
    {
      id: "assignment",
      title: "Signal Assignment"
    },
    {
      id: "hardware",
      title: "Signals in Hardware"
    },
    {
      id: "multiple",
      title: "Multiple Signals"
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
      title="VHDL Signals"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Architecture"
      previousPath="/vhdl/architecture"
      nextLesson="Data Types"
      nextPath="/vhdl/data-types"
    >

      {/* ==================================================
          1. OVERVIEW
          ================================================== */}

      <LessonSection
        id="overview"
        title="1. What is a Signal?"
      >
        <p className="lesson-intro">
          A signal is one of the most important concepts in
          VHDL. Signals are used to represent connections and
          values that exist in a hardware design.
        </p>

        <p>
          A signal can connect different parts of a circuit,
          carry an input or output value, or represent an
          internal connection.
        </p>

        <div className="vhdl-signal-overview">

          <div className="vhdl-signal-terminal">
            <span>INPUT</span>
            <strong>A</strong>
          </div>

          <div className="vhdl-signal-wire">
            <span></span>
          </div>

          <div className="vhdl-signal-chip">

            <small>HARDWARE</small>

            <strong>LOGIC</strong>

          </div>

          <div className="vhdl-signal-wire">
            <span></span>
          </div>

          <div className="vhdl-signal-terminal">
            <span>SIGNAL</span>
            <strong>Y</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Think of a Signal as a Wire"
        >
          In a hardware design, a signal can be thought of
          as a connection that carries a value from one part
          of the circuit to another.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. PURPOSE
          ================================================== */}

      <LessonSection
        id="purpose"
        title="2. Why Use Signals?"
      >
        <p>
          Signals allow different parts of a VHDL design to
          communicate with each other.
        </p>

        <div className="vhdl-signal-purpose">

          <div className="vhdl-signal-purpose-card">

            <div className="vhdl-signal-purpose-icon">
              ↔
            </div>

            <div>
              <strong>Connect Logic</strong>

              <span>
                Connect different parts of a hardware design.
              </span>
            </div>

          </div>

          <div className="vhdl-signal-purpose-card">

            <div className="vhdl-signal-purpose-icon">
              →
            </div>

            <div>
              <strong>Carry Values</strong>

              <span>
                Transport digital values between components.
              </span>
            </div>

          </div>

          <div className="vhdl-signal-purpose-card">

            <div className="vhdl-signal-purpose-icon">
              +
            </div>

            <div>
              <strong>Internal Connections</strong>

              <span>
                Represent connections inside an architecture.
              </span>
            </div>

          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          3. DECLARATION
          ================================================== */}

      <LessonSection
        id="declaration"
        title="3. Signal Declaration"
      >
        <p>
          Signals are normally declared in the declaration
          section of an architecture.
        </p>

        <CodeExample title="Signal Declaration">
{`architecture Behavioral of example is

    signal temp : std_logic;

begin

    -- hardware description

end Behavioral;`}
        </CodeExample>

        <p>
          The general form is:
        </p>

        <CodeExample title="General Syntax">
{`signal signal_name : data_type;`}
        </CodeExample>

        <div className="vhdl-signal-syntax">

          <div>
            <code>signal</code>

            <span>
              Keyword used to declare a signal.
            </span>
          </div>

          <div>
            <code>signal_name</code>

            <span>
              Name of the signal.
            </span>
          </div>

          <div>
            <code>data_type</code>

            <span>
              Type of value carried by the signal.
            </span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Example"
        >
          A signal can be a single bit such as
          <code> std_logic</code> or a vector such as
          <code> std_logic_vector</code>.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          4. ASSIGNMENT
          ================================================== */}

      <LessonSection
        id="assignment"
        title="4. Signal Assignment"
      >
        <p>
          The <code>&lt;=</code> operator is used to assign
          a value to a signal.
        </p>

        <CodeExample title="Signal Assignment">
{`signal Y : std_logic;

Y <= A;`}
        </CodeExample>

        <p>
          Signals can also be assigned using logic
          expressions.
        </p>

        <CodeExample title="Logic Assignment">
{`Y <= A and B;

Z <= A xor B;

Q <= not A;`}
        </CodeExample>

        <div className="vhdl-signal-assignment">

          <div className="vhdl-signal-value">
            <span>A</span>
          </div>

          <div className="vhdl-signal-assignment-line">
            →
          </div>

          <div className="vhdl-signal-assignment-box">
            <code>Y &lt;= A;</code>
          </div>

          <div className="vhdl-signal-assignment-line">
            →
          </div>

          <div className="vhdl-signal-value">
            <span>Y</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          In VHDL, <code>&lt;=</code> is the signal assignment
          operator.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          5. HARDWARE
          ================================================== */}

      <LessonSection
        id="hardware"
        title="5. Signals in Hardware"
      >
        <p>
          Signals have a direct hardware interpretation.
          They can represent wires connecting different
          pieces of logic.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/norgate.png"
          />

        <CodeExample title="Hardware Description">
{`signal Y : std_logic;

Y <= A nor B;`}
        </CodeExample>

        <p>
          Here, the signal <code>Y</code> represents the
          output connection of the NOR logic.
        </p>
      </LessonSection>


      {/* ==================================================
          6. MULTIPLE SIGNALS
          ================================================== */}

      <LessonSection
        id="multiple"
        title="6. Multiple Signals"
      >
        <p>
          A design can contain many internal signals.
          Signals can be connected together to form larger
          hardware structures.
        </p>

        <CodeExample title="Multiple Signals">
{`architecture Behavioral of example is

    signal X : std_logic;
    signal Z : std_logic;

begin

    X <= A xor B;
    Z <= X and C;
    Y <= Z;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-signal-network">

          <div className="vhdl-signal-network-input">
            A
          </div>

          <div className="vhdl-signal-network-line"></div>

          <div className="vhdl-signal-network-block">
            XOR
          </div>

          <div className="vhdl-signal-network-line"></div>

          <div className="vhdl-signal-network-signal">
            X
          </div>

          <div className="vhdl-signal-network-line"></div>

          <div className="vhdl-signal-network-block">
            AND
          </div>

          <div className="vhdl-signal-network-line"></div>

          <div className="vhdl-signal-network-output">
            Y
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Hardware Thinking"
        >
          When you see several signals connected between
          logic blocks, think of them as wires connecting
          pieces of hardware.
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
          Let's create a circuit with an internal signal.
        </p>

        <CodeExample title="NOR Gate with Internal Signal">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOR_GATE is

    port (
        A : in  std_logic;
        B : in  std_logic;
        Y : out std_logic
    );

end NOR_GATE;


architecture Behavioral of NOR_GATE is

    signal temp : std_logic;

begin

    temp <= A nor B;

    Y <= temp;

end Behavioral;`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/norgaate.png"
        />

        <p>
          The internal signal <code>temp</code> carries the
          result of the NOR operation to the output.
        </p>
      </LessonSection>


      {/* ==================================================
          8. TRY IT
          ================================================== */}

      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the NOR gate below and observe how the signal
          carries the result of the logic operation.
        </p>

        <TryIt
          title="VHDL NOR Gate"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOR_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end NOR_GATE;

architecture Behavioral of NOR_GATE is

    signal temp : std_logic;

begin

    temp <= A nor B;
    Y <= temp;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity NOR_GATE_TB is
end NOR_GATE_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of NOR_GATE_TB is

    signal A : std_logic := '0';
    signal B : std_logic := '0';
    signal Y : std_logic;

begin

    UUT : entity work.NOR_GATE
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

        report "VHDL NOR gate simulation completed!";

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
        <div className="vhdl-signal-takeaways">

          <div>
            <strong>Signal</strong>
            <span>
              Represents a value or hardware connection.
            </span>
          </div>

          <div>
            <strong>Declaration</strong>
            <span>
              Signals are commonly declared in an architecture.
            </span>
          </div>

          <div>
            <strong>&lt;=</strong>
            <span>
              Used for signal assignment.
            </span>
          </div>

          <div>
            <strong>Internal Signal</strong>
            <span>
              Can connect different parts of a design.
            </span>
          </div>

          <div>
            <strong>Hardware</strong>
            <span>
              Signals can represent physical connections.
            </span>
          </div>

          <div>
            <strong>Multiple Signals</strong>
            <span>
              Can be combined to build larger circuits.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           VHDL Data Types and how different
          types represent digital values.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Signals;