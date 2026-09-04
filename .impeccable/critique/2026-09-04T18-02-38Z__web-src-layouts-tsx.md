---
target: web/src/layouts.tsx
total_score: 16
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-09-04T18-02-38Z
slug: web-src-layouts-tsx
---
Method: dual-agent (A: a5fcd0fb1efe7b1ba · B: a1da30884f12f01a7)

Target: `web/src/layouts.tsx` + `web/src/slides.css`, rendered as the 16-slide demo deck at `http://127.0.0.1:5173/demo/index.html`. Mode: **Persuade** — a client-facing proposal deck for an IT consultancy, mirrored into a PowerPoint `.potx` from the same tokens.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Page number is a bare "1", no denominator, at 2.49:1. Chapter numbers wrong: "01" slide 2, "02" slide 14, 11 unnumbered between. No progress cue. |
| 2 | Match System / Real World | 3 | Thai copy idiomatic, B.E. dating correct, status colours conventional. Undercut by unglossed English (Uptime, SLA, audit trail, Essential/Business/Enterprise) and a leaked internal note on slide 8. |
| 3 | User Control and Freedom | 1 | No front agenda, no chapter label on any content slide, no back-reference. Preview is one 8,796px scroll with no navigation. |
| 4 | Consistency and Standards | 2 | Strong token spine, but 02/15/08-fade render identically; two table layouts, neither able to carry the mandated takeaway; web gradient ≠ .potx gradient; conventions.md:68 contradicts DESIGN.md:72. |
| 5 | Error Prevention | 1 | System's job is making bad slides impossible; it doesn't. No title-length guard, agenda collides with footer at its own documented 6-item ceiling, `.nct-body` fixed height with no overflow guard, DiagramLink hardcodes 7.5pt under the 10pt floor. |
| 6 | Recognition Rather Than Recall | 1 | Slide 15: 3 status colours + 3 chip colours, no key on the slide. Slide 13's legend describes a box distinction rendered at 1.17:1. `รอบ 1/2/3` never defined. |
| 7 | Flexibility and Efficiency | 2 | TakeawayBand is the right skimmer accelerator, present on 4 of 16 slides. The three that need it most (9 pricing, 13 architecture, 15 scope) structurally cannot have one. |
| 8 | Aesthetic and Minimalist Design | 2 | Restrained palette, flat rule, no motion noise. But 40–70% blank below content on slides 3/4/6/12/13 and 45–65% empty inside every card; full footer chrome on all 16 including the cover. |
| 9 | Error Recovery | 1 | Slide 15 leaves two red `ติดข้อจำกัด` rows and one amber with no mitigation, owner, or date. Only qualifier is a 10pt footnote at 2.49:1. |
| 10 | Help and Documentation | 2 | Contact block on slide 16. No appendix, no glossary for the English terms, no questions slide. Builder-facing docs are excellent, but that is not this surface. |
| **Total** | | **16/40** | **Needs work** |

All ten heuristics scored; none `n/a`. H7 applies because the system ships a deliberate skimmer accelerator; H10 applies because a proposal's documentation surface is its contact/appendix/glossary, which exists and is incomplete.

## Design Specificity Verdict

**LLM assessment.** An unrelated Bangkok consultancy could ship this deck tomorrow by swapping the logo PNG and the Thai copy, and nothing in the geometry, colour, or imagery would object. The identity that exists is real but thin: the navy→teal gradient sampled from the mark, the 45°-rotated diamond decor on the cover (`slides.css:177-182`), the diamond in the footer. Three touches across sixteen slides. Everything else is category-generic corporate blue.

The two places the identity should be loudest are where it is weakest. The cover gradient is wrong — `emit_web_tokens.py:100-104` ends it on `TEAL #216B7F` while the `.potx` build (`parts_layouts.py:69,222`) ends on `TEAL_B #1A8D92`, which is precisely the "gradient duller than the logo sitting on top of it" defect `slide-design-system-v2.md:53-56` was written to fix. And all four photographs are stock: three interchangeable upward-angle blue glass towers (slides 2, 8, 14) plus a cropped handshake (slide 16). `DESIGN.md:72` bans generic stock office photography outright; `.design-sync/conventions.md:68` quietly narrowed that law to "never people at work", a different and much weaker rule; `conventions.md:74-79` then carved an owner exception to break even that one on the final slide. The system's most-defended principle — don't look templated — is the principle its own photography policy has been rewritten twice to accommodate. Slide 8's caption says it out loud in the client's face: *"variant fade — ของจริงใส่ภาพงานหรือ screenshot ไม่ใช้ภาพ stock"* (`demo.tsx:102`).

