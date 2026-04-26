"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "~/providers/auth-provider";
import api from "~/lib/api";

const registerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setErrorMsg("");
    try {
      // 1. Create the user
      await api.post("/users/", {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      });

      // 2. Automatically log them in utilizing their identical credentials
      const formData = new URLSearchParams();
      formData.append("username", values.email);
      formData.append("password", values.password);

      const response = await api.post("/login/access-token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      login(response.data.access_token);
      router.push("/student-portal/me/dashboard");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Create Account</h1>
          <p className="text-sm text-zinc-400">Begin your placement optimization journey.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-md bg-red-950/50 p-3 text-sm text-red-400 border border-red-900/50">
            {errorMsg}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Full Name</label>
            <input
              {...form.register("full_name")}
              className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              placeholder="John Doe"
            />
            {form.formState.errors.full_name && (
              <p className="text-xs text-red-500">{form.formState.errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <input
              {...form.register("email")}
              className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              placeholder="name@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              {...form.register("password")}
              className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-10 mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Constructing Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-emerald-500 hover:text-emerald-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
