import { DiagramBox, DiagramGroup, DiagramLink, SlideDiagram } from "@nct/slides";

/* The connector between two boxes: straight, teal, solid triangle head. Its
   label is real HTML at the dense step, not SVG text, so it holds the 10pt
   floor the rest of the system holds. */

/** Bare and labelled links in the same chain — label only where the step needs
    naming, otherwise the arrow says enough. */
export const BareAndLabelled = () => (
  <SlideDiagram
    title="เส้นเชื่อมแบบมีป้ายและไม่มีป้าย"
    takeaway="ใส่ป้ายเฉพาะเส้นที่ต้องอธิบายเงื่อนไข เส้นที่เหลือปล่อยให้หัวลูกศรพูดแทน"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={10}
  >
    <div className="nct-dia-row">
      <DiagramBox>สแกนเอกสาร</DiagramBox>
      <DiagramLink />
      <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
      <DiagramLink label="ผ่านกฎธุรกิจ" />
      <DiagramBox category={2}>ระบบบัญชี</DiagramBox>
    </div>
  </SlideDiagram>
);

/** A link crossing into a group — the flow passes through the tinted zone
    rather than stopping at its edge. */
export const IntoAGroup = () => (
  <SlideDiagram
    title="เส้นที่วิ่งเข้าโซน"
    takeaway="โซนเป็นพื้นที่ ไม่ใช่กล่อง เส้นจึงวิ่งผ่านเข้าไปหากล่องข้างในโดยตรง"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={12}
  >
    <div className="nct-dia-row">
      <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
      <DiagramLink />
      <DiagramGroup label="ส่วนที่เพิ่มใหม่">
        <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
        <DiagramLink label="ผ่านกฎธุรกิจ" />
        <DiagramBox category={2}>ตัวตรวจกฎธุรกิจ</DiagramBox>
      </DiagramGroup>
    </div>
  </SlideDiagram>
);
