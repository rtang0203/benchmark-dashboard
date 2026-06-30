"use client";

import { useState } from "react";
import type { TenantMeta, AppUser } from "@/lib/mockData";
import type { CanvasTheme } from "@/lib/theme";
import { ChevronDown, Sun, Moon } from "@/components/ui/icons";

interface Props {
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

function Dropdown({
  label,
  children,
  buttonClass,
}: {
  label: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 ${buttonClass ?? ""}`}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>
      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <button
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={-1}
          />
          <div className="absolute right-0 mt-1 w-56 bg-slate-800 border border-slate-700 rounded-sm z-20 py-1">
            {children(() => setOpen(false))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TopBar({ tenants, tenantId, tenantName, onTenantChange, users, activeUser, onUserChange, canvasTheme, onCanvasThemeChange }: Props) {

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-slate-800 bg-slate-900">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="h-5 w-5 bg-accent rounded-sm" />
        <span className="font-semibold tracking-tight text-slate-100">Benchmark</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Theme toggle (chrome, not canvas tokens) */}
        <div className="flex items-center rounded-sm border border-slate-700 overflow-hidden" role="group" aria-label="Canvas theme">
          <button
            type="button"
            onClick={() => onCanvasThemeChange("light")}
            aria-pressed={canvasTheme === "light"}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${canvasTheme === "light" ? "bg-slate-700 text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Sun className="h-3.5 w-3.5" /> Light
          </button>
          <button
            type="button"
            onClick={() => onCanvasThemeChange("dark")}
            aria-pressed={canvasTheme === "dark"}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${canvasTheme === "dark" ? "bg-slate-700 text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Moon className="h-3.5 w-3.5" /> Dark
          </button>
        </div>

        <div className="h-5 w-px bg-slate-700" />

        {/* Tenant switcher: admin sees dropdown, staff/owner sees static label */}
        {activeUser.tenantId === null ? (
          <Dropdown
            label={<span className="text-slate-200">{tenantName}</span>}
          >
            {(close) => (
              <>
                {tenants.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onTenantChange(t.id); close(); }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-700/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 ${
                      t.id === tenantId ? "text-accent" : "text-slate-300"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </>
            )}
          </Dropdown>
        ) : (
          <span className="text-sm text-slate-200">{tenantName}</span>
        )}

        {/* Divider */}
        <div className="h-5 w-px bg-slate-700" />

        {/* User switcher */}
        <Dropdown
          label={
            <span className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-slate-700 text-xs grid place-items-center text-slate-300">{activeUser.initials}</span>
              <span className="text-slate-300">{activeUser.name}</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500">{activeUser.role}</span>
            </span>
          }
        >
          {(close) => (
            <>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => { onUserChange(u.id); close(); }}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-700/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 ${
                    u.id === activeUser.id ? "text-accent" : "text-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-slate-700 text-[10px] grid place-items-center text-slate-400">{u.initials}</span>
                    {u.name}
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 ml-auto">{u.role}</span>
                  </span>
                </button>
              ))}
            </>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
