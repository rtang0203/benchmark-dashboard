"use client";

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import type { WeekPoint } from "@/lib/mockData";
import { chart } from "@/lib/theme";
import { formatCurrency } from "@/lib/format";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border px-3 py-2 text-xs font-mono tabular-nums" style={{ background: chart.tooltipBg, borderColor: chart.tooltipBorder }}>
      <div className="text-slate-400">{label}</div>
      <div className="text-slate-100">{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export default function RevenueLineChart({ data }: { data: WeekPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={chart.grid} vertical={false} />
        <XAxis dataKey="week" tick={{ fill: chart.axis, fontSize: 11 }} axisLine={{ stroke: chart.grid }} tickLine={false} />
        <YAxis tick={{ fill: chart.axis, fontSize: 11 }} axisLine={{ stroke: chart.grid }} tickLine={false} tickFormatter={(v: number) => `$${Math.round(v / 1000)}k`} />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="revenue" stroke={chart.accent} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
