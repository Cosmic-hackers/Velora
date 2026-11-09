"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FolderTree, Plus, Trash2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Category } from "@/data/seedData";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(StoreService.getCategories());
  const [activeDept, setActiveDept] = useState<string>("all");
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState<"women" | "men" | "accessories" | "all">("women");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      department,
      description,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
      displayOrder: categories.length + 1,
    };

    StoreService.createCategory(newCat);
    setCategories(StoreService.getCategories());
    setIsAdding(false);
    setName("");
    setSlug("");
    setDescription("");
    setImageUrl("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      StoreService.deleteCategory(id);
      setCategories(StoreService.getCategories());
    }
  };

  const filteredCategories = activeDept === "all"
    ? categories
    : categories.filter((c) => c.department === activeDept);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Taxonomy & Structure
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Product Categories ({categories.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary text-xs py-3 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Cancel" : "Add Category"}</span>
        </button>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E9E6E0] pb-3 overflow-x-auto text-xs uppercase tracking-widest">
        {[
          { key: "all", label: "All Departments" },
          { key: "women", label: "Women" },
          { key: "men", label: "Men" },
          { key: "accessories", label: "Accessories" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveDept(tab.key)}
            className={`pb-1 transition-colors ${
              activeDept === tab.key
                ? "text-[#171717] font-semibold border-b-2 border-[#171717]"
                : "text-[#77736E] hover:text-[#171717]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-4">
          <h3 className="font-editorial text-xl text-[#171717]">Create Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="accessories">Accessories</option>
                <option value="all">All Departments</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Editorial Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs uppercase text-[#77716A]"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2 px-6">
              Save Category
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#FAF7F2] border border-[#DED8CF] p-6 flex gap-4 items-center justify-between"
          >
            <div className="flex gap-4 items-center flex-1">
              <div className="relative w-20 h-20 bg-[#EAE4D9] flex-shrink-0 border border-[#DED8CF]">
                {cat.imageUrl && (
                  <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" sizes="80px" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-editorial text-lg text-[#171717]">{cat.name}</h4>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#EAE4D9] text-[#77736E]">
                    {cat.department || "unisex"}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#9B8065]">slug: {cat.slug}</p>
                <p className="text-xs text-[#77716A] line-clamp-1">{cat.description}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(cat.id)}
              className="p-2 text-[#77736E] hover:text-red-700 transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
