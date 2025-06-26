import { ShoppingCart } from "@mui/icons-material"
export const protectedRoutes = ["/cart"]
export const authRoutes = ["/login"]

export const navItems = [
   {
    href: "/products",
    label: "Products",
    icon: null
  },
  {
    href: "/cart",
    label: "Cart",
    icon: ShoppingCart,
  },
]