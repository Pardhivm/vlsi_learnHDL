import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";

// Verilog
import Verilog from "./pages/Verilog/Verilog";
import WhatIsVerilog from "./pages/Verilog/WhatIsVerilog";
import VerilogBasicSyntax from "./pages/Verilog/BasicSyntax";
import Modules from "./pages/Verilog/Modules";
import Ports from "./pages/Verilog/Ports";
import VerilogDataTypes from "./pages/Verilog/DataTypes";
import Operators from "./pages/Verilog/Operators";
import Assignments from "./pages/Verilog/Assignments";
import AlwaysBlocks from "./pages/Verilog/AlwaysBlocks";
import IfElse from "./pages/Verilog/IfElse";
import Case from "./pages/Verilog/Case";
import Loops from "./pages/Verilog/Loops";
import Functions from "./pages/Verilog/Functions";
import Tasks from "./pages/Verilog/Tasks";
import FSM from "./pages/Verilog/FSM";
import Testbench from "./pages/Verilog/Testbench";
import VerilogProjects from "./pages/Verilog/Projects";

// SystemVerilog
import SystemVerilog from "./pages/SystemVerilog/SystemVerilog";
import WhatIsSystemVerilog from "./pages/SystemVerilog/WhatIsSystemVerilog";
import SystemVerilogBasicSyntax from "./pages/SystemVerilog/BasicSyntax";
import SystemVerilogDataTypes from "./pages/SystemVerilog/DataTypes";
import SystemVerilogLogic from "./pages/SystemVerilog/Logic";
import SystemVerilogAlwaysBlocks from "./pages/SystemVerilog/AlwaysBlocks";
import SystemVerilogInterfaces from "./pages/SystemVerilog/Interfaces";
import SystemVerilogClasses from "./pages/SystemVerilog/Classes";
import SystemVerilogAssertions from "./pages/SystemVerilog/Assertions";
import SystemVerilogVerification from "./pages/SystemVerilog/Verification";
import SystemVerilogProjects from "./pages/SystemVerilog/Projects";

// VHDL
import VHDL from "./pages/VHDL/VHDL";
import WhatIsVHDL from "./pages/VHDL/WhatIsVHDL";
import VHDLBasicSyntax from "./pages/VHDL/BasicSyntax";
import Entity from "./pages/VHDL/Entity";
import Architecture from "./pages/VHDL/Architecture";
import Signals from "./pages/VHDL/Signals";
import VHDLDataTypes from "./pages/VHDL/DataTypes";
import VHDLOperators from "./pages/VHDL/Operators";
import ConcurrentStatements from "./pages/VHDL/ConcurrentStatements";
import Processes from "./pages/VHDL/Processes";
import IfElseVHDL from "./pages/VHDL/IfElse";
import CaseVHDL from "./pages/VHDL/Case";
import LoopsVHDL from "./pages/VHDL/Loops";
import FunctionsVHDL from "./pages/VHDL/Functions";
import ProceduresVHDL from "./pages/VHDL/Procedures";
import TestbenchVHDL from "./pages/VHDL/Testbench";
import VHDLProjects from "./pages/VHDL/Projects";
import Components from "./pages/VHDL/Components";
import VHDLFSM from "./pages/VHDL/FSM";

// TCL
import TCL from "./pages/TCL/TCL";
import WhatIsTCL from "./pages/TCL/WhatIsTCL";
import BasicSyntaxTCL from "./pages/TCL/BasicSyntax";
import Variables from "./pages/TCL/Variables";
import Commands from "./pages/TCL/Commands";
import Strings from "./pages/TCL/Strings";
import Lists from "./pages/TCL/Lists";
import Arrays from "./pages/TCL/Arrays";
import IfElseTCL from "./pages/TCL/IfElse";
import LoopsTCL from "./pages/TCL/Loops";
import ProceduresTCL from "./pages/TCL/Procedures";
import FileHandling from "./pages/TCL/FileHandling";
import EDA from "./pages/TCL/EDA";
import VivadoTCL from "./pages/TCL/VivadoTCL";
import DesignAutomation from "./pages/TCL/DesignAutomation";
import ProjectsTCL from "./pages/TCL/Projects";
import Automation from "./pages/TCL/DesignAutomation";


