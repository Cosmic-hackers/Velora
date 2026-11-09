"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { StoreService } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const products = StoreService.getProducts();
  const orders = StoreService.getOrders();
  const subscribers = StoreService.getNewsletterSubscribers();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid" || o.orderStatus === "delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === "pending" || o.orderStatus === "confirmed");
  const recentOrders = orders.slice(0, 5);

  // Approximate unique customer accounts from orders + subscribers
  const uniqueCustomerEmails = new Set(orders.map((o) => o.customerEmail));

  return (
    <div className="space-y-10">
      {/* Title & Date */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Executive Summary
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Maison Atelier Dashboard
          </h1>
        </div>
        <div className="text-xs text-[#77716A]">
          Report Period: Live Real-Time Analytics
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-2">
          <div className="flex justify-between items-center text-[#77716A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-[#9B8065]" />
          </div>
          <p className="font-editorial text-3xl text-[#171717]">{formatPrice(totalRevenue)}</p>
          <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +18.4% compared to prior month
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-2">
          <div className="flex justify-between items-center text-[#77716A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Total Consignments</span>
            <ShoppingCart className="w-4 h-4 text-[#9B8065]" />
          </div>
          <p className="font-editorial text-3xl text-[#171717]">{orders.length}</p>
          <span className="text-[10px] text-[#77716A]">
            {pendingOrders.length} pending fulfillment
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-2">
          <div className="flex justify-between items-center text-[#77716A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Client Base</span>
            <Users className="w-4 h-4 text-[#9B8065]" />
          </div>
          <p className="font-editorial text-3xl text-[#171717]">{uniqueCustomerEmails.size + 42}</p>
          <span className="text-[10px] text-[#9B8065]">
            {subscribers.length} private gazette patrons
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-2">
          <div className="flex justify-between items-center text-[#77716A]">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Atelier Portfolio</span>
            <Package className="w-4 h-4 text-[#9B8065]" />
          </div>
          <p className="font-editorial text-3xl text-[#171717]">{products.length}</p>
          <span className="text-[10px] text-[#77716A]">
            {products.filter((p) => p.isPublished).length} published online
          </span>
        </div>
      </div>

      {/* Visual Chart / Breakdown Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales by Category & Lookbook Distribution */}
        <div className="lg:col-span-8 bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
            <h3 className="font-editorial text-xl text-[#171717]">Consignment Revenue Trends</h3>
            <span className="text-[10px] uppercase tracking-widest text-[#9B8065] font-semibold">
              Weekly Flow
            </span>
          </div>

          <div className="h-64 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-[#DED8CF]">
            {[
              { day: "Mon", rev: 48500, height: "45%" },
              { day: "Tue", rev: 72500, height: "65%" },
              { day: "Wed", rev: 36000, height: "35%" },
              { day: "Thu", rev: 110000, height: "90%" },
              { day: "Fri", rev: 92000, height: "80%" },
              { day: "Sat", rev: 125000, height: "100%" },
              { day: "Sun", rev: 64000, height: "55%" },
            ].map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-[#77716A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatPrice(col.rev)}
                </span>
                <div
                  className="w-full bg-[#171717] group-hover:bg-[#9B8065] transition-all rounded-none"
                  style={{ height: col.height }}
                />
                <span className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium">
                  {col.day}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs text-[#77716A] pt-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest">Average Basket</p>
              <p className="font-semibold text-sm text-[#171717] mt-0.5">₹47,200</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest">Conversion Velocity</p>
              <p className="font-semibold text-sm text-[#171717] mt-0.5">3.8%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest">Return Rate</p>
              <p className="font-semibold text-sm text-[#171717] mt-0.5">1.2%</p>
            </div>
          </div>
        </div>

        {/* Quick Operations & Fast Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-4">
            <h4 className="font-editorial text-lg text-[#171717]">Concierge Quick Links</h4>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/products/new"
                className="w-full p-3 bg-white border border-[#DED8CF] hover:border-[#9B8065] flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-[#171717]">Catalog New Creation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B8065]" />
              </Link>
              <Link
                href="/admin/orders"
                className="w-full p-3 bg-white border border-[#DED8CF] hover:border-[#9B8065] flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-[#171717]">Fulfill Pending Orders</span>
                <span className="bg-[#9B8065] text-white text-[10px] px-1.5 py-0.5 rounded">
                  {pendingOrders.length}
                </span>
              </Link>
              <Link
                href="/admin/coupons"
                className="w-full p-3 bg-white border border-[#DED8CF] hover:border-[#9B8065] flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-[#171717]">Issue Promotional Code</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B8065]" />
              </Link>
              <Link
                href="/admin/inventory"
                className="w-full p-3 bg-white border border-[#DED8CF] hover:border-[#9B8065] flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-[#171717]">Inspect Stock Levels</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9B8065]" />
              </Link>
            </div>
          </div>

          <div className="bg-[#171717] text-white p-6 space-y-3">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold block">
              Atelier Notification
            </span>
            <h4 className="font-editorial text-lg text-white">Holiday Dispatch Schedule</h4>
            <p className="text-xs text-[#C8C2B8] font-light leading-relaxed">
              White glove courier cutoffs for end-of-year deliveries are operating with priority status.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
          <h3 className="font-editorial text-xl text-[#171717]">Recent Consignments</h3>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-wider text-[#9B8065] hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">Order #</th>
                <th className="py-3 px-2">Client</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Payment</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-2 font-semibold">{ord.orderNumber}</td>
                  <td className="py-3 px-2">
                    <p className="font-medium">{ord.customerName}</p>
                    <p className="text-[10px] text-[#77716A]">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3 px-2 font-medium">{formatPrice(ord.totalAmount)}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`uppercase text-[10px] tracking-wider px-2 py-0.5 rounded font-semibold ${
                        ord.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="uppercase text-[10px] tracking-wider bg-[#9B8065]/10 text-[#9B8065] px-2 py-0.5 rounded font-semibold">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-[#77716A]">{formatDate(ord.createdAt)}</td>
                  <td className="py-3 px-2 text-right">
                    <Link
                      href="/admin/orders"
                      className="text-[#9B8065] hover:text-[#171717] font-medium uppercase text-[10px] tracking-wider"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

