# -*- coding: utf-8 -*-
"""The 19 NCT slide layouts (10 core + 6 dense/proposal variants + 2 corp, v3 + 1 chart, v4)."""
import parts_master as PM
from tokens import *
from ooxml import *
from parts_master import chrome, body_specs, accent, accent_up, FOOT_Y

LOGO_AR = 373 / 733
MARK_AR = 229 / 360
R16 = '<a:gd name="adj" fmla="val 4200"/>'      # ~16px corner on a 3.5in card
LQUOTE = "&#8220;"
PAD = 320040                                     # card inner padding (0.35in)
# parts_master.chrome() owns placeholder idx 10 (date), 11 (footer) and 12 (page
# number) on every layout, and OOXML wants idx unique across a shape tree. A
# layout with more than nine content placeholders has to start above them, not
# count up from 1 into them - L12 and L13 both did, and shipped four card and
# five step placeholders sharing an idx with the chrome. scripts/check_template.py
# is what catches it now.
PH_FREE = 20


def _logo(sid, rid, x, y, w):
    return pic(sid, "NCT Logo", rid, x, y, w, int(w * LOGO_AR))


def dense_specs(prompts, color=INK, alpha=None, bullet_color=None):
    """v2 §4 dense outline levels - legal on L11-L14 / L16 only, floor 10pt"""
    lv = [dict(sz=T_DENSEBODY, color=color, alpha=alpha, bullet=True,
               bullet_color=bullet_color or accent(), indent=182880, marL=182880,
               line=132000, space_before=500),
          dict(sz=T_DENSEBODY, color=color, alpha=(alpha - 15) if alpha else None,
               bullet=True, bullet_char="&#8211;", bullet_color=bullet_color or INK2,
               indent=182880, marL=548640, line=132000, space_before=350)]
    return [S(p, **lv[min(i, 1)]) for i, p in enumerate(prompts)]


def _diamond(sid, x, y, s, alpha=8):
    return shape(sid, "Decor Diamond", x, y, s, s, nofill(), prst="diamond",
                 line='<a:ln w="19050">%s</a:ln>' % solid(PAPER, alpha))


def _title(sid, prompt="ชื่อสไลด์"):
    # the corporate template sets its title in near-black, not the house navy;
    # that is chrome, so it moves with the brand
    c = INK if PM.BRAND == "corp" else NAVY
    return placeholder(sid, "Title Placeholder", "title", MX, TITLE_Y, CW, TITLE_H,
                       [S(prompt, sz=T_H1, color=c, bold=True, font="mj", line=108000)],
                       anchor="b")


def _rule(sid, x=MX, y=RULE_Y, color=None, alpha=None):
    """The rule under the title.

    In corp mode it is a full-bleed band at the same y rather than a 0.6in stub -
    the one piece of geometry the two brands do not share, and the reason the
    band sits at RULE_Y instead of the source's own 2.29cm: nothing downstream
    moves, so every layout keeps its rhythm in either brand.

    A caller that names its own colour (L15's TEAL_UP divider on a dark slide)
    is not the title rule and is left alone.
    """
    if color is None:
        if PM.BRAND == "corp":
            return shape(sid, "Accent Rule", 0, y, SW, CORP_RULE_H, solid(CORP))
        color = accent()
    return shape(sid, "Accent Rule", x, y, RULE_W, RULE_H, solid(color, alpha))


def _foot_scrim(sid):
    """L01 / L10 only: the gradients run TEAL_B into the bottom-right corner, and
    TEAL_B is 4.0:1 against pure white - no footer alpha clears AA there. Darken
    the ground instead, with the same scrim the photo bands already use."""
    return shape(sid, "Footer Scrim", 0, SH - 1463040, SW, 1463040, scrim(DEEP))


def _takeaway(sid, idx, label="สรุป", prompt="ประเด็นสรุปหนึ่งบรรทัด"):
    """The one-line conclusion strip, pinned to the foot of the body box.

    Fixed y rather than "below whatever is above it", so the reader finds the
    conclusion in the same place whether the table runs four rows or ten. L09,
    L14 and L16 all carry one: a grid or a drawing without a stated conclusion
    makes the reader do the work the slide was supposed to do.
    """
    ly = TAKE_Y + (TAKE_H - 289560) // 2
    return [shape(sid, "Takeaway Band", MX, TAKE_Y, CW, TAKE_H, solid(PAPER2)),
            placeholder(sid + 1, "Takeaway Label", "body", MX + 182880, ly,
                        1828800, 289560,
                        [S(label, sz=T_LABEL, color=accent(), bold=True, spc=120,
                           line=100000)], idx=idx, anchor="ctr"),
            placeholder(sid + 2, "Takeaway Copy", "body", MX + 2011680, ly,
                        CW - 2011680 - 182880, 289560,
                        [S(prompt, sz=T_BODY3, color=INK, line=100000)],
                        idx=idx + 1, anchor="ctr")]


# the photo band, defined once in tokens.py so slides.css can be emitted from it
SEC_PHOTO_W, SEC_PHOTO_X, SEC_TEXT_W = BAND_W, BAND_X, BAND_TW


def _wrap(name, typ, shapes, bgfill=None):
    t = ' type="%s"' % typ if typ else ''
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:sldLayout %s%s showMasterSp="0" preserve="1">%s'
            '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>'
            % (NS_P, t, spTree(name, shapes, bgfill=bgfill)))


