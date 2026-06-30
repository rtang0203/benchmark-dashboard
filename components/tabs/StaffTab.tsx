"use client";

import type { TenantData } from "@/lib/mockData";
import { formatCurrency, formatRatio, formatPercent } from "@/lib/format";
import { Lock } from "@/components/ui/icons";
import Tag from "@/components/ui/Tag";

export default function StaffTab({ tenant }: { tenant: TenantData }) {
  const { staff } = tenant;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Staff &amp; Comp</h2>
        <span className="inline-flex items-center gap-1 text-gold text-[11px] uppercase tracking-wider">
          <Lock className="h-3 w-3" /> Owner only
        </span>
      </div>

      <div className="bg-card border border-line rounded-sm overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[650px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-ink-muted border-b border-line">
              <th className="text-left font-medium px-3 py-2">Name</th>
              <th className="text-left font-medium px-3 py-2">Role</th>
              <th className="text-right font-medium px-3 py-2">Revenue Produced</th>
              <th className="text-right font-medium px-3 py-2">Base Comp</th>
              <th className="text-right font-medium px-3 py-2">Incentive</th>
              <th className="text-right font-medium px-3 py-2">Total Comp</th>
              <th className="text-right font-medium px-3 py-2">Comp % of Rev</th>
              <th className="text-right font-medium px-3 py-2">Productivity</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((row) => {
              const totalComp = row.baseComp + row.incentive;
              const productivity = row.revenueProduced / totalComp;
              const compPct = row.revenueProduced ? (totalComp / row.revenueProduced) * 100 : 0;
              return (
                <tr
                  key={row.name}
                  className={`border-b border-line hover:bg-row-hover ${row.flagged ? "border-l-2 border-l-gold" : ""}`}
                >
                  <td className="px-3 py-2 text-ink">
                    <span className="flex items-center gap-2">
                      {row.name}
                      {row.flagged && <Tag>Review</Tag>}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-ink-muted">{row.role}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.revenueProduced)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.baseComp)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.incentive)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(totalComp)}</td>
                  <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.flagged ? "text-gold" : "text-ink-muted"}`}>
                    {formatPercent(compPct)}
                  </td>
                  <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.flagged ? "text-gold" : ""}`}>
                    {formatRatio(productivity)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
