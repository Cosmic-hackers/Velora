import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions — VELORA",
  description: "Terms governing the purchase and consignment of VELORA garments.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-xs text-[#77716A] leading-relaxed">
      <div className="space-y-2 border-b border-[#DED8CF] pb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Legal Agreement
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Terms and Conditions
        </h1>
        <p className="text-[11px] text-[#77716A]">Effective Date: November 2024</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">1. Atelier Orders & Acceptance</h2>
        <p>
          All orders submitted via velora-couture.com constitute an offer to acquire luxury goods.
          VELORA reserves the discretion to decline any consignment in cases of suspected fraud,
          unauthorized reseller activity, or material fabric shortages.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">2. Pricing & Currency</h2>
        <p>
          Prices are indicated in Indian Rupees (₹) inclusive of all applicable domestic taxes.
          Prices remain subject to revision prior to order confirmation. Once an order dossier is
          confirmed, the total price quoted is definitive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">3. Intellectual Property</h2>
        <p>
          All trademarks, photography, typographic arrangements, silhouettes, and software code
          associated with VELORA remain the exclusive property of VELORA Maison. Reproduction or
          commercial exploitation without formal written authorization is strictly prohibited.
        </p>
      </section>
    </div>
  );
}

