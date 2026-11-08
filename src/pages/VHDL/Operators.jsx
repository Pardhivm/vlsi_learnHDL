import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Operators() {
  const sections = [
    {
      id: "overview",
      title: "What are Operators?"
    },
    {
      id: "arithmetic",
      title: "Arithmetic Operators"
    },
    {
      id: "relational",
      title: "Relational Operators"
    },
    {
      id: "logical",
      title: "Logical Operators"
    },
    {
      id: "shift",
      title: "Shift Operators"
    },
    {
      id: "concatenation",
      title: "Concatenation"
    },
    {
      id: "priority",
      title: "Operator Priority"
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
      title="VHDL Operators"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Data Types"
      previousPath="/vhdl/data-types"
      nextLesson="Concurrent Statements"
      nextPath="/vhdl/concurrent-statements"
    >

      {/* ==================================================
          1. OVERVIEW
          ================================================== */}

      <LessonSection
        id="overview"
        title="1. What are Operators?"
      >
        <p className="lesson-intro">
          Operators are symbols or keywords used to perform
          operations on values and signals in VHDL.
        </p>

        <p>
          VHDL provides operators for arithmetic,
          comparison, logic, shifting, and combining values.
        </p>

        <div className="vhdl-operator-map">

          <div className="vhdl-operator-center">
            <strong>VHDL</strong>
            <span>Operators</span>
          </div>

          <div className="vhdl-operator-families">

            <div>
              <strong>+</strong>
              <span>Arithmetic</span>
            </div>

            <div>
              <strong>=</strong>
              <span>Relational</span>
            </div>

            <div>
              <strong>AND</strong>
              <span>Logical</span>
            </div>

            <div>
              <strong>SLL</strong>
              <span>Shift</span>
            </div>

            <div>
              <strong>&amp;</strong>
              <span>Concatenation</span>
            </div>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Hardware Connection"
        >
          Operators are not just mathematical symbols.
          In synthesizable VHDL, many operators describe
          actual hardware such as adders, comparators,
          logic gates, and multiplexing logic.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. ARITHMETIC
          ================================================== */}

      <LessonSection
        id="arithmetic"
        title="2. Arithmetic Operators"
      >
        <p>
          Arithmetic operators are used for numerical
          calculations.
        </p>

        <div className="vhdl-operator-table">

          <div className="vhdl-operator-table-head">
            <span>Operator</span>
            <span>Operation</span>
            <span>Example</span>
          </div>

          <div>
            <code>+</code>
            <span>Addition</span>
            <code>A + B</code>
          </div>

          <div>
            <code>-</code>
            <span>Subtraction</span>
            <code>A - B</code>
          </div>

          <div>
            <code>*</code>
            <span>Multiplication</span>
            <code>A * B</code>
          </div>

          <div>
            <code>/</code>
            <span>Division</span>
            <code>A / B</code>
          </div>

          <div>
            <code>mod</code>
            <span>Modulo</span>
            <code>A mod B</code>
          </div>

          <div>
            <code>rem</code>
            <span>Remainder</span>
            <code>A rem B</code>
          </div>

          <div>
            <code>abs</code>
            <span>Absolute value</span>
            <code>abs A</code>
          </div>

          <div>
            <code>**</code>
            <span>Exponentiation</span>
            <code>A ** B</code>
          </div>

        </div>

        <CodeExample title="Addition">
{`signal A : integer := 5;
signal B : integer := 3;
signal SUM : integer;

SUM <= A + B;`}
        </CodeExample>

        <div className="vhdl-operator-circuit">

          <div className="vhdl-operator-value">
            A = 5
          </div>

          <div className="vhdl-operator-arrow">
            →
          </div>

          <div className="vhdl-operator-unit">
            <small>ARITHMETIC</small>
            <strong>+</strong>
          </div>

          <div className="vhdl-operator-arrow">
            →
          </div>

          <div className="vhdl-operator-result">
            SUM = 8
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          3. RELATIONAL
          ================================================== */}

      <LessonSection
        id="relational"
        title="3. Relational Operators"
      >
        <p>
          Relational operators compare two values and produce
          a Boolean result.
        </p>

        <div className="vhdl-operator-relational">

          <div>
            <code>=</code>
            <span>Equal</span>
          </div>

          <div>
            <code>/=</code>
            <span>Not equal</span>
          </div>

          <div>
            <code>&lt;</code>
            <span>Less than</span>
          </div>

          <div>
            <code>&lt;=</code>
            <span>Less than or equal</span>
          </div>

          <div>
            <code>&gt;</code>
            <span>Greater than</span>
          </div>

          <div>
            <code>&gt;=</code>
            <span>Greater than or equal</span>
          </div>

        </div>

        <CodeExample title="Comparison">
{`if A = B then

    EQUAL <= '1';

else

    EQUAL <= '0';

end if;`}
        </CodeExample>

        <div className="vhdl-operator-comparison-flow">

          <div>
            A = 7
          </div>

          <div className="vhdl-operator-question">
            A = B ?
          </div>

          <div>
            B = 7
          </div>

          <div className="vhdl-operator-answer">
            TRUE
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          4. LOGICAL
          ================================================== */}

      <LessonSection
        id="logical"
        title="4. Logical Operators"
      >
        <p>
          Logical operators are commonly used to describe
          digital logic.
        </p>

        <div className="vhdl-operator-logic-grid">

          <div>
            <strong>AND</strong>
            <span>Both inputs must be true.</span>
          </div>

          <div>
            <strong>OR</strong>
            <span>At least one input is true.</span>
          </div>

          <div>
            <strong>NOT</strong>
            <span>Inverts the input.</span>
          </div>

          <div>
            <strong>XOR</strong>
            <span>Inputs are different.</span>
          </div>

          <div>
            <strong>XNOR</strong>
            <span>Inputs are equal.</span>
          </div>

          <div>
            <strong>NAND</strong>
            <span>Inverted AND operation.</span>
          </div>

          <div>
            <strong>NOR</strong>
            <span>Inverted OR operation.</span>
          </div>

        </div>

        <CodeExample title="Logical Expressions">
{`Y1 <= A and B;
Y2 <= A or B;
Y3 <= not A;
Y4 <= A xor B;
Y5 <= A xnor B;
Y6 <= A nand B;
Y7 <= A nor B;`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Hardware Meaning"
        >
          Logical operators can directly correspond to
          digital logic gates when used with appropriate
          logic types.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          5. SHIFT
          ================================================== */}

      <LessonSection
        id="shift"
        title="5. Shift Operators"
      >
        <p>
          Shift operators move bits within a vector.
        </p>

        <div className="vhdl-operator-shift">

          <div className="vhdl-operator-shift-row">

            <span>Before</span>

            <code>10110010</code>

          </div>

          <div className="vhdl-operator-shift-arrow">
            →
          </div>

          <div className="vhdl-operator-shift-row">

            <span>Shift left</span>

            <code>01100100</code>

          </div>

        </div>

        <CodeExample title="Shift Example">
{`signal A : std_logic_vector(7 downto 0);
signal Y : std_logic_vector(7 downto 0);

Y <= A sll 1;`}
        </CodeExample>

        <p>
          Common shift operations include:
        </p>

        <ul>
          <li><code>sll</code> — shift left logically</li>
          <li><code>srl</code> — shift right logically</li>
          <li><code>sla</code> — shift left arithmetically</li>
          <li><code>sra</code> — shift right arithmetically</li>
          <li><code>rol</code> — rotate left</li>
          <li><code>ror</code> — rotate right</li>
        </ul>
      </LessonSection>


      {/* ==================================================
          6. CONCATENATION
          ================================================== */}

      <LessonSection
        id="concatenation"
        title="6. Concatenation"
      >
        <p>
          The <code>&amp;</code> operator combines values
          together.
        </p>

        <CodeExample title="Concatenation">
{`signal A : std_logic_vector(3 downto 0);
signal B : std_logic_vector(3 downto 0);
signal Y : std_logic_vector(7 downto 0);

Y <= A & B;`}
        </CodeExample>

        <div className="vhdl-operator-concat">

          <div className="vhdl-operator-vector">
            1010
          </div>

          <div className="vhdl-operator-concat-symbol">
            +
          </div>

          <div className="vhdl-operator-vector">
            1100
          </div>

          <div className="vhdl-operator-concat-arrow">
            →
          </div>

          <div className="vhdl-operator-vector result">
            10101100
          </div>

        </div>

        <LearningNote
          type="info"
          title="Remember"
        >
          Concatenation joins vectors or values together;
          it does not perform arithmetic addition.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          7. PRIORITY
          ================================================== */}

      <LessonSection
        id="priority"
        title="7. Operator Priority"
      >
        <p>
          When an expression contains multiple operators,
          VHDL follows operator precedence rules.
        </p>

        <CodeExample title="Example">
{`Y <= A + B * C;`}
        </CodeExample>

        <p>
          Multiplication is evaluated before addition in this
          expression.
        </p>

        <CodeExample title="Using Parentheses">
{`Y <= (A + B) * C;`}
        </CodeExample>

        <div className="vhdl-operator-priority">

          <div>
            <span>1</span>
            <strong>Parentheses</strong>
          </div>

          <div>
            <span>2</span>
            <strong>Higher-priority operators</strong>
          </div>

          <div>
            <span>3</span>
            <strong>Lower-priority operators</strong>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Best Practice"
        >
          Use parentheses when you want to make the intended
          order of evaluation completely clear.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          8. COMPLETE EXAMPLE
          ================================================== */}

      <LessonSection
        id="example"
        title="8. Complete Example"
      >
        <p>
          Let's create a 4-bit XOR parity circuit using
          logical operators.
        </p>

        <CodeExample title="4-bit XOR Parity">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity PARITY_GENERATOR is

    port (
        A : in  std_logic_vector(3 downto 0);
        P : out std_logic
    );

