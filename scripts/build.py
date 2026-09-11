# -*- coding: utf-8 -*-
"""Assemble NCT-Slide-Template.potx (+ a demo .pptx) as raw OOXML."""
import os, zipfile, datetime, math
from tokens import *
from ooxml import *
import parts_theme as PT
import parts_master as PM
import parts_layouts as PL

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)          # project root (scripts/ lives one level down)
ASSETS = os.path.join(OUT, "assets")

# media part name -> source file under assets/
IMG = {
    "logo-color.png": "nct-logo-color.png",
    "logo-white.png": "nct-logo-white.png",
    "mark-color.png": "nct-mark-color.png",
    "mark-white.png": "nct-mark-white.png",
    "photo-section.jpg": "photo-section.jpg",
    "photo-facade.jpg": "photo-facade.jpg",
    "photo-tower.jpg": "photo-tower.jpg",
}

# per-layout: (builder, [image files in rId2, rId3 ... order])
#
# A function, not a constant: layout 01 is a different slide in each brand - the
# corp cover is paper with a colour lockup and a colour mark watermark, the house
# cover is a gradient with the knockout pair - so its images depend on PM.BRAND,
# which build() sets before it walks this list.
def layouts():
    l01 = ((lambda: PL.l01_title("rId2", "rId3"), ["logo-color.png", "mark-color.png"])
           if PM.BRAND == "corp" else
           (lambda: PL.l01_title("rId2", "rId3"), ["logo-white.png", "mark-white.png"]))
    return [l01] + _LAYOUTS_02_18


_LAYOUTS_02_18 = [
    (lambda: PL.l02_section("rId2", "rId3"), ["mark-white.png", "photo-section.jpg"]),
    (lambda: PL.l03_content("rId2"),       ["mark-color.png"]),
    (lambda: PL.l04_two("rId2"),           ["mark-color.png"]),
    (lambda: PL.l05_cards("rId2"),         ["mark-color.png"]),
    (lambda: PL.l06_stats("rId2"),         ["mark-color.png"]),
    (lambda: PL.l07_quote("rId2"),         ["mark-color.png"]),
    (lambda: PL.l08_image("rId2"),         ["mark-white.png"]),
    (lambda: PL.l09_table("rId2"),         ["mark-color.png"]),
    (lambda: PL.l10_closing("rId2", "rId3"), ["mark-white.png", "photo-facade.jpg"]),
    # --- v2: dense / proposal-deck layouts ---
    (lambda: PL.l11_split("rId2"),         ["mark-color.png"]),
    (lambda: PL.l12_cards_band("rId2"),    ["mark-color.png"]),
    (lambda: PL.l13_process("rId2"),       ["mark-color.png"]),
    (lambda: PL.l14_diagram("rId2"),       ["mark-color.png"]),
    (lambda: PL.l15_agenda("rId2", "rId3"), ["mark-white.png", "photo-tower.jpg"]),
    (lambda: PL.l16_dense_table("rId2"),   ["mark-color.png"]),
    # --- v3: the two layouts studied from the corporate proposal template ---
    (lambda: PL.l17_phase("rId2"),         ["mark-color.png"]),
    (lambda: PL.l18_evidence("rId2"),      ["mark-color.png"]),
    # --- v4: data layouts (slide-design-system-v4.md) ---
    (lambda: PL.l19_chart("rId2"),         ["mark-color.png"]),
]

REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
CT = "http://schemas.openxmlformats.org/package/2006/content-types"


def rels(items):
    body = "".join(
        '<Relationship Id="%s" Type="%s" Target="%s"/>'
        % (rid, typ if typ.startswith("http") else REL + "/" + typ, tgt)
        for rid, typ, tgt in items)
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            + body + '</Relationships>')


def presentation(n_slides):
    sld_ids = "".join('<p:sldId id="%d" r:id="rId%d"/>' % (256 + i, 2 + i)
                      for i in range(n_slides))
    sld_lst = '<p:sldIdLst>%s</p:sldIdLst>' % sld_ids if n_slides else ''
    dts = ('<p:defaultTextStyle><a:defPPr><a:defRPr lang="th-TH"/></a:defPPr>'
           + "".join('<a:lvl%dpPr marL="%d" algn="l"><a:defRPr sz="1800">'
                     '<a:solidFill><a:srgbClr val="%s"/></a:solidFill>'
                     '<a:latin typeface="+mn-lt"/><a:cs typeface="+mn-cs"/>'
                     '</a:defRPr></a:lvl%dpPr>' % (i, (i - 1) * 457200, INK, i)
                     for i in range(1, 10))
           + '</p:defaultTextStyle>')
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:presentation %s saveSubsetFonts="1" autoCompressPictures="0">'
            '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>'
            '%s<p:sldSz cx="%d" cy="%d"/><p:notesSz cx="6858000" cy="9144000"/>%s'
            '</p:presentation>' % (NS_P, sld_lst, SW, SH, dts))


PRES_PROPS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
              '<p:presentationPr %s/>' % NS_P)
VIEW_PROPS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
              '<p:viewPr %s><p:normalViewPr><p:restoredLeft sz="15620"/>'
              '<p:restoredTop sz="94660"/></p:normalViewPr>'
              '<p:gridSpacing cx="72008" cy="72008"/></p:viewPr>' % NS_P)
# ------------------------------------------------------------------ table style
# v2 §16: navy header, PAPER/PAPER2 banding, horizontal RULE hairlines only.
TBL_STYLE_ID = "{9C1E7B34-52D8-4A61-B0F7-3E5A2C81D046}"


def _tc_bdr(top=True, bottom=True, insideH=True):
    """no vertical rules anywhere - v2 §16 uses whitespace between columns instead"""
    hair = '<a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">%s<a:prstDash val="solid"/></a:ln>' \
           % ('<a:solidFill><a:srgbClr val="%s"/></a:solidFill>' % RULE)
    none = '<a:ln><a:noFill/></a:ln>'
    return ('<a:tcBdr><a:left>%s</a:left><a:right>%s</a:right>'
            '<a:top>%s</a:top><a:bottom>%s</a:bottom>'
            '<a:insideH>%s</a:insideH><a:insideV>%s</a:insideV></a:tcBdr>'
            % (none, none, hair if top else none, hair if bottom else none,
               hair if insideH else none, none))


def _tc_fill(hexv):
    return '<a:fill><a:solidFill><a:srgbClr val="%s"/></a:solidFill></a:fill>' % hexv


def _tc_tx(hexv, bold=False):
    b = ' b="on"' if bold else ' b="off"'
    # a:font here is CT_FontCollection -- latin, ea AND cs are all required
    return ('<a:tcTxStyle%s i="off"><a:font><a:latin typeface="+mn-lt"/>'
            '<a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:font>'
            '<a:srgbClr val="%s"/></a:tcTxStyle>' % (b, hexv))


