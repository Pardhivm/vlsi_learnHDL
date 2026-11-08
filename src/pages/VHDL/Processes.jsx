import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Processes() {
  const sections = [
    {
      id: "what",
      title: "What is a Process?"
    },
    {
      id: "syntax",
      title: "Process Syntax"
    },
    {
      id: "sensitivity",
      title: "Sensitivity List"
    },
    {
      id: "sequential",
      title: "Sequential Statements"
    },
    {
      id: "if",
      title: "Process with If"
    },
    {
      id: "clocked",
      title: "Clocked Process"
    },
    {
      id: "reset",
      title: "Reset in a Process"
    },
    {
      id: "concurrent-process",
      title: "Process vs Concurrent Statement"
    },
    {
      id: "example",
      title: "Complete D Flip-Flop"
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
      title="VHDL Processes"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Concurrent Statements"
      previousPath="/vhdl/concurrent-statements"
      nextLesson="If / Else"
      nextPath="/vhdl/if-else"
    >

      {/* ==================================================
          1. WHAT IS A PROCESS?
          ================================================== */}

      <LessonSection
        id="what"
        title="1. What is a Process?"
      >
        <p className="lesson-intro">
          A VHDL process is a concurrent statement that
          contains sequential statements used to describe
          hardware behavior.
        </p>

        <p>
          Processes are commonly used for combinational logic,
          registers, counters, state machines, and other
          sequential circuits.
        </p>

        <div className="vhdl-process-main-visual">

          <div className="vhdl-process-trigger">
            <strong>Inputs</strong>
            <span>Signals</span>
          </div>

          <div className="vhdl-process-flow-line">
            →
          </div>

          <div className="vhdl-process-main-block">

            <small>VHDL PROCESS</small>

            <strong>Sequential Logic</strong>

            <span>
              Statements execute in order
            </span>

          </div>

          <div className="vhdl-process-flow-line">
            →
          </div>

          <div className="vhdl-process-trigger">
            <strong>Output</strong>
            <span>Signal</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          The process itself is concurrent with other processes
          and concurrent statements. The statements inside the
          process execute sequentially.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. SYNTAX
          ================================================== */}

      <LessonSection
        id="syntax"
        title="2. Process Syntax"
      >
        <p>
          A basic VHDL process has a process statement followed
          by a sequence of statements between <code>begin</code>
          and <code>end process</code>.
        </p>

        <CodeExample title="Basic Process">
{`process
begin

    -- Sequential statements

end process;`}
        </CodeExample>

        <div className="vhdl-process-syntax">

          <div>
            <span>1</span>
            <strong>process</strong>
            <small>Start the process</small>
          </div>

          <div>
            <span>2</span>
            <strong>begin</strong>
            <small>Start statements</small>
          </div>

          <div>
            <span>3</span>
            <strong>Statements</strong>
            <small>Describe behavior</small>
          </div>

          <div>
            <span>4</span>
            <strong>end process</strong>
            <small>Finish process</small>
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          3. SENSITIVITY LIST
          ================================================== */}

      <LessonSection
        id="sensitivity"
        title="3. Sensitivity List"
      >
        <p>
          A sensitivity list specifies the signals that can
          cause a process to execute.
        </p>

        <CodeExample title="Sensitivity List">
{`process(A, B)
begin

    Y <= A xor B;

end process;`}
        </CodeExample>

        <div className="vhdl-process-sensitivity">

          <div className="vhdl-sensitivity-signals">

            <span>A</span>
            <span>B</span>

          </div>

          <div className="vhdl-sensitivity-arrow">
            →
          </div>

          <div className="vhdl-sensitivity-process">

            <small>SENSITIVITY LIST</small>

            <strong>PROCESS</strong>

            <span>
              Executes when A or B changes
            </span>

          </div>

          <div className="vhdl-sensitivity-arrow">
            →
          </div>

          <div className="vhdl-sensitivity-output">
            Y
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Important"
        >
          For combinational processes, include every signal
          read by the process in the sensitivity list.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          4. SEQUENTIAL STATEMENTS
          ================================================== */}

      <LessonSection
        id="sequential"
        title="4. Sequential Statements"
      >
        <p>
          Statements inside a process execute sequentially.
          This allows you to use constructs such as
          <code> if</code>, <code>case</code>, and loops.
        </p>

        <CodeExample title="Sequential Example">
{`process(A, B)
begin

    if A = '1' then
        Y <= B;
    else
        Y <= '0';
    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-process-sequential">

          <div>
            <span>01</span>
            <strong>Read inputs</strong>
          </div>

          <div className="vhdl-sequential-arrow">
            ↓
          </div>

          <div>
            <span>02</span>
            <strong>Evaluate condition</strong>
          </div>

          <div className="vhdl-sequential-arrow">
            ↓
          </div>

          <div>
            <span>03</span>
            <strong>Assign output</strong>
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          5. IF
          ================================================== */}

      <LessonSection
        id="if"
        title="5. Process with If"
      >
        <p>
          An <code>if</code> statement inside a process can
          describe conditional hardware behavior.
        </p>

        <CodeExample title="Conditional Process">
{`process(A, B, SEL)
begin

    if SEL = '0' then
        Y <= A;
    else
        Y <= B;
    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-process-if-visual">

          <div className="vhdl-if-input">
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-if-block">

            <small>PROCESS</small>

            <strong>IF SEL = 0</strong>

            <span>
              Select A or B
            </span>

          </div>

          <div className="vhdl-if-selector">
            SEL
          </div>

          <div className="vhdl-if-output">
            Y
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Combinational Logic"
        >
          A process can describe combinational logic when all
          required inputs are included in the sensitivity list
          and every output receives an appropriate assignment.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          6. CLOCKED PROCESS
          ================================================== */}

      <LessonSection
        id="clocked"
        title="6. Clocked Process"
      >
        <p>
          A clocked process is used to describe synchronous
          sequential hardware such as registers and flip-flops.
        </p>

        <CodeExample title="Clocked Process">
{`process(CLK)
begin

    if rising_edge(CLK) then
        Q <= D;
    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-clocked-visual">

          <div className="vhdl-clock-input">
            <span>D</span>
            <span>CLK</span>
          </div>

          <div className="vhdl-clock-arrow">
            →
          </div>

          <div className="vhdl-flipflop">

            <small>RISING EDGE</small>

            <strong>D</strong>

            <div className="vhdl-flipflop-symbol">
              D
              <span>▸</span>
              Q
            </div>

            <small>REGISTER</small>

          </div>

          <div className="vhdl-clock-arrow">
            →
          </div>

          <div className="vhdl-clock-output">
            Q
          </div>

        </div>

        <LearningNote
          type="info"
          title="rising_edge"
        >
          <code>rising_edge(CLK)</code> detects the transition
          of the clock from <code>'0'</code> to <code>'1'</code>.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          7. RESET
          ================================================== */}

      <LessonSection
        id="reset"
        title="7. Reset in a Process"
      >
        <p>
          Reset logic initializes sequential hardware to a
          known state.
        </p>

        <CodeExample title="Synchronous Reset">
{`process(CLK)
begin

    if rising_edge(CLK) then

        if RESET = '1' then
            Q <= '0';
        else
            Q <= D;
        end if;

    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-reset-flow">

          <div className="vhdl-reset-clock">
            CLK ↑
          </div>

          <div className="vhdl-reset-arrow">
            →
          </div>

          <div className="vhdl-reset-decision">

            <strong>RESET = 1?</strong>

            <span>
              Yes → Q = 0
            </span>

            <span>
              No → Q = D
            </span>

          </div>

          <div className="vhdl-reset-arrow">
            →
          </div>

          <div className="vhdl-reset-output">
            Q
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Reset Type"
        >
          This example shows a synchronous reset because the
          reset is checked inside the clock edge condition.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          8. PROCESS VS CONCURRENT
          ================================================== */}

      <LessonSection
        id="concurrent-process"
        title="8. Process vs Concurrent Statement"
      >
        <p>
          Both processes and concurrent assignments can
          describe hardware, but they are written differently.
        </p>

        <div className="vhdl-process-comparison">

          <div className="vhdl-comparison-column">

            <h3>Concurrent Assignment</h3>

            <CodeExample>
{`Y <= A xor B;`}
            </CodeExample>

            <p>
              Directly describes the relationship between
              signals.
            </p>

          </div>

          <div className="vhdl-comparison-divider">
            VS
          </div>

          <div className="vhdl-comparison-column">

            <h3>Process</h3>

            <CodeExample>
{`process(A, B)
begin
    Y <= A xor B;
end process;`}
            </CodeExample>

            <p>
              Allows multiple sequential statements.
            </p>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Rule of Thumb"
        >
          Use a concurrent assignment for simple relationships.
          Use a process when the behavior requires sequential
          statements such as if, case, or loops.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          9. COMPLETE EXAMPLE
          ================================================== */}

      <LessonSection
        id="example"
        title="9. Complete D Flip-Flop"
      >
        <p>
          The following example describes a D flip-flop with
          synchronous reset.
        </p>

        <CodeExample title="D Flip-Flop">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity D_FLIP_FLOP is

    port (
        CLK   : in std_logic;
        RESET : in std_logic;
        D     : in std_logic;
        Q     : out std_logic
    );

