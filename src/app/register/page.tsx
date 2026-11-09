"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { registerSchema } from "@/lib/validations";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { registerCustomer, user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate with centralized Zod schema
    const validationResult = registerSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
      acceptTerms: agreeTerms,
    });

    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0]?.message || "Please satisfy all registration requirements.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerCustomer(fullName, email, password);
      if (result.success) {
        router.push(redirectUrl);
      } else {
        setErrorMessage(result.error || "Registration could not be completed.");
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
          Private Client Register
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Join the VELORA Circle
        </h1>
        <p className="text-xs text-[#77716A]">
          Create your account for personalized recommendations, private previews, and seamless ordering.
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
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Elena Rostova"
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Email Address *
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
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Password (minimum 6 characters) *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 accent-[#171717]"
          />
          <label htmlFor="terms" className="text-xs text-[#77716A] leading-relaxed cursor-pointer">
            I agree to the VELORA{" "}
            <Link href="/terms" className="underline hover:text-[#171717]">
              Terms of Service
            </Link>{" "}
            and acknowledge the{" "}
            <Link href="/privacy" className="underline hover:text-[#171717]">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-4 text-xs flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Creating Dossier...</span>
          ) : (
            <>
              <span>Complete Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <div className="text-center pt-2 border-t border-[#DED8CF]/60 text-xs text-[#77716A]">
          <span>Already registered? </span>
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
            className="text-[#9B8065] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>

      <div className="text-center text-[11px] text-[#77716A] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#9B8065]" />
        <span>Strict Privacy & Non-Disclosure Assurance</span>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

