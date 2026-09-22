import { CategoryKey, SlideDenseTable } from "@nct/slides";

/** Latin script inside a Thai document — tagged so a screen reader switches voice. */
const en = (s: string) => <span lang="en">{s}</span>;

/** 16 at full stretch: eight rows, category chips, status cells, a legend and a
    footnote — the scope table the proposal is argued from. */
export const ScopeMatrix = () => (
  <SlideDenseTable
    title="ขอบเขตงานรายกระบวนการ"
    intro="แปดกระบวนการที่อยู่ในขอบเขต แบ่งตามหมวดและรอบส่งมอบ"
    legend={
      <CategoryKey
        items={[
          { category: 1, label: en("AP · เจ้าหนี้") },
          { category: 2, label: en("AR · ลูกหนี้") },
          { category: 3, label: en("GL · บัญชีแยกประเภท") },
        ]}
      />
    }
    takeaway="หกในแปดกระบวนการเริ่มได้ทันทีในรอบ 1–2 อีกสองรายการรอสิทธิ์เข้าระบบ ยืนยันภายใน 15 วัน"
    widths={[0.6, 3.2, 1.3, 1.6, 1.6, 1.4]}
    columns={[
      { label: "#", align: "center" },
      "กระบวนการ",
      { label: "หมวด", align: "center" },
      { label: "ปริมาณ/เดือน", align: "center" },
      { label: "ความพร้อม", align: "center" },
      { label: "รอบที่ทำ", align: "center" },
    ]}
    rows={[
      [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "420 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
      [{ value: 2, category: 1 }, "กระทบยอดใบสั่งซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "380 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
      [{ value: 3, category: 2 }, "ออกใบแจ้งหนี้ขาย", { value: en("AR"), align: "center", bold: true }, { value: "260 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
      [{ value: 4, category: 2 }, "ติดตามลูกหนี้ค้างชำระ", { value: en("AR"), align: "center", bold: true }, { value: "150 ราย", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
      [{ value: 5, category: 1 }, "บันทึกค่าใช้จ่ายพนักงาน", { value: en("AP"), align: "center", bold: true }, { value: "310 ใบ", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
      [{ value: 6, category: 3 }, "ปรับปรุงบัญชีสิ้นเดือน", { value: en("GL"), align: "center", bold: true }, { value: "45 รายการ", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
      [{ value: 7, category: 3 }, "กระทบยอดธนาคาร", { value: en("GL"), align: "center", bold: true }, { value: "12 บัญชี", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
      [{ value: 8, category: 3 }, "รายงานภาษีซื้อ-ขาย", { value: en("GL"), align: "center", bold: true }, { value: "2 ชุด", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
    ]}
    footnote="ปริมาณเป็นค่าเฉลี่ยจากข้อมูล 3 เดือนล่าสุด"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={11}
  />
);

/** The same layout as a deliverables matrix: `groupColumn` + `rowSpan` merge the
    stage column, and the corp chrome rides along. Null cells sit under a span. */
export const DeliverablesCorp = () => (
  <SlideDenseTable
    brand="corp"
    title={en("5. Implementation Stage")}
    intro="เอกสารส่งมอบรายเฟส และจุดที่ต้องลงนามรับก่อนเดินหน้าต่อ"
    groupColumn={0}
    widths={[2.2, 5.2, 1.4, 1.8]}
    columns={[
      { label: en("IMPLEMENTATION STAGE") },
      { label: en("DELIVERABLES") },
      { label: en("FORMAT"), align: "center" },
      { label: en("SIGN-OFF"), align: "center" },
    ]}
    rows={[
      [{ value: "1. เตรียมโครงการ" }, { value: "เอกสารเปิดโครงการ" }, { value: en("PDF"), align: "center" }, { value: "ไม่ต้องลงนาม", align: "center" }],
      [{ value: "2. วิเคราะห์และออกแบบ", rowSpan: 2 }, { value: en("Software Requirement Specification (SRS)") }, { value: en("Word"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
      [null, { value: en("Business Process Flow (BPF)") }, { value: en("Word"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
      [{ value: "3. พัฒนา", rowSpan: 2 }, { value: "ซอร์สโค้ดและไฟล์โซลูชัน" }, { value: en("Solution"), align: "center" }, { value: "ไม่ต้องลงนาม", align: "center" }],
      [null, { value: "พจนานุกรมข้อมูลและโครงสร้างตาราง" }, { value: en("Excel"), align: "center" }, { value: "ไม่ต้องลงนาม", align: "center" }],
      [{ value: "4. ทดสอบ" }, { value: <>สถานการณ์ทดสอบ หลักฐาน และผล {en("UAT")}</> }, { value: en("Excel"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
      [{ value: "5. ขึ้นระบบและรับประกัน" }, { value: "คู่มือผู้ใช้และผู้ดูแลระบบ" }, { value: en("Word"), align: "center" }, { value: "ไม่ต้องลงนาม", align: "center" }],
    ]}
    takeaway="สามจุดที่ต้องลงนามคือ SRS, BPF และผล UAT — ทั้งสามอยู่ก่อนวันขึ้นระบบ"
    date="Updated date: 2026.09.07"
    pageNumber={8}
  />
);
