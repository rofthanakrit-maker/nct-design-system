# -*- coding: utf-8 -*-
"""Assemble NCT-Slide-Template.potx (+ a demo .pptx) as raw OOXML."""
import os, zipfile, datetime
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
LAYOUTS = [
    (lambda: PL.l01_title("rId2", "rId3"), ["logo-white.png", "mark-white.png"]),
    (lambda: PL.l02_section("rId2", "rId3"), ["mark-white.png", "photo-section.jpg"]),
    (lambda: PL.l03_content("rId2"),       ["mark-color.png"]),
    (lambda: PL.l04_two("rId2"),           ["mark-color.png"]),
    (lambda: PL.l05_cards("rId2"),         ["mark-color.png"]),
    (lambda: PL.l06_stats("rId2"),         ["mark-color.png"]),
    (lambda: PL.l07_quote("rId2"),         ["mark-color.png"]),
    (lambda: PL.l08_image("rId2"),         ["mark-white.png"]),
    (lambda: PL.l09_table("rId2"),         ["mark-color.png"]),
    (lambda: PL.l10_closing("rId2", "rId3"), ["logo-white.png", "photo-facade.jpg"]),
    # --- v2: dense / proposal-deck layouts ---
    (lambda: PL.l11_split("rId2"),         ["mark-color.png"]),
    (lambda: PL.l12_cards_band("rId2"),    ["mark-color.png"]),
    (lambda: PL.l13_process("rId2"),       ["mark-color.png"]),
    (lambda: PL.l14_diagram("rId2"),       ["mark-color.png"]),
    (lambda: PL.l15_agenda("rId2", "rId3"), ["mark-white.png", "photo-tower.jpg"]),
    (lambda: PL.l16_dense_table("rId2"),   ["mark-color.png"]),
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


TABLE_STYLES = (
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
       _tc_tx(PAPER, bold=True), _tc_bdr(insideH=False), _tc_fill(NAVY)))

# ------------------------------------------------------------------ table shapes
TBL_PAD = 73152          # 0.080in cell padding, all sides (v2 §16)
ROW_HEAD = 347472        # 0.380in
ROW_BODY = 352044        # 0.385in


def _cell(text, sz, color, bold=False, algn="l", fill=None, spc=0):
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
            '<a:tcPr marL="%d" marR="%d" marT="%d" marB="%d" anchor="ctr">%s</a:tcPr></a:tc>'
            % (algn, run, TBL_PAD, TBL_PAD, TBL_PAD, TBL_PAD, f))


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


def content_types(n_slides, is_template):
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
    for i in range(1, len(LAYOUTS) + 1):
        ov.append('<Override PartName="/ppt/slideLayouts/slideLayout%d.xml" ContentType='
                  '"application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>' % i)
    for i in range(1, n_slides + 1):
        ov.append('<Override PartName="/ppt/slides/slide%d.xml" ContentType="application/vnd.'
                  'openxmlformats-officedocument.presentationml.slide+xml"/>' % i)
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


def _dia_box(sid, name, x, y, w, text, cat=None):
    """v2 §14 standard part: square corners, 0.60in tall, flat, 12pt label"""
    fill = solid(cat, 15) if cat else solid(PAPER2)
    line = '<a:ln w="12700">%s</a:ln>' % solid(cat or TEAL)
    return shape(sid, name, x, y, w, 548640, fill, prst="rect", line=line,
                 body=txbody([para(text, sz=T_DENSEBODY, color=INK, algn="ctr",
                                   line=110000)], anchor="ctr"))


def _dia_link(sid, name, x, y, w):
    """straight connector, solid triangle head, TEAL 1.25pt -- right angles only"""
    return shape(sid, name, x, y, w, 0, nofill(), prst="line",
                 line=('<a:ln w="15875" cap="flat">%s<a:prstDash val="solid"/>'
                       '<a:tailEnd type="triangle" w="med" len="med"/></a:ln>' % solid(TEAL)))


