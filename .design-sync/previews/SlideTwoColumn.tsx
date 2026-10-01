import { SlideTwoColumn } from "@nct/slides";

/** 04 · before/after. Left is always the current state — never swap the sides. */
export const BeforeAfter = () => (
  <SlideTwoColumn
    title="ก่อนและหลังใช้บริการ"
    leftKicker="ก่อน"
    left={["ระบบล่มบ่อย ไม่มีคนดูแลประจำ", "ค่าใช้จ่ายไม่แน่นอน"]}
    rightKicker="หลัง"
    right={["มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", "ค่าใช้จ่ายคงที่ต่อเดือน"]}
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
    leftKicker="ข้อดี"
    left={["ขยายกำลังเครื่องได้ตามปริมาณงานจริง", "ไม่ต้องลงทุนฮาร์ดแวร์ล่วงหน้า"]}
    rightKicker="ข้อจำกัด"
    right={["ต้องวางสิทธิ์เข้าถึงใหม่ทั้งระบบ", "ค่าบริการผูกกับปริมาณการใช้งาน"]}
    date="Updated date: 2026.09.07"
    pageNumber={5}
  />
);
