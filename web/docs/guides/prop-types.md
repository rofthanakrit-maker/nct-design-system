# Shared prop types

The per-component `.d.ts` files name these types but cannot carry their bodies —
they are shared across layouts, so the extractor leaves them as bare names. This
file is the definition. Everything here is the real shipped type from
`@nct/slides`; nothing is a summary.

## Bullets — `BulletItem`

Used by `BulletList`, `SlideContent`, `SlideTwoColumn`, `SlideSplitPanel`.

```ts
type BulletItem = string | { text: ReactNode; level?: 1 | 2 | 3 };
```

A bare string is level 1. `level` 1–3 maps to the teal dot, the en-dash and the
mid-dot. Five level-1 lines is the ceiling on a content slide.

## Tables — `TableRow`, `TableCell`, `CellStatus`, `CellAlign`

Used by `DataTable`, `SlideTable`, `SlideDenseTable`.

```ts
type CellStatus = "ok" | "warn" | "risk";
type CellAlign = "left" | "center" | "right";

interface TableCell {
  value: ReactNode;
  align?: CellAlign;
  /** Tints the cell with the matching status pair. Data cells only. */
  status?: CellStatus;
  /** A category colour (1–4) as a bar down the leading edge, not a fill.
      A coded column needs a CategoryKey on the same slide. */
  category?: 1 | 2 | 3 | 4;
  bold?: boolean;
  /** Merge this cell down over `rowSpan` rows. Every row the merge swallows
      must carry an explicit `null` in the same position — the grid is
      fixed-layout, so a short row shifts every later cell one column left. */
  rowSpan?: number;
}

/** `null` means "covered by a rowSpan above". It renders nothing. */
type TableRow = (TableCell | string | number | null)[];

/** Header cells. */
type Column = string | { label: ReactNode; align?: CellAlign };
```

## Figures and cards

```ts
/** SlideKeyFigures — exactly three. */
interface FigureItem { value: ReactNode; label: ReactNode }

/** SlideThreeCards — exactly three; heights are fixed, so trim the copy. */
interface CardItem { heading: ReactNode; body?: ReactNode }

/** SlideFourCards — exactly four. `number` is "01"–"04"; omit it and the
    index is used. */
interface NumberedCard extends CardItem { number?: string }
```

## Flow, phase, evidence, agenda

```ts
/** SlideProcessFlow — three to five, never more: a step is a fixed
    --nct-fifth wide and a sixth runs off the body box. */
interface FlowStep { heading: ReactNode; body?: ReactNode }
type FlowSteps = [FlowStep, FlowStep, FlowStep]
  | [FlowStep, FlowStep, FlowStep, FlowStep]
  | [FlowStep, FlowStep, FlowStep, FlowStep, FlowStep];

/** SlidePhaseCard — one or two rows, never three. */
interface PhaseMeta { label: ReactNode; value: ReactNode }
type PhaseMetaRows = [PhaseMeta] | [PhaseMeta, PhaseMeta];

/** SlideEvidence — two to four frames, real screenshots or real photographs. */
interface EvidenceFigure { src: string; alt?: string; caption: ReactNode }

/** SlideAgenda — four to six lines. */
type AgendaItems = [ReactNode, ReactNode, ReactNode, ReactNode]
  | [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode]
  | [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
```

## Charts — `ChartSeries`

Used by `Chart` and by `SlideChart`'s `chart` prop.

```ts
interface ChartSeries {
  name: string;
  values: number[];
  /** Colour slot 1–4, defaulting to the series' position. Pin it when a series
      is dropped from a chart the reader has already seen. `"mute"` is the
      folded "Other" tail and is always last in a stack. */
  slot?: 1 | 2 | 3 | 4 | "mute";
}

type ChartProps =
  { categories: string[]; unit?: string; format?: (n: number) => string } & (
    | { kind: "column" | "bar"; series: ChartSeries; highlight?: number }
    | { kind: "line"; series: ChartSeries[]; highlight?: number }
    | { kind: "stacked"; series: ChartSeries[] }
  );
```

`highlight` on `column`/`bar` emphasises a **category** index; on `line` it
emphasises a **series** index. `stacked` has none. `line` and `stacked` take one
to four series.

`Chart` used bare also needs `width` and `height` in px — the SVG has no
intrinsic size and collapses to nothing without them. Layout 19 draws it at
806×365. `SlideChart` sets both for you.

## Icons — `LucideIcon`

`Icon`'s `icon` prop takes the glyph **component**, not a name:

```tsx
import { Icon, Truck } from "@nct/slides";
<Icon icon={Truck} size="body" tone="accent" />
```

The 74 glyphs listed in the README ship inside the bundle; nothing else is
available, and an SVG drawn by hand is off-system.

## Chrome — every layout

Every layout also accepts the chrome props (`footer`, `date`, `pageNumber`,
`hideFooter`, `brand`, `partnerMark`) and `fit`. Set `footer`, `date` and
`brand` once on `Deck`; a prop set on the slide itself still wins.

```ts
type SlideBrand = "web" | "corp";
type SlideTone = "light" | "tint" | "dark" | "open" | "close" | "deep";
type SlideFit = boolean | "width" | "contain";
```
