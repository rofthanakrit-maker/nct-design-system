import { SlideTwoColumn } from "@nct/slides";

/** 04 · two equal sets: what the bid covers and what it leaves out. Before/after is layout 11. */
export const InOutOfScope = () => (
  <SlideTwoColumn
    brand="web"
    title="ข้อเสนอนี้ครอบคลุมงานบัญชีสามหมวด ไม่รวมเงินเดือน"
    leftKicker="รวมในข้อเสนอ"
    left={[
      "เจ้าหนี้ ลูกหนี้ และบัญชีแยกประเภท",
      "ตัวเชื่อม ERP เดิม และคิวเอกสารกลาง",
      "อบรมผู้ใช้และผู้ดูแลระบบ 2 หลักสูตร",
    ]}
    rightKicker="ไม่รวมในข้อเสนอ"
    right={[
      "ระบบเงินเดือนและภาษีหัก ณ ที่จ่ายพนักงาน",
      "ย้ายข้อมูลย้อนหลังเกิน 2 ปี",
      "ค่าไลเซนส์ ERP ที่ลูกค้ามีอยู่แล้ว",
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={6}
  />
);

/** The same grid for two options of equal weight, under the corp chrome. */
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
