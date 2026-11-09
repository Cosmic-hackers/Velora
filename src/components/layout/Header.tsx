"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchModal } from "@/components/search/SearchModal";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const leftNavLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "SELECTED FOR YOU", href: "/collections" },
    { name: "PRE-FALL 2025", href: "/collections/modern-tailoring" },
  ];

  const shippingDestinations = [
    { country: "India", code: "INR", label: "Ship to: India (INR)" },
    { country: "United Kingdom", code: "GBP", label: "Ship to: United Kingdom (£)" },
    { country: "United States", code: "USD", label: "Ship to: United States ($)" },
    { country: "Europe", code: "EUR", label: "Ship to: Europe (€)" },
  ];

  const currencies = ["INR", "USD", "EUR", "GBP"];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E9E6E0]"
            : "bg-[#F8F7F4] border-b border-[#E9E6E0]/40"
        }`}
      >
        <div className="w-full relative px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#171717] hover:opacity-60 transition-opacity p-1.5"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.25]" /> : <Menu className="w-5 h-5 stroke-[1.25]" />}
            </button>
          </div>

          {/* LEFT NAVIGATION (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 z-10">
            {leftNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 relative py-1 group ${
                    isActive ? "text-[#171717]" : "text-[#171717]/85 hover:text-[#171717]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#171717] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CENTER: VELORA WORDMARK (Mathematically Centered in Viewport) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto z-10">
            <Link href="/" className="inline-block group">
              <span className="font-editorial text-2xl sm:text-3xl tracking-[0.38em] text-[#171717] font-normal uppercase block transition-opacity group-hover:opacity-70">
                VELORA
              </span>
            </Link>
          </div>

          {/* RIGHT ACTION ICONS & LINKS (Reference Layout) */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-7 ml-auto z-10">
            {/* Shipping Destination & Currency Selector (KHAITE style) */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="text-[11px] font-medium tracking-[0.08em] text-[#171717]/85 hover:text-[#171717] flex items-center gap-1.5 transition-colors py-1"
                aria-label="Select destination & currency"
              >
                <span>
                  {shippingDestinations.find((d) => d.code === currency)?.label || `Ship to: India (${currency})`}
                </span>
                <ChevronDown className="w-3 h-3 stroke-[1.5]" />
              </button>

              {currencyOpen && (
                <div
                  onMouseLeave={() => setCurrencyOpen(false)}
                  className="absolute right-0 top-full mt-2 w-56 bg-[#FFFFFF] border border-[#E9E6E0] shadow-sm py-2 z-50 text-[11px] tracking-wide animate-fadeIn"
                >
                  {shippingDestinations.map((dest) => (
                    <button
                      key={dest.code}
                      onClick={() => {
                        setCurrency(dest.code);
                        setCurrencyOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-[#F8F7F4] transition-colors ${
                        currency === dest.code ? "font-semibold text-[#171717]" : "text-[#77736E]"
                      }`}
                    >
                      {dest.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile/Compact Currency Button */}
            <div className="relative block xl:hidden">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#171717]/80 hover:text-[#171717] flex items-center gap-1 transition-colors py-1"
                aria-label="Select currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 stroke-[1.5]" />
              </button>
              {currencyOpen && (
                <div
                  onMouseLeave={() => setCurrencyOpen(false)}
                  className="absolute right-0 top-full mt-2 w-28 bg-[#FFFFFF] border border-[#E9E6E0] shadow-sm py-1.5 z-50 text-[10px] tracking-widest uppercase animate-fadeIn"
                >
                  {shippingDestinations.map((dest) => (
                    <button
                      key={dest.code}
                      onClick={() => {
                        setCurrency(dest.code);
                        setCurrencyOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 hover:bg-[#F8F7F4] transition-colors ${
                        currency === dest.code ? "font-semibold text-[#171717]" : "text-[#77736E]"
                      }`}
                    >
                      {dest.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              href="/about"
              className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]/85 hover:text-[#171717] transition-colors"
            >
              ABOUT
            </Link>

            {/* Stores Link */}
            <Link
              href="/contact"
              className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] font-medium text-[#171717]/85 hover:text-[#171717] transition-colors"
            >
              STORES
            </Link>

            {/* Account: Sign In / Account: Name */}
            <Link
              href={user?.role === "admin" || user?.role === "super_admin" ? "/admin" : user ? "/account" : "/login"}
              className="hidden sm:inline-block text-[11px] uppercase tracking-[0.18em] font-medium text-[#171717]/85 hover:text-[#171717] transition-colors"
            >
              {user ? `ACCOUNT: ${user.fullName?.split(" ")[0] || "CLIENT"}` : "ACCOUNT: SIGN IN"}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-[#171717] hover:opacity-60 transition-opacity relative p-1"
              aria-label="View wishlist"
            >
              <Heart className="w-[17px] h-[17px] stroke-[1.25]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-medium text-[#171717] w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="text-[#171717] hover:opacity-60 transition-opacity p-1"
              aria-label="Search collection"
            >
              <Search className="w-[17px] h-[17px] stroke-[1.25]" />
            </button>

            {/* Shopping Bag with live count: e.g. (0) */}
            <button
              onClick={openCart}
              className="text-[#171717] hover:opacity-60 transition-opacity p-1 flex items-center gap-1 group text-[11px] font-mono tracking-tight"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-[17px] h-[17px] stroke-[1.25]" />
              <span className="font-sans text-[11px] tracking-normal">({itemCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E9E6E0] bg-[#F8F7F4] px-8 py-8 space-y-6 animate-fadeIn">
            <nav className="space-y-4">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-xs uppercase tracking-[0.3em] font-medium text-[#171717] py-2 border-b border-[#E9E6E0]/60"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/tracking"
                className="block text-xs uppercase tracking-[0.3em] font-medium text-[#77736E] py-2 border-b border-[#E9E6E0]/60"
              >
                ORDER TRACKING
              </Link>
              <Link
                href="/contact"
                className="block text-xs uppercase tracking-[0.3em] font-medium text-[#77736E] py-2 border-b border-[#E9E6E0]/60"
              >
                CONCIERGE
              </Link>
            </nav>

            <div className="pt-2 flex items-center justify-between text-xs tracking-wider uppercase text-[#77736E]">
              <span>Currency: {currency}</span>
              <div className="flex gap-2">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 text-[10px] border ${
                      currency === c ? "border-[#171717] text-[#171717] font-semibold" : "border-[#E9E6E0]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
