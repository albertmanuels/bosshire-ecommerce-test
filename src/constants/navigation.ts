import { ShoppingCart } from "@mui/icons-material"
import DashboardIcon from "@mui/icons-material/Dashboard";

export const sidebarItems = [
    {
      href: "/",
      label: "Dashboard",
      key: "dashboard",
      icon: DashboardIcon,
    },
    {
      href: "/cart",
      label: "Cart",
      key: "cart",
      icon: ShoppingCart,
  },
];