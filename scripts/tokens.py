# -*- coding: utf-8 -*-
"""NCT slide design system - canonical tokens & geometry (EMU)."""

# ---- colour tokens (from design.md, nctthai.com) ----
NAVY    = "23436D"   # accent      - primary brand navy
TEAL    = "216B7F"   # accent-2    - secondary brand teal
TEAL_L  = "4E8FA8"   # accent-3    - derived light teal (charts, 2nd series)
DEEP    = "16324F"   # accent-6    - derived deep navy (dark scrim, shadow)
INK     = "333333"   # body text
INK2    = "A4A4A4"   # muted text
PAPER   = "FFFFFF"   # page bg
PAPER2  = "E8F6F5"   # tinted surface (cards, quote bg)
RULE    = "E5E5E5"   # hairline

# ---- v2: brand gradient stops (sampled from assets/nct-mark-color.png) ----
MID     = "1E5473"   # gradient midpoint - already used inline, now named
TEAL_B  = "1A8D92"   # true gradient END (logo end-stop) - GRADIENT STOP ONLY,
                      # never a fill/line/text color (3.4:1 on white, fails AA)

# ---- v2: status tokens (tables / process flows only - never chrome/headings) ----
RISK    = "B3261E";  RISK_T = "FBEAE8"   # high risk, blocker
WARN    = "B26B00";  WARN_T = "FBF1E3"   # unconfirmed, TBC, needs decision
OK      = "1F7A54";  OK_T   = "E6F4EE"   # ready, quick win, passed

# ---- v2: category coding - reuses existing accents, adds no new hues ----
CAT_1, CAT_2, CAT_3, CAT_4 = NAVY, TEAL, TEAL_L, DEEP

# ---- canvas ----
SW, SH  = 12192000, 6858000          # 16:9, 13.333in x 7.5in

# ---- spacing (EMU; 914400 = 1in) ----
IN      = 914400
MX      = 914400                      # side margin           1.00in
MT      = 548640                      # top margin            0.60in
MB      = 548640                      # bottom margin         0.60in
CW      = SW - 2*MX                   # content width  10363200 (11.333in)
GUT     = 182880                      # gutter                0.20in
COL     = (CW - 11*GUT)//12           # 12-col unit    695960
HALF    = 6*COL + 5*GUT               # 5090160
THIRD   = (CW - 2*GUT)//3             # 3332480
QUARTER = (CW - 3*GUT)//4             # v2: 4-up cards (L12)
FIFTH   = (CW - 4*GUT)//5             # v2: process-flow steps only (L13) - not a 12-col unit

# ---- photo band: the right-hand strip on L02 / L08 / L10 / L15 ----
BAND_W  = 4876800                     # 40% of the canvas        5.333in
BAND_X  = SW - BAND_W                 # 8.000in
BAND_TW = BAND_X - MX - GUT           # text stops clear of it   6.800in
BAND_FOOT_H = 2057400                 # bottom scrim, keeps footer chrome off glass

def colx(i):                          # x of column i (0-based)
    return MX + i*(COL + GUT)

# ---- vertical rhythm on content slides ----
TITLE_Y, TITLE_H = MT, 731520                 # 0.60in .. 1.40in
RULE_Y,  RULE_H  = 1371600, 45720             # 4pt teal rule under title
RULE_W           = 548640                     # 0.60in
BODY_Y           = 1691640                    # 1.85in
BODY_H           = SH - BODY_Y - 822960       # leaves footer band

# ---- type scale (hundredths of a pt) ----
T_DISPLAY = 4400   # 44pt  title slide
T_SECTION = 4000   # 40pt  section divider
T_H1      = 3200   # 32pt  slide title
T_STAT    = 7200   # 72pt  big number
T_QUOTE   = 2800   # 28pt  pull quote
T_LEAD    = 2000   # 20pt  subtitle / lead
T_BODY    = 1800   # 18pt  body L1
T_BODY2   = 1600   # 16pt  body L2
T_BODY3   = 1400   # 14pt  body L3 / caption
T_LABEL   = 1200   # 12pt  eyebrow / stat label
T_FOOT    = 1000   # 10pt  footer, page number

# ---- v2: dense type roles - ONLY legal on L11-L14 and L16, floor is 1000 (10pt) ----
T_STEPNUM   = 2400   # 24pt  step/card number chip
T_DENSEHEAD = 1600   # 16pt  dense section heading
T_DENSEBODY = 1200   # 12pt  dense body copy
T_TBLHEAD   = 1100   # 11pt  table header row
T_DENSECELL = 1000   # 10pt  table cell - absolute floor, do not go lower
