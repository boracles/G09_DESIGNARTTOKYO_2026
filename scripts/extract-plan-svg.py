#!/usr/bin/env python3
"""Extract the architectural plan geometry from G09_PLAN.pdf as an SVG overlay.

The PDF crop is normalized to the documented 7,250 x 9,100 mm plan extents.
Artwork pedestals in the central floor are intentionally omitted because the
exhibition brief confirms that those movable fixtures are not present.
"""

from pathlib import Path
from xml.sax.saxutils import escape

import pdfplumber


SOURCE = Path("/Users/boracles/Downloads/G09_PLAN.pdf")
OUTPUT = Path("public/assets/g09-plan-vector.svg")

# PDF coordinates of the original plan's outer construction lines.
PDF_LEFT, PDF_TOP = 244.68, 95.04
PDF_RIGHT, PDF_BOTTOM = 531.24, 455.64
SCALE_X = 7250 / (PDF_RIGHT - PDF_LEFT)
SCALE_Y = 9100 / (PDF_BOTTOM - PDF_TOP)


def x(value):
    return (value - PDF_LEFT) * SCALE_X


def y(value):
    return (value - PDF_TOP) * SCALE_Y


def color(value, default="none"):
    if value is None:
        return default
    if isinstance(value, (int, float)):
        channel = round(float(value) * 255)
        return f"rgb({channel},{channel},{channel})"
    channels = [round(float(channel) * 255) for channel in value[:3]]
    return f"rgb({channels[0]},{channels[1]},{channels[2]})"


def omitted(obj):
    # Three central movable display pedestals marked "No fixtures" in source.
    return 408 < obj["x0"] < 458 and 220 < obj["top"] < 405


def main():
    page = pdfplumber.open(SOURCE).pages[0]
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1100 -700 9500 10600" role="img" aria-label="G09 original PDF vector geometry">',
        '<rect x="0" y="0" width="7250" height="9100" fill="white"/>',
        '<g stroke-linecap="square" stroke-linejoin="miter">',
    ]

    for rect in page.rects:
        if omitted(rect):
            continue
        width, height = rect["x1"] - rect["x0"], rect["bottom"] - rect["top"]
        if not (220 < rect["x0"] < 605 and 80 < rect["top"] < 490):
            continue
        # Drop tiny filled glyph fragments while retaining construction bars.
        if rect.get("fill") and width < 5 and height < 12:
            continue
        fill = color(rect.get("fill_color"), "rgb(235,235,235)") if rect.get("fill") else "none"
        stroke = color(rect.get("stroking_color"), "rgb(45,48,52)") if rect.get("stroke", True) else "none"
        stroke_width = max(float(rect.get("linewidth") or 0.36) * 25.25, 3)
        parts.append(
            f'<rect x="{x(rect["x0"]):.2f}" y="{y(rect["top"]):.2f}" width="{width*SCALE_X:.2f}" height="{height*SCALE_Y:.2f}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width:.2f}"/>'
        )

    for line in page.lines:
        if omitted(line) or not (200 < line["x0"] < 610 and 70 < line["top"] < 500):
            continue
        stroke = color(line.get("stroking_color"), "rgb(45,48,52)")
        stroke_width = max(float(line.get("linewidth") or 0.36) * 25.25, 3)
        parts.append(
            f'<line x1="{x(line["x0"]):.2f}" y1="{y(line["top"]):.2f}" x2="{x(line["x1"]):.2f}" y2="{y(line["bottom"]):.2f}" stroke="{stroke}" stroke-width="{stroke_width:.2f}"/>'
        )

    for curve in page.curves:
        if omitted(curve) or curve.get("fill") or not curve.get("stroke"):
            continue
        if not (200 < curve["x0"] < 610 and 70 < curve["top"] < 500):
            continue
        commands = []
        for command in curve.get("path", []):
            op, *points = command
            if op in {"m", "l"}:
                px, py = points[0]
                commands.append(f'{op.upper()}{x(px):.2f},{y(py):.2f}')
            elif op == "c":
                coords = []
                for px, py in points:
                    coords.extend((f"{x(px):.2f}", f"{y(py):.2f}"))
                commands.append("C" + ",".join(coords))
            elif op == "h":
                commands.append("Z")
        if not commands:
            continue
        stroke = color(curve.get("stroking_color"), "rgb(45,48,52)")
        stroke_width = max(float(curve.get("linewidth") or 0.36) * 25.25, 3)
        parts.append(f'<path d="{escape(" ".join(commands))}" fill="none" stroke="{stroke}" stroke-width="{stroke_width:.2f}"/>')

    parts.extend(["</g>", "</svg>"])
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("\n".join(parts), encoding="utf-8")
    print(f"wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
