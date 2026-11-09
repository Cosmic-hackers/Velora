"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, KeyRound, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, user } = useAuth();

  const [email, setEmail] = useState("admin@velora.com");
  const [password, setPassword] = useState("VeloraLuxury2025!");
  const [securityKey, setSecurityKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already authenticated as admin, jump to dashboard
  React.useEffect(() => {
    if (user && (user.role === "admin" || user.role === "super_admin" || user.role === "staff")) {
      router.push("/admin");
    }
  }, [user, router]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await loginAdmin(email, password, securityKey);
      if (res.success) {
        router.push("/admin");
      } else {
        setErrorMsg(res.error || "Administrative authentication denied.");
      }
    } catch {
      setErrorMsg("Internal authentication server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-[#171717] text-[#9B8065] rounded-full flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 stroke-[1.8]" />
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold block">
            Administrative Portal
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
            Atelier Command Center
          </h1>
          <p className="text-xs text-[#77716A]">
            Restricted access. Dedicated to executive directors and concierge fulfillment staff.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-4 bg-[#EFE9DE] border border-[#DED8CF] text-xs space-y-1.5">
          <p className="font-semibold text-[#171717] uppercase tracking-wider text-[10px]">
            Authoritative Admin Credentials:
          </p>
          <div className="space-y-1 text-[#77716A]">
            <p>
              Super Admin: <code className="text-[#171717] font-semibold">admin@velora.com</code>
            </p>
            <p>
              Password: <code className="text-[#171717] font-semibold">VeloraLuxury2025!</code>
            </p>
            <p>
              Staff: <code className="text-[#171717] font-semibold">concierge@velora.com</code> /{" "}
              <code className="text-[#171717] font-semibold">VeloraStaff2025!</code>
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form
          onSubmit={handleAdminLogin}
          className="bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-lg space-y-5"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@velora.com"
                className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Security Key / Password
            </label>
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

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Hardware Security Token (Optional)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
              <input
                type="password"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                placeholder="Master Override Token"
                className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-4 text-xs flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Verifying Administrative Privilege...</span>
            ) : (
              <>
                <span>Enter Administrative Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-[#77716A] hover:text-[#171717]"
          >
            ← Return to Public Boutique
          </Link>
        </div>
      </div>
    </div>
  );
}

