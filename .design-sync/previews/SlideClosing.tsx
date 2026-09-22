import { SlideClosing, photoFacade, photoHandshake } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 10 · the ask. The thank-you is the title; the content is what happens next.
    Default `imageMode="band"` — the photo band the .potx layout carries. */
export const Band = () => (
  <SlideClosing
    image={photoFacade}
    imageAlt="อาคารสำนักงาน"
    nextSteps={[
      "ยืนยันแพ็กเกจและขอบเขตงานรายกระบวนการ",
      "เปิดสิทธิ์เข้าระบบให้ทีมสำรวจ 2 รายการที่ยังติดข้อจำกัด",
      "ลงนามสัญญาและเริ่มรอบที่ 1 ภายใน 30 วัน",
    ]}
    decisionBy="ต้องการคำตอบภายใน 30 กันยายน 2569 เพื่อเริ่มรอบแรกในไตรมาสนี้"
    contact={[
      "โทร · 02-XXX-XXXX",
      <>อีเมล · {en("contact@nctthai.com")}</>,
      <>เว็บไซต์ · {en("nctthai.com")}</>,
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={18}
  />
);

/** `imageMode="full"` runs the photograph edge to edge behind a DEEP scrim —
    web only, for a subject the 560×720 band would read as a blur. */
export const FullBleed = () => (
  <SlideClosing
    image={photoHandshake}
    imageMode="full"
    imageAlt="จับมือปิดดีลในห้องประชุม"
    nextSteps={[
      "ยืนยันแพ็กเกจและขอบเขตงานรายกระบวนการ",
      "เปิดสิทธิ์เข้าระบบให้ทีมสำรวจ 2 รายการที่ยังติดข้อจำกัด",
      "ลงนามสัญญาและเริ่มรอบที่ 1 ภายใน 30 วัน",
    ]}
    decisionBy="ต้องการคำตอบภายใน 30 กันยายน 2569 เพื่อเริ่มรอบแรกในไตรมาสนี้"
    contact={[
      "โทร · 02-XXX-XXXX",
      <>อีเมล · {en("contact@nctthai.com")}</>,
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={18}
  />
);

/** Without an image: the teal→navy gradient alone, the bookend to layout 01.
    A deck that ends on a thank-you has asked the room for nothing. */
export const NoImage = () => (
  <SlideClosing
    brand="corp"
    nextSteps={[
      "ลงนามรับเอกสาร SRS และ BPF",
      "ยืนยันวันอบรมสองหลักสูตรก่อนวันขึ้นระบบ",
    ]}
    decisionBy="ยืนยันภายใน 15 วันทำการ"
    contact={["โทร · 02-XXX-XXXX", <>อีเมล · {en("contact@nctthai.com")}</>]}
    date="Updated date: 2026.09.07"
    pageNumber={12}
  />
);
