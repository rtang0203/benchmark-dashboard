"use client";

import type { TenantData } from "@/lib/mockData";
import { formatCurrency, formatNumber, formatDate } from "@/lib/format";
import KpiTile from "@/components/ui/KpiTile";
import Delta from "@/components/ui/Delta";
import RevenueLineChart from "@/components/charts/RevenueLineChart";

export default function OverviewTab({ tenant }: { tenant: TenantData }) {
  const { kpis, revenueByWeek } = tenant;
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <KpiTile label="This Week's Revenue" value={formatCurrency(kpis.weekRevenue)}>
          <Delta value={kpis.weekRevenueDeltaPct} />
        </KpiTile>
        <KpiTile label="Month-to-Date Revenue" value={formatCurrency(kpis.mtdRevenue)} />
        <KpiTile label="Active Patients" value={formatNumber(kpis.activePatients)} />
      </div>

      <div className="mt-6 bg-slate-800 border border-slate-700 rounded-sm p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Revenue, last 12 weeks
        </h2>
        <RevenueLineChart data={revenueByWeek} />
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Data current through {formatDate(kpis.dataCurrentThrough)}
      </p>
    </div>
  );
}
