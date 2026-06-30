"use client";

import type { ServiceCategoryRevenue } from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";

export default function ServiceMixBars({ services }: { services: ServiceCategoryRevenue[] }) {
  if (services.length === 0) return <p className="text-sm text-ink-faint">No service data.</p>;
  const sorted = [...services].sort((a, b) => b.revenue - a.revenue);
  const total = sorted.reduce((s, r) => s + r.revenue, 0);
  const max = sorted[0].revenue || 1;
  return (
    <div className="flex flex-col gap-2.5">
      {sorted.map((s) => (
        <div key={s.category} className="grid grid-cols-[10rem_1fr_auto] items-center gap-3">
          <span className="text-xs text-ink-muted truncate">{s.category}</span>
          <span className="h-2 rounded-sm bg-row-hover overflow-hidden">
            <span className="block h-full rounded-sm bg-gold" style={{ width: `${(s.revenue / max) * 100}%` }} />
          </span>
          <span className="text-xs font-mono tabular-nums text-ink whitespace-nowrap">
            {formatCurrency(s.revenue)} <span className="text-ink-faint">{total ? Math.round((s.revenue / total) * 100) : 0}%</span>
          </span>
        </div>
      ))}
    </div>
  );
}
