import { NctMark } from "@nct/slides";

/* The diamond on its own — the corner signature every slide carries. The
   layouts place it themselves; reach for it directly only outside a slide. */

/** The colour mark on paper, at the footer size and larger. */
export const OnPaper = () => (
  <div style={{ background: "var(--nct-paper)", padding: 32, display: "flex", gap: 32, alignItems: "center" }}>
    <NctMark width={29} />
    <NctMark width={56} />
    <NctMark width={96} />
  </div>
);

/** The knockout mark for dark grounds — section dividers and the closing. */
export const OnDark = () => (
  <div style={{ background: "var(--nct-dark)", padding: 32, display: "flex", gap: 32, alignItems: "center" }}>
    <NctMark variant="white" width={29} />
    <NctMark variant="white" width={56} />
    <NctMark variant="white" width={96} />
  </div>
);
