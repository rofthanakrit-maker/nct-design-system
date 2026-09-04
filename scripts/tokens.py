# -*- coding: utf-8 -*-
"""NCT slide design system - canonical tokens & geometry (EMU)."""

# ---- colour tokens (from design.md, nctthai.com) ----
NAVY    = "23436D"   # accent      - primary brand navy
TEAL    = "216B7F"   # accent-2    - secondary brand teal
TEAL_L  = "4E8FA8"   # accent-3    - derived light teal (charts, 2nd series)
TEAL_UP = "8FBACE"   # accent-3 on navy - the same hue lifted until it reads.
                      # TEAL_L on NAVY is 2.8:1 and fails AA; this is 4.8:1.
                      # ON NAVY ONLY - it is 2.1:1 on white. Adds no new hue.
DEEP    = "16324F"   # accent-6    - derived deep navy (dark scrim, shadow)
INK     = "333333"   # body text
INK2    = "5F5F5F"   # muted text - caption, label, footer. 6.4:1 on PAPER,
                      # 5.8:1 on PAPER2. Was A4A4A4 (2.5:1), which failed AA at
                      # every size it was used at - never go lighter than this.
PAPER   = "FFFFFF"   # page bg
PAPER2  = "E8F6F5"   # tinted surface (cards, quote bg)
RULE    = "E5E5E5"   # hairline

# ---- v2: brand gradient stops (sampled from assets/nct-mark-color.png) ----
MID     = "1E5473"   # gradient midpoint - already used inline, now named
TEAL_B  = "1A8D92"   # true gradient END (logo end-stop) - GRADIENT STOP ONLY,
                      # never a fill/line/text color (3.4:1 on white, fails AA)

# ---- v2: status tokens (tables / process flows only - never chrome/headings) ----
# The tints have to survive the zebra: dense-table even rows are PAPER2, and the
# old OK_T (E6F4EE) was 1.02:1 against it - the same mint, so the fill vanished
# and only the text carried the signal. Every tint now clears the zebra step
# itself (PAPER2 on PAPER is 1.11:1) at ~1.25:1, and every text still clears AA
# at 10pt on its own tint. Darken these two together or not at all.
RISK    = "B3261E";  RISK_T = "F6D0CC"   # high risk, blocker      | 4.6:1 on tint
WARN    = "7F4B00";  WARN_T = "F2D9AC"   # unconfirmed, needs call | 5.3:1 on tint
OK      = "1A6647";  OK_T   = "BFE3CA"   # ready, quick win, passed| 5.0:1 on tint

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

# ---- takeaway strip: pinned to the foot of the body box on L09 / L14 / L16 ----
# Fixed y, not "after the content", so the reader finds the conclusion in the
# same place whether the table above it runs four rows or ten.
TAKE_H  = 411480                      # 0.45in - matches .nct-band min-height
TAKE_Y  = BODY_Y + BODY_H - TAKE_H    # 5623560
NOTE_H  = 274320                      # legend / source note - one line
NOTE_Y  = TAKE_Y - 91440 - NOTE_H     # sits just above the strip

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
