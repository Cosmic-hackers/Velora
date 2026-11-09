"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { StoreService } from "@/lib/store";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";

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

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

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

  // Complementary recommendations
  const relatedProducts = StoreService.getProducts()
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
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

      {/* Breadcrumb */}
      <nav className="text-[11px] tracking-[0.2em] uppercase text-[#77716A] flex items-center gap-2">
        <Link href="/" className="hover:text-[#171717]">Maison</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#171717]">Collection</Link>
        <span>/</span>
        <span className="text-[#171717]">{product.name}</span>
      </nav>

      {/* Main Product Showcase: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery with Zoom / Thumbnails */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-22 sm:w-20 sm:h-28 flex-shrink-0 bg-[#EAE4D9] border transition-all ${
                    selectedImage === idx
                      ? "border-[#171717] ring-1 ring-[#171717]"
                      : "border-[#DED8CF] opacity-75 hover:opacity-100"
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

          {/* Main Featured Image */}
          <div className="relative flex-1 aspect-[3/4] bg-[#EAE4D9] border border-[#DED8CF] overflow-hidden group">
            <Image
              src={product.images[selectedImage] || product.images[0] || ""}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-crosshair"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#171717] text-white text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 font-medium">
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Narrative, Specs & Order Controls */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header Info */}
          <div className="space-y-2 border-b border-[#DED8CF] pb-6">
            <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#77716A]">
              <span>{product.sku}</span>
              <div className="flex items-center gap-1 text-[#9B8065]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-xs">{product.rating.toFixed(1)}</span>
                <span className="text-[#77716A]">({reviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-xl sm:text-2xl font-semibold text-[#171717]">
                {formatPrice(effectivePrice)}
              </span>
              {product.salePrice && (
                <span className="text-sm text-[#77716A] line-through font-light">
                  {formatPrice(product.price)}
                </span>
              )}
              <span className="text-[11px] tracking-wider text-[#77716A] uppercase">
                Taxes Included
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="text-[#171717] font-medium">Color:</span>
                <span className="text-[#77716A]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                      selectedColor === c.name
                        ? "border-[#171717] bg-white ring-1 ring-[#171717]"
                        : "border-[#DED8CF] bg-[#FAF7F2] hover:border-[#9B8065]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider">
              <span className="text-[#171717] font-medium">Select Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#9B8065] hover:underline inline-flex items-center gap-1 lowercase text-xs"
              >
                <Ruler className="w-3 h-3" />
                <span className="uppercase">Size Guide</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs uppercase tracking-wider font-medium border text-center transition-all ${
                    selectedSize === sz
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-[#DED8CF] bg-white text-[#171717] hover:border-[#9B8065]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#DED8CF]">
            <div className="flex gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#DED8CF] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#171717] hover:text-[#9B8065] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#171717] hover:text-[#9B8065] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-4 text-xs flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#9B8065]" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — {formatPrice(effectivePrice * quantity)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border transition-colors ${
                  isWishlisted
                    ? "border-[#171717] bg-[#171717] text-[#9B8065]"
                    : "border-[#DED8CF] bg-white text-[#171717] hover:text-[#9B8065]"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Details & Fabric Accordion / Specs */}
          {product.details && product.details.length > 0 && (
            <div className="p-5 bg-[#FAF7F2] border border-[#DED8CF] space-y-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#171717] block">
                Atelier Notes & Fabric Composition
              </span>
              <ul className="space-y-1.5 text-xs text-[#77716A] font-light list-disc list-inside">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Maison Assurances */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DED8CF] text-xs text-[#77716A]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#9B8065] flex-shrink-0" />
              <span>Complimentary Courier</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#9B8065] flex-shrink-0" />
              <span>14-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#9B8065] flex-shrink-0" />
              <span>100% Authentic Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Ratings Section */}
      <div className="border-t border-[#DED8CF] pt-16 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
              Client Testimonials
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] mt-1">
              Verified Client Impressions ({reviews.length})
            </h3>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="btn-secondary text-xs py-3 px-6"
          >
            Submit an Impression
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F2] border border-[#DED8CF]">
            <p className="font-editorial text-lg text-[#77716A]">No impressions submitted yet.</p>
            <p className="text-xs text-[#77716A] mt-1">Be the first client to chronicle your experience.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-[#FAF7F2] border border-[#DED8CF] space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-editorial text-base font-medium text-[#171717]">
                      {rev.title}
                    </h5>
                    <p className="text-xs text-[#77716A] font-light mt-0.5">
                      by <strong className="text-[#171717] font-medium">{rev.userName}</strong>
                      {rev.isVerifiedPurchase && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-[#9B8065] bg-[#9B8065]/10 px-1.5 py-0.5 rounded">
                          Verified Client
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex text-[#9B8065]">
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
                <p className="text-xs text-[#77716A] leading-relaxed font-light">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complementary Creations */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#DED8CF] pt-16 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
                Harmonious Pairings
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171717] mt-1">
                Complementary Pieces
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-[#171717] hover:text-[#9B8065]"
            >
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#DED8CF]">
              <h3 className="font-editorial text-2xl text-[#171717]">Atelier Size Proportions</h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-xs uppercase tracking-wider text-[#77716A] hover:text-[#171717]"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-[#77716A] leading-relaxed">
              VELORA garments are cut with architectural precision. If you prefer a tailored body contour,
              order true to size. For an editorial drape, take one size up.
            </p>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DED8CF] text-[#171717]">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest (cm)</th>
                  <th className="py-2">Waist (cm)</th>
                  <th className="py-2">Hips (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED8CF]/60 text-[#77716A]">
                <tr><td className="py-2 font-medium text-[#171717]">XS</td><td>84-88</td><td>66-70</td><td>90-94</td></tr>
                <tr><td className="py-2 font-medium text-[#171717]">S</td><td>89-93</td><td>71-75</td><td>95-99</td></tr>
                <tr><td className="py-2 font-medium text-[#171717]">M</td><td>94-98</td><td>76-80</td><td>100-104</td></tr>
                <tr><td className="py-2 font-medium text-[#171717]">L</td><td>99-104</td><td>81-86</td><td>105-110</td></tr>
                <tr><td className="py-2 font-medium text-[#171717]">XL</td><td>105-112</td><td>87-94</td><td>111-118</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-[#FAF7F2] p-8 border border-[#DED8CF] shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#DED8CF]">
              <h3 className="font-editorial text-2xl text-[#171717]">Write an Impression</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-xs uppercase tracking-wider text-[#77716A] hover:text-[#171717]"
              >
                Close
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-10 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-[#9B8065] mx-auto" />
                <h4 className="font-editorial text-xl text-[#171717]">Impression Recorded</h4>
                <p className="text-xs text-[#77716A]">Thank you for contributing to the VELORA chronicle.</p>
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
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setReviewRating(num)}
                        className={`p-2 border text-xs transition-colors ${
                          reviewRating >= num
                            ? "border-[#9B8065] bg-[#9B8065] text-white"
                            : "border-[#DED8CF] bg-white text-[#171717]"
                        }`}
                      >
                        ★ {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Masterful tailoring and weight"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1">
                    Impression & Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe the fabric drape, sizing, and tactile quality..."
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-3.5 text-xs">
                  Submit Impression
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

