import { SlideSection, photoSection } from "@nct/slides";

/** 02 with the photo band: right 40% faded into the navy panel. Breaks the deck
    every 4–8 slides. */
export const WithPhoto = () => (
  <SlideSection
    image={photoSection}
    imageAlt="อาคารสำนักงานมองจากด้านล่าง"
    number="01"
    title="บริบทและปัญหา"
    description="สิ่งที่เราพบจากการสำรวจงานบัญชีของท่านสองสัปดาห์"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={3}
  />
);

/** Without an image the original teal wedge stands in — the plain navy divider. */
export const PlainWedge = () => (
  <SlideSection
    number="02"
    title="วิธีการทำงาน"
    description="กระบวนการ สถาปัตยกรรม และขอบเขตที่ตกลงกัน"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={7}
  />
);