# A function, for the same reason layouts() is: the header band is PM.dark(), and
# BRAND is only set once build() is about to run.
def table_styles():
    return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    '<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="%s">'
    '<a:tblStyle styleId="%s" styleName="NCT">'
    '<a:wholeTbl>%s<a:tcStyle>%s%s</a:tcStyle></a:wholeTbl>'
    '<a:band2H><a:tcStyle><a:tcBdr/>%s</a:tcStyle></a:band2H>'
    '<a:firstRow>%s<a:tcStyle>%s%s</a:tcStyle></a:firstRow>'
    '</a:tblStyle></a:tblStyleLst>'
    % (TBL_STYLE_ID, TBL_STYLE_ID,
       _tc_tx(INK), _tc_bdr(), _tc_fill(PAPER),
       _tc_fill(PAPER2),
       _tc_tx(PAPER, bold=True), _tc_bdr(insideH=False), _tc_fill(PM.dark())))


def mix(fg, bg, pct):
    """fg over bg at pct% - color-mix(in srgb, ...) precomputed for OOXML."""
    f = [int(fg[i:i + 2], 16) for i in (0, 2, 4)]
    b = [int(bg[i:i + 2], 16) for i in (0, 2, 4)]
    return "".join("%02X" % round(f[i] * pct / 100.0 + b[i] * (1 - pct / 100.0))
                   for i in range(3))


# ------------------------------------------------------------------ table shapes
TBL_PAD = 73152          # 0.080in cell padding, all sides (v2 §16)
ROW_HEAD = 347472        # 0.380in
ROW_BODY = 352044        # 0.385in


def _cell(text, sz, color, bold=False, algn="l", fill=None, spc=0, bar=None):
    """`bar` underlines the cell with a category colour.

    Not a fill: white on CAT_2 / CAT_3 is 3.76:1 and INK on them 3.36:1, so a filled
    category cell has no legible text colour at the 10pt floor. Not a left edge
    either - a coloured stripe down one side of a box is the side-tab tell. The
    colour goes under the value, which stays on paper. Line elements come before
    fill in tcPr.

    A `fill` cell draws its own row hairline, in PAPER. The zebra is what carries
    the eye across a dense row, and it is PAPER/PAPER2 banding - so a status
    column, whose every cell is filled, overrides the banding and three
    consecutive "ready" rows merge into one green block in the column that says
    whether the work can start. RULE on OK_T is 1.15:1 and does not separate
    them; PAPER is 1.43:1 and does. It is the same move as TEAL_UP: the same
    element lifted until it reads on the ground it actually sits on.
    """
    edge = bar or (PAPER if fill in (RISK_T, WARN_T, OK_T) else None)
    ln = ('<a:lnB w="%d" cap="flat"><a:solidFill><a:srgbClr val="%s"/></a:solidFill>'
          '<a:prstDash val="solid"/></a:lnB>' % (34925 if bar else 12700, edge)) \
        if edge else ''
    f = ('<a:solidFill><a:srgbClr val="%s"/></a:solidFill>' % fill) if fill else ''
    s = ' spc="%d"' % spc if spc else ''
    b = ' b="1"' if bold else ''
    esc = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    run = ('<a:r><a:rPr lang="th-TH" sz="%d"%s%s dirty="0">'
           '<a:solidFill><a:srgbClr val="%s"/></a:solidFill>'
           '<a:latin typeface="+mn-lt"/><a:cs typeface="+mn-cs"/></a:rPr>'
           '<a:t>%s</a:t></a:r>' % (sz, b, s, color, esc)) if esc else \
        '<a:endParaRPr lang="th-TH" sz="%d"/>' % sz
    return ('<a:tc><a:txBody><a:bodyPr/><a:lstStyle/>'
            '<a:p><a:pPr algn="%s" marL="0" indent="0"><a:buNone/></a:pPr>%s</a:p></a:txBody>'
            '<a:tcPr marL="%d" marR="%d" marT="%d" marB="%d" anchor="ctr">%s%s</a:tcPr></a:tc>'
            % (algn, run, TBL_PAD, TBL_PAD, TBL_PAD, TBL_PAD, ln, f))


def table(sid, name, idx, x, y, widths, rows):
    """rows: list of (height, [cell-xml, ...]); widths must sum to the frame width"""
    grid = "".join('<a:gridCol w="%d"/>' % w for w in widths)
    trs = "".join('<a:tr h="%d">%s</a:tr>' % (h, "".join(cells)) for h, cells in rows)
    total_h = sum(h for h, _ in rows)
    return ('<p:graphicFrame><p:nvGraphicFramePr>'
            '<p:cNvPr id="%d" name="%s"/>'
            '<p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr>'
            '<p:nvPr><p:ph type="tbl" idx="%d"/></p:nvPr></p:nvGraphicFramePr>'
            '<p:xfrm><a:off x="%d" y="%d"/><a:ext cx="%d" cy="%d"/></p:xfrm>'
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">'
            '<a:tbl><a:tblPr firstRow="1" bandRow="1"><a:tableStyleId>%s</a:tableStyleId></a:tblPr>'
            '<a:tblGrid>%s</a:tblGrid>%s</a:tbl>'
            '</a:graphicData></a:graphic></p:graphicFrame>'
            % (sid, name, idx, x, y, sum(widths), total_h, TBL_STYLE_ID, grid, trs))


def core_props(title):
    now = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<cp:coreProperties '
            'xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/" '
            'xmlns:dcterms="http://purl.org/dc/terms/" '
            'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
            '<dc:title>%s</dc:title>'
            '<dc:creator>New Computer Technology Consulting Co., Ltd.</dc:creator>'
            '<cp:lastModifiedBy>NCT</cp:lastModifiedBy>'
            '<dcterms:created xsi:type="dcterms:W3CDTF">%s</dcterms:created>'
            '<dcterms:modified xsi:type="dcterms:W3CDTF">%s</dcterms:modified>'
            '</cp:coreProperties>' % (title, now, now))


APP_PROPS = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
             '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
             'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
             '<Application>Microsoft Office PowerPoint</Application>'
             '<Company>New Computer Technology Consulting Co., Ltd.</Company>'
             '<AppVersion>16.0000</AppVersion></Properties>')


def content_types(n_slides, is_template, n_charts=0):
    main = ("template" if is_template else "presentation")
    ov = ['<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.presentationml.%s.main+xml"/>' % main,
          '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.'
          'openxmlformats-officedocument.presentationml.slideMaster+xml"/>',
          '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.theme+xml"/>',
          '<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.presentationml.presProps+xml"/>',
          '<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.presentationml.viewProps+xml"/>',
          '<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.presentationml.tableStyles+xml"/>',
          '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-'
          'package.core-properties+xml"/>',
          '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-'
          'officedocument.extended-properties+xml"/>']
    for i in range(1, len(layouts()) + 1):
        ov.append('<Override PartName="/ppt/slideLayouts/slideLayout%d.xml" ContentType='
                  '"application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>' % i)
    for i in range(1, n_slides + 1):
        ov.append('<Override PartName="/ppt/slides/slide%d.xml" ContentType="application/vnd.'
                  'openxmlformats-officedocument.presentationml.slide+xml"/>' % i)
    for i in range(1, n_charts + 1):
        ov.append('<Override PartName="/ppt/charts/chart%d.xml" ContentType="application/vnd.'
                  'openxmlformats-officedocument.drawingml.chart+xml"/>' % i)
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<Types xmlns="%s">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Default Extension="png" ContentType="image/png"/>'
            '<Default Extension="jpg" ContentType="image/jpeg"/>'
            '%s</Types>' % (CT, "".join(ov)))


