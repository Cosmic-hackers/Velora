import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JOURNAL_POSTS } from "@/data/journalData";

export const metadata = {
  title: "The Journal — VELORA Haute Garde-Robe",
  description: "Essays on architectural fashion, fabric craftsmanship, and the beauty of reduction.",
};

export default function JournalPage() {
  return (
    <div className="w-full pb-24 bg-[#F8F7F4] text-[#171717]">
      {/* Header */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E9E6E0] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
            EDITORIAL DISPATCHES
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#171717]">
            The Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#77736E] font-light max-w-md mx-auto leading-relaxed">
            Essays on architectural fashion, material provenance, and the timeless beauty of intentional reduction.
          </p>
        </div>
      </section>

      {/* Featured Lead Post */}
      <section className="w-full px-6 sm:px-10 lg:px-12 py-16 border-b border-[#E9E6E0]">
        <Link
          href={`/journal/${JOURNAL_POSTS[0].slug}`}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-8 relative aspect-[16/10] w-full overflow-hidden bg-[#F0EDE8]">
            <Image
              src={JOURNAL_POSTS[0].image}
              alt={JOURNAL_POSTS[0].title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          <div className="lg:col-span-4 space-y-4 lg:pl-6">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#77736E]">
              <span>{JOURNAL_POSTS[0].category}</span>
              <span>•</span>
              <span>{JOURNAL_POSTS[0].date}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] group-hover:text-[#A18A70] transition-colors leading-tight font-normal">
              {JOURNAL_POSTS[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
              {JOURNAL_POSTS[0].excerpt}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#171717] font-medium group-hover:text-[#A18A70]">
                READ DISPATCH <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Secondary Posts Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {JOURNAL_POSTS.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="group flex flex-col space-y-4"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EDE8]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#77736E]">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-editorial text-2xl font-normal text-[#171717] group-hover:text-[#A18A70] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#77736E] font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
