"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { StoreService } from "@/lib/store";
import { Product } from "@/data/seedData";

interface Props {
  params: {
    id: string;
  };
}

export default function AdminEditProductPage({ params }: Props) {
  const router = useRouter();
  const product = StoreService.getProductById(params.id);
  const categories = StoreService.getCategories();
  const collections = StoreService.getCollections();

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [salePrice, setSalePrice] = useState<number | "">(product?.salePrice || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || categories[0]?.id);
  const [collectionId, setCollectionId] = useState(product?.collectionId || collections[0]?.id);
  const [gender, setGender] = useState<"men" | "women" | "unisex">(product?.gender || "unisex");
  const [detailsText, setDetailsText] = useState((product?.details || []).join("\n"));
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(product?.isPublished ?? true);
  const [isNewArrival, setIsNewArrival] = useState(product?.isNewArrival ?? false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="font-editorial text-2xl text-[#77716A]">Creation Not Found</p>
        <Link href="/admin/products" className="text-xs uppercase text-[#9B8065] mt-2 block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === categoryId);
    const colObj = collections.find((c) => c.id === collectionId);
    const detailsArray = detailsText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    StoreService.updateProduct(product.id, {
      name,
      slug,
      sku,
      description,
      details: detailsArray,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      categoryId,
      categoryName: catObj?.name,
      collectionId,
      collectionName: colObj?.name,
      gender,
      images,
      isFeatured,
      isNewArrival,
      isPublished,
    });

    router.push("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="text-xs uppercase tracking-widest text-[#9B8065] hover:text-[#171717] inline-flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products Catalog
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
          Edit: {product.name}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-8">
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            1. Core Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Creation Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                SKU Code
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            2. Valuation & Classification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Valuation (₹)
              </label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Archive Sale Price (₹)
              </label>
              <input
                type="number"
                min={0}
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : "")}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              >
                <option value="unisex">Unisex</option>
                <option value="men">Men&apos;s</option>
                <option value="women">Women&apos;s</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            3. Narrative & Atelier Details
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Fabric Specifications (One line per bullet)
            </label>
            <textarea
              rows={4}
              value={detailsText}
              onChange={(e) => setDetailsText(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>Published</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>New Arrival Flag</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>Homepage Featured</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-[#DED8CF]">
          <Link
            href="/admin/products"
            className="px-6 py-3.5 text-xs uppercase tracking-wider text-[#77716A]"
          >
            Cancel
          </Link>
          <button type="submit" className="btn-primary text-xs py-3.5 px-8">
            Save Modifications
          </button>
        </div>
      </form>
    </div>
  );
}

