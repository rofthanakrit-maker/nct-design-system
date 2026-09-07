import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { markColor, markWhite } from "./assets";
import { canvas } from "./tokens";

/**
 * Scale factor that fits the fixed canvas into `ref`'s width.
 * CSS alone can't do this — `scale()` needs a unitless number and
 * `calc(100cqw / 1280)` resolves to a length, so it is measured here instead.
 */
function useFitScale(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof ResizeObserver === "undefined") return;
    const measure = () => setScale((el.clientWidth || canvas.width) / canvas.width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, enabled]);
  return scale;
}

/** Background treatments available to a slide. Dark ones flip text to PAPER. */
export type SlideTone = "light" | "tint" | "dark" | "open" | "close" | "deep";

const TONE_CLASS: Record<SlideTone, string> = {
  light: "",
  tint: "nct-slide--tint",
  dark: "nct-slide--dark",
  open: "nct-slide--open",
  close: "nct-slide--close",
  deep: "nct-slide--deep",
};

const DARK_TONES: SlideTone[] = ["dark", "open", "close", "deep"];

export function isDarkTone(tone: SlideTone): boolean {
  return DARK_TONES.includes(tone);
}

/**
 * Which brand furniture the slide wears.
 *
 * `web` is the house system studied from nctthai.com — 0.6in teal rule, footer
 * hairline with date/footer/mark/page. `corp` is the chrome the company
 * requires on every bid, studied from `NCT Template.pptx`: a full-bleed rule
 * edge to edge, the outlined lockup card in the top-right corner, and a
 * three-segment bar at the foot instead of the hairline.
 *
 * Only the chrome and `--nct-accent` change. Paper, ink, tints, status and
 * category colours are shared, so a table renders identically in either mode.
 */
export type SlideBrand = "web" | "corp";

export interface SlideChromeProps {
  /** Footer text, centred on the bottom rule. Set once for the whole deck. */
  footer?: string;
  /** Left slot of the footer rule — usually the date. */
  date?: string;
  /** Page number, right-aligned. */
  pageNumber?: number | string;
  /** Hide the whole footer band (cover slides sometimes want this). */
  hideFooter?: boolean;
  /**
   * `"corp"` swaps in the mandatory proposal chrome. Set it once on `Deck` and
   * every slide inherits it. Defaults to `"web"`.
   */
  brand?: SlideBrand;
  /**
   * Client or product badge shown beside the NCT mark in the corp corner
   * lockup — the slot the source template fills with the project's own logo.
   * Light tones only; ignored in `web` mode.
   */
  partnerMark?: string;
}

export interface SlideProps extends SlideChromeProps {
  /** Background treatment. Layout components set this themselves. */
  tone?: SlideTone;
  /**
   * `true` (default) scales the fixed 1280×720 canvas to the width of its
   * container. `false` renders it at exactly 1280×720.
   */
  fit?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * The slide canvas: a fixed 1280×720 box (13.333in × 7.5in at 96dpi — the same
 * geometry as `NCT-Slide-Template.potx`) plus the footer chrome every layout
 * repeats. Layout components render inside it; use it directly only when you
 * need a one-off slide none of the 18 layouts covers.
 */
export function Slide({
  tone = "light",
  fit = true,
  footer,
  date,
  pageNumber,
  hideFooter,
  brand = "web",
  partnerMark,
  className,
  style,
  children,
}: SlideProps) {
  const dark = isDarkTone(tone);
  const corp = brand === "corp";
  const fitRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(fitRef, fit);
  const board = (
    <div
      className={["nct-slide", TONE_CLASS[tone], corp ? "nct-slide--corp" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {/* The corner lockup is a white card with a teal outline, so it only reads
          on a light ground. On the dark bookends corp mode keeps the plain
          corner mark the footer already carries — which is what the source
          template does on its own dark slides. */}
      {corp && !dark && (
        <div className="nct-corp-lock">
          {partnerMark && <img className="nct-corp-lock__partner" src={partnerMark} alt="" />}
          <img className="nct-corp-lock__mark" src={markColor} alt="" />
        </div>
      )}
      {children}
      {/* the gradient tones run their light end into the bottom-right corner,
          under the page number: --nct-teal-b is 4.0:1 against white even at full
          opacity, so the ground is darkened rather than the ink lightened */}
      {(tone === "open" || tone === "close") && <div className="nct-tone-foot" />}
      {!hideFooter &&
        (corp ? (
          <div className="nct-corp-foot">
            {/* three explicit segments; the source draws the middle one by
                overlapping two bars at 75% alpha and --nct-corp-bar-mid is that
                mix, precomputed. Decoration only — nothing sits on them. */}
            <div className="nct-corp-bar" aria-hidden="true">
              <i /><i /><i />
            </div>
            {/* the corp template has no date slot on a content slide, but its
                cover carries an "Updated date" line bottom-left. Same slot,
                empty until a deck fills it. */}
            {date && <span className="nct-corp-foot__date">{date}</span>}
            <span className="nct-corp-foot__text">{footer}</span>
            <span className="nct-corp-foot__page">{pageNumber}</span>
          </div>
        ) : (
          <div className="nct-footer">
            <span>{date}</span>
            <span className="nct-footer__text">{footer}</span>
            <img className="nct-footer__mark" src={dark ? markWhite : markColor} alt="" />
            <span className="nct-footer__page">{pageNumber}</span>
          </div>
        ))}
    </div>
  );
  if (!fit) return board;
  return (
    <div
      className="nct-slide-fit"
      ref={fitRef}
      style={{ "--nct-scale": scale } as CSSProperties}
    >
      {board}
    </div>
  );
}

/** Slide title + the 0.6in teal rule under it. Used by every light layout. */
export function SlideTitle({ children }: { children?: ReactNode }) {
  return (
    <>
      <h2 className="nct-title">{children}</h2>
      <div className="nct-rule" />
    </>
  );
}

export interface DeckProps extends SlideChromeProps {
  children?: ReactNode;
}

/**
 * Stacks slides vertically for a full deck preview, and owns the chrome.
 *
 * `footer`, `date` and `hideFooter` set here reach every slide, and page numbers
 * are counted from position — hand-typing `pageNumber` on eighteen slides meant
 * inserting one at the front was fourteen edits with nothing to catch a repeat.
 * A prop set on the slide itself still wins, so a cover can pass `hideFooter`
 * or a slide can carry a number the count would not give it.
 */
export function Deck({ children, ...chrome }: DeckProps) {
  const slides = Children.toArray(children).filter(isValidElement);
  return (
    <div className="nct-deck">
      {slides.map((child, i) => {
        const el = child as ReactElement<SlideChromeProps>;
        return cloneElement(el, {
          ...chrome,
          ...el.props,
          pageNumber: el.props.pageNumber ?? i + 1,
        });
      })}
    </div>
  );
}
