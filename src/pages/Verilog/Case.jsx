import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";

function Case() {
  const sections = [
    { id: "what-is-case", title: "What is a Case Statement?" },
    { id: "basic-syntax", title: "Basic Syntax" },
    { id: "case-example", title: "Basic Example" },
    { id: "case-2to1-mux", title: "2-to-1 Multiplexer" },
    { id: "case-4to1-mux", title: "4-to-1 Multiplexer" },
    { id: "default", title: "The default Statement" },
    { id: "casez", title: "casez" },
    { id: "casex", title: "casex" },
    { id: "case-vs-if", title: "case vs if / else" },
    { id: "priority", title: "Priority and Case" },
    { id: "try-it", title: "Try It Yourself" },
    { id: "practice", title: "Practice" },
    { id: "key-takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="Verilog Case Statements"
      sections={sections}
      previousLesson="If / Else"
      previousPath="/verilog/if-else"
      nextLesson="Loops"
      nextPath="/verilog/loops"
    >

      <LessonSection
        id="what-is-case"
        title="What is a Case Statement?"
      >
        <p>
          A <strong>case statement</strong> is used to select one of several
          possible actions based on the value of an expression.
        </p>

        <p>
          It is especially useful when a signal can have several possible
          values and each value needs different hardware behavior.
        </p>

        <CodeExample title="Basic Idea">
{`case (select)
    2'b00: y = a;
    2'b01: y = b;
    2'b10: y = c;
    2'b11: y = d;
endcase`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          src="/diagrams/case.png"
          alt="Digital selection logic"
          caption="A case statement can describe hardware that selects different outputs based on a control signal."
        />

        <LearningNote type="info" title="Think Like Hardware">
          <p>
            Think of a case statement as a hardware selector:
            <strong> the input condition determines which path is selected.</strong>
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="basic-syntax"
        title="Basic Syntax"
      >
        <p>
          The general syntax of a case statement is:
        </p>

        <CodeExample title="Syntax">
{`case (expression)

    value1: statement1;
    value2: statement2;
    value3: statement3;

    default: statement_default;

endcase`}
        </CodeExample>

        <p>
          Verilog evaluates the expression and looks for a matching value.
        </p>

        <LearningNote type="tip" title="Important">
          <p>
            Each possible value is followed by a colon
          :.
          </p>

          <p>
            The case statement ends with endcase.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="case-example"
        title="Basic Example"
      >
        <p>
          Let's create a simple decoder using a case statement.
        </p>

        <CodeExample title="2-bit Decoder">
{`module decoder(
    input  [1:0] sel,
    output reg [3:0] y
);

    always @(*) begin

        case (sel)

            2'b00: y = 4'b0001;
            2'b01: y = 4'b0010;
            2'b10: y = 4'b0100;
            2'b11: y = 4'b1000;

        endcase

    end

endmodule`}
        </CodeExample>

        <p>
          The value of <strong>sel</strong> determines which output bit
          becomes active.
        </p>

        <CodeExample title="Selection Table">
{`sel       y

00        0001
01        0010
10        0100
11        1000`}
        </CodeExample>

        <LearningNote type="info" title="Hardware Connection">
          <p>
            This behavior resembles a <strong>2-to-4 decoder</strong>.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="case-2to1-mux"
        title="2-to-1 Multiplexer"
      >
        <p>
          A case statement can also describe a multiplexer.
        </p>

        <CodeExample title="2-to-1 MUX">
{`module mux2to1(
    input a,
    input b,
    input sel,
    output reg y
);

    always @(*) begin

        case (sel)

            1'b0: y = a;
            1'b1: y = b;

        endcase

    end

endmodule`}
        </CodeExample>

        <CodeExample title="Selection">
{`sel = 0  →  y = a
sel = 1  →  y = b`}
        </CodeExample>

        <LearningNote type="tip" title="Remember">
          <p>
            Both if / else  and case can
            describe a multiplexer.
          </p>

          <p>
            Case often becomes easier to read when there are many possible
            selections.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="case-4to1-mux"
        title="4-to-1 Multiplexer"
      >
        <p>
          A 4-to-1 multiplexer has four inputs and uses a 2-bit select signal.
        </p>

        <CodeExample title="4-to-1 MUX">
{`module mux4to1(
    input  [3:0] data,
    input  [1:0] sel,
    output reg y
);

    always @(*) begin

        case (sel)

            2'b00: y = data[0];
            2'b01: y = data[1];
            2'b10: y = data[2];
            2'b11: y = data[3];

        endcase

    end

endmodule`}
        </CodeExample>

        <CodeExample title="Selection">
{`sel = 00  →  y = data[0]
sel = 01  →  y = data[1]
sel = 10  →  y = data[2]
sel = 11  →  y = data[3]`}
        </CodeExample>

        <LearningNote type="important" title="RTL Connection">
          <p>
            This is a common example of how RTL code can describe a
            multiplexer circuit.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="default"
        title="The default Statement"
      >
        <p>
          The default branch executes when none of the case
          items match.
        </p>

        <CodeExample title="Using default">
{`always @(*) begin

    case (sel)

        2'b00: y = a;
        2'b01: y = b;
        2'b10: y = c;

        default: y = 1'b0;

    endcase

end`}
        </CodeExample>

        <p>
          If <strong>sel</strong> does not match the listed values,
          <strong> y</strong> receives 0.
        </p>

        <LearningNote type="important" title="Good Practice">
          <p>
            Including a default branch can make your
            combinational intent clearer and helps ensure that an output gets
            a value for unmatched conditions.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="casez"
        title="casez"
      >
        <p>
          <strong>casez</strong> is a variation of the case statement that
          treats high-impedance <strong>Z</strong> bits and certain
          unspecified bits as don't-care matches.
        </p>

        <CodeExample title="casez Example">
{`always @(*) begin

    casez (irq)

        4'b1???: y = 4'b0001;
        4'b01??: y = 4'b0010;
        4'b001?: y = 4'b0100;
        4'b0001: y = 4'b1000;

        default: y = 4'b0000;

    endcase

end`}
        </CodeExample>

        <p>
          The <strong>?</strong> characters indicate positions that do not
          need to be matched exactly.
        </p>

        <LearningNote type="warning" title="Use Carefully">
          <p>
            casez is useful for certain priority and decoding structures,
            but you should understand how unknown and high-impedance values
            are treated before using it in important RTL.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="casex"
        title="casex"
      >
        <p>
          <strong>casex</strong> treats X and Z bits as don't-care values
          during matching.
        </p>

        <CodeExample title="casex Example">
{`always @(*) begin

    casex (sel)

        4'b1xxx: y = 4'b0001;
        4'b01xx: y = 4'b0010;
        4'b001x: y = 4'b0100;
        4'b0001: y = 4'b1000;

        default: y = 4'b0000;

    endcase

end`}
        </CodeExample>

        <LearningNote type="warning" title="Important">
          <p>
           casex should be used carefully in RTL because
            treating X values as don't-care values can hide unknown-value
            problems during simulation.
          </p>

          <p>
            For beginner RTL, focus mainly on the regular
             case statement first.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="case-vs-if"
        title="case vs if / else"
      >
        <p>
          Both case and if / else can be used to describe decision-making
          logic, but they are often clearer in different situations.
        </p>

        <CodeExample title="if / else">
{`if (sel == 2'b00)
    y = a;
else if (sel == 2'b01)
    y = b;
else if (sel == 2'b10)
    y = c;
else
    y = d;`}
        </CodeExample>

        <CodeExample title="case">
{`case (sel)

    2'b00: y = a;
    2'b01: y = b;
    2'b10: y = c;
    2'b11: y = d;

endcase`}
        </CodeExample>

        <p>
          The case version is often easier to read when one expression is
          being compared against several possible values.
        </p>

        <LearningNote type="tip" title="Simple Rule">
          <p>
            Use if / else when conditions are naturally
            sequential or involve ranges and complex expressions.
          </p>

          <p>
            Use case when selecting based on specific values
            of one expression.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="priority"
        title="Priority and Case"
      >
        <p>
          In a normal case statement, the matching item determines the
          selected behavior.
        </p>

        <p>
          This makes case useful for selecting among several known values.
        </p>

        <CodeExample title="Control Signal Example">
{`case (opcode)

    2'b00: result = a + b;
    2'b01: result = a - b;
    2'b10: result = a & b;
    2'b11: result = a | b;

endcase`}
        </CodeExample>

        <p>
          Here, the <strong>opcode</strong> selects the operation performed
          by the circuit.
        </p>

        <LearningNote type="info" title="Processor Connection">
          <p>
            Structures like this are useful when designing control logic,
            ALUs, instruction decoders, and finite state machines.
          </p>
        </LearningNote>
      </LessonSection>

      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Let's build a small ALU-style circuit using a case statement.
        </p>

        <p>
          Change the selected operation and observe the simulation output.
        </p>

        <TryIt
          title="Experiment with Case"
          language="Verilog"
          mode="beginner"
          initialCode={`module mini_alu(
  input  [3:0] a,
  input  [3:0] b,
  input  [1:0] op,
  output reg [3:0] y
);

  always @(*) begin

    case (op)

      2'b00: y = a + b;
      2'b01: y = a - b;
      2'b10: y = a ^ b;
      2'b11: y = a | b;

      default: y = 4'b0000;

    endcase

  end

endmodule`}
          testbenchCode={`module tb;

  reg [3:0] a;
  reg [3:0] b;
  reg [1:0] op;
  wire [3:0] y;

  mini_alu dut (
    .a(a),
    .b(b),
    .op(op),
    .y(y)
  );

  initial begin

    $monitor(
      "op=%b a=%b b=%b y=%b",
      op,
      a,
      b,
      y
    );

    a = 4'b1010;
    b = 4'b0011;

    op = 2'b00;

    #10 op = 2'b01;

    #10 op = 2'b10;

    #10 op = 2'b11;

    #10 $finish;

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
            Which keyword begins a case statement?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The keyword is <strong>case</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 2">
          <p>
            Which keyword ends a case statement?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            The keyword is <strong>endcase</strong>.
          </p>
        </details>

        <LearningNote type="important" title="Question 3">
          <p>
            What is the purpose of the default branch?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It provides behavior when none of the listed case items match.
          </p>
        </details>

        <LearningNote type="important" title="Question 4">
          <p>
            Which construct is often easier to read when selecting among many
            specific values of one signal?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            A <strong>case statement</strong> is often easier to read for
            this situation.
          </p>
        </details>

        <LearningNote type="important" title="Question 5">
          <p>
            What hardware can a case statement describe?
          </p>
        </LearningNote>

        <details>
          <summary>Show Answer</summary>
          <p>
            It can describe multiplexers, decoders, control logic, ALUs,
            FSMs, and other selection logic.
          </p>
        </details>

      </LessonSection>

      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            A <strong>case statement</strong> selects behavior based on an
            expression's value.
          </li>

          <li>
            A case statement starts with <strong>case</strong> and ends with
            <strong> endcase</strong>.
          </li>

          <li>
            Each case item has a value followed by a colon.
          </li>

          <li>
            <strong>default</strong> handles unmatched conditions.
          </li>

          <li>
            Case statements are useful for multiplexers and decoders.
          </li>

          <li>
            Case statements are also useful for control logic and ALUs.
          </li>

          <li>
            <strong>casez</strong> supports don't-care style matching involving
            Z and wildcard positions.
          </li>

          <li>
            <strong>casex</strong> treats X and Z as don't-care values and
            should be used carefully.
          </li>

          <li>
            A case statement is often clearer than a long if / else chain
            when selecting among specific values.
          </li>
        </ul>

        <LearningNote type="tip" title="Coming Next">
          <p>
            You now know how to make decisions using both
             if / else and case.
          </p>

          <p>
            Next, we'll learn how to repeat operations using
             Verilog Loops.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Case;