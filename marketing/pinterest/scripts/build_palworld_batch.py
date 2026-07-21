#!/usr/bin/env python3
"""Build unique project-owned Pinterest source illustrations for Palworld pins."""

from __future__ import annotations

from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw, ImageFont


W, H = 1000, 970
BG = "#061411"
PANEL = "#0d2821"
PANEL_2 = "#12352b"
CREAM = "#fbf3e7"
MUTED = "#b3c1b8"
GOLD = "#ffc44d"
TEAL = "#0a7378"
GREEN = "#b6c89e"
LINE = "#2c4b40"

ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "marketing" / "pinterest" / "assets"
SOURCES = ASSETS / "sources-2026-07-22-27"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    options = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in options:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def base(kicker: str) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((70, 72, 930, 898), radius=40, fill=PANEL, outline=LINE, width=3)
    draw.text((110, 108), kicker.upper(), fill=GREEN, font=font(25, True))
    draw.line((110, 156, 890, 156), fill=GOLD, width=4)
    return image, draw


def card(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], title: str, subtitle: str = "", accent: str = GOLD) -> None:
    draw.rounded_rectangle(box, radius=24, fill=PANEL_2, outline=LINE, width=3)
    x1, y1, x2, y2 = box
    draw.ellipse((x1 + 24, y1 + 24, x1 + 78, y1 + 78), fill=accent)
    draw.text((x1 + 96, y1 + 24), title, fill=CREAM, font=font(27, True))
    if subtitle:
        draw.text((x1 + 30, y1 + 95), subtitle, fill=MUTED, font=font(22))


def arrow(draw: ImageDraw.ImageDraw, start: tuple[int, int], end: tuple[int, int], color: str = GOLD, width: int = 7) -> None:
    draw.line((start, end), fill=color, width=width)
    ex, ey = end
    draw.polygon(((ex, ey), (ex - 22, ey - 14), (ex - 22, ey + 14)), fill=color)


