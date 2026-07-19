"use client";

import AdminSidebar from "@/components/adminComponents/adminSidebar";
import AdminNavBottomTab from "@/components/adminComponents/adminNavBottomTab";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminNavLinks } from "@/constants/urls/adminNavLinks";

export default function adminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setAdminUser(JSON.parse(user));
      setLoading(false);
    }
  }, [router]);

  const title =
    adminNavLinks.find((link) => activeTab.includes(link.label))?.label ||
    "Dashboard";

  return (
    <div className="">
      <div
        className={`bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between max-w-screen ${sidebarOpen ? "pl-auto lg:pl-64" : "lg:pl-20"}`}
      >
        <h1 className="text-2xl font-bold capitalize">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">{adminUser?.name}</p>
            <p className="text-xs text-zinc-400">{adminUser?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <span className="text-sm font-bold text-amber-400">
              {adminUser?.name?.[0]}
            </span>
          </div>
        </div>
      </div>

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className={`lg:p-4 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {children}
      </div>
      <AdminNavBottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
