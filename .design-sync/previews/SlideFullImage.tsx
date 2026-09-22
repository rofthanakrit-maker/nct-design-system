import { SlideFullImage, photoFacade, photoTower } from "@nct/slides";

/** 08 · the .potx treatment: the photograph edge to edge behind a bottom scrim.
    The scrim is not optional — it is what keeps the type readable. */
export const FullBleed = () => (
  <SlideFullImage
    src={photoTower}
    alt="อาคารสำนักงานมองจากด้านล่าง"
    title="วิธีการทำงาน"
    caption="กระบวนการ สถาปัตยกรรม และขอบเขตที่ตกลงกัน"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={8}
  />
);

/** `variant="fade"` narrows the picture to the chapter-opener band and holds the
    type in the left half. Web only — layout 08 in PowerPoint stays full-bleed. */
export const Fade = () => (
  <SlideFullImage
    variant="fade"
    src={photoFacade}
    alt="อาคารสำนักงาน"
    title="วิธีการทำงาน"
    caption="กระบวนการ สถาปัตยกรรม และขอบเขตที่ตกลงกัน"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={8}
  />
);
