import type { ReactNode } from "react";
import { logoColor, logoWhite, markColor, markWhite } from "./assets";

/* ------------------------------------------------------------------ logo */

export interface NctLogoProps {
  /** `white` is the knockout lockup for dark backgrounds. */
  variant?: "color" | "white";
  /** Width in px on the 1280×720 canvas. Height follows the lockup ratio. */
  width?: number;
  className?: string;
}

/** The full NCT lockup (mark + wordmark). */
export function NctLogo({ variant = "color", width = 269, className }: NctLogoProps) {
  return (
    <img
      className={className}
      src={variant === "white" ? logoWhite : logoColor}
      alt="New Computer Technology Consulting Co., Ltd."
      style={{ width }}
    />
  );
}

/** The diamond mark on its own — the corner signature on every slide. */
export function NctMark({ variant = "color", width = 29, className }: NctLogoProps) {
  return (
    <img
      className={className}
      src={variant === "white" ? markWhite : markColor}
      alt=""
      style={{ width }}
    />
  );
}

/* ------------------------------------------------------------------ bullets */

/** A bullet line. `level` 1–3 maps to the deck's teal dot / en-dash / mid-dot. */
export type BulletItem = string | { text: ReactNode; level?: 1 | 2 | 3 };

export interface BulletListProps {
  items: BulletItem[];
  /** 12pt dense body — legal on layouts 11–14 and 16 only. */
  dense?: boolean;
  /** Switches bullet colour and text to the on-dark palette. */
  onDark?: boolean;
  className?: string;
}

/**
 * The deck's bullet voice. Keep level-1 lines to five per slide and never go
 * deeper than level 2 in a normal content slide.
 */
export function BulletList({ items, dense, onDark, className }: BulletListProps) {
  return (
    <ul
      className={[
        "nct-list",
        dense ? "nct-list--dense" : "",
        onDark ? "nct-list--on-dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => {
        const text = typeof item === "string" ? item : item.text;
        const level = typeof item === "string" ? 1 : item.level ?? 1;
        return (
          <li key={i} className={`nct-list__item nct-list__item--${level}`}>
            {text}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ bands */

export interface TakeawayBandProps {
  /** Short label — "สรุป", "ผลลัพธ์". Set in caps-spaced eyebrow type. */
  label: string;
  /** One line. If it needs two, the slide is carrying too much. */
  children: ReactNode;
  tone?: "tint" | "dark";
}

/**
 * The one-line conclusion strip. Every table slide and every diagram slide must
 * carry one — the reader has to get the point without reading the grid.
 */
export function TakeawayBand({ label, children, tone = "tint" }: TakeawayBandProps) {
  return (
    <div className={`nct-band nct-band--${tone}`}>
      <span className="nct-band__label">{label}</span>
      <span className="nct-band__copy">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ tables */

export type CellStatus = "ok" | "warn" | "risk";
export type CellAlign = "left" | "center" | "right";

export interface TableCell {
  value: ReactNode;
  align?: CellAlign;
  /** Tints the cell with the matching status pair. Data cells only. */
  status?: CellStatus;
  /** Fills the cell with a category colour (1–4) and white bold text. */
  category?: 1 | 2 | 3 | 4;
  bold?: boolean;
}

export type TableRow = (TableCell | string | number)[];

export interface DataTableProps {
  /** Header labels. The header row is navy with white 11pt type. */
  columns: (string | { label: string; align?: CellAlign })[];
  rows: TableRow[];
  /** Relative column widths, e.g. `[3, 1, 1, 1]`. Defaults to equal columns. */
  widths?: number[];
  /**
   * `dense` (default) is the 10pt floor used by layout 16 — never smaller.
   * `roomy` is the 14pt comparison table used by layout 09.
   */
  size?: "dense" | "roomy";
}

const CAT_VAR = ["--nct-cat-1", "--nct-cat-2", "--nct-cat-3", "--nct-cat-4"];

/**
 * The deck's only table style: navy header, PAPER/PAPER2 banding, horizontal
 * hairlines and no vertical rules. Ten body rows is the ceiling — split the
 * slide rather than shrinking the type.
 */
export function DataTable({ columns, rows, widths, size = "dense" }: DataTableProps) {
  const total = widths?.reduce((a, b) => a + b, 0);
  return (
    <table className={`nct-table${size === "roomy" ? " nct-table--roomy" : ""}`}>
      {widths && (
        <colgroup>
          {widths.map((w, i) => (
            <col key={i} style={{ width: `${(w / total!) * 100}%` }} />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          {columns.map((c, i) => {
            const label = typeof c === "string" ? c : c.label;
            const align = typeof c === "string" ? undefined : c.align;
            return (
              <th key={i} data-align={align}>
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            {row.map((raw, c) => {
              const cell: TableCell =
                typeof raw === "object" && raw !== null && "value" in raw
                  ? raw
                  : { value: raw as ReactNode };
              const cls = [
                cell.status ? `nct-status nct-status--${cell.status}` : "",
                cell.category ? "nct-table__chip" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <td
                  key={c}
                  className={cls || undefined}
                  data-align={cell.align}
                  style={{
                    fontWeight: cell.bold ? 700 : undefined,
                    background: cell.category
                      ? `var(${CAT_VAR[cell.category - 1]})`
                      : undefined,
                  }}
                >
                  {cell.value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------------------------------------------------------ diagram kit */

export interface DiagramBoxProps {
  children: ReactNode;
  /** Colours the box with a category tint + matching border. */
  category?: 1 | 2 | 3 | 4;
}

/** A system box: square corners, flat fill, one label. No icons, no shadows. */
export function DiagramBox({ children, category }: DiagramBoxProps) {
  const v = category ? `var(${CAT_VAR[category - 1]})` : undefined;
  return (
    <div
      className="nct-dia-box"
      style={
        category
          ? { borderColor: v, background: `color-mix(in srgb, ${v} 15%, white)` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/** A connector between two boxes: straight, teal, solid triangle head. */
export function DiagramLink({ label }: { label?: string }) {
  return (
    <div className="nct-dia-link">
      <svg width="60" height="24" viewBox="0 0 60 24" aria-hidden="true">
        {label && (
          <text x="30" y="8" textAnchor="middle" fontSize="10" fill="var(--nct-ink-2)">
            {label}
          </text>
        )}
        <line x1="0" y1="16" x2="48" y2="16" stroke="currentColor" strokeWidth="1.7" />
        <polygon points="48,11 60,16 48,21" fill="currentColor" />
      </svg>
    </div>
  );
}

/** A dashed frame grouping boxes that belong together. */
export function DiagramGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="nct-dia-group">
      <span className="nct-dia-group__label">{label}</span>
      {children}
    </div>
  );
}
