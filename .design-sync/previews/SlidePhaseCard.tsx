import { BulletList, SlidePhaseCard } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 17 · a stage of the implementation plan: the activity/participant pair on
    top, then the outlined canvas tabbed with the phase number. */
export const PreparationPhase = () => (
  <SlidePhaseCard
    brand="corp"
    title={en("5. Implementation Stage")}
    meta={[
      { label: en("Key Activity"), value: "ตั้งค่าสภาพแวดล้อม ติดตั้งฮาร์ดแวร์และซอฟต์แวร์" },
      { label: en("Participant"), value: <>{en("NCT Infra Engineer")}, ทีมไอทีลูกค้า, {en("Business Analyst")}</> },
    ]}
    number="01"
    phase={en("Preparation Phase")}
    intro="สรุปสเปกเครื่องและบริการคลาวด์ที่ต้องเตรียมให้พร้อมก่อนเริ่มงานพัฒนา"
    date="Updated date: 2026.09.07"
    pageNumber={4}
  >
    <div className="nct-cols">
      <div>
        <h3 className="nct-densehead">เครื่องและระบบปฏิบัติการ</h3>
        <BulletList
          dense
          items={[
            { text: <>{en("PRD")} · 4 คอร์ / 16GB / {en("SSD")} 300GB</> },
            { text: <>{en("QA")} · 4 คอร์ / 16GB / {en("SSD")} 150GB</> },
            { text: <>{en("Windows Server 2022")} ทั้งสองเครื่อง</> },
          ]}
        />
      </div>
      <div>
        <h3 className="nct-densehead">บริการคลาวด์ที่ต้องเปิด</h3>
        <BulletList
          dense
          items={[
            { text: <>{en("Lambda")} · {en("PRD")} และ {en("QA")}</> },
            { text: <>{en("EC2")} · แยกกลุ่มความปลอดภัยแอปกับฐานข้อมูล</> },
            { text: <>{en("Cognito")} · เข้าสู่ระบบด้วยบัญชีองค์กร</> },
          ]}
        />
      </div>
    </div>
  </SlidePhaseCard>
);

/** A single-number phase in the house brand, with no meta pair — the layout
    renders in either mode even though the source deck is corp. */
export const MergedPhaseHouse = () => (
  <SlidePhaseCard
    title="แผนงานรอบที่ 2"
    number="03"
    phase="พัฒนาและทดสอบ"
    intro="สองเฟสที่เดินคู่กัน ปิดด้วย UAT ครั้งเดียว"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={19}
  >
    <BulletList
      dense
      items={[
        { text: "พัฒนาตามเอกสาร SRS ที่ลงนามแล้ว" },
        { text: "ทดสอบภายในก่อนส่ง UAT หนึ่งรอบ" },
        { text: "ปิดข้อบกพร่องที่พบภายในรอบเดียวกัน" },
      ]}
    />
  </SlidePhaseCard>
);
