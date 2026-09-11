# Design — NCT (New Computer Technology Consulting)

Locked design system, studied from https://nctthai.com/th. Future Hallmark
runs read this file first; pages defer to it. Amend intentionally — the
file is the rule.

## System
- Genre · modern-minimal
- Macrostructure · Split Studio (studied-DNA — closest catalog cousin: Cobalt)
- Theme · studied-DNA (source: https://nctthai.com/th)
- Axes · light paper / neutral-grotesque-sans (single family) / dual cool-blue (indigo 256° + cyan-blue 220°)

## Provenance
- Source mode · url
- Source · https://nctthai.com/th (user's own company site — disclosed directly)
- Date extracted · 2026-09-04
- Method · WebFetch's HTML→markdown pipeline could not surface raw CSS/head
  for this page, so tokens were read live via `getComputedStyle` in an
  actual browser render instead of static source parsing.
- Confidence · Tokens: exact (computed styles from live DOM, not estimated
  bands). Fonts: exact ("Noto Sans Thai" confirmed via computed
  font-family on body/h2/buttons). Rhythm: observed directly from live
  screenshots at scroll — not a blind spot here, unlike typical URL-mode
  runs. Two radius values below are visual estimates (not measured via
  computed style) — flagged inline.

## Tokens (canonical · regenerate `tokens.css` from these before build)
```css
:root {
  --color-paper:      oklch(100%   0     0);      /* #FFFFFF — page bg */
  --color-paper-2:    oklch(96.2%  0.015 191.8);   /* #E8F6F5 — decorative blob tint */
  --color-ink:        oklch(32.1%  0     0);       /* #333333 — body text */
  --color-ink-2:      oklch(48.7%  0     0);       /* #5F5F5F — footer/muted text.
                                                      Was #A4A4A4, which measured 2.5:1 on
                                                      paper and failed AA at every size it
                                                      was used at. Never lighten it again. */
  --color-rule:       oklch(90%    0     0);       /* estimated — no strong rule colour observed on source */
  --color-accent:     oklch(38.0%  0.082 255.9);   /* #23436D — navy, headings + primary CTA */
  --color-accent-2:   oklch(49.2%  0.077 219.7);   /* #216B7F — teal, links + secondary CTA */
  --color-accent-ink: oklch(100%   0     0);       /* white text on filled accent buttons */
  --color-focus:      oklch(49.2%  0.077 219.7);   /* reuses accent-2 — not explicitly set on source, estimated */

  --font-display: "Noto Sans Thai", sans-serif;   /* weight 700 on headings */
  --font-body:    "Noto Sans Thai", sans-serif;   /* weight 400 */
  --font-mono:    "Geist Mono", monospace;         /* NOT present in source — add only if the rebuilt system needs a label/code voice */

  /* 4-pt spacing scale, named: --space-3xs … --space-4xl. Source used generous,
     roughly-equal vertical rhythm between sections (~work in 6xl-8xl range). */
  /* Type scale: h2 measured at 60px/700 for hero-level headings. */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;  --dur-base: 240ms;  --dur-slow: 320ms;

  --radius-card:  16px;  /* estimated from screenshot — hero/contact card corners, not computed-style-verified */
  --radius-pill:  50px;  /* measured — CTA buttons ("Learn More", "Book Consultation") */
  --radius-input: 6px;   /* estimated from screenshot — contact form fields */
}
```

## CTA voice
- Primary · fill `--color-accent` (navy) · white text · `--radius-pill` · generous horizontal padding (pill shape)
- Secondary · fill `--color-accent-2` (teal) · white text · same `--radius-pill`
- No outline/ghost button style observed on source — both CTAs are filled pills. Nav carries no button at all (link-only + language switcher).

## Motion stance
- AOS (`aos@2.3.1`) is loaded via CSS import on the source, but no live
  element carried an active `data-aos` attribute at inspection time —
  treat as **installed, unconfirmed active**. Default the rebuild to
  motion-cut (no reveal animation) unless the user wants to add one
  intentionally.
- Reduced-motion fallback · ≤150ms opacity crossfade if motion is added later.

## Notes — anti-patterns diagnosed on the source, do NOT carry over
- Centered 3-feature icon grid mid-page — classic templated-AI tell; vary span/alignment if rebuilding this section.
- Generic stock office photography (technology-partner section) — replace with real product screenshots or commissioned photography.
- Uniform section padding rhythm across the whole page reads templated — vary intentionally per section.
- Single font family with no display/body/mono pairing — flat typographic voice, no hierarchy contrast. Consider adding one paired face if the rebuild wants more editorial weight.
- Dual-accent scheme (navy + teal) is close in hue (256°/220°, both cool-blue) rather than a true two-hue contrast — keep or diverge deliberately, don't treat as accidental.

## Exports
`tokens.css` is not yet generated from this file — ask *"generate tokens.css from design.md"* to produce it, or *"extend design.md with Tailwind exports"* for `@theme` / DTCG `tokens.json` / shadcn/ui variables.

## v2 — proposal/requirement deck tokens (added after auditing NCT Example.pptx)
Slide work skews denser than this file's narrative-deck baseline (tables, process
flows, status columns). These extend the system — they don't replace anything above.
```css
:root {
  --color-mid:      #1E5473;  /* named gradient midpoint, was already used inline */
  --color-teal-b:   #1A8D92;  /* true logo end-stop — GRADIENT STOP ONLY, never fill/line/text (3.4:1 on white) */
  --color-teal-up:  #8FBACE;  /* accent-2 lifted for text ON NAVY (4.8:1). Never on white (2.1:1) */
  /* both gradients end on teal-b, web and .potx alike. The web ones used to end on
     accent-2 instead - a silent divergence, and the reason --color-mid was declared
     and never used. Chrome over the light end needs a scrim, not a lighter ink:
     white at full opacity is 4.0:1 on teal-b. */
  /* text/tint pairs — always move them together. The tints must beat the dense-table
     zebra: the old #E6F4EE ok-tint was 1.02:1 on --color-paper-2, the same mint, so
     the fill vanished on even rows. All three now sit ~1.25:1 against it. */
  --color-risk:     #B3261E;  --color-risk-tint: #F6D0CC;
  --color-warn:     #7F4B00;  --color-warn-tint: #F2D9AC;
  --color-ok:       #1A6647;  --color-ok-tint:   #BFE3CA;
}
```
- Status colors are data colors for tables/process flows only — never chrome, headings, or slide backgrounds. Max 3 statuses per slide.
- On-dark ink is paper at three alphas, not a free dial: `--nct-on-dark-1` 0.92 (body),
  `-2` 0.80 (secondary), `-3` 0.72 (footer; the floor that passes 4.5:1 at 10pt),
  plus `--nct-on-dark-rule` 0.28 for hairlines. Eleven hand-picked alphas preceded it.
