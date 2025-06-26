"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export function AuthProvider({
  children,
  hasToken,
}: {
  children: React.ReactNode;
  hasToken: boolean;
}) {
  const { login, logout } = useAuthStore((s) => s);

  useEffect(() => {
    if (hasToken) {
      login();
    } else {
      logout();
    }
  }, [hasToken, login, logout]);

  return <>{children}</>;
}
