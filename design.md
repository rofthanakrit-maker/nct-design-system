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
  --color-risk:     #B3261E;  --color-risk-tint: #FBEAE8;
  --color-warn:     #965900;  --color-warn-tint: #FBF1E3;  /* darkened from #B26B00 — 3.8:1 failed AA on its own tint */
  --color-ok:       #1F7A54;  --color-ok-tint:   #E6F4EE;
}
```
- Status colors are data colors for tables/process flows only — never chrome, headings, or slide backgrounds. Max 3 statuses per slide.
- Category coding (FN/AP/AR/GL-style) reuses `--color-accent` / `--color-accent-2` / `TEAL_L #4E8FA8` / `DEEP #16324F` — no 5th hue exists in this system; beyond 4 categories, label instead of coloring.
- Dense type floor is **10pt** — never go lower; split content across slides instead.
- See `slide-design-system-v2.md` (in the slide-template project) for full layout specs 11–16 and the dense type scale.