- Category coding (FN/AP/AR/GL-style) — **superseded by v4 below.** v2 reused navy / teal / `#4E8FA8` / `#16324F`, four blues 1.31:1 apart. Beyond 4 categories, label instead of coloring (still true).
- Dense type floor is **10pt** — never go lower; split content across slides instead.
- See `slide-design-system-v2.md` (in the slide-template project) for full layout specs 11–16 and the dense type scale.


## v3 — corporate proposal chrome (studied from `NCT Template.pptx`, slides 33–43)
The second brand set. Everything above dresses narrative decks, studied from the
website. The template the company requires on every bid is a different animal:
anchored on a different teal, with its own furniture. Both are real, and both now
ship — chosen per deck, never mixed on one slide.

Studied 2026-09-07 from the company's own `NCT Template.pptx` (OOXML read
directly, plus the PDF rendered per page, so both the exact values and the
rhythm are observed rather than estimated).

```css
:root {
  --nct-corp:          #006666;  /* anchor: full-bleed rule, phase tab, card outline.
                                    6.8:1 on paper both ways — safe as fill and as text */
  --nct-corp-up:       #8CC2C2;  /* the same teal lifted to read ON DARK: 5.1:1 on navy,
                                    6.2:1 on corp-deep. 2.0:1 on paper — never there.
                                    --nct-corp itself is 1.5:1 on navy and unusable */
  --nct-corp-deep:     #193B36;  /* deep companion: second header band, on-dark panel */
  --nct-corp-dim:      #E1E1E1;  /* foot-bar spent segment — DECORATION ONLY, 1.2:1 */
  --nct-corp-bar-mid:  #A9C2C2;  /* foot-bar middle segment — decoration only */

  /* the roles that move between modes; slides.css reads these everywhere it
     used to name --nct-teal / --nct-navy, so repointing them carries the deck */
  --nct-accent:    var(--nct-teal);      /* .nct-slide--corp → var(--nct-corp)      */
  --nct-accent-up: var(--nct-teal-up);   /* .nct-slide--corp → var(--nct-corp-up)   */
  --nct-heading:   var(--nct-navy);      /* .nct-slide--corp → var(--nct-ink)       */
  --nct-dark:      var(--nct-navy);      /* .nct-slide--corp → var(--nct-corp-deep) */
}
```

