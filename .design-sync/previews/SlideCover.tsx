import { SlideCover } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 01 in the house brand: the Swiss split — paper left with the lockup and a
    left-set title, the gradient panel right. `hideFooter` — a cover is not page 1. */
export const House = () => (
  <SlideCover
    brand="web"
    hideFooter
    title="ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"
    subtitle={<>{en("New Computer Technology Consulting Co., Ltd.")} · 2569</>}
  />
);

/** The corp cover: centred and watermarked. The three-line title is how the
    source template sets a proposal cover. */
export const Corp = () => (
  <SlideCover
    brand="corp"
    title={
      <>
        <span>{en("PROPOSAL")}</span>
        <span>{en("For")}</span>
        <span>{en("“AGE — Finance and Accounting”")}</span>
      </>
    }
    date="Updated date: 2026.09.07"
  />
);
