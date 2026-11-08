import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LearningNote from "../../components/LearningNote";
import CodeExample from "../../components/CodeExample";
import LessonVisual from "../../components/LessonVisual";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function SystemVerilog() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction to SystemVerilog"
    },
    {
      id: "why-systemverilog",
      title: "Why SystemVerilog?"
    },
    {
      id: "verilog-vs-systemverilog",
      title: "Verilog vs SystemVerilog"
    },
    {
      id: "rtl-verification",
      title: "RTL Design and Verification"
    },
    {
      id: "features",
      title: "Important Features"
    },
    {
      id: "first-example",
      title: "Your First SystemVerilog Example"
    },
    {
      id: "where-used",
      title: "Where is SystemVerilog Used?"
    },
    {
      id: "learning-path",
      title: "How to Learn SystemVerilog"
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways"
    }
  ];

  return (
    <LessonPage
      title="SystemVerilog"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Verilog"
      previousPath="/verilog"
      nextLesson="What is SystemVerilog?"
      nextPath="/systemverilog/what-is-systemverilog"
    >

      {/* Introduction */}

      <LessonSection
        id="introduction"
        title="Introduction to SystemVerilog"
      >
        <p>
          <strong>SystemVerilog</strong> is a hardware description and
          verification language used to design, model, and verify digital
          systems.
        </p>

        <p>
          It extends the capabilities of Verilog by adding features that make
          RTL design and verification easier and more powerful.
        </p>

        <LearningNote
          type="tip"
          title="Think of SystemVerilog as an Extension of Verilog"
        >
          <p>
            If you already know Verilog, SystemVerilog gives you additional
            language features without forcing you to forget the Verilog
            concepts you already learned.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Why SystemVerilog */}

      <LessonSection
        id="why-systemverilog"
        title="Why SystemVerilog?"
      >
        <p>
          Modern digital designs can become extremely large and complex.
          Verification is also a major part of the development process.
        </p>

        <p>
          SystemVerilog provides language features specifically designed to
          make both <strong>RTL design</strong> and
          <strong> verification</strong> more effective.
        </p>

        <table className="learning-table">
          <thead>
            <tr>
              <th>RTL Design</th>
              <th>Verification</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Modules</td>
              <td>Testbenches</td>
            </tr>

            <tr>
              <td>Registers</td>
              <td>Assertions</td>
            </tr>

            <tr>
              <td>Combinational logic</td>
              <td>Functional coverage</td>
            </tr>

            <tr>
              <td>Finite State Machines</td>
              <td>Constrained-random testing</td>
            </tr>

            <tr>
              <td>Interfaces</td>
              <td>Classes and objects</td>
            </tr>
          </tbody>
        </table>

        <LearningNote
          type="important"
          title="Two Major Areas"
        >
          <p>
            SystemVerilog is important because it provides features for both
            <strong> designing hardware</strong> and
            <strong> verifying hardware</strong>.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Verilog vs SystemVerilog */}

      <LessonSection
        id="verilog-vs-systemverilog"
        title="Verilog vs SystemVerilog"
      >
        <p>
          SystemVerilog was developed as an extension of Verilog.
        </p>

        <CodeExample title="Conceptual Relationship">
{`Verilog
   ↓
SystemVerilog
   ↓
More RTL features
   +
More verification features`}
        </CodeExample>

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
              <td>Basic data types</td>
              <td>Enhanced data types</td>
            </tr>

            <tr>
              <td>Basic verification constructs</td>
              <td>Advanced verification features</td>
            </tr>
          </tbody>
        </table>

        <LearningNote
          type="info"
          title="Important"
        >
          <p>
            You do not need to learn Verilog again from the beginning.
            SystemVerilog builds upon many Verilog concepts you already know.
          </p>
        </LearningNote>
      </LessonSection>


      {/* RTL and Verification */}

      <LessonSection
        id="rtl-verification"
        title="RTL Design and Verification"
      >
        <p>
          One of the biggest advantages of SystemVerilog is that it supports
          both <strong>RTL design</strong> and
          <strong> verification</strong>.
        </p>

        <CodeExample title="SystemVerilog Development">
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
Synthesis`}
        </CodeExample>

        <p>
          For RTL design, SystemVerilog provides constructs such as
          <strong> logic</strong>, <strong>always_comb</strong>, and
          <strong> always_ff</strong>.
        </p>

        <p>
          For verification, it provides features such as
          <strong> classes</strong>, <strong>assertions</strong>,
          <strong> functional coverage</strong>, and
          <strong> constrained-random testing</strong>.
        </p>

        <LearningNote
          type="tip"
          title="Two Sides of SystemVerilog"
        >
          <p>
            SystemVerilog can be used to describe the hardware itself and
            also to build powerful environments for verifying that hardware.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Important Features */}

      <LessonSection
        id="features"
        title="Important Features"
      >
        <p>
          SystemVerilog introduces many useful features that improve RTL
          design and verification.
        </p>

        <ul>
          <li>
            <strong>logic</strong> data type
          </li>

          <li>
            <strong>always_comb</strong> for combinational logic
          </li>

          <li>
            <strong>always_ff</strong> for sequential logic
          </li>

          <li>
            Enhanced data types
          </li>

          <li>
            Enumerations
          </li>

          <li>
            Structures
          </li>

          <li>
            Interfaces
          </li>

          <li>
            Classes and objects
          </li>

          <li>
            Assertions
          </li>

          <li>
            Functional coverage
          </li>
        </ul>

        <LearningNote
          type="important"
          title="We'll Learn These Step by Step"
        >
          <p>
            Don't worry if some of these terms look unfamiliar.
            Each feature will be explained individually in the upcoming
            lessons.
          </p>
        </LearningNote>
      </LessonSection>


      {/* First Example */}

      <LessonSection
        id="first-example"
        title="Your First SystemVerilog Example"
      >
        <p>
          Let's start with a simple AND gate.
        </p>

        <CodeExample title="SystemVerilog AND Gate">
{`module and_gate(
    input  logic a,
    input  logic b,
    output logic y
);

    assign y = a & b;

