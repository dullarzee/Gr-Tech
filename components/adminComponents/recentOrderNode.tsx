import { OrderTypes } from "@/types";

export default function RecentOrderNode({ order }: { order: OrderTypes }) {
  const getStatusColor = (status: string) => {
    status = status.toLowerCase();
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "processing":
      case "shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition">
      <div className="flex-1">
        <p className="text-sm font-semibold">{order.user.name}</p>
        <p className="text-xs text-zinc-400">
          {order.id} • {order.id.slice(0, 8)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">
          <span className="text-[0.6rem]">&#8358;</span>
          {order?.totalAmount?.toLocaleString()}
        </p>
        <span
          className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
}
