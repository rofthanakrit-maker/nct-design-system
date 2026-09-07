# -*- coding: utf-8 -*-
"""Structural check on a built .potx / .pptx. Run it after scripts/build.py.

The generator writes OOXML as strings, so nothing catches a stray quote, a
placeholder idx used twice, or a shape parked off the canvas until PowerPoint
opens the file and says "repair". This is the smallest thing that fails when
any of those happen:

    python scripts/check_template.py

Checks, per layout: XML parses, shape ids are unique, placeholder idx values are
unique, every shape's box overlaps the canvas, and the layout count matches
build.LAYOUTS. Deliberate bleeds (the corp corner lockup starts above y=0) pass
- only a shape entirely outside the canvas is an error.

Per slide in the demo deck: every placeholder idx it fills exists on the layout
it points at. A slide that names an idx the layout dropped keeps its text but
loses the layout's position and style, silently - which is exactly what renumbering
L12 and L13 off the chrome's reserved 10-12 did to the demo deck.
"""
import os
import sys
import zipfile
from xml.etree import ElementTree as ET

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
OUT = os.path.dirname(HERE)

from tokens import SH, SW  # noqa: E402
import build as B  # noqa: E402

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"


def _boxes(root):
    """(name, x, y, w, h) for every top-level shape that declares a transform."""
    tree = root.find(".//%scSld/%sspTree" % (P, P))
    for ch in list(tree):
        nv = ch.find(".//%scNvPr" % P)
        xf = ch.find("./%sspPr/%sxfrm" % (P, A))
        if xf is None:
            xf = ch.find("./%sgrpSpPr/%sxfrm" % (P, A))
        if nv is None or xf is None:
            continue
        o, e = xf.find("%soff" % A), xf.find("%sext" % A)
        if o is None or e is None:
            continue
        yield (nv.get("name"), int(o.get("x")), int(o.get("y")),
               int(e.get("cx")), int(e.get("cy")))


def _ph_idxs(root):
    return {ph.get("idx") for ph in root.iter("%sph" % P) if ph.get("idx") is not None}


def check(path):
    errs = []
    z = zipfile.ZipFile(path)
    names = [n for n in z.namelist() if n.endswith(".xml") or n.endswith(".rels")]
    layouts = sorted(n for n in names if n.startswith("ppt/slideLayouts/slideLayout"))
    if len(layouts) != len(B.LAYOUTS):
        errs.append("layout count %d, build.LAYOUTS has %d"
                    % (len(layouts), len(B.LAYOUTS)))
    for n in names:
        try:
            root = ET.fromstring(z.read(n))
        except ET.ParseError as e:
            errs.append("%s: XML parse error: %s" % (n, e))
            continue
        if "/_rels/" in n or not n.startswith(
                ("ppt/slideLayouts/slideLayout", "ppt/slideMasters/slideMaster",
                 "ppt/slides/slide")):
            continue
        ids, idxs = [], []
        for sp in root.iter("%scNvPr" % P):
            ids.append(sp.get("id"))
        for ph in root.iter("%sph" % P):
            if ph.get("idx") is not None:
                idxs.append(ph.get("idx"))
        for label, seq in (("shape id", ids), ("placeholder idx", idxs)):
            dupes = {v for v in seq if seq.count(v) > 1}
            if dupes:
                errs.append("%s: duplicate %s %s" % (n, label, sorted(dupes)))
        for name, x, y, w, h in _boxes(root):
            if x >= SW or y >= SH or x + w <= 0 or y + h <= 0:
                errs.append("%s: %r is entirely off-canvas at (%d,%d) %dx%d"
                            % (n, name, x, y, w, h))
    # every idx a slide fills has to exist on the layout it points at
    import re
    for n in sorted(x for x in names if x.startswith("ppt/slides/slide")
                    and "/_rels/" not in x):
        rel = "ppt/slides/_rels/%s.rels" % os.path.basename(n)
        if rel not in names:
            continue
        m = re.search(r'slideLayout(\d+)\.xml', z.read(rel).decode("utf-8"))
        if not m:
            continue
        lay = "ppt/slideLayouts/slideLayout%s.xml" % m.group(1)
        have = _ph_idxs(ET.fromstring(z.read(lay)))
        want = _ph_idxs(ET.fromstring(z.read(n)))
        missing = sorted(want - have, key=int)
        if missing:
            errs.append("%s: fills idx %s, which slideLayout%s does not define"
                        % (n, missing, m.group(1)))
    z.close()
    return errs


def main():
    targets = sys.argv[1:] or [
        os.path.join(OUT, "NCT-Slide-Template.potx"),
        os.path.join(OUT, "NCT-Slide-Template-Corp.potx"),
        os.path.join(OUT, "NCT-Slide-Template-Demo.pptx"),
        os.path.join(OUT, "NCT-Slide-Template-Corp-Demo.pptx"),
    ]
    bad = 0
    for t in targets:
        if not os.path.exists(t):
            print("MISSING  %s" % os.path.basename(t))
            bad += 1
            continue
        errs = check(t)
        bad += len(errs)
        print("%-7s  %s" % ("FAIL" if errs else "ok", os.path.basename(t)))
        for e in errs:
            print("           %s" % e)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
