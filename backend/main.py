
import os
import re
import shutil
import threading

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from simulator import (
    simulate_verilog,
    simulate_vhdl,
    simulate_script,
    generate_schematic,
)


# =========================================
# APPLICATION
# =========================================

app = FastAPI(
    title="VLSI Learn EDA Backend",
    version="1.4.0"
)


# =========================================
# EXECUTION CONFIGURATION
# =========================================

MAX_FILE_BYTES = 100 * 1024
MAX_TOTAL_CODE_BYTES = 500 * 1024
MAX_FILES = 10
MAX_CONCURRENT_JOBS = 2

# Keep false until proper OS-level isolation is implemented.
ENABLE_PUBLIC_EXECUTION = (
    os.getenv("ENABLE_PUBLIC_EXECUTION", "false").strip().lower() == "true"
)

_job_slots = threading.BoundedSemaphore(MAX_CONCURRENT_JOBS)


def execution_disabled():
    return {
        "success": False,
        "stage": "disabled",
        "stdout": "",
        "stderr": (
            "Online simulation is temporarily unavailable "
            "while secure execution is being configured."
        )
    }


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://vlsi-learn-hdl.vercel.app",
        "https://vlsi-learn-9s6pwk9na-mokhamatam-pardhiv.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# REQUEST MODELS
# =========================================

class FileItem(BaseModel):
    name: str = ""
    code: str = ""
    role: str = "source"


class SimulationRequest(BaseModel):
    language: str
    mode: str = "run"

    # Modern multi-file format
    files: list[FileItem] = Field(default_factory=list)

    # Legacy format used by lesson TryIt sections
    design: str = ""
    testbench: str = ""
    extras: list[FileItem] = Field(default_factory=list)


class SchematicRequest(BaseModel):
    language: str
    files: list[FileItem] = Field(default_factory=list)
    design: str = ""
    extras: list[FileItem] = Field(default_factory=list)


# =========================================
# FILE COLLECTION
# =========================================

def collect_files(request):
    """
    Supports both:
    1. Modern files[] requests
    2. Legacy design/testbench/extras requests
    """

    files = []

    if request.files:
        files = [
            {
                "name": item.name,
                "code": item.code,
                "role": item.role,
            }
            for item in request.files
        ]

    else:
        files = [
            {
                "name": item.name,
                "code": item.code,
                "role": "source",
            }
            for item in request.extras
        ]

        if request.design and request.design.strip():
            files.append({
                "name": "design.v",
                "code": request.design,
                "role": "design",
            })

    testbench = getattr(request, "testbench", "")

    if testbench and testbench.strip():

        has_testbench = any(
            item.get("role") == "testbench"
            for item in files
        )

        if not has_testbench:
            files.append({
                "name": "testbench.v",
                "code": testbench,
                "role": "testbench",
            })

    return files


# =========================================
# REQUEST VALIDATION
# =========================================

def validate(files):

    def error(message):
        return {
            "success": False,
            "stage": "validation",
            "stdout": "",
            "stderr": message,
        }

    if not files:
        return error("No files were submitted.")

    if len(files) > MAX_FILES:
        return error(
            f"Too many files. Maximum {MAX_FILES} files "
            "are allowed per simulation request."
        )

    if not any(item.get("code", "").strip() for item in files):
        return error("Code is empty.")

    total_bytes = 0

    for item in files:

        code = item.get("code", "")

        if not isinstance(code, str):
            return error("Invalid code format.")

        file_bytes = len(code.encode("utf-8"))

        if file_bytes > MAX_FILE_BYTES:
            filename = item.get("name") or "unnamed"

            return error(
                f"File '{filename}' exceeds the 100 KB limit."
            )

        total_bytes += file_bytes

    if total_bytes > MAX_TOTAL_CODE_BYTES:
        return error(
            "Combined code exceeds the 500 KB limit "
            "per simulation request."
        )

    return None


# =========================================
# TEMPORARY PATH CLEANUP
# =========================================

TEMP_PATH = re.compile(
    r"(?:[A-Za-z]:)?[^\n:*?\"<>|]*?"
    r"vlsi_(?:playground|vhdl|script|schematic)_[A-Za-z0-9_]+[\\/]"
)


def clean_text(value):
    if isinstance(value, str):
        return TEMP_PATH.sub("", value)

    return value


def clean_result(result):

    if isinstance(result, dict):

        for key in ("stdout", "stderr"):
            if key in result:
                result[key] = clean_text(result[key])

    return result


# =========================================
# JOB MANAGEMENT
# =========================================

def busy_response():
    return {
        "success": False,
        "stage": "busy",
        "stdout": "",
        "stderr": (
            "The simulator is currently busy. "
            "Please try again shortly."
        )
    }


# =========================================
# ROOT ENDPOINT
# =========================================

@app.get("/")
def root():

    return {
        "status": "online",
        "service": "VLSI Learn EDA Backend",
        "version": "1.4.0",
    }


# =========================================
# TOOL DIAGNOSTICS
# =========================================

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
            "installed": any(
                shutil.which(command)
                for command in commands
            )
        }

    return {
        "success": True,
        "tools": results,
    }


# =========================================
# RUN / COMPILE SIMULATION
# =========================================

@app.post("/run")
def run_simulation(request: SimulationRequest):

    # Execution stays disabled unless explicitly enabled.
    if not ENABLE_PUBLIC_EXECUTION:
        return execution_disabled()

    files = collect_files(request)

    problem = validate(files)

    if problem:
        return problem

    if not _job_slots.acquire(blocking=False):
        return busy_response()

    try:

        language = request.language.strip()
        compile_only = request.mode.lower() == "compile"

        if language == "Verilog":

            result = simulate_verilog(
                files,
                systemverilog=False,
                compile_only=compile_only,
            )

        elif language == "SystemVerilog":

            result = simulate_verilog(
                files,
                systemverilog=True,
                compile_only=compile_only,
            )

        elif language == "VHDL":

            result = simulate_vhdl(
                files,
                compile_only=compile_only,
            )

        elif language in ("TCL", "Perl"):

            result = simulate_script(
                language,
                files,
                compile_only=compile_only,
            )

        else:

            result = {
                "success": False,
                "stage": "validation",
                "stdout": "",
                "stderr": (
                    f"{language} execution is not implemented."
                ),
            }

        return clean_result(result)

    except Exception as error:

        return {
            "success": False,
            "stage": "server",
            "stdout": "",
            "stderr": "An internal simulation error occurred.",
        }

    finally:
        _job_slots.release()


# =========================================
# RTL SCHEMATIC GENERATION
# =========================================

@app.post("/schematic")
def make_schematic(request: SchematicRequest):

    if not ENABLE_PUBLIC_EXECUTION:
        return execution_disabled()

    files = collect_files(request)

    problem = validate(files)

    if problem:
        return problem

    if not _job_slots.acquire(blocking=False):
        return busy_response()

    try:

        result = generate_schematic(
            request.language,
            files,
        )

        return clean_result(result)

    except Exception:

        return {
            "success": False,
            "stage": "server",
            "stdout": "",
            "stderr": "An internal schematic generation error occurred.",
        }

    finally:
        _job_slots.release()
