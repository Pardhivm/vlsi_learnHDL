import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function DataTypes() {
  const sections = [
    {
      id: "overview",
      title: "What are Data Types?"
    },
    {
      id: "stdlogic",
      title: "std_logic"
    },
    {
      id: "vector",
      title: "std_logic_vector"
    },
    {
      id: "bit",
      title: "bit"
    },
    {
      id: "numeric",
      title: "Integer Types"
    },
    {
      id: "signed",
      title: "Signed and Unsigned"
    },
    {
      id: "enumerated",
      title: "Enumerated Types"
    },
    {
      id: "arrays",
      title: "Arrays"
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
      title="VHDL Data Types"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Signals"
      previousPath="/vhdl/signals"
      nextLesson="Operators"
      nextPath="/vhdl/operators"
    >

      {/* ==================================================
          1. OVERVIEW
          ================================================== */}

      <LessonSection
        id="overview"
        title="1. What are Data Types?"
      >
        <p className="lesson-intro">
          Data types tell VHDL what kind of value a signal,
          variable, or constant can contain.
        </p>

        <p>
          Choosing the correct data type is important because
          hardware signals can represent single bits,
          multiple-bit values, numbers, states, and more.
        </p>

        <div className="vhdl-datatype-map">

          <div className="vhdl-datatype-root">
            <strong>VHDL</strong>
            <span>Data Types</span>
          </div>

          <div className="vhdl-datatype-branches">

            <div className="vhdl-datatype-family">
              <div className="vhdl-datatype-family-title">
                LOGIC
              </div>

              <span>std_logic</span>
              <span>std_logic_vector</span>
            </div>

            <div className="vhdl-datatype-family">
              <div className="vhdl-datatype-family-title">
                NUMERIC
              </div>

              <span>integer</span>
              <span>unsigned</span>
              <span>signed</span>
            </div>

            <div className="vhdl-datatype-family">
              <div className="vhdl-datatype-family-title">
                OTHER
              </div>

              <span>bit</span>
              <span>boolean</span>
              <span>enumerated</span>
              <span>arrays</span>
            </div>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          The data type determines what kind of values a
          signal can represent and how operations can be
          performed on it.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. STD_LOGIC
          ================================================== */}

      <LessonSection
        id="stdlogic"
        title="2. std_logic"
      >
        <p>
          <code>std_logic</code> is one of the most commonly
          used types in digital VHDL designs.
        </p>

        <CodeExample title="std_logic">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

signal A : std_logic;
signal Y : std_logic;`}
        </CodeExample>

        <div className="vhdl-datatype-bit-display">

          <div className="vhdl-datatype-bit-state">
            <span>0</span>
            <small>LOW</small>
          </div>

          <div className="vhdl-datatype-bit-state">
            <span>1</span>
            <small>HIGH</small>
          </div>

          <div className="vhdl-datatype-bit-state">
            <span>Z</span>
            <small>HIGH-Z</small>
          </div>

          <div className="vhdl-datatype-bit-state">
            <span>X</span>
            <small>UNKNOWN</small>
          </div>

        </div>

        <p>
          Unlike a simple two-state type, <code>std_logic</code>
          supports multiple logic states useful for hardware
          modeling and simulation.
        </p>
      </LessonSection>


      {/* ==================================================
          3. VECTOR
          ================================================== */}

      <LessonSection
        id="vector"
        title="3. std_logic_vector"
      >
        <p>
          <code>std_logic_vector</code> represents a group of
          <code> std_logic</code> values.
        </p>

        <CodeExample title="8-bit Vector">
{`signal data : std_logic_vector(7 downto 0);`}
        </CodeExample>

        <div className="vhdl-vector-visual">

          <div className="vhdl-vector-label">
            8-BIT DATA
          </div>

          <div className="vhdl-vector-bits">

            <span>7</span>
            <span>6</span>
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>

          </div>

          <div className="vhdl-vector-value">
            <span>10110110</span>
          </div>

        </div>

        <p>
          The range <code>7 downto 0</code> creates eight
          positions, from bit 7 down to bit 0.
        </p>

        <LearningNote
          type="tip"
          title="Think of a Vector as a Bus"
        >
          A vector is similar to a group of wires carrying
          several bits together.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          4. BIT
          ================================================== */}

      <LessonSection
        id="bit"
        title="4. bit"
      >
        <p>
          The <code>bit</code> type is a simple two-state
          type that can contain only <code>0</code> or
          <code> 1</code>.
        </p>

        <CodeExample title="bit Example">
{`signal enable : bit;

enable <= '1';`}
        </CodeExample>

        <div className="vhdl-datatype-two-state">

          <div>
            <strong>0</strong>
            <span>LOW</span>
          </div>

          <div>
            <strong>1</strong>
            <span>HIGH</span>
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Compared with std_logic"
        >
          <code>bit</code> has only two states, while
          <code> std_logic</code> provides additional states
          useful for modeling and simulation.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          5. INTEGER TYPES
          ================================================== */}

      <LessonSection
        id="numeric"
        title="5. Integer Types"
      >
        <p>
          VHDL also provides numeric types such as
          <code> integer</code>, <code>natural</code>, and
          <code>positive</code>.
        </p>

        <div className="vhdl-datatype-number-range">

          <div className="vhdl-datatype-number-card">

            <code>integer</code>

            <span>
              Can represent positive and negative whole
              numbers.
            </span>

          </div>

          <div className="vhdl-datatype-number-card">

            <code>natural</code>

            <span>
              Represents zero and positive whole numbers.
            </span>

          </div>

          <div className="vhdl-datatype-number-card">

            <code>positive</code>

            <span>
              Represents positive whole numbers.
            </span>

          </div>

        </div>

        <CodeExample title="Integer Example">
{`signal count : integer := 0;

count <= count + 1;`}
        </CodeExample>
      </LessonSection>


      {/* ==================================================
          6. SIGNED / UNSIGNED
          ================================================== */}

      <LessonSection
        id="signed"
        title="6. Signed and Unsigned"
      >
        <p>
          The <code>unsigned</code> and <code>signed</code>
          types are commonly used when performing arithmetic
          on vectors.
        </p>

        <CodeExample title="numeric_std">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

signal A : unsigned(7 downto 0);
signal B : signed(7 downto 0);`}
        </CodeExample>

        <div className="vhdl-signed-unsigned">

          <div className="vhdl-signed-card">

            <div className="vhdl-signed-header">
              UNSIGNED
            </div>

            <div className="vhdl-signed-bits">
              10110110
            </div>

            <span>
              Represents non-negative values.
            </span>

          </div>

          <div className="vhdl-signed-card">

            <div className="vhdl-signed-header">
              SIGNED
            </div>

            <div className="vhdl-signed-bits">
              10110110
            </div>

            <span>
              Represents signed two's-complement values.
            </span>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Arithmetic"
        >
          <code>numeric_std</code> is the standard package
          commonly used for arithmetic involving
          <code> signed</code> and <code>unsigned</code>.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          7. ENUMERATED
          ================================================== */}

      <LessonSection
        id="enumerated"
        title="7. Enumerated Types"
      >
        <p>
          Enumerated types allow you to define a custom set
          of named values.
        </p>

        <CodeExample title="FSM State Type">
{`type state_type is (
    IDLE,
    START,
    RUN,
    STOP
);

signal state : state_type;`}
        </CodeExample>

        <div className="vhdl-enum-states">

          <div>IDLE</div>

          <span>→</span>

          <div>START</div>

          <span>→</span>

          <div>RUN</div>

          <span>→</span>

          <div>STOP</div>

        </div>

        <p>
          Enumerated types are particularly useful when
          describing finite state machines.
        </p>
      </LessonSection>


      {/* ==================================================
          8. ARRAYS
          ================================================== */}

      <LessonSection
        id="arrays"
        title="8. Arrays"
      >
        <p>
          Arrays allow multiple values of the same type to
          be grouped together.
        </p>

        <CodeExample title="Array Example">
{`type data_array is
    array (0 to 3) of std_logic_vector(7 downto 0);

signal memory : data_array;`}
        </CodeExample>

        <div className="vhdl-array-visual">

          <div className="vhdl-array-title">
            DATA ARRAY
          </div>

          <div className="vhdl-array-row">

            <div>
              <small>0</small>
              <strong>10101100</strong>
            </div>

            <div>
              <small>1</small>
              <strong>01010011</strong>
            </div>

            <div>
              <small>2</small>
              <strong>11100010</strong>
            </div>

            <div>
              <small>3</small>
              <strong>00110101</strong>
            </div>

          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          9. COMPLETE EXAMPLE
          ================================================== */}

      <LessonSection
        id="example"
        title="9. Complete Example"
      >
        <p>
          The following example uses a 4-bit
          <code> unsigned</code> value and compares it with
          another value.
        </p>

        <CodeExample title="4-bit Comparator">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR is

    port (
        A      : in  unsigned(3 downto 0);
        B      : in  unsigned(3 downto 0);
        EQUAL  : out std_logic
    );

