"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Filter,
} from "lucide-react";
import { StoreService } from "@/lib/store";
import { Order } from "@/data/seedData";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(StoreService.getOrders());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update modal states
  const [carrier, setCarrier] = useState("Velora White Glove Express");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [newStatus, setNewStatus] = useState<Order["orderStatus"]>("shipped");
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.orderStatus !== statusFilter) return false;
    if (search.trim()) {
      const q = search.trim().toUpperCase();
      return (
        o.orderNumber.toUpperCase().includes(q) ||
        o.customerName.toUpperCase().includes(q) ||
        o.customerEmail.toUpperCase().includes(q)
      );
    }
    return true;
  });

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    StoreService.updateOrderStatus(selectedOrder.id, newStatus, {
      carrier,
      trackingNumber,
    });

    setOrders(StoreService.getOrders());
    setFeedback(`Consignment ${selectedOrder.orderNumber} transitioned to "${newStatus}".`);
    setSelectedOrder(null);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleMarkPaymentPaid = (orderId: string) => {
    StoreService.updatePaymentStatus(orderId, "paid");
    setOrders(StoreService.getOrders());
    setFeedback("Payment marked as verified and paid.");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
          Fulfillment Ledger
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
          Consignments & Courier Management ({orders.length})
        </h1>
      </div>

      {feedback && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {feedback}
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-[#FAF7F2] p-4 border border-[#DED8CF] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, email..."
            className="w-full bg-white border border-[#DED8CF] pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-wider text-[#77716A]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#DED8CF] p-2 text-xs text-[#171717] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="return_requested">Return Requested</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Creations</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
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
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {ord.items.length} {ord.items.length === 1 ? "piece" : "pieces"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{formatPrice(ord.totalAmount)}</td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span
                        className={`inline-block uppercase text-[9px] tracking-wider px-1.5 py-0.5 rounded font-semibold ${
                          ord.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                      <p className="text-[10px] text-[#77716A] uppercase">{ord.paymentMethod}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block uppercase text-[10px] tracking-wider bg-[#9B8065]/10 text-[#9B8065] px-2 py-0.5 rounded font-semibold">
                      {ord.orderStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">{formatDate(ord.createdAt)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setNewStatus(ord.orderStatus);
                        setCarrier(ord.trackingCarrier || "Velora White Glove Express");
                        setTrackingNumber(ord.trackingNumber || "");
                      }}
                      className="text-[#9B8065] hover:text-[#171717] font-semibold text-[11px] uppercase tracking-wider"
                    >
                      Update →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Order & Waybill Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#DED8CF]">
              <h3 className="font-editorial text-2xl text-[#171717]">
                Manage Order {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs uppercase text-[#77716A] hover:text-[#171717]"
              >
                Close
              </button>
            </div>

            {/* Client and Destination Preview */}
            <div className="p-3.5 bg-[#EFE9DE] border border-[#DED8CF] text-xs space-y-1">
              <p className="font-semibold text-[#171717]">
                Client: {selectedOrder.customerName} ({selectedOrder.customerEmail})
              </p>
              <p className="text-[#77716A]">
                Destination: {selectedOrder.shippingAddress.addressLine},{" "}
                {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
              </p>
              <p className="text-[#77716A]">Payment: {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})</p>
            </div>

            {selectedOrder.paymentStatus !== "paid" && (
              <button
                type="button"
                onClick={() => handleMarkPaymentPaid(selectedOrder.id)}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-wider font-medium"
              >
                ✓ Mark COD Payment As Collected & Paid
              </button>
            )}

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Consignment Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing (Atelier Tailoring)</option>
                  <option value="shipped">Shipped (In Transit)</option>
                  <option value="delivered">Delivered to Client</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="return_requested">Return Requested</option>
                  <option value="returned">Returned & Restocked</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Courier Partner
                </label>
                <input
                  type="text"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Waybill / Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. VEL-EXP-9921443"
                  className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#DED8CF]">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#77716A]"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-6">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

