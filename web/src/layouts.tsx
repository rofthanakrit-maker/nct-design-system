import type { ReactNode } from "react";
import { Slide, SlideTitle, type SlideChromeProps } from "./Slide";
import {
  BulletList,
  DataTable,
  NctLogo,
  TakeawayBand,
  type BulletItem,
  type DataTableProps,
} from "./primitives";

/* The 16 layouts of NCT-Slide-Template.potx, one component each. Names, slots
   and geometry mirror the .potx so a design made here can be rebuilt in
   PowerPoint by picking the layout of the same number. */

type Base = SlideChromeProps & { fit?: boolean };

/* ---------------------------------------------------------------- 01 */
export interface SlideCoverProps extends Base {
  title: ReactNode;
  /** Client name, tagline or date — one line under the rule. */
  subtitle?: ReactNode;
}

/** 01 · Title Slide. The deck's cover — navy→teal gradient, full lockup. Use once. */
export function SlideCover({ title, subtitle, ...chrome }: SlideCoverProps) {
  return (
    <Slide tone="open" {...chrome}>
      <div className="nct-decor" style={{ right: -160, top: -160, width: 480, height: 480 }} />
      <div className="nct-decor" style={{ right: -60, top: 300, width: 288, height: 288 }} />
      <NctLogo variant="white" className="nct-cover__logo" width={269} />
      <h1 className="nct-cover__title">{title}</h1>
      <div className="nct-cover__rule" />
      {subtitle && <div className="nct-cover__sub">{subtitle}</div>}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 02 */
export interface SlideSectionProps extends Base {
  /** Chapter number — typed by hand, e.g. "01". */
  number?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Photograph for the right 40% of the slide. Omit for the plain navy divider. */
  image?: string;
  imageAlt?: string;
}

/** The photo band layouts 02 and 15 share: right 40%, faded into the navy panel.
 *  Without an image the original teal wedge stands in. */
function SectionBand({ image, alt }: { image?: string; alt?: string }) {
  if (!image) return <div className="nct-section__wedge" />;
  return (
    <>
      <img className="nct-section__photo" src={image} alt={alt ?? ""} />
      <div className="nct-section__fade" />
      <div className="nct-section__photo-foot" />
    </>
  );
}

/** 02 · Section Divider. Breaks the deck every 4–8 slides. Solid navy, photo optional. */
export function SlideSection({
  number, title, description, image, imageAlt = "", ...chrome
}: SlideSectionProps) {
  return (
    <Slide tone="dark" {...chrome}>
      <SectionBand image={image} alt={imageAlt} />
      {number && <div className="nct-section__num">{number}</div>}
      <div className="nct-section__rule" />
      <h2 className={image ? "nct-section__title nct-section__title--photo" : "nct-section__title"}>
        {title}
      </h2>
      {description && (
        <div className={image ? "nct-section__desc nct-section__desc--photo" : "nct-section__desc"}>
          {description}
        </div>
      )}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 03 */
export interface SlideContentProps extends Base {
  title: ReactNode;
  items: BulletItem[];
}

/** 03 · Title and Content. The workhorse. Five level-1 lines is the ceiling. */
export function SlideContent({ title, items, ...chrome }: SlideContentProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <BulletList items={items} />
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 04 */
export interface SlideTwoColumnProps extends Base {
  title: ReactNode;
  left: BulletItem[];
  right: BulletItem[];
}

/** 04 · Two Column. Before/after, pros/cons. Left is always the current state. */
export function SlideTwoColumn({ title, left, right, ...chrome }: SlideTwoColumnProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-cols">
          <BulletList items={left} />
          <BulletList items={right} />
        </div>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 05 */
export interface CardItem {
  heading: ReactNode;
  body?: ReactNode;
}

export interface SlideThreeCardsProps extends Base {
  title: ReactNode;
  /** Exactly three. Cards are a fixed height — trim copy, never stretch them. */
  cards: [CardItem, CardItem, CardItem];
}

/** 05 · Three Cards. Three parallel points on the THIRD grid. */
export function SlideThreeCards({ title, cards, ...chrome }: SlideThreeCardsProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-cards nct-cards--3">
          {cards.map((c, i) => (
            <div className="nct-card" key={i}>
              <div className="nct-card__tab" />
              <h3 className="nct-card__heading">{c.heading}</h3>
              {c.body && <p className="nct-card__body">{c.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 06 */
export interface FigureItem {
  /** The number itself — short. "99.9%", "24/7", "12". */
  value: ReactNode;
  label: ReactNode;
}

export interface SlideKeyFiguresProps extends Base {
  title: ReactNode;
  figures: [FigureItem, FigureItem, FigureItem];
  /** Source line under the figures. */
  footnote?: ReactNode;
}

/** 06 · Key Figures. Three numbers you want remembered. Baseline-aligned. */
export function SlideKeyFigures({ title, figures, footnote, ...chrome }: SlideKeyFiguresProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body" style={{ top: 268.8 }}>
        <div className="nct-figures">
          {figures.map((f, i) => (
            <div className="nct-figure" key={i}>
              <div className="nct-figure__value">{f.value}</div>
              <div className="nct-figure__label">{f.label}</div>
            </div>
          ))}
        </div>
        {footnote && <p className="nct-caption" style={{ marginTop: 57.6 }}>{footnote}</p>}
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 07 */
export interface SlideQuoteProps extends Base {
  quote: ReactNode;
  /** "Name — role, company". */
  attribution?: ReactNode;
}

/** 07 · Pull Quote. Testimonials and customer words. Tinted ground. */
export function SlideQuote({ quote, attribution, ...chrome }: SlideQuoteProps) {
  return (
    <Slide tone="tint" {...chrome}>
      <div className="nct-quote__bar" />
      <div className="nct-quote__mark">&ldquo;</div>
      <blockquote className="nct-quote__text">{quote}</blockquote>
      <div className="nct-quote__rule" />
      {attribution && <div className="nct-quote__by">{attribution}</div>}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 08 */
export interface SlideFullImageProps extends Base {
  /** Full-bleed image URL. Real work or real screenshots — never stock office. */
  src?: string;
  alt?: string;
  title: ReactNode;
  caption?: ReactNode;
}

/** 08 · Full Image. Chapter opener over photography. The scrim is not optional. */
export function SlideFullImage({ src, alt = "", title, caption, ...chrome }: SlideFullImageProps) {
  return (
    <Slide tone="deep" {...chrome}>
      {src && <img className="nct-image__media" src={src} alt={alt} />}
      <div className="nct-image__scrim" />
      <h2 className="nct-image__title">{title}</h2>
      {caption && <div className="nct-image__caption">{caption}</div>}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 09 */
export interface SlideTableProps extends Base, Pick<DataTableProps, "columns" | "rows" | "widths"> {
  title: ReactNode;
  /** One-line lead-in above the table. */
  intro?: ReactNode;
}

/** 09 · Table / Comparison. Package or spec comparison at 14pt. */
export function SlideTable({ title, intro, columns, rows, widths, ...chrome }: SlideTableProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {intro && <p className="nct-caption" style={{ margin: 0 }}>{intro}</p>}
        <div style={{ marginTop: 33.6 }}>
          <DataTable columns={columns} rows={rows} widths={widths} size="roomy" />
        </div>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 10 */
export interface SlideClosingProps extends Base {
  title?: ReactNode;
  /** Contact lines — phone, email, site. */
  contact?: ReactNode[];
  /** Photograph for the right 40%. It takes the place of the top-right diamond. */
  image?: string;
  imageAlt?: string;
  /**
   * How `image` is placed. "band" is the right-hand strip layouts 02 and 15 use.
   * "full" runs the photograph across the whole slide behind a scrim — for a
   * subject that needs room to read, where a 40% strip would crop it to mush.
   */
  imageMode?: "band" | "full";
}

/** 10 · Closing / Contact. Teal→navy, the bookend to layout 01. Use once. */
export function SlideClosing({
  title = "ขอบคุณครับ", contact = [], image, imageAlt = "", imageMode = "band", ...chrome
}: SlideClosingProps) {
  const full = Boolean(image) && imageMode === "full";
  const band = Boolean(image) && !full;
  return (
    <Slide tone="close" {...chrome}>
      {full ? (
        <>
          <img className="nct-closing__photo" src={image} alt={imageAlt} />
          <div className="nct-closing__scrim" />
          <div className="nct-closing__scrim-foot" />
        </>
      ) : (
        <div className="nct-decor" style={{ left: -144, top: 432, width: 384, height: 384 }} />
      )}
      {band ? (
        <SectionBand image={image} alt={imageAlt} />
      ) : !full && (
        <div className="nct-decor" style={{ right: -48, top: -48, width: 336, height: 336 }} />
      )}
      <h2
        className={image ? "nct-section__title nct-section__title--photo" : "nct-section__title"}
        style={{ top: 163.2 }}
      >
        {title}
      </h2>
      <div className="nct-cover__rule" style={{ top: 307.2 }} />
      <div className={full ? "nct-closing__contact nct-closing__contact--full" : "nct-closing__contact"}>
        {contact.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <NctLogo
        variant="white"
        className={image ? "nct-closing__logo nct-closing__logo--photo" : "nct-closing__logo"}
        width={269}
      />
    </Slide>
  );
}

/* ---------------------------------------------------------------- 11 */
export interface SlideSplitPanelProps extends Base {
  title: ReactNode;
  /** Left, dark panel — the current state. Never swap the sides. */
  contextKicker?: ReactNode;
  context: BulletItem[];
  /** Right, tinted panel — what will happen. */
  outcomeKicker?: ReactNode;
  outcome: BulletItem[];
  takeawayLabel?: string;
  takeaway?: ReactNode;
}

/** 11 · Split Panel. Current state vs proposal, with a one-line conclusion. */
export function SlideSplitPanel({
  title,
  contextKicker = "สภาพปัจจุบัน",
  context,
  outcomeKicker = "สิ่งที่จะเกิดขึ้น",
  outcome,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideSplitPanelProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-cols">
          <div className="nct-panel nct-panel--dark">
            <h3 className="nct-panel__kicker">{contextKicker}</h3>
            <BulletList items={context} dense onDark />
          </div>
          <div className="nct-panel nct-panel--tint">
            <h3 className="nct-panel__kicker">{outcomeKicker}</h3>
            <BulletList items={outcome} dense />
          </div>
        </div>
        {takeaway && (
          <div style={{ marginTop: 14.4 }}>
            <TakeawayBand label={takeawayLabel}>{takeaway}</TakeawayBand>
          </div>
        )}
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 12 */
export interface NumberedCard extends CardItem {
  /** "01"–"04". Omit and the index is used. */
  number?: string;
}

export interface SlideFourCardsProps extends Base {
  title: ReactNode;
  /** Four is the ceiling. Five points means layout 13, or two slides. */
  cards: [NumberedCard, NumberedCard, NumberedCard, NumberedCard];
  bandLabel?: string;
  band?: ReactNode;
}

/** 12 · Four Cards + Band. Four parallel points, category-coded, one conclusion. */
export function SlideFourCards({
  title,
  cards,
  bandLabel = "สรุป",
  band,
  ...chrome
}: SlideFourCardsProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-cards nct-cards--4">
          {cards.map((c, i) => {
            const cat = `var(--nct-cat-${i + 1})`;
            return (
              <div className="nct-card nct-card--square" key={i}>
                <div className="nct-card__tab" style={{ background: cat }} />
                <div className="nct-card__num" style={{ color: cat }}>
                  {c.number ?? `0${i + 1}`}
                </div>
                <h3 className="nct-card__heading">{c.heading}</h3>
                {c.body && <p className="nct-card__body">{c.body}</p>}
              </div>
            );
          })}
        </div>
        {band && (
          <div style={{ marginTop: 14.4 }}>
            <TakeawayBand label={bandLabel} tone="dark">
              {band}
            </TakeawayBand>
          </div>
        )}
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 13 */
export interface FlowStep {
  heading: ReactNode;
  body?: ReactNode;
}

export interface SlideProcessFlowProps extends Base {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Three to five steps — a time sequence. Not a sequence? Use layout 12. */
  steps: FlowStep[];
  resultLabel?: string;
  result?: ReactNode;
  note?: ReactNode;
}

/** 13 · Process Flow. Steps on one axis, chevrons between, result band below. */
export function SlideProcessFlow({
  title,
  subtitle,
  steps,
  resultLabel = "ผลลัพธ์",
  result,
  note,
  ...chrome
}: SlideProcessFlowProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {subtitle && <p className="nct-caption" style={{ margin: 0 }}>{subtitle}</p>}
        <div className="nct-flow" style={{ marginTop: 33.6 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="nct-flow__step">
                <div className="nct-flow__chip">{i + 1}</div>
                <h3 className="nct-densehead nct-flow__head">{s.heading}</h3>
                {s.body && <p className="nct-dense nct-flow__body">{s.body}</p>}
              </div>
              {i < steps.length - 1 && (
                <div className="nct-flow__link">
                  <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true">
                    <polygon points="0,0 12,8 0,16" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        {result && (
          <div style={{ marginTop: 19.2 }}>
            <TakeawayBand label={resultLabel}>{result}</TakeawayBand>
          </div>
        )}
        {note && <p className="nct-dense" style={{ marginTop: 19.2, color: "var(--nct-ink-2)" }}>{note}</p>}
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 14 */
export interface SlideDiagramProps extends Base {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Compose with DiagramBox / DiagramLink / DiagramGroup. */
  children?: ReactNode;
  legend?: ReactNode;
}

/**
 * 14 · Diagram Canvas. A deliberately empty frame — the drawing is yours, built
 * from the diagram kit. Past ~30 boxes, split the slide.
 */
export function SlideDiagram({ title, subtitle, children, legend, ...chrome }: SlideDiagramProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {subtitle && <p className="nct-caption" style={{ margin: 0 }}>{subtitle}</p>}
        <div className="nct-canvas">{children}</div>
        {legend && <div className="nct-dia-legend">{legend}</div>}
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 15 */
export interface SlideAgendaProps extends Base {
  number?: string;
  title: ReactNode;
  /** Four to six lines. More than six means the chapter is doing too much. */
  items: ReactNode[];
  /** Photograph for the right 40%, same band as layout 02. */
  image?: string;
  imageAlt?: string;
}

/** 15 · Agenda. Layout 02 with a contents list. Opens a chapter. */
export function SlideAgenda({
  number, title, items, image, imageAlt = "", ...chrome
}: SlideAgendaProps) {
  return (
    <Slide tone="dark" {...chrome}>
      <SectionBand image={image} alt={imageAlt} />
      {number && <div className="nct-section__num">{number}</div>}
      <div className="nct-section__rule" />
      <h2 className={image ? "nct-section__title nct-section__title--photo" : "nct-section__title"}>
        {title}
      </h2>
      <div className={image ? "nct-agenda__list nct-agenda__list--photo" : "nct-agenda__list"}>
        <BulletList items={items.map((t) => ({ text: t }))} onDark />
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 16 */
export interface SlideDenseTableProps
  extends Base,
    Pick<DataTableProps, "columns" | "rows" | "widths"> {
  title: ReactNode;
  intro?: ReactNode;
  footnote?: ReactNode;
}

/** 16 · Dense Table. Eight to ten rows at the 10pt floor. Never smaller. */
export function SlideDenseTable({
  title,
  intro,
  columns,
  rows,
  widths,
  footnote,
  ...chrome
}: SlideDenseTableProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {intro && <p className="nct-dense" style={{ margin: 0, color: "var(--nct-ink-2)" }}>{intro}</p>}
        <div style={{ marginTop: 19.2 }}>
          <DataTable columns={columns} rows={rows} widths={widths} />
        </div>
        {footnote && (
          <p style={{ marginTop: 14.4, fontSize: "var(--nct-fs-densecell)", color: "var(--nct-ink-2)" }}>
            {footnote}
          </p>
        )}
      </div>
    </Slide>
  );
}
