import { SlideCover } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 01 in the house brand: paper ground, the mark watermarked behind the lockup,
    title centred under the rule. `hideFooter` — a cover is not page 1 of anything. */
export const House = () => (
  <SlideCover
    brand="web"
    hideFooter
    title="ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"
    subtitle={<>{en("New Computer Technology Consulting Co., Ltd.")} · 2569</>}
  />
);

/** The same composition under corp: only the accent and the chrome move. The
    three-line title is how the source template sets a proposal cover. */
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