def _diagram_kit(sid):
    """the demo drawing on L14 -- shows every part of the standard kit in use"""
    BW, BY = 2011680, 3017520
    xs = [1143000, 3840480, 6537960, 9235440]
    out = []
    # group frame around the two new components
    out.append(shape(sid, "Group Frame", 3657600, 2560320, 5074920, 1554480, nofill(),
                     # a:ln child order is fixed: fill BEFORE prstDash
                     line=('<a:ln w="12700">%s<a:prstDash val="dash"/></a:ln>' % solid(RULE))))
    out.append(shape(sid + 1, "Group Label", 3749040, 2606040, 3200400, 274320, nofill(),
                     body=txbody([para("ส่วนที่เพิ่มใหม่", sz=T_DENSEBODY, color=INK2,
                                       bold=True, spc=120, line=100000)], anchor="ctr")))
    sid += 2
    labels = [("ระบบ ERP ปัจจุบัน", None), ("คิวเอกสารกลาง", NAVY),
              ("ตัวตรวจกฎธุรกิจ", TEAL), ("ระบบบัญชี", None)]
    for i, (t, cat) in enumerate(labels):
        out.append(_dia_box(sid, "Box %d" % (i + 1), xs[i], BY, BW, t, cat)); sid += 1
    for i in range(3):
        gx = xs[i] + BW + 114300
        out.append(_dia_link(sid, "Link %d" % (i + 1), gx, BY + 274320, 457200)); sid += 1
    out.append(shape(sid, "Edge Label", xs[1] + BW - 45720, BY - 274320, 822960, 228600,
                     solid(PAPER),
                     body=txbody([para("ผ่านกฎ", sz=T_DENSECELL, color=INK2, algn="ctr",
                                       line=100000)], anchor="ctr")))
    return out


def slide(shapes):
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:sld %s>' % NS_P
            + spTree("", shapes)
            + '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>')


