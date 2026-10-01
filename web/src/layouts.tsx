import type { CSSProperties, ReactNode } from "react";
import { coverScatter, markColor } from "./assets";
import { Chart, niceTicks, type ChartProps } from "./chart";
import { space } from "./tokens";
import { Slide, SlideTitle, type SlideChromeProps, type SlideFit } from "./Slide";
import {
  BulletList,
  DataTable,
  NctLogo,
  TakeawayBand,
  type BulletItem,
  type DataTableProps,
} from "./primitives";

/* The 19 layouts of NCT-Slide-Template.potx, one component each. Names, slots
   and geometry mirror the .potx so a design made here can be rebuilt in
   PowerPoint by picking the layout of the same number. */

type Base = SlideChromeProps & { fit?: SlideFit };

/* ---------------------------------------------------------------- 01 */
export interface SlideCoverProps extends Base {
  title: ReactNode;
  /** Client name, tagline or date — one line under the rule. */
  subtitle?: ReactNode;
}

/**
 * 01 · Title Slide. The deck's cover — use once. The composition follows `brand`.
 *
 * `corp` (the default): paper ground, the mark watermarked behind it, the lockup
 * centred and large, and the title centred under a rule. It is the page the
 * company actually opens a bid with.
 *
 * `web`: a Swiss split. Paper on the left carries the lockup, a left-set title,
 * the 0.6in teal rule and the subtitle; the photo band's slot on the right is the
 * navy→teal gradient with the corp cover's scatter column in white on it. The
 * web closing (layout 10) mirrors it. Only `date` shows in the foot, bottom-left
 * — the page number would land on the panel.
 *
 * The navy→teal gradient that used to be the house cover is
 * {@link SlideCoverGradient}, layout 20. A cover is a composition, not a dress,
 * which is why the two are separate layouts rather than one with a flag.
 *
 * It drops the corp foot bar, because the source draws none on the one page
 * whose job is to be quiet. `date` renders bottom-left, where the source puts
 * its "Updated date" line — pass the whole string; the layout does not build it.
 */
// single quotes: the SVG's own attribute quotes are double ones, and they close
// a url("...") early - the mask then never loads and the column paints as a
// solid block
const scatterMask: CSSProperties = {
  maskImage: `url('${coverScatter}')`,
  WebkitMaskImage: `url('${coverScatter}')`,
};