**Heading and dark follow the mode too (2026-09-11).** Until then only the accent
pair moved, so every header band, dark panel and card heading stayed house navy
under a `#006666` rule, and `--nct-corp-deep` was declared and read by nothing.
Corp headings take `--nct-ink` (the title rule, extended) and dark fills take
`--nct-corp-deep`. The L10 closing gradient keeps navy in both modes: it is the
house bookend. `check_template.py` fails a corp build that carries navy anywhere
else.

**No corp tint.** The source used `#C9D9D4` as a card and zebra fill, but `INK2`
reads 4.37:1 on it and `OK_T` sits 1.05:1 against it — the exact
status-fill-vanishes bug the v2 note above exists to prevent. Corp surfaces are
`--nct-paper-2`, same as v1.

**What does not follow the mode.** Paper, ink, tints, status and the four
category colours are shared, so a table means the same thing in either brand.
Category colours are literal hex on purpose: four coded columns are a taxonomy,
and a taxonomy that changes colour with the letterhead is not one.

### Chrome
- **Rule** · full bleed, edge to edge, 0.075in, at the same `RULE_Y` as the 0.6in
  stub it replaces. Keeping the y is what lets every layout switch modes without
  re-flowing. (The source draws it at 2.29cm under a 28pt title; the system's
  title sits lower, and moving the whole rhythm to match would have been a second
  geometry, not a chrome layer.)
- **Corner lockup** · 1.80 × 0.60in card, white on a `--nct-corp` hairline, two
  bottom corners rounded at 0.10in, bled off the top edge so the top border is
  clipped. Light tones only — on the navy bookends a white card is a hole, and
  the source's own dark slides carry the bare mark. `partnerMark` fills the second
  slot with the client's badge, which is what the source puts beside the NCT mark.
- **Foot bar** · three 0.90 × 0.15in segments hard against the bottom-left corner:
  accent, `--nct-corp-bar-mid`, `--nct-corp-dim`. The source draws it with two
  shapes — an accent bar under a 75%-alpha grey bar offset by one segment — and
  `--nct-corp-bar-mid` is that mix, precomputed. No hairline above the foot: the
  corporate template draws none, and the bar is already the horizontal.
- **Title** · `--nct-ink`, not navy. The source sets it in near-black; that is
  chrome, so it moves with the mode.

### Layout 01 — two covers
The one layout where the brands are different slides, not the same slide in
different furniture. `web` opens on the navy→teal gradient and reads left,
bookending the `close` gradient on layout 10. `corp` is paper, centred, with the
mark watermarked at 3.5% behind it, the lockup at 4.375in as the hero, a 6.9in
accent rule above the title rather than a 0.6in stub below it, and a column of
squares down the right edge. It drops the foot bar and the corner lockup — the
source draws neither on the one page whose job is to be quiet.

The square column was raster artwork in the source (`image2.png`, 472×1080). It
scanned as a single hue at many alphas — `#1E5876`, which is `--nct-mid` within
rounding — so it is 28 rows of data in `tokens.COVER_SCATTER` feeding an SVG on
the web and 28 shapes in the `.potx`. Same artwork, 2.4 KB instead of 40, and it
recolours with the token.

### Layouts 17–18
- **17 Phase Card** — a stage of the implementation plan: the Key Activity /
  Participant pair on top, then an outlined canvas tabbed with the phase number.
  Five of the eleven source slides are this shape. The tab is centred on the
  card's top border and flush at the margin; the source protrudes it left by 0,
  0.32, 0.42 and 0.69cm across its five slides, which is copy-paste jitter, not a
  decision, and on three of five it starts outside the margin.
