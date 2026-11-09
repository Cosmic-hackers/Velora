"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/seedData";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const WISHLIST_STORAGE_KEY = "velora_wishlist_ids_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlistIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Wishlist loading error", e);
    }
  }, []);

  const saveWishlist = (newIds: string[]) => {
    setWishlistIds(newIds);
    if (typeof window !== "undefined") {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newIds));
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      saveWishlist(wishlistIds.filter((id) => id !== productId));
    } else {
      saveWishlist([productId, ...wishlistIds]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    saveWishlist(wishlistIds.filter((id) => id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

