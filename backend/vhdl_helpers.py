"""
Helpers that make VHDL easier for beginners.

  add_libraries()          writes  library ieee; use ieee.std_logic_1164.all; ...
                           for you when a design unit has no library lines
  find_entities()          reads an entity: its generics and ports
  pick_top()               finds the main entity of a project
  build_auto_testbench()   writes a testbench for you (clock, reset, input patterns)
  convert_report_lines()   turns GHDL's report messages into readable output

Everything here is plain text processing: it does not need GHDL.
"""

import ast
import math
import re


class Unsupported(Exception):
    """The automatic test cannot handle this design (the message says why)."""


# =========================================
# TEXT HELPERS
# =========================================

def _blank(match):
    return re.sub(r"[^\n]", " ", match.group(0))


def strip_comments(code):
    """Replace comments by spaces: character positions and line numbers stay the same."""

    code = re.sub(r"/\*.*?\*/", _blank, code, flags=re.S)
    return re.sub(r"--[^\n]*", _blank, code)


def match_paren(text, open_index):
    depth = 0

    for i in range(open_index, len(text)):
        if text[i] == "(":
            depth += 1
        elif text[i] == ")":
            depth -= 1
            if depth == 0:
                return i

    return -1


def split_top(text, separator):
    parts, depth, start = [], 0, 0

    for i, char in enumerate(text):
        if char in "([":
            depth += 1
        elif char in ")]":
            depth -= 1
        elif char == separator and depth == 0:
            parts.append(text[start:i])
            start = i + 1

    parts.append(text[start:])
    return parts


# =========================================
# LIBRARIES  (so beginners do not have to type them)
# =========================================

PRELUDE = "library ieee; use ieee.std_logic_1164.all; use ieee.numeric_std.all; "

_UNIT = re.compile(
    r"(?im)(?:^|;)[ \t]*("
    r"entity\s+(\w+)\s+is\b"
    r"|package\s+body\s+(\w+)\s+is\b"
    r"|package\s+(\w+)\s+is\b"
    r"|configuration\s+\w+\s+of\b"
    r"|architecture\s+\w+\s+of\s+(\w+)\s+is\b)"
)


def _has_context_before(stripped, start):
    before = stripped[:start].rstrip()

    if not before.endswith(";"):
        return False

    previous = before.rfind(";", 0, len(before) - 1)
    statement = before[previous + 1:].strip().lower()

    return bool(re.match(r"(use|library|context)\b", statement))


def add_libraries(code):
    """
    Put  library ieee; use ieee.std_logic_1164.all; use ieee.numeric_std.all;
    in front of every design unit that has no library lines of its own.

    The text is added on the SAME line as the unit, so line numbers in
    error messages stay correct.

    Returns (new_code, True if anything was added).
    """

    stripped = strip_comments(code)
    units = [(match.start(1), match) for match in _UNIT.finditer(stripped)]

    entities = {m.group(2).lower() for _, m in units if m.group(2)}
    packages = {m.group(4).lower() for _, m in units if m.group(4)}

    points = []

    for start, match in units:
        # an architecture / package body shares the context of its entity / package
        if match.group(5) and match.group(5).lower() in entities:
            continue

        if match.group(3) and match.group(3).lower() in packages:
            continue

        if _has_context_before(stripped, start):
            continue

        points.append(start)

    for start in reversed(points):
        code = code[:start] + PRELUDE + code[start:]

    return code, bool(points)


# =========================================
# ENTITIES
# =========================================

def _safe_int(expression, generics):
    """Evaluate things like  N-1  or  2*WIDTH  using the generic defaults."""

    text = expression.strip()

    for name, value in generics.items():
        text = re.sub(rf"\b{re.escape(name)}\b", str(value), text, flags=re.I)

    if not re.fullmatch(r"[0-9+\-*/() ]+", text):
        raise Unsupported(f"cannot work out the size '{expression.strip()}'")

    def walk(node):
        if isinstance(node, ast.Expression):
            return walk(node.body)

        if isinstance(node, ast.Constant) and isinstance(node.value, int):
            return node.value

        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.USub, ast.UAdd)):
            value = walk(node.operand)
            return -value if isinstance(node.op, ast.USub) else value

        if isinstance(node, ast.BinOp):
            left, right = walk(node.left), walk(node.right)

            if isinstance(node.op, ast.Add): return left + right
            if isinstance(node.op, ast.Sub): return left - right
            if isinstance(node.op, ast.Mult): return left * right
            if isinstance(node.op, (ast.Div, ast.FloorDiv)): return left // right

        raise Unsupported(f"cannot work out the size '{expression.strip()}'")

    try:
        return walk(ast.parse(text.replace("/", "//"), mode="eval"))
    except (SyntaxError, ZeroDivisionError):
        raise Unsupported(f"cannot work out the size '{expression.strip()}'")


