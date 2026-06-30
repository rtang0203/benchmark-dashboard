"use client";

import type { TenantData, EquipmentRow } from "@/lib/mockData";
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

  const payback = (r: EquipmentRow) =>
    r.netContribution > 0 ? `${Math.ceil(r.payoffBalance / r.netContribution)} mo` : "Never at current pace";

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Equipment P&L</h2>
        <span className="text-[11px] text-ink-faint">Monthly</span>
      </div>

      <div className="bg-card border border-line rounded-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-ink-muted border-b border-line">
              <th className="text-left font-medium px-3 py-2">Machine</th>
              <th className="text-right font-medium px-3 py-2">Monthly Payment</th>
              <th className="text-right font-medium px-3 py-2">Payoff Balance</th>
              <th className="text-right font-medium px-3 py-2">Utilization %</th>
              <th className="text-right font-medium px-3 py-2">Revenue Generated</th>
              <th className="text-right font-medium px-3 py-2">Net Contribution</th>
              <th className="text-right font-medium px-3 py-2">Payback</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((row) => (
              <tr key={row.name} className="border-b border-line hover:bg-row-hover">
                <td className="px-3 py-2 text-ink">{row.name}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.monthlyPayment)}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.payoffBalance)}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{Math.round(row.utilizationPct)}%</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{formatCurrency(row.revenueGenerated)}</td>
                <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.netContribution >= 0 ? "text-pos" : "text-neg"}`}>
                  {formatCurrency(row.netContribution)}
                </td>
                <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.netContribution > 0 ? "text-ink" : "text-ink-faint"}`}>
                  {payback(row)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-ink-muted border-t border-line font-mono tabular-nums text-sm">
              <td className="px-3 py-2 font-medium text-ink-muted">Total</td>
              <td className="px-3 py-2 text-right">{formatCurrency(totals.monthlyPayment)}</td>
              <td className="px-3 py-2" />
              <td className="px-3 py-2" />
              <td className="px-3 py-2 text-right">{formatCurrency(totals.revenueGenerated)}</td>
              <td className={`px-3 py-2 text-right ${totals.netContribution >= 0 ? "text-pos" : "text-neg"}`}>
                {formatCurrency(totals.netContribution)}
              </td>
              <td className="px-3 py-2" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
