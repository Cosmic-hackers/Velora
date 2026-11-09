import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JOURNAL_POSTS } from "@/data/journalData";

interface Props {
  params: {
    slug: string;
  };
}

export default function JournalArticlePage({ params }: Props) {
  const post = JOURNAL_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full pb-24 bg-[#F8F7F4] text-[#171717]">
      {/* Back button */}
      <div className="w-full px-6 sm:px-12 pt-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#77736E] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO JOURNAL
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-16 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#77736E]">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#171717] leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-sm text-[#77736E] font-light max-w-xl mx-auto leading-relaxed pt-2">
          {post.excerpt}
        </p>
      </header>

      {/* Full-width Lead Image */}
      <div className="w-full relative aspect-[16/9] sm:aspect-[21/9] max-h-[75vh] bg-[#F0EDE8] overflow-hidden mb-16 border-y border-[#E9E6E0]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Article Body */}
      <div className="max-w-2xl mx-auto px-6 text-sm text-[#171717] font-light leading-loose space-y-6">
        {post.content
          .trim()
          .split("\n\n")
          .map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-4xl first-letter:font-editorial first-letter:mr-1">
              {paragraph.trim()}
            </p>
          ))}
      </div>

      {/* Footer Return */}
      <div className="max-w-2xl mx-auto px-6 pt-16 text-center">
        <Link
          href="/shop"
          className="inline-block bg-[#171717] text-white hover:bg-[#A18A70] text-[11px] uppercase tracking-[0.25em] px-8 py-4 transition-colors font-medium"
        >
          EXPLORE THE COLLECTION
        </Link>
      </div>
    </article>
  );
}
