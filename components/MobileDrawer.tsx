"use client";

import { useEffect } from "react";
import type { UserRole, TenantMeta, AppUser } from "@/lib/mockData";
import { tabAccess } from "@/lib/mockData";
import type { CanvasTheme } from "@/lib/theme";
import { X, Sun, Moon, Lock } from "@/components/ui/icons";

const allTabs = [
  { id: "overview",        label: "Overview" },
  { id: "new-patients",    label: "New Patients" },
  { id: "equipment",       label: "Equipment P&L" },
  { id: "staff",           label: "Staff & Comp", locked: true },
  { id: "recommendations", label: "Recommendations" },
] as const;

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (id: string) => void;
  role: UserRole;
  tenants: TenantMeta[];
  tenantId: string;
  tenantName: string;
  onTenantChange: (id: string) => void;
  users: AppUser[];
  activeUser: AppUser;
  onUserChange: (id: string) => void;
  canvasTheme: CanvasTheme;
  onCanvasThemeChange: (t: CanvasTheme) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  role,
  tenants,
  tenantId,
  tenantName,
  onTenantChange,
  users,
  activeUser,
  onUserChange,
  canvasTheme,
  onCanvasThemeChange,
}: MobileDrawerProps) {
  // Prevent body scrolling when the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const allowed = tabAccess[role];
  const tabs = allTabs.filter((t) => allowed.includes(t.id));

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[calc(100vw-3rem)] bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-5 bg-accent rounded-sm" />
              <span className="font-semibold tracking-tight text-slate-100">Benchmark</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium border-l-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                    active
                      ? "border-accent bg-slate-800/80 text-slate-100"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {tab.label}
                  {"locked" in tab && tab.locked && (
                    <Lock className="h-3 w-3 text-slate-500 ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Control Switchers */}
        <div className="mt-8 border-t border-slate-800 pt-5">
          {/* Theme switcher */}
          <div className="mb-5">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-2">Theme</span>
            <div className="flex items-center rounded-md border border-slate-700 overflow-hidden bg-slate-950/40 w-full" role="group" aria-label="Canvas theme">
              <button
                type="button"
                onClick={() => onCanvasThemeChange("light")}
                aria-pressed={canvasTheme === "light"}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium focus:outline-none ${
                  canvasTheme === "light" ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sun className="h-3.5 w-3.5" /> Light
              </button>
              <button
                type="button"
                onClick={() => onCanvasThemeChange("dark")}
                aria-pressed={canvasTheme === "dark"}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium focus:outline-none ${
                  canvasTheme === "dark" ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Moon className="h-3.5 w-3.5" /> Dark
              </button>
            </div>
          </div>

          {/* Tenant Switcher */}
          {activeUser.tenantId === null ? (
            <div className="mb-5">
              <label htmlFor="mobile-tenant-select" className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-2">
                Practice
              </label>
              <select
                id="mobile-tenant-select"
                value={tenantId}
                onChange={(e) => onTenantChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {tenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mb-5">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1">Practice</span>
              <span className="text-sm font-medium text-slate-300">{tenantName}</span>
            </div>
          )}

          {/* User Switcher */}
          <div className="mb-2">
            <label htmlFor="mobile-user-select" className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-2">
              User Profile
            </label>
            <div className="relative">
              <select
                id="mobile-user-select"
                value={activeUser.id}
                onChange={(e) => onUserChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent appearance-none pr-8"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role.toUpperCase()})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
