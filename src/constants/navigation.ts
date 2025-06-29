import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material"
import DashboardIcon from "@mui/icons-material/Dashboard";

/**
 * A centralized map of application route pathnames.
 *
 * This object defines the key routes used across the app for navigation,
 * redirection, route guards, and layout logic. Using this object ensures
 * consistency and avoids hardcoding string paths throughout the codebase.
 *
 * @property DASHBOARD - Path to the dashboard or homepage (`/`).
 * @property ALL_CARTS - Path to the list of all submitted carts (`/all-carts`).
 * @property CART - Path to the current user cart page (`/cart`).
 * @property CHECKOUT - Path to the checkout process page (`/checkout`).
 * @property LOGIN - Path to the login page (`/login`).
 *
 * @example
 * router.push(pathname.CHECKOUT);
 */
export const pathname = {
  DASHBOARD: "/",
  ALL_CARTS: "/all-carts",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login"
}

/**
 * List of navigation items used in the sidebar menu.
 *
 * Each item in this array defines a route link with its corresponding icon and label.
 * This structure allows for dynamic rendering of sidebar components and ensures consistency
 * with the route paths defined in the `pathname` map.
 *
 * @property href - The route path to navigate to.
 * @property label - The display name shown in the sidebar.
 * @property key - A unique string identifier for the menu item (used for keys or active state).
 * @property icon - The Material UI icon component associated with the menu item.
 *
 * @example
 * sidebarItems.map(({ href, label, icon: Icon }) => (
 *   <Link href={href}>
 *     <Icon />
 *     {label}
 *   </Link>
 * ));
 */
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