**Deterministic scan.** CLI `detect.mjs --json` over `layouts.tsx`, `demo.tsx`, `index.html` returned exit 0, zero findings — verified as a genuine empty result, not a silent skip (dispatch confirmed routing `.tsx`/`.html` to real analyzers; no `.impeccable/config.json` ignore rules). That result is weak evidence of quality: the component files carry only semantic class names, so every real defect lives in the CSS cascade against content, which the static pass does not see.

The in-page detector, injected live, found **35 findings across 24 element groups**: low-contrast ×15, tight-leading ×7, ai-color-palette ×6, wide-tracking ×4, clipped-overflow-container ×2, line-length ×1.

Independent measurement corroborated the contrast finding and made it much larger: **50 failing instances across 9 distinct colour/size pairs**, with `--nct-ink-2: #A4A4A4` as the single root cause. The two assessments converged on this independently — the design review flagged it as the reason the deck's explanatory layer disappears, the detector measured it at 2.49:1 on white and 2.25:1 on `--nct-paper-2`.

The detector caught two things the design review did not: `#4E8FA8` on `#23436D` at **2.78:1** for the 80px section numerals on slides 2 and 14 (large text, still fails 3:1), and `#B26B00` on `#FBF1E3` at **3.76:1** for the table warning status on slide 15.

