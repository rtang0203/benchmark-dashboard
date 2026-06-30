"use client";

import { useState, useEffect } from "react";
import { tenants, mockData, users, tabAccess } from "@/lib/mockData";
import type { CanvasTheme } from "@/lib/theme";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import OverviewTab from "@/components/tabs/OverviewTab";
import NewPatientsTab from "@/components/tabs/NewPatientsTab";
import EquipmentTab from "@/components/tabs/EquipmentTab";
import StaffTab from "@/components/tabs/StaffTab";
import RecommendationsTab from "@/components/tabs/RecommendationsTab";

function ActiveTab({ tabId, tenant, theme }: { tabId: string; tenant: (typeof mockData)[string]; theme: CanvasTheme }) {
  switch (tabId) {
    case "new-patients":    return <NewPatientsTab tenant={tenant} theme={theme} />;
    case "equipment":       return <EquipmentTab tenant={tenant} />;
    case "staff":           return <StaffTab tenant={tenant} />;
    case "recommendations": return <RecommendationsTab tenant={tenant} />;
    default:                return <OverviewTab tenant={tenant} theme={theme} />;
  }
}

export default function Dashboard() {
  const [tenantId, setTenantId] = useState("lumiere");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeUserId, setActiveUserId] = useState("alex");
  const [canvasTheme, setCanvasTheme] = useState<CanvasTheme>("light");

  const activeUser = users.find((u) => u.id === activeUserId) ?? users[0];
  const tenant = mockData[tenantId];
  const tenantName = tenants.find((t) => t.id === tenantId)?.name ?? "";

  // When user changes: lock tenant for staff/owner, keep current for admin
  useEffect(() => {
    if (activeUser.tenantId !== null) {
      setTenantId(activeUser.tenantId);
    }
  }, [activeUser.tenantId]);

  // If the current tab is not accessible for this role, fall back to overview
  useEffect(() => {
    const allowed = tabAccess[activeUser.role];
    if (!allowed.includes(activeTab)) {
      setActiveTab("overview");
    }
  }, [activeUser.role, activeTab]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        tenants={tenants}
        tenantId={tenantId}
        tenantName={tenantName}
        onTenantChange={setTenantId}
        users={users}
        activeUser={activeUser}
        onUserChange={setActiveUserId}
        canvasTheme={canvasTheme}
        onCanvasThemeChange={setCanvasTheme}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onSelect={setActiveTab} role={activeUser.role} />
        <main data-canvas={canvasTheme} className="flex-1 overflow-auto p-6 bg-canvas text-ink">
          <ActiveTab tabId={activeTab} tenant={tenant} theme={canvasTheme} />
        </main>
      </div>
    </div>
  );
}
