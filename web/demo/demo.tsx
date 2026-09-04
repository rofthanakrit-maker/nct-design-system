import { createRoot } from "react-dom/client";
import {
  Deck,
  DiagramBox,
  DiagramGroup,
  DiagramLink,
  SlideAgenda,
  SlideClosing,
  SlideContent,
  SlideCover,
  SlideDenseTable,
  SlideDiagram,
  SlideFourCards,
  SlideFullImage,
  SlideKeyFigures,
  SlideProcessFlow,
  SlideQuote,
  SlideSection,
  SlideSplitPanel,
  SlideTable,
  SlideThreeCards,
  SlideTwoColumn,
} from "../src";

const chrome = { footer: "NCT · ข้อเสนอโครงการระบบบัญชี", date: "2569" };

function App() {
  return (
    <Deck>
      <SlideCover
        {...chrome}
        pageNumber={1}
        title="บริการที่ปรึกษาเทคโนโลยีสารสนเทศ"
        subtitle="New Computer Technology Consulting Co., Ltd. · 2569"
      />
      <SlideSection
        {...chrome}
        pageNumber={2}
        number="01"
        title="ภาพรวมบริษัท"
        description="ใครคือ NCT และเราทำอะไรให้ลูกค้าองค์กร"
      />
      <SlideContent
        {...chrome}
        pageNumber={3}
        title="ขอบเขตบริการ"
        items={[
          "วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
          { text: "ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", level: 2 },
          "ดูแลระบบต่อเนื่องแบบ Managed Service",
          { text: "มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", level: 2 },
          "ให้คำปรึกษาการย้ายระบบขึ้นคลาวด์",
        ]}
      />
      <SlideTwoColumn
        {...chrome}
        pageNumber={4}
        title="ก่อนและหลังใช้บริการ"
        left={["ก่อน", { text: "ระบบล่มบ่อย ไม่มีคนดูแลประจำ", level: 2 }, { text: "ค่าใช้จ่ายไม่แน่นอน", level: 2 }]}
        right={["หลัง", { text: "มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", level: 2 }, { text: "ค่าใช้จ่ายคงที่ต่อเดือน", level: 2 }]}
      />
      <SlideThreeCards
        {...chrome}
        pageNumber={5}
        title="สามเสาหลักของบริการ"
        cards={[
          { heading: "Infrastructure", body: "ออกแบบและติดตั้งเครือข่าย เซิร์ฟเวอร์ และระบบสำรองข้อมูล" },
          { heading: "Managed Service", body: "ดูแลระบบรายเดือน พร้อมทีมซัพพอร์ตและรายงานสุขภาพระบบ" },
          { heading: "Cloud & Security", body: "ย้ายระบบขึ้นคลาวด์ และวางมาตรการความปลอดภัยตามมาตรฐาน" },
        ]}
      />
      <SlideKeyFigures
        {...chrome}
        pageNumber={6}
        title="ตัวเลขที่บอกเรื่องเรา"
        figures={[
          { value: "12", label: "ปีที่ให้บริการองค์กรไทย" },
          { value: "99.9%", label: "Uptime เฉลี่ยของระบบที่ดูแล" },
          { value: "24/7", label: "ทีมเฝ้าระวังและตอบกลับ" },
        ]}
        footnote="ข้อมูล ณ ไตรมาส 1 ปี 2569"
      />
      <SlideQuote
        {...chrome}
        pageNumber={7}
        quote="ระบบไม่ล่มอีกเลยตั้งแต่เปลี่ยนมาใช้ทีมนี้ดูแล และเราวางแผนงบประมาณได้ล่วงหน้าจริง ๆ"
        attribution="คุณสมชาย ป. — ผู้จัดการฝ่ายไอที, บริษัทตัวอย่าง จำกัด"
      />
      <SlideFullImage
        {...chrome}
        pageNumber={8}
        title="ศูนย์ปฏิบัติการเครือข่าย"
        caption="ใส่ภาพงานจริงหรือ screenshot — ไม่ใช้ภาพ stock"
      />
      <SlideTable
        {...chrome}
        pageNumber={9}
        title="เปรียบเทียบแพ็กเกจ"
        intro="เลือกระดับบริการให้ตรงกับขนาดองค์กร"
        widths={[3, 2, 2, 2]}
        columns={["", { label: "Essential", align: "center" }, { label: "Business", align: "center" }, { label: "Enterprise", align: "center" }]}
        rows={[
          [{ value: "ชั่วโมงซัพพอร์ต", bold: true }, { value: "จันทร์–ศุกร์ 9–18", align: "center" }, { value: "จันทร์–เสาร์ 8–20", align: "center" }, { value: "24/7", align: "center" }],
          [{ value: "เวลาตอบกลับ (SLA)", bold: true }, { value: "8 ชั่วโมง", align: "center" }, { value: "4 ชั่วโมง", align: "center" }, { value: "1 ชั่วโมง", align: "center" }],
          [{ value: "มอนิเตอร์ระบบ", bold: true }, { value: "รายวัน", align: "center" }, { value: "ต่อเนื่อง", align: "center" }, { value: "ต่อเนื่อง + แจ้งเตือน", align: "center" }],
          [{ value: "รายงานสุขภาพระบบ", bold: true }, { value: "ไตรมาส", align: "center" }, { value: "รายเดือน", align: "center" }, { value: "รายสัปดาห์", align: "center" }],
        ]}
      />
      <SlideSplitPanel
        {...chrome}
        pageNumber={10}
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
      />
      <SlideFourCards
        {...chrome}
        pageNumber={11}
        title="สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"
        cards={[
          { heading: "ลดงานคีย์ซ้ำ", body: "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ" },
          { heading: "ตรวจสอบได้", body: "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง" },
          { heading: "ปิดงบเร็วขึ้น", body: "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน" },
          { heading: "ขยายต่อได้", body: "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม" },
        ]}
        band="ทั้งสี่ข้อมาจากการแก้จุดเดียวกัน คือรวมจุดรับเอกสาร"
      />
      <SlideProcessFlow
        {...chrome}
        pageNumber={12}
        title="กระบวนการที่เสนอ"
        subtitle="ห้าขั้นตอน ทำงานต่อเนื่องโดยไม่ต้องคีย์ซ้ำ"
        steps={[
          { heading: "รับเอกสาร", body: "สแกนหรือรับไฟล์เข้าคิวกลาง" },
          { heading: "อ่านข้อมูล", body: "ดึงฟิลด์สำคัญ ตรวจกับต้นทาง" },
          { heading: "ตรวจสอบ", body: "กฎธุรกิจและวงเงินอนุมัติ" },
          { heading: "บันทึก", body: "ลงระบบบัญชีพร้อม audit trail" },
          { heading: "กระทบยอด", body: "จับคู่อัตโนมัติ ส่งรายงาน" },
        ]}
        result="เอกสารหนึ่งใบผ่านครบห้าขั้นโดยไม่มีการคีย์ซ้ำเลย"
      />
      <SlideDiagram
        {...chrome}
        pageNumber={13}
        title="ภาพรวมสถาปัตยกรรมระบบ"
        subtitle="ใช้ชุดชิ้นส่วนมาตรฐาน — กล่องมุมตรง เส้นหักมุมฉาก ไม่มีเงา"
        legend="กล่องทึบ = ระบบที่มีอยู่ · กล่องมีสีหมวด = ส่วนที่เพิ่ม · เส้นทึบ = ข้อมูลไหลอัตโนมัติ"
      >
        <div className="nct-dia-row">
          <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
          <DiagramLink />
          <DiagramGroup label="ส่วนที่เพิ่มใหม่">
            <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
            <DiagramLink label="ผ่านกฎ" />
            <DiagramBox category={2}>ตัวตรวจกฎธุรกิจ</DiagramBox>
          </DiagramGroup>
          <DiagramLink />
          <DiagramBox>ระบบบัญชี</DiagramBox>
        </div>
      </SlideDiagram>
      <SlideAgenda
        {...chrome}
        pageNumber={14}
        number="02"
        title="หัวข้อนำเสนอ"
        items={[
          "บริบทและปัญหาที่พบ",
          "วัตถุประสงค์ของโครงการ",
          "ขอบเขตงานรายกระบวนการ",
          "แผนดำเนินงานและผู้รับผิดชอบ",
          "งบประมาณและเงื่อนไข",
        ]}
      />
      <SlideDenseTable
        {...chrome}
        pageNumber={15}
        title="ขอบเขตงานรายกระบวนการ"
        intro="แปดกระบวนการที่อยู่ในขอบเขต แบ่งตามหมวดและรอบส่งมอบ"
        widths={[0.6, 3.2, 1.3, 1.6, 1.6, 1.4]}
        columns={[
          { label: "#", align: "center" },
          "กระบวนการ",
          { label: "หมวด", align: "center" },
          { label: "ปริมาณ/เดือน", align: "center" },
          { label: "ความพร้อม", align: "center" },
          { label: "รอบที่ทำ", align: "center" },
        ]}
        rows={[
          [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: "AP", align: "center", bold: true }, { value: "420 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 2, category: 1 }, "กระทบยอดใบสั่งซื้อ", { value: "AP", align: "center", bold: true }, { value: "380 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 3, category: 2 }, "ออกใบแจ้งหนี้ขาย", { value: "AR", align: "center", bold: true }, { value: "260 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 4, category: 2 }, "ติดตามลูกหนี้ค้างชำระ", { value: "AR", align: "center", bold: true }, { value: "150 ราย", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
          [{ value: 5, category: 1 }, "บันทึกค่าใช้จ่ายพนักงาน", { value: "AP", align: "center", bold: true }, { value: "310 ใบ", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
          [{ value: 6, category: 4 }, "ปรับปรุงบัญชีสิ้นเดือน", { value: "GL", align: "center", bold: true }, { value: "45 รายการ", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
          [{ value: 7, category: 4 }, "กระทบยอดธนาคาร", { value: "GL", align: "center", bold: true }, { value: "12 บัญชี", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 8, category: 4 }, "รายงานภาษีซื้อ-ขาย", { value: "GL", align: "center", bold: true }, { value: "2 ชุด", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
        ]}
        footnote="ปริมาณเป็นค่าเฉลี่ยจากข้อมูล 3 เดือนล่าสุด · รายการติดข้อจำกัดรอผลการตรวจสิทธิ์เข้าระบบ"
      />
      <SlideClosing
        {...chrome}
        pageNumber={16}
        contact={["โทร · 02-XXX-XXXX", "อีเมล · contact@nctthai.com", "เว็บไซต์ · nctthai.com"]}
      />
    </Deck>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
