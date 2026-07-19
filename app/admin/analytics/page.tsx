"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";
import { OrderTypes } from "@/types";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<OrderTypes[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(BEendpoints.get_orders);
        if (!res.data.ok) throw new Error("failed to fetch products");

        setOrders(res.data.data);
      } catch (err) {
        toast.error(err instanceof Error && err.message);
      }
    };
    fetch();
  });
  const paidForOrders = orders.filter(
    (order) => order.paymentStatus.toLowerCase() === "paid",
  );

  const totalRevenue = paidForOrders.reduce((prevValue, order) => {
    return prevValue + order.totalAmount;
  }, 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-2">
            Avg Order Value
          </h3>
          <p className="text-2xl font-bold">
            <span className="text-[0.5rem]">&#8358;</span>
            {(totalRevenue / orders.length).toLocaleString()}
          </p>
        </div>
        <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-2">
            Conversion Rate
          </h3>
          <p className="text-2xl font-bold">3.2%</p>
        </div>
        <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-2">
            Avg Items per Order
          </h3>
          <p className="text-2xl font-bold">2.4</p>
        </div>
      </div>
      <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Analytics Dashboard</h2>
        <p className="text-zinc-400">
          Detailed analytics and charts coming soon
        </p>
      </div>
    </div>
  );
}
