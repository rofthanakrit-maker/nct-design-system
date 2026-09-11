# -*- coding: utf-8 -*-
"""Render preview/ from the built demo decks. Windows + PowerPoint only.

    python scripts/build.py
    python scripts/render_previews.py

Writes `preview/layout-NN.png` (one per layout, in layout order, web brand) plus
`preview/all-layouts.png` and `preview/corp-all-layouts.png` — the same contact
sheet for each brand.

Why a script rather than a hand pass: the previews in this repo went stale for a
whole release because regenerating them was manual and the build machine had no
PowerPoint. Rendering through PowerPoint itself rather than a converter also
means the sheet shows what a client will actually open — font substitution,
placeholder inheritance and all.

The export runs through PowerShell COM (`Presentations.Open` read-only, no
window, `Export`, `Close`). Nothing is saved back to the deck.
"""
import os
import subprocess
import sys
import tempfile

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
ROOT = os.path.dirname(HERE)
PREVIEW = os.path.join(ROOT, "preview")
FONT = os.path.join(ROOT, "fonts", "Kanit-Regular.ttf")

# contact-sheet geometry, matching the sheet this replaces
COLS, TILE_W, TILE_H = 2, 618, 348
MARGIN, GUTTER, CAP_H = 12, 10, 28
SHEET_BG, CAP_BG, CAP_INK = (233, 234, 235), (233, 234, 235), (51, 51, 51)

PS = r"""
$out = '{out}'
if (Test-Path $out) {{ Remove-Item -Recurse -Force $out }}
New-Item -ItemType Directory -Force $out | Out-Null
$app = New-Object -ComObject PowerPoint.Application
try {{
  $pres = $app.Presentations.Open('{src}', $true, $false, $false)
  $pres.Export($out, 'PNG', 1600, 900)
  $pres.Close()
}} finally {{
  $app.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null
}}
"""


def export(src, out):
    """Render every slide of `src` to `out` as 1600x900 PNGs, via PowerPoint."""
    r = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command",
                        PS.format(src=src, out=out)],
                       capture_output=True, text=True)
    if r.returncode:
        raise SystemExit("PowerPoint export failed for %s\n%s"
                         % (os.path.basename(src), r.stderr.strip()))
    # PowerPoint names them Slide1.PNG .. SlideN.PNG, so sort numerically
    return sorted((os.path.join(out, f) for f in os.listdir(out)),
                  key=lambda p: int("".join(c for c in os.path.basename(p) if c.isdigit())))


def sheet(paths_by_layout, dest):
    from PIL import Image, ImageDraw, ImageFont
    n = len(paths_by_layout)
    rows = (n + COLS - 1) // COLS
    pitch = TILE_H + CAP_H
    w = MARGIN * 2 + COLS * TILE_W + (COLS - 1) * GUTTER
    im = Image.new("RGB", (w, MARGIN + rows * pitch), SHEET_BG)
    d = ImageDraw.Draw(im)
    try:
        f = ImageFont.truetype(FONT, 13)
    except OSError:
        f = ImageFont.load_default()
    for i, (layout, path) in enumerate(paths_by_layout):
        x = MARGIN + (i % COLS) * (TILE_W + GUTTER)
        y = MARGIN + (i // COLS) * pitch - MARGIN
        im.paste(Image.open(path).convert("RGB").resize((TILE_W, TILE_H),
                                                        Image.LANCZOS), (x, y))
        d.text((x + 2, y + TILE_H + 7), "layout %02d" % layout, font=f, fill=CAP_INK)
    im.save(dest)
    print("wrote %-34s %dx%d" % (os.path.relpath(dest, ROOT), im.width, im.height))


def main():
    if sys.platform != "win32":
        raise SystemExit("PowerPoint COM is Windows-only; run this on the "
                         "machine that opens the decks.")
    import build as B
    order = [s[0] for s in B.demo_slides()]       # demo slide i renders layout order[i]
    os.makedirs(PREVIEW, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for brand, deck in (("web", "NCT-Slide-Template-Demo.pptx"),
                            ("corp", "NCT-Slide-Template-Corp-Demo.pptx")):
            src = os.path.join(ROOT, deck)
            if not os.path.exists(src):
                raise SystemExit("missing %s - run scripts/build.py first" % deck)
            shots = export(src, os.path.join(tmp, brand))
            if len(shots) != len(order):
                raise SystemExit("%s rendered %d slides, demo_slides() has %d"
                                 % (deck, len(shots), len(order)))
            pairs = sorted(zip(order, shots))     # into layout order
            # both brands, per layout. Corp used to exist only as a 618x348 cell
            # of the contact sheet, and eleven layouts shipped mixing #006666
            # chrome with #216B7F content because nobody could see it at that
            # size. A brand you cannot inspect is a brand you cannot check.
            pre = "" if brand == "web" else "corp-"
            for layout, path in pairs:
                dest = os.path.join(PREVIEW, "%slayout-%02d.png" % (pre, layout))
                with open(path, "rb") as fh, open(dest, "wb") as out:
                    out.write(fh.read())
            print("wrote %d %s layout previews" % (len(pairs), brand))
            sheet(pairs, os.path.join(
                PREVIEW, "all-layouts.png" if brand == "web" else "corp-all-layouts.png"))


if __name__ == "__main__":
    main()
