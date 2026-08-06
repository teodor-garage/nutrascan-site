#!/usr/bin/env python3
"""Render a TikTok-style caption sticker PNG (rounded white pill, bold black text)
matching the reference example, at the given video resolution."""
import re
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
OUT = sys.argv[1] if len(sys.argv) > 1 else "sticker.png"
TEXT = sys.argv[2] if len(sys.argv) > 2 else "L'app indispensable en 2026"

FONT_PATH = Path(__file__).parent / "fonts" / "Baloo2.ttf"
FONT_SIZE = 62
PAD_X, PAD_Y = 46, 30
MAX_WIDTH = int(W * 0.86)
LINE_SPACING = 14

# PIL can't render color emoji glyphs (shows as tofu boxes) - strip them so
# every generated sticker is guaranteed clean, no per-run visual risk.
_EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002600-\U000027BF"
    "\U0001F1E6-\U0001F1FF"
    "\U00002190-\U000021FF"
    "\U00002B00-\U00002BFF"
    "\U0000FE0F"
    "]+",
    flags=re.UNICODE,
)
TEXT = _EMOJI_RE.sub("", TEXT).strip()
TEXT = re.sub(r"\s{2,}", " ", TEXT)

img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
font = ImageFont.truetype(str(FONT_PATH), FONT_SIZE)
font.set_variation_by_name("Bold")

# wrap text to MAX_WIDTH
words = TEXT.split(" ")
lines, cur = [], ""
for w in words:
    test = (cur + " " + w).strip()
    if draw.textlength(test, font=font) <= (MAX_WIDTH - 2 * PAD_X):
        cur = test
    else:
        if cur:
            lines.append(cur)
        cur = w
if cur:
    lines.append(cur)

line_h = font.getbbox("Ag")[3] - font.getbbox("Ag")[1]
block_h = len(lines) * line_h + (len(lines) - 1) * LINE_SPACING
box_w = max(draw.textlength(l, font=font) for l in lines) + 2 * PAD_X
box_h = block_h + 2 * PAD_Y

box_x = (W - box_w) / 2
box_y = H * 0.19

radius = box_h / 2.1
draw.rounded_rectangle(
    [box_x, box_y, box_x + box_w, box_y + box_h],
    radius=radius,
    fill=(255, 255, 255, 255),
)

y = box_y + PAD_Y
for line in lines:
    lw = draw.textlength(line, font=font)
    x = box_x + (box_w - lw) / 2
    draw.text((x, y), line, font=font, fill=(10, 10, 10, 255))
    y += line_h + LINE_SPACING

img.save(OUT)
print(f"wrote {OUT} ({int(box_w)}x{int(box_h)} pill, {len(lines)} lines)")
