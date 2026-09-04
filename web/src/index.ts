/**
 * @nct/slides — the NCT slide design system as React components.
 *
 * One component per layout in NCT-Slide-Template.potx, same numbering, so a
 * design built here can be rebuilt in PowerPoint by picking the layout with the
 * matching number. Import "@nct/slides/styles.css" once at the app root.
 */
export { Slide, SlideTitle, Deck, isDarkTone } from "./Slide";
export type { SlideProps, SlideChromeProps, SlideTone } from "./Slide";

export {
  NctLogo,
  NctMark,
  BulletList,
  TakeawayBand,
  DataTable,
  DiagramBox,
  DiagramLink,
  DiagramGroup,
} from "./primitives";
export type {
  NctLogoProps,
  BulletItem,
  BulletListProps,
  TakeawayBandProps,
  DataTableProps,
  DiagramBoxProps,
  TableCell,
  TableRow,
  CellStatus,
  CellAlign,
} from "./primitives";

export {
  SlideCover,
  SlideSection,
  SlideContent,
  SlideTwoColumn,
  SlideThreeCards,
  SlideKeyFigures,
  SlideQuote,
  SlideFullImage,
  SlideTable,
  SlideClosing,
  SlideSplitPanel,
  SlideFourCards,
  SlideProcessFlow,
  SlideDiagram,
  SlideAgenda,
  SlideDenseTable,
} from "./layouts";
export type {
  SlideCoverProps,
  SlideSectionProps,
  SlideContentProps,
  SlideTwoColumnProps,
  SlideThreeCardsProps,
  SlideKeyFiguresProps,
  SlideQuoteProps,
  SlideFullImageProps,
  SlideTableProps,
  SlideClosingProps,
  SlideSplitPanelProps,
  SlideFourCardsProps,
  SlideProcessFlowProps,
  SlideDiagramProps,
  SlideAgendaProps,
  SlideDenseTableProps,
  CardItem,
  NumberedCard,
  FigureItem,
  FlowStep,
} from "./layouts";

/* Stock imagery, inlined as data URIs so it survives a CSP that blocks external
   images. Pass one to SlideSection's `image` or SlideFullImage's `src`. */
export {
  photoSection,
  photoFacade,
  photoTower,
  photoHandshake,
  mascot,
} from "./assets";
export { color, canvas, space, fontSize } from "./tokens";
export type { NctColor } from "./tokens";
