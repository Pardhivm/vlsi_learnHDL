import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Classes() {
  const sections = [
    {
      id: "what-is-class",
      title: "What is a Class?"
    },
    {
      id: "why-use-classes",
      title: "Why Use Classes?"
    },
    {
      id: "basic-class",
      title: "Basic Class Syntax"
    },
    {
      id: "class-properties",
      title: "Class Properties"
    },
    {
      id: "class-methods",
      title: "Class Methods"
    },
    {
      id: "objects",
      title: "Objects"
    },
    {
      id: "constructors",
      title: "Constructors"
    },
    {
      id: "verification",
      title: "Classes in Verification"
    },
    {
      id: "practical-example",
      title: "Practical Example"
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

  const tryItCode = `class Packet;

    integer id;

    function new();
        id = 25;
    endfunction

endclass


module top;

    Packet packet;

    initial begin

        packet = new();

        $display("Packet ID = %0d", packet.id);

        packet.id = 50;

        $display("Updated Packet ID = %0d", packet.id);

        $finish;

    end

endmodule`;

  return (
    <LessonPage
      title="SystemVerilog Classes"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Interfaces"
      previousPath="/systemverilog/interfaces"
      nextLesson="Assertions"
      nextPath="/systemverilog/assertions"
    >

      <LessonSection
        id="what-is-class"
        title="What is a Class?"
      >
        <p>
          A <strong>class</strong> in SystemVerilog is a
          user-defined data type that can contain data and
          functions.
        </p>

        <p>
          Classes are different from the hardware-oriented
          constructs we have mainly used so far. They are primarily
          used to build powerful and reusable
          <strong> verification environments </strong>.
        </p>

        <LessonVisual
          type="diagram"
          caption="A class combines related properties and methods."
        >
          <div className="class-structure-diagram">

            <div className="class-box">

              <div className="class-box-title">
                Class
              </div>

              <div className="class-box-section">
                <strong>Properties</strong>
                <br />
                address
                <br />
                data
                <br />
                id
              </div>

              <div className="class-box-section">
                <strong>Methods</strong>
                <br />
                display()
                <br />
                calculate()
              </div>

            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Simple Idea"
        >
          <p>
            Think of a class as a blueprint containing both
            information and operations that work on that information.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="why-use-classes"
        title="Why Use Classes?"
      >
        <p>
          Classes are extremely useful when building complex
          verification environments.
        </p>

        <ul>
          <li>Group related data together.</li>
          <li>Group related functions together.</li>
          <li>Create reusable objects.</li>
          <li>Model transactions.</li>
          <li>Build verification components.</li>
          <li>Support object-oriented programming.</li>
        </ul>

        <LessonVisual
          type="diagram"
          caption="One class can be used to create multiple objects."
        >
          <div className="class-object-group">

            <div className="class-base-box">
              Transaction Class
            </div>

            <div className="class-object-arrow">
              ↓
            </div>

            <div className="class-created-objects">

              <div className="class-created-object">
                Object 1
              </div>

              <div className="class-created-object">
                Object 2
              </div>

              <div className="class-created-object">
                Object 3
              </div>

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="basic-class"
        title="Basic Class Syntax"
      >
        <p>
          A class is declared using the
          <strong> class </strong>
          keyword and ends with
          <strong> endclass </strong>.
        </p>

        <CodeExample title="Basic Class">
{`class Transaction;

    logic [7:0] address;
    logic [7:0] data;

endclass`}
        </CodeExample>

        <p>
          In this example,
          <code>address</code> and
          <code>data</code> are properties of the class.
        </p>
      </LessonSection>


      <LessonSection
        id="class-properties"
        title="Class Properties"
      >
        <p>
          Properties are variables declared inside a class.
          They store information about an object.
        </p>

        <CodeExample title="Class Properties">
{`class Packet;

    logic [7:0] address;
    logic [7:0] data;
    integer id;

endclass`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="Properties hold the data associated with an object."
        >
          <div className="property-object-diagram">

            <div className="property-class">
              Packet Class
            </div>

            <div className="property-arrow">
              ↓
            </div>

            <div className="property-object">

              <strong>Object</strong>

              <br />
              address = 8'h10

              <br />
              data = 8'hA5

              <br />
              id = 25

            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="class-methods"
        title="Class Methods"
      >
        <p>
          A method is a function or task declared inside a class.
        </p>

        <CodeExample title="Class Method">
{`class Packet;

    logic [7:0] data;

    function void display();

        $display("Data = %h", data);

    endfunction

endclass`}
        </CodeExample>

        <p>
          The method can operate on the properties belonging to the
          class object.
        </p>
      </LessonSection>


      <LessonSection
        id="objects"
        title="Objects"
      >
        <p>
          A class is a blueprint. An
          <strong> object </strong>
          is an actual instance created from that class.
        </p>

        <CodeExample title="Creating an Object">
{`class Packet;

    integer id;

endclass


module top;

    Packet packet;

endmodule`}
        </CodeExample>

        <p>
          Here,
          <code>Packet</code> is the class and
          <code>packet</code> is an object handle.
        </p>

        <LearningNote
          type="warning"
          title="Important"
        >
          <p>
            Declaring an object handle does not automatically create
            the object. The object must be constructed before its
            properties can be accessed.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="constructors"
        title="Constructors"
      >
        <p>
          A constructor is a special function called
          <code>new()</code>.
        </p>

        <p>
          It is used when creating a class object and can initialize
          its properties.
        </p>

        <CodeExample title="Constructor Example">
{`class Packet;

    integer id;

    function new();

        id = 25;

    endfunction

endclass`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="The new() constructor initializes a newly created object."
        >
          <div className="object-creation-diagram">

            <div className="object-class-box">
              Packet Class
            </div>

            <div className="object-arrow">
              ↓ new()
            </div>

            <div className="object-instance-box">
              Packet Object
              <br />
              id = 25
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="verification"
        title="Classes in Verification"
      >
        <p>
          Classes are one of the most important SystemVerilog
          features for verification.
        </p>

        <p>
          Verification environments commonly use classes to
          represent transactions and verification components.
        </p>

        <LessonVisual
          type="diagram"
          caption="Classes can represent different parts of a verification environment."
        >
          <div className="verification-class-flow">

            <div className="verification-class-box">
              Transaction
            </div>

            <div className="verification-class-arrow">
              →
            </div>

            <div className="verification-class-box">
              Driver
            </div>

            <div className="verification-class-arrow">
              →
            </div>

            <div className="verification-class-box">
              Monitor
            </div>

            <div className="verification-class-arrow">
              →
            </div>

            <div className="verification-class-box">
              Scoreboard
            </div>

          </div>
        </LessonVisual>

        <p>
          This object-oriented approach becomes especially
          important when learning
          <strong> UVM </strong>.
        </p>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Example"
      >
        <p>
          Here is a simple transaction class containing an ID.
        </p>

        <CodeExample title="Transaction Class">
{`class Packet;

    integer id;

    function new();

        id = 25;

    endfunction

endclass`}
        </CodeExample>

        <p>
          We can create an object and access its property.
        </p>

        <CodeExample title="Using the Class">
{`module top;

    Packet packet;

    initial begin

        packet = new();

        $display("Packet ID = %0d", packet.id);

    end

endmodule`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="The object receives its initial value through the constructor."
        >
          <div className="object-creation-diagram">

            <div className="object-class-box">
              Packet
              <br />
              Class
            </div>

            <div className="object-arrow">
              new()
            </div>

            <div className="object-instance-box">
              packet
              <br />
              id = 25
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Create a class object and experiment with its property
          values.
        </p>

        <TryIt
          title="Experiment with Classes"
          language="SystemVerilog"
          initialCode={tryItCode}
        />
      </LessonSection>


      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>A class is a user-defined data type.</li>
          <li>Classes contain properties and methods.</li>
          <li>An object is an instance created from a class.</li>
          <li>The <code>new()</code> function is used as a constructor.</li>
          <li>Classes are heavily used in SystemVerilog verification.</li>
          <li>Classes are fundamental to understanding UVM.</li>
        </ul>

        <LearningNote
          type="tip"
          title="Next Step"
        >
          <p>
            After classes, the next important SystemVerilog topic is
            <strong> Assertions </strong>
            — a powerful way to automatically check whether a design
            behaves as expected.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Classes;