"use client";
import React, { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./AuthProvider";

import theme from "@/utils/theme";











type Props = {
  children: ReactNode;
  hasToken: boolean;
};

const Providers = ({ hasToken, children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider hasToken={hasToken}>{children}</AuthProvider>
          <ToastContainer autoClose={3000} position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
