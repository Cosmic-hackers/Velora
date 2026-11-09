import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoreService } from "@/lib/store";

export const metadata = {
  title: "Collections & Chapters — VELORA",
  description: "Explore the three foundational pillars of the VELORA wardrobe: Essentials, Contemporary, and Timeless Classics.",
};

export default function CollectionsPage() {
  const collections = StoreService.getCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold">
          Curated Chapters
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal">
          The Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
          Each chapter represents a deliberate exploration of texture, silhouette, and longevity.
          Crafted to be collected gradually and worn perpetually.
        </p>
      </div>

      {/* Collections Vertical Presentation */}
      <div className="space-y-24">
        {collections.map((col, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE4D9] border border-[#DED8CF]">
                  <Image
                    src={col.imageUrl}
                    alt={col.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>

              <div
                className={`lg:col-span-5 space-y-6 ${
                  isEven ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
                }`}
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
                  Chapter 0{idx + 1}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
                  {col.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
                  {col.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="btn-primary inline-flex text-xs py-3.5 px-8 items-center gap-2"
                  >
                    <span>Explore Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

