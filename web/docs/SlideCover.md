---
category: Layouts
---

01 · Title Slide. The deck's cover — use once. The composition follows `brand`.

`corp` (the default): paper ground, the mark watermarked behind it, the lockup
centred and large, and the title centred under a rule. It is the page the
company actually opens a bid with. It drops the corp foot bar, because the
source draws none on the one page whose job is to be quiet. `date` renders
bottom-left, where the source puts its "Updated date" line — pass the whole
string; the layout does not build it.

`web`: a Swiss split. Paper on the left carries the lockup, a left-set title,
the 0.6in teal rule and the subtitle; the right 40% (the photo band's slot) is
the navy→teal gradient with the corp cover's scatter column in white on it. The
web closing (layout 10) mirrors it. Only `date` shows in the foot, bottom-left.
Keep the title to three lines and the subtitle to one.

The navy→teal gradient that used to be the house cover is
`SlideCoverGradient`, layout 20, in both brands. A cover is a composition, not
a dress, which is why the two are separate layouts rather than one with a flag.
