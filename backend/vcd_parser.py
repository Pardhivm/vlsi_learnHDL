"""
Minimal VCD (Value Change Dump) parser.

Turns the .vcd file written by Icarus Verilog / GHDL into a small
JSON-friendly dictionary that the browser can draw:

{
  "timescale": "1ns",
  "endtime": 40,
  "signals": [
    {"name": "testbench.a", "width": 1, "changes": [[0, "0"], [10, "1"]]},
    {"name": "testbench.y", "width": 8, "changes": [[0, "00000000"], ...]}
  ]
}
"""

MAX_SIGNALS = 40

# VHDL std_logic has more values than a VCD file: U W - -> x,  L -> 0,  H -> 1
_VALUE_MAP = {"u": "x", "w": "x", "-": "x", "l": "0", "h": "1"}


def _scalar(char):
    lower = char.lower()
    return _VALUE_MAP.get(lower, lower)

MAX_CHANGES_PER_SIGNAL = 4000


def parse_vcd(text):
    timescale = "1ns"
    scope_stack = []

    # id code -> list of [time, value]
    changes_by_id = {}

    # signals in declaration order (several can share one id code)
    signals = []

    current_time = 0
    max_time = 0

    in_definitions = True
    pending = []          # tokens of a multi-line declaration
    pending_keyword = None

    for raw_line in text.splitlines():
        line = raw_line.strip()

        if not line:
            continue

        # ---------------------------------
        # HEADER / DEFINITIONS
        # ---------------------------------

        if in_definitions:

            if pending_keyword:
                pending.extend(line.replace("$end", " $end ").split())

                if "$end" in pending:
                    pending = pending[:pending.index("$end")]
                    _handle_declaration(
                        pending_keyword, pending, scope_stack,
                        signals, changes_by_id
                    )

                    if pending_keyword == "$timescale":
                        timescale = "".join(pending)

                    pending_keyword = None
                    pending = []

                continue

            if line.startswith("$enddefinitions"):
                in_definitions = False
                continue

            keyword = line.split()[0]

            if keyword in ("$timescale", "$scope", "$upscope", "$var"):
                tokens = line.replace("$end", " $end ").split()[1:]

                if "$end" in tokens:
                    tokens = tokens[:tokens.index("$end")]
                    _handle_declaration(
                        keyword, tokens, scope_stack,
                        signals, changes_by_id
                    )

                    if keyword == "$timescale":
                        timescale = "".join(tokens)
                else:
                    pending_keyword = keyword
                    pending = tokens

            continue

        # ---------------------------------
        # VALUE CHANGES
        # ---------------------------------

        if line.startswith("#"):
            try:
                current_time = int(line[1:])
                max_time = max(max_time, current_time)
            except ValueError:
                pass
            continue

        if line.startswith("$"):
            # $dumpvars / $end / $dumpall ... markers
            continue

        first = line[0]

        if first in "01xXzZuUwWlLhH-":
            value, id_code = _scalar(first), line[1:].strip()

        elif first in "bB":
            parts = line[1:].split()

            if len(parts) != 2:
                continue

            value, id_code = "".join(_scalar(char) for char in parts[0]), parts[1]

        elif first in "rR":
            parts = line[1:].split()

            if len(parts) != 2:
                continue

            value, id_code = parts[0], parts[1]

        else:
            continue

        if id_code in changes_by_id:
            changes_by_id[id_code].append([current_time, value])

    # ---------------------------------
    # BUILD RESULT
    # ---------------------------------

    result_signals = []

    for signal in signals[:MAX_SIGNALS]:
        changes = changes_by_id.get(signal["id"], [])

        if len(changes) > MAX_CHANGES_PER_SIGNAL:
            changes = changes[:MAX_CHANGES_PER_SIGNAL]

        result_signals.append({
            "name": signal["name"],
            "width": signal["width"],
            "changes": changes
        })

    return {
        "timescale": timescale,
        "endtime": max_time,
        "signals": result_signals
    }