def demo_slides():
    S = []
    # 1 title
    S.append((1, [sp_text(2, "Title", "ctrTitle", None, ["บริการที่ปรึกษาเทคโนโลยีสารสนเทศ"]),
                  sp_text(3, "Subtitle", "subTitle", 1,
                          ["New Computer Technology Consulting Co., Ltd. · 2569"])]))
    # 2 section
    S.append((2, [sp_text(2, "Number", "body", 1, ["01"]),
                  sp_text(3, "Title", "title", None, ["ภาพรวมบริษัท"]),
                  sp_text(4, "Desc", "body", 2, ["ใครคือ NCT และเราทำอะไรให้ลูกค้าองค์กร"])]))
    # 3 content
    S.append((3, [sp_text(2, "Title", "title", None, ["ขอบเขตบริการ"]),
                  sp_text(3, "Body", "body", 1,
                          ["วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
                           ("ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", 1),
                           "ดูแลระบบต่อเนื่องแบบ Managed Service",
                           ("มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", 1),
                           "ให้คำปรึกษาการย้ายระบบขึ้นคลาวด์"])]))
    # 4 two column
    S.append((4, [sp_text(2, "Title", "title", None, ["ก่อนและหลังใช้บริการ"]),
                  sp_text(3, "L", "body", 1,
                          ["ก่อน", ("ระบบล่มบ่อย ไม่มีคนดูแลประจำ", 1),
                           ("ค่าใช้จ่ายไม่แน่นอน", 1)]),
                  sp_text(4, "R", "body", 2,
                          ["หลัง", ("มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", 1),
                           ("ค่าใช้จ่ายคงที่ต่อเดือน", 1)])]))
    # 5 cards
    S.append((5, [sp_text(2, "Title", "title", None, ["สามเสาหลักของบริการ"]),
                  sp_text(3, "C1H", "body", 1, ["Infrastructure"]),
                  sp_text(4, "C1B", "body", 2, ["ออกแบบและติดตั้งเครือข่าย เซิร์ฟเวอร์ และระบบสำรองข้อมูล"]),
                  sp_text(5, "C2H", "body", 3, ["Managed Service"]),
                  sp_text(6, "C2B", "body", 4, ["ดูแลระบบรายเดือน พร้อมทีมซัพพอร์ตและรายงานสุขภาพระบบ"]),
                  sp_text(7, "C3H", "body", 5, ["Cloud & Security"]),
                  sp_text(8, "C3B", "body", 6, ["ย้ายระบบขึ้นคลาวด์ และวางมาตรการความปลอดภัยตามมาตรฐาน"])]))
    # 6 stats
    S.append((6, [sp_text(2, "Title", "title", None, ["ตัวเลขที่บอกเรื่องเรา"]),
                  sp_text(3, "F1", "body", 1, ["12"]),
                  sp_text(4, "F1L", "body", 2, ["ปีที่ให้บริการองค์กรไทย"]),
                  sp_text(5, "F2", "body", 3, ["99.9%"]),
                  sp_text(6, "F2L", "body", 4, ["Uptime เฉลี่ยของระบบที่ดูแล"]),
                  sp_text(7, "F3", "body", 5, ["24/7"]),
                  sp_text(8, "F3L", "body", 6, ["ทีมเฝ้าระวังและตอบกลับ"]),
                  sp_text(9, "FN", "body", 7, ["ข้อมูล ณ ไตรมาส 1 ปี 2569"])]))
    # 7 quote
    S.append((7, [sp_text(2, "Q", "body", 1,
                          ["ระบบไม่ล่มอีกเลยตั้งแต่เปลี่ยนมาใช้ทีมนี้ดูแล และเราวางแผนงบประมาณได้ล่วงหน้าจริง ๆ"]),
                  sp_text(3, "A", "body", 2, ["คุณสมชาย ป. — ผู้จัดการฝ่ายไอที, บริษัทตัวอย่าง จำกัด"])]))
    # 8 full image
    S.append((8, [sp_text(2, "Title", "title", None, ["ศูนย์ปฏิบัติการเครือข่าย"]),
                  sp_text(3, "Cap", "body", 2, ["คลิกไอคอนกลางสไลด์เพื่อใส่ภาพเต็มจอ"])]))
    # 9 table -- v2 §1 #4: the demo must actually carry a table, not just a title
    w9 = [3181080, 2394040, 2394040, 2394040]
    head9 = ["", "Essential", "Business", "Enterprise"]
    body9 = [
        ["ชั่วโมงซัพพอร์ต", "จันทร์–ศุกร์ 9–18", "จันทร์–เสาร์ 8–20", "24/7"],
        ["เวลาตอบกลับ (SLA)", "8 ชั่วโมง", "4 ชั่วโมง", "1 ชั่วโมง"],
        ["มอนิเตอร์ระบบ", "รายวัน", "ต่อเนื่อง", "ต่อเนื่อง + แจ้งเตือน"],
        ["รายงานสุขภาพระบบ", "ไตรมาส", "รายเดือน", "รายสัปดาห์"],
    ]
    rows9 = [(ROW_HEAD, [_cell(t, T_TBLHEAD, PAPER, bold=True, spc=60,
                               algn="l" if i == 0 else "ctr")
                         for i, t in enumerate(head9)])]
    for r in body9:
        rows9.append((ROW_BODY, [_cell(t, T_DENSECELL, INK, bold=(i == 0),
                                       algn="l" if i == 0 else "ctr")
                                 for i, t in enumerate(r)]))
    S.append((9, [sp_text(2, "Title", "title", None, ["เปรียบเทียบแพ็กเกจ"]),
                  sp_text(3, "Intro", "body", 2, ["เลือกระดับบริการให้ตรงกับขนาดองค์กร"]),
                  table(4, "Package Table", 1, MX, 2286000, w9, rows9),
                  sp_text(5, "TL", "body", 3, ["สรุป"]),
                  sp_text(6, "TC", "body", 4,
                          ["องค์กร 50-200 ที่นั่งเลือก Business เป็นค่าเริ่มต้น "
                           "ตอบกลับ 4 ชั่วโมงครอบคลุมงานปิดงบรายเดือน"])]))

    # ---------------------------------------------------------- v2 layouts 11-16
    # 11 split panel
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

    # 12 four cards + band
    cards12 = [("ลดงานคีย์ซ้ำ", "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ"),
               ("ตรวจสอบได้", "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง"),
               ("ปิดงบเร็วขึ้น", "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน"),
               ("ขยายต่อได้", "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม")]
    sh12 = [sp_text(2, "Title", "title", None, ["สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"])]
    sid = 3
    for i, (h, b) in enumerate(cards12):
        sh12.append(sp_text(sid, "N%d" % i, "body", i*3 + 1, ["0%d" % (i + 1)])); sid += 1
        sh12.append(sp_text(sid, "H%d" % i, "body", i*3 + 2, [h])); sid += 1
        sh12.append(sp_text(sid, "B%d" % i, "body", i*3 + 3, [b])); sid += 1
    sh12.append(sp_text(sid, "BL", "body", 13, ["สรุป"])); sid += 1
    sh12.append(sp_text(sid, "BC", "body", 14,
                        ["ทั้งสี่ข้อมาจากการแก้จุดเดียวกัน คือรวมจุดรับเอกสาร"]))
    S.append((12, sh12))

    # 13 process flow
    steps13 = [("รับเอกสาร", "สแกนหรือรับไฟล์เข้าคิวกลาง"),
               ("อ่านข้อมูล", "ดึงฟิลด์สำคัญ ตรวจกับต้นทาง"),
               ("ตรวจสอบ", "กฎธุรกิจและวงเงินอนุมัติ"),
               ("บันทึก", "ลงระบบบัญชีพร้อม audit trail"),
               ("กระทบยอด", "จับคู่อัตโนมัติ ส่งรายงาน")]
    sh13 = [sp_text(2, "Title", "title", None, ["กระบวนการที่เสนอ"]),
            sp_text(3, "Sub", "body", 1, ["ห้าขั้นตอน ทำงานต่อเนื่องโดยไม่ต้องคีย์ซ้ำ"])]
    sid = 4
    for i, (h, b) in enumerate(steps13):
        sh13.append(sp_text(sid, "C%d" % i, "body", i*3 + 2, [str(i + 1)])); sid += 1
        sh13.append(sp_text(sid, "H%d" % i, "body", i*3 + 3, [h])); sid += 1
        sh13.append(sp_text(sid, "B%d" % i, "body", i*3 + 4, [b])); sid += 1
    sh13.append(sp_text(sid, "RL", "body", 17, ["ผลลัพธ์"])); sid += 1
    sh13.append(sp_text(sid, "RC", "body", 18,
                        ["เอกสารหนึ่งใบผ่านครบห้าขั้นโดยไม่มีการคีย์ซ้ำเลย"]))
    S.append((13, sh13))

    # 14 diagram canvas -- demo draws the v2 §14 standard parts kit
    sh14 = [sp_text(2, "Title", "title", None, ["ภาพรวมสถาปัตยกรรมระบบ"]),
            sp_text(3, "Sub", "body", 1, ["ตัวอย่างการใช้ชุดชิ้นส่วนมาตรฐานตาม v2 §14"]),
            sp_text(4, "Leg", "body", 2,
                    ["กล่องทึบ = ระบบที่มีอยู่  ·  กล่องมีสีหมวด = ส่วนที่เพิ่ม  ·  "
                     "เส้นทึบ = ข้อมูลไหลอัตโนมัติ"])]
    sh14.append(sp_text(5, "TL", "body", 3, ["สรุป"]))
    sh14.append(sp_text(6, "TC", "body", 4,
                        ["ระบบเดิมไม่ถูกแก้ ของใหม่แทรกเป็นคิวและตัวตรวจกฎคั่นกลางเท่านั้น"]))
    sh14 += _diagram_kit(10)
    S.append((14, sh14))

    # 15 agenda
    S.append((15, [sp_text(2, "Num", "body", 1, ["02"]),
                   sp_text(3, "Title", "title", None, ["หัวข้อนำเสนอ"]),
                   sp_text(4, "List", "body", 2,
                           ["บริบทและปัญหาที่พบ", "วัตถุประสงค์ของโครงการ",
                            "ขอบเขตงานรายกระบวนการ", "แผนดำเนินงานและผู้รับผิดชอบ",
                            "งบประมาณและเงื่อนไข"])]))

    # 16 dense table
    w16 = [594360, 3200400, 1965960, 1600200, 1554480, 1447800]
    head16 = ["#", "กระบวนการ", "หมวด", "ปริมาณ/เดือน", "ความพร้อม", "รอบที่ทำ"]
    cats16 = [NAVY, TEAL, TEAL_L, DEEP]
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
    catmap = {"AP": 0, "AR": 1, "GL": 3}
    rows16 = [(ROW_HEAD, [_cell(t, T_TBLHEAD, PAPER, bold=True, spc=60,
                                algn="ctr" if i in (0, 2, 3, 4, 5) else "l")
                          for i, t in enumerate(head16)])]
    for n, (proc, cat, qty, (st, stc, stt), rnd) in enumerate(body16, 1):
        c = cats16[catmap[cat]]
        rows16.append((ROW_BODY, [
            _cell(str(n), T_DENSECELL, PAPER, bold=True, algn="ctr", fill=c),
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
                   sp_text(5, "Foot", "body", 3,
                           ["ปริมาณเป็นค่าเฉลี่ยจากข้อมูล 3 เดือนล่าสุด · "
                            "รายการติดข้อจำกัดรอผลการตรวจสิทธิ์เข้าระบบ"]),
                   sp_text(6, "TL", "body", 4, ["สรุป"]),
                   sp_text(7, "TC", "body", 5,
                           ["หกในแปดกระบวนการเริ่มได้ทันทีในรอบ 1-2 "
                            "อีกสองรายการรอสิทธิ์เข้าระบบ ยืนยันภายใน 15 วัน"])]))
    # closing goes last: it is layout 10, but a deck ends on the thank-you page
    S.append((10, [sp_text(2, "Title", "title", None, ["ขอบคุณครับ"]),
                   sp_text(3, "Contact", "body", 1,
                           ["โทร · 02-XXX-XXXX", "อีเมล · contact@nctthai.com",
                            "เว็บไซต์ · nctthai.com"])]))

    return S


