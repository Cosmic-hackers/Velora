"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Truck, ArrowRight, ArrowLeft, RefreshCw, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { StoreService } from "@/lib/store";
import { Order } from "@/data/seedData";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const allOrders = StoreService.getOrders();

  const userOrders = allOrders.filter(
    (o) =>
      o.userId === user?.id ||
      (user?.email && o.customerEmail.toLowerCase() === user.email.toLowerCase())
  );

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredOrders = userOrders.filter((o) => {
    if (filterStatus === "all") return true;
    return o.orderStatus === filterStatus;
  });

  const handleCancelOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModalOrder || !cancelReason) return;
    StoreService.cancelOrder(cancelModalOrder.id, cancelReason);
    setFeedback(`Order ${cancelModalOrder.orderNumber} has been successfully cancelled.`);
    setCancelModalOrder(null);
    setCancelReason("");
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleReturnRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder || !returnReason) return;
    StoreService.requestReturn(returnModalOrder.id, returnReason);
    setFeedback(`Return request initiated for order ${returnModalOrder.orderNumber}. Our courier will contact you.`);
    setReturnModalOrder(null);
    setReturnReason("");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-[#DED8CF] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link
            href="/account"
            className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
            Consignment History ({userOrders.length})
          </h1>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
          {["all", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 border transition-colors ${
                filterStatus === st
                  ? "border-[#171717] bg-[#171717] text-white"
                  : "border-[#DED8CF] bg-white text-[#171717] hover:border-[#9B8065]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {feedback}
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center bg-[#FAF7F2] border border-[#DED8CF] p-8 space-y-3">
          <p className="font-editorial text-xl text-[#77716A]">No consignments match this filter.</p>
          <Link href="/shop" className="btn-primary text-xs py-3 px-6 inline-block">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isCancellable = order.orderStatus === "pending" || order.orderStatus === "confirmed";
            const isReturnable = order.orderStatus === "delivered";

            return (
              <div
                key={order.id}
                className="bg-[#FAF7F2] border border-[#DED8CF] p-6 sm:p-8 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DED8CF] text-xs">
                  <div>
                    <span className="text-[#77716A] uppercase tracking-wider text-[10px] block">
                      Order Reference
                    </span>
                    <span className="font-semibold text-sm text-[#171717]">
                      {order.orderNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#77716A] uppercase tracking-wider text-[10px] block">
                      Date Dispatched
                    </span>
                    <span className="font-medium text-[#171717]">{formatDate(order.createdAt)}</span>
                  </div>

                  <div>
                    <span className="text-[#77716A] uppercase tracking-wider text-[10px] block">
                      Amount
                    </span>
                    <span className="font-semibold text-[#171717]">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#77716A] uppercase tracking-wider text-[10px] block">
                      Status
                    </span>
                    <span className="inline-block bg-[#9B8065]/10 text-[#9B8065] font-semibold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-[#DED8CF]/60">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-4">
                      <div className="relative w-14 h-18 bg-[#EAE4D9] flex-shrink-0 border border-[#DED8CF]">
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        )}
                      </div>
                      <div className="flex-1 text-xs space-y-0.5">
                        <h4 className="font-editorial text-sm text-[#171717] font-medium">
                          {item.productName}
                        </h4>
                        <p className="text-[#77716A]">
                          Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#171717]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons bar */}
                <div className="pt-4 border-t border-[#DED8CF] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-[#171717] hover:text-[#9B8065] font-semibold underline underline-offset-4"
                    >
                      View Full Dossier
                    </Link>

                    {order.trackingNumber && (
                      <Link
                        href={`/tracking?order=${order.orderNumber}`}
                        className="text-[#9B8065] hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <Truck className="w-3.5 h-3.5" /> Track Consignment
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCancellable && (
                      <button
                        onClick={() => setCancelModalOrder(order)}
                        className="px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 text-[11px] uppercase tracking-wider"
                      >
                        Cancel Consignment
                      </button>
                    )}
                    {isReturnable && (
                      <button
                        onClick={() => setReturnModalOrder(order)}
                        className="px-3 py-1.5 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white text-[11px] uppercase tracking-wider"
                      >
                        Request Return
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setCancelModalOrder(null)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-2xl z-10 space-y-4">
            <h3 className="font-editorial text-2xl text-[#171717]">Cancel Consignment</h3>
            <p className="text-xs text-[#77716A]">
              Are you sure you want to cancel order <strong>{cancelModalOrder.orderNumber}</strong>?
            </p>
            <form onSubmit={handleCancelOrder} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                  Reason for Cancellation
                </label>
                <select
                  required
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
                >
                  <option value="">Select a reason...</option>
                  <option value="Changed styling preferences">Changed styling preferences</option>
                  <option value="Ordered duplicate piece by error">Ordered duplicate piece by error</option>
                  <option value="Incorrect sizing selected">Incorrect sizing selected</option>
                  <option value="Need different delivery timeframe">Need different delivery timeframe</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#77716A]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-red-800 hover:bg-red-900 text-white text-xs py-2 px-5"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setReturnModalOrder(null)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-2xl z-10 space-y-4">
            <h3 className="font-editorial text-2xl text-[#171717]">Request White Glove Return</h3>
            <p className="text-xs text-[#77716A]">
              We will arrange courier pickup from your registered address for order{" "}
              <strong>{returnModalOrder.orderNumber}</strong>.
            </p>
            <form onSubmit={handleReturnRequest} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                  Reason for Return
                </label>
                <textarea
                  required
                  rows={3}
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  placeholder="Detail fit, size adjustments or reason..."
                  className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnModalOrder(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#77716A]"
                >
                  Close
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-5">
                  Submit Return Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

