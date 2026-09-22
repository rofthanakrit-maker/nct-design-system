import { SlideChart } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 19 · emphasis, not six colours: one column in cat-1, the rest mute, and the
    figure is the number the chart proves. The title writes the conclusion. */
export const ColumnHighlight = () => (
  <SlideChart
    title="ปิดงบ พ.ค. ใช้ 9 วัน นานสุดในรอบครึ่งปี"
    chart={{
      kind: "column",
      unit: "วันทำการ",
      categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
      series: { name: "เวลาปิดงบ", values: [6, 7, 6, 8, 9, 7] },
      highlight: 4,
    }}
    figure={{ value: "9 วัน", label: "เวลาปิดงบ พ.ค. 2569 · เป้าหมาย 2 วัน" }}
    insights={[
      "เดือนที่เอกสารเข้ามากสุด คือเดือนที่ปิดงบนานสุด",
      "ทุกเดือนเกินเป้าอย่างน้อยสามเท่า",
      "ความล่าช้าเกิดที่ขั้นกระทบยอด ไม่ใช่ขั้นคีย์",
    ]}
    source="ระบบบัญชีของลูกค้า · ม.ค.–มิ.ย. 2569"
    takeaway="เวลาปิดงบแปรตามปริมาณเอกสาร การลดงานคีย์ซ้ำจึงลดเวลาปิดงบได้จริง"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={7}
  />
);

/** Two lines, one highlighted — the trend form. Four lines is the ceiling. */
export const LineTrend = () => (
  <SlideChart
    brand="corp"
    title="เอกสารเข้าโตเร็วกว่ากำลังคนที่คีย์ได้"
    chart={{
      kind: "line",
      unit: "ใบต่อเดือน",
      categories: ["2565", "2566", "2567", "2568", "2569"],
      series: [
        { name: "เอกสารเข้า", values: [620, 780, 910, 1080, 1200] },
        { name: "กำลังคีย์ต่อเดือน", values: [700, 760, 800, 820, 840] },
      ],
      highlight: 0,
    }}
    figure={{ value: "1,200 ใบ", label: "ปริมาณเอกสารต่อเดือน ปี 2569" }}
    insights={[
      "เอกสารโตเฉลี่ยปีละ 18% กำลังคีย์โตปีละ 5%",
      "สองเส้นตัดกันในปี 2567 และถ่างขึ้นทุกปีตั้งแต่นั้น",
    ]}
    source={<>ระบบจัดเก็บเอกสารของลูกค้า · {en("2022–2026")}</>}
    takeaway="ช่องว่างนี้ปิดด้วยการจ้างเพิ่มไม่ได้ในอัตรานี้ — ต้องลดงานคีย์ต่อใบแทน"
    date="Updated date: 2026.09.07"
    pageNumber={6}
  />
);

/** Part-to-whole over periods: series stack from the baseline in slot order,
    with the tail folded into a `"mute"` slot. */
export const StackedMix = () => (
  <SlideChart
    title="สัดส่วนเอกสารที่เข้าระบบอัตโนมัติเพิ่มขึ้นทุกไตรมาส"
    chart={{
      kind: "stacked",
      unit: "ใบต่อเดือน",
      categories: ["Q1", "Q2", "Q3", "Q4"],
      series: [
        { name: "อัตโนมัติเต็มรูป", values: [120, 340, 620, 880] },
        { name: "กึ่งอัตโนมัติ", values: [300, 380, 320, 200] },
        { name: "คีย์มือ", values: [780, 480, 260, 120], slot: "mute" },
      ],
    }}
    figure={{ value: "73%", label: "สัดส่วนเอกสารอัตโนมัติเต็มรูป ณ Q4" }}
    insights={[
      "งานคีย์มือลดลงหกเท่าภายในสี่ไตรมาส",
      "ปริมาณรวมต่อเดือนไม่ลด — สิ่งที่ลดคือแรงคนต่อใบ",
    ]}
    source="รายงานคิวเอกสารกลาง · ปีแรกหลังขึ้นระบบ"
    takeaway="ผลมาจากการย้ายงานไปอัตโนมัติ ไม่ใช่เอกสารเข้าน้อยลง"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={8}
  />
);
