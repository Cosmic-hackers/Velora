"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const designPrinciples = [
    {
      label: "FORM",
      desc: "Clean lines and purposeful silhouettes.",
      image: "/images/about/design-form.jpg",
    },
    {
      label: "FABRIC",
      desc: "Natural materials, selected for longevity.",
      image: "/images/about/design-fabric.jpg",
    },
    {
      label: "FUNCTION",
      desc: "Thoughtful details for everyday ease.",
      image: "/images/about/design-function.jpg",
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION: "THE ART OF LESS." (FULL-WIDTH BANNER)      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden bg-[#786452] border-b border-[#E9E6E0]">
        <div className="absolute -inset-[2px]">
          <Image
            src="/images/about/about-hero-model.jpg"
            alt="VELORA The Art of Less"
            fill
            priority
            quality={98}
            className="object-cover"
            style={{ objectPosition: "70% 0%" }}
            sizes="100vw"
          />
          {/* Subtle gradient overlay to provide pristine legibility on the left while showcasing the model on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent w-full sm:w-[60%] lg:w-[48%]" />
        </div>

        {/* Hero Narrative Overlay */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-2 sm:space-y-3">
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-tight">
            THE ART OF LESS.
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-light tracking-wide max-w-md">
            Designed with intention. Made to endure.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. OUR STORY: "A Modern Wardrobe for a More Considered Life" */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Story text */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              OUR STORY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-[1.12]">
              A Modern Wardrobe<br />
              for a More Considered Life.
            </h2>
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed max-w-lg pt-1 pb-2">
              Velora is a contemporary fashion house rooted in purity, purpose and lasting design. We create refined essentials that transcend seasons and trends.
            </p>
            <div>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors group"
              >
                <span>OUR PHILOSOPHY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Male model portrait */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
            <Image
              src="/images/about/about-story-model.jpg"
              alt="A Considered Modern Wardrobe"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. OUR DESIGN LANGUAGE: FORM, FABRIC, FUNCTION               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="text-center pb-8 sm:pb-10">
          <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#171717] font-medium">
            OUR DESIGN LANGUAGE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {designPrinciples.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-medium text-[#171717] block">
                  {item.label}
                </span>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. CRAFTSMANSHIP: "Made with Care."                          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Artisan hands cutting cloth */}
          <div className="lg:col-span-7 relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
            <Image
              src="/images/about/about-craftsmanship.jpg"
              alt="Artisan Craftsmanship"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right Column: Craftsmanship description */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              CRAFTSMANSHIP
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-tight">
              Made with Care.
            </h2>
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed max-w-md pt-1 pb-2">
              From fabric selection to final stitch, each piece is crafted by skilled hands in trusted ateliers.
            </p>
            <div>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors group"
              >
                <span>MEET OUR MAKERS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. OUR MANIFESTO: "TIMELESS DESIGN. LASTING VALUE."          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              OUR MANIFESTO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-tight leading-tight">
              TIMELESS DESIGN.<br />
              LASTING VALUE.
            </h2>
          </div>

          {/* Middle vertical divider */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] h-20 bg-[#E9E6E0]" />
          </div>

          {/* Right Column: Statement Paragraph */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
              We believe in fewer, better pieces — garments that bring clarity, confidence and ease to modern life.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. FULL-WIDTH CAMPAIGN STRIP WITH "EXPLORE COLLECTIONS"      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[240px] sm:h-[300px] lg:h-[360px] overflow-hidden bg-[#241E19] border-t border-[#E9E6E0]">
        <div className="absolute -inset-[2px]">
          <Image
            src="/images/about/about-bottom-campaign.jpg"
            alt="VELORA Flowing Cape Campaign"
            fill
            priority
            quality={98}
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-end">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 bg-[#171717]/90 hover:bg-[#171717] text-white border border-white/20 hover:border-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-7 py-3.5 font-medium transition-all group backdrop-blur-xs shadow-lg"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
