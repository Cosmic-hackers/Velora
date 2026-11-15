export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  department?: 'women' | 'men' | 'accessories' | 'all';
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
  imageUrl?: string;
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
  fabricCare?: string[];
  fitInfo?: string[];
  price: number; // in INR / base units (e.g., 18500 = ₹18,500)
  salePrice?: number | null;
  categoryId: string;
  categoryName?: string;
  department?: 'women' | 'men' | 'accessories';
  collectionId: string;
  collectionName?: string;
  gender: 'men' | 'women' | 'unisex';
  sizes: string[];
  colors: ColorOption[];
  images: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;
  isPublished: boolean;
  rating: number;
  reviewCount: number;
  completeLookProductIds?: string[];
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
  // WOMEN DEPARTMENT
  {
    id: "cat-w-dresses",
    name: "Dresses",
    slug: "dresses",
    department: "women",
    description: "Fluid silk slip dresses, architectural poplin shirt dresses and column evening gowns.",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 1,
  },
  {
    id: "cat-w-tops",
    name: "Tops & Shirts",
    slug: "tops-shirts",
    department: "women",
    description: "Crisp oversized cotton poplin shirts, draped silk blouses and tailored minimalist tops.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 2,
  },
  {
    id: "cat-w-trousers",
    name: "Trousers",
    slug: "trousers",
    department: "women",
    description: "High-waisted double reverse pleat trousers, fluid silk wide-leg pants and tailored wool culottes.",
    imageUrl: "/images/catalog/pleated-silk-trousers.jpg",
    displayOrder: 3,
  },
  {
    id: "cat-w-outerwear",
    name: "Outerwear",
    slug: "outerwear",
    department: "women",
    description: "Architectural trench coats, double-faced wool overcoats and sculpted double-breasted blazers.",
    imageUrl: "/images/catalog/tailored-double-breasted-blazer.jpg",
    displayOrder: 4,
  },
  {
    id: "cat-w-knitwear",
    name: "Knitwear",
    slug: "knitwear",
    department: "women",
    description: "Grade-A Mongolian cashmere turtlenecks, featherweight silk-wool knits and brushed cardigans.",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 5,
  },
  {
    id: "cat-w-coords",
    name: "Co-ords",
    slug: "co-ords",
    department: "women",
    description: "Harmonious two-piece tailored ensembles and tonal knit coordinating sets.",
    imageUrl: "/images/catalog/tailored-double-breasted-blazer.jpg",
    displayOrder: 6,
  },
  {
    id: "cat-w-acc",
    name: "Accessories",
    slug: "women-accessories",
    department: "women",
    description: "Sculptural jewelry, handcrafted calfskin leather belts and minimalist silk foulards.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 7,
  },

  // MEN DEPARTMENT
  {
    id: "cat-m-shirts",
    name: "Shirts",
    slug: "men-shirts",
    department: "men",
    description: "Egyptian cotton studio shirts, band collar tunic shirts and refined poplin button-downs.",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 8,
  },
  {
    id: "cat-m-tshirts",
    name: "T-shirts",
    slug: "men-t-shirts",
    department: "men",
    description: "Heavyweight 280 GSM Supima cotton tailored crewnecks and mercerized minimal t-shirts.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 9,
  },
  {
    id: "cat-m-trousers",
    name: "Trousers",
    slug: "men-trousers",
    department: "men",
    description: "Relaxed tailored wool trousers, Japanese selvedge denim and pleated linen trousers.",
    imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 10,
  },
  {
    id: "cat-m-jackets",
    name: "Jackets",
    slug: "men-jackets",
    department: "men",
    description: "Structured cashmere minimal blousons, unstructured travel blazers and oversized coats.",
    imageUrl: "/images/catalog/mens-cashmere-blouson.jpg",
    displayOrder: 11,
  },
  {
    id: "cat-m-knitwear",
    name: "Knitwear",
    slug: "men-knitwear",
    department: "men",
    description: "English rib cashmere crewnecks, fine-gauge merino rollnecks and structured cardigans.",
    imageUrl: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 12,
  },
  {
    id: "cat-m-coords",
    name: "Co-ords",
    slug: "men-co-ords",
    department: "men",
    description: "Tailored jacket and trouser duos in matching Italian wool twill.",
    imageUrl: "/images/catalog/mens-cashmere-blouson.jpg",
    displayOrder: 13,
  },
  {
    id: "cat-m-acc",
    name: "Accessories",
    slug: "men-accessories",
    department: "men",
    description: "Full-grain leather card holders, woven leather belts and cashmere scarves.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 14,
  },

  // ACCESSORIES DEPARTMENT
  {
    id: "cat-a-bags",
    name: "Bags",
    slug: "bags",
    department: "accessories",
    description: "Architectural box calfskin totes, crescent shoulder bags and weekender luggage.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 15,
  },
  {
    id: "cat-a-belts",
    name: "Belts",
    slug: "belts",
    department: "accessories",
    description: "Vegetable-tanned leather belts with custom brushed brass and palladium hardware.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 16,
  },
  {
    id: "cat-a-footwear",
    name: "Footwear",
    slug: "footwear",
    department: "accessories",
    description: "Pointed glove-leather ankle boots, minimal leather loafers and clean studio slides.",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 17,
  },
  {
    id: "cat-a-jewellery",
    name: "Jewellery",
    slug: "jewellery",
    department: "accessories",
    description: "Sculptural molten silver ear cuffs, solid bronze bangles and minimal chain chokers.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 18,
  },
  {
    id: "cat-a-sunglasses",
    name: "Sunglasses",
    slug: "sunglasses",
    department: "accessories",
    description: "Beveled Japanese acetate eyewear with mineral glass polarized lenses.",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 19,
  },
  {
    id: "cat-a-hats",
    name: "Caps & Hats",
    slug: "caps-hats",
    department: "accessories",
    description: "Structured wool felt fedoras, brushed cashmere beanies and minimalist cotton caps.",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1200&auto=format&fit=crop",
    displayOrder: 20,
  },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    name: "The Essentials",
    slug: "the-essentials",
    description: "Foundational pieces for everyday living.",
    imageUrl: "/images/catalog/col-essentials-model.jpg",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "col-3",
    name: "The Signature Edit",
    slug: "the-signature-edit",
    description: "Distinctive silhouettes, timeless appeal.",
    imageUrl: "/images/catalog/col-signature-arch.jpg",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: "col-2",
    name: "The Seasonal Edit",
    slug: "the-seasonal-edit",
    description: "A refined take on the season.",
    imageUrl: "/images/catalog/col-seasonal-hills.jpg",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    id: "col-4",
    name: "The Monochrome Edit",
    slug: "the-monochrome-edit",
    description: "The power of timeless tones.",
    imageUrl: "/images/catalog/col-monochrome-drape.jpg",
    isFeatured: true,
    displayOrder: 4,
  },
  {
    id: "col-accessories",
    name: "The Accessories",
    slug: "the-accessories",
    description: "Finishing touches, thoughtfully designed.",
    imageUrl: "/images/catalog/col-accessories-bag.jpg",
    isFeatured: true,
    displayOrder: 5,
  },
  {
    id: "col-5",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest creations released from the VELORA Milan and Paris ateliers.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1400&auto=format&fit=crop",
    isFeatured: true,
    displayOrder: 6,
  },
  {
    id: "col-6",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Most coveted pieces chosen by clients worldwide for exceptional tailoring and enduring luxury.",
    imageUrl: "/images/catalog/tailored-double-breasted-blazer.jpg",
    isFeatured: true,
    displayOrder: 7,
  },
];

