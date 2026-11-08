import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function DataTypes() {
  const sections = [
    {
      id: "why-data-types",
      title: "Why Do We Need Data Types?"
    },
    {
      id: "four-state",
      title: "Four-State Data Types"
    },
    {
      id: "two-state",
      title: "Two-State Data Types"
    },
    {
      id: "logic",
      title: "The logic Type"
    },
    {
      id: "bit",
      title: "The bit Type"
    },
    {
      id: "integer-types",
      title: "Integer Types"
    },
    {
      id: "arrays",
      title: "Arrays"
    },
    {
      id: "enumerations",
      title: "Enumerations"
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
      title="SystemVerilog Data Types"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Basic Syntax"
      previousPath="/systemverilog/basic-syntax"
      nextLesson="Logic"
      nextPath="/systemverilog/logic"
    >

      <LessonSection
        id="why-data-types"
        title="Why Do We Need Data Types?"
      >
        <p>
          A data type tells SystemVerilog what kind of value a
          variable can store.
        </p>

        <p>
          In digital design, signals can represent binary values,
          numbers, states, counters, addresses, and many other
          types of information.
        </p>

        <p>
          SystemVerilog provides several data types that make
          hardware design and verification easier to understand.
        </p>

        <LessonVisual
          type="diagram"
          caption="Different data types can represent different kinds of information in a digital system."
        >
          <div className="lesson-data-type-diagram">

            <div className="data-type-box">
              <strong>logic</strong>
              <span>4-state signal</span>
            </div>

            <div className="data-type-box">
              <strong>bit</strong>
              <span>2-state signal</span>
            </div>

            <div className="data-type-box">
              <strong>int</strong>
              <span>Integer value</span>
            </div>

            <div className="data-type-box">
              <strong>enum</strong>
              <span>Named states</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="four-state"
        title="Four-State Data Types"
      >
        <p>
          One of the important features of SystemVerilog is its
          support for four-state logic.
        </p>

        <p>
          A four-state value can represent:
        </p>

        <div className="truth-table-container">
          <table className="truth-table">
            <thead>
              <tr>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>0</td>
                <td>Logic LOW</td>
              </tr>

              <tr>
                <td>1</td>
                <td>Logic HIGH</td>
              </tr>

              <tr>
                <td>X</td>
                <td>Unknown value</td>
              </tr>

              <tr>
                <td>Z</td>
                <td>High-impedance state</td>
              </tr>
            </tbody>
          </table>
        </div>

        <LearningNote
          type="info"
          title="Why are X and Z useful?"
        >
          <p>
            Real hardware simulations can encounter unknown or
            undriven signals. X and Z help the simulator represent
            these conditions.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="two-state"
        title="Two-State Data Types"
      >
        <p>
          SystemVerilog also provides two-state data types.
        </p>

        <p>
          Two-state types can represent only:
        </p>

        <div className="truth-table-container">
          <table className="truth-table">
            <thead>
              <tr>
                <th>Value</th>
                <th>Meaning</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>0</td>
                <td>Logic LOW</td>
              </tr>

              <tr>
                <td>1</td>
                <td>Logic HIGH</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The most commonly used two-state type is
          <strong> bit</strong>.
        </p>

        <LearningNote
          type="tip"
          title="Quick idea"
        >
          <p>
            Think of <strong>bit</strong> as 0 or 1 only, while
            <strong> logic</strong> can represent 0, 1, X, and Z.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="logic"
        title="The logic Type"
      >
        <p>
          The <strong>logic</strong> type is one of the most
          commonly used data types in SystemVerilog.
        </p>

        <p>
          It is a four-state variable type and can represent
          0, 1, X, and Z.
        </p>

        <CodeExample title="Declaring a logic signal">
{`logic enable;

logic data;

logic [3:0] count;`}
        </CodeExample>

        <p>
          The declaration
          <strong> logic [3:0] count </strong>
          creates a 4-bit vector.
        </p>

        <LessonVisual
          type="diagram"
          caption="A 4-bit logic vector contains four individual bits."
        >
          <div className="logic-vector-diagram">

            <div className="logic-bit">3</div>
            <div className="logic-bit">2</div>
            <div className="logic-bit">1</div>
            <div className="logic-bit">0</div>

          </div>
        </LessonVisual>

        <p>
          The bits are numbered from the most significant bit
          <strong> 3 </strong>
          to the least significant bit
          <strong> 0</strong>.
        </p>
      </LessonSection>


      <LessonSection
        id="bit"
        title="The bit Type"
      >
        <p>
          The <strong>bit</strong> type is a two-state data type.
        </p>

        <p>
          It can store only 0 or 1.
        </p>

        <CodeExample title="Using bit">
{`bit enable;

bit [3:0] data;

initial begin
  enable = 1;
  data = 4'b1010;
end`}
        </CodeExample>

        <p>
          Since <strong>bit</strong> is a two-state type, it does
          not represent X or Z values.
        </p>

        <LearningNote
          type="info"
          title="Remember"
        >
          <p>
            Use <strong>logic</strong> when four-state simulation
            behavior is useful. Use <strong>bit</strong> when only
            0 and 1 are needed.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="integer-types"
        title="Integer Types"
      >
        <p>
          SystemVerilog provides several integer types for storing
          numerical values.
        </p>

        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Typical Size</th>
                <th>Use</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>byte</td>
                <td>8 bits</td>
                <td>Small integer values</td>
              </tr>

              <tr>
                <td>shortint</td>
                <td>16 bits</td>
                <td>Small numerical values</td>
              </tr>

              <tr>
                <td>int</td>
                <td>32 bits</td>
                <td>General integer calculations</td>
              </tr>

              <tr>
                <td>longint</td>
                <td>64 bits</td>
                <td>Larger integer values</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeExample title="Integer declarations">
{`byte temperature;

shortint value;

int counter;

longint address;`}
        </CodeExample>

        <p>
          The <strong>int</strong> type is especially common in
          SystemVerilog testbenches and verification code.
        </p>
      </LessonSection>


      <LessonSection
        id="arrays"
        title="Arrays"
      >
        <p>
          Arrays allow us to store multiple values using a single
          variable name.
        </p>

        <p>
          For example, a 4-bit vector can be declared as:
        </p>

        <CodeExample title="Packed array">
{`logic [3:0] data;`}
        </CodeExample>

        <p>
          Here, <strong>data</strong> contains four bits.
        </p>

        <p>
          SystemVerilog also supports unpacked arrays.
        </p>

        <CodeExample title="Unpacked array">
{`logic [7:0] memory [0:3];`}
        </CodeExample>

        <p>
          This represents four elements, where each element is
          8 bits wide.
        </p>

        <LessonVisual
          type="diagram"
          caption="An unpacked array can be viewed as multiple storage elements."
        >
          <div className="memory-array-diagram">

            <div className="memory-cell">
              <strong>memory[0]</strong>
              <span>8 bits</span>
            </div>

            <div className="memory-cell">
              <strong>memory[1]</strong>
              <span>8 bits</span>
            </div>

            <div className="memory-cell">
              <strong>memory[2]</strong>
              <span>8 bits</span>
            </div>

            <div className="memory-cell">
              <strong>memory[3]</strong>
              <span>8 bits</span>
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="enumerations"
        title="Enumerations"
      >
        <p>
          An enumeration, or <strong>enum</strong>, allows us to
          create a variable that can have one of a set of named
          values.
        </p>

        <p>
          This is especially useful for representing states in a
          finite state machine.
        </p>

        <CodeExample title="SystemVerilog enum">
{`typedef enum logic [1:0] {
  IDLE,
  START,
  RUN,
  DONE
} state_t;

state_t state;`}
        </CodeExample>

        <p>
          Instead of remembering numerical values, we can use
          meaningful names such as <strong>IDLE</strong>,
          <strong> START</strong>, <strong>RUN</strong>, and
          <strong> DONE</strong>.
        </p>

        <LessonVisual
          type="diagram"
          caption="An enum makes hardware states easier to understand."
        >
          <div className="enum-state-diagram">

            <div className="enum-state">IDLE</div>

            <div className="enum-arrow">→</div>

            <div className="enum-state">START</div>

            <div className="enum-arrow">→</div>

            <div className="enum-state">RUN</div>

            <div className="enum-arrow">→</div>

            <div className="enum-state">DONE</div>

          </div>
        </LessonVisual>

        <LearningNote
          type="tip"
          title="Why use enum?"
        >
          <p>
            Named states make RTL code easier to read and are
            especially helpful when designing FSMs.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Try changing the values and observe how SystemVerilog
          handles different data types.
        </p>

        <TryIt
          title="Experiment with Data Types"
          language="SystemVerilog"
          initialCode={`module data_types_demo;

  logic [3:0] logic_data;
  bit [3:0] bit_data;

  int number;

  typedef enum logic [1:0] {
    IDLE,
    RUN,
    DONE
  } state_t;

  state_t state;

  initial begin

    logic_data = 4'b10X1;
    bit_data = 4'b1010;

    number = 25;

    state = RUN;

    $display("logic_data = %b", logic_data);
    $display("bit_data   = %b", bit_data);
    $display("number     = %0d", number);
    $display("state      = %0d", state);

    #10 $finish;

  end

endmodule`}
        />
      </LessonSection>


      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>
            SystemVerilog provides many data types for hardware
            design and verification.
          </li>

          <li>
            <strong>logic</strong> is a four-state data type:
            0, 1, X, and Z.
          </li>

          <li>
            <strong>bit</strong> is a two-state data type:
            0 and 1.
          </li>

          <li>
            Integer types such as <strong>int</strong>,
            <strong> byte</strong>, and
            <strong> longint</strong> can store numerical values.
          </li>

          <li>
            Arrays allow multiple values to be stored together.
          </li>

          <li>
            Enumerations provide meaningful names for a fixed set
            of values or states.
          </li>

          <li>
            Data types make SystemVerilog code easier to read,
            understand, and verify.
          </li>
        </ul>

        <LearningNote
          type="important"
          title="Next Step"
        >
          <p>
            Now that we understand SystemVerilog data types,
            the next lesson will focus specifically on the
            <strong> logic </strong>
            type and how it is used in RTL design.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default DataTypes;