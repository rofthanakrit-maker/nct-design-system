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
             % lvl_ppr(1, sz=T_H1, color=NAVY, bold=True, font="mj", line=108000))
    body = ('<p:bodyStyle>'
            + "".join(lvl_ppr(i + 1, **kw) for i, kw in enumerate(BODY_LEVELS))
            + '</p:bodyStyle>')
    other = ('<p:otherStyle>%s</p:otherStyle>' % lvl_ppr(1, sz=T_BODY, color=INK))
    return title + body + other





def body_specs(prompts):
    return [S(p, **BODY_LEVELS[i]) for i, p in enumerate(prompts)]


def _sldnum_sp(sid, dark):
    c = PAPER if dark else INK2
    alpha = '<a:alpha val="60000"/>' if dark else ''
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
            % (sid, xfrm(SW - MX - 1371600, FOOT_Y, 1371600, 274320),
               lst_style([dict(sz=T_FOOT, color=c, algn="r",
                               alpha=60 if dark else None)]),
               SLDNUM_GUID, T_FOOT, c, alpha, T_FOOT))


def chrome(dark=False, mark_rid=None, first_id=90):
    """hairline + date + footer + page number + corner mark, shared by every layout"""
    out = []
    c = PAPER if dark else INK2
    alpha = 55 if dark else None
    out.append(shape(first_id, "Footer Rule", MX, FOOT_Y - 137160, CW, 12700,
                     solid(PAPER if dark else RULE, 22 if dark else None)))
    out.append(placeholder(first_id + 1, "Date Placeholder", "dt", MX, FOOT_Y, 2743200, 274320,
                           [S("", sz=T_FOOT, color=c, alpha=alpha)], idx=10, anchor="ctr"))
    out.append(placeholder(first_id + 2, "Footer Placeholder", "ftr",
                           MX + 3657600, FOOT_Y, 3657600, 274320,
                           [S("", sz=T_FOOT, color=c, algn="ctr", alpha=alpha)],
                           idx=11, anchor="ctr"))
    out.append(_sldnum_sp(first_id + 3, dark))
    if mark_rid:
        out.append(pic(first_id + 4, "NCT Mark", mark_rid,
                       SW - MX - MARK_W - 1508760, FOOT_Y - 20000, MARK_W, MARK_H))
    return out


def slide_master(mark_rid, n_layouts=16):
    s = []
    s.append(placeholder(2, "Title Placeholder", "title", MX, TITLE_Y, CW, TITLE_H,
                         [S("แก้ไขรูปแบบชื่อเรื่องต้นแบบ", sz=T_H1, color=NAVY,
                            bold=True, font="mj", line=108000)], anchor="b"))
    s.append(shape(3, "Title Rule", MX, RULE_Y, RULE_W, RULE_H, solid(TEAL)))
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
