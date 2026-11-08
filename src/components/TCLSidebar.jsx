import { NavLink } from "react-router-dom";

function TCLSidebar() {
  return (
    <aside className="sidebar">

      <NavLink to="/tcl" end>
        Introduction
      </NavLink>

      <NavLink to="/tcl/what-is-tcl">
        What is TCL?
      </NavLink>

      <NavLink to="/tcl/basic-syntax">
        Basic Syntax
      </NavLink>

      <NavLink to="/tcl/variables">
        Variables
      </NavLink>

      <NavLink to="/tcl/commands">
        Commands
      </NavLink>

      <NavLink to="/tcl/strings">
        Strings
      </NavLink>

      <NavLink to="/tcl/lists">
        Lists
      </NavLink>

      <NavLink to="/tcl/arrays">
        Arrays
      </NavLink>

      <NavLink to="/tcl/if-else">
        If / Else
      </NavLink>

      <NavLink to="/tcl/loops">
        Loops
      </NavLink>

      <NavLink to="/tcl/procedures">
        Procedures
      </NavLink>

      <NavLink to="/tcl/file-handling">
        File Handling
      </NavLink>

      <NavLink to="/tcl/eda">
        TCL in EDA
      </NavLink>

      <NavLink to="/tcl/vivado">
        Vivado TCL
      </NavLink>

      <NavLink to="/tcl/automation">
        Design Automation
      </NavLink>

      <NavLink to="/tcl/projects">
        Projects
      </NavLink>

    </aside>
  );
}

export default TCLSidebar;