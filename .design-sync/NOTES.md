# design-sync notes — nct-design-system

Repo-specific gotchas. Read before re-syncing.

- **The package lives at `web/`, not the repo root.** The root `package.json` is a
  workspace shell; `@nct/slides` resolves through `node_modules/@nct/slides` after
  `npm install` at the root. Run `npm install` from the root before building.
- **Generated files — never hand-edit.** `web/src/tokens.css`, `web/src/tokens.ts`,
  `web/src/fonts.css` and `web/src/assets.ts` are emitted by the `scripts/emit_*.py`
  and `scripts/build_webfonts.py` generators from `scripts/tokens.py`. Change
  `design.md` → `scripts/tokens.py` → rerun the generators → rebuild. `npm run build`
  regenerates tokens on its own; fonts and assets are separate steps
  (`npm run fonts`, `npm run assets`) and rarely need rerunning.
- **Both families ship in `fonts/`.** Kanit (nine upstream Google Fonts static
  weights) and Noto Sans Thai are vendored, so `scripts/build_webfonts.py` needs
  nothing installed on the machine. The `.potx` is a different story: PowerPoint
  reads fonts from the OS, so install `fonts/*.ttf` before opening the template or
  every layout silently substitutes.
- **The npm scripts try `python`, then `py -3`.** Neither name is portable on
  Windows on its own: the python.org launcher is absent on installs that only put
  `python` on PATH, and `python` is the Microsoft Store stub (exit 9009, "Python
  was not found") on installs that went through the launcher. Both are real
  machines in this project, so the scripts run `python X || py -3 X` and stop
  caring. `.claude/launch.json` still names `python` — the preview server only has
  to start on the machine that opens the browser.
- **Noto Sans Thai must be the `googlefonts/ttf` build.** The `hinted/` and
  `unhinted/` builds in the same upstream zip are Thai-only: no Latin glyphs, no
  `·`. Installing the wrong one turns every English word into empty boxes.
- **`Slide` measures itself.** `fit` scaling uses a `ResizeObserver`, not CSS —
  `scale()` needs a unitless number and `calc(100cqw / 1280)` resolves to a length.
  Preview cards that render a slide in a zero-width box will show it at scale 1.
- **`preview/` is generated, not hand-made.** `python scripts/render_previews.py`
  renders both demo decks through PowerPoint COM (Windows only, read-only, never
  saves back) and writes `layout-01..19.png`, `corp-layout-01..19.png` and the two contact sheets. It went
  stale across a whole release when it was a manual pass; run it after any change
  that moves geometry.
- **No Storybook.** Preview cards are authored from `web/demo/demo.tsx`, which
  renders all 19 layouts with real proposal copy, in both brand modes. It is the reference usage example.
- The PowerPoint side (`scripts/build.py` → `.potx`) shares `scripts/tokens.py` with
  the web package but nothing else. A token change must be rebuilt on both sides.
- **The visual loop is `web/demo/`.** `npm run demo` bundles `demo.tsx` to the
  gitignored `demo/demo.js` (`demo:watch` needs esbuild's `--watch=forever`,
  which the script already passes); `npm run serve` serves `web/` - open
  `/demo/index.html`. A token edit shows up after `npm run tokens` + refresh —
  `index.html` links `../src/styles.css` directly, so no package build is needed.
- **Serve the demo with `npm run serve`, not `python -m http.server`.** The stdlib
  server sends only `Last-Modified`, and browsers reuse a cached `@import` through
  a hard reload - a regenerated `tokens.css` keeps rendering the old palette and
  the edit loop lies to you. `scripts/serve.py` sends `no-store`.
- **Photographs come from `scripts/prepare_images.py`, not from the raw drop.**
  `icon and images/` holds untouched sources (tens of MB, gitignored); the script
  centre-crops each one to the aspect the layout places it at and writes
  `assets/photo-*.jpg` + `assets/mascot*.png`. Cropping there rather than in CSS is
  what keeps the web and the .potx framing identical - PowerPoint stretches a
  picture to its frame and would distort anything cropped only by `object-fit`.
  `emit_web_assets.py` then inlines the three the components use.
- **Layouts 02, 15 and 10 carry the photograph.** 02 and 15 are both chapter
  openers; 10 is the closing, where the band replaces the top-right diamond and the
  logo moves under the contact block (there is no margin left for it). In
  PowerPoint the band is baked into each layout (like the wedge it replaced); in
  React it appears only when the component gets an `image`, and `SectionBand` in
  layouts.tsx is the one place that renders it. One frame each, never repeated:
  02 `photo-section.jpg`, 15 `photo-tower.jpg`, 10 `photo-facade.jpg`. All three are
  architecture. Same geometry both sides: `SEC_PHOTO_*` in parts_layouts.py
  mirrors `.nct-section__photo` in slides.css - change one, change the other.
- **`SlideClosing imageMode="full"` exists on the web only - this is deliberate,
  not drift.** The band crops its subject to about 560x720; a handshake read as a
  blur at that size, so the full-bleed variant runs the photograph edge to edge
  behind a `DEEP` scrim. PowerPoint has no props: mirroring it would mean either
  losing the band on layout 10 or adding a seventeenth layout, and the 1:1
  component-to-layout mapping is worth more than the variant. `.potx` layout 10
  keeps the facade band. A deck that has to survive export to PowerPoint should
  stay on the default `imageMode="band"`.
- **`SlideFullImage variant="fade"` is web-only too**, for the same reason as the
  closing's full-bleed variant: `.potx` layout 08 is a full-bleed picture
  placeholder and a PowerPoint layout cannot branch on a prop. The default stays
  `"full"`, which is what the .potx does; `"fade"` narrows the picture to the band
  and holds the type in the left half.
- **Band geometry lives in `scripts/tokens.py` (`BAND_*`), not in the stylesheet.**
  It is emitted as `--nct-band-w` / `--nct-band-text-w` and re-exported to
  parts_layouts.py as `SEC_PHOTO_*`. Four layouts share it - change the token, not
  the four call sites.
- **Regenerating `preview/*.png` needs PowerPoint.** `render_previews.py` drives
  PowerPoint over COM, so it only runs on a machine with PowerPoint installed. The
  whole folder was re-rendered on 2026-09-11 (v4), which caught up the 2026-09-07
  fixes to layouts 09, 10, 15, 16 and 17 that could not be rendered at the time.
  It writes `corp-layout-NN.png` alongside the house set: the corp brand used to
  exist only as a 618x348 cell of a contact sheet, which is how eleven layouts
  shipped mixing `#006666` chrome with `#216B7F` content without anyone seeing it.
  Re-run `python scripts/build.py && python scripts/render_previews.py` after any
  change that moves geometry or colour.
- **spcPct is not `line-height`; use `tokens.lnspc`.** CSS line-height multiplies
  the font size, OOXML spcPct multiplies the font's line box, and
  NotoSansThai-Regular declares that box at 1.511 em. Copying a CSS number into a
  layout makes it 1.5x looser, which is how L10's contact block and L15's agenda
  list both ended up with their last line under the footer rule while every box
  was legally above it. Layouts other than those two were left at their own
  measured values rather than re-flowed sight unseen; `check_template.py` now
  measures every demo slide against its layout's footer rule, so an overrun fails
  the build instead of shipping.
