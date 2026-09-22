import { SlideThreeCards } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 05 · three parallel points on the third grid. Cards are a fixed height —
    trim the copy, never stretch them. */
export const Pillars = () => (
  <SlideThreeCards
    title="สามเสาหลักของบริการ"
    cards={[
      { heading: en("Infrastructure"), body: "ออกแบบและติดตั้งเครือข่าย เซิร์ฟเวอร์ และระบบสำรองข้อมูล" },
      { heading: en("Managed Service"), body: "ดูแลระบบรายเดือน พร้อมทีมซัพพอร์ตและรายงานสุขภาพระบบ" },
      { heading: en("Cloud & Security"), body: "ย้ายระบบขึ้นคลาวด์ และวางมาตรการความปลอดภัยตามมาตรฐาน" },
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={15}
  />
);

/** Corp chrome, Thai headings — the card grid does not change between brands. */
export const Corp = () => (
  <SlideThreeCards
    brand="corp"
    title="สามรอบส่งมอบ"
    cards={[
      { heading: "รอบที่ 1", body: "หกกระบวนการที่พร้อมเริ่มทันที ส่งมอบภายใน 60 วัน" },
      { heading: "รอบที่ 2", body: "สองกระบวนการที่รอสิทธิ์เข้าระบบ เริ่มเมื่อได้รับสิทธิ์" },
      { heading: "รอบที่ 3", body: "งานปรับปรุงบัญชีและรายงานภาษี หลังปิดงบรอบแรก" },
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={6}
  />
);
