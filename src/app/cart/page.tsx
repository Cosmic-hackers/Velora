"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    setFeedback(res.message);
    if (res.success) {
      setCouponInput("");
    }
  };

  const freeShippingThreshold = 5000;
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#DED8CF] pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Order Review
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
            Shopping Bag ({items.length})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-[#77716A] hover:text-red-700"
          >
            Clear Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center bg-[#FAF7F2] border border-[#DED8CF] p-8 space-y-4">
          <p className="font-editorial text-2xl text-[#171717]">Your shopping bag is empty.</p>
          <p className="text-xs text-[#77716A] max-w-sm mx-auto">
            Discover our curated garments, hand-finished coats and silk trousers.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-xs py-3.5 px-8">
              Explore Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress */}
            <div className="p-4 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="font-medium text-[#171717]">
                  {remaining === 0
                    ? "✓ You have unlocked complimentary white glove delivery"
                    : `Add ${formatPrice(remaining)} more for complimentary delivery`}
                </span>
                <span className="text-[#9B8065] font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-[#EAE4D9] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#9B8065] h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-[#DED8CF] border-t border-b border-[#DED8CF]">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative w-24 h-32 bg-[#EAE4D9] flex-shrink-0 overflow-hidden border border-[#DED8CF]">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-32 w-full">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-editorial text-base text-[#171717] hover:text-[#9B8065] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <span className="text-sm font-semibold text-[#171717]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="text-xs text-[#77716A] mt-1 space-y-0.5">
                        <p>Size: <span className="text-[#171717] font-medium">{item.size}</span></p>
                        <p>Color: <span className="text-[#171717] font-medium">{item.color}</span></p>
                        <p className="text-[#77716A]">Price per piece: {formatPrice(item.price)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border border-[#DED8CF] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#171717] hover:text-[#9B8065]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#171717] hover:text-[#9B8065]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-[#77716A] hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
            <h3 className="font-editorial text-xl text-[#171717]">Summary Breakdown</h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApply} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#77716A]" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="CODE (e.g. VELORA10)"
                    className="w-full bg-white border border-[#DED8CF] pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#171717] text-white hover:bg-[#9B8065] px-4 py-2 text-xs uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-[#9B8065] bg-[#9B8065]/10 px-3 py-1.5">
                  <span>Applied: {appliedCoupon.code}</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[10px] underline uppercase tracking-wider hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {feedback && !couponError && !appliedCoupon && (
                <p className="text-[11px] text-[#77716A]">{feedback}</p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#77716A] pt-4 border-t border-[#DED8CF]">
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
              <div className="flex justify-between text-base font-semibold text-[#171717] pt-3 border-t border-[#DED8CF]">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full btn-primary py-4 text-center flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="pt-2 text-center space-y-2 text-[10px] tracking-wider uppercase text-[#77716A]">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9B8065]" />
                <span>256-bit Encrypted Checkout</span>
              </div>
              <p>Supports Razorpay (Cards, UPI, Netbanking) & Cash on Delivery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

