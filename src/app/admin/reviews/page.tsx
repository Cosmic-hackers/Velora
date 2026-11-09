"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Review } from "@/data/seedData";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(StoreService.getAllReviewsForAdmin());
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const handleUpdate = (id: string, newStatus: "approved" | "rejected") => {
    StoreService.updateReviewStatus(id, newStatus);
    setReviews(StoreService.getAllReviewsForAdmin());
    setToast(`Impression status changed to "${newStatus}".`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
          Curatorial Moderation
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
          Client Impressions & Ratings ({reviews.length})
        </h1>
      </div>

      {toast && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {toast}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs uppercase tracking-wider">
        {["all", "approved", "pending", "rejected"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-2 border transition-colors ${
              filter === st
                ? "bg-[#171717] text-white border-[#171717]"
                : "bg-white text-[#171717] border-[#DED8CF]"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-editorial text-base text-[#171717]">{rev.title}</h4>
                <p className="text-xs text-[#77716A]">
                  by <strong className="text-[#171717] font-medium">{rev.userName}</strong> •{" "}
                  {formatDate(rev.createdAt)}
                </p>
                {rev.isVerifiedPurchase && (
                  <span className="inline-block mt-1 bg-[#9B8065]/10 text-[#9B8065] text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold">
                    Verified Consignment Purchase
                  </span>
                )}
              </div>

              <div className="flex text-[#9B8065]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? "fill-current" : "stroke-current text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#77716A] leading-relaxed font-light">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="pt-3 border-t border-[#DED8CF] flex items-center justify-between text-xs">
              <span className="uppercase text-[10px] tracking-wider text-[#77716A]">
                Status: <strong className="text-[#171717]">{rev.status}</strong>
              </span>

              <div className="flex gap-2">
                {rev.status !== "approved" && (
                  <button
                    onClick={() => handleUpdate(rev.id, "approved")}
                    className="px-3 py-1 bg-emerald-800 text-white text-[10px] uppercase tracking-wider"
                  >
                    Approve
                  </button>
                )}
                {rev.status !== "rejected" && (
                  <button
                    onClick={() => handleUpdate(rev.id, "rejected")}
                    className="px-3 py-1 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] uppercase tracking-wider"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

