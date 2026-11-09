"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, RefreshCw, Check } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query params
  const paramDepartment = searchParams.get("department") || searchParams.get("gender") || "all";
  const paramCategory = searchParams.get("category") || "all";
  const paramCollection = searchParams.get("collection") || "all";
  const paramTag = searchParams.get("tag");
  const paramSort = searchParams.get("sort") || "newest";
  const paramSize = searchParams.get("size") || "all";
  const paramColor = searchParams.get("color") || "all";

  // Filter states
  const [selectedDepartment, setSelectedDepartment] = useState<string>(paramDepartment);
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(paramCollection);
  const [selectedSize, setSelectedSize] = useState<string>(paramSize);
  const [selectedColor, setSelectedColor] = useState<string>(paramColor);
  const [priceRange, setPriceRange] = useState<number>(60000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(paramSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allProducts = StoreService.getProducts();
  const allCategories = StoreService.getCategories();
  const allCollections = StoreService.getCollections();

  const allSizes = ["XS", "S", "M", "L", "XL"];
  const allColors = [
    { name: "Pitch Noir", hex: "#171717" },
    { name: "Oatmeal Melange", hex: "#D6CBBF" },
    { name: "Ivory Silk", hex: "#FAF8F5" },
    { name: "Raw Cream", hex: "#F3ECE1" },
    { name: "Warm Camel", hex: "#C2A888" },
    { name: "Chestnut Brown", hex: "#5C3A21" },
  ];

  // Sync state when URL params change externally
  useEffect(() => {
    if (paramDepartment) setSelectedDepartment(paramDepartment);
    if (paramCategory) setSelectedCategory(paramCategory);
    if (paramCollection) setSelectedCollection(paramCollection);
    if (paramSort) setSortBy(paramSort);
  }, [paramDepartment, paramCategory, paramCollection, paramSort]);

  // Sync local filter state back to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDepartment !== "all") params.set("department", selectedDepartment);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedCollection !== "all") params.set("collection", selectedCollection);
    if (selectedSize !== "all") params.set("size", selectedSize);
    if (selectedColor !== "all") params.set("color", selectedColor);
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (paramTag) params.set("tag", paramTag);

    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";
    window.history.replaceState(null, "", newUrl);
  }, [selectedDepartment, selectedCategory, selectedCollection, selectedSize, selectedColor, sortBy, paramTag]);

  // Categories filtered by the selected department
  const visibleCategories = useMemo(() => {
    if (selectedDepartment === "all") return allCategories;
    return allCategories.filter(
      (c) => c.department === selectedDepartment || (selectedDepartment === "women" && c.department === "women") || (selectedDepartment === "men" && c.department === "men")
    );
  }, [allCategories, selectedDepartment]);

  // Filtering & sorting logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (!product.isPublished) return false;

      // Department / Gender filter
      if (selectedDepartment !== "all") {
        if (selectedDepartment === "women") {
          if (product.gender !== "women" && product.gender !== "unisex" && product.department !== "women") return false;
        } else if (selectedDepartment === "men") {
          if (product.gender !== "men" && product.gender !== "unisex" && product.department !== "men") return false;
        } else if (selectedDepartment === "accessories") {
          if (product.department !== "accessories" && !product.categoryId.startsWith("cat-a")) return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        const cat = allCategories.find((c) => c.slug === selectedCategory);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Collection filter
      if (selectedCollection !== "all") {
        const col = allCollections.find((c) => c.slug === selectedCollection);
        if (col && product.collectionId !== col.id) {
          if (selectedCollection === "new-arrivals" && !product.isNewArrival) return false;
          if (selectedCollection === "best-sellers" && !product.isBestSeller) return false;
          if (selectedCollection !== "new-arrivals" && selectedCollection !== "best-sellers") return false;
        }
      }

      // Tag filter
      if (paramTag === "new-arrivals" && !product.isNewArrival) return false;

      // Size filter
      if (selectedSize !== "all" && !product.sizes.includes(selectedSize)) return false;

      // Color filter
      if (selectedColor !== "all") {
        if (!product.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())) return false;
      }

      // Price filter
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice > priceRange) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    allProducts,
    allCategories,
    allCollections,
    selectedDepartment,
    selectedCategory,
    selectedCollection,
    paramTag,
    selectedSize,
    selectedColor,
    priceRange,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedDepartment("all");
    setSelectedCategory("all");
    setSelectedCollection("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setPriceRange(60000);
    setSortBy("newest");
    setCurrentPage(1);
    router.replace("/shop");
  };

  const hasActiveFilters =
    selectedDepartment !== "all" ||
    selectedCategory !== "all" ||
    selectedCollection !== "all" ||
    selectedSize !== "all" ||
    selectedColor !== "all" ||
    priceRange < 60000;

  // Breadcrumb / Title text
  const currentTitle = useMemo(() => {
    if (selectedCollection !== "all") {
      const col = allCollections.find((c) => c.slug === selectedCollection);
      return col ? col.name : "Curated Collection";
    }
    if (selectedCategory !== "all") {
      const cat = allCategories.find((c) => c.slug === selectedCategory);
      const dept = selectedDepartment !== "all" ? selectedDepartment.toUpperCase() : "ATELIER";
      return `${dept} / ${cat ? cat.name : "Category"}`;
    }
    if (selectedDepartment === "women") return "Women's Collection";
    if (selectedDepartment === "men") return "Men's Collection";
    if (selectedDepartment === "accessories") return "Accessories Portfolio";
    return "All Creations";
  }, [selectedDepartment, selectedCategory, selectedCollection, allCategories, allCollections]);

  return (
    <div className="w-full bg-[#F8F7F4] text-[#171717] min-h-screen">
      {/* Top Editorial Breadcrumb & Department Banner */}
      <div className="w-full border-b border-[#E9E6E0] bg-[#FAF9F6] px-6 sm:px-10 lg:px-14 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <nav className="text-[10px] tracking-[0.25em] uppercase text-[#77736E] flex items-center gap-2">
              <button onClick={() => resetFilters()} className="hover:text-[#171717]">ATELIER</button>
              <span>/</span>
              {selectedDepartment !== "all" && (
                <>
                  <button onClick={() => setSelectedCategory("all")} className="hover:text-[#171717]">
                    {selectedDepartment.toUpperCase()}
                  </button>
                  <span>/</span>
                </>
              )}
              <span className="text-[#171717] font-medium">{currentTitle}</span>
            </nav>
            <h1 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              {currentTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#77736E] font-light max-w-xl">
              High-fashion silhouettes cut from noble textiles. Designed to endure.
            </p>
          </div>

          {/* Department Tabs & Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Department Quick Filter Tabs */}
            <div className="inline-flex border border-[#E9E6E0] bg-white p-1 text-[11px] uppercase tracking-[0.18em]">
              {[
                { label: "ALL", val: "all" },
                { label: "WOMEN", val: "women" },
                { label: "MEN", val: "men" },
                { label: "ACCESSORIES", val: "accessories" },
              ].map((d) => (
                <button
                  key={d.val}
                  onClick={() => {
                    setSelectedDepartment(d.val);
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 transition-all ${
                    selectedDepartment === d.val
                      ? "bg-[#171717] text-white font-medium"
                      : "text-[#77736E] hover:text-[#171717]"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 border border-[#E9E6E0] bg-white px-4 py-2 text-xs uppercase tracking-wider text-[#171717]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A18A70]" />
              <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#E9E6E0] px-4 py-2 pr-8 text-xs uppercase tracking-[0.18em] text-[#171717] focus:outline-none focus:border-[#171717] cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#77736E] absolute right-3 pointer-events-none" />
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden xl:inline-flex items-center border border-[#E9E6E0] bg-white text-xs">
              <button
                onClick={() => setGridCols(3)}
                className={`px-2.5 py-1.5 ${gridCols === 3 ? "bg-[#171717] text-white" : "text-[#77736E]"}`}
                title="3 Columns"
              >
                3
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`px-2.5 py-1.5 ${gridCols === 4 ? "bg-[#171717] text-white" : "text-[#77736E]"}`}
                title="4 Columns"
              >
                4
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 bg-white p-6 border border-[#E9E6E0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E6E0]">
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#171717]">
                REFINE CATALOG
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] tracking-widest uppercase text-[#A18A70] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Categories
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCategory === "all" ? "text-[#171717] font-semibold" : "text-[#77736E] hover:text-[#171717]"
                  }`}
                >
                  All Categories
                </button>
                {visibleCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedCategory === c.slug ? "text-[#171717] font-semibold" : "text-[#77736E] hover:text-[#171717]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="space-y-3 pt-4 border-t border-[#E9E6E0]">
              <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Curated Edits
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCollection("all")}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCollection === "all" ? "text-[#171717] font-semibold" : "text-[#77736E] hover:text-[#171717]"
                  }`}
                >
                  All Collections
                </button>
                {allCollections.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.slug)}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedCollection === col.slug ? "text-[#171717] font-semibold" : "text-[#77736E] hover:text-[#171717]"
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3 pt-4 border-t border-[#E9E6E0]">
              <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Size
              </h4>
              <div className="grid grid-cols-5 gap-1.5">
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? "all" : sz)}
                    className={`py-2 text-[11px] font-mono border text-center transition-all ${
                      selectedSize === sz
                        ? "border-[#171717] bg-[#171717] text-white"
                        : "border-[#E9E6E0] bg-white text-[#171717] hover:border-[#171717]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="space-y-3 pt-4 border-t border-[#E9E6E0]">
              <h4 className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Colorway
              </h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map((clr) => (
                  <button
                    key={clr.name}
                    onClick={() => setSelectedColor(selectedColor === clr.name ? "all" : clr.name)}
                    className={`w-6 h-6 rounded-full border transition-transform flex items-center justify-center ${
                      selectedColor === clr.name ? "ring-2 ring-[#171717] scale-110" : "border-[#E9E6E0] hover:scale-110"
                    }`}
                    style={{ backgroundColor: clr.hex }}
                    title={clr.name}
                  >
                    {selectedColor === clr.name && (
                      <Check className={`w-3 h-3 ${clr.hex === '#FAF8F5' || clr.hex === '#F3ECE1' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-[#E9E6E0]">
              <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
                <span>Price Limit</span>
                <span className="font-mono text-xs">₹{priceRange.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="60000"
                step="2500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#171717] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#77736E] font-mono">
                <span>₹5,000</span>
                <span>₹60,000+</span>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT CATALOG GRID */}
          <main className="lg:col-span-9 space-y-6">
            {/* Active Filters Chip Row */}
            <div className="flex items-center justify-between text-xs text-[#77736E] border-b border-[#E9E6E0] pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{filteredProducts.length} Creations</span>
                {hasActiveFilters && (
                  <>
                    <span className="text-[#E9E6E0]">|</span>
                    {selectedDepartment !== "all" && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase bg-white border border-[#E9E6E0] px-2 py-0.5 text-[#171717]">
                        Dept: {selectedDepartment}
                        <button onClick={() => setSelectedDepartment("all")}>×</button>
                      </span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase bg-white border border-[#E9E6E0] px-2 py-0.5 text-[#171717]">
                        Cat: {selectedCategory}
                        <button onClick={() => setSelectedCategory("all")}>×</button>
                      </span>
                    )}
                    {selectedCollection !== "all" && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase bg-white border border-[#E9E6E0] px-2 py-0.5 text-[#171717]">
                        Edit: {selectedCollection}
                        <button onClick={() => setSelectedCollection("all")}>×</button>
                      </span>
                    )}
                    {selectedSize !== "all" && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase bg-white border border-[#E9E6E0] px-2 py-0.5 text-[#171717]">
                        Size: {selectedSize}
                        <button onClick={() => setSelectedSize("all")}>×</button>
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-24 bg-white border border-[#E9E6E0] p-8 space-y-4">
                <p className="font-editorial text-2xl text-[#171717]">No pieces matched your refine criteria.</p>
                <p className="text-xs text-[#77736E] max-w-sm mx-auto font-light">
                  Adjust your price range, department, or filters to explore the archival portfolio.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#171717] text-white text-xs uppercase tracking-[0.2em] py-3 px-6 hover:bg-[#A18A70] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
                } gap-6 sm:gap-8`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-10 border-t border-[#E9E6E0] flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 text-xs font-mono border transition-colors ${
                        currentPage === pageNum
                          ? "bg-[#171717] text-white border-[#171717]"
                          : "bg-white text-[#171717] border-[#E9E6E0] hover:border-[#171717]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 z-10 border-l border-[#E9E6E0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E6E0]">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Refine
              </span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#171717]" />
              </button>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#171717]">Department</h4>
              <div className="flex gap-2 flex-wrap">
                {["all", "women", "men", "accessories"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDepartment(d)}
                    className={`px-3 py-1 text-xs uppercase border ${
                      selectedDepartment === d ? "bg-[#171717] text-white" : "border-[#E9E6E0]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2 pt-3 border-t border-[#E9E6E0]">
              <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#171717]">Categories</h4>
              <div className="space-y-1 text-xs">
                {visibleCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left py-1 ${
                      selectedCategory === c.slug ? "font-semibold text-[#171717]" : "text-[#77736E]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full bg-[#171717] text-white text-xs uppercase tracking-[0.2em] py-3 mt-4"
            >
              Reset Filters
            </button>
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
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <p className="font-editorial text-2xl text-[#77736E]">Loading Velora Collection...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

