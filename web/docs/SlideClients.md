---
category: Layouts
---

26 · Client References. Four, eight or twelve clients in whole rows of four,
each a tile with the logo (or, when the logo is not cleared for use, the `name`
set as a wordmark) over a one-line `caption` — sector · what was delivered. The
caption is required in practice: a logo alone proves nothing. Pass `logo` only
with the client's permission and never draw a real company's mark. `intro` says
how the tiles were picked out of how many; `note` points at the full list.

`clients` reads as `unknown` in the extracted `.d.ts` (the 4 / 8 / 12 tuple does
not survive): it is an array of `{ name: string; logo?: string; caption?: ReactNode }`,
in whole rows of four — see "Client references 26" in the prop-types guideline.
