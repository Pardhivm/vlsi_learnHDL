import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Case() {
  const sections = [
    { id: "overview", title: "What is Case?" },
    { id: "syntax", title: "Case Syntax" },
    { id: "choices", title: "Case Choices" },
    { id: "others", title: "OTHERS" },
    { id: "mux", title: "Case as a Multiplexer" },
    { id: "decoder", title: "Case as a Decoder" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Case Statement"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="If / Else"
      previousPath="/vhdl/if-else"
      nextLesson="Loops"
      nextPath="/vhdl/loops"
    >

      <LessonSection
        id="overview"
        title="1. What is Case?"
      >
        <p className="lesson-intro">
          The VHDL <code>case</code> statement selects one
          behavior from several possible choices.
        </p>

        <p>
          It is especially useful when a signal can have several
          distinct values, such as an opcode, state, or
          multiplexer select signal.
        </p>

        <div className="vhdl-case-main-visual">

          <div className="vhdl-case-selector">
            <small>SELECT</small>
            <strong>SEL</strong>
          </div>

          <div className="vhdl-case-arrow">→</div>

          <div className="vhdl-case-decision">

            <div>00</div>
            <div>01</div>
            <div>10</div>
            <div>11</div>

          </div>

          <div className="vhdl-case-arrow">→</div>

          <div className="vhdl-case-result">

            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Think of Case as Selection"
        >
          A case statement examines one expression and chooses
          the matching branch.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="syntax"
        title="2. Case Syntax"
      >
        <p>
          A case statement begins with <code>case</code>,
          contains one or more <code>when</code> choices, and
          ends with <code>end case</code>.
        </p>

        <CodeExample title="Basic Case Syntax">
{`case SEL is

    when "00" =>
        Y <= A;

    when "01" =>
        Y <= B;

    when "10" =>
        Y <= C;

    when others =>
        Y <= D;

end case;`}
        </CodeExample>

        <div className="vhdl-case-syntax-flow">

          <div>
            <span>1</span>
            <strong>case SEL</strong>
            <small>Choose expression</small>
          </div>

          <div>→</div>

          <div>
            <span>2</span>
            <strong>when</strong>
            <small>Match a value</small>
          </div>

          <div>→</div>

          <div>
            <span>3</span>
            <strong>Statements</strong>
            <small>Perform action</small>
          </div>

          <div>→</div>

          <div>
            <span>4</span>
            <strong>end case</strong>
            <small>Finish selection</small>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="choices"
        title="3. Case Choices"
      >
        <p>
          Each <code>when</code> branch defines a possible
          value of the case expression.
        </p>

        <CodeExample title="Multiple Choices">
{`case OPCODE is

    when "000" =>
        RESULT <= A;

    when "001" =>
        RESULT <= B;

    when "010" =>
        RESULT <= C;

    when "011" =>
        RESULT <= D;

    when others =>
        RESULT <= '0';

end case;`}
        </CodeExample>

        <div className="vhdl-case-choice-grid">

          <div>
            <code>000</code>
            <span>Choose A</span>
          </div>

          <div>
            <code>001</code>
            <span>Choose B</span>
          </div>

          <div>
            <code>010</code>
            <span>Choose C</span>
          </div>

          <div>
            <code>011</code>
            <span>Choose D</span>
          </div>

          <div>
            <code>OTHERS</code>
            <span>Default behavior</span>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="others"
        title="4. OTHERS"
      >
        <p>
          The <code>when others</code> branch handles values
          that are not explicitly listed.
        </p>

        <CodeExample title="OTHERS Example">
{`case SEL is

    when "00" =>
        Y <= A;

    when "01" =>
        Y <= B;

    when others =>
        Y <= '0';

end case;`}
        </CodeExample>

        <div className="vhdl-case-others-visual">

          <div className="vhdl-case-known">
            <strong>Known Choices</strong>
            <span>00 → A</span>
            <span>01 → B</span>
          </div>

          <div className="vhdl-case-others-arrow">
            →
          </div>

          <div className="vhdl-case-default">
            <small>WHEN OTHERS</small>
            <strong>Default</strong>
            <span>Y = 0</span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Good Practice"
        >
          Using <code>when others</code> can make the intended
          default behavior explicit and is particularly useful
          when dealing with enumerated or multi-valued signals.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="mux"
        title="5. Case as a Multiplexer"
      >
        <p>
          A case statement is commonly used to describe
          multiplexers.
        </p>

        <CodeExample title="4-to-1 Multiplexer">
{`process(A, B, C, D, SEL)
begin

    case SEL is

        when "00" =>
            Y <= A;

        when "01" =>
            Y <= B;

        when "10" =>
            Y <= C;

        when others =>
            Y <= D;

    end case;

end process;`}
        </CodeExample>

        <div className="vhdl-case-mux-visual">

          <div className="vhdl-case-mux-inputs">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
          </div>

          <div className="vhdl-case-mux-lines">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="vhdl-case-mux-block">
            <small>CASE SEL</small>
            <strong>4 : 1</strong>
            <span>MUX</span>
          </div>

          <div className="vhdl-case-mux-arrow">→</div>

          <div className="vhdl-case-mux-output">
            Y
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="decoder"
        title="6. Case as a Decoder"
      >
        <p>
          Case statements can also describe decoder logic by
          activating a different output for each input value.
        </p>

        <CodeExample title="2-to-4 Decoder">
{`case SEL is

    when "00" =>
        Y <= "0001";

    when "01" =>
        Y <= "0010";

    when "10" =>
        Y <= "0100";

    when others =>
        Y <= "1000";

end case;`}
        </CodeExample>

        <div className="vhdl-case-decoder-visual">

          <div className="vhdl-decoder-input">
            SEL
            <small>2 bits</small>
          </div>

          <div className="vhdl-decoder-arrow">→</div>

          <div className="vhdl-decoder-block">
            <small>CASE</small>
            <strong>2 : 4</strong>
            <span>DECODER</span>
          </div>

          <div className="vhdl-decoder-arrow">→</div>

          <div className="vhdl-decoder-output">
            <span>Y0</span>
            <span>Y1</span>
            <span>Y2</span>
            <span>Y3</span>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Here is a complete 4-to-1 multiplexer implemented
          using a case statement.
        </p>

        <CodeExample title="VHDL Case MUX">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CASE_MUX is
    port (
        A   : in std_logic;
        B   : in std_logic;
        C   : in std_logic;
        D   : in std_logic;
        SEL : in std_logic_vector(1 downto 0);
        Y   : out std_logic
    );
end CASE_MUX;

architecture Behavioral of CASE_MUX is
begin

    process(A, B, C, D, SEL)
    begin

        case SEL is

            when "00" =>
                Y <= A;

            when "01" =>
                Y <= B;

            when "10" =>
                Y <= C;

            when others =>
                Y <= D;

        end case;

    end process;

end Behavioral;`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Case vs If / Else"
        >
          Case is often easier to read when one expression is
          being compared against several discrete choices.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the multiplexer and observe how the case statement
          selects A, B, C, or D according to <code>SEL</code>.
        </p>

        <TryIt
          title="VHDL Case Multiplexer"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CASE_MUX is
    port (
        A   : in std_logic;
        B   : in std_logic;
        C   : in std_logic;
        D   : in std_logic;
        SEL : in std_logic_vector(1 downto 0);
        Y   : out std_logic
    );
end CASE_MUX;

architecture Behavioral of CASE_MUX is
begin

    process(A, B, C, D, SEL)
    begin

        case SEL is

            when "00" =>
                Y <= A;

            when "01" =>
                Y <= B;

            when "10" =>
                Y <= C;

            when others =>
                Y <= D;

        end case;

    end process;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CASE_MUX_TB is
end CASE_MUX_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of CASE_MUX_TB is

    signal A   : std_logic := '0';
    signal B   : std_logic := '1';
    signal C   : std_logic := '1';
    signal D   : std_logic := '0';

    signal SEL : std_logic_vector(1 downto 0) := "00";
    signal Y   : std_logic;

begin

    UUT : entity work.CASE_MUX
        port map (
            A   => A,
            B   => B,
            C   => C,
            D   => D,
            SEL => SEL,
            Y   => Y
        );

    process
    begin

        SEL <= "00";
        wait for 10 ns;

        report "SEL=00  Y=" &
               std_logic'image(Y);

        SEL <= "01";
        wait for 10 ns;

        report "SEL=01  Y=" &
               std_logic'image(Y);

        SEL <= "10";
        wait for 10 ns;

        report "SEL=10  Y=" &
               std_logic'image(Y);

        SEL <= "11";
        wait for 10 ns;

        report "SEL=11  Y=" &
               std_logic'image(Y);

        report "VHDL case statement simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-case-takeaways">

          <div>
            <strong>CASE</strong>
            <span>
              Selects behavior based on one expression.
            </span>
          </div>

          <div>
            <strong>WHEN</strong>
            <span>
              Defines an individual possible choice.
            </span>
          </div>

          <div>
            <strong>OTHERS</strong>
            <span>
              Handles values not explicitly listed.
            </span>
          </div>

          <div>
            <strong>MUX</strong>
            <span>
              Case statements can describe multiplexer logic.
            </span>
          </div>

          <div>
            <strong>DECODER</strong>
            <span>
              Case can map input combinations to outputs.
            </span>
          </div>

          <div>
            <strong>Readability</strong>
            <span>
              Case is convenient for multiple discrete choices.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Loops and how VHDL can describe
          repeated hardware structures.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Case;