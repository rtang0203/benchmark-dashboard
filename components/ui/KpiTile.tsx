import type { ReactNode } from "react";

interface KpiTileProps {
  label: string;
  value: string;
  children?: ReactNode;
}

export default function KpiTile({ label, value, children }: KpiTileProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-sm p-4">
      <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-mono tabular-nums text-slate-100">{value}</div>
      {children}
    </div>
  );
}
