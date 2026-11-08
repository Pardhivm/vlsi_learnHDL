import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";


function Modules() {

  const sections = [
    {
      id: "what-is-module",
      title: "What is a Module?"
    },
    {
      id: "module-structure",
      title: "Module Structure"
    },
    {
      id: "module-name",
      title: "Module Name"
    },
    {
      id: "simple-module",
      title: "Simple Module"
    },
    {
      id: "hardware-view",
      title: "Module as Hardware"
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

      title="Verilog Modules"

      sections={sections}

      previousLesson="Basic Syntax"

      previousPath="/verilog/basic-syntax"

      nextLesson="Ports"

      nextPath="/verilog/ports"

    >


      {/* =========================
          What is a Module?
          ========================= */}

      <LessonSection
        id="what-is-module"
        title="What is a Module?"
      >

        <p>
          A <strong>module</strong> is one of the most
          important building blocks in Verilog.
        </p>

        <p>
          A module describes a piece of digital hardware.
          It can represent something simple, such as an
          AND gate, or something much larger, such as a
          processor.
        </p>


        <LearningNote
          type="info"
          title="Think of a Module as a Hardware Block"
        >

          <p>
            Imagine a digital circuit as a collection of
            blocks. Each block performs a particular job.
          </p>

          <p>
            In Verilog, we can describe each of those
            blocks using a module.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Module Structure
          ========================= */}

      <LessonSection
        id="module-structure"
        title="Module Structure"
      >

        <p>
          A basic Verilog module has a beginning and an
          ending.
        </p>


        <CodeExample
          title="Basic Module"
        >
{`module module_name;

    // Hardware description

endmodule`}
        </CodeExample>


        <p>
          The keyword <strong>module</strong> starts the
          module.
        </p>

        <p>
          The keyword <strong>endmodule</strong> marks the
          end of the module.
        </p>


        <LearningNote
          type="tip"
          title="Remember"
        >

          <p>
            Every Verilog module must have a matching endmodule.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Module Name
          ========================= */}

      <LessonSection
        id="module-name"
        title="Module Name"
      >

        <p>
          Every module needs a name so that we can identify
          it in our design.
        </p>


        <CodeExample
          title="Example"
        >
{`module and_gate;

endmodule`}
        </CodeExample>


        <p>
          In this example,
          <strong> and_gate</strong> is the module name.
        </p>


        <LearningNote
          type="tip"
          title="Good Naming Practice"
        >

          <p>
            Use meaningful names that describe what the
            hardware block does.
          </p>

          <p>
            <strong></strong>Examples:<strong></strong>
             and_gate,
             counter,
             mux,
             alu.
          </p>

        </LearningNote>

      </LessonSection>


      {/* =========================
          Simple Module
          ========================= */}

      <LessonSection
        id="simple-module"
        title="Simple Module"
      >

        <p>
          Let's create a simple AND gate as a Verilog
          module.
        </p>


        <CodeExample
          title="AND Gate Module"
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
          This module describes the hardware behavior of
          an AND gate.
        </p>

        <p>
          The two input signals are <strong>a</strong> and
          <strong> b</strong>, while <strong>y</strong> is
          the output.
        </p>


      </LessonSection>


      {/* =========================
          Module as Hardware
          ========================= */}

      <LessonSection
        id="hardware-view"
        title="Module as Hardware"
      >

        <p>
          It is useful to think about a Verilog module as a
          hardware block.
        </p>


        <LessonVisual
          type="image"
          src="/diagrams/orgate.png"
          alt="OR gate hardware block"
        />


        <p>
          For our OR gate:
        </p>


        <ul>

          <li>
            <strong>a</strong> is an input to the hardware.
          </li>

          <li>
            <strong>b</strong> is another input.
          </li>

          <li>
            <strong>y</strong> is the output.
          </li>

          <li>
            The OR operation determines the value of
            <strong> y</strong>.
          </li>

        </ul>


        <LearningNote
          type="info"
          title="Hardware Thinking"
        >

          <p>
            When you write Verilog, always try to imagine
            the hardware that your code represents.
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
          Now try modifying the AND gate module.
        </p>

        <p>
          Change the design and click <strong>Run</strong>
          to see what happens.
        </p>


        <TryIt

          title="Build an AND Gate"

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

        <p>
          Let's check your understanding.
        </p>


        <LearningNote
          type="important"
          title="Question"
        >

          <p>
            What keyword is used to start a Verilog
            module?
          </p>

        </LearningNote>


        <details>

          <summary>
            Show Answer
          </summary>

          <p>
            The answer is <strong>module</strong>.
          </p>

        </details>


        <LearningNote
          type="important"
          title="Another Question"
        >

          <p>
            What keyword is used to end a Verilog module?
          </p>

        </LearningNote>


        <details>

          <summary>
            Show Answer
          </summary>

          <p>
            The answer is <strong>endmodule</strong>.
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
            A <strong>module</strong> is a basic building
            block of a Verilog design.
          </li>

          <li>
            A module begins with the
            <strong> module</strong> keyword.
          </li>

          <li>
            A module ends with the
            <strong> endmodule</strong> keyword.
          </li>

          <li>
            A module can describe simple or complex digital
            hardware.
          </li>

          <li>
            It is important to think about the hardware that
            your Verilog code represents.
          </li>

        </ul>


        <LearningNote
          type="tip"
          title="Coming Next"
        >

          <p>
            In the next lesson, we'll take a closer look at ports and learn how signals enter and leave a Verilog module.
          </p>

        </LearningNote>

      </LessonSection>


    </LessonPage>

  );

}


export default Modules;