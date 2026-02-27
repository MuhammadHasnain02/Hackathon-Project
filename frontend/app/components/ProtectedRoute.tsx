"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { MeResponse } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === "undefined") return;

      const token = window.localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        router.replace("/login");
        return;
      }

      try {
        const response = await api.get<MeResponse>("/me");
        setIsAuthenticated(true);
        setUser(response.data.user);
        window.localStorage.setItem(
          "authUser",
          JSON.stringify(response.data.user)
        );
      } catch {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("authUser");
        setIsAuthenticated(false);
        setUser(null);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, [router, setIsAuthenticated, setUser]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-slate-700 text-sm">Checking authentication...</div>
      </main>
    );
  }

  return <>{children}</>;
}

