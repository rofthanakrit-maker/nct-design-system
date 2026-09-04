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
  gitignored `demo/demo.js` (`demo:watch` rebuilds on save); serve `web/` and open
  `/demo/index.html`. A token edit shows up after `npm run tokens` + refresh —
  `index.html` links `../src/styles.css` directly, so no package build is needed.