# ------------------------------------------------------------------ slides
def sp_text(sid, name, phtype, idx, paras_text, **kw):
    """slide-level placeholder: no geometry, no rPr -> everything inherits the layout"""
    ph_t = ' type="%s"' % phtype if phtype else ''
    ph_i = ' idx="%d"' % idx if idx is not None else ''
    ps = []
    for t in paras_text:
        lvl = ''
        if isinstance(t, tuple):
            t, l = t
            lvl = ' lvl="%d"' % l
        esc = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        ps.append('<a:p><a:pPr%s/><a:r><a:rPr lang="th-TH" dirty="0"/><a:t>%s</a:t></a:r></a:p>' % (lvl, esc))
    return ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="%s"/>'
            '<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            '<p:nvPr><p:ph%s%s/></p:nvPr></p:nvSpPr><p:spPr/>'
            '<p:txBody><a:bodyPr/><a:lstStyle/>%s</p:txBody></p:sp>'
            % (sid, name, ph_t, ph_i, "".join(ps)))


DIA_BOX_H = 731520                       # 0.80in - the standard system box
DIA_TAB_W, DIA_TAB_H = 205740, 45720     # the L12 card tab, reused on added boxes
DIA_PAD_Y, DIA_PAD_X = 457200, 274320    # zone padding: symmetric so every box
                                          # inside sits on the line of those outside


def _dia_box(sid, name, x, y, w, text, cat=None):
    """v2 §14 standard part: square corners, 0.80in tall, flat, 12pt label.

    Tone is the distinction: no category means a system that already exists, so
    it takes the same dark fill L11 uses for the current state. A category means
    this project adds it, so it goes light with the category on its edge and its tab.
    """
    if cat:
        box = shape(sid, name, x, y, w, DIA_BOX_H, solid(PAPER), prst="rect",
                    line='<a:ln w="12700">%s</a:ln>' % solid(cat),
                    body=txbody([para(text, sz=T_DENSEBODY, color=INK, algn="ctr",
                                      line=110000)], anchor="ctr"))
        tab = shape(sid + 100, name + " Tab", x + 114300, y + 114300,
                    DIA_TAB_W, DIA_TAB_H, solid(cat))
        return [box, tab]
    return [shape(sid, name, x, y, w, DIA_BOX_H, solid(PM.dark()), prst="rect",
                  body=txbody([para(text, sz=T_DENSEBODY, color=PAPER, algn="ctr",
                                    line=110000)], anchor="ctr"))]


def _dia_link(sid, name, x, y, w):
    """straight connector, solid triangle head, TEAL 1.25pt -- right angles only"""
    return shape(sid, name, x, y, w, 0, nofill(), prst="line",
                 line=('<a:ln w="15875" cap="flat">%s<a:prstDash val="solid"/>'
                       '<a:tailEnd type="triangle" w="med" len="med"/></a:ln>' % solid(TEAL)))


