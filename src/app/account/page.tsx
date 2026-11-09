"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { StoreService } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AccountOverviewPage() {
  const router = useRouter();
  const { user, logout, addresses, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/account");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="font-editorial text-2xl text-[#77716A]">Authenticating Client Sanctuary...</p>
      </div>
    );
  }

  const allOrders = StoreService.getOrders();
  const userOrders = allOrders.filter(
    (o) => o.userId === user.id || o.customerEmail.toLowerCase() === user.email.toLowerCase()
  );
  const recentOrders = userOrders.slice(0, 3);
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Client Welcome Header */}
      <div className="border-b border-[#DED8CF] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Client Sanctuary
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal mt-1">
            Welcome, {user.fullName || "Valued Client"}
          </h1>
          <p className="text-xs text-[#77716A] mt-1">
            Registered Dossier: {user.email} | Member since {formatDate(user.createdAt)}
          </p>
        </div>

        <button
          onClick={async () => {
            await logout();
            router.push("/login");
          }}
          className="btn-secondary text-xs py-2.5 px-6 self-start md:self-auto flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-[#DED8CF] pb-4 text-xs uppercase tracking-widest font-medium">
        <Link
          href="/account"
          className="px-4 py-2 bg-[#171717] text-white"
        >
          Overview
        </Link>
        <Link
          href="/account/orders"
          className="px-4 py-2 bg-white text-[#171717] border border-[#DED8CF] hover:border-[#9B8065]"
        >
          Order History ({userOrders.length})
        </Link>
        <Link
          href="/account/addresses"
          className="px-4 py-2 bg-white text-[#171717] border border-[#DED8CF] hover:border-[#9B8065]"
        >
          Saved Addresses ({addresses.length})
        </Link>
        <Link
          href="/account/profile"
          className="px-4 py-2 bg-white text-[#171717] border border-[#DED8CF] hover:border-[#9B8065]"
        >
          Profile Settings
        </Link>
        <Link
          href="/wishlist"
          className="px-4 py-2 bg-white text-[#171717] border border-[#DED8CF] hover:border-[#9B8065]"
        >
          Wishlist
        </Link>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <span className="text-[10px] tracking-widest uppercase text-[#77716A]">
            Lifetime Consignments
          </span>
          <p className="font-editorial text-3xl text-[#171717]">{userOrders.length}</p>
          <p className="text-xs text-[#9B8065]">All white-glove dispatched</p>
        </div>

        <div className="p-6 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <span className="text-[10px] tracking-widest uppercase text-[#77716A]">
            Privilege Tier
          </span>
          <p className="font-editorial text-3xl text-[#171717]">Édition Privée</p>
          <p className="text-xs text-[#9B8065]">Access to early lookbooks</p>
        </div>

        <div className="p-6 bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <span className="text-[10px] tracking-widest uppercase text-[#77716A]">
            Concierge Status
          </span>
          <p className="font-editorial text-3xl text-[#171717]">Direct Line</p>
          <p className="text-xs text-[#9B8065]">Priority fulfillment</p>
        </div>
      </div>

      {/* Main Split: Recent Orders & Saved Default Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
            <h3 className="font-editorial text-xl text-[#171717] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#9B8065]" />
              <span>Recent Consignments</span>
            </h3>
            <Link
              href="/account/orders"
              className="text-xs uppercase tracking-wider text-[#9B8065] hover:underline inline-flex items-center gap-1"
            >
              <span>View All ({userOrders.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="font-editorial text-lg text-[#77716A]">No orders placed yet.</p>
              <Link href="/shop" className="btn-primary text-xs py-3 px-6 inline-block">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#DED8CF]">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="py-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-[#171717]">{ord.orderNumber}</span>
                      <span className="text-[#77716A] ml-2">• {formatDate(ord.createdAt)}</span>
                    </div>
                    <span className="bg-[#9B8065]/10 text-[#9B8065] uppercase text-[10px] tracking-wider px-2 py-0.5 rounded font-semibold">
                      {ord.orderStatus}
                    </span>
                  </div>

                  <div className="text-xs text-[#77716A]">
                    <p>
                      {ord.items.length} {ord.items.length === 1 ? "creation" : "creations"}:{" "}
                      <span className="text-[#171717] font-medium">
                        {ord.items.map((i) => i.productName).join(", ")}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-[#171717]">
                      Total: {formatPrice(ord.totalAmount)}
                    </span>
                    <Link
                      href={`/account/orders/${ord.id}`}
                      className="text-[#9B8065] hover:text-[#171717] font-medium inline-flex items-center gap-1"
                    >
                      <span>Consignment Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Default Address & Concierge Note */}
        <div className="lg:col-span-4 space-y-6">
          {/* Default Address Card */}
          <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DED8CF]">
              <h4 className="font-editorial text-base text-[#171717] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9B8065]" />
                <span>Primary Destination</span>
              </h4>
              <Link
                href="/account/addresses"
                className="text-[10px] uppercase tracking-wider text-[#9B8065] hover:underline"
              >
                Manage
              </Link>
            </div>

            {defaultAddress ? (
              <div className="text-xs text-[#77716A] space-y-1 leading-relaxed">
                <p className="font-semibold text-[#171717]">{defaultAddress.fullName}</p>
                <p>{defaultAddress.addressLine}</p>
                {defaultAddress.apartmentSuite && <p>{defaultAddress.apartmentSuite}</p>}
                <p>
                  {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
                </p>
                <p>{defaultAddress.country}</p>
                <p className="pt-1">Tel: {defaultAddress.phone}</p>
              </div>
            ) : (
              <p className="text-xs text-[#77716A]">No primary address saved yet.</p>
            )}
          </div>

          {/* Concierge Card */}
          <div className="bg-[#171717] text-white p-6 space-y-3">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold block">
              Dedicated Concierge
            </span>
            <h4 className="font-editorial text-lg text-white">Need Personal Styling?</h4>
            <p className="text-xs text-[#C8C2B8] font-light leading-relaxed">
              Our styling consultants in Mumbai and Paris are available for private appointments and bespoke alterations.
            </p>
            <Link
              href="/contact"
              className="inline-block text-xs uppercase tracking-widest text-[#9B8065] hover:text-white pt-1"
            >
              Contact Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

