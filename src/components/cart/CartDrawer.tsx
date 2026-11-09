"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon.trim());
    setCouponFeedback(res.message);
    if (res.success) {
      setInputCoupon("");
    }
  };

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#171717]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#DED8CF] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#DED8CF] flex items-center justify-between">
            <div>
              <h2 className="font-editorial text-2xl tracking-wide text-[#171717]">Shopping Bag</h2>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#77716A]">
                {items.length} {items.length === 1 ? "Item" : "Items"} Selected
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#171717] hover:text-[#9B8065] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#EFE9DE] border-b border-[#DED8CF] text-xs">
            <div className="flex justify-between items-center mb-1.5 text-[11px] tracking-wider uppercase text-[#171717] font-medium">
              <span>
                {remainingForFreeShipping === 0
                  ? "✓ Complimentary White Glove Shipping Unlocked"
                  : `Add ${formatPrice(remainingForFreeShipping)} for Complimentary Shipping`}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#DED8CF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#9B8065] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-editorial text-xl text-[#77716A]">Your bag is currently empty.</p>
                <p className="text-xs text-[#77716A] max-w-xs mx-auto">
                  Explore our curated seasonal collections of timeless outerwear and tailored garments.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-primary inline-flex text-xs py-3 px-6"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#DED8CF]/60 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-28 bg-[#EAE4D9] flex-shrink-0 overflow-hidden">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-editorial text-sm font-medium text-[#171717] hover:text-[#9B8065] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#77716A] hover:text-red-700 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#77716A] mt-1 space-y-0.5">
                        <p>Size: <span className="text-[#171717] font-medium">{item.size}</span></p>
                        <p>Color: <span className="text-[#171717] font-medium">{item.color}</span></p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DED8CF] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#171717] hover:text-[#9B8065] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#171717] hover:text-[#9B8065] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-xs font-semibold text-[#171717]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#DED8CF] bg-[#FAF7F2] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3.5 text-[#77716A]" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                      placeholder="PROMO CODE (e.g. VELORA10)"
                      className="w-full bg-white border border-[#DED8CF] pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#9B8065]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#171717] text-white hover:bg-[#9B8065] px-4 py-2 text-[11px] tracking-widest uppercase transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#9B8065] bg-[#9B8065]/10 px-2.5 py-1.5 rounded">
                    <span>Applied: {appliedCoupon.code}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[10px] underline uppercase tracking-wider text-[#171717] hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-600">{couponError}</p>
                )}
                {couponFeedback && !couponError && !appliedCoupon && (
                  <p className="text-[11px] text-[#77716A]">{couponFeedback}</p>
                )}
              </form>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-[#77716A] pt-2 border-t border-[#DED8CF]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#171717] font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#9B8065]">
                    <span>Promotional Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#171717] font-medium">
                    {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#DED8CF]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full btn-primary py-4 text-center flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full btn-secondary py-3 text-center block text-[11px]"
                >
                  View Full Shopping Bag
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase text-[#77716A] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9B8065]" />
                <span>Complimentary Returns Within 14 Days</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

