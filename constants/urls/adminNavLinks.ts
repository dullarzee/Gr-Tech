import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Package,
} from "lucide-react";

export const adminNavLinks = [
  {
    id: "overview",
    label: "Overview",
    url: "/admin/dashboard",
    icon: BarChart3,
  },
  { id: "orders", label: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { id: "users", label: "Users", url: "/admin/users", icon: Users },
  { id: "products", label: "Products", url: "/admin/products", icon: Package },
  {
    id: "analytics",
    label: "Analytics",
    url: "/admin/analytics",
    icon: TrendingUp,
  },
];
