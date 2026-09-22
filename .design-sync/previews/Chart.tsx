import { Chart, Slide, SlideTitle } from "@nct/slides";

/* Chart draws the mark only — the slide furniture around it is layout 19
   (SlideChart). Use it bare like this when a chart shares a slide with
   something else. `width` and `height` are required: the SVG has no intrinsic
   size and collapses to nothing without them. Layout 19 draws it at 806×365.

   Every colour is a --nct-cat-* var, and series colour never goes on text. */

const BOX = { width: 806, height: 365 } as const;

/** Column with one category emphasised: it keeps cat-1, the rest go mute. */
export const ColumnHighlight = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={7}>
    <SlideTitle>เวลาปิดงบรายเดือน</SlideTitle>
    <div className="nct-body">
      <Chart
        {...BOX}
        kind="column"
        unit="วันทำการ"
        categories={["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."]}
        series={{ name: "เวลาปิดงบ", values: [6, 7, 6, 8, 9, 7] }}
        highlight={4}
      />
    </div>
  </Slide>
);

/** Bar, for names too long to stand under a column — eight is the ceiling. */
export const BarByProcess = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={8}>
    <SlideTitle>ปริมาณเอกสารต่อเดือนรายกระบวนการ</SlideTitle>
    <div className="nct-body">
      <Chart
        {...BOX}
        kind="bar"
        unit="ใบต่อเดือน"
        categories={["ใบแจ้งหนี้ซื้อ", "กระทบยอดใบสั่งซื้อ", "ใบแจ้งหนี้ขาย", "ค่าใช้จ่ายพนักงาน"]}
        series={{ name: "ปริมาณ", values: [420, 380, 260, 310] }}
        highlight={0}
      />
    </div>
  </Slide>
);

/** Two lines, the first emphasised — the trend form. Four lines is the ceiling. */
export const LineTrend = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={9}>
    <SlideTitle>เอกสารเข้าเทียบกับกำลังคีย์</SlideTitle>
    <div className="nct-body">
      <Chart
        {...BOX}
        kind="line"
        unit="ใบต่อเดือน"
        categories={["2565", "2566", "2567", "2568", "2569"]}
        series={[
          { name: "เอกสารเข้า", values: [620, 780, 910, 1080, 1200] },
          { name: "กำลังคีย์ต่อเดือน", values: [700, 760, 800, 820, 840] },
        ]}
        highlight={0}
      />
    </div>
  </Slide>
);

/** Stacked part-to-whole, with the tail folded into the `"mute"` slot. */
export const StackedMix = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={10}>
    <SlideTitle>สัดส่วนงานอัตโนมัติรายไตรมาส</SlideTitle>
    <div className="nct-body">
      <Chart
        {...BOX}
        kind="stacked"
        unit="ใบต่อเดือน"
        categories={["Q1", "Q2", "Q3", "Q4"]}
        series={[
          { name: "อัตโนมัติเต็มรูป", values: [120, 340, 620, 880] },
          { name: "กึ่งอัตโนมัติ", values: [300, 380, 320, 200] },
          { name: "คีย์มือ", values: [780, 480, 260, 120], slot: "mute" },
        ]}
      />
    </div>
  </Slide>
);
