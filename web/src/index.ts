/**
 * @nct/slides — the NCT slide design system as React components.
 *
 * One component per layout in NCT-Slide-Template.potx, same numbering, so a
 * design built here can be rebuilt in PowerPoint by picking the layout with the
 * matching number. Import "@nct/slides/styles.css" once at the app root.
 *
 * Nineteen layouts and two brand modes. Corp is the default: the chrome the
 * company requires on every bid - full-bleed rule, corner lockup, three-segment
 * foot bar; `<Deck brand="web">` gives the house chrome. PowerPoint gets corp as a
 * separate NCT-Slide-Template-Corp.potx, because a .potx layout cannot toggle
 * its own chrome.
 */
export { Slide, SlideTitle, Deck, isDarkTone } from "./Slide";
export type { SlideProps, SlideChromeProps, SlideTone, SlideBrand, SlideFit, DeckProps } from "./Slide";

export {
  NctLogo,
  NctMark,
  BulletList,
  TakeawayBand,
  DataTable,
  CategoryKey,
  Icon,
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
  CategoryKeyItem,
  IconProps,
  DiagramBoxProps,
  TableCell,
  TableRow,
  CellStatus,
  CellAlign,
} from "./primitives";

/* The glyph set for <Icon>, and the one list of it. Bundled into dist, not left as
   an import: design-sync's NctSlides global is built from this entry, and a design
   agent has no npm to fetch lucide-react from. Picked, not all of lucide (816 KB).
   Add a glyph here, list it in conventions.md, and rerun
   scripts/emit_design_icons.mjs for the Claude Design port. */
export {
  AlarmClock,
  BadgeCheck,
  Banknote,
  Bot,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarRange,
  ChartColumn,
  ChartGantt,
  ChartLine,
  CircleAlert,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Clock,
  Cloud,
  Code,
  Coins,
  Cpu,
  CreditCard,
  Database,
  Eye,
  EyeOff,
  FileInput,
  FileText,
  FingerprintPattern,
  Folder,
  Globe,
  HandCoins,
  Handshake,
  HardDrive,
  History,
  Hourglass,
  KeyRound,
  Landmark,
  Laptop,
  Layers,
  Lightbulb,
  Lock,
  LockKeyhole,
  Mail,
  MapPin,
  Milestone,
  Network,
  Phone,
  PiggyBank,
  Plug,
  Receipt,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldUser,
  Smartphone,
  Target,
  Terminal,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  UserCheck,
  Users,
  Wallet,
  Wifi,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

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
  SlidePhaseCard,
  SlideEvidence,
  SlideChart,
  SlideCoverGradient,
} from "./layouts";
export { Chart } from "./chart";
export type { ChartProps, ChartSeries, ChartSeriesList } from "./chart";
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
  FlowSteps,
  AgendaItems,
  SlidePhaseCardProps,
  PhaseMeta,
  PhaseMetaRows,
  SlideEvidenceProps,
  EvidenceFigure,
  EvidenceFigures,
  SlideChartProps,
  ChartInsights,
} from "./layouts";

/* Stock imagery, inlined as data URIs so it survives a CSP that blocks external
   images. Pass one to SlideSection's `image` or SlideFullImage's `src`. It stays
   in this entry because design-sync's NctSlides global is built from it; a
   bundler drops the frames a deck does not import (JS is side-effect free). */
export {
  photoSection,
  photoFacade,
  photoTower,
  photoHandshake,
  mascot,
  coverScatter,
} from "./assets";
export { color, canvas, space, fontSize } from "./tokens";
export type { NctColor } from "./tokens";
