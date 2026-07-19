import { adminNavLinks } from "@/constants/urls/adminNavLinks";
import { useEffect, useState } from "react";
import { X, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };
  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } hidden lg:block bg-zinc-900 border-r border-zinc-800 transition-all duration-300 fixed top-0 left-0 h-screen overflow-y-auto z-40`}
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        {sidebarOpen && (
          <h2 className="text-lg font-bold text-amber-400">GR-Tech</h2>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 hover:bg-zinc-800 rounded-lg transition"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {adminNavLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.url}>
              <button
                //onClick={() => setActiveTab(item.url)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  activeTab === item.url
                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
