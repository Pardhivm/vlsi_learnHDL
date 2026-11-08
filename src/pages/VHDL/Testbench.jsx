import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Testbench() {
  const sections = [
    { id: "overview", title: "What is a Testbench?" },
    { id: "structure", title: "Testbench Structure" },
    { id: "dut", title: "Device Under Test" },
    { id: "stimulus", title: "Applying Stimulus" },
    { id: "clock", title: "Clock Generation" },
    { id: "checking", title: "Checking Outputs" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "flow", title: "Simulation Flow" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Testbench"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="FSM"
      previousPath="/vhdl/fsm"
      nextLesson="Projects"
      nextPath="/vhdl/projects"
    >

      {/* =====================================================
          1. WHAT IS A TESTBENCH?
      ===================================================== */}

      <LessonSection
        id="overview"
        title="1. What is a Testbench?"
      >
        <p className="lesson-intro">
          A VHDL testbench is a simulation environment used to
          verify whether a hardware design behaves as expected.
        </p>

        <p>
          A testbench does not normally represent hardware that
          will be synthesized onto an FPGA or ASIC. Instead, it
          provides inputs to the design and observes its outputs.
        </p>

        <div className="vhdl-testbench-main-visual">

          <div className="vhdl-testbench-source">
            <small>TESTBENCH</small>
            <strong>STIMULUS</strong>
            <span>Apply inputs</span>
          </div>

          <div className="vhdl-testbench-arrow">
            →
          </div>

          <div className="vhdl-testbench-dut">
            <small>DEVICE UNDER TEST</small>
            <strong>DUT</strong>
            <span>Design being tested</span>
          </div>

          <div className="vhdl-testbench-arrow">
            →
          </div>

          <div className="vhdl-testbench-output">
            <small>OBSERVE</small>
            <strong>OUTPUT</strong>
            <span>Check result</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          The testbench controls the simulation. It supplies
          inputs to the DUT and checks whether the outputs are
          correct.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          2. TESTBENCH STRUCTURE
      ===================================================== */}

      <LessonSection
        id="structure"
        title="2. Testbench Structure"
      >
        <p>
          A basic VHDL testbench usually contains an entity
          without ports and an architecture containing the
          simulation logic.
        </p>

        <CodeExample title="Basic Testbench">
{`entity TESTBENCH is
end TESTBENCH;


architecture Behavioral of TESTBENCH is

begin

    process
    begin

        -- Apply test signals here

        wait;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-testbench-structure">

          <div>
            <span>01</span>
            <strong>Testbench Entity</strong>
            <small>Usually has no ports</small>
          </div>

          <div>
            <span>02</span>
            <strong>Signals</strong>
            <small>Connect to the DUT</small>
          </div>

          <div>
            <span>03</span>
            <strong>DUT Instance</strong>
            <small>Design being tested</small>
          </div>

          <div>
            <span>04</span>
            <strong>Stimulus</strong>
            <small>Changes inputs</small>
          </div>

        </div>
      </LessonSection>


      {/* =====================================================
          3. DEVICE UNDER TEST
      ===================================================== */}

      <LessonSection
        id="dut"
        title="3. Device Under Test"
      >
        <p>
          The design being verified is called the
          <strong> Device Under Test</strong>, or DUT.
        </p>

        <CodeExample title="DUT Instantiation">
{`UUT : entity work.ALU
    port map (
        A      => A,
        B      => B,
        RESULT => RESULT
    );`}
        </CodeExample>

        <p>
          The instance name <code>UUT</code> commonly means
          <em> Unit Under Test</em>. It is simply a naming
          convention.
        </p>

        <div className="vhdl-testbench-dut-visual">

          <div className="vhdl-testbench-input-side">
            <small>TESTBENCH</small>
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-testbench-dut-box">
            <small>UUT / DUT</small>
            <strong>ALU</strong>
          </div>

          <div className="vhdl-testbench-output-side">
            <small>TESTBENCH</small>
            <span>RESULT</span>
          </div>

        </div>
      </LessonSection>


      {/* =====================================================
          4. APPLYING STIMULUS
      ===================================================== */}

      <LessonSection
        id="stimulus"
        title="4. Applying Stimulus"
      >
        <p>
          Stimulus is the sequence of input values applied to
          the DUT during simulation.
        </p>

        <CodeExample title="Applying Inputs">
{`process
begin

    A <= "0011";
    B <= "0101";

    wait for 10 ns;

    A <= "1001";
    B <= "0010";

    wait for 10 ns;

    wait;

end process;`}
        </CodeExample>

        <div className="vhdl-testbench-stimulus">

          <div>
            <small>TIME</small>
            <strong>0 ns</strong>
            <span>A=3, B=5</span>
          </div>

          <div className="vhdl-testbench-stimulus-arrow">
            →
          </div>

          <div>
            <small>TIME</small>
            <strong>10 ns</strong>
            <span>A=9, B=2</span>
          </div>

          <div className="vhdl-testbench-stimulus-arrow">
            →
          </div>

          <div>
            <small>TIME</small>
            <strong>20 ns</strong>
            <span>Finish</span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Why wait for?"
        >
          <code>wait for</code> allows simulation time to
          advance before the next stimulus is applied.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          5. CLOCK GENERATION
      ===================================================== */}

      <LessonSection
        id="clock"
        title="5. Clock Generation"
      >
        <p>
          Sequential designs often require a clock. A
          testbench can generate a clock by repeatedly
          inverting a signal.
        </p>

        <CodeExample title="Clock Generation">
{`signal CLK : std_logic := '0';

CLK <= not CLK after 5 ns;`}
        </CodeExample>

        <div className="vhdl-testbench-clock-visual">

          <div className="vhdl-testbench-clock-label">
            CLK
          </div>

          <div className="vhdl-testbench-clock-wave">
            <span></span>
          </div>

          <div className="vhdl-testbench-clock-info">
            <strong>10 ns period</strong>
            <small>5 ns HIGH + 5 ns LOW</small>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Clock Period"
        >
          With <code>after 5 ns</code>, the clock changes every
          5 ns, producing a 10 ns clock period.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          6. CHECKING OUTPUTS
      ===================================================== */}

      <LessonSection
        id="checking"
        title="6. Checking Outputs"
      >
        <p>
          A testbench should not only apply inputs. It should
          also check whether the DUT produced the expected
          result.
        </p>

        <CodeExample title="Using Assertions">
{`assert RESULT = EXPECTED
    report "Incorrect result!"
    severity error;`}
        </CodeExample>

        <div className="vhdl-testbench-check">

          <div className="vhdl-testbench-check-value">
            <small>ACTUAL</small>
            <strong>RESULT</strong>
          </div>

          <div className="vhdl-testbench-check-symbol">
            =
          </div>

          <div className="vhdl-testbench-check-value">
            <small>EXPECTED</small>
            <strong>EXPECTED</strong>
          </div>

          <div className="vhdl-testbench-check-result">
            PASS
          </div>

        </div>

        <p>
          Assertions are extremely useful because they can
          automatically detect incorrect behavior.
        </p>
      </LessonSection>


      {/* =====================================================
          7. COMPLETE EXAMPLE
      ===================================================== */}

      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Let's verify a 4-bit magnitude comparator. The DUT
          compares two unsigned values and produces three
          outputs:
          <code> A_GT_B</code>, <code> A_EQ_B</code>, and
          <code> A_LT_B</code>.
        </p>

        <CodeExample title="Comparator Testbench">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR is
    port (
        A      : in unsigned(3 downto 0);
        B      : in unsigned(3 downto 0);
        A_GT_B : out std_logic;
        A_EQ_B : out std_logic;
        A_LT_B : out std_logic
    );
end COMPARATOR;


architecture Behavioral of COMPARATOR is
begin

    A_GT_B <= '1' when A > B else '0';
    A_EQ_B <= '1' when A = B else '0';
    A_LT_B <= '1' when A < B else '0';

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

    signal A      : unsigned(3 downto 0);
    signal B      : unsigned(3 downto 0);
    signal A_GT_B : std_logic;
    signal A_EQ_B : std_logic;
    signal A_LT_B : std_logic;

begin

    UUT : entity work.COMPARATOR
        port map (
            A      => A,
            B      => B,
            A_GT_B => A_GT_B,
            A_EQ_B => A_EQ_B,
            A_LT_B => A_LT_B
        );

    process
    begin

        A <= to_unsigned(9, 4);
        B <= to_unsigned(4, 4);

        wait for 10 ns;

        assert A_GT_B = '1'
            report "Test 1 failed!"
            severity error;

        A <= to_unsigned(5, 4);
        B <= to_unsigned(5, 4);

        wait for 10 ns;

        assert A_EQ_B = '1'
            report "Test 2 failed!"
            severity error;

        A <= to_unsigned(2, 4);
        B <= to_unsigned(7, 4);

        wait for 10 ns;

        assert A_LT_B = '1'
            report "Test 3 failed!"
            severity error;

        report "All comparator tests passed!";

        wait;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-testbench-example">

          <div>
            <small>TEST 1</small>
            <strong>9 &gt; 4</strong>
            <span>A_GT_B = 1</span>
          </div>

          <div>
            <small>TEST 2</small>
            <strong>5 = 5</strong>
            <span>A_EQ_B = 1</span>
          </div>

          <div>
            <small>TEST 3</small>
            <strong>2 &lt; 7</strong>
            <span>A_LT_B = 1</span>
          </div>

        </div>
      </LessonSection>


      {/* =====================================================
          8. TRY IT YOURSELF
      ===================================================== */}

      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the comparator testbench and see the assertions
          verify three different input conditions.
        </p>

        <TryIt
          title="VHDL Testbench - Comparator"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR is
    port (
        A      : in unsigned(3 downto 0);
        B      : in unsigned(3 downto 0);
        A_GT_B : out std_logic;
        A_EQ_B : out std_logic;
        A_LT_B : out std_logic
    );
end COMPARATOR;


architecture Behavioral of COMPARATOR is
begin

    A_GT_B <= '1' when A > B else '0';
    A_EQ_B <= '1' when A = B else '0';
    A_LT_B <= '1' when A < B else '0';

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity COMPARATOR_TB is
end COMPARATOR_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use std.env.all;

architecture Behavioral of COMPARATOR_TB is

    -- Initialize signals to known values.
    -- This prevents NUMERIC_STD metavalue warnings at 0 ns.
    signal A      : unsigned(3 downto 0) := (others => '0');
    signal B      : unsigned(3 downto 0) := (others => '0');

    signal A_GT_B : std_logic := '0';
    signal A_EQ_B : std_logic := '0';
    signal A_LT_B : std_logic := '0';

begin

    UUT : entity work.COMPARATOR
        port map (
            A      => A,
            B      => B,
            A_GT_B => A_GT_B,
            A_EQ_B => A_EQ_B,
            A_LT_B => A_LT_B
        );


    process
    begin

        -- ==========================================
        -- TEST 1: A > B
        -- ==========================================

        A <= to_unsigned(9, 4);
        B <= to_unsigned(4, 4);

        wait for 10 ns;

        assert A_GT_B = '1'
            report "Test 1 failed!"
            severity error;

        report "Test 1 passed: 9 > 4";


        -- ==========================================
        -- TEST 2: A = B
        -- ==========================================

        A <= to_unsigned(5, 4);
        B <= to_unsigned(5, 4);

        wait for 10 ns;

        assert A_EQ_B = '1'
            report "Test 2 failed!"
            severity error;

        report "Test 2 passed: 5 = 5";


        -- ==========================================
        -- TEST 3: A < B
        -- ==========================================

        A <= to_unsigned(2, 4);
        B <= to_unsigned(7, 4);

        wait for 10 ns;

        assert A_LT_B = '1'
            report "Test 3 failed!"
            severity error;

        report "Test 3 passed: 2 < 7";


        -- ==========================================
        -- SIMULATION COMPLETE
        -- ==========================================

        report "All comparator tests passed!";

        -- Explicitly terminate GHDL.
        std.env.stop;

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      {/* =====================================================
          9. SIMULATION FLOW
      ===================================================== */}

      <LessonSection
        id="flow"
        title="9. Simulation Flow"
      >
        <p>
          A typical testbench verification flow looks like this:
        </p>

        <div className="vhdl-testbench-flow">

          <div>
            <span>01</span>
            <strong>Compile</strong>
            <small>Compile DUT and testbench</small>
          </div>

          <div className="vhdl-testbench-flow-arrow">
            →
          </div>

          <div>
            <span>02</span>
            <strong>Simulate</strong>
            <small>Run the testbench</small>
          </div>

          <div className="vhdl-testbench-flow-arrow">
            →
          </div>

          <div>
            <span>03</span>
            <strong>Observe</strong>
            <small>Read outputs</small>
          </div>

          <div className="vhdl-testbench-flow-arrow">
            →
          </div>

          <div>
            <span>04</span>
            <strong>Verify</strong>
            <small>Check expected behavior</small>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Real VLSI Workflow"
        >
          Testbenches are a fundamental part of RTL verification.
          Before hardware is programmed or fabricated, engineers
          extensively simulate their designs.
        </LearningNote>
      </LessonSection>


      {/* =====================================================
          10. KEY TAKEAWAYS
      ===================================================== */}

      <LessonSection
        id="takeaways"
        title="10. Key Takeaways"
      >
        <div className="vhdl-testbench-takeaways">

          <div>
            <strong>Testbench</strong>
            <span>
              Provides a simulation environment.
            </span>
          </div>

          <div>
            <strong>DUT</strong>
            <span>
              The design being verified.
            </span>
          </div>

          <div>
            <strong>Stimulus</strong>
            <span>
              Input values applied during simulation.
            </span>
          </div>

          <div>
            <strong>Clock</strong>
            <span>
              Drives sequential designs during simulation.
            </span>
          </div>

          <div>
            <strong>Assertions</strong>
            <span>
              Automatically detect incorrect behavior.
            </span>
          </div>

          <div>
            <strong>Verification</strong>
            <span>
              Confirms that the design behaves as intended.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll put the concepts together in
          VHDL Projects and start thinking
          like an RTL designer.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Testbench;