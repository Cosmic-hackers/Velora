"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Order } from "@/data/seedData";
import { formatPrice, formatDate } from "@/lib/utils";

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderParam = searchParams.get("order") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderParam);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setSearched(true);
    const all = StoreService.getOrders();
    const clean = orderQuery.trim().toUpperCase();
    const found = all.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === clean)
    );
    setMatchedOrder(found || null);
  };

  useEffect(() => {
    if (initialOrderParam) {
      handleSearch();
    }
  }, [initialOrderParam]);

  const stages = [
    { key: "confirmed", label: "Confirmed & Logged", icon: CheckCircle2 },
    { key: "processing", label: "Atelier Assembly", icon: Clock },
    { key: "shipped", label: "White Glove Transit", icon: Truck },
    { key: "delivered", label: "Delivered to Sanctuary", icon: PackageCheck },
  ];

  const getStageIndex = (status: Order["orderStatus"]) => {
    if (status === "pending" || status === "confirmed") return 0;
    if (status === "processing") return 1;
    if (status === "shipped") return 2;
    if (status === "delivered") return 3;
    return 1;
  };

  const currentStageIndex = matchedOrder ? getStageIndex(matchedOrder.orderStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          White Glove Dispatch
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal">
          Consignment Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-md mx-auto">
          Enter your order reference code (e.g. VEL-24-8901) or tracking number to monitor live courier transit.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3.5 top-3.5" />
          <input
            type="text"
            required
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
            placeholder="ORDER CODE (e.g. VEL-24-8901)"
            className="w-full bg-white border border-[#DED8CF] pl-10 pr-3 py-3 text-xs uppercase tracking-wider text-[#171717] focus:outline-none focus:border-[#9B8065]"
          />
        </div>
        <button type="submit" className="btn-primary text-xs py-3 px-6">
          Track
        </button>
      </form>

      {/* Results Box */}
      {searched && !matchedOrder && (
        <div className="p-8 text-center bg-[#FAF7F2] border border-[#DED8CF] space-y-2">
          <AlertCircle className="w-6 h-6 text-red-700 mx-auto" />
          <h4 className="font-editorial text-lg text-[#171717]">Consignment Not Found</h4>
          <p className="text-xs text-[#77716A]">
            No records matched reference &ldquo;{orderQuery}&rdquo;. Please verify your order confirmation dossier.
          </p>
        </div>
      )}

      {matchedOrder && (
        <div className="bg-[#FAF7F2] border border-[#DED8CF] p-6 sm:p-10 space-y-10 animate-fadeIn">
          {/* Header Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DED8CF]">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#9B8065] font-semibold">
                Consignment Details
              </span>
              <h3 className="font-editorial text-2xl text-[#171717]">
                Order {matchedOrder.orderNumber}
              </h3>
              <p className="text-xs text-[#77716A]">Recipient: {matchedOrder.customerName}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] tracking-widest uppercase text-[#77716A] block">
                Carrier
              </span>
              <span className="text-xs font-semibold text-[#171717]">
                {matchedOrder.trackingCarrier || "Velora White Glove Express"}
              </span>
              <p className="text-[11px] text-[#9B8065]">
                Waybill: {matchedOrder.trackingNumber || "Assigned on Dispatch"}
              </p>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
              Live Consignment Milestones
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stages.map((st, idx) => {
                const IconComponent = st.icon;
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div
                    key={st.key}
                    className={`p-4 border space-y-2 ${
                      isCurrent
                        ? "border-[#171717] bg-white ring-1 ring-[#171717]"
                        : isCompleted
                        ? "border-[#9B8065] bg-[#EFE9DE]"
                        : "border-[#DED8CF] bg-[#FAF7F2] opacity-60"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        isCompleted ? "text-[#9B8065]" : "text-[#77716A]"
                      }`}
                    />
                    <p className="text-[11px] uppercase tracking-wider font-medium text-[#171717]">
                      {st.label}
                    </p>
                    <p className="text-[10px] text-[#77716A]">
                      {isCompleted ? "Verified & Logged" : "Pending Transition"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination & Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#DED8CF] text-xs">
            <div>
              <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
                Sanctuary Address
              </h4>
              <p className="text-[#77716A]">{matchedOrder.shippingAddress.addressLine}</p>
              <p className="text-[#77716A]">
                {matchedOrder.shippingAddress.city}, {matchedOrder.shippingAddress.state}{" "}
                {matchedOrder.shippingAddress.postalCode}
              </p>
              <p className="text-[#77716A]">{matchedOrder.shippingAddress.country}</p>
            </div>

            <div>
              <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
                Pieces in Transit
              </h4>
              <ul className="space-y-1.5 text-[#77716A]">
                {matchedOrder.items.map((it) => (
                  <li key={it.id} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.productName} ({it.size})
                    </span>
                    <span className="font-medium text-[#171717]">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading tracker...</div>}>
      <TrackingContent />
    </Suspense>
  );
}