const ALL_INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-home-blazer",
    name: "Tailored Blazer",
    slug: "tailored-blazer",
    sku: "VEL-BLZ-749",
    description: "Tailored single-breasted blazer in a lightweight Italian virgin wool weave. Cut with soft structured shoulders, notched lapels, and clean horn buttons for quiet sophistication.",
    details: [
      "100% Italian Virgin Wool",
      "Full cupro lining for smooth layering",
      "Single-button front closure",
      "Two front flap welt pockets",
    ],
    fabricCare: [
      "Specialist dry clean only",
      "Store on shaped hanger",
    ],
    fitInfo: [
      "Tailored fit through the shoulders with relaxed body ease",
      "Model is 178 cm and wears size S",
    ],
    price: 7490,
    salePrice: null,
    categoryId: "cat-w-outerwear",
    categoryName: "Outerwear",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Beige Oatmeal", hex: "#C8B69E" },
      { name: "Dark Umber", hex: "#5C4033" },
      { name: "Pitch Noir", hex: "#171717" },
    ],
    images: [
      "/images/catalog/home-prod-blazer.jpg",
      "/images/catalog/home-prod-blazer.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 38,
    createdAt: "2024-11-10T09:00:00Z",
  },
  {
    id: "prod-home-dress",
    name: "Fluid Midi Dress",
    slug: "fluid-midi-dress",
    sku: "VEL-DRS-599",
    description: "Minimalist sleeveless midi dress crafted in heavy washed silk crepe. Features a clean bateau neckline, gently defined waist, and a fluid A-line skirt that moves effortlessly.",
    details: [
      "100% Mulberry Washed Silk Crepe",
      "Clean bound neckline and armholes",
      "Concealed center back zip",
      "Midi length falling mid-calf",
    ],
    fabricCare: [
      "Dry clean or delicate hand wash cold",
      "Steam iron on low",
    ],
    fitInfo: [
      "True to size with fluid drape",
      "Model is 176 cm and wears size S",
    ],
    price: 5990,
    salePrice: null,
    categoryId: "cat-w-dresses",
    categoryName: "Dresses",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Olive Moss", hex: "#55523E" },
      { name: "Pitch Noir", hex: "#171717" },
    ],
    images: [
      "/images/catalog/home-prod-dress.jpg",
      "/images/catalog/home-prod-dress.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 29,
    createdAt: "2024-11-10T08:50:00Z",
  },
  {
    id: "prod-home-trousers",
    name: "Relaxed Trousers",
    slug: "relaxed-trousers",
    sku: "VEL-TRS-499",
    description: "High-waisted relaxed trousers in fluid double-pleat ivory wool blend. Cut with a generous wide leg, side seam pockets, and a clean hook-and-bar waistband.",
    details: [
      "70% Wool, 30% Lyocell blend",
      "Double forward pleats",
      "Wide fluid leg with deep hems",
      "Custom horn internal waistband buttons",
    ],
    fabricCare: [
      "Specialist dry clean only",
      "Medium press on reverse",
    ],
    fitInfo: [
      "High-rise with relaxed ease through leg",
      "Model is 178 cm and wears size S",
    ],
    price: 4990,
    salePrice: null,
    categoryId: "cat-w-trousers",
    categoryName: "Trousers",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Cream Ecru", hex: "#ECE7DE" },
    ],
    images: [
      "/images/catalog/home-prod-trousers.jpg",
      "/images/catalog/home-prod-trousers.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 34,
    createdAt: "2024-11-10T08:40:00Z",
  },
  {
    id: "prod-home-knit",
    name: "Cashmere Knit",
    slug: "cashmere-knit",
    sku: "VEL-KNT-690",
    description: "Classic fine-gauge crewneck sweater knit from pure 2-ply Mongolian cashmere. Features delicate tubular trims, dropped shoulders, and a buttery hand feel.",
    details: [
      "100% Grade-A Mongolian Cashmere",
      "Seamless round crewneck",
      "Ribbed cuffs and hem with gentle recovery",
      "Lightweight yet remarkably insulating",
    ],
    fabricCare: [
      "Hand wash cold with wool shampoo",
      "Dry flat on towel",
    ],
    fitInfo: [
      "Regular fit designed for effortless layering",
      "Model is 175 cm and wears size S",
    ],
    price: 6900,
    salePrice: null,
    categoryId: "cat-w-knitwear",
    categoryName: "Knitwear",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Espresso Brown", hex: "#3D2E24" },
      { name: "Pitch Noir", hex: "#171717" },
    ],
    images: [
      "/images/catalog/home-prod-knit.jpg",
      "/images/catalog/home-prod-knit.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 42,
    createdAt: "2024-11-10T08:30:00Z",
  },
  {
    id: "prod-ref-bomber",
    name: "Architectural Wool Bomber",
    slug: "architectural-wool-bomber",
    sku: "VEL-BMB-101",
    description: "Architectural wool bomber crafted from rich double-faced wool melange in espresso brown. Cut with a clean raglan shoulder, horn buttons and minimalist ribbed trim for modern elegance.",
    details: [
      "100% Double-Faced Italian Virgin Wool",
      "Supple full cupro lining",
      "Hand-finished genuine buffalo horn buttons",
      "Concealed architectural front zip closure",
      "Tailored in Biella, Italy",
    ],
    fabricCare: [
      "100% Virgin Wool",
      "Specialist dry clean only",
      "Store on shaped wooden atelier hanger",
    ],
    fitInfo: [
      "Relaxed architectural fit through chest and shoulders",
      "Model is 186 cm / 6'1\" and wears size M",
    ],
    price: 39000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Espresso", hex: "#3D2E24" },
      { name: "Charcoal Slate", hex: "#171717" },
      { name: "Raw Ecru", hex: "#E2D8CC" },
    ],
    images: [
      "/images/catalog/architectural-wool-bomber.jpg",
      "/images/catalog/architectural-wool-bomber.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 32,
    createdAt: "2024-11-09T09:00:00Z",
  },
  {
    id: "prod-ref-cape",
    name: "Architectural Trench Cape",
    slug: "architectural-trench-cape",
    sku: "VEL-CPE-102",
    description: "Dramatic architectural cape coat sculpted in water-repellent Italian double-faced cotton twill. Features a clean stand collar, throat latch, fluid side drape and horn fasteners.",
    details: [
      "Water-repellent structured Italian cotton-blend twill",
      "Fluid open-side cape construction with internal stay straps",
      "Signature high funnel collar with leather-backed throat latch",
      "Pure cupro silk lining",
      "Handmade in Milan, Italy",
    ],
    fabricCare: [
      "65% Cotton, 35% Polyamide",
      "Specialist dry clean only",
      "Low temperature iron with press cloth",
    ],
    fitInfo: [
      "Dramatic fluid silhouette designed with generous drape",
      "Model is 178 cm / 5'10\" and wears size S",
    ],
    price: 46000,
    salePrice: null,
    categoryId: "cat-w-outerwear",
    categoryName: "Outerwear",
    department: "women",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Bone Ivory", hex: "#E2D8CC" },
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Warm Camel", hex: "#A3784A" },
    ],
    images: [
      "/images/catalog/architectural-trench-cape.jpg",
      "/images/catalog/architectural-trench-cape.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 28,
    createdAt: "2024-11-09T08:50:00Z",
  },
  {
    id: "prod-ref-leather",
    name: "Minimalist Leather Field Jacket",
    slug: "minimalist-leather-field-jacket",
    sku: "VEL-LTH-103",
    description: "An archival utility classic reimagined through luxury minimalism. Handcrafted from vegetable-tanned Italian calfskin leather with a matte buttery hand, horn buttons, and gusseted cargo pockets.",
    details: [
      "100% Full-Grain Vegetable-Tanned Italian Calfskin",
      "Matte aniline finish that patinas with wear",
      "Four architectural envelope patch pockets",
      "Heavy gauge antiqued bronze dual zipper",
      "Crafted in Florence, Italy",
    ],
    fabricCare: [
      "100% Genuine Calfskin Leather",
      "Specialist leather cleaner only",
      "Keep away from direct heat and water",
    ],
    fitInfo: [
      "Tailored masculine cut with room for light knitwear beneath",
      "Model is 188 cm / 6'2\" and wears size L",
    ],
    price: 78000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cognac Brown", hex: "#7C4A28" },
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Warm Tan", hex: "#A3784A" },
    ],
    images: [
      "/images/catalog/minimalist-leather-field-jacket.jpg",
      "/images/catalog/minimalist-leather-field-jacket.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 19,
    createdAt: "2024-11-09T08:40:00Z",
  },
  {
    id: "prod-ref-knit",
    name: "Ribbed Silk-Cashmere Knit",
    slug: "ribbed-silk-cashmere-knit",
    sku: "VEL-KNT-104",
    description: "Sculptural fine-gauge knit in a blend of Mongolian cashmere and mulberry silk. Featuring a clean micro-mock neck and directional ribbing that traces the contours of the body with graceful ease.",
    details: [
      "70% Mongolian Cashmere, 30% Mulberry Silk",
      "18-gauge directional knitwear",
      "Seamless tubular neck and cuff construction",
      "Ultra-soft next-to-skin touch",
    ],
    fabricCare: [
      "Hand wash cold with wool detergent or luxury dry clean",
      "Dry flat on clean towel",
    ],
    fitInfo: [
      "Slim sculptural fit with gentle stretch",
      "Model is 176 cm and wears size S",
    ],
    price: 28000,
    salePrice: null,
    categoryId: "cat-w-knitwear",
    categoryName: "Knitwear",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dark Espresso", hex: "#3D2E24" },
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Oatmeal", hex: "#E2D8CC" },
    ],
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=88&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=88&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 15,
    createdAt: "2024-11-09T08:30:00Z",
  },
  {
    id: "prod-ref-overcoat",
    name: "Sculpted Double-Faced Overcoat",
    slug: "sculpted-double-faced-overcoat",
    sku: "VEL-COAT-105",
    description: "Monolithic double-faced virgin wool and cashmere overcoat in cream melange. Designed with dropped shoulders, clean slash welt pockets and invisible hand-finished perimeter seams.",
    details: [
      "90% Australian Virgin Wool, 10% Cashmere (520 GSM)",
      "Unlined double-faced craftsmanship",
      "Concealed horn button front placket",
      "Tailored in Como, Italy",
    ],
    fabricCare: [
      "Specialist luxury dry clean only",
      "Store on structured coat hanger",
    ],
    fitInfo: [
      "Relaxed dropped shoulder silhouette",
      "Model is 185 cm and wears size M",
    ],
    price: 58000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream Melange", hex: "#E2D8CC" },
      { name: "Pitch Noir", hex: "#171717" },
    ],
    images: [
      "/images/catalog/mens-cashmere-blouson.jpg",
      "/images/catalog/mens-cashmere-blouson.jpg",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 22,
    createdAt: "2024-11-09T08:20:00Z",
  },
  {
    id: "prod-ref-wrap",
    name: "Cashmere Archival Wrap",
    slug: "cashmere-archival-wrap",
    sku: "VEL-WRP-106",
    description: "Sumptuous double-faced camel cashmere wrap scarf. Finished with delicate hand-knotted fringe and subtle tone-on-tone VELORA atelier monogram embroidery.",
    details: [
      "100% Grade-A Mongolian Cashmere",
      "Double-faced camel and bone weave",
      "200 cm x 70 cm generous proportion",
    ],
    fabricCare: [
      "Dry clean only or gently hand wash in tepid water",
    ],
    fitInfo: [
      "One generous size for versatile wrapping and draping",
    ],
    price: 34000,
    salePrice: null,
    categoryId: "cat-w-knitwear",
    categoryName: "Knitwear",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["One Size"],
    colors: [
      { name: "Warm Camel", hex: "#A3784A" },
      { name: "Ivory", hex: "#F5F2EB" },
    ],
    images: [
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=85&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: "2024-11-09T08:10:00Z",
  },
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
    fabricCare: [
      "65% Cotton, 35% Polyamide water-repellent twill",
      "Specialist dry clean only",
      "Store on wide-shoulder coat hanger",
    ],
    fitInfo: [
      "Relaxed maxi silhouette designed to fall mid-calf",
      "Belt can be tied or buckled to cinch the waist",
      "Model is 178 cm / 5'10\" and wears size S",
    ],
    price: 48500,
    salePrice: null,
    categoryId: "cat-w-outerwear",
    categoryName: "Outerwear",
    department: "women",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
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
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 24,
    completeLookProductIds: ["prod-trousers", "prod-tote"],
    createdAt: "2024-11-01T08:00:00Z",
  },
  {
    id: "prod-blazer",
    name: "Double-Breasted Wool Atelier Blazer",
    slug: "double-breasted-wool-atelier-blazer",
    sku: "VEL-BLZ-001",
    description: "Tailored from Italian virgin wool twill in a refined oatmeal melange. Defined by sharp peak lapels, a suppressed waist, and hand-finished crest buttons. An anchor piece of modern luxury.",
    details: [
      "100% Italian Virgin Wool (380 GSM)",
      "Structured roped shoulders with lightweight chest canvas",
      "Signature double-breasted 6-button silhouette with interior anchor button",
      "Four functional horn sleeve cuffs with kissing buttons",
      "Full cupro-silk jacquard lining for effortless drape",
      "Crafted in Biella, Italy",
    ],
    fabricCare: [
      "100% Virgin Wool, 100% Cupro Lining",
      "Specialist luxury dry clean only",
      "Low temperature iron with press cloth",
      "Store on contoured wooden atelier hanger",
    ],
    fitInfo: [
      "Tailored architectural silhouette with softly structured shoulders",
      "Designed for a regular fit; take your usual size",
      "Model is 178 cm / 5'10\" and wears size S",
    ],
    price: 34500,
    salePrice: null,
    categoryId: "cat-w-outerwear",
    categoryName: "Outerwear",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Melange", hex: "#D6CBBF" },
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Raw Cream", hex: "#F3ECE1" },
    ],
    images: [
      "/images/catalog/tailored-double-breasted-blazer.jpg",
      "/images/catalog/pleated-silk-trousers.jpg",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 31,
    completeLookProductIds: ["prod-trousers", "prod-tote"],
    createdAt: "2024-11-05T08:00:00Z",
  },
  {
    id: "prod-trousers",
    name: "Pleated Silk-Wool Wide-Leg Trousers",
    slug: "pleated-silk-wool-wide-leg-trousers",
    sku: "VEL-TRS-002",
    description: "An immaculate expression of fluid tailoring. High-waisted with double reverse front pleats that fall into an elongated, floor-skimming wide leg. Crafted from custom mulberry silk and virgin wool crepe.",
    details: [
      "65% Virgin Wool, 35% Mulberry Silk Crepe",
      "Deep double reverse front pleats for fluid volume",
      "Extended waistband tab with concealed hook-and-bar closure",
      "Slanted side pockets and rear welt pockets",
      "Internal curtain waistband construction",
      "Crafted in Florence, Italy",
    ],
    fabricCare: [
      "65% Virgin Wool, 35% Mulberry Silk",
      "Delicate dry clean only",
      "Steam on low setting",
    ],
    fitInfo: [
      "High-rise waist, elongated wide-leg profile",
      "Generous cut through hip and thigh",
      "Model is 178 cm / 5'10\" and wears size S (waist 26\")",
    ],
    price: 24000,
    salePrice: null,
    categoryId: "cat-w-trousers",
    categoryName: "Trousers",
    department: "women",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory Silk", hex: "#FAF8F5" },
      { name: "Obsidian Black", hex: "#1A1A1A" },
      { name: "Warm Camel", hex: "#C2A888" },
    ],
    images: [
      "/images/catalog/pleated-silk-trousers.jpg",
      "/images/catalog/tailored-double-breasted-blazer.jpg",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 19,
    completeLookProductIds: ["prod-blazer", "prod-tote"],
    createdAt: "2024-11-04T08:00:00Z",
  },
  {
    id: "prod-blouson",
    name: "Men's Minimal Cashmere Blouson Jacket",
    slug: "mens-minimal-cashmere-blouson-jacket",
    sku: "VEL-MEN-BLZ-003",
    description: "A masterclass in modern masculine proportion. Cut with a generous relaxed shoulder, clean spread collar, and two-way brushed titanium zipper. Knitted from double-faced cashmere-wool felt for unmatched warmth and effortless structure.",
    details: [
      "80% Virgin Wool, 20% Grade-A Mongolian Cashmere (720 GSM)",
      "Brushed titanium two-way front zip with custom pull",
      "Architectural spread collar with under-collar stitching",
      "Seamless welt hand pockets and interior passport pocket",
      "Relaxed drop shoulder with tapered wrist cuff",
      "Crafted in Como, Italy",
    ],
    fabricCare: [
      "80% Virgin Wool, 20% Mongolian Cashmere",
      "Dry clean only by luxury textile specialists",
      "Protect titanium hardware during cleaning",
    ],
    fitInfo: [
      "Relaxed architectural cut with generous chest room",
      "Model is 188 cm / 6'2\" and wears size L",
    ],
    price: 42000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-2",
    collectionName: "The Seasonal Edit",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Cream", hex: "#F3ECE1" },
      { name: "Charcoal Heather", hex: "#2C2C2C" },
      { name: "Camel", hex: "#B89F82" },
    ],
    images: [
      "/images/catalog/mens-cashmere-blouson.jpg",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 14,
    completeLookProductIds: ["prod-trousers"],
    createdAt: "2024-11-03T08:00:00Z",
  },
  {
    id: "prod-dress-1",
    name: "Fluid Silk Column Midi Dress",
    slug: "fluid-silk-column-midi-dress",
    sku: "VEL-DRS-004",
    description: "A monolithic minimalist silhouette crafted from heavyweight 32mm sandwashed mulberry silk. Designed to skim the contours with a high boat neckline, deep side slit, and an understated raw hem.",
    details: [
      "100% Mulberry Silk Charmeuse (32 momme)",
      "Bias-cut construction for natural ease and fluid movement",
      "Concealed side invisible zipper with hook-and-eye closure",
      "High architectural neckline and subtle waist contouring",
      "Crafted in Lyon, France",
    ],
    fabricCare: [
      "100% Sandwashed Silk",
      "Dry clean or delicate hand wash with silk detergent",
      "Line dry in shade",
    ],
    fitInfo: [
      "Column silhouette, skims body without clinging",
      "Model is 176 cm / 5'9\" and wears size S",
    ],
    price: 28500,
    salePrice: null,
    categoryId: "cat-w-dresses",
    categoryName: "Dresses",
    department: "women",
    collectionId: "col-4",
    collectionName: "The Monochrome Edit",
    gender: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Pitch Noir", hex: "#171717" },
      { name: "Oatmeal", hex: "#DFD7CB" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 22,
    completeLookProductIds: ["prod-blazer", "prod-tote"],
    createdAt: "2024-11-02T08:00:00Z",
  },
  {
    id: "prod-tote",
    name: "Sculpted Box Calfskin Leather Tote",
    slug: "sculpted-box-calfskin-leather-tote",
    sku: "VEL-BAG-005",
    description: "Clean, sculptural architecture realized in full-grain French box calfskin. Features reinforced dual tubular handles, hand-lacquered edge stain, and an unlined suede interior with leather zip pouch.",
    details: [
      "100% Full-Grain French Box Calfskin",
      "Supple unlined natural split-suede interior",
      "Removable matching zip clutch compartment",
      "Magnetic top closure with debossed discreet VELORA hallmark",
      "Handcrafted in Scandicci, Italy",
    ],
    fabricCare: [
      "Wipe clean with soft microfiber cloth",
      "Apply neutral leather balm bi-annually",
      "Store in provided organic cotton dust bag",
    ],
    fitInfo: [
      "Dimensions: 38 cm width x 28 cm height x 14 cm depth",
      "Accommodates up to 15-inch laptop and daily essentials",
    ],
    price: 38000,
    salePrice: null,
    categoryId: "cat-a-bags",
    categoryName: "Bags",
    department: "accessories",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Chestnut Brown", hex: "#5C3A21" },
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Ecru", hex: "#EBE6DD" },
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 16,
    completeLookProductIds: ["prod-blazer", "prod-trousers"],
    createdAt: "2024-11-01T08:00:00Z",
  },
  {
    id: "prod-acc-hoops",
    name: "Sculpted Gold Hoop Earrings",
    slug: "sculpted-gold-hoop-earrings",
    sku: "VEL-ACC-001",
    description: "Handcrafted 18k gold vermeil earrings characterized by undulating molten curves and an architectural twist silhouette. Lightweight yet striking, designed to catch light from every angle.",
    details: [
      "18k Gold Vermeil over recycled 925 sterling silver",
      "Hypoallergenic titanium post with secure butterfly closure",
      "Diameter: 28mm, Width: 6mm",
      "Weight: 8g per earring for all-day comfort",
      "Handcrafted by master goldsmiths in Arezzo, Italy"
    ],
    fabricCare: [
      "Clean gently with soft microfiber cloth",
      "Avoid direct contact with perfumes, chemicals, and saltwater",
      "Store in individual velvet dust pouch"
    ],
    fitInfo: ["One size fits all", "Comfortable lightweight hollow construction"],
    price: 14500,
    salePrice: null,
    categoryId: "cat-a-jewellery",
    categoryName: "Jewellery",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "18k Yellow Gold", hex: "#D4AF37", imageUrl: "/images/products/sculpted-gold-hoop-earrings.jpg" },
      { name: "Rhodium Silver", hex: "#E5E4E2" }
    ],
    images: [
      "/images/products/sculpted-gold-hoop-earrings.jpg",
      "/images/products/sculpted-gold-hoop-earrings.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 22,
    completeLookProductIds: ["prod-acc-necklace", "prod-blazer"],
    createdAt: "2024-11-12T10:00:00Z"
  },
  {
    id: "prod-acc-scarf",
    name: "Artisan Silk Foulard Scarf",
    slug: "artisan-silk-foulard-scarf",
    sku: "VEL-ACC-002",
    description: "Sumptuous 100% mulberry silk twill foulard scarf featuring an archival abstract botanical and paisley motif in warm cognac, sand, and ivory tones with hand-rolled edges.",
    details: [
      "100% Grade 6A Mulberry Silk Twill (18 momme)",
      "Meticulous hand-rolled and hand-stitched hem edges",
      "Square dimensions: 90cm x 90cm (35.4 x 35.4 inches)",
      "Archival screenprint with natural azo-free pigments",
      "Woven and finished in Como, Italy"
    ],
    fabricCare: [
      "100% Silk Twill",
      "Specialist dry clean only",
      "Cool iron on reverse side using a pressing cloth"
    ],
    fitInfo: ["Square 90 x 90 cm", "Versatile styling around neck, hair, or bag handle"],
    price: 16900,
    salePrice: null,
    categoryId: "cat-w-acc",
    categoryName: "Accessories",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac & Sand", hex: "#7C4A28", imageUrl: "/images/products/artisan-silk-foulard-scarf.jpg" },
      { name: "Noir & Bone", hex: "#171717" }
    ],
    images: [
      "/images/products/artisan-silk-foulard-scarf.jpg",
      "/images/products/artisan-silk-foulard-scarf.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.8,
    reviewCount: 16,
    completeLookProductIds: ["prod-acc-top-handle", "prod-ref-cape"],
    createdAt: "2024-11-12T10:05:00Z"
  },
  {
    id: "prod-acc-belt",
    name: "Classic Saddle Leather Belt",
    slug: "classic-saddle-leather-belt",
    sku: "VEL-ACC-003",
    description: "Cut from full-grain Tuscan bridle leather, tanned using natural vegetable tannins for an enduring patina. Accented with a custom-cast solid brushed brass buckle.",
    details: [
      "Full-grain vegetable-tanned Tuscan bridle leather (3.5mm thickness)",
      "Solid cast brass buckle with hand-brushed satin finish",
      "Width: 32mm (1.25 inches) with 5 precision-punched tear-drop holes",
      "Hand-beveled and edge-dyed in deep espresso",
      "Crafted in Florence, Italy"
    ],
    fabricCare: [
      "100% Tuscan Calfskin Leather",
      "Nourish periodically with natural neutral beeswax leather balm",
      "Store loosely rolled inside breathable cotton pouch"
    ],
    fitInfo: ["Available in sizes 75, 85, 95, 105 cm", "Measure from buckle turn to middle hole"],
    price: 18500,
    salePrice: null,
    categoryId: "cat-a-belts",
    categoryName: "Belts",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["75", "85", "95", "105"],
    colors: [
      { name: "Chestnut Tan", hex: "#7C4A28", imageUrl: "/images/products/classic-saddle-leather-belt.jpg" },
      { name: "Espresso Noir", hex: "#221A15" }
    ],
    images: [
      "/images/products/classic-saddle-leather-belt.jpg",
      "/images/products/classic-saddle-leather-belt.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 29,
    completeLookProductIds: ["prod-trousers", "prod-home-blazer"],
    createdAt: "2024-11-12T10:10:00Z"
  },
  {
    id: "prod-acc-top-handle",
    name: "Structured Espresso Top-Handle Bag",
    slug: "structured-espresso-top-handle-bag",
    sku: "VEL-ACC-004",
    description: "An architectural trapezoidal silhouette crafted from smooth French box calfskin in rich deep espresso. Features an arched top handle, discreet magnetic clasp, and detachable cross-body shoulder strap.",
    details: [
      "Smooth French Box Calfskin leather with subtle gloss finish",
      "Supple Italian lambskin nappa lining",
      "Interior slip pocket, zipped valuables compartment, and key ring leash",
      "Detachable adjustable leather shoulder strap (drop 48-56cm)",
      "Protective base studs in brushed pale gold",
      "Dimensions: 26cm W x 18cm H x 11cm D",
      "Handcrafted in Scandicci, Italy"
    ],
    fabricCare: [
      "100% Box Calfskin, Lambskin interior",
      "Protect from rain and excessive direct sunlight",
      "Wipe clean with a microfiber leather cloth"
    ],
    fitInfo: ["Structured handheld or crossbody wear", "Accommodates all modern smartphones, wallet, and essentials"],
    price: 48000,
    salePrice: null,
    categoryId: "cat-a-bags",
    categoryName: "Bags",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "women",
    sizes: ["One Size"],
    colors: [
      { name: "Deep Espresso", hex: "#3D2E24", imageUrl: "/images/products/structured-espresso-top-handle-bag.jpg" },
      { name: "Bone Ivory", hex: "#F5F2EB" },
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/structured-espresso-top-handle-bag.jpg",
      "/images/products/structured-espresso-top-handle-bag.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 34,
    completeLookProductIds: ["prod-acc-wallet", "prod-blazer"],
    createdAt: "2024-11-12T10:15:00Z"
  },
  {
    id: "prod-acc-wallet",
    name: "Grained Pebble Leather Wallet",
    slug: "grained-pebble-leather-wallet",
    sku: "VEL-ACC-005",
    description: "Slimline compact bifold wallet crafted from scratch-resistant French pebbled calfskin. Features eight precision card slots, note compartment, and subtle blind-embossed VELORA insignia.",
    details: [
      "Supple grained pebbled calfskin leather",
      "8 card slots, 2 slip receipt pockets, 1 full-length billfold compartment",
      "RFID-blocking woven inner shield lining for security",
      "Folded dimensions: 11cm x 9cm x 1.5cm",
      "Hand-painted edge finishing with durable wax thread stitching",
      "Handcrafted in Ubrique, Spain"
    ],
    fabricCare: [
      "100% Grained Calfskin",
      "Wipe clean with a soft dry cloth",
      "Avoid over-stuffing to maintain lean profile"
    ],
    fitInfo: ["Compact pocket fit", "Slim ergonomic profile"],
    price: 12900,
    salePrice: null,
    categoryId: "cat-a-bags",
    categoryName: "Bags",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Rich Cognac", hex: "#8A4F2A", imageUrl: "/images/products/grained-pebble-leather-wallet.jpg" },
      { name: "Dark Espresso", hex: "#3D2E24" },
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/grained-pebble-leather-wallet.jpg",
      "/images/products/grained-pebble-leather-wallet.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.9,
    reviewCount: 19,
    completeLookProductIds: ["prod-acc-top-handle"],
    createdAt: "2024-11-12T10:20:00Z"
  },
  {
    id: "prod-acc-necklace",
    name: "Minimalist Gold Medallion Necklace",
    slug: "minimalist-gold-medallion-necklace",
    sku: "VEL-ACC-006",
    description: "Delicate 18k yellow gold vermeil pendant necklace featuring a gently hammered disc charm suspended on a shimmering micro-cable chain. Designed for everyday layering.",
    details: [
      "18k Yellow Gold Vermeil over recycled 925 Sterling Silver (2.5 microns thick)",
      "Hammered disc diameter: 14mm with subtle organic contour",
      "Fine diamond-cut cable chain: adjustable 45cm to 50cm (18 to 20 inches)",
      "Secure custom lobster clasp with engraved logo tag",
      "Hand-finished in Vicenza, Italy"
    ],
    fabricCare: [
      "Store flat in anti-tarnish jewelry pouch",
      "Polish occasionally with included microfiber jewelry cloth"
    ],
    fitInfo: ["Adjustable length 45 - 50 cm", "Ideal for standalone wear or layered looks"],
    price: 15800,
    salePrice: null,
    categoryId: "cat-a-jewellery",
    categoryName: "Jewellery",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "18k Yellow Gold", hex: "#D4AF37", imageUrl: "/images/products/minimalist-gold-medallion-necklace.jpg" }
    ],
    images: [
      "/images/products/minimalist-gold-medallion-necklace.jpg",
      "/images/products/minimalist-gold-medallion-necklace.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 27,
    completeLookProductIds: ["prod-acc-hoops", "prod-dress"],
    createdAt: "2024-11-12T10:25:00Z"
  },
  {
    id: "prod-acc-duffle",
    name: "Heritage Tan Leather Weekender Duffle",
    slug: "heritage-tan-leather-weekender-duffle",
    sku: "VEL-ACC-007",
    description: "Generously proportioned travel holdall made from full-grain vegetable-tanned saddle leather in warm amber tan. Reinforced twin carry handles, durable two-way brass zip, and removable padded shoulder strap.",
    details: [
      "Heavyweight full-grain vegetable-tanned Italian saddle leather",
      "Heavy-duty solid antiqued brass YKK two-way zipper",
      "Durable water-repellent herringbone cotton twill lining",
      "Internal padded 15 inch laptop sleeve and zippered valuables pocket",
      "Detachable ergonomic shoulder strap with leather comfort pad",
      "Dimensions: 52cm L x 28cm H x 26cm D (40L Cabin Approved)",
      "Handmade in Florence, Italy"
    ],
    fabricCare: [
      "100% Saddle Leather",
      "Condition annually with natural leather cream",
      "Protect from saturation; allow to dry naturally at room temperature"
    ],
    fitInfo: ["Carry-on approved for all major international airlines", "40 Litre internal packing volume"],
    price: 62000,
    salePrice: null,
    categoryId: "cat-a-bags",
    categoryName: "Bags",
    department: "accessories",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["40L"],
    colors: [
      { name: "Heritage Amber Tan", hex: "#A86532", imageUrl: "/images/products/heritage-tan-leather-weekender-duffle.jpg" },
      { name: "Dark Walnut", hex: "#4A3223" },
      { name: "Onyx Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/heritage-tan-leather-weekender-duffle.jpg",
      "/images/products/heritage-tan-leather-weekender-duffle.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 41,
    completeLookProductIds: ["prod-acc-wallet", "prod-cashmere-blouson"],
    createdAt: "2024-11-12T10:30:00Z"
  },
  {
    "id": "prod-m-camel-overcoat",
    "name": "Double-Faced Camel Wool Overcoat",
    "slug": "double-faced-camel-wool-overcoat",
    "sku": "VEL-M-OCT-001",
    "description": "An architectural icon crafted from unlined double-faced baby camelhair and virgin wool. Hand-finished split seams, generous storm flap, and a relaxed tailored drape designed for considered cold-weather layering.",
    "details": [
      "90% Baby Camelhair, 10% Virgin Wool (620 GSM)",
      "Hand-finished double-faced construction with invisible split seams",
      "Concealed horn button front placket with horn throat latch",
      "Generous welt hand pockets and interior chest slip pocket",
      "Deep center back vent for effortless movement",
      "Handcrafted in Biella, Italy"
    ],
    "fabricCare": [
      "90% Camelhair, 10% Virgin Wool",
      "Specialist luxury dry clean only",
      "Steam gently on low setting",
      "Store on wide contoured wooden hanger"
    ],
    "fitInfo": [
      "Tailored architectural silhouette with generous drape",
      "Designed for standard layering over tailoring or knits",
      "Model is 187 cm / 6'1.5\" and wears size 50 (M/L)"
    ],
    "price": 48000,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Camelhair",
        "hex": "#C2A888"
      },
      {
        "name": "Raw Cream",
        "hex": "#F3ECE1"
      }
    ],
    "images": [
      "/images/products/men/camel-overcoat-1.jpg",
      "/images/products/men/camel-overcoat-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 18,
    "completeLookProductIds": [
      "prod-m-charcoal-trousers",
      "prod-m-ivory-poplin-shirt"
    ],
    "createdAt": "2024-11-15T10:00:00Z"
  },
  {
    "id": "prod-m-taupe-overcoat",
    "name": "Taupe Double-Breasted Wool Greatcoat",
    "slug": "taupe-double-breasted-wool-greatcoat",
    "sku": "VEL-M-OCT-002",
    "description": "Commanding double-breasted silhouette sculpted in dense Italian melton wool. Broad peak lapels, suppressed waist, and a floor-skimming hem define this modern heirloom piece.",
    "details": [
      "100% Italian Virgin Melton Wool (580 GSM)",
      "Structured roped shoulders with lightweight horsehair chest canvas",
      "Six-button double-breasted stance with interior anchor button",
      "Full cupro-silk jacquard lining for effortless gliding over knitwear",
      "Handcrafted in Florence, Italy"
    ],
    "fabricCare": [
      "100% Virgin Wool, 100% Cupro Lining",
      "Delicate luxury dry clean only",
      "Low temperature press with damp cloth",
      "Keep hung on broad contoured atelier hanger"
    ],
    "fitInfo": [
      "Subtly structured shoulders, regular through the torso",
      "Floor-length cut for statuesque presence",
      "Model is 188 cm / 6'2\" and wears size 48 (M)"
    ],
    "price": 52000,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-3",
    "collectionName": "The Signature Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Warm Taupe",
        "hex": "#B8A99A"
      },
      {
        "name": "Pitch Noir",
        "hex": "#171717"
      }
    ],
    "images": [
      "/images/products/men/taupe-overcoat-1.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 14,
    "completeLookProductIds": [
      "prod-m-oatmeal-wide-trousers",
      "prod-m-knit-polo"
    ],
    "createdAt": "2024-11-15T10:05:00Z"
  },
  {
    "id": "prod-m-minimalist-suit",
    "name": "Minimalist Beige Wool Atelier Suit Jacket",
    "slug": "minimalist-beige-wool-atelier-suit-jacket",
    "sku": "VEL-M-JKT-003",
    "description": "Modern single-breasted suit jacket crafted in lightweight super-130s wool twill. Soft natural shoulders and clean notched lapels offer quiet formality.",
    "details": [
      "100% Italian Super 130s Wool Twill",
      "Soft unpadded natural shoulder construction",
      "Horn two-button front with kissing cuff buttons",
      "Dual side vents and partial cupro butterfly lining",
      "Crafted in Biella, Italy"
    ],
    "fabricCare": [
      "100% Virgin Wool",
      "Dry clean only by garment specialist"
    ],
    "fitInfo": [
      "Tailored modern silhouette, slim body fit",
      "Model is 185 cm / 6'1\" and wears size 48"
    ],
    "price": 42500,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-3",
    "collectionName": "The Signature Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Sand Oatmeal",
        "hex": "#D4C7B5"
      },
      {
        "name": "Cream",
        "hex": "#F3EDE2"
      }
    ],
    "images": [
      "/images/products/men/minimalist-suit-1.jpg",
      "/images/products/men/minimalist-suit-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 22,
    "completeLookProductIds": [
      "prod-m-tailored-crease-trousers",
      "prod-m-oxford-shirt"
    ],
    "createdAt": "2024-11-15T10:10:00Z"
  },
  {
    "id": "prod-m-stone-blazer",
    "name": "Stone Beige Unstructured Atelier Blazer",
    "slug": "stone-beige-unstructured-atelier-blazer",
    "sku": "VEL-M-JKT-004",
    "description": "An effortless sartorial staple tailored from washed virgin wool and silk faille. Unlined body, patch pockets, and hand-rolled lapels embrace relaxed elegance.",
    "details": [
      "75% Virgin Wool, 25% Silk Faille (310 GSM)",
      "Unstructured deconstructed atelier make",
      "Curved barchetta chest pocket and rounded patch hip pockets",
      "Real smoked mother-of-pearl buttons",
      "Crafted in Naples, Italy"
    ],
    "fabricCare": [
      "Delicate luxury dry clean only",
      "Hang to aerate between wears"
    ],
    "fitInfo": [
      "Relaxed tailored fit with natural drape",
      "Model is 186 cm and wears size 50"
    ],
    "price": 36000,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-2",
    "collectionName": "The Seasonal Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Stone Beige",
        "hex": "#D8CFC4"
      },
      {
        "name": "Pebble Taupe",
        "hex": "#BFAF9E"
      }
    ],
    "images": [
      "/images/products/men/stone-blazer-1.jpg",
      "/images/products/men/stone-blazer-2.jpg",
      "/images/products/men/stone-blazer-3.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.8,
    "reviewCount": 19,
    "completeLookProductIds": [
      "prod-m-linen-trousers",
      "prod-m-brown-linen-shirt"
    ],
    "createdAt": "2024-11-15T10:15:00Z"
  },
  {
    "id": "prod-m-linen-jacket",
    "name": "Artisanal Slub Linen Tailored Jacket",
    "slug": "artisanal-slub-linen-tailored-jacket",
    "sku": "VEL-M-JKT-005",
    "description": "Masterfully woven from French Normandy flax linen with high tactile slub texture. Cut with relaxed architectural ease for warm seasons.",
    "details": [
      "100% French Normandy Linen (340 GSM)",
      "Breathable unlined construction with taped contrast seams",
      "Three-roll-two front button closure",
      "Patch pockets and double rear vents",
      "Crafted in Normandy & Milan"
    ],
    "fabricCare": [
      "100% Pure Flax Linen",
      "Gentle dry clean or cold hand wash",
      "Embrace natural creasing characteristic of pure linen"
    ],
    "fitInfo": [
      "Relaxed silhouette with comfortable room through chest",
      "Model is 184 cm and wears size 48"
    ],
    "price": 34000,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-2",
    "collectionName": "The Seasonal Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Raw Oatmeal",
        "hex": "#DDD2C3"
      },
      {
        "name": "Sunlit Linen",
        "hex": "#ECE4D6"
      }
    ],
    "images": [
      "/images/products/men/artisanal-linen-jacket-1.jpg",
      "/images/products/men/artisanal-linen-jacket-2.jpg",
      "/images/products/men/artisanal-linen-jacket-3.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 12,
    "completeLookProductIds": [
      "prod-m-linen-trousers",
      "prod-m-brown-linen-shirt"
    ],
    "createdAt": "2024-11-15T10:20:00Z"
  },
  {
    "id": "prod-m-noir-jacket",
    "name": "Contemporary Noir Minimalist Jacket",
    "slug": "contemporary-noir-minimalist-jacket",
    "sku": "VEL-M-JKT-006",
    "description": "A dark architectural statement cut in deep pitch-noir virgin wool cavalry twill. Sleek, sharp collar line and hidden placket for quiet modernism.",
    "details": [
      "100% Virgin Wool Cavalry Twill (400 GSM)",
      "Concealed button front with matte oxidized hardware",
      "Discrete vertical slash pockets integrated into princess seams",
      "Silky breathable cupro lining",
      "Crafted in Como, Italy"
    ],
    "fabricCare": [
      "100% Virgin Wool",
      "Specialist dry clean only",
      "Store away from direct light"
    ],
    "fitInfo": [
      "Clean boxy silhouette with dropped shoulder ease",
      "Model is 188 cm and wears size 50"
    ],
    "price": 38500,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-4",
    "collectionName": "The Monochrome Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Pitch Noir",
        "hex": "#171717"
      }
    ],
    "images": [
      "/images/products/men/noir-jacket-1.jpg",
      "/images/products/men/noir-jacket-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 26,
    "completeLookProductIds": [
      "prod-m-charcoal-trousers",
      "prod-m-black-satin-shirt"
    ],
    "createdAt": "2024-11-15T10:25:00Z"
  },
  {
    "id": "prod-m-studio-shacket",
    "name": "Relaxed Wool-Blend Studio Shacket",
    "slug": "relaxed-wool-blend-studio-shacket",
    "sku": "VEL-M-JKT-007",
    "description": "Versatile transitional outer layer crafted from double-cloth wool and cashmere. Square camp collar, generous patch pockets, and straight hem.",
    "details": [
      "85% Virgin Wool, 15% Cashmere",
      "Dual oversized chest utility patch pockets",
      "Horn button closures with reinforced inner taping",
      "Straight workwear-inspired hem with side split vents"
    ],
    "fabricCare": [
      "Delicate dry clean only"
    ],
    "fitInfo": [
      "Easy, relaxed boxy cut suitable for layering over tees or knits",
      "Model is 185 cm and wears size M"
    ],
    "price": 28000,
    "salePrice": null,
    "categoryId": "cat-m-jackets",
    "categoryName": "Jackets",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Mocha Brown",
        "hex": "#5C4033"
      },
      {
        "name": "Beige Cream",
        "hex": "#E8E0D2"
      }
    ],
    "images": [
      "/images/products/men/studio-shacket-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 15,
    "completeLookProductIds": [
      "prod-m-chocolate-trousers",
      "prod-m-ivory-poplin-shirt"
    ],
    "createdAt": "2024-11-15T10:30:00Z"
  },
  {
    "id": "prod-m-black-satin-shirt",
    "name": "Fluid Silk-Satin Evening Shirt",
    "slug": "fluid-silk-satin-evening-shirt",
    "sku": "VEL-M-SHT-008",
    "description": "Sensuous silk crepe-back satin cut with relaxed fluid drape. Subtle luster in dim evening light, concealed button placket, and French cuffs.",
    "details": [
      "100% Pure Mulberry Silk Crepe-Back Satin (19 mm)",
      "Concealed front button placket for uninterrupted drape",
      "Minimalist small spread collar with removable collar stays",
      "Mother-of-pearl buttons under placket",
      "Crafted in Como, Italy"
    ],
    "fabricCare": [
      "100% Pure Silk",
      "Delicate dry clean only or gentle silk hand wash",
      "Low steam on reverse"
    ],
    "fitInfo": [
      "Fluid tailored cut designed to drape naturally against the torso",
      "Model is 187 cm and wears size 48"
    ],
    "price": 18500,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-4",
    "collectionName": "The Monochrome Edit",
    "gender": "men",
    "sizes": [
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      {
        "name": "Pitch Noir",
        "hex": "#171717"
      }
    ],
    "images": [
      "/images/products/men/black-satin-shirt-1.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 20,
    "completeLookProductIds": [
      "prod-m-noir-jacket",
      "prod-m-charcoal-trousers"
    ],
    "createdAt": "2024-11-15T10:35:00Z"
  },
  {
    "id": "prod-m-brown-linen-shirt",
    "name": "Mocha Brown Pure Linen Studio Shirt",
    "slug": "mocha-brown-pure-linen-studio-shirt",
    "sku": "VEL-M-SHT-009",
    "description": "Garment-washed pure European flax linen in rich mocha brown. Relaxed fit with soft camp collar and genuine shell buttons.",
    "details": [
      "100% European Flax Linen (180 GSM)",
      "Enzyme-washed for immediate broken-in softness",
      "Convertible camp collar designed to be worn open",
      "Single chest patch pocket and split back yoke"
    ],
    "fabricCare": [
      "Machine wash delicate cold or gentle hand wash",
      "Line dry in shade to preserve color depth"
    ],
    "fitInfo": [
      "Relaxed cut with casual drape",
      "Model is 186 cm and wears size L"
    ],
    "price": 16500,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-2",
    "collectionName": "The Seasonal Edit",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Mocha Brown",
        "hex": "#4E3629"
      }
    ],
    "images": [
      "/images/products/men/brown-linen-shirt-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 31,
    "completeLookProductIds": [
      "prod-m-linen-trousers",
      "prod-m-stone-blazer"
    ],
    "createdAt": "2024-11-15T10:40:00Z"
  },
  {
    "id": "prod-m-twill-overshirt",
    "name": "Structured Heavy Twill Overshirt",
    "slug": "structured-heavy-twill-overshirt",
    "sku": "VEL-M-SHT-010",
    "description": "Rugged yet refined overshirt woven in 320 GSM organic cotton twill. Double flap chest pockets and tortoiseshell horn buttons.",
    "details": [
      "100% GOTS Certified Organic Cotton Twill (320 GSM)",
      "Double chest bellows pockets with button flap closure",
      "Reinforced elbow patches and durable flat-felled seam construction",
      "Horn buttons throughout"
    ],
    "fabricCare": [
      "Machine wash 30°C delicate cycle",
      "Hang to air dry"
    ],
    "fitInfo": [
      "Substantial overshirt cut intended to fit over t-shirts and light knits",
      "Model is 185 cm and wears size M"
    ],
    "price": 21000,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Warm Umber",
        "hex": "#634735"
      },
      {
        "name": "Beige Twill",
        "hex": "#C7B7A2"
      }
    ],
    "images": [
      "/images/products/men/twill-overshirt-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 4.8,
    "reviewCount": 16,
    "completeLookProductIds": [
      "prod-m-chocolate-trousers",
      "prod-m-leather-belt"
    ],
    "createdAt": "2024-11-15T10:45:00Z"
  },
  {
    "id": "prod-m-ivory-poplin-shirt",
    "name": "Crisp Ivory Studio Poplin Shirt",
    "slug": "crisp-ivory-studio-poplin-shirt",
    "sku": "VEL-M-SHT-011",
    "description": "Foundational tailored shirt crafted from 120/2 two-ply Giza Egyptian cotton poplin. Pristine ivory finish with sharp semi-spread collar.",
    "details": [
      "100% Extra-Long Staple Egyptian Giza Cotton (120/2 yarn)",
      "Mother-of-pearl buttons sewn with lily-stitch threading",
      "Clean French placket and curved hemline",
      "Removable brass collar stiffeners",
      "Crafted in Bergamo, Italy"
    ],
    "fabricCare": [
      "100% Egyptian Cotton",
      "Machine wash 40°C, warm iron with starch or steam"
    ],
    "fitInfo": [
      "Tailored modern cut with comfortable armhole pitch",
      "Model is 187 cm and wears size 40 (15.75\")"
    ],
    "price": 15500,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "38",
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "colors": [
      {
        "name": "Ivory White",
        "hex": "#FAF8F5"
      }
    ],
    "images": [
      "/images/products/men/ivory-poplin-shirt-1.jpg",
      "/images/products/men/ivory-poplin-shirt-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 42,
    "completeLookProductIds": [
      "prod-m-camel-overcoat",
      "prod-m-charcoal-trousers"
    ],
    "createdAt": "2024-11-15T10:50:00Z"
  },
  {
    "id": "prod-m-striped-shirt",
    "name": "Fine Striped Atelier Poplin Shirt",
    "slug": "fine-striped-atelier-poplin-shirt",
    "sku": "VEL-M-SHT-012",
    "description": "Understated hairline banker stripe woven in crisp 100% long-staple cotton poplin. Perfect balance of traditional haberdashery and modern luxury.",
    "details": [
      "100% Long-Staple Compact Cotton",
      "Subtle 1mm sand-and-ivory alternating stripe",
      "Reinforced side seam gussets with embroidered VELORA monogram",
      "Clean bevelled single-button cuffs"
    ],
    "fabricCare": [
      "Machine wash cold, tumble dry low or line dry"
    ],
    "fitInfo": [
      "Classic tailored regular fit",
      "Model is 186 cm and wears size 40"
    ],
    "price": 16000,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "39",
      "40",
      "41",
      "42",
      "43"
    ],
    "colors": [
      {
        "name": "Sand & White Stripe",
        "hex": "#D9CEC1"
      }
    ],
    "images": [
      "/images/products/men/striped-poplin-shirt-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 23,
    "completeLookProductIds": [
      "prod-m-tailored-crease-trousers",
      "prod-m-minimalist-suit"
    ],
    "createdAt": "2024-11-15T10:55:00Z"
  },
  {
    "id": "prod-m-oxford-shirt",
    "name": "Sand Washed Oxford Button-Down Shirt",
    "slug": "sand-washed-oxford-button-down-shirt",
    "sku": "VEL-M-SHT-013",
    "description": "Classic Ivy League silhouette reimagined in heavy uncombed basketweave Oxford cloth with garment tumble wash for a soft sand finish.",
    "details": [
      "100% Heavyweight Cotton Oxford Cloth (240 GSM)",
      "Unlined button-down collar with natural rolling arch",
      "Box pleat with locker loop at center back yoke",
      "Genuine river shell buttons"
    ],
    "fabricCare": [
      "Machine wash 30°C, hang dry"
    ],
    "fitInfo": [
      "Slightly relaxed traditional fit",
      "Model is 185 cm and wears size M"
    ],
    "price": 15000,
    "salePrice": null,
    "categoryId": "cat-m-shirts",
    "categoryName": "Shirts",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Sand Beige",
        "hex": "#D6C7B2"
      }
    ],
    "images": [
      "/images/products/men/sand-oxford-shirt-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 4.8,
    "reviewCount": 17,
    "completeLookProductIds": [
      "prod-m-chocolate-trousers",
      "prod-m-leather-belt"
    ],
    "createdAt": "2024-11-15T11:00:00Z"
  },
  {
    "id": "prod-m-knit-polo",
    "name": "Fine Merino Ribbed Knit Polo Shirt",
    "slug": "fine-merino-ribbed-knit-polo-shirt",
    "sku": "VEL-M-KNT-014",
    "description": "Knit from ultra-fine 18.5-micron Australian merino wool in a delicate 16-gauge rib. Features a seamless knitted collar and buttonless Johnny polo neck.",
    "details": [
      "100% Extra-Fine Australian Merino Wool (16-gauge)",
      "Naturally thermo-regulating, anti-odor and breathable",
      "Seamless fully-fashioned knit collar",
      "Ribbed cuffs and ribbed bottom band",
      "Knit in Biella, Italy"
    ],
    "fabricCare": [
      "100% Pure Merino Wool",
      "Hand wash cold with wool detergent or dry clean",
      "Dry flat, never hang"
    ],
    "fitInfo": [
      "Tailored slim knitwear fit with gentle stretch",
      "Model is 186 cm and wears size M"
    ],
    "price": 22500,
    "salePrice": null,
    "categoryId": "cat-m-knitwear",
    "categoryName": "Knitwear",
    "department": "men",
    "collectionId": "col-3",
    "collectionName": "The Signature Edit",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Warm Taupe",
        "hex": "#9E8E81"
      },
      {
        "name": "Oatmeal",
        "hex": "#D4C7B8"
      }
    ],
    "images": [
      "/images/products/men/taupe-knit-polo-1.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 29,
    "completeLookProductIds": [
      "prod-m-oatmeal-wide-trousers",
      "prod-m-taupe-overcoat"
    ],
    "createdAt": "2024-11-15T11:05:00Z"
  },
  {
    "id": "prod-m-charcoal-trousers",
    "name": "Charcoal Pleated Virgin Wool Trousers",
    "slug": "charcoal-pleated-virgin-wool-trousers",
    "sku": "VEL-M-TRS-015",
    "description": "High-waisted trousers cut from dense 340 GSM Italian virgin wool flannel. Forward single pleats, side buckle adjusters, and a clean straight leg.",
    "details": [
      "100% Italian Virgin Wool Flannel (340 GSM)",
      "High-rise waistband with extended tab and brass side adjusters (no belt loops required)",
      "Crisp front creases and slanted side pockets",
      "Interior curtain waistband for sartorial longevity",
      "Unfinished hem for bespoke length alteration"
    ],
    "fabricCare": [
      "Specialist luxury dry clean only"
    ],
    "fitInfo": [
      "High rise, comfortable through seat, straight leg profile",
      "Model is 187 cm / 32\" waist and wears size 48"
    ],
    "price": 24000,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-4",
    "collectionName": "The Monochrome Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Charcoal Melange",
        "hex": "#383838"
      },
      {
        "name": "Pitch Noir",
        "hex": "#171717"
      }
    ],
    "images": [
      "/images/products/men/charcoal-trousers-1.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 33,
    "completeLookProductIds": [
      "prod-m-camel-overcoat",
      "prod-m-ivory-poplin-shirt"
    ],
    "createdAt": "2024-11-15T11:10:00Z"
  },
  {
    "id": "prod-m-chocolate-trousers",
    "name": "Chocolate Brown Fluid Wide-Leg Trousers",
    "slug": "chocolate-brown-fluid-wide-leg-trousers",
    "sku": "VEL-M-TRS-016",
    "description": "Sumptuous chocolate brown trousers cut with fluid double front pleats and generous wide-leg profile in Italian wool-mohair twill.",
    "details": [
      "85% Virgin Wool, 15% Kid Mohair (300 GSM)",
      "Double reverse front pleats creating architectural drape",
      "Full floor-skimming wide-leg cut with 24 cm hem opening",
      "Rear welt pockets with horn buttons"
    ],
    "fabricCare": [
      "Dry clean only"
    ],
    "fitInfo": [
      "Generous wide-leg silhouette, relaxed through the thigh",
      "Model is 186 cm and wears size 50"
    ],
    "price": 23500,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Chocolate Brown",
        "hex": "#3B281E"
      }
    ],
    "images": [
      "/images/products/men/chocolate-trousers-1.jpg",
      "/images/products/men/chocolate-trousers-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 19,
    "completeLookProductIds": [
      "prod-m-studio-shacket",
      "prod-m-twill-overshirt"
    ],
    "createdAt": "2024-11-15T11:15:00Z"
  },
  {
    "id": "prod-m-ivory-wide-trousers",
    "name": "Ivory Silk-Wool Relaxed Pleated Trousers",
    "slug": "ivory-silk-wool-relaxed-pleated-trousers",
    "sku": "VEL-M-TRS-017",
    "description": "Ethereal ivory tailoring crafted from custom-spun virgin wool and mulberry silk. Unmatched drape, natural movement, and a quiet statement of supreme refinement.",
    "details": [
      "70% Italian Virgin Wool, 30% Mulberry Silk",
      "Double deep pleats for fluid volume",
      "Discreet hook-and-bar concealed closure",
      "Half lined in lightweight breathable cupro"
    ],
    "fabricCare": [
      "Specialist luxury dry clean only"
    ],
    "fitInfo": [
      "High-rise, relaxed fluid wide leg",
      "Model is 188 cm and wears size 48"
    ],
    "price": 26000,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-3",
    "collectionName": "The Signature Edit",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52"
    ],
    "colors": [
      {
        "name": "Ivory Cream",
        "hex": "#FAF6EF"
      }
    ],
    "images": [
      "/images/products/men/ivory-wide-trousers-1.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 15,
    "completeLookProductIds": [
      "prod-m-minimalist-suit",
      "prod-m-leather-belt"
    ],
    "createdAt": "2024-11-15T11:20:00Z"
  },
  {
    "id": "prod-m-linen-trousers",
    "name": "Bespoke Oatmeal Slub Linen Trousers",
    "slug": "bespoke-oatmeal-slub-linen-trousers",
    "sku": "VEL-M-TRS-018",
    "description": "Pure European linen woven with distinct artisanal slub texture. Features an elasticated back waistband with clean tailored front waistband.",
    "details": [
      "100% French Flax Linen (280 GSM)",
      "Hybrid tailored waistband: clean flat front with discreet inner drawstring",
      "Deep slash pockets and back jet pockets with horn button",
      "Pre-washed to minimize shrinkage and enhance softness"
    ],
    "fabricCare": [
      "100% Pure Linen",
      "Machine wash cold delicate or gentle hand wash",
      "Line dry in shade"
    ],
    "fitInfo": [
      "Relaxed tapered cut with natural ankle break",
      "Model is 184 cm and wears size M"
    ],
    "price": 22000,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-2",
    "collectionName": "The Seasonal Edit",
    "gender": "men",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Oatmeal Linen",
        "hex": "#DED6C9"
      }
    ],
    "images": [
      "/images/products/men/linen-trousers-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.8,
    "reviewCount": 27,
    "completeLookProductIds": [
      "prod-m-linen-jacket",
      "prod-m-brown-linen-shirt"
    ],
    "createdAt": "2024-11-15T11:25:00Z"
  },
  {
    "id": "prod-m-tailored-crease-trousers",
    "name": "Tailored Creased Straight-Leg Trousers",
    "slug": "tailored-creased-straight-leg-trousers",
    "sku": "VEL-M-TRS-019",
    "description": "The definitive everyday trouser. Tailored from seasonless 280 GSM tropical wool with sharp permanent center press creases and clean belt loops.",
    "details": [
      "100% Seasonless Italian Tropical Wool (280 GSM)",
      "Sharp permanent pressed front and rear creases",
      "Hand-finished blind hem",
      "Dual slant pockets and two back welt button pockets"
    ],
    "fabricCare": [
      "Dry clean only",
      "Press with warm steam along crease line"
    ],
    "fitInfo": [
      "Regular mid-rise, straight leg from knee to hem",
      "Model is 186 cm and wears size 48"
    ],
    "price": 24500,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Sand Melange",
        "hex": "#C8B9A6"
      },
      {
        "name": "Dark Taupe",
        "hex": "#7D6F63"
      }
    ],
    "images": [
      "/images/products/men/tailored-trousers-1.jpg",
      "/images/products/men/tailored-trousers-2.jpg",
      "/images/products/men/tailored-trousers-3.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 35,
    "completeLookProductIds": [
      "prod-m-minimalist-suit",
      "prod-m-striped-shirt"
    ],
    "createdAt": "2024-11-15T11:30:00Z"
  },
  {
    "id": "prod-m-oatmeal-wide-trousers",
    "name": "Oatmeal Wide-Leg Studio Trousers",
    "slug": "oatmeal-wide-leg-studio-trousers",
    "sku": "VEL-M-TRS-020",
    "description": "Relaxed tailored wide trousers in a tactile oatmeal virgin wool and cotton blend. High waist with wide belt loops and clean sculptural volume.",
    "details": [
      "60% Virgin Wool, 40% Organic Cotton (320 GSM)",
      "High architectural waist with double-width belt loops",
      "Deep front single pleat and fluid wide-leg fall",
      "Handcrafted in Italy"
    ],
    "fabricCare": [
      "Dry clean only"
    ],
    "fitInfo": [
      "Wide-leg cut with generous volume",
      "Model is 187 cm and wears size 50"
    ],
    "price": 25000,
    "salePrice": null,
    "categoryId": "cat-m-trousers",
    "categoryName": "Trousers",
    "department": "men",
    "collectionId": "col-1",
    "collectionName": "The Essentials",
    "gender": "men",
    "sizes": [
      "46",
      "48",
      "50",
      "52",
      "54"
    ],
    "colors": [
      {
        "name": "Oatmeal Melange",
        "hex": "#D4C5B3"
      },
      {
        "name": "Warm Pebble",
        "hex": "#B8AA99"
      }
    ],
    "images": [
      "/images/products/men/oatmeal-wide-trousers-1.jpg",
      "/images/products/men/oatmeal-wide-trousers-2.jpg",
      "/images/products/men/oatmeal-wide-trousers-3.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": false,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 18,
    "completeLookProductIds": [
      "prod-m-knit-polo",
      "prod-m-taupe-overcoat"
    ],
    "createdAt": "2024-11-15T11:35:00Z"
  },
  {
    "id": "prod-m-leather-belt",
    "name": "Hand-Burnished Bridle Leather Belt",
    "slug": "hand-burnished-bridle-leather-belt",
    "sku": "VEL-M-ACC-021",
    "description": "Handcrafted from 4mm full-grain English bridle leather with hand-waxed edges and custom solid brass buckle with brushed matte finish.",
    "details": [
      "100% Full-Grain Vegetable-Tanned Bridle Leather (32 mm width)",
      "Custom solid brass buckle with subtle brushed matte finish",
      "Hand-burnished and beveled edges sealed with natural beeswax",
      "Five teardrop adjustment holes",
      "Handcrafted in Northamptonshire, England"
    ],
    "fabricCare": [
      "Condition annually with neutral beeswax leather cream",
      "Wipe clean with dry soft cotton cloth"
    ],
    "fitInfo": [
      "Width: 32 mm (1.25 inches)",
      "Order your trouser waist size + 2 inches for optimal fit"
    ],
    "price": 12500,
    "salePrice": null,
    "categoryId": "cat-m-acc",
    "categoryName": "Accessories",
    "department": "men",
    "collectionId": "col-accessories",
    "collectionName": "The Accessories",
    "gender": "unisex",
    "sizes": [
      "80 cm (30\")",
      "85 cm (32\")",
      "90 cm (34\")",
      "95 cm (36\")",
      "100 cm (38\")"
    ],
    "colors": [
      {
        "name": "Rich Cognac",
        "hex": "#7E4822"
      },
      {
        "name": "Pitch Noir",
        "hex": "#171717"
      }
    ],
    "images": [
      "/images/products/men/classic-leather-belt-1.jpg",
      "/images/products/men/classic-leather-belt-2.jpg",
      "/images/products/men/classic-leather-belt-3.jpg",
      "/images/products/men/classic-leather-belt-4.jpg",
      "/images/products/men/classic-leather-belt-5.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 47,
    "completeLookProductIds": [
      "prod-m-tailored-crease-trousers",
      "prod-m-minimalist-suit"
    ],
    "createdAt": "2024-11-15T11:40:00Z"
  },
  {
    "id": "prod-m-classic-watch",
    "name": "The Minimalist Automatic Horology Watch",
    "slug": "the-minimalist-automatic-horology-watch",
    "sku": "VEL-M-ACC-022",
    "description": "Refined minimalist horology featuring a 38mm brushed 316L stainless steel case, clean sand-blasted dial with recessed hour markers, and Swiss automatic movement.",
    "details": [
      "Swiss-Made Automatic Calibre movement with 42-hour power reserve",
      "38 mm diameter x 9.8 mm slim profile in brushed 316L medical stainless steel",
      "Double-domed anti-reflective scratch-resistant sapphire crystal",
      "Italian hand-stitched Tuscan calfskin strap with quick-release spring bars",
      "Water resistant to 50 meters (5 ATM)",
      "Assembled in Geneve, Switzerland"
    ],
    "fabricCare": [
      "Avoid exposure to extreme magnetic fields",
      "Wipe case with provided lint-free polishing cloth"
    ],
    "fitInfo": [
      "38 mm case diameter, 20 mm lug width",
      "Strap fits wrists 160 mm to 205 mm circumference"
    ],
    "price": 65000,
    "salePrice": null,
    "categoryId": "cat-m-acc",
    "categoryName": "Accessories",
    "department": "men",
    "collectionId": "col-accessories",
    "collectionName": "The Accessories",
    "gender": "unisex",
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Brushed Steel & Warm Tan",
        "hex": "#9E8268"
      },
      {
        "name": "Noir & Black Leather",
        "hex": "#1A1A1A"
      }
    ],
    "images": [
      "/images/products/men/minimalist-watch-1.jpg",
      "/images/products/men/minimalist-watch-2.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 38,
    "completeLookProductIds": [
      "prod-m-minimalist-suit",
      "prod-m-leather-portfolio"
    ],
    "createdAt": "2024-11-15T11:45:00Z"
  },
  {
    "id": "prod-m-sunglasses",
    "name": "Hand-Polished Acetate Clubmaster Sunglasses",
    "slug": "hand-polished-acetate-clubmaster-sunglasses",
    "sku": "VEL-M-ACC-023",
    "description": "Classic mid-century silhouette hand-carved from custom Italian Mazzucchelli acetate and titanium wire. Mineral glass polarized lenses provide 100% UV protection.",
    "details": [
      "Hand-polished Italian Mazzucchelli cellulose acetate",
      "Hypoallergenic Japanese titanium brow-line core wire and nose pads",
      "Barberini mineral glass polarized lenses with anti-reflective interior coating",
      "100% UVA/UVB Category 3 optical protection",
      "Includes structured calfskin leather hard case and microfiber cleaning cloth",
      "Crafted in Cadore, Italy"
    ],
    "fabricCare": [
      "Rinse with warm fresh water if exposed to salt or sand",
      "Clean with provided microfiber optical cloth"
    ],
    "fitInfo": [
      "Frame width: 142 mm, Lens: 50 mm, Bridge: 20 mm, Temple: 145 mm",
      "Universally flattering medium fit"
    ],
    "price": 18000,
    "salePrice": null,
    "categoryId": "cat-m-acc",
    "categoryName": "Accessories",
    "department": "men",
    "collectionId": "col-accessories",
    "collectionName": "The Accessories",
    "gender": "unisex",
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Havana Tortoise & Gold",
        "hex": "#634731"
      },
      {
        "name": "Pitch Noir & Silver",
        "hex": "#1A1A1A"
      }
    ],
    "images": [
      "/images/products/men/clubmaster-sunglasses-1.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.9,
    "reviewCount": 22,
    "completeLookProductIds": [
      "prod-m-linen-jacket",
      "prod-m-linen-trousers"
    ],
    "createdAt": "2024-11-15T11:50:00Z"
  },
  {
    "id": "prod-m-ribbed-socks",
    "name": "Mercerized Cotton Ribbed Ankle Socks Trio",
    "slug": "mercerized-cotton-ribbed-ankle-socks-trio",
    "sku": "VEL-M-ACC-024",
    "description": "Trio pack of sartorial dress socks knitted on 200-needle Italian machinery from double-mercerized Fil d'Ecosse Scottish lisle cotton.",
    "details": [
      "90% Fil d'Ecosse Mercerized Cotton, 10% Polyamide for shape retention",
      "200-needle fine knit with hand-linked seamless toe closure to prevent pressure points",
      "Gentle ribbed cuff designed to stay up without constriction",
      "Set includes: Oatmeal, Warm Camel, and Soft Sand",
      "Knitted in Brescia, Italy"
    ],
    "fabricCare": [
      "Machine wash 30°C delicate, wash inside out",
      "Air dry to prolong elasticity"
    ],
    "fitInfo": [
      "Pack includes 3 pairs",
      "M fits EU 40-42 (US 7-9), L fits EU 43-45 (US 10-12)"
    ],
    "price": 4200,
    "salePrice": null,
    "categoryId": "cat-m-acc",
    "categoryName": "Accessories",
    "department": "men",
    "collectionId": "col-accessories",
    "collectionName": "The Accessories",
    "gender": "men",
    "sizes": [
      "M (EU 40-42)",
      "L (EU 43-45)"
    ],
    "colors": [
      {
        "name": "Neutral Trio (Oatmeal, Camel, Sand)",
        "hex": "#C7B8A1"
      }
    ],
    "images": [
      "/images/products/men/ribbed-socks-1.jpg",
      "/images/products/men/ribbed-socks-2.jpg",
      "/images/products/men/ribbed-socks-3.jpg"
    ],
    "isFeatured": false,
    "isNewArrival": false,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 4.8,
    "reviewCount": 54,
    "completeLookProductIds": [
      "prod-m-leather-belt",
      "prod-m-tailored-crease-trousers"
    ],
    "createdAt": "2024-11-15T11:55:00Z"
  },
  {
    "id": "prod-m-leather-portfolio",
    "name": "Full-Grain Calfskin Atelier Portfolio & Small Leather Goods",
    "slug": "full-grain-calfskin-atelier-portfolio",
    "sku": "VEL-M-ACC-025",
    "description": "Sculptural zippered folio crafted from vegetable-tanned French calfskin. Fits 13-inch laptop, legal documents, and atelier notebook with discreet pen slots.",
    "details": [
      "100% Full-Grain French Box Calfskin with soft natural grain",
      "Supple unlined natural calf suede interior lining",
      "Solid brass two-way Excella zipper with leather pull tags",
      "Accommodates up to 14-inch MacBook and legal folders",
      "Hand-painted and burnished raw edges",
      "Crafted in Florence, Italy"
    ],
    "fabricCare": [
      "100% Vegetable-Tanned Calfskin",
      "Nourish annually with natural organic leather cream",
      "Store in provided velvet-lined cotton dust pouch"
    ],
    "fitInfo": [
      "External dimensions: 35 cm width x 25 cm height x 3 cm depth",
      "Fits 13\" / 14\" laptop and documents"
    ],
    "price": 29500,
    "salePrice": null,
    "categoryId": "cat-m-acc",
    "categoryName": "Accessories",
    "department": "men",
    "collectionId": "col-accessories",
    "collectionName": "The Accessories",
    "gender": "unisex",
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Espresso Brown",
        "hex": "#3D2B1F"
      },
      {
        "name": "Warm Chestnut",
        "hex": "#6E472A"
      }
    ],
    "images": [
      "/images/products/men/leather-portfolio-1.jpg",
      "/images/products/men/leather-portfolio-2.jpg",
      "/images/products/men/leather-portfolio-3.jpg"
    ],
    "isFeatured": true,
    "isNewArrival": true,
    "isBestSeller": true,
    "isPublished": true,
    "rating": 5,
    "reviewCount": 28,
    "completeLookProductIds": [
      "prod-m-classic-watch",
      "prod-m-minimalist-suit"
    ],
    "createdAt": "2024-11-15T12:00:00Z"
  }
];

export const INITIAL_PRODUCTS: Product[] = ALL_INITIAL_PRODUCTS;

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
    productId: "prod-home-blazer",
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
    productId: "prod-home-blazer",
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
    productId: "prod-home-knit",
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
    productId: "prod-ref-bomber",
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
        productId: "prod-home-blazer",
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
        productId: "prod-ref-bomber",
        productName: "Architectural Boxy Wool Blazer",
        price: 36000,
        quantity: 1,
        size: "L",
        color: "Night Slate",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "item-3",
        productId: "prod-home-knit",
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
        productId: "prod-home-dress",
        productName: "Fluid Midi Dress",
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

