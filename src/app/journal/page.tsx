"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { JOURNAL_POSTS } from "@/data/journalData";

export default function JournalPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const categories = [
    {
      title: "FASHION",
      desc: "Modern dressing, timeless appeal.",
      image: "/images/journal/explore-fashion.jpg",
      href: "/journal?category=fashion",
    },
    {
      title: "CULTURE",
      desc: "Art, travel and the creative world.",
      image: "/images/journal/explore-culture.jpg",
      href: "/journal?category=culture",
    },
    {
      title: "CRAFTSMANSHIP",
      desc: "The people and processes behind our pieces.",
      image: "/images/journal/explore-craftsmanship.jpg",
      href: "/journal?category=craftsmanship",
    },
    {
      title: "PEOPLE",
      desc: "Conversations with creatives and changemakers.",
      image: "/images/journal/explore-people.jpg",
      href: "/journal?category=people",
    },
  ];

  const recentStories = [
    {
      category: "FASHION",
      title: "Layering with Intention",
      date: "MAR 12, 2025",
      image: "/images/journal/story-layering.jpg",
      slug: "layering-with-intention",
    },
    {
      category: "PEOPLE",
      title: "A Conversation on Modern Masculinity",
      date: "MAR 5, 2025",
      image: "/images/journal/story-masculinity.jpg",
      slug: "modern-masculinity",
    },
    {
      category: "CULTURE",
      title: "The Spaces That Inspire Us",
      date: "FEB 28, 2025",
      image: "/images/journal/story-spaces.jpg",
      slug: "the-spaces-that-inspire-us",
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#171717] min-h-screen">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION: "THE VELORA JOURNAL" (FULL-WIDTH BANNER)    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden bg-[#EAE4D9] border-b border-[#E9E6E0]">
        <div className="absolute -inset-[2px]">
          <Image
            src="/images/journal/journal-hero-model.jpg"
            alt="The VELORA Journal Editorial"
            fill
            priority
            quality={98}
            className="object-cover"
            style={{ objectPosition: "70% 0%" }}
            sizes="100vw"
          />
          {/* Subtle gradient overlay to provide pristine legibility on the left while showcasing the model on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/50 to-transparent w-full sm:w-[60%] lg:w-[48%]" />
        </div>

        {/* Hero Narrative Overlay */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#77736E] font-medium block">
            JOURNAL
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-normal tracking-tight leading-[1.08]">
            THE VELORA<br />
            JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed max-w-md pt-1">
            Stories on style, craft, culture and a more considered way of living.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 2. FEATURED STORY: "The Season of Refinement"                */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 border-b border-[#E9E6E0]">
        <Link
          href={`/journal/${JOURNAL_POSTS[0].slug}`}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Photo (60% width) */}
          <div className="lg:col-span-7 relative aspect-[16/9] sm:aspect-[16/8] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
            <Image
              src="/images/journal/journal-featured-season.jpg"
              alt="The Season of Refinement"
              fill
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right Editorial Story Info (40% width) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#77736E] font-medium block">
              FEATURED STORY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal group-hover:text-[#A18A70] transition-colors leading-[1.12]">
              The Season of<br />
              Refinement
            </h2>
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed max-w-md pt-1 pb-2">
              Transitional layers, enduring fabrics, and the quiet power of thoughtful design.
            </p>
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] group-hover:text-[#A18A70] transition-colors">
                <span>READ THE STORY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. EXPLORE THE JOURNAL: 4 CATEGORIES (FASHION, CULTURE...)   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="text-center pb-8 sm:pb-10">
          <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#171717] font-medium">
            EXPLORE THE JOURNAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Dark subtle overlay for readable white typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300" />
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-white/95 block">
                  {cat.title}
                </span>
                <p className="text-[11px] text-white/80 font-light leading-snug pt-1">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. THREE EDITORIAL STORIES GRID                              */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-20 border-b border-[#E9E6E0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {recentStories.map((story, idx) => (
            <Link
              key={idx}
              href={`/journal/${story.slug}`}
              className="group flex flex-col space-y-3"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE7DE] border border-[#E9E6E0]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#77736E] font-medium block">
                  {story.category}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#171717] font-normal group-hover:text-[#A18A70] transition-colors leading-snug">
                  {story.title}
                </h3>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#A18A70] font-medium block pt-0.5">
                  {story.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. THE SPRING EDIT BANNER                                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 border-b border-[#E9E6E0]">
        <div className="bg-[#F4F1EA] border border-[#E9E6E0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-3 sm:space-y-4">
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-tight">
              THE<br />
              SPRING EDIT
            </h2>
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
              A fresh perspective on seasonal dressing.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/the-seasonal-edit"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#171717] hover:text-[#A18A70] transition-colors group"
              >
                <span>EXPLORE THE EDIT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7 relative h-[240px] sm:h-[300px] lg:h-[340px] w-full overflow-hidden bg-[#ECE7DE]">
            <Image
              src="/images/journal/journal-spring-edit.jpg"
              alt="VELORA The Spring Edit"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. STAY IN THE KNOW / NEWSLETTER BAR                         */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#171717] font-medium">
              STAY IN THE KNOW
            </h3>
            <p className="text-xs text-[#77736E] font-light">
              Subscribe for new stories, collection previews and exclusive updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={subscribed}
              className="bg-transparent border border-[#DED8CF] px-4 py-2.5 text-xs text-[#171717] placeholder-[#A8A29E] focus:outline-none focus:border-[#171717] w-full sm:w-72"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="bg-[#171717] hover:bg-[#A18A70] text-white px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 shrink-0 inline-flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-3 h-3 text-[#C2A888]" />
                  <span>SUBSCRIBED</span>
                </>
              ) : (
                <span>SUBSCRIBE</span>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
