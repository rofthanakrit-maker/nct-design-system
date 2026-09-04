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
- **The Python scripts are invoked as `python`, not `py`.** The npm scripts and
  `.claude/launch.json` used the python.org launcher, which is absent on installs
  that only put `python` on PATH.
- **Noto Sans Thai must be the `googlefonts/ttf` build.** The `hinted/` and
  `unhinted/` builds in the same upstream zip are Thai-only: no Latin glyphs, no
  `·`. Installing the wrong one turns every English word into empty boxes.
- **`Slide` measures itself.** `fit` scaling uses a `ResizeObserver`, not CSS —
  `scale()` needs a unitless number and `calc(100cqw / 1280)` resolves to a length.
  Preview cards that render a slide in a zero-width box will show it at scale 1.
- **No Storybook.** Preview cards are authored from `web/demo/demo.tsx`, which
  renders all 16 layouts with real proposal copy. It is the reference usage example.
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
  `icons and images/` holds untouched sources (tens of MB, gitignored); the script
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
