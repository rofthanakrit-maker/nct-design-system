import { DiagramBox, DiagramGroup, DiagramLink, SlideDiagram } from "@nct/slides";

/** 14 · the empty frame: the drawing is composed from the diagram kit. Boxes
    have square corners, links turn at right angles, nothing casts a shadow. */
export const Architecture = () => (
  <SlideDiagram
    title="ภาพรวมสถาปัตยกรรมระบบ"
    subtitle="ใช้ชุดชิ้นส่วนมาตรฐาน — กล่องมุมตรง เส้นหักมุมฉาก ไม่มีเงา"
    legend="กล่องทึบ = ระบบที่มีอยู่ · กล่องมีสีหมวด = ส่วนที่เพิ่ม · เส้นทึบ = ข้อมูลไหลอัตโนมัติ"
    takeaway="ระบบเดิมไม่ถูกแก้ ของใหม่แทรกเป็นคิวและตัวตรวจกฎคั่นกลางเท่านั้น"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={10}
  >
    <div className="nct-dia-row">
      <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
      <DiagramLink />
      <DiagramGroup label="ส่วนที่เพิ่มใหม่">
        <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
        <DiagramLink label="ผ่านกฎธุรกิจ" />
        <DiagramBox category={2}>ตัวตรวจกฎธุรกิจ</DiagramBox>
      </DiagramGroup>
      <DiagramLink />
      <DiagramBox>ระบบบัญชี</DiagramBox>
    </div>
  </SlideDiagram>
);

/** A shorter chain under the corp chrome — four boxes, one labelled link. */
export const Corp = () => (
  <SlideDiagram
    brand="corp"
    title="เส้นทางของเอกสารหนึ่งใบ"
    takeaway="เอกสารถูกอ่านครั้งเดียวที่ต้นทาง ปลายทางที่เหลือรับต่อจากคิวเดียวกัน"
    date="Updated date: 2026.09.07"
    pageNumber={13}
  >
    <div className="nct-dia-row">
      <DiagramBox>สแกนเอกสาร</DiagramBox>
      <DiagramLink label="อ่านฟิลด์" />
      <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
      <DiagramLink />
      <DiagramBox category={3}>ระบบบัญชี</DiagramBox>
    </div>
  </SlideDiagram>
);
