---
category: Layouts
---

01 · Title Slide. The deck's cover — use once.

The corporate composition, in both brands: paper ground, the mark watermarked
behind it, the lockup centred and large, and the title centred under a rule.
It is the page the company actually opens a bid with, so it is the cover you
get by default. Only the accent moves with `brand` — the rule and the
decorative column read `--nct-accent`, house teal or `#006666`.

The navy→teal gradient that used to be the house cover is
`SlideCoverGradient`, layout 20. A cover is a composition, not a dress,
which is why the two are separate layouts rather than one with a flag.

It drops the corp foot bar, because the source draws none on the one page
whose job is to be quiet. `date` renders bottom-left, where the source puts
its "Updated date" line — pass the whole string; the layout does not build it.
