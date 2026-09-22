import { SlideKeyFigures } from "@nct/slides";

/** Latin script inside a Thai document — tagged so a screen reader switches voice. */
const en = (s: string) => <span lang="en">{s}</span>;

/** 06 in the house brand: three numbers, baseline-aligned, one source line. */
export const House = () => (
  <SlideKeyFigures
    title="ตัวเลขที่บอกเรื่องเรา"
    figures={[
      { value: "12", label: "ปีที่ให้บริการองค์กรไทย" },
      { value: "99.9%", label: <>{en("Uptime")} เฉลี่ยของระบบที่ดูแล</> },
      { value: "24/7", label: "ทีมเฝ้าระวังและตอบกลับ" },
    ]}
    footnote="ข้อมูล ณ ไตรมาส 1 ปี 2569"
    footer="NCT · ข้อเสนอโครงการระบบบัญชี"
    date="2569"
    pageNumber={12}
  />
);

/** The same slide under the mandatory proposal chrome — only the furniture moves. */
export const Corp = () => (
  <SlideKeyFigures
    brand="corp"
    partnerMark="AGE"
    title={en("3. Why NCT")}
    figures={[
      { value: "12", label: <>{en("Years serving Thai enterprises")}</> },
      { value: "99.9%", label: <>{en("Average uptime under management")}</> },
      { value: "24/7", label: <>{en("Monitoring and response")}</> },
    ]}
    footnote={en("As of Q1 2026")}
    date="Updated date: 2026.09.07"
    pageNumber={4}
  />
);
