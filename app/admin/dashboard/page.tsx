'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Eye,
  Trash2,
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  // Mock Data
  const stats = {
    totalOrders: 1247,
    totalRevenue: 125430,
    totalUsers: 3421,
    totalProducts: 156,
    ordersThisMonth: 342,
    revenueThisMonth: 42890,
    conversionRate: 3.2,
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Smith',
      email: 'john@example.com',
      amount: 2450,
      items: 3,
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      amount: 1850,
      items: 2,
      status: 'Processing',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Davis',
      email: 'mike@example.com',
      amount: 3200,
      items: 4,
      status: 'Shipped',
      date: '2024-01-13',
    },
    {
      id: 'ORD-004',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      amount: 1500,
      items: 1,
      status: 'Pending',
      date: '2024-01-12',
    },
  ]

  const topProducts = [
    { id: 1, name: '600W Solar Panel', sales: 342, revenue: 34200 },
    { id: 2, name: 'PowerMax 8000W Inverter', sales: 218, revenue: 43600 },
    { id: 3, name: 'LithioPower 15kWh Battery', sales: 156, revenue: 46800 },
    { id: 4, name: '400W Solar Panel', sales: 421, revenue: 29470 },
    { id: 5, name: 'Charge Controller 60A', sales: 189, revenue: 18900 },
  ]

  const recentUsers = [
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', joined: '2024-01-10', orders: 5 },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', joined: '2024-01-09', orders: 2 },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', joined: '2024-01-08', orders: 8 },
    { id: 4, name: 'David Lee', email: 'david@example.com', joined: '2024-01-07', orders: 1 },
  ]

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')

    if (!token || !user) {
      router.push('/admin/login')
    } else {
      setAdminUser(JSON.parse(user))
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border border-amber-400/20 border-t-amber-400 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'Processing':
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 fixed lg:relative h-screen overflow-y-auto z-40`}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-lg font-bold text-amber-400">SolarBloom</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-zinc-800 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  activeTab === item.id
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{adminUser?.name}</p>
              <p className="text-xs text-zinc-400">{adminUser?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
              <span className="text-sm font-bold text-amber-400">{adminUser?.name?.[0]}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-400">Total Orders</h3>
                    <ShoppingCart className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                  <p className="text-xs text-emerald-400 mt-2">↑ {stats.ordersThisMonth} this month</p>
                </div>

                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-400">Total Revenue</h3>
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-3xl font-bold">${(stats.totalRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-emerald-400 mt-2">↑ ${(stats.revenueThisMonth / 1000).toFixed(1)}K this month</p>
                </div>

                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-400">Total Users</h3>
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-zinc-400 mt-2">Active customers</p>
                </div>

                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-400">Products</h3>
                    <Package className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  <p className="text-xs text-zinc-400 mt-2">In catalog</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition">
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{order.customer}</p>
                          <p className="text-xs text-zinc-400">{order.id} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">${order.amount.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <h2 className="text-lg font-bold mb-4">Top Products</h2>
                  <div className="space-y-3">
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition">
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{product.name}</p>
                          <p className="text-xs text-zinc-400">{product.sales} sales</p>
                        </div>
                        <p className="text-sm font-bold text-amber-400">${(product.revenue / 1000).toFixed(1)}K</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-700/50 hover:bg-zinc-900/50 transition">
                        <td className="px-6 py-4 text-sm font-semibold">{order.id}</td>
                        <td className="px-6 py-4 text-sm">{order.customer}</td>
                        <td className="px-6 py-4 text-sm font-semibold">${order.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">{order.items}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{order.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-amber-400/10 rounded transition">
                              <Eye className="w-4 h-4 text-amber-400" />
                            </button>
                            <button className="p-1 hover:bg-red-500/10 rounded transition">
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
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-zinc-700/50">
                <h2 className="text-lg font-bold">User Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700/50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-zinc-700/50 hover:bg-zinc-900/50 transition">
                        <td className="px-6 py-4 text-sm font-semibold">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{user.joined}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{user.orders}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-amber-400/10 rounded transition">
                              <Eye className="w-4 h-4 text-amber-400" />
                            </button>
                            <button className="p-1 hover:bg-red-500/10 rounded transition">
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
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Product Management</h2>
                <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold py-2 px-4 rounded-lg">
                  Add Product
                </Button>
              </div>
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">Product management interface coming soon</p>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Avg Order Value</h3>
                  <p className="text-2xl font-bold">${(stats.totalRevenue / stats.totalOrders).toFixed(2)}</p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Conversion Rate</h3>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Avg Items per Order</h3>
                  <p className="text-2xl font-bold">2.4</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Analytics Dashboard</h2>
                <p className="text-zinc-400">Detailed analytics and charts coming soon</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
