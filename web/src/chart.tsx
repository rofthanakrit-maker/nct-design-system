import type { ReactNode } from "react";

/* The v4 chart marks (slide-design-system-v4.md §3), drawn as plain SVG. Five
   forms on one slide size do not need a chart library: a nice-number scale and
   four mark shapes are the whole of it. Every colour is a --nct-cat-* var, and
   every text is an ink token - series colour never goes on text. */

export interface ChartSeries {
  name: string;
  values: number[];
  /**
   * Colour slot 1–4. Defaults to the series' position. Pin it when a series is
   * dropped from a chart the reader has already seen: colour follows the entity,
   * so the survivors keep their hue instead of shifting up a slot. `"mute"` is
   * "Other" - the tail folded into one series, always last in a stack.
   */
  slot?: 1 | 2 | 3 | 4 | "mute";
}

/** One to four. A fifth series is not a colour - fold it into "Other" or split. */
export type ChartSeriesList =
  | [ChartSeries]
  | [ChartSeries, ChartSeries]
  | [ChartSeries, ChartSeries, ChartSeries]
  | [ChartSeries, ChartSeries, ChartSeries, ChartSeries];

interface ChartBase {
  /** Periods or names. Column holds 12, bar 8 - past that, split the slide. */
  categories: string[];
  /** Axis unit, shown once above the plot ("วันทำการ", "ล้านบาท"), never on every tick. */
  unit?: string;
  format?: (n: number) => string;
}

export type ChartProps = ChartBase &
  (
    | {
        /** Magnitude over periods or categories. One series, one colour. */
        kind: "column" | "bar";
        series: ChartSeries;
        /** Category index to emphasise: it keeps cat-1 and its value; the rest go mute. */
        highlight?: number;
      }
    | {
        /** Trend. Four lines is the ceiling, and at four every end is labelled. */
        kind: "line";
        series: ChartSeriesList;
        /** Series index to emphasise: it takes cat-1, the others go mute. */
        highlight?: number;
      }
    | {
        /** Part-to-whole over periods. Series stack from the baseline in slot order. */
        kind: "stacked";
        series: ChartSeriesList;
      }
  );

const GAP = 2;          // surface gap between touching marks
const R = 4;            // rounded data-end
const BAR_MAX = 24;     // mark thickness cap - never fill the band
const HEAD_H = 28.8;    // unit + legend row, 0.30in
const AXIS_H = 33.6;    // x-axis band, counted INSIDE the chart box
const TICK_W = 57.6;    // y tick gutter, 0.60in
const NAME_W = 172.8;   // bar names, 1.80in
const TIP_W = 57.6;     // room for a value past a bar tip or a line end
const TOP = 28.8;       // room for a value above the tallest column

const cat = (slot: number | "mute") => `var(--nct-cat-${slot})`;
const MUTE = cat("mute");
const defaultFormat = (n: number) => n.toLocaleString("en-US");

/** 0-based ticks on a 1 / 2 / 5 step: four to six of them. Same rule as build.nice_step. */
function niceTicks(max: number): number[] {
  const raw = (max || 1) / 5;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const n = Math.ceil(max / step) || 1;
  return Array.from({ length: n + 1 }, (_, i) => +(i * step).toFixed(6));
}

/** A bar that grows from its baseline: square there, 4px round at the data end. */
function barPath(x: number, y: number, w: number, h: number, dir: "up" | "right") {
  if (dir === "up") {
    const r = Math.min(R, w / 2, h);
    return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
  }
  const r = Math.min(R, h / 2, w);
  return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
}

/**
 * The chart inside a v4 data layout. Fixed px, because the slide canvas is fixed
 * and scales as a whole. Hover shows each mark's `<title>`; a hidden table carries
 * every value for screen readers. (`ponytail:` no tooltip layer - a deck is
 * presented, not explored. Add one the day a deck is opened as a dashboard.)
 */
