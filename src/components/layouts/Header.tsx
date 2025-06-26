"use client";
import { navItems, protectedRoutes } from "@/constants/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { logout } from "../views/LoginPage/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const publicNavs = navItems.filter(
    (nav) => !protectedRoutes.includes(nav.href)
  );
  const navs = isAuthenticated ? navItems : publicNavs;

  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result.success) {
        toast.success("Logout success!");
        router.push("/login");
      } else {
        throw new Error(String(result.error));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        paddingX: "2rem",
        paddingY: "1rem",
        zIndex: 50,
        backgroundColor: "white",
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.3)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box component={Link} href="/" sx={{ fontWeight: 700, color: "navy" }}>
          <h2>BOSSHIRE</h2>
        </Box>
        <Box
          component="ul"
          sx={{ listStyleType: "none" }}
          display="flex"
          alignItems="center"
          gap={3}
        >
          {navs.map((nav) => (
            <li key={nav.href}>
              <Link href={nav.href}>
                {nav.icon ? (
                  <nav.icon color="warning" sx={{ width: "1.6rem" }} />
                ) : (
                  <>{nav.label}</>
                )}
              </Link>
            </li>
          ))}
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <AccountCircle sx={{ width: "1.6rem" }} />
              </Link>

              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
