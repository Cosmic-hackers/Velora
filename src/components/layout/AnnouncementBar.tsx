"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#171717] text-[#FAF7F2] text-[11px] tracking-[0.2em] uppercase py-2 px-4 relative z-50 border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block text-[#9B8065]">VELORA MAISON</div>
        <div className="flex-1 text-center font-light">
          <span>Complimentary White Glove Delivery on orders above ₹5,000</span>
          <span className="mx-3 opacity-40">|</span>
          <Link
            href="/shop?sort=newest"
            className="underline underline-offset-4 hover:text-[#9B8065] transition-colors inline-flex items-center gap-1"
          >
            Explore Winter Solstice Édition
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#FAF7F2] hover:text-[#9B8065] transition-colors ml-4 p-0.5"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

