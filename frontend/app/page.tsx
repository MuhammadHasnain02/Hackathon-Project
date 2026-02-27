"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-slate-900">
          Welcome to the Auth Demo
        </h1>
        <p className="text-center text-slate-600">
          Please login or create an account to continue.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-full inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}

