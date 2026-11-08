import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function FSM() {
  const sections = [
    { id: "overview", title: "What is an FSM?" },
    { id: "states", title: "States" },
    { id: "moore-mealy", title: "Moore vs Mealy" },
    { id: "structure", title: "VHDL FSM Structure" },
    { id: "state-type", title: "State Type" },
    { id: "next-state", title: "Next-State Logic" },
    { id: "output", title: "Output Logic" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Finite State Machines (FSM)"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Components"
      previousPath="/vhdl/components"
      nextLesson="Testbench"
      nextPath="/vhdl/testbench"
    >

      <LessonSection
        id="overview"
        title="1. What is an FSM?"
      >
        <p className="lesson-intro">
          A Finite State Machine (FSM) is a digital circuit
          that operates through a finite number of defined
          states.
        </p>

        <p>
          The current state and external inputs determine what
          the circuit should do next.
        </p>

        <div className="vhdl-fsm-main-visual">

          <div className="vhdl-fsm-state">
            <small>CURRENT STATE</small>
            <strong>IDLE</strong>
          </div>

          <div className="vhdl-fsm-arrow">
            →
          </div>

          <div className="vhdl-fsm-decision">
            <small>INPUT</small>
            <strong>START?</strong>
          </div>

          <div className="vhdl-fsm-arrow">
            →
          </div>

          <div className="vhdl-fsm-state active">
            <small>NEXT STATE</small>
            <strong>RUN</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          An FSM remembers its current state and uses inputs
          to determine the next state and outputs.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="states"
        title="2. States"
      >
        <p>
          A state represents a particular condition or operating
          mode of a digital system.
        </p>

        <div className="vhdl-fsm-state-flow">

          <div className="vhdl-fsm-circle">
            <span>STATE</span>
            <strong>IDLE</strong>
          </div>

          <div className="vhdl-fsm-transition">
            START
            <span>→</span>
          </div>

          <div className="vhdl-fsm-circle">
            <span>STATE</span>
            <strong>RUN</strong>
          </div>

          <div className="vhdl-fsm-transition">
            DONE
            <span>→</span>
          </div>

          <div className="vhdl-fsm-circle">
            <span>STATE</span>
            <strong>IDLE</strong>
          </div>

        </div>

        <p>
          For example, a controller could have states such as
          <code> IDLE</code>, <code>RUN</code>, and
          <code> DONE</code>.
        </p>
      </LessonSection>


      <LessonSection
        id="moore-mealy"
        title="3. Moore vs Mealy"
      >
        <p>
          FSMs are commonly classified as Moore or Mealy
          machines.
        </p>

        <div className="vhdl-fsm-machine-comparison">

          <div className="vhdl-fsm-machine">

            <h3>Moore Machine</h3>

            <div className="vhdl-fsm-machine-flow">
              <span>STATE</span>
              <b>→</b>
              <span>OUTPUT</span>
            </div>

            <p>
              Output depends primarily on the current state.
            </p>

          </div>

          <div className="vhdl-fsm-machine">

            <h3>Mealy Machine</h3>

            <div className="vhdl-fsm-machine-flow">
              <span>STATE</span>
              <b>+</b>
              <span>INPUT</span>
              <b>→</b>
              <span>OUTPUT</span>
            </div>

            <p>
              Output depends on state and input.
            </p>

          </div>

        </div>

        <LearningNote
          type="tip"
          title="Quick Memory Trick"
        >
          Moore → output depends on state. Mealy → output
          depends on state and input.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="structure"
        title="4. VHDL FSM Structure"
      >
        <p>
          A typical VHDL FSM contains three important parts:
        </p>

        <div className="vhdl-fsm-structure">

          <div>
            <span>01</span>
            <strong>State Register</strong>
            <small>Stores current state</small>
          </div>

          <div>
            <span>02</span>
            <strong>Next-State Logic</strong>
            <small>Determines next state</small>
          </div>

          <div>
            <span>03</span>
            <strong>Output Logic</strong>
            <small>Determines outputs</small>
          </div>

        </div>

        <CodeExample title="Basic FSM Structure">
{`type state_type is (
    IDLE,
    RUN,
    DONE
);

signal current_state : state_type;
signal next_state    : state_type;

process(CLK)
begin

    if rising_edge(CLK) then
        current_state <= next_state;
    end if;

end process;`}
        </CodeExample>
      </LessonSection>


      <LessonSection
        id="state-type"
        title="5. State Type"
      >
        <p>
          VHDL allows us to define an enumerated type for FSM
          states.
        </p>

        <CodeExample title="Enumerated State Type">
{`type state_type is (
    IDLE,
    RUN,
    DONE,
    ERROR
);

signal current_state : state_type;`}
        </CodeExample>

        <div className="vhdl-fsm-state-type">

          <div className="vhdl-fsm-type-label">
            STATE TYPE
          </div>

          <div className="vhdl-fsm-type-state">
            IDLE
          </div>

          <div className="vhdl-fsm-type-state">
            RUN
          </div>

          <div className="vhdl-fsm-type-state">
            DONE
          </div>

          <div className="vhdl-fsm-type-state">
            ERROR
          </div>

        </div>

        <p>
          Enumerated states make FSM code easier to read than
          using arbitrary binary values directly.
        </p>
      </LessonSection>


      <LessonSection
        id="next-state"
        title="6. Next-State Logic"
      >
        <p>
          Next-state logic determines which state the FSM should
          enter after the current clock cycle.
        </p>

        <CodeExample title="Next-State Logic">
{`process(current_state, START, DONE)

begin

    next_state <= current_state;

    case current_state is

        when IDLE =>
            if START = '1' then
                next_state <= RUN;
            end if;

        when RUN =>
            if DONE = '1' then
                next_state <= IDLE;
            end if;

        when others =>
            next_state <= IDLE;

    end case;

end process;`}
        </CodeExample>

        <div className="vhdl-fsm-transition-visual">

          <div>
            <strong>IDLE</strong>
            <span>START = 1</span>
          </div>

          <div className="vhdl-fsm-transition-arrow">
            →
          </div>

          <div className="vhdl-fsm-transition-result">
            <strong>RUN</strong>
            <span>Next State</span>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="output"
        title="7. Output Logic"
      >
        <p>
          Output logic determines what the FSM produces for
          each state.
        </p>

        <CodeExample title="Moore Output Logic">
{`process(current_state)

begin

    case current_state is

        when IDLE =>
            LED <= '0';

        when RUN =>
            LED <= '1';

        when others =>
            LED <= '0';

    end case;

end process;`}
        </CodeExample>

        <div className="vhdl-fsm-output-visual">

          <div>
            <strong>IDLE</strong>
            <span>LED = 0</span>
          </div>

          <div>
            <strong>RUN</strong>
            <span>LED = 1</span>
          </div>

          <div>
            <strong>DONE</strong>
            <span>LED = 0</span>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="example"
        title="8. Complete Example"
      >
        <p>
          Let's create a simple two-state controller.
          The controller switches between
          <code> RED</code> and <code> GREEN</code> whenever
          the enable input is asserted.
        </p>

        <CodeExample title="Simple FSM">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity TRAFFIC_FSM is

    port (
        CLK    : in std_logic;
        RESET  : in std_logic;
        ENABLE : in std_logic;
        RED    : out std_logic;
        GREEN  : out std_logic
    );

end TRAFFIC_FSM;


architecture Behavioral of TRAFFIC_FSM is

    type state_type is (
        RED_STATE,
        GREEN_STATE
    );

    signal current_state : state_type;
    signal next_state    : state_type;

begin

    process(CLK)
    begin

        if rising_edge(CLK) then

            if RESET = '1' then
                current_state <= RED_STATE;
            else
                current_state <= next_state;
            end if;

        end if;

    end process;


    process(current_state, ENABLE)
    begin

        next_state <= current_state;

        case current_state is

            when RED_STATE =>

                if ENABLE = '1' then
                    next_state <= GREEN_STATE;
                end if;

            when GREEN_STATE =>

                if ENABLE = '1' then
                    next_state <= RED_STATE;
                end if;

        end case;

    end process;


    RED <= '1' when current_state = RED_STATE
           else '0';

    GREEN <= '1' when current_state = GREEN_STATE
             else '0';

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-fsm-traffic-visual">

          <div className="vhdl-fsm-traffic-state red">
            <small>STATE 1</small>
            <strong>RED</strong>
            <span>RED = 1</span>
          </div>

          <div className="vhdl-fsm-traffic-arrow">
            ENABLE = 1
            <strong>→</strong>
          </div>

          <div className="vhdl-fsm-traffic-state green">
            <small>STATE 2</small>
            <strong>GREEN</strong>
            <span>GREEN = 1</span>
          </div>

          <div className="vhdl-fsm-traffic-arrow">
            ENABLE = 1
            <strong>→</strong>
          </div>

          <div className="vhdl-fsm-traffic-state red">
            <small>STATE 1</small>
            <strong>RED</strong>
            <span>RED = 1</span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="How It Works"
        >
          The clock updates the current state. The next-state
          logic decides whether the FSM should remain in the
          current state or transition to the other state.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="9. Try It Yourself"
      >
        <p>
          Run the FSM and observe how the state changes when
          <code> ENABLE</code> is asserted.
        </p>

        <TryIt
          title="VHDL FSM - Traffic Controller"
          language="VHDL"
         initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity TRAFFIC_CONTROLLER is
    port (
        CLK    : in  std_logic;
        RESET  : in  std_logic;
        ENABLE : in  std_logic;
        RED    : out std_logic;
        GREEN  : out std_logic
    );
end TRAFFIC_CONTROLLER;


architecture Behavioral of TRAFFIC_CONTROLLER is

    type state_type is (RED_STATE, GREEN_STATE);
    signal current_state : state_type;

begin

    process(CLK)
    begin

        if rising_edge(CLK) then

            if RESET = '1' then

                current_state <= RED_STATE;

            elsif ENABLE = '1' then

                case current_state is

                    when RED_STATE =>
                        current_state <= GREEN_STATE;

                    when GREEN_STATE =>
                        current_state <= RED_STATE;

                end case;

            end if;

        end if;

    end process;


    process(current_state)
    begin

        case current_state is

            when RED_STATE =>
                RED   <= '1';
                GREEN <= '0';

            when GREEN_STATE =>
                RED   <= '0';
                GREEN <= '1';

        end case;

    end process;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use std.env.all;

entity TRAFFIC_CONTROLLER_TB is
end TRAFFIC_CONTROLLER_TB;


architecture Behavioral of TRAFFIC_CONTROLLER_TB is

    signal CLK    : std_logic := '0';
    signal RESET  : std_logic := '0';
    signal ENABLE : std_logic := '0';

    signal RED    : std_logic;
    signal GREEN  : std_logic;

begin

    UUT : entity work.TRAFFIC_CONTROLLER
        port map (
            CLK    => CLK,
            RESET  => RESET,
            ENABLE => ENABLE,
            RED    => RED,
            GREEN  => GREEN
        );


    -- Clock generation
    CLK <= not CLK after 5 ns;


    process
    begin

        -- Reset the FSM
        RESET <= '1';
        ENABLE <= '0';

        wait for 10 ns;

        report "RESET: RED=" &
               std_logic'image(RED) &
               " GREEN=" &
               std_logic'image(GREEN);


        -- Enable FSM
        RESET <= '0';
        ENABLE <= '1';

        wait for 10 ns;

        report "STATE 1: RED=" &
               std_logic'image(RED) &
               " GREEN=" &
               std_logic'image(GREEN);


        wait for 10 ns;

        report "STATE 2: RED=" &
               std_logic'image(RED) &
               " GREEN=" &
               std_logic'image(GREEN);


        wait for 10 ns;

        report "STATE 3: RED=" &
               std_logic'image(RED) &
               " GREEN=" &
               std_logic'image(GREEN);


        wait for 10 ns;

        report "STATE 4: RED=" &
               std_logic'image(RED) &
               " GREEN=" &
               std_logic'image(GREEN);


        report "VHDL FSM simulation completed!";


        -- Stop the simulator
        std.env.stop;

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="10. Key Takeaways"
      >
        <div className="vhdl-fsm-takeaways">

          <div>
            <strong>State</strong>
            <span>
              Represents the current operating condition.
            </span>
          </div>

          <div>
            <strong>Transition</strong>
            <span>
              Moves the FSM from one state to another.
            </span>
          </div>

          <div>
            <strong>State Register</strong>
            <span>
              Stores the current state.
            </span>
          </div>

          <div>
            <strong>Next-State Logic</strong>
            <span>
              Determines the next state.
            </span>
          </div>

          <div>
            <strong>Moore</strong>
            <span>
              Output depends on the current state.
            </span>
          </div>

          <div>
            <strong>Mealy</strong>
            <span>
              Output depends on state and input.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           VHDL Testbenches and how to verify
          our designs through simulation.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default FSM;