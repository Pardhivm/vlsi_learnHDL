import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LearningNote from "../../components/LearningNote";
import LessonVisual from "../../components/LessonVisual";

function BasicSyntax() {
  return (
    <LessonPage
      title="Verilog Basic Syntax"
      sections={[
        {
          id: "module-structure",
          title: "Basic Module Structure"
        },
        {
          id: "module-keywords",
          title: "Important Keywords"
        },
        {
          id: "simple-example",
          title: "Simple Example"
        }
      ]}
      previousLesson="What is Verilog?"
      previousPath="/verilog/what-is-verilog"
      nextLesson="Modules"
      nextPath="/verilog/modules"
    >

      <LessonSection
        id="module-structure"
        title="Basic Module Structure"
      >
        <p>
          A Verilog design is usually organized into modules.
          A module represents a hardware block or circuit.
        </p>

        <p>
          The basic structure of a Verilog module looks like this:
        </p>

        <LessonVisual
          type="diagram"
          src="/diagrams/basicstructure.png"
          alt="Basic Verilog module structure"
          caption="A Verilog module has a defined interface and internal hardware description."
        />

        <LearningNote
  type="tip"
  title="Tip"
>
  Try to understand what each part of a Verilog module does instead of memorizing the syntax.
</LearningNote>
        <div className="code-example">
          <pre>
{`module module_name (
    input a,
    input b,
    output y
);

    // Hardware description

endmodule`}
          </pre>
        </div>

        <p>
          A module starts with the <strong>module</strong> keyword
          and ends with the <strong>endmodule</strong> keyword.
        </p>
      </LessonSection>


      <LessonSection
        id="module-keywords"
        title="Important Keywords"
      >
        <p>
          Some important keywords that you will frequently see
          in Verilog are:
        </p>

        <ul>
          <li>
            <strong>module</strong> — starts a module.
          </li>

          <li>
            <strong>endmodule</strong> — ends a module.
          </li>

          <li>
            <strong>input</strong> — defines an input port.
          </li>

          <li>
            <strong>output</strong> — defines an output port.
          </li>

          <li>
            <strong>wire</strong> — represents a physical connection
            between hardware elements.
          </li>

          <li>
            <strong>reg</strong> — represents a variable that can
            store a value in procedural blocks.
          </li>

          <li>
            <strong>assign</strong> — performs a continuous assignment.
          </li>
        </ul>

        <div className="info-box">
          <strong>Remember:</strong>
          <p>
            Verilog keywords are case-sensitive. For example,
            <strong> module</strong> and <strong>Module</strong>
            are not the same.
          </p>
        </div>
      </LessonSection>


      <LessonSection
        id="simple-example"
        title="Simple Example"
      >
        <p>
          Let's create a simple AND gate using Verilog.
        </p>

        <div className="code-example">
          <pre>
{`module and_gate (
    input a,
    input b,
    output y
);

assign y = a & b;

endmodule`}
          </pre>
        </div>

        <p>
          Here, <strong>a</strong> and <strong>b</strong> are the
          inputs and <strong>y</strong> is the output.
        </p>

        <p>
          The statement:
        </p>

        <div className="code-example">
          <pre>
{`assign y = a & b;`}
          </pre>
        </div>

        <p>
          means that the output <strong>y</strong> is the result of
          the AND operation between <strong>a</strong> and
          <strong>b</strong>.
        </p>
 
        <LessonVisual
          type="diagram"
          src="/diagrams/basic.png"
          alt="Basic Verilog module structure"
          caption="A Verilog module has a defined interface and internal hardware description."
        />


        <div className="info-box">
          <strong>Hardware idea:</strong>
          <p>
            This code describes an actual AND gate. Later, we will
            learn how Verilog code is converted into hardware using
            synthesis.
          </p>
        </div>
      </LessonSection>

    </LessonPage>
  );
}

export default BasicSyntax;