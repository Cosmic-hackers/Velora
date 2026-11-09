"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] text-[#171717] pt-16 pb-12 border-t border-[#E9E6E0]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top 6-Column Grid matching reference */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10 pb-16 border-b border-[#E9E6E0]">
          {/* Column 1: Brand & Wordmark */}
          <div className="col-span-2 md:col-span-1 space-y-2">
            <Link href="/" className="inline-block group">
              <span className="font-editorial text-2xl tracking-[0.25em] text-[#171717] uppercase block transition-opacity group-hover:opacity-70">
                VELORA
              </span>
            </Link>
            <p className="text-[11px] text-[#77736E] font-light tracking-wide">
              Wear less. Mean more.
            </p>
          </div>

          {/* Column 2: SHOP */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#171717] font-semibold">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/shop?department=women" className="hover:text-[#171717] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?department=men" className="hover:text-[#171717] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?department=accessories" className="hover:text-[#171717] transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COLLECTIONS */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#171717] font-semibold">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/collections/the-essentials" className="hover:text-[#171717] transition-colors">
                  The Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/the-signature-edit" className="hover:text-[#171717] transition-colors">
                  The Signature Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/the-seasonal-edit" className="hover:text-[#171717] transition-colors">
                  The Seasonal Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/the-monochrome-edit" className="hover:text-[#171717] transition-colors">
                  The Monochrome Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#171717] font-semibold">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/about" className="hover:text-[#171717] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#171717] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#171717] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: JOURNAL */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#171717] font-semibold">
              JOURNAL
            </h4>
            <ul className="space-y-2 text-xs text-[#77736E] font-light">
              <li>
                <Link href="/journal" className="hover:text-[#171717] transition-colors">
                  Editorials
                </Link>
              </li>
              <li>
                <Link href="/journal/the-architecture-of-warmth" className="hover:text-[#171717] transition-colors">
                  Style Guides
                </Link>
              </li>
              <li>
                <Link href="/journal/material-provenance" className="hover:text-[#171717] transition-colors">
                  Behind the Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: FOLLOW US */}
          <div className="space-y-3">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#171717] font-semibold">
              FOLLOW US
            </h4>
            <div className="flex items-center space-x-3 text-[#171717]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity p-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity p-0.5"
                aria-label="Pinterest"
              >
                {/* Minimalist Pinterest / P icon */}
                <span className="font-serif font-bold text-sm leading-none inline-block">P</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity p-0.5"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-[#77736E] font-light">
          <p>© 2026 VELORA. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-[#171717] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#171717] transition-colors">
              Terms of Service
            </Link>
            <Link href="/returns" className="hover:text-[#171717] transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
