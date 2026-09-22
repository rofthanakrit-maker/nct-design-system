import { Banknote, Icon, Lock, ShieldCheck, Slide, SlideTitle, Timer, TrendingUp, Truck } from "@nct/slides";

/* An icon is set like a word: sized to a type step, coloured by a role token,
   and always beside the words rather than instead of them. The glyphs ship
   inside the package — import them from "@nct/slides", never draw an SVG.

   Every cell renders inside a Slide because the system's typography is scoped
   to `.nct-slide`: outside it, the words next to the glyph fall back to the
   browser's default serif and the size steps mean nothing. */

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>{children}</div>
);

/** The type steps: omit `size` and the glyph matches the text around it (1em). */
export const Sizes = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={21}>
    <SlideTitle>ขนาดของไอคอนตามขั้นตัวอักษร</SlideTitle>
    <div className="nct-body">
      <Row><Icon icon={Timer} size="label" /> label · ป้ายกำกับ</Row>
      <Row><Icon icon={Timer} size="body" /> body · เนื้อความปกติ</Row>
      <Row><Icon icon={Timer} size="lead" /> lead · ย่อหน้านำ</Row>
      <Row><Icon icon={Timer} size="h1" /> h1 · หัวเรื่องสไลด์</Row>
    </div>
  </Slide>
);

/** The role tones: `accent` on paper, `heading` and `ink-2` for quieter marks.
    There is no status colour here — an icon never carries ok/warn/risk. */
export const Tones = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={22}>
    <SlideTitle>สีของไอคอนตามบทบาท</SlideTitle>
    <div className="nct-body">
      <Row><Icon icon={Banknote} tone="accent" /> accent · ค่าบริการรายเดือน</Row>
      <Row><Icon icon={TrendingUp} tone="heading" /> heading · แนวโน้มที่โตขึ้น</Row>
      <Row><Icon icon={Truck} tone="ink-2" /> ink-2 · งานส่งมอบ</Row>
    </div>
  </Slide>
);

/** `accent-up` and `on-dark` are the dark-ground pair — the same rule the text
    follows, so an icon never ends up the only unreadable thing on the slide. */
export const OnDark = () => (
  <Slide tone="dark" footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={23}>
    <div className="nct-body">
      <Row><Icon icon={ShieldCheck} tone="accent-up" /> accent-up · ผ่านการตรวจสอบ</Row>
      <Row><Icon icon={Lock} tone="on-dark" /> on-dark · สิทธิ์เข้าถึงระบบ</Row>
    </div>
  </Slide>
);

/** `label` names the glyph for a screen reader — needed only when the words
    beside it do not already say the same thing. */
export const Labelled = () => (
  <Slide footer="NCT · ข้อเสนอโครงการระบบบัญชี" date="2569" pageNumber={24}>
    <SlideTitle>ไอคอนที่ต้องมีคำอธิบายเสียง</SlideTitle>
    <div className="nct-body">
      <Row><Icon icon={ShieldCheck} tone="accent" label="ผ่านการตรวจสอบแล้ว" /> ระบบผ่านการตรวจสอบความปลอดภัยประจำปี</Row>
    </div>
  </Slide>
);
