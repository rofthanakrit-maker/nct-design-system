import { SlideComposition } from "@nct/slides";

/** 22 · one bar: a budget by category. The breakdown above it carries the
    values; the tail is folded into "อื่น ๆ" and drawn cat-mute. */
export const Budget = () => (
  <SlideComposition
    brand="corp"
    title="ครึ่งหนึ่งของงบ 4.8 ล้านบาท คือค่าพัฒนาระบบ"
    total="4.8 ล้านบาท"
    totalLabel="งบโครงการรวมทั้งสิ้น"
    intro="รวมภาษีมูลค่าเพิ่ม · สัญญา 12 เดือน ไม่รวมค่าบริการรายเดือนหลังปีแรก"
    segments={["พัฒนาและตั้งค่าระบบ", "ไลเซนส์ซอฟต์แวร์", "คลาวด์ปีแรก", "อื่น ๆ"]}
    other
    bars={[{ label: "งบโครงการ", values: [2.4, 1.2, 0.7, 0.5] }]}
    unit="ล้านบาท"
    source="ใบเสนอราคา NCT-2569-041 · ปัดเป็นแสนบาท"
    takeaway="ไลเซนส์กับคลาวด์รวมกันไม่ถึง 40% งบส่วนใหญ่จ่ายให้งานที่ทำครั้งเดียว"
    date="Updated date: 2026.10.01"
    pageNumber={14}
  />
);

/** Three packages in `amount` mode: bar length is the first-year total, the
    breakdown is only the legend, and the recommended package carries the cap. */
export const Packages = () => (
  <SlideComposition
    title="Business ปีแรก 0.81 ล้านบาท เกือบครึ่งเป็นค่าบริการรายเดือน"
    total="0.81 ล้านบาท"
    totalLabel="ค่าใช้จ่ายปีแรก แพ็กเกจ Business"
    intro="ไม่รวมภาษีมูลค่าเพิ่ม · ค่าบริการคิด 12 เดือนตามตารางแพ็กเกจ"
    segments={["ค่าติดตั้ง", "ค่าบริการ 12 เดือน", "ไลเซนส์"]}
    bars={[
      { label: "Essential", values: [0.15, 0.22, 0.12] },
      { label: "Business", values: [0.25, 0.38, 0.18], recommended: true },
      { label: "Enterprise", values: [0.4, 0.78, 0.3] },
    ]}
    mode="amount"
    unit="ล้านบาท"
    source="ตัวเลขเต็มรายแพ็กเกจ: ภาคผนวก ก"
    takeaway="Business จ่ายเพิ่มจาก Essential 3.2 แสนบาท ได้ SLA เร็วขึ้นเท่าตัว"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={14}
  />
);
