# -*- coding: utf-8 -*-
"""Structural check on a built .potx / .pptx. Run it after scripts/build.py.

The generator writes OOXML as strings, so nothing catches a stray quote, a
placeholder idx used twice, or a shape parked off the canvas until PowerPoint
opens the file and says "repair". This is the smallest thing that fails when
any of those happen:

    python scripts/check_template.py

Checks, per layout: XML parses, shape ids are unique, placeholder idx values are
unique, every shape's box overlaps the canvas, and the layout count matches
build.layouts(). Deliberate bleeds (the corp corner lockup starts above y=0) pass
- only a shape entirely outside the canvas is an error.

Per slide in the demo deck: every placeholder idx it fills exists on the layout
it points at. A slide that names an idx the layout dropped keeps its text but
loses the layout's position and style, silently - which is exactly what renumbering
L12 and L13 off the chrome's reserved 10-12 did to the demo deck.
"""
import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
OUT = os.path.dirname(HERE)

from tokens import SH, SW, TEAL, TEAL_UP  # noqa: E402
import build as B  # noqa: E402

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"

# A Thai line box is not the point size. spcPct scales the FONT's line height,
# and NotoSansThai-Regular.ttf declares ascent+descent+gap = 1.511 em - read out
# of the shipped file, not estimated - so 14pt at spcPct 135% reserves 28.6pt,
# not 18.9pt. That factor is why two layouts shipped with text under the footer
# rule while every box was legally on the right side of it.
TH_LINE = 1.511
EMU_PT = 12700
# The reserved line boxes must end above the rule. Not a margin on top of that:
# the last line's descent is inside its box, so ink stops about 0.25em higher.
FOOT_GAP = 0


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


CHROME_IDX = {"10", "11", "12"}          # date, footer, page number
TEXT_PH = {"title", "ctrTitle", "subTitle", "body", None}


def _foot_rule_y(root):
    """y of the layout's footer hairline, or None if it draws none.

    The corp chrome draws no rule - its foot bar is the horizontal - and the corp
    cover draws no foot at all, so those layouts have nothing to measure against
    and are skipped rather than measured against a line that is not there.
    """
    for name, x, y, w, h in _boxes(root):
        if name == "Footer Rule":
            return y
    return None


def _text_bottom(sp):
    """Where this placeholder's PROMPT text actually ends, at Thai line heights.

    The prompt is what the layout ships and what an author overwrites line for
    line, so it is the only content a layout-level check can honestly measure.
    A slide that adds lines is on the author; a layout whose own prompt crosses
    the footer is on the template.
    """
    xf = sp.find("./%sspPr/%sxfrm" % (P, A))
    if xf is None:
        return None
    off, ext = xf.find("%soff" % A), xf.find("%sext" % A)
    if off is None or ext is None:
        return None
    top = int(off.get("y"))
    h = 0
    for p in sp.iter("%sp" % A):
        rpr = p.find("%sr/%srPr" % (A, A))
        if rpr is None or rpr.get("sz") is None:
            continue
        sz = int(rpr.get("sz")) / 100.0
        pct = p.find("%spPr/%slnSpc/%sspcPct" % (A, A, A))
        line = int(pct.get("val")) / 100000.0 if pct is not None else 1.0
        bef = p.find("%spPr/%sspcBef/%sspcPts" % (A, A, A))
        h += sz * TH_LINE * line * EMU_PT
        if bef is not None:
            h += int(bef.get("val")) / 100.0 * EMU_PT
    return top + h if h else None


def _footer_collisions(root):
    """A layout whose own prompt already crosses the footer rule.

    The weaker half of the pair: a layout prompt is one line per level, so this
    catches an oversized prompt and nothing else. What actually shipped broken
    needed a slide's line COUNT - see _slide_overruns.
    """
    rule_y = _foot_rule_y(root)
    if rule_y is None:
        return
    tree = root.find(".//%scSld/%sspTree" % (P, P))
    for sp in tree.iter("%ssp" % P):
        ph = sp.find(".//%sph" % P)
        if ph is None or ph.get("idx") in CHROME_IDX or ph.get("type") not in TEXT_PH:
            continue
        bottom = _text_bottom(sp)
        if bottom is None:
            continue
        if bottom > rule_y - FOOT_GAP:
            nv = sp.find(".//%scNvPr" % P)
            yield ("%r prompt text ends at %d, under the %d it needs to clear "
                   "the footer rule at %d"
                   % (nv.get("name") if nv is not None else "?",
                      int(bottom), rule_y - FOOT_GAP, rule_y))


def _layout_boxes(root):
    """{idx: (y, name, [(sz, lnSpc, spcBef) per outline level])} for text placeholders.

    A slide carries no geometry and no rPr - it inherits both from here - so a
    slide's text height can only be computed against its layout.
    """
    out = {}
    tree = root.find(".//%scSld/%sspTree" % (P, P))
    if tree is None:
        return out
    for sp in tree.iter("%ssp" % P):
        ph = sp.find(".//%sph" % P)
        if ph is None or ph.get("idx") in CHROME_IDX or ph.get("type") not in TEXT_PH:
            continue
        xf = sp.find("./%sspPr/%sxfrm" % (P, A))
        if xf is None or xf.find("%soff" % A) is None:
            continue
        levels = []
        for lv in sp.iter():
            if not re.match(r"%slvl\dpPr$" % re.escape(A), lv.tag):
                continue
            rpr = lv.find("%sdefRPr" % A)
            pct = lv.find("%slnSpc/%sspcPct" % (A, A))
            bef = lv.find("%sspcBef/%sspcPts" % (A, A))
            levels.append((int(rpr.get("sz")) / 100.0 if rpr is not None else 18.0,
                           int(pct.get("val")) / 100000.0 if pct is not None else 1.0,
                           int(bef.get("val")) / 100.0 if bef is not None else 0.0))
        nv = sp.find(".//%scNvPr" % P)
        out[ph.get("idx")] = (int(xf.find("%soff" % A).get("y")),
                              nv.get("name") if nv is not None else "?",
                              levels or [(18.0, 1.0, 0.0)])
    return out


