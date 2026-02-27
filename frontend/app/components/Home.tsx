"use client";

import { useRouter } from "next/navigation";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, setIsAuthenticated, setUser } = useAuth();

  const displayName = user?.name ?? "User";

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("authUser");
    }
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome {displayName}
          </h1>
          <p className="text-slate-600 text-sm">
            This is a protected dashboard. You can only see it when logged in.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}