# ---------------------------------------------------------------- 01 Title
def l01_corp_cover(rid_logo_color, rid_mark_color):
    """The corporate cover: paper, centred, the mark watermarked behind it.

    The one layout where the two brands are different slides rather than the
    same slide in different furniture - the house cover opens on the navy->teal
    gradient and reads left, this one is the page the company puts in front of a
    client. It also drops the corp foot bar and the corner lockup: the source
    draws neither on the one slide whose job is to be quiet, and the lockup IS
    the slide here, so a second copy in the corner would be the same mark twice.
    """
    logo_h = int(COVER_LOGO_W * LOGO_AR)
    wm = 7315200                                  # 8.00in - the watermark, twice
    scat_x = SW - COVER_SCAT_W
    sx, sy = COVER_SCAT_W / COVER_SCAT_BOX[0], SH / COVER_SCAT_BOX[1]
    s = [pic(10, "Watermark A", rid_mark_color, 1371600, -2103120, wm,
             int(wm * MARK_AR), alpha=3.5),
         pic(11, "Watermark B", rid_mark_color, 4114800, 2286000, wm,
             int(wm * MARK_AR), alpha=3.5)]
    sid = 12
    # the decorative column, read out of the source deck's own artwork
    for i, (x, y, w, h, a) in enumerate(COVER_SCATTER):
        s.append(shape(sid, "Scatter %d" % (i + 1), scat_x + round(x * sx),
                       round(y * sy), round(w * sx), round(h * sy),
                       solid(MID, a)))
        sid += 1
    s += [pic(sid, "NCT Logo", rid_logo_color, (SW - COVER_LOGO_W) // 2,
              COVER_LOGO_Y, COVER_LOGO_W, logo_h),
          shape(sid + 1, "Accent Rule", (SW - COVER_RULE_W) // 2, COVER_RULE_Y,
                COVER_RULE_W, COVER_RULE_H, solid(CORP)),
          placeholder(sid + 2, "Title Placeholder", "ctrTitle", MX, COVER_TITLE_Y,
                      CW, COVER_TITLE_H,
                      [S("PROPOSAL", sz=T_DISPLAY, color=INK, bold=True, font="mj",
                         algn="ctr", line=115000)], anchor="ctr"),
          placeholder(sid + 3, "Subtitle", "subTitle", MX,
                      COVER_TITLE_Y + COVER_TITLE_H + 137160, CW, 457200,
                      [S("คำโปรย / ชื่อลูกค้า", sz=T_LEAD, color=INK2, algn="ctr",
                         line=130000)], idx=1, anchor="t"),
          # the cover's own foot: the source's "Updated date" line, left, and the
          # page number. No bar, so the date starts at the edge like the source's
          placeholder(sid + 4, "Date Placeholder", "dt", 228600, SH - 457200,
                      4572000, 274320,
                      [S("", sz=T_FOOT, color=INK2)], idx=10, anchor="ctr"),
          PM.sldnum_sp(sid + 5, False, x=SW - 228600 - 1371600, y=SH - 457200)]
    return _wrap("01 Title Slide", "title", s, bgfill=solid(PAPER))


def l01_title(rid_logo, rid_mark):
    if PM.BRAND == "corp":
        return l01_corp_cover(rid_logo, rid_mark)
    rid_logo_white, rid_mark_white = rid_logo, rid_mark
    s = [_diamond(10, SW - 3657600, -914400, 4572000, 9),
         _diamond(11, SW - 2286000, 2743200, 2743200, 7),
         _logo(12, rid_logo_white, MX, 868680, 2560320),
         placeholder(13, "Title Placeholder", "ctrTitle", MX, 2560320, 8229600, 1463040,
                     [S("ชื่อเรื่องงานนำเสนอ", sz=T_DISPLAY, color=PAPER, bold=True,
                        font="mj", line=106000)], anchor="b"),
         _rule(14, y=4206240, color=PAPER, alpha=70),
         placeholder(15, "Subtitle", "subTitle", MX, 4480560, 7315200, 731520,
                     [S("คำโปรย / ชื่อลูกค้า / วันที่", sz=T_LEAD, color=PAPER,
                        alpha=82, line=130000)], idx=1),
         _foot_scrim(16)]
    s += chrome(dark=True, mark_rid=rid_mark_white)
    return _wrap("01 Title Slide", "title", s, bgfill=grad(NAVY, TEAL_B, 45, c_mid=MID))


# ---------------------------------------------------------------- 02 Section
def l02_section(rid_mark_white, rid_photo):
    # the photograph takes the right 40%; text keeps the left panel to itself
    s = [pic(9, "Section Photo", rid_photo, SEC_PHOTO_X, 0, SEC_PHOTO_W, SH),
         shape(10, "Photo Fade", SEC_PHOTO_X, 0, SEC_PHOTO_W, SH, fade_x(NAVY)),
         # the footer chrome sits on top of the band - keep it on navy, not on glass
         shape(15, "Photo Foot Scrim", SEC_PHOTO_X, SH - 2057400, SEC_PHOTO_W, 2057400,
               scrim(NAVY)),
         placeholder(11, "Section Number", "body", MX, 1737360, 2286000, 1005840,
                     [S("01", sz=6000, color=accent_up(), bold=True, font="mj", line=100000)],
                     idx=1, anchor="b"),
         _rule(12, y=2834640, color=accent_up()),
         placeholder(13, "Title Placeholder", "title", MX, 2926080, SEC_TEXT_W, 1188720,
                     [S("ชื่อหัวข้อ", sz=T_SECTION, color=PAPER, bold=True,
                        font="mj", line=108000)], anchor="t"),
         placeholder(14, "Description", "body", MX, 4297680, SEC_TEXT_W, 731520,
                     [S("คำอธิบายหัวข้อสั้น ๆ หนึ่งถึงสองบรรทัด", sz=T_BODY, color=PAPER,
                        alpha=78, line=130000)], idx=2)]
    s += chrome(dark=True, mark_rid=rid_mark_white)
    return _wrap("02 Section Divider", "secHead", s, bgfill=solid(NAVY))


