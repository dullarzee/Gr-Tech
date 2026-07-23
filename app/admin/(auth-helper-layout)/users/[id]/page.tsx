"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { FetchedUserTypes } from "@/types";
import { ArrowLeft, Mail, Phone, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<FetchedUserTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(BEendpoints.get_users);
        const target = response.data?.data?.find((item: FetchedUserTypes) => item.id === params.id);
        if (!target) throw new Error("User not found");
        setUser(target);
      } catch (error) {
        toast.error((error as Error).message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 p-6 text-zinc-300">Loading user details...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-zinc-950 p-6 text-zinc-300">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/dashboard" className="rounded-full border border-zinc-700 p-2 hover:bg-zinc-900">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-sm text-zinc-400">User profile</p>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/10 text-xl font-semibold text-amber-400">
            {user.name?.[0]}
          </div>
          <div className="space-y-4 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              {user.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-zinc-400" />
              {user.phoneNumber || "No phone number provided"}
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-zinc-400" />
              {user.order?.length ?? 0} orders
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent orders</h2>
          {user.order?.length ? (
            <div className="space-y-3">
              {user.order.map((order: any) => (
                <div key={order.id} className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{order.id}</p>
                    <span className="text-sm text-amber-400">₦{order.totalAmount?.toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{order.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">This user has no orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