def _clause(header, keyword):
    match = re.search(rf"\b{keyword}\s*\(", header, re.I)

    if not match:
        return ""

    open_index = match.end() - 1
    close = match_paren(header, open_index)

    return header[open_index + 1: close if close >= 0 else len(header)]


def find_entities(code):
    """List the entities in the code: name, generics text and ports text."""

    stripped = strip_comments(code)
    found = []

    for match in re.finditer(r"\bentity\s+(\w+)\s+is\b", stripped, re.I):
        name = match.group(1)
        end = re.compile(rf"\bend\s*(?:entity)?\s*(?:{re.escape(name)})?\s*;", re.I).search(stripped, match.end())
        header = stripped[match.end(): end.start() if end else len(stripped)]

        found.append({
            "name": name,
            "generics_text": _clause(header, "generic"),
            "ports_text": _clause(header, "port")
        })

    return found


def parse_entity(entity):
    """Read generics and ports into a clean structure (raises Unsupported)."""

    generics = {}

    for part in split_top(entity["generics_text"], ";"):
        item = re.match(r"\s*([\w\s,]+?)\s*:\s*([^:=]+?)\s*(?::=\s*(.+))?\s*$", part, re.S)

        if not item:
            continue

        for name in item.group(1).split(","):
            name = name.strip()

            if not name:
                continue

            if item.group(3) is None:
                raise Unsupported(f"generic '{name}' has no default value")

            generics[name] = _safe_int(item.group(3), generics)

    ports = []

    for part in split_top(entity["ports_text"], ";"):
        item = re.match(
            r"\s*([\w\s,]+?)\s*:\s*(in|out|inout|buffer|linkage)?\s+([^:=]+?)\s*(?::=.*)?$",
            part, re.S | re.I
        )

        if not item:
            if part.strip():
                raise Unsupported(f"cannot read the port '{' '.join(part.split())}'")
            continue

        mode = (item.group(2) or "in").lower()

        for name in item.group(1).split(","):
            name = name.strip()

            if name:
                ports.append({"name": name, "mode": mode, **_classify(item.group(3), generics)})

    return {"name": entity["name"], "generics": generics, "ports": ports}


def _classify(type_text, generics):
    text = " ".join(type_text.split())
    lower = text.lower()

    vector = re.fullmatch(
        r"(std_logic_vector|std_ulogic_vector|unsigned|signed|bit_vector)\s*\((.*)\)", lower, re.S
    )

    if vector:
        bounds = re.split(r"\b(downto|to)\b", vector.group(2), flags=re.I)

        if len(bounds) != 3:
            raise Unsupported(f"cannot read the size of '{text}'")

        first = _safe_int(bounds[0], generics)
        second = _safe_int(bounds[2], generics)
        width = abs(first - second) + 1

        return {"kind": "vector", "width": width, "base": vector.group(1),
                "declare": f"{vector.group(1)}({width - 1} downto 0)"}

    if lower in ("std_logic", "std_ulogic", "bit"):
        return {"kind": "scalar", "width": 1, "base": lower, "declare": lower}

    if lower == "boolean":
        return {"kind": "boolean", "width": 1, "base": lower, "declare": lower}

    integer = re.fullmatch(r"(integer|natural|positive)(?:\s+range\s+(.+?)\s+(?:to)\s+(.+))?", lower, re.S)

    if integer:
        low = {"integer": 0, "natural": 0, "positive": 1}[integer.group(1)]
        high = low + 15

        if integer.group(2) is not None:
            low = _safe_int(integer.group(2), generics)
            high = _safe_int(integer.group(3), generics)

        count = max(1, min(16, high - low + 1))
        width = max(1, math.ceil(math.log2(count)))

        return {"kind": "integer", "width": width, "low": low, "high": high,
                "base": integer.group(1), "declare": f"integer range {low} to {high}"}

    raise Unsupported(f"the type '{text}' is not supported")


