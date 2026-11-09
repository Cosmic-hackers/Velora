"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { StoreService } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const allProducts = StoreService.getProducts();
  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToBag = (product: (typeof wishlistedProducts)[0]) => {
    addItem(product, product.sizes[0] || "M", product.colors[0]?.name || "Standard", 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#DED8CF] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Saved Pieces
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
            Your Wishlist ({wishlistedProducts.length})
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-widest text-[#77716A] hover:text-[#171717] inline-flex items-center gap-1"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-24 text-center bg-[#FAF7F2] border border-[#DED8CF] p-8 space-y-4">
          <p className="font-editorial text-2xl text-[#171717]">Your wishlist is currently empty.</p>
          <p className="text-xs text-[#77716A] max-w-sm mx-auto">
            Save foundational pieces while exploring our outerwear, tailoring, and cashmere collections.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-xs py-3.5 px-8">
              Explore Atelier
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlistedProducts.map((product) => {
            const effectivePrice = product.salePrice ?? product.price;
            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-[#FAF7F2] border border-[#DED8CF]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE4D9]">
                  <Image
                    src={product.images[0] || ""}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-[#171717] hover:text-red-700 rounded-full shadow-sm transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#9B8065]">
                      {product.categoryName}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-editorial text-sm text-[#171717] hover:text-[#9B8065] transition-colors block line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs font-semibold text-[#171717] mt-1 block">
                      {formatPrice(effectivePrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full btn-primary py-2.5 text-[10px] flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

