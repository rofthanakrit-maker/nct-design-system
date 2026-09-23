import { SlideContent } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 03 · the workhorse: five level-1 lines is the ceiling, level 2 indents under
    the line it qualifies. */
export const House = () => (
  <SlideContent
    brand="web"
    title="ขอบเขตบริการของ NCT"
    items={[
      "วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
      { text: "ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", level: 2 },
      "ดูแลระบบต่อเนื่องแบบ Managed Service",
      { text: "มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", level: 2 },
      "ให้คำปรึกษาการย้ายระบบขึ้นคลาวด์",
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={14}
  />
);

/** The same slide wearing the corp chrome — not one line of content changed. */
export const Corp = () => (
  <SlideContent
    brand="corp"
    title={en("5. Implementation Stage")}
    items={[
      "แบ่งงานเป็นสองส่วน คือการบริหารโครงการและการส่งมอบระบบ",
      { text: "การบริหารโครงการดูแลขอบเขต เวลา และค่าใช้จ่าย", level: 2 },
      { text: "การส่งมอบระบบครอบคลุมวิเคราะห์ ออกแบบ พัฒนา ทดสอบ และขึ้นระบบ", level: 2 },
      "ทุกเฟสปิดด้วยเอกสารส่งมอบและการลงนามรับ",
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={2}
  />
);