//Perl
import Perl from "./pages/Perl/Perl";
import WhatIsPerl from "./pages/Perl/WhatIsPerl";
import PerlBasicSyntax from "./pages/Perl/BasicSyntax";
import PerlVariables from "./pages/Perl/Variables";
import PerlDataTypes from "./pages/Perl/DataTypes";
import PerlOperators from "./pages/Perl/Operators";
import PerlStrings from "./pages/Perl/Strings";
import PerlArrays from "./pages/Perl/Arrays";
import PerlHashes from "./pages/Perl/Hashes";
import PerlIfElse from "./pages/Perl/IfElse";
import PerlLoops from "./pages/Perl/Loops";
import PerlSubroutines from "./pages/Perl/Subroutines";
import PerlFileHandling from "./pages/Perl/FileHandling";
import PerlRegex from "./pages/Perl/Regex";
import PerlEDA from "./pages/Perl/EDA";
import PerlAutomation from "./pages/Perl/Automation";
import PerlProjects from "./pages/Perl/Projects";


import EDAPlayground from "./pages/EDAPlayground/EDAPlayground";


import "./App.css";
import MyProjects from "./pages/MyProjects/MyProjects";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =========================
            HOME
           ========================= */}

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Courses />
            </>
          }
        />


        {/* =========================
            VERILOG
           ========================= */}

        <Route
          path="/verilog"
          element={<Verilog />}
        />

        <Route
          path="/verilog/what-is-verilog"
          element={<WhatIsVerilog />}
        />

        <Route
          path="/verilog/basic-syntax"
          element={<VerilogBasicSyntax />}
        />

        <Route
          path="/verilog/modules"
          element={<Modules />}
        />

        <Route
          path="/verilog/ports"
          element={<Ports />}
        />

        <Route
          path="/verilog/data-types"
          element={<VerilogDataTypes />}
        />

        <Route
          path="/verilog/operators"
          element={<Operators />}
        />

        <Route
          path="/verilog/assignments"
          element={<Assignments />}
        />

        <Route
          path="/verilog/always-blocks"
          element={<AlwaysBlocks />}
        />

        <Route
          path="/verilog/if-else"
          element={<IfElse />}
        />

        <Route
          path="/verilog/case"
          element={<Case />}
        />

        <Route
          path="/verilog/loops"
          element={<Loops />}
        />

        <Route
          path="/verilog/functions"
          element={<Functions />}
        />

        <Route
          path="/verilog/tasks"
          element={<Tasks />}
        />

        <Route
          path="/verilog/fsm"
          element={<FSM />}
        />

        <Route
          path="/verilog/testbench"
          element={<Testbench />}
        />

        <Route
          path="/verilog/projects"
          element={<VerilogProjects />}
        />


        {/* =========================
            SYSTEMVERILOG
           ========================= */}

        <Route
          path="/systemverilog"
          element={<SystemVerilog />}
        />

        <Route
          path="/systemverilog/what-is-systemverilog"
          element={<WhatIsSystemVerilog />}
        />

        <Route
          path="/systemverilog/basic-syntax"
          element={<SystemVerilogBasicSyntax />}
        />

        <Route
          path="/systemverilog/data-types"
          element={<SystemVerilogDataTypes />}
        />

        <Route
          path="/systemverilog/logic"
          element={<SystemVerilogLogic />}
        />

        <Route
          path="/systemverilog/always-blocks"
          element={<SystemVerilogAlwaysBlocks />}
        />

        <Route
          path="/systemverilog/interfaces"
          element={<SystemVerilogInterfaces />}
        />

        <Route
          path="/systemverilog/classes"
          element={<SystemVerilogClasses />}
        />

        <Route
          path="/systemverilog/assertions"
          element={<SystemVerilogAssertions />}
        />

        <Route
          path="/systemverilog/verification"
          element={<SystemVerilogVerification />}
        />

        <Route
          path="/systemverilog/projects"
          element={<SystemVerilogProjects />}
        />


        {/* =========================
            VHDL
           ========================= */}

        <Route
          path="/vhdl"
          element={<VHDL />}
        />

        <Route
          path="/vhdl/what-is-vhdl"
          element={<WhatIsVHDL />}
        />

        <Route
          path="/vhdl/basic-syntax"
          element={<VHDLBasicSyntax />}
        />

        <Route
          path="/vhdl/entity"
          element={<Entity />}
        />

        <Route
          path="/vhdl/architecture"
          element={<Architecture />}
        />

        <Route
          path="/vhdl/signals"
          element={<Signals />}
        />

        <Route
          path="/vhdl/fsm"
          element={<VHDLFSM />}
        />

        <Route
          path="/vhdl/data-types"
          element={<VHDLDataTypes />}
        />

        <Route
          path="/vhdl/operators"
          element={<VHDLOperators />}
        />

        <Route
          path="/vhdl/concurrent-statements"
          element={<ConcurrentStatements />}
        />

        <Route
          path="/vhdl/processes"
          element={<Processes />}
        />

        <Route
          path="/vhdl/if-else"
          element={<IfElseVHDL />}
        />

        <Route
          path="/vhdl/case"
          element={<CaseVHDL />}
        />

        <Route
          path="/vhdl/loops"
          element={<LoopsVHDL />}
        />

        <Route
          path="/vhdl/functions"
          element={<FunctionsVHDL />}
        />

        <Route
          path="/vhdl/procedures"
          element={<ProceduresVHDL />}
        />

        <Route
          path="/vhdl/testbench"
          element={<TestbenchVHDL />}
        />

        <Route
          path="/vhdl/components"
          element={<Components />}
        />

        <Route
          path="/vhdl/projects"
          element={<VHDLProjects />}
        />


        {/* =========================
            TCL
           ========================= */}

        <Route
          path="/tcl"
          element={<TCL />}
        />

        <Route
          path="/tcl/what-is-tcl"
          element={<WhatIsTCL />}
        />
        
        <Route
          path="/tcl/basic-syntax"
          element={<BasicSyntaxTCL/>}
          />

          <Route
          path="/tcl/variables"
          element={<Variables/>}
          />

          <Route
          path="/tcl/commands"
          element={<Commands/>}
          />

          <Route
          path="/tcl/strings"
          element={<Strings/>}
          />

          <Route
          path="/tcl/lists"
          element={<Lists/>}
          />

          <Route
          path="/tcl/arrays"
          element={<Arrays/>}
          />
          

          <Route
          path="/tcl/if-else"
          element={<IfElseTCL/>}
          />

          <Route
          path="/tcl/loops"
          element={<LoopsTCL/>}
          />

          <Route
          path="/tcl/procedures"
          element={<ProceduresTCL/>}
          />

          <Route
          path="/tcl/file-handling"
          element={<FileHandling/>}
          />

          <Route
          path="/tcl/eda"
          element={<EDA/>}
          />

          <Route
          path="/tcl/vivado"
          element={<VivadoTCL />}
          />

          <Route
          path="/tcl/automation"
          element={<DesignAutomation />}
          />

          <Route
          path="/tcl/projects"
          element={<ProjectsTCL />}
          />

          <Route
          path="/tcl/design-automation"
          element={<Automation />}
          />

          {/* =========================
            Perl
           ========================= */}

           <Route
          path="/perl"
          element={<Perl />}
          />

          <Route
          path="/perl/what-is-perl"
          element={<WhatIsPerl />}
          />

          <Route
          path="/perl/basic-syntax"
          element={<PerlBasicSyntax />}
          />

          <Route
          path="/perl/variables"
          element={<PerlVariables />}
          />

          <Route
          path="/perl/data-types"
          element={<PerlDataTypes />}
          />

          <Route
          path="/perl/operators"
          element={<PerlOperators />}
          />

          <Route
          path="/perl/strings"
          element={<PerlStrings />}
          />

          <Route
          path="/perl/arrays"
          element={<PerlArrays />}
          />

          <Route
          path="/perl/hashes"
          element={<PerlHashes />}
          />

          <Route
          path="/perl/if-else"
          element={<PerlIfElse />}
          />

          <Route
          path="/perl/loops"
          element={<PerlLoops />}
          />

          <Route
          path="/perl/subroutines"
          element={<PerlSubroutines />}
          />

          <Route
          path="/perl/file-handling"
          element={<PerlFileHandling />}
          />

          <Route
          path="/perl/regex"
          element={<PerlRegex />}
          />

          <Route
          path="/perl/eda"
          element={<PerlEDA />}
          />

          <Route
          path="/perl/automation"
          element={<PerlAutomation />}
          />

          <Route
          path="/perl/projects"
          element={<PerlProjects />}
          />

          {/* =========================
            EDAPlayground
           ========================= */}
          
          <Route
          path="/eda-playground"
          element={<EDAPlayground />}
          />

          <Route path="/my-projects" element={<MyProjects />} />
          
      </Routes>

    </BrowserRouter>
  );
}

export default App;