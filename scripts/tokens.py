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

# ---- v3: corporate proposal chrome (studied from NCT Template.pptx sl. 33-43) ----
# The second brand set. The website palette above dresses narrative decks; the
# proposal template the company requires on every bid is anchored on a different
# teal, and both are real. They are chosen per deck and never mix on one slide:
# corp mode swaps the CHROME (rule, corner lockup, foot bar) and repoints the
# --nct-accent pair, which slides.css reads everywhere it used to name TEAL, so
# the whole deck follows. What does NOT follow is the content palette - paper,
# ink, tints, status and the four category colours are shared by both modes, so
# a table means the same thing whichever brand is on the slide.
CORP      = "006666"   # the anchor: full-bleed rule, phase tab, card outline
                        # 6.8:1 on PAPER both ways - safe as fill and as text
CORP_DEEP = "193B36"   # the deep companion: second header band, on-dark panel
                        # 12.2:1 on PAPER both ways
CORP_UP   = "8CC2C2"   # the same corp teal lifted until it reads on a dark
                        # ground: 5.1:1 on NAVY, 6.2:1 on CORP_DEEP. ON DARK
                        # ONLY - it is 2.0:1 on PAPER. Same trap, same rule as
                        # TEAL_UP; CORP itself is 1.5:1 on NAVY and unusable there.
CORP_DIM  = "E1E1E1"   # foot-bar spent segment. DECORATION ONLY - 1.2:1 on
                        # PAPER, it can never carry text or a border
# No corp tint. The source used C9D9D4 as a card/zebra fill, but INK2 reads
# 4.37:1 on it and OK_T sits 1.05:1 against it - the exact status-fill-vanishes
# bug the v2 note above exists to prevent. Corp surfaces are PAPER2, same as v1.

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

# ---- v3: corp chrome geometry ----
# The corporate rule is full-bleed and heavier than the 0.6in stub; it sits at
# the same RULE_Y, so nothing downstream of the title moves and every layout
# keeps its rhythm in either mode. That was the whole point of putting the corp
# look in a chrome layer instead of a second geometry.
CORP_RULE_H = 68580                   # 0.075in - the band, edge to edge
CORP_LOCK_W = 1645920                 # 1.80in - corner lockup card
CORP_LOCK_H = 548640                  # 0.60in
CORP_LOCK_R = 91440                   # 0.10in - its two bottom corners
CORP_BAR_SEG = 822960                 # 0.90in - one foot-bar segment, x3
CORP_BAR_H  = 137160                  # 0.15in
# The source draws three foot segments with two shapes: a CORP bar under a
# 75%-alpha CORP_DIM bar offset by one segment, so the overlap mixes the middle
# one. Three explicit segments say the same thing without the alpha trick.
CORP_BAR_MID = "A9C2C2"               # = CORP under CORP_DIM at 75%, precomputed

# ---- v3: phase card (L17) ----
# The numbered tab straddles the card's top border. The source protrudes it left
# of the card by 0 / 0.32 / 0.42 / 0.69cm across its five slides - copy-paste
# jitter, not a decision, so it is flush at MX here and only the vertical
# overlap is kept.
PHASE_META_H = 274320                 # 0.30in - one "Key Activity :" row
PHASE_TAB_H  = TAKE_H                 # 0.45in - same strip height as a band
PHASE_NUM_W  = 502920                 # 0.55in - the number cell inside the tab

# ---- v3: evidence strip (L18) ----
# Fixed, so the claim above it shrinks and the proof never does. Three frames
# across CW land at 350x148 - a readable screenshot. A fifth would be 199x84.
EVIDENCE_H = 1645920                  # 1.80in

# ---- v3: corp cover (L01 under BRAND="corp") ----
# The corporate cover is light, centred and watermarked - the opposite of the
# house cover's dark gradient and left-biased stack. It is not chrome, it is a
# different slide, and it is the one the company puts in front of a client.
COVER_LOGO_W  = 4000500               # 4.375in - the lockup is the hero here
COVER_LOGO_Y  = 685800                # 0.750in
COVER_RULE_Y  = 3429000               # 3.750in
COVER_RULE_W  = 6309360               # 6.900in - narrower than the title block
COVER_RULE_H  = 28575                 # 2.25pt, the weight the source draws
COVER_TITLE_Y = 3715200               # 4.063in
COVER_TITLE_H = 2057400               # 2.250in - three lines of T_DISPLAY at 1.15
COVER_SCAT_W  = 2971800               # 3.250in - the decorative column, right edge

# The scatter down that column, read out of the source deck's own artwork
# (`image2.png`, 472x1080) rather than re-invented: every square is one hue at a
# different alpha, and the hue measured #1E5876 - MID within rounding. Kept as
# source pixels on a 472x1080 box so both consumers scale it themselves.
# (x, y, w, h, alpha%) - alpha is the source's 0-255 divided out.
COVER_SCAT_BOX = (472, 1080)
COVER_SCATTER = [
    (170, 47, 78, 68, 10), (206, 29, 42, 86, 33), (360, 63, 60, 88, 75),
    (102, 91, 26, 28, 15), (332, 91, 28, 60, 5), (136, 153, 66, 48, 5),
    (244, 167, 56, 40, 60), (202, 265, 82, 62, 50), (376, 351, 44, 50, 60),
    (108, 355, 50, 38, 5), (206, 405, 78, 72, 5), (288, 455, 38, 40, 20),
    (330, 491, 94, 72, 10), (290, 529, 20, 18, 50), (228, 559, 36, 36, 5),
    (320, 601, 50, 58, 20), (380, 687, 28, 42, 50), (128, 697, 40, 32, 5),
    (202, 741, 50, 46, 40), (0, 749, 42, 46, 5), (324, 803, 66, 52, 5),
    (156, 825, 88, 78, 10), (276, 855, 48, 70, 50), (50, 869, 14, 12, 40),
    (98, 937, 36, 38, 20), (332, 955, 26, 32, 60), (202, 965, 32, 26, 20),
    (370, 987, 48, 50, 75),
]

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
