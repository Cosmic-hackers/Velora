"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { StoreService } from "@/lib/store";
import { Order } from "@/data/seedData";
import { formatPrice, formatDate } from "@/lib/utils";

interface Props {
  params: {
    orderId: string;
  };
}

export default function OrderConfirmationPage({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = StoreService.getOrderById(params.orderId);
    if (found) {
      setOrder(found);
    }
    setLoading(false);
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-editorial text-2xl text-[#77716A]">Authenticating Consignment Records...</p>
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#EFE9DE] text-[#9B8065] rounded-full flex items-center justify-center mx-auto border border-[#DED8CF]">
          <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
        </div>
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold block">
          Consignment Confirmed
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#171717] font-normal">
          Thank you, {order.customerName}.
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-md mx-auto leading-relaxed">
          Your order has been recorded into the VELORA atelier ledger. A comprehensive confirmation
          dossier has been dispatched to <strong className="text-[#171717]">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Order Dossier Card */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] p-6 sm:p-10 space-y-8">
        {/* Top Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-[#DED8CF] text-xs">
          <div>
            <span className="text-[#77716A] uppercase tracking-wider text-[10px] block font-medium">
              Order Reference
            </span>
            <span className="font-semibold text-[#171717] text-sm mt-0.5 block">
              {order.orderNumber}
            </span>
          </div>

          <div>
            <span className="text-[#77716A] uppercase tracking-wider text-[10px] block font-medium">
              Date Placed
            </span>
            <span className="font-semibold text-[#171717] text-sm mt-0.5 block">
              {formatDate(order.createdAt)}
            </span>
          </div>

          <div>
            <span className="text-[#77716A] uppercase tracking-wider text-[10px] block font-medium">
              Payment Method
            </span>
            <span className="font-semibold text-[#171717] text-sm mt-0.5 block capitalize">
              {order.paymentMethod === "razorpay" ? "Razorpay Verified" : "Cash on Delivery"}
            </span>
          </div>

          <div>
            <span className="text-[#77716A] uppercase tracking-wider text-[10px] block font-medium">
              Consignment Status
            </span>
            <span className="inline-block bg-[#9B8065]/10 text-[#9B8065] font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded mt-0.5">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Tracking Reference */}
        {order.trackingNumber && (
          <div className="p-4 bg-[#EFE9DE] border border-[#DED8CF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#9B8065]" />
              <div>
                <p className="font-semibold text-[#171717]">
                  {order.trackingCarrier || "Velora White Glove Express"}
                </p>
                <p className="text-[#77716A]">Tracking ID: {order.trackingNumber}</p>
              </div>
            </div>
            <Link
              href={`/tracking?order=${order.orderNumber}`}
              className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] font-semibold inline-flex items-center gap-1"
            >
              <span>Track Live Delivery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717]">Purchased Creations</h3>
          <div className="divide-y divide-[#DED8CF]">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center gap-4">
                <div className="relative w-16 h-20 bg-[#EAE4D9] flex-shrink-0 border border-[#DED8CF]">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="flex-1 text-xs space-y-1">
                  <h4 className="font-editorial text-base text-[#171717]">{item.productName}</h4>
                  <p className="text-[#77716A]">
                    Size: <span className="text-[#171717] font-medium">{item.size}</span> | Color:{" "}
                    <span className="text-[#171717] font-medium">{item.color}</span>
                  </p>
                  <p className="text-[#77716A]">Quantity: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-[#171717]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals & Delivery Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#DED8CF] text-xs">
          <div>
            <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
              Delivery Destination
            </h4>
            <p className="text-[#171717] font-medium">{order.customerName}</p>
            <p className="text-[#77716A]">{order.shippingAddress.addressLine}</p>
            {order.shippingAddress.apartmentSuite && (
              <p className="text-[#77716A]">{order.shippingAddress.apartmentSuite}</p>
            )}
            <p className="text-[#77716A]">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-[#77716A]">{order.shippingAddress.country}</p>
            <p className="text-[#77716A] pt-1">Tel: {order.customerPhone}</p>
          </div>

          <div className="space-y-2">
            <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
              Financial Breakdown
            </h4>
            <div className="flex justify-between text-[#77716A]">
              <span>Subtotal</span>
              <span className="text-[#171717]">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#9B8065]">
                <span>Promotional Concession</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#77716A]">
              <span>Shipping</span>
              <span className="text-[#171717]">
                {order.shippingCost === 0 ? "Complimentary" : formatPrice(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#171717] pt-2 border-t border-[#DED8CF]">
              <span>Total Paid / Payable</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#DED8CF]">
          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs py-3 px-6 flex items-center gap-2 w-full sm:w-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt Dossier</span>
          </button>

          <Link
            href="/shop"
            className="btn-primary text-xs py-3.5 px-8 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Continue Exploring Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

