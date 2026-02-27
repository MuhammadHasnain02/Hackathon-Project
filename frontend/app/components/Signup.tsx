"use client";

import { useState, type FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { AuthResponse, ErrorResponse, FormInputs } from "@/types/auth";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth();

  const [formValues, setFormValues] = useState<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormInputs) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues({
        ...formValues,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("Name, email, and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post<AuthResponse>("/register", {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });

      const { token, user } = response.data;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("authUser", JSON.stringify(user));
      }

      setIsAuthenticated(true);
      setUser(user);

      router.replace("/home");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message =
        axiosError.response?.data?.message ||
        "Unable to create account. Please try again.";
      setIsAuthenticated(false);
      setUser(null);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-slate-900">
          Create an account
        </h1>
        <p className="text-center text-slate-600 text-sm">
          Sign up to access the protected home page.
        </p>

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formValues.name ?? ""}
              onChange={handleChange("name")}
              required
              minLength={2}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleChange("email")}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formValues.password}
              onChange={handleChange("password")}
              required
              minLength={6}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-slate-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