def _diagram_kit(sid):
    """the demo drawing on L14 -- shows every part of the standard kit in use"""
    BW = 2011680
    # centred in the layout's drawing region (2.200in .. 5.650in)
    BY = (2011680 + 5166360) // 2 - DIA_BOX_H // 2
    xs = [1143000, 3840480, 6537960, 9235440]
    out = []
    # the zone the flow passes through - flat tint, no outline. The dashed frame
    # this replaces was the only dashed line in the system.
    zx, zw = xs[1] - DIA_PAD_X, (xs[2] + BW + DIA_PAD_X) - (xs[1] - DIA_PAD_X)
    out.append(shape(sid, "Group Zone", zx, BY - DIA_PAD_Y, zw,
                     DIA_BOX_H + 2 * DIA_PAD_Y, solid(PAPER2)))
    out.append(shape(sid + 1, "Group Label", zx + DIA_PAD_X, BY - DIA_PAD_Y + 160020,
                     3200400, 228600, nofill(),
                     body=txbody([para("ส่วนที่เพิ่มใหม่", sz=T_DENSEBODY, color=TEAL,
                                       bold=True, spc=120, line=100000)], anchor="ctr")))
    sid += 2
    labels = [("ระบบ ERP ปัจจุบัน", None), ("คิวเอกสารกลาง", CAT_1),
              ("ตัวตรวจกฎธุรกิจ", CAT_2), ("ระบบบัญชี", None)]
    for i, (t, cat) in enumerate(labels):
        out += _dia_box(sid, "Box %d" % (i + 1), xs[i], BY, BW, t, cat); sid += 1
    for i in range(3):
        gx = xs[i] + BW + 114300
        out.append(_dia_link(sid, "Link %d" % (i + 1), gx, BY + DIA_BOX_H // 2, 457200))
        sid += 1
    # the label rides above the line, so it needs no fill to mask it
    out.append(shape(sid, "Edge Label", xs[1] + BW - 45720, BY + 45720, 822960, 228600,
                     nofill(),
                     body=txbody([para("ผ่านกฎ", sz=T_DENSECELL, color=INK2, algn="ctr",
                                       line=100000)], anchor="ctr")))
    return out


NS_C = 'xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"'


def _chart_txpr(sz, color, bold=False):
    b = ' b="1"' if bold else ''
    return ('<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="%d"%s>%s'
            '<a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/>'
            '</a:defRPr></a:pPr><a:endParaRPr lang="th-TH"/></a:p></c:txPr>'
            % (sz, b, solid(color)))


def nice_step(vmax):
    """1 / 2 / 5 step giving four to six ticks from 0. PowerPoint's own axis put
    eleven on a 0-9 range. Same rule as niceTicks in web/src/chart.tsx."""
    raw = (vmax or 1) / 5.0
    mag = 10 ** math.floor(math.log10(raw))
    return next(m * mag for m in (1, 2, 5, 10) if m * mag >= raw)


def column_chart(name, categories, values, highlight):
    """v4 §3 column chart, emphasis form: the highlighted bar in CAT_1 with its
    value on the cap, the rest CAT_MUTE. Hairline RULE gridlines, a CAT_MUTE
    baseline, 12pt INK2 ticks, no legend for one series.

    Every muted bar carries its value too, 12pt INK2 under the 14pt INK one:
    CAT_MUTE is 2.5:1 on paper, under the 3:1 a data mark needs, and no grey
    that clears 3:1 stays clear of CAT_3 (tokens.py). The label is the relief.

    Literal values (c:strLit / c:numLit), no embedded workbook: the demo shows
    the styling to copy. ponytail: "Edit Data" has nothing to open on this one
    chart - a real slide inserts its own chart on the placeholder, which starts
    from the theme accents v4 set. Embed a workbook if the demo must be editable.
    """
    ln = lambda c: '<a:ln w="9525">%s</a:ln>' % solid(c)
    pts = lambda vals: "".join('<c:pt idx="%d"><c:v>%s</c:v></c:pt>' % (i, v)
                               for i, v in enumerate(vals))
    n = len(values)
    # bars stay under 0.25in: ~6.9in of plot / n categories, gap = band - bar
    gap = min(500, round((6.9 / n - 0.25) / 0.25 * 100))
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<c:chartSpace %s xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            '<c:roundedCorners val="0"/><c:chart><c:autoTitleDeleted val="1"/>'
            '<c:plotArea><c:layout/><c:barChart><c:barDir val="col"/>'
            '<c:grouping val="clustered"/><c:varyColors val="0"/>'
            '<c:ser><c:idx val="0"/><c:order val="0"/><c:tx><c:v>%s</c:v></c:tx>'
            '<c:spPr>%s</c:spPr><c:invertIfNegative val="0"/>'
            '<c:dPt><c:idx val="%d"/><c:invertIfNegative val="0"/><c:bubble3D val="0"/>'
            '<c:spPr>%s</c:spPr></c:dPt>'
            '<c:dLbls><c:dLbl><c:idx val="%d"/><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>%s'
            '<c:dLblPos val="outEnd"/><c:showLegendKey val="0"/><c:showVal val="1"/>'
            '<c:showCatName val="0"/><c:showSerName val="0"/><c:showPercent val="0"/>'
            '<c:showBubbleSize val="0"/></c:dLbl>'
            '<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>%s<c:dLblPos val="outEnd"/>'
            '<c:showLegendKey val="0"/><c:showVal val="1"/><c:showCatName val="0"/>'
            '<c:showSerName val="0"/><c:showPercent val="0"/><c:showBubbleSize val="0"/></c:dLbls>'
            '<c:cat><c:strLit><c:ptCount val="%d"/>%s</c:strLit></c:cat>'
            '<c:val><c:numLit><c:formatCode>General</c:formatCode><c:ptCount val="%d"/>%s'
            '</c:numLit></c:val></c:ser>'
            '<c:gapWidth val="%d"/><c:overlap val="0"/>'
            '<c:axId val="19001"/><c:axId val="19002"/></c:barChart>'
            '<c:catAx><c:axId val="19001"/><c:scaling><c:orientation val="minMax"/></c:scaling>'
            '<c:delete val="0"/><c:axPos val="b"/><c:numFmt formatCode="General" sourceLinked="0"/>'
            '<c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/>'
            '<c:spPr>%s</c:spPr>%s<c:crossAx val="19002"/><c:crosses val="autoZero"/>'
            '<c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/>'
            '<c:noMultiLvlLbl val="0"/></c:catAx>'
            '<c:valAx><c:axId val="19002"/><c:scaling><c:orientation val="minMax"/>'
            '<c:min val="0"/></c:scaling><c:delete val="0"/><c:axPos val="l"/>'
            '<c:majorGridlines><c:spPr>%s</c:spPr></c:majorGridlines>'
            '<c:numFmt formatCode="#,##0" sourceLinked="0"/>'
            '<c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/>'
            '<c:spPr><a:ln><a:noFill/></a:ln></c:spPr>%s<c:crossAx val="19001"/>'
            '<c:crosses val="autoZero"/><c:crossBetween val="between"/>'
            '<c:majorUnit val="%g"/></c:valAx>'
            '<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr></c:plotArea>'
            '<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart>'
            '<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>%s</c:chartSpace>'
            % (NS_C, name, solid(CAT_MUTE), highlight, solid(CAT_1), highlight,
               _chart_txpr(T_BODY3, INK, bold=True), _chart_txpr(T_LABEL, INK2),
               n, pts(categories), n, pts(values), gap,
               ln(CAT_MUTE), _chart_txpr(T_LABEL, INK2), ln(RULE), _chart_txpr(T_LABEL, INK2),
               nice_step(max(values)), _chart_txpr(T_LABEL, INK2)))


def chart_frame(sid, name, idx, x, y, w, h, rid):
    """the graphicFrame that fills a layout's chart placeholder"""
    return ('<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="%d" name="%s"/>'
            '<p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr>'
            '<p:nvPr><p:ph type="chart" idx="%d"/></p:nvPr></p:nvGraphicFramePr>'
            '<p:xfrm><a:off x="%d" y="%d"/><a:ext cx="%d" cy="%d"/></p:xfrm>'
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">'
            '<c:chart %s r:id="%s"/></a:graphicData></a:graphic></p:graphicFrame>'
            % (sid, name, idx, x, y, w, h, NS_C, rid))


def slide(shapes):
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:sld %s>' % NS_P
            + spTree("", shapes)
            + '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>')


