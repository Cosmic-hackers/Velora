"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Product } from "@/data/seedData";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const clean = query.toLowerCase().trim();
    const all = StoreService.getProducts();
    const filtered = all.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        p.categoryName?.toLowerCase().includes(clean) ||
        p.gender.toLowerCase().includes(clean) ||
        p.sku.toLowerCase().includes(clean)
      );
    });

    setResults(filtered.slice(0, 6));
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    { label: "Double-Faced Wool", query: "wool coat" },
    { label: "Cashmere Turtleneck", query: "cashmere" },
    { label: "Tailored Blazers", query: "blazer" },
    { label: "Supima T-Shirts", query: "supima" },
    { label: "Silk Trousers", query: "silk" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#DED8CF] shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#DED8CF] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#9B8065] stroke-[1.8]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, garment, fabric or SKU..."
            className="flex-1 bg-transparent text-[#171717] placeholder-[#77716A] text-sm sm:text-base focus:outline-none tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#77716A] hover:text-[#171717] text-xs uppercase tracking-wider"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#171717] hover:text-[#9B8065] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Quick Suggestions / Popular terms */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#77716A] font-medium block">
              Suggested Explorations
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setQuery(item.query)}
                  className="px-3.5 py-1.5 text-xs bg-[#EFE9DE] hover:bg-[#DED8CF] text-[#171717] transition-colors rounded-none border border-[#DED8CF]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-[#DED8CF]/60">
            {results.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="font-editorial text-lg text-[#77716A]">No creations matched &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-[#77716A]">Try refining your terms or explore all outerwear and tailoring.</p>
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 pt-4 first:pt-0 group"
                >
                  <div className="relative w-14 h-18 bg-[#EAE4D9] flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.images[0] || ""}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="60px"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] tracking-widest uppercase text-[#9B8065] block">
                      {product.categoryName}
                    </span>
                    <h4 className="font-editorial text-sm font-medium text-[#171717] group-hover:text-[#9B8065] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#171717] mt-1 block">
                      {formatPrice(product.salePrice ?? product.price)}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#77716A] group-hover:text-[#9B8065] transition-colors group-hover:translate-x-1" />
                </Link>
              ))
            )}

            {results.length > 0 && (
              <div className="pt-4 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1 font-medium"
                >
                  View all results for &ldquo;{query}&rdquo;
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

