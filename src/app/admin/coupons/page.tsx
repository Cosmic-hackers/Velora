"use client";

import React, { useState } from "react";
import { Tag, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Coupon } from "@/data/seedData";
import { formatPrice } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(StoreService.getCoupons());
  const [isAdding, setIsAdding] = useState(false);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(5000);
  const [maxDiscount, setMaxDiscount] = useState<number | "">(5000);
  const [usageLimit, setUsageLimit] = useState<number | "">(500);
  const [toast, setToast] = useState<string | null>(null);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || discountValue <= 0) return;

    const newCoup = StoreService.createCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      usageLimit: usageLimit ? Number(usageLimit) : undefined,
      isActive: true,
      expiresAt: "2026-12-31T23:59:59Z",
    });

    setCoupons(StoreService.getCoupons());
    setIsAdding(false);
    setCode("");
    setToast(`Promotional code ${newCoup.code} activated.`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, codeStr: string) => {
    if (confirm(`Revoke promotional code ${codeStr}?`)) {
      StoreService.deleteCoupon(id);
      setCoupons(StoreService.getCoupons());
      setToast(`Code ${codeStr} revoked.`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Marketing & Concessions
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Promotional Coupons ({coupons.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary text-xs py-3 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Cancel" : "Create Promotional Code"}</span>
        </button>
      </div>

      {toast && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {toast}
        </div>
      )}

      {isAdding && (
        <form
          onSubmit={handleCreateCoupon}
          className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-4 animate-fadeIn"
        >
          <h3 className="font-editorial text-xl text-[#171717]">Issue New Promotional Code</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Promo Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SOLSTICE20"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs uppercase tracking-wider text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Concession (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Discount Value *
              </label>
              <input
                type="number"
                required
                min={1}
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Minimum Consignment Value (₹)
              </label>
              <input
                type="number"
                min={0}
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Maximum Concession Cap (₹ Optional)
              </label>
              <input
                type="number"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : "")}
                placeholder="No cap"
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Usage Capacity Limit
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value ? Number(e.target.value) : "")}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#DED8CF]">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#77716A]"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2 px-6">
              Activate Code
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Promotional Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min. Consignment</th>
                <th className="py-3 px-4">Usage Count</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-sm">
                    {c.code}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#171717]">
                    {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {formatPrice(c.minOrderValue)}
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {c.timesUsed} {c.usageLimit ? `/ ${c.usageLimit}` : "times"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block uppercase text-[10px] tracking-wider px-2 py-0.5 rounded font-semibold ${
                        c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {c.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.code)}
                      className="text-red-700 hover:text-red-900 p-1"
                      title="Revoke coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

