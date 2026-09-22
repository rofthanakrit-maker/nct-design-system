import { BulletList, Slide, SlideTitle } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/** The three levels: teal dot, en-dash, mid-dot. Five level-1 lines is the
    ceiling on a content slide. */
export const ThreeLevels = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={14}>
    <SlideTitle>ขอบเขตบริการของ NCT</SlideTitle>
    <div className="nct-body">
      <BulletList
        items={[
          "วางระบบโครงสร้างพื้นฐานไอทีสำหรับองค์กร",
          { text: "ออกแบบเครือข่าย ระบบสำรองข้อมูล และความปลอดภัย", level: 2 },
          { text: "รวมถึงแผนกู้คืนระบบและการซ้อมกู้คืนประจำปี", level: 3 },
          "ดูแลระบบต่อเนื่องแบบ Managed Service",
          { text: "มีทีมซัพพอร์ตตอบกลับภายใน SLA ที่ตกลงกัน", level: 2 },
        ]}
      />
    </div>
  </Slide>
);

/** `dense` is the 10pt floor used inside cards and phase panels, where a full
    body-size list would not fit. */
export const Dense = () => (
  <Slide brand="corp" date="Updated date: 2026.09.07" pageNumber={4}>
    <SlideTitle>เครื่องและบริการที่ต้องเตรียม</SlideTitle>
    <div className="nct-body">
      <div className="nct-cols">
        <div>
          <h3 className="nct-densehead">เครื่องและระบบปฏิบัติการ</h3>
          <BulletList
            dense
            items={[
              { text: <>{en("PRD")} · 4 คอร์ / 16GB / {en("SSD")} 300GB</> },
              { text: <>{en("QA")} · 4 คอร์ / 16GB / {en("SSD")} 150GB</> },
            ]}
          />
        </div>
        <div>
          <h3 className="nct-densehead">บริการคลาวด์ที่ต้องเปิด</h3>
          <BulletList
            dense
            items={[
              { text: <>{en("Lambda")} · {en("PRD")} และ {en("QA")}</> },
              { text: <>{en("Cognito")} · เข้าสู่ระบบด้วยบัญชีองค์กร</> },
            ]}
          />
        </div>
      </div>
    </div>
  </Slide>
);

/** `onDark` flips the marks and the ink for a dark ground. The slide carries
    no SlideTitle: that heading is fixed to the heading ink and vanishes here. */
export const OnDark = () => (
  <Slide tone="dark" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={15}>
    <div className="nct-body">
      <BulletList
        onDark
        items={[
          "คีย์จุดเดียว ระบบกระจายต่อให้อัตโนมัติ",
          { text: "ลดเวลาคีย์ต่อใบจาก 4 นาที เหลือ 40 วินาที", level: 2 },
          "ปิดงบภายใน 2 วันทำการ",
          { text: "บันทึกทุกการแก้ไขพร้อมผู้ทำและเวลา", level: 2 },
        ]}
      />
    </div>
  </Slide>
);
