import { NctLogo } from "@nct/slides";

/* The full lockup — mark plus wordmark. `width` is px on the 1280×720 canvas;
   the height follows the lockup ratio, so never set both. */

/** The colour lockup on paper, at the cover size and at the footer size. */
export const OnPaper = () => (
  <div style={{ background: "var(--nct-paper)", padding: 32, display: "grid", gap: 28, justifyItems: "start" }}>
    <NctLogo width={269} />
    <NctLogo width={140} />
  </div>
);

/** `variant="white"` is the knockout lockup — the only version that survives a
    dark ground. The colour one on navy loses the wordmark. */
export const OnDark = () => (
  <div style={{ background: "var(--nct-dark)", padding: 32, display: "grid", gap: 28, justifyItems: "start" }}>
    <NctLogo variant="white" width={269} />
    <NctLogo variant="white" width={140} />
  </div>
);
