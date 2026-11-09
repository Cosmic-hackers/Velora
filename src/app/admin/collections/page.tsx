"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Layers, Plus, Trash2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Collection } from "@/data/seedData";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(StoreService.getCollections());
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name,
      slug,
      description,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
      displayOrder: collections.length + 1,
    };

    setCollections([...collections, newCol]);
    setIsAdding(false);
    setName("");
    setSlug("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Seasonal Chapters
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Collections & Lookbooks ({collections.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary text-xs py-3 px-6 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Cancel" : "Add Collection"}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[#FAF7F2] p-6 border border-[#DED8CF] space-y-4">
          <h3 className="font-editorial text-xl text-[#171717]">Create Collection Chapter</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Collection Name *
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
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Curatorial Statement
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-2.5 text-xs text-[#171717]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                Cinematic Lookbook Image URL
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
              Save Chapter
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-[#EAE4D9]">
              {col.imageUrl && (
                <Image src={col.imageUrl} alt={col.name} fill className="object-cover" sizes="300px" />
              )}
            </div>
            <div className="p-5 flex-1 space-y-2">
              <h4 className="font-editorial text-xl text-[#171717]">{col.name}</h4>
              <p className="font-mono text-[10px] text-[#9B8065]">slug: {col.slug}</p>
              <p className="text-xs text-[#77716A] line-clamp-3 leading-relaxed font-light">
                {col.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