def _handle_declaration(keyword, tokens, scope_stack, signals, changes_by_id):

    if keyword == "$scope":
        # $scope module testbench $end
        if len(tokens) >= 2:
            scope_stack.append(tokens[1])

    elif keyword == "$upscope":
        if scope_stack:
            scope_stack.pop()

    elif keyword == "$var":
        # $var wire 8 ! y [7:0] $end
        if len(tokens) < 4:
            return

        var_type = tokens[0]

        try:
            width = int(tokens[1])
        except ValueError:
            return

        id_code = tokens[2]
        name = tokens[3]

        if var_type in ("event", "string"):
            return

        # skip the helper module used for automatic dumping
        if scope_stack and scope_stack[0].startswith("__wave"):
            return

        full_name = ".".join(scope_stack + [name])

        signals.append({
            "id": id_code,
            "name": full_name,
            "width": width
        })

        changes_by_id.setdefault(id_code, [])



# =========================================
# FRIENDLIER TIMES AND A TEXT TABLE
# =========================================

import re
from math import gcd

_UNITS = [("fs", 1), ("ps", 10 ** 3), ("ns", 10 ** 6), ("us", 10 ** 9),
          ("ms", 10 ** 12), ("s", 10 ** 15)]


def normalize_times(waveform):
    """
    GHDL counts time in femtoseconds, so 10 ns is written 10000000.
    Rescale to the largest unit that keeps every time a whole number
    (10000000 fs -> 10 ns). The Icarus default (1s, no `timescale) is left alone.
    """

    match = re.fullmatch(r"\s*(\d+)\s*(fs|ps|ns|us|ms|s)\s*", waveform.get("timescale", ""))

    if not match:
        return waveform

    magnitude, unit = int(match.group(1)), match.group(2)

    if unit == "s":
        return waveform

    base = magnitude * dict(_UNITS)[unit]

    times = {change[0] for signal in waveform["signals"] for change in signal["changes"]}
    times.add(waveform["endtime"])

    common = 0

    for time in times:
        common = gcd(common, time)

    if common == 0:
        return waveform

    chosen = None

    for name, size in reversed(_UNITS):
        if (common * base) % size == 0:
            chosen = (name, size)
            break

    if chosen is None:
        return waveform

    name, size = chosen

    for signal in waveform["signals"]:
        signal["changes"] = [[time * base // size, value] for time, value in signal["changes"]]

    waveform["endtime"] = waveform["endtime"] * base // size
    waveform["timescale"] = f"1{name}"

    return waveform


def _extend(value, width):
    if not re.fullmatch(r"[01xz]+", value) or len(value) >= width:
        return value

    fill = value[0] if value[0] in "xz" else "0"

    return fill * (width - len(value)) + value


def waveform_to_text(waveform, max_rows=80):
    """
    A table of the signal values at every moment something changes, so a
    student sees results without writing $display / $monitor / report.
    Only the top-level signals are shown (not the ones inside sub-modules).
    """

    signals = waveform.get("signals", [])

    if not signals:
        return ""

    shallowest = min(signal["name"].count(".") for signal in signals)
    chosen = [s for s in signals if s["name"].count(".") == shallowest][:10]

    times = sorted({time for signal in chosen for time, _ in signal["changes"]})

    if not times:
        return ""

    unit = waveform.get("timescale", "")
    unit = unit[1:] if re.fullmatch(r"1(fs|ps|ns|us|ms)", unit) else ""

    def label(signal):
        return signal["name"].rsplit(".", 1)[-1]

    # value of every signal after each change
    position = {id(signal): 0 for signal in chosen}
    current = {id(signal): "x" for signal in chosen}
    rows = []

    for time in times:
        for signal in chosen:
            changes = signal["changes"]
            i = position[id(signal)]

            while i < len(changes) and changes[i][0] <= time:
                current[id(signal)] = changes[i][1]
                i += 1

            position[id(signal)] = i

        row = []

        for signal in chosen:
            value = _extend(current[id(signal)], signal["width"])

            if signal["width"] > 1 and re.fullmatch(r"[01]+", value) and signal["width"] <= 32:
                value = f"{value} ({int(value, 2)})"

            row.append(value)

        rows.append((str(time), row))

    headers = [f"Time ({unit})" if unit else "Time"] + [label(s) for s in chosen]
    body = [[time] + values for time, values in rows[:max_rows]]

    widths = [max(len(headers[i]), *(len(line[i]) for line in body)) for i in range(len(headers))]

    def format_line(cells):
        return " | ".join(cell.ljust(widths[i]) for i, cell in enumerate(cells)).rstrip()

    lines = [format_line(headers), "-+-".join("-" * width for width in widths)]
    lines += [format_line(line) for line in body]

    if len(rows) > max_rows:
        lines.append(f"... {len(rows) - max_rows} more rows (see the waveform)")

    return "\n".join(lines)