export function SlideCover({ title, subtitle, ...chrome }: SlideCoverProps) {
  if (chrome.brand === "web") {
    return (
      <Slide tone="light" className="nct-cover--split" {...chrome}>
        <div className="nct-cover__panel" aria-hidden="true" />
        <div
          className="nct-cover__scatter nct-cover__scatter--light"
          aria-hidden="true"
          style={scatterMask}
        />
        <NctLogo className="nct-cover__logo--split" width={240} />
        <h1 className="nct-cover__title--split">{title}</h1>
        <div className="nct-cover__rule--split" />
        {subtitle && <p className="nct-cover__sub--split">{subtitle}</p>}
      </Slide>
    );
  }
  return (
    <Slide tone="light" className="nct-cover--paper" {...chrome}>
      {/* the mark at 4% — the source watermarks its own logo rather than
          introducing a pattern that means nothing */}
      <img className="nct-cover__wm nct-cover__wm--a" src={markColor} alt="" />
      <img className="nct-cover__wm nct-cover__wm--b" src={markColor} alt="" />
      <div className="nct-cover__scatter" aria-hidden="true" style={scatterMask} />
      <NctLogo className="nct-cover__logo--paper" width={420} />
      <div className="nct-cover__rule--paper" />
      <h1 className="nct-cover__title--paper">{title}</h1>
      {subtitle && <p className="nct-cover__sub--paper">{subtitle}</p>}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 20 */
/**
 * 20 · Title Slide Gradient. The loud cover — the navy→teal gradient, read left,
 * bookending the `close` gradient on layout 10.
 *
 * This was layout 01 on the house side until {@link SlideCover} became the
 * default for both brands. Nothing about the slide changed, only its number, so
 * a deck that opened on it keeps opening on it by naming this component.
 *
 * Like layout 10 it is a house bookend in either brand: the gradient stays
 * navy→teal on a corp deck, and only the chrome follows the brand.
 */
export function SlideCoverGradient({ title, subtitle, ...chrome }: SlideCoverProps) {
  return (
    <Slide tone="open" {...chrome}>
      <div className="nct-decor nct-decor--cover-a" />
      <div className="nct-decor nct-decor--cover-b" />
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
  /** Column headings ("ก่อน" / "หลัง") — keep them out of the bullet lists. */
  leftKicker?: ReactNode;
  left: BulletItem[];
  rightKicker?: ReactNode;
  right: BulletItem[];
}

/** 04 · Two Column. Before/after, pros/cons. Left is always the current state. */
export function SlideTwoColumn({
  title,
  leftKicker,
  left,
  rightKicker,
  right,
  ...chrome
}: SlideTwoColumnProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-cols">
          <div>
            {leftKicker && <h3 className="nct-panel__kicker">{leftKicker}</h3>}
            <BulletList items={left} />
          </div>
          <div>
            {rightKicker && <h3 className="nct-panel__kicker">{rightKicker}</h3>}
            <BulletList items={right} />
          </div>
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
      <div className="nct-body nct-body--figures">
        <div className="nct-figures">
          {figures.map((f, i) => (
            <div className="nct-figure" key={i}>
              <div className="nct-figure__value">{f.value}</div>
              <div className="nct-figure__label">{f.label}</div>
            </div>
          ))}
        </div>
        {footnote && <p className="nct-caption nct-caption--footnote">{footnote}</p>}
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
  /**
   * "full" is the .potx treatment: edge to edge behind a bottom scrim.
   * "fade" narrows the picture to the same right-hand band the chapter openers
   * use and holds the type in the left half — web only, layout 08 in PowerPoint
   * stays full-bleed.
   */
  variant?: "full" | "fade";
}

/** 08 · Full Image. Chapter opener over photography. The scrim is not optional. */
export function SlideFullImage({
  src, alt = "", title, caption, variant = "full", ...chrome
}: SlideFullImageProps) {
  const fade = variant === "fade";
  return (
    <Slide tone="deep" {...chrome}>
      {src && (
        <img
          className={fade ? "nct-image__media nct-image__media--fade" : "nct-image__media"}
          src={src}
          alt={alt}
        />
      )}
      {fade ? (
        <>
          <div className="nct-image__fade" />
          <div className="nct-image__fade-foot" />
        </>
      ) : (
        <div className="nct-image__scrim" />
      )}
      <h2 className={fade ? "nct-image__title nct-image__title--fade" : "nct-image__title"}>
        {title}
      </h2>
      {fade && <div className="nct-image__rule" />}
      {caption && (
        <div className={fade ? "nct-image__caption nct-image__caption--fade" : "nct-image__caption"}>
          {caption}
        </div>
      )}
    </Slide>
  );
}

/* ---------------------------------------------------------------- 09 */
export interface SlideTableProps
  extends Base,
    Pick<DataTableProps, "columns" | "rows" | "widths" | "recommended"> {
  title: ReactNode;
  /** One-line lead-in above the table. */
  intro?: ReactNode;
  takeawayLabel?: string;
  /**
   * Required, not optional. A comparison grid with no stated conclusion leaves
   * the reader to pick for themselves, which is the one thing this slide exists
   * to prevent — say which column you are recommending and why.
   */
  takeaway: ReactNode;
}

/**
 * 09 · Table / Comparison. Package or spec comparison at 14pt.
 *
 * This is also the deck's price slide: put the investment in as its own bold row
 * at the foot of the grid and set `recommended` to the column you are arguing
 * for. A proposal that compares packages without pricing them, or prices them
 * without naming a choice, has left the decision to the client's guesswork.
 */
export function SlideTable({
  title,
  intro,
  columns,
  rows,
  widths,
  recommended,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideTableProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {intro && <p className="nct-caption nct-caption--lead">{intro}</p>}
        <DataTable
          columns={columns}
          rows={rows}
          widths={widths}
          recommended={recommended}
          size="roomy"
        />
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 10 */
export interface SlideClosingProps extends Base {
  title?: ReactNode;
  /**
   * What happens next, in order — two to four lines, each one an action with an
   * owner. This is the slide's real content: a proposal that ends on a
   * thank-you has asked the room for nothing, and the peak-end rule weights the
   * last slide hardest. The thank-you stays as the title above it.
   */
  nextSteps?: ReactNode[];
  /** Label over `nextSteps`. */
  nextStepsLabel?: string;
  /** The date the decision is needed by. One line, no hedging. */
  decisionBy?: ReactNode;
  /** Contact lines — phone, email, site. */
  contact?: ReactNode[];
  /** Label over `contact` on the web closing's card. */
  contactLabel?: string;
  /**
   * Photograph. `corp`: the right 40%, in place of the top-right diamond.
   * `web`: the head of the contact card, placed at 16:9 — `photoHandshake` is
   * prepared at exactly that.
   */
  image?: string;
  imageAlt?: string;
  /**
   * How `image` is placed on the `corp` closing. "band" is the right-hand strip
   * layouts 02 and 15 use. "full" runs the photograph across the whole slide
   * behind a scrim — for a subject that needs room to read, where a 40% strip
   * would crop it to mush. The `web` closing ignores it: its card is 16:9.
   */
  imageMode?: "band" | "full";
}

/**
 * 10 · Closing / Contact. The bookend to layout 01 — use once. The composition
 * follows `brand`.
 *
 * `corp` (the default): teal→navy, the ask down the left, the photo band right.
 *
 * `web`: the web cover's split, mirrored. Flat navy carries the ask - title,
 * next steps, and the deadline in its own callout - and a paper card stands in
 * the panel's slot with the photograph, `contact` and the lockup. The two labels
 * share a line, and the callout's foot is the card's foot.
 */
export function SlideClosing(props: SlideClosingProps) {
  return props.brand === "web" ? <ClosingCard {...props} /> : <ClosingBand {...props} />;
}

function ClosingCard({
  title = "ขอบคุณครับ",
  nextSteps = [],
  nextStepsLabel = "ขั้นตอนถัดไป",
  decisionBy,
  contact = [],
  contactLabel = "ติดต่อ",
  image,
  imageAlt = "",
  imageMode: _imageMode,
  ...chrome
}: SlideClosingProps) {
  return (
    <Slide tone="dark" className="nct-closing--card" {...chrome}>
      <div className="nct-decor nct-decor--close-a" />
      <h2 className="nct-closing__title nct-closing__title--card">{title}</h2>
      <div className="nct-closing__rule nct-closing__rule--card" />
      {nextSteps.length > 0 && (
        <>
          <div className="nct-closing__ask-label nct-closing__ask-label--card">
            {nextStepsLabel}
          </div>
          <ol className="nct-closing__ask nct-closing__ask--card">
            {nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
      {decisionBy && <div className="nct-closing__callout">{decisionBy}</div>}
      <div className="nct-contact-card">
        {image && <img className="nct-contact-card__photo" src={image} alt={imageAlt} />}
        <div className="nct-contact-card__body">
          <div className="nct-contact-card__label">{contactLabel}</div>
          <div className="nct-contact-card__contact">
            {contact.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <NctLogo className="nct-contact-card__logo" width={182.4} />
        </div>
      </div>
    </Slide>
  );
}

function ClosingBand({
  title = "ขอบคุณครับ",
  nextSteps = [],
  nextStepsLabel = "ขั้นตอนถัดไป",
  decisionBy,
  contact = [],
  contactLabel: _contactLabel,
  image,
  imageAlt = "",
  imageMode = "band",
  ...chrome
}: SlideClosingProps) {
  const full = Boolean(image) && imageMode === "full";
  const band = Boolean(image) && !full;
  const ask = nextSteps.length > 0;
  // the ask owns the left column from 336 to 632; with a photograph on the slide
  // there is nowhere left for the lockup, and the corner mark already signs it
  const showLogo = !(ask && image);
  return (
    <Slide tone="close" className={ask ? "nct-closing--ask" : undefined} {...chrome}>
      {full ? (
        <>
          <img className="nct-closing__photo" src={image} alt={imageAlt} />
          <div className="nct-closing__scrim" />
          <div className="nct-closing__scrim-foot" />
        </>
      ) : (
        <div className="nct-decor nct-decor--close-a" />
      )}
      {ask && !full && <div className="nct-closing__veil" />}
      {band ? (
        <SectionBand image={image} alt={imageAlt} />
      ) : !full && (
        <div className="nct-decor nct-decor--close-b" />
      )}
      <h2 className={image ? "nct-closing__title nct-closing__title--photo" : "nct-closing__title"}>
        {title}
      </h2>
      <div className="nct-closing__rule" />
      {ask && (
        <>
          <div className="nct-closing__ask-label">{nextStepsLabel}</div>
          <ol className="nct-closing__ask">
            {nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
      {decisionBy && <div className="nct-closing__decision">{decisionBy}</div>}
      <div className={full ? "nct-closing__contact nct-closing__contact--full" : "nct-closing__contact"}>
        {contact.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      {showLogo && (
        <NctLogo
          variant="white"
          className={image ? "nct-closing__logo nct-closing__logo--photo" : "nct-closing__logo"}
          width={269}
        />
      )}
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
          <div className="nct-follow">
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
          {cards.map((c, i) => (
            <div
              className="nct-card nct-card--square"
              key={i}
              style={{ "--nct-card-cat": `var(--nct-cat-${i + 1})` } as CSSProperties}
            >
              <div className="nct-card__tab" />
              <div className="nct-card__num">{c.number ?? `0${i + 1}`}</div>
              <h3 className="nct-card__heading">{c.heading}</h3>
              {c.body && <p className="nct-card__body">{c.body}</p>}
            </div>
          ))}
        </div>
        {band && (
          <div className="nct-follow">
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

/**
 * Three to five, as a tuple union rather than a sentence: `.nct-flow__step` is a
 * fixed `--nct-fifth` wide, so a sixth step is 202px the 1088px box does not
 * have and an eighth ends at x=1798, clipped away with no warning.
 */
export type FlowSteps =
  | [FlowStep, FlowStep, FlowStep]
  | [FlowStep, FlowStep, FlowStep, FlowStep]
  | [FlowStep, FlowStep, FlowStep, FlowStep, FlowStep];

export interface SlideProcessFlowProps extends Base {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Three to five steps — a time sequence. Not a sequence? Use layout 12. */
  steps: FlowSteps;
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
        {subtitle && <p className="nct-caption nct-caption--flush">{subtitle}</p>}
        <div className="nct-flow">
          {steps.map((s, i) => (
            <div key={i} className="nct-flow__pair">
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
          <div className="nct-flow-foot">
            <TakeawayBand label={resultLabel}>{result}</TakeawayBand>
          </div>
        )}
        {note && <p className="nct-dense nct-flow-note">{note}</p>}
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
  takeawayLabel?: string;
  /** Required. The drawing shows the shape; this says what it means. */
  takeaway: ReactNode;
}

/**
 * 14 · Diagram Canvas. A deliberately empty frame — the drawing is yours, built
 * from the diagram kit. Past ~30 boxes, split the slide.
 */
export function SlideDiagram({
  title,
  subtitle,
  children,
  legend,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideDiagramProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {subtitle && <p className="nct-caption nct-caption--sub">{subtitle}</p>}
        <div className="nct-canvas">{children}</div>
        {legend && <div className="nct-dia-legend">{legend}</div>}
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 15 */
/**
 * Four to six, checked rather than narrated: at seven the list runs to 719.5px
 * on a 720px canvas, and at six under the old `top: 451.2px` it crossed the
 * footer rule by 24.5px in silence.
 */
export type AgendaItems =
  | [ReactNode, ReactNode, ReactNode, ReactNode]
  | [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode]
  | [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];

export interface SlideAgendaProps extends Base {
  number?: string;
  title: ReactNode;
  /** Four to six lines. More than six means the chapter is doing too much. */
  items: AgendaItems;
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
    Pick<DataTableProps, "columns" | "rows" | "widths" | "groupColumn"> {
  title: ReactNode;
  intro?: ReactNode;
  /**
   * The key for any `category` coding in the grid — a `CategoryKey`. Required in
   * practice, not in the type: a coded column with no key on the same slide
   * leaves identity to colour alone.
   */
  legend?: ReactNode;
  footnote?: ReactNode;
  takeawayLabel?: string;
  /**
   * Required. Eight rows of status is evidence, not an answer — and if any row
   * is red, this line is where the reader learns what happens about it.
   */
  takeaway: ReactNode;
}

/** 16 · Dense Table. Eight to nine rows at the 10pt floor. Never smaller. */
export function SlideDenseTable({
  title,
  intro,
  columns,
  rows,
  widths,
  groupColumn,
  legend,
  footnote,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideDenseTableProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        {intro && <p className="nct-dense nct-dense--lead">{intro}</p>}
        <DataTable columns={columns} rows={rows} widths={widths} groupColumn={groupColumn} />
        {(legend || footnote) && (
          <p className="nct-note">
            <span>{legend}</span>
            <span className="nct-note__source">{footnote}</span>
          </p>
        )}
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ================================================================ v3
   The two layouts studied from NCT Template.pptx slides 33-43 - the deck the
   company requires on every bid. They wear the corp chrome by default (pass
   `brand="corp"` on the Deck) but render in either mode: only --nct-accent and
   the furniture change, never the grid.

   The other nine source slides did not need a layout of their own:
   - the concept explainers (33, 34) are SlideDiagram - lede, figure, stated
     conclusion, which is the same shape with the summary paragraph promoted to
     a labelled band;
   - the deliverables matrix (40) is SlideDenseTable with the `rowSpan` and
     `groupColumn` this version added to DataTable;
   - the support model (41) is SlideSplitPanel or SlideProcessFlow. Its diagonal
     photo band was deliberately not adopted: the frame behind it is a
     headset-and-smiles stock shot, the exact people-at-work photograph this
     system bans, and a layout would have enshrined it;
   - the thank-you (43) is SlideClosing, which asks for something.
   ---------------------------------------------------------------- 17 */

export interface PhaseMeta {
  /** "Key Activity", "Participant" — rendered bold with a colon after it. */
  label: ReactNode;
  value: ReactNode;
}

/**
 * One or two. The source runs exactly two on all five phase slides and there is
 * no room for a third: each row is `--nct-phase-meta-h` and the card below has
 * to keep its 14pt of content height.
 */
export type PhaseMetaRows = [PhaseMeta] | [PhaseMeta, PhaseMeta];

export interface SlidePhaseCardProps extends Base {
  title: ReactNode;
  /** The "Key Activity : … / Participant : …" pair the template opens with. */
  meta?: PhaseMetaRows;
  /** "01", "03–04" — typed, not counted. Phases merge, and the source's do. */
  number: string;
  /** "Preparation Phase", "Go-Live & Warranty Phase". */
  phase: ReactNode;
  /** One line under the tab, inside the card. */
  intro?: ReactNode;
  /** The phase's own content — a flow, a panel pair, a table, a drawing. */
  children?: ReactNode;
}

/**
 * 17 · Phase Card. A stage of the implementation plan: the activity/participant
 * pair on top, then an outlined canvas tabbed with the phase number.
 *
 * The tab is centred on the card's top border rather than hung off its left
 * edge. The source protrudes it by 0, 0.32, 0.42 and 0.69cm across its five
 * slides — copy-paste jitter, not a decision, and a tab that starts outside the
 * margin on three slides out of five is not a rule anyone can follow.
 */
export function SlidePhaseCard({
  title,
  meta,
  number,
  phase,
  intro,
  children,
  ...chrome
}: SlidePhaseCardProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body nct-body--phase">
        {meta && (
          <dl className="nct-phase-meta">
            {meta.map((m, i) => (
              <div className="nct-phase-meta__row" key={i}>
                <dt className="nct-phase-meta__label">{m.label} :</dt>
                <dd className="nct-phase-meta__value">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="nct-phase">
          <div className="nct-phase__tab">
            <span className="nct-phase__num">{number}</span>
            <span className="nct-phase__label">{phase}</span>
          </div>
          <div className="nct-phase__card">
            {intro && <p className="nct-phase__intro">{intro}</p>}
            {children}
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 18 */
export interface EvidenceFigure {
  src: string;
  alt?: string;
  /** What the reader is looking at. One line — it sits above the frame. */
  caption: ReactNode;
}

/**
 * Two to four, as a tuple union rather than a sentence. The strip is a fixed
 * `--nct-evidence-h` tall and the frames divide `--nct-cw` between them: at
 * five each one is 199px wide holding a 16:9 screenshot 112px tall, which is
 * not evidence of anything.
 */
export type EvidenceFigures =
  | [EvidenceFigure, EvidenceFigure]
  | [EvidenceFigure, EvidenceFigure, EvidenceFigure]
  | [EvidenceFigure, EvidenceFigure, EvidenceFigure, EvidenceFigure];

export interface SlideEvidenceProps extends Base {
  title: ReactNode;
  /** The accent pill above the content — "Purpose of the training". */
  kicker?: ReactNode;
  /** The claim: usually a `DataTable`, sometimes a `BulletList`. */
  children?: ReactNode;
  /** The proof: real screenshots or real site photographs, never stock. */
  figures: EvidenceFigures;
  takeawayLabel?: string;
  /**
   * Required, and it is the band the strip hangs from. The source puts a
   * section label there instead ("SAMPLE OF TRAINING SETUP"), which names the
   * photographs without saying what they prove — the slide ends on evidence
   * with no finding. This is the same band doing the job it was built for.
   */
  takeaway: ReactNode;
}

/**
 * 18 · Evidence Strip. A claim, a one-line finding, and two to four frames of
 * proof underneath it.
 *
 * The figures are the deck's receipts: screenshots of the real system, photos
 * of the real room. Stock imagery here is worse than no strip at all.
 */
export function SlideEvidence({
  title,
  kicker,
  children,
  figures,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideEvidenceProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body nct-body--evidence">
        {kicker && <div className="nct-kicker-pill">{kicker}</div>}
        <div className="nct-evidence__claim">{children}</div>
        <TakeawayBand label={takeawayLabel} tone="dark">{takeaway}</TakeawayBand>
        <div className="nct-evidence" data-count={figures.length}>
          {figures.map((f, i) => (
            <figure className="nct-evidence__figure" key={i}>
              <figcaption className="nct-evidence__caption">{f.caption}</figcaption>
              <img className="nct-evidence__media" src={f.src} alt={f.alt ?? ""} />
            </figure>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ================================================================ v4
   Data layouts, specified with the dataviz method in slide-design-system-v4.md.
   Charts sit on paper only, and read --nct-cat-* in slot order.
   ---------------------------------------------------------------- 19 */

/** One to three. A fourth point means the chart is carrying two stories. */
export type ChartInsights = [ReactNode] | [ReactNode, ReactNode] | [ReactNode, ReactNode, ReactNode];

export interface SlideChartProps extends Base {
  /** Write the conclusion ("ปิดงบ พ.ค. นานสุดในรอบครึ่งปี"), not the topic ("เวลาปิดงบ"). */
  title: ReactNode;
  chart: ChartProps;
  /** The one number the chart proves. It has to come out of this chart - otherwise use L06. */
  figure: { value: ReactNode; label: ReactNode };
  insights?: ChartInsights;
  /** Required: where the numbers came from, and where the full table lives if not here. */
  source: ReactNode;
  takeawayLabel?: string;
  /** Required. The chart shows the shape; this says what it means. */
  takeaway: ReactNode;
}

/** The chart box: eight columns wide, 3.80in tall with its own axis band. */
const CHART_W = space.cw - space.gut - space.third;
const CHART_H = 364.8;

/**
 * 19 · Chart + Insight. One chart on eight columns, the number it proves and up
 * to three findings on the other four. Default to emphasis — one bar or line in
 * cat-1, the rest mute — when the story is "this one"; give every series its own
 * colour only when the series are the story.
 */
export function SlideChart({
  title,
  chart,
  figure,
  insights,
  source,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideChartProps) {
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-chart-grid">
          <Chart {...chart} width={CHART_W} height={CHART_H} />
          <div className="nct-chart-rail">
            <div className="nct-chart-rail__figure nct-figure__value">{figure.value}</div>
            <div className="nct-figure__label">{figure.label}</div>
            {insights && <BulletList className="nct-chart-rail__insights" items={insights.map((t) => ({ text: t }))} />}
          </div>
        </div>
        <p className="nct-dia-legend">{source}</p>
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 21 */
export interface PlanRow {
  /** Phase name. Its number is the row's position, and has to match the phase on L17. */
  label: ReactNode;
  /** In periods from the start of the first: 0 opens `periods[0]`, 2.5 is halfway through the third. */
  start: number;
  end: number;
  /** "8 สัปดาห์" — right-set between the label and the plot. */
  duration?: ReactNode;
  /** A deliverable or sign-off on this row, `at` in the same units. Its label sits to the right. */
  milestone?: { at: number; label?: string };
}

/** One to eight. Past eight, roll the tasks up into phases and detail each on L17. */
export type PlanRows =
  | [PlanRow]
  | [PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow, PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow]
  | [PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow, PlanRow];

export interface SlidePlanProps extends Base {
  title: ReactNode;
  /**
   * Counted from the start ("ด.1", "ด.2" …) — the real start date is not known
   * when the proposal goes out. Twelve at most; past that, change the unit.
   */
  periods: string[];
  rows: PlanRows;
  /** The one row in cat-1, the rest in seq-300. Omit and every bar is cat-1. */
  highlight?: number;
  /** Required: what period one counts from ("นับจากวันลงนามสัญญา"). */
  assumption: ReactNode;
  takeawayLabel?: string;
  takeaway: ReactNode;
}

/* the .potx placeholders' x: label 1.90in + duration 0.80in + 0.20in, then the plot */
const PLAN_LEFT = 278.4;
const PLAN_W = space.cw - PLAN_LEFT;
const PLAN_ROW_H = 40.8;    // 0.425in - eight rows end at 5.65in, above the note
const PLAN_BAR_H = 19.2;    // 0.20in
const PLAN_MARK = 15.36;    // 0.16in diamond

/**
 * 21 · Plan Timeline. The whole plan on one slide; L17 is one phase of it. Bars
 * float at their start, deliverables are cat-2 diamonds. No text in the bars and
 * no dependency arrows — order of work is L13 / L14.
 */
export function SlidePlan({
  title,
  periods,
  rows,
  highlight,
  assumption,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlidePlanProps) {
  const slot = PLAN_W / periods.length;
  const h = rows.length * PLAN_ROW_H;
  const marks = rows.some((r) => r.milestone);
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-plan">
          <div className="nct-plan__periods" style={{ gridTemplateColumns: `repeat(${periods.length}, 1fr)` }}>
            {periods.map((p, i) => <span key={i}>{p}</span>)}
          </div>
          <ol className="nct-plan__rows">
            {rows.map((r, i) => (
              <li key={i}>
                <span className="nct-plan__label"><b>{i + 1}.</b> {r.label}</span>
                <span className="nct-plan__dur">{r.duration}</span>
              </li>
            ))}
          </ol>
          <svg width={PLAN_W} height={h} aria-hidden="true">
            {periods.concat("").map((_, i) => (
              <line key={i} x1={i * slot} x2={i * slot} y1={0} y2={h} stroke="var(--nct-rule)" strokeWidth={1} />
            ))}
            {rows.map((r, i) => {
              const w = (r.end - r.start) * slot;
              return (
                <rect key={i} x={r.start * slot} y={i * PLAN_ROW_H + (PLAN_ROW_H - PLAN_BAR_H) / 2}
                      width={w} height={PLAN_BAR_H} rx={Math.min(PLAN_BAR_H, w) / 2}
                      fill={highlight === undefined || highlight === i ? "var(--nct-cat-1)" : "var(--nct-seq-300)"} />
              );
            })}
            {rows.map((r, i) => {
              if (!r.milestone) return null;
              const x = r.milestone.at * slot;
              const y = i * PLAN_ROW_H + PLAN_ROW_H / 2;
              const d = PLAN_MARK / 2;
              return (
                <g key={i}>
                  <polygon points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`}
                           fill="var(--nct-cat-2)" stroke="var(--nct-paper)" strokeWidth={2} />
                  {r.milestone.label && (
                    <text className="nct-plan__mark" x={x + d + 4.8} y={y} dominantBaseline="middle">
                      {r.milestone.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="nct-sr"><table>
          <thead><tr><th /><th>เริ่ม</th><th>สิ้นสุด</th><th>ส่งมอบ</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <th>{i + 1}. {r.label}</th>
                <td>{periods[Math.floor(r.start)]}</td>
                <td>{periods[Math.max(0, Math.ceil(r.end) - 1)]}</td>
                <td>{r.milestone?.label}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
        <p className="nct-note">
          <span className="nct-plan__key">
            <span><i className="nct-plan__glyph">■</i> ช่วงงาน</span>
            {marks && <span><i className="nct-plan__glyph nct-plan__glyph--mark">◆</i> ส่งมอบ / ตรวจรับ</span>}
          </span>
          <span className="nct-note__source">{assumption}</span>
        </p>
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 22 */
/** One to four. Past four, keep the three largest and fold the rest into "อื่น ๆ" with `other`. */
export type CompositionSegments =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

export interface CompositionBar {
  /** "งบโครงการ", or the package name when bars compare packages. */
  label: ReactNode;
  /** One per segment, in segment order — the colour follows the segment, never the size. */
  values: number[];
  /** Shown at the bar's end when there are two or three bars. Defaults to the formatted sum. */
  total?: ReactNode;
  /** The package the takeaway argues for: accent label with a cap, as L09's column. */
  recommended?: boolean;
}

export type CompositionBars =
  | [CompositionBar]
  | [CompositionBar, CompositionBar]
  | [CompositionBar, CompositionBar, CompositionBar];

export interface SlideCompositionProps extends Base {
  title: ReactNode;
  /** The whole, at tile size ("4.8 ล้านบาท"). */
  total: ReactNode;
  totalLabel: ReactNode;
  /** The terms behind the number — VAT, contract length. */
  intro?: ReactNode;
  segments: CompositionSegments;
  /** The last segment is the folded tail, drawn cat-mute. */
  other?: boolean;
  bars: CompositionBars;
  /** `share`: every bar runs to 100%. `amount`: bars scale to the largest total. */
  mode?: "share" | "amount";
  /** Appended to every value in the breakdown ("ล้านบาท"). */
  unit?: string;
  format?: (n: number) => string;
  /** Required: where the numbers come from, and "ปัดเศษ" when the shares do not sum to 100. */
  source: ReactNode;
  takeawayLabel?: string;
  takeaway: ReactNode;
}

/**
 * 22 · Composition. Part-to-whole as one to three horizontal bars — never a pie.
 * One bar: the breakdown above it carries the values. Two or three: the
 * breakdown is only the legend, each bar carries its total, and the full
 * numbers go to the appendix.
 */
export function SlideComposition({
  title,
  total,
  totalLabel,
  intro,
  segments,
  other = false,
  bars,
  mode = "share",
  unit,
  format = (n) => n.toLocaleString("th-TH"),
  source,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideCompositionProps) {
  const color = (i: number) =>
    other && i === segments.length - 1 ? "var(--nct-cat-mute)" : `var(--nct-cat-${i + 1})`;
  const sum = (b: CompositionBar) => b.values.reduce((a, v) => a + v, 0);
  const max = Math.max(...bars.map(sum));
  const one = bars.length === 1;
  const withUnit = (n: number) => (unit ? `${format(n)} ${unit}` : format(n));
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-comp__head">
          <div>
            <p className="nct-comp__total">{total}</p>
            <p className="nct-figure__label nct-comp__total-label">{totalLabel}</p>
          </div>
          {intro && <p className="nct-comp__intro">{intro}</p>}
        </div>
        <ul className="nct-comp__key">
          {segments.map((name, i) => (
            <li key={i}>
              <span className="nct-comp__seg">
                <i className="nct-comp__swatch" style={{ background: color(i) }} />
                {name}
              </span>
              {one && (
                <span className="nct-comp__value">
                  {withUnit(bars[0].values[i])}
                  <small>{Math.round((bars[0].values[i] / sum(bars[0])) * 100)}%</small>
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="nct-comp__bars" aria-hidden="true">
          {bars.map((b, r) => (
            <div key={r} className="nct-comp__row">
              <span className="nct-comp__name" data-rec={b.recommended || undefined}>{b.label}</span>
              <span className="nct-comp__track">
                <span className="nct-comp__bar" style={{ width: `${mode === "amount" ? (sum(b) / max) * 100 : 100}%` }}>
                  {b.values.map((v, i) => (
                    // normalised: flex-grow values summing under 1 leave part of the bar empty
                    <i key={i} style={{ flex: `${v / sum(b)} 1 0`, background: color(i) }} />
                  ))}
                </span>
              </span>
              <span className="nct-comp__end">{one ? null : b.total ?? withUnit(sum(b))}</span>
            </div>
          ))}
        </div>
        <div className="nct-sr"><table>
          <thead><tr><th />{segments.map((s, i) => <th key={i}>{s}</th>)}<th>รวม</th></tr></thead>
          <tbody>
            {bars.map((b, r) => (
              <tr key={r}><th>{b.label}</th>{b.values.map((v, i) => <td key={i}>{withUnit(v)}</td>)}<td>{withUnit(sum(b))}</td></tr>
            ))}
          </tbody>
        </table></div>
        <p className="nct-dia-legend">{source}</p>
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 23 */
export interface KpiTile {
  /** What the number measures ("เอกสารเข้า มิ.ย."). */
  label: ReactNode;
  value: ReactNode;
  /**
   * The move, and what it is measured against — always ("15% จาก ม.ค.").
   * `good` colours the glyph ok or risk; the words stay ink.
   */
  delta?: { text: ReactNode; direction: "up" | "down"; good: boolean };
  /** A few recent points, drawn mute beside the delta with the latest in cat-1. */
  spark?: number[];
}

/** Three tiles on the third grid or four on the quarter grid. */
export type KpiTiles = [KpiTile, KpiTile, KpiTile] | [KpiTile, KpiTile, KpiTile, KpiTile];

export interface SlideKpiTrendProps extends Base {
  title: ReactNode;
  tiles: KpiTiles;
  /** The trend of one tile: its rule turns cat-1 and thick, which is what ties them. */
  trend: {
    tile?: number;
    /** Series name for the hidden table; defaults to the tile's label when that is a string. */
    name?: string;
    categories: string[];
    values: number[];
    unit?: string;
    /** A target or limit, drawn as a mute hairline named at its end. */
    target?: { value: number; label: string };
  };
  /** Required: where the numbers came from. */
  source: ReactNode;
  takeawayLabel?: string;
  takeaway: ReactNode;
}

const KPI_TREND_H = 196.8;   // 2.05in - ends 5.65in, above the note

function Spark({ points, width }: { points: number[]; width: number }) {
  const h = 28.8, pad = 4;
  const lo = Math.min(...points), hi = Math.max(...points);
  const x = (i: number) => pad + (i / Math.max(1, points.length - 1)) * (width - 2 * pad);
  const y = (v: number) => h - pad - ((v - lo) / (hi - lo || 1)) * (h - 2 * pad);
  const last = points.length - 1;
  return (
    <svg className="nct-kpi__spark" width={width} height={h} aria-hidden="true">
      <polyline points={points.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none"
                stroke="var(--nct-cat-mute)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last)} cy={y(points[last])} r={3} fill="var(--nct-cat-1)" />
    </svg>
  );
}

/**
 * 23 · KPI + Trend. Three or four headline numbers and the trend of one of them.
 * Tiles have no ground: a rule on top divides them. Every delta says what it is
 * compared with. With no trend worth telling, this is SlideKeyFigures (06).
 */
export function SlideKpiTrend({
  title,
  tiles,
  trend,
  source,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideKpiTrendProps) {
  const plotted = trend.tile ?? 0;
  const tileW = (space.cw - (tiles.length - 1) * space.gut) / tiles.length;
  const label = tiles[plotted].label;
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-kpi" style={{ gridTemplateColumns: `repeat(${tiles.length}, 1fr)` }}>
          {tiles.map((t, i) => (
            <div key={i} className="nct-kpi__tile" data-plotted={i === plotted || undefined}>
              <p className="nct-figure__label nct-kpi__label">{t.label}</p>
              <p className="nct-kpi__value">{t.value}</p>
              <div className="nct-kpi__foot">
                {t.delta && (
                  <span className="nct-kpi__delta">
                    <i style={{ color: t.delta.good ? "var(--nct-ok)" : "var(--nct-risk)" }}>
                      {t.delta.direction === "up" ? "▲" : "▼"}
                    </i>{" "}
                    {t.delta.text}
                  </span>
                )}
                {t.spark && <Spark points={t.spark} width={tileW / 2} />}
              </div>
            </div>
          ))}
        </div>
        <Chart kind="line" categories={trend.categories} unit={trend.unit} target={trend.target}
               series={[{ name: trend.name ?? (typeof label === "string" ? label : ""), values: trend.values }]}
               width={space.cw} height={KPI_TREND_H} />
        <p className="nct-dia-legend">{source}</p>
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}

/* ---------------------------------------------------------------- 24 */
export interface BeforeAfterRow {
  label: ReactNode;
  before: number;
  after: number;
}

/** Three to seven, in one unit. Mixed units: convert to % of the old value, or split the slide. */
export type BeforeAfterRows =
  | [BeforeAfterRow, BeforeAfterRow, BeforeAfterRow]
  | [BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow]
  | [BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow]
  | [BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow]
  | [BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow, BeforeAfterRow];

export interface SlideBeforeAfterProps extends Base {
  title: ReactNode;
  rows: BeforeAfterRows;
  /** Short unit for the change column ("ชม.", "วัน"). */
  unit: string;
  /** Which way is good. Only the intro says it; the colours do not change. */
  better: "lower" | "higher";
  /** Defaults to "{unit} · น้อยกว่าดีกว่า" / "มากกว่าดีกว่า". Say the full unit here. */
  intro?: ReactNode;
  format?: (n: number) => string;
  /** Required: where the numbers came from; the full table belongs in the appendix. */
  source: ReactNode;
  takeawayLabel?: string;
  takeaway: ReactNode;
}

/* the .potx placeholders: labels 3.00in, plot from 3.20in for 6.333in, the
   change column 1.60in at the margin; scale band 0.40-0.75in, rows 0.43in */
const BA_PLOT_X = 307.2;
const BA_PLOT_W = 608;
const BA_BAND = 33.6;
const BA_ROW_H = 41.28;

/**
 * 24 · Before → After. A dumbbell per item: before in seq-300, after in cat-1,
 * the signed change on every row. Rows are sorted largest change first here,
 * so the order on the slide is never the order they were typed in.
 */
export function SlideBeforeAfter({
  title,
  rows,
  unit,
  better,
  intro,
  format = (n) => n.toLocaleString("th-TH"),
  source,
  takeawayLabel = "สรุป",
  takeaway,
  ...chrome
}: SlideBeforeAfterProps) {
  const sorted = [...rows].sort((a, b) => Math.abs(b.after - b.before) - Math.abs(a.after - a.before));
  const ticks = niceTicks(Math.max(...rows.flatMap((r) => [r.before, r.after])));
  const top = ticks[ticks.length - 1];
  const x = (v: number) => (v / top) * BA_PLOT_W;
  const h = BA_BAND + 7 * BA_ROW_H;
  const change = (r: BeforeAfterRow) => {
    const d = r.after - r.before;
    return `${d < 0 ? "−" : d > 0 ? "+" : ""}${format(Math.abs(d))} ${unit}`;
  };
  return (
    <Slide {...chrome}>
      <SlideTitle>{title}</SlideTitle>
      <div className="nct-body">
        <div className="nct-ba__head">
          <p className="nct-ba__intro">{intro ?? `${unit} · ${better === "lower" ? "น้อยกว่าดีกว่า" : "มากกว่าดีกว่า"}`}</p>
          <p className="nct-ba__legend">
            <i style={{ color: "var(--nct-seq-300)" }}>●</i> ก่อน
            <i style={{ color: "var(--nct-cat-1)" }}>●</i> หลัง
          </p>
        </div>
        <ol className="nct-ba__rows">
          {sorted.map((r, i) => (
            <li key={i}>
              <span>{r.label}</span>
              <b>{change(r)}</b>
            </li>
          ))}
        </ol>
        <svg className="nct-ba__plot" width={BA_PLOT_W} height={h} aria-hidden="true">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={BA_BAND} y2={h} stroke="var(--nct-rule)" strokeWidth={1} />
              <text className="nct-chart__tick" x={x(t)} y={BA_BAND - 12} textAnchor="middle">{format(t)}</text>
            </g>
          ))}
          {sorted.map((r, i) => {
            const y = BA_BAND + i * BA_ROW_H + BA_ROW_H / 2;
            return (
              <g key={i}>
                <line x1={x(r.before)} x2={x(r.after)} y1={y} y2={y} stroke="var(--nct-seq-300)" strokeWidth={2} strokeLinecap="round" />
                <circle cx={x(r.before)} cy={y} r={5} fill="var(--nct-seq-300)" stroke="var(--nct-paper)" strokeWidth={2} />
                <circle cx={x(r.after)} cy={y} r={5} fill="var(--nct-cat-1)" stroke="var(--nct-paper)" strokeWidth={2} />
              </g>
            );
          })}
        </svg>
        <div className="nct-sr"><table>
          <thead><tr><th /><th>ก่อน</th><th>หลัง</th><th>ส่วนต่าง</th></tr></thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i}><th>{r.label}</th><td>{format(r.before)}</td><td>{format(r.after)}</td><td>{change(r)}</td></tr>
            ))}
          </tbody>
        </table></div>
        <p className="nct-dia-legend">{source}</p>
        <TakeawayBand label={takeawayLabel} foot>{takeaway}</TakeawayBand>
      </div>
    </Slide>
  );
}
