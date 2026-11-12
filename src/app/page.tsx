"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, RotateCcw, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

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

  // Hero carousel advertisement state
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Four Curated International Fashion Brand Campaign Advertisements
  const heroCampaignSlides = [
    {
      id: 0,
      modelImage: "/images/hero/hero-campaign-woman-coat.jpg",
      modelPosition: "55% 15%",
      modelAlt: "VELORA Autumn/Winter 2025 Campaign — Double-Breasted Wool Atelier Blazer",
      seasonalLabel: "AUTUMN / WINTER 2025 · THE SIGNATURE EDIT",
      editionLabel: "LOOK 01 · WOMEN'S ATELIER",
      productName: "Double-Breasted Wool Atelier Blazer",
      productSlug: "double-breasted-wool-atelier-blazer",
      productImage: "/images/catalog/tailored-double-breasted-blazer.jpg",
      price: 34500,
      description:
        "Tailored from Italian virgin wool twill in a refined oatmeal melange. Defined by sharp peak lapels, a suppressed waist, and hand-finished horn buttons.",
      colors: [
        { name: "Oatmeal Melange", hex: "#D6CBBF" },
        { name: "Pitch Noir", hex: "#171717" },
        { name: "Raw Cream", hex: "#F3ECE1" },
      ],
      collectionHref: "/collections/the-signature-edit",
      collectionName: "The Signature Edit",
    },
    {
      id: 1,
      modelImage: "/images/about/about-story-model.jpg",
      modelPosition: "50% 10%",
      modelAlt: "VELORA Men's Atelier Campaign — Cashmere Blouson Jacket",
      seasonalLabel: "MEN'S ATELIER · THE ESSENTIALS",
      editionLabel: "LOOK 02 · FOUNDATIONAL TAILORING",
      productName: "Men's Minimal Cashmere Blouson Jacket",
      productSlug: "mens-minimal-cashmere-blouson-jacket",
      productImage: "/images/catalog/mens-cashmere-blouson.jpg",
      price: 42000,
      description:
        "Cut from ultra-dense double-faced cashmere with a clean stand collar, concealed horn-button placket, and brushed satin cupro interior.",
      colors: [
        { name: "Charcoal Noir", hex: "#222222" },
        { name: "Camel", hex: "#A88764" },
        { name: "Espresso", hex: "#3D2E24" },
      ],
      collectionHref: "/collections/the-essentials",
      collectionName: "The Essentials",
    },
    {
      id: 2,
      modelImage: "/images/hero/hero-adv-15.jpg",
      modelPosition: "50% 10%",
      modelAlt: "VELORA Editorial Campaign — Architectural Trench Cape",
      seasonalLabel: "NEW SEASON ARRIVALS · THE MONOCHROME EDIT",
      editionLabel: "LOOK 03 · RUNWAY EDITION",
      productName: "Architectural Trench Cape",
      productSlug: "architectural-trench-cape",
      productImage: "/images/catalog/architectural-trench-cape.jpg",
      price: 46000,
      description:
        "A dramatic architectural silhouette cut from weatherproof Italian wool gabardine with structured raglan shoulders and belted waist drape.",
      colors: [
        { name: "Bone Ivory", hex: "#F5F2EB" },
        { name: "Warm Sand", hex: "#D8C8B5" },
        { name: "Pitch Noir", hex: "#171717" },
      ],
      collectionHref: "/collections/the-monochrome-edit",
      collectionName: "The Monochrome Edit",
    },
    {
      id: 3,
      modelImage: "/images/hero/hero-campaign-portrait.jpg",
      modelPosition: "center 20%",
      modelAlt: "VELORA Fine Jewelry & Atelier Accessories — Sculpted Gold Hoop Earrings",
      seasonalLabel: "FINE ATELIER ACCENTS · THE ACCESSORIES",
      editionLabel: "LOOK 04 · JEWELRY ACCENTS",
      productName: "Sculpted Gold Hoop Earrings",
      productSlug: "sculpted-gold-hoop-earrings",
      productImage: "/images/products/sculpted-gold-hoop-earrings.jpg",
      price: 14500,
      description:
        "Handcrafted 18k gold vermeil earrings characterized by undulating molten curves and an architectural twist silhouette. Lightweight for all-day comfort.",
      colors: [
        { name: "18k Yellow Gold", hex: "#D4AF37" },
        { name: "Rhodium Silver", hex: "#E5E4E2" },
      ],
      collectionHref: "/collections/the-accessories",
      collectionName: "The Accessories",
    },
  ];

  const currentSlide = heroCampaignSlides[activeSlide] || heroCampaignSlides[0];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroCampaignSlides.length);
    setSelectedColorIdx(0);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroCampaignSlides.length) % heroCampaignSlides.length);
    setSelectedColorIdx(0);
  };

  // Auto-advance slides every 8 seconds when not hovered
  React.useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. EDITORIAL LUXURY FASHION ADVERTISING HERO SECTION         */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative w-full bg-[#FAF8F5] border-b border-[#E9E6E0] overflow-hidden"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-12 lg:py-14">
          {/* 2-Column Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[640px] sm:min-h-[700px] lg:min-h-[740px]">
            {/* ───────────── LEFT COLUMN: LARGE FASHION MODEL ───────────── */}
            <div className="lg:col-span-7 xl:col-span-7 relative w-full h-[500px] sm:h-[620px] lg:h-[720px] xl:h-[760px] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] group">
              {/* High-Resolution Fashion Model Image */}
              <Image
                key={currentSlide.modelImage}
                src={currentSlide.modelImage}
                alt={currentSlide.modelAlt}
                fill
                priority
                quality={98}
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                style={{ objectPosition: currentSlide.modelPosition }}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Editorial Look Pill in Bottom Left */}
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10 bg-[#FAF8F5]/92 backdrop-blur-md border border-[#E9E6E0] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.25em] text-[#171717] font-medium hidden sm:flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#A18A70]" />
                <span>{currentSlide.editionLabel}</span>
              </div>

              {/* Watermark brand signature in top-right */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 text-[9px] uppercase tracking-[0.3em] font-medium text-[#171717]/60 pointer-events-none">
                CAMPAIGN ATELIER
              </div>
            </div>

            {/* ───────────── RIGHT COLUMN: PRODUCT SHOWCASE ───────────── */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full space-y-6 sm:space-y-7 lg:space-y-8 py-2 lg:py-4">
              {/* 4. Small Seasonal Collection Label & Counter */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E6E0]/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-px bg-[#A18A70]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#8C7A6B] font-semibold">
                    {currentSlide.seasonalLabel}
                  </span>
                </div>
                <span className="text-xs font-mono tracking-widest text-[#77736E]">
                  {String(activeSlide + 1).padStart(2, "0")} / {String(heroCampaignSlides.length).padStart(2, "0")}
                </span>
              </div>

              {/* Product Headline, Price & Description */}
              <div className="space-y-3">
                <Link href={`/product/${currentSlide.productSlug}`} className="group/title block">
                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.08] group-hover/title:text-[#A18A70] transition-colors">
                    {currentSlide.productName}
                  </h1>
                </Link>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-xl sm:text-2xl font-normal text-[#171717] font-editorial tracking-wide">
                    ₹{currentSlide.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#77736E] font-medium">
                    TAX INCLUDED · WHITE GLOVE DELIVERY
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed max-w-lg pt-1">
                  {currentSlide.description}
                </p>
              </div>

              {/* 3. Product Studio Imagery Preview Card */}
              <Link
                href={`/product/${currentSlide.productSlug}`}
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-[#ECE6DC] border border-[#E9E6E0] block group/pimg shadow-xs"
              >
                <Image
                  src={currentSlide.productImage}
                  alt={currentSlide.productName}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover/pimg:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 text-[8.5px] uppercase tracking-[0.2em] text-[#171717] font-semibold border border-[#E9E6E0]">
                  STUDIO ATELIER PIECE
                </div>
              </Link>

              {/* Available Colors & Interactive Swatches */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#77736E] font-medium">
                    AVAILABLE SHADES:
                  </span>
                  <span className="text-[11px] text-[#171717] font-medium">
                    {currentSlide.colors[selectedColorIdx]?.name || currentSlide.colors[0]?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {currentSlide.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      title={color.name}
                      className={`w-5 h-5 rounded-full border border-black/20 transition-all ${
                        selectedColorIdx === idx
                          ? "ring-2 ring-[#171717] ring-offset-2 ring-offset-[#FAF8F5] scale-110"
                          : "hover:scale-105 opacity-85 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                  <span className="text-[10px] text-[#77736E] font-light ml-2">
                    ({currentSlide.colors.length} curated tones)
                  </span>
                </div>
              </div>

              {/* Action Buttons: Prominent Black EXPLORE PRODUCT & Secondary VIEW COLLECTION */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                {/* 5. Prominent Black EXPLORE PRODUCT Button */}
                <Link
                  href={`/product/${currentSlide.productSlug}`}
                  className="inline-flex items-center justify-center gap-3 bg-[#171717] text-white hover:bg-[#8C7A6B] text-[10.5px] uppercase tracking-[0.28em] px-8 py-4 font-medium transition-colors shadow-sm group/btn"
                >
                  <span>EXPLORE PRODUCT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                {/* 6. Secondary VIEW COLLECTION Text Link */}
                <Link
                  href={currentSlide.collectionHref}
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-[10.5px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#8C7A6B] underline underline-offset-8 transition-colors py-2"
                >
                  <span>VIEW COLLECTION</span>
                  <ArrowRight className="w-3 h-3 text-[#8C7A6B]" />
                </Link>
              </div>

              {/* Slide Navigation Dots and Arrows */}
              <div className="pt-4 border-t border-[#E9E6E0] flex items-center justify-between">
                {/* Carousel Indicators */}
                <div className="flex items-center gap-2">
                  {heroCampaignSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveSlide(idx);
                        setSelectedColorIdx(0);
                      }}
                      className={`h-[2px] transition-all duration-500 ${
                        activeSlide === idx
                          ? "w-10 bg-[#171717]"
                          : "w-4 bg-[#171717]/25 hover:bg-[#171717]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-2 border border-[#E9E6E0] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                    aria-label="Previous Campaign"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-2 border border-[#E9E6E0] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                    aria-label="Next Campaign"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
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
