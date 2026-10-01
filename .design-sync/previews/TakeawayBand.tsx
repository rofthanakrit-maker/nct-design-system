import { BulletList, Slide, SlideTitle, TakeawayBand } from "@nct/slides";

/* The band is never a slide on its own — it is the conclusion strip under a
   layout's body box, so the card renders it where it actually lives. */

/** Always `foot`: the strip is pinned to the bottom of the body box, tinted, so
    the conclusion lands at the same y on every slide whatever runs above it. */
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
