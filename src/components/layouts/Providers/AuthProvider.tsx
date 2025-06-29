"use client";
import React from "react";
import { useEffect } from "react";

import { ADMIN } from "@/constants/user";
import useGetUserById from "@/services/useGetUserById";
import { useAuthStore } from "@/stores/useAuthStore";

export function AuthProvider({
  children,
  hasToken,
}: {
  children: React.ReactNode;
  hasToken: boolean;
}) {
  const { login, logout } = useAuthStore((s) => s);

  const { data: user, isSuccess } = useGetUserById({ id: ADMIN.id });

  useEffect(() => {
    if (hasToken && isSuccess) {
      login(user);
    } else {
      logout();
    }
  }, [hasToken, isSuccess, login, logout, user]);

  return <>{children}</>;
}
