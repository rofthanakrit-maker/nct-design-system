import { BulletList, Slide, SlideTitle } from "@nct/slides";

const en = (s: string) => <span lang="en">{s}</span>;

/* SlideTitle is a fragment — the h2 plus the rule under it — so it is only ever
   true inside a Slide. Every layout with a title starts with exactly this. */

/** The house title: Kanit at the h1 step, the accent rule immediately under it. */
export const House = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={3}>
    <SlideTitle>ขอบเขตบริการของ NCT</SlideTitle>
    <div className="nct-body">
      <BulletList items={["หัวเรื่องหนึ่งบรรทัดคือค่ามาตรฐาน"]} />
    </div>
  </Slide>
);

/** Under corp the rule runs full-bleed, edge to edge. Same component. */
export const Corp = () => (
  <Slide brand="corp" date="Updated date: 2026.09.07" pageNumber={2}>
    <SlideTitle>{en("5. Implementation Stage")}</SlideTitle>
    <div className="nct-body">
      <BulletList items={["หัวเรื่องภาษาอังกฤษใช้ตัวเลขนำเหมือนต้นฉบับ"]} />
    </div>
  </Slide>
);
