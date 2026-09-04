# -*- coding: utf-8 -*-
"""Turn the raw drops in `icons and images/` into the derivatives the system uses.

The raw files are phone-camera sized (up to 26 MB of PNG) and none of them are
in the aspect ratio the layout places them at. Cropping here rather than in CSS
means the web and the .potx show the same framing - PowerPoint stretches a
picture to its frame and would distort anything cropped only by `object-fit`.

Raw sources stay out of git (see .gitignore); the derivatives under assets/ are
what both generators read.
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
RAW = os.path.join(ROOT, "icons and images")
OUT = os.path.join(ROOT, "assets")

# section divider: the photo fills the right 44% of a 1280x720 canvas
SECTION_RATIO = 0.44 * 1280 / 720

# (source, target, width, aspect to crop to or None, vertical anchor 0=top 1=bottom)
# Three frames for the three chapter-opener slots, none repeating: corp-image2
# gives the sky-and-corners X and the facade lower down, corp-image5 the tower
# front. Every one is architecture - the people-at-work sources stay unused.
PHOTOS = [
    ("corp-image2.png", "photo-section.jpg", 1040, SECTION_RATIO, 0.42),
    ("corp-image2.png", "photo-facade.jpg",  1040, SECTION_RATIO, 1.0),
    ("corp-image5.png", "photo-tower.jpg",   1040, SECTION_RATIO, 0.5),
    # full-bleed closing variant: anchored on the hands, not the centre of the frame
    ("corp-image4.png", "photo-handshake.jpg", 1600, 16 / 9,      0.33),
]
MASCOTS = [
    ("icon2.png", "mascot.png", 256),
    ("icon1.png", "mascot-alt.png", 256),
]


def crop_to(im, ratio, anchor=0.5):
    """crop to `ratio` (w/h) without upscaling; `anchor` slides the frame 0..1"""
    w, h = im.size
    if w / h > ratio:
        new_w = round(h * ratio)
        x = round((w - new_w) * anchor)
        box = (x, 0, x + new_w, h)
    else:
        new_h = round(w / ratio)
        y = round((h - new_h) * anchor)
        box = (0, y, w, y + new_h)
    return im.crop(box)


def main():
    if not os.path.isdir(RAW):
        raise SystemExit("no raw folder at %s" % RAW)

    for src, dst, width, ratio, anchor in PHOTOS:
        im = Image.open(os.path.join(RAW, src)).convert("RGB")
        if ratio:
            im = crop_to(im, ratio, anchor)
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        path = os.path.join(OUT, dst)
        im.save(path, "JPEG", quality=74, optimize=True, progressive=True)
        print("  %-20s %4dx%-4d %6.1f KB" % (dst, im.width, im.height,
                                             os.path.getsize(path) / 1024))

    for src, dst, width in MASCOTS:
        im = Image.open(os.path.join(RAW, src)).convert("RGBA")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        path = os.path.join(OUT, dst)
        im.save(path, "PNG", optimize=True)
        print("  %-20s %4dx%-4d %6.1f KB" % (dst, im.width, im.height,
                                             os.path.getsize(path) / 1024))


if __name__ == "__main__":
    main()
