import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function FSM() {
  const sections = [
    { id: "what-is-fsm", title: "What is an FSM?" },
    { id: "states", title: "States" },
    { id: "transitions", title: "State Transitions" },
    { id: "moore", title: "Moore FSM" },
    { id: "mealy", title: "Mealy FSM" },
    { id: "moore-vs-mealy", title: "Moore vs Mealy" },
    { id: "state-register", title: "State Register" },
    { id: "next-state", title: "Next-State Logic" },
    { id: "output-logic", title: "Output Logic" },
    { id: "traffic-light", title: "Traffic Light FSM" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Finite State Machines (FSM)"
      sections={sections}
      previousLesson="Tasks"
      previousPath="/verilog/tasks"
      nextLesson="Testbench"
      nextPath="/verilog/testbench"
    >

      <LessonSection
        id="what-is-fsm"
        title="What is an FSM?"
      >
        <p>
          <strong>FSM</strong> stands for
          <strong> Finite State Machine</strong>.
        </p>

        <p>
          An FSM is a digital system that moves between a finite number of
          predefined <strong>states</strong> based on inputs and clock events.
        </p>

        <p>
          FSMs are commonly used to control the behavior of digital systems.
        </p>

        <CodeExample title="Basic FSM Concept">
{`Current State
      ↓
   Input
      ↓
Next State
      ↓
   Output`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/fsm.png"
          alt="Digital state machine concept"
          caption="An FSM moves between predefined states according to inputs and clock events."
        />

        <LearningNote type="info" title="Think Like a Controller">
          <p>
            Imagine a traffic light controller. It can be in states such as
             RED, GREEN, and
            YELLOW.
          </p>

          <p>
            The controller changes from one state to another according to
            predefined rules.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="states"
        title="States"
      >
        <p>
          A <strong>state</strong> represents a particular condition or mode
          of operation of a digital system.
        </p>

        <CodeExample title="Traffic Light States">
{`RED
GREEN
YELLOW`}
        </CodeExample>

        <p>
          At any particular time, the FSM is in one of these states.
        </p>

        <CodeExample title="Example State Flow">
{`RED → GREEN → YELLOW → RED`}
        </CodeExample>

        <LearningNote type="tip" title="Remember">
          <p>
            A state describes where the controller currently is
            in its operation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="transitions"
        title="State Transitions"
      >
        <p>
          A <strong>state transition</strong> occurs when an FSM moves from
          one state to another.
        </p>

        <CodeExample title="Traffic Light Transition">
{`RED
 ↓
GREEN
 ↓
YELLOW
 ↓
RED`}
        </CodeExample>

        <p>
          The transition can depend on inputs, timers, or other control
          signals.
        </p>

        <CodeExample title="Example">
{`if (timer_done)
    next_state = GREEN;`}
        </CodeExample>

        <LearningNote type="info" title="Clocked FSMs">
          <p>
            In synchronous digital designs, state changes commonly occur on a
            clock edge.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="moore"
        title="Moore FSM"
      >
        <p>
          In a <strong>Moore FSM</strong>, the output depends only on the
          current state.
        </p>

        <CodeExample title="Moore Concept">
{`Output = f(Current State)`}
        </CodeExample>

        <CodeExample title="Example">
{`case (state)

    RED:    light = 3'b100;
    GREEN:  light = 3'b010;
    YELLOW: light = 3'b001;

endcase`}
        </CodeExample>

        <p>
          The output is determined by the current state.
        </p>

        <LearningNote type="tip" title="Simple Rule">
          <p>
            <strong>Moore → Output depends on State</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="mealy"
        title="Mealy FSM"
      >
        <p>
          In a <strong>Mealy FSM</strong>, the output depends on both the
          current state and the inputs.
        </p>

        <CodeExample title="Mealy Concept">
{`Output = f(Current State, Input)`}
        </CodeExample>

        <CodeExample title="Example">
{`if (state == IDLE && start)
    done = 1'b1;
else
    done = 1'b0;`}
        </CodeExample>

        <p>
          Here, the output depends on both <strong>state</strong> and
          <strong>start</strong>.
        </p>

        <LearningNote type="tip" title="Simple Rule">
          <p>
            <strong>Mealy → Output depends on State + Input</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="moore-vs-mealy"
        title="Moore vs Mealy"
      >
        <p>
          Moore and Mealy machines are the two common FSM models.
        </p>

        <CodeExample title="Comparison">
{`Moore FSM
Output = Current State

Mealy FSM
Output = Current State + Input`}
        </CodeExample>

        <ul>
          <li>
            Moore outputs depend only on the current state.
          </li>

          <li>
            Mealy outputs depend on the current state and inputs.
          </li>

          <li>
            Mealy outputs can respond directly to input changes.
          </li>

          <li>
            Moore outputs are often easier to reason about because they are
            tied to states.
          </li>
        </ul>

        <LearningNote type="important" title="For Now">
          <p>
            Both approaches are important. In real RTL projects, the choice
            depends on the design requirements.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="state-register"
        title="State Register"
      >
        <p>
          A synchronous FSM normally needs a register to store the current
          state.
        </p>

        <CodeExample title="State Register">
{`always @(posedge clk) begin
    state <= next_state;
end`}
        </CodeExample>

        <p>
          At each rising edge of the clock, the FSM updates its current state.
        </p>

        <CodeExample title="State Flow">
{`Current State
     ↓
  Clock Edge
     ↓
 Next State
     ↓
Current State`}
        </CodeExample>

        <LearningNote type="important" title="Sequential Logic">
          <p>
            The state register is sequential logic because it stores
            information and is controlled by the clock.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="next-state"
        title="Next-State Logic"
      >
        <p>
          Next-state logic determines which state the FSM should enter next.
        </p>

        <CodeExample title="Next-State Logic">
{`always @(*) begin

    case (state)

        IDLE:
            next_state = RUN;

        RUN:
            next_state = DONE;

        DONE:
            next_state = IDLE;

        default:
            next_state = IDLE;

    endcase

end`}
        </CodeExample>

        <p>
          The current state determines the next state.
        </p>

        <LearningNote type="tip" title="Two Important Parts">
          <p>
            A typical FSM separates:
          </p>

          <p>
            <strong>State register</strong> → stores current state.
          </p>

          <p>
            <strong>Next-state logic</strong> → calculates the next state.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="output-logic"
        title="Output Logic"
      >
        <p>
          Output logic determines what the FSM produces.
        </p>

        <CodeExample title="Moore Output Logic">
{`always @(*) begin

    case (state)

        IDLE:  done = 1'b0;
        RUN:   done = 1'b0;
        DONE:  done = 1'b1;

        default: done = 1'b0;

    endcase

end`}
        </CodeExample>

        <p>
          Here, <strong>done</strong> depends only on the current state.
        </p>

        <LearningNote type="info" title="FSM Structure">
          <p>
            A typical FSM contains:
          </p>

          <ul>
            <li>State register</li>
            <li>Next-state logic</li>
            <li>Output logic</li>
          </ul>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="traffic-light"
        title="Traffic Light FSM"
      >
        <p>
          Let's build a simple traffic light controller with three states.
        </p>

        <CodeExample title="Traffic Light States">
{`RED
GREEN
YELLOW`}
        </CodeExample>

        <CodeExample title="State Transitions">
{`RED → GREEN
GREEN → YELLOW
YELLOW → RED`}
        </CodeExample>

        <p>
          A clock controls when the controller moves to the next state.
        </p>

        <CodeExample title="Traffic Light FSM">
{`module traffic_light(
    input clk,
    input reset,
    output reg [2:0] light
);

    parameter RED    = 2'b00;
    parameter GREEN  = 2'b01;
    parameter YELLOW = 2'b10;

    reg [1:0] state;
    reg [1:0] next_state;

    always @(posedge clk) begin

        if (reset)
            state <= RED;
        else
            state <= next_state;

    end

    always @(*) begin

        case (state)

            RED:
                next_state = GREEN;

            GREEN:
                next_state = YELLOW;

            YELLOW:
                next_state = RED;

            default:
                next_state = RED;

        endcase

    end

    always @(*) begin

        case (state)

            RED:
                light = 3'b100;

            GREEN:
                light = 3'b010;

            YELLOW:
                light = 3'b001;

            default:
                light = 3'b100;

        endcase

    end

endmodule`}
        </CodeExample>

        <p>
          This FSM has three states and produces a different output for each
          state.
        </p>

        <LearningNote type="important" title="Real-World Applications">
          <p>
            FSMs are used in traffic controllers, communication protocols,
            CPU control units, memory controllers, UARTs, vending machines,
            and many other digital systems.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's experiment with a small FSM that cycles through three states.
        </p>

        <p>
          The output changes as the clock advances the FSM through its
          states.
        </p>

        <TryIt
          title="Experiment with an FSM"
          language="Verilog"
          mode="beginner"
          initialCode={`module traffic_fsm(
  input clk,
  input reset,
  output reg [2:0] light
);

  parameter RED = 2'b00;
  parameter GREEN = 2'b01;
  parameter YELLOW = 2'b10;

  reg [1:0] state;
  reg [1:0] next_state;

  always @(posedge clk) begin

    if (reset)
      state <= RED;
    else
      state <= next_state;

  end

  always @(*) begin

    case (state)

      RED:
        next_state = GREEN;

      GREEN:
        next_state = YELLOW;

      YELLOW:
        next_state = RED;

      default:
        next_state = RED;

    endcase

  end

  always @(*) begin

    case (state)

      RED:
        light = 3'b100;

      GREEN:
        light = 3'b010;

      YELLOW:
        light = 3'b001;

      default:
        light = 3'b100;

    endcase

  end

endmodule`}
          testbenchCode={`module tb;

  reg clk;
  reg reset;
  wire [2:0] light;

  traffic_fsm dut (
    .clk(clk),
    .reset(reset),
    .light(light)
  );

  initial begin
    clk = 0;

    forever #5 clk = ~clk;
  end

  initial begin

    $monitor(
      "time=%0t reset=%b light=%b",
      $time,
      reset,
      light
    );

    reset = 1;

    #10 reset = 0;

    #40 $finish;

  end

endmodule`}
        />
      </LessonSection>

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote type="important" title="Question 1">
          <p>
            What does FSM stand for?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            FSM stands for <strong>Finite State Machine</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            What is a state?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A state represents a particular condition or mode of operation of
            a digital system.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What is the main difference between Moore and Mealy FSMs?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A Moore output depends on the current state, while a Mealy output
            depends on the current state and inputs.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does the state register do?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It stores the current state of the FSM.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            Name three common applications of FSMs.
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            Examples include traffic controllers, communication protocols,
            CPU control units, UARTs, and memory controllers.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            FSM stands for <strong>Finite State Machine</strong>.
          </li>

          <li>
            An FSM consists of a finite number of states.
          </li>

          <li>
            State transitions determine how the FSM moves between states.
          </li>

          <li>
            A state register stores the current state.
          </li>

          <li>
            Next-state logic determines the next state.
          </li>

          <li>
            Moore outputs depend on the current state.
          </li>

          <li>
            Mealy outputs depend on the current state and inputs.
          </li>

          <li>
            FSMs are widely used in real digital systems.
          </li>

          <li>
            Traffic controllers, UARTs, CPUs, and communication protocols
            commonly use FSM-based control logic.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            FSMs are one of the most important concepts in RTL design.
          </p>

          <p>
            Next, we'll learn how to create a
            Verilog Testbench and use it to verify our
            designs.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default FSM;