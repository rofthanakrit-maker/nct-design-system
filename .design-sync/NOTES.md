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
  The first measure runs in a layout effect, so the client never paints the
  unscaled frame; server-rendered HTML still does until hydration.
- **Photographs stay in the main entry.** A `@nct/slides/photos` split was tried
  on 2026-09-11 and reverted: the `NctSlides` global is built from the main entry,
  and a design agent under the artifact CSP has no other route to them.
- **`preview/` is generated, not hand-made.** `python scripts/render_previews.py`
  renders both demo decks through PowerPoint COM (Windows only, read-only, never
  saves back) and writes `layout-01..20.png`, `corp-layout-01..20.png` and the two contact sheets. It went
  stale across a whole release when it was a manual pass; run it after any change
  that moves geometry.
- **No Storybook.** Preview cards are authored from `web/demo/demo.tsx`, which
  renders all 20 layouts with real proposal copy, in both brand modes. It is the reference usage example.
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
- **Icons: `web/src/index.ts` is the list, and the Claude Design port is generated.**
  The lucide re-export block there is the only place a glyph is named; tsup inlines
  those glyphs into `dist`. `node scripts/emit_design_icons.mjs <out>` reads the same
  block and writes the project's `components/icons/Icon.jsx` (path data inlined — a
  design there has no npm), `Icon.d.ts`, `Icon.prompt.md` and `card.html`, and fails
  if any glyph differs from lucide-react's own render. Also list a new glyph in
  `conventions.md`. The project is a hand-maintained port (`NCTDesignSystem_7648d8`,
  not the `NctSlides` global), and on 2026-09-14 the app did not rebuild
  `_ds_bundle.js` / `_ds_manifest.json` after `Icon.jsx` changed — not on upload, not
  on a GitHub re-sync. Both were patched by hand: the source wrapped as a
  `try { (() => { … })(); } catch` block, `__ds_ns.Icon` exposed, the header's
  `sourceHashes` entry as the first 12 hex digits of sha256 over the source, and the
  card added to `cards`. Re-read both from the project before patching again; they
  are the base, not a local copy.

## Converter run, 2026-09-22 (first full design-sync build)

- **Uploaded 2026-09-22 into `NCT Design System` (7648d84e-49ff-423b-9ab8-9f4d4d74bf44),
  ADDITIVELY — nothing was deleted.** That project is not the small hand-port the
  older note above describes: it is a parallel hand-built system with 26 slide
  example pages, 3 deck templates, 16 guideline pages, 52 cards and its own 14
  `.jsx` primitives. The user chose to merge rather than replace, so the plan
  went up with `deletes: []` and every one of those files is still there.
  Overwritten on purpose: `_ds_bundle.js`, `fonts/*.woff2` (identical bytes) and
  `styles.css` (merged, see below). `README.md` was deliberately NOT uploaded —
  the project already has a `readme.md` that documents it well, and a
  case-insensitive store would have clobbered it.
- **`globalName` is the PROJECT name, not `NctSlides`.** `package-build.mjs`
  normalizes it exactly the way the claude.ai/design app derives a namespace
  (`toNamespace`: alnum runs PascalCased), so `NCTDesignSystem_7648d8` lands on
  `window.NCTDesignSystem7648d8` — the same global the app would compute for that
  project. Do not "fix" the missing underscore.
- **Build wiring that this repo needs** (all in config.json now): `cssEntry` is
  `src/slides.css`, not `src/styles.css` — the converter copies the entry verbatim
  and does not follow its `@import`s, so pointing at the four-line stub shipped a
  bundle CSS of three dead imports. `tokens.css` comes via `tokensPkg`/`tokensGlob`
  (the package is its own tokens package here), and `fonts.css` via `extraFonts`,
  which parses the `@font-face` rules and copies the ten woff2 into `fonts/`.
- **`npm ci` nests `web/`'s deps in `web/node_modules`** and leaves only `react` +
  `lucide-react` at the root, so neither directory has both `react` and `react-dom`
  — which `--node-modules` requires (it reads `react/umd` and `react-dom/umd` for
  `_vendor/react.js`). Copy `web/node_modules/react-dom` and `.../scheduler` into
  the root `node_modules` before building; it is gitignored and same-version.
- **Playwright: install `playwright@1.62.1`.** That release pins chromium 1234,
  which is already in `~/AppData/Local/ms-playwright`. A different version fails
  with `Executable doesn't exist`.
- **The 74 lucide glyph re-exports are excluded from component cards**
  (`componentSrcMap` nulls). They stay in the bundle and importable — 74 cards whose
  `.d.ts` is lucide's ref/style-system noise would bury the 34 real components, and
  `conventions.md` already lists every glyph by category. Add a glyph → list it in
  `web/src/index.ts`, in `conventions.md`, and add a `componentSrcMap` null.
- **Groups come from `web/docs/<Name>.md` frontmatter**, generated once from the
  JSDoc in `dist/index.d.ts`: Layouts / Deck frame / Content blocks / Diagram /
  Brand. The package shape has no other grouping knob. Each file is also the
  component's `.prompt.md` body, so editing the doc is how you improve what the
  design agent reads.

### Findings this run (real, unfixed in the library)

