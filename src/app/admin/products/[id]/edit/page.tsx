"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { StoreService } from "@/lib/store";

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
  const [department, setDepartment] = useState<"women" | "men" | "accessories">(product?.department || "women");
  const [categoryId, setCategoryId] = useState(product?.categoryId || categories[0]?.id);
  const [collectionId, setCollectionId] = useState(product?.collectionId || collections[0]?.id);
  const [gender, setGender] = useState<"men" | "women" | "unisex">(product?.gender || "unisex");
  const [detailsText, setDetailsText] = useState((product?.details || []).join("\n"));
  const [fabricCare, setFabricCare] = useState(
    Array.isArray(product?.fabricCare) ? product.fabricCare.join("\n") : (product?.fabricCare || "")
  );
  const [fitInfo, setFitInfo] = useState(
    Array.isArray(product?.fitInfo) ? product.fitInfo.join("\n") : (product?.fitInfo || "")
  );
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(product?.isPublished ?? true);
  const [isNewArrival, setIsNewArrival] = useState(product?.isNewArrival ?? false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);

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
      department,
      categoryId,
      categoryName: catObj?.name,
      collectionId,
      collectionName: colObj?.name,
      gender,
      fabricCare: fabricCare.split("\n").map((s) => s.trim()).filter(Boolean),
      fitInfo: fitInfo.split("\n").map((s) => s.trim()).filter(Boolean),
      images,
      isFeatured,
      isNewArrival,
      isBestSeller,
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
          Edit Atelier Creation: {product.name}
        </h1>
        <p className="text-xs text-[#77716A] mt-1">
          Update specifications, department classification, fabric care, dimensions and photography.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-8">
        {/* Core Identity */}
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            1. Creation Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Creation Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                URL Identifier (Slug) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Atelier SKU Code *
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
              />
            </div>
          </div>
        </div>

        {/* Categorization & Pricing */}
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            2. Classification & Valuation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.department || "all"})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Collection
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Standard Valuation (₹) *
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
                Archive Sale Price (₹ Optional)
              </label>
              <input
                type="number"
                min={0}
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : "")}
                placeholder="Leave blank if standard"
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Gender Classification
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              >
                <option value="women">Women&apos;s</option>
                <option value="men">Men&apos;s</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>
        </div>

        {/* Narrative & Fabric Details */}
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            3. Editorial Description, Fabric & Fit
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Editorial Narrative *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Materials & Textile Care
              </label>
              <textarea
                rows={3}
                value={fabricCare}
                onChange={(e) => setFabricCare(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                Fit & Proportion Guidance
              </label>
              <textarea
                rows={3}
                value={fitInfo}
                onChange={(e) => setFitInfo(e.target.value)}
                className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
              Atelier Notes & Fabric Specifications (One line per bullet)
            </label>
            <textarea
              rows={3}
              value={detailsText}
              onChange={(e) => setDetailsText(e.target.value)}
              className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
            />
          </div>
        </div>

        {/* Photographic Assets */}
        <div className="space-y-4">
          <h3 className="font-editorial text-lg text-[#171717] pb-2 border-b border-[#DED8CF]">
            4. Photography Asset URLs
          </h3>

          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 bg-white border border-[#DED8CF] p-3 text-xs text-[#171717]"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-[#171717] text-white hover:bg-[#9B8065] px-5 text-xs uppercase tracking-wider"
            >
              Add URL
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-28 bg-[#EAE4D9] border border-[#DED8CF] group">
                <Image src={img} alt={`Asset ${i}`} fill className="object-cover" sizes="80px" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 p-1 bg-red-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
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
            <span>New Arrival</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>Best Seller</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-[#171717]"
            />
            <span>Homepage Showcase</span>
          </label>
        </div>

        {/* CTA */}
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
