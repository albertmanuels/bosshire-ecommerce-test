"use client";
import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import Header from "./Header";
import { useAuthStore } from "@/stores/useAuthStore";
import { sidebarItems } from "@/constants/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <SidebarMenu
        handleDrawerClose={handleDrawerClose}
        open={open}
        username={user?.username as string}
        sidebarItems={sidebarItems}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          minHeight: "100dvh",
          paddingTop: "5rem",
          paddingX: "2rem",
          paddingBottom: "5rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
