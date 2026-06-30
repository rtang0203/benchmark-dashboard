"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { chartThemes, type CanvasTheme } from "@/lib/theme";
import { formatNumber } from "@/lib/format";

interface Props {
  newPatients: number;
  returningPatients: number;
  theme: CanvasTheme;
}

export default function PatientMixDonut({ newPatients, returningPatients, theme }: Props) {
  const c = chartThemes[theme];
  const total = newPatients + returningPatients;
  const data = [
    { name: "New", value: newPatients },
    { name: "Returning", value: returningPatients },
  ];
  const colors = [c.mixNew, c.mixReturning];

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
        <span className="text-xl font-mono tabular-nums" style={{ color: c.centerValue }}>{formatNumber(total)}</span>
        <span className="text-[11px]" style={{ color: c.centerLabel }}>Total</span>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-4 -mt-2 text-xs">
        <span className="flex items-center gap-1.5" style={{ color: c.legend }}>
          <span className="h-2 w-2 rounded-full" style={{ background: c.mixNew }} />
          New ({formatNumber(newPatients)})
        </span>
        <span className="flex items-center gap-1.5" style={{ color: c.legend }}>
          <span className="h-2 w-2 rounded-full" style={{ background: c.mixReturning }} />
          Returning ({formatNumber(returningPatients)})
        </span>
      </div>
    </div>
  );
}
