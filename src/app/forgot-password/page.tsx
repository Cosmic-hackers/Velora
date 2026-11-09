"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
      } catch (e) {
        console.error(e);
      }
    }

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Security Protocol
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Password Recovery
        </h1>
        <p className="text-xs text-[#77716A]">
          Enter your registered email address to receive access restoration instructions.
        </p>
      </div>

      <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF]">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-10 h-10 text-[#9B8065] mx-auto stroke-[1.5]" />
            <h3 className="font-editorial text-xl text-[#171717]">Recovery Link Dispatched</h3>
            <p className="text-xs text-[#77716A] leading-relaxed">
              If an account is associated with <strong>{email}</strong>, a secure one-time password
              reset link has been sent to your inbox.
            </p>
            <div className="pt-2">
              <Link href="/login" className="btn-secondary text-xs py-3 px-6">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Registered Email Address
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

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Generating Protocol...</span>
              ) : (
                <>
                  <span>Send Recovery Instructions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-xs text-[#77716A] hover:text-[#171717] inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

