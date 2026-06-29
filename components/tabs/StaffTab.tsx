"use client";

import type { TenantData } from "@/lib/mockData";
import { formatCurrency, formatRatio } from "@/lib/format";
import { Lock } from "@/components/ui/icons";
import Tag from "@/components/ui/Tag";

export default function StaffTab({ tenant }: { tenant: TenantData }) {
  const { staff } = tenant;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Staff &amp; Comp</h2>
        <span className="inline-flex items-center gap-1 text-accent text-[11px] uppercase tracking-wider">
          <Lock className="h-3 w-3" /> Owner only
        </span>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700">
              <th className="text-left font-medium px-3 py-2">Name</th>
              <th className="text-left font-medium px-3 py-2">Role</th>
              <th className="text-right font-medium px-3 py-2">Revenue Produced</th>
              <th className="text-right font-medium px-3 py-2">Base Comp</th>
              <th className="text-right font-medium px-3 py-2">Incentive</th>
              <th className="text-right font-medium px-3 py-2">Total Comp</th>
              <th className="text-right font-medium px-3 py-2">Productivity</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((row) => {
              const totalComp = row.baseComp + row.incentive;
              const productivity = row.revenueProduced / totalComp;
              return (
                <tr
                  key={row.name}
                  className={`border-b border-slate-800 hover:bg-slate-800/40 ${row.flagged ? "border-l-2 border-l-accent" : ""}`}
                >
                  <td className="px-3 py-2 text-slate-200">
                    <span className="flex items-center gap-2">
                      {row.name}
                      {row.flagged && <Tag>Review</Tag>}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-400">{row.role}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.revenueProduced)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.baseComp)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.incentive)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(totalComp)}</td>
                  <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.flagged ? "text-accent" : ""}`}>
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
