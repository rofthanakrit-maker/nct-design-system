import { SlideKpiTrend } from "@nct/slides";

/** 23 · three tiles, the first plotted: its cat-1 rule is the link to the line.
    The capacity line is a `target`; each delta names what it is compared with. */
export const Capacity = () => (
  <SlideKpiTrend
    brand="corp"
    title="เอกสารเกินกำลังคีย์ 1,200 ใบครั้งแรกเดือน พ.ค."
    tiles={[
      { label: "เอกสารเข้า มิ.ย.", value: "1,150 ใบ", delta: { text: "15% จาก ม.ค.", direction: "up", good: false } },
      { label: "เวลาคีย์ต่อใบ", value: "4 นาที", delta: { text: "0.5 นาที จากปีก่อน", direction: "down", good: true } },
      { label: "ชั่วโมงคีย์ต่อเดือน", value: "77 ชม.", delta: { text: "10 ชม. จาก ม.ค.", direction: "up", good: false } },
    ]}
    trend={{
      name: "เอกสารเข้า",
      categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
      values: [1000, 1100, 1000, 1200, 1350, 1150],
      unit: "ใบต่อเดือน",
      target: { value: 1200, label: "กำลังคีย์ 1,200 ใบ" },
    }}
    source="ระบบบัญชีของลูกค้า · ม.ค.–มิ.ย. 2569"
    takeaway="เดือนที่เกินกำลังคีย์คือเดือนที่ปิดงบนานสุด ต้องลดงานคีย์ ไม่ใช่เพิ่มคน"
    date="Updated date: 2026.10.01"
    pageNumber={5}
  />
);

/** Four tiles on the quarter grid with sparklines; the trend plots the second
    tile, so the second rule is the cat-1 one. A fall that is good gets ok. */
export const ServiceHealth = () => (
  <SlideKpiTrend
    title="เวลาตอบกลับลดลงทุกไตรมาส ตั้งแต่เปลี่ยนมาใช้ทีมนี้"
    tiles={[
      { label: "Uptime", value: "99.9%", delta: { text: "0.2 จุด จาก Q1", direction: "up", good: true }, spark: [99.5, 99.7, 99.7, 99.9] },
      { label: "เวลาตอบกลับเฉลี่ย", value: "38 นาที", delta: { text: "22 นาที จาก Q1", direction: "down", good: true }, spark: [60, 52, 45, 38] },
      { label: "เคสต่อเดือน", value: "42", delta: { text: "6 เคส จาก Q1", direction: "up", good: false }, spark: [36, 38, 41, 42] },
      { label: "แก้จบในครั้งแรก", value: "81%", delta: { text: "9 จุด จาก Q1", direction: "up", good: true }, spark: [72, 75, 79, 81] },
    ]}
    trend={{
      tile: 1,
      categories: ["Q1", "Q2", "Q3", "Q4"],
      values: [60, 52, 45, 38],
      unit: "นาที",
      target: { value: 30, label: "เป้า 30 นาที" },
    }}
    source="ระบบ ticket ของ NCT · ปี 2568"
    takeaway="เหลืออีก 8 นาทีถึงเป้า SLA โดยเคสต่อเดือนยังเพิ่มขึ้น"
    footer="NCT · รายงานบริการรายปี"
    date="2569"
    pageNumber={3}
  />
);
