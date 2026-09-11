import { createRoot } from "react-dom/client";
import {
  BulletList,
  CategoryKey,
  DataTable,
  Deck,
  DiagramBox,
  DiagramGroup,
  DiagramLink,
  SlideAgenda,
  SlideChart,
  SlideClosing,
  SlideContent,
  SlideCover,
  SlideDenseTable,
  SlideDiagram,
  SlideEvidence,
  SlideFourCards,
  SlideFullImage,
  SlideKeyFigures,
  SlidePhaseCard,
  SlideProcessFlow,
  SlideQuote,
  SlideSection,
  SlideSplitPanel,
  SlideTable,
  SlideThreeCards,
  SlideTwoColumn,
  photoFacade,
  photoHandshake,
  photoSection,
  photoTower,
} from "../src";

/* The demo is the file everyone copies, so it runs in argument order, not in
   layout-number order: cover, agenda, the problem, what changes, how the work
   is done, what is in scope, who is doing it, what it costs, what happens next.
   Each of the nineteen layouts still appears exactly once — the 1:1 parity with
   NCT-Slide-Template.potx is the point of the deck. Chrome and page numbers
   come from <Deck>; nothing here types a page number by hand. */

/** Latin script inside a Thai document — tagged so a screen reader switches voice. */
const en = (s: string) => <span lang="en">{s}</span>;

function App() {
  return (
    <>
      <WebDeck />
      <CorpDeck />
    </>
  );
}