**False positives.** Slide 1's `.nct-decor` circles register as overflow but are intentional bleed, correctly clipped by `overflow:hidden` on `.nct-slide`. Slide 6's `.nct-body` overshoots its container by 5px, but the deepest real content sits well inside — a box-model rounding artifact, not a visible clip. `wide-tracking` and `line-length` are calibrated for Latin/uppercase typography and fired on Thai-script elements; plausible, not proven. Assessment B also discarded 12 of its own initial contrast hits that came from not resolving `linear-gradient` backgrounds (the cover's white-on-navy is actually 8.53:1).

**Visual overlays.** Injection succeeded and the overlay ran in the page, but the tab and both local servers were closed before this report; no overlay is visible now. Re-run with the deck served to see them.

## Overall Impression

The engineering is better than the design. The token spine is real — `tokens.py` is a single source, `slides.css` reads variables instead of restating hexes, and the rules are written down *with reasons*. That spine earned the right to be held to its own standards, and it fails them in three specific places: the token designated "caption, label, footer" fails AA at every size it is used at; the rule "every table and diagram slide carries a takeaway" is unobeyable on three of sixteen layouts; and the 10pt floor is breached by the system's own `DiagramLink`.

The single biggest opportunity is not visual. **The deck is two unrelated proposals stapled together.** Slides 1–8 pitch general IT consulting capability, slides 10–15 propose a specific accounting document-automation project, slide 9 is generic package pricing, and slide 14 is an agenda for a third deck — while the footer reads `ข้อเสนอโครงการระบบบัญชี` on all sixteen. Fix the contrast token and you gain a readable deck. Fix the arc and you gain a persuasive one.

## What's Working

1. **The token→artifact spine is real, not decorative.** `web/src/tokens.css` is machine-generated from `scripts/tokens.py`, and `slides.css` consumes variables rather than hexes. The rules carry their reasons — "TEAL_B is a gradient stop only (3.4:1 on white)", "status colours are data colours, three per slide max", "10pt is the floor, split the slide instead". Most systems this size have no such spine.
2. **`SlideSplitPanel` (`layouts.tsx:353-385`) is the one layout where the visual system carries the argument.** Dark navy panel for current pain, tinted panel for outcome, mandatory one-line takeaway underneath, `contextKicker`/`outcomeKicker` defaulted to correct Thai so the author cannot forget them. The "never swap the sides" rule in the JSDoc is exactly the constraint that keeps a deck consistent across authors. It is the only slide that lands in under two seconds.
3. **The photo-band geometry is genuinely well-engineered.** `--nct-band-w` and `--nct-band-text-w` are single tokens spent four ways; the fade is a four-stop gradient into the panel colour so the seam never reads as a cut; and a separate `photo-foot` gradient (`slides.css:267-279`) keeps footer chrome on solid navy instead of on glass. That last detail is the kind most systems miss. The mechanism is right — the photographs put through it are wrong.

Also clean and worth keeping: **all 22 `<img>` elements have correct alt text** (15 decorative footer marks at `alt=""`, 7 content photos with descriptive Thai), **heading outline is strict H1→H2→H3 with no skips**, and **motion is correctly cut** with no animation anywhere, matching `DESIGN.md:62-68`.

## Priority Issues

### [P0] `--nct-ink-2` fails contrast everywhere the deck explains itself
**Why it matters.** `#A4A4A4` measures 2.49:1 on white and 2.25:1 on `--nct-paper-2` — below AA (4.5:1) and below even AA-large (3:1). It colours every footer and page number, `.nct-caption`, `.nct-figure__label`, `.nct-quote__by`, the dense-table intro and footnote, `.nct-dia-legend`, the flow note, and every level-2/3 bullet marker. Measured: **50 failing instances on 10 of 16 slides.** Every explanatory layer of the deck is invisible. `99.9%` arrives without `Uptime เฉลี่ยของระบบที่ดูแล`. The testimonial arrives without its source. On a projector in a bright meeting room they are gone entirely — in the deck where a client decides whether to trust NCT with their infrastructure.
**Fix.** Retire `#A4A4A4` as a text colour in `scripts/tokens.py` and regenerate. `#5F5F5F` gives 6.0:1 on white and 5.4:1 on paper-2 and is the safe choice at 10pt. Keep `#A4A4A4` only as a new `--nct-ink-3` for hairlines. Two related fixes in the same pass: `.nct-band--dark .nct-band__label` uses `--nct-teal-l` on navy at 2.78:1 (`slides.css:365`) — switch to `--nct-paper` at 0.75 alpha; and the 80px section numerals on slides 2/14 sit at the same 2.78:1.
**Suggested command:** `/impeccable audit`

### [P0] The three slides that most need a conclusion structurally cannot carry one
**Why it matters.** `conventions.md:63` states the law: every table slide and diagram slide carries a one-line `TakeawayBand`. `SlideTable` (`layouts.tsx:262-281`), `SlideDiagram` (`501-524`) and `SlideDenseTable` (`557-591`) expose no `takeaway` prop at all. The demo proves the consequence: slide 9 (packages — the buying decision), slide 13 (architecture — the technical proof), and slide 15 (scope, two red rows — the risk moment) each end with no conclusion. On a Persuade surface the takeaway band *is* the persuasion. A CFO skimming slide 9 gets a grid and no recommendation; a CTO on slide 13 gets five boxes and no claim; anyone on slide 15 gets two red cells and no reassurance.
**Fix.** Add `takeaway`/`takeawayLabel` to all three interfaces and render `<TakeawayBand>` at the bottom of `.nct-body`. Make it non-optional on layouts 09/14/16 so TypeScript enforces the law the docs already state. On slide 9, add a "recommended" treatment to one `DataTable` column.
**Suggested command:** `/impeccable harden`

### [P1] Fixed boxes with no content-fit: half-empty when short, silently broken when long
**Why it matters.** One root cause, two opposite symptoms, both measured live. *Empty:* `.nct-card` 336px, `.nct-card--square` 364.8px, `.nct-panel` 398.4px, `.nct-flow__step` 192px are fixed heights, so slides 5, 10, 11, 12 run 45–65% empty inside their own boxes, and `.nct-body`'s fixed 456px leaves slides 3, 4, 6, 12, 13 at 40–70% blank. *Overflow:* `.nct-title` is a 76.8px `align-items:flex-end` box, so a 2-line Thai title breaks its top margin (measured ink top 42.2px) and a 3-line title is clipped off-slide. `.nct-section__title` has no height: a 3-line chapter title at the band width runs to y=480 and overlaps `.nct-section__desc` at y=451.2 by 29px. `.nct-agenda__list` at its own documented 6-item ceiling reaches y=679.7, on top of the footer at 655.2–676.8. Thai proposal titles run long by nature; the system eats the first line or overlaps silently.
**Fix.** Swap `height` for `min-height` + `align-content: start` on the card/panel/step boxes. Anchor `.nct-title` at `top: 57.6px` growing down toward the rule instead of `flex-end` growing up out of the box. Type the agenda at five items max, or raise the layout-15 body ceiling.
**Suggested command:** `/impeccable layout`

### [P1] The web preview and the `.potx` disagree at both bookends
**Why it matters.** `emit_web_tokens.py:100-104` emits the gradient with `T.TEAL` while `parts_layouts.py:69,222` builds layouts 01 and 10 with `T.TEAL_B`, so the cover and closing render a visibly duller gradient on the web than in the deliverable. Separately, `demo.tsx:98` (`variant="fade"`) and `demo.tsx:226` (`imageMode="full"`) are documented web-only. The demo's entire purpose is proving the 16↔16 parity claim in `conventions.md:3-5`; two of its sixteen slides — including the closing, the last impression — cannot be rebuilt in PowerPoint, and two more show the wrong brand gradient. The preview lies about the artifact at both ends.
**Fix.** Pass `T.TEAL_B` in `emit_web_tokens.py` and regenerate. Then either build `.potx` counterparts for the fade and full-bleed treatments, or move them out of the parity demo onto a separate page labelled web-only.
**Suggested command:** `/impeccable polish`

### [P1] Every photograph is stock, and the last one is the specific cliché the system bans
**Why it matters.** `DESIGN.md:72` bans generic stock office photography and prescribes real product screenshots or commissioned photography. `conventions.md:68-73` narrowed that to "never people at work", admitting three interchangeable stock glass-tower frames; `conventions.md:74-79` then carved an exception for a stock handshake on the closing. The reader's last frame is a headless torso in a grey suit shaking a hand — indistinguishable from every other Thai IT proposal. And because `imageMode="full"` is web-only, the PowerPoint the client actually receives ends on a different slide: the deck's strongest emotional beat is the one that does not ship.
**Fix.** Drop `photoHandshake` from `demo.tsx:225` and from `web/src/assets.ts` (`conventions.md:84-87` already calls unused frames dead weight in every consumer bundle). Replace at least one tower frame with a real NCT NOC, rack, or dashboard screenshot. Reconcile `conventions.md:68` back to `DESIGN.md:72` — the law is *no stock*, not *no people*. Delete the developer note at `demo.tsx:102`.
**Suggested command:** `/impeccable bolder`

## Cognitive Load

**5 of 8 items fail** — high load, critical fix needed.

| Item | Verdict | Evidence |
|---|---|---|
| Single focus | FAIL | The two slides where the reader must decide carry the most: slide 9 (3 packages × 4 attributes, no recommendation) and slide 15 (8 rows × 6 cols × 3 statuses × 3 chip colours). |
| Chunking | PASS | Cards, panels, flow steps and table rows are cleanly chunked. |
| Grouping | FAIL | `.nct-band__label` is `flex: 0 0 168px` + 24px gap, so `สรุป` sits ~192px from the copy it labels. Section title→description gap is 86px of nothing. Slide 13's legend sits ~100px below the diagram it explains. All fixed-position artifacts, not content-driven spacing. |
| Visual hierarchy | FAIL | Five declared text levels; the reader gets two. Level 1 is clear; everything from caption down uses `--nct-ink-2` at 2.49:1 and functionally disappears. |
| One thing at a time | PASS | Linear deck, no branching. |
| Minimal choices | PASS | 3 packages, 4 cards — passes on count, though slide 9 offers three options and zero guidance. |
| Working memory | FAIL | Slide 15 asks the reader to hold unaided: what green/amber/red mean, what navy/teal/deep chips encode (cat-1 vs cat-4 are 1.31:1 apart anyway), and what `รอบ 1/2/3` means. |
| Progressive disclosure | FAIL | The agenda is slide 14 of 16 — after everything it lists — and its five items map to none of the preceding slides. Its last promise, `งบประมาณและเงื่อนไข`, is never delivered; there is no pricing layout in the sixteen. |

## Emotional Journey

Broken before it starts, for the structural reason above. Beat by beat: slide 1 competent and quiet, not a peak (muted, wrong gradient, bottom 40% empty). Slide 2 the first genuine lift. **Slides 3–4 the first valley** — two near-empty bullet slides at ~70% white, where a skimmer decides the deck is filler; slide 4 fakes its `ก่อน`/`หลัง` column headers as level-1 bullets, so the before/after contrast lands flat. Slides 5–6 lift slightly: the `99.9%`/`24/7` figures land, their labels at 2.49:1 do not, so the numbers arrive without meaning. Slide 7 should be the trust peak and is not — a testimonial's credibility is its attribution, rendering at 2.25:1. Slide 8 is a third glass tower, so repetition reads as padding. **Slide 9 is the deepest structural sag**: the money slide, no recommended column, no prices, no takeaway, 45% empty below the table. **Slide 10 is the peak** — and it is slide 10 of 16. Slides 11–12 sustain. Slide 13 sags. Slide 14 inserts the agenda between two content slides, breaking the arc a second time. **Slide 15 is the worst-timed sag**: the last content slide leaves the reader on two unresolved red risks. **Slide 16 actively violates the peak-end rule** — a stock handshake, `ขอบคุณครับ` and three contact lines: a full stop, not an ask. No next step, no validity date, no named person.

## Persona Red Flags

**The skeptical decision-maker who skims (the signer).**
- Slide 9 `เปรียบเทียบแพ็กเกจ`: three columns, no recommended column, no price row, no takeaway. They leave the money slide with no default and 45% white space where the recommendation should be.
- Slide 15 `ขอบเขตงานรายกระบวนการ`: rows 6 and 8 red `ติดข้อจำกัด`, rows 4–5 amber `รอยืนยัน`. No owner, no date, no mitigation. Only qualifier is a 10pt footnote at 2.49:1 they will never read.
- Slides 3 and 4: five short bullets each on 70% white, no takeaway. Two consecutive slides confirming "this is filler."
- Slide 16: no ask, no next step, no proposal validity date, no named person. They close the file with nothing to approve.
- Chrome: the page number is "1", not "1 / 16", at 2.49:1. They cannot tell how much is left — the one thing a skimmer needs.

**The technical evaluator who reads the detail slides.**
- Slide 13 `ภาพรวมสถาปัตยกรรมระบบ`: five boxes in one row, no interfaces, protocols, or data direction. Its legend promises `กล่องทึบ = ระบบที่มีอยู่ · กล่องมีสีหมวด = ส่วนที่เพิ่ม` while the two box treatments measure **1.17:1** apart — the legend describes a distinction they cannot see.
- Slide 13, `DiagramLink` label `ผ่านกฎ`: `primitives.tsx:233` hardcodes `fontSize="10"` in a 60-unit viewBox rendered at 60px — 10px = **7.5pt**, under the system's own absolute 10pt floor. Independently confirmed by measurement as the smallest type on the page.
- Slide 15: the `รอบที่ทำ` column shows `รอบ 1/2/3` with no definition anywhere; the `#` chips encode AP/AR/GL in colours **1.31:1** apart while the identical information sits as plain text in the adjacent column.
- Slide 12: five steps, no durations, no owners, no gates. `SlideProcessFlow` exposes a `note` prop that goes unused.
- Slide 9: SLA response times with no coverage exclusions, no measurement basis, no penalty clause.

**The Thai-first reader for whom English is friction.**
- Slide 5 `สามเสาหลักของบริการ`: all three card headings are English-only — `Infrastructure`, `Managed Service`, `Cloud & Security`. The three pillars of the service have no Thai names on the slide that names them.
- Slide 6: the meaning of `99.9%` is carried by the English word `Uptime`, and that word sits at 2.49:1.
- Slide 9: column heads `Essential / Business / Enterprise` — the one thing that must be spoken aloud in a Thai meeting, untranslated and undefined.
- Slides 10 and 11: `audit trail` untranslated in the dark panel and again in card 02.
- Typographic: `--nct-font-body` lists Noto Sans Thai first, so Latin runs in a Thai-designed face while headings run in Kanit. On slide 5 the English card headings render in Kanit Latin at 26.67px directly above Thai bodies in Noto Latin at 16px — two different Latin voices on one card.

## Minor Observations

- **The four category colours are one blue.** cat-1 vs cat-4 = 1.31:1, cat-1 vs cat-2 = 1.66:1, cat-2 vs cat-3 = 1.67:1. On slide 15 the chips read as two groups, not four. The honest count is two.
- **`--nct-ok-tint` #E6F4EE vs `--nct-paper-2` #E8F6F5 = 1.02:1.** On slide 15's zebra even rows the "พร้อม" status fill is invisible; only the green text carries the signal.
- **`slides.css:2-3` says "never hard-code a colour or a size in this file", then hard-codes ~30 sizes** — the 336px wedge, 80px section number, 160px quote mark, 864px cover title, and every fixed card/panel/step height. Those are exactly the heights causing the empty-box problem, and they are invisible to the token layer.
- **Eight `--nct-*` tokens are defined and never consumed anywhere in the shipped web output**: `--nct-col`, `--nct-half`, `--nct-mb`, `--nct-mid`, `--nct-mt`, `--nct-quarter`, `--nct-teal-b`, `--nct-third`. Two of them (`--nct-mid`, `--nct-teal-b`) are annotated as intentional `.potx` reference values; the other six are grid measurements with no such note. `--nct-cat-2/3/4` looked dead in CSS but are consumed via inline style in `primitives.tsx`.
- **The "centred" footer is not centred.** Optical centre measures 614.9px on a 1280 canvas and drifts with the length of the `date` string, because it is `flex: 1` in a row whose left slot is the date.
- **The cover carries full footer chrome including page number "1".** `hideFooter` exists in `Slide.tsx:50` and is unused.
- **`SlideTwoColumn` has no column-header slot**, so the demo fakes `ก่อน`/`หลัง` as level-1 bullets. No divider, no tone difference, no direction. Layout 04 is either redundant against `SlideSplitPanel` or needs kickers.
- **Slide 7 is the only slide with no heading at all** — plausibly correct for a quote slide, worth a deliberate call rather than an accident.
- **No `@media` query exists anywhere in `web/src/*.css`, and `index.html` has no viewport meta.** `useFitScale` scales the whole 1280×720 canvas linearly: at a 1024px browser the dense table cell renders at 7.6pt; at 768px, 5.6pt; at 375px the phone falls back to the 980px layout viewport at scale 0.383 — sixteen unreadable postage stamps with no horizontal scroll to escape into and no minimum-width message. The 10pt floor is already breached at 1280px (9.6pt). Whether this matters depends on whether the demo is an internal render-check harness or something a client opens.
- **Dark mode: nothing happens, correctly.** For a print-parity slide surface that is the right call. One caveat: the page never declares `color-scheme`, so a dark-mode browser paints its chrome dark against a hard-coded light page.
- **`useFitScale` falls back to `canvas.width` when `clientWidth` is 0** (`Slide.tsx:15`), so a slide mounted inside a hidden container renders at full 1280px and overflows on reveal. `ResizeObserver` never fired in this preview environment, so the resize path could not be exercised.
- **Placeholder content presented as a client preview**: `บริษัทตัวอย่าง จำกัด` on slide 7, `02-XXX-XXXX` on slide 16.
- **Doc contradiction**: `slide-design-system-v2.md:119` specifies the L07 quote mark as `TEAL_L` while `slides.css:437-438` uses `TEAL` at 25% alpha. The CSS matches the `.pptx`; the type table is stale. Separately, the `&ldquo;` glyph in Kanit at 25% opacity reads as two slanted tally marks, not a quotation mark.

## Questions to Consider

1. The closing photograph — the deck's last frame and its strongest emotional beat — exists only on the web and never ships in the `.potx`. **Which artifact is this design system actually for?**
2. `conventions.md:68` rewrote `DESIGN.md:72`'s ban on stock photography into a ban on *people*. Was that a design decision, or a way to keep three photographs someone had already picked? What would this deck look like if every frame had to be shot in a real NCT client's server room?
3. Slide 10 is the only slide where the layout itself makes the argument. **Why is it slide 10 of 16 — and why do slides 3 and 4 exist at all**, when slide 10 does their job better in one screen?
4. The system's hardest, most-repeated rule is a 10pt floor. The web preview drops to 7.6pt at a 1024px browser and the system's own `DiagramLink` renders 7.5pt at full size. **Is that a rule about type, or a rule about PowerPoint?**
5. Sixteen slides carry a footer and page number at 2.49:1. **If a value is set at a contrast nobody can read, is it chrome — or decoration you pay for on every slide?**
6. The agenda promises `งบประมาณและเงื่อนไข` and the deck never delivers a pricing slide, because **there is no pricing layout among the sixteen.** For a system whose stated purpose is proposal and requirement decks, is that a gap in this deck or a gap in the system?