def egg(draw: ImageDraw.ImageDraw, center: tuple[int, int], size: int = 110, fill: str = GOLD) -> None:
    cx, cy = center
    draw.ellipse((cx - size // 2, cy - size * 2 // 3, cx + size // 2, cy + size * 2 // 3), fill=fill, outline=CREAM, width=7)
    draw.line((cx - 42, cy + 4, cx - 15, cy + 28, cx + 12, cy + 2, cx + 40, cy + 26), fill=CREAM, width=7)


def calculator(path: Path) -> None:
    image, draw = base("Choose two parents")
    card(draw, (110, 230, 430, 410), "PARENT A", "Select a Pal", GOLD)
    card(draw, (570, 230, 890, 410), "PARENT B", "Select a Pal", GREEN)
    draw.line((270, 420, 270, 520, 500, 590), fill=GOLD, width=7)
    draw.line((730, 420, 730, 520, 500, 590), fill=GREEN, width=7)
    egg(draw, (500, 650), 140)
    draw.text((360, 805), "CHILD RESULT", fill=CREAM, font=font(35, True))
    image.save(path)


def child_result(path: Path) -> None:
    image, draw = base("Instant offspring result")
    card(draw, (105, 240, 405, 400), "PARENT A", "Chosen", GOLD)
    card(draw, (105, 500, 405, 660), "PARENT B", "Chosen", GREEN)
    arrow(draw, (445, 320), (610, 440))
    arrow(draw, (445, 580), (610, 500), GREEN)
    draw.rounded_rectangle((610, 330, 890, 650), radius=34, fill="#163d30", outline=GOLD, width=5)
    egg(draw, (750, 455), 120)
    draw.text((675, 575), "RESULT", fill=CREAM, font=font(34, True))
    draw.rounded_rectangle((230, 755, 770, 830), radius=18, fill=TEAL)
    draw.text((315, 774), "COMBO FOUND", fill="white", font=font(32, True))
    image.save(path)


def find_parents(path: Path) -> None:
    image, draw = base("Start with your target")
    draw.rounded_rectangle((300, 210, 700, 390), radius=30, fill="#163d30", outline=GOLD, width=5)
    egg(draw, (390, 300), 90)
    draw.text((470, 255), "TARGET PAL", fill=CREAM, font=font(31, True))
    draw.text((470, 310), "Selected", fill=MUTED, font=font(23))
    draw.line((500, 400, 500, 510), fill=GOLD, width=7)
    draw.line((500, 510, 270, 590), fill=GOLD, width=7)
    draw.line((500, 510, 730, 590), fill=GOLD, width=7)
    card(draw, (110, 585, 430, 765), "PARENT A", "Matching pair", GREEN)
    card(draw, (570, 585, 890, 765), "PARENT B", "Matching pair", GOLD)
    draw.text((326, 830), "PARENT PAIR FOUND", fill=CREAM, font=font(30, True))
    image.save(path)


def combo_table(path: Path) -> None:
    image, draw = base("Versioned Palworld 1.0 data")
    draw.rounded_rectangle((110, 215, 890, 300), radius=18, fill="#071b17", outline=LINE, width=3)
    draw.text((145, 239), "Search parents or child...", fill=MUTED, font=font(26))
    headers = ["PARENT A", "PARENT B", "CHILD"]
    xs = [130, 405, 680]
    for x, header in zip(xs, headers):
        draw.text((x, 350), header, fill=GREEN, font=font(22, True))
    for row in range(5):
        y = 405 + row * 84
        draw.rounded_rectangle((110, y, 890, y + 66), radius=12, fill=PANEL_2 if row % 2 == 0 else "#0b211c")
        for col, x in enumerate(xs):
            draw.ellipse((x, y + 16, x + 34, y + 50), fill=[GOLD, GREEN, TEAL][col])
            draw.text((x + 48, y + 17), f"Pal {row * 3 + col + 1}", fill=CREAM, font=font(22, True))
    draw.text((305, 850), "44,851 COMBINATIONS", fill=GOLD, font=font(32, True))
    image.save(path)


def combo_list(path: Path) -> None:
    image, draw = base("Search and filter")
    draw.rounded_rectangle((110, 215, 650, 295), radius=16, fill="#071b17", outline=GOLD, width=3)
    draw.text((142, 237), "Search the combos list", fill=MUTED, font=font(25))
    draw.rounded_rectangle((680, 215, 890, 295), radius=16, fill=TEAL)
    draw.text((730, 237), "FILTER", fill="white", font=font(25, True))
    for idx, label in enumerate(["Parent pair", "Child result", "Reverse lookup", "More matches"]):
        y = 355 + idx * 115
        draw.rounded_rectangle((110, y, 890, y + 88), radius=20, fill=PANEL_2, outline=LINE, width=2)
        draw.ellipse((145, y + 22, 190, y + 67), fill=GOLD if idx % 2 == 0 else GREEN)
        draw.text((220, y + 19), label, fill=CREAM, font=font(27, True))
        draw.text((220, y + 54), "Parent A + Parent B  →  Child", fill=MUTED, font=font(21))
        draw.text((842, y + 29), "›", fill=GOLD, font=font(34, True))
    draw.text((310, 840), "FIND THE PAIR YOU NEED", fill=CREAM, font=font(27, True))
    image.save(path)


def chain(path: Path) -> None:
    image, draw = base("Shortest practical route")
    nodes = [(190, 640), (405, 470), (620, 590), (810, 330)]
    for idx in range(len(nodes) - 1):
        arrow(draw, (nodes[idx][0] + 60, nodes[idx][1]), (nodes[idx + 1][0] - 60, nodes[idx + 1][1]), GREEN if idx == 1 else GOLD, 8)
    labels = ["OWNED", "STEP 1", "STEP 2", "TARGET"]
    colors = [GREEN, GOLD, GREEN, GOLD]
    for (x, y), label, color in zip(nodes, labels, colors):
        draw.ellipse((x - 63, y - 63, x + 63, y + 63), fill=PANEL_2, outline=color, width=7)
        draw.ellipse((x - 20, y - 20, x + 20, y + 20), fill=color)
        box = draw.textbbox((0, 0), label, font=font(21, True))
        draw.text((x - (box[2] - box[0]) / 2, y + 84), label, fill=CREAM, font=font(21, True))
    draw.rounded_rectangle((210, 785, 790, 855), radius=18, fill=TEAL)
    draw.text((290, 804), "VALIDATED BREEDING CHAIN", fill="white", font=font(27, True))
    image.save(path)


def owned_pals(path: Path) -> None:
    image, draw = base("Your local Palbox")
    for idx, (x, y) in enumerate([(120, 230), (390, 230), (120, 430), (390, 430)]):
        card(draw, (x, y, x + 230, y + 150), f"OWNED {idx + 1}", "Available", GREEN if idx % 2 else GOLD)
        draw.ellipse((x + 185, y + 103, x + 217, y + 135), fill=GREEN)
        draw.line((x + 193, y + 119, x + 202, y + 128, x + 216, y + 110), fill=BG, width=5)
    arrow(draw, (660, 400), (775, 400), GOLD, 8)
    draw.rounded_rectangle((760, 270, 900, 530), radius=32, fill="#163d30", outline=GOLD, width=5)
    egg(draw, (830, 370), 90)
    draw.text((783, 460), "TARGET", fill=CREAM, font=font(24, True))
    draw.rounded_rectangle((190, 730, 810, 815), radius=20, fill=TEAL)
    draw.text((258, 753), "ROUTE USES YOUR OWNED PALS", fill="white", font=font(27, True))
    image.save(path)


def basics(path: Path) -> None:
    image, draw = base("Beginner-friendly breeding guide")
    steps = [
        ("1", "CHOOSE PARENTS", "Pick two Pals"),
        ("2", "BREED AN EGG", "Use the pair"),
        ("3", "GET THE CHILD", "Check the result"),
    ]
    for idx, (num, title, sub) in enumerate(steps):
        y = 215 + idx * 205
        draw.rounded_rectangle((130, y, 870, y + 155), radius=28, fill=PANEL_2, outline=LINE, width=3)
        draw.ellipse((165, y + 35, 250, y + 120), fill=GOLD if idx != 1 else GREEN)
        draw.text((192, y + 53), num, fill=BG, font=font(34, True))
        draw.text((285, y + 35), title, fill=CREAM, font=font(31, True))
        draw.text((285, y + 85), sub, fill=MUTED, font=font(24))
    draw.text((273, 845), "START WITH THE BASICS", fill=GOLD, font=font(31, True))
    image.save(path)


def glossary(path: Path) -> None:
    image, draw = base("Plain-English terminology")
    items = [
        ("PARENT PAL", "A Pal used in the pair", GOLD),
        ("CHILD PAL", "The result of the pair", GREEN),
        ("BREEDING CHAIN", "Several linked pairings", TEAL),
    ]
    for idx, (title, desc, color) in enumerate(items):
        y = 220 + idx * 195
        draw.rounded_rectangle((120, y, 880, y + 145), radius=25, fill=PANEL_2, outline=color, width=4)
        draw.ellipse((155, y + 38, 225, y + 108), fill=color)
        draw.text((260, y + 29), title, fill=CREAM, font=font(31, True))
        draw.text((260, y + 80), desc, fill=MUTED, font=font(23))
    draw.rounded_rectangle((260, 820, 740, 880), radius=18, fill=GOLD)
    draw.text((330, 835), "TERMS EXPLAINED", fill=BG, font=font(25, True))
    image.save(path)


BUILDERS: dict[str, Callable[[Path], None]] = {
    "pbc-calculator-01-source.png": calculator,
    "pbc-child-result-01-source.png": child_result,
    "pbc-find-parents-01-source.png": find_parents,
    "pbc-combos-44851-01-source.png": combo_table,
    "pbc-combos-list-01-source.png": combo_list,
    "pbc-chain-01-source.png": chain,
    "pbc-owned-pals-01-source.png": owned_pals,
    "pbc-basics-01-source.png": basics,
    "pbc-glossary-01-source.png": glossary,
}


def main() -> None:
    SOURCES.mkdir(parents=True, exist_ok=True)
    for filename, builder in BUILDERS.items():
        destination = SOURCES / filename
        builder(destination)
        print(f"created {destination} ({W}x{H})")


def build_contact_sheet() -> None:
    """Create a compact visual QA sheet after the final 1000x1500 pins exist."""
    final_names = [name.replace("-source", "") for name in BUILDERS]
    existing = [ASSETS / name for name in final_names if (ASSETS / name).exists()]
    if len(existing) != len(final_names):
        return
    thumb_size = (250, 375)
    margin = 20
    sheet = Image.new("RGB", (3 * thumb_size[0] + 4 * margin, 3 * thumb_size[1] + 4 * margin), CREAM)
    for index, path in enumerate(existing):
        pin = Image.open(path).convert("RGB")
        pin.thumbnail(thumb_size, Image.Resampling.LANCZOS)
        column, row = index % 3, index // 3
        x = margin + column * (thumb_size[0] + margin)
        y = margin + row * (thumb_size[1] + margin)
        sheet.paste(pin, (x, y))
    output = ASSETS / "pbc-batch-2026-07-22-27-contact-sheet.png"
    sheet.save(output, optimize=True)
    print(f"created {output}")


if __name__ == "__main__":
    main()
    build_contact_sheet()
