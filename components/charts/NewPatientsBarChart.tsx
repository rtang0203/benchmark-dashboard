"use client";

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import type { NewPatientWeek } from "@/lib/mockData";
import { chartThemes, type CanvasTheme, type ChartPalette } from "@/lib/theme";

function ChartTooltip({ active, payload, label, c }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; c?: ChartPalette }) {
  if (!active || !payload?.length || !c) return null;
  return (
    <div className="rounded-sm border px-3 py-2 text-xs font-mono tabular-nums" style={{ background: c.tooltipBg, borderColor: c.tooltipBorder }}>
      <div style={{ color: c.tooltipLabel }}>{label}</div>
      <div style={{ color: c.tooltipValue }}>{payload[0].value} patients</div>
    </div>
  );
}

export default function NewPatientsBarChart({ data, theme }: { data: NewPatientWeek[]; theme: CanvasTheme }) {
  const c = chartThemes[theme];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="week" tick={{ fill: c.axis, fontSize: 11 }} axisLine={{ stroke: c.grid }} tickLine={false} />
        <YAxis tick={{ fill: c.axis, fontSize: 11 }} axisLine={{ stroke: c.grid }} tickLine={false} />
        <Tooltip content={<ChartTooltip c={c} />} />
        <Bar dataKey="count" fill={c.bar} maxBarSize={18} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
