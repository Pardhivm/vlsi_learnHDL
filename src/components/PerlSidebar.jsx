import { NavLink } from "react-router-dom";

function PerlSidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/perl" end>
        Introduction
      </NavLink>

      <NavLink to="/perl/what-is-perl">
        What is Perl?
      </NavLink>

      <NavLink to="/perl/basic-syntax">
        Basic Syntax
      </NavLink>

      <NavLink to="/perl/variables">
        Variables
      </NavLink>

      <NavLink to="/perl/data-types">
        Data Types
      </NavLink>

      <NavLink to="/perl/operators">
        Operators
      </NavLink>

      <NavLink to="/perl/strings">
        Strings
      </NavLink>

      <NavLink to="/perl/arrays">
        Arrays
      </NavLink>

      <NavLink to="/perl/hashes">
        Hashes
      </NavLink>

      <NavLink to="/perl/if-else">
        If / Else
      </NavLink>

      <NavLink to="/perl/loops">
        Loops
      </NavLink>

      <NavLink to="/perl/subroutines">
        Subroutines
      </NavLink>

      <NavLink to="/perl/file-handling">
        File Handling
      </NavLink>

      <NavLink to="/perl/regex">
        Regular Expressions
      </NavLink>

      <NavLink to="/perl/eda">
        Perl in EDA
      </NavLink>

      <NavLink to="/perl/automation">
        Design Automation
      </NavLink>

      <NavLink to="/perl/projects">
        Projects
      </NavLink>
    </aside>
  );
}

export default PerlSidebar;