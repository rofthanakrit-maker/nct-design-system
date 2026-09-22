import { SlideTable } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 09 · the money slide: packages compared, the investment as its own bold row,
    and `recommended` on the column the takeaway argues for. */
export const Packages = () => (
  <SlideTable
    title="แพ็กเกจและงบประมาณ"
    intro="เลือกระดับบริการให้ตรงกับขนาดองค์กร ราคาไม่รวมภาษีมูลค่าเพิ่ม"
    recommended={2}
    takeaway="องค์กร 50–200 ที่นั่งเลือก Business เป็นค่าเริ่มต้น ตอบกลับ 4 ชั่วโมงครอบคลุมงานปิดงบรายเดือน"
    widths={[3, 2, 2, 2]}
    columns={[
      "",
      { label: en("Essential"), align: "center" },
      { label: en("Business"), align: "center" },
      { label: en("Enterprise"), align: "center" },
    ]}
    rows={[
      [{ value: "ชั่วโมงซัพพอร์ต", bold: true }, { value: "จันทร์–ศุกร์ 9–18", align: "center" }, { value: "จันทร์–เสาร์ 8–20", align: "center" }, { value: "24/7", align: "center" }],
      [{ value: "เวลาตอบกลับ (SLA)", bold: true }, { value: "8 ชั่วโมง", align: "center" }, { value: "4 ชั่วโมง", align: "center" }, { value: "1 ชั่วโมง", align: "center" }],
      [{ value: "มอนิเตอร์ระบบ", bold: true }, { value: "รายวัน", align: "center" }, { value: "ต่อเนื่อง", align: "center" }, { value: "ต่อเนื่อง + แจ้งเตือน", align: "center" }],
      [{ value: "รายงานสุขภาพระบบ", bold: true }, { value: "ไตรมาส", align: "center" }, { value: "รายเดือน", align: "center" }, { value: "รายสัปดาห์", align: "center" }],
      [{ value: "ค่าบริการต่อเดือน", bold: true }, { value: "18,000 บาท", align: "center", bold: true }, { value: "32,000 บาท", align: "center", bold: true }, { value: "65,000 บาท", align: "center", bold: true }],
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={17}
  />
);

/** A four-row comparison with no recommended column, under the corp chrome —
    the takeaway still has to name the choice. */
export const Corp = () => (
  <SlideTable
    brand="corp"
    title={en("7. Service Level")}
    intro="เปรียบเทียบเงื่อนไขการรับประกันหลังขึ้นระบบ"
    takeaway="เลือกการรับประกัน 12 เดือน เพราะครอบคลุมรอบปิดงบสิ้นปีแรกเต็มรอบ"
    widths={[3, 2, 2]}
    columns={["", { label: "6 เดือน", align: "center" }, { label: "12 เดือน", align: "center" }]}
    rows={[
      [{ value: "แก้ข้อบกพร่องของระบบ", bold: true }, { value: "รวมอยู่แล้ว", align: "center" }, { value: "รวมอยู่แล้ว", align: "center" }],
      [{ value: "ปรับสูตรคำนวณตามประกาศใหม่", bold: true }, { value: "คิดค่าบริการ", align: "center" }, { value: "รวมอยู่แล้ว", align: "center" }],
      [{ value: "ครอบคลุมรอบปิดงบสิ้นปี", bold: true }, { value: "ไม่ครอบคลุม", align: "center" }, { value: "ครอบคลุม", align: "center" }],
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={11}
  />
);
