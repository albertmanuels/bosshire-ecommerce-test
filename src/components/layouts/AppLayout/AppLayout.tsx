import "@/styles/globals.css";
import "@/styles/components.css";
import React, { ReactNode } from "react";
import Stack from "@mui/material/Stack";

import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Providers from "../Providers";

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
          <Stack spacing={2}>{children}</Stack>
        </Providers>
      </body>
    </html>
  );
}
