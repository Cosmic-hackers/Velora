"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    if (supabase) {
      const { error: err } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (err) {
        setError(err.message);
        return;
      }
    }

    setIsDone(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Credentials Update
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Set New Password
        </h1>
      </div>

      <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF]">
        {isDone ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-10 h-10 text-[#9B8065] mx-auto stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#171717]">Password Updated</h3>
            <p className="text-xs text-[#77716A]">Your credentials have been securely refreshed.</p>
            <div className="pt-2">
              <Link href="/login" className="btn-primary text-xs py-3 px-6 inline-block">
                Sign In With New Password
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77716A] absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Confirm New Password
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

            <button type="submit" className="w-full btn-primary py-3.5 text-xs flex items-center justify-center gap-2">
              <span>Save New Password</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

