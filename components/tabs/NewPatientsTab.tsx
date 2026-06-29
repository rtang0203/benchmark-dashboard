"use client";

import type { TenantData } from "@/lib/mockData";
import { formatNumber } from "@/lib/format";
import KpiTile from "@/components/ui/KpiTile";
import NewPatientsBarChart from "@/components/charts/NewPatientsBarChart";
import PatientMixDonut from "@/components/charts/PatientMixDonut";

export default function NewPatientsTab({ tenant }: { tenant: TenantData }) {
  const { newPatients, newPatientsByWeek } = tenant;
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left two columns: bar chart */}
      <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-sm p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          New patients, last 12 weeks
        </h2>
        <NewPatientsBarChart data={newPatientsByWeek} />
      </div>

      {/* Right column: KPI + donut stacked */}
      <div className="flex flex-col gap-4">
        <KpiTile label="New Patients This Month" value={formatNumber(newPatients.thisMonth)} />
        <div className="bg-slate-800 border border-slate-700 rounded-sm p-4 flex-1">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            New vs returning, this month
          </h2>
          <PatientMixDonut
            newPatients={newPatients.newPatients}
            returningPatients={newPatients.returningPatients}
          />
        </div>
      </div>
    </div>
  );
}
