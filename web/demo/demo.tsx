import { createRoot } from "react-dom/client";
import {
  BulletList,
  CategoryKey,
  ClipboardCheck,
  FileInput,
  Layers,
  Timer,
  DataTable,
  Deck,
  DiagramBox,
  DiagramGroup,
  DiagramLink,
  Icon,
  SlideAgenda,
  SlideBeforeAfter,
  SlideChart,
  SlideClients,
  SlideClosing,
  SlideComposition,
  SlideContent,
  SlideCover,
  SlideCoverGradient,
  SlideDenseTable,
  SlideDiagram,
  SlideEvidence,
  SlideFourCards,
  SlideFullImage,
  SlideKeyFigures,
  SlideKpiTrend,
  SlidePhaseCard,
  SlidePlan,
  SlideProcessFlow,
  SlideQuote,
  SlideSection,
  SlideSplitPanel,
  SlideTable,
  SlideTeam,
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
   Each of the twenty layouts still appears exactly once — the 1:1 parity with
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

/** The house deck: layouts 01–16, 19 and 20, web brand. 17–18 are in the corp deck. */
function WebDeck() {
  return (
    <Deck brand="web" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569">
      {/* 01 · cover — the web split. Unnumbered: a cover is not page 1 of anything. */}
      <SlideCover
        hideFooter
        title="ข้อเสนอโครงการวางระบบบัญชีอัตโนมัติ"
        subtitle={<>{en("New Computer Technology Consulting Co., Ltd.")} · 2569</>}
      />
      {/* 20 · the other cover. A real deck ships one; both are here because the
          demo shows every layout once. Different copy on purpose, so the pair
          reads as a choice: paper fronts a bid, this one fronts a talk. */}
      <SlideCoverGradient
        hideFooter
        title="เปลี่ยนงานบัญชีให้ระบบทำแทน"
        subtitle={<>{en("NCT")} · สัมมนาลูกค้า 2569</>}
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
      {/* 23 · the trend behind it: the month documents peak is the month the close runs longest */}
      <SlideKpiTrend
        title="เอกสารเกินกำลังคีย์ 1,200 ใบครั้งแรกเดือน พ.ค."
        tiles={[
          { label: "เอกสารเข้า มิ.ย.", value: "1,150 ใบ", delta: { text: "15% จาก ม.ค.", direction: "up", good: false } },
          { label: "เวลาคีย์ต่อใบ", value: "4 นาที", delta: { text: "0.5 นาที จากปีก่อน", direction: "down", good: true } },
          { label: "ชั่วโมงคีย์ต่อเดือน", value: "77 ชม.", delta: { text: "10 ชม. จาก ม.ค.", direction: "up", good: false } },
        ]}
        trend={{
          name: "เอกสารเข้า",
          categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
          values: [1000, 1100, 1000, 1200, 1350, 1150],
          unit: "ใบต่อเดือน",
          target: { value: 1200, label: "กำลังคีย์ 1,200 ใบ" },
        }}
        source="ระบบบัญชีของลูกค้า · ม.ค.–มิ.ย. 2569"
        takeaway="เดือนที่เกินกำลังคีย์คือเดือนที่ปิดงบนานสุด ต้องลดงานคีย์ ไม่ใช่เพิ่มคน"
      />
      <SlideTwoColumn
        title="ก่อนและหลังใช้บริการ"
        leftKicker="ก่อน"
        left={["ระบบล่มบ่อย ไม่มีคนดูแลประจำ", "ค่าใช้จ่ายไม่แน่นอน"]}
        rightKicker="หลัง"
        right={["มอนิเตอร์ 24 ชั่วโมง แจ้งเตือนอัตโนมัติ", "ค่าใช้จ่ายคงที่ต่อเดือน"]}
      />
      <SlideFourCards
        title="สี่ผลลัพธ์ที่ข้อเสนอนี้ให้"
        cards={[
          { heading: <><Icon icon={FileInput} tone="accent" /> ลดงานคีย์ซ้ำ</>, body: "รับเอกสารเข้าระบบเดียว แล้วกระจายต่อให้ทุกปลายทางอัตโนมัติ" },
          { heading: <><Icon icon={ClipboardCheck} tone="accent" /> ตรวจสอบได้</>, body: "ทุกรายการมี audit trail ผู้ทำ เวลา และค่าก่อนหลัง" },
          { heading: <><Icon icon={Timer} tone="accent" /> ปิดงบเร็วขึ้น</>, body: "กระทบยอดอัตโนมัติรายวัน ไม่ต้องรอสิ้นเดือน" },
          { heading: <><Icon icon={Layers} tone="accent" /> ขยายต่อได้</>, body: "เพิ่มกระบวนการใหม่โดยไม่แก้ของเดิม" },
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
        takeaway="ทีมเดียวดูแลครบทั้งสามด้าน ไม่ต้องประสานผู้รับจ้างหลายราย"
      />
      <SlideKeyFigures
        title="ตัวเลขที่บอกเรื่องเรา"
        figures={[
          { value: "12", label: "ปีที่ให้บริการองค์กรไทย" },
          { value: "99.9%", label: <>{en("Uptime")} เฉลี่ยของระบบที่ดูแล</> },
          { value: "24/7", label: "ทีมเฝ้าระวังและตอบกลับ" },
        ]}
        footnote="ข้อมูล ณ ไตรมาส 1 ปี 2569"
        takeaway="ระบบที่เราดูแลหยุดรวมไม่ถึง 9 ชั่วโมงต่อปี"
      />
      {/* 24 · what it did for a client like this one; the layout sorts the rows */}
      <SlideBeforeAfter
        title="ลูกค้ารายเดิมลดงานบัญชีจาก 114 เหลือ 31 ชั่วโมงต่อเดือน"
        rows={[
          { label: "ปิดงบสิ้นเดือน", before: 48, after: 16 },
          { label: "คีย์ใบแจ้งหนี้ซื้อ", before: 28, after: 3 },
          { label: "กระทบยอดธนาคาร", before: 16, after: 2 },
          { label: "ออกใบแจ้งหนี้ขาย", before: 12, after: 4 },
          { label: "ติดตามลูกหนี้", before: 10, after: 6 },
        ]}
        unit="ชม."
        better="lower"
        intro="ชั่วโมงทำงานต่อเดือน · น้อยกว่าดีกว่า"
        source="ลูกค้าธุรกิจค้าปลีก ปี 2568 · วัดก่อนขึ้นระบบและหลังขึ้นระบบ 3 เดือน"
        takeaway="ปิดงบลดได้มากสุด ไม่ใช่งานคีย์ เพราะระบบกระทบยอดให้ทุกวัน"
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
      {/* 22 · where the money goes: one bar, so the breakdown carries the values */}
      <SlideComposition
        title="ครึ่งหนึ่งของงบ 4.8 ล้านบาท คือค่าพัฒนาระบบ"
        total="4.8 ล้านบาท"
        totalLabel="งบโครงการรวมทั้งสิ้น"
        intro="รวมภาษีมูลค่าเพิ่ม · สัญญา 12 เดือน ไม่รวมค่าบริการรายเดือนหลังปีแรก"
        segments={["พัฒนาและตั้งค่าระบบ", "ไลเซนส์ซอฟต์แวร์", "คลาวด์ปีแรก", "อื่น ๆ"]}
        other
        bars={[{ label: "งบโครงการ", values: [2.4, 1.2, 0.7, 0.5] }]}
        unit="ล้านบาท"
        source="ใบเสนอราคา NCT-2569-041 · ปัดเป็นแสนบาท"
        takeaway="ไลเซนส์กับคลาวด์รวมกันไม่ถึง 40% งบส่วนใหญ่จ่ายให้งานที่ทำครั้งเดียว"
      />
      {/* the ask. The thank-you is the title; the content is what happens next.
          Web brand: the cover's split mirrored, the handshake heads the contact card. */}
      <SlideClosing
        image={photoHandshake}
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
      {/* 01 · the corp cover: centred and watermarked. The house deck opens on
          the split instead; the gradient one is layout 20 in both. */}
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
      {/* 21 · the whole plan; phase 1 is the phase card's "01" */}
      <SlidePlan
        title="แผนงาน 12 เดือน ขึ้นระบบต้นเดือนที่ 7"
        periods={["ด.1", "ด.2", "ด.3", "ด.4", "ด.5", "ด.6", "ด.7", "ด.8", "ด.9", "ด.10", "ด.11", "ด.12"]}
        rows={[
          { label: "เตรียมระบบ", start: 0, end: 1, duration: "4 สัปดาห์" },
          { label: "วิเคราะห์และออกแบบ", start: 1, end: 2.5, duration: "6 สัปดาห์", milestone: { at: 2.5, label: "ตรวจรับงวด 1" } },
          { label: "พัฒนาและตั้งค่าระบบ", start: 2.5, end: 5, duration: "10 สัปดาห์" },
          { label: "ทดสอบ UAT", start: 5, end: 6, duration: "4 สัปดาห์", milestone: { at: 6, label: "ตรวจรับงวด 2" } },
          { label: "อบรมผู้ใช้", start: 5.75, end: 6, duration: "1 สัปดาห์" },
          { label: "ขึ้นระบบ", start: 6, end: 6.5, duration: "2 สัปดาห์" },
          { label: "ดูแลหลังขึ้นระบบ", start: 6.5, end: 9.5, duration: "3 เดือน", milestone: { at: 9.5, label: "ตรวจรับงวด 3" } },
          { label: "รับประกันระบบ", start: 9.5, end: 12, duration: "2.5 เดือน" },
        ]}
        highlight={5}
        assumption="นับจากวันลงนามสัญญา · หน่วย: เดือน"
        takeaway="ขึ้นระบบต้นเดือนที่ 7 ตรวจรับ 3 งวดตามจุดส่งมอบ"
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
      {/* 26 · who already runs it. Microsoft's stock fictional companies, as
          names in the logo slot: the demo has no client logos to show. */}
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
      />
      {/* 25 · who does the work: the lead over four roles, credentials as the TOR asks */}
      <SlideTeam
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
      />
    </Deck>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
