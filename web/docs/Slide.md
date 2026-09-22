---
category: Deck frame
---

The slide canvas: a fixed 1280×720 box (13.333in × 7.5in at 96dpi — the same
geometry as `NCT-Slide-Template.potx`) plus the footer chrome every layout
repeats. Layout components render inside it; use it directly only when you
need a one-off slide none of the 19 layouts covers.

It is a `group` announced as "slide", named by its page number when it has
one, so a screen reader can move slide by slide instead of heading by heading.
