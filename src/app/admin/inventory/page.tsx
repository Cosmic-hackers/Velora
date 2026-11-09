"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, AlertTriangle, CheckCircle2, Search } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Product } from "@/data/seedData";
import { formatPrice } from "@/lib/utils";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>(StoreService.getProducts());
  const [search, setSearch] = useState("");
  // Local simulated stock levels keyed by productId
  const [stockMap, setStockMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    products.forEach((p, idx) => {
      // seed deterministic realistic quantities
      initial[p.id] = (idx % 4 === 0 ? 3 : 12) + (idx % 3);
    });
    return initial;
  });
  const [toast, setToast] = useState<string | null>(null);

  const handleAdjustStock = (productId: string, delta: number) => {
    setStockMap((prev) => {
      const current = prev[productId] || 10;
      const updated = Math.max(0, current + delta);
      return { ...prev, [productId]: updated };
    });
    setToast("Inventory levels adjusted and synchronized with warehouse ledger.");
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Stock Management
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Warehouse Inventory Ledger
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, piece..."
            className="w-full bg-[#FAF7F2] border border-[#DED8CF] pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none"
          />
        </div>
      </div>

      {toast && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {toast}
        </div>
      )}

      {/* Stock Table */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Creation</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Supported Sizes</th>
                <th className="py-3 px-4">Available Units</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {filtered.map((prod) => {
                const stock = stockMap[prod.id] ?? 10;
                const isLow = stock <= 4;

                return (
                  <tr key={prod.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 bg-[#EAE4D9] flex-shrink-0 border border-[#DED8CF]">
                          {prod.images[0] && (
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-editorial text-sm font-medium">{prod.name}</p>
                          <p className="text-[10px] text-[#77716A]">{prod.categoryName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#77716A]">
                      {prod.sku}
                    </td>

                    <td className="py-3.5 px-4 font-medium">
                      {formatPrice(prod.salePrice ?? prod.price)}
                    </td>

                    <td className="py-3.5 px-4 text-[#77716A]">
                      {prod.sizes.join(", ")}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-sm">
                      {stock}
                    </td>

                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> In Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdjustStock(prod.id, -1)}
                          className="p-1 border border-[#DED8CF] bg-white hover:bg-[#EFE9DE] text-[#171717]"
                          title="Decrement 1 unit"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 5)}
                          className="px-2 py-1 border border-[#DED8CF] bg-white hover:bg-[#EFE9DE] text-[10px] font-semibold text-[#171717]"
                          title="Restock 5 units"
                        >
                          +5 Restock
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 1)}
                          className="p-1 border border-[#DED8CF] bg-white hover:bg-[#EFE9DE] text-[#171717]"
                          title="Increment 1 unit"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

