"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { StoreService } from "@/lib/store";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const allProducts = StoreService.getProducts();

  // New arrivals: prioritize the 4 flagship pieces from the reference image
  const newArrivals = [
    allProducts.find((p) => p.slug === "tailored-blazer"),
    allProducts.find((p) => p.slug === "fluid-midi-dress"),
    allProducts.find((p) => p.slug === "relaxed-trousers"),
    allProducts.find((p) => p.slug === "cashmere-knit"),
  ].filter(Boolean) as typeof allProducts;

  // Fallback if any missing
  const displayNewArrivals =
    newArrivals.length === 4
      ? newArrivals
      : allProducts.filter((p) => p.isNewArrival).slice(0, 4);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const res = StoreService.subscribeNewsletter(newsletterEmail);
    setNewsletterStatus(res.message);
    if (res.success) {
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus(null), 4000);
    }
  };

  // Hero advertisement carousel slides (walking model, menswear campaign, standing model, and portrait detail)
  const heroSlides = [
    {
      id: 0,
      image: "/images/hero/hero-slide-walking.jpg",
      tag: "EDITORIAL CAMPAIGN · AUTUMN/WINTER",
      headline: "A QUIETER\nKIND OF LUXURY.",
      subtitle: "Considered silhouettes. Timeless pieces. For today and beyond.",
      cta: "SHOP THE COLLECTION",
      href: "/shop",
      align: "object-top",
      stylePosition: "62% 0%",
    },
    {
      id: 1,
      image: "/images/hero/hero-slide-mens.jpg",
      tag: "MEN'S ATELIER · AUTUMN/WINTER",
      headline: "MODERN MASCULINITY.\nCONSIDERED FORM.",
      subtitle: "Unstructured Italian wool overcoats, relaxed pleated trousers and refined essentials.",
      cta: "EXPLORE MEN'S ATELIER",
      href: "/shop?department=men",
      align: "object-top",
      stylePosition: "58% 18%",
    },
    {
      id: 2,
      image: "/images/hero/hero-slide-standing.png",
      tag: "THE SIGNATURE EDIT · MONOCHROME",
      headline: "ARCHITECTURAL\nEASE & PURITY.",
      subtitle: "Sculpted outerwear and relaxed tailoring cut from Italian virgin wool.",
      cta: "EXPLORE SIGNATURE EDIT",
      href: "/collections/the-signature-edit",
      align: "object-top",
      stylePosition: "52% 12%",
    },
    {
      id: 3,
      image: "/images/hero/hero-slide-portrait.png",
      tag: "FINE JEWELLERY & ATELIER DETAILS",
      headline: "INTENTIONAL\nIN EVERY DETAIL.",
      subtitle: "18k sculpted gold vermeil, tactile silks and hand-finished craft.",
      cta: "EXPLORE ACCESSORIES",
      href: "/shop?department=accessories",
      align: "object-top",
      stylePosition: "68% 0%",
    },
  ];

  // Hero carousel active slide state - fixed without moving or shaking
  const [activeSlide, setActiveSlide] = useState(0);

  const currentHero = heroSlides[activeSlide] || heroSlides[0];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. CINEMATIC FULL-SIZE HERO SECTION (FIXED & RESPONSIVE)     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        data-motion-skip
        className="relative w-full h-[100svh] min-h-[560px] sm:min-h-[650px] lg:min-h-[760px] overflow-hidden bg-[#FAF8F5] border-b border-[#E9E6E0]"
      >
        {/* Fixed background images - perfectly steady without moving or shaking */}
        <div className="absolute inset-0 w-full h-full bg-[#FAF8F5]">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                activeSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                priority={idx === 0}
                quality={96}
                className="object-cover w-full h-full"
                style={{ objectPosition: slide.stylePosition }}
                sizes="100vw"
              />
              {/* Luxury Editorial Soft Scrim Overlay on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/50 to-transparent w-full sm:w-[65%] lg:w-[48%] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Previous / Next Side-Scrolling Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E9E6E0] backdrop-blur-xs text-[#171717] items-center justify-center transition-all hover:scale-105 shadow-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
        </button>

        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
          className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E9E6E0] backdrop-blur-xs text-[#171717] items-center justify-center transition-all hover:scale-105 shadow-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Foreground Content: Clean Typography & CTAs directly in front of the image */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col justify-center space-y-6">
          <div className="space-y-3 max-w-xl transition-all duration-700">
            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#77736E] font-medium block">
              {currentHero.tag}
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#171717] leading-[1.05] tracking-tight whitespace-pre-line">
              {currentHero.headline}
            </h1>
            <p className="text-xs sm:text-sm text-[#3E3A36] font-light leading-relaxed max-w-md pt-1">
              {currentHero.subtitle}
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <Link
              href={currentHero.href}
              data-magnetic
              className="inline-flex items-center gap-2.5 bg-[#171717] text-white hover:bg-[#A18A70] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-8 py-4 font-medium transition-colors duration-300 group shadow-xs"
            >
              <span>{currentHero.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Carousel Slide Indicator Dashes with Slide Numbers */}
          <div className="flex items-center space-x-3 pt-4">
            <div className="flex items-center space-x-2">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-[2.5px] transition-all duration-500 ${
                    activeSlide === idx ? "w-12 bg-[#171717]" : "w-4 bg-[#171717]/35 hover:bg-[#171717]"
                  }`}
                  aria-label={`Advertisement Slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#55504A] tracking-widest pl-2">
              0{activeSlide + 1} / 0{heroSlides.length}
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. SHOP BY DEPARTMENT: WOMEN, MEN, ACCESSORIES               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: WOMEN */}
          <Link
            href="/shop?department=women"
            className="group relative bg-[#F5F2EB] border border-[#E9E6E0] p-6 sm:p-7 flex items-center justify-between overflow-hidden transition-all hover:border-[#171717]/40 hover:shadow-xs min-h-[160px]"
          >
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                WOMEN
              </h2>
              <p className="text-[11px] sm:text-xs text-[#77736E] font-light leading-snug">
                Refined silhouettes for every occasion.
              </p>
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] inline-flex items-center gap-1.5 transition-colors">
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="relative w-28 sm:w-32 h-32 sm:h-36 flex-shrink-0 overflow-hidden">
              <Image
                src="/images/catalog/home-dept-women.jpg"
                alt="VELORA Women"
                fill
                className="object-cover object-center"
                sizes="140px"
              />
            </div>
          </Link>

          {/* Card 2: MEN */}
          <Link
            href="/shop?department=men"
            className="group relative bg-[#F5F2EB] border border-[#E9E6E0] p-6 sm:p-7 flex items-center justify-between overflow-hidden transition-all hover:border-[#171717]/40 hover:shadow-xs min-h-[160px]"
          >
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                MEN
              </h2>
              <p className="text-[11px] sm:text-xs text-[#77736E] font-light leading-snug">
                Modern essentials with timeless appeal.
              </p>
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] inline-flex items-center gap-1.5 transition-colors">
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="relative w-28 sm:w-32 h-32 sm:h-36 flex-shrink-0 overflow-hidden">
              <Image
                src="/images/catalog/home-dept-men.jpg"
                alt="VELORA Men"
                fill
                className="object-cover object-center"
                sizes="140px"
              />
            </div>
          </Link>

          {/* Card 3: ACCESSORIES */}
          <Link
            href="/shop?department=accessories"
            className="group relative bg-[#F5F2EB] border border-[#E9E6E0] p-6 sm:p-7 flex items-center justify-between overflow-hidden transition-all hover:border-[#171717]/40 hover:shadow-xs min-h-[160px]"
          >
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                ACCESSORIES
              </h2>
              <p className="text-[11px] sm:text-xs text-[#77736E] font-light leading-snug">
                Thoughtful details that complete the look.
              </p>
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] inline-flex items-center gap-1.5 transition-colors">
                  <span>SHOP ACCESSORIES</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="relative w-28 sm:w-32 h-32 sm:h-36 flex-shrink-0 overflow-hidden">
              <Image
                src="/images/catalog/home-dept-accessories.jpg"
                alt="VELORA Accessories"
                fill
                className="object-cover object-center"
                sizes="140px"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. EXPLORE OUR COLLECTIONS: 4-CARD CHAPTERS                  */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 border-b border-[#E9E6E0]">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
            EXPLORE OUR COLLECTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Chapter 1: THE ESSENTIALS */}
          <Link
            href="/collections/the-essentials"
            className="group relative aspect-[4/3] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] flex flex-col justify-end p-5 transition-all hover:border-[#171717]/40"
          >
            <Image
              src="/images/catalog/col-essentials-model.jpg"
              alt="The Essentials"
              fill
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h3 className="font-editorial text-lg sm:text-xl font-normal tracking-wide">
                THE ESSENTIALS
              </h3>
              <p className="text-[11px] text-white/85 font-light">
                Timeless, versatile pieces.
              </p>
            </div>
          </Link>

          {/* Chapter 2: THE SIGNATURE EDIT */}
          <Link
            href="/collections/the-signature-edit"
            className="group relative aspect-[4/3] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] flex flex-col justify-end p-5 transition-all hover:border-[#171717]/40"
          >
            <Image
              src="/images/catalog/col-signature-arch.jpg"
              alt="The Signature Edit"
              fill
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h3 className="font-editorial text-lg sm:text-xl font-normal tracking-wide">
                THE SIGNATURE EDIT
              </h3>
              <p className="text-[11px] text-white/85 font-light">
                Distinctive silhouettes.
              </p>
            </div>
          </Link>

          {/* Chapter 3: THE SEASONAL EDIT */}
          <Link
            href="/collections/the-seasonal-edit"
            className="group relative aspect-[4/3] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] flex flex-col justify-end p-5 transition-all hover:border-[#171717]/40"
          >
            <Image
              src="/images/catalog/col-seasonal-hills.jpg"
              alt="The Seasonal Edit"
              fill
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h3 className="font-editorial text-lg sm:text-xl font-normal tracking-wide">
                THE SEASONAL EDIT
              </h3>
              <p className="text-[11px] text-white/85 font-light">
                For the season ahead.
              </p>
            </div>
          </Link>

          {/* Chapter 4: THE MONOCHROME EDIT */}
          <Link
            href="/collections/the-monochrome-edit"
            className="group relative aspect-[4/3] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] flex flex-col justify-end p-5 transition-all hover:border-[#171717]/40"
          >
            <Image
              src="/images/catalog/col-monochrome-drape.jpg"
              alt="The Monochrome Edit"
              fill
              className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <h3 className="font-editorial text-lg sm:text-xl font-normal tracking-wide">
                THE MONOCHROME EDIT
              </h3>
              <p className="text-[11px] text-white/85 font-light">
                A study in timeless tones.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. NEW ARRIVALS: ASYMMETRIC LAYOUT ("Fresh This Season.")     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Narrative Column (~28% width) */}
          <div className="lg:col-span-3 space-y-3 pt-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium block">
              NEW ARRIVALS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal leading-[1.12]">
              Fresh<br />
              This Season.
            </h2>
            <p className="text-xs text-[#55504A] font-light leading-relaxed pt-1 pb-4">
              Our latest pieces, designed with a focus on form, fabric and longevity.
            </p>
            <div>
              <Link
                href="/shop?collection=new-arrivals"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] border-b border-[#171717] pb-1 transition-colors group"
              >
                <span>VIEW ALL NEW ARRIVALS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Product Grid (~72% width: 4 Product Cards in a Row) */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {displayNewArrivals.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 2} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. BRAND STORY: "THE BEAUTY OF LESS."                        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Architectural Steps & Olive Tree Image (~50% width) */}
          <div className="lg:col-span-6 relative aspect-[16/9] sm:aspect-[16/8] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
            <Image
              src="/images/catalog/home-story-steps.jpg"
              alt="VELORA Architectural Philosophy"
              fill
              className="object-cover object-left"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Editorial Story Text (~50% width) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4 lg:pl-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              OUR STORY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-[1.1] tracking-tight">
              THE BEAUTY OF LESS.
            </h2>
            <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed max-w-lg pt-1 pb-2">
              Thoughtful design, enduring quality and a commitment to pieces that stay with you, season after season.
            </p>
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] border-b border-[#171717] pb-1 transition-colors group"
              >
                <span>DISCOVER VELORA</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. FULL-WIDTH CINEMATIC CAMPAIGN: "MADE TO LAST."             */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[700px] overflow-hidden bg-[#241F1A]">
        {/* Campaign Model Backdrop */}
        <div className="absolute -inset-[2px]">
          <Image
            src="/images/catalog/home-campaign-banner.jpg"
            alt="VELORA Made to Last Campaign"
            fill
            priority
            quality={98}
            className="object-cover"
            style={{ objectPosition: "70% 0%" }}
            sizes="100vw"
          />
          {/* Subtle dark gradient overlay to ensure high contrast for typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-[65%]" />
        </div>

        {/* Campaign Left Overlay */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
          <div className="max-w-lg space-y-2 sm:space-y-3 text-white">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide">
              MADE TO LAST.
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-light">
              Enduring pieces for a considered wardrobe.
            </p>
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-white/70 hover:border-white text-white hover:bg-white hover:text-[#171717] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-6 py-3 font-medium transition-all group"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 7. SHOPPING BENEFITS BAR                                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAF8F5] border-b border-[#E9E6E0] py-8 sm:py-10">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Benefit 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#F3ECE1] border border-[#E9E6E0] flex items-center justify-center flex-shrink-0 text-[#171717]">
                <Truck className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717]">
                  PAN INDIA DELIVERY
                </h4>
                <p className="text-[11px] text-[#77736E] font-light">
                  On all orders
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#F3ECE1] border border-[#E9E6E0] flex items-center justify-center flex-shrink-0 text-[#171717]">
                <RotateCcw className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717]">
                  EASY RETURNS
                </h4>
                <p className="text-[11px] text-[#77736E] font-light">
                  Within 7 days
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#F3ECE1] border border-[#E9E6E0] flex items-center justify-center flex-shrink-0 text-[#171717]">
                <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717]">
                  SECURE PAYMENTS
                </h4>
                <p className="text-[11px] text-[#77736E] font-light">
                  Razorpay & more
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#F3ECE1] border border-[#E9E6E0] flex items-center justify-center flex-shrink-0 text-[#171717]">
                <Sparkles className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717]">
                  AUTHENTIC QUALITY
                </h4>
                <p className="text-[11px] text-[#77736E] font-light">
                  Thoughtfully made
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 8. LETTERS FROM VELORA (INLINE NEWSLETTER ROW)               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
              LETTERS FROM VELORA.
            </h3>
            <p className="text-xs text-[#77736E] font-light">
              Discover new collections, thoughtful stories and considered essentials.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-stretch max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="flex-1 min-w-[200px] sm:min-w-[280px] bg-white border border-[#E9E6E0] px-4 py-3 text-xs text-[#171717] placeholder-[#77736E] focus:outline-none focus:border-[#171717] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#171717] hover:bg-[#A18A70] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.25em] px-6 py-3 font-medium inline-flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {newsletterStatus && (
          <div className="mt-3 text-center md:text-right text-xs text-[#A18A70] flex items-center justify-end gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{newsletterStatus}</span>
          </div>
        )}
      </section>
    </div>
  );
}
