import { SlideClients } from "@nct/slides";

/** 26 · twelve clients as names in the logo slot (the demo has no cleared
    logos); every tile carries sector · what was delivered. */
export const TwelveNames = () => (
  <SlideClients
    title="40 องค์กรปิดงบด้วยระบบที่ NCT วางอยู่ทุกเดือน"
    intro="คัด 12 จาก 40 องค์กร ที่ใช้งานต่อเนื่องเกิน 2 ปี"
    clients={[
      { name: "Contoso", caption: "ค้าปลีก · ปิดงบอัตโนมัติ" },
      { name: "Fabrikam", caption: "การผลิต · ใบแจ้งหนี้ด้วย OCR" },
      { name: "Northwind Traders", caption: "นำเข้า-ส่งออก · กระทบยอดธนาคาร" },
      { name: "Adventure Works", caption: "การผลิต · Dynamics 365 BC" },
      { name: "Tailspin Toys", caption: "ค้าปลีก · ใบกำกับภาษีอัตโนมัติ" },
      { name: "Wide World Importers", caption: "โลจิสติกส์ · Intercompany" },
      { name: "Woodgrove Bank", caption: "การเงิน · RPA กระทบยอด" },
      { name: "Litware", caption: "ซอฟต์แวร์ · ระบบเบิกจ่าย" },
      { name: "Proseware", caption: "บริการ · วางบิลและติดตามเช็ค" },
      { name: "Alpine Ski House", caption: "ท่องเที่ยว · ตรวจเงินสดย่อย" },
      { name: "Coho Winery", caption: "เครื่องดื่ม · ลูกหนี้และวางบิล" },
      { name: "Lucerne Publishing", caption: "สื่อ · ปิดงบรายเดือน" },
    ]}
    note="รายชื่อเต็มอยู่ภาคผนวก ค · ชื่อในตัวอย่างนี้เป็นบริษัทสมมติ"
    takeaway="ระบบเดียวกับที่เสนอ ใช้งานจริงแล้วทั้งค้าปลีก การผลิต และการเงิน"
    date="Updated date: 2026.10.01"
    pageNumber={17}
  />
);

/* stand-in logo files for fictional companies: a plain wordmark on white */
const mark = (text: string, fill: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="60"><rect x="0" y="14" width="32" height="32" rx="6" fill="${fill}"/><text x="44" y="40" font-family="Arial" font-weight="700" font-size="26" fill="#333">${text}</text></svg>`,
  );

/** Eight, two rows: tiles with a cleared logo show the image, fitted inside
    the box; the rest fall back to the name in the same slot. */
export const EightMixed = () => (
  <SlideClients
    title="ลูกค้ากลุ่มการผลิต 8 รายใช้ระบบเบิกจ่ายเดียวกัน"
    intro="ลูกค้ากลุ่มการผลิตที่ขึ้นระบบหลังปี 2566 ทุกราย"
    clients={[
      { name: "Fabrikam", logo: mark("Fabrikam", "#2A5EA0"), caption: "ชิ้นส่วนยานยนต์ · AP + OCR" },
      { name: "Adventure Works", logo: mark("AdvWorks", "#0D9298"), caption: "อุปกรณ์กีฬา · Dynamics 365 BC" },
      { name: "Tailwind Steel", caption: "เหล็ก · เบิกจ่ายและงบประมาณ" },
      { name: "Contoso Pharma", caption: "ยา · ตรวจเอกสารก่อนจ่าย" },
      { name: "Coho Foods", caption: "อาหาร · ใบกำกับภาษีอัตโนมัติ" },
      { name: "Litware Plastics", caption: "พลาสติก · กระทบยอดธนาคาร" },
      { name: "Proseware Print", caption: "บรรจุภัณฑ์ · ปิดงบรายเดือน" },
      { name: "Wingtip Electric", caption: "อิเล็กทรอนิกส์ · Intercompany" },
    ]}
    note="ใช้โลโก้เฉพาะลูกค้าที่อนุญาตเป็นลายลักษณ์อักษร · ชื่อในตัวอย่างนี้เป็นบริษัทสมมติ"
    takeaway="ทุกรายเริ่มจากแพ็กเกจเดียวกับที่เสนอ แล้วขยายเองหลังปีแรก"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={17}
  />
);
