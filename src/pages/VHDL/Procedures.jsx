import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Procedures() {
  const sections = [
    { id: "overview", title: "What is a Procedure?" },
    { id: "syntax", title: "Procedure Syntax" },
    { id: "parameters", title: "Parameters" },
    { id: "difference", title: "Function vs Procedure" },
    { id: "calling", title: "Calling a Procedure" },
    { id: "hardware", title: "Procedures in Hardware" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Procedures"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Functions"
      previousPath="/vhdl/functions"
      nextLesson="Components"
      nextPath="/vhdl/components"
    >

      <LessonSection
        id="overview"
        title="1. What is a Procedure?"
      >
        <p className="lesson-intro">
          A VHDL procedure is a reusable block of statements
          that can perform an operation when it is called.
        </p>

        <p>
          Unlike a function, a procedure does not have a
          mandatory return value. It can communicate results
          through parameters.
        </p>

        <div className="vhdl-procedure-main-visual">

          <div className="vhdl-procedure-inputs">
            <span>INPUT</span>
            <span>CONTROL</span>
          </div>

          <div className="vhdl-procedure-arrow">
            →
          </div>

          <div className="vhdl-procedure-block">
            <small>PROCEDURE</small>
            <strong>OPERATION</strong>
            <span>Reusable statements</span>
          </div>

          <div className="vhdl-procedure-arrow">
            →
          </div>

          <div className="vhdl-procedure-outputs">
            <span>OUTPUT</span>
            <span>STATUS</span>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          A procedure performs an operation. It can receive
          inputs and can modify or return values through its
          parameters.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="syntax"
        title="2. Procedure Syntax"
      >
        <p>
          A procedure is declared using the
          <code> procedure</code> keyword.
        </p>

        <CodeExample title="Basic Procedure">
{`procedure display_value(
    A : in integer
) is

begin

    report "Value = " &
           integer'image(A);

end procedure;`}
        </CodeExample>

        <div className="vhdl-procedure-syntax-flow">

          <div>
            <span>1</span>
            <strong>procedure</strong>
            <small>Declare it</small>
          </div>

          <div>→</div>

          <div>
            <span>2</span>
            <strong>Parameters</strong>
            <small>Receive values</small>
          </div>

          <div>→</div>

          <div>
            <span>3</span>
            <strong>Body</strong>
            <small>Perform operation</small>
          </div>

          <div>→</div>

          <div>
            <span>4</span>
            <strong>end procedure</strong>
            <small>Finish definition</small>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="parameters"
        title="3. Parameters"
      >
        <p>
          Procedures can use parameters with different modes,
          such as <code>in</code>, <code>out</code>, and
          <code>inout</code>.
        </p>

        <CodeExample title="Parameter Modes">
{`procedure update_value(
    A : in integer;
    B : out integer
) is

begin

    B := A + 10;

end procedure;`}
        </CodeExample>

        <div className="vhdl-procedure-parameter-grid">

          <div>
            <strong>IN</strong>
            <span>Input to procedure</span>
          </div>

          <div>
            <strong>OUT</strong>
            <span>Output from procedure</span>
          </div>

          <div>
            <strong>INOUT</strong>
            <span>Input and output</span>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Parameter Modes"
        >
          Think of <code>in</code> as entering the procedure,
          <code>out</code> as leaving it, and
          <code>inout</code> as going in and coming back out.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="difference"
        title="4. Function vs Procedure"
      >
        <p>
          Functions and procedures are both reusable VHDL
          constructs, but they are used differently.
        </p>

        <div className="vhdl-function-procedure-comparison">

          <div className="vhdl-comparison-column">

            <h3>Function</h3>

            <div>
              <strong>Return value</strong>
              <span>Yes</span>
            </div>

            <div>
              <strong>Typical use</strong>
              <span>Calculate a result</span>
            </div>

            <div>
              <strong>Call style</strong>
              <span>Can appear in expressions</span>
            </div>

          </div>

          <div className="vhdl-comparison-divider">
            VS
          </div>

          <div className="vhdl-comparison-column">

            <h3>Procedure</h3>

            <div>
              <strong>Return value</strong>
              <span>No mandatory return value</span>
            </div>

            <div>
              <strong>Typical use</strong>
              <span>Perform an operation</span>
            </div>

            <div>
              <strong>Call style</strong>
              <span>Called as a statement</span>
            </div>

          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="calling"
        title="5. Calling a Procedure"
      >
        <p>
          A procedure is called by writing its name followed
          by its parameters.
        </p>

        <CodeExample title="Calling a Procedure">
{`procedure update_value(
    A : in integer;
    B : out integer
) is
begin
    B := A + 10;
end procedure;


process
    variable RESULT : integer;
begin

    update_value(25, RESULT);

    report "RESULT = " &
           integer'image(RESULT);

    wait;

end process;`}
        </CodeExample>

        <div className="vhdl-procedure-call-visual">

          <div className="vhdl-procedure-call-input">
            A = 25
          </div>

          <div className="vhdl-procedure-call-arrow">
            →
          </div>

          <div className="vhdl-procedure-call-block">
            <small>CALL</small>
            <strong>update_value</strong>
          </div>

          <div className="vhdl-procedure-call-arrow">
            →
          </div>

          <div className="vhdl-procedure-call-output">
            RESULT = 35
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="hardware"
        title="6. Procedures in Hardware"
      >
        <p>
          Procedures can organize repeated operations in
          larger VHDL designs and testbenches.
        </p>

        <CodeExample title="Reusable Register Operation">
{`procedure load_register(
    DATA_IN  : in unsigned(3 downto 0);
    DATA_OUT : out unsigned(3 downto 0)
) is

begin

    DATA_OUT := DATA_IN;

end procedure;`}
        </CodeExample>

        <div className="vhdl-procedure-hardware">

          <div className="vhdl-procedure-data">
            DATA_IN
          </div>

          <div className="vhdl-procedure-arrow">
            →
          </div>

          <div className="vhdl-procedure-hardware-block">

            <small>PROCEDURE</small>
            <strong>LOAD_REGISTER</strong>

          </div>

          <div className="vhdl-procedure-arrow">
            →
          </div>

          <div className="vhdl-procedure-data">
            DATA_OUT
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Important"
        >
          Procedures are especially common in testbenches and
          verification code. Whether a procedure contributes
          to synthesizable hardware depends on where and how
          it is used.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          The following example uses a procedure inside a
          testbench to perform and report an addition operation.
        </p>

        <CodeExample title="Procedure Example">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity PROCEDURE_DEMO is
end PROCEDURE_DEMO;


architecture Behavioral of PROCEDURE_DEMO is

    procedure add_values(
        A      : in integer;
        B      : in integer;
        RESULT : out integer
    ) is
    begin

        RESULT := A + B;

    end procedure;

begin

    process

        variable RESULT : integer;

    begin

        add_values(12, 8, RESULT);

        report "12 + 8 = " &
               integer'image(RESULT);

        add_values(25, 15, RESULT);

        report "25 + 15 = " &
               integer'image(RESULT);

        wait;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-procedure-example-visual">

          <div>
            <small>CALL 1</small>
            <strong>12 + 8</strong>
            <span>→ 20</span>
          </div>

          <div>
            <small>CALL 2</small>
            <strong>25 + 15</strong>
            <span>→ 40</span>
          </div>

          <div className="vhdl-procedure-example-center">
            <small>REUSABLE</small>
            <strong>ADD_VALUES</strong>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the procedure and observe how the same procedure
          is called with different input values.
        </p>

        <TryIt
          title="VHDL Procedure Example"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity PROCEDURE_DEMO is
end PROCEDURE_DEMO;


architecture Behavioral of PROCEDURE_DEMO is

    procedure add_values(
        A      : in integer;
        B      : in integer;
        RESULT : out integer
    ) is
    begin

        RESULT := A + B;

    end procedure;

begin

    process

        variable RESULT : integer;

    begin

        add_values(12, 8, RESULT);

        report "12 + 8 = " &
               integer'image(RESULT);

        add_values(25, 15, RESULT);

        report "25 + 15 = " &
               integer'image(RESULT);

        add_values(40, 2, RESULT);

        report "40 + 2 = " &
               integer'image(RESULT);

        report "VHDL procedure simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-procedure-takeaways">

          <div>
            <strong>Reusable</strong>
            <span>
              Procedures package reusable operations.
            </span>
          </div>

          <div>
            <strong>IN</strong>
            <span>
              Receives a value inside the procedure.
            </span>
          </div>

          <div>
            <strong>OUT</strong>
            <span>
              Provides a value from the procedure.
            </span>
          </div>

          <div>
            <strong>INOUT</strong>
            <span>
              Can be read and modified.
            </span>
          </div>

          <div>
            <strong>Function</strong>
            <span>
              Returns a value and is commonly used for calculations.
            </span>
          </div>

          <div>
            <strong>Procedure</strong>
            <span>
              Performs an operation without requiring a return value.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Components and how larger VHDL
          designs can be built by connecting smaller modules.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Procedures;