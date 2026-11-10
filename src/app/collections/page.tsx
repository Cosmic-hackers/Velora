"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoreService } from "@/lib/store";

export default function CollectionsPage() {
  const collections = StoreService.getCollections();

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. CINEMATIC FULL-WIDTH CAMPAIGN HERO BANNER                 */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] overflow-hidden bg-[#ECE6DC] border-b border-[#E9E6E0]">
        {/* Architectural backdrop and Model image */}
        <div className="absolute inset-0">
          <Image
            src="/images/collections/collections-hero.jpg"
            alt="VELORA Curated Chapters"
            fill
            priority
            className="object-cover object-[right_top] sm:object-[center_top]"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to provide pristine legibility on the left while showcasing the model on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/65 to-transparent sm:via-[#FAF8F5]/45" />
        </div>

        {/* Hero Narrative Overlay */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
          <div className="max-w-xl space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#77736E] font-medium block">
              CURATED CHAPTERS
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#171717] font-normal tracking-tight leading-[1.08]">
              The Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed max-w-md pt-1">
              A considered edit of silhouettes, textures and timeless essentials, curated for the modern wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. ASYMMETRIC PHOTOGRAPHIC GRID (EXACT REFERENCE LAYOUT)     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14 space-y-6 sm:space-y-8">
        {/* ───────────── ROW 1: TWO WIDE ASYMMETRIC CARDS ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* CARD 1: CHAPTER 01 — THE ESSENTIALS */}
          <Link
            href="/collections/the-essentials"
            className="group relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0] flex items-center transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            {/* Photographic Canvas on Right */}
            <div className="absolute inset-0">
              <Image
                src="/images/collections/essentials.jpg"
                alt="The Essentials Collection"
                fill
                priority
                className="object-cover object-[right_top] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent w-full sm:w-[65%]" />
            </div>

            {/* Curatorial Text Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-2 sm:space-y-3 max-w-md">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium block">
                CHAPTER 01
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171717] font-normal leading-tight group-hover:text-[#A18A70] transition-colors">
                The Essentials
              </h2>
              <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed">
                Foundational pieces for everyday living.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* CARD 2: CHAPTER 02 — THE SIGNATURE EDIT */}
          <Link
            href="/collections/the-signature-edit"
            className="group relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0] flex items-center transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            {/* Architectural Arches on Right */}
            <div className="absolute inset-0">
              <Image
                src="/images/collections/signature.jpg"
                alt="The Signature Edit"
                fill
                priority
                className="object-cover object-right group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent w-full sm:w-[65%]" />
            </div>

            {/* Curatorial Text Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-2 sm:space-y-3 max-w-md">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium block">
                CHAPTER 02
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171717] font-normal leading-tight group-hover:text-[#A18A70] transition-colors">
                The Signature Edit
              </h2>
              <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed">
                Distinctive silhouettes, timeless appeal.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ───────────── ROW 2: THREE TRIPTYCH CARDS ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* CARD 3: CHAPTER 03 — THE SEASONAL EDIT */}
          <Link
            href="/collections/the-seasonal-edit"
            className="group relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0] flex flex-col justify-end p-6 sm:p-8 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            {/* Golden Hills Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/collections/seasonal.jpg"
                alt="The Seasonal Edit"
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/30 to-transparent sm:bg-gradient-to-t sm:from-[#FAF8F5]/95 sm:via-[#FAF8F5]/70 sm:to-transparent" />
            </div>

            {/* Curatorial Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/90 sm:text-[#77736E] font-medium block">
                CHAPTER 03
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl text-white sm:text-[#171717] font-normal leading-tight group-hover:text-[#A18A70] transition-colors">
                The Seasonal Edit
              </h3>
              <p className="text-xs text-white/80 sm:text-[#55504A] font-light">
                A refined take on the season.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-white sm:text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* CARD 4: CHAPTER 04 — THE MONOCHROME EDIT */}
          <Link
            href="/collections/the-monochrome-edit"
            className="group relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0] flex flex-col justify-end p-6 sm:p-8 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            {/* Tactile Fabric Drapery Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/collections/monochrome.jpg"
                alt="The Monochrome Edit"
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/30 to-transparent sm:bg-gradient-to-t sm:from-[#FAF8F5]/95 sm:via-[#FAF8F5]/70 sm:to-transparent" />
            </div>

            {/* Curatorial Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/90 sm:text-[#77736E] font-medium block">
                CHAPTER 04
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl text-white sm:text-[#171717] font-normal leading-tight group-hover:text-[#A18A70] transition-colors">
                The Monochrome Edit
              </h3>
              <p className="text-xs text-white/80 sm:text-[#55504A] font-light">
                The power of timeless tones.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-white sm:text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* CARD 5: CHAPTER 05 — THE ACCESSORIES */}
          <Link
            href="/shop?department=accessories"
            className="group relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0] flex flex-col justify-end p-6 sm:p-8 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            {/* Structured Handbag Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/collections/accessories.jpg"
                alt="The Accessories Collection"
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/30 to-transparent sm:bg-gradient-to-t sm:from-[#FAF8F5]/95 sm:via-[#FAF8F5]/70 sm:to-transparent" />
            </div>

            {/* Curatorial Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/90 sm:text-[#77736E] font-medium block">
                CHAPTER 05
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl text-white sm:text-[#171717] font-normal leading-tight group-hover:text-[#A18A70] transition-colors">
                The Accessories
              </h3>
              <p className="text-xs text-white/80 sm:text-[#55504A] font-light">
                Finishing touches, thoughtfully designed.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-white sm:text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
