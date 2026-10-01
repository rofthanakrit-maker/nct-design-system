import { SlidePlan } from "@nct/slides";

/** 21 · the whole plan, counted from signing. Go-live is the one bar in cat-1
    because it is what the takeaway is about; each sign-off is a diamond. */
export const Proposal = () => (
  <SlidePlan
    title="แผนงาน 12 เดือน ขึ้นระบบต้นเดือนที่ 7"
    periods={["ด.1", "ด.2", "ด.3", "ด.4", "ด.5", "ด.6", "ด.7", "ด.8", "ด.9", "ด.10", "ด.11", "ด.12"]}
    rows={[
      { label: "เตรียมระบบ", start: 0, end: 1, duration: "4 สัปดาห์" },
      { label: "วิเคราะห์และออกแบบ", start: 1, end: 2.5, duration: "6 สัปดาห์",
        milestone: { at: 2.5, label: "ตรวจรับงวด 1" } },
      { label: "พัฒนาและตั้งค่าระบบ", start: 2.5, end: 5, duration: "10 สัปดาห์" },
      { label: "ทดสอบ UAT", start: 5, end: 6, duration: "4 สัปดาห์",
        milestone: { at: 6, label: "ตรวจรับงวด 2" } },
      { label: "อบรมผู้ใช้", start: 5.75, end: 6, duration: "1 สัปดาห์" },
      { label: "ขึ้นระบบ", start: 6, end: 6.5, duration: "2 สัปดาห์" },
      { label: "ดูแลหลังขึ้นระบบ", start: 6.5, end: 9.5, duration: "3 เดือน",
        milestone: { at: 9.5, label: "ตรวจรับงวด 3" } },
      { label: "รับประกันระบบ", start: 9.5, end: 12, duration: "2.5 เดือน" },
    ]}
    highlight={5}
    assumption="นับจากวันลงนามสัญญา · หน่วย: เดือน"
    takeaway="ขึ้นระบบต้นเดือนที่ 7 ตรวจรับ 3 งวดตามจุดส่งมอบ"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={15}
  />
);

/** Fewer rows and weeks as the unit, under the corp chrome. No highlight: every
    bar is cat-1 when no single phase is the story. */
export const Corp = () => (
  <SlidePlan
    brand="corp"
    title="ย้ายระบบขึ้นคลาวด์ใน 8 สัปดาห์"
    periods={["ส.1", "ส.2", "ส.3", "ส.4", "ส.5", "ส.6", "ส.7", "ส.8"]}
    rows={[
      { label: "สำรวจและวางแผน", start: 0, end: 2, duration: "2 สัปดาห์" },
      { label: "ย้ายข้อมูล", start: 2, end: 5, duration: "3 สัปดาห์" },
      { label: "ทดสอบคู่ขนาน", start: 4, end: 7, duration: "3 สัปดาห์",
        milestone: { at: 7, label: "ตรวจรับ" } },
      { label: "ปิดระบบเดิม", start: 7, end: 8, duration: "1 สัปดาห์" },
    ]}
    assumption="นับจากวันเปิดสิทธิ์เข้าระบบ"
    takeaway="ทดสอบคู่ขนานสามสัปดาห์ก่อนปิดระบบเดิม ไม่มีวันที่ระบบหยุด"
    date="Updated date: 2026.10.01"
    pageNumber={9}
  />
);