end PARITY_GENERATOR;


architecture Behavioral of PARITY_GENERATOR is

begin

    P <= A(3) xor A(2) xor A(1) xor A(0);

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-parity-visual">

          <div className="vhdl-parity-input">A(3)</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-xor">XOR</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-input">A(2)</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-xor">XOR</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-input">A(1)</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-xor">XOR</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-input">A(0)</div>

          <div className="vhdl-parity-line"></div>

          <div className="vhdl-parity-output">P</div>

        </div>

        <LearningNote
          type="info"
          title="What is Happening?"
        >
          The XOR operations combine the four input bits to
          produce a single parity output.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          9. TRY IT
          ================================================== */}

      <LessonSection
        id="tryit"
        title="9. Try It Yourself"
      >
        <p>
          Run the parity generator and observe how the XOR
          operator is used to produce the output.
        </p>

        <TryIt
          title="VHDL XOR Parity Generator"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity PARITY_GENERATOR is
    port (
        A : in std_logic_vector(3 downto 0);
        P : out std_logic
    );
end PARITY_GENERATOR;

architecture Behavioral of PARITY_GENERATOR is
begin
    P <= A(3) xor A(2) xor A(1) xor A(0);
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity PARITY_GENERATOR_TB is
end PARITY_GENERATOR_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of PARITY_GENERATOR_TB is

    signal A : std_logic_vector(3 downto 0) := "0000";
    signal P : std_logic;

