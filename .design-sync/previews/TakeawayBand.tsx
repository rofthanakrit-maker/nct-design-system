import { BulletList, Slide, SlideTitle, TakeawayBand } from "@nct/slides";

/* The band is never a slide on its own — it is the conclusion strip under a
   layout's body box, so every cell renders it where it actually lives. */

/** Default tint band, flowing after the content it concludes. */
export const InFlow = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={5}>
    <SlideTitle>สภาพระบบบัญชีปัจจุบัน</SlideTitle>
    <div className="nct-body">
      <BulletList
        items={[
          "คีย์เอกสารซ้ำสามระบบ ไม่มีจุดตรวจกลาง",
          { text: "เอกสารเข้าเฉลี่ย 1,200 ใบต่อเดือน", level: 2 },
          "ปิดงบล่าช้าเฉลี่ย 6 วันทำการ",
        ]}
      />
      <TakeawayBand label="สรุป">
        ปัญหาหลักคือการคีย์ซ้ำ ไม่ใช่จำนวนเอกสาร
      </TakeawayBand>
    </div>
  </Slide>
);

/** `foot` pins it to the bottom of the body box, so the conclusion lands at the
    same y whether the content above runs short or long. */
export const PinnedToFoot = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={9}>
    <SlideTitle>ขอบเขตงานที่ตกลงกัน</SlideTitle>
    <div className="nct-body">
      <BulletList items={["หกกระบวนการเริ่มได้ทันที", "สองรายการรอสิทธิ์เข้าระบบ"]} />
      <TakeawayBand label="ผลลัพธ์" foot>
        หกในแปดกระบวนการเริ่มได้ทันทีในรอบ 1–2
      </TakeawayBand>
    </div>
  </Slide>
);

/** The dark band, for a tinted or dark slide where the tint one would vanish. */
export const Dark = () => (
  <Slide tone="tint" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={13}>
    <SlideTitle>กระบวนการที่เสนอ</SlideTitle>
    <div className="nct-body">
      <BulletList items={["รับเอกสารเข้าคิวกลาง", "ตรวจกฎธุรกิจ แล้วบันทึกพร้อม audit trail"]} />
      <TakeawayBand label="สรุป" tone="dark">
        เอกสารหนึ่งใบผ่านครบห้าขั้นโดยไม่มีการคีย์ซ้ำเลย
      </TakeawayBand>
    </div>
  </Slide>
);
