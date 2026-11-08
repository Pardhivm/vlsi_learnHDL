import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function ConcurrentStatements() {
  const sections = [
    {
      id: "overview",
      title: "What are Concurrent Statements?"
    },
    {
      id: "parallel",
      title: "Parallel Hardware"
    },
    {
      id: "signal",
      title: "Concurrent Signal Assignment"
    },
    {
      id: "component",
      title: "Component Instantiation"
    },
    {
      id: "process",
      title: "Process Statement"
    },
    {
      id: "generate",
      title: "Generate Statement"
    },
    {
      id: "select",
      title: "With-Select"
    },
    {
      id: "when",
      title: "When-Else"
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
      title="VHDL Concurrent Statements"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Operators"
      previousPath="/vhdl/operators"
      nextLesson="Processes"
      nextPath="/vhdl/processes"
    >

      {/* ==================================================
          1. OVERVIEW
          ================================================== */}

      <LessonSection
        id="overview"
        title="1. What are Concurrent Statements?"
      >
        <p className="lesson-intro">
          Concurrent statements describe hardware operations
          that can operate in parallel.
        </p>

        <p>
          Unlike normal software programs that execute one
          instruction after another, digital hardware contains
          many circuits operating at the same time.
        </p>

        <div className="vhdl-concurrent-main-visual">

          <div className="vhdl-concurrent-source">
            <strong>Inputs</strong>
            <span>A, B, C</span>
          </div>

          <div className="vhdl-concurrent-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="vhdl-concurrent-blocks">

            <div>
              <strong>Logic 1</strong>
              <span>A AND B</span>
            </div>

            <div>
              <strong>Logic 2</strong>
              <span>B XOR C</span>
            </div>

            <div>
              <strong>Logic 3</strong>
              <span>NOT A</span>
            </div>

          </div>

          <div className="vhdl-concurrent-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="vhdl-concurrent-output">
            <strong>Outputs</strong>
            <span>Y1, Y2, Y3</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Core Idea"
        >
          Concurrent VHDL statements represent hardware that
          exists and operates in parallel.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          2. PARALLEL
          ================================================== */}

      <LessonSection
        id="parallel"
        title="2. Parallel Hardware"
      >
        <p>
          Consider these three assignments:
        </p>

        <CodeExample title="Three Concurrent Assignments">
{`Y1 <= A and B;

Y2 <= B xor C;

Y3 <= not A;`}
        </CodeExample>

        <p>
          These statements are not executed one after another
          like instructions in a software program. They describe
          three pieces of hardware operating concurrently.
        </p>

        <div className="vhdl-concurrent-stack">

          <div>
            <span>Statement 1</span>
            <code>Y1 &lt;= A and B;</code>
          </div>

          <div>
            <span>Statement 2</span>
            <code>Y2 &lt;= B xor C;</code>
          </div>

          <div>
            <span>Statement 3</span>
            <code>Y3 &lt;= not A;</code>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Think Like Hardware"
        >
          When reading concurrent VHDL, imagine separate
          circuits existing next to each other rather than
          instructions executing sequentially.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          3. SIGNAL ASSIGNMENT
          ================================================== */}

      <LessonSection
        id="signal"
        title="3. Concurrent Signal Assignment"
      >
        <p>
          A concurrent signal assignment continuously describes
          the relationship between signals.
        </p>

        <CodeExample title="Simple Assignment">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

Y <= A xor B;`}
        </CodeExample>

        <div className="vhdl-concurrent-assignment">

          <div className="vhdl-concurrent-signal">
            <span>A</span>
          </div>

          <div className="vhdl-concurrent-operator">
            XOR
          </div>

          <div className="vhdl-concurrent-signal">
            <span>B</span>
          </div>

          <div className="vhdl-concurrent-arrow">
            →
          </div>

          <div className="vhdl-concurrent-result">
            <span>Y</span>
          </div>

        </div>

        <p>
          The assignment is continuously active while the
          design is simulated.
        </p>
      </LessonSection>


      {/* ==================================================
          4. COMPONENT
          ================================================== */}

      <LessonSection
        id="component"
        title="4. Component Instantiation"
      >
        <p>
          Components allow one hardware block to be connected
          to another hardware block.
        </p>

        <CodeExample title="Component Structure">
{`component AND_GATE
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end component;`}
        </CodeExample>

        <CodeExample title="Instantiation">
{`U1 : AND_GATE
    port map (
        A => A,
        B => B,
        Y => Y
    );`}
        </CodeExample>

        <div className="vhdl-component-visual">

          <div className="vhdl-component-inputs">
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-component-arrow">
            →
          </div>

          <div className="vhdl-component-block">
            <small>INSTANCE U1</small>
            <strong>AND GATE</strong>
          </div>

          <div className="vhdl-component-arrow">
            →
          </div>

          <div className="vhdl-component-output">
            Y
          </div>

        </div>

        <LearningNote
          type="info"
          title="Hierarchy"
        >
          Component instantiation is useful for building large
          designs from smaller reusable hardware blocks.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          5. PROCESS
          ================================================== */}

      <LessonSection
        id="process"
        title="5. Process Statement"
      >
        <p>
          A process contains sequential VHDL statements but the
          process itself is a concurrent statement.
        </p>

        <CodeExample title="Process">
{`process(A, B)
begin

    if A = B then
        Y <= '1';
    else
        Y <= '0';
    end if;

end process;`}
        </CodeExample>

        <div className="vhdl-process-visual">

          <div className="vhdl-process-input">
            A, B
          </div>

          <div className="vhdl-process-arrow">
            →
          </div>

          <div className="vhdl-process-block">
            <small>CONCURRENT</small>
            <strong>PROCESS</strong>
            <span>Sequential statements inside</span>
          </div>

          <div className="vhdl-process-arrow">
            →
          </div>

          <div className="vhdl-process-output">
            Y
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Important"
        >
          Processes are covered in detail in the next lesson.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          6. GENERATE
          ================================================== */}

      <LessonSection
        id="generate"
        title="6. Generate Statement"
      >
        <p>
          The generate statement is used to create repeated
          or conditional hardware structures.
        </p>

        <CodeExample title="For-Generate">
{`GEN : for i in 0 to 3 generate

    Y(i) <= A(i) xor B(i);

end generate GEN;`}
        </CodeExample>

        <div className="vhdl-generate-visual">

          <div className="vhdl-generate-source">
            <strong>Generate</strong>
            <span>i = 0 ... 3</span>
          </div>

          <div className="vhdl-generate-arrow">
            →
          </div>

          <div className="vhdl-generate-copies">

            <div>Logic 0</div>
            <div>Logic 1</div>
            <div>Logic 2</div>
            <div>Logic 3</div>

          </div>

        </div>

        <p>
          Instead of manually writing four similar blocks,
          generate can describe the repeated structure once.
        </p>
      </LessonSection>


      {/* ==================================================
          7. WITH SELECT
          ================================================== */}

      <LessonSection
        id="select"
        title="7. With-Select"
      >
        <p>
          A with-select statement selects an output based on
          the value of a selection signal.
        </p>

        <CodeExample title="4-to-1 Multiplexer">
{`with SEL select

    Y <= A when "00",
         B when "01",
         C when "10",
         D when "11";`}
        </CodeExample>

        <div className="vhdl-select-visual">

          <div className="vhdl-select-inputs">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
          </div>

          <div className="vhdl-select-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="vhdl-select-mux">
            <small>SEL</small>
            <strong>4 : 1</strong>
            <span>MUX</span>
          </div>

          <div className="vhdl-select-arrow">
            →
          </div>

          <div className="vhdl-select-output">
            Y
          </div>

        </div>
      </LessonSection>


      {/* ==================================================
          8. WHEN ELSE
          ================================================== */}

      <LessonSection
        id="when"
        title="8. When-Else"
      >
        <p>
          The conditional signal assignment uses when-else to
          select a value based on conditions.
        </p>

        <CodeExample title="Conditional Assignment">
{`Y <= A when SEL = '0'
     else B;`}
        </CodeExample>

        <div className="vhdl-when-visual">

          <div className="vhdl-when-condition">
            <strong>SEL = 0</strong>
            <span>Choose A</span>
          </div>

          <div className="vhdl-when-condition">
            <strong>SEL = 1</strong>
            <span>Choose B</span>
          </div>

          <div className="vhdl-when-result">
            <small>OUTPUT</small>
            <strong>Y</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Hardware Meaning"
        >
          A conditional assignment such as when-else can
          describe combinational selection logic such as a
          multiplexer.
        </LearningNote>
      </LessonSection>


      {/* ==================================================
          9. COMPLETE EXAMPLE
          ================================================== */}

      <LessonSection
        id="example"
        title="9. Complete Example"
      >
        <p>
          Here is a small circuit using multiple concurrent
          statements at the same time.
        </p>

        <CodeExample title="Concurrent Logic Example">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CONCURRENT_DEMO is
    port (
        A  : in std_logic;
        B  : in std_logic;
        C  : in std_logic;
        Y1 : out std_logic;
        Y2 : out std_logic;
        Y3 : out std_logic
    );
end CONCURRENT_DEMO;

architecture Behavioral of CONCURRENT_DEMO is
begin

    Y1 <= A and B;
    Y2 <= B xor C;
    Y3 <= not A;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-concurrent-demo">

          <div className="vhdl-demo-inputs">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>

          <div className="vhdl-demo-paths">

            <div>
              <span>Y1</span>
              <strong>AND</strong>
            </div>

            <div>
              <span>Y2</span>
              <strong>XOR</strong>
            </div>

            <div>
              <span>Y3</span>
              <strong>NOT</strong>
            </div>

          </div>

          <div className="vhdl-demo-output">
            <span>Y1</span>
            <span>Y2</span>
            <span>Y3</span>
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
          Run the concurrent logic example and observe the
          outputs produced by three hardware operations.
        </p>

        <TryIt
          title="VHDL Concurrent Logic"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CONCURRENT_DEMO is
    port (
        A  : in std_logic;
        B  : in std_logic;
        C  : in std_logic;
        Y1 : out std_logic;
        Y2 : out std_logic;
        Y3 : out std_logic
    );
end CONCURRENT_DEMO;

architecture Behavioral of CONCURRENT_DEMO is
begin
    Y1 <= A and B;
    Y2 <= B xor C;
    Y3 <= not A;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity CONCURRENT_DEMO_TB is
end CONCURRENT_DEMO_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

architecture Behavioral of CONCURRENT_DEMO_TB is

    signal A  : std_logic := '0';
    signal B  : std_logic := '0';
    signal C  : std_logic := '0';

    signal Y1 : std_logic;
    signal Y2 : std_logic;
    signal Y3 : std_logic;

begin

    UUT : entity work.CONCURRENT_DEMO
        port map (
            A  => A,
            B  => B,
            C  => C,
            Y1 => Y1,
            Y2 => Y2,
            Y3 => Y3
        );

    process
    begin

        A <= '0';
        B <= '0';
        C <= '0';

        wait for 10 ns;

        report "A=0 B=0 C=0  Y1=" &
               std_logic'image(Y1) &
               " Y2=" &
               std_logic'image(Y2) &
               " Y3=" &
               std_logic'image(Y3);

        A <= '1';
        B <= '1';
        C <= '0';

        wait for 10 ns;

        report "A=1 B=1 C=0  Y1=" &
               std_logic'image(Y1) &
               " Y2=" &
               std_logic'image(Y2) &
               " Y3=" &
               std_logic'image(Y3);

        A <= '1';
        B <= '0';
        C <= '1';

        wait for 10 ns;

        report "A=1 B=0 C=1  Y1=" &
               std_logic'image(Y1) &
               " Y2=" &
               std_logic'image(Y2) &
               " Y3=" &
               std_logic'image(Y3);

        report "VHDL concurrent statement simulation completed!";

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
        <div className="vhdl-concurrent-takeaways">

          <div>
            <strong>Parallel</strong>
            <span>
              Concurrent statements represent hardware
              operating at the same time.
            </span>
          </div>

          <div>
            <strong>Signal Assignment</strong>
            <span>
              Describes relationships between signals.
            </span>
          </div>

          <div>
            <strong>Components</strong>
            <span>
              Connect reusable hardware blocks.
            </span>
          </div>

          <div>
            <strong>Generate</strong>
            <span>
              Creates repeated hardware structures.
            </span>
          </div>

          <div>
            <strong>With-Select</strong>
            <span>
              Selects a value based on a selector.
            </span>
          </div>

          <div>
            <strong>When-Else</strong>
            <span>
              Describes conditional signal selection.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           VHDL Processes and how sequential
          statements can be used to describe combinational and
          clocked hardware.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default ConcurrentStatements;