/** The house deck: layouts 01–16 and 19, web brand. 17–18 are in the corp deck. */
function WebDeck() {
  return (
    <Deck footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569">
      {/* 01 · cover. Unnumbered: a cover is not page 1 of anything. */}
      <SlideCover
        hideFooter
        title="ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"
        subtitle={<>{en("New Computer Technology Consulting Co., Ltd.")} · 2569</>}
      />
      {/* 15 · agenda — six lines, the documented ceiling */}
      <SlideAgenda
        image={photoTower}
        imageAlt="อาคารสำนักงานมองจากด้านล่าง"
        number="00"
        title="หัวข้อนำเสนอ"
        items={[
          "บริบทและปัญหาที่พบ",
          "ผลลัพธ์ที่ข้อเสนอนี้ให้",
          "วิธีการทำงานและสถาปัตยกรรม",
          "ขอบเขตงานรายกระบวนการ",
          "ทีมงานและประสบการณ์",
          "แพ็กเกจและงบประมาณ",
        ]}
      />
      {/* 02 · chapter one opens on the problem */}
      <SlideSection
        image={photoSection}
        imageAlt="อาคารสำนักงานมองจากด้านล่าง"
        number="01"
        title="บริบทและปัญหา"
        description="สิ่งที่เราพบจากการสำรวจงานบัญชีของท่านสองสัปดาห์"
      />
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
      />
      {/* 19 · the problem, measured. Emphasis, not six colours: the story is one month */}
      <SlideChart
        title="ปิดงบ พ.ค. ใช้ 9 วัน นานสุดในรอบครึ่งปี"
        chart={{
          kind: "column",
          unit: "วันทำการ",
          categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
          series: { name: "เวลาปิดงบ", values: [6, 7, 6, 8, 9, 7] },
          highlight: 4,
        }}
        figure={{ value: "9 วัน", label: "เวลาปิดงบ พ.ค. 2569 · เป้าหมาย 2 วัน" }}
        insights={[
          "เดือนที่เอกสารเข้ามากสุด คือเดือนที่ปิดงบนานสุด",
          "ทุกเดือนเกินเป้าอย่างน้อยสามเท่า",
          "ความล่าช้าเกิดที่ขั้นกระทบยอด ไม่ใช่ขั้นคีย์",
        ]}
        source="ระบบบัญชีของลูกค้า · ม.ค.–มิ.ย. 2569"
        takeaway="เวลาปิดงบแปรตามปริมาณเอกสาร การลดงานคีย์ซ้ำจึงลดเวลาปิดงบได้จริง"
      />
      <SlideTwoColumn
        title="ก่อนและหลังใช้บริการ"
        left={["ก่อน", { text: "ระบบล่มบ่อย ไม่มีคนดูแลประจำ", level: 2 }, { text: "ค่าใช้จ่ายไม่แน่นอน", level: 2 }]}
        right={["หลัง", { text: "มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", level: 2 }, { text: "ค่าใช้จ่ายคงที่ต่อเดือน", level: 2 }]}
      />
      <SlideFourCards
        title="สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"
        cards={[
          { heading: "ลดงานคีย์ซ้ำ", body: "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ" },
          { heading: "ตรวจสอบได้", body: "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง" },
          { heading: "ปิดงบเร็วขึ้น", body: "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน" },
          { heading: "ขยายต่อได้", body: "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม" },
        ]}
        band="ทั้งสี่ข้อมาจากการแก้จุดเดียวกัน คือรวมจุดรับเอกสาร"
      />
      {/* 08 · chapter two opens over photography */}
      <SlideFullImage
        variant="fade"
        src={photoFacade}
        alt="อาคารสำนักงาน"
        title="วิธีการทำงาน"
        caption="กระบวนการ สถาปัตยกรรม และขอบเขตที่ตกลงกัน"
      />
      <SlideProcessFlow
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
        title="ภาพรวมสถาปัตยกรรมระบบ"
        subtitle="ใช้ชุดชิ้นส่วนมาตรฐาน — กล่องมุมตรง เส้นหักมุมฉาก ไม่มีเงา"
        legend="กล่องทึบ = ระบบที่มีอยู่ · กล่องมีสีหมวด = ส่วนที่เพิ่ม · เส้นทึบ = ข้อมูลไหลอัตโนมัติ"
        takeaway="ระบบเดิมไม่ถูกแก้ ของใหม่แทรกเป็นคิวและตัวตรวจกฎคั่นกลางเท่านั้น"
      >
        <div className="nct-dia-row">
          <DiagramBox>ระบบ ERP ปัจจุบัน</DiagramBox>
          <DiagramLink />
          <DiagramGroup label="ส่วนที่เพิ่มใหม่">
            <DiagramBox category={1}>คิวเอกสารกลาง</DiagramBox>
            <DiagramLink label="ผ่านกฎธุรกิจ" />
            <DiagramBox category={2}>ตัวตรวจกฎธุรกิจ</DiagramBox>
          </DiagramGroup>
          <DiagramLink />
          <DiagramBox>ระบบบัญชี</DiagramBox>
        </div>
      </SlideDiagram>
      <SlideDenseTable
        title="ขอบเขตงานรายกระบวนการ"
        intro="แปดกระบวนการที่อยู่ในขอบเขต แบ่งตามหมวดและรอบส่งมอบ"
        legend={
          <CategoryKey
            items={[
              { category: 1, label: en("AP · เจ้าหนี้") },
              { category: 2, label: en("AR · ลูกหนี้") },
              { category: 3, label: en("GL · บัญชีแยกประเภท") },
            ]}
          />
        }
        takeaway="หกในแปดกระบวนการเริ่มได้ทันทีในรอบ 1–2 อีกสองรายการรอสิทธิ์เข้าระบบ ยืนยันภายใน 15 วัน"
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
          [{ value: 1, category: 1 }, "บันทึกใบแจ้งหนี้ซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "420 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 2, category: 1 }, "กระทบยอดใบสั่งซื้อ", { value: en("AP"), align: "center", bold: true }, { value: "380 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 3, category: 2 }, "ออกใบแจ้งหนี้ขาย", { value: en("AR"), align: "center", bold: true }, { value: "260 ใบ", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 4, category: 2 }, "ติดตามลูกหนี้ค้างชำระ", { value: en("AR"), align: "center", bold: true }, { value: "150 ราย", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
          [{ value: 5, category: 1 }, "บันทึกค่าใช้จ่ายพนักงาน", { value: en("AP"), align: "center", bold: true }, { value: "310 ใบ", align: "center" }, { value: "รอยืนยัน", status: "warn" }, { value: "รอบ 2", align: "center" }],
          [{ value: 6, category: 3 }, "ปรับปรุงบัญชีสิ้นเดือน", { value: en("GL"), align: "center", bold: true }, { value: "45 รายการ", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
          [{ value: 7, category: 3 }, "กระทบยอดธนาคาร", { value: en("GL"), align: "center", bold: true }, { value: "12 บัญชี", align: "center" }, { value: "พร้อม", status: "ok" }, { value: "รอบ 1", align: "center" }],
          [{ value: 8, category: 3 }, "รายงานภาษีซื้อ-ขาย", { value: en("GL"), align: "center", bold: true }, { value: "2 ชุด", align: "center" }, { value: "ติดข้อจำกัด", status: "risk" }, { value: "รอบ 3", align: "center" }],
        ]}
        footnote="ปริมาณเป็นค่าเฉลี่ยจากข้อมูล 3 เดือนล่าสุด"
      />
      {/* who is doing the work */}
      <SlideContent
        title="ขอบเขตบริการของ NCT"
        items={[
          "วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
          { text: "ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", level: 2 },
          "ดูแลระบบต่อเนื่องแบบ Managed Service",
          { text: "มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", level: 2 },
          "ให้คำปรึกษาการย้ายระบบขึ้นคลาวด์",
        ]}
      />
      <SlideThreeCards
        title="สามเสาหลักของบริการ"
        cards={[
          { heading: en("Infrastructure"), body: "ออกแบบและติดตั้งเครือข่าย เซิร์ฟเวอร์ และระบบสำรองข้อมูล" },
          { heading: en("Managed Service"), body: "ดูแลระบบรายเดือน พร้อมทีมซัพพอร์ตและรายงานสุขภาพระบบ" },
          { heading: en("Cloud & Security"), body: "ย้ายระบบขึ้นคลาวด์ และวางมาตรการความปลอดภัยตามมาตรฐาน" },
        ]}
      />
      <SlideKeyFigures
        title="ตัวเลขที่บอกเรื่องเรา"
        figures={[
          { value: "12", label: "ปีที่ให้บริการองค์กรไทย" },
          { value: "99.9%", label: <>{en("Uptime")} เฉลี่ยของระบบที่ดูแล</> },
          { value: "24/7", label: "ทีมเฝ้าระวังและตอบกลับ" },
        ]}
        footnote="ข้อมูล ณ ไตรมาส 1 ปี 2569"
      />
      <SlideQuote
        quote="ระบบไม่ล่มอีกเลยตั้งแต่เปลี่ยนมาใช้ทีมนี้ดูแล และเราวางแผนงบประมาณได้ล่วงหน้าจริง ๆ"
        attribution="คุณสมชาย ป. — ผู้จัดการฝ่ายไอที, บริษัทตัวอย่าง จำกัด"
      />
      {/* the money slide: a price row, and the column the takeaway argues for */}
      <SlideTable
        title="แพ็กเกจและงบประมาณ"
        intro="เลือกระดับบริการให้ตรงกับขนาดองค์กร ราคาไม่รวมภาษีมูลค่าเพิ่ม"
        recommended={2}
        takeaway="องค์กร 50–200 ที่นั่งเลือก Business เป็นค่าเริ่มต้น ตอบกลับ 4 ชั่วโมงครอบคลุมงานปิดงบรายเดือน"
        widths={[3, 2, 2, 2]}
        columns={[
          "",
          { label: en("Essential"), align: "center" },
          { label: en("Business"), align: "center" },
          { label: en("Enterprise"), align: "center" },
        ]}
        rows={[
          [{ value: "ชั่วโมงซัพพอร์ต", bold: true }, { value: "จันทร์–ศุกร์ 9–18", align: "center" }, { value: "จันทร์–เสาร์ 8–20", align: "center" }, { value: "24/7", align: "center" }],
          [{ value: "เวลาตอบกลับ (SLA)", bold: true }, { value: "8 ชั่วโมง", align: "center" }, { value: "4 ชั่วโมง", align: "center" }, { value: "1 ชั่วโมง", align: "center" }],
          [{ value: "มอนิเตอร์ระบบ", bold: true }, { value: "รายวัน", align: "center" }, { value: "ต่อเนื่อง", align: "center" }, { value: "ต่อเนื่อง + แจ้งเตือน", align: "center" }],
          [{ value: "รายงานสุขภาพระบบ", bold: true }, { value: "ไตรมาส", align: "center" }, { value: "รายเดือน", align: "center" }, { value: "รายสัปดาห์", align: "center" }],
          [{ value: "ค่าบริการต่อเดือน", bold: true }, { value: "18,000 บาท", align: "center", bold: true }, { value: "32,000 บาท", align: "center", bold: true }, { value: "65,000 บาท", align: "center", bold: true }],
        ]}
      />
      {/* the ask. The thank-you is the title; the content is what happens next. */}
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
          <>เว็บไซต์ · {en("nctthai.com")}</>,
        ]}
      />
    </Deck>
  );
}

