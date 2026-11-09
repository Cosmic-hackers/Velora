"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderTree,
  Boxes,
  ShoppingCart,
  Users,
  CreditCard,
  Tag,
  Star,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If this is the admin login page, don't wrap in admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Security gate: check admin authorization
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/admin/login");
      } else if (
        user.role !== "admin" &&
        user.role !== "super_admin" &&
        user.role !== "staff"
      ) {
        router.push("/admin/login?error=denied");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="font-editorial text-2xl text-[#77716A]">Authenticating Atelier Staff...</p>
      </div>
    );
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Add Creation", href: "/admin/products/new", icon: PlusCircle },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Collections", href: "/admin/collections", icon: Layers },
    { name: "Inventory", href: "/admin/inventory", icon: Boxes },
    { name: "Orders & Transit", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Coupons", href: "/admin/coupons", icon: Tag },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { name: "Maison Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#F5F0E8] text-[#171717]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#FAF7F2] border-r border-[#DED8CF] flex-shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#DED8CF]">
          <Link href="/admin" className="block">
            <span className="font-editorial text-2xl tracking-[0.25em] text-[#171717] font-semibold block">
              VELORA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold block mt-0.5">
              Command Center
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? "bg-[#171717] text-white"
                    : "text-[#77716A] hover:bg-[#EFE9DE] hover:text-[#171717]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#9B8065]" : "text-[#77716A]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-[#DED8CF] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#9B8065] flex items-center justify-center font-editorial text-sm font-semibold">
              {user.fullName?.charAt(0) || "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-[#171717] truncate">{user.fullName}</p>
              <span className="text-[10px] uppercase tracking-wider text-[#9B8065] font-semibold">
                {user.role.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DED8CF]/60 text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-[#77716A] hover:text-[#171717] flex items-center gap-1 text-[11px] uppercase tracking-wider"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={async () => {
                await logout();
                router.push("/admin/login");
              }}
              className="text-red-700 hover:text-red-900 text-[11px] uppercase tracking-wider font-medium flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-[#FAF7F2] border-b border-[#DED8CF] flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-[#171717]"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs uppercase tracking-[0.2em] text-[#77716A] font-medium hidden sm:inline">
              Environment: Production Verified
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#77716A]">
              Signed in as: <strong className="text-[#171717]">{user.email}</strong>
            </span>
            <span className="bg-[#9B8065]/10 text-[#9B8065] text-[10px] uppercase tracking-widest px-2.5 py-1 rounded font-semibold border border-[#9B8065]/30">
              {user.role}
            </span>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#DED8CF] p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="block text-xs uppercase tracking-wider py-2 px-3 hover:bg-[#EFE9DE]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {/* Page Children Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

