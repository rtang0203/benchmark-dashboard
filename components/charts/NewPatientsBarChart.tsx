"use client";

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import type { NewPatientWeek } from "@/lib/mockData";
import { chart } from "@/lib/theme";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border px-3 py-2 text-xs font-mono tabular-nums" style={{ background: chart.tooltipBg, borderColor: chart.tooltipBorder }}>
      <div className="text-slate-400">{label}</div>
      <div className="text-slate-100">{payload[0].value} patients</div>
    </div>
  );
}

export default function NewPatientsBarChart({ data }: { data: NewPatientWeek[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={chart.grid} vertical={false} />
        <XAxis dataKey="week" tick={{ fill: chart.axis, fontSize: 11 }} axisLine={{ stroke: chart.grid }} tickLine={false} />
        <YAxis tick={{ fill: chart.axis, fontSize: 11 }} axisLine={{ stroke: chart.grid }} tickLine={false} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="count" fill={chart.bar} maxBarSize={18} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