- **18 Evidence Strip** — a claim, a one-line finding, and two to four frames of
  proof. The band above the strip is the takeaway, not a section label: the
  source puts "SAMPLE OF TRAINING SETUP" there, which names the photographs
  without saying what they prove.

### What did not need a layout
- Concept explainers (source 33, 34) are `SlideDiagram` — lede, figure, stated
  conclusion, the same shape with the closing paragraph promoted to a band.
- The deliverables matrix (40) is `SlideDenseTable` with the `rowSpan` and
  `groupColumn` this version added to `DataTable`.
- The support model (41) is `SlideSplitPanel` or `SlideProcessFlow`. **Its
  diagonal photo band was deliberately not adopted** — the frame behind it is a
  headset-and-smiles stock shot, the exact people-at-work photograph the notes
  above already ban, and a layout would have enshrined it.
- The thank-you (43) is `SlideClosing`, which asks for something.

### Drift found in the source, not carried over
Title x at 1.01 / 0.99 / 0.88cm · the rule at two different weights and offsets ·
ten distinct left margins between 1.0 and 2.71cm · phase-tab y unlocked across
five slides · 8pt table type, under the 10pt floor · `#FF0000` at 4.0:1 on white ·
`Calibri`, `Tahoma`, `NissanAG-Medium` and Japanese faces left in from other
decks · the theme's `clrScheme` never set, so every colour is inline hex. None of
it survives the port; all of it is why the port was worth doing.


## v4 — data colours (validated with the `dataviz` skill, 2026-09-11)
Charts need series a reader can tell apart, and a chart and a table about the same
four categories must use the same colours — so the category set was replaced, not
duplicated. The v2 set failed the validator three ways: navy and deep below the
lightness band, all four under the chroma floor, navy↔teal at normal-vision ΔE 12.2.

```css
:root {
  /* identity: categories AND chart series. Order is the colour-blind safety - never reorder.
     adjacent CVD worst 15.0 · normal worst 21.4 · all >= 3:1 on paper and paper-2.
     Scatter / small multiples take slots 1-3 only (cat-4 vs cat-1 = CVD 4.0). */
  --nct-cat-1:    #2A5EA0;  /* blue - navy's hue lifted into the band */
  --nct-cat-2:    #BB731B;  /* amber - the system's one warm pole */
  --nct-cat-3:    #0D9298;  /* teal - teal-b (logo end-stop) lifted to the chroma floor, dE 1.5 */
  --nct-cat-4:    #6C4289;  /* violet */
  --nct-cat-mute: #A4A4A4;  /* Other / de-emphasised series / baseline. MARKS ONLY - the old
                               ink-2 value, 2.5:1, never text. dE >= 15 from every slot */
  /* magnitude, one hue: 100-400 here, then cat-1 / navy / deep. Ordinal use starts at 300 */
  --nct-seq-100: #DBE9FC;  --nct-seq-200: #B7D0F2;
  --nct-seq-300: #90B4E4;  --nct-seq-400: #6994CF;
  /* polarity: cat-1 / seq-300 | rule midpoint | div-warm-l / cat-2 */
  --nct-div-warm-l: #D6A67C;
}
```
- `cat-mute` is 2.5:1, under WCAG 1.4.11's 3:1 for a data mark, and no grey fixes it:
  every grey that clears 3:1 lands within normal ΔE 12.0 / CVD 3.6 of `cat-3` (swept
  2026-09-11). So the relief is text — with emphasis on, every muted bar carries its
  value (12pt `ink-2`, under the 14pt bold emphasised one) and a muted line its end value.
- Charts sit on paper only — never on a dark slide, so there is no dark variant.
- A fifth series is never a new hue: fold it into "Other" (`cat-mute`) or split the slide.
- `cat-2` and `cat-3` share a luminance: a greyscale print cannot separate them, so a key
  with words stays mandatory wherever the coding appears.
- The PowerPoint theme's accent1–4 are this set in order, accent5 is `cat-mute`, so
  Insert Chart starts on-system.
- Full method, validator output and layouts 19–23: `slide-design-system-v4.md`.
