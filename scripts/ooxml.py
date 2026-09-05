# -*- coding: utf-8 -*-
"""Low-level DrawingML/PresentationML fragment helpers.

A layout placeholder must carry BOTH:
  * <a:lstStyle>  - what a real slide inherits
  * prompt runs   - what the layout itself displays in the editor
Both are generated from one spec list so they can never drift apart.
"""
from tokens import *

NS_P = ('xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
        'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"')

BULLET = "&#8226;"


# ---------------------------------------------------------------- fills
def solid(hexv, alpha=None):
    a = '<a:alpha val="%d"/>' % int(alpha * 1000) if alpha is not None else ''
    return '<a:solidFill><a:srgbClr val="%s">%s</a:srgbClr></a:solidFill>' % (hexv, a)


def nofill():
    return '<a:noFill/>'


def grad(c1, c2, ang_deg=45, c_mid=None):
    mid = '<a:gs pos="55000"><a:srgbClr val="%s"/></a:gs>' % c_mid if c_mid else ''
    return ('<a:gradFill rotWithShape="1"><a:gsLst>'
            '<a:gs pos="0"><a:srgbClr val="%s"/></a:gs>%s'
            '<a:gs pos="100000"><a:srgbClr val="%s"/></a:gs>'
            '</a:gsLst><a:lin ang="%d" scaled="0"/></a:gradFill>'
            % (c1, mid, c2, int(ang_deg * 60000)))


def scrim(hexv=DEEP):
    """bottom-up dark scrim so white text stays legible over any photograph"""
    return ('<a:gradFill rotWithShape="1"><a:gsLst>'
            '<a:gs pos="0"><a:srgbClr val="%s"><a:alpha val="0"/></a:srgbClr></a:gs>'
            '<a:gs pos="55000"><a:srgbClr val="%s"><a:alpha val="60000"/></a:srgbClr></a:gs>'
            '<a:gs pos="100000"><a:srgbClr val="%s"><a:alpha val="90000"/></a:srgbClr></a:gs>'
            '</a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill>' % (hexv, hexv, hexv))


def fade_x(hexv=NAVY):
    """left-to-right fade: solid at the left edge, a thin veil at the right.

    Lets a photograph sit against a solid panel without a hard seam - the same
    job the CSS gradient does on .nct-section__photo-fade.
    """
    stops = ((0, 100000), (26000, 84000), (62000, 30000), (100000, 12000))
    gs = "".join('<a:gs pos="%d"><a:srgbClr val="%s"><a:alpha val="%d"/></a:srgbClr></a:gs>'
                 % (pos, hexv, a) for pos, a in stops)
    return ('<a:gradFill rotWithShape="1"><a:gsLst>%s</a:gsLst>'
            '<a:lin ang="0" scaled="0"/></a:gradFill>' % gs)


# ---------------------------------------------------------------- text
def _rpr(tag, sz, color, bold=False, font="mn", spc=0, italic=False, alpha=None):
    b = ' b="1"' if bold else ''
    i = ' i="1"' if italic else ''
    s = ' spc="%d"' % spc if spc else ''
    return ('<a:%s lang="th-TH" sz="%d"%s%s%s dirty="0">%s'
            '<a:latin typeface="+%s-lt"/><a:ea typeface="+%s-ea"/>'
            '<a:cs typeface="+%s-cs"/></a:%s>'
            % (tag, sz, b, i, s, solid(color, alpha), font, font, font, tag))


def rpr(sz, color, bold=False, font="mn", spc=0, italic=False, alpha=None):
    return _rpr("defRPr", sz, color, bold, font, spc, italic, alpha)


def _ppr_inner(line=100000, space_before=0, space_after=0, bullet=False, bullet_color=None,
               bullet_char=None, bullet_auto=False):
    out = '<a:lnSpc><a:spcPct val="%d"/></a:lnSpc>' % line
    if space_before:
        out += '<a:spcBef><a:spcPts val="%d"/></a:spcBef>' % space_before
    if space_after:
        out += '<a:spcAft><a:spcPts val="%d"/></a:spcAft>' % space_after
    if bullet and bullet_auto:
        # numbered, not bulleted - "1. 2. 3." is a sequence, a dot is a set
        out += ('<a:buClr><a:srgbClr val="%s"/></a:buClr><a:buSzPct val="90000"/>'
                '<a:buFont typeface="Arial"/><a:buAutoNum type="arabicPeriod"/>'
                % (bullet_color or TEAL))
    elif bullet:
        out += ('<a:buClr><a:srgbClr val="%s"/></a:buClr><a:buSzPct val="90000"/>'
                '<a:buFont typeface="Arial"/><a:buChar char="%s"/>'
                % (bullet_color or TEAL, bullet_char or BULLET))
    else:
        out += '<a:buNone/>'
    return out


def _ppr_attrs(algn="l", indent=0, marL=None):
    a = ' algn="%s"' % algn
    if indent or marL:
        a += ' marL="%d" indent="-%d"' % (marL if marL is not None else indent, indent)
    else:
        a += ' marL="0" indent="0"'
    return a


def lvl_ppr(n, sz=T_BODY, color=INK, bold=False, font="mn", algn="l", spc=0, italic=False,
            alpha=None, line=100000, bullet=False, bullet_color=None, bullet_char=None,
            bullet_auto=False,
            indent=0, marL=None, space_before=0, space_after=0):
    return ('<a:lvl%dpPr%s>%s%s</a:lvl%dpPr>'
            % (n, _ppr_attrs(algn, indent, marL),
               _ppr_inner(line, space_before, space_after, bullet, bullet_color,
                          bullet_char, bullet_auto),
               rpr(sz, color, bold, font, spc, italic, alpha), n))


