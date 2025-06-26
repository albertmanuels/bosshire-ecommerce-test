import "../../styles/globals.css";
import "../../styles/components.css";
import React, { ReactNode } from "react";
import Header from "./Header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Providers from "./Providers";

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
        <Providers hasToken={hasToken}>
          <Stack spacing={2}>
            <Header />
            <Box
              component="main"
              sx={{
                height: "100%",
                minHeight: "100dvh",
                paddingTop: "5rem",
                paddingX: "2rem",
                paddingBottom: "5rem",
              }}
            >
              {children}
            </Box>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