# ------------------------------------------------------------------ package
def build(path, with_slides, title):
    slides = demo_slides() if with_slides else []
    z = zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED)

    def w(name, data):
        z.writestr(name, data.encode("utf-8") if isinstance(data, str) else data)

    w("[Content_Types].xml", content_types(len(slides), not with_slides))
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
    w("ppt/tableStyles.xml", TABLE_STYLES)
    w("ppt/theme/theme1.xml", PT.theme())

    # master
    w("ppt/slideMasters/slideMaster1.xml",
      PM.slide_master("rId%d" % (len(LAYOUTS) + 2), len(LAYOUTS)))
    m_rels = [("rId%d" % (i + 1), "slideLayout", "../slideLayouts/slideLayout%d.xml" % (i + 1))
              for i in range(len(LAYOUTS))]
    m_rels.append(("rId%d" % (len(LAYOUTS) + 1), "theme", "../theme/theme1.xml"))
    m_rels.append(("rId%d" % (len(LAYOUTS) + 2), "image", "../media/mark-color.png"))
    w("ppt/slideMasters/_rels/slideMaster1.xml.rels", rels(m_rels))

    # layouts
    for i, (fn, imgs) in enumerate(LAYOUTS, 1):
        w("ppt/slideLayouts/slideLayout%d.xml" % i, fn())
        lr = [("rId1", "slideMaster", "../slideMasters/slideMaster1.xml")]
        for j, img in enumerate(imgs):
            lr.append(("rId%d" % (2 + j), "image", "../media/" + img))
        w("ppt/slideLayouts/_rels/slideLayout%d.xml.rels" % i, rels(lr))

    # slides
    for i, (layout_no, shapes) in enumerate(slides, 1):
        w("ppt/slides/slide%d.xml" % i, slide(shapes))
        w("ppt/slides/_rels/slide%d.xml.rels" % i, rels([
            ("rId1", "slideLayout", "../slideLayouts/slideLayout%d.xml" % layout_no)]))

    # media
    for name, src in IMG.items():
        with open(os.path.join(ASSETS, src), "rb") as f:
            w("ppt/media/" + name, f.read())
    z.close()
    print("built %-40s %8.1f KB" % (os.path.basename(path), os.path.getsize(path) / 1024))


if __name__ == "__main__":
    build(os.path.join(OUT, "NCT-Slide-Template.potx"), False, "NCT Slide Template")
    build(os.path.join(OUT, "NCT-Slide-Template-Demo.pptx"), True, "NCT Slide Template — ตัวอย่าง")
