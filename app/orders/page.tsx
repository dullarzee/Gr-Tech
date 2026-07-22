"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  MessageSquare,
} from "lucide-react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";
import { OrderTypes } from "@/types";
import Image from "next/image";
import Header from "@/components/header";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  total: number;
  items: OrderTypes[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "processing":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "shipped":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "completed":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "cancelled":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
  }
};

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "processing":
      return <Package className="w-4 h-4" />;
    case "shipped":
      return <ChevronRight className="w-4 h-4" />;
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
};

const getStatusLabel = (status: Order["status"]) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all",
  );
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.log("in useffect ");
    const fetch = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await axios.get(BEendpoints.get_user_orders(user.id));
        console.log("Orders: ", res.data.data);
        if (!res.data.ok) throw new Error("Failed to fetch orders");

        setOrders(res.data.data);
        console.log("Orders: ", res.data.data);
      } catch (err) {
        console.log(err);
        toast.error(err instanceof Error && err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-64 bg-linear-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`pt-32 pb-20 px-4 md:px-8 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              My Orders
            </h1>
            <p
              className={`mb-8 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              Please log in to view your orders
            </p>
            <Link href="/auth/login">
              <button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3 rounded-lg transition">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders based on status
  const pendingOrders = orders.filter((order) =>
    ["pending", "processing", "shipped"].includes(order.status.toLowerCase()),
  );
  const completedOrders = orders.filter((order) =>
    ["completed", "cancelled"].includes(order.status.toLowerCase()),
  );

  const displayedOrders =
    activeTab === "pending"
      ? pendingOrders
      : activeTab === "completed"
        ? completedOrders
        : orders;

  return (
    <div
      className={`min-h-screen pt-32 pb-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <Header />
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            My Orders
          </h1>
          <p
            className={`${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            View and manage all your orders.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8 border-b border-zinc-800/50">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 px-2 md:px-4 font-semibold text-sm md:text-base transition-colors border-b-2 ${
              activeTab === "all"
                ? "text-amber-400 border-amber-400"
                : "text-zinc-400 border-transparent hover:text-zinc-300"
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-4 px-2 md:px-4 font-semibold text-sm md:text-base transition-colors border-b-2 ${
              activeTab === "pending"
                ? "text-amber-400 border-amber-400"
                : "text-zinc-400 border-transparent hover:text-zinc-300"
            }`}
          >
            Pending ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-4 px-2 md:px-4 font-semibold text-sm md:text-base transition-colors border-b-2 ${
              activeTab === "completed"
                ? "text-amber-400 border-amber-400"
                : "text-zinc-400 border-transparent hover:text-zinc-300"
            }`}
          >
            Completed ({completedOrders.length})
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {displayedOrders.length === 0 ? (
            <div
              className={`text-center py-16 rounded-2xl ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
            >
              <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3
                className={`text-xl font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
              >
                No orders found
              </h3>
              <p
                className={`mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
              >
                {activeTab === "pending"
                  ? "You have no pending orders"
                  : activeTab === "completed"
                    ? "You have no completed orders"
                    : "Start shopping to create your first order"}
              </p>
              <Link href="/products">
                <button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-6 py-2 rounded-lg transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            displayedOrders.map((order) => (
              <div
                key={order.id}
                className={`rounded-2xl p-4 md:p-6 hover:border-amber-400/30 transition-all ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
              >
                {/* Order Header */}
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id,
                    )
                  }
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
                      <h3 className="text-lg md:text-xl font-bold">
                        {order?.id?.slice(0, 8)}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getStatusColor(
                          order.status.toLowerCase() as OrderTypes["status"],
                        )}`}
                      >
                        {getStatusIcon(
                          order.status.toLowerCase() as OrderTypes["status"],
                        )}
                        {getStatusLabel(
                          order.status.toLowerCase() as OrderTypes["status"],
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col md:text-right gap-2">
                    <p className="text-2xl md:text-3xl font-bold text-amber-400">
                      <span className="text-sm">₦</span>
                      {order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-xs md:text-sm text-zinc-400">
                      {order.items.length} items
                    </p>
                  </div>
                </div>

                {/* Quick Info - Mobile Only */}
                <div className="md:hidden mt-4 pb-4 border-b border-zinc-700/50 space-y-2 text-sm text-zinc-300">
                  {order.trackingNumber && (
                    <p>
                      <span className="text-zinc-400">Tracking:</span>{" "}
                      {order.trackingNumber}
                    </p>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t border-zinc-700/50 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className={`flex gap-4 p-3 rounded-lg ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
                          >
                            <div className="w-16 h-16 bg-zinc-700/50 rounded-lg shrink-0 flex items-center justify-center">
                              <Image
                                alt="Ordered product"
                                src={item.orderId}
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold truncate">
                                {item.productName}
                              </h5>
                              <p className="text-sm text-zinc-400">
                                Qty: {item.quantity} ×{" "}
                                <span className="text-[0.6rem]">₦</span>
                                {item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right font-semibold">
                              <span className="text-[0.6rem]">₦</span>
                              {Number(
                                item.price * item.quantity,
                              ).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Two Column Layout for Desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="font-semibold mb-3">Shipping Address</h4>
                        <div
                          className={`p-4 rounded-lg text-sm space-y-1 ${resolvedTheme === "dark" ? `${themePalette.dark.translucent_bg} ${themePalette.dark.text_light}` : `${themePalette.light.translucent_bg} ${themePalette.light.text_dark}`}`}
                        >
                          <p>{order.shippingAddress}</p>
                        </div>
                      </div>

                      {/* Tracking Info */}
                      <div>
                        <h4 className="font-semibold mb-3">
                          Shipping Information
                        </h4>
                        <div
                          className={`p-4 rounded-lg text-sm space-y-2 ${resolvedTheme === "dark" ? `${themePalette.dark.translucent_bg} ${themePalette.dark.text_light}` : `${themePalette.light.translucent_bg} ${themePalette.light.text_dark}`}`}
                        >
                          {order.trackingNumber ? (
                            <>
                              <div>
                                <p className="text-zinc-400 text-xs uppercase">
                                  Tracking Number
                                </p>
                                <p className="font-mono text-amber-400">
                                  {order.trackingNumber}
                                </p>
                              </div>
                            </>
                          ) : (
                            <p className="text-zinc-400">
                              Tracking information not yet available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-lg hover:bg-amber-400/20 transition text-sm font-semibold text-amber-400">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {/* <button className="flex items-center gap-2 px-4 py-2 bg-zinc-700/30 border border-zinc-600/30 rounded-lg hover:bg-zinc-700/50 transition text-sm font-semibold">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button> */}
                      {order.status === "shipped" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/20 transition text-sm font-semibold text-cyan-400">
                          <MessageSquare className="w-4 h-4" />
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Collapse Indicator */}
                <div className="flex justify-center mt-4 md:hidden">
                  <ChevronRight
                    className={`w-5 h-5 text-zinc-400 transition-transform ${
                      expandedOrder === order.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
