"use client";

import type { TenantData } from "@/lib/mockData";
import type { CanvasTheme } from "@/lib/theme";
import { formatCurrency, formatNumber, formatPercent, formatDate } from "@/lib/format";
import KpiTile from "@/components/ui/KpiTile";
import Delta from "@/components/ui/Delta";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import ServiceMixBars from "@/components/charts/ServiceMixBars";

export default function OverviewTab({ tenant, theme }: { tenant: TenantData; theme: CanvasTheme }) {
  const { kpis, revenueByWeek, services, appointments, memberships } = tenant;

  const missed = appointments.noShow + appointments.cancelled;
  const noShowRate = (missed / appointments.totalBooked) * 100;
  const lostRevenue = missed * appointments.avgTicket;
  const rebookRate = (appointments.rebooked / appointments.completed) * 100;

  return (
    <div>
      {/* Existing KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiTile label="This Week's Revenue" value={formatCurrency(kpis.weekRevenue)}>
          <Delta value={kpis.weekRevenueDeltaPct} />
        </KpiTile>
        <KpiTile label="Month-to-Date Revenue" value={formatCurrency(kpis.mtdRevenue)} />
        <KpiTile label="Active Patients" value={formatNumber(kpis.activePatients)} />
      </div>

      {/* New second tile row: no-show, rebooking, membership MRR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <KpiTile label="No-show / Cancellation Rate" value={formatPercent(noShowRate)}>
          <div className="mt-1 text-xs text-ink-faint">Est. {formatCurrency(lostRevenue)}/mo lost</div>
        </KpiTile>
        <KpiTile label="Rebooking Rate" value={formatPercent(rebookRate)}>
          <div className="mt-1 text-xs text-ink-faint">{formatNumber(appointments.rebooked)} of {formatNumber(appointments.completed)} completed</div>
        </KpiTile>
        <KpiTile label="Membership MRR" value={formatCurrency(memberships.mrr)}>
          <div className="mt-1 text-xs text-ink-faint">{formatNumber(memberships.activeMembers)} active members</div>
        </KpiTile>
      </div>

      {/* Revenue by service category */}
      <div className="mt-6 bg-card border border-line rounded-sm p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
          Revenue by service category, this month
        </h2>
        <ServiceMixBars services={services} />
      </div>

      {/* Revenue chart */}
      <div className="mt-6 bg-card border border-line rounded-sm p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
          Revenue, last 12 weeks
        </h2>
        <RevenueLineChart data={revenueByWeek} theme={theme} />
      </div>

      <p className="mt-3 text-xs text-ink-faint">
        Data current through {formatDate(kpis.dataCurrentThrough)}
      </p>
    </div>
  );
}
