import AdminRootLayout from "@/components/adminComponents/mainAdminDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