export function Chart(props: ChartProps & { width: number; height: number }) {
  const { categories, unit, width, height } = props;
  const fmt = props.format ?? defaultFormat;
  const list: ChartSeries[] = Array.isArray(props.series) ? props.series : [props.series];
  const slotOf = (i: number) => list[i].slot ?? i + 1;
  const n = categories.length;
  const svgH = height - HEAD_H;

  // colour per series, after emphasis
  const lineHi = props.kind === "line" ? props.highlight : undefined;
  const seriesColor = (i: number) =>
    lineHi === undefined ? cat(slotOf(i)) : i === lineHi ? cat(1) : MUTE;

  const totals = categories.map((_, c) =>
    props.kind === "stacked"
      ? list.reduce((a, s) => a + s.values[c], 0)
      : Math.max(...list.map((s) => s.values[c])),
  );
  // ponytail: every scale starts at 0, lines included - honest by default; a
  // trend living at 95-99% wants an indexed chart, not a clipped axis
  const ticks = niceTicks(Math.max(...totals));
  const top = ticks[ticks.length - 1];

  const horizontal = props.kind === "bar";
  const left = horizontal ? NAME_W : TICK_W;
  const right = horizontal || props.kind === "line" ? TIP_W : 0;
  const plotTop = horizontal ? 0 : TOP;
  const pw = width - left - right;
  const ph = svgH - plotTop - AXIS_H;
  const band = (horizontal ? ph : pw) / n;
  const thick = Math.min(BAR_MAX, band * 0.6);
  const vy = (v: number) => plotTop + ph * (1 - v / top);    // value -> y (vertical forms)
  const vx = (v: number) => left + pw * (v / top);           // value -> x (bar)

  const marks: ReactNode[] = [];
  const labels: ReactNode[] = [];
  const tip = (key: string, x: number, y: number, v: number, anchor: "middle" | "start") =>
    labels.push(
      <text key={key} className="nct-chart__value" x={x} y={y} textAnchor={anchor}
            dominantBaseline={anchor === "start" ? "middle" : "auto"}>
        {fmt(v)}
      </text>,
    );

  if (props.kind === "column" || props.kind === "bar") {
    const s = list[0];
    const hi = props.highlight;
    // label the emphasised bar; with no emphasis, the largest
    const labelled = hi ?? s.values.indexOf(Math.max(...s.values));
    s.values.forEach((v, c) => {
      const fill = hi === undefined || c === hi ? cat(slotOf(0)) : MUTE;
      const title = <title>{`${categories[c]} · ${s.name}: ${fmt(v)}${unit ? ` ${unit}` : ""}`}</title>;
      if (horizontal) {
        const y = c * band + (band - thick) / 2;
        marks.push(<path key={c} d={barPath(left, y, vx(v) - left, thick, "right")} fill={fill}>{title}</path>);
        if (c === labelled) tip(`v${c}`, vx(v) + 9.6, y + thick / 2, v, "start");
      } else {
        const x = left + c * band + (band - thick) / 2;
        marks.push(<path key={c} d={barPath(x, vy(v), thick, vy(0) - vy(v), "up")} fill={fill}>{title}</path>);
        if (c === labelled) tip(`v${c}`, x + thick / 2, vy(v) - 9.6, v, "middle");
      }
    });
  }

  if (props.kind === "stacked") {
    categories.forEach((name, c) => {
      const x = left + c * band + (band - thick) / 2;
      let acc = 0;
      list.forEach((s, i) => {
        const v = s.values[c];
        const y0 = vy(acc), y1 = vy(acc + v);
        acc += v;
        const last = i === list.length - 1;
        // the gap is surface, not a stroke: each lower segment gives up 2px on top
        const h = Math.max(0, y0 - y1 - (last ? 0 : GAP));
        marks.push(
          <path key={`${c}-${i}`} fill={seriesColor(i)}
                d={last ? barPath(x, y0 - h, thick, h, "up") : `M${x},${y0 - h}h${thick}v${h}h${-thick}Z`}>
            <title>{`${name} · ${s.name}: ${fmt(v)}${unit ? ` ${unit}` : ""}`}</title>
          </path>,
        );
      });
    });
    // one total, at the end of the run - never a number on every column
    tip("total", left + (n - 1) * band + band / 2, vy(totals[n - 1]) - 9.6, totals[n - 1], "middle");
  }

  if (props.kind === "line") {
    // points sit mid-band like columns do: flush to the plot edge, the first
    // period's label collided with the 0 tick
    const px = (c: number) => left + band * (c + 0.5);
    const ends = list.map((s) => vy(s.values[n - 1]));
    // end labels only where they separate - one label line apart, not merely
    // not overlapping; converging ends fall back to the legend
    const sorted = [...ends].sort((a, b) => a - b);
    const clear = sorted.every((y, i) => i === 0 || y - sorted[i - 1] >= 28.8);
    list.forEach((s, i) => {
      const color = seriesColor(i);
      marks.push(
        <g key={i}>
          <path d={s.values.map((v, c) => `${c ? "L" : "M"}${px(c)},${vy(v)}`).join("")}
                fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {s.values.map((v, c) => (
            <circle key={c} cx={px(c)} cy={vy(v)} r={c === n - 1 ? 5 : 12} fill={c === n - 1 ? color : "transparent"}
                    stroke={c === n - 1 ? "var(--nct-paper)" : "none"} strokeWidth={2}>
              <title>{`${categories[c]} · ${s.name}: ${fmt(v)}${unit ? ` ${unit}` : ""}`}</title>
            </circle>
          ))}
        </g>,
      );
      if (clear && (lineHi === undefined || lineHi === i))
        tip(`e${i}`, px(n - 1) + 12, ends[i], s.values[n - 1], "start");
    });
  }

  const legend = list.length > 1;
  return (
    <div className="nct-chart" style={{ width, height }}>
      <div className="nct-chart__head">
        {unit && <span>{unit}</span>}
        {legend &&
          list.map((s, i) => (
            <span className="nct-chart__key" key={i}>
              <i className={props.kind === "line" ? "nct-chart__swatch nct-chart__swatch--line" : "nct-chart__swatch"}
                 style={{ background: seriesColor(i) }} />
              {s.name}
            </span>
          ))}
      </div>
      {/* the hidden table below is what a screen reader gets; the drawing is for eyes */}
      <svg width={width} height={svgH} aria-hidden="true">
        {ticks.map((t) =>
          horizontal ? (
            <g key={t}>
              <line x1={vx(t)} x2={vx(t)} y1={0} y2={ph} stroke={t ? "var(--nct-rule)" : MUTE} strokeWidth={1} />
              <text className="nct-chart__tick" x={vx(t)} y={ph + 24} textAnchor="middle">{fmt(t)}</text>
            </g>
          ) : (
            <g key={t}>
              <line x1={left} x2={left + pw} y1={vy(t)} y2={vy(t)} stroke={t ? "var(--nct-rule)" : MUTE} strokeWidth={1} />
              <text className="nct-chart__tick" x={left - 9.6} y={vy(t)} textAnchor="end" dominantBaseline="middle">
                {fmt(t)}
              </text>
            </g>
          ),
        )}
        {categories.map((name, c) =>
          horizontal ? (
            <text key={c} className="nct-chart__cat" x={left - 12} y={c * band + band / 2}
                  textAnchor="end" dominantBaseline="middle">{name}</text>
          ) : (
            <text key={c} className="nct-chart__cat" textAnchor="middle" y={plotTop + ph + 24}
                  x={left + c * band + band / 2}>
              {name}
            </text>
          ),
        )}
        {marks}
        {labels}
      </svg>
      {/* wrapped: a table will not shrink below its content, so the clip lives on a div */}
      <div className="nct-sr"><table>
        <thead>
          <tr><th />{list.map((s, i) => <th key={i}>{s.name}</th>)}</tr>
        </thead>
        <tbody>
          {categories.map((name, c) => (
            <tr key={c}><th>{name}</th>{list.map((s, i) => <td key={i}>{fmt(s.values[c])}</td>)}</tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
