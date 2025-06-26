import "../../styles/globals.css";
import "../../styles/components.css";
import React, { ReactNode } from "react";
import Header from "./Header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import { Roboto } from "next/font/google";
import { AuthProvider } from "./AuthProvider";
import { cookies } from "next/headers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "BOSSHIRE ECOMMERCE",
  description: "Bosshire ecommerce",
};

export default async function AppLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get("token");
  const hasToken = !!token;

  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider hasToken={hasToken}>
              <Stack spacing={2}>
                <Header />
                <Box
                  component="main"
                  sx={{
                    minHeight: "100svh",
                    paddingTop: "5rem",
                    paddingX: "2rem",
                  }}
                >
                  {children}
                </Box>
              </Stack>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
