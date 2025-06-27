import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material"
import DashboardIcon from "@mui/icons-material/Dashboard";

export const sidebarItems = [
  {
    href: "/",
    label: "Dashboard",
    key: "dashboard",
    icon: DashboardIcon,
  },
  {
    href: "/all-carts",
    label: "All User Cart",
    key: "all-carts",
    icon: ShoppingCartCheckout,
  },
    {
    href: "/cart",
    label: "Cart",
    key: "cart",
    icon: ShoppingCart,
  },
];