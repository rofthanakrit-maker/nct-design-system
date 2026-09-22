import { CategoryKey, DataTable, Slide, SlideTitle } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** The comparison grid: `recommended` tints the column being argued for, and a
    bold row carries the price. */
export const Comparison = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={17}>
    <SlideTitle>แพ็กเกจและงบประมาณ</SlideTitle>
    <div className="nct-body">
      <DataTable
        recommended={2}
        widths={[3, 2, 2, 2]}
        columns={[
          "",
          { label: en("Essential"), align: "center" },
          { label: en("Business"), align: "center" },
          { label: en("Enterprise"), align: "center" },
        ]}
        rows={[
          [{ value: "เวลาตอบกลับ (SLA)", bold: true }, { value: "8 ชั่วโมง", align: "center" }, { value: "4 ชั่วโมง", align: "center" }, { value: "1 ชั่วโมง", align: "center" }],
          [{ value: "มอนิเตอร์ระบบ", bold: true }, { value: "รายวัน", align: "center" }, { value: "ต่อเนื่อง", align: "center" }, { value: "ต่อเนื่อง + แจ้งเตือน", align: "center" }],
          [{ value: "ค่าบริการต่อเดือน", bold: true }, { value: "18,000 บาท", align: "center", bold: true }, { value: "32,000 บาท", align: "center", bold: true }, { value: "65,000 บาท", align: "center", bold: true }],
        ]}
      />
    </div>
  </Slide>
);

/** Status cells and category chips: `ok` / `warn` / `risk` tint the cell, and
    `category` codes the row — with a CategoryKey beside it, never colour alone. */
export const StatusAndCategories = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={11}>
    <SlideTitle>ความพร้อมรายกระบวนการ</SlideTitle>
    <div className="nct-body">
      <DataTable
        widths={[0.6, 3.2, 1.3, 1.6, 1.6]}
        columns={[
          { label: "#", align: "center" },
          "กระบวนการ",
          { label: "หมวด", align: "center" },
          { label: "ปริมาณ/เดือน", align: "center" },
          { label: "ความพร้อม", align: "center" },
        ]}
        rows={[
          [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "420 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }],
          [{ value: 2, category: 2 }, "ติดตามลูกหนี้ค้างชำระ", { value: en("AR"), align: "center", bold: true }, { value: "150 ราย", align: "center" }, { value: "รอยืนยัน", status: "warn" }],
          [{ value: 3, category: 3 }, "รายงานภาษีซื้อ-ขาย", { value: en("GL"), align: "center", bold: true }, { value: "2 ชุด", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }],
        ]}
      />
      <div className="nct-note">
        <CategoryKey
          items={[
            { category: 1, label: en("AP · เจ้าหนี้") },
            { category: 2, label: en("AR · ลูกหนี้") },
            { category: 3, label: en("GL · บัญชีแยกประเภท") },
          ]}
        />
      </div>
    </div>
  </Slide>
);

/** `groupColumn` + `rowSpan` merge the left column into stage groups; a `null`
    cell is the slot a span covers. */
export const GroupedRows = () => (
  <Slide brand="corp" date="Updated date: 2026.09.07" pageNumber={8}>
    <SlideTitle>{en("Deliverables by stage")}</SlideTitle>
    <div className="nct-body">
      <DataTable
        groupColumn={0}
        widths={[2.2, 5.2, 1.4, 1.8]}
        columns={[
          { label: en("STAGE") },
          { label: en("DELIVERABLES") },
          { label: en("FORMAT"), align: "center" },
          { label: en("SIGN-OFF"), align: "center" },
        ]}
        rows={[
          [{ value: "2. วิเคราะห์และออกแบบ", rowSpan: 2 }, { value: en("Software Requirement Specification (SRS)") }, { value: en("Word"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
          [null, { value: en("Business Process Flow (BPF)") }, { value: en("Word"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
          [{ value: "4. ทดสอบ" }, { value: <>หลักฐานและผล {en("UAT")}</> }, { value: en("Excel"), align: "center" }, { value: "ต้องลงนาม", align: "center", status: "ok" }],
        ]}
      />
    </div>
  </Slide>
);
