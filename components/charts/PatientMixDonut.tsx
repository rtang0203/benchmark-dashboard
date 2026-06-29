"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { chart } from "@/lib/theme";
import { formatNumber } from "@/lib/format";

interface Props {
  newPatients: number;
  returningPatients: number;
}

export default function PatientMixDonut({ newPatients, returningPatients }: Props) {
  const total = newPatients + returningPatients;
  const data = [
    { name: "New", value: newPatients },
    { name: "Returning", value: returningPatients },
  ];
  const colors = [chart.mixNew, chart.mixReturning];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-mono tabular-nums text-slate-100">{formatNumber(total)}</span>
        <span className="text-[11px] text-slate-400">Total</span>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-4 -mt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: chart.mixNew }} />
          New ({formatNumber(newPatients)})
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: chart.mixReturning }} />
          Returning ({formatNumber(returningPatients)})
        </span>
      </div>
    </div>
  );
}
