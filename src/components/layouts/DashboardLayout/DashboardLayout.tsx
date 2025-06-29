"use client";
import React, { ReactNode } from "react";

import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";

import useDashboardLayout from "./DashboardLayout.hook";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu";

import { sidebarItems } from "@/constants/navigation";
import { useAuthStore } from "@/stores/useAuthStore";


const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();

  const { open, handleDrawerClose, handleDrawerOpen } = useDashboardLayout();

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