def demo_slides():
    """The demo runs in argument order, not layout-number order.

    It is the file people copy, so it has to teach an argument: cover, agenda,
    the problem, what changes, how the work is done, what is in scope, who is
    doing it, what it costs, what happens next. Each layout still appears
    exactly once - the 1:1 parity with the .potx is the point.
    """
    S = []
    # ---------------------------------------------------------------- 1 · cover
    S.append((1, [sp_text(2, "Title", "ctrTitle", None,
                          ["ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"]),
                  sp_text(3, "Subtitle", "subTitle", 1,
                          ["New Computer Technology Consulting Co., Ltd. · 2569"])]))
    # ---------------------------------------------------------------- 2 · agenda (L15)
    # six lines, the documented ceiling, on the corrected list y
    S.append((15, [sp_text(2, "Num", "body", 1, ["00"]),
                   sp_text(3, "Title", "title", None, ["หัวข้อนำเสนอ"]),
                   sp_text(4, "List", "body", 2,
                           ["บริบทและปัญหาที่พบ", "ผลลัพธ์ที่ข้อเสนอนี้ให้",
                            "วิธีการทำงานและสถาปัตยกรรม", "ขอบเขตงานรายกระบวนการ",
                            "ทีมงานและประสบการณ์", "แพ็กเกจและงบประมาณ"])]))
    # ---------------------------------------------------------------- 3 · chapter 01 (L02)
    S.append((2, [sp_text(2, "Number", "body", 1, ["01"]),
                  sp_text(3, "Title", "title", None, ["บริบทและปัญหา"]),
                  sp_text(4, "Desc", "body", 2,
                          ["สิ่งที่เราพบจากการสำรวจงานบัญชีของท่านสองสัปดาห์"])]))
    # ---------------------------------------------------------------- 4 · the problem (L11)
    S.append((11, [sp_text(2, "Title", "title", None, ["สภาพระบบบัญชีปัจจุบัน"]),
                   sp_text(3, "CtxK", "body", 1, ["สภาพปัจจุบัน"]),
                   sp_text(4, "CtxB", "body", 2,
                           ["คีย์เอกสารซ้ำสามระบบ ไม่มีจุดตรวจกลาง",
                            ("เอกสารเข้าเฉลี่ย 1,200 ใบต่อเดือน", 1),
                            "ปิดงบล่าช้าเฉลี่ย 6 วันทำการ",
                            "ไม่มี audit trail ของการแก้ไขรายการ"]),
                   sp_text(5, "OutK", "body", 3, ["สิ่งที่จะเกิดขึ้น"]),
                   sp_text(6, "OutB", "body", 4,
                           ["คีย์จุดเดียว ระบบกระจายต่อให้อัตโนมัติ",
                            ("ลดเวลาคีย์ต่อใบจาก 4 นาที เหลือ 40 วินาที", 1),
                            "ปิดงบภายใน 2 วันทำการ",
                            "บันทึกทุกการแก้ไขพร้อมผู้ทำและเวลา"]),
                   sp_text(7, "TkL", "body", 5, ["สรุป"]),
                   sp_text(8, "TkC", "body", 6,
                           ["ปัญหาหลักคือการคีย์ซ้ำ ไม่ใช่จำนวนเอกสาร"])]))
    # ------------------------------------------------ 4b · the problem, measured (L19)
    # emphasis, not six colours: the story is one month. A third tuple element
    # carries the slide's chart parts; build() gives each the next rId from rId2.
    S.append((19, [sp_text(2, "Title", "title", None,
                           ["ปิดงบ พ.ค. ใช้ 9 วัน นานสุดในรอบครึ่งปี"]),
                   chart_frame(3, "Close Days", 1, MX, BODY_Y, 8 * COL + 7 * GUT,
                               3474720, "rId2"),
                   sp_text(4, "Fig", "body", 2, ["9 วัน"]),
                   sp_text(5, "FigL", "body", 3, ["เวลาปิดงบ พ.ค. 2569 · เป้าหมาย 2 วัน"]),
                   sp_text(6, "Ins", "body", 4,
                           ["เดือนที่เอกสารเข้ามากสุด คือเดือนที่ปิดงบนานสุด",
                            "ทุกเดือนเกินเป้าอย่างน้อยสามเท่า",
                            "ความล่าช้าเกิดที่ขั้นกระทบยอด ไม่ใช่ขั้นคีย์"]),
                   sp_text(7, "Src", "body", 5, ["ระบบบัญชีของลูกค้า · ม.ค.–มิ.ย. 2569 · หน่วย: วันทำการ"]),
                   sp_text(8, "TkL", "body", 6, ["สรุป"]),
                   sp_text(9, "TkC", "body", 7,
                           ["เวลาปิดงบแปรตามปริมาณเอกสาร การลดงานคีย์ซ้ำจึงลดเวลาปิดงบได้จริง"])],
              [column_chart("เวลาปิดงบ", ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
                            [6, 7, 6, 8, 9, 7], 4)]))
    # ---------------------------------------------------------------- 5 · before/after (L04)
    S.append((4, [sp_text(2, "Title", "title", None, ["ก่อนและหลังใช้บริการ"]),
                  sp_text(3, "L", "body", 1,
                          ["ก่อน", ("ระบบล่มบ่อย ไม่มีคนดูแลประจำ", 1),
                           ("ค่าใช้จ่ายไม่แน่นอน", 1)]),
                  sp_text(4, "R", "body", 2,
                          ["หลัง", ("มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", 1),
                           ("ค่าใช้จ่ายคงที่ต่อเดือน", 1)])]))
    # ---------------------------------------------------------------- 6 · outcomes (L12)
    cards12 = [("ลดงานคีย์ซ้ำ", "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ"),
               ("ตรวจสอบได้", "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง"),
               ("ปิดงบเร็วขึ้น", "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน"),
               ("ขยายต่อได้", "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม")]
    sh12 = [sp_text(2, "Title", "title", None, ["สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"])]
    sid = 3
    for i, (h, b) in enumerate(cards12):
        sh12.append(sp_text(sid, "N%d" % i, "body", PL.PH_FREE + i*3, ["0%d" % (i + 1)])); sid += 1
        sh12.append(sp_text(sid, "H%d" % i, "body", PL.PH_FREE + i*3 + 1, [h])); sid += 1
        sh12.append(sp_text(sid, "B%d" % i, "body", PL.PH_FREE + i*3 + 2, [b])); sid += 1
    sh12.append(sp_text(sid, "BL", "body", PL.PH_FREE + 12, ["สรุป"])); sid += 1
    sh12.append(sp_text(sid, "BC", "body", PL.PH_FREE + 13,
                        ["ทั้งสี่ข้อมาจากการแก้จุดเดียวกัน คือรวมจุดรับเอกสาร"]))
    S.append((12, sh12))
    # ---------------------------------------------------------------- 7 · chapter 02 (L08)
    S.append((8, [sp_text(2, "Title", "title", None, ["วิธีการทำงาน"]),
                  sp_text(3, "Cap", "body", 2,
                          ["กระบวนการ สถาปัตยกรรม และขอบเขตที่ตกลงกัน"])]))
    # ---------------------------------------------------------------- 8 · process (L13)
    steps13 = [("รับเอกสาร", "สแกนหรือรับไฟล์เข้าคิวกลาง"),
               ("อ่านข้อมูล", "ดึงฟิลด์สำคัญ ตรวจกับต้นทาง"),
               ("ตรวจสอบ", "กฎธุรกิจและวงเงินอนุมัติ"),
               ("บันทึก", "ลงระบบบัญชีพร้อม audit trail"),
               ("กระทบยอด", "จับคู่อัตโนมัติ ส่งรายงาน")]
    sh13 = [sp_text(2, "Title", "title", None, ["กระบวนการที่เสนอ"]),
            sp_text(3, "Sub", "body", 1, ["ห้าขั้นตอน ทำงานต่อเนื่องโดยไม่ต้องคีย์ซ้ำ"])]
    sid = 4
    for i, (h, b) in enumerate(steps13):
        sh13.append(sp_text(sid, "C%d" % i, "body", PL.PH_FREE + i*3, [str(i + 1)])); sid += 1
        sh13.append(sp_text(sid, "H%d" % i, "body", PL.PH_FREE + i*3 + 1, [h])); sid += 1
        sh13.append(sp_text(sid, "B%d" % i, "body", PL.PH_FREE + i*3 + 2, [b])); sid += 1
    sh13.append(sp_text(sid, "RL", "body", PL.PH_FREE + 15, ["ผลลัพธ์"])); sid += 1
    sh13.append(sp_text(sid, "RC", "body", PL.PH_FREE + 16,
                        ["เอกสารหนึ่งใบผ่านครบห้าขั้นโดยไม่มีการคีย์ซ้ำเลย"]))
    S.append((13, sh13))
    # ---------------------------------------------------------------- 9 · architecture (L14)
    sh14 = [sp_text(2, "Title", "title", None, ["ภาพรวมสถาปัตยกรรมระบบ"]),
            sp_text(3, "Sub", "body", 1,
                    ["ใช้ชุดชิ้นส่วนมาตรฐาน — กล่องมุมตรง เส้นหักมุมฉาก ไม่มีเงา"]),
            sp_text(4, "Leg", "body", 2,
                    ["กล่องทึบ = ระบบที่มีอยู่  ·  กล่องมีสีหมวด = ส่วนที่เพิ่ม  ·  "
                     "เส้นทึบ = ข้อมูลไหลอัตโนมัติ"])]
    sh14.append(sp_text(5, "TL", "body", 3, ["สรุป"]))
    sh14.append(sp_text(6, "TC", "body", 4,
                        ["ระบบเดิมไม่ถูกแก้ ของใหม่แทรกเป็นคิวและตัวตรวจกฎคั่นกลางเท่านั้น"]))
    sh14 += _diagram_kit(10)
    S.append((14, sh14))
    # ---------------------------------------------------------------- 10 · scope (L16)
    w16 = [594360, 3200400, 1965960, 1600200, 1554480, 1447800]
    head16 = ["#", "กระบวนการ", "หมวด", "ปริมาณ/เดือน", "ความพร้อม", "รอบที่ทำ"]
    cats16 = [CAT_1, CAT_2, CAT_3, CAT_4]
    body16 = [
        ("บันทึกใบแจ้งหนี้ซื้อ", "AP", "420 ใบ", ("พร้อม", OK, OK_T), "รอบ 1"),
        ("กระทบยอดใบสั่งซื้อ", "AP", "380 ใบ", ("พร้อม", OK, OK_T), "รอบ 1"),
        ("ออกใบแจ้งหนี้ขาย", "AR", "260 ใบ", ("พร้อม", OK, OK_T), "รอบ 1"),
        ("ติดตามลูกหนี้ค้างชำระ", "AR", "150 ราย", ("รอยืนยัน", WARN, WARN_T), "รอบ 2"),
        ("บันทึกค่าใช้จ่ายพนักงาน", "AP", "310 ใบ", ("รอยืนยัน", WARN, WARN_T), "รอบ 2"),
        ("ปรับปรุงบัญชีสิ้นเดือน", "GL", "45 รายการ", ("ติดข้อจำกัด", RISK, RISK_T), "รอบ 3"),
        ("กระทบยอดธนาคาร", "GL", "12 บัญชี", ("พร้อม", OK, OK_T), "รอบ 1"),
        ("รายงานภาษีซื้อ-ขาย", "GL", "2 ชุด", ("ติดข้อจำกัด", RISK, RISK_T), "รอบ 3"),
    ]
    # slots are assigned in order, never skipped - the order is what was validated
    catmap = {"AP": 0, "AR": 1, "GL": 2}
    rows16 = [(ROW_HEAD, [_cell(t, T_TBLHEAD, PAPER, bold=True, spc=60,
                                algn="ctr" if i in (0, 2, 3, 4, 5) else "l")
                          for i, t in enumerate(head16)])]
    for n, (proc, cat, qty, (st, stc, stt), rnd) in enumerate(body16, 1):
        c = cats16[catmap[cat]]
        rows16.append((ROW_BODY, [
            # the category rides the cell's leading edge; the number stays on paper
            _cell(str(n), T_DENSECELL, INK, bold=True, algn="ctr", bar=c),
            _cell(proc, T_DENSECELL, INK),
            _cell(cat, T_DENSECELL, c, bold=True, algn="ctr"),
            _cell(qty, T_DENSECELL, INK, algn="ctr"),
            _cell(st, T_DENSECELL, stc, bold=True, algn="ctr", fill=stt),
            _cell(rnd, T_DENSECELL, INK, algn="ctr"),
        ]))
    S.append((16, [sp_text(2, "Title", "title", None, ["ขอบเขตงานรายกระบวนการ"]),
                   sp_text(3, "Intro", "body", 2,
                           ["แปดกระบวนการที่อยู่ในขอบเขต แบ่งตามหมวดและรอบส่งมอบ"]),
                   table(4, "Scope Table", 1, MX, 2011680, w16, rows16),
                   sp_text(5, "Key", "body", 3,
                           ["■ AP · เจ้าหนี้   ■ AR · ลูกหนี้   ■ GL · บัญชีแยกประเภท"]),
                   sp_text(6, "Foot", "body", 4,
                           ["ปริมาณเป็นค่าเฉลี่ยจากข้อมูล 3 เดือนล่าสุด"]),
                   sp_text(7, "TL", "body", 5, ["สรุป"]),
                   sp_text(8, "TC", "body", 6,
                           ["หกในแปดกระบวนการเริ่มได้ทันทีในรอบ 1-2 "
                            "อีกสองรายการรอสิทธิ์เข้าระบบ ยืนยันภายใน 15 วัน"])]))
    # ---------------------------------------------------------------- 11 · services (L03)
    S.append((3, [sp_text(2, "Title", "title", None, ["ขอบเขตบริการของ NCT"]),
                  sp_text(3, "Body", "body", 1,
                          ["วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
                           ("ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", 1),
                           "ดูแลระบบต่อเนื่องแบบ Managed Service",
                           ("มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", 1),
                           "ให้คำปรึกษาการย้ายระบบขึ้นคลาวด์"])]))
    # ---------------------------------------------------------------- 12 · pillars (L05)
    S.append((5, [sp_text(2, "Title", "title", None, ["สามเสาหลักของบริการ"]),
                  sp_text(3, "C1H", "body", 1, ["Infrastructure"]),
                  sp_text(4, "C1B", "body", 2, ["ออกแบบและติดตั้งเครือข่าย เซิร์ฟเวอร์ และระบบสำรองข้อมูล"]),
                  sp_text(5, "C2H", "body", 3, ["Managed Service"]),
                  sp_text(6, "C2B", "body", 4, ["ดูแลระบบรายเดือน พร้อมทีมซัพพอร์ตและรายงานสุขภาพระบบ"]),
                  sp_text(7, "C3H", "body", 5, ["Cloud & Security"]),
                  sp_text(8, "C3B", "body", 6, ["ย้ายระบบขึ้นคลาวด์ และวางมาตรการความปลอดภัยตามมาตรฐาน"])]))
    # ---------------------------------------------------------------- 13 · figures (L06)
    S.append((6, [sp_text(2, "Title", "title", None, ["ตัวเลขที่บอกเรื่องเรา"]),
                  sp_text(3, "F1", "body", 1, ["12"]),
                  sp_text(4, "F1L", "body", 2, ["ปีที่ให้บริการองค์กรไทย"]),
                  sp_text(5, "F2", "body", 3, ["99.9%"]),
                  sp_text(6, "F2L", "body", 4, ["Uptime เฉลี่ยของระบบที่ดูแล"]),
                  sp_text(7, "F3", "body", 5, ["24/7"]),
                  sp_text(8, "F3L", "body", 6, ["ทีมเฝ้าระวังและตอบกลับ"]),
                  sp_text(9, "FN", "body", 7, ["ข้อมูล ณ ไตรมาส 1 ปี 2569"])]))
    # ---------------------------------------------------------------- 14 · quote (L07)
    S.append((7, [sp_text(2, "Q", "body", 1,
                          ["ระบบไม่ล่มอีกเลยตั้งแต่เปลี่ยนมาใช้ทีมนี้ดูแล และเราวางแผนงบประมาณได้ล่วงหน้าจริง ๆ"]),
                  sp_text(3, "A", "body", 2, ["คุณสมชาย ป. — ผู้จัดการฝ่ายไอที, บริษัทตัวอย่าง จำกัด"])]))
    # ---------------------------------------------------------------- 15 · money (L09)
    # the price row belongs here, and the column the takeaway argues for is marked
    w9 = [3181080, 2394040, 2394040, 2394040]
    REC = 2                                   # "Business"
    head9 = ["", "Essential", "Business", "Enterprise"]
    body9 = [
        ["ชั่วโมงซัพพอร์ต", "จันทร์–ศุกร์ 9–18", "จันทร์–เสาร์ 8–20", "24/7"],
        ["เวลาตอบกลับ (SLA)", "8 ชั่วโมง", "4 ชั่วโมง", "1 ชั่วโมง"],
        ["มอนิเตอร์ระบบ", "รายวัน", "ต่อเนื่อง", "ต่อเนื่อง + แจ้งเตือน"],
        ["รายงานสุขภาพระบบ", "ไตรมาส", "รายเดือน", "รายสัปดาห์"],
        ["ค่าบริการต่อเดือน", "18,000 บาท", "32,000 บาท", "65,000 บาท"],
    ]
    A9 = PM.accent()
    # the wash under the recommended column. Marking only the HEADER makes the
    # argument die one row in - the column the takeaway is arguing for looked
    # exactly like the two it beat from the first body cell down. Two mixes, not
    # one, so the zebra step stays inside the column and the rows still track:
    # the same thing .nct-table td[data-rec] does with two color-mix rules.
    REC_1, REC_2 = mix(A9, PAPER, 8), mix(A9, PAPER2, 8)
    rows9 = [(ROW_HEAD, [_cell(t, T_TBLHEAD, PAPER, bold=True, spc=60,
                               algn="l" if i == 0 else "ctr",
                               fill=A9 if i == REC else None)
                         for i, t in enumerate(head9)])]
    for r_i, r in enumerate(body9):
        price = r_i == len(body9) - 1
        rows9.append((ROW_BODY, [_cell(t, T_DENSECELL, INK, bold=(i == 0 or price),
                                       algn="l" if i == 0 else "ctr",
                                       fill=(REC_1 if r_i % 2 == 0 else REC_2)
                                       if i == REC else None)
                                 for i, t in enumerate(r)]))
    rec_x = MX + sum(w9[:REC])
    S.append((9, [sp_text(2, "Title", "title", None, ["แพ็กเกจและงบประมาณ"]),
                  sp_text(3, "Intro", "body", 2,
                          ["เลือกระดับบริการให้ตรงกับขนาดองค์กร ราคาไม่รวมภาษีมูลค่าเพิ่ม"]),
                  table(4, "Package Table", 1, MX, 2286000, w9, rows9),
                  # the cap rule over the recommended column, in the same vocabulary
                  # the slide title's rule uses
                  shape(9, "Recommended Cap", rec_x, 2286000 - RULE_H, w9[REC], RULE_H,
                        solid(A9)),
                  sp_text(5, "TL", "body", 3, ["สรุป"]),
                  sp_text(6, "TC", "body", 4,
                          ["องค์กร 50-200 ที่นั่งเลือก Business เป็นค่าเริ่มต้น "
                           "ตอบกลับ 4 ชั่วโมงครอบคลุมงานปิดงบรายเดือน"])]))
    # ------------------------------------------------- 16 · a phase of the plan (L17)
    S.append((17, [sp_text(2, "Title", "title", None, ["5. Implementation Stage"]),
                   sp_text(3, "KAL", "body", 1, ["Key Activity :"]),
                   sp_text(4, "KAV", "body", 2,
                           ["ตั้งค่าสภาพแวดล้อม ติดตั้งฮาร์ดแวร์และซอฟต์แวร์"]),
                   sp_text(5, "PL", "body", 3, ["Participant :"]),
                   sp_text(6, "PV", "body", 4,
                           ["NCT Infra Engineer, ทีมไอทีลูกค้า, Business Analyst"]),
                   sp_text(7, "PN", "body", 5, ["01"]),
                   sp_text(8, "PP", "body", 6, ["Preparation Phase"]),
                   sp_text(9, "PI", "body", 7,
                           ["สรุปสเปกเครื่องและบริการคลาวด์ที่ต้องเตรียมให้พร้อมก่อนเริ่มงานพัฒนา"]),
                   sp_text(10, "PB", "body", 8,
                           ["PRD · 4 คอร์ / 16GB / SSD 300GB",
                            "QA · 4 คอร์ / 16GB / SSD 150GB",
                            "Windows Server 2022 ทั้งสองเครื่อง",
                            "Lambda, EC2 และ Cognito เปิดทั้งสองสภาพแวดล้อม"])]))
    # --------------------------------------------------- 17 · training evidence (L18)
    w18 = [1600200, 3200400, 1188720, 2103120]
    head18 = ["หลักสูตร", "วัตถุประสงค์", "ระยะเวลา", "เงื่อนไขการจัด"]
    body18 = [("1. การใช้งานสำหรับผู้ใช้", "เข้าใจการใช้งานระบบในงานประจำวัน",
               "4 ชั่วโมง", "จัดครั้งเดียว ที่สำนักงานหรือออนไลน์"),
              ("2. การดูแลสำหรับผู้ดูแลระบบ", "เข้าใจการบำรุงรักษาและแก้ปัญหาเบื้องต้น",
               "4 ชั่วโมง", "จัดครั้งเดียว ที่สำนักงานหรือออนไลน์")]
    rows18 = [(ROW_HEAD, [_cell(t, T_TBLHEAD, PAPER, bold=True, spc=60,
                                algn="ctr" if i == 2 else "l")
                          for i, t in enumerate(head18)])]
    for course, aim, hrs, cond in body18:
        rows18.append((ROW_BODY, [_cell(course, T_DENSECELL, INK, bold=True),
                                  _cell(aim, T_DENSECELL, INK),
                                  _cell(hrs, T_DENSECELL, INK, algn="ctr"),
                                  _cell(cond, T_DENSECELL, INK)]))
    S.append((18, [sp_text(2, "Title", "title", None, ["8. Project Training"]),
                   sp_text(3, "K", "body", 1, ["วัตถุประสงค์ของการอบรม"]),
                   table(4, "Training Table", 2, MX, 2240280, w18, rows18),
                   sp_text(5, "TL", "body", 3, ["สรุป"]),
                   sp_text(6, "TC", "body", 4,
                           ["อบรมสองหลักสูตร รวม 8 ชั่วโมง "
                            "จบภายในสัปดาห์เดียวก่อนวันขึ้นระบบ"]),
                   sp_text(7, "C1", "body", PL.PH_FREE, ["อบรมที่สำนักงานลูกค้า 20-50 คน"]),
                   sp_text(8, "C2", "body", PL.PH_FREE + 2,
                           ["อบรมกลุ่มย่อยในห้องประชุม 2-20 คน"]),
                   sp_text(9, "C3", "body", PL.PH_FREE + 4,
                           ["อบรมออนไลน์ผ่าน MS Teams"])]))
    # ---------------------------------------------------------------- 18 · the ask (L10)
    S.append((10, [sp_text(2, "Title", "title", None, ["ขอบคุณครับ"]),
                   sp_text(3, "NSL", "body", 1, ["ขั้นตอนถัดไป"]),
                   sp_text(4, "NS", "body", 2,
                           ["ยืนยันแพ็กเกจและขอบเขตงานรายกระบวนการ",
                            "เปิดสิทธิ์เข้าระบบให้ทีมสำรวจ 2 รายการที่ยังติดข้อจำกัด",
                            "ลงนามสัญญาและเริ่มรอบที่ 1 ภายใน 30 วัน"]),
                   sp_text(5, "DB", "body", 3,
                           ["ต้องการคำตอบภายใน 30 กันยายน 2569 เพื่อเริ่มรอบแรกในไตรมาสนี้"]),
                   sp_text(6, "Contact", "body", 4,
                           ["โทร · 02-XXX-XXXX", "อีเมล · contact@nctthai.com",
                            "เว็บไซต์ · nctthai.com"])]))

    return S


