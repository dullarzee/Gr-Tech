"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OrderTypes } from "@/types";
import { Button } from "../ui/button";
import { getStatusColor_order } from "@/lib/utils";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import DeleteConfirmModal from "./deleteConfirmModal";

export default function OrdersPage() {
  const [orderList, setOrderList] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<OrderTypes | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const orders = await axios.get(BEendpoints.get_orders);
        if (!orders.data.ok) throw new Error("Couldn't fetch orders");
        setOrderList(orders.data.data);
      } catch (err) {
        toast.error(
          (err instanceof Error && err.message) || "Failed to fetch data",
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await axios.delete(BEendpoints.delete_order(deleteTarget.id));
      if (!res.data.ok)
        throw new Error(res.data.message || "order not deleted");
      setOrderList((prev) =>
        prev.filter((order) => order.id !== deleteTarget.id),
      );
      toast.success(`Deleted order ${deleteTarget.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Order deletion failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-700/50 flex items-center justify-between">
          <h2 className="text-lg font-bold">All Orders</h2>
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold py-2 px-4 rounded-lg">
            Export Orders
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-700/50 hover:bg-zinc-900/50 transition"
                >
                  <td className="px-4 py-4 text-sm font-semibold">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-sm">{order.user.name}</td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    <span className="text-[0.6rem]">&#8358;</span>
                    {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm">{order?.items?.length}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${getStatusColor_order(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-400">
                    {new Date(order.createdAt).toISOString().slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-1 hover:bg-amber-400/10 rounded transition"
                      >
                        <Eye className="w-4 h-4 text-amber-400" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(order)}
                        className="p-1 hover:bg-red-500/10 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete this order?"
        description={`This will delete ${deleteTarget?.id ?? "this order"}. This action can't be undone`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
