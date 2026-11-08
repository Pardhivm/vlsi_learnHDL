import { NavLink } from "react-router-dom";

function VHDLSidebar() {
  return (
    <aside className="sidebar">

      <NavLink to="/vhdl" end>
        Introduction
      </NavLink>

      <NavLink to="/vhdl/what-is-vhdl">
        What is VHDL?
      </NavLink>

      <NavLink to="/vhdl/basic-syntax">
        Basic Syntax
      </NavLink>

      <NavLink to="/vhdl/entity">
        Entity
      </NavLink>

      <NavLink to="/vhdl/architecture">
        Architecture
      </NavLink>

      <NavLink to="/vhdl/signals">
        Signals
      </NavLink>

      <NavLink to="/vhdl/data-types">
        Data Types
      </NavLink>

      <NavLink to="/vhdl/operators">
        Operators
      </NavLink>

      <NavLink to="/vhdl/concurrent-statements">
        Concurrent Statements
      </NavLink>

      <NavLink to="/vhdl/processes">
        Processes
      </NavLink>

      <NavLink to="/vhdl/if-else">
        If / Else
      </NavLink>

      <NavLink to="/vhdl/case">
        Case
      </NavLink>

      <NavLink to="/vhdl/loops">
        Loops
      </NavLink>

      <NavLink to="/vhdl/functions">
        Functions
      </NavLink>

      <NavLink to="/vhdl/procedures">
        Procedures
      </NavLink>

      <NavLink to="/vhdl/components">
        Components
      </NavLink>

      <NavLink to="/vhdl/fsm">
        FSM
      </NavLink>

      <NavLink to="/vhdl/testbench">
        Testbench
      </NavLink>

      <NavLink to="/vhdl/projects">
        Projects
      </NavLink>

    </aside>
  );
}

export default VHDLSidebar;