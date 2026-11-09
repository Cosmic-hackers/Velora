"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";

export function Footer() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const res = StoreService.subscribeNewsletter(email);
    setStatusMessage(res.message);
    if (res.success) {
      setEmail("");
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#F8F7F4] text-[#171717] pt-20 pb-12 border-t border-[#E9E6E0]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        {/* Top Grid: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14 pb-16 border-b border-[#E9E6E0]">
          {/* Column 1: Brand & Wordmark */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-editorial text-3xl tracking-[0.38em] text-[#171717] font-normal uppercase block transition-opacity group-hover:opacity-70">
                VELORA
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-light block mt-1">
                Wear less. Mean more.
              </span>
            </Link>
            <p className="text-xs text-[#77736E] font-light max-w-sm leading-relaxed pt-2">
              An international luxury fashion house rooted in architectural minimalism, natural materials
              and considered permanence.
            </p>
            <div className="pt-2 text-xs text-[#77736E] space-y-1 font-light">
              <p>Maison Flagship: 14 Rue Royale & Worli, Mumbai</p>
              <p>Correspondence: concierge@velora-couture.com</p>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#171717] font-semibold">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/shop" className="hover:text-[#171717] transition-colors">
                  Shop All Pieces
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men" className="hover:text-[#171717] transition-colors">
                  Men&apos;s Atelier
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women" className="hover:text-[#171717] transition-colors">
                  Women&apos;s Atelier
                </Link>
              </li>
              <li>
                <Link href="/shop?tag=new-arrivals" className="hover:text-[#171717] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#171717] transition-colors">
                  Curated Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#171717] font-semibold">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/tracking" className="hover:text-[#171717] transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#171717] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#171717] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#171717] transition-colors">
                  Personal Concierge
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#171717] transition-colors">
                  Client Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Journal */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#171717] font-semibold">
              MAISON
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/about" className="hover:text-[#171717] transition-colors">
                  About Velora
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#171717] transition-colors">
                  Editorial Journal
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/velora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#171717] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#171717] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#171717] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#171717] transition-colors">
                  Administrative Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Payment Mentions */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#77736E] font-light">
          <p>© {new Date().getFullYear()} VELORA HAUTE GARDE-ROBE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 uppercase tracking-wider text-[10px]">
            <span>RAZORPAY SECURED</span>
            <span>•</span>
            <span>CASH ON DELIVERY</span>
            <span>•</span>
            <span>256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
