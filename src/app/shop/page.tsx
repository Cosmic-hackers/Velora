"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL query params
  const paramDepartment = searchParams.get("department") || searchParams.get("gender") || "all";
  const paramCategory = searchParams.get("category") || "all";
  const paramCollection = searchParams.get("collection") || "all";
  const paramSort = searchParams.get("sort") || "newest";
  const paramSize = searchParams.get("size") || "all";
  const paramColor = searchParams.get("color") || "all";
  const paramMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000;

  // Filter states
  const [selectedGender, setSelectedGender] = useState<string>(paramDepartment);
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(paramCollection);
  const [selectedSize, setSelectedSize] = useState<string>(paramSize);
  const [selectedColor, setSelectedColor] = useState<string>(paramColor);
  const [priceRange, setPriceRange] = useState<number>(paramMaxPrice);
  const [sortBy, setSortBy] = useState<string>(paramSort);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion collapse toggles for sidebar sections
  const [openSections, setOpenSections] = useState({
    gender: true,
    category: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const allProducts = StoreService.getProducts();

  // Standard sizes matching the reference: [ XS ] [ S ] [ M ] [ L ] [ XL ]
  const availableSizes = ["XS", "S", "M", "L", "XL"];

  // Color shades matching the reference image swatches
  const colorShades = [
    { label: "Pitch Noir", hex: "#171717", key: "Black" },
    { label: "Dark Espresso", hex: "#3D2E24", key: "Espresso" },
    { label: "Cognac Brown", hex: "#7C4A28", key: "Cognac" },
    { label: "Warm Camel", hex: "#A3784A", key: "Camel" },
    { label: "Oatmeal Melange", hex: "#E2D8CC", key: "Oatmeal" },
    { label: "Bone Ivory", hex: "#F5F2EB", key: "Ivory" },
    { label: "Slate Grey", hex: "#8E8982", key: "Slate" },
  ];

  // Sync state when URL params change externally
  useEffect(() => {
    if (paramDepartment) setSelectedGender(paramDepartment);
    if (paramCategory) setSelectedCategory(paramCategory);
    if (paramCollection) setSelectedCollection(paramCollection);
    if (paramSort) setSortBy(paramSort);
    if (paramSize) setSelectedSize(paramSize);
    if (paramColor) setSelectedColor(paramColor);
  }, [paramDepartment, paramCategory, paramCollection, paramSort, paramSize, paramColor]);

  // Sync local filter state back to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedGender !== "all") params.set("department", selectedGender);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedCollection !== "all") params.set("collection", selectedCollection);
    if (selectedSize !== "all") params.set("size", selectedSize);
    if (selectedColor !== "all") params.set("color", selectedColor);
    if (priceRange < 100000) params.set("maxPrice", String(priceRange));
    if (sortBy !== "newest") params.set("sort", sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";
    window.history.replaceState(null, "", newUrl);
  }, [selectedGender, selectedCategory, selectedCollection, selectedSize, selectedColor, priceRange, sortBy]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        if (!p.isPublished) return false;

        // Gender filter
        if (selectedGender !== "all") {
          if (selectedGender === "men" && p.gender !== "men" && p.department !== "men") return false;
          if (selectedGender === "women" && p.gender !== "women" && p.department !== "women") return false;
        }

        // Category filter
        if (selectedCategory !== "all") {
          if (selectedCategory === "outerwear-coats") {
            const isMatch =
              p.categoryId === "cat-w-outerwear" ||
              p.categoryId === "cat-m-jackets" ||
              p.categoryName?.toLowerCase().includes("coat") ||
              p.categoryName?.toLowerCase().includes("jacket") ||
              p.categoryName?.toLowerCase().includes("outerwear");
            if (!isMatch) return false;
          } else if (selectedCategory === "tailoring-suits") {
            const isMatch =
              p.categoryId === "cat-w-coords" ||
              p.categoryId === "cat-m-coords" ||
              p.name.toLowerCase().includes("blazer") ||
              p.name.toLowerCase().includes("trouser") ||
              p.name.toLowerCase().includes("suit");
            if (!isMatch) return false;
          } else if (selectedCategory === "knitwear-cashmere") {
            const isMatch =
              p.categoryId === "cat-w-knitwear" ||
              p.categoryId === "cat-m-knitwear" ||
              p.name.toLowerCase().includes("knit") ||
              p.name.toLowerCase().includes("cashmere") ||
              p.name.toLowerCase().includes("wrap");
            if (!isMatch) return false;
          } else if (selectedCategory === "minimal-essentials") {
            const isMatch =
              p.categoryId === "cat-w-tops" ||
              p.categoryId === "cat-w-shirts" ||
              p.categoryId === "cat-m-shirts" ||
              p.categoryId === "cat-m-tshirts" ||
              p.categoryId === "cat-w-dresses";
            if (!isMatch) return false;
          } else {
            if (p.categoryId !== selectedCategory && p.slug !== selectedCategory) return false;
          }
        }

        // Collection filter
        if (selectedCollection !== "all") {
          if (selectedCollection === "the-essentials" && p.collectionId !== "col-1") return false;
          if (selectedCollection === "the-seasonal-edit" && p.collectionId !== "col-2") return false;
          if (selectedCollection === "the-signature-edit" && p.collectionId !== "col-3") return false;
          if (selectedCollection === "the-monochrome-edit" && p.collectionId !== "col-4") return false;
          if (selectedCollection === "new-arrivals" && !p.isNewArrival) return false;
          if (selectedCollection === "best-sellers" && !p.isBestSeller) return false;
        }

        // Price filter
        if (p.price > priceRange) return false;

        // Size filter
        if (selectedSize !== "all" && !p.sizes.includes(selectedSize)) return false;

        // Color filter
        if (selectedColor !== "all") {
          const hasColor = p.colors?.some((c) =>
            c.name.toLowerCase().includes(selectedColor.toLowerCase())
          );
          if (!hasColor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        // Default newest
        return new Date(b.createdAt || "2024-01-01").getTime() - new Date(a.createdAt || "2024-01-01").getTime();
      });
  }, [allProducts, selectedGender, selectedCategory, selectedCollection, selectedSize, selectedColor, priceRange, sortBy]);

  const sortLabels: Record<string, string> = {
    newest: "NEWEST RELEASES",
    featured: "FEATURED ATELIER",
    price_asc: "PRICE: LOW TO HIGH",
    price_desc: "PRICE: HIGH TO LOW",
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. CINEMATIC FULL-WIDTH CAMPAIGN BANNER                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] overflow-hidden bg-[#ECE6DC] border-b border-[#E9E6E0]">
        {/* Architectural backdrop and Model image */}
        <div className="absolute inset-0">
          <Image
            src="/images/catalog/shop-banner.jpg"
            alt="VELORA The Complete Portfolio"
            fill
            priority
            className="object-cover object-right sm:object-center"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to enhance legibility on the left while revealing the model on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/60 to-transparent sm:via-[#FAF8F5]/40" />
        </div>

        {/* Banner Content (Aligned to left margin) */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
          <div className="max-w-xl space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#77736E] font-medium block">
              S H O P
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#171717] font-normal tracking-tight leading-[1.08]">
              The Complete Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-[#55504A] font-light leading-relaxed max-w-md pt-1">
              Pure silhouettes, master tailoring, natural unadulterated wools and cashmere.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. SUB-HEADER / TOOLBAR BAR (PIECE COUNT & SORT)             */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#171717] py-2 px-3 border border-[#E9E6E0] bg-white"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine ({filteredProducts.length})</span>
          </button>

          {/* Left Count Indicator (Aligned with grid on desktop) */}
          <div className="hidden lg:block lg:ml-[280px] xl:ml-[300px]">
            <span className="text-xs text-[#77736E] font-light">
              Displaying <strong className="font-medium text-[#171717]">{filteredProducts.length}</strong> pieces
            </span>
          </div>

          {/* Right Minimalist Sort Dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors py-1"
            >
              <span className="text-[#77736E]">SORT BY:</span>
              <span className="underline underline-offset-4">{sortLabels[sortBy] || "NEWEST RELEASES"}</span>
              <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>

            {sortDropdownOpen && (
              <div
                onMouseLeave={() => setSortDropdownOpen(false)}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E9E6E0] shadow-md py-2 z-30 text-[10px] sm:text-[11px] tracking-wider uppercase animate-fadeIn"
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSortBy(key);
                      setSortDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-[#FAF8F5] transition-colors ${
                      sortBy === key ? "font-semibold text-[#171717]" : "text-[#77736E]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. MAIN SHOP LAYOUT (SIDEBAR + 3-COLUMN PRODUCT GRID)        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          {/* ──────────────────────────────────────────────────────── */}
          {/* LEFT FILTER SIDEBAR: "REFINE ATELIER"                    */}
          {/* ──────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-28 self-start space-y-7 pr-4">
            <div className="pb-3 border-b border-[#E9E6E0]">
              <h2 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#171717]">
                REFINE ATELIER
              </h2>
            </div>

            {/* Section 1: GENDER */}
            <div className="space-y-3 pb-5 border-b border-[#E9E6E0]/70">
              <button
                onClick={() => toggleSection("gender")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]"
              >
                <span>GENDER</span>
                {openSections.gender ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                )}
              </button>

              {openSections.gender && (
                <div className="space-y-2 pt-1 text-xs text-[#55504A]">
                  <label className="flex items-center gap-2.5 cursor-pointer hover:text-[#171717] transition-colors">
                    <input
                      type="radio"
                      name="gender_filter"
                      checked={selectedGender === "all"}
                      onChange={() => setSelectedGender("all")}
                      className="accent-[#171717] w-3.5 h-3.5 rounded-none"
                    />
                    <span className={selectedGender === "all" ? "text-[#171717] font-medium" : ""}>
                      All Creations
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer hover:text-[#171717] transition-colors">
                    <input
                      type="radio"
                      name="gender_filter"
                      checked={selectedGender === "men"}
                      onChange={() => setSelectedGender("men")}
                      className="accent-[#171717] w-3.5 h-3.5 rounded-none"
                    />
                    <span className={selectedGender === "men" ? "text-[#171717] font-medium" : ""}>
                      Men&apos;s Atelier
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer hover:text-[#171717] transition-colors">
                    <input
                      type="radio"
                      name="gender_filter"
                      checked={selectedGender === "women"}
                      onChange={() => setSelectedGender("women")}
                      className="accent-[#171717] w-3.5 h-3.5 rounded-none"
                    />
                    <span className={selectedGender === "women" ? "text-[#171717] font-medium" : ""}>
                      Women&apos;s Atelier
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Section 2: CATEGORY */}
            <div className="space-y-3 pb-5 border-b border-[#E9E6E0]/70">
              <button
                onClick={() => toggleSection("category")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]"
              >
                <span>CATEGORY</span>
                {openSections.category ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                )}
              </button>

              {openSections.category && (
                <div className="space-y-2 pt-1 text-xs text-[#55504A]">
                  {[
                    { key: "all", label: "All Categories" },
                    { key: "outerwear-coats", label: "Outerwear & Coats" },
                    { key: "tailoring-suits", label: "Tailoring & Suits" },
                    { key: "knitwear-cashmere", label: "Knitwear & Cashmere" },
                    { key: "minimal-essentials", label: "Minimal Essentials" },
                  ].map((cat) => (
                    <label
                      key={cat.key}
                      className="flex items-center gap-2.5 cursor-pointer hover:text-[#171717] transition-colors"
                    >
                      <input
                        type="radio"
                        name="category_filter"
                        checked={selectedCategory === cat.key}
                        onChange={() => setSelectedCategory(cat.key)}
                        className="accent-[#171717] w-3.5 h-3.5"
                      />
                      <span className={selectedCategory === cat.key ? "text-[#171717] font-medium" : ""}>
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: PRICE */}
            <div className="space-y-3 pb-5 border-b border-[#E9E6E0]/70">
              <button
                onClick={() => toggleSection("price")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]"
              >
                <span>PRICE</span>
                {openSections.price ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                )}
              </button>

              {openSections.price && (
                <div className="space-y-3 pt-2">
                  {/* Slider with leather-tone track matching reference */}
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-[#DED8CF] accent-[#8B5E3C] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-xs text-[#55504A] font-mono">
                    <span>₹1,000</span>
                    <span>-</span>
                    <span>₹{priceRange.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: SIZE */}
            <div className="space-y-3 pb-5 border-b border-[#E9E6E0]/70">
              <button
                onClick={() => toggleSection("size")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]"
              >
                <span>SIZE</span>
                {openSections.size ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                )}
              </button>

              {openSections.size && (
                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  {availableSizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(isSelected ? "all" : sz)}
                        className={`text-[10px] font-mono uppercase px-2.5 py-1.5 min-w-[34px] border transition-all ${
                          isSelected
                            ? "bg-[#171717] text-white border-[#171717]"
                            : "bg-white text-[#171717] border-[#DED8CF] hover:border-[#171717]"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 5: COLOR SHADE */}
            <div className="space-y-3 pb-5">
              <button
                onClick={() => toggleSection("color")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]"
              >
                <span>COLOR SHADE</span>
                {openSections.color ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#77736E]" />
                )}
              </button>

              {openSections.color && (
                <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                  {colorShades.map((c) => {
                    const isSelected = selectedColor === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setSelectedColor(isSelected ? "all" : c.key)}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          isSelected
                            ? "ring-2 ring-offset-2 ring-[#171717] scale-110"
                            : "border-black/20 hover:scale-110"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Reset All Filters button if any active */}
            {(selectedGender !== "all" ||
              selectedCategory !== "all" ||
              selectedSize !== "all" ||
              selectedColor !== "all" ||
              priceRange < 100000) && (
              <button
                onClick={() => {
                  setSelectedGender("all");
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setSelectedSize("all");
                  setSelectedColor("all");
                  setPriceRange(100000);
                }}
                className="text-[10px] uppercase tracking-[0.2em] text-[#77736E] hover:text-[#171717] underline underline-offset-4 pt-1 block"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* ──────────────────────────────────────────────────────── */}
          {/* RIGHT PRODUCT GRID: SPACIOUS 3 COLUMNS                   */}
          {/* ──────────────────────────────────────────────────────── */}
          <main className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white/60 border border-[#E9E6E0] p-12 space-y-4">
                <p className="font-editorial text-2xl text-[#171717]">
                  No Atelier Creations Found
                </p>
                <p className="text-xs text-[#77736E] font-light max-w-md mx-auto">
                  Try adjusting your department, category, or price criteria to view available pieces.
                </p>
                <button
                  onClick={() => {
                    setSelectedGender("all");
                    setSelectedCategory("all");
                    setSelectedCollection("all");
                    setSelectedSize("all");
                    setSelectedColor("all");
                    setPriceRange(100000);
                  }}
                  className="mt-3 text-xs uppercase tracking-widest text-[#171717] border-b border-[#171717] pb-1 hover:text-[#A18A70] transition-colors"
                >
                  View All Pieces
                </button>
              </div>
            ) : (
              /* Exact 3-column editorial grid matching reference */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} priority={idx < 3} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. MOBILE SLIDE-OUT FILTER DRAWER                            */}
      {/* ──────────────────────────────────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E6E0]">
                <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#171717]">
                  REFINE ATELIER
                </h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-[#171717]" />
                </button>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717] block">
                  GENDER
                </span>
                <div className="space-y-2 text-xs">
                  {["all", "men", "women"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile_gender"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g)}
                        className="accent-[#171717]"
                      />
                      <span className="capitalize">{g === "all" ? "All Creations" : `${g}'s Atelier`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717] block">
                  CATEGORY
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { key: "all", label: "All Categories" },
                    { key: "outerwear-coats", label: "Outerwear & Coats" },
                    { key: "tailoring-suits", label: "Tailoring & Suits" },
                    { key: "knitwear-cashmere", label: "Knitwear & Cashmere" },
                    { key: "minimal-essentials", label: "Minimal Essentials" },
                  ].map((c) => (
                    <label key={c.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile_cat"
                        checked={selectedCategory === c.key}
                        onChange={() => setSelectedCategory(c.key)}
                        className="accent-[#171717]"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717] block">
                  SIZE
                </span>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? "all" : sz)}
                      className={`text-[10px] font-mono uppercase px-2.5 py-1.5 border ${
                        selectedSize === sz
                          ? "bg-[#171717] text-white border-[#171717]"
                          : "bg-white text-[#171717] border-[#DED8CF]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Shade */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717] block">
                  COLOR SHADE
                </span>
                <div className="flex gap-2 flex-wrap">
                  {colorShades.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelectedColor(selectedColor === c.key ? "all" : c.key)}
                      className={`w-6 h-6 rounded-full border ${
                        selectedColor === c.key ? "ring-2 ring-black ring-offset-1" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E6E0]">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#171717] text-white py-3 text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <p className="text-xs tracking-widest uppercase text-[#77736E] animate-pulse">
            Loading VELORA Portfolio...
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
