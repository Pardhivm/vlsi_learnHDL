import glob
import json
import os
import re
import shutil
import subprocess
import sys
import sysconfig
import tempfile

from vcd_parser import parse_vcd, normalize_times, waveform_to_text
from vhdl_helpers import (
    Unsupported,
    add_libraries,
    build_auto_testbench,
    convert_report_lines,
    pick_top
)


MAX_OUTPUT_CHARS = 20000
MAX_VCD_BYTES = 2_000_000


# =========================================
# HELPERS
# =========================================

def truncate(text, limit=MAX_OUTPUT_CHARS):
    """Stop runaway programs from sending megabytes of output."""

    if text and len(text) > limit:
        return text[:limit] + "\n\n... output truncated ..."

    return text


def find_executable(candidates):
    """Return the first program from the list that exists on PATH."""

    for name in candidates:
        path = shutil.which(name)

        if path:
            return path

    return None


def find_yosys():
    """
    Locate Yosys.

    1. YoWASP  (python -m pip install yowasp-yosys)
       Yosys packaged as a Python library: no DLLs, no PATH, works on Windows.
    2. A normal Yosys install (for example the OSS CAD Suite) as a fallback.
    """

    path = find_executable(["yowasp-yosys"])

    if path:
        return path

    # pip puts the command in the Python "Scripts" folder, which is not
    # always on PATH, so look there directly.
    folders = []

    for scheme in (None, f"{os.name}_user"):
        try:
            folders.append(
                sysconfig.get_path("scripts", scheme) if scheme
                else sysconfig.get_path("scripts")
            )
        except Exception:
            pass

    folders.append(os.path.dirname(sys.executable))
    folders.append(os.path.join(os.path.dirname(sys.executable), "Scripts"))

    for folder in folders:
        for name in ("yowasp-yosys.exe", "yowasp-yosys"):
            candidate = os.path.join(folder or "", name)

            if os.path.isfile(candidate):
                return candidate

    return find_executable(["yosys"])


def write_file(path, content):
    # newline="\n" avoids stray \r characters on Windows
    with open(path, "w", encoding="utf-8", newline="\n") as file:
        file.write(content)



# =========================================
# STUDENT FILES (any number, any names)
# =========================================

ROLE_ORDER = {"source": 0, "design": 1, "testbench": 2}
RESERVED_NAMES = {"simulation", "wave", "schematic", "_wave_dump", "auto_tb", "synth"}


def prepare_files(files, directory, extension):
    """
    Write every file the student created into the temp folder, using
    the names they chose (so error messages say  and_gate.v:3: ...).

    Names are sanitised (letters, digits, _ and - only) so a student
    can never write outside the temp folder.

    Returns a list of dicts: path, name, role, code, in compile order:
    helper files first, then the design, then the testbench.
    """

    prepared = []
    used = set(RESERVED_NAMES)

    for index, item in enumerate(files or []):
        role = item.get("role") if item.get("role") in ROLE_ORDER else "source"

        raw_name = str(item.get("name", ""))
        name = re.sub(r"\.[A-Za-z]+$", "", raw_name)

        if not re.fullmatch(r"[A-Za-z0-9_-]{1,40}", name):
            name = role if role != "source" else f"file_{index + 1}"

        base = name
        counter = 1

        while name.lower() in used:
            counter += 1
            name = f"{base}_{counter}"

        used.add(name.lower())

        path = os.path.join(directory, name + extension)
        code = str(item.get("code", ""))

        write_file(path, code)

        prepared.append({
            "path": path,
            "name": name + extension,
            "role": role,
            "code": code,
            "order": index
        })

    prepared.sort(key=lambda item: (ROLE_ORDER[item["role"]], item["order"]))

    return prepared


def non_blank(prepared):
    return [item for item in prepared if item["code"].strip()]


def first_with_role(prepared, role):
    return next((item for item in prepared if item["role"] == role), None)


# =========================================
# WAVEFORM HELPERS
# =========================================

def strip_verilog_comments(code):
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    return re.sub(r"//[^\n]*", "", code)


