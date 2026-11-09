import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — VELORA",
  description: "Client data governance and confidentiality standards at VELORA.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-xs text-[#77716A] leading-relaxed">
      <div className="space-y-2 border-b border-[#DED8CF] pb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Data Governance
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Privacy Policy
        </h1>
        <p className="text-[11px] text-[#77716A]">Effective Date: November 2024</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">1. Principle of Discretion</h2>
        <p>
          At VELORA Haute Garde-Robe, privacy is treated as a fundamental luxury. We collect only
          the minimal information essential to manufacture, tailor, authenticate, and deliver your
          orders. We do not sell, rent, or lease client registries to external commercial advertisers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">2. Collected Information</h2>
        <p>Information processed by our secure systems includes:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Identity: Full legal name, title, contact preferences.</li>
          <li>Contact coordinates: Physical delivery sanctuary address, verified email, telephone number.</li>
          <li>Transaction history: Order reference numbers, garment sizes, tailoring notes, payment timestamps.</li>
          <li>Authentication records: Encrypted credential sessions managed via Supabase Auth.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">3. Payment Security & Encryption</h2>
        <p>
          VELORA never stores raw credit or debit card numbers on internal servers. All electronic
          payments are executed through certified, PCI-DSS Level 1 compliant gateway partners
          (Razorpay) utilizing 256-bit asymmetric SSL encryption.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">4. Client Rights</h2>
        <p>
          You retain unalienable rights to request an export of your personal dossier, rectify
          inaccurate sizing coordinates, or demand full erasure of your account. Inquiries may be
          dispatched directly to our Data Protection Officer at privacy@velora-couture.com.
        </p>
      </section>
    </div>
  );
}

