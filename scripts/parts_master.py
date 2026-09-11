# -*- coding: utf-8 -*-
"""NCT slide master: the light default, plus the footer chrome every layout repeats."""
from tokens import *
from ooxml import *

FOOT_Y = SH - 548640            # 6309360
MARK_W = 274320                 # 0.30in corner mark
MARK_H = int(MARK_W * 229 / 360)
SLDNUM_GUID = "{B7E3A1C2-4F5D-4A88-9C1E-6D2F0A93B451}"


# outline levels -- one definition drives the master txStyles AND every body layout
EN_DASH = "&#8211;"
MID_DOT = "&#183;"
BODY_LEVELS = [
    dict(sz=T_BODY,  color=INK,  bullet=True, indent=228600, marL=228600,
         line=124000, space_before=1000),
    dict(sz=T_BODY2, color=INK,  bullet=True, bullet_char=EN_DASH, bullet_color=INK2,
         indent=228600, marL=685800, line=124000, space_before=700),
    dict(sz=T_BODY3, color=INK2, bullet=True, bullet_char=MID_DOT, bullet_color=INK2,
         indent=228600, marL=1143000, line=124000, space_before=500),
    dict(sz=T_BODY3, color=INK2, bullet=True, bullet_char=MID_DOT, bullet_color=INK2,
         indent=228600, marL=1600200, line=124000, space_before=400),
    dict(sz=T_BODY3, color=INK2, bullet=True, bullet_char=MID_DOT, bullet_color=INK2,
         indent=228600, marL=2057400, line=124000, space_before=400),
]


def txstyles():
    title = ('<p:titleStyle>%s</p:titleStyle>'
             % lvl_ppr(1, sz=T_H1, color=heading(),
                       bold=True, font="mj", line=108000))
    body = ('<p:bodyStyle>'
            + "".join(lvl_ppr(i + 1, **kw) for i, kw in enumerate(_levels()))
            + '</p:bodyStyle>')
    other = ('<p:otherStyle>%s</p:otherStyle>' % lvl_ppr(1, sz=T_BODY, color=INK))
    return title + body + other


def accent():
    """The brand's accent, resolved at call time because BRAND is set after import.

    Every layout reads this instead of naming TEAL, the same way slides.css reads
    --nct-accent. It used to be layouts 17-18 only, so a corp deck drew a CORP
    full-bleed rule over TEAL step chips two inches below it - the one thing
    design.md says the two brands must never do.

    It lives here rather than in parts_layouts because the master's own body
    levels need it too: level 1's bullet had no bullet_color, so it fell through
    to ooxml's house default and every corp deck's outline bullets came out
    #216B7F under a #006666 rule. parts_layouts re-exports it.

    What does NOT read this: the four category colours on L12. A taxonomy that
    changes colour with the letterhead is not one. check_template.py fails a corp
    build on any other stray TEAL, because a rule this easy to break by typing a
    constant needs a check and not a convention.
    """
    return CORP if BRAND == "corp" else TEAL


def accent_up():
    """The accent lifted until it reads on a dark panel. Both brands' anchors
    fail there - TEAL is 2.8:1 on NAVY and CORP is 1.5:1 - so both keep a
    lifted twin, and both are unusable on paper."""
    return CORP_UP if BRAND == "corp" else TEAL_UP


def heading():
    """Heading ink below and including the title. The corporate template sets its
    titles near-black, and a card heading in house navy under an INK title was
    the same two-brands-on-one-slide mix accent() exists to stop."""
    return INK if BRAND == "corp" else NAVY


def dark():
    """Fill of a header band, dark panel, dark slide or system box. CORP_DEEP was
    declared for exactly this and read by nothing - see tokens.py."""
    return CORP_DEEP if BRAND == "corp" else NAVY


def _levels():
    """BODY_LEVELS with the one brand-sensitive value filled in."""
    lv = [dict(kw) for kw in BODY_LEVELS]
    lv[0]["bullet_color"] = accent()
    return lv


