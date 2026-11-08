import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Testbench() {
  const sections = [
    { id: "what-is-testbench", title: "What is a Testbench?" },
    { id: "dut", title: "Design Under Test (DUT)" },
    { id: "testbench-structure", title: "Testbench Structure" },
    { id: "reg-and-wire", title: "Reg and Wire" },
    { id: "instantiation", title: "Module Instantiation" },
    { id: "initial-block", title: "Initial Block" },
    { id: "stimulus", title: "Applying Stimulus" },
    { id: "monitor", title: "Monitoring Outputs" },
    { id: "delays", title: "Simulation Delays" },
    { id: "clock-generation", title: "Clock Generation" },
    { id: "complete-example", title: "Complete Testbench" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Testbench"
      sections={sections}
      previousLesson="FSM"
      previousPath="/verilog/fsm"
      nextLesson="Projects"
      nextPath="/verilog/projects"
    >

      <LessonSection
        id="what-is-testbench"
        title="What is a Testbench?"
      >
        <p>
          A <strong>testbench</strong> is a Verilog module used to test and
          verify another Verilog design.
        </p>

        <p>
          The design being tested is called the
          <strong> Design Under Test (DUT)</strong>.
        </p>

        <CodeExample title="Basic Testbench Idea">
{`Testbench
    |
    | inputs
    ↓
   DUT
    |
    | outputs
    ↓
Testbench checks results`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/testbench.png"
          alt="Verilog design and verification flow"
          caption="A testbench provides inputs to the design and observes its outputs."
        />

        <LearningNote type="info" title="Important">
          <p>
            A testbench is normally used for simulation and
            verification. It is not the hardware that will be
            synthesized into the final circuit.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="dut"
        title="Design Under Test (DUT)"
      >
        <p>
          The module that we want to test is called the
          <strong> DUT</strong>.
        </p>

        <CodeExample title="Example DUT">
{`module and_gate(
    input a,
    input b,
    output y
);

    assign y = a & b;

endmodule`}
        </CodeExample>

        <p>
          Here, <strong>and_gate</strong> is our DUT.
        </p>

        <CodeExample title="Verification Flow">
{`Testbench
   ↓
a, b
   ↓
and_gate
   ↓
y
   ↓
Check result`}
        </CodeExample>

        <LearningNote type="tip" title="Remember">
          <p>
            <strong>DUT = the design we are testing.</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="testbench-structure"
        title="Testbench Structure"
      >
        <p>
          A simple Verilog testbench usually contains:
        </p>

        <ul>
          <li>A testbench module</li>
          <li>Signals connected to the DUT</li>
          <li>An instance of the DUT</li>
          <li>An initial block</li>
          <li>Input stimulus</li>
          <li>Output monitoring</li>
        </ul>

        <CodeExample title="Basic Structure">
{`module tb;

    // Testbench signals

    // DUT instance

    // Apply inputs

    // Observe outputs

endmodule`}
        </CodeExample>

        <LearningNote type="info" title="No Ports Required">
          <p>
            A basic testbench usually does not need input or output ports
            because it is the top-level simulation module.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="reg-and-wire"
        title="Reg and Wire"
      >
        <p>
          Testbenches commonly use <strong>reg</strong> for signals that drive
          DUT inputs and <strong>wire</strong> for signals that receive DUT
          outputs.
        </p>

        <CodeExample title="Example">
{`reg a;
reg b;

wire y;`}
        </CodeExample>

        <p>
          The testbench changes <strong>a</strong> and <strong>b</strong>,
          while <strong>y</strong> is driven by the DUT.
        </p>

        <CodeExample title="Signal Direction">
{`Testbench                    DUT

reg a  --------------------> input a
reg b  --------------------> input b

wire y <-------------------- output y`}
        </CodeExample>

        <LearningNote type="important" title="Why This Matters">
          <p>
            Understanding which signals are driven by the testbench and which
            signals come from the DUT is essential for writing testbenches.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="instantiation"
        title="Module Instantiation"
      >
        <p>
          The DUT must be instantiated inside the testbench.
        </p>

        <CodeExample title="DUT Instance">
{`and_gate dut (
    .a(a),
    .b(b),
    .y(y)
);`}
        </CodeExample>

        <p>
          Here, <strong>dut</strong> is the instance name of the
          <strong> and_gate</strong> module.
        </p>

        <CodeExample title="Connection Mapping">
{`.a(a)
.b(b)
.y(y)`}
        </CodeExample>

        <LearningNote type="tip" title="Port Mapping">
          <p>
            The signal on the left is the DUT port, while the signal on the
            right is the testbench signal.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="initial-block"
        title="Initial Block"
      >
        <p>
          The <strong>initial</strong> block is commonly used in testbenches
          to execute simulation statements.
        </p>

        <CodeExample title="Initial Block">
{`initial begin

    a = 0;
    b = 0;

    #10 a = 1;
    #10 b = 1;

end`}
        </CodeExample>

        <p>
          The statements execute sequentially during simulation.
        </p>

        <LearningNote type="important" title="Simulation Construct">
          <p>
            The initial block is mainly used for simulation and testbench
            activities.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="stimulus"
        title="Applying Stimulus"
      >
        <p>
          <strong>Stimulus</strong> means the input values that we apply to
          the DUT during simulation.
        </p>

        <CodeExample title="Applying Test Inputs">
{`initial begin

    a = 0;
    b = 0;

    #10 a = 0;
    b = 1;

    #10 a = 1;
    b = 0;

    #10 a = 1;
    b = 1;

end`}
        </CodeExample>

        <p>
          These inputs allow us to test different combinations of the DUT.
        </p>

        <CodeExample title="Four Input Combinations">
{`a  b
0  0
0  1
1  0
1  1`}
        </CodeExample>

        <LearningNote type="tip" title="Good Testbench">
          <p>
            A good testbench should test the important input combinations and
            verify that the DUT behaves correctly.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="monitor"
        title="Monitoring Outputs"
      >
        <p>
          Verilog provides system tasks such as
          <strong> $display</strong> and <strong>$monitor</strong> for
          displaying simulation information.
        </p>

        <CodeExample title="$display">
{`$display(
    "a=%b b=%b y=%b",
    a,
    b,
    y
);`}
        </CodeExample>

        <p>
          <strong>$display</strong> prints information when that statement is
          executed.
        </p>

        <CodeExample title="$monitor">
{`$monitor(
    "a=%b b=%b y=%b",
    a,
    b,
    y
);`}
        </CodeExample>

        <p>
          <strong>$monitor</strong> automatically prints the values whenever
          one of its arguments changes.
        </p>

        <LearningNote type="info" title="Useful During Debugging">
          <p>
            These commands make it much easier to observe what is happening
            during simulation.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="delays"
        title="Simulation Delays"
      >
        <p>
          The <strong>#</strong> symbol is used to introduce a simulation
          delay.
        </p>

        <CodeExample title="Delay Example">
{`a = 0;
b = 0;

#10 a = 1;
#10 b = 1;`}
        </CodeExample>

        <p>
          The simulator waits for the specified amount of simulation time
          before executing the next statement.
        </p>

        <CodeExample title="Timeline">
{`Time 0   → a=0, b=0
Time 10  → a=1
Time 20  → b=1`}
        </CodeExample>

        <LearningNote type="important" title="Simulation Time">
          <p>
            Delays are useful for modeling the timing of events during
            simulation. They do not represent a physical delay in synthesized
            RTL.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="clock-generation"
        title="Clock Generation"
      >
        <p>
          Sequential designs often require a clock. A testbench can generate
          a clock using an <strong>always</strong> block.
        </p>

        <CodeExample title="Clock Generator">
{`reg clk;

initial begin
    clk = 0;
end

always #5 clk = ~clk;`}
        </CodeExample>

        <p>
          The clock changes state every 5 simulation time units.
        </p>

        <CodeExample title="Clock Waveform">
{`Time:  0  5  10  15  20  25

clk:   0  1   0   1   0   1`}
        </CodeExample>

        <LearningNote type="tip" title="Used Everywhere">
          <p>
            Clock generation is extremely common when testing counters,
            flip-flops, FSMs, UARTs, and other sequential circuits.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="complete-example"
        title="Complete Testbench"
      >
        <p>
          Let's combine everything into one simple testbench for an XOR gate.
        </p>

        <CodeExample title="XOR Gate DUT">
{`module xor_gate(
    input a,
    input b,
    output y
);

    assign y = a ^ b;

endmodule`}
        </CodeExample>

        <CodeExample title="XOR Gate Testbench">
{`module tb;

    reg a;
    reg b;

    wire y;

    xor_gate dut (
        .a(a),
        .b(b),
        .y(y)
    );

    initial begin

        $monitor(
            "time=%0t a=%b b=%b y=%b",
            $time,
            a,
            b,
            y
        );

        a = 0;
        b = 0;

        #10 a = 0;
        b = 1;

        #10 a = 1;
        b = 0;

        #10 a = 1;
        b = 1;

        #10 $finish;

    end

endmodule`}
        </CodeExample>

        <p>
          This testbench applies all four possible input combinations to the
          XOR gate and displays the output.
        </p>

        <LearningNote type="important" title="Verification Flow">
          <p>
            The basic verification process is:
          </p>

          <ol>
            <li>Write the DUT.</li>
            <li>Instantiate the DUT in the testbench.</li>
            <li>Apply input stimulus.</li>
            <li>Observe the outputs.</li>
            <li>Compare the results with the expected behavior.</li>
          </ol>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Now you can experiment with a complete DUT and testbench.
        </p>

        <p>
          Change the XOR operation and see how the simulation output changes.
        </p>

        <TryIt
          title="Build and Test an XOR Gate"
          language="Verilog"
          mode="beginner"
          initialCode={`module xor_gate(
  input a,
  input b,
  output y
);

  assign y = a ^ b;

endmodule`}
          testbenchCode={`module tb;

  reg a;
  reg b;
  wire y;

  xor_gate dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor(
      "time=%0t a=%b b=%b y=%b",
      $time,
      a,
      b,
      y
    );

    a = 0;
    b = 0;

    #10 a = 0;
    b = 1;

    #10 a = 1;
    b = 0;

    #10 a = 1;
    b = 1;

    #10 $finish;

  end

endmodule`}
        />

        <LearningNote type="tip" title="Experiment">
          <p>
            Try changing:
          </p>

          <CodeExample title="Change This">
{`assign y = a ^ b;`}
          </CodeExample>

          <p>
            to another operation such as:
          </p>

          <CodeExample title="Try This">
{`assign y = a | b;`}
          </CodeExample>

          <p>
            Then click <strong>Run</strong> and compare the outputs.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote type="important" title="Question 1">
          <p>
            What is the purpose of a testbench?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A testbench is used to test and verify a Verilog design through
            simulation.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            What does DUT stand for?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            DUT stands for <strong>Design Under Test</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            Which block is commonly used to apply test stimulus?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The <strong>initial</strong> block is commonly used to apply
            stimulus in a basic Verilog testbench.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            What does the # symbol represent in simulation?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It introduces a simulation delay.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What is the difference between $display and $monitor?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            <strong>$display</strong> prints information when it is executed,
            while <strong>$monitor</strong> automatically prints whenever one
            of its arguments changes.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            A testbench is used to verify a Verilog design through simulation.
          </li>

          <li>
            The design being tested is called the <strong>DUT</strong>.
          </li>

          <li>
            A testbench instantiates the DUT.
          </li>

          <li>
            Input stimulus is applied to the DUT.
          </li>

          <li>
            Outputs can be observed using <strong>$display</strong> and
            <strong> $monitor</strong>.
          </li>

          <li>
            The <strong>#</strong> symbol can introduce simulation delays.
          </li>

          <li>
            Testbenches can generate clocks for sequential designs.
          </li>

          <li>
            Testbenches are mainly used for simulation and verification.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now understand the basic Verilog design and verification
            flow.
          </p>

          <p>
            Next, we'll put these concepts together and start building
            <strong> Verilog Projects.</strong>
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Testbench;