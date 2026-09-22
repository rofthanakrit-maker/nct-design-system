import { SlideTwoColumn } from "@nct/slides";

/** 04 · before/after. Left is always the current state — never swap the sides. */
export const BeforeAfter = () => (
  <SlideTwoColumn
    title="ก่อนและหลังใช้บริการ"
    left={[
      "ก่อน",
      { text: "ระบบล่มบ่อย ไม่มีคนดูแลประจำ", level: 2 },
      { text: "ค่าใช้จ่ายไม่แน่นอน", level: 2 },
    ]}
    right={[
      "หลัง",
      { text: "มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", level: 2 },
      { text: "ค่าใช้จ่ายคงที่ต่อเดือน", level: 2 },
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={6}
  />
);

/** The same grid used for pros/cons under the corp chrome. */
export const Corp = () => (
  <SlideTwoColumn
    brand="corp"
    title="ข้อดีและข้อจำกัดของการย้ายขึ้นคลาวด์"
    left={[
      "ข้อดี",
      { text: "ขยายกำลังเครื่องได้ตามปริมาณงานจริง", level: 2 },
      { text: "ไม่ต้องลงทุนฮาร์ดแวร์ล่วงหน้า", level: 2 },
    ]}
    right={[
      "ข้อจำกัด",
      { text: "ต้องวางสิทธิ์เข้าถึงใหม่ทั้งระบบ", level: 2 },
      { text: "ค่าบริการผูกกับปริมาณการใช้งาน", level: 2 },
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={5}
  />
);