def body_specs(prompts):
    return [S(p, **_levels()[i]) for i, p in enumerate(prompts)]


def sldnum_sp(sid, dark, x=None, y=None, w=1371600):
    """The page-number field. Public because the corp cover builds its own foot
    - no bar, no lockup - and still needs this one piece of it."""
    c = PAPER if dark else INK2
    # the run used to say 60 while its own lstStyle said 72, and the run wins:
    # every dark slide's page number sat under the floor the footer beside it met
    alpha = '<a:alpha val="%d"/>' % (ON_DARK_3 * 1000) if dark else ''
    x = (SW - MX - w) if x is None else x
    y = FOOT_Y if y is None else y
    return ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="Slide Number Placeholder"/>'
            '<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            '<p:nvPr><p:ph type="sldNum" sz="quarter" idx="12"/></p:nvPr></p:nvSpPr>'
            '<p:spPr>%s<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>'
            '<p:txBody><a:bodyPr anchor="ctr"/>%s'
            '<a:p><a:pPr algn="r" marL="0" indent="0"><a:buNone/></a:pPr>'
            '<a:fld id="%s" type="slidenum">'
            '<a:rPr lang="th-TH" sz="%d"><a:solidFill><a:srgbClr val="%s">%s</a:srgbClr>'
            '</a:solidFill><a:latin typeface="+mn-lt"/><a:cs typeface="+mn-cs"/></a:rPr>'
            '<a:t>2</a:t></a:fld><a:endParaRPr lang="th-TH" sz="%d"/></a:p></p:txBody></p:sp>'
            % (sid, xfrm(x, y, w, 274320),
               lst_style([dict(sz=T_FOOT, color=c, algn="r",
                               alpha=ON_DARK_3 if dark else None)]),
               SLDNUM_GUID, T_FOOT, c, alpha, T_FOOT))


# Build-time brand switch, set once by build.py before the layout pass. A
# PowerPoint layout cannot toggle its own chrome the way the React <Deck> can -
# the chrome is baked into the layout - so the corp deck is a second .potx built
# from the same source rather than a second set of layouts inside one file.
BRAND = "web"


