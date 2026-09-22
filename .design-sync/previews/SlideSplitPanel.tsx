import { SlideSplitPanel } from "@nct/slides";

/** 11 · current state on the dark left panel, the proposal on the tinted right,
    one line of conclusion under both. Never swap the sides. */
export const CurrentVsProposed = () => (
  <SlideSplitPanel
    title="สภาพระบบบัญชีปัจจุบัน"
    context={[
      "คีย์เอกสารซ้ำสามระบบ ไม่มีจุดตรวจกลาง",
      { text: "เอกสารเข้าเฉลี่ย 1,200 ใบต่อเดือน", level: 2 },
      "ปิดงบล่าช้าเฉลี่ย 6 วันทำการ",
      "ไม่มี audit trail ของการแก้ไขรายการ",
    ]}
    outcome={[
      "คีย์จุดเดียว ระบบกระจายต่อให้อัตโนมัติ",
      { text: "ลดเวลาคีย์ต่อใบจาก 4 นาที เหลือ 40 วินาที", level: 2 },
      "ปิดงบภายใน 2 วันทำการ",
      "บันทึกทุกการแก้ไขพร้อมผู้ทำและเวลา",
    ]}
    takeaway="ปัญหาหลักคือการคีย์ซ้ำ ไม่ใช่จำนวนเอกสาร"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={4}
  />
);

/** Both kickers named, corp chrome. The kickers label the two panels when
    "ปัจจุบัน / ข้อเสนอ" is not obvious from the copy. */
export const Corp = () => (
  <SlideSplitPanel
    brand="corp"
    title="การจัดเก็บเอกสารก่อนและหลัง"
    contextKicker="ปัจจุบัน"
    context={[
      "เก็บกระดาษที่สำนักงานสาขา",
      { text: "ค้นย้อนหลังใช้เวลาครึ่งวัน", level: 2 },
    ]}
    outcomeKicker="หลังขึ้นระบบ"
    outcome={[
      "สแกนเข้าคลังเอกสารกลางตั้งแต่วันรับ",
      { text: "ค้นด้วยเลขที่เอกสารหรือคู่ค้าได้ทันที", level: 2 },
    ]}
    takeaway="ต้นทุนที่หายไปคือเวลาค้นเอกสาร ไม่ใช่ค่ากระดาษ"
    date="Updated date: 2026.09.07"
    pageNumber={7}
  />
);
