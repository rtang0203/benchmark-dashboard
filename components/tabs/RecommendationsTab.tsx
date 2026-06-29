"use client";

import type { TenantData } from "@/lib/mockData";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";

export default function RecommendationsTab({ tenant }: { tenant: TenantData }) {
  const { recommendations } = tenant;
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
        Weekly recommendations
      </h2>
      <div className="flex flex-col gap-3">
        {recommendations.map((rec) => (
          <Card key={rec.id}>
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-slate-100">{rec.title}</h3>
              <Tag>{rec.category}</Tag>
            </div>
            <p className="mt-1 text-sm text-slate-400">{rec.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
