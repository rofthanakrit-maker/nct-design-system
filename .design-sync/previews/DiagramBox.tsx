import { DiagramBox, DiagramLink, SlideDiagram } from "@nct/slides";

/* A box is only true on the diagram canvas, so every cell composes it there. */

/** Plain boxes are systems that already exist; a `category` box is something
    this project adds. Tone carries the whole distinction — no icons, no shadows. */
export const PlainAndAdded = () => (
  <SlideDiagram
    title="กล่องระบบเดิมและกล่องที่เพิ่มใหม่"
    subtitle="กล่องทึบคือระบบที่มีอยู่ กล่องมีสีหมวดคือส่วนที่โครงการนี้เพิ่ม"
    takeaway="ผู้อ่านแยกของเดิมกับของใหม่ได้จากน้ำหนักกล่อง ไม่ต้องอ่านคำอธิบายก่อน"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={10}
  >
    <div className="nct-dia-row">
      <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
      <DiagramLink />
      <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
    </div>
  </SlideDiagram>
);

/** The four category slots in one row — the ceiling of the coding. */
export const AllFourCategories = () => (
  <SlideDiagram
    title="สีหมวดทั้งสี่ของกล่องไดอะแกรม"
    takeaway="สี่สีคือเพดาน ถ้าต้องการมากกว่านั้นให้แยกสไลด์ ไม่ใช่เพิ่มสี"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={11}
  >
    <div className="nct-dia-row">
      <DiagramBox category={1}>รับเอกสาร</DiagramBox>
      <DiagramBox category={2}>ตรวจกฎธุรกิจ</DiagramBox>
      <DiagramBox category={3}>บันทึกบัญชี</DiagramBox>
      <DiagramBox category={4}>รายงานภาษี</DiagramBox>
    </div>
  </SlideDiagram>
);