def find_top_module(prepared):
    """
    Name of the top Verilog module, used to dump a waveform.

    The testbench module if there is one, otherwise the first module
    that no other module instantiates (e.g. a 4-bit adder built from
    and_gate modules gives  adder4, not  and_gate).
    """

    testbench = first_with_role(prepared, "testbench")

    if testbench:
        match = re.search(r"\bmodule\s+(\w+)", strip_verilog_comments(testbench["code"]))

        if match:
            return match.group(1)

    cleaned = [strip_verilog_comments(item["code"]) for item in prepared]
    all_code = "\n".join(cleaned)

    names = [
        match.group(1)
        for code in cleaned
        for match in re.finditer(r"\bmodule\s+(\w+)", code)
    ]

    for name in names:
        used = re.search(
            rf"\b{re.escape(name)}\s*(?:#\s*\([^;]*?\))?\s+\w+\s*\(",
            all_code
        )

        if not used:
            return name

    return names[0] if names else None


def wave_dump_source(top_module):
    """
    Tiny extra module that turns on waveform dumping automatically,
    so students don't need $dumpfile / $dumpvars in their testbench.
    """

    scope = f"0, {top_module}" if top_module else "0"

    return (
        "module __wave_dump;\n"
        "  initial begin\n"
        '    $dumpfile("wave.vcd");\n'
        f"    $dumpvars({scope});\n"
        "  end\n"
        "endmodule\n"
    )


def read_waveform(directory, only_top=False):
    """
    Find a .vcd file in the folder and return it as parsed JSON data.

    only_top keeps just the signals of the top scope (used with the
    automatic testbench, so the inside of the design is not repeated).
    """

    try:
        vcd_files = glob.glob(os.path.join(directory, "*.vcd"))

        if not vcd_files:
            return None

        with open(vcd_files[0], "r", encoding="utf-8", errors="ignore") as file:
            text = file.read(MAX_VCD_BYTES)

        waveform = parse_vcd(text)

        if only_top and waveform["signals"]:
            shallowest = min(signal["name"].count(".") for signal in waveform["signals"])
            waveform["signals"] = [
                signal for signal in waveform["signals"]
                if signal["name"].count(".") == shallowest
            ]

        waveform = normalize_times(waveform)

        has_data = any(signal["changes"] for signal in waveform["signals"])

        return waveform if has_data else None

    except Exception as error:
        print(f"Could not read waveform: {error}")
        return None


# =========================================
# RUN COMMAND
# =========================================

def run_command(command, cwd=None, timeout=15, limit=MAX_OUTPUT_CHARS):
    """
    Run an external compiler/simulator command
    and return its output.
    """

    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=timeout,
            stdin=subprocess.DEVNULL   # scripts that wait for input won't hang
        )

        return {
            "success": result.returncode == 0,
            "return_code": result.returncode,
            "stdout": truncate(result.stdout, limit),
            "stderr": truncate(result.stderr, limit)
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "return_code": -1,
            "stdout": "",
            "stderr": (
                "Timed out. Does your testbench call $finish (Verilog), "
                "end with 'wait;' (VHDL), or contain an infinite loop?"
            )
        }

    except FileNotFoundError:
        return {
            "success": False,
            "return_code": -1,
            "stdout": "",
            "stderr": (
                f"Compiler or simulator not found: {command[0]}\n"
                f"Install it and add its 'bin' folder to your PATH, "
                f"then restart the backend."
            )
        }

    except Exception as error:
        return {
            "success": False,
            "return_code": -1,
            "stdout": "",
            "stderr": str(error)
        }


# =========================================
# DEBUG FILE CONTENT
# =========================================

def print_debug_files(*paths):
    """Print the exact contents of the temporary files to the backend terminal."""

    print()
    print("=" * 60)
    print("EDA PLAYGROUND DEBUG")
    print("=" * 60)

    for path in paths:
        print()
        print(f"FILE: {path}")
        print("-" * 60)

        try:
            with open(path, "r", encoding="utf-8") as file:
                print(file.read())
        except Exception as error:
            print(f"Could not read file: {error}")

    print()
    print("=" * 60)
    print()