# =========================================
# FINDING THE MAIN ENTITY
# =========================================

def pick_top(files):
    """
    The entity that no other entity uses. For example with  and_gate  and
    adder4 (which uses and_gate) the answer is  adder4.

    files = [{"role": ..., "code": ...}] without the testbench.
    Returns (entity dict, code of its file) or (None, None).
    """

    candidates = []

    for item in files:
        for entity in find_entities(item["code"]):
            candidates.append((entity, item))

    if not candidates:
        return None, None

    all_code = "\n".join(strip_comments(item["code"]) for item in files)

    for entity, item in candidates:
        name = re.escape(entity["name"])
        used = re.search(
            rf"\bentity\s+work\.{name}\b|\bcomponent\s+{name}\b"
            rf"|:\s*(?:component\s+)?{name}\s*(?:generic|port)\s+map",
            all_code, re.I
        )

        if not used:
            return entity, item

    return candidates[0]


# =========================================
# AUTOMATIC TESTBENCH
# =========================================

_CLOCK = re.compile(r"^(clk|clock|clk_?in|clk_?i|i_clk|sys_?clk|clock_?in)$", re.I)
_RESET = re.compile(r"^(rst|reset|rst_?n|reset_?n|nrst|nreset|rstn|resetn|clr|clear|rst_?i|i_rst)$", re.I)
_ACTIVE_LOW = re.compile(r"(^n(rst|reset)|(rst|reset)_?n$)", re.I)

PERIOD_NS = 10


def _patterns(bits, sequential):
    if bits == 0:
        return [0]

    full = (1 << bits) - 1

    if bits <= 4:
        values = list(range(1 << bits))
    else:
        values = [0, full]

        for i in range(1, 31):
            value = (i * 83 + 7) % (1 << bits)

            if value not in values:
                values.append(value)

    if sequential:
        # start with everything switched on, so counters and enables do something
        values = [full] + [v for v in values if v != full]

    return values


def _literal(port, value):
    if port["kind"] == "scalar":
        return "'1'" if value & 1 else "'0'"

    if port["kind"] == "boolean":
        return "true" if value & 1 else "false"

    if port["kind"] == "integer":
        span = max(1, min(16, port["high"] - port["low"] + 1))
        return str(port["low"] + (value % span))

    return '"' + format(value, f"0{port['width']}b") + '"'


def _initial(port):
    if port["kind"] == "scalar":
        return "'0'"

    if port["kind"] == "boolean":
        return "false"

    if port["kind"] == "integer":
        return str(port["low"])

    return "(others => '0')"