- **`Chart`'s exported `ChartProps` is not the component's prop type.** The
  component is `ChartProps & { width: number; height: number }` and `highlight`
  lives inside the union, so the extracted `.d.ts` dropped all three — the first
  authored preview collapsed to a zero-height SVG because of it. Worked around with
  `cfg.dtsPropsFor.Chart`. The library fix is to export the intersection as the
  public props type.
- **`.nct-title` is hard-set to `var(--nct-heading)` with no dark-tone rule**, so
  `<Slide tone="dark"><SlideTitle>` renders an invisible heading (the rule under it
  still draws). No shipped layout combines the two — 02/15 use `.nct-section__title`
  — but nothing stops a design agent from doing it. The `Slide`/`BulletList`
  dark previews deliberately carry no `SlideTitle`.
- **Typography is scoped to `.nct-slide`.** Anything rendered outside a slide gets
  the browser's default serif at default size; the first `Icon` preview did exactly
  that. Every block preview composes inside a `Slide` for that reason.
- **`SlidePhaseCard number="03–04"` overflows its tab.** The JSDoc documents merged
  ranges as a real value, but the pill is sized for two characters and the range
  wraps onto two lines over the card border. Preview uses `"03"`.
- **Shared prop types do not survive per-component extraction.** `BulletItem`,
  `TableRow`/`TableCell`, `FigureItem`, `CardItem`, `NumberedCard`, `FlowStep`,
  `PhaseMeta`, `EvidenceFigure`, `AgendaItems`, `ChartSeries` appear in the emitted
  `.d.ts` as bare names. `web/docs/guides/prop-types.md` carries the bodies and
  ships to the project as a guideline (`guidelinesGlob`).

### Known render warns

- None. The final `package-validate.mjs` run is clean: 34/34 previews render, no
  `[RENDER_*]` lines. A warn on a later run is new.

### Re-sync risks

- **No `_ds_sync.json` anchor exists remotely** until the first successful upload,
  so the next run re-verifies everything. That is the documented safe state, not a
  bug. Grades in `.design-sync/.cache/review/` are gitignored and machine-local:
  on another machine the whole set re-captures.
- **`web/docs/*.md` was generated from JSDoc once.** It does not regenerate. A
  component whose JSDoc changes keeps the old doc — and therefore the old
  `.prompt.md` — until someone edits the file. Same for a NEW component: it gets no
  doc, lands in `misc`, and needs a `web/docs/<Name>.md` with a `category`.
- **`componentSrcMap` is a hand-maintained list of the 74 glyphs.** A glyph added to
  `web/src/index.ts` without a matching null reappears as a card.
- **`cfg.dtsPropsFor.Chart` is a hand-written copy of the chart API.** It will rot
  the day `chart.tsx` changes; diff it against `web/src/chart.tsx` on re-sync.
- **Previews hard-code real proposal copy from `web/demo/demo.tsx`.** They do not
  track the demo: a copy change there leaves the cards showing the old wording.
- The `partnerMark` prop is passed in the `Slide` CorpChrome preview but does not
  visibly render a badge in the corner lockup at card size — not chased this run.

### The merge into `NCT Design System` — what a re-sync must not undo

- **The project's `styles.css` is hand-merged and the build does not produce it.**
  It is the project's own six imports (`tokens/*.css`, `slides.css`) followed by
  `./tokens/tokens.css`, `./fonts/fonts.css`, `./_ds_bundle.css` — ours last so the
  v4 role tokens and the package's real component CSS win. `ds-bundle/styles.css`
  has only our three. **A plain re-sync uploads ours and drops the project's half.**
  Re-apply the merge by hand (write it with inline `data`, not `localPath`), and
  expect `upload.styling` to be true on every diff because the anchor's `styleSha`
  can never match what is actually up there.
- **`.design-sync/global-alias.mjs` is load-bearing.** The project was built against
  `window.NCTDesignSystem_7648d8`; `toNamespace` drops the underscore, so the bundle
  publishes `NCTDesignSystem7648d8`. The alias module (wired via `extraEntries`,
  path `../../../.design-sync/global-alias.mjs` — relative to `PKG_DIR`, which is
  `node_modules/@nct/slides`) defines a lazy getter for the old name. Verified in
  headless chromium: `window.NCTDesignSystem_7648d8 === window.NCTDesignSystem7648d8`,
  121 exports. It lives outside `web/` because that package declares
  `sideEffects: ["*.css"]`, which lets the bundler drop a side-effect-only module;
  the IIFE-initialised export survives regardless. Delete it and 26 slide pages, 3
  templates and 52 cards resolve `undefined`.
- **Their `Icon` took a string, ours takes the component.** `readme.md` and
  `components/icons/Icon.prompt.md` in the project document
  `<Icon icon="Truck" />`; the real library is `<Icon icon={Truck} />` with the glyph
  imported. Our bundle is now the one that runs, so any string-name usage in
  `slides/` or `templates/` renders nothing. Not fixed this run — it is their
  content, and fixing it means editing files this sync did not create.
- **Two component trees now coexist**: theirs at `components/<group>/<Name>.jsx`
  (14 primitives, one `card.html` per group) and ours at
  `components/<group>/<Name>/<Name>.*` (34, one card each). Groups `brand` and
  `diagram` hold both. Nothing collides on a path, but the DS pane shows both sets
  of cards. Deleting theirs is a separate decision, and their `card.html` files are
  what the "Components" group cards point at.
