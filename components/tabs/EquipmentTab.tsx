"use client";

import type { TenantData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";

export default function EquipmentTab({ tenant }: { tenant: TenantData }) {
  const { equipment } = tenant;
  const totals = equipment.reduce(
    (acc, r) => ({
      monthlyPayment: acc.monthlyPayment + r.monthlyPayment,
      revenueGenerated: acc.revenueGenerated + r.revenueGenerated,
      netContribution: acc.netContribution + r.netContribution,
    }),
    { monthlyPayment: 0, revenueGenerated: 0, netContribution: 0 },
  );

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Equipment P&L</h2>
        <span className="text-[11px] text-slate-500">Monthly</span>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700">
              <th className="text-left font-medium px-3 py-2">Machine</th>
              <th className="text-right font-medium px-3 py-2">Monthly Payment</th>
              <th className="text-right font-medium px-3 py-2">Payoff Balance</th>
              <th className="text-right font-medium px-3 py-2">Utilization %</th>
              <th className="text-right font-medium px-3 py-2">Revenue Generated</th>
              <th className="text-right font-medium px-3 py-2">Net Contribution</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((row) => (
              <tr key={row.name} className="border-b border-slate-800 hover:bg-slate-800/40">
                <td className="px-3 py-2 text-slate-200">{row.name}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.monthlyPayment)}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.payoffBalance)}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{Math.round(row.utilizationPct)}%</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.revenueGenerated)}</td>
                <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.netContribution >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {formatCurrency(row.netContribution)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-slate-300 border-t border-slate-700 font-mono tabular-nums text-sm">
              <td className="px-3 py-2 font-medium text-slate-400">Total</td>
              <td className="px-3 py-2 text-right">{formatCurrency(totals.monthlyPayment)}</td>
              <td className="px-3 py-2" />
              <td className="px-3 py-2" />
              <td className="px-3 py-2 text-right">{formatCurrency(totals.revenueGenerated)}</td>
              <td className={`px-3 py-2 text-right ${totals.netContribution >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {formatCurrency(totals.netContribution)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