def lst_style(specs):
    """specs: list of kwargs dicts, one per outline level"""
    return '<a:lstStyle>%s</a:lstStyle>' % "".join(
        lvl_ppr(i + 1, **kw) for i, kw in enumerate(specs))


def para(text, sz=T_BODY, color=INK, bold=False, font="mn", algn="l", spc=0, italic=False,
         alpha=None, line=100000, bullet=False, bullet_color=None, bullet_char=None,
         bullet_auto=False,
         indent=0, marL=None, space_before=0, space_after=0, lvl=0):
    lv = ' lvl="%d"' % lvl if lvl else ''
    run = ('<a:r>%s<a:t>%s</a:t></a:r>'
           % (_rpr("rPr", sz, color, bold, font, spc, italic, alpha), text)) if text \
        else '<a:endParaRPr lang="th-TH" sz="%d"/>' % sz
    return ('<a:p><a:pPr%s%s>%s</a:pPr>%s</a:p>'
            % (_ppr_attrs(algn, indent, marL), lv,
               _ppr_inner(line, space_before, space_after, bullet, bullet_color,
                          bullet_char, bullet_auto),
               run))


def S(text, **kw):
    """one outline level: prompt text + the style a slide inherits for that level"""
    return (text, kw)


def txbody(paras, anchor="t", wrap=True, ins=(0, 0, 0, 0), autofit="", lst="<a:lstStyle/>"):
    l, t, r, b = ins
    return ('<p:txBody><a:bodyPr wrap="%s" anchor="%s" lIns="%d" tIns="%d" rIns="%d" bIns="%d" '
            'rtlCol="0">%s</a:bodyPr>%s%s</p:txBody>'
            % ("square" if wrap else "none", anchor, l, t, r, b, autofit, lst, "".join(paras)))


# ---------------------------------------------------------------- shapes
def xfrm(x, y, w, h):
    return ('<a:xfrm><a:off x="%d" y="%d"/><a:ext cx="%d" cy="%d"/></a:xfrm>' % (x, y, w, h))


def shape(sid, name, x, y, w, h, fill, body="", prst="rect",
          line='<a:ln><a:noFill/></a:ln>', adj=""):
    if not body:
        body = ('<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="th-TH"/>'
                '</a:p></p:txBody>')
    return ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="%s"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
            '<p:spPr>%s<a:prstGeom prst="%s"><a:avLst>%s</a:avLst></a:prstGeom>%s%s</p:spPr>%s</p:sp>'
            % (sid, name, xfrm(x, y, w, h), prst, adj, fill, line, body))


def pic(sid, name, rid, x, y, w, h):
    return ('<p:pic><p:nvPicPr><p:cNvPr id="%d" name="%s"/>'
            '<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>'
            '<p:blipFill><a:blip r:embed="%s"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
            '<p:spPr>%s<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>'
            % (sid, name, rid, xfrm(x, y, w, h)))


def placeholder(sid, name, phtype, x, y, w, h, specs, idx=None, anchor="t",
                fill="", ins=(0, 0, 0, 0), autofit="", sz_attr=""):
    ph_i = ' idx="%d"' % idx if idx is not None else ''
    ph_t = ' type="%s"' % phtype if phtype else ''
    lst = lst_style([kw for _, kw in specs])
    paras = [para(t, **kw) for t, kw in specs]
    return ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="%s"/>'
            '<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            '<p:nvPr><p:ph%s%s%s/></p:nvPr></p:nvSpPr>'
            '<p:spPr>%s<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>%s</p:spPr>%s</p:sp>'
            % (sid, name, ph_t, sz_attr, ph_i, xfrm(x, y, w, h), fill,
               txbody(paras, anchor=anchor, ins=ins, autofit=autofit, lst=lst)))


def _bare_placeholder(sid, name, phtype, x, y, w, h, idx, spec):
    lst = lst_style([spec[1]])
    return ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="%s"/>'
            '<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            '<p:nvPr><p:ph type="%s" idx="%d"/></p:nvPr></p:nvSpPr>'
            '<p:spPr>%s<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>%s</p:sp>'
            % (sid, name, phtype, idx, xfrm(x, y, w, h),
               txbody([para(spec[0], **spec[1])], anchor="ctr", lst=lst)))


def pic_placeholder(sid, name, x, y, w, h, idx):
    return _bare_placeholder(sid, name, "pic", x, y, w, h, idx,
                             S("", sz=T_BODY3, color=INK2, algn="ctr"))


def tbl_placeholder(sid, name, x, y, w, h, idx):
    return _bare_placeholder(sid, name, "tbl", x, y, w, h, idx,
                             S("", sz=T_BODY, color=INK))


def bg(fill):
    return '<p:bg><p:bgPr>%s<a:effectLst/></p:bgPr></p:bg>' % fill


def spTree(name, shapes, bgfill=None):
    b = bg(bgfill) if bgfill else ''
    return ('<p:cSld name="%s">%s<p:spTree><p:nvGrpSpPr>'
            '<p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
            '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>'
            '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>'
            '%s</p:spTree></p:cSld>' % (name, b, "".join(shapes)))
