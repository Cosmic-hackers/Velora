import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { StoreService } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const allProducts = StoreService.getProducts();
  const collections = StoreService.getCollections();

  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[88vh] min-h-[640px] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[#171717]">
          <Image
            src="https://images.unsplash.com/photo-1544923246-77307dd654cb?q=85&w=2000&auto=format&fit=crop"
            alt="VELORA Luxury Editorial"
            fill
            priority
            className="object-cover object-top opacity-90 scale-105 transition-transform duration-1000"
          />
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#C2A888] font-semibold bg-[#171717]/40 px-3.5 py-1.5 backdrop-blur-md border border-[#C2A888]/30">
              <Sparkles className="w-3 h-3 text-[#C2A888]" />
              <span>Autumn / Winter Solstice Édition</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]">
              LESS, BUT BETTER.
            </h1>

            <p className="text-sm sm:text-base text-[#D4CDC3] font-light tracking-wide max-w-lg leading-relaxed">
              Thoughtfully selected pieces. Designed to stay. Archival double-faced cashmere,
              monumental outerwear and sculpted Italian suiting.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/shop"
                className="btn-luxury bg-white text-[#171717] hover:bg-[#9B8065] hover:text-white px-8 py-4 text-xs font-semibold"
              >
                Explore Collection
              </Link>
              <Link
                href="/shop?tag=new-arrivals"
                className="btn-luxury border border-white/70 text-white hover:bg-white hover:text-[#171717] px-8 py-4 text-xs font-medium backdrop-blur-sm"
              >
                Discover New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
              The Three Pillars
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
              Curated Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#9B8065] transition-colors"
          >
            <span>View All Chapters</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative flex flex-col overflow-hidden bg-[#FAF7F2] border border-[#DED8CF]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE4D9]">
                <Image
                  src={col.imageUrl}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white space-y-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C2A888] font-medium">
                    Archive Vol. I
                  </span>
                  <h3 className="font-editorial text-2xl font-normal tracking-wide text-white">
                    {col.name}
                  </h3>
                  <p className="text-xs text-[#D8D2C7] font-light line-clamp-2">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/90 group-hover:text-[#C2A888] pt-1">
                    Discover Collection <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS CAROUSEL/GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
              Seasonal Releases
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?tag=new-arrivals"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#9B8065] transition-colors"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* 4. BRAND PHILOSOPHY BANNER */}
      <section className="bg-[#FAF7F2] border-y border-[#DED8CF] py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#9B8065] font-semibold block">
            The Velora Manifesto
          </span>
          <blockquote className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#171717] font-normal leading-snug">
            &ldquo;Style is not about having more. It&apos;s about choosing better.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-[#77716A] font-light max-w-xl mx-auto leading-relaxed pt-2">
            In an era of fleeting trends and artificial urgency, VELORA designs clothing that
            survives the season. We create foundational garments cut from pure natural materials,
            shaped with architectural restraint, and assembled by master craftspeople across Biella,
            Kojima and Florence.
          </p>
          <div className="pt-6">
            <Link href="/about" className="btn-secondary text-xs">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED ATELIER PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
              Essential Portfolio
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
              Featured Creations
            </h2>
          </div>
          <Link
            href="/shop"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#9B8065] transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. EDITORIAL IMMERSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#171717]">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=2000&auto=format&fit=crop"
            alt="VELORA Seasonal Lookbook"
            fill
            className="object-cover object-center opacity-85"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="max-w-xl space-y-4 text-white">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C2A888] font-semibold">
                Lookbook Issue 04
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
                Quiet Monochromes.
              </h2>
              <p className="text-xs sm:text-sm text-[#E2DCD5] font-light max-w-md mx-auto">
                Explore the interplay between heavy tactile wools and lightweight mulberry silk.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/contemporary"
                  className="btn-luxury bg-white text-[#171717] hover:bg-[#9B8065] hover:text-white px-8 py-3.5 text-xs font-semibold inline-block"
                >
                  View Lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VALUE PROPOSITIONS & CLIENT PROMISES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-[#DED8CF]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065]">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-editorial text-base text-[#171717]">White Glove Concierge</h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Complimentary tracked courier delivery on orders above ₹5,000 with luxury protective dust bags.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-editorial text-base text-[#171717]">14-Day Complimentary Returns</h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Try in the comfort of your sanctuary. Hassle-free courier pickup arranged directly from your door.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#EFE9DE] text-[#9B8065]">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-editorial text-base text-[#171717]">Archival Longevity</h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Crafted from certified Australian merino, Grade-A Mongolian cashmere and Japanese selvedge denim.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