end COMPARATOR;


architecture Behavioral of COMPARATOR is

begin

    EQUAL <= '1' when A = B else '0';

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-comparator-visual">

          <div className="vhdl-comparator-input">
            <small>4-BIT</small>
            <strong>A</strong>
          </div>

          <div className="vhdl-comparator-arrow">
            →
          </div>

          <div className="vhdl-comparator-block">
            <small>COMPARE</small>
            <strong>A = B?</strong>
          </div>

          <div className="vhdl-comparator-arrow">
            →
          </div>

          <div className="vhdl-comparator-output">
            <small>RESULT</small>
            <strong>EQUAL</strong>
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          10. TRY IT
          ================================================== */}

      <LessonSection
        id="tryit"
        title="10. Try It Yourself"
      >
        <p>
          Run the 4-bit comparator and observe how the
          <code> unsigned</code> data type can be used for
          hardware comparison.
        </p>

        <TryIt
          title="VHDL 4-bit Comparator"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR is
    port (
        A     : in unsigned(3 downto 0);
        B     : in unsigned(3 downto 0);
        EQUAL : out std_logic
    );
end COMPARATOR;

architecture Behavioral of COMPARATOR is
begin
    EQUAL <= '1' when A = B else '0';
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR_TB is
end COMPARATOR_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

