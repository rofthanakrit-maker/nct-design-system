import { SlideTeam } from "@nct/slides";

/** 25 · the lead over four roles; a role of several carries its head count and
    names the one who leads it. Credentials are the one line the TOR asks for. */
export const FourRoles = () => (
  <SlideTeam
    brand="corp"
    title="ทีม 7 คน ทำเองตั้งแต่ออกแบบจนถึงอบรม"
    lead={{ role: "ผู้จัดการโครงการ", name: "กานดา ศรีสุข", credential: "PMP · ประสบการณ์ 15 ปี",
            duties: ["คุมแผนและการส่งมอบทั้ง 3 งวด", "ประสานกับคณะกรรมการตรวจรับ"] }}
    team={[
      { role: "นักวิเคราะห์ธุรกิจ", name: "ปวีณา ทองดี", credential: "CPA · ประสบการณ์ 10 ปี",
        duties: ["เก็บความต้องการงานบัญชี", "ออกแบบผังบัญชีและกฎตรวจ"] },
      { role: "นักพัฒนาระบบ × 3", name: "ธนพล มีสุข", credential: "AWS · ประสบการณ์ 8 ปี",
        duties: ["ตัวเชื่อม ERP", "คิวเอกสารและตัวตรวจกฎ"] },
      { role: "วิศวกรระบบ", name: "อนุชา แก้วใส", credential: "MCSA · ประสบการณ์ 7 ปี",
        duties: ["ติดตั้ง PRD และ QA", "สำรองข้อมูลและกู้คืน"] },
      { role: "ทดสอบและอบรม", name: "นภา รุ่งเรือง", credential: "ISTQB · ประสบการณ์ 5 ปี",
        duties: ["ทดสอบรับรองก่อนขึ้นระบบ", "อบรมผู้ใช้ 2 หลักสูตร"] },
    ]}
    note="ทีมรวม 7 คน · ประวัติและวุฒิบัตรเต็มอยู่ภาคผนวก ข"
    takeaway="ทุกตำแหน่งมีคุณวุฒิครบตาม TOR ข้อ 5.3 ไม่มีงานส่วนไหนจ้างช่วง"
    date="Updated date: 2026.10.01"
    pageNumber={18}
  />
);

/** Three roles on the third grid: the bar shortens to the outer card centres,
    the lead stays centred over the middle one. */
export const ThreeRoles = () => (
  <SlideTeam
    title="ทีมดูแลหลังขึ้นระบบ 4 คน ตอบภายใน 4 ชั่วโมงทำการ"
    lead={{ role: "ผู้จัดการบริการ", name: "สุนีย์ เพชรงาม", credential: "ITIL 4 · ประสบการณ์ 12 ปี",
            duties: ["รายงาน SLA ทุกเดือน", "ทบทวนบริการทุกไตรมาส"] }}
    team={[
      { role: "Helpdesk × 2", name: "วิชัย ดวงดี", credential: "ประสบการณ์ 6 ปี",
        duties: ["รับแจ้งปัญหาในเวลาทำการ", "แก้ปัญหาการใช้งานระดับ 1"] },
      { role: "นักพัฒนาระบบ", name: "ธนพล มีสุข", credential: "AWS · ประสบการณ์ 8 ปี",
        duties: ["แก้ไขข้อบกพร่อง", "ปรับกฎตรวจตามคำขอ"] },
      { role: "วิศวกรระบบ", name: "อนุชา แก้วใส", credential: "MCSA · ประสบการณ์ 7 ปี",
        duties: ["เฝ้าระบบและสำรองข้อมูล", "อัปเดตความปลอดภัย"] },
    ]}
    note="ทีมรวม 4 คน · ช่องทางแจ้งปัญหาอยู่ภาคผนวก ค"
    takeaway="ทีมที่ดูแลคือทีมที่สร้าง ไม่ต้องเรียนระบบใหม่"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={19}
  />
);
