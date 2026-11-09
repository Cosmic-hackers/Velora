"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/lib/validations";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { loginCustomer, user } = useAuth();
  const [email, setEmail] = useState("elena@example.com");
  const [password, setPassword] = useState("VeloraCustomer2025!");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate with centralized Zod schema
    const validationResult = loginSchema.safeParse({ email, password, rememberMe });
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0]?.message || "Invalid credentials format.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginCustomer(email, password);
      if (result.success) {
        router.push(redirectUrl);
      } else {
        setErrorMessage(result.error || "Authentication failed. Please verify credentials.");
      }
    } catch {
      setErrorMessage("An unexpected server error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Client Sanctuary
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Client Identification
        </h1>
        <p className="text-xs text-[#77716A]">
          Access your private wardrobe, order ledger and bespoke concierge preferences.
        </p>
      </div>

      {/* Demo Credentials Notice Pill */}
      <div className="p-3.5 bg-[#EFE9DE] border border-[#DED8CF] text-xs space-y-1">
        <p className="font-semibold text-[#171717] uppercase tracking-wider text-[10px]">
          Demo Client Credentials Pre-loaded:
        </p>
        <p className="text-[#77716A]">
          Email: <code className="text-[#171717] font-medium">elena@example.com</code> | Password:{" "}
          <code className="text-[#171717] font-medium">VeloraCustomer2025!</code>
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elena@example.com"
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs uppercase tracking-wider text-[#171717] font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#9B8065] hover:underline"
            >
              Forgotten?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 text-xs text-[#77716A] cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>Remember session on this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-4 text-xs flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <span>Sign In to VELORA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <div className="text-center pt-2 border-t border-[#DED8CF]/60 text-xs text-[#77716A]">
          <span>New to the Maison? </span>
          <Link
            href={`/register?redirect=${encodeURIComponent(redirectUrl)}`}
            className="text-[#9B8065] font-semibold hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </form>

      <div className="text-center text-[11px] text-[#77716A] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#9B8065]" />
        <span>Supabase Auth & 256-bit SSL Protected</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

