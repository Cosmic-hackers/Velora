import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

interface Props {
  params: {
    slug: string;
  };
}

export default function CollectionDetailPage({ params }: Props) {
  const collections = StoreService.getCollections();
  const collection = collections.find(
    (c) => c.slug === params.slug || (params.slug === "accessories" && c.slug === "the-accessories")
  );

  if (!collection) {
    notFound();
  }

  const allProducts = StoreService.getProducts();
  const products = allProducts.filter((p) => {
    if (p.collectionId === collection.id) return true;
    if (
      collection.slug === "the-accessories" &&
      (p.department === "accessories" || p.categoryId.startsWith("cat-a"))
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* Editorial Hero Banner */}
      <div className="relative w-full h-[55vh] min-h-[440px] flex items-end overflow-hidden bg-[#171717]">
        <Image
          src={collection.imageUrl}
          alt={collection.name}
          fill
          priority
          className="object-cover opacity-90"
          style={{
            objectPosition:
              collection.slug === "the-essentials"
                ? "84% 0%"
                : collection.slug === "the-signature-edit"
                ? "50% 50%"
                : "center center",
          }}
          sizes="100vw"
        />
        {/* Editorial left scrim for typography clarity and bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent w-full sm:w-[65%] lg:w-[50%]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C2A888] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
          </Link>
          <div className="max-w-2xl space-y-3">
            <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal">
              {collection.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#D8D2C7] font-light max-w-lg leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#DED8CF] mb-8 text-xs text-[#77716A]">
          <span>
            Portraying <strong className="text-[#171717]">{products.length}</strong> creations in this chapter
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-[#FAF7F2] border border-[#DED8CF]">
            <p className="font-editorial text-xl text-[#77716A]">Creations currently in production.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

