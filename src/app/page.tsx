"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const allProducts = StoreService.getProducts();
  const collections = StoreService.getCollections();
  const settings = StoreService.getStoreSettings();

  // Support both Hero modes with a refined editorial toggle
  const [activeHero, setActiveHero] = useState<"editorial_split" | "campaign_portrait">(
    (settings as any).heroCampaignStyle || "editorial_split"
  );

  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="w-full bg-[#F8F7F4] text-[#171717] overflow-hidden">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION: EDITORIAL SPLIT (REF 1) & CAMPAIGN (REF 2) */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeHero === "editorial_split" ? (
        /* HERO 1: EDITORIAL SPLIT (Primary reference) */
        <section className="w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col lg:flex-row border-b border-[#E9E6E0] relative">
          {/* LEFT COLUMN: ~52% width full-height fashion campaign photograph */}
          <div className="w-full lg:w-[52%] relative min-h-[60vh] lg:min-h-full bg-[#F0EDE8] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=88&w=1600&auto=format&fit=crop"
              alt="VELORA Signature Editorial Campaign"
              fill
              priority
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            {/* Minimal corner attribution */}
            <div className="absolute bottom-6 left-8 text-white/90 text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-sm">
              AUTUMN / WINTER ÉDITION
            </div>
          </div>

          {/* RIGHT COLUMN: ~48% width spacious ivory background with editorial product showcase */}
          <div className="w-full lg:w-[48%] bg-[#F8F7F4] flex flex-col justify-between p-8 sm:p-14 lg:p-20 xl:p-24 relative">
            {/* Top Label & Headline */}
            <div className="space-y-4 max-w-lg">
              <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
                THE SIGNATURE COLLECTION
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-normal text-[#171717] leading-[1.05] tracking-tight">
                EFFORTLESSLY<br />
                TIMELESS.
              </h1>
            </div>

            {/* Middle Editorial Product Photography */}
            <div className="my-8 sm:my-10 relative aspect-[4/3] w-full max-w-md bg-[#F0EDE8] overflow-hidden border border-[#E9E6E0]">
              <Image
                src="https://images.unsplash.com/photo-1544923246-77307dd654cb?q=85&w=1200&auto=format&fit=crop"
                alt="Double-Faced Wool Atelier Coat"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>

            {/* Bottom Narrative & Minimal CTA */}
            <div className="space-y-5 max-w-md">
              <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
                Considered silhouettes. Thoughtful details. Pieces designed to remain.
              </p>
              <div>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors group"
                >
                  <span>DISCOVER THE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle Campaign Style Switcher in bottom right */}
          <div className="absolute bottom-4 right-8 z-20 hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#77736E]">
            <span>VIEW:</span>
            <button
              onClick={() => setActiveHero("editorial_split")}
              className="text-[#171717] font-semibold underline underline-offset-4"
            >
              EDITORIAL SPLIT
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveHero("campaign_portrait")}
              className="hover:text-[#171717] transition-colors"
            >
              CAMPAIGN CLOSE-UP
            </button>
          </div>
        </section>
      ) : (
        /* HERO 2: ALTERNATIVE CAMPAIGN HERO (REF 2) */
        <section className="w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col lg:flex-row border-b border-[#E9E6E0] relative bg-[#F8F7F4]">
          {/* Close-Up Fashion Portrait occupying approx 65% width */}
          <div className="w-full lg:w-[65%] relative min-h-[60vh] lg:min-h-full bg-[#F0EDE8] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=88&w=1800&auto=format&fit=crop"
              alt="VELORA Close-up Fashion Portrait"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            {/* Minimal Lower Corner Overlay Product Info */}
            <div className="absolute bottom-8 left-8 sm:left-12 max-w-sm space-y-2 text-white drop-shadow-md">
              <span className="text-[10px] tracking-[0.35em] uppercase font-light text-[#E9E6E0]">
                STUDIO CAMPAIGN 04
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white">
                Archival Cashmere Knit
              </h2>
              <Link
                href="/shop?category=knitwear"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/90 hover:text-white pt-1"
              >
                <span>EXPLORE PIECE</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Full-Length Model Photograph on Right (approx 35% width) */}
          <div className="w-full lg:w-[35%] relative min-h-[50vh] lg:min-h-full bg-[#F0EDE8] border-l border-[#E9E6E0] flex flex-col justify-between p-8 sm:p-12">
            <div className="relative aspect-[3/4] w-full bg-[#EAE4D9] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=1000&auto=format&fit=crop"
                alt="Full Length Editorial Silhouette"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            <div className="pt-6 space-y-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium block">
                ATELIER SILHOUETTE
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#171717] font-normal">
                Fluid Wool & Silk Trouser
              </h3>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#171717] hover:text-[#A18A70] font-medium transition-colors"
              >
                <span>SHOP ALL PIECES</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Campaign Style Switcher */}
          <div className="absolute bottom-4 right-8 z-20 hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#77736E]">
            <span>VIEW:</span>
            <button
              onClick={() => setActiveHero("editorial_split")}
              className="hover:text-[#171717] transition-colors"
            >
              EDITORIAL SPLIT
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveHero("campaign_portrait")}
              className="text-[#171717] font-semibold underline underline-offset-4"
            >
              CAMPAIGN CLOSE-UP
            </button>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. FULL-WIDTH EDITORIAL COLLECTION (SECTION 6)               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-b border-[#E9E6E0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              CURATED CHAPTERS
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171717]">
              The Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="mt-4 md:mt-0 text-[11px] uppercase tracking-[0.25em] text-[#171717] hover:text-[#A18A70] font-medium inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL CHAPTERS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Large Editorial Image Compositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Composition 1: The Essentials */}
          <Link
            href="/collections/essentials"
            className="group flex flex-col space-y-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=85&w=1200&auto=format&fit=crop"
                alt="The Essentials Collection"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  The Essentials
                </h3>
                <p className="text-xs text-[#77736E] font-light mt-0.5">
                  Archival poplin shirts, heavyweight t-shirts and column trousers.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#77736E] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>

          {/* Composition 2: Modern Tailoring */}
          <Link
            href="/collections/modern-tailoring"
            className="group flex flex-col space-y-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop"
                alt="Modern Tailoring Collection"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  Modern Tailoring
                </h3>
                <p className="text-xs text-[#77736E] font-light mt-0.5">
                  Sculpted Italian virgin wool blazers and double reverse pleats.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#77736E] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>

          {/* Composition 3: Signature Silhouettes */}
          <Link
            href="/collections/signature-silhouettes"
            className="group flex flex-col space-y-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=1200&auto=format&fit=crop"
                alt="Signature Silhouettes Collection"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  Signature Silhouettes
                </h3>
                <p className="text-xs text-[#77736E] font-light mt-0.5">
                  Monolithic double-faced cashmere overcoats and bias-cut silk.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#77736E] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. NEW ARRIVALS (SECTION 7)                                  */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-b border-[#E9E6E0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              SEASONAL PIECES
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171717]">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?tag=new-arrivals"
            className="mt-4 md:mt-0 text-[11px] uppercase tracking-[0.25em] text-[#171717] hover:text-[#A18A70] font-medium inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. BRAND STORY: "THE BEAUTY OF LESS." (SECTION 8)            */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-36 px-6 sm:px-12 border-b border-[#E9E6E0] bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#A18A70] font-semibold block">
            VELORA MANIFESTO
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] leading-tight">
            THE BEAUTY OF LESS.
          </h2>
          <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed max-w-xl mx-auto pt-2">
            We believe that modern luxury is found in intentional reduction. Unadulterated Australian merino,
            Mongolian cashmere, and pure Japanese selvedge, cut with architectural restraint.
            Garments crafted not to distract, but to endure.
          </p>
          <div className="pt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors border-b border-[#171717] pb-1"
            >
              <span>READ OUR FULL STORY</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. FULL-WIDTH CINEMATIC CAMPAIGN: "MADE TO LAST." (SECTION 9)*/}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full relative h-[70vh] sm:h-[82vh] min-h-[500px] overflow-hidden bg-[#171717] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=88&w=2200&auto=format&fit=crop"
          alt="VELORA Cinematic Campaign"
          fill
          className="object-cover object-center opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 text-center text-white space-y-5 px-6 max-w-2xl">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#E9E6E0] font-light">
            AUTUMN WINTER ÉDITION
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-white">
            MADE TO LAST.
          </h2>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block bg-[#FFFFFF] text-[#171717] hover:bg-[#A18A70] hover:text-white px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. NEWSLETTER: "LETTERS FROM VELORA." (SECTION 10)           */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-12 bg-[#F8F7F4] border-b border-[#E9E6E0]">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#A18A70] font-semibold block">
            PRIVATE GAZETTE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717]">
            LETTERS FROM VELORA.
          </h2>
          <p className="text-xs sm:text-sm text-[#77736E] font-light max-w-md mx-auto leading-relaxed">
            Discover new collections, thoughtful stories and considered essentials.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
              if (input) {
                StoreService.subscribeNewsletter(input);
                alert("Thank you. You have been added to the private gazette.");
              }
            }}
            className="pt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address..."
              className="flex-1 bg-[#FFFFFF] border border-[#E9E6E0] px-4 py-3.5 text-xs text-[#171717] placeholder-[#77736E] focus:outline-none focus:border-[#171717] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#171717] hover:bg-[#A18A70] text-white text-[11px] uppercase tracking-[0.25em] px-8 py-3.5 font-medium transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
