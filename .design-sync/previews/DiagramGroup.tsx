import { DiagramBox, DiagramGroup, DiagramLink, SlideDiagram } from "@nct/slides";

/* The tinted zone holding boxes that belong together. Flat fill, no outline —
   it is a region the flow passes through, not a box. */

/** One group inside a chain: the two boxes this project adds, named once. */
export const InAChain = () => (
  <SlideDiagram
    title="ภาพรวมสถาปัตยกรรมระบบ"
    legend="กล่องทึบ = ระบบที่มีอยู่ · กล่องมีสีหมวด = ส่วนที่เพิ่ม"
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

/** Two groups side by side — the boundary between what the client runs and
    what NCT runs, drawn once instead of repeated on every box. */
export const TwoZones = () => (
  <SlideDiagram
    brand="corp"
    title="ขอบเขตความรับผิดชอบของแต่ละฝ่าย"
    takeaway="เส้นแบ่งความรับผิดชอบอยู่ที่คิวเอกสารกลาง ไม่ใช่ที่ระบบบัญชี"
    date="Updated date: 2026.09.07"
    pageNumber={13}
  >
    <div className="nct-dia-row">
      <DiagramGroup label="ฝั่งลูกค้า">
        <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
        <DiagramLink />
        <DiagramBox>ระบบบัญชี</DiagramBox>
      </DiagramGroup>
      <DiagramLink label="ส่งต่อ" />
      <DiagramGroup label="ฝั่ง NCT">
        <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
        <DiagramLink />
        <DiagramBox category={2}>ตัวตรวจกฎธุรกิจ</DiagramBox>
      </DiagramGroup>
    </div>
  </SlideDiagram>
);