/* The corporate deck: the same components under `brand="corp"`, which is the
   whole claim of v3 — the furniture changes, the grid does not. Layouts 17 and
   18 live here because this is the deck they were studied from, but both render
   in either mode; layout 03 is included unchanged to show a v1 layout wearing
   the corp chrome with no edit of its own. */
function CorpDeck() {
  return (
    <Deck brand="corp" date="Updated date: 2026.09.07">
      {/* 01 · the corp cover — a different slide from the house cover, not the
          same one in different furniture */}
      <SlideCover
        title={
          <>
            <span>{en("PROPOSAL")}</span>
            <span>{en("For")}</span>
            <span>{en("“AGE — Finance and Accounting”")}</span>
          </>
        }
      />
      {/* 03 under corp chrome: not one line of this slide changed */}
      <SlideContent
        title={en("5. Implementation Stage")}
        items={[
          "แบ่งงานเป็นสองส่วน คือการบริหารโครงการและการส่งมอบระบบ",
          { text: "การบริหารโครงการดูแลขอบเขต เวลา และค่าใช้จ่าย", level: 2 },
          { text: "การส่งมอบระบบครอบคลุมวิเคราะห์ ออกแบบ พัฒนา ทดสอบ และขึ้นระบบ", level: 2 },
          "ทุกเฟสปิดด้วยเอกสารส่งมอบและการลงนามรับ",
        ]}
      />
      {/* 17 · phase card */}
      <SlidePhaseCard
        title={en("5. Implementation Stage")}
        meta={[
          { label: en("Key Activity"), value: "ตั้งค่าสภาพแวดล้อม ติดตั้งฮาร์ดแวร์และซอฟต์แวร์" },
          {
            label: en("Participant"),
            value: <>{en("NCT Infra Engineer")}, ทีมไอทีลูกค้า, {en("Business Analyst")}</>,
          },
        ]}
        number="01"
        phase={en("Preparation Phase")}
        intro="สรุปสเปกเครื่องและบริการคลาวด์ที่ต้องเตรียมให้พร้อมก่อนเริ่มงานพัฒนา"
      >
        <div className="nct-cols">
          <div>
            <h3 className="nct-densehead">เครื่องและระบบปฏิบัติการ</h3>
            <BulletList
              dense
              items={[
                { text: <>{en("PRD")} · 4 คอร์ / 16GB / {en("SSD")} 300GB</> },
                { text: <>{en("QA")} · 4 คอร์ / 16GB / {en("SSD")} 150GB</> },
                { text: <>{en("Windows Server 2022")} ทั้งสองเครื่อง</> },
              ]}
            />
          </div>
          <div>
            <h3 className="nct-densehead">บริการคลาวด์ที่ต้องเปิด</h3>
            <BulletList
              dense
              items={[
                { text: <>{en("Lambda")} · {en("PRD")} และ {en("QA")}</> },
                { text: <>{en("EC2")} · แยกกลุ่มความปลอดภัยแอปกับฐานข้อมูล</> },
                { text: <>{en("Cognito")} · เข้าสู่ระบบด้วยบัญชีองค์กร</> },
              ]}
            />
          </div>
        </div>
      </SlidePhaseCard>
      {/* 16 with rowSpan + groupColumn: the deliverables matrix, no new layout */}
      <SlideDenseTable
        title={en("5. Implementation Stage")}
        intro="เอกสารส่งมอบรายเฟส และจุดที่ต้องลงนามรับก่อนเดินหน้าต่อ"
        groupColumn={0}
        widths={[2.2, 5.2, 1.4, 1.8]}
        columns={[
          { label: en("IMPLEMENTATION STAGE") },
          { label: en("DELIVERABLES") },
          { label: en("FORMAT"), align: "center" },
          { label: en("SIGN-OFF"), align: "center" },
        ]}
        rows={[
          [
            { value: "1. เตรียมโครงการ" },
            { value: "เอกสารเปิดโครงการ" },
            { value: en("PDF"), align: "center" },
            { value: "ไม่ต้องลงนาม", align: "center" },
          ],
          [
            { value: "2. วิเคราะห์และออกแบบ", rowSpan: 2 },
            { value: <>{en("Software Requirement Specification (SRS)")}</> },
            { value: en("Word"), align: "center" },
            { value: "ต้องลงนาม", align: "center", status: "ok" },
          ],
          [
            null,
            { value: <>{en("Business Process Flow (BPF)")}</> },
            { value: en("Word"), align: "center" },
            { value: "ต้องลงนาม", align: "center", status: "ok" },
          ],
          [
            { value: "3. พัฒนา", rowSpan: 2 },
            { value: "ซอร์สโค้ดและไฟล์โซลูชัน" },
            { value: en("Solution"), align: "center" },
            { value: "ไม่ต้องลงนาม", align: "center" },
          ],
          [
            null,
            { value: "พจนานุกรมข้อมูลและโครงสร้างตาราง" },
            { value: en("Excel"), align: "center" },
            { value: "ไม่ต้องลงนาม", align: "center" },
          ],
          [
            { value: "4. ทดสอบ" },
            { value: <>สถานการณ์ทดสอบ หลักฐาน และผล {en("UAT")}</> },
            { value: en("Excel"), align: "center" },
            { value: "ต้องลงนาม", align: "center", status: "ok" },
          ],
          [
            { value: "5. ขึ้นระบบและรับประกัน", rowSpan: 2 },
            { value: "คู่มือผู้ใช้และผู้ดูแลระบบ" },
            { value: en("Word"), align: "center" },
            { value: "ไม่ต้องลงนาม", align: "center" },
          ],
          [
            null,
            { value: "เอกสารอบรมและแผนถ่ายทอดความรู้" },
            { value: en("Excel"), align: "center" },
            { value: "ไม่ต้องลงนาม", align: "center" },
          ],
        ]}
        takeaway="สามจุดที่ต้องลงนามคือ SRS, BPF และผล UAT — ทั้งสามอยู่ก่อนวันขึ้นระบบ"
      />
      {/* 18 · evidence strip. Real decks put screenshots of the real system
          here; the demo only has the three house architecture frames. */}
      <SlideEvidence
        title={en("8. Project Training")}
        kicker="วัตถุประสงค์ของการอบรม"
        takeaway="อบรมสองหลักสูตร รวม 8 ชั่วโมง จบภายในสัปดาห์เดียวก่อนวันขึ้นระบบ"
        figures={[
          { src: photoSection, alt: "", caption: "อบรมที่สำนักงานลูกค้า 20–50 คน" },
          { src: photoFacade, alt: "", caption: "อบรมกลุ่มย่อยในห้องประชุม 2–20 คน" },
          { src: photoTower, alt: "", caption: <>อบรมออนไลน์ผ่าน {en("MS Teams")}</> },
        ]}
      >
        <DataTable
          widths={[2.2, 3.4, 1.2, 2.4]}
          columns={[
            "หลักสูตร",
            "วัตถุประสงค์",
            { label: "ระยะเวลา", align: "center" },
            "เงื่อนไขการจัด",
          ]}
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
    </Deck>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
