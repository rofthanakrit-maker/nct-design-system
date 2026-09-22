import { SlideProcessFlow } from "@nct/slides";

/** 13 · five steps on one axis with chevrons between, and the result band below.
    Five is the ceiling — a sixth step is 202px the body box does not have. */
export const FiveSteps = () => (
  <SlideProcessFlow
    title="กระบวนการที่เสนอ"
    subtitle="ห้าขั้นตอน ทำงานต่อเนื่องโดยไม่ต้องคีย์ซ้ำ"
    steps={[
      { heading: "รับเอกสาร", body: "สแกนหรือรับไฟล์เข้าคิวกลาง" },
      { heading: "อ่านข้อมูล", body: "ดึงฟิลด์สำคัญ ตรวจกับต้นทาง" },
      { heading: "ตรวจสอบ", body: "กฎธุรกิจและวงเงินอนุมัติ" },
      { heading: "บันทึก", body: "ลงระบบบัญชีพร้อม audit trail" },
      { heading: "กระทบยอด", body: "จับคู่อัตโนมัติ ส่งรายงาน" },
    ]}
    result="เอกสารหนึ่งใบผ่านครบห้าขั้นโดยไม่มีการคีย์ซ้ำเลย"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={9}
  />
);

/** Three steps with a note line, corp chrome — the same axis, fewer stations. */
export const ThreeStepsCorp = () => (
  <SlideProcessFlow
    brand="corp"
    title="ขั้นตอนการส่งมอบแต่ละรอบ"
    subtitle="สามขั้น ปิดด้วยการลงนามรับทุกครั้ง"
    steps={[
      { heading: "ติดตั้งบน QA", body: "ทีมลูกค้าทดสอบตามสถานการณ์ที่ตกลง" },
      { heading: "แก้ตามผลทดสอบ", body: "ปิดข้อบกพร่องที่พบภายในรอบเดียว" },
      { heading: "ขึ้นระบบ PRD", body: "ลงนามรับ แล้วเริ่มนับรอบรับประกัน" },
    ]}
    resultLabel="ผลลัพธ์"
    result="ทุกรอบจบด้วยเอกสารลงนามรับหนึ่งฉบับ"
    note="รอบหนึ่งใช้เวลา 4 สัปดาห์โดยประมาณ"
    date="Updated date: 2026.09.07"
    pageNumber={8}
  />
);
