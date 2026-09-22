import { ClipboardCheck, FileInput, Icon, Layers, SlideFourCards, Timer } from "@nct/slides";

/** 12 · four numbered cards with the conclusion band under them. Icons sit in
    the headings beside the words, never instead of them. */
export const Outcomes = () => (
  <SlideFourCards
    title="สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"
    cards={[
      { heading: <><Icon icon={FileInput} tone="accent" /> ลดงานคีย์ซ้ำ</>, body: "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ" },
      { heading: <><Icon icon={ClipboardCheck} tone="accent" /> ตรวจสอบได้</>, body: "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง" },
      { heading: <><Icon icon={Timer} tone="accent" /> ปิดงบเร็วขึ้น</>, body: "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน" },
      { heading: <><Icon icon={Layers} tone="accent" /> ขยายต่อได้</>, body: "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม" },
    ]}
    band="ทั้งสี่ข้อมาจากการแก้จุดเดียวกัน คือรวมจุดรับเอกสาร"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={5}
  />
);

/** Hand-typed `number`s and a named band label, corp chrome — four risks, each
    with the control that answers it. */
export const Corp = () => (
  <SlideFourCards
    brand="corp"
    title="ความเสี่ยงของโครงการและการรับมือ"
    cards={[
      { number: "01", heading: "สิทธิ์เข้าระบบล่าช้า", body: "เริ่มจากหกกระบวนการที่ไม่ต้องรอสิทธิ์ก่อน" },
      { number: "02", heading: "ข้อมูลต้นทางไม่ครบ", body: "ตรวจความครบถ้วนที่ขั้นรับเอกสาร ไม่ใช่ตอนปิดงบ" },
      { number: "03", heading: "ผู้ใช้ยังคีย์แบบเดิม", body: "อบรมสองหลักสูตรก่อนวันขึ้นระบบ" },
      { number: "04", heading: "ประกาศภาษีเปลี่ยน", body: "สูตรคำนวณแยกจากโค้ด แก้ที่ตารางค่าคงที่" },
    ]}
    bandLabel="สรุป"
    band="ทั้งสี่ข้อจัดการได้ในรอบที่ 1 โดยไม่เลื่อนวันขึ้นระบบ"
    date="Updated date: 2026.09.07"
    pageNumber={10}
  />
);
