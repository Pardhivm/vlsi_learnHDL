import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Components() {
  const sections = [
    { id: "overview", title: "What is a Component?" },
    { id: "hierarchy", title: "Hierarchical Design" },
    { id: "declaration", title: "Component Declaration" },
    { id: "instantiation", title: "Component Instantiation" },
    { id: "mapping", title: "Port Mapping" },
    { id: "multiple", title: "Multiple Components" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Components"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Procedures"
      previousPath="/vhdl/procedures"
      nextLesson="FSM"
      nextPath="/vhdl/fsm"
    >

      <LessonSection
        id="overview"
        title="1. What is a Component?"
      >
        <p className="lesson-intro">
          A VHDL component allows a design to use another
          module as a building block.
        </p>

        <p>
          Components are useful when a large circuit is divided
          into smaller, reusable blocks.
        </p>

        <div className="vhdl-component-main-visual">

          <div className="vhdl-component-small">
            <small>BLOCK</small>
            <strong>ALU</strong>
          </div>

          <div className="vhdl-component-small">
            <small>BLOCK</small>
            <strong>REGISTER</strong>
          </div>

          <div className="vhdl-component-small">
            <small>BLOCK</small>
            <strong>CONTROL</strong>
          </div>

          <div className="vhdl-component-top">

            <small>TOP LEVEL</small>

            <strong>SYSTEM</strong>

            <span>
              Connects smaller blocks
            </span>

          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          Think of a component as a reusable hardware block
          that can be instantiated and connected inside another
          design.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="hierarchy"
        title="2. Hierarchical Design"
      >
        <p>
          Hierarchical design breaks a large circuit into
          smaller modules.
        </p>

        <div className="vhdl-component-hierarchy">

          <div className="vhdl-component-level top">
            <small>TOP LEVEL</small>
            <strong>CPU SYSTEM</strong>
          </div>

          <div className="vhdl-component-branches">

            <div>
              <small>BLOCK 1</small>
              <strong>ALU</strong>
            </div>

            <div>
              <small>BLOCK 2</small>
              <strong>REGISTER</strong>
            </div>

            <div>
              <small>BLOCK 3</small>
              <strong>CONTROL</strong>
            </div>

          </div>

        </div>

        <p>
          Each lower-level block can have its own entity and
          architecture. A higher-level design can then connect
          those blocks together.
        </p>
      </LessonSection>


      <LessonSection
        id="declaration"
        title="3. Component Declaration"
      >
        <p>
          A component declaration describes the interface of
          the block that will be instantiated.
        </p>

        <CodeExample title="Component Declaration">
{`component AND_GATE
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end component;`}
        </CodeExample>

        <div className="vhdl-component-declaration">

          <div>
            <span>Component name</span>
            <strong>AND_GATE</strong>
          </div>

          <div>
            <span>Input ports</span>
            <strong>A, B</strong>
          </div>

          <div>
            <span>Output port</span>
            <strong>Y</strong>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Think of It as a Blueprint"
        >
          The component declaration describes the interface
          that the parent design expects to connect.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="instantiation"
        title="4. Component Instantiation"
      >
        <p>
          After declaring a component, we can create an instance
          of it inside the architecture.
        </p>

        <CodeExample title="Component Instantiation">
{`U1 : AND_GATE
    port map (
        A => A,
        B => B,
        Y => Y
    );`}
        </CodeExample>

        <div className="vhdl-component-instance">

          <div className="vhdl-component-instance-name">
            <small>INSTANCE</small>
            <strong>U1</strong>
          </div>

          <div className="vhdl-component-instance-arrow">
            →
          </div>

          <div className="vhdl-component-instance-block">
            <small>COMPONENT</small>
            <strong>AND_GATE</strong>
          </div>

        </div>

        <p>
          <code>U1</code> is the instance name, while
          <code>AND_GATE</code> is the component being used.
        </p>
      </LessonSection>


      <LessonSection
        id="mapping"
        title="5. Port Mapping"
      >
        <p>
          The <code>port map</code> connects signals in the
          parent design to the ports of the component.
        </p>

        <CodeExample title="Port Mapping">
{`U1 : AND_GATE
    port map (
        A => INPUT_A,
        B => INPUT_B,
        Y => RESULT
    );`}
        </CodeExample>

        <div className="vhdl-component-port-map">

          <div className="vhdl-port-side">
            <small>PARENT SIGNALS</small>
            <span>INPUT_A</span>
            <span>INPUT_B</span>
            <span>RESULT</span>
          </div>

          <div className="vhdl-port-map-center">
            <strong>PORT MAP</strong>
            <span>Connect</span>
          </div>

          <div className="vhdl-port-side">
            <small>COMPONENT</small>
            <span>A</span>
            <span>B</span>
            <span>Y</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Remember"
        >
          Port mapping does not create new signals. It connects
          existing signals to component ports.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="multiple"
        title="6. Multiple Components"
      >
        <p>
          A design can instantiate multiple copies of the same
          component or use different components together.
        </p>

        <div className="vhdl-component-multiple">

          <div className="vhdl-component-input">
            A
          </div>

          <div className="vhdl-component-wire">
            →
          </div>

          <div className="vhdl-component-instance-box">
            <small>U1</small>
            <strong>AND</strong>
          </div>

          <div className="vhdl-component-wire">
            →
          </div>

          <div className="vhdl-component-instance-box">
            <small>U2</small>
            <strong>XOR</strong>
          </div>

          <div className="vhdl-component-wire">
            →
          </div>

          <div className="vhdl-component-output">
            Y
          </div>

        </div>

        <p>
          This approach makes complex designs easier to
          organize, understand, reuse, and verify.
        </p>
      </LessonSection>


      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Let's build a 2-to-1 multiplexer using smaller
          components.
        </p>

        <p>
          The multiplexer uses an inverter, two AND gates, and
          an OR gate.
        </p>

        <CodeExample title="2-to-1 MUX Using Components">
{`library IEEE;
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


entity AND_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end AND_GATE;


architecture Behavioral of AND_GATE is
begin
    Y <= A and B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity OR_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end OR_GATE;


architecture Behavioral of OR_GATE is
begin
    Y <= A or B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity MUX2 is
    port (
        A   : in std_logic;
        B   : in std_logic;
        SEL : in std_logic;
        Y   : out std_logic
    );
end MUX2;


architecture Structural of MUX2 is

    signal NOT_SEL : std_logic;
    signal W1      : std_logic;
    signal W2      : std_logic;

begin

    U1 : entity work.NOT_GATE
        port map (
            A => SEL,
            Y => NOT_SEL
        );

    U2 : entity work.AND_GATE
        port map (
            A => A,
            B => NOT_SEL,
            Y => W1
        );

    U3 : entity work.AND_GATE
        port map (
            A => B,
            B => SEL,
            Y => W2
        );

    U4 : entity work.OR_GATE
        port map (
            A => W1,
            B => W2,
            Y => Y
        );

end Structural;`}
        </CodeExample>

        <div className="vhdl-component-mux">

          <div className="vhdl-mux-input">
            A
          </div>

          <div className="vhdl-mux-block">
            <small>U2</small>
            <strong>AND</strong>
          </div>

          <div className="vhdl-mux-block">
            <small>U4</small>
            <strong>OR</strong>
          </div>

          <div className="vhdl-mux-output">
            Y
          </div>

          <div className="vhdl-mux-control">
            <span>SEL</span>
            <small>→ U1 NOT</small>
            <small>→ U3 AND</small>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Structural Design"
        >
          Here the MUX is described by connecting separate
          hardware blocks together instead of writing the entire
          circuit as one expression.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the component-based 2-to-1 MUX and observe how
          different component instances work together.
        </p>

        <TryIt
          title="VHDL Components - 2-to-1 MUX"
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


entity AND_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end AND_GATE;


architecture Behavioral of AND_GATE is
begin
    Y <= A and B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity OR_GATE is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end OR_GATE;


architecture Behavioral of OR_GATE is
begin
    Y <= A or B;
end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity MUX2 is
    port (
        A   : in std_logic;
        B   : in std_logic;
        SEL : in std_logic;
        Y   : out std_logic
    );
end MUX2;


architecture Structural of MUX2 is

    signal NOT_SEL : std_logic;
    signal W1      : std_logic;
    signal W2      : std_logic;

begin

    U1 : entity work.NOT_GATE
        port map (
            A => SEL,
            Y => NOT_SEL
        );

    U2 : entity work.AND_GATE
        port map (
            A => A,
            B => NOT_SEL,
            Y => W1
        );

    U3 : entity work.AND_GATE
        port map (
            A => B,
            B => SEL,
            Y => W2
        );

    U4 : entity work.OR_GATE
        port map (
            A => W1,
            B => W2,
            Y => Y
        );

end Structural;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity MUX2_TB is
end MUX2_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


architecture Behavioral of MUX2_TB is

    signal A   : std_logic := '0';
    signal B   : std_logic := '0';
    signal SEL : std_logic := '0';
    signal Y   : std_logic;

begin

    UUT : entity work.MUX2
        port map (
            A   => A,
            B   => B,
            SEL => SEL,
            Y   => Y
        );

    process
    begin

        A <= '1';
        B <= '0';
        SEL <= '0';

        wait for 10 ns;

        report "A=1 B=0 SEL=0 Y=" &
               std_logic'image(Y);

        A <= '1';
        B <= '0';
        SEL <= '1';

        wait for 10 ns;

        report "A=1 B=0 SEL=1 Y=" &
               std_logic'image(Y);

        A <= '0';
        B <= '1';
        SEL <= '0';

        wait for 10 ns;

        report "A=0 B=1 SEL=0 Y=" &
               std_logic'image(Y);

        A <= '0';
        B <= '1';
        SEL <= '1';

        wait for 10 ns;

        report "A=0 B=1 SEL=1 Y=" &
               std_logic'image(Y);

        report "VHDL component MUX simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-component-takeaways">

          <div>
            <strong>Component</strong>
            <span>
              A reusable hardware building block.
            </span>
          </div>

          <div>
            <strong>Hierarchy</strong>
            <span>
              Large designs can be divided into smaller blocks.
            </span>
          </div>

          <div>
            <strong>Declaration</strong>
            <span>
              Describes the component interface.
            </span>
          </div>

          <div>
            <strong>Instantiation</strong>
            <span>
              Creates an instance of a component.
            </span>
          </div>

          <div>
            <strong>Port Map</strong>
            <span>
              Connects parent signals to component ports.
            </span>
          </div>

          <div>
            <strong>Structural Design</strong>
            <span>
              Builds hardware by connecting smaller blocks.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Finite State Machines (FSMs) and
          how VHDL can describe sequential control logic.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Components;