# ---------------------------------------------------------------- 03 Title + Content
def l03_content(rid_mark_color):
    s = [_title(10), _rule(11),
         placeholder(12, "Content Placeholder", "body", MX, BODY_Y, CW, BODY_H,
                     body_specs(["เนื้อหาระดับที่หนึ่ง", "ระดับที่สอง", "ระดับที่สาม"]), idx=1)]
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("03 Title and Content", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 04 Two Column
def l04_two(rid_mark_color):
    s = [_title(10), _rule(11),
         placeholder(12, "Left Content", "body", MX, BODY_Y, HALF, BODY_H,
                     body_specs(["คอลัมน์ซ้าย", "ระดับที่สอง", "ระดับที่สาม"]), idx=1),
         placeholder(13, "Right Content", "body", MX + HALF + GUT, BODY_Y, HALF, BODY_H,
                     body_specs(["คอลัมน์ขวา", "ระดับที่สอง", "ระดับที่สาม"]), idx=2)]
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("04 Two Column", "twoObj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 05 Three Cards
def l05_cards(rid_mark_color):
    CARD_Y, CARD_H = BODY_Y, 3200400
    s = [_title(10), _rule(11)]
    sid = 12
    for i in range(3):
        x = MX + i * (THIRD + GUT)
        s.append(shape(sid, "Card %d" % (i + 1), x, CARD_Y, THIRD, CARD_H,
                       solid(PAPER2), prst="roundRect", adj=R16)); sid += 1
        s.append(shape(sid, "Card %d Tab" % (i + 1), x + PAD, CARD_Y + PAD, 274320, 45720,
                       solid(accent()))); sid += 1
        s.append(placeholder(sid, "Card %d Heading" % (i + 1), "body",
                             x + PAD, CARD_Y + PAD + 182880, THIRD - 2 * PAD, 640080,
                             [S("หัวข้อการ์ด %d" % (i + 1), sz=T_LEAD, color=NAVY,
                                bold=True, font="mj", line=115000)],
                             idx=i * 2 + 1, anchor="t")); sid += 1
        s.append(placeholder(sid, "Card %d Body" % (i + 1), "body",
                             x + PAD, CARD_Y + PAD + 868680, THIRD - 2 * PAD,
                             CARD_H - 2 * PAD - 868680,
                             [S("คำอธิบายสั้น ๆ สองถึงสามบรรทัด", sz=T_BODY3, color=INK,
                                line=135000, space_before=300)],
                             idx=i * 2 + 2, anchor="t")); sid += 1
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("05 Three Cards", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 06 Key Figures
def l06_stats(rid_mark_color):
    ST_Y = 2194560
    s = [_title(10), _rule(11)]
    sid = 12
    for i in range(3):
        x = MX + i * (THIRD + GUT)
        if i:
            s.append(shape(sid, "Divider %d" % i, x - GUT // 2, ST_Y + 91440, 12700, 1737360,
                           solid(RULE))); sid += 1
        s.append(placeholder(sid, "Figure %d" % (i + 1), "body", x, ST_Y, THIRD, 1188720,
                             [S("00", sz=T_STAT, color=NAVY, bold=True, font="mj",
                                line=100000)], idx=i * 2 + 1, anchor="b")); sid += 1
        s.append(placeholder(sid, "Figure %d Label" % (i + 1), "body",
                             x, ST_Y + 1280160, THIRD, 731520,
                             [S("คำอธิบายตัวเลข", sz=T_LABEL, color=INK2, bold=True,
                                spc=120, line=130000)], idx=i * 2 + 2, anchor="t")); sid += 1
    s.append(placeholder(sid, "Footnote", "body", MX, 4754880, CW, 640080,
                         [S("ที่มาของข้อมูล / หมายเหตุ", sz=T_BODY3, color=INK2,
                            line=130000)], idx=7))
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("06 Key Figures", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 07 Quote
def l07_quote(rid_mark_color):
    s = [shape(10, "Quote Bar", 0, 0, 137160, SH, grad(NAVY, accent(), 90)),
         shape(11, "Quote Mark", MX, 868680, 1371600, 1188720, nofill(),
               body=txbody([para(LQUOTE, sz=12000, color=accent(), bold=True, font="mj",
                                 alpha=25, line=100000)], anchor="t")),
         placeholder(12, "Quote", "body", MX, 1965960, 9144000, 2194560,
                     [S("ข้อความคำพูดที่ต้องการเน้น ยาวได้ประมาณสองถึงสามบรรทัด",
                        sz=T_QUOTE, color=NAVY, font="mj", line=132000)], idx=1, anchor="t"),
         _rule(13, y=4389120),
         placeholder(14, "Attribution", "body", MX, 4663440, 6858000, 731520,
                     [S("ชื่อผู้พูด — ตำแหน่ง, องค์กร", sz=T_BODY3, color=INK2,
                        spc=60, line=130000)], idx=2)]
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("07 Pull Quote", "obj", s, bgfill=solid(PAPER2))


# ---------------------------------------------------------------- 08 Full Image
def l08_image(rid_mark_white):
    s = [pic_placeholder(10, "Picture Placeholder", 0, 0, SW, SH, 1),
         shape(11, "Scrim", 0, SH // 2, SW, SH // 2, scrim(DEEP)),
         placeholder(12, "Title Placeholder", "title", MX, 4297680, 8229600, 914400,
                     [S("ชื่อภาพ / หัวข้อ", sz=T_SECTION, color=PAPER, bold=True,
                        font="mj", line=108000)], anchor="b"),
         placeholder(13, "Caption", "body", MX, 5303520, 7315200, 640080,
                     [S("คำบรรยายภาพหนึ่งบรรทัด", sz=T_BODY3, color=PAPER,
                        alpha=80, line=130000)], idx=2)]
    s += chrome(dark=True, mark_rid=rid_mark_white)
    return _wrap("08 Full Image", "picTx", s, bgfill=solid(DEEP))


# ---------------------------------------------------------------- 09 Table
def l09_table(rid_mark_color):
    s = [_title(10), _rule(11),
         placeholder(12, "Intro", "body", MX, BODY_Y, CW, 457200,
                     [S("ประโยคนำหนึ่งบรรทัด", sz=T_BODY3, color=INK2, line=130000)], idx=2),
         tbl_placeholder(13, "Table Placeholder", MX, 2286000, CW, 3200400, 1)]
    s += _takeaway(14, 3)
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("09 Table / Comparison", "tbl", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 10 Closing
def l10_closing(rid_mark_white, rid_photo):
    """The ask, not a thank-you.

    A proposal's last slide is the one the room remembers, and the old one said
    "ขอบคุณครับ" over three contact lines - no next step, no owner, no date. The
    thank-you is now the title over that ask. The full lockup goes with it: with
    the ask holding the left column from 3.5in to 6.6in there is nowhere left for
    it, and the corner mark signs the slide the way it signs every other one.

    Three things about the ask were wrong and are fixed together, because they
    are one mistake seen from three sides:

    * The gradient is the OPENER MIRRORED, so TEAL_B - the 3.4:1 stop that may
      never carry text - lands in the top-left corner, which is where the ask
      lives. `_foot_scrim` was guarding the bottom-right, the corner that is
      teal on L01 and navy here: the scrim was mirrored with the gradient and
      the text was not. The left column now carries a flat DEEP veil, which is
      what L02 and L15 do with a solid panel, and the ground under the ask
      settles around 7:1 for white at every point of the column.
    * The label, the numbered bullets and the deadline were TEAL_UP, whose own
      token says ON NAVY ONLY. On the teal end of this gradient it measures
      2.63:1. They are PAPER now; the veil is what makes PAPER work.
    * The deadline was 14pt TEAL_UP under 16pt PAPER steps - the one sentence
      naming what NCT wants and by when, set quieter than the list above it. It
      is 20pt PAPER bold now, the loudest line in the block.

    And the contact block ran under the footer rule, because its leading was the
    web's number and spcPct is not CSS line-height - see tokens.lnspc. At 135%
    three 14pt lines reserve 1.19in in an 0.80in box, and preview/layout-10.png
    has the hairline struck through "เว็บไซต์ · nctthai.com". Written as the CSS
    value and converted, the same three lines take 0.78in and clear the rule by
    0.17in, with no box moved: the bug was the unit, not the geometry.
    """
    ASK_X, ASK_W = MX, 5486400
    s = [_diamond(10, -1371600, SH - 2743200, 3657600, 9),
         pic(11, "Section Photo", rid_photo, SEC_PHOTO_X, 0, SEC_PHOTO_W, SH),
         shape(16, "Photo Fade", SEC_PHOTO_X, 0, SEC_PHOTO_W, SH, fade_x(NAVY)),
         shape(17, "Photo Foot Scrim", SEC_PHOTO_X, SH - 2057400, SEC_PHOTO_W, 2057400,
               scrim(NAVY)),
         # flat, not a fade: the column is teal-side top to bottom, so a scrim
         # that fades out leaves whichever end it fades toward failing
         shape(20, "Ask Veil", 0, 0, SEC_PHOTO_X, SH, solid(DEEP, 55)),
         placeholder(12, "Title Placeholder", "title", MX, 1554480, SEC_TEXT_W, 1188720,
                     [S("ขอบคุณครับ", sz=T_SECTION, color=PAPER, bold=True,
                        font="mj", line=108000)], anchor="b"),
         _rule(13, y=2926080, color=PAPER, alpha=70),
         placeholder(14, "Next Steps Label", "body", ASK_X, 3200400, 2743200, 228600,
                     [S("ขั้นตอนถัดไป", sz=T_LABEL, color=PAPER, alpha=75, bold=True,
                        spc=120, line=100000)], idx=1, anchor="ctr"),
         placeholder(15, "Next Steps", "body", ASK_X, 3474720, ASK_W, 1188720,
                     [S("สิ่งที่ต้องเกิดขึ้นต่อ พร้อมผู้รับผิดชอบ", sz=T_BODY2, color=PAPER,
                        alpha=92, bullet=True, bullet_auto=True,
                        bullet_color=PAPER, indent=320040, marL=320040,
                        line=lnspc(1.40), space_before=400)], idx=2),
         # 20pt Kanit at full PAPER, over 16pt at 92%: this is the one sentence
         # naming what NCT wants and by when, and it was the quietest line in the
         # block - 14pt TEAL_UP under the steps it is supposed to close
         placeholder(18, "Decision By", "body", ASK_X, 4709160, ASK_W, 457200,
                     [S("ต้องการคำตอบภายในวันที่ ...", sz=T_LEAD, color=PAPER,
                        bold=True, font="mj", line=115000)], idx=3, anchor="ctr"),
         placeholder(19, "Contact", "body", ASK_X, 5303520, ASK_W, 731520,
                     [S("โทร · 0X-XXX-XXXX", sz=T_BODY3, color=PAPER, alpha=88,
                        line=lnspc(1.35))], idx=4),
         _foot_scrim(21)]
    s += chrome(dark=True, mark_rid=rid_mark_white)
    return _wrap("10 Closing / Contact", "obj", s, bgfill=grad(TEAL_B, NAVY, 45, c_mid=MID))


# ---------------------------------------------------------------- 11 Split Panel
def l11_split(rid_mark_color):
    PY, PH = BODY_Y, 3810000
    s = [_title(10), _rule(11),
         shape(12, "Context Panel", MX, PY, HALF, PH, solid(NAVY)),
         placeholder(13, "Context Kicker", "body", MX + PAD, PY + PAD, HALF - 2 * PAD, 365760,
                     [S("สภาพปัจจุบัน", sz=T_LEAD, color=PAPER, bold=True, font="mj",
                        line=115000)], idx=1, anchor="t"),
         # dark panel: PAPER at alpha, never INK -- v1 §3 colour rule
         placeholder(14, "Context Body", "body", MX + PAD, PY + PAD + 548640,
                     HALF - 2 * PAD, PH - PAD - 548640,
                     dense_specs(["บริบทหรือปัญหาที่พบ", "ระดับที่สอง"],
                                 color=PAPER, alpha=88, bullet_color=accent_up()), idx=2),
         shape(15, "Outcome Panel", MX + HALF + GUT, PY, HALF, PH, solid(PAPER2)),
         placeholder(16, "Outcome Kicker", "body", MX + HALF + GUT + PAD, PY + PAD,
                     HALF - 2 * PAD, 365760,
                     [S("สิ่งที่จะเกิดขึ้น", sz=T_LEAD, color=NAVY, bold=True, font="mj",
                        line=115000)], idx=3, anchor="t"),
         placeholder(17, "Outcome Body", "body", MX + HALF + GUT + PAD, PY + PAD + 548640,
                     HALF - 2 * PAD, PH - PAD - 548640,
                     dense_specs(["แนวทางหรือผลลัพธ์ที่เสนอ", "ระดับที่สอง"]), idx=4),
         shape(18, "Takeaway Band", MX, PY + PH + 137160, CW, 411480, solid(PAPER2)),
         placeholder(19, "Takeaway Label", "body", MX + 182880, PY + PH + 137160 + 60960,
                     1828800, 289560,
                     [S("สรุป", sz=T_LABEL, color=accent(), bold=True, spc=120,
                        line=100000)], idx=5, anchor="ctr"),
         placeholder(20, "Takeaway Copy", "body", MX + 2011680, PY + PH + 137160 + 60960,
                     CW - 2011680 - 182880, 289560,
                     [S("ประเด็นสรุปหนึ่งบรรทัด", sz=T_BODY3, color=INK, line=100000)],
                     idx=6, anchor="ctr")]
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("11 Split Panel", "twoObj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 12 Four Cards + Band
def l12_cards_band(rid_mark_color):
    CARD_Y, CARD_H = BODY_Y, 3474720
    CATS = [CAT_1, CAT_2, CAT_3, CAT_4]
    s = [_title(10), _rule(11)]
    sid = 12
    for i in range(4):
        x = MX + i * (QUARTER + GUT)
        s.append(shape(sid, "Card %d" % (i + 1), x, CARD_Y, QUARTER, CARD_H,
                       solid(PAPER2))); sid += 1
        s.append(shape(sid, "Card %d Tab" % (i + 1), x + PAD, CARD_Y + PAD, 205740, 45720,
                       solid(CATS[i]))); sid += 1
        s.append(placeholder(sid, "Card %d Number" % (i + 1), "body",
                             x + PAD, CARD_Y + PAD + 137160, QUARTER - 2 * PAD, 411480,
                             [S("0%d" % (i + 1), sz=T_STEPNUM, color=CATS[i], bold=True,
                                font="mj", line=100000)], idx=PH_FREE + i * 3, anchor="t")); sid += 1
        s.append(placeholder(sid, "Card %d Heading" % (i + 1), "body",
                             x + PAD, CARD_Y + PAD + 640080, QUARTER - 2 * PAD, 548640,
                             [S("หัวข้อ %d" % (i + 1), sz=T_DENSEHEAD, color=NAVY, bold=True,
                                font="mj", line=118000)], idx=PH_FREE + i * 3 + 1, anchor="t")); sid += 1
        s.append(placeholder(sid, "Card %d Body" % (i + 1), "body",
                             x + PAD, CARD_Y + PAD + 1280160, QUARTER - 2 * PAD,
                             CARD_H - 2 * PAD - 1280160,
                             [S("คำอธิบายสั้น ๆ", sz=T_DENSEBODY, color=INK, line=132000,
                                space_before=200)], idx=PH_FREE + i * 3 + 2, anchor="t")); sid += 1
    s.append(shape(sid, "Band", MX, CARD_Y + CARD_H + 137160, CW, 548640, solid(NAVY)))
    sid += 1
    s.append(placeholder(sid, "Band Label", "body", MX + 228600,
                         CARD_Y + CARD_H + 137160 + 91440, 2011680, 365760,
                         [S("สรุป", sz=T_LABEL, color=accent_up(), bold=True, spc=120,
                            line=100000)], idx=PH_FREE + 12, anchor="ctr")); sid += 1
    s.append(placeholder(sid, "Band Copy", "body", MX + 2240280,
                         CARD_Y + CARD_H + 137160 + 91440, CW - 2240280 - 228600, 365760,
                         [S("ประเด็นสรุปรวมสี่การ์ด", sz=T_BODY3, color=PAPER, line=130000)],
                         idx=PH_FREE + 13, anchor="ctr"))
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("12 Four Cards + Band", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 13 Process Flow
def l13_process(rid_mark_color):
    STEP_Y, STEP_H = 2377440, 1828800
    s = [_title(10), _rule(11),
         placeholder(12, "Subtitle", "body", MX, 1691640, CW, 411480,
                     [S("คำโปรยหนึ่งบรรทัด", sz=T_BODY3, color=INK2, line=130000)], idx=1)]
    sid = 13
    n = 5
    for i in range(n):
        x = MX + i * (FIFTH + GUT)
        s.append(shape(sid, "Step %d" % (i + 1), x, STEP_Y, FIFTH, STEP_H,
                       solid(PAPER2))); sid += 1
        s.append(shape(sid, "Step %d Chip" % (i + 1), x + 228600, STEP_Y + 228600,
                       311280, 311280, solid(accent()), prst="ellipse")); sid += 1
        s.append(placeholder(sid, "Step %d Chip Num" % (i + 1), "body",
                             x + 228600, STEP_Y + 228600, 311280, 311280,
                             [S(str(i + 1), sz=1400, color=PAPER, bold=True, font="mj",
                                algn="ctr", line=100000)], idx=PH_FREE + i * 3, anchor="ctr")); sid += 1
        s.append(placeholder(sid, "Step %d Head" % (i + 1), "body",
                             x + 228600, STEP_Y + 731520, FIFTH - 457200, 411480,
                             [S("ขั้นตอน %d" % (i + 1), sz=T_DENSEHEAD, color=NAVY, bold=True,
                                font="mj", line=115000)], idx=PH_FREE + i * 3 + 1, anchor="t")); sid += 1
        s.append(placeholder(sid, "Step %d Body" % (i + 1), "body",
                             x + 228600, STEP_Y + 1143000, FIFTH - 457200, 640080,
                             [S("คำอธิบายสั้น", sz=T_DENSEBODY, color=INK, line=128000)],
                             idx=PH_FREE + i * 3 + 2, anchor="t")); sid += 1
        if i < n - 1:
            cx = x + FIFTH + GUT // 2 - 45720
            s.append(shape(sid, "Connector %d" % (i + 1), cx, STEP_Y + STEP_H // 2 - 45720,
                           91440, 91440, solid(accent()), prst="chevron")); sid += 1
    s.append(shape(sid, "Result Band", MX, STEP_Y + STEP_H + 137160, CW, 548640,
                   solid(PAPER2))); sid += 1
    s.append(placeholder(sid, "Result Label", "body", MX + 228600,
                         STEP_Y + STEP_H + 137160 + 91440, 2011680, 365760,
                         [S("ผลลัพธ์", sz=T_LABEL, color=accent(), bold=True, spc=120,
                            line=100000)], idx=PH_FREE + 15, anchor="ctr")); sid += 1
    s.append(placeholder(sid, "Result Copy", "body", MX + 2240280,
                         STEP_Y + STEP_H + 137160 + 91440, CW - 2240280 - 228600, 365760,
                         [S("ผลลัพธ์รวมของกระบวนการ", sz=T_BODY3, color=INK, line=130000)],
                         idx=PH_FREE + 16, anchor="ctr"))
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("13 Process Flow", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 14 Diagram Canvas
def l14_diagram(rid_mark_color):
    s = [_title(10), _rule(11),
         placeholder(12, "Subtitle", "body", MX, BODY_Y, CW, 228600,
                     [S("คำโปรยหนึ่งบรรทัด", sz=T_BODY3, color=INK2, line=130000)], idx=1),
         # v2 §14: the drawing area carries NO shape of its own - a dashed guide
         # here would print on every slide built from this layout
         placeholder(14, "Legend", "body", MX, NOTE_Y, CW, NOTE_H,
                     [S("คำอธิบายสัญลักษณ์", sz=T_DENSEBODY, color=INK2, line=130000)],
                     idx=2)]
    s += _takeaway(15, 3)
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("14 Diagram Canvas", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 15 Agenda (variant of 02)
def l15_agenda(rid_mark_white, rid_photo):
    # same band as L02 - 15 is a chapter opener too, not a content slide
    s = [pic(9, "Section Photo", rid_photo, SEC_PHOTO_X, 0, SEC_PHOTO_W, SH),
         shape(10, "Photo Fade", SEC_PHOTO_X, 0, SEC_PHOTO_W, SH, fade_x(NAVY)),
         shape(19, "Photo Foot Scrim", SEC_PHOTO_X, SH - 2057400, SEC_PHOTO_W, 2057400,
               scrim(NAVY)),
         placeholder(11, "Section Number", "body", MX, 1737360, 2286000, 1005840,
                     [S("01", sz=6000, color=accent_up(), bold=True, font="mj", line=100000)],
                     idx=1, anchor="b"),
         _rule(12, y=2834640, color=accent_up()),
         placeholder(13, "Title Placeholder", "title", MX, 2926080, SEC_TEXT_W, 1188720,
                     [S("ชื่อบท", sz=T_SECTION, color=PAPER, bold=True, font="mj",
                        line=108000)], anchor="t"),
         # The same unit bug as L10, on a layout nobody had looked at: 145% was
         # the web's line-height, and at spcPct it is 1.5x that. The note that
         # used to sit here said six lines stopped 12px short of the footer rule.
         # They did not - preview/layout-15.png has the sixth agenda item ending
         # 29px BELOW it. Converted, six lines clear the rule by 0.07in at the
         # documented ceiling, with the 18pt type intact.
         placeholder(14, "Agenda List", "body", MX, 3931920, SEC_TEXT_W, 2194560,
                     [S("หัวข้อที่หนึ่ง", sz=T_BODY, color=PAPER, alpha=88, bullet=True,
                        bullet_color=accent_up(), indent=274320, marL=274320,
                        line=lnspc(1.45), space_before=300),
                      S("หัวข้อที่สอง", sz=T_BODY, color=PAPER, alpha=88, bullet=True,
                        bullet_color=accent_up(), indent=274320, marL=274320,
                        line=lnspc(1.45), space_before=300),
                      S("หัวข้อที่สาม", sz=T_BODY, color=PAPER, alpha=88, bullet=True,
                        bullet_color=accent_up(), indent=274320, marL=274320,
                        line=lnspc(1.45), space_before=300)], idx=2)]
    s += chrome(dark=True, mark_rid=rid_mark_white)
    return _wrap("15 Agenda", "secHead", s, bgfill=solid(NAVY))


# ---------------------------------------------------------------- 16 Dense Table (variant of 09)
def l16_dense_table(rid_mark_color):
    s = [_title(10), _rule(11),
         placeholder(12, "Intro", "body", MX, BODY_Y, CW, 228600,
                     [S("ประโยคนำหนึ่งบรรทัด", sz=T_DENSEBODY, color=INK2, line=130000)],
                     idx=2),
         # the strip and the note cost this table 0.55in of grid: eight to nine
         # rows now, not eight to ten. Split the slide rather than shrink the type.
         tbl_placeholder(13, "Table Placeholder", MX, 2011680, CW, 3154680, 1),
         # the note line carries two things: the key for any category coding on
         # the left, the source note on the right. A coded column with no key on
         # the slide leaves identity to colour alone
         #
         # The swatches carry the category colours, the labels stay INK2. One
         # grey run for the whole line is what shipped before, and a key whose
         # three squares are the same grey decodes nothing - it is the only
         # element on the slide whose entire job is to be the colours it names.
         placeholder(14, "Category Key", "body", MX, NOTE_Y, CW // 2, NOTE_H,
                     [S("", sz=T_DENSECELL, color=INK2, line=130000,
                        runs=[("■ ", dict(color=CAT_1, bold=True)), ("หมวด 1   ", {}),
                              ("■ ", dict(color=CAT_2, bold=True)), ("หมวด 2   ", {}),
                              ("■ ", dict(color=CAT_3, bold=True)), ("หมวด 3", {})])],
                     idx=3),
         placeholder(19, "Footnote", "body", MX + CW // 2, NOTE_Y, CW // 2, NOTE_H,
                     [S("ที่มาของข้อมูล / หมายเหตุ", sz=T_DENSECELL, color=INK2,
                        algn="r", line=130000)], idx=4)]
    s += _takeaway(15, 5)
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("16 Dense Table", "tbl", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 17 Phase Card
def l17_phase(rid_mark_color):
    """A stage of the implementation plan: the activity/participant pair on top,
    then an outlined canvas tabbed with the phase number.

    The tab is centred on the card's top border. The source protrudes it left of
    the card by 0, 0.32, 0.42 and 0.69cm across its five slides - copy-paste
    jitter, not a decision, and on three of the five it starts outside the
    margin. Flush at MX here; only the vertical overlap is kept.
    """
    A = accent()
    LAB_W = 1500000                       # "Key Activity :" - fits the longer of the two
    PAD_S = 228600                        # 0.25in, inside the card
    meta_h = 2 * PHASE_META_H
    card_y = BODY_Y + meta_h + GUT + PHASE_TAB_H // 2
    card_h = BODY_Y + BODY_H - card_y
    s = [_title(10), _rule(11)]
    sid = 12
    for i, (lab, val) in enumerate((("Key Activity", "กิจกรรมหลักของเฟสนี้"),
                                    ("Participant", "ผู้เกี่ยวข้องในเฟสนี้"))):
        y = BODY_Y + i * PHASE_META_H
        s.append(placeholder(sid, "%s Label" % lab, "body", MX, y, LAB_W, PHASE_META_H,
                             [S("%s :" % lab, sz=T_BODY3, color=INK, bold=True,
                                font="mj", line=130000)], idx=i * 2 + 1, anchor="ctr"))
        sid += 1
        s.append(placeholder(sid, "%s Value" % lab, "body", MX + LAB_W, y,
                             CW - LAB_W, PHASE_META_H,
                             [S(val, sz=T_BODY3, color=INK, line=130000)],
                             idx=i * 2 + 2, anchor="ctr"))
        sid += 1
    s.append(shape(sid, "Phase Card", MX, card_y, CW, card_h, nofill(),
                   line='<a:ln w="12700">%s</a:ln>' % solid(A)))
    sid += 1
    # the tab: one pill, number cell then label. adj 50000 gives a full end-cap,
    # which is what the source draws on both ends - not a third card radius.
    tab_w = PHASE_NUM_W + 2926080
    s.append(shape(sid, "Phase Tab", MX, card_y - PHASE_TAB_H // 2, tab_w,
                   PHASE_TAB_H, solid(A), prst="roundRect",
                   adj='<a:gd name="adj" fmla="val 50000"/>'))
    sid += 1
    s.append(placeholder(sid, "Phase Number", "body", MX + 91440,
                         card_y - PHASE_TAB_H // 2, PHASE_NUM_W, PHASE_TAB_H,
                         [S("01", sz=T_DENSEHEAD, color=PAPER, bold=True, font="mj",
                            algn="ctr", line=100000)], idx=5, anchor="ctr"))
    sid += 1
    lab_x = 91440 + PHASE_NUM_W + 137160
    # the hairline between the number cell and the label, same as .nct-phase__num
    s.append(shape(sid, "Phase Tab Divider", MX + lab_x - 137160,
                   card_y - PHASE_TAB_H // 2 + 68580, 12700, PHASE_TAB_H - 137160,
                   solid(PAPER, 32)))
    sid += 1
    s.append(placeholder(sid, "Phase Label", "body", MX + lab_x,
                         card_y - PHASE_TAB_H // 2, tab_w - lab_x - 137160, PHASE_TAB_H,
                         [S("ชื่อเฟส", sz=T_BODY3, color=PAPER, bold=True, font="mj",
                            line=100000)], idx=6, anchor="ctr"))
    sid += 1
    s.append(placeholder(sid, "Phase Intro", "body", MX + PAD_S,
                         card_y + PHASE_TAB_H // 2 + 91440, CW - 2 * PAD_S, 274320,
                         [S("ประโยคนำหนึ่งบรรทัด", sz=T_DENSEBODY, color=INK2,
                            line=132000)], idx=7))
    sid += 1
    body_top = card_y + PHASE_TAB_H // 2 + 91440 + 274320 + 91440
    s.append(placeholder(sid, "Phase Body", "body", MX + PAD_S, body_top,
                         CW - 2 * PAD_S, card_y + card_h - PAD_S - body_top,
                         dense_specs(["เนื้อหาของเฟส", "ระดับที่สอง"],
                                     bullet_color=A), idx=8))
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("17 Phase Card", "obj", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 18 Evidence Strip
def l18_evidence(rid_mark_color):
    """A claim, a one-line finding, and three frames of proof underneath it.

    The band above the strip is the takeaway, not a section label. The source
    puts "SAMPLE OF TRAINING SETUP" there, which names the photographs without
    saying what they prove - the slide ends on evidence with no finding.

    The frames are the deck's receipts: screenshots of the real system, photos
    of the real room. Stock imagery here is worse than no strip at all.
    """
    A = accent()
    CAP_H, CAP_GAP = 228600, 57150
    kick_h = PHASE_TAB_H
    claim_y = BODY_Y + kick_h + 137160
    strip_y = BODY_Y + BODY_H - EVIDENCE_H
    band_y = strip_y - 137160 - TAKE_H
    s = [_title(10), _rule(11),
         shape(12, "Kicker Pill", MX, BODY_Y, 3200400, kick_h, solid(A),
               prst="roundRect", adj='<a:gd name="adj" fmla="val 50000"/>'),
         placeholder(13, "Kicker", "body", MX + 182880, BODY_Y, 3200400 - 365760,
                     kick_h, [S("หัวข้อของหลักฐาน", sz=T_BODY3, color=PAPER, bold=True,
                                font="mj", algn="ctr", line=100000)], idx=1,
                     anchor="ctr"),
         tbl_placeholder(14, "Claim Placeholder", MX, claim_y, CW,
                         band_y - 137160 - claim_y, 2),
         # the takeaway on this layout is dark, not tinted: it is the strip's
         # header as well as the finding, and it has to hold the two apart
         shape(15, "Takeaway Band", MX, band_y, CW, TAKE_H, solid(NAVY)),
         placeholder(16, "Takeaway Label", "body", MX + 182880,
                     band_y + (TAKE_H - 289560) // 2, 1828800, 289560,
                     [S("สรุป", sz=T_LABEL, color=accent_up(), bold=True, spc=120,
                        line=100000)], idx=3, anchor="ctr"),
         placeholder(17, "Takeaway Copy", "body", MX + 2011680,
                     band_y + (TAKE_H - 289560) // 2, CW - 2011680 - 182880, 289560,
                     [S("ข้อสรุปหนึ่งบรรทัด", sz=T_BODY3, color=PAPER, line=100000)],
                     idx=4, anchor="ctr")]
    sid, idx = 18, PH_FREE
    for i in range(3):
        x = MX + i * (THIRD + GUT)
        s.append(placeholder(sid, "Caption %d" % (i + 1), "body", x, strip_y, THIRD,
                             CAP_H, [S("สิ่งที่เห็นในภาพ", sz=T_DENSEBODY, color=INK2,
                                       line=130000)], idx=idx, anchor="ctr"))
        sid += 1
        idx += 1
        # the hairline .nct-evidence__media draws on the web. It is also what
        # makes an unfilled strip read as three frames waiting for a screenshot
        # rather than as blank space.
        s.append(shape(sid, "Evidence %d Frame" % (i + 1), x,
                       strip_y + CAP_H + CAP_GAP, THIRD,
                       EVIDENCE_H - CAP_H - CAP_GAP, nofill(),
                       line='<a:ln w="12700">%s</a:ln>' % solid(RULE)))
        sid += 1
        s.append(pic_placeholder(sid, "Evidence %d" % (i + 1), x,
                                 strip_y + CAP_H + CAP_GAP, THIRD,
                                 EVIDENCE_H - CAP_H - CAP_GAP, idx))
        sid += 1
        idx += 1
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("18 Evidence Strip", "picTx", s, bgfill=solid(PAPER))


# ---------------------------------------------------------------- 19 Chart + Insight (v4)
def l19_chart(rid_mark_color):
    """One chart on eight columns, the number it proves on the other four.

    The figure and the chart have to be the same story - a big number that does
    not come out of the chart beside it is L06. The chart box includes its own
    x-axis band (v4 §4): a frame sized to the plot alone is how axis labels end
    up under the source note. Charts sit on paper only, so there is no dark
    variant of this layout.
    """
    CHART_W = 8 * COL + 7 * GUT
    CHART_H = 3474720                    # 3.80in - ends at 5.65in, above the note
    RAIL_X, FIG_H = colx(8), 1005840     # 1.10in
    INS_Y = BODY_Y + 1600200             # 1.75in into the body
    s = [_title(10), _rule(11),
         chart_placeholder(12, "Chart Placeholder", MX, BODY_Y, CHART_W, CHART_H, 1),
         placeholder(13, "Figure", "body", RAIL_X, BODY_Y, THIRD, FIG_H,
                     [S("00%", sz=T_STAT, color=NAVY, bold=True, font="mj",
                        line=100000)], idx=2, anchor="b"),
         placeholder(14, "Figure Label", "body", RAIL_X, BODY_Y + FIG_H, THIRD, 457200,
                     [S("ตัวเลขนี้วัดอะไร", sz=T_LABEL, color=INK2, bold=True, spc=120,
                        line=130000)], idx=3, anchor="t"),
         placeholder(15, "Insight", "body", RAIL_X, INS_Y, THIRD,
                     BODY_Y + CHART_H - INS_Y,
                     [S("สิ่งที่กราฟบอก ไม่เกินสามข้อ", sz=T_BODY2, color=INK, bullet=True,
                        bullet_color=accent(), indent=228600, marL=228600,
                        line=lnspc(1.3), space_before=600)], idx=4),
         placeholder(16, "Source", "body", MX, NOTE_Y, CW, NOTE_H,
                     [S("ที่มาของข้อมูล", sz=T_DENSECELL, color=INK2, line=130000)],
                     idx=5)]
    s += _takeaway(17, 6)
    s += chrome(dark=False, mark_rid=rid_mark_color)
    return _wrap("19 Chart + Insight", "chartAndTx", s, bgfill=solid(PAPER))
