import { SlideQuote } from "@nct/slides";

/** 07 · pull quote on the tinted ground — testimonials and customer words. */
export const Testimonial = () => (
  <SlideQuote
    quote="ระบบไม่ล่มอีกเลยตั้งแต่เปลี่ยนมาใช้ทีมนี้ดูแล และเราวางแผนงบประมาณได้ล่วงหน้าจริง ๆ"
    attribution="คุณสมชาย ป. — ผู้จัดการฝ่ายไอที, บริษัทตัวอย่าง จำกัด"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={16}
  />
);

/** A shorter quote under the corp chrome; the attribution line is optional. */
export const Corp = () => (
  <SlideQuote
    brand="corp"
    quote="ปิดงบเดือนแรกหลังขึ้นระบบใช้เวลาสองวัน จากเดิมหกวัน"
    attribution="ฝ่ายบัญชี — ลูกค้าโครงการนำร่อง, 2569"
    date="Updated date: 2026.09.07"
    pageNumber={9}
  />
);