def build_auto_testbench(entity):
    """
    Write a testbench for an entity.

    Returns {"text", "stop_ns", "top", "notes"}.
    Raises Unsupported when the ports cannot be driven automatically.
    """

    spec = parse_entity(entity)
    ports = spec["ports"]

    if not ports:
        raise Unsupported("the entity has no ports")

    for port in ports:
        if port["mode"] == "inout":
            raise Unsupported(f"port '{port['name']}' is inout")

    clock = next((p for p in ports if p["mode"] == "in" and p["kind"] == "scalar"
                  and _CLOCK.match(p["name"])), None)

    resets = []

    if clock:
        resets = [p for p in ports if p["mode"] == "in" and p["kind"] == "scalar"
                  and p is not clock and _RESET.match(p["name"])]

    driven = [p for p in ports if p["mode"] == "in" and p is not clock and p not in resets]
    total_bits = sum(p["width"] for p in driven)
    sequential = clock is not None

    patterns = _patterns(total_bits, sequential)

    # ----- statements -----

    lines = []
    time_ns = 0

    def assign(value):
        offset = 0

        for port in driven:
            piece = (value >> offset) & ((1 << port["width"]) - 1)
            lines.append(f"    {port['name']} <= {_literal(port, piece)};")
            offset += port["width"]

    reset_ns = 0

    if sequential:
        for reset in resets:
            level = "'0'" if _ACTIVE_LOW.search(reset["name"]) else "'1'"
            lines.append(f"    {reset['name']} <= {level};")

        reset_ns = 22 if resets else 0

    for index, value in enumerate(patterns):
        assign(value)

        if sequential:
            hold = (8 if index == 0 else 2) * PERIOD_NS

            if index == 0 and resets:
                lines.append(f"    wait for {reset_ns} ns;")

                for reset in resets:
                    level = "'1'" if _ACTIVE_LOW.search(reset["name"]) else "'0'"
                    lines.append(f"    {reset['name']} <= {level};")

                hold -= reset_ns if hold > reset_ns else 0
                time_ns += reset_ns

            lines.append(f"    wait for {hold} ns;")
            time_ns += hold
        else:
            lines.append(f"    wait for {PERIOD_NS} ns;")
            time_ns += PERIOD_NS

    time_ns += 2 * PERIOD_NS

    # ----- declarations -----

    declarations = []

    for port in ports:
        init = ""

        if port["mode"] == "in":
            init = f" := {_initial(port)}"

        declarations.append(f"  signal {port['name']} : {port['declare']}{init};")

    text = [
        "-- Generated automatically by VLSI Learn (you did not write a testbench).",
        "library ieee;",
        "use ieee.std_logic_1164.all;",
        "use ieee.numeric_std.all;",
        "",
        "entity auto_tb is",
        "end entity;",
        "",
        "architecture sim of auto_tb is",
        *declarations,
        "begin",
        f"  uut : entity work.{spec['name']}",
        "    port map (" + ", ".join(f"{p['name']} => {p['name']}" for p in ports) + ");",
    ]

    if clock:
        text += [
            "",
            f"  {clock['name']}_gen : process",
            "  begin",
            f"    {clock['name']} <= '0'; wait for {PERIOD_NS // 2} ns;",
            f"    {clock['name']} <= '1'; wait for {PERIOD_NS // 2} ns;",
            "  end process;",
        ]

    text += [
        "",
        "  stimulus : process",
        "  begin",
        *lines,
        "    wait;",
        "  end process;",
        "end architecture;",
        ""
    ]

    # ----- explanation for the student -----

    notes = []

    if clock:
        notes.append(f"{clock['name']}: a clock ({PERIOD_NS} ns period)")

    for reset in resets:
        level = "low" if _ACTIVE_LOW.search(reset["name"]) else "high"
        notes.append(f"{reset['name']}: active-{level} reset, held for {reset_ns} ns then released")

    if driven:
        names = ", ".join(p["name"] for p in driven)
        count = len(patterns)

        if total_bits <= 4:
            how = f"all {count} combinations"
        else:
            how = f"{count} different values"

        notes.append(f"{names}: {how}, changed every {PERIOD_NS if not sequential else 2 * PERIOD_NS} ns")

    return {
        "text": "\n".join(text),
        "stop_ns": time_ns + PERIOD_NS,
        "top": "auto_tb",
        "notes": notes,
        "ports": [p["name"] for p in ports]
    }


# =========================================
# GHDL OUTPUT
# =========================================

_REPORT = re.compile(
    r"^.*?:\d+:\d+:@([^:]+):\((?:report|assertion) (note|warning|error|failure)\): (.*)$"
)


def convert_report_lines(stderr):
    """
    GHDL prints  report  messages on stderr like
        tb.vhd:12:5:@10ns:(report note): Hello
    Turn them into  [10ns] Hello  and return (output_lines, remaining_stderr, stopped_by_time_limit).
    """

    output, remaining = [], []
    stopped = False

    for line in (stderr or "").splitlines():
        if "simulation stopped by --stop-time" in line:
            stopped = True
            continue

        match = _REPORT.match(line)

        if not match:
            if line.strip():
                remaining.append(line)
            continue

        when, severity, message = match.groups()
        prefix = "" if severity == "note" else ("warning: " if severity == "warning" else "ERROR: ")

        output.append(f"[{when}] {prefix}{message}")

    return output, remaining, stopped