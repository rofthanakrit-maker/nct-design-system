# NCT slide system — how to build with it

This library builds **presentation slides**, not app UI. Every component maps 1:1
onto a layout in `NCT-Slide-Template.potx`, so a design made here can be rebuilt in
PowerPoint by picking the layout with the same number.

## Setup

No provider, no theme object. Two things only:

1. Import the stylesheet once at the app root: `import '@nct/slides/styles.css'`.
   It pulls in `fonts.css` (self-hosted Kanit + Noto Sans Thai woff2), `tokens.css`
   (every `--nct-*` variable) and `slides.css`. Without it slides render unstyled
   at the wrong size — there is no inline-style fallback.
2. Put content inside a layout component. `Slide` is the raw 1280×720 canvas
   (13.333in × 7.5in at 96dpi); the 16 layouts wrap it. Reach for bare `Slide`
   only when no layout fits.

Slides scale themselves to their container by default (`fit`, measured with a
`ResizeObserver`). Pass `fit={false}` for a fixed 1280×720 board.

## The 16 layouts

`SlideCover` 01 · `SlideSection` 02 · `SlideContent` 03 · `SlideTwoColumn` 04 ·
`SlideThreeCards` 05 · `SlideKeyFigures` 06 · `SlideQuote` 07 · `SlideFullImage` 08 ·
`SlideTable` 09 · `SlideClosing` 10 · `SlideSplitPanel` 11 · `SlideFourCards` 12 ·
`SlideProcessFlow` 13 · `SlideDiagram` 14 · `SlideAgenda` 15 · `SlideDenseTable` 16

Compose with `Deck`. Building blocks: `BulletList`, `DataTable`, `TakeawayBand`,
`DiagramBox`, `DiagramLink`, `DiagramGroup`, `NctLogo`, `NctMark`.

## The styling idiom

**Style through props and tokens — never write new CSS classes.** The `nct-*` class
names are internal to the library; a design that invents its own is off-system. For
your own layout glue, use the CSS variables:

| Family | Real names |
|---|---|
| Colour | `--nct-paper` `--nct-paper-2` `--nct-ink` `--nct-ink-2` `--nct-rule` `--nct-navy` `--nct-teal` `--nct-teal-up` `--nct-deep` `--nct-mid` `--nct-teal-b` |
| Status (data cells only) | `--nct-ok` `--nct-ok-tint` `--nct-warn` `--nct-warn-tint` `--nct-risk` `--nct-risk-tint` |
| Category (max 4) | `--nct-cat-1` … `--nct-cat-4` |
| Type | `--nct-fs-display` `--nct-fs-section` `--nct-fs-h1` `--nct-fs-stat` `--nct-fs-quote` `--nct-fs-lead` `--nct-fs-body` `--nct-fs-body-2` `--nct-fs-body-3` `--nct-fs-label` `--nct-fs-foot` `--nct-fs-densehead` `--nct-fs-densebody` `--nct-fs-tblhead` `--nct-fs-densecell` |
| Family | `--nct-font-display` (Kanit, headings) `--nct-font-body` (Noto Sans Thai, copy) |
| Grid | `--nct-mx` `--nct-cw` `--nct-gut` `--nct-fifth` |

Tokens are also importable as values: `import { color, space, fontSize, canvas } from '@nct/slides'`.

`tokens.css` emits only what something reads. The grid units `--nct-mt` `--nct-mb`
`--nct-col` `--nct-half` `--nct-third` `--nct-quarter` and `--nct-note-h` were
declared for nine months without a single `var()` and are gone; `scripts/tokens.py`
still holds every one of them, so adding one back is a line in `emit_web_tokens.py`
the day a rule actually needs it. A token nobody reads is a promise the system
does not keep.

## Rules that are not preferences

- **Kanit is the heading voice, Noto Sans Thai the body voice.** Never swap them,
  never add a third family. Never italic — Thai italics are synthesised obliques.
- **`--nct-fs-densecell` (10pt) is the floor.** Content that will not fit is a
  second slide, never smaller type. The dense sizes are legal on layouts 11–14 and
  16 only; 03/04/05 stay at 18/16/14pt. `SlideDenseTable` holds 8–9 rows at that
  size once the takeaway strip has taken its 0.4in.
