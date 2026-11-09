export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  details: string[];
  price: number; // in INR / base units (e.g., 18500 = ₹18,500)
  salePrice?: number | null;
  categoryId: string;
  categoryName?: string;
  collectionId: string;
  collectionName?: string;
  gender: 'men' | 'women' | 'unisex';
  sizes: string[];
  colors: ColorOption[];
  images: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isPublished: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    addressLine: string;
    apartmentSuite?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'return_requested' | 'returned';
  trackingNumber?: string;
  trackingCarrier?: string;
  cancellationReason?: string;
  returnReason?: string;
  createdAt: string;
  items: OrderItem[];
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Outerwear & Coats",
    slug: "outerwear",
    description: "Architectural trench coats, double-faced cashmere overcoats and tailored wool bombers.",
    imageUrl: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 1,
  },
  {
    id: "cat-2",
    name: "Tailoring & Suiting",
    slug: "tailoring",
    description: "Sculpted Italian wool blazers, relaxed double-breasted jackets and pleat-front trousers.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 2,
  },
  {
    id: "cat-3",
    name: "Knitwear & Cashmere",
    slug: "knitwear",
    description: "Grade-A Mongolian cashmere turtlenecks, heavy ribbed sweaters and featherlight silk-wool knits.",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 3,
  },
  {
    id: "cat-4",
    name: "Minimal Essentials",
    slug: "essentials",
    description: "Supima cotton tailored t-shirts, poplin studio shirts and draped silk trousers.",
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 4,
  },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    name: "The Essentials",
    slug: "essentials",
    description: "Foundational garments stripped of ornament. Pure proportions, archival fabrics, forever relevance.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1400&auto=format&fit=crop",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "col-2",
    name: "Modern Tailoring",
    slug: "modern-tailoring",
    description: "Architectural shoulders, sharp lapels and fluid double reverse pleats in pure Italian wool.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1400&auto=format&fit=crop",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: "col-3",
    name: "Signature Silhouettes",
    slug: "signature-silhouettes",
    description: "Monolithic double-faced cashmere overcoats and bias-cut mulberry silk gowns.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=1400&auto=format&fit=crop",
    isFeatured: true,
    displayOrder: 3,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-0",
    name: "The Roth Trench",
    slug: "the-roth-trench",
    sku: "VEL-TRN-000",
    description: "The definitive hero of the campaign. Crafted from water-repellent structured cotton twill with dramatic oversized notched lapels, contrast black collar facing, deep raglan sleeves, and a belted waist designed to elongate the silhouette.",
    details: [
      "Water-repellent structured Italian cotton-blend twill",
      "Dramatic architectural contrast collar and storm flaps",
      "Signature long raglan sleeves with adjustable buckle cuffs",
      "Wide fabric sash belt with leather wrapped buckle",
      "Rear center storm shield with inverted box pleat",
      "Pure cupro lining for fluid layering",
      "Crafted in Milan, Italy",
    ],
    price: 48500,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-2",
    collectionName: "Modern Tailoring",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Beige", hex: "#C2A888" },
    ],
    images: [
      "/images/hero/campaign-clean.jpg",
      "/images/hero/campaign-left-portrait.jpg",
      "/images/hero/campaign-right-stride.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 24,
    createdAt: "2024-11-01T08:00:00Z",
  },
  {
    id: "prod-1",
    name: "Double-Faced Wool Atelier Coat",
    slug: "double-faced-wool-atelier-coat",
    sku: "VEL-COAT-001",
    description: "A monumental overcoat cut from custom unlined double-faced Australian merino wool. Hand-finished rolled lapels, deep horn buttons, and a clean structural drop shoulder.",
    details: [
      "100% Australian Double-Faced Merino Wool (820 GSM)",
      "Completely hand-stitched borders and seamless edges",
      "Natural buffalo horn buttons with hand-wound shanks",
      "Internal chest passport pocket and silk-lined sleeves",
      "Dry clean only by luxury textile specialists",
      "Crafted in Biella, Italy",
    ],
    price: 48500,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oat Camel", hex: "#C2A888" },
      { name: "Charcoal Noir", hex: "#222222" },
      { name: "Bone White", hex: "#EAE6DE" },
    ],
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: "2024-10-15T08:00:00Z",
  },
  {
    id: "prod-2",
    name: "Sculpted Cashmere Turtleneck",
    slug: "sculpted-cashmere-turtleneck",
    sku: "VEL-KNIT-002",
    description: "Knitted from 6-ply Mongolian cashmere with a high architectural neck that holds its shape. Balanced weight that delivers unmatched cloud-like softness.",
    details: [
      "100% Grade-A Mongolian Cashmere (15.5 micron fiber)",
      "Ribbed collar, cuffs and hem with shape-memory elastane thread",
      "Relaxed chest with tapered waistline",
      "Pill-resistant gauge spinning",
      "Made in Scotland",
    ],
    price: 24500,
    salePrice: 21900,
    categoryId: "cat-3",
    categoryName: "Knitwear & Cashmere",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Raw Cream", hex: "#F3ECE1" },
      { name: "Mocha Taupe", hex: "#8A7968" },
      { name: "Obsidian", hex: "#141414" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 32,
    createdAt: "2024-10-10T11:00:00Z",
  },
  {
    id: "prod-3",
    name: "Architectural Boxy Wool Blazer",
    slug: "architectural-boxy-wool-blazer",
    sku: "VEL-SUIT-003",
    description: "A gender-fluid silhouette defined by prominent shoulders, a sharp peak lapel and minimalist hidden horn buttons. Designed to be worn loose or cinched.",
    details: [
      "98% Virgin Wool, 2% Elastane for fluid drape",
      "Full Cupro breathable lining in contrast champagne",
      "Internal double jet pockets and chest welt pocket",
      "Structured canvassed chest piece",
      "Tailored in Portugal",
    ],
    price: 36000,
    salePrice: null,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Night Slate", hex: "#2B2E33" },
      { name: "Warm Ecru", hex: "#E7DFD3" },
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 14,
    createdAt: "2024-10-20T09:30:00Z",
  },
  {
    id: "prod-4",
    name: "Fluid Silk Pleated Trouser",
    slug: "fluid-silk-pleated-trouser",
    sku: "VEL-PANT-004",
    description: "Deep double reverse pleats create a fluid column silhouette. Crafted from heavyweight silk twill that floats effortlessly as you move.",
    details: [
      "70% Mulberry Silk, 30% Fine Worsted Wool",
      "High-rise with tab-fastening extension waistband",
      "Concealed mother-of-pearl fly buttons",
      "Unfinished hems ready for custom tailoring",
      "Made in France",
    ],
    price: 28000,
    salePrice: null,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dune Sand", hex: "#D4C7B5" },
      { name: "Deep Espresso", hex: "#322722" },
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    rating: 4.7,
    reviewCount: 9,
    createdAt: "2024-10-18T14:15:00Z",
  },
  {
    id: "prod-5",
    name: "Raw Organic Cotton Studio Shirt",
    slug: "raw-organic-cotton-studio-shirt",
    sku: "VEL-SHIRT-005",
    description: "An oversized artist shirt tailored from crisp 160 GSM organic GOTS-certified Egyptian poplin. Clean point collar and extended cuff details.",
    details: [
      "100% GOTS-Certified Egyptian Long-Staple Cotton",
      "Natural smoked river shell buttons",
      "Floating back pleat for uninhibited movement",
      "Curved hemline designed for both tucked and untucked styling",
      "Pre-washed to eliminate shrinkage",
    ],
    price: 16500,
    salePrice: 14500,
    categoryId: "cat-4",
    categoryName: "Minimal Essentials",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Chalk White", hex: "#FAF8F5" },
      { name: "Pale Sky", hex: "#D0D9DE" },
    ],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 27,
    createdAt: "2024-09-25T10:00:00Z",
  },
  {
    id: "prod-6",
    name: "Structured Trench Coat with Storm Shield",
    slug: "structured-trench-coat-storm-shield",
    sku: "VEL-COAT-006",
    description: "A reimagining of the heritage military trench coat. Cut with an exaggerated storm flap, deep gunmetal D-rings, and heavy water-resistant gabardine.",
    details: [
      "100% High-Density Cotton Gabardine (Water Repellent)",
      "Detachable self-fabric belt with leather-wrapped buckle",
      "Deep storm flap and raglan sleeve construction",
      "Internal check wool liner buttoned into place",
      "Handmade in England",
    ],
    price: 52000,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Warm Honey", hex: "#C7A775" },
      { name: "Dark Olive", hex: "#3B4034" },
    ],
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 21,
    createdAt: "2024-10-22T13:00:00Z",
  },
  {
    id: "prod-7",
    name: "Heavy Ribbed Cashmere Crewneck",
    slug: "heavy-ribbed-cashmere-crewneck",
    sku: "VEL-KNIT-007",
    description: "Chunky 8-ply rib stitch engineered for warmth with a featherweight presence. Raglan shoulders deliver a modern relaxed shoulder line.",
    details: [
      "100% Sustainable Cashmere from Inner Mongolia",
      "Wide rib gauge neck and cuffs",
      "Relaxed contemporary drape",
      "Zero dyes on natural ecru variant",
    ],
    price: 29500,
    salePrice: null,
    categoryId: "cat-3",
    categoryName: "Knitwear & Cashmere",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Alabaster", hex: "#EDE8DF" },
      { name: "Deep Forest", hex: "#233328" },
      { name: "Charcoal", hex: "#2A2A2A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 16,
    createdAt: "2024-10-24T16:00:00Z",
  },
  {
    id: "prod-8",
    name: "Minimalist Italian Wool Chesterfield Coat",
    slug: "minimalist-italian-wool-chesterfield-coat",
    sku: "VEL-COAT-008",
    description: "Streamlined single-breasted overcoat engineered for clean lines. Covered fly front, flap pockets that can be tucked in for a jet look, and rear vent.",
    details: [
      "100% Virgin Wool Melange (Loro Piana Mills)",
      "Concealed horn button front fastening",
      "Silk blend full lining",
      "Calf-length cut for editorial elegance",
    ],
    price: 54000,
    salePrice: 48900,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Navy", hex: "#1A2238" },
      { name: "Heather Taupe", hex: "#8A7E73" },
    ],
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 29,
    createdAt: "2024-09-12T07:45:00Z",
  },
  {
    id: "prod-9",
    name: "Draped Asymmetric Silk Midi Dress",
    slug: "draped-asymmetric-silk-midi-dress",
    sku: "VEL-DRESS-009",
    description: "An ethereal statement piece featuring a diagonal gathered neckline and a bias-cut body that contours gracefully without constricting.",
    details: [
      "100% Heavy Mulberry Silk Charmeuse (22 Momme)",
      "Seamless raw-edge hem",
      "Hidden side zip closure",
      "Lined with pure silk georgette",
      "Crafted in Milan",
    ],
    price: 38000,
    salePrice: null,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne Pearl", hex: "#E9DFCF" },
      { name: "Onyx Black", hex: "#111111" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 11,
    createdAt: "2024-10-28T12:00:00Z",
  },
  {
    id: "prod-10",
    name: "Heavy Supima Cotton T-Shirt",
    slug: "heavy-supima-cotton-t-shirt",
    sku: "VEL-TEE-010",
    description: "The definitive luxury t-shirt. Dense 260 GSM American long-staple Supima cotton with a compact rib collar that never sags.",
    details: [
      "100% American Extra-Long Staple Supima Cotton",
      "Double-stitched micro hems",
      "Pre-shrunk and silicone washed for immediate velvet hand-feel",
      "Side splits for graceful waist break",
    ],
    price: 6500,
    salePrice: null,
    categoryId: "cat-4",
    categoryName: "Minimal Essentials",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Washed Black", hex: "#222224" },
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Desert Sand", hex: "#D6C7B2" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 4.8,
    reviewCount: 45,
    createdAt: "2024-08-15T09:00:00Z",
  },
  {
    id: "prod-11",
    name: "Pleated Wide-Leg Wool Trousers",
    slug: "pleated-wide-leg-wool-trousers",
    sku: "VEL-PANT-011",
    description: "Exquisitely tailored high-waisted trousers with razor-sharp forward pleats and a relaxed pool at the ankle. Pairs seamlessly with tailored blazers or fine knitwear.",
    details: [
      "100% Super 120s High-Twist Wool",
      "Side buckle waist adjusters",
      "Deep slash pockets and rear besom pockets",
      "Breathable year-round weight",
    ],
    price: 26000,
    salePrice: null,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Melange", hex: "#383838" },
      { name: "Caramel Brown", hex: "#876445" },
    ],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 19,
    createdAt: "2024-10-14T11:20:00Z",
  },
  {
    id: "prod-12",
    name: "Cocoon Wool & Cashmere Wrap Cardigan",
    slug: "cocoon-wool-cashmere-wrap-cardigan",
    sku: "VEL-KNIT-012",
    description: "An enveloping kimono-inspired knit with broad draped lapels and an optional wide knit sash. Designed for effortless transitional layering.",
    details: [
      "70% Fine Merino, 30% Cashmere",
      "Seamless whole-garment 3D knitting technology",
      "Removable knitted tie belt",
      "Generous side patch pockets",
    ],
    price: 32000,
    salePrice: 28500,
    categoryId: "cat-3",
    categoryName: "Knitwear & Cashmere",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Oat Heather", hex: "#DCD5C9" },
      { name: "Smoky Anthracite", hex: "#35363A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 24,
    createdAt: "2024-09-30T15:10:00Z",
  },
  {
    id: "prod-13",
    name: "Minimalist Leather Field Jacket",
    slug: "minimalist-leather-field-jacket",
    sku: "VEL-JACKET-013",
    description: "Supple full-grain Italian lambskin tailored into an elevated utility silhouette. Two-way matte gunmetal zipper, concealed snaps and silk cupro lining.",
    details: [
      "100% Full-Grain Vegetable-Tanned Italian Nappa Lambskin",
      "Matte titanium RiRi double zippers",
      "Concealed waist drawstring for variable silhouette",
      "Handcrafted in Florence, Italy",
    ],
    price: 78000,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pitch Black", hex: "#161616" },
      { name: "Espresso Brown", hex: "#342217" },
    ],
    images: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 8,
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "prod-14",
    name: "Monochrome Poplin Oversized Blouse",
    slug: "monochrome-poplin-oversized-blouse",
    sku: "VEL-BLOUSE-014",
    description: "An architectural study in volume. Features elongated French cuffs, an inverted box pleat at the spine and a sculptural stand collar.",
    details: [
      "100% Organic Pima Cotton Crisp Weave",
      "Mother-of-pearl buttons with concealed placket",
      "Side step hem with subtle reinforcement gussets",
    ],
    price: 18500,
    salePrice: null,
    categoryId: "cat-4",
    categoryName: "Minimal Essentials",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Soft Sage", hex: "#C5CCC3" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 4.7,
    reviewCount: 15,
    createdAt: "2024-09-18T14:00:00Z",
  },
  {
    id: "prod-15",
    name: "Single-Breasted Raw Wool Suit Jacket",
    slug: "single-breasted-raw-wool-suit-jacket",
    sku: "VEL-SUIT-015",
    description: "Tailored from undyed virgin wool with a subtle organic slub texture. Unpadded shoulders allow the jacket to mould directly to the wearer's body.",
    details: [
      "100% Undyed Virgin Wool",
      "Half-canvas chest construction",
      "Barchetta curved breast pocket",
      "Working cuff buttonholes",
    ],
    price: 42000,
    salePrice: 38000,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Flax Tweed", hex: "#B8AC9C" },
      { name: "Ink Navy", hex: "#1C2430" },
    ],
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 22,
    createdAt: "2024-09-05T08:30:00Z",
  },
  {
    id: "prod-16",
    name: "Seamless Merino Wool Mock Neck",
    slug: "seamless-merino-wool-mock-neck",
    sku: "VEL-KNIT-016",
    description: "Ultra-fine 18.5-micron Australian merino wool spun into a second-skin knit. Zero friction points, high breathability, thermal perfection.",
    details: [
      "100% Extra-Fine Merino Wool",
      "Tubular seamless construction",
      "2.5 inch clean stand mock neck",
      "Naturally anti-odor and temperature-regulating",
    ],
    price: 14500,
    salePrice: null,
    categoryId: "cat-3",
    categoryName: "Knitwear & Cashmere",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Basalt Black", hex: "#1D1D1F" },
      { name: "Warm Greige", hex: "#D7CFC5" },
      { name: "Navy Ink", hex: "#1B2232" },
    ],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 19,
    createdAt: "2024-10-26T17:00:00Z",
  },
  {
    id: "prod-17",
    name: "Architectural Trench Cape",
    slug: "architectural-trench-cape",
    sku: "VEL-COAT-017",
    description: "A dramatic fusion of a classical military cape and a tailored trench. Fluid storm flap, high funnel neckline and concealed arm slits.",
    details: [
      "Cotton & Silk Bonded Waterproof Twill",
      "High funnel collar with double buckle strap",
      "Concealed snap side closures for arm movement",
      "Hand-finished interior seams",
    ],
    price: 46000,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sandstone", hex: "#DFD7CA" },
      { name: "Kohl", hex: "#1F1F1F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 12,
    createdAt: "2024-11-02T11:00:00Z",
  },
  {
    id: "prod-18",
    name: "Raw Denim Selvedge Trouser",
    slug: "raw-denim-selvedge-trouser",
    sku: "VEL-DENIM-018",
    description: "14oz Japanese Kurabo Mills shuttle-loom selvedge denim. Deep indigo dye with clean tonal stitching and a relaxed straight leg.",
    details: [
      "100% Japanese Kurabo Ring-Spun Cotton Selvedge Denim",
      "Custom solid brass doughnut button fly",
      "White and red selvedge ID line",
      "Hidden back pocket rivets",
      "Woven in Kojima, Okayama",
    ],
    price: 22000,
    salePrice: null,
    categoryId: "cat-4",
    categoryName: "Minimal Essentials",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Indigo", hex: "#1C2D4A" },
      { name: "Solid Black", hex: "#191919" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 4.7,
    reviewCount: 31,
    createdAt: "2024-08-20T10:15:00Z",
  },
  {
    id: "prod-19",
    name: "Featherlight Silk-Cashmere Scarf",
    slug: "featherlight-silk-cashmere-scarf",
    sku: "VEL-ACC-019",
    description: "An airy 200cm x 100cm wrap woven from 70% Mongolian Cashmere and 30% Mulberry Silk. Delicate eyelash fringe borders.",
    details: [
      "70% Cashmere, 30% Mulberry Silk",
      "Hand-frayed eyelash edging",
      "Ultralight gauge yet astonishingly warm",
      "Includes protective archival canvas pouch",
    ],
    price: 12500,
    salePrice: 10900,
    categoryId: "cat-3",
    categoryName: "Knitwear & Cashmere",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Natural Ivory", hex: "#F7F3EB" },
      { name: "Dove Grey", hex: "#BCB6AC" },
      { name: "Warm Charcoal", hex: "#373737" },
    ],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 38,
    createdAt: "2024-07-15T09:00:00Z",
  },
  {
    id: "prod-20",
    name: "Sculpted Peplum Silk Vest",
    slug: "sculpted-peplum-silk-vest",
    sku: "VEL-VEST-020",
    description: "A tailored waist waistcoat with a modern elongated front line and boned side panels that gently contour the waistline.",
    details: [
      "100% Heavy Duchess Silk Satin",
      "Horn button front closure",
      "Full internal cotton batiste lining",
      "Adjustable back cinch strap",
    ],
    price: 21000,
    salePrice: null,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight Black", hex: "#111111" },
      { name: "Oat Beige", hex: "#D6CCC2" },
    ],
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 7,
    createdAt: "2024-10-30T14:30:00Z",
  },
  {
    id: "prod-21",
    name: "Double-Breasted Wool Peacoat",
    slug: "double-breasted-wool-peacoat",
    sku: "VEL-COAT-021",
    description: "Substantial 32oz Melton wool cut in a classic naval crop with modern oversized peak lapels and hand-warmer vertical welt pockets.",
    details: [
      "100% Pure Virgin Melton Wool",
      "Custom engraved anchor-free horn buttons",
      "Quilted Bemberg thermal lining",
      "Storm collar latch under lapel",
    ],
    price: 44000,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-3",
    collectionName: "Timeless Classics",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Dark Navy", hex: "#161D2B" },
      { name: "Slate Charcoal", hex: "#2E3033" },
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 17,
    createdAt: "2024-09-10T12:00:00Z",
  },
  {
    id: "prod-22",
    name: "Linen-Blend Relaxed Resort Blazer",
    slug: "linen-blend-relaxed-resort-blazer",
    sku: "VEL-SUIT-022",
    description: "An unconstructed jacket cut from an airy blend of Irish linen and fine virgin wool that breathes effortlessly in warm climates.",
    details: [
      "55% Irish Linen, 45% High-Twist Wool",
      "Completely unlined with clean French seams",
      "Patch hip pockets and ticket pocket",
      "Non-functional surgeon cuffs for easy alteration",
    ],
    price: 34000,
    salePrice: 29900,
    categoryId: "cat-2",
    categoryName: "Tailoring & Suiting",
    collectionId: "col-1",
    collectionName: "Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural Ecru", hex: "#EBE3D7" },
      { name: "Olive Leaf", hex: "#4A4D41" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
    rating: 4.8,
    reviewCount: 23,
    createdAt: "2024-08-05T10:00:00Z",
  },
  {
    id: "prod-23",
    name: "Bias-Cut Satin Maxi Skirt",
    slug: "bias-cut-satin-maxi-skirt",
    sku: "VEL-SKIRT-023",
    description: "Cut on the true 45-degree bias from heavyweight hammered silk satin to hug curves and skim effortlessly across the lower leg.",
    details: [
      "100% Hammered Silk Satin (Heavy weight)",
      "Concealed elastic waistband for all-day comfort",
      "Delicate micro-baby hem",
      "Ankle-skimming length",
    ],
    price: 23500,
    salePrice: null,
    categoryId: "cat-4",
    categoryName: "Minimal Essentials",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Smoky Quartz", hex: "#756A63" },
      { name: "Almond Cream", hex: "#EFE7DC" },
      { name: "Raven", hex: "#121212" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 28,
    createdAt: "2024-09-22T13:45:00Z",
  },
  {
    id: "prod-24",
    name: "Architectural Wool Bomber Jacket",
    slug: "architectural-wool-bomber-jacket",
    sku: "VEL-JACKET-024",
    description: "A refined interpretation of the flight jacket. Smooth wool felt outer, minimal concealed zip closure and dense tonal ribbing.",
    details: [
      "100% Melton Wool Felt",
      "100% Cotton Moleskin pocket linings for comfort",
      "Matte black two-way two-tone zipper",
      "Internal chest welt pocket with button tab",
    ],
    price: 39000,
    salePrice: null,
    categoryId: "cat-1",
    categoryName: "Outerwear & Coats",
    collectionId: "col-2",
    collectionName: "Contemporary",
    gender: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Soot Grey", hex: "#323336" },
      { name: "Camel", hex: "#A88764" },
    ],
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 15,
    createdAt: "2024-11-03T16:00:00Z",
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "VELORA10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 5000,
    maxDiscount: 10000,
    usageLimit: 1000,
    timesUsed: 42,
    isActive: true,
    expiresAt: "2026-12-31T23:59:59Z",
  },
  {
    id: "coup-2",
    code: "LUXURY50",
    discountType: "fixed",
    discountValue: 5000,
    minOrderValue: 25000,
    usageLimit: 500,
    timesUsed: 19,
    isActive: true,
    expiresAt: "2026-12-31T23:59:59Z",
  },
  {
    id: "coup-3",
    code: "FIRSTORDER",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 8000,
    maxDiscount: 7500,
    usageLimit: 2000,
    timesUsed: 108,
    isActive: true,
    expiresAt: "2026-12-31T23:59:59Z",
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "usr-1",
    userName: "Elena Rostova",
    rating: 5,
    title: "An archival masterpiece",
    comment: "The drape of this double-faced wool coat is unmatched. The lack of lining gives it an effortless fluidity, and the hand-stitched borders are sublime.",
    isVerifiedPurchase: true,
    status: "approved",
    createdAt: "2024-10-25T14:22:00Z",
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userId: "usr-2",
    userName: "Marcus Vance",
    rating: 5,
    title: "Supreme craftsmanship",
    comment: "Comparable to the finest heritage houses on Savile Row. Warm, commanding silhouette without feeling heavy.",
    isVerifiedPurchase: true,
    status: "approved",
    createdAt: "2024-10-28T09:15:00Z",
  },
  {
    id: "rev-3",
    productId: "prod-2",
    userId: "usr-3",
    userName: "Sophia Chen",
    rating: 5,
    title: "Cloud-like soft cashmere",
    comment: "The turtleneck collar actually stays upright without sagging throughout the evening. Truly elevated minimalism.",
    isVerifiedPurchase: true,
    status: "approved",
    createdAt: "2024-10-29T18:40:00Z",
  },
  {
    id: "rev-4",
    productId: "prod-3",
    userId: "usr-4",
    userName: "Alexander Wright",
    rating: 5,
    title: "Sharply tailored perfection",
    comment: "The peak lapels and slight box cut give this blazer a modern cinematic presence. Fits true to size with room for layering.",
    isVerifiedPurchase: true,
    status: "approved",
    createdAt: "2024-10-31T11:05:00Z",
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "VEL-24-8901",
    userId: "demo-cust-1",
    customerName: "Claire DeWitt",
    customerEmail: "claire.dewitt@example.com",
    customerPhone: "+91 98765 43210",
    shippingAddress: {
      addressLine: "Apt 14B, Oberoi Sky Heights, Worli",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400018",
      country: "India",
    },
    subtotal: 48500,
    discount: 4850,
    shippingCost: 0,
    totalAmount: 43650,
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "shipped",
    trackingNumber: "VEL-EXP-9921443",
    trackingCarrier: "Velora White Glove Express",
    createdAt: "2024-11-04T10:15:00Z",
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productName: "Double-Faced Wool Atelier Coat",
        price: 48500,
        quantity: 1,
        size: "M",
        color: "Oat Camel",
        imageUrl: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ord-1002",
    orderNumber: "VEL-24-8902",
    userId: "demo-cust-2",
    customerName: "Julian Sterling",
    customerEmail: "julian.sterling@example.com",
    customerPhone: "+91 91234 56789",
    shippingAddress: {
      addressLine: "Villa 4, Palm Boulevard, Golf Links",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110003",
      country: "India",
    },
    subtotal: 60500,
    discount: 5000,
    shippingCost: 0,
    totalAmount: 55500,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "processing",
    trackingNumber: "VEL-EXP-9921444",
    trackingCarrier: "Velora White Glove Express",
    createdAt: "2024-11-05T14:30:00Z",
    items: [
      {
        id: "item-2",
        productId: "prod-3",
        productName: "Architectural Boxy Wool Blazer",
        price: 36000,
        quantity: 1,
        size: "L",
        color: "Night Slate",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "item-3",
        productId: "prod-2",
        productName: "Sculpted Cashmere Turtleneck",
        price: 24500,
        quantity: 1,
        size: "M",
        color: "Obsidian",
        imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ord-1003",
    orderNumber: "VEL-24-8903",
    userId: "demo-cust-3",
    customerName: "Aria Thorne",
    customerEmail: "aria.thorne@example.com",
    customerPhone: "+91 98450 11223",
    shippingAddress: {
      addressLine: "Penthouse 6, Lavelle Heights, Lavelle Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    subtotal: 38000,
    discount: 0,
    shippingCost: 0,
    totalAmount: 38000,
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "delivered",
    trackingNumber: "VEL-EXP-9921441",
    trackingCarrier: "Velora White Glove Express",
    createdAt: "2024-11-01T09:00:00Z",
    items: [
      {
        id: "item-4",
        productId: "prod-9",
        productName: "Draped Asymmetric Silk Midi Dress",
        price: 38000,
        quantity: 1,
        size: "S",
        color: "Champagne Pearl",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
];

export const STORE_SETTINGS = {
  storeName: "VELORA",
  tagline: "Wear less. Mean more.",
  currencySymbol: "₹",
  currencyCode: "INR",
  contactEmail: "concierge@velora-couture.com",
  contactPhone: "+91 (0) 22 8490 2200",
  address: "VELORA Maison, 14 Rue Royale & High Street Phoenix, Mumbai 400013",
  freeShippingThreshold: 5000,
  defaultShippingCost: 500,
  heroCampaignStyle: "campaign_diptych" as "campaign_diptych" | "editorial_split" | "campaign_portrait",
  socialLinks: {
    instagram: "https://instagram.com/velora",
    pinterest: "https://pinterest.com/velora",
    twitter: "https://twitter.com/velora",
  },
};

