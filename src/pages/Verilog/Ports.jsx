import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";


function Ports() {

  const sections = [
    {
      id: "what-are-ports",
      title: "What are Ports?"
    },
    {
      id: "input-ports",
      title: "Input Ports"
    },
    {
      id: "output-ports",
      title: "Output Ports"
    },
    {
      id: "module-with-ports",
      title: "Module with Ports"
    },
    {
      id: "port-directions",
      title: "Port Directions"
    },
    {
      id: "visual-example",
      title: "Visual Example"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    },
    {
      id: "practice",
      title: "Practice"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];


  return (

    <LessonPage

      title="Verilog Ports"

      sections={sections}

      previousLesson="Modules"

      previousPath="/verilog/modules"

      nextLesson="Data Types"

      nextPath="/verilog/data-types"

    >


      {/* =========================
          What are Ports?
          ========================= */}

      <LessonSection
        id="what-are-ports"
        title="What are Ports?"
      >

        <p>
          <strong>Ports</strong> are the connection points
          between a Verilog module and the outside world.
        </p>

        <p>
          They allow signals to enter or leave a module.
        </p>


        <LessonVisual
          type="diagram"
          src="/diagrams/and-gate.png"
          alt="AND gate showing input and output ports"
          caption="A module receives signals through input ports and sends signals through output ports."
        />


        <LearningNote
          type="info"
          title="Think of Ports Like Wires"
        >

          <p>
            Imagine a hardware block with wires connected
            to it.
          </p>

          <p>
            In Verilog, these connections are represented
            using ports.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Input Ports
          ========================= */}

      <LessonSection
        id="input-ports"
        title="Input Ports"
      >

        <p>
          An <strong>input port</strong> is a signal that
          enters a module.
        </p>


        <CodeExample
          title="Input Port"
        >
{`module example(
    input a
);

endmodule`}
        </CodeExample>


        <p>
          Here, <strong>a</strong> is an input port.
        </p>

        <p>
          A value from outside the module can be supplied
          through this port.
        </p>


        <LearningNote
          type="tip"
          title="Remember"
        >

          <p>
            <strong>input</strong> means the signal comes into the module.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Output Ports
          ========================= */}

      <LessonSection
        id="output-ports"
        title="Output Ports"
      >

        <p>
          An <strong>output port</strong> is a signal that
          leaves a module.
        </p>


        <CodeExample
          title="Output Port"
        >
{`module example(
    output y
);

endmodule`}
        </CodeExample>


        <p>
          Here, <strong>y</strong> is an output port.
        </p>

        <p>
          The module produces a value on this port that can
          be used by other parts of the design.
        </p>


        <LearningNote
          type="tip"
          title="Remember"
        >

          <p>
            <strong>output</strong> means the signal goes out of the module.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Module with Ports
          ========================= */}

      <LessonSection
        id="module-with-ports"
        title="Module with Ports"
      >

        <p>
          A module can have multiple input and output
          ports.
        </p>


        <CodeExample
          title="AND Gate Ports"
        >
{`module and_gate(
    input a,
    input b,
    output y
);

    assign y = a & b;

endmodule`}
        </CodeExample>


        <p>
          This AND gate has:
        </p>


        <ul>

          <li>
            <strong>a</strong> → input port
          </li>

          <li>
            <strong>b</strong> → input port
          </li>

          <li>
            <strong>y</strong> → output port
          </li>

        </ul>


        <p>
          The two input signals are used to calculate the
          output.
        </p>


        <CodeExample
          title="The Logic"
        >
{`assign y = a & b;`}
        </CodeExample>


        <p>
          This means that <strong>y</strong> gets the result
          of <strong>a AND b</strong>.
        </p>

      </LessonSection>


      {/* =========================
          Port Directions
          ========================= */}

      <LessonSection
        id="port-directions"
        title="Port Directions"
      >

        <p>
          Verilog uses port directions to describe how
          signals move relative to a module.
        </p>


        <CodeExample
          title="Port Directions"
        >
{`module example(
    input  a,
    input  b,
    output y
);

endmodule`}
        </CodeExample>


        <p>
          The three commonly used directions are:
        </p>


        <ul>

          <li>
            <strong>input</strong> — signal enters the
            module.
          </li>

          <li>
            <strong>output</strong> — signal leaves the
            module.
          </li>

          <li>
            <strong>inout</strong> — signal can enter and
            leave the module.
          </li>

        </ul>


        <LearningNote
          type="warning"
          title="About inout"
        >

          <p>
            You will see inout in some hardware designs, especially when a signal needs to be bidirectional.
          <br/>
            For now, focus mainly on input and output.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Visual Example
          ========================= */}

      <LessonSection
        id="visual-example"
        title="Visual Example"
      >

        <p>
          Let's visualize the AND gate as a hardware block.
        </p>


        <LessonVisual
          type="diagram"
          src="/diagrams/norgate.png"
          alt="NOR gate with two inputs and one output"
          caption="A and B enter the circuit, and Y is produced as the output."
        />


        <p>
          The relationship is:
        </p>


        <CodeExample
          title="Signal Flow"
        >
{`A ─────┐
        │
        NOR ───── Y
        │
B ─────┘`}
        </CodeExample>


        <LearningNote
          type="info"
          title="Hardware View"
        >

          <p>
            Try to imagine the ports as physical
            connections on a hardware block.
          </p>

          <p>
            A and B enter
            the block, while Y leaves it.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Try It Yourself
          ========================= */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >

        <p>
          Now experiment with the ports of the AND gate.
        </p>

        <p>
          Try changing the logic inside the module and
          observe the simulation output.
        </p>


        <TryIt

          title="Experiment with Ports"

          language="Verilog"

          mode="beginner"

          initialCode={`module and_gate(
  input a,
  input b,
  output y
);

  assign y = a & b;

endmodule`}

          testbenchCode={`module tb;

  reg a;
  reg b;
  wire y;

  and_gate dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor("a=%b b=%b y=%b", a, b, y);

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

      </LessonSection>


      {/* =========================
          Practice
          ========================= */}

      <LessonSection
        id="practice"
        title="Practice"
      >

        <LearningNote
          type="important"
          title="Question 1"
        >

          <p>
            Which keyword is used when a signal enters a
            Verilog module?
          </p>

        </LearningNote>


        <details>

          <summary>
            Show Answer
          </summary>

          <p>
            The answer is <strong>input</strong>.
          </p>

        </details>


        <LearningNote
          type="important"
          title="Question 2"
        >

          <p>
            Which keyword is used when a signal leaves a
            Verilog module?
          </p>

        </LearningNote>


        <details>

          <summary>
            Show Answer
          </summary>

          <p>
            The answer is <strong>output</strong>.
          </p>

        </details>


        <LearningNote
          type="important"
          title="Question 3"
        >

          <p>
            In the following module, which signals are
            inputs and which signal is the output?
          </p>

        </LearningNote>


        <CodeExample>
{`module and_gate(
    input a,
    input b,
    output y
);`}
        </CodeExample>


        <details>

          <summary>
            Show Answer
          </summary>

          <p>
            <strong>a</strong> and <strong>b</strong> are
            inputs, while <strong>y</strong> is the output.
          </p>

        </details>

      </LessonSection>


      {/* =========================
          Key Takeaways
          ========================= */}

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >

        <ul>

          <li>
            Ports are the connection points of a Verilog
            module.
          </li>

          <li>
            <strong>input</strong> ports receive signals.
          </li>

          <li>
            <strong>output</strong> ports send signals.
          </li>

          <li>
            <strong>inout</strong> ports can be used for
            bidirectional signals.
          </li>

          <li>
            A module can have multiple input and output
            ports.
          </li>

          <li>
            Thinking of ports as hardware connections makes
            Verilog easier to understand.
          </li>

        </ul>


        <LearningNote
          type="tip"
          title="Coming Next"
        >

          <p>
            Now that you understand how signals enter and
            leave a module, the next lesson will explain
            Data Types and how Verilog
            represents different kinds of signals.
          </p>

        </LearningNote>

      </LessonSection>


    </LessonPage>

  );

}


export default Ports;