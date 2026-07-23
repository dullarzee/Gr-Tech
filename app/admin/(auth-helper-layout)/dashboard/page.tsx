"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import { BEendpoints } from "@/constants/urls/backendUrls";
import axios from "axios";
import { toast } from "sonner";
import { formatNumber } from "@/lib/utils";
import { OrderTypes } from "@/types";
import RecentOrderNode from "@/components/adminComponents/recentOrderNode";
import UsersPage from "@/components/adminComponents/usersPage";
import AdminNavBottomTab from "@/components/adminComponents/adminNavBottomTab";

interface dataTypes {
  orders: OrderTypes[];
  users: any[];
  products: any[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<dataTypes>({
    orders: [],
    users: [],
    products: [],
  });

  //const []

  const topProducts = [
    { id: 1, name: "600W Solar Panel", sales: 342, revenue: 34200 },
    { id: 2, name: "PowerMax 8000W Inverter", sales: 218, revenue: 43600 },
    { id: 3, name: "LithioPower 15kWh Battery", sales: 156, revenue: 46800 },
    { id: 4, name: "400W Solar Panel", sales: 421, revenue: 29470 },
    { id: 5, name: "Charge Controller 60A", sales: 189, revenue: 18900 },
  ];

  useEffect(() => {
    //fetch orders
    const fetchData = async () => {
      try {
        const orders = await axios.get(BEendpoints.get_orders);
        if (!orders.data.ok) throw new Error("Couldn't fetch orders");
        const users = await axios.get(BEendpoints.get_users);
        if (!users.data.ok) throw new Error("couldn't fetch users");
        const products = await axios.get(BEendpoints.get_products());
        if (!products.data.ok) throw new Error("couldn't fetch products");
        setData({
          orders: orders.data.data,
          products: products.data.data,
          users: users.data.data,
        });
      } catch (err) {
        toast.error(
          (err instanceof Error && err.message) || "Failed to fetch data",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const paidForOrders = data.orders.filter(
    (order) => order.paymentStatus.toLowerCase() === "paid",
  );

  const totalRevenue = paidForOrders.reduce((prevValue, order) => {
    return prevValue + order.totalAmount;
  }, 0);

  const currentMonthIndex = new Date().getMonth();
  const thisMonthRevenue = paidForOrders.reduce((prevValue, order) => {
    if (currentMonthIndex === new Date(order.createdAt).getMonth())
      return prevValue + order.totalAmount;
    else return prevValue;
  }, 0);

  const noOfOrdersThisMonth = data.orders.reduce((prevValue, order) => {
    if (currentMonthIndex === new Date(order.createdAt).getMonth())
      return ++prevValue;
    else return prevValue;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border border-amber-400/20 border-t-amber-400 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
        {/* Content Area */}
        <div className="space-y-6">
          {/* Overview Tab */}

          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Total Orders
                  </h3>
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-3xl font-bold">
                  {loading
                    ? "Fetching..."
                    : data.orders.length.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-400 mt-2">
                  ↑ {noOfOrdersThisMonth} this month
                </p>
              </div>

              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Total Revenue
                  </h3>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold">
                  <span className="text-sm">&#8358;</span>
                  {formatNumber(totalRevenue)}
                </p>
                <p className="text-xs text-emerald-400 mt-2">
                  ↑ <span className="text-[0.5rem]">&#8358;</span>
                  {formatNumber(thisMonthRevenue)} this month
                </p>
              </div>

              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Total Users
                  </h3>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold">
                  {data.users.length.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-400 mt-2">Active customers</p>
              </div>

              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Products
                  </h3>
                  <Package className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold">{data.products.length}</p>
                <p className="text-xs text-zinc-400 mt-2">In catalog</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
                <div className="space-y-3">
                  {data.orders.map((order) => (
                    <RecentOrderNode key={order.id} order={order} />
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-linear-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Top Products</h2>
                <div className="space-y-3">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-zinc-400">
                          {product.sales} sales
                        </p>
                      </div>
                      <p className="text-sm font-bold text-amber-400">
                        <span className="text-[0.6rem]">&#8358;</span>
                        {(product.revenue / 1000).toFixed(1)}K
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </div>
      </main>

      <AdminNavBottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
