import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import LessonVisual from "../../components/LessonVisual";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import SystemVerilogSidebar from "../../components/SystemVerilogSidebar";

function Interfaces() {
  const sections = [
    {
      id: "what-is-interface",
      title: "What is an Interface?"
    },
    {
      id: "why-use-interfaces",
      title: "Why Use Interfaces?"
    },
    {
      id: "basic-interface",
      title: "Basic Interface"
    },
    {
      id: "connecting-modules",
      title: "Connecting Modules"
    },
    {
      id: "interface-signals",
      title: "Interface Signals"
    },
    {
      id: "modports",
      title: "Modports"
    },
    {
      id: "verification",
      title: "Interfaces in Verification"
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

  const tryItCode = `interface data_bus;

    logic [7:0] data;
    logic valid;

endinterface


module top;

    data_bus bus();

    initial begin

        bus.data = 8'hA5;
        bus.valid = 1'b1;

        #1;

        $display("Data  = %h", bus.data);
        $display("Valid = %b", bus.valid);

        bus.data = 8'h3C;
        bus.valid = 1'b0;

        #1;

        $display("Data  = %h", bus.data);
        $display("Valid = %b", bus.valid);

        $finish;

    end

endmodule`;

  return (
    <LessonPage
      title="SystemVerilog Interfaces"
      courseName="SystemVerilog"
      sidebar={<SystemVerilogSidebar />}
      sections={sections}
      previousLesson="Always Blocks"
      previousPath="/systemverilog/always-blocks"
      nextLesson="Classes"
      nextPath="/systemverilog/classes"
    >

      <LessonSection
        id="what-is-interface"
        title="What is an Interface?"
      >
        <p>
          An <strong>interface</strong> in SystemVerilog is a container
          that groups related signals together.
        </p>

        <p>
          In a large design, many signals may need to travel between
          modules. Instead of declaring every signal separately,
          an interface allows us to organize them into one reusable
          connection.
        </p>

        <LessonVisual
          type="diagram"
          caption="An interface groups related signals into one connection."
        >
          <div className="interface-group-diagram">

            <div className="interface-module">
              Sender
            </div>

            <div className="interface-connection">
              <span className="interface-label">
                Interface
              </span>

              <div className="interface-signals">
                data
                <br />
                valid
                <br />
                ready
              </div>
            </div>

            <div className="interface-module">
              Receiver
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Think of an Interface Like a Bundle"
        >
          <p>
            Instead of carrying many individual wires between
            modules, an interface bundles related signals together.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="why-use-interfaces"
        title="Why Use Interfaces?"
      >
        <p>
          Interfaces become especially useful when a design contains
          many related signals.
        </p>

        <ul>
          <li>Reduce the number of individual connections.</li>
          <li>Keep related signals organized.</li>
          <li>Make designs easier to understand.</li>
          <li>Make verification environments easier to structure.</li>
          <li>Allow the same interface to be reused.</li>
        </ul>

        <LessonVisual
          type="diagram"
          caption="An interface can simplify connections between multiple modules."
        >
          <div className="interface-module-flow">

            <div className="interface-module-box">
              Module A
            </div>

            <div className="interface-flow-arrow">
              →
            </div>

            <div className="interface-bus-box">
              <strong>Interface</strong>
              <br />
              data
              <br />
              valid
              <br />
              ready
            </div>

            <div className="interface-flow-arrow">
              →
            </div>

            <div className="interface-module-box">
              Module B
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="basic-interface"
        title="Basic Interface"
      >
        <p>
          An interface is declared using the
          <strong> interface </strong>
          keyword.
        </p>

        <CodeExample title="Basic Interface">
{`interface data_bus;

    logic [7:0] data;
    logic valid;
    logic ready;

endinterface`}
        </CodeExample>

        <p>
          Here, the interface contains three signals:
        </p>

        <ul>
          <li><code>data</code> — an 8-bit data signal</li>
          <li><code>valid</code> — indicates valid data</li>
          <li><code>ready</code> — indicates that the receiver is ready</li>
        </ul>

        <LearningNote
          type="tip"
          title="Important"
        >
          <p>
            An interface does not replace the signals. It organizes
            related signals into a single reusable structure.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="connecting-modules"
        title="Connecting Modules"
      >
        <p>
          An interface can be used to connect different parts of a
          design.
        </p>

        <CodeExample title="Conceptual Example">
{`interface data_bus;

    logic [7:0] data;
    logic valid;
    logic ready;

endinterface


module sender(data_bus bus);

    // Send data through the interface

endmodule


module receiver(data_bus bus);

    // Receive data through the interface

endmodule`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="Conceptual connection using an interface."
        >
          <div className="interface-module-flow">

            <div className="interface-module-box">
              Sender
            </div>

            <div className="interface-flow-arrow">
              →
            </div>

            <div className="interface-bus-box">
              Data Bus
            </div>

            <div className="interface-flow-arrow">
              →
            </div>

            <div className="interface-module-box">
              Receiver
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="warning"
          title="Tool Compatibility"
        >
          <p>
            Interface ports and advanced interface features are not
            equally supported by every simulator. This is why the
            interactive example below uses a simpler interface
            configuration.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="interface-signals"
        title="Interface Signals"
      >
        <p>
          An interface can contain many types of signals depending
          on the communication protocol.
        </p>

        <CodeExample title="Example Signals">
{`interface bus;

    logic        clk;
    logic        reset;
    logic [7:0]  data;
    logic        valid;
    logic        ready;

endinterface`}
        </CodeExample>

        <p>
          A common communication structure might contain:
        </p>

        <ul>
          <li><strong>clk</strong> — clock signal</li>
          <li><strong>reset</strong> — reset signal</li>
          <li><strong>data</strong> — information being transferred</li>
          <li><strong>valid</strong> — indicates valid data</li>
          <li><strong>ready</strong> — indicates that the receiver can accept data</li>
        </ul>
      </LessonSection>


      <LessonSection
        id="modports"
        title="Modports"
      >
        <p>
          A <strong>modport</strong> defines how a module is allowed
          to access signals inside an interface.
        </p>

        <CodeExample title="Modport Example">
{`interface data_bus;

    logic [7:0] data;
    logic valid;
    logic ready;

    modport master (
        output data,
        output valid,
        input ready
    );

    modport slave (
        input data,
        input valid,
        output ready
    );

endinterface`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="Different modules can have different directions for the same interface signals."
        >
          <div className="modport-diagram">

            <div className="modport-box">
              Master
              <br />
              <small>
                output data
                <br />
                output valid
                <br />
                input ready
              </small>
            </div>

            <div className="modport-interface">
              Interface
            </div>

            <div className="modport-box">
              Slave
              <br />
              <small>
                input data
                <br />
                input valid
                <br />
                output ready
              </small>
            </div>

          </div>
        </LessonVisual>

        <LearningNote
          type="info"
          title="Why Modports?"
        >
          <p>
            Modports make the direction of communication clearer
            and help prevent incorrect signal usage.
          </p>
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="verification"
        title="Interfaces in Verification"
      >
        <p>
          Interfaces are particularly useful in SystemVerilog
          verification environments.
        </p>

        <p>
          A testbench can use an interface to communicate with the
          Design Under Test, commonly called the DUT.
        </p>

        <LessonVisual
          type="diagram"
          caption="An interface can act as a communication bridge between verification components and the DUT."
        >
          <div className="verification-interface-diagram">

            <div className="verification-box">
              Testbench
            </div>

            <div className="verification-arrow">
              →
            </div>

            <div className="verification-interface">
              Interface
            </div>

            <div className="verification-arrow">
              →
            </div>

            <div className="verification-box">
              DUT
            </div>

          </div>
        </LessonVisual>

        <p>
          This approach is widely used in larger verification
          environments and becomes especially important when learning
          UVM.
        </p>
      </LessonSection>


      <LessonSection
        id="practical-example"
        title="Practical Example"
      >
        <p>
          Consider a simple data bus carrying an 8-bit value.
        </p>

        <CodeExample title="Interface Definition">
{`interface data_bus;

    logic [7:0] data;
    logic valid;

endinterface`}
        </CodeExample>

        <p>
          The interface can then be instantiated and its signals
          accessed through the interface instance.
        </p>

        <CodeExample title="Using the Interface">
{`module top;

    data_bus bus();

    initial begin

        bus.data = 8'hA5;
        bus.valid = 1'b1;

        #1;

        $display("Data = %h", bus.data);
        $display("Valid = %b", bus.valid);

    end

endmodule`}
        </CodeExample>

        <LessonVisual
          type="diagram"
          caption="The bus instance provides access to the grouped signals."
        >
          <div className="interface-group-diagram">

            <div className="interface-module">
              top
            </div>

            <div className="interface-connection">
              <span className="interface-label">
                bus
              </span>

              <div className="interface-signals">
                data = A5
                <br />
                valid = 1
              </div>
            </div>

            <div className="interface-module">
              Signals
            </div>

          </div>
        </LessonVisual>
      </LessonSection>


      <LessonSection
        id="try-it"
        title="Try It Yourself"
      >
        <p>
          Experiment with a simple SystemVerilog interface and
          observe its signal values.
        </p>

        <TryIt
          title="Experiment with an Interface"
          language="SystemVerilog"
          initialCode={tryItCode}
        />
      </LessonSection>


      <LessonSection
        id="key-takeaways"
        title="Key Takeaways"
      >
        <ul>
          <li>An interface groups related signals together.</li>
          <li>Interfaces reduce complicated module connections.</li>
          <li>Modports define how modules access interface signals.</li>
          <li>Interfaces are very useful in verification.</li>
          <li>They are especially important when learning UVM.</li>
          <li>Simulator support for advanced interface features can vary.</li>
        </ul>

        <LearningNote
          type="tip"
          title="Next Step"
        >
          <p>
            After learning interfaces, the next important
            SystemVerilog concept is the
            <strong> class </strong>
            construct, which is heavily used in verification.
          </p>
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Interfaces;