import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Functions() {
  const sections = [
    { id: "overview", title: "What is a Function?" },
    { id: "syntax", title: "Function Syntax" },
    { id: "parameters", title: "Parameters" },
    { id: "return", title: "Return Value" },
    { id: "calling", title: "Calling a Function" },
    { id: "hardware", title: "Functions in Hardware" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Functions"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Loops"
      previousPath="/vhdl/loops"
      nextLesson="Procedures"
      nextPath="/vhdl/procedures"
    >

      <LessonSection
        id="overview"
        title="1. What is a Function?"
      >
        <p className="lesson-intro">
          A VHDL function is a reusable block of code that
          accepts inputs, performs an operation, and returns
          a single value.
        </p>

        <p>
          Functions are useful when the same calculation or
          operation is needed in multiple places in a design.
        </p>

        <div className="vhdl-function-main-visual">

          <div className="vhdl-function-inputs">
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-function-arrow">
            →
          </div>

          <div className="vhdl-function-block">
            <small>FUNCTION</small>
            <strong>ADD</strong>
            <span>Reusable operation</span>
          </div>

          <div className="vhdl-function-arrow">
            →
          </div>

          <div className="vhdl-function-output">
            RESULT
          </div>

        </div>

        <LearningNote
          type="info"
          title="Main Idea"
        >
          A function performs a calculation and returns one
          result to the code that called it.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="syntax"
        title="2. Function Syntax"
      >
        <p>
          A function is declared using the
          <code> function</code> keyword and contains a
          <code> return</code> type.
        </p>

        <CodeExample title="Basic Function">
{`function add_two(
    A : integer;
    B : integer
) return integer is

begin

    return A + B;

end function;`}
        </CodeExample>

        <div className="vhdl-function-syntax-flow">

          <div>
            <span>1</span>
            <strong>function</strong>
            <small>Declare function</small>
          </div>

          <div>→</div>

          <div>
            <span>2</span>
            <strong>Parameters</strong>
            <small>Receive inputs</small>
          </div>

          <div>→</div>

          <div>
            <span>3</span>
            <strong>return</strong>
            <small>Define result type</small>
          </div>

          <div>→</div>

          <div>
            <span>4</span>
            <strong>Body</strong>
            <small>Perform operation</small>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="parameters"
        title="3. Parameters"
      >
        <p>
          Functions can accept one or more parameters.
          Parameters provide the values that the function
          operates on.
        </p>

        <CodeExample title="Function with Parameters">
{`function maximum(
    A : integer;
    B : integer
) return integer is

begin

    if A > B then
        return A;
    else
        return B;
    end if;

end function;`}
        </CodeExample>

        <div className="vhdl-function-parameters">

          <div>
            <small>INPUT 1</small>
            <strong>A</strong>
          </div>

          <div>
            <small>INPUT 2</small>
            <strong>B</strong>
          </div>

          <div className="vhdl-function-parameter-arrow">
            →
          </div>

          <div className="vhdl-function-parameter-box">
            <small>FUNCTION</small>
            <strong>MAXIMUM</strong>
          </div>

        </div>

        <p>
          The function can then compare the two values and
          return whichever one is larger.
        </p>
      </LessonSection>


      <LessonSection
        id="return"
        title="4. Return Value"
      >
        <p>
          Every function has a return type. The
          <code> return</code> statement supplies the value
          produced by the function.
        </p>

        <CodeExample title="Return Example">
{`function square(
    A : integer
) return integer is

begin

    return A * A;

end function;`}
        </CodeExample>

        <div className="vhdl-function-return-visual">

          <div className="vhdl-function-value">
            A = 5
          </div>

          <div>→</div>

          <div className="vhdl-function-return-block">
            <small>FUNCTION</small>
            <strong>A × A</strong>
          </div>

          <div>→</div>

          <div className="vhdl-function-value result">
            25
          </div>

        </div>

        <LearningNote
          type="tip"
          title="One Return Value"
        >
          A VHDL function returns one value through its return
          type.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="calling"
        title="5. Calling a Function"
      >
        <p>
          After defining a function, you can call it wherever
          the function is visible.
        </p>

        <CodeExample title="Calling a Function">
{`function add_two(
    A : integer;
    B : integer
) return integer is
begin
    return A + B;
end function;


RESULT <= add_two(A, B);`}
        </CodeExample>

        <div className="vhdl-function-call-visual">

          <div className="vhdl-function-call-input">
            A, B
          </div>

          <div className="vhdl-function-call-arrow">
            →
          </div>

          <div className="vhdl-function-call">
            add_two(A, B)
          </div>

          <div className="vhdl-function-call-arrow">
            →
          </div>

          <div className="vhdl-function-call-output">
            RESULT
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="hardware"
        title="6. Functions in Hardware"
      >
        <p>
          Functions can be used to describe reusable
          calculations inside synthesizable VHDL.
        </p>

        <CodeExample title="Reusable Adder">
{`function add_unsigned(
    A : unsigned(3 downto 0);
    B : unsigned(3 downto 0)
) return unsigned is

begin

    return A + B;

end function;`}
        </CodeExample>

        <div className="vhdl-function-hardware">

          <div className="vhdl-function-hardware-inputs">
            <span>A</span>
            <span>B</span>
          </div>

          <div className="vhdl-function-hardware-block">
            <small>FUNCTION</small>
            <strong>ADDER</strong>
            <span>A + B</span>
          </div>

          <div className="vhdl-function-hardware-output">
            SUM
          </div>

        </div>

        <LearningNote
          type="info"
          title="Synthesis"
        >
          When a function contains synthesizable operations,
          synthesis tools can implement those operations as
          hardware.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Let's create a reusable 4-bit addition function.
        </p>

        <CodeExample title="4-bit Adder Function">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity FUNCTION_ADDER is

    port (
        A   : in unsigned(3 downto 0);
        B   : in unsigned(3 downto 0);
        SUM : out unsigned(4 downto 0)
    );

end FUNCTION_ADDER;


architecture Behavioral of FUNCTION_ADDER is

    function add_values(
        X : unsigned(3 downto 0);
        Y : unsigned(3 downto 0)
    ) return unsigned is

        variable TEMP : unsigned(4 downto 0);

    begin

        TEMP := resize(X, 5) + resize(Y, 5);

        return TEMP;

    end function;

begin

    SUM <= add_values(A, B);

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-function-adder-visual">

          <div className="vhdl-function-adder-input">
            <small>A</small>
            <strong>9</strong>
          </div>

          <div className="vhdl-function-adder-plus">
            +
          </div>

          <div className="vhdl-function-adder-input">
            <small>B</small>
            <strong>6</strong>
          </div>

          <div className="vhdl-function-adder-arrow">
            →
          </div>

          <div className="vhdl-function-adder-block">
            <small>FUNCTION</small>
            <strong>ADD_VALUES</strong>
          </div>

          <div className="vhdl-function-adder-arrow">
            →
          </div>

          <div className="vhdl-function-adder-result">
            <small>SUM</small>
            <strong>15</strong>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Run the 4-bit adder and experiment with the input
          values to see the function calculate the result.
        </p>

        <TryIt
          title="VHDL Function - 4-bit Adder"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity FUNCTION_ADDER is
    port (
        A   : in unsigned(3 downto 0);
        B   : in unsigned(3 downto 0);
        SUM : out unsigned(4 downto 0)
    );
end FUNCTION_ADDER;

architecture Behavioral of FUNCTION_ADDER is

    function add_values(
        X : unsigned(3 downto 0);
        Y : unsigned(3 downto 0)
    ) return unsigned is

        variable TEMP : unsigned(4 downto 0);

    begin

        TEMP := resize(X, 5) + resize(Y, 5);

        return TEMP;

    end function;

begin

    SUM <= add_values(A, B);

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity FUNCTION_ADDER_TB is
end FUNCTION_ADDER_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

architecture Behavioral of FUNCTION_ADDER_TB is

    signal A   : unsigned(3 downto 0) := "0000";
    signal B   : unsigned(3 downto 0) := "0000";
    signal SUM : unsigned(4 downto 0);

begin

    UUT : entity work.FUNCTION_ADDER
        port map (
            A   => A,
            B   => B,
            SUM => SUM
        );

    process
    begin

        A <= to_unsigned(3, 4);
        B <= to_unsigned(5, 4);

        wait for 10 ns;

        report "A=3 B=5 SUM=" &
               integer'image(to_integer(SUM));

        A <= to_unsigned(9, 4);
        B <= to_unsigned(6, 4);

        wait for 10 ns;

        report "A=9 B=6 SUM=" &
               integer'image(to_integer(SUM));

        A <= to_unsigned(15, 4);
        B <= to_unsigned(1, 4);

        wait for 10 ns;

        report "A=15 B=1 SUM=" &
               integer'image(to_integer(SUM));

        report "VHDL function adder simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-function-takeaways">

          <div>
            <strong>Reusable</strong>
            <span>
              A function can be used in multiple places.
            </span>
          </div>

          <div>
            <strong>Parameters</strong>
            <span>
              Functions can receive input values.
            </span>
          </div>

          <div>
            <strong>Return</strong>
            <span>
              A function produces one returned value.
            </span>
          </div>

          <div>
            <strong>Calling</strong>
            <span>
              Functions are invoked using their name and inputs.
            </span>
          </div>

          <div>
            <strong>Synthesis</strong>
            <span>
              Synthesizable functions can describe hardware.
            </span>
          </div>

          <div>
            <strong>Abstraction</strong>
            <span>
              Functions make repeated calculations easier to
              organize.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           Procedures and how they differ from
          functions in VHDL.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Functions;