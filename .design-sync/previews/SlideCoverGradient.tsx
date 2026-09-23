import { SlideCoverGradient } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 20 · the loud cover: navy→teal read left, bookending the closing gradient.
    A deck ships one cover — this is the one that fronts a talk, not a bid. */
export const House = () => (
  <SlideCoverGradient
    brand="web"
    hideFooter
    title="เปลี่ยนงานบัญชีให้ระบบทำแทน"
    subtitle={<>{en("NCT")} · สัมมนาลูกค้า 2569</>}
  />
);

/** Under corp the gradient stays navy→teal — it is a house bookend in either
    brand, and only the chrome follows. */
export const Corp = () => (
  <SlideCoverGradient
    brand="corp"
    hideFooter
    title={en("Finance & Accounting Automation")}
    subtitle={<>{en("NCT")} · {en("Client briefing 2026")}</>}
  />
);
