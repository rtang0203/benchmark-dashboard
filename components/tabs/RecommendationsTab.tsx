"use client";

import type { TenantData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";

export default function RecommendationsTab({ tenant }: { tenant: TenantData }) {
  const { recommendations } = tenant;
  const sorted = [...recommendations].sort((a, b) => b.impactPerMonth - a.impactPerMonth);
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
        Weekly recommendations
      </h2>
      <div className="flex flex-col gap-3">
        {sorted.map((rec) => (
          <Card key={rec.id}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-medium text-ink">{rec.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono tabular-nums text-gold whitespace-nowrap">~{formatCurrency(rec.impactPerMonth)}/mo</span>
                <Tag>{rec.category}</Tag>
              </div>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{rec.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
