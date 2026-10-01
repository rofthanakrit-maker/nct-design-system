import { SlideBeforeAfter } from "@nct/slides";

/** 24 · one unit for every row, sorted largest change first by the layout.
    The change column is never hidden - it is what makes the pale before-dot legal. */
export const HoursSaved = () => (
  <SlideBeforeAfter
    brand="corp"
    title="ลูกค้ารายเดิมลดงานบัญชีจาก 114 เหลือ 31 ชั่วโมงต่อเดือน"
    rows={[
      { label: "ปิดงบสิ้นเดือน", before: 48, after: 16 },
      { label: "คีย์ใบแจ้งหนี้ซื้อ", before: 28, after: 3 },
      { label: "กระทบยอดธนาคาร", before: 16, after: 2 },
      { label: "ออกใบแจ้งหนี้ขาย", before: 12, after: 4 },
      { label: "ติดตามลูกหนี้", before: 10, after: 6 },
    ]}
    unit="ชม."
    better="lower"
    intro="ชั่วโมงทำงานต่อเดือน · น้อยกว่าดีกว่า"
    source="ลูกค้าธุรกิจค้าปลีก ปี 2568 · วัดก่อนขึ้นระบบและหลังขึ้นระบบ 3 เดือน"
    takeaway="ปิดงบลดได้มากสุด ไม่ใช่งานคีย์ เพราะระบบกระทบยอดให้ทุกวัน"
    date="Updated date: 2026.10.01"
    pageNumber={12}
  />
);

/** Higher is better: a score that rose. Seven rows is the ceiling. */
export const Scores = () => (
  <SlideBeforeAfter
    title="คะแนนความพึงพอใจขึ้นทุกด้านหลังย้ายมาใช้ทีมนี้"
    rows={[
      { label: "ความเร็วในการตอบ", before: 62, after: 88 },
      { label: "แก้จบในครั้งแรก", before: 58, after: 81 },
      { label: "ความชัดเจนของรายงาน", before: 70, after: 86 },
      { label: "ความรู้ของทีม", before: 75, after: 87 },
      { label: "การแจ้งล่วงหน้า", before: 66, after: 77 },
      { label: "ช่องทางติดต่อ", before: 80, after: 85 },
      { label: "ภาพรวม", before: 72, after: 84 },
    ]}
    unit="คะแนน"
    better="higher"
    intro="คะแนนเต็ม 100 · มากกว่าดีกว่า"
    source="แบบสำรวจลูกค้า 48 ราย · ม.ค. 2568 เทียบ ม.ค. 2569"
    takeaway="ด้านที่ขึ้นมากสุดคือความเร็ว ตรงกับเวลาตอบกลับที่ลดลงทุกไตรมาส"
    footer="NCT · รายงานบริการรายปี"
    date="2569"
    pageNumber={4}
  />
);