# ------------------------------------------------------------------ package
def build(path, with_slides, title):
    LAY = layouts()
    slides = demo_slides() if with_slides else []
    z = zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED)

    def w(name, data):
        z.writestr(name, data.encode("utf-8") if isinstance(data, str) else data)

    n_charts = sum(len(s[2]) for s in slides if len(s) > 2)
    w("[Content_Types].xml", content_types(len(slides), not with_slides, n_charts))
    w("_rels/.rels", rels([
        ("rId1", "officeDocument", "ppt/presentation.xml"),
        ("rId2", "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
         "docProps/core.xml"),
        ("rId3", "extended-properties", "docProps/app.xml"),
    ]))
    w("docProps/core.xml", core_props(title))
    w("docProps/app.xml", APP_PROPS)

    # presentation
    pres_rels = [("rId1", "slideMaster", "slideMasters/slideMaster1.xml")]
    for i in range(len(slides)):
        pres_rels.append(("rId%d" % (2 + i), "slide", "slides/slide%d.xml" % (i + 1)))
    n = 2 + len(slides)
    pres_rels += [("rId%d" % n, "presProps", "presProps.xml"),
                  ("rId%d" % (n + 1), "viewProps", "viewProps.xml"),
                  ("rId%d" % (n + 2), "theme", "theme/theme1.xml"),
                  ("rId%d" % (n + 3), "tableStyles", "tableStyles.xml")]
    w("ppt/presentation.xml", presentation(len(slides)))
    w("ppt/_rels/presentation.xml.rels", rels(pres_rels))
    w("ppt/presProps.xml", PRES_PROPS)
    w("ppt/viewProps.xml", VIEW_PROPS)
    w("ppt/tableStyles.xml", table_styles())
    w("ppt/theme/theme1.xml", PT.theme())

    # master
    w("ppt/slideMasters/slideMaster1.xml",
      PM.slide_master("rId%d" % (len(LAY) + 2), len(LAY)))
    m_rels = [("rId%d" % (i + 1), "slideLayout", "../slideLayouts/slideLayout%d.xml" % (i + 1))
              for i in range(len(LAY))]
    m_rels.append(("rId%d" % (len(LAY) + 1), "theme", "../theme/theme1.xml"))
    m_rels.append(("rId%d" % (len(LAY) + 2), "image", "../media/mark-color.png"))
    w("ppt/slideMasters/_rels/slideMaster1.xml.rels", rels(m_rels))

    # layouts
    for i, (fn, imgs) in enumerate(LAY, 1):
        w("ppt/slideLayouts/slideLayout%d.xml" % i, fn())
        lr = [("rId1", "slideMaster", "../slideMasters/slideMaster1.xml")]
        for j, img in enumerate(imgs):
            lr.append(("rId%d" % (2 + j), "image", "../media/" + img))
        w("ppt/slideLayouts/_rels/slideLayout%d.xml.rels" % i, rels(lr))

    # slides
    chart_no = 0
    for i, (layout_no, shapes, *parts) in enumerate(slides, 1):
        w("ppt/slides/slide%d.xml" % i, slide(shapes))
        sr = [("rId1", "slideLayout", "../slideLayouts/slideLayout%d.xml" % layout_no)]
        for j, chart_xml in enumerate(parts[0] if parts else []):
            chart_no += 1
            w("ppt/charts/chart%d.xml" % chart_no, chart_xml)
            sr.append(("rId%d" % (2 + j), "chart", "../charts/chart%d.xml" % chart_no))
        w("ppt/slides/_rels/slide%d.xml.rels" % i, rels(sr))

    # media
    for name, src in IMG.items():
        with open(os.path.join(ASSETS, src), "rb") as f:
            w("ppt/media/" + name, f.read())
    z.close()
    print("built %-40s %8.1f KB" % (os.path.basename(path), os.path.getsize(path) / 1024))


if __name__ == "__main__":
    build(os.path.join(OUT, "NCT-Slide-Template.potx"), False, "NCT Slide Template")
    build(os.path.join(OUT, "NCT-Slide-Template-Demo.pptx"), True, "NCT Slide Template — ตัวอย่าง")
    # v3: the same nineteen layouts wearing the chrome the corporate proposal
    # template requires. A PowerPoint layout cannot toggle its own chrome the
    # way the React <Deck> can - it is baked in - so the corp deck is a second
    # file built from the same source, not a second set of layouts inside one.
    PM.BRAND = "corp"
    build(os.path.join(OUT, "NCT-Slide-Template-Corp.potx"), False,
          "NCT Slide Template — แบบฟอร์มบริษัท")
    build(os.path.join(OUT, "NCT-Slide-Template-Corp-Demo.pptx"), True,
          "NCT Slide Template — แบบฟอร์มบริษัท ตัวอย่าง")
    PM.BRAND = "web"