def _corp_chrome(dark, mark_rid, first_id):
    """v3: the chrome NCT Template.pptx requires on every bid - three-segment
    foot bar hard against the bottom-left corner, page number right, and the
    outlined lockup card bled off the top-right. No hairline and no date slot:
    the corporate template draws neither, and the bar is already the horizontal
    the rule would have been."""
    out = []
    c = PAPER if dark else INK2
    alpha = ON_DARK_3 if dark else None
    bar_y = SH - CORP_BAR_H - 45720
    for i, col in enumerate((CORP, CORP_BAR_MID, CORP_DIM)):
        out.append(shape(first_id + i, "Foot Bar %d" % (i + 1), i * CORP_BAR_SEG,
                         bar_y, CORP_BAR_SEG, CORP_BAR_H, solid(col)))
    # the footer slot survives so a deck can still carry a job name; it starts
    # clear of the bar instead of centring on a rule that no longer exists
    out.append(placeholder(first_id + 3, "Footer Placeholder", "ftr",
                           3 * CORP_BAR_SEG + 228600, SH - 457200, 4572000, 274320,
                           [S("", sz=T_FOOT, color=c, alpha=alpha)], idx=11,
                           anchor="ctr"))
    out.append(sldnum_sp(first_id + 4, dark, x=SW - 228600 - 1371600, y=SH - 457200))
    # white card on an accent outline - it only reads on a light ground, and the
    # source's own dark slides carry the bare mark instead
    if mark_rid and not dark:
        lx, lh = SW - CORP_LOCK_W, CORP_LOCK_H
        # the box runs from -lh/2 to +lh; rot=180 puts the two rounded corners at
        # the bottom, and the top edge sits off-canvas so its outline is clipped
        out.append(shape(first_id + 5, "Corner Lockup", lx, -lh // 2,
                         CORP_LOCK_W, lh + lh // 2, solid(PAPER),
                         prst="round2SameRect", rot=10800000,
                         adj='<a:gd name="adj1" fmla="val 12000"/>'
                             '<a:gd name="adj2" fmla="val 0"/>',
                         line='<a:ln w="12700">%s</a:ln>' % solid(CORP)))
        # only the lower half of the card is on canvas, so the mark is centred
        # in CORP_LOCK_H, not in the shape's own box
        mw = 548640
        mh = int(mw * MARK_H / MARK_W)
        out.append(pic(first_id + 6, "NCT Mark", mark_rid,
                       lx + (CORP_LOCK_W - mw) // 2, (CORP_LOCK_H - mh) // 2, mw, mh))
    return out


def chrome(dark=False, mark_rid=None, first_id=90):
    """hairline + date + footer + page number + corner mark, shared by every layout

    72, not 55: PAPER at 55% measured 4.26:1 on NAVY and 3.00:1 on the light end
    of the two gradients, under the 4.5:1 a 10pt line needs. L01 and L10 also get
    a foot scrim, because no alpha clears AA on TEAL_B.
    """
    if BRAND == "corp":
        return _corp_chrome(dark, mark_rid, first_id)
    out = []
    c = PAPER if dark else INK2
    alpha = ON_DARK_3 if dark else None
    out.append(shape(first_id, "Footer Rule", MX, FOOT_Y - 137160, CW, 12700,
                     solid(PAPER if dark else RULE, ON_DARK_RULE if dark else None)))
    out.append(placeholder(first_id + 1, "Date Placeholder", "dt", MX, FOOT_Y, 2743200, 274320,
                           [S("", sz=T_FOOT, color=c, alpha=alpha)], idx=10, anchor="ctr"))
    out.append(placeholder(first_id + 2, "Footer Placeholder", "ftr",
                           MX + 3657600, FOOT_Y, 3657600, 274320,
                           [S("", sz=T_FOOT, color=c, algn="ctr", alpha=alpha)],
                           idx=11, anchor="ctr"))
    out.append(sldnum_sp(first_id + 3, dark))
    if mark_rid:
        out.append(pic(first_id + 4, "NCT Mark", mark_rid,
                       SW - MX - MARK_W - 1508760, FOOT_Y - 20000, MARK_W, MARK_H))
    return out


def slide_master(mark_rid, n_layouts=16):
    s = []
    corp = BRAND == "corp"
    s.append(placeholder(2, "Title Placeholder", "title", MX, TITLE_Y, CW, TITLE_H,
                         [S("แก้ไขรูปแบบชื่อเรื่องต้นแบบ", sz=T_H1,
                            color=heading(),
                            bold=True, font="mj", line=108000)], anchor="b"))
    s.append(shape(3, "Title Rule", 0 if corp else MX, RULE_Y,
                   SW if corp else RULE_W, CORP_RULE_H if corp else RULE_H,
                   solid(CORP if corp else TEAL)))
    s.append(placeholder(4, "Text Placeholder", "body", MX, BODY_Y, CW, BODY_H,
                         body_specs(["แก้ไขรูปแบบข้อความต้นแบบ", "ระดับที่สอง", "ระดับที่สาม"]),
                         idx=1))
    s += chrome(dark=False, mark_rid=mark_rid)
    layout_ids = "".join('<p:sldLayoutId id="%d" r:id="rId%d"/>' % (2147483649 + i, i + 1)
                         for i in range(n_layouts))
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<p:sldMaster %s>%s'
            '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" '
            'accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" '
            'accent6="accent6" hlink="hlink" folHlink="folHlink"/>'
            '<p:sldLayoutIdLst>%s</p:sldLayoutIdLst>'
            '<p:txStyles>%s</p:txStyles></p:sldMaster>'
            % (NS_P, spTree("NCT Master", s, bgfill=solid(PAPER)), layout_ids, txstyles()))
