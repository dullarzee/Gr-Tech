"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { OrderTypes } from "@/types";
import { ArrowLeft, Package, ShoppingBag, UserRound } from "lucide-react";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(BEendpoints.get_orders);
        const target = response.data?.data?.find((item: OrderTypes) => item.id === params.id);
        if (!target) throw new Error("Order not found");
        setOrder(target);
      } catch (error) {
        toast.error((error as Error).message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6 text-zinc-300">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6 text-zinc-300">
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/dashboard" className="rounded-full border border-zinc-700 p-2 hover:bg-zinc-900">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-sm text-zinc-400">Order details</p>
          <h1 className="text-2xl font-semibold">{order.id}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Customer</p>
              <h2 className="text-xl font-semibold">{order.user?.name || order.email}</h2>
            </div>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-sm text-amber-400">
              {order.status}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-400">
                <UserRound className="h-4 w-4" />
                Contact
              </div>
              <p className="text-sm">{order.email}</p>
              <p className="text-sm">{order.phoneNumber || "No phone number provided"}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-400">
                <ShoppingBag className="h-4 w-4" />
                Shipping
              </div>
              <p className="text-sm">{order.shippingAddress || "No shipping address provided"}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-zinc-400">
              <Package className="h-4 w-4" />
              Items
            </div>
            <div className="space-y-3">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
                  <div>
                    <p className="font-medium">{item.productName || item.productId}</p>
                    <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-amber-400">₦{item.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <h3 className="mb-4 text-lg font-semibold">Payment summary</h3>
            <div className="space-y-3 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₦{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee</span>
                <span>₦{(order.shippingFee ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₦{(order.tax ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-3 font-semibold text-white">
                <span>Payment status</span>
                <span>{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <h3 className="mb-3 text-lg font-semibold">Timeline</h3>
            <p className="text-sm text-zinc-400">Created: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-sm text-zinc-400">Updated: {new Date(order.updatedAt ?? order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
