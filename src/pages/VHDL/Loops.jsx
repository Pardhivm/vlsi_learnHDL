import LessonPage from "../../components/LessonPage";
import LessonSection from "../../components/LessonSection";
import CodeExample from "../../components/CodeExample";
import LearningNote from "../../components/LearningNote";
import TryIt from "../../components/TryIt";
import VHDLSidebar from "../../components/VHDLSidebar";

function Loops() {
  const sections = [
    { id: "overview", title: "What are Loops?" },
    { id: "for", title: "FOR Loop" },
    { id: "range", title: "Loop Range" },
    { id: "while", title: "WHILE Loop" },
    { id: "nested", title: "Nested Loops" },
    { id: "hardware", title: "Loops in Hardware" },
    { id: "example", title: "Complete Example" },
    { id: "tryit", title: "Try It Yourself" },
    { id: "takeaways", title: "Key Takeaways" }
  ];

  return (
    <LessonPage
      title="VHDL Loops"
      courseName="VHDL"
      sidebar={<VHDLSidebar />}
      sections={sections}
      previousLesson="Case"
      previousPath="/vhdl/case"
      nextLesson="Functions"
      nextPath="/vhdl/functions"
    >

      <LessonSection
        id="overview"
        title="1. What are Loops?"
      >
        <p className="lesson-intro">
          Loops allow a group of VHDL statements to be
          repeated multiple times.
        </p>

        <p>
          Loops are especially useful when the same operation
          needs to be performed across several bits or elements
          of an array.
        </p>

        <div className="vhdl-loop-main-visual">

          <div className="vhdl-loop-input">
            <small>INPUT</small>
            <strong>DATA</strong>
            <span>4 bits</span>
          </div>

          <div className="vhdl-loop-arrow">→</div>

          <div className="vhdl-loop-repeat">

            <small>LOOP</small>

            <div className="vhdl-loop-repeat-items">
              <span>i = 0</span>
              <span>i = 1</span>
              <span>i = 2</span>
              <span>i = 3</span>
            </div>

          </div>

          <div className="vhdl-loop-arrow">→</div>

          <div className="vhdl-loop-output">
            <small>RESULT</small>
            <strong>COUNT</strong>
          </div>

        </div>

        <LearningNote
          type="info"
          title="Hardware View"
        >
          In synthesizable VHDL, a loop usually describes
          repeated hardware rather than a software-style
          runtime loop.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="for"
        title="2. FOR Loop"
      >
        <p>
          The <code>for</code> loop repeats statements over a
          defined range.
        </p>

        <CodeExample title="Basic FOR Loop">
{`process
begin

    for i in 0 to 3 loop

        Y(i) <= A(i);

    end loop;

end process;`}
        </CodeExample>

        <div className="vhdl-loop-for-visual">

          <div>
            <span>START</span>
            <strong>0</strong>
          </div>

          <div className="vhdl-loop-step">→</div>

          <div>
            <span>i</span>
            <strong>1</strong>
          </div>

          <div className="vhdl-loop-step">→</div>

          <div>
            <span>i</span>
            <strong>2</strong>
          </div>

          <div className="vhdl-loop-step">→</div>

          <div>
            <span>END</span>
            <strong>3</strong>
          </div>

        </div>

        <LearningNote
          type="tip"
          title="Loop Variable"
        >
          The loop variable is automatically declared by the
          <code> for</code> loop and should not be separately
          declared.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="range"
        title="3. Loop Range"
      >
        <p>
          The range determines which values the loop variable
          takes.
        </p>

        <CodeExample title="Ascending Range">
{`for i in 0 to 3 loop
    ...
end loop;`}
        </CodeExample>

        <CodeExample title="Descending Range">
{`for i in 3 downto 0 loop
    ...
end loop;`}
        </CodeExample>

        <div className="vhdl-loop-range-visual">

          <div className="vhdl-loop-range-row">

            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>

          </div>

          <div className="vhdl-loop-range-label">
            <strong>0 to 3</strong>
            <small>Ascending</small>
          </div>

          <div className="vhdl-loop-range-row reverse">

            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>

          </div>

          <div className="vhdl-loop-range-label">
            <strong>3 downto 0</strong>
            <small>Descending</small>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="while"
        title="4. WHILE Loop"
      >
        <p>
          A <code>while</code> loop repeats statements as long
          as its condition remains true.
        </p>

        <CodeExample title="WHILE Loop">
{`while COUNT < 4 loop

    COUNT := COUNT + 1;

end loop;`}
        </CodeExample>

        <div className="vhdl-while-visual">

          <div className="vhdl-while-start">
            START
          </div>

          <div className="vhdl-while-arrow">
            ↓
          </div>

          <div className="vhdl-while-condition">
            <strong>COUNT &lt; 4?</strong>

            <span>YES → repeat</span>
            <span>NO → exit</span>
          </div>

          <div className="vhdl-while-arrow">
            ↓
          </div>

          <div className="vhdl-while-action">
            COUNT = COUNT + 1
          </div>

        </div>

        <LearningNote
          type="warning"
          title="Synthesis Note"
        >
          In RTL design, <code>for</code> loops with known
          bounds are generally more common than unrestricted
          <code> while</code> loops because synthesis tools need
          to determine the hardware structure.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="nested"
        title="5. Nested Loops"
      >
        <p>
          A loop can contain another loop. This is called a
          nested loop.
        </p>

        <CodeExample title="Nested Loop">
{`for i in 0 to 3 loop

    for j in 0 to 3 loop

        MATRIX(i, j) <= '0';

    end loop;

end loop;`}
        </CodeExample>

        <div className="vhdl-nested-loop-visual">

          <div className="vhdl-nested-label">
            <strong>Outer Loop</strong>
            <span>i = 0 ... 3</span>
          </div>

          <div className="vhdl-nested-arrow">→</div>

          <div className="vhdl-nested-grid">

            <span>0,0</span>
            <span>0,1</span>
            <span>0,2</span>
            <span>0,3</span>

            <span>1,0</span>
            <span>1,1</span>
            <span>1,2</span>
            <span>1,3</span>

            <span>2,0</span>
            <span>2,1</span>
            <span>2,2</span>
            <span>2,3</span>

            <span>3,0</span>
            <span>3,1</span>
            <span>3,2</span>
            <span>3,3</span>

          </div>

          <div className="vhdl-nested-arrow">→</div>

          <div className="vhdl-nested-label">
            <strong>Matrix</strong>
            <span>16 elements</span>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="hardware"
        title="6. Loops in Hardware"
      >
        <p>
          A loop can describe repeated hardware structures.
        </p>

        <CodeExample title="Repeated XOR Logic">
{`for i in 0 to 3 loop

    Y(i) <= A(i) xor B(i);

end loop;`}
        </CodeExample>

        <div className="vhdl-loop-hardware">

          <div className="vhdl-loop-hardware-inputs">
            <span>A(0), B(0)</span>
            <span>A(1), B(1)</span>
            <span>A(2), B(2)</span>
            <span>A(3), B(3)</span>
          </div>

          <div className="vhdl-loop-hardware-blocks">

            <div>XOR 0</div>
            <div>XOR 1</div>
            <div>XOR 2</div>
            <div>XOR 3</div>

          </div>

          <div className="vhdl-loop-hardware-output">
            Y(3 downto 0)
          </div>

        </div>

        <LearningNote
          type="info"
          title="Important"
        >
          The loop does not mean the XOR gates operate one
          after another. Synthesis can create four parallel XOR
          operations.
        </LearningNote>
      </LessonSection>


      <LessonSection
        id="example"
        title="7. Complete Example"
      >
        <p>
          Let's create a simple 4-bit population counter.
          It counts how many bits in the input vector are
          equal to <code>'1'</code>.
        </p>

        <CodeExample title="4-bit Population Counter">
{`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity POPCOUNT is

    port (
        A     : in std_logic_vector(3 downto 0);
        COUNT : out unsigned(2 downto 0)
    );

end POPCOUNT;


architecture Behavioral of POPCOUNT is

begin

    process(A)

        variable TEMP : unsigned(2 downto 0);

    begin

        TEMP := "000";

        for i in 0 to 3 loop

            if A(i) = '1' then
                TEMP := TEMP + 1;
            end if;

        end loop;

        COUNT <= TEMP;

    end process;

end Behavioral;`}
        </CodeExample>

        <div className="vhdl-popcount-visual">

          <div className="vhdl-popcount-input">
            <small>INPUT</small>
            <strong>1011</strong>
          </div>

          <div className="vhdl-popcount-arrow">→</div>

          <div className="vhdl-popcount-bits">

            <span>1</span>
            <span>0</span>
            <span>1</span>
            <span>1</span>

          </div>

          <div className="vhdl-popcount-arrow">→</div>

          <div className="vhdl-popcount-result">
            <small>NUMBER OF 1s</small>
            <strong>3</strong>
          </div>

        </div>
      </LessonSection>


      <LessonSection
        id="tryit"
        title="8. Try It Yourself"
      >
        <p>
          Change the input vector in the testbench and observe
          how the <code>for</code> loop counts the number of
          set bits.
        </p>

        <TryIt
          title="VHDL 4-bit Population Counter"
          language="VHDL"
          initialCode={`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity POPCOUNT is
    port (
        A     : in std_logic_vector(3 downto 0);
        COUNT : out unsigned(2 downto 0)
    );
end POPCOUNT;

architecture Behavioral of POPCOUNT is
begin

    process(A)

        variable TEMP : unsigned(2 downto 0);

    begin

        TEMP := "000";

        for i in 0 to 3 loop

            if A(i) = '1' then
                TEMP := TEMP + 1;
            end if;

        end loop;

        COUNT <= TEMP;

    end process;

end Behavioral;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity POPCOUNT_TB is
end POPCOUNT_TB;


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

architecture Behavioral of POPCOUNT_TB is

    signal A     : std_logic_vector(3 downto 0) := "0000";
    signal COUNT : unsigned(2 downto 0);

begin

    UUT : entity work.POPCOUNT
        port map (
            A     => A,
            COUNT => COUNT
        );

    process
    begin

        A <= "0000";
        wait for 10 ns;

        report "A=0000 COUNT=" &
               integer'image(to_integer(COUNT));

        A <= "0001";
        wait for 10 ns;

        report "A=0001 COUNT=" &
               integer'image(to_integer(COUNT));

        A <= "1011";
        wait for 10 ns;

        report "A=1011 COUNT=" &
               integer'image(to_integer(COUNT));

        A <= "1111";
        wait for 10 ns;

        report "A=1111 COUNT=" &
               integer'image(to_integer(COUNT));

        report "VHDL for loop population count simulation completed!";

        wait;

    end process;

end Behavioral;`}
        />
      </LessonSection>


      <LessonSection
        id="takeaways"
        title="9. Key Takeaways"
      >
        <div className="vhdl-loop-takeaways">

          <div>
            <strong>FOR</strong>
            <span>
              Repeats statements over a defined range.
            </span>
          </div>

          <div>
            <strong>TO</strong>
            <span>
              Creates an ascending loop range.
            </span>
          </div>

          <div>
            <strong>DOWNTO</strong>
            <span>
              Creates a descending loop range.
            </span>
          </div>

          <div>
            <strong>WHILE</strong>
            <span>
              Repeats while a condition is true.
            </span>
          </div>

          <div>
            <strong>Nested</strong>
            <span>
              Places one loop inside another loop.
            </span>
          </div>

          <div>
            <strong>Hardware</strong>
            <span>
              Loops can describe repeated hardware structures.
            </span>
          </div>

        </div>

        <LearningNote
          type="success"
          title="Next Lesson"
        >
          Next, we'll learn about
           VHDL Functions and how reusable
          calculations can be defined and called from a design.
        </LearningNote>
      </LessonSection>

    </LessonPage>
  );
}

export default Loops;