"use client";

import type { TenantData } from "@/lib/mockData";
import { chartThemes, type CanvasTheme } from "@/lib/theme";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/format";
import KpiTile from "@/components/ui/KpiTile";
import NewPatientsBarChart from "@/components/charts/NewPatientsBarChart";
import PatientMixDonut from "@/components/charts/PatientMixDonut";

export default function NewPatientsTab({ tenant, theme }: { tenant: TenantData; theme: CanvasTheme }) {
  const { newPatients, newPatientsByWeek, retention } = tenant;
  const c = chartThemes[theme];

  const { newRevenue, returningRevenue } = newPatients;
  const totalRev = newRevenue + returningRevenue;
  const retPct = retention.cohortSize ? (retention.returned / retention.cohortSize) * 100 : 0;

  return (
    <div>
      {/* Existing top row: bar chart + KPI + donut */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left two columns: bar chart */}
        <div className="col-span-2 bg-card border border-line rounded-sm p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
            New patients, last 12 weeks
          </h2>
          <NewPatientsBarChart data={newPatientsByWeek} theme={theme} />
        </div>

        {/* Right column: KPI + donut stacked */}
        <div className="flex flex-col gap-4">
          <KpiTile label="New Patients This Month" value={formatNumber(newPatients.thisMonth)} />
          <div className="bg-card border border-line rounded-sm p-4 flex-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
              New vs returning, this month
            </h2>
            <PatientMixDonut
              newPatients={newPatients.newPatients}
              returningPatients={newPatients.returningPatients}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* New second row: revenue split + retention */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Revenue split card */}
        <div className="col-span-2 bg-card border border-line rounded-sm p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
            New vs returning revenue, this month
          </h2>
          {/* Stacked bar */}
          <div className="flex h-3 rounded-sm overflow-hidden">
            <span style={{ flexGrow: newRevenue, backgroundColor: c.mixNew }} />
            <span style={{ flexGrow: returningRevenue, backgroundColor: c.mixReturning }} />
          </div>
          {/* Legend */}
          <div className="mt-3 flex gap-6 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: c.mixNew }} />
              <span className="text-ink">New {formatCurrency(newRevenue)}</span>
              <span className="text-ink-faint">({totalRev ? Math.round((newRevenue / totalRev) * 100) : 0}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: c.mixReturning }} />
              <span className="text-ink">Returning {formatCurrency(returningRevenue)}</span>
              <span className="text-ink-faint">({totalRev ? Math.round((returningRevenue / totalRev) * 100) : 0}%)</span>
            </span>
          </div>
        </div>

        {/* 90-day retention tile */}
        <KpiTile label="90-Day Retention" value={formatPercent(retPct)}>
          <div className="mt-1 text-xs text-ink-faint">{formatNumber(retention.returned)} of {formatNumber(retention.cohortSize)} new patients returned</div>
        </KpiTile>
      </div>
    </div>
  );
}
