import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function WhatIsSystemVerilog() {
  const sections = [
    {
      id: "what-is-systemverilog",
      title: "What is SystemVerilog?"
    },
    {
      id: "why-used",
      title: "Why is SystemVerilog Used?"
    },
    {
      id: "systemverilog-verilog",
      title: "SystemVerilog and Verilog"
    },
    {
      id: "rtl-design",
      title: "RTL Design"
    },
    {
      id: "verification",
      title: "Verification"
    },
    {
      id: "important-features",
      title: "Important Features"
    },
    {
      id: "where-used",
      title: "Where is SystemVerilog Used?"
    },
    {
      id: "try-it",
      title: "Try It Yourself"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="What is SystemVerilog?"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Introduction"
      previousPath="/systemverilog"
      nextLesson="Basic Syntax"
      nextPath="/systemverilog/basic-syntax"
    >

      {/* What is SystemVerilog? */}

      <LessonSection
        id="what-is-systemverilog"
        title="What is SystemVerilog?"
      >
        <p>
          <strong>SystemVerilog</strong> is a hardware description and
          verification language used to design and verify digital systems.
        </p>

        <p>
          It was created as an extension of Verilog and adds many features
          that make RTL design, simulation, and verification more powerful.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/sysver.png"
          alt="SystemVerilog hardware design and verification flow"
          caption="SystemVerilog extends Verilog with additional RTL and verification capabilities."
        />

        <CodeExample title="SystemVerilog">
{`Verilog
   +
Additional Design Features
   +
Verification Features
   ↓
SystemVerilog`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Simple Definition"
        >
          <p>
            You can think of SystemVerilog as
            <strong> Verilog + additional design and verification features</strong>.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Why Used */}

      <LessonSection
        id="why-used"
        title="Why is SystemVerilog Used?"
      >
        <p>
          Modern digital systems contain millions or even billions of
          transistors. Designing and verifying such systems requires powerful
          tools and languages.
        </p>

        <p>
          SystemVerilog provides features that help engineers write clearer
          RTL and create sophisticated verification environments.
        </p>

        <ul>
          <li>Better RTL design constructs</li>
          <li>Improved data types</li>
          <li>Clearer combinational and sequential logic</li>
          <li>Interfaces for connecting modules</li>
          <li>Object-oriented programming features</li>
          <li>Assertions for checking behavior</li>
          <li>Functional coverage</li>
          <li>Constrained-random verification</li>
        </ul>

        <LearningNote
          type="important"
          title="Main Advantage"
        >
          <p>
            SystemVerilog brings many design and verification features into
            one language.
          </p>
        </LearningNote>
      </LessonSection>


      {/* SystemVerilog and Verilog */}

      <LessonSection
        id="systemverilog-verilog"
        title="SystemVerilog and Verilog"
      >
        <p>
          SystemVerilog is backward compatible with many Verilog constructs,
          which makes it easier for Verilog engineers to transition to
          SystemVerilog.
        </p>

        <table className="learning-table">
          <thead>
            <tr>
              <th>Verilog</th>
              <th>SystemVerilog</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>wire / reg</td>
              <td>logic</td>
            </tr>

            <tr>
              <td>always @(*)</td>
              <td>always_comb</td>
            </tr>

            <tr>
              <td>always @(posedge clk)</td>
              <td>always_ff</td>
            </tr>

            <tr>
              <td>parameter</td>
              <td>enum / parameter / localparam</td>
            </tr>

            <tr>
              <td>Basic verification</td>
              <td>Advanced verification constructs</td>
            </tr>
          </tbody>
        </table>

        <CodeExample title="Example">
{`Verilog:

always @(*) begin
    y = a & b;
end


SystemVerilog:

always_comb begin
    y = a & b;
end`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Important"
        >
          <p>
            SystemVerilog does not replace the fundamental concepts you
            learned in Verilog. Instead, it provides cleaner and more
            powerful ways to express many of those concepts.
          </p>
        </LearningNote>
      </LessonSection>


      {/* RTL Design */}

      <LessonSection
        id="rtl-design"
        title="RTL Design"
      >
        <p>
          SystemVerilog can be used to describe
          <strong> Register Transfer Level (RTL)</strong> hardware.
        </p>

        <p>
          RTL describes how data moves between registers and how combinational
          logic processes that data.
        </p>

        <CodeExample title="Simple RTL Example">
{`module adder(
    input  logic [3:0] a,
    input  logic [3:0] b,
    output logic [3:0] sum
);

    assign sum = a + b;

endmodule`}
        </CodeExample>

        <p>
          This module describes a 4-bit combinational adder.
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/orgate.png"
          alt="Digital logic circuit example"
          caption="SystemVerilog can describe digital building blocks that are combined into larger RTL systems."
        />

        <LearningNote
          type="tip"
          title="RTL is Hardware"
        >
          <p>
            RTL code describes hardware behavior and structure. It is not
            simply a software program running on a processor.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Verification */}

      <LessonSection
        id="verification"
        title="Verification"
      >
        <p>
          SystemVerilog is also widely used for
          <strong> hardware verification</strong>.
        </p>

        <p>
          Verification checks whether a design behaves according to its
          specification.
        </p>

        <CodeExample title="Design and Verification">
{`Design
  ↓
Simulation
  ↓
Apply Inputs
  ↓
Observe Outputs
  ↓
Check Expected Behavior`}
        </CodeExample>

        <p>
          SystemVerilog provides advanced features such as assertions,
          classes, functional coverage, and constrained-random testing to
          support verification.
        </p>

        <LearningNote
          type="info"
          title="Design vs Verification"
        >
          <p>
            <strong>Design</strong> creates the hardware.
          </p>

          <p>
            <strong>Verification</strong> checks whether the hardware works
            correctly.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Important Features */}

      <LessonSection
        id="important-features"
        title="Important Features"
      >
        <p>
          Some of the most important SystemVerilog features include:
        </p>

        <table className="learning-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Purpose</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>logic</td>
              <td>Flexible four-state signal type</td>
            </tr>

            <tr>
              <td>always_comb</td>
              <td>Describes combinational logic</td>
            </tr>

            <tr>
              <td>always_ff</td>
              <td>Describes sequential logic</td>
            </tr>

            <tr>
              <td>enum</td>
              <td>Represents named values or states</td>
            </tr>

            <tr>
              <td>interface</td>
              <td>Groups related signals</td>
            </tr>

            <tr>
              <td>class</td>
              <td>Supports object-oriented verification</td>
            </tr>

            <tr>
              <td>assertion</td>
              <td>Checks expected behavior</td>
            </tr>

            <tr>
              <td>coverage</td>
              <td>Measures verification progress</td>
            </tr>
          </tbody>
        </table>

        <LearningNote
          type="important"
          title="Don't Memorize Yet"
        >
          <p>
            You don't need to memorize these features now. We will learn each
            one individually in the upcoming lessons.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Where Used */}

      <LessonSection
        id="where-used"
        title="Where is SystemVerilog Used?"
      >
        <p>
          SystemVerilog is used throughout modern digital IC and FPGA
          development.
        </p>

        <ul>
          <li>ASIC RTL design</li>
          <li>FPGA RTL design</li>
          <li>SoC development</li>
          <li>Functional verification</li>
          <li>UVM verification</li>
          <li>Simulation</li>
          <li>Protocol verification</li>
          <li>Design validation</li>
        </ul>

        <CodeExample title="Typical Industry Flow">
{`Specification
      ↓
RTL Design
      ↓
SystemVerilog
      ↓
Simulation
      ↓
Verification
      ↓
Synthesis
      ↓
Physical Implementation`}
        </CodeExample>

        <LearningNote
          type="tip"
          title="Career Connection"
        >
          <p>
            SystemVerilog is an important skill for RTL design and
            verification engineers working in the VLSI industry.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Try It */}

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <TryIt
          title="Try a SystemVerilog Design"
          language="SystemVerilog"
          mode="beginner"
          initialCode={`module or_gate(
  input logic a,
  input logic b,
  output logic y
);

  assign y = a | b;

endmodule`}
          testbenchCode={`module tb;

  logic a;
  logic b;
  logic y;

  or_gate dut (
    .a(a),
    .b(b),
    .y(y)
  );

  initial begin

    $monitor(
      "a=%b b=%b y=%b",
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
      </LessonSection>


      {/* Key Takeaways */}

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            SystemVerilog is an extension of Verilog.
          </li>

          <li>
            It is used for both RTL design and hardware verification.
          </li>

          <li>
            SystemVerilog provides enhanced data types such as
            <strong> logic</strong>.
          </li>

          <li>
            <strong>always_comb</strong> is used to describe combinational
            logic.
          </li>

          <li>
            <strong>always_ff</strong> is used to describe sequential logic.
          </li>

          <li>
            SystemVerilog includes interfaces, classes, assertions, and
            coverage features.
          </li>

          <li>
            It is widely used in ASIC, FPGA, and SoC development.
          </li>

          <li>
            It is an important language for both RTL design and verification
            engineers.
          </li>
        </ul>

        <LearningNote
          type="tip"
          title="Coming Next 🚀"
        >
          <p>
            Next, we'll learn the
            <strong> Basic Syntax of SystemVerilog</strong>.
          </p>

          <p>
            We'll start writing SystemVerilog modules and learn how its
            syntax differs from traditional Verilog.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default WhatIsSystemVerilog;