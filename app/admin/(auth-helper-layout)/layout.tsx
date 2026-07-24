"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthHelperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !adminUser) {
      router.replace("/admin/login");
    }
  }, [loading, adminUser, router]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );

  if (!adminUser) return null;
  return <div>{children}</div>;
}
