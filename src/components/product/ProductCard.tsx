"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Check } from "lucide-react";
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
  const { addItem } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const primaryImage = product.images[0] || "";
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "M";
    const defaultColor = product.colors[0]?.name || "Standard";
    addItem(product, defaultSize, defaultColor, 1);
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 2200);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Presentation */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EDE8]">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
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

        {/* Minimal Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3.5 right-3.5 p-1.5 text-[#171717] hover:opacity-60 transition-opacity z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.25] transition-colors ${
              isWishlisted ? "fill-[#171717] text-[#171717]" : "text-[#171717]"
            }`}
          />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#171717] text-[10px] uppercase tracking-[0.25em] py-3 px-4 font-medium backdrop-blur-sm transition-all flex items-center justify-center gap-1.5 border border-[#E9E6E0]"
          >
            {quickAdded ? (
              <>
                <Check className="w-3 h-3 text-[#171717]" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-[#171717]" />
                <span>QUICK ADD ({product.sizes[0] || "M"})</span>
              </>
            )}
          </button>
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
            <span className="text-xs text-[#171717] font-normal">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-[11px] text-[#77736E] line-through font-light">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2 h-2 rounded-full border border-[#E9E6E0]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-[#77736E] font-light">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
