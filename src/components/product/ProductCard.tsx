"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check } from "lucide-react";
import { Product } from "@/data/seedData";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  // Steady image presentation without cursor hover changing
  const activeImage =
    (product.colors[selectedColorIdx]?.imageUrl as string) ||
    product.images[selectedColorIdx] ||
    product.images[0] ||
    "";

  const handleQuickAddSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    const activeColor =
      product.colors[selectedColorIdx]?.name || product.colors[0]?.name || "Standard";
    addItem(product, size, activeColor, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      openCart();
    }, 350);
  };

  return (
    <div className="group relative flex flex-col bg-transparent">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. IMAGE CONTAINER (NO ZOOM, NO HOVER IMAGE SWAPPING)        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE6] border border-[#E9E6E0]/60">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </Link>

        {/* Minimalist Outline Wishlist Heart Icon in Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-1.5 text-[#171717] hover:text-[#A18A70] transition-colors z-10"
          aria-label="Wishlist"
          title="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.25] transition-all duration-300 ${
              isWishlisted
                ? "fill-[#171717] text-[#171717] scale-110"
                : "text-[#171717] hover:scale-110"
            }`}
          />
        </button>

        {/* Subtle Quick-Add Sizing on Hover at Bottom (without image zoom/swap) */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:block bg-gradient-to-t from-black/40 via-black/10 to-transparent">
          <div className="bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#E9E6E0] p-1.5 flex items-center justify-between shadow-sm">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#77736E] font-medium pl-1">
              ADD:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {product.sizes.slice(0, 5).map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAddSize(e, sz)}
                  className={`text-[9px] uppercase font-mono px-1.5 py-0.5 min-w-[22px] border transition-all ${
                    addedSize === sz
                      ? "bg-[#171717] text-white border-[#171717]"
                      : "bg-white text-[#171717] border-[#E9E6E0] hover:border-[#171717] hover:bg-[#F8F7F4]"
                  }`}
                >
                  {addedSize === sz ? <Check className="w-2.5 h-2.5 inline" /> : sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. PRODUCT INFO (EXACT LAYOUT TO REFERENCE IMAGE)            */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="pt-3 pb-1 flex flex-col space-y-0.5">
        {/* Row 1: Name on Left, Color Swatches on Right */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="font-normal text-[13px] sm:text-[14px] text-[#171717] hover:text-[#A18A70] transition-colors truncate tracking-wide"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Interactive Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              {product.colors.slice(0, 4).map((c, idx) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-transform ${
                    selectedColorIdx === idx
                      ? "ring-1 ring-offset-1 ring-[#171717] scale-110"
                      : "hover:scale-125 opacity-90"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Row 2: Price in INR formatted with Rupee Symbol */}
        <div>
          <p className="font-light text-[12px] sm:text-[13px] text-[#171717] tracking-tight">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
