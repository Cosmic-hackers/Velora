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
      {/* 1. HERO SECTION: "THE ART OF LESS."                          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-[#E9E6E0] bg-[#8B735B] overflow-hidden text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
          {/* Left Column: Heading and Subtitle */}
          <div className="w-full lg:w-[55%] px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col justify-center space-y-3 sm:space-y-4 z-10">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-tight">
              THE ART OF LESS.
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-light tracking-wide max-w-md">
              Designed with intention. Made to endure.
            </p>
          </div>

          {/* Right Column: Hero Portrait Photography */}
          <div className="w-full lg:w-[45%] relative min-h-[320px] sm:min-h-[380px] lg:min-h-auto bg-[#7A644E] overflow-hidden">
            <Image
              src="/images/about/about-hero-model.jpg"
              alt="VELORA The Art of Less"
              fill
              priority
              quality={95}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. OUR STORY: "A Modern Wardrobe for a More Considered Life" */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Story text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
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
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
            <Image
              src="/images/about/about-story-model.jpg"
              alt="A Considered Modern Wardrobe"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
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
              <div className="relative aspect-[16/8] sm:aspect-[16/9] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
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
          <div className="lg:col-span-7 relative aspect-[16/9] sm:aspect-[16/8] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
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
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              OUR MANIFESTO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-tight leading-tight">
              TIMELESS DESIGN.<br />
              LASTING VALUE.
            </h2>
          </div>

          {/* Right Column: Statement Paragraph */}
          <div className="lg:col-span-5 lg:pl-6">
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
              We believe in fewer, better pieces — garments that bring clarity, confidence and ease to modern life.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. FULL-WIDTH CAMPAIGN STRIP WITH "EXPLORE COLLECTIONS"      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-[#2C241E]">
        <Image
          src="/images/about/about-bottom-campaign.jpg"
          alt="VELORA Flowing Cape Campaign"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle right-side dark gradient to ensure high button contrast */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-end">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 bg-[#171717]/90 hover:bg-[#171717] text-white border border-white/20 hover:border-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-7 py-3.5 font-medium transition-all group backdrop-blur-xs"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
