import { BulletList, Slide, SlideTitle } from "@nct/slides";

/* Slide is the canvas every layout is built on: 1280×720, the chrome, and the
   tone. Reach for it directly only when no layout fits — the twenty layouts
   are the vocabulary, this is the frame under them. */

/** The default light tone with the house chrome: title, rule, body box. */
export const Light = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={3}>
    <SlideTitle>โครงสร้างของสไลด์หนึ่งหน้า</SlideTitle>
    <div className="nct-body">
      <BulletList
        items={[
          "หัวเรื่องและเส้นใต้มาจาก SlideTitle",
          { text: "เนื้อหาทั้งหมดอยู่ในกล่อง .nct-body", level: 2 },
          "แถบท้ายหน้าและเลขหน้ามาจาก Deck",
        ]}
      />
    </div>
  </Slide>
);

/** `tone="tint"` — the quiet ground layout 07 uses. */
export const Tint = () => (
  <Slide tone="tint" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={4}>
    <SlideTitle>พื้นหลังแบบ tint</SlideTitle>
    <div className="nct-body">
      <BulletList items={["ใช้กับสไลด์ที่ต้องการให้เงียบลงหนึ่งระดับ", "ข้อความยังเป็นหมึกสีเดิม"]} />
    </div>
  </Slide>
);

/** `tone="dark"` flips the text to paper — the ground the section dividers use.
    No SlideTitle here: `.nct-title` is fixed to the heading ink and disappears
    on a dark ground, which is why layouts 02/15 set their own title. */
export const Dark = () => (
  <Slide tone="dark" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={5}>
    <div className="nct-body">
      <BulletList
        onDark
        items={[
          "ตัวอักษรกลับเป็นสีกระดาษอัตโนมัติ",
          { text: "ใช้กับหน้าคั่นบทและหน้าปิด", level: 2 },
          "หัวเรื่องบนพื้นเข้มใช้ของเลย์เอาต์ 02/15 ไม่ใช่ SlideTitle",
        ]}
      />
    </div>
  </Slide>
);

/** `brand="corp"` swaps the furniture: full-bleed rule, corner lockup with a
    partner mark, and the three-segment foot bar. The grid does not move. */
export const CorpChrome = () => (
  <Slide brand="corp" partnerMark="AGE" date="Updated date: 2026.09.07" pageNumber={6}>
    <SlideTitle>โครงสร้างเดียวกันภายใต้แบรนด์ corp</SlideTitle>
    <div className="nct-body">
      <BulletList items={["เฟอร์นิเจอร์เปลี่ยน กริดไม่เปลี่ยน", "สีเน้นเปลี่ยนตามแบรนด์"]} />
    </div>
  </Slide>
);
