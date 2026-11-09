"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const allProducts = StoreService.getProducts();
  const settings = StoreService.getStoreSettings();

  // Support all 3 Hero modes with the user's requested diptych campaign as default
  const [activeHero, setActiveHero] = useState<"campaign_diptych" | "editorial_split" | "campaign_portrait">(
    (settings as any).heroCampaignStyle || "campaign_diptych"
  );

  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="w-full bg-[#F8F7F4] text-[#171717] overflow-hidden">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION: KHAITE-INSPIRED EDITORIAL CAMPAIGN DIPTYCH */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeHero === "campaign_diptych" ? (
        /* HERO 1: EXACT MATCH TO USER'S ATTACHED REFERENCE (DIPTYCH CAMPAIGN) */
        <section className="w-full relative min-h-[82vh] lg:min-h-[92vh] xl:min-h-[95vh] border-b border-[#E9E6E0] bg-[#F8F7F4] overflow-hidden">
          {/* Side-by-side full-width diptych */}
          <div className="w-full h-full min-h-[82vh] lg:min-h-[92vh] xl:min-h-[95vh] flex flex-col lg:flex-row relative">
            {/* LEFT SIDE: Dominant close-up editorial portrait (~62.5% width) */}
            <div className="relative w-full lg:w-[62.5%] h-[65vh] sm:h-[75vh] lg:h-auto min-h-[500px] bg-[#EFECE6] overflow-hidden">
              <Image
                src="/images/hero/campaign-left-portrait.jpg"
                alt="VELORA The Roth Trench Campaign Portrait"
                fill
                priority
                className="object-cover object-top hover:scale-[1.01] transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 63vw"
              />

              {/* Exact Lower-Left Editorial Product Identifiers from attached reference */}
              <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 space-y-4 text-[#171717] select-none drop-shadow-sm">
                <Link
                  href="/product/the-roth-trench?color=Black"
                  className="group block space-y-0.5 transition-opacity hover:opacity-75"
                >
                  <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-[#171717]">
                    The Roth Trench
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-light tracking-wide text-[#55524E]">
                    in Black
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-mono tracking-tight text-[#171717] pt-0.5">
                    £2,790.00 GBP
                  </p>
                </Link>

                <Link
                  href="/product/the-roth-trench?color=Beige"
                  className="group block space-y-0.5 transition-opacity hover:opacity-75"
                >
                  <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-[#171717]">
                    The Roth Trench
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-light tracking-wide text-[#55524E]">
                    in Beige
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-mono tracking-tight text-[#171717] pt-0.5">
                    £2,560.00 GBP
                  </p>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Full-length profile silhouette walking to right (~37.5% width) */}
            <div className="relative w-full lg:w-[37.5%] h-[55vh] sm:h-[65vh] lg:h-auto min-h-[460px] bg-[#ECE8E0] overflow-hidden border-t lg:border-t-0 lg:border-l border-[#E9E6E0]/60">
              <Image
                src="/images/hero/campaign-right-stride.jpg"
                alt="VELORA The Roth Trench Full-Length Silhouette"
                fill
                priority
                className="object-cover object-center hover:scale-[1.01] transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />

              {/* Minimal Action Badge in lower right */}
              <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20">
                <Link
                  href="/product/the-roth-trench"
                  className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] bg-[#FFFFFF]/90 hover:bg-[#171717] hover:text-white backdrop-blur-sm px-4 py-2.5 border border-[#E9E6E0] transition-all shadow-sm group"
                >
                  <span>VIEW CAMPAIGN PIECE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Editorial Campaign Switcher */}
          <div className="absolute top-4 right-8 z-20 hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#77736E] bg-white/75 backdrop-blur-sm px-3 py-1.5 border border-[#E9E6E0]">
            <span>VIEW:</span>
            <button
              onClick={() => setActiveHero("campaign_diptych")}
              className="text-[#171717] font-semibold underline underline-offset-4"
            >
              DIPTYCH
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveHero("editorial_split")}
              className="hover:text-[#171717] transition-colors"
            >
              EDITORIAL SPLIT
            </button>
            <span>/</span>
            <button
              onClick={() => setActiveHero("campaign_portrait")}
              className="hover:text-[#171717] transition-colors"
            >
              CLOSE-UP
            </button>
          </div>
        </section>
      ) : activeHero === "editorial_split" ? (
        /* HERO 2: EDITORIAL SPLIT */
        <section className="w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col lg:flex-row border-b border-[#E9E6E0] relative">
          <div className="w-full lg:w-[52%] relative min-h-[60vh] lg:min-h-full bg-[#F0EDE8] overflow-hidden">
            <Image
              src="/images/catalog/tailored-double-breasted-blazer.jpg"
              alt="VELORA Signature Editorial Campaign"
              fill
              priority
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute bottom-6 left-8 text-white/90 text-[10px] tracking-[0.3em] uppercase font-light drop-shadow-sm">
              NEW SEASON / THE ATELIER
            </div>
          </div>

          <div className="w-full lg:w-[48%] bg-[#F8F7F4] flex flex-col justify-between p-8 sm:p-14 lg:p-20 xl:p-24 relative">
            <div className="space-y-4 max-w-lg">
              <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
                NEW SEASON
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-normal text-[#171717] leading-[1.05] tracking-tight">
                THE<br />
                COLLECTION
              </h1>
              <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed pt-2">
                Considered pieces for a modern wardrobe.
              </p>
            </div>

            <div className="my-8 sm:my-10 relative aspect-[4/3] w-full max-w-md bg-[#F0EDE8] overflow-hidden border border-[#E9E6E0]">
              <Image
                src="/images/catalog/pleated-silk-trousers.jpg"
                alt="Pleated Silk-Wool Wide-Leg Trousers"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>

            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors group"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 z-20 hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#77736E] bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-[#E9E6E0]">
            <span>VIEW:</span>
            <button onClick={() => setActiveHero("campaign_diptych")} className="hover:text-[#171717]">DIPTYCH</button>
            <span>/</span>
            <button onClick={() => setActiveHero("editorial_split")} className="text-[#171717] font-semibold underline underline-offset-4">EDITORIAL SPLIT</button>
            <span>/</span>
            <button onClick={() => setActiveHero("campaign_portrait")} className="hover:text-[#171717]">CLOSE-UP</button>
          </div>
        </section>
      ) : (
        /* HERO 3: CLOSE-UP PORTRAIT */
        <section className="w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col lg:flex-row border-b border-[#E9E6E0] relative bg-[#F8F7F4]">
          <div className="w-full lg:w-[65%] relative min-h-[60vh] lg:min-h-full bg-[#F0EDE8] overflow-hidden">
            <Image
              src="/images/catalog/mens-cashmere-blouson.jpg"
              alt="VELORA Men's Cashmere Blouson Campaign"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute bottom-8 left-8 sm:left-12 max-w-sm space-y-2 text-[#171717] bg-white/85 backdrop-blur-sm p-4 border border-[#E9E6E0]">
              <span className="text-[10px] tracking-[0.35em] uppercase font-light text-[#77736E]">
                STUDIO ÉDITION 01
              </span>
              <h2 className="font-editorial text-2xl font-normal text-[#171717]">
                Cashmere Minimal Blouson
              </h2>
              <Link
                href="/shop?department=men"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#171717] hover:text-[#A18A70] pt-1"
              >
                <span>EXPLORE PIECE</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[35%] relative min-h-[50vh] lg:min-h-full bg-[#F0EDE8] border-l border-[#E9E6E0] flex flex-col justify-between p-8 sm:p-12">
            <div className="relative aspect-[3/4] w-full bg-[#EAE4D9] overflow-hidden">
              <Image
                src="/images/catalog/tailored-double-breasted-blazer.jpg"
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
                Double-Breasted Atelier Blazer
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

          <div className="absolute bottom-4 right-8 z-20 hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#77736E] bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-[#E9E6E0]">
            <span>VIEW:</span>
            <button onClick={() => setActiveHero("campaign_diptych")} className="hover:text-[#171717]">DIPTYCH</button>
            <span>/</span>
            <button onClick={() => setActiveHero("editorial_split")} className="hover:text-[#171717]">EDITORIAL SPLIT</button>
            <span>/</span>
            <button onClick={() => setActiveHero("campaign_portrait")} className="text-[#171717] font-semibold underline underline-offset-4">CLOSE-UP</button>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. SHOP BY DEPARTMENT (EXACT MATCH TO REFERENCE IMAGE 1)     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#E9E6E0]">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
            SHOP BY DEPARTMENT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Card 1: WOMEN */}
          <Link
            href="/shop?department=women"
            className="group flex flex-col space-y-4 bg-[#FAF9F6] border border-[#E9E6E0] p-4 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=88&w=1200&auto=format&fit=crop"
                alt="VELORA Women Department"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="pt-2 space-y-1">
              <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                WOMEN
              </h3>
              <p className="text-xs text-[#77736E] font-light">
                Refined silhouettes, for every occasion.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] inline-flex items-center gap-1.5 group-hover:text-[#A18A70] transition-colors">
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 2: MEN */}
          <Link
            href="/shop?department=men"
            className="group flex flex-col space-y-4 bg-[#FAF9F6] border border-[#E9E6E0] p-4 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="/images/catalog/mens-cashmere-blouson.jpg"
                alt="VELORA Men Department"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="pt-2 space-y-1">
              <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                MEN
              </h3>
              <p className="text-xs text-[#77736E] font-light">
                Modern essentials with timeless appeal.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] inline-flex items-center gap-1.5 group-hover:text-[#A18A70] transition-colors">
                <span>SHOP MEN</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 3: ACCESSORIES */}
          <Link
            href="/shop?department=accessories"
            className="group flex flex-col space-y-4 bg-[#FAF9F6] border border-[#E9E6E0] p-4 transition-all hover:border-[#171717]/40 hover:shadow-sm"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE8]">
              <Image
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=85&w=1200&auto=format&fit=crop"
                alt="VELORA Accessories Department"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="pt-2 space-y-1">
              <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                ACCESSORIES
              </h3>
              <p className="text-xs text-[#77736E] font-light">
                Thoughtful details that complete the look.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] inline-flex items-center gap-1.5 group-hover:text-[#A18A70] transition-colors">
                <span>SHOP ACCESSORIES</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. EXPLORE OUR COLLECTIONS (EXACT 4-GRID FROM REFERENCE 1)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#E9E6E0]">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
            EXPLORE OUR COLLECTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {/* 1. THE ESSENTIALS */}
          <Link
            href="/shop?collection=the-essentials"
            className="group relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] flex flex-col justify-end p-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=85&w=1200&auto=format&fit=crop"
              alt="The Essentials"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h4 className="font-editorial text-xl sm:text-2xl font-normal tracking-wide">
                THE ESSENTIALS
              </h4>
              <p className="text-[11px] text-white/85 font-light">
                Timeless, versatile pieces.
              </p>
            </div>
          </Link>

          {/* 2. THE SIGNATURE EDIT */}
          <Link
            href="/shop?collection=the-signature-edit"
            className="group relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] flex flex-col justify-end p-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=1200&auto=format&fit=crop"
              alt="The Signature Edit"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h4 className="font-editorial text-xl sm:text-2xl font-normal tracking-wide">
                THE SIGNATURE EDIT
              </h4>
              <p className="text-[11px] text-white/85 font-light">
                Distinctive silhouettes.
              </p>
            </div>
          </Link>

          {/* 3. THE SEASONAL EDIT */}
          <Link
            href="/shop?collection=the-seasonal-edit"
            className="group relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] flex flex-col justify-end p-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1200&auto=format&fit=crop"
              alt="The Seasonal Edit"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h4 className="font-editorial text-xl sm:text-2xl font-normal tracking-wide">
                THE SEASONAL EDIT
              </h4>
              <p className="text-[11px] text-white/85 font-light">
                For the season ahead.
              </p>
            </div>
          </Link>

          {/* 4. THE MONOCHROME EDIT */}
          <Link
            href="/shop?collection=the-monochrome-edit"
            className="group relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] flex flex-col justify-end p-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=85&w=1200&auto=format&fit=crop"
              alt="The Monochrome Edit"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h4 className="font-editorial text-xl sm:text-2xl font-normal tracking-wide">
                THE MONOCHROME EDIT
              </h4>
              <p className="text-[11px] text-white/85 font-light">
                A study in timeless tones.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. NEW ARRIVALS (SECTION 7)                                  */}
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
            href="/shop?collection=new-arrivals"
            className="mt-4 md:mt-0 text-[11px] uppercase tracking-[0.25em] text-[#171717] hover:text-[#A18A70] font-medium inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid with Quick Add, Swatches & Alternate Hover Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. BRAND STORY: "THE BEAUTY OF LESS."                        */}
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
      {/* 6. NEWSLETTER: "LETTERS FROM VELORA."                        */}
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