architecture Behavioral of COMPARATOR_TB is

    signal A     : unsigned(3 downto 0) := "0000";
    signal B     : unsigned(3 downto 0) := "0000";
    signal EQUAL : std_logic;

begin

    UUT : entity work.COMPARATOR
        port map (
            A => A,
            B => B,
            EQUAL => EQUAL
        );

    process
    begin

        A <= "0011";
        B <= "0011";
        wait for 10 ns;

        report "A=3 B=3 EQUAL=" &
               std_logic'image(EQUAL);

        A <= "0101";
        B <= "0011";
        wait for 10 ns;

        report "A=5 B=3 EQUAL=" &
               std_logic'image(EQUAL);

        A <= "1001";
        B <= "1001";
        wait for 10 ns;

        report "A=9 B=9 EQUAL=" &
               std_logic'image(EQUAL);

        report "VHDL comparator simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* ==================================================
          11. TAKEAWAYS
          ================================================== */}

      <LessonSection
        id="takeaways"
        title="11. Key Takeaways"
      >
        <div className="vhdl-datatype-takeaways">

          <div>
            <strong>std_logic</strong>
            <span>
              Common single-bit digital logic type.
            </span>
          </div>

          <div>
            <strong>std_logic_vector</strong>
            <span>
              Represents multiple std_logic values.
            </span>
          </div>

          <div>
            <strong>bit</strong>
            <span>
              Simple two-state type.
            </span>
          </div>

          <div>
            <strong>integer</strong>
            <span>
              Represents whole numbers.
            </span>
          </div>

          <div>
            <strong>unsigned</strong>
            <span>
              Useful for non-negative arithmetic.
            </span>
          </div>

          <div>
            <strong>signed</strong>
            <span>
              Useful for signed arithmetic.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           VHDL Operators and see how
          arithmetic, relational, logical, and other
          operations are written.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default DataTypes;