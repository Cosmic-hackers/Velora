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

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const primaryImage = product.images[selectedColorIdx] || product.images[0] || "";
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAddSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    const activeColor = product.colors[selectedColorIdx]?.name || product.colors[0]?.name || "Standard";
    addItem(product, size, activeColor, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      openCart();
    }, 400);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Presentation */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EDE8]">
        {/* Subtle Editorial Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          {product.isNewArrival ? (
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium bg-[#FFFFFF]/90 text-[#171717] px-2 py-1 backdrop-blur-sm border border-[#E9E6E0]">
              NEW ARRIVAL
            </span>
          ) : product.isBestSeller ? (
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium bg-[#171717]/90 text-white px-2 py-1 backdrop-blur-sm">
              BEST SELLER
            </span>
          ) : product.salePrice ? (
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium bg-[#A18A70]/90 text-white px-2 py-1 backdrop-blur-sm">
              SPECIAL PRICING
            </span>
          ) : null}
        </div>

        {/* Primary Image */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Secondary Hover Image */}
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Minimal Animated Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3.5 right-3.5 p-2 bg-white/70 hover:bg-white text-[#171717] backdrop-blur-sm rounded-full transition-all duration-300 z-10 hover:scale-110 active:scale-95 shadow-sm"
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 stroke-[1.25] transition-all duration-300 ${
              isWishlisted
                ? "fill-[#171717] text-[#171717] scale-110"
                : "text-[#171717] hover:text-[#A18A70]"
            }`}
          />
        </button>

        {/* Quick Add Size Selection Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block bg-gradient-to-t from-black/20 via-black/5 to-transparent pt-6">
          <div className="bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E9E6E0] p-2 shadow-sm">
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#77736E] text-center mb-1.5 font-medium">
              QUICK ADD SIZE
            </div>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAddSize(e, sz)}
                  className={`text-[10px] uppercase font-mono px-2 py-1 min-w-[28px] border transition-all ${
                    addedSize === sz
                      ? "bg-[#171717] text-white border-[#171717]"
                      : "bg-white text-[#171717] border-[#E9E6E0] hover:border-[#171717] hover:bg-[#F8F7F4]"
                  }`}
                >
                  {addedSize === sz ? <Check className="w-3 h-3 inline" /> : sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-xs uppercase tracking-[0.18em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price & Color Indicators */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#171717] font-normal font-mono">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-[11px] text-[#77736E] line-through font-light font-mono">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Interactive Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full border transition-transform ${
                    selectedColorIdx === idx
                      ? "ring-1 ring-[#171717] scale-110 border-white"
                      : "border-[#E9E6E0] hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
