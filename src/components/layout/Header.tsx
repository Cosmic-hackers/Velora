"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, ShieldCheck } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Men", href: "/shop?gender=men" },
    { name: "Women", href: "/shop?gender=women" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/shop?tag=new-arrivals" },
    { name: "Shop All", href: "/shop" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5F0E8]/95 backdrop-blur-md shadow-subtle border-b border-[#DED8CF]"
            : "bg-[#F5F0E8] border-b border-[#DED8CF]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#171717] hover:text-[#9B8065] p-2 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#9B8065] transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#9B8065] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center">
              <Link href="/" className="inline-block group">
                <span className="font-editorial text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] text-[#171717] font-semibold block transition-colors group-hover:text-[#9B8065]">
                  VELORA
                </span>
                <span className="text-[9px] tracking-[0.35em] text-[#77716A] uppercase block -mt-1 font-light">
                  Haute Garde-Robe
                </span>
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="text-[#171717] hover:text-[#9B8065] p-1.5 transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account / Admin indicator */}
              {user?.role === "admin" || user?.role === "super_admin" || user?.role === "staff" ? (
                <Link
                  href="/admin"
                  className="text-[#9B8065] hover:text-[#171717] p-1.5 transition-colors flex items-center gap-1.5"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
                  <span className="hidden md:inline text-[10px] tracking-widest font-semibold uppercase bg-[#9B8065]/10 px-2 py-0.5 rounded border border-[#9B8065]/30">
                    Admin
                  </span>
                </Link>
              ) : (
                <Link
                  href={user ? "/account" : "/login"}
                  className="text-[#171717] hover:text-[#9B8065] p-1.5 transition-colors relative"
                  aria-label="Customer account"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                  {user && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-[#9B8065] rounded-full ring-2 ring-[#F5F0E8]" />
                  )}
                </Link>
              )}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-[#171717] hover:text-[#9B8065] p-1.5 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#9B8065] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                className="text-[#171717] hover:text-[#9B8065] p-1.5 transition-colors relative flex items-center gap-2 group"
                aria-label="Open shopping bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-[#171717] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#9B8065] transition-colors">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs tracking-widest uppercase font-medium">
                  Bag ({itemCount})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DED8CF] bg-[#F5F0E8] px-6 py-8 space-y-6 animate-fadeIn">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm uppercase tracking-[0.25em] font-medium text-[#171717] py-2 border-b border-[#DED8CF]/40"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="block text-sm uppercase tracking-[0.25em] font-medium text-[#77716A] py-2 border-b border-[#DED8CF]/40"
              >
                About Velora
              </Link>
              <Link
                href="/contact"
                className="block text-sm uppercase tracking-[0.25em] font-medium text-[#77716A] py-2 border-b border-[#DED8CF]/40"
              >
                Concierge & Client Care
              </Link>
            </div>

            <div className="pt-4 border-t border-[#DED8CF] flex items-center justify-between text-xs tracking-wider uppercase text-[#77716A]">
              <span>Customer Care: concierge@velora.com</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}

