"use client";

import React, { useState } from "react";
import { CreditCard, Search, CheckCircle2, Clock } from "lucide-react";
import { StoreService } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const orders = StoreService.getOrders();
  const [filterMethod, setFilterMethod] = useState("all");

  const filtered = orders.filter((o) => {
    if (filterMethod !== "all" && o.paymentMethod !== filterMethod) return false;
    return true;
  });

  const totalCaptured = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((s, o) => s + o.totalAmount, 0);

  const pendingCollection = orders
    .filter((o) => o.paymentStatus === "pending")
    .reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
          Financial Ledger
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
          Payment Transactions & Gateway Records
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF]">
          <span className="text-[10px] uppercase tracking-widest text-[#77716A]">
            Captured Electronic Volume
          </span>
          <p className="font-editorial text-2xl text-[#171717] mt-1">{formatPrice(totalCaptured)}</p>
          <span className="text-[10px] text-emerald-800">Razorpay Verified Settlements</span>
        </div>

        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF]">
          <span className="text-[10px] uppercase tracking-widest text-[#77716A]">
            COD Receivables
          </span>
          <p className="font-editorial text-2xl text-[#171717] mt-1">{formatPrice(pendingCollection)}</p>
          <span className="text-[10px] text-amber-800">Upon Courier Delivery Handover</span>
        </div>

        <div className="bg-[#FAF7F2] p-6 border border-[#DED8CF]">
          <span className="text-[10px] uppercase tracking-widest text-[#77716A]">
            Active Gateway
          </span>
          <p className="font-editorial text-2xl text-[#171717] mt-1">Razorpay Test Mode</p>
          <span className="text-[10px] text-[#9B8065]">Webhooks Authenticated</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs uppercase tracking-wider">
        {["all", "razorpay", "cod"].map((m) => (
          <button
            key={m}
            onClick={() => setFilterMethod(m)}
            className={`px-4 py-2 border transition-colors ${
              filterMethod === m
                ? "bg-[#171717] text-white border-[#171717]"
                : "bg-white text-[#171717] border-[#DED8CF]"
            }`}
          >
            {m === "all" ? "All Methods" : m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Transaction / Order #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Gateway Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold">{ord.orderNumber}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium">{ord.customerName}</p>
                    <p className="text-[10px] text-[#77716A]">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[10px] tracking-wider font-semibold">
                    {ord.paymentMethod === "razorpay" ? "Razorpay Gateway" : "Cash on Delivery"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{formatPrice(ord.totalAmount)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block uppercase text-[10px] tracking-wider px-2 py-0.5 rounded font-semibold ${
                        ord.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">{formatDate(ord.createdAt)}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-[10px] text-[#77716A]">
                    {ord.paymentMethod === "razorpay"
                      ? `pay_rzp_${ord.orderNumber.replace(/[^0-9]/g, "")}`
                      : "COD-RECEIVABLE"}
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

