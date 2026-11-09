"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  Plus,
  Minus,
  Ruler,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { StoreService } from "@/lib/store";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = StoreService.getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("details");

  // Track recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    StoreService.recordProductView(product.id);
    setRecentlyViewed(StoreService.getRecentlyViewed(product.id));
  }, [product.id]);

  // Review submission state
  const [reviews, setReviews] = useState(StoreService.getReviews(product.id));
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const effectivePrice = product.salePrice ?? product.price;

  // Curated complete-the-look pairings
  const completeTheLookProducts = (product.completeLookProductIds || [])
    .map((id) => StoreService.getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Related products from same category/department
  const relatedProducts = StoreService.getProducts()
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 400);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = StoreService.addReview({
      productId: product.id,
      userId: "guest-or-client",
      userName: reviewName,
      rating: reviewRating,
      title: reviewTitle || "Verified Client Review",
      comment: reviewComment,
      isVerifiedPurchase: true,
    });

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewName("");
      setReviewTitle("");
      setReviewComment("");
    }, 1800);
  };

  return (
    <div className="w-full bg-[#F8F7F4] text-[#171717] min-h-screen">
      {/* Schema.org JSON-LD Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: "VELORA",
            },
            offers: {
              "@type": "Offer",
              url: `https://velora-couture.com/product/${product.slug}`,
              priceCurrency: "INR",
              price: effectivePrice,
              priceValidUntil: "2026-12-31",
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "VELORA",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: Math.max(product.reviewCount, reviews.length),
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-[10px] tracking-[0.25em] uppercase text-[#77736E] flex items-center gap-2">
          <Link href="/" className="hover:text-[#171717]">MAISON</Link>
          <span>/</span>
          <Link href={`/shop?department=${product.department || product.gender}`} className="hover:text-[#171717]">
            {(product.department || product.gender).toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-[#171717] font-medium">{product.name}</span>
        </nav>

        {/* 2-Column Editorial Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Multi-Image Gallery with Vertical Thumbnails & Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-22 sm:w-20 sm:h-28 flex-shrink-0 bg-[#EAE4D9] border transition-all ${
                      selectedImage === idx
                        ? "border-[#171717] ring-1 ring-[#171717]"
                        : "border-[#E9E6E0] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Steady Photographic Showcase (No zooming on cursor placement) */}
            <div className="relative flex-1 aspect-[3/4] bg-[#EAE4D9] border border-[#E9E6E0] overflow-hidden">
              <Image
                src={product.images[selectedImage] || product.images[0] || ""}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
                {product.isNewArrival && (
                  <span className="bg-[#FFFFFF]/90 text-[#171717] text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 font-medium border border-[#E9E6E0] backdrop-blur-sm">
                    NEW ARRIVAL
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#171717] text-white text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 font-medium">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 text-[9px] tracking-widest uppercase text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1 pointer-events-none">
                HOVER TO INSPECT TEXTILE
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Product Information & Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header: SKU, Title, Price, Rating */}
            <div className="space-y-3 pb-6 border-b border-[#E9E6E0]">
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#77736E]">
                <span>{product.sku}</span>
                <div className="flex items-center gap-1 text-[#A18A70]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-xs text-[#171717]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#77736E]">({reviews.length})</span>
                </div>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-mono text-[#171717]">
                  {formatPrice(effectivePrice)}
                </span>
                {product.salePrice && (
                  <span className="text-sm font-mono text-[#77736E] line-through font-light">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-[10px] tracking-widest text-[#77736E] uppercase">
                  COMPLIMENTARY SHIPPING
                </span>
              </div>
            </div>

            {/* Short Narrative */}
            <p className="text-xs sm:text-sm text-[#77736E] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="text-[#171717] font-medium text-[11px]">COLORWAY:</span>
                  <span className="text-[#77736E] text-[11px] font-mono">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (product.images[idx]) setSelectedImage(idx);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                        selectedColor === c.name
                          ? "border-[#171717] bg-white ring-1 ring-[#171717]"
                          : "border-[#E9E6E0] bg-[#FAF9F6] hover:border-[#171717]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[11px] tracking-wider uppercase">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide Modal Trigger */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="text-[#171717] font-medium text-[11px]">SELECT SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#A18A70] hover:text-[#171717] inline-flex items-center gap-1.5 text-xs transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="text-[11px] underline underline-offset-4">SIZE GUIDE & MEASUREMENTS</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-xs uppercase font-mono border text-center transition-all ${
                      selectedSize === sz
                        ? "border-[#171717] bg-[#171717] text-white"
                        : "border-[#E9E6E0] bg-white text-[#171717] hover:border-[#171717]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Counter & Primary CTA Bar */}
            <div className="space-y-4 pt-4 border-t border-[#E9E6E0]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E9E6E0] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#171717] hover:opacity-60 transition-opacity"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-medium text-[#171717]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#171717] hover:opacity-60 transition-opacity"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#171717] hover:bg-[#A18A70] text-white text-xs uppercase tracking-[0.25em] font-medium py-4 px-6 transition-all flex items-center justify-center gap-2 group"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG — {formatPrice(effectivePrice * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Heart Toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border transition-colors ${
                    isWishlisted
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-[#E9E6E0] bg-white text-[#171717] hover:border-[#171717]"
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Collapsible Accordion Tabs: Details, Fabric, Fit, Shipping */}
            <div className="border-t border-[#E9E6E0] divide-y divide-[#E9E6E0]">
              {/* Product Details */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "details" ? "" : "details")}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#171717]"
                >
                  <span>PRODUCT DETAILS & CRAFTSMANSHIP</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === "details" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "details" && (
                  <div className="pt-3 text-xs text-[#77736E] font-light leading-relaxed animate-fadeIn space-y-2">
                    <ul className="list-disc list-inside space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Materials & Care */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "care" ? "" : "care")}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#171717]"
                >
                  <span>MATERIALS & TEXTILE CARE</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === "care" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "care" && (
                  <div className="pt-3 text-xs text-[#77736E] font-light leading-relaxed animate-fadeIn space-y-1.5">
                    {product.fabricCare && product.fabricCare.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {product.fabricCare.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Pure natural fibers. Dry clean only by luxury textile specialists to preserve fabric memory.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Fit Information */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "fit" ? "" : "fit")}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#171717]"
                >
                  <span>FIT & SILHOUETTE GUIDANCE</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === "fit" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "fit" && (
                  <div className="pt-3 text-xs text-[#77736E] font-light leading-relaxed animate-fadeIn space-y-1.5">
                    {product.fitInfo && product.fitInfo.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {product.fitInfo.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Architectural cut designed for a relaxed editorial drape. Take your regular size.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "shipping" ? "" : "shipping")}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-[#171717]"
                >
                  <span>COMPLIMENTARY SHIPPING & RETURNS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="pt-3 text-xs text-[#77736E] font-light leading-relaxed animate-fadeIn space-y-2">
                    <p>• Complimentary express carbon-neutral courier across India and worldwide.</p>
                    <p>• Orders placed before 2 PM IST are dispatched on the same business day.</p>
                    <p>• 14-day complimentary returns on all unworn items with security seals intact.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Maison Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E9E6E0] text-[11px] text-[#77736E]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#171717]" />
                <span>Express Courier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#171717]" />
                <span>14-Day Return</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#171717]" />
                <span>Atelier Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLETE THE LOOK SECTION */}
        {completeTheLookProducts.length > 0 && (
          <div className="border-t border-[#E9E6E0] pt-16 space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium">
                EDITORIAL STYLING
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
                Complete The Look
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {completeTheLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED CLIENT REVIEWS SECTION */}
        <div className="border-t border-[#E9E6E0] pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium">
                CLIENT LEDGER
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] mt-1 font-normal">
                Verified Impressions ({reviews.length})
              </h3>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="border border-[#171717] bg-white text-[#171717] hover:bg-[#171717] hover:text-white transition-colors text-xs uppercase tracking-[0.2em] py-3 px-6"
            >
              Chronicle Your Impression
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#E9E6E0]">
              <p className="font-editorial text-lg text-[#77736E]">No impressions recorded yet.</p>
              <p className="text-xs text-[#77736E] mt-1">Be the first patron to chronicle your experience.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-white border border-[#E9E6E0] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-editorial text-base font-normal text-[#171717]">
                        {rev.title}
                      </h5>
                      <p className="text-xs text-[#77736E] font-light mt-0.5">
                        by <strong className="text-[#171717] font-medium">{rev.userName}</strong>
                        {rev.isVerifiedPurchase && (
                          <span className="ml-2 text-[9px] uppercase tracking-wider text-[#A18A70] bg-[#A18A70]/10 px-1.5 py-0.5">
                            Verified Patron
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex text-[#A18A70]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "fill-current" : "stroke-current text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#77736E] leading-relaxed font-light">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENTLY VIEWED PRODUCTS CAROUSEL */}
        {recentlyViewed.length > 0 && (
          <div className="border-t border-[#E9E6E0] pt-16 space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium">
                CLIENT ARCHIVE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
                Recently Viewed
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {recentlyViewed.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* COMPLEMENTARY RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#E9E6E0] pt-16 space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#77736E] font-medium">
                  ATELIER RECOMMENDATIONS
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal">
                  You May Also Admire
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-[0.2em] text-[#171717] hover:text-[#A18A70] flex items-center gap-1.5"
              >
                <span>EXPLORE ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        gender={product.gender}
      />

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-[#FAF9F6] p-8 border border-[#E9E6E0] shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#E9E6E0]">
              <h3 className="font-editorial text-2xl text-[#171717]">Chronicle Your Impression</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-xs uppercase tracking-wider text-[#77736E] hover:text-[#171717]"
              >
                Close
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-10 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-[#A18A70] mx-auto" />
                <h4 className="font-editorial text-xl text-[#171717]">Impression Recorded</h4>
                <p className="text-xs text-[#77736E]">Thank you for contributing to the VELORA chronicle.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Julian S."
                    className="w-full bg-white border border-[#E9E6E0] p-3 text-xs focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Atelier Rating
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#E9E6E0] p-3 text-xs focus:outline-none focus:border-[#171717]"
                  >
                    <option value={5}>5 Stars — Exquisite & Flawless</option>
                    <option value={4}>4 Stars — Commendable Tailoring</option>
                    <option value={3}>3 Stars — Satisfactory</option>
                    <option value={2}>2 Stars — Needs Refinement</option>
                    <option value={1}>1 Star — Substandard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. The drape exceeds all expectations"
                    className="w-full bg-white border border-[#E9E6E0] p-3 text-xs focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Detailed Impression
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Detail the fabric hand, fit contour, and tailoring nuances..."
                    className="w-full bg-white border border-[#E9E6E0] p-3 text-xs focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#171717] hover:bg-[#A18A70] text-white text-xs uppercase tracking-[0.2em] py-3.5 transition-colors font-medium"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
