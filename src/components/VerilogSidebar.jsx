import { NavLink } from "react-router-dom";

function VerilogSidebar() {
  return (
    <aside className="sidebar">

    

      <NavLink
  to="/verilog"
  end
>
  Introduction
</NavLink>

      <NavLink to="/verilog/what-is-verilog">
        What is Verilog?
      </NavLink>

      <NavLink to="/verilog/basic-syntax">
        Basic Syntax
      </NavLink>

      <NavLink to="/verilog/modules">
        Modules
      </NavLink>

      <NavLink to="/verilog/ports">
        Ports
      </NavLink>

      <NavLink to="/verilog/data-types">
        Data Types
      </NavLink>

      <NavLink to="/verilog/operators">
        Operators
      </NavLink>

      <NavLink to="/verilog/assignments">
        Assignments
      </NavLink>

      <NavLink to="/verilog/always-blocks">
        Always Blocks
      </NavLink>

      <NavLink to="/verilog/if-else">
        If / Else
      </NavLink>

      <NavLink to="/verilog/case">
        Case
      </NavLink>

      <NavLink to="/verilog/loops">
        Loops
      </NavLink>

      <NavLink to="/verilog/functions">
        Functions
      </NavLink>

      <NavLink to="/verilog/tasks">
        Tasks
      </NavLink>

      <NavLink to="/verilog/fsm">
        FSM
      </NavLink>

      <NavLink to="/verilog/testbench">
        Testbench
      </NavLink>

      <NavLink to="/verilog/projects">
        Projects
      </NavLink>

    </aside>
  );
}

export default VerilogSidebar;