# =========================================
# VERILOG / SYSTEMVERILOG
# =========================================

def no_code_error():
    return {
        "success": False,
        "stage": "validation",
        "stdout": "",
        "stderr": "There is no code to run. Write some code first."
    }


def simulate_verilog(files, systemverilog=False, compile_only=False):
    """
    Compile and simulate Verilog or SystemVerilog using Icarus Verilog
    (iverilog + vvp). Every file is compiled together, so one file can
    use modules defined in another.
    """

    temp_dir = tempfile.mkdtemp(prefix="vlsi_playground_")

    try:
        extension = ".sv" if systemverilog else ".v"

        prepared = non_blank(prepare_files(files, temp_dir, extension))

        if not prepared:
            return no_code_error()

        source_paths = [item["path"] for item in prepared]
        output_file = os.path.join(temp_dir, "simulation.out")

        # ---------------------------------
        # AUTOMATIC WAVEFORM DUMP
        # (skipped if the student wrote their own $dumpfile)
        # ---------------------------------

        all_code = "\n".join(item["code"] for item in prepared)

        if not compile_only and "$dumpfile" not in all_code:
            dump_file = os.path.join(temp_dir, "_wave_dump.v")

            write_file(dump_file, wave_dump_source(find_top_module(prepared)))
            source_paths.append(dump_file)

        print_debug_files(*source_paths)

        # ---------------------------------
        # COMPILE
        # ---------------------------------

        compile_command = ["iverilog"]

        if systemverilog:
            compile_command.append("-g2012")

        compile_command.extend(["-o", output_file])
        compile_command.extend(source_paths)

        print("COMPILE COMMAND:")
        print(" ".join(compile_command))
        print()

        compile_result = run_command(compile_command, cwd=temp_dir)

        if not compile_result["success"]:
            print("IVERILOG COMPILE FAILED")
            print(compile_result["stderr"])

            return {
                "success": False,
                "stage": "compile",
                "stdout": compile_result["stdout"],
                "stderr": compile_result["stderr"]
            }

        print("IVERILOG COMPILE SUCCESS")
        print()

        if compile_only:
            return {
                "success": True,
                "stage": "compile",
                "stdout": "No errors found.",
                "stderr": compile_result["stderr"]
            }

        # ---------------------------------
        # RUN (iverilog output must be run through vvp)
        # ---------------------------------

        run_result = run_command(
            ["vvp", output_file],
            cwd=temp_dir,
            timeout=10
        )

        print("SIMULATION SUCCESS" if run_result["success"] else "SIMULATION FAILED")

        if not run_result["success"]:
            print(run_result["stderr"])

        waveform = read_waveform(temp_dir)
        stdout_text = run_result["stdout"]

        # No $display / $monitor in the code? Show the signal values anyway.
        printed = [
            line for line in stdout_text.splitlines()
            if line.strip()
            and "$finish called" not in line
            and not line.startswith("VCD info:")
        ]

        if run_result["success"] and not printed and waveform:
            stdout_text = (
                "Signal values (shown automatically, no $display needed):\n\n"
                + waveform_to_text(waveform)
                + ("\n\n" + stdout_text.strip() if stdout_text.strip() else "")
            )

        return {
            "success": run_result["success"],
            "stage": "simulation",
            "stdout": stdout_text,
            "stderr": run_result["stderr"],
            "waveform": waveform
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


# =========================================
# VHDL
# =========================================

def first_entity(code):
    match = re.search(r"\bentity\s+(\w+)\s+is\b", code, re.IGNORECASE)
    return match.group(1) if match else None


GHDL_STD = "--std=08"

# -fsynopsys lets old tutorials work (std_logic_unsigned, std_logic_arith)
# and relaxes a few strict rules that only confuse beginners.
GHDL_RELAXED = "-fsynopsys"

TIME_LIMIT = "1us"

NO_ENTITY_HELP = (
    "No VHDL entity was found.\n\n"
    "Every VHDL design has two parts:\n"
    "  entity       the box: its name and its inputs / outputs\n"
    "  architecture what happens inside the box\n\n"
    "Click the Template button above the editor to insert a small example."
)


def run_ghdl(arguments, cwd, timeout=15, relaxed=True, limit=MAX_OUTPUT_CHARS):
    """
    Run  ghdl <command> --std=08 [-fsynopsys] <rest>.

    If this GHDL does not know -fsynopsys, try again without it.
    """

    command, rest = arguments[0], list(arguments[1:])
    flags = [GHDL_STD] + ([GHDL_RELAXED] if relaxed else [])

    result = run_command(["ghdl", command] + flags + rest, cwd=cwd, timeout=timeout, limit=limit)

    if (
        relaxed
        and not result["success"]
        and re.search(r"unknown option|unrecognized option|invalid option", result["stderr"], re.I)
    ):
        result = run_command(["ghdl", command, GHDL_STD] + rest, cwd=cwd, timeout=timeout, limit=limit)

    return result


def with_notes(text, notes):
    if not notes:
        return text

    block = "ℹ Notes:\n" + "\n".join(f"  • {note}" for note in notes)

    return (text.rstrip() + "\n\n" if text.strip() else "") + block


def simulate_vhdl(files, compile_only=False):
    """
    Compile and simulate VHDL using GHDL, made easy for beginners:

      * the IEEE library lines are added for you when they are missing
      * no testbench? One is generated automatically (clock, reset, inputs)
      * no `report` statements? The signal values are shown as a table
      * all files are imported together, so one file can use another

    The top entity is the one in the testbench file, or the entity that
    no other entity uses.
    """

    temp_dir = tempfile.mkdtemp(prefix="vlsi_vhdl_")

    try:
        prepared = non_blank(prepare_files(files, temp_dir, ".vhd"))

        if not prepared:
            return no_code_error()

        notes = []

        # ---------------------------------
        # 1. library lines
        # ---------------------------------

        added_to = []

        for item in prepared:
            new_code, added = add_libraries(item["code"])

            if added:
                write_file(item["path"], new_code)
                item["code"] = new_code
                added_to.append(item["name"])

        if added_to:
            notes.append(
                "The IEEE libraries (std_logic_1164, numeric_std) were added "
                f"automatically to {', '.join(added_to)}. You do not have to type them."
            )

        # ---------------------------------
        # 2. which entity is the design, which one is the top
        # ---------------------------------

        testbench = first_with_role(prepared, "testbench")
        sources = [item for item in prepared if item["role"] != "testbench"]

        design_entity, _ = pick_top(sources)
        testbench_entity = first_entity(testbench["code"]) if testbench else None

        if not design_entity and not testbench_entity:
            return {
                "success": False,
                "stage": "validation",
                "stdout": "",
                "stderr": NO_ENTITY_HELP
            }

        paths = [item["path"] for item in prepared]
        design_name = design_entity["name"] if design_entity else None

        print_debug_files(*paths)

        # ---------------------------------
        # 3. compile the student's files (errors point at their own code)
        # ---------------------------------

        imported = run_ghdl(["-i"] + paths, temp_dir)

        if not imported["success"]:
            print("GHDL IMPORT FAILED")

            return {
                "success": False,
                "stage": "compile",
                "stdout": imported["stdout"],
                "stderr": imported["stderr"]
            }

        first_top = testbench_entity or design_name

        built = run_ghdl(["-m", first_top], temp_dir)

        if not built["success"]:
            print("GHDL BUILD FAILED")

            return {
                "success": False,
                "stage": "compile",
                "stdout": built["stdout"],
                "stderr": built["stderr"]
            }

        if compile_only:
            return {
                "success": True,
                "stage": "compile",
                "stdout": with_notes("No errors found.", notes),
                "stderr": ""
            }

        # ---------------------------------
        # 4. no testbench: write one automatically
        # ---------------------------------

        top = first_top
        stop_time = TIME_LIMIT
        automatic = None

        if not testbench_entity:
            try:
                automatic = build_auto_testbench(design_entity)
            except Unsupported as reason:
                if "no ports" not in str(reason):
                    notes.append(
                        f"An automatic test could not be made ({reason}). "
                        "Click Create Testbench to write your own."
                    )
            else:
                auto_path = os.path.join(temp_dir, "auto_tb.vhd")
                write_file(auto_path, automatic["text"])

                tb_imported = run_ghdl(["-i", auto_path], temp_dir)
                tb_built = (
                    run_ghdl(["-m", automatic["top"]], temp_dir)
                    if tb_imported["success"] else tb_imported
                )

                if tb_built["success"]:
                    top = automatic["top"]
                    stop_time = f"{automatic['stop_ns']}ns"

                    notes.append(
                        "No testbench found, so a test was generated automatically:\n"
                        + "\n".join(f"      - {line}" for line in automatic["notes"])
                    )
                else:
                    automatic = None
                    notes.append(
                        "An automatic test could not be built for this design. "
                        "Click Create Testbench to write your own."
                    )

        # ---------------------------------
        # 5. run
        # ---------------------------------

        simulation = run_ghdl(
            ["-r", top, f"--stop-time={stop_time}", "--vcd=wave.vcd"],
            temp_dir,
            relaxed=False
        )

        print("GHDL SIMULATION SUCCESS" if simulation["success"] else "GHDL SIMULATION FAILED")

        # report / assert messages are shown as normal output
        printed, other_errors, stopped = convert_report_lines(simulation["stderr"])

        if not simulation["success"]:
            print(simulation["stderr"])

        waveform = read_waveform(temp_dir, only_top=automatic is not None)

        stdout_text = simulation["stdout"]

        if printed:
            stdout_text = (stdout_text.strip() + "\n" if stdout_text.strip() else "") + "\n".join(printed)
        elif simulation["success"] and not stdout_text.strip() and waveform:
            stdout_text = (
                "Signal values (shown automatically, no 'report' needed):\n\n"
                + waveform_to_text(waveform)
            )

        if stopped and not automatic:
            notes.append(f"The simulation was stopped at the time limit ({stop_time}).")

        return {
            "success": simulation["success"],
            "stage": "simulation",
            "stdout": with_notes(stdout_text, notes),
            "stderr": "\n".join(other_errors),
            "waveform": waveform
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


# =========================================
# TCL / PERL SCRIPTS
# =========================================

SCRIPT_RUNNERS = {
    "TCL": {
        "extension": ".tcl",
        "candidates": ["tclsh", "tclsh90", "tclsh86", "tclsh8.6"],
        "install_hint": (
            "Install Tcl (Windows: ActiveTcl/Magicsplat Tcl, "
            "Linux: sudo apt install tcl) and add tclsh to PATH."
        )
    },
    "Perl": {
        "extension": ".pl",
        "candidates": ["perl"],
        "install_hint": (
            "Install Perl (Windows: Strawberry Perl, "
            "Linux: sudo apt install perl) and add it to PATH."
        )
    }
}


def simulate_script(language, files, compile_only=False):
    """
    Run a TCL or Perl script and return its output.

    All files are written side by side, so the main script can use the
    others with `source name.tcl` or `require "./name.pl";`.

    WARNING: these scripts can run system commands
    (exec / system / backticks). Fine on your own computer,
    but run this inside Docker before putting it on the internet.
    """

    runner = SCRIPT_RUNNERS.get(language)

    if runner is None:
        return {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": f"{language} is not a script language."
        }

    executable = find_executable(runner["candidates"])

    if executable is None:
        return {
            "success": False,
            "stage": "execution",
            "stdout": "",
            "stderr": (
                f"Could not find the {language} interpreter.\n"
                f"{runner['install_hint']}"
            )
        }

    temp_dir = tempfile.mkdtemp(prefix="vlsi_script_")

    try:
        prepared = non_blank(prepare_files(files, temp_dir, runner["extension"]))

        if not prepared:
            return no_code_error()

        # the main script is the "design" file (first one with code)
        main = first_with_role(prepared, "design") or prepared[0]

        print_debug_files(*[item["path"] for item in prepared])

        if compile_only:
            if language != "Perl":
                return {
                    "success": False,
                    "stage": "validation",
                    "stdout": "",
                    "stderr": "TCL is interpreted, so it has no separate compile step. Use Run."
                }

            check = run_command(
                [executable, "-c", main["path"]],
                cwd=temp_dir,
                timeout=5
            )

            # perl -c prints "... syntax OK" on stderr
            lines = (check["stderr"] or "").splitlines()
            other = [line for line in lines if "syntax OK" not in line]

            return {
                "success": check["success"],
                "stage": "compile",
                "stdout": "Syntax OK" if check["success"] else "",
                "stderr": "\n".join(other)
            }

        result = run_command(
            [executable, main["path"]],
            cwd=temp_dir,
            timeout=5
        )

        print(f"{language} SUCCESS" if result["success"] else f"{language} FAILED")

        return {
            "success": result["success"],
            "stage": "execution",
            "stdout": result["stdout"],
            "stderr": result["stderr"]
        }

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


# =========================================
# RTL SCHEMATIC  (Yosys -> netlist data, drawn by the browser)
# =========================================

MAX_NETLIST_BYTES = 1_500_000


def _is_top(attributes):
    """Yosys marks the top module with attribute top = 1 (a binary string)."""

    value = (attributes or {}).get("top")

    try:
        return int(str(value), 2) != 0
    except ValueError:
        return bool(value)


def build_netlist(raw_json):
    """
    Reduce Yosys's write_json output to what the schematic needs:
    ports, cells (type, widths, connections) and net names.
    """

    data = json.loads(raw_json)
    modules = {}

    for name, module in data.get("modules", {}).items():
        cells = {}

        for cell_name, cell in module.get("cells", {}).items():
            parameters = {
                key: value
                for key, value in (cell.get("parameters") or {}).items()
                if key == "WIDTH" or key.endswith("_WIDTH")
            }

            cells[cell_name] = {
                "type": cell.get("type", ""),
                "parameters": parameters,
                "port_directions": cell.get("port_directions", {}),
                "connections": cell.get("connections", {})
            }

        modules[name] = {
            "top": _is_top(module.get("attributes")),
            "ports": {
                port_name: {
                    "direction": port.get("direction", "input"),
                    "bits": port.get("bits", [])
                }
                for port_name, port in module.get("ports", {}).items()
            },
            "cells": cells,
            "netnames": {
                net_name: {
                    "bits": net.get("bits", []),
                    "hide_name": net.get("hide_name", 0)
                }
                for net_name, net in module.get("netnames", {}).items()
            }
        }

    if not modules:
        raise ValueError("Yosys produced an empty design.")

    # top module: the one Yosys marked, else the one nobody instantiates
    top = next((name for name, m in modules.items() if m["top"]), None)

    if top is None:
        used = {
            cell["type"]
            for m in modules.values()
            for cell in m["cells"].values()
        }
        free = [name for name in modules if name not in used]
        top = free[0] if free else next(iter(modules))

    return {"top": top, "modules": modules}


def yosys_missing():
    return {
        "success": False,
        "stage": "schematic",
        "stdout": "",
        "stderr": (
            "Yosys was not found.\n\n"
            "Easiest fix (no PATH or DLL problems), run:\n"
            "    python -m pip install yowasp-yosys\n"
            "then restart the backend.\n\n"
            "(Alternative: install the OSS CAD Suite and add its "
            "'bin' and 'lib' folders to PATH.)"
        )
    }


def netlist_from_yosys(yosys, temp_dir, yosys_script):
    """Run Yosys with the script and turn its JSON into schematic data."""

    yosys_result = run_command(
        [yosys, "-q", "-p", yosys_script],
        cwd=temp_dir,
        timeout=120   # the very first YoWASP run is slow (one-time setup)
    )

    json_path = os.path.join(temp_dir, "schematic.json")

    if not yosys_result["success"] or not os.path.exists(json_path):
        return {
            "success": False,
            "stage": "synthesis",
            "stdout": yosys_result["stdout"],
            "stderr": yosys_result["stderr"] or yosys_result["stdout"]
                      or "Yosys did not produce a netlist."
        }

    with open(json_path, "r", encoding="utf-8", errors="ignore") as file:
        raw_json = file.read()

    try:
        netlist = build_netlist(raw_json)
    except (ValueError, KeyError) as error:
        return {
            "success": False,
            "stage": "schematic",
            "stdout": "",
            "stderr": f"Could not read the netlist: {error}"
        }

    if len(json.dumps(netlist)) > MAX_NETLIST_BYTES:
        return {
            "success": False,
            "stage": "schematic",
            "stdout": "",
            "stderr": "This design is too large to draw as a schematic."
        }

    return {
        "success": True,
        "stage": "schematic",
        "stdout": "",
        "stderr": "",
        "netlist": netlist
    }


def vhdl_to_verilog(prepared, temp_dir):
    """
    Use GHDL's own synthesis to turn the VHDL design into Verilog, which
    Yosys can read. Returns (name of the Verilog file, None) or (None, error result).
    """

    sources = [item for item in prepared if item["role"] != "testbench"]

    for item in sources:
        new_code, added = add_libraries(item["code"])

        if added:
            write_file(item["path"], new_code)
            item["code"] = new_code

    entity, _ = pick_top(sources)

    if not entity:
        return None, {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": NO_ENTITY_HELP
        }

    paths = [item["path"] for item in sources]

    print_debug_files(*paths)

    synthesis = run_ghdl(
        ["--synth", "--out=verilog"] + paths + ["-e", entity["name"]],
        temp_dir,
        timeout=60,
        limit=3_000_000
    )

    if not synthesis["success"] or not synthesis["stdout"].strip():
        message = synthesis["stderr"] or synthesis["stdout"] or "GHDL produced no output."

        if re.search(r"unknown option|unrecognized option|invalid option|--out", message, re.I):
            message += (
                "\n\nYour GHDL is probably too old for the VHDL schematic "
                "(it needs GHDL 3.0 or newer with  --synth --out=verilog)."
            )

        return None, {
            "success": False,
            "stage": "synthesis",
            "stdout": "",
            "stderr": message
        }

    write_file(os.path.join(temp_dir, "synth.v"), synthesis["stdout"])

    return "synth.v", None


def generate_schematic(language, files):
    """
    Turn Verilog / SystemVerilog / VHDL into schematic data.

    Verilog: Yosys reads every file except the testbench.
    VHDL:    GHDL first converts the design to Verilog, then Yosys reads that.
    Either way Yosys writes a JSON netlist, and the browser lays it out and
    draws it with instance, port and net names.

    Install:  python -m pip install yowasp-yosys
    """

    if language not in ("Verilog", "SystemVerilog", "VHDL"):
        return {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": "RTL schematic supports Verilog, SystemVerilog and VHDL."
        }

    yosys = find_yosys()

    if yosys is None:
        return yosys_missing()

    temp_dir = tempfile.mkdtemp(prefix="vlsi_schematic_")

    try:
        if language == "VHDL":
            prepared = non_blank(prepare_files(files, temp_dir, ".vhd"))

            if not [item for item in prepared if item["role"] != "testbench"]:
                return no_code_error()

            verilog_file, error = vhdl_to_verilog(prepared, temp_dir)

            if error:
                return error

            yosys_script = (
                f"read_verilog {verilog_file}; prep -auto-top; write_json schematic.json"
            )

            return netlist_from_yosys(yosys, temp_dir, yosys_script)

        systemverilog = language == "SystemVerilog"
        extension = ".sv" if systemverilog else ".v"

        prepared = non_blank(prepare_files(files, temp_dir, extension))
        sources = [item for item in prepared if item["role"] != "testbench"]

        if not sources:
            return no_code_error()

        read_command = "read_verilog -sv" if systemverilog else "read_verilog"

        yosys_script = "; ".join(
            f"{read_command} {os.path.basename(item['path'])}"
            for item in sources
        ) + "; prep -auto-top; write_json schematic.json"

        print_debug_files(*[item["path"] for item in sources])

        return netlist_from_yosys(yosys, temp_dir, yosys_script)

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
        