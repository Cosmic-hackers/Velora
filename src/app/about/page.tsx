import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Feather } from "lucide-react";

export const metadata = {
  title: "The Maison Story & Philosophy — VELORA",
  description: "Wear less. Mean more. The architectural manifesto of VELORA Haute Garde-Robe.",
};

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="relative w-full h-[65vh] min-h-[460px] flex items-end overflow-hidden bg-[#171717]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=2000&auto=format&fit=crop"
          alt="VELORA Atelier Workroom"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C2A888] font-semibold">
              The Maison Manifesto
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal leading-tight">
              Wear less. Mean more.
            </h1>
            <p className="text-xs sm:text-sm text-[#D8D2C7] font-light leading-relaxed">
              Founded on the radical proposition that modern refinement requires reduction, not accumulation.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
          Architectural Minimalism
        </span>
        <blockquote className="font-editorial text-2xl sm:text-4xl text-[#171717] font-normal leading-relaxed">
          &ldquo;We design clothing that ceases to scream for attention, and instead commands quiet presence.&rdquo;
        </blockquote>
        <p className="text-xs sm:text-sm text-[#77716A] font-light leading-loose text-justify sm:text-center">
          In an era characterized by disposable trends and synthetic acceleration, VELORA operates
          on a counter-rhythm. Every garment begins with an archival silhouette — an unconstructed
          double-faced overcoat, an oversized artist poplin shirt, a razor-pleated wool trouser —
          stripped of decorative excess until only pure proportion remains.
        </p>
      </section>

      {/* Sourcing & Craftsmanship Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065] w-fit">
              <Feather className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-editorial text-xl text-[#171717]">Grade-A Mongolian Cashmere</h3>
            <p className="text-xs text-[#77716A] font-light leading-relaxed">
              Sourced exclusively from free-roaming nomadic herders in the Alashan region of Inner
              Mongolia. Our 15.5-micron fibers are comb-harvested ethically and spun at heritage Scottish mills.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065] w-fit">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-editorial text-xl text-[#171717]">Biella Virgin Wool Mills</h3>
            <p className="text-xs text-[#77716A] font-light leading-relaxed">
              Nestled at the foothills of the Italian Alps, our fabric partners utilize glacial mountain
              waters that yield an incomparable softness, creating double-faced virgin wools that drape with sculptural dignity.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-8 border border-[#DED8CF] space-y-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065] w-fit">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-editorial text-xl text-[#171717]">Kojima Shuttle-Loom Denim</h3>
            <p className="text-xs text-[#77716A] font-light leading-relaxed">
              Woven slowly on vintage 1950s Toyoda shuttle looms in Okayama, Japan. 14oz pure selvedge
              dyed in natural indigo that molds uniquely to the wearer&apos;s lifestyle over decades.
            </p>
          </div>
        </div>
      </section>

      {/* Atelier Photography Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] bg-[#EAE4D9] border border-[#DED8CF] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
              alt="Tailoring Masterpiece"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6 md:pl-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
              The Permanent Closet
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717]">
              Longevity as an Ethos
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
              We do not observe the conventional 52 micro-seasons of industrial retail. A VELORA garment
              introduced in October 2024 is deliberately engineered to remain harmonious with pieces introduced in 2030.
            </p>
            <div className="pt-2">
              <Link href="/shop" className="btn-primary text-xs py-3.5 px-8 inline-flex items-center gap-2">
                <span>Explore the Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