begin

    UUT : entity work.PARITY_GENERATOR
        port map (
            A => A,
            P => P
        );

    process
    begin

        A <= "0000";
        wait for 10 ns;

        report "A=0000 P=" &
               std_logic'image(P);

        A <= "0001";
        wait for 10 ns;

        report "A=0001 P=" &
               std_logic'image(P);

        A <= "0011";
        wait for 10 ns;

        report "A=0011 P=" &
               std_logic'image(P);

        A <= "0111";
        wait for 10 ns;

        report "A=0111 P=" &
               std_logic'image(P);

        A <= "1111";
        wait for 10 ns;

        report "A=1111 P=" &
               std_logic'image(P);

        report "VHDL XOR parity simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* ==================================================
          10. TAKEAWAYS
          ================================================== */}

      <LessonSection
        id="takeaways"
        title="10. Key Takeaways"
      >
        <div className="vhdl-operator-takeaways">

          <div>
            <strong>Arithmetic</strong>
            <span>
              Performs numerical operations.
            </span>
          </div>

          <div>
            <strong>Relational</strong>
            <span>
              Compares values.
            </span>
          </div>

          <div>
            <strong>Logical</strong>
            <span>
              Describes digital logic operations.
            </span>
          </div>

          <div>
            <strong>Shift</strong>
            <span>
              Moves or rotates bits.
            </span>
          </div>

          <div>
            <strong>&amp;</strong>
            <span>
              Combines values through concatenation.
            </span>
          </div>

          <div>
            <strong>Parentheses</strong>
            <span>
              Make expression order explicit.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Concurrent Statements and how
          VHDL describes multiple hardware operations
          happening in parallel.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Operators;