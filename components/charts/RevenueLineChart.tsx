"use client";

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import type { WeekPoint } from "@/lib/mockData";
import { chartThemes, type CanvasTheme, type ChartPalette } from "@/lib/theme";
import { formatCurrency } from "@/lib/format";

function ChartTooltip({ active, payload, label, c }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; c?: ChartPalette }) {
  if (!active || !payload?.length || !c) return null;
  return (
    <div className="rounded-sm border px-3 py-2 text-xs font-mono tabular-nums" style={{ background: c.tooltipBg, borderColor: c.tooltipBorder }}>
      <div style={{ color: c.tooltipLabel }}>{label}</div>
      <div style={{ color: c.tooltipValue }}>{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export default function RevenueLineChart({ data, theme }: { data: WeekPoint[]; theme: CanvasTheme }) {
  const c = chartThemes[theme];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="week" tick={{ fill: c.axis, fontSize: 11 }} axisLine={{ stroke: c.grid }} tickLine={false} />
        <YAxis tick={{ fill: c.axis, fontSize: 11 }} axisLine={{ stroke: c.grid }} tickLine={false} tickFormatter={(v: number) => `$${Math.round(v / 1000)}k`} />
        <Tooltip content={<ChartTooltip c={c} />} />
        <Line type="monotone" dataKey="revenue" stroke={c.accent} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
