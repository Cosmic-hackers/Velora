import React from "react";
import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 bg-[#EFE9DE] text-[#9B8065] rounded-full flex items-center justify-center mx-auto border border-[#DED8CF]">
        <MailCheck className="w-8 h-8 stroke-[1.5]" />
      </div>

      <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold block">
        Verification Dossier
      </span>

      <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
        Verify Your Identity
      </h1>

      <p className="text-xs text-[#77716A] leading-relaxed max-w-sm mx-auto">
        A verification link has been dispatched to your email address by Supabase Auth.
        Please tap the link to activate all concierge privileges.
      </p>

      <div className="pt-4">
        <Link href="/login" className="btn-primary text-xs py-3.5 px-8 inline-flex items-center gap-2">
          <span>Return to Client Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

