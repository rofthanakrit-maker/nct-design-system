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

export interface SlideChromeProps {
  /** Footer text, centred on the bottom rule. Set once for the whole deck. */
  footer?: string;
  /** Left slot of the footer rule — usually the date. */
  date?: string;
  /** Page number, right-aligned. */
  pageNumber?: number | string;
  /** Hide the whole footer band (cover slides sometimes want this). */
  hideFooter?: boolean;
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
 * need a one-off slide none of the 16 layouts covers.
 */
export function Slide({
  tone = "light",
  fit = true,
  footer,
  date,
  pageNumber,
  hideFooter,
  className,
  style,
  children,
}: SlideProps) {
  const dark = isDarkTone(tone);
  const fitRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(fitRef, fit);
  const board = (
    <div
      className={["nct-slide", TONE_CLASS[tone], className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
      {/* the gradient tones run their light end into the bottom-right corner,
          under the page number: --nct-teal-b is 4.0:1 against white even at full
          opacity, so the ground is darkened rather than the ink lightened */}
      {(tone === "open" || tone === "close") && <div className="nct-tone-foot" />}
      {!hideFooter && (
        <div className="nct-footer">
          <span>{date}</span>
          <span className="nct-footer__text">{footer}</span>
          <img className="nct-footer__mark" src={dark ? markWhite : markColor} alt="" />
          <span className="nct-footer__page">{pageNumber}</span>
        </div>
      )}
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
 * are counted from position — hand-typing `pageNumber` on sixteen slides meant
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
