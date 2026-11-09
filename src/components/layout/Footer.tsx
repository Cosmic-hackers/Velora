"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";

export function Footer() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const res = StoreService.subscribeNewsletter(email);
    setStatusMessage(res.message);
    setIsSuccess(res.success);
    if (res.success) {
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#171717] text-[#FAF7F2] pt-20 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-[#2C2C2C] pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
                Private Gazette
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl tracking-wide text-white font-normal">
                Receive private collections & seasonal dispatches.
              </h3>
              <p className="text-xs text-[#9E988F] font-light tracking-wide max-w-md">
                Strictly no spam. Occasional invitations to seasonal trunk shows and private previews.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-[#222222] border border-[#3A3A3A] text-white px-4 py-3.5 text-xs tracking-wider placeholder-[#77716A] focus:outline-none focus:border-[#9B8065] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#9B8065] hover:bg-[#846B52] text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-3.5 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {statusMessage && (
                  <p
                    className={`text-xs flex items-center gap-1.5 ${
                      isSuccess ? "text-[#9B8065]" : "text-red-400"
                    }`}
                  >
                    {isSuccess && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{statusMessage}</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2C2C2C]">
          {/* Brand Philosophy */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-2xl tracking-[0.25em] text-white font-semibold">
                VELORA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#9B8065] uppercase block font-light">
                Wear less. Mean more.
              </span>
            </Link>
            <p className="text-xs text-[#9E988F] leading-relaxed max-w-sm font-light">
              Founded on the belief that true luxury resides in reduction. Hand-finished natural fabrics,
              architectural tailoring and conscious quiet refinement.
            </p>
            <div className="pt-2 text-xs text-[#9E988F] space-y-1">
              <p>Maison Flagship: 14 Rue Royale & Worli, Mumbai</p>
              <p>Direct Concierge: concierge@velora-couture.com</p>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#9B8065] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8C2B8] font-light">
              <li>
                <Link href="/shop?gender=men" className="hover:text-white transition-colors">
                  Men&apos;s Atelier
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women" className="hover:text-white transition-colors">
                  Women&apos;s Atelier
                </Link>
              </li>
              <li>
                <Link href="/collections/essentials" className="hover:text-white transition-colors">
                  The Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/timeless-classics" className="hover:text-white transition-colors">
                  Timeless Classics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=outerwear" className="hover:text-white transition-colors">
                  Outerwear & Coats
                </Link>
              </li>
              <li>
                <Link href="/shop?category=knitwear" className="hover:text-white transition-colors">
                  Mongolian Cashmere
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#9B8065] font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8C2B8] font-light">
              <li>
                <Link href="/tracking" className="hover:text-white transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Personal Concierge
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Client Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Legal */}
          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#9B8065] font-semibold">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8C2B8] font-light">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Velora
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Administrative Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#77716A] font-light">
          <p>© {new Date().getFullYear()} VELORA HAUTE GARDE-ROBE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <span>Razorpay Secured</span>
            <span>•</span>
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

