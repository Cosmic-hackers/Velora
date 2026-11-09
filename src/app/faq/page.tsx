"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes VELORA garments distinct from conventional luxury brands?",
      a: "VELORA avoids synthetic blends, fleeting trend cycles, and excessive branding. We engineer foundational garments using 100% natural, unadulterated fibers (Grade-A Mongolian Cashmere, Australian double-faced merino, GOTS-certified Supima cotton, Japanese shuttle-loom denim) shaped with architectural restraint and finished by master artisans across Italy and Japan.",
    },
    {
      q: "How does VELORA White Glove Delivery work?",
      a: "All orders above ₹5,000 qualify for complimentary White Glove Courier Delivery. Your garments are folded in archival tissue, enclosed in breathable linen garment bags, and packed in reinforced rigid keepsake boxes. Hand-delivered by dedicated couriers with live GPS tracking.",
    },
    {
      q: "What payment methods are supported on VELORA?",
      a: "We support instant online checkout via Razorpay (major Credit Cards, Debit Cards, UPI via Google Pay/PhonePe/Paytm, Netbanking) as well as Cash on Delivery (COD) for eligible domestic addresses.",
    },
    {
      q: "What is the VELORA return and exchange policy?",
      a: "We offer a 14-day complimentary trial period from the date of delivery. If a garment does not meet your personal fit expectations, request a return from your Client Sanctuary dashboard, and our courier will collect it directly from your doorstep.",
    },
    {
      q: "How should I care for my double-faced wool and Mongolian cashmere pieces?",
      a: "Wool and cashmere possess natural self-cleaning and antimicrobial properties. We recommend gentle airing after wear rather than frequent washing. For deep cleaning, entrust your garments exclusively to specialized eco-friendly luxury dry cleaners.",
    },
    {
      q: "Do you offer bespoke alterations?",
      a: "Yes. Our tailored suits and trousers arrive with generous seam allowances. Complimentary tailoring adjustments can be arranged through our flagships in Mumbai, Bengaluru and Delhi by contacting our Concierge.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Client Inquiries
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-md mx-auto">
          Everything you need to know about our sourcing standards, delivery protocols, and garment care.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#FAF7F2] border border-[#DED8CF] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-editorial text-base sm:text-lg text-[#171717] font-normal">
                  {faq.q}
                </span>
                <span className="text-[#9B8065] p-1">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs text-[#77716A] font-light leading-relaxed border-t border-[#DED8CF]/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-[#EFE9DE] border border-[#DED8CF] text-center space-y-3">
        <h4 className="font-editorial text-xl text-[#171717]">Have an Unanswered Question?</h4>
        <p className="text-xs text-[#77716A] max-w-sm mx-auto">
          Our client service specialists in Mumbai and Paris are always ready to assist.
        </p>
        <div className="pt-2">
          <Link href="/contact" className="btn-primary text-xs py-3 px-6 inline-block">
            Connect with Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}

