import type { ReactNode } from "react";

interface KpiTileProps {
  label: string;
  value: string;
  children?: ReactNode;
}

export default function KpiTile({ label, value, children }: KpiTileProps) {
  return (
    <div className="bg-card border border-line rounded-sm p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-2 text-2xl font-mono tabular-nums text-ink">{value}</div>
      {children}
    </div>
  );
}
