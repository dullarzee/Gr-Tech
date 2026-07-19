import { adminNavLinks } from "@/constants/urls/adminNavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminNavBottomTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const pathname = usePathname();
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1 p-2">
        {adminNavLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.url}>
              <button
                className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 transition ${
                  activeTab === item.url
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[10px] mt-1">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
