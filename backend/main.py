import re
import shutil

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from simulator import (
    simulate_verilog,
    simulate_vhdl,
    simulate_script,
    generate_schematic
)


app = FastAPI(
    title="VLSI Learn EDA Backend",
    version="1.3.0"
)
@app.get("/diagnostics/tools")
def check_installed_tools():
    tools = {
        "iverilog": ["iverilog"],
        "vvp": ["vvp"],
        "ghdl": ["ghdl"],
        "tclsh": ["tclsh", "tclsh8.6"],
        "perl": ["perl"],
        "yosys": ["yosys"],
    }

    results = {}

    for tool, commands in tools.items():
        results[tool] = {
            "installed": any(shutil.which(cmd) for cmd in commands)
        }

    return {
        "success": True,
        "tools": results
    }

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# REQUEST MODELS
# =========================================

MAX_CODE_LENGTH = 50000
MAX_FILES = 12


class FileItem(BaseModel):
    name: str = ""
    code: str = ""
    role: str = "source"          # "design", "testbench" or "source"


class SimulationRequest(BaseModel):
    language: str
    mode: str = "run"             # "run" or "compile"

    # new format: any number of named files
    files: list[FileItem] = []

    # old format (still used by the lesson-page TryIt boxes)
    design: str = ""
    testbench: str = ""
    extras: list[FileItem] = []


class SchematicRequest(BaseModel):
    language: str
    files: list[FileItem] = []
    design: str = ""
    extras: list[FileItem] = []


# =========================================
# HELPERS
# =========================================

# Matches the temporary folder that the simulators print in their
# messages, e.g.  C:\Users\me\AppData\Local\Temp\vlsi_playground_ab12\
TEMP_PATH = re.compile(
    r"(?:[A-Za-z]:)?[^\n:*?\"<>|]*?"
    r"vlsi_(?:playground|vhdl|script|schematic)_[A-Za-z0-9_]+[\\/]"
)


def clean_text(text):
    """Show 'and_gate.v:3: syntax error' instead of the full temp path."""

    return TEMP_PATH.sub("", text) if isinstance(text, str) else text


def clean_result(result):
    for key in ("stdout", "stderr"):
        if key in result:
            result[key] = clean_text(result[key])

    return result


def collect_files(request):
    """
    Return the list of files as plain dicts.
    Old-style requests (design / testbench / extras) are converted.
    """

    if request.files:
        return [
            {"name": item.name, "code": item.code, "role": item.role}
            for item in request.files
        ]

    files = [
        {"name": item.name, "code": item.code, "role": "source"}
        for item in request.extras
    ]

    files.append({"name": "design", "code": request.design, "role": "design"})

    testbench = getattr(request, "testbench", "")

    if testbench and testbench.strip():
        files.append({"name": "testbench", "code": testbench, "role": "testbench"})

    return files


def validate(files):
    """Return an error result if the request is not acceptable."""

    def error(message):
        return {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": message
        }

    if not any(item["code"].strip() for item in files):
        return error("Code is empty.")

    if sum(len(item["code"]) for item in files) > MAX_CODE_LENGTH:
        return error(f"Code is too long (limit {MAX_CODE_LENGTH} characters in total).")

    if len(files) > MAX_FILES:
        return error(f"Too many files (limit {MAX_FILES}).")

    return None


# =========================================
# ROOT
# =========================================

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "VLSI Learn EDA Backend"
    }


# =========================================
# COMPILE / RUN
# =========================================

@app.post("/run")
def run_simulation(request: SimulationRequest):
    return {
        "success": False,
        "stage": "disabled",
        "stdout": "",
        "stderr": "Online simulation is temporarily unavailable while we prepare a secure execution environment."
    }
    files = collect_files(request)
    problem = validate(files)

    if problem:
        return problem

    language = request.language
    compile_only = request.mode == "compile"

    if language == "Verilog":
        result = simulate_verilog(files, systemverilog=False, compile_only=compile_only)

    elif language == "SystemVerilog":
        result = simulate_verilog(files, systemverilog=True, compile_only=compile_only)

    elif language == "VHDL":
        result = simulate_vhdl(files, compile_only=compile_only)

    elif language in ("TCL", "Perl"):
        result = simulate_script(language, files, compile_only=compile_only)

    else:
        result = {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": f"{language} execution is not implemented yet."
        }

    return clean_result(result)


# =========================================
# RTL SCHEMATIC
# =========================================

@app.post("/schematic")
def make_schematic(request: SchematicRequest):

    files = collect_files(request)
    problem = validate(files)

    if problem:
        return problem

    return clean_result(generate_schematic(request.language, files))
