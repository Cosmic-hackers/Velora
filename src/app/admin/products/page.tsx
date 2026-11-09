"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Trash2, Edit3, Eye, EyeOff, Sparkles } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Product } from "@/data/seedData";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(StoreService.getProducts());
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = StoreService.getCategories();

  const filtered = products.filter((p) => {
    if (filterCategory !== "all" && p.categoryId !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleTogglePublished = (id: string, current: boolean) => {
    const updated = StoreService.updateProduct(id, { isPublished: !current });
    if (updated) {
      setProducts(StoreService.getProducts());
      setToastMessage(`Product "${updated.name}" is now ${!current ? "Published" : "Unpublished"}.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you certain you wish to remove "${name}" from the atelier catalog?`)) {
      StoreService.deleteProduct(id);
      setProducts(StoreService.getProducts());
      setToastMessage(`Product "${name}" deleted.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Catalog Management
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Atelier Products ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="btn-primary text-xs py-3 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Creation</span>
        </Link>
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-[#EFE9DE] border border-[#9B8065] text-[#171717] text-xs">
          {toastMessage}
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-[#FAF7F2] p-4 border border-[#DED8CF] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU..."
            className="w-full bg-white border border-[#DED8CF] pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-wider text-[#77716A]">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white border border-[#DED8CF] p-2 text-xs text-[#171717] focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Creation Name & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-16 bg-[#EAE4D9] border border-[#DED8CF]">
                      {prod.images[0] && (
                        <Image
                          src={prod.images[0]}
                          alt={prod.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Link
                      href={`/product/${prod.slug}`}
                      target="_blank"
                      className="font-editorial text-sm font-medium hover:text-[#9B8065] block"
                    >
                      {prod.name}
                    </Link>
                    <span className="text-[10px] text-[#77716A] uppercase tracking-wider">
                      {prod.sku}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#77716A]">
                    {prod.categoryName || "Outerwear"}
                  </td>

                  <td className="py-3 px-4 font-semibold">
                    <div>{formatPrice(prod.salePrice ?? prod.price)}</div>
                    {prod.salePrice && (
                      <span className="text-[10px] text-[#77716A] line-through font-normal">
                        {formatPrice(prod.price)}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 uppercase text-[10px] tracking-wider text-[#77716A]">
                    {prod.gender}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublished(prod.id, prod.isPublished)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded ${
                        prod.isPublished
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      title="Click to toggle visibility"
                    >
                      {prod.isPublished ? (
                        <>
                          <Eye className="w-3 h-3" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Draft
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${prod.id}/edit`}
                        className="p-1.5 text-[#171717] hover:text-[#9B8065] transition-colors"
                        title="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 text-[#77716A] hover:text-red-700 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

