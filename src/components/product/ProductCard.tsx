"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
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
    setTimeout(() => setQuickAdded(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE4D9]">
        {/* Main Image */}
        <Image
          src={isHovered && secondaryImage ? secondaryImage : primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-[#171717] text-white text-[9px] uppercase tracking-[0.25em] px-2 py-1 font-medium">
              New Arrival
            </span>
          )}
          {product.salePrice && (
            <span className="bg-[#9B8065] text-white text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-medium">
              Archive Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            isWishlisted
              ? "bg-[#171717] text-[#9B8065]"
              : "bg-white/80 text-[#171717] hover:bg-white hover:text-[#9B8065]"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.8] ${isWishlisted ? "fill-current" : ""}`}
          />
        </button>

        {/* Quick Add Overlay Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#171717]/90 hover:bg-[#171717] text-white text-[10px] uppercase tracking-[0.25em] py-3 px-4 font-medium backdrop-blur-sm transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {quickAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#9B8065]" />
                <span>Added To Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add ({product.sizes[0] || "M"})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex flex-col space-y-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#77716A]">
          <span>{product.categoryName || "Couture"}</span>
          <span className="text-[#9B8065] font-medium">★ {product.rating.toFixed(1)}</span>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="font-editorial text-sm sm:text-base font-normal text-[#171717] hover:text-[#9B8065] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-xs sm:text-sm font-semibold text-[#171717]">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-[#77716A] line-through font-light">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-[#DED8CF]"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-[#77716A] ml-1">
              {product.colors.length} {product.colors.length === 1 ? "shade" : "shades"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

