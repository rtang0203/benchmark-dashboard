/** Canvas theme identifier, shared across the content area. */
export type CanvasTheme = "light" | "dark";

export interface ChartPalette {
  accent: string; grid: string; axis: string; bar: string;
  tooltipBg: string; tooltipBorder: string; tooltipLabel: string; tooltipValue: string;
  centerValue: string; centerLabel: string; legend: string;
  mixNew: string; mixReturning: string;
}

/** Recharts colors per canvas theme. SVG attrs do not resolve CSS vars, so
 *  charts pass concrete hex; these mirror the token sets in globals.css. */
export const chartThemes: Record<CanvasTheme, ChartPalette> = {
  dark: {
    accent: "#c9a14a", grid: "#1e293b", axis: "#94a3b8", bar: "#64748b",
    tooltipBg: "#0f172a", tooltipBorder: "#334155", tooltipLabel: "#94a3b8", tooltipValue: "#f1f5f9",
    centerValue: "#f1f5f9", centerLabel: "#94a3b8", legend: "#94a3b8",
    mixNew: "#c9a14a", mixReturning: "#475569",
  },
  light: {
    accent: "#b8923f", grid: "#e2e5ea", axis: "#64748b", bar: "#94a3b8",
    tooltipBg: "#0d1526", tooltipBorder: "#334155", tooltipLabel: "#cbd5e1", tooltipValue: "#ffffff",
    centerValue: "#0d1526", centerLabel: "#475569", legend: "#475569",
    mixNew: "#b8923f", mixReturning: "#94a3b8",
  },
};