end D_FLIP_FLOP;


architecture Behavioral of D_FLIP_FLOP is

begin

    process(CLK)
    begin

        if rising_edge(CLK) then

            if RESET = '1' then
                Q <= '0';
            else
                Q <= D;
            end if;

        end if;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-dff-summary">

          <div>
            <strong>CLK</strong>
            <span>Controls when data is stored.</span>
          </div>

          <div>
            <strong>RESET</strong>
            <span>Clears the stored value.</span>
          </div>

          <div>
            <strong>D</strong>
            <span>Data to be stored.</span>
          </div>

          <div>
            <strong>Q</strong>
            <span>Stored output.</span>
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
          Run the D flip-flop and observe how the output
          changes on clock edges.
        </p>

        <TryIt
          title="VHDL D Flip-Flop"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity D_FLIP_FLOP is
    port (
        CLK   : in  std_logic;
        RESET : in  std_logic;
        D     : in  std_logic;
        Q     : out std_logic
    );
end D_FLIP_FLOP;


architecture Behavioral of D_FLIP_FLOP is
begin

    process(CLK)
    begin

        if rising_edge(CLK) then

            if RESET = '1' then
                Q <= '0';

            else
                Q <= D;

            end if;

        end if;

    end process;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use std.env.all;

entity D_FLIP_FLOP_TB is
end D_FLIP_FLOP_TB;


