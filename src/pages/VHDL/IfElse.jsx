import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function IfElse() {
  const sections = [
    { id: "overview", title: "What is If / Else?" },
    { id: "syntax", title: "Basic Syntax" },
    { id: "elsif", title: "ELSIF" },
    { id: "else", title: "ELSE" },
    { id: "combinational", title: "Combinational Logic" },
    { id: "clocked", title: "Clocked Logic" },
    { id: "priority", title: "Priority Logic" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL If / Else"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Processes"
      previousPath="/vhdl/processes"
      nextLesson="Case"
      nextPath="/vhdl/case"
    >

      <LessonSection
        id="overview"
        title="1. What is If / Else?"
      >
        <p className="lesson-intro">
          The VHDL <code>if</code> statement is used to make
          decisions based on conditions.
        </p>

        <p>
          It is commonly used inside a process to describe
          conditional combinational or sequential hardware.
        </p>

        <div className="vhdl-if-main-visual">

          <div className="vhdl-if-input-box">
            <strong>Input</strong>
            <span>Condition</span>
          </div>

          <div className="vhdl-if-arrow">→</div>

          <div className="vhdl-if-decision">
            <span>?</span>
            <strong>Condition</strong>
          </div>

          <div className="vhdl-if-branches">

            <div>
              <strong>TRUE</strong>
              <span>Do this</span>
            </div>

            <div>
              <strong>FALSE</strong>
              <span>Do that</span>
            </div>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Hardware View"
        >
          An if statement can describe selection logic,
          enable logic, priority logic, or state-dependent
          behavior depending on how it is written.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="syntax"
        title="2. Basic Syntax"
      >
        <p>
          The basic VHDL syntax uses <code>if</code>,
          <code> then</code>, and <code>end if</code>.
        </p>

        <CodeExample title="Basic If">
{`if condition then

    -- statements

end if;`}
        </CodeExample>

        <div className="vhdl-if-syntax-flow">

          <div>
            <span>1</span>
            <strong>if</strong>
            <small>Check condition</small>
          </div>

          <div className="vhdl-if-flow-arrow">→</div>

          <div>
            <span>2</span>
            <strong>then</strong>
            <small>Condition is true</small>
          </div>

          <div className="vhdl-if-flow-arrow">→</div>

          <div>
            <span>3</span>
            <strong>Statements</strong>
            <small>Execute behavior</small>
          </div>

          <div className="vhdl-if-flow-arrow">→</div>

          <div>
            <span>4</span>
            <strong>end if</strong>
            <small>Finish decision</small>
          </div>

        </div>

        <CodeExample title="Example">
{`if ENABLE = '1' then
    Y <= A;
end if;`}
        </CodeExample>
      </LessonSection>


      <LessonSection
        id="elsif"
        title="3. ELSIF"
      >
        <p>
          <code>elsif</code> allows multiple conditions to be
          checked in sequence.
        </p>

        <CodeExample title="ELSIF Example">
{`if SEL = "00" then
    Y <= A;

elsif SEL = "01" then
    Y <= B;

elsif SEL = "10" then
    Y <= C;

else
    Y <= D;

end if;`}
        </CodeExample>

        <div className="vhdl-elsif-flow">

          <div className="vhdl-elsif-condition">
            <strong>SEL = 00?</strong>
            <span>Yes → A</span>
          </div>

          <div className="vhdl-elsif-condition">
            <strong>SEL = 01?</strong>
            <span>Yes → B</span>
          </div>

          <div className="vhdl-elsif-condition">
            <strong>SEL = 10?</strong>
            <span>Yes → C</span>
          </div>

          <div className="vhdl-elsif-condition">
            <strong>Otherwise</strong>
            <span>→ D</span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Priority"
        >
          Conditions are checked from top to bottom. The first
          true condition determines the result.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="else"
        title="4. ELSE"
      >
        <p>
          The <code>else</code> branch executes when none of
          the preceding conditions are true.
        </p>

        <CodeExample title="If / Else">
{`if SEL = '0' then
    Y <= A;
else
    Y <= B;
end if;`}
        </CodeExample>

        <div className="vhdl-if-else-visual">

          <div className="vhdl-if-else-condition">
            <strong>SEL = 0?</strong>
          </div>

          <div className="vhdl-if-else-paths">

            <div>
              <span>YES</span>
              <strong>Y = A</strong>
            </div>

            <div>
              <span>NO</span>
              <strong>Y = B</strong>
            </div>

          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="combinational"
        title="5. Combinational Logic"
      >
        <p>
          An if statement inside a process can describe
          combinational selection logic.
        </p>

        <CodeExample title="2-to-1 Multiplexer">
{`process(A, B, SEL)
begin

    if SEL = '0' then
        Y <= A;
    else
        Y <= B;
    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-if-mux">

          <div className="vhdl-if-mux-inputs">
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-if-mux-block">
            <small>IF / ELSE</small>
            <strong>2 : 1</strong>
            <span>MUX</span>
          </div>

          <div className="vhdl-if-mux-select">
            SEL
          </div>

          <div className="vhdl-if-mux-arrow">→</div>

          <div className="vhdl-if-mux-output">
            Y
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Avoiding Latches"
        >
          In combinational processes, make sure every output
          gets a value for every possible condition. Otherwise,
          synthesis may infer a latch.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="clocked"
        title="6. Clocked Logic"
      >
        <p>
          If statements are also frequently used inside
          clocked processes.
        </p>

        <CodeExample title="Enable Register">
{`process(CLK)
begin

    if rising_edge(CLK) then

        if ENABLE = '1' then
            Q <= D;
        end if;

    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-if-clocked">

          <div>
            <span>CLK ↑</span>
          </div>

          <div className="vhdl-if-clock-arrow">
            →
          </div>

          <div className="vhdl-if-clock-block">
            <small>PROCESS</small>
            <strong>ENABLE?</strong>
            <span>Store D when enabled</span>
          </div>

          <div className="vhdl-if-clock-arrow">
            →
          </div>

          <div>
            <span>Q</span>
          </div>

        </div>

        <p>
          Here, the <code>if</code> condition controls whether
          the register captures the input at the clock edge.
        </p>
      </LessonSection>


      <LessonSection
        id="priority"
        title="7. Priority Logic"
      >
        <p>
          Multiple <code>elsif</code> conditions naturally
          create priority behavior.
        </p>

        <CodeExample title="Priority Example">
{`if A = '1' then
    Y <= "01";

elsif B = '1' then
    Y <= "10";

elsif C = '1' then
    Y <= "11";

else
    Y <= "00";

end if;`}
        </CodeExample>

        <div className="vhdl-priority-visual">

          <div>
            <span>Highest</span>
            <strong>A</strong>
          </div>

          <div>
            <span>↓</span>
            <strong>B</strong>
          </div>

          <div>
            <span>↓</span>
            <strong>C</strong>
          </div>

          <div>
            <span>Lowest</span>
            <strong>Default</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Priority"
        >
          If more than one condition is true, the first true
          condition wins.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="example"
        title="8. Complete Example"
      >
        <p>
          Let's build a 4-to-1 multiplexer using
          <code>if / elsif / else</code>.
        </p>

        <CodeExample title="4-to-1 Multiplexer">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity MUX4 is

    port (
        A   : in std_logic;
        B   : in std_logic;
        C   : in std_logic;
        D   : in std_logic;
        SEL : in std_logic_vector(1 downto 0);
        Y   : out std_logic
    );

end MUX4;


architecture Behavioral of MUX4 is

begin

    process(A, B, C, D, SEL)
    begin

        if SEL = "00" then
            Y <= A;

        elsif SEL = "01" then
            Y <= B;

        elsif SEL = "10" then
            Y <= C;

        else
            Y <= D;

        end if;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-if-mux4-visual">

          <div className="vhdl-mux4-inputs">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
          </div>

          <div className="vhdl-mux4-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="vhdl-mux4-block">
            <small>IF / ELSIF / ELSE</small>
            <strong>4 : 1</strong>
            <span>MUX</span>
          </div>

          <div className="vhdl-mux4-arrow">
            →
          </div>

          <div className="vhdl-mux4-output">
            Y
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="9. Try It Yourself"
      >
        <p>
          Run the 4-to-1 multiplexer and observe how changing
          <code> SEL</code> selects a different input.
        </p>

        <TryIt
          title="VHDL 4-to-1 Multiplexer"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity MUX4 is
    port (
        A   : in std_logic;
        B   : in std_logic;
        C   : in std_logic;
        D   : in std_logic;
        SEL : in std_logic_vector(1 downto 0);
        Y   : out std_logic
    );
end MUX4;

architecture Behavioral of MUX4 is
begin

    process(A, B, C, D, SEL)
    begin

        if SEL = "00" then
            Y <= A;

        elsif SEL = "01" then
            Y <= B;

        elsif SEL = "10" then
            Y <= C;

        else
            Y <= D;

        end if;

    end process;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity MUX4_TB is
end MUX4_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of MUX4_TB is

    signal A   : std_logic := '0';
    signal B   : std_logic := '1';
    signal C   : std_logic := '0';
    signal D   : std_logic := '1';

    signal SEL : std_logic_vector(1 downto 0) := "00";
    signal Y   : std_logic;

begin

    UUT : entity work.MUX4
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

        report "SEL=00 Y=" &
               std_logic'image(Y);

        SEL <= "01";
        wait for 10 ns;

        report "SEL=01 Y=" &
               std_logic'image(Y);

        SEL <= "10";
        wait for 10 ns;

        report "SEL=10 Y=" &
               std_logic'image(Y);

        SEL <= "11";
        wait for 10 ns;

        report "SEL=11 Y=" &
               std_logic'image(Y);

        report "VHDL if/else MUX simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="10. Key Takeaways"
      >
        <div className="vhdl-if-takeaways">

          <div>
            <strong>IF</strong>
            <span>
              Checks a condition and executes statements when
              it is true.
            </span>
          </div>

          <div>
            <strong>ELSIF</strong>
            <span>
              Allows multiple conditions to be checked.
            </span>
          </div>

          <div>
            <strong>ELSE</strong>
            <span>
              Handles the remaining condition.
            </span>
          </div>

          <div>
            <strong>Combinational</strong>
            <span>
              Can describe multiplexers and selection logic.
            </span>
          </div>

          <div>
            <strong>Clocked</strong>
            <span>
              Can control registers and sequential logic.
            </span>
          </div>

          <div>
            <strong>Priority</strong>
            <span>
              The first true condition takes priority.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about the
           Case statement, which is especially
          useful when selecting between multiple discrete values.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default IfElse;