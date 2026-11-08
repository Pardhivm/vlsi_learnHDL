import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import TryIt from "../../components/TryIt";

function WhatIsVerilog() {
  return (
    <LessonPage
      title="What is Verilog?"
      sections={[
        {
          id: "what-is-hdl",
          title: "What is an HDL?"
        },
        {
          id: "why-verilog",
          title: "Why is Verilog important?"
        },
        {
          id: "what-can-you-build",
          title: "What can you build?"
        }
      ]}
      previousLesson="Introduction"
      previousPath="/verilog"
      nextLesson="Basic Syntax"
      nextPath="/verilog/basic-syntax"
    >

      <LessonSection
        id="what-is-hdl"
        title="What is an HDL?"
      >
        <p>
          HDL stands for Hardware Description Language.
          It is a language used to describe the structure and
          behavior of digital hardware.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/verilog-overview.png"
          alt="Diagram showing how Verilog is used to describe digital hardware"
          caption="Verilog helps describe a digital design that can eventually become real hardware."
        />

        <p>
          Unlike programming languages such as C or Python,
          HDL is used to describe hardware circuits such as
          multiplexers, counters, registers, processors and
          other digital systems.
        </p>

        <LearningNote
          type="tip"
          title="Key Takeaway"
        >
          HDL describes hardware. Verilog is used to describe how
          digital hardware is structured and how it behaves.
        </LearningNote>

        <LearningNote
          type="important"
          title="Important"
        >
          Verilog code can be synthesized into actual hardware.
          This is one of the main differences between HDL and
          normal software programming.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="why-verilog"
        title="Why is Verilog important?"
      >
        <p>
          Verilog is one of the most widely used Hardware
          Description Languages in digital design and VLSI.
        </p>

        <p>
          Engineers use Verilog to design and verify digital
          circuits before implementing them on an FPGA or
          manufacturing them as an ASIC.
        </p>

        <p>
          Verilog allows engineers to describe complex hardware
          using code instead of manually drawing every logic gate.
        </p>

        <div className="info-box">
          <strong>Important:</strong>

          <p>
            Verilog code can be synthesized into actual hardware.
            This is one of the main differences between HDL and
            normal software programming.
          </p>
        </div>
      </LessonSection>


      <LessonSection
        id="what-can-you-build"
        title="What can you build?"
      >
        <p>
          Using Verilog, you can describe many different types
          of digital circuits.
        </p>

        <ul>
          <li>Logic gates</li>
          <li>Multiplexers</li>
          <li>Adders and subtractors</li>
          <li>Counters</li>
          <li>Registers</li>
          <li>Flip-flops</li>
          <li>Finite State Machines</li>
          <li>UART controllers</li>
          <li>Memory controllers</li>
          <li>Processors and CPUs</li>
        </ul>

        <p>
          These small building blocks can be combined to create
          large and complex digital systems.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/orgate.png"
          alt="OR gate showing inputs A and B, output Y, and its truth table"
          caption="An OR gate produces 1 when at least one input is 1."
        />

        <TryIt
          title="Try Verilog Yourself"
          language="Verilog"
          mode="beginner"
          initialCode={`module or_gate(
  input a,
  input b,
  output y
);

  assign y = a | b;

endmodule`}
          testbenchCode={`module tb;

  reg a;
  reg b;
  wire y;

  or_gate dut (
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

        <p>
          This simple Verilog module describes an OR gate.
          The same concept can be extended to much larger
          hardware designs.
        </p>

        <LearningNote
          type="tip"
          title="Experiment"
        >
          <p>
            Try changing:
          </p>

          <CodeExample>
{`assign y = a | b;`}
          </CodeExample>

          <p>
            to:
          </p>

          <CodeExample>
{`assign y = a & b;`}
          </CodeExample>

          <p>
            Then click <strong>Run</strong> and observe how the
            simulation output changes.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default WhatIsVerilog;