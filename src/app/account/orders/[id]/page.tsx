"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck, Package, Printer, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Order } from "@/data/seedData";
import { formatPrice, formatDate } from "@/lib/utils";

interface Props {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const found = StoreService.getOrderById(params.id);
    if (found) {
      setOrder(found);
    }
  }, [params.id]);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="font-editorial text-2xl text-[#77716A]">Locating Consignment Ledger...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <Link
        href="/account/orders"
        className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Consignment History
      </Link>

      <div className="border-b border-[#DED8CF] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Consignment Dossier
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
            Order {order.orderNumber}
          </h1>
          <p className="text-xs text-[#77716A] mt-1">
            Recorded on {formatDate(order.createdAt)} • Status:{" "}
            <span className="font-semibold text-[#171717] uppercase">{order.orderStatus}</span>
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Receipt</span>
        </button>
      </div>

      <div className="bg-[#FAF7F2] border border-[#DED8CF] p-6 sm:p-8 space-y-8">
        {/* Tracking info if present */}
        {order.trackingNumber && (
          <div className="p-4 bg-[#EFE9DE] border border-[#DED8CF] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#9B8065]" />
              <div>
                <p className="font-semibold text-[#171717]">{order.trackingCarrier}</p>
                <p className="text-[#77716A]">Consignment Code: {order.trackingNumber}</p>
              </div>
            </div>
            <Link
              href={`/tracking?order=${order.orderNumber}`}
              className="text-[#9B8065] uppercase tracking-wider text-xs font-semibold hover:underline"
            >
              Live Tracking →
            </Link>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          <h3 className="font-editorial text-xl text-[#171717]">Items in Consignment</h3>
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
                <div className="flex-1 text-xs space-y-0.5">
                  <h4 className="font-editorial text-base text-[#171717] font-medium">
                    {item.productName}
                  </h4>
                  <p className="text-[#77716A]">
                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                  </p>
                  <p className="text-[#77716A]">Unit Price: {formatPrice(item.price)}</p>
                </div>
                <span className="text-sm font-semibold text-[#171717]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#DED8CF] text-xs">
          <div>
            <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
              Delivery Address
            </h4>
            <p className="font-semibold text-[#171717]">{order.customerName}</p>
            <p className="text-[#77716A]">{order.shippingAddress.addressLine}</p>
            {order.shippingAddress.apartmentSuite && (
              <p className="text-[#77716A]">{order.shippingAddress.apartmentSuite}</p>
            )}
            <p className="text-[#77716A]">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-[#77716A]">{order.shippingAddress.country}</p>
            <p className="pt-1 text-[#77716A]">Tel: {order.customerPhone}</p>
          </div>

          <div className="space-y-2">
            <h4 className="uppercase tracking-wider font-semibold text-[#171717] mb-2">
              Payment & Breakdown
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
              <span>Total Amount</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
            <p className="text-[11px] text-[#77716A] pt-2 capitalize">
              Payment Method: <strong>{order.paymentMethod}</strong> (Status: <strong>{order.paymentStatus}</strong>)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

