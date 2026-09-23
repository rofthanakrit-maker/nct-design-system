import { DataTable, SlideEvidence, photoFacade, photoSection, photoTower } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** 18 · a claim, a one-line finding, and three frames of proof under it. The
    children carry the claim — here a DataTable of the two courses. */
export const TrainingCorp = () => (
  <SlideEvidence
    brand="corp"
    title={en("8. Project Training")}
    kicker="วัตถุประสงค์ของการอบรม"
    takeaway="อบรมสองหลักสูตร รวม 8 ชั่วโมง จบภายในสัปดาห์เดียวก่อนวันขึ้นระบบ"
    figures={[
      { src: photoSection, alt: "", caption: "อบรมที่สำนักงานลูกค้า 20–50 คน" },
      { src: photoFacade, alt: "", caption: "อบรมกลุ่มย่อยในห้องประชุม 2–20 คน" },
      { src: photoTower, alt: "", caption: <>อบรมออนไลน์ผ่าน {en("MS Teams")}</> },
    ]}
    date="Updated date: 2026.09.07"
    pageNumber={14}
  >
    <DataTable
      widths={[2.2, 3.4, 1.2, 2.4]}
      columns={["หลักสูตร", "วัตถุประสงค์", { label: "ระยะเวลา", align: "center" }, "เงื่อนไขการจัด"]}
      rows={[
        [
          { value: "1. การใช้งานสำหรับผู้ใช้", bold: true },
          { value: "เข้าใจการใช้งานระบบในงานประจำวัน" },
          { value: "4 ชั่วโมง", align: "center" },
          { value: "จัดครั้งเดียว ที่สำนักงานหรือออนไลน์" },
        ],
        [
          { value: "2. การดูแลสำหรับผู้ดูแลระบบ", bold: true },
          { value: "เข้าใจการบำรุงรักษาและแก้ปัญหาเบื้องต้น" },
          { value: "4 ชั่วโมง", align: "center" },
          { value: "จัดครั้งเดียว ที่สำนักงานหรือออนไลน์" },
        ],
      ]}
    />
  </SlideEvidence>
);

/** Two frames and a bullet claim, house brand — the minimum the strip takes. */
export const TwoFramesHouse = () => (
  <SlideEvidence
    brand="web"
    title="ผลการทดสอบระบบกับเอกสารจริง"
    kicker="หลักฐานจากรอบนำร่อง"
    takeaway="อ่านฟิลด์ถูกต้อง 96% จากเอกสารจริง 400 ใบ ที่เหลือเข้าคิวตรวจด้วยคน"
    figures={[
      { src: photoSection, alt: "", caption: "ชุดเอกสารที่ใช้ทดสอบ 400 ใบ" },
      { src: photoTower, alt: "", caption: "หน้าจอคิวตรวจด้วยคน" },
    ]}
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={20}
  >
    <DataTable
      widths={[3, 2, 2]}
      columns={["ชนิดเอกสาร", { label: "จำนวน", align: "center" }, { label: "อ่านถูกต้อง", align: "center" }]}
      rows={[
        [{ value: "ใบแจ้งหนี้ซื้อ", bold: true }, { value: "240 ใบ", align: "center" }, { value: "97%", align: "center", status: "ok" }],
        [{ value: "ใบเสร็จรับเงิน", bold: true }, { value: "160 ใบ", align: "center" }, { value: "94%", align: "center", status: "warn" }],
      ]}
    />
  </SlideEvidence>
);
