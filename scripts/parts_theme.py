# -*- coding: utf-8 -*-
from tokens import *
from ooxml import *

MAJOR = "Kanit"            # headings  (installed, all weights)
MINOR = "Noto Sans Thai"   # body

def _font_block(tag, latin, cs):
    return (f'<a:{tag}><a:latin typeface="{latin}" pitchFamily="2" charset="0"/>'
            f'<a:ea typeface=""/><a:cs typeface="{cs}" pitchFamily="2" charset="-34"/>'
            f'<a:font script="Thai" typeface="{cs}"/></a:{tag}>')

def theme():
    clr = (f'<a:clrScheme name="NCT"><a:dk1><a:srgbClr val="{INK}"/></a:dk1>'
           f'<a:lt1><a:srgbClr val="{PAPER}"/></a:lt1>'
           f'<a:dk2><a:srgbClr val="{NAVY}"/></a:dk2>'
           f'<a:lt2><a:srgbClr val="{PAPER2}"/></a:lt2>'
           f'<a:accent1><a:srgbClr val="{NAVY}"/></a:accent1>'
           f'<a:accent2><a:srgbClr val="{TEAL}"/></a:accent2>'
           f'<a:accent3><a:srgbClr val="{TEAL_L}"/></a:accent3>'
           f'<a:accent4><a:srgbClr val="{DEEP}"/></a:accent4>'
           f'<a:accent5><a:srgbClr val="{INK2}"/></a:accent5>'
           f'<a:accent6><a:srgbClr val="{PAPER2}"/></a:accent6>'
           f'<a:hlink><a:srgbClr val="{TEAL}"/></a:hlink>'
           f'<a:folHlink><a:srgbClr val="{NAVY}"/></a:folHlink></a:clrScheme>')
    fonts = (f'<a:fontScheme name="NCT">'
             f'{_font_block("majorFont", MAJOR, MAJOR)}'
             f'{_font_block("minorFont", MINOR, MINOR)}</a:fontScheme>')
    # flat format scheme: no bevels, no shadows -- matches the minimal source system
    fmt = ('<a:fmtScheme name="NCT">'
           '<a:fillStyleLst>'
           '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'
           '<a:solidFill><a:schemeClr val="phClr"><a:tint val="88000"/></a:schemeClr></a:solidFill>'
           '<a:gradFill rotWithShape="1"><a:gsLst>'
           '<a:gs pos="0"><a:schemeClr val="phClr"/></a:gs>'
           '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="80000"/></a:schemeClr></a:gs>'
           '</a:gsLst><a:lin ang="2700000" scaled="0"/></a:gradFill>'
           '</a:fillStyleLst>'
           '<a:lnStyleLst>'
           '<a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>'
           '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>'
           '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>'
           '</a:lnStyleLst>'
           '<a:effectStyleLst>'
           '<a:effectStyle><a:effectLst/></a:effectStyle>'
           '<a:effectStyle><a:effectLst/></a:effectStyle>'
           '<a:effectStyle><a:effectLst/></a:effectStyle>'
           '</a:effectStyleLst>'
           '<a:bgFillStyleLst>'
           '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'
           '<a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/></a:schemeClr></a:solidFill>'
           '<a:gradFill rotWithShape="1"><a:gsLst>'
           '<a:gs pos="0"><a:schemeClr val="phClr"/></a:gs>'
           '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="75000"/></a:schemeClr></a:gs>'
           '</a:gsLst><a:lin ang="2700000" scaled="0"/></a:gradFill>'
           '</a:bgFillStyleLst></a:fmtScheme>')
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="NCT">'
            f'<a:themeElements>{clr}{fonts}{fmt}</a:themeElements>'
            '<a:objectDefaults/><a:extraClrSchemeLst/></a:theme>')
