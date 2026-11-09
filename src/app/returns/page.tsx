import React from "react";
import Link from "next/link";
import { RefreshCw, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy — VELORA",
  description: "Complimentary 14-day courier return and exchange protocol at VELORA.",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-xs text-[#77716A] leading-relaxed">
      <div className="space-y-2 border-b border-[#DED8CF] pb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Client Guarantee
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal">
          Return & Refund Policy
        </h1>
        <p className="text-[11px] text-[#77716A]">14-Day Complimentary In-Person Courier Returns</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <RefreshCw className="w-5 h-5 text-[#9B8065]" />
          <h4 className="font-editorial text-sm text-[#171717]">14-Day Window</h4>
          <p className="text-[11px] text-[#77716A]">From the exact timestamp of verified courier delivery.</p>
        </div>
        <div className="p-5 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <Truck className="w-5 h-5 text-[#9B8065]" />
          <h4 className="font-editorial text-sm text-[#171717]">Doorstep Pickup</h4>
          <p className="text-[11px] text-[#77716A]">Our white-glove courier collects the parcel at your residence.</p>
        </div>
        <div className="p-5 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <ShieldCheck className="w-5 h-5 text-[#9B8065]" />
          <h4 className="font-editorial text-sm text-[#171717]">Expedited Refund</h4>
          <p className="text-[11px] text-[#77716A]">Credited to source account within 3–5 business days.</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">Condition of Returned Garments</h2>
        <p>
          To qualify for a full reimbursement or size exchange, returned creations must be in pristine,
          unworn, and unwashed condition, accompanied by all original VELORA horn tags, fabric swatches,
          and dust covers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">How to Initiate a Return</h2>
        <p>
          Navigate to your{" "}
          <Link href="/account/orders" className="text-[#9B8065] underline">
            Consignment History
          </Link>
          , locate the order, and tap &ldquo;Request Return&rdquo;. Select your preferred courier
          collection window. Our courier representative will present a receipt upon inspection.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-editorial text-lg text-[#171717]">Cash on Delivery Orders</h2>
        <p>
          For orders fulfilled via Cash on Delivery, refunds are deposited securely via direct NEFT /
          IMPS bank transfer or instant UPI payment to your designated account.
        </p>
      </section>
    </div>
  );
}

