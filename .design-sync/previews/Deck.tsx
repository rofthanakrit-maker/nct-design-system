import { Deck, SlideContent, SlideCover } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** Deck owns the chrome: `footer` and `date` set once reach every slide, and
    page numbers are counted from position — nothing types a number by hand.
    The cover passes `hideFooter` of its own, and a slide prop still wins. */
export const HouseDeck = () => (
  <Deck footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569">
    <SlideCover
      hideFooter
      title="ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"
      subtitle={<>{en("New Computer Technology Consulting Co., Ltd.")} · 2569</>}
    />
    <SlideContent
      title="ขอบเขตบริการของ NCT"
      items={[
        "วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
        { text: "ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", level: 2 },
        "ดูแลระบบต่อเนื่องแบบ Managed Service",
      ]}
    />
  </Deck>
);

/** `brand="corp"` on the Deck — every slide inherits the mandatory chrome, and
    the page count restarts from this deck's own first slide. */
export const CorpDeck = () => (
  <Deck brand="corp" date="Updated date: 2026.09.07">
    <SlideCover
      title={
        <>
          <span>{en("PROPOSAL")}</span>
          <span>{en("For")}</span>
          <span>{en("“AGE — Finance and Accounting”")}</span>
        </>
      }
    />
    <SlideContent
      title={en("5. Implementation Stage")}
      items={[
        "แบ่งงานเป็นสองส่วน คือการบริหารโครงการและการส่งมอบระบบ",
        { text: "ทุกเฟสปิดด้วยเอกสารส่งมอบและการลงนามรับ", level: 2 },
      ]}
    />
  </Deck>
);
