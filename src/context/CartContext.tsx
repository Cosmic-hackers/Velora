"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, Coupon } from "@/data/seedData";
import { StoreService } from "@/lib/store";

export interface CartItem {
  id: string; // Unique combination of product id + size + color
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  appliedCoupon: Coupon | null;
  couponCode: string;
  couponError: string | null;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "velora_cart_items_v1";
const COUPON_STORAGE_KEY = "velora_cart_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  // Load cart from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error("Cart loading error", e);
    }
  }, []);

  // Save to storage
  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addItem = (product: Product, size: string, color: string, quantity: number = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    const effectivePrice = product.salePrice ?? product.price;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      let updated: CartItem[];

      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: effectivePrice,
          quantity,
          size,
          color,
          imageUrl: product.images[0] || "",
          slug: product.slug,
        };
        updated = [newItem, ...prev];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    const updated = items.filter((item) => item.id !== itemId);
    saveItems(updated);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updated = items.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
    setAppliedCoupon(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  };

  // Subtotal & Totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate discount
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  // Shipping policy: Free above ₹5000, else ₹500
  const shipping = subtotal > 0 && subtotal >= 5000 ? 0 : subtotal > 0 ? 500 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = (code: string) => {
    setCouponError(null);
    const result = StoreService.validateCoupon(code, subtotal);
    if (!result.valid) {
      setCouponError(result.message);
      return { success: false, message: result.message };
    }

    if (result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponCode(result.coupon.code);
      if (typeof window !== "undefined") {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(result.coupon));
      }
      return { success: true, message: result.message };
    }
    return { success: false, message: "Could not apply coupon." };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        appliedCoupon,
        couponCode,
        couponError,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