def _slide_overruns(slide, layout):
    """The check that would have caught the closing slide.

    L10's contact block prompts for one line and the demo fills three. Three 14pt
    lines at spcPct 135% want 1.06in of Thai line box; the placeholder was 0.80in
    and sat 0.15in above the footer rule, so the third line - the website - was
    struck through by the hairline on the shipped render. The old check passed it,
    because the BOX was on the right side of the line even though the text was not.
    """
    rule_y = _foot_rule_y(layout)
    if rule_y is None:
        return
    boxes = _layout_boxes(layout)
    tree = slide.find(".//%scSld/%sspTree" % (P, P))
    if tree is None:
        return
    for sp in tree.iter("%ssp" % P):
        ph = sp.find(".//%sph" % P)
        if ph is None or ph.get("idx") not in boxes:
            continue
        top, name, levels = boxes[ph.get("idx")]
        h = 0.0
        for i, p in enumerate(sp.iter("%sp" % A)):
            if p.find("%sr" % A) is None:
                continue
            ppr = p.find("%spPr" % A)
            lvl = int(ppr.get("lvl")) if ppr is not None and ppr.get("lvl") else 0
            sz, line, bef = levels[min(lvl, len(levels) - 1)]
            h += sz * TH_LINE * line * EMU_PT + (bef * EMU_PT if i else 0)
        if h and top + h > rule_y - FOOT_GAP:
            yield ("%r runs to %d, past the %d it needs to clear the footer rule "
                   "at %d - split the slide or tighten the block"
                   % (name, int(top + h), rule_y - FOOT_GAP, rule_y))


def _brand_leaks(path, z, names):
    """A corp build may not contain the house accent anywhere.

    design.md: the two brands are chosen per deck and never mixed on one slide.
    That held on the web, where every rule reads --nct-accent, and did not hold
    here: accent() existed and eleven layouts named TEAL anyway, so a corp deck
    drew a #006666 full-bleed rule over #216B7F step chips two inches below it.
    Nothing caught it, because a hardcoded constant is a legal colour.

    Layouts and master only, not the demo slides' content. There is no category
    exception any more: v2 had CAT_2 = TEAL and had to wave L12's cards and L16's
    key through; the v4 category palette shares no hex with either house accent.
    """
    if "-Corp" not in os.path.basename(path):
        return []
    out = []
    for n in sorted(x for x in names
                    if x.startswith("ppt/slideLayouts/slideLayout")
                    or x.startswith("ppt/slideMasters/slideMaster")):
        root = ET.fromstring(z.read(n))
        tree = root.find(".//%scSld/%sspTree" % (P, P))
        if tree is None:
            continue
        for ch in list(tree):
            nv = ch.find(".//%scNvPr" % P)
            name = nv.get("name") if nv is not None else "?"
            xml = ET.tostring(ch, encoding="unicode")
            for house in (TEAL, TEAL_UP):
                if house in xml:
                    out.append("%s: %r carries house accent %s in a corp build - "
                               "use accent() / accent_up()" % (n, name, house))
    return out


def check(path):
    errs = []
    z = zipfile.ZipFile(path)
    names = [n for n in z.namelist() if n.endswith(".xml") or n.endswith(".rels")]
    layouts = sorted(n for n in names if n.startswith("ppt/slideLayouts/slideLayout"))
    n_expected = len(B.layouts())
    if len(layouts) != n_expected:
        errs.append("layout count %d, build.layouts() has %d"
                    % (len(layouts), n_expected))
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
        if n.startswith("ppt/slideLayouts/slideLayout"):
            for msg in _footer_collisions(root):
                errs.append("%s: %s" % (n, msg))
    errs += _brand_leaks(path, z, names)
    # every idx a slide fills has to exist on the layout it points at

    for n in sorted(x for x in names if x.startswith("ppt/slides/slide")
                    and "/_rels/" not in x):
        rel = "ppt/slides/_rels/%s.rels" % os.path.basename(n)
        if rel not in names:
            continue
        m = re.search(r'slideLayout(\d+)\.xml', z.read(rel).decode("utf-8"))
        if not m:
            continue
        lay = "ppt/slideLayouts/slideLayout%s.xml" % m.group(1)
        lay_root, sld_root = ET.fromstring(z.read(lay)), ET.fromstring(z.read(n))
        have = _ph_idxs(lay_root)
        want = _ph_idxs(sld_root)
        missing = sorted(want - have, key=int)
        if missing:
            errs.append("%s: fills idx %s, which slideLayout%s does not define"
                        % (n, missing, m.group(1)))
        for msg in _slide_overruns(sld_root, lay_root):
            errs.append("%s: %s" % (n, msg))
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