- **On dark slides text is `--nct-paper`, dimmed with alpha — never grey.**
  Dark tones: `SlideCover`, `SlideSection`, `SlideAgenda`, `SlideClosing`,
  `SlideFullImage`, and the left panel of `SlideSplitPanel`.
- **Status colours are data colours.** Tables and process cells only — never a
  heading, a rule or a slide background. Three statuses per slide, maximum.
- **`--nct-teal-b` is a gradient stop only.** It fails contrast as text or fill —
  and it is the *end* stop of both `--nct-grad-open` and `--nct-grad-close`, so the
  light end of each gradient lands in a corner where chrome sits. `Slide` paints a
  `.nct-tone-foot` scrim under the footer on those two tones for exactly that
  reason: white at full opacity is still 4.0:1 on `TEAL_B`, so the ground has to
  change, not the ink. Never remove it.
- **Footer chrome on dark tones is `rgb(255 255 255 / 0.72)`.** 0.55 measured
  4.26:1 on navy and 3.00:1 at the teal end — under AA at 10pt, on the two slides
  that stay on screen longest.
- **`--nct-ink-2` is the floor for muted text, not a dial.** `#5F5F5F` clears AA
  at 10pt on both `--nct-paper` and `--nct-paper-2`. Never lighten it.
- **`--nct-teal-l` on white, `--nct-teal-up` on navy.** They are the same hue;
  `teal-l` reads at 2.8:1 on navy and `teal-up` at 2.1:1 on white. Swapping them
  is the mistake this pair exists to prevent.
- **Flat.** No shadows, bevels, 3-D or reflections anywhere, diagrams included.
- Every table slide and diagram slide carries a one-line `TakeawayBand`. On
  `SlideTable`, `SlideDiagram` and `SlideDenseTable` the `takeaway` prop is
  **required** — the type checker enforces the rule so it cannot be forgotten.
  All three pin the strip to the foot of the body box, so the conclusion lands
  at the same y whether the grid runs four rows or ten.
- `SlideCover` and `SlideClosing` appear once each, as the deck's bookends.
- **`SlideClosing` is the ask, not a thank-you.** Pass `nextSteps` (two to four
  actions, each with an owner) and `decisionBy`. `ขอบคุณครับ` is the title above
  them. A proposal whose last slide asks for nothing has spent the peak-end slot
  on politeness. With both an ask and a photograph the full lockup is dropped —
  the left column is full and the corner mark already signs the slide.
- **Price lives on `SlideTable`.** Put the investment in as a bold last row and
  set `recommended` to the column the takeaway argues for. Three columns of equal
  weight plus a sentence underneath is not a recommendation, and a comparison
  with no prices makes the client guess.
- **Ceilings are types, not sentences.** `cards` (3 and 4), `steps` (3–5) and
  agenda `items` (4–6) are tuple unions, so the compiler refuses the slide that
  would overflow. Anything with a documented maximum and a fixed box belongs in
  that list — prose ceilings were what let a six-line agenda cross the footer and
  an eight-step flow run 518px off the canvas, both in silence.
- **`Deck` owns the chrome.** Pass `footer` and `date` to it once; page numbers
  come from position. A prop set on the slide still wins, which is how the cover
  gets `hideFooter` — a cover is not page 1 of anything.
- **A slide title is one line.** Two fit but eat 15px of the 1in top margin, because
  `.nct-title` is a fixed 0.8in box that grows upward from its baseline. Three do
  not fit at all. Shorten the title; that is the fix.
- **Rounded corners exist once, on L05.** `.nct-card` is 16px, `.nct-card--square`
  (L12) is 0, and the `.potx` draws the same split (`roundRect` on 05, `rect` on
  12). Three parallel points are a set and read softer; four category-coded ones
  are a taxonomy and read as a grid. No third radius.
- Card heights are fixed. Trim the copy; never stretch a card.
- **Photographs: architecture and abstract only, never people at work.** Smiling
  meetings, handshakes and stacked hands are the templated-AI tell this system
  exists to avoid. `SlideSection`, `SlideAgenda` and `SlideClosing` take an
  optional `image` for the right 40% of the slide - `photoSection`, `photoFacade`
  and `photoTower` are the three house frames, and the band fades into the panel on
  its own. There are only two architecture sources behind them, so `photoSection`
  and `photoFacade` come from one shot: two anchors alone left them reading as the
  same photograph, and `photoFacade` is now a zoomed crop of the facade grid
  instead (`scripts/prepare_images.py`). Two chapter openers should not share a
  frame; `SlideFullImage` wants a real screenshot or a real site photo, not
  stock. The mascot (`mascot`) is brand art, not photography - it is welcome
  wherever a slide has room for a light touch.
