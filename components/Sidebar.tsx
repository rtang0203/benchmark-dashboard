"use client";

import { Lock } from "@/components/ui/icons";
import type { UserRole } from "@/lib/mockData";
import { tabAccess } from "@/lib/mockData";

const allTabs = [
  { id: "overview",        label: "Overview" },
  { id: "new-patients",    label: "New Patients" },
  { id: "equipment",       label: "Equipment P&L" },
  { id: "staff",           label: "Staff & Comp", locked: true },
  { id: "recommendations", label: "Recommendations" },
] as const;

interface Props {
  activeTab: string;
  onSelect: (id: string) => void;
  role: UserRole;
}

export default function Sidebar({ activeTab, onSelect, role }: Props) {
  const allowed = tabAccess[role];
  const tabs = allTabs.filter((t) => allowed.includes(t.id));

  return (
    <nav className="w-56 shrink-0 border-r border-slate-800 bg-slate-900 py-3">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm border-l-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 ${
              active
                ? "border-accent bg-slate-800 text-slate-100"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {tab.label}
            {"locked" in tab && tab.locked && (
              <Lock className="h-3 w-3 text-slate-500" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
