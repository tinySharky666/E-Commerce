"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CurrentUser = {
  name: string;
  email: string;
  role: "customer" | "admin";
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("auth-current-user");

    if (!storedUser) {
      router.replace("/signin");
      return;
    }

    setUser(JSON.parse(storedUser) as CurrentUser);
  }, [router]);

  const handleSignOut = () => {
    window.localStorage.removeItem("auth-current-user");
    router.push("/signin");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="w-full max-w-2xl rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Welcome back, {user.name}.
        </h1>
        <p className="mt-3 text-slate-300">
          Your account is ready and your sign-in experience is working.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="mt-2 text-lg font-medium text-white">{user.email}</p>
          <p className="mt-3 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
            {user.role === "admin" ? "Admin access" : "Customer access"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleSignOut}
            className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Sign out
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