- **One exception, decided by the system's owner: the closing slide.**
  `SlideClosing` may run `photoHandshake` with `imageMode="full"` - the photograph
  edge to edge behind a scrim rather than cropped into the 40% band. It is the
  only people-at-work photograph the system uses, and it is web-only: `.potx`
  layout 10 keeps the architectural band, so a deck headed for PowerPoint stays on
  the default `imageMode="band"`.
- **The band is one geometry, spent four ways.** `--nct-band-w` (40% of the
  canvas) and `--nct-band-text-w` are tokens; layouts 02, 15, 10 and
  `SlideFullImage variant="fade"` all sit on them. Never retype the pixel values,
  and never introduce a fifth width.
- **`.potx` parity is 16↔16 by count, and by rendering everywhere but two.**
  `SlideFullImage variant="fade"` and `SlideClosing imageMode="full"` are web-only
  treatments; PowerPoint layout 08 stays full-bleed and layout 10 keeps the 40%
  band. Every other layout renders the same on both sides. State it that way —
  "1:1" on its own has been read as "identical", which is false for those two.
- **Imagery is inlined, not linked.** `photoSection`, `photoFacade`, `photoTower`,
  `photoHandshake`, `mascot` and the logo exports are data URIs; an external `src`
  is dropped by the artifact CSP. Only frames a layout actually shows get inlined -
  every unused one is dead weight in every consumer bundle.

## A slide, idiomatically

```tsx
import { CategoryKey, Deck, SlideSplitPanel, SlideDenseTable, SlideClosing } from '@nct/slides';
import '@nct/slides/styles.css';

// chrome and page numbers live on Deck, once
<Deck footer="NCT · ข้อเสนอโครงการ" date="2569">
  <SlideSplitPanel
    title="สภาพระบบบัญชีปัจจุบัน"
    context={['คีย์เอกสารซ้ำสามระบบ', { text: 'เฉลี่ย 1,200 ใบต่อเดือน', level: 2 }]}
    outcome={['คีย์จุดเดียว ระบบกระจายต่อให้อัตโนมัติ']}
    takeaway="ปัญหาหลักคือการคีย์ซ้ำ ไม่ใช่จำนวนเอกสาร"
  />
  <SlideDenseTable
    title="ขอบเขตงานรายกระบวนการ"
    widths={[0.6, 3.2, 1.6, 1.6]}
    columns={[{ label: '#', align: 'center' }, 'กระบวนการ',
              { label: 'ความพร้อม', align: 'center' }, { label: 'รอบ', align: 'center' }]}
    rows={[
      [{ value: 1, category: 1 }, 'บันทึกใบแจ้งหนี้ซื้อ',
       { value: 'พร้อม', status: 'ok' }, { value: 'รอบ 1', align: 'center' }],
      [{ value: 2, category: 4 }, 'ปรับปรุงบัญชีสิ้นเดือน',
       { value: 'ติดข้อจำกัด', status: 'risk' }, { value: 'รอบ 3', align: 'center' }],
    ]}
    // a coded column needs its key on the same slide
    legend={<CategoryKey items={[{ category: 1, label: 'AP' }, { category: 4, label: 'GL' }]} />}
    footnote="ปริมาณเป็นค่าเฉลี่ย 3 เดือนล่าสุด"
    takeaway="หนึ่งในสองกระบวนการเริ่มได้ทันที อีกรายการรอสิทธิ์เข้าระบบ"
  />
  // the last slide asks for something
  <SlideClosing
    nextSteps={['ยืนยันขอบเขตงาน', 'เปิดสิทธิ์เข้าระบบให้ทีมสำรวจ', 'ลงนามและเริ่มรอบที่ 1']}
    decisionBy="ต้องการคำตอบภายใน 30 กันยายน 2569"
    contact={['โทร · 02-XXX-XXXX', 'อีเมล · contact@nctthai.com']}
  />
</Deck>
```

Read `styles.css` and its imports before styling anything by hand — the tokens
there are the whole vocabulary.
