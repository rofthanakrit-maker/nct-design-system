import { CategoryKey, DataTable, Slide, SlideTitle } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** The decoder for `--nct-cat-*`: it belongs on the note line of the slide that
    uses the coding, never on a slide of its own. Three categories in use here. */
export const WithCodedTable = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={11}>
    <SlideTitle>ขอบเขตงานรายกระบวนการ</SlideTitle>
    <div className="nct-body">
      <DataTable
        widths={[0.6, 3.6, 1.4, 1.8]}
        columns={[{ label: "#", align: "center" }, "กระบวนการ", { label: "หมวด", align: "center" }, { label: "รอบที่ทำ", align: "center" }]}
        rows={[
          [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "รอบ 1", align: "center" }],
          [{ value: 2, category: 2 }, "ออกใบแจ้งหนี้ขาย", { value: en("AR"), align: "center", bold: true }, { value: "รอบ 1", align: "center" }],
          [{ value: 3, category: 3 }, "กระทบยอดธนาคาร", { value: en("GL"), align: "center", bold: true }, { value: "รอบ 2", align: "center" }],
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

/** All four slots, labelled in Thai — the ceiling of the coding. A fifth
    category is not a colour; it is a second slide. The key always sits on the
    slide the coding is used on, never on one of its own. */
export const AllFourSlots = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={12}>
    <SlideTitle>แผนงานแยกตามรอบส่งมอบ</SlideTitle>
    <div className="nct-body">
      <DataTable
        widths={[0.6, 4.2, 1.6, 1.6]}
        columns={[{ label: "#", align: "center" }, "งาน", { label: "รอบ", align: "center" }, { label: "สถานะ", align: "center" }]}
        rows={[
          [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: "รอบ 1", align: "center" }, { value: "พร้อม", status: "ok" }],
          [{ value: 2, category: 2 }, "ติดตามลูกหนี้ค้างชำระ", { value: "รอบ 2", align: "center" }, { value: "รอยืนยัน", status: "warn" }],
          [{ value: 3, category: 3 }, "ปรับปรุงบัญชีสิ้นเดือน", { value: "รอบ 3", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }],
          [{ value: 4, category: 4 }, "ย้ายข้อมูลเก่าเข้าคลัง", { value: "นอกขอบเขต", align: "center" }, { value: "ยังไม่เริ่ม", align: "center" }],
        ]}
      />
      <div className="nct-note">
        <CategoryKey
          items={[
            { category: 1, label: "งานรอบแรก" },
            { category: 2, label: "งานรอบสอง" },
            { category: 3, label: "งานรอบสาม" },
            { category: 4, label: "นอกขอบเขต" },
          ]}
        />
      </div>
    </div>
  </Slide>
);