endmodule`}
        </CodeExample>

        <p>
          Notice that we are using the SystemVerilog
          <strong> logic</strong> type for the signals.
        </p>

        <LearningNote
          type="tip"
          title="Compare With Verilog"
        >
          <p>
            In traditional Verilog, you might use
            <strong> reg</strong> or <strong>wire</strong>.
          </p>

          <p>
            SystemVerilog provides the more general
            <strong> logic</strong> type, which you will learn in detail
            later.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Where SystemVerilog is Used */}

      <LessonSection
        id="where-used"
        title="Where is SystemVerilog Used?"
      >
        <p>
          SystemVerilog is widely used in modern digital design and
          verification environments.
        </p>

        <ul>
          <li>ASIC design</li>
          <li>FPGA design</li>
          <li>RTL development</li>
          <li>Functional verification</li>
          <li>UVM-based verification</li>
          <li>Simulation</li>
          <li>Design verification</li>
          <li>SoC development</li>
        </ul>

        <CodeExample title="Typical VLSI Flow">
{`RTL Design
    ↓
Simulation
    ↓
Functional Verification
    ↓
Synthesis
    ↓
Implementation
    ↓
Hardware`}
        </CodeExample>

        <LearningNote
          type="info"
          title="Industry Connection"
        >
          <p>
            SystemVerilog is an important language to know for modern RTL
            design and digital verification roles.
          </p>
        </LearningNote>
      </LessonSection>


      {/* Learning Path */}

      <LessonSection
        id="learning-path"
        title="How to Learn SystemVerilog"
      >
        <p>
          We will learn SystemVerilog progressively, starting with the
          language fundamentals and then moving into advanced verification.
        </p>

        <CodeExample title="SystemVerilog Learning Path">
{`Basic Syntax
      ↓
Data Types
      ↓
logic
      ↓
always_comb / always_ff
      ↓
Interfaces
      ↓
Classes
      ↓
Assertions
      ↓
Verification
      ↓
UVM`}
        </CodeExample>

        <p>
          Each topic will build on the concepts learned previously.
        </p>

        <LearningNote
          type="tip"
          title="Learning Strategy"
        >
          <p>
            Don't try to memorize everything. Write small examples, modify
            them, and understand what the hardware or verification environment
            is doing.
          </p>

          <p>
            Since you have already learned Verilog, you can focus on
            understanding what SystemVerilog adds and why those features
            are useful.
          </p>
        </LearningNote>
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
            It supports both RTL design and verification.
          </li>

          <li>
            SystemVerilog provides enhanced data types such as
            <strong> logic</strong>.
          </li>

          <li>
            <strong>always_comb</strong> and
            <strong> always_ff</strong> make RTL intent clearer.
          </li>

          <li>
            SystemVerilog provides powerful verification features.
          </li>

          <li>
            Classes, assertions, and functional coverage are important
            verification features.
          </li>

          <li>
            SystemVerilog is widely used in modern ASIC, FPGA, and
            verification workflows.
          </li>
        </ul>

        <LearningNote
          type="tip"
          title="Coming Next 🚀"
        >
          <p>
            Next, we'll answer an important question:
            <strong> What exactly is SystemVerilog?</strong>
          </p>

          <p>
            Then we'll start learning its syntax and features step by step.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default SystemVerilog;