"use client";

import { useState } from "react";
import { tenants, mockData, users, tabAccess } from "@/lib/mockData";
import type { CanvasTheme } from "@/lib/theme";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import OverviewTab from "@/components/tabs/OverviewTab";
import NewPatientsTab from "@/components/tabs/NewPatientsTab";
import EquipmentTab from "@/components/tabs/EquipmentTab";
import StaffTab from "@/components/tabs/StaffTab";
import RecommendationsTab from "@/components/tabs/RecommendationsTab";
import MobileDrawer from "@/components/MobileDrawer";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeUser = users.find((u) => u.id === activeUserId) ?? users[0];
  const tenant = mockData[tenantId];
  const tenantName = tenants.find((t) => t.id === tenantId)?.name ?? "";

  const handleUserChange = (userId: string) => {
    setActiveUserId(userId);
    const newUser = users.find((u) => u.id === userId) ?? users[0];
    if (newUser.tenantId !== null) {
      setTenantId(newUser.tenantId);
    }
    const allowed = tabAccess[newUser.role];
    if (!allowed.includes(activeTab)) {
      setActiveTab("overview");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        tenants={tenants}
        tenantId={tenantId}
        tenantName={tenantName}
        onTenantChange={setTenantId}
        users={users}
        activeUser={activeUser}
        onUserChange={handleUserChange}
        canvasTheme={canvasTheme}
        onCanvasThemeChange={setCanvasTheme}
        onMenuToggle={() => setIsMobileMenuOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onSelect={setActiveTab} role={activeUser.role} />
        <main data-canvas={canvasTheme} className="flex-1 overflow-auto p-4 md:p-6 bg-canvas text-ink">
          <ActiveTab tabId={activeTab} tenant={tenant} theme={canvasTheme} />
        </main>
      </div>
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        role={activeUser.role}
        tenants={tenants}
        tenantId={tenantId}
        tenantName={tenantName}
        onTenantChange={setTenantId}
        users={users}
        activeUser={activeUser}
        onUserChange={handleUserChange}
        canvasTheme={canvasTheme}
        onCanvasThemeChange={setCanvasTheme}
      />
    </div>
  );
}
