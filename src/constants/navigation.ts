import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material"
import DashboardIcon from "@mui/icons-material/Dashboard";

export const pathname = {
  DASHBOARD: "/",
  ALL_CARTS: "/all-carts",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login"
}

export const sidebarItems = [
  {
    href: pathname.DASHBOARD,
    label: "Dashboard",
    key: "dashboard",
    icon: DashboardIcon,
  },
  {
    href: pathname.ALL_CARTS,
    label: "All User Cart",
    key: "all-carts",
    icon: ShoppingCartCheckout,
  },
    {
    href: pathname.CART,
    label: "Cart",
    key: "cart",
    icon: ShoppingCart,
  },
];