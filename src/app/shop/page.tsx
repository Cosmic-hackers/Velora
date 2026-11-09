"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, RefreshCw } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();

  // URL query params
  const paramGender = searchParams.get("gender");
  const paramCategory = searchParams.get("category");
  const paramTag = searchParams.get("tag");
  const paramSort = searchParams.get("sort");

  // Local filter states
  const [selectedGender, setSelectedGender] = useState<string>(paramGender || "all");
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory || "all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<string>(paramSort || "newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allProducts = StoreService.getProducts();
  const categories = StoreService.getCategories();

  const allSizes = ["XS", "S", "M", "L", "XL"];
  const allColors = [
    { name: "Oat Camel", hex: "#C2A888" },
    { name: "Raw Cream", hex: "#F3ECE1" },
    { name: "Charcoal Noir", hex: "#222222" },
    { name: "Midnight Navy", hex: "#1A2238" },
    { name: "Flax Tweed", hex: "#B8AC9C" },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Published check
      if (!product.isPublished) return false;

      // Gender filter
      if (selectedGender !== "all") {
        if (selectedGender === "men" && product.gender !== "men" && product.gender !== "unisex") return false;
        if (selectedGender === "women" && product.gender !== "women" && product.gender !== "unisex") return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        if (catObj && product.categoryId !== catObj.id) return false;
      }

      // New arrivals tag
      if (paramTag === "new-arrivals" && !product.isNewArrival) {
        return false;
      }

      // Size filter
      if (selectedSize !== "all") {
        if (!product.sizes.includes(selectedSize)) return false;
      }

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
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    allProducts,
    categories,
    selectedGender,
    selectedCategory,
    paramTag,
    selectedSize,
    selectedColor,
    priceRange,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedGender("all");
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setPriceRange(100000);
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedGender !== "all" ||
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    selectedColor !== "all" ||
    priceRange < 100000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#DED8CF] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            {paramTag === "new-arrivals" ? "Seasonal Release" : "Haute Collection"}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            {paramTag === "new-arrivals"
              ? "New Arrivals Édition"
              : selectedGender === "men"
              ? "Men's Haute Garde-Robe"
              : selectedGender === "women"
              ? "Women's Haute Garde-Robe"
              : "The Complete Portfolio"}
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] font-light max-w-xl">
            Pure silhouettes, master tailoring, natural unadulterated wools and cashmere.
          </p>
        </div>

        {/* Filter Trigger (Mobile) & Sort Dropdown */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 border border-[#DED8CF] bg-white px-4 py-2.5 text-xs uppercase tracking-wider text-[#171717]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#9B8065]" />
            <span>Refine Filters</span>
          </button>

          <div className="relative inline-flex items-center">
            <span className="text-[11px] tracking-wider uppercase text-[#77716A] mr-2 hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#DED8CF] px-4 py-2.5 pr-8 text-xs uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#9B8065] cursor-pointer"
            >
              <option value="newest">Newest Releases</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Client Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#77716A] absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 bg-[#FAF7F2] p-6 border border-[#DED8CF]">
          <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#171717]">
              Refine Atelier
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[10px] tracking-widest uppercase text-[#9B8065] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
              Gender
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: "All Creations", val: "all" },
                { label: "Men's Atelier", val: "men" },
                { label: "Women's Atelier", val: "women" },
              ].map((g) => (
                <button
                  key={g.val}
                  onClick={() => setSelectedGender(g.val)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedGender === g.val
                      ? "text-[#9B8065] font-semibold"
                      : "text-[#77716A] hover:text-[#171717]"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3 pt-4 border-t border-[#DED8CF]">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
              Category
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`block w-full text-left py-1 transition-colors ${
                  selectedCategory === "all"
                    ? "text-[#9B8065] font-semibold"
                    : "text-[#77716A] hover:text-[#171717]"
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCategory === c.slug
                      ? "text-[#9B8065] font-semibold"
                      : "text-[#77716A] hover:text-[#171717]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-[#DED8CF]">
            <div className="flex justify-between items-center text-[11px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
              <span>Max Price</span>
              <span className="text-[#9B8065]">₹{priceRange.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#9B8065] cursor-pointer"
            />
          </div>

          {/* Size Filter */}
          <div className="space-y-3 pt-4 border-t border-[#DED8CF]">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
              Size
            </h4>
            <div className="grid grid-cols-5 gap-1.5">
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(selectedSize === sz ? "all" : sz)}
                  className={`py-2 text-xs border text-center transition-colors ${
                    selectedSize === sz
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-[#DED8CF] bg-white text-[#171717] hover:border-[#9B8065]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 pt-4 border-t border-[#DED8CF]">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#171717]">
              Color Shade
            </h4>
            <div className="flex flex-wrap gap-2">
              {allColors.map((clr) => (
                <button
                  key={clr.name}
                  onClick={() => setSelectedColor(selectedColor === clr.name ? "all" : clr.name)}
                  className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                    selectedColor === clr.name
                      ? "ring-2 ring-[#9B8065] ring-offset-2 scale-110"
                      : "border-[#DED8CF]"
                  }`}
                  style={{ backgroundColor: clr.hex }}
                  title={clr.name}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-8">
          {/* Active summary count */}
          <div className="flex items-center justify-between text-xs text-[#77716A]">
            <p>
              Displaying <span className="font-semibold text-[#171717]">{filteredProducts.length}</span> pieces
            </p>
            {hasActiveFilters && (
              <span className="text-[10px] tracking-widest uppercase text-[#9B8065]">
                Filters Applied
              </span>
            )}
          </div>

          {/* Products */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-24 bg-[#FAF7F2] border border-[#DED8CF] p-8 space-y-4">
              <p className="font-editorial text-2xl text-[#171717]">No pieces matched your selection.</p>
              <p className="text-xs text-[#77716A] max-w-sm mx-auto">
                Adjust your price range or remove filters to explore the archival portfolio.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary text-xs py-3 px-6 inline-block"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-[#DED8CF] flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 text-xs font-medium border transition-colors ${
                      currentPage === pageNum
                        ? "bg-[#171717] text-white border-[#171717]"
                        : "bg-white text-[#171717] border-[#DED8CF] hover:border-[#9B8065]"
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

      {/* Mobile Filter Slide-over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xs bg-[#FAF7F2] h-full p-6 overflow-y-auto space-y-6 z-10 border-l border-[#DED8CF]">
            <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#171717]">
                Filters
              </span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#171717]" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">Category</h4>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.slug);
                    setMobileFilterOpen(false);
                  }}
                  className="block text-xs text-[#77716A] py-1"
                >
                  {c.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full btn-secondary text-xs py-3"
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
          <p className="font-editorial text-2xl text-[#77716A]">Loading Velora Collection...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

