"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const allProducts = StoreService.getProducts();

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const clean = searchTerm.toLowerCase().trim();
    return allProducts.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        p.categoryName?.toLowerCase().includes(clean) ||
        p.gender.toLowerCase().includes(clean) ||
        p.sku.toLowerCase().includes(clean)
      );
    });
  }, [searchTerm, allProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Search Results
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal">
          {searchTerm ? `Results for “${searchTerm}”` : "Explore Catalog"}
        </h1>

        {/* Input */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coat, tailoring, cashmere, supima..."
            className="w-full bg-[#FAF7F2] border border-[#DED8CF] pl-10 pr-4 py-3 text-xs uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#9B8065]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-[#77716A] border-b border-[#DED8CF] pb-4">
        <span>Found {results.length} creations</span>
        <Link href="/shop" className="text-[#9B8065] hover:underline uppercase tracking-wider text-[11px]">
          View All Creations →
        </Link>
      </div>

      {results.length === 0 ? (
        <div className="py-24 text-center bg-[#FAF7F2] border border-[#DED8CF] space-y-3">
          <p className="font-editorial text-xl text-[#77716A]">No creations matched your criteria.</p>
          <p className="text-xs text-[#77716A]">Try broader terms like &ldquo;wool&rdquo;, &ldquo;jacket&rdquo; or &ldquo;cashmere&rdquo;.</p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-xs py-3 px-6 inline-block">
              Explore All Collections
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

