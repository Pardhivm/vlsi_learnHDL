import { NavLink } from "react-router-dom";

function SystemVerilogSidebar() {
  return (
    <aside className="sidebar">

      <NavLink to="/systemverilog" end>
        Introduction
      </NavLink>

      <NavLink to="/systemverilog/what-is-systemverilog">
        What is SystemVerilog?
      </NavLink>

      <NavLink to="/systemverilog/basic-syntax">
        Basic Syntax
      </NavLink>

      <NavLink to="/systemverilog/data-types">
        Data Types
      </NavLink>

      <NavLink to="/systemverilog/logic">
        Logic
      </NavLink>

      <NavLink to="/systemverilog/always-blocks">
        Always Blocks
      </NavLink>

      <NavLink to="/systemverilog/interfaces">
        Interfaces
      </NavLink>

      <NavLink to="/systemverilog/classes">
        Classes
      </NavLink>

      <NavLink to="/systemverilog/assertions">
        Assertions
      </NavLink>

      <NavLink to="/systemverilog/verification">
        Verification
      </NavLink>

      <NavLink to="/systemverilog/projects">
        Projects
      </NavLink>

    </aside>
  );
}

export default SystemVerilogSidebar;