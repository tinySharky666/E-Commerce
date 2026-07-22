"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "signin" | "signup";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
};

const getUserRole = (email: string, name: string): "customer" | "admin" => {
  const normalizedEmail = email.toLowerCase();
  const normalizedName = name.toLowerCase();

  if (
    normalizedEmail === "admin@shophub.com" ||
    normalizedEmail.includes("admin") ||
    normalizedName.includes("admin")
  ) {
    return "admin";
  }

  return "customer";
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password || (isSignup && !name)) {
      setMessage("Please fill out all fields.");
      return;
    }

    const storedUsers = JSON.parse(
      window.localStorage.getItem("auth-users") ?? "[]",
    ) as StoredUser[];

    if (isSignup) {
      const alreadyExists = storedUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );

      if (alreadyExists) {
        setMessage("An account with this email already exists.");
        return;
      }

      const role = getUserRole(email, name);
      const updatedUsers = [...storedUsers, { name, email, password, role }];
      window.localStorage.setItem("auth-users", JSON.stringify(updatedUsers));
      window.localStorage.setItem(
        "auth-current-user",
        JSON.stringify({ name, email, role }),
      );
      setMessage("Account created. Redirecting you to the store...");
      router.push("/");
      return;
    }

    const foundUser = storedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundUser && foundUser.password === password) {
      window.localStorage.setItem(
        "auth-current-user",
        JSON.stringify({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        }),
      );
      setMessage("Welcome back! Redirecting you to the store...");
      router.push("/");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {isSignup ? "Create account" : "Welcome back"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {isSignup ? "Sign up" : "Sign in"}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            {isSignup
              ? "Start your workspace in seconds with a free account."
              : "Use your email and password to continue to your dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm outline-none ring-0 transition focus:border-cyan-400"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-cyan-300">
                Sign in
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link href="/signup" className="font-semibold text-cyan-300">
                Create one
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
