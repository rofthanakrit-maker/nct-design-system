import { SlideAgenda, photoTower } from "@nct/slides";

/** 15 · layout 02 with a contents list — six lines, the documented ceiling. */
export const SixItems = () => (
  <SlideAgenda
    image={photoTower}
    imageAlt="อาคารสำนักงานมองจากด้านล่าง"
    number="00"
    title="หัวข้อนำเสนอ"
    items={[
      "บริบทและปัญหาที่พบ",
      "ผลลัพธ์ที่ข้อเสนอนี้ให้",
      "วิธีการทำงานและสถาปัตยกรรม",
      "ขอบเขตงานรายกระบวนการ",
      "ทีมงานและประสบการณ์",
      "แพ็กเกจและงบประมาณ",
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={2}
  />
);

/** Four items and no photograph — the teal wedge stands in, corp chrome. */
export const FourItemsCorp = () => (
  <SlideAgenda
    brand="corp"
    number="00"
    title="หัวข้อในเอกสารฉบับนี้"
    items={[
      "ขอบเขตการส่งมอบรายเฟส",
      "แผนการขึ้นระบบและการอบรม",
      "เงื่อนไขการรับประกัน",
      "งบประมาณและการชำระเงิน",
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={3}
  />
);