architecture Behavioral of D_FLIP_FLOP_TB is

    signal CLK   : std_logic := '0';
    signal RESET : std_logic := '0';
    signal D     : std_logic := '0';
    signal Q     : std_logic;

begin

    UUT : entity work.D_FLIP_FLOP
        port map (
            CLK   => CLK,
            RESET => RESET,
            D     => D,
            Q     => Q
        );


    -- Clock generation
    CLK <= not CLK after 5 ns;


    process
    begin

        -- Reset
        RESET <= '1';
        D <= '0';

        wait for 10 ns;

        report "RESET=1 Q=" &
               std_logic'image(Q);


        -- Store 1
        RESET <= '0';
        D <= '1';

        wait for 10 ns;

        report "D=1 Q=" &
               std_logic'image(Q);


        -- Store 0
        D <= '0';

        wait for 10 ns;

        report "D=0 Q=" &
               std_logic'image(Q);


        -- Store 1 again
        D <= '1';

        wait for 10 ns;

        report "D=1 Q=" &
               std_logic'image(Q);


        report "VHDL D flip-flop simulation completed!";


        -- Stop GHDL
        std.env.stop;

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
        <div className="vhdl-process-takeaways">

          <div>
            <strong>Process</strong>
            <span>
              Describes hardware using sequential statements.
            </span>
          </div>

          <div>
            <strong>Sensitivity List</strong>
            <span>
              Determines which signal changes activate a process.
            </span>
          </div>

          <div>
            <strong>Sequential Logic</strong>
            <span>
              Statements inside a process execute sequentially.
            </span>
          </div>

          <div>
            <strong>Clocked Process</strong>
            <span>
              Used for registers and synchronous circuits.
            </span>
          </div>

          <div>
            <strong>rising_edge()</strong>
            <span>
              Detects a rising clock transition.
            </span>
          </div>

          <div>
            <strong>Reset</strong>
            <span>
              Places sequential hardware into a known state.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
         If / Else statements and how they
          are used to describe conditional hardware behavior.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Processes;