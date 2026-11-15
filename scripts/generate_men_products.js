const fs = require('fs');
const path = require('path');

const menProducts = [
  {
    id: "prod-m-camel-overcoat",
    name: "Double-Faced Camel Wool Overcoat",
    slug: "double-faced-camel-wool-overcoat",
    sku: "VEL-M-OCT-001",
    description: "An architectural icon crafted from unlined double-faced baby camelhair and virgin wool. Hand-finished split seams, generous storm flap, and a relaxed tailored drape designed for considered cold-weather layering.",
    details: [
      "90% Baby Camelhair, 10% Virgin Wool (620 GSM)",
      "Hand-finished double-faced construction with invisible split seams",
      "Concealed horn button front placket with horn throat latch",
      "Generous welt hand pockets and interior chest slip pocket",
      "Deep center back vent for effortless movement",
      "Handcrafted in Biella, Italy"
    ],
    fabricCare: [
      "90% Camelhair, 10% Virgin Wool",
      "Specialist luxury dry clean only",
      "Steam gently on low setting",
      "Store on wide contoured wooden hanger"
    ],
    fitInfo: [
      "Tailored architectural silhouette with generous drape",
      "Designed for standard layering over tailoring or knits",
      "Model is 187 cm / 6'1.5\" and wears size 50 (M/L)"
    ],
    price: 48000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Camelhair", hex: "#C2A888" },
      { name: "Raw Cream", hex: "#F3ECE1" }
    ],
    images: [
      "/images/products/men/camel-overcoat-1.jpg",
      "/images/products/men/camel-overcoat-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 18,
    completeLookProductIds: ["prod-m-charcoal-trousers", "prod-m-ivory-poplin-shirt"],
    createdAt: "2024-11-15T10:00:00Z"
  },
  {
    id: "prod-m-taupe-overcoat",
    name: "Taupe Double-Breasted Wool Greatcoat",
    slug: "taupe-double-breasted-wool-greatcoat",
    sku: "VEL-M-OCT-002",
    description: "Commanding double-breasted silhouette sculpted in dense Italian melton wool. Broad peak lapels, suppressed waist, and a floor-skimming hem define this modern heirloom piece.",
    details: [
      "100% Italian Virgin Melton Wool (580 GSM)",
      "Structured roped shoulders with lightweight horsehair chest canvas",
      "Six-button double-breasted stance with interior anchor button",
      "Full cupro-silk jacquard lining for effortless gliding over knitwear",
      "Handcrafted in Florence, Italy"
    ],
    fabricCare: [
      "100% Virgin Wool, 100% Cupro Lining",
      "Delicate luxury dry clean only",
      "Low temperature press with damp cloth",
      "Keep hung on broad contoured atelier hanger"
    ],
    fitInfo: [
      "Subtly structured shoulders, regular through the torso",
      "Floor-length cut for statuesque presence",
      "Model is 188 cm / 6'2\" and wears size 48 (M)"
    ],
    price: 52000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Warm Taupe", hex: "#B8A99A" },
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/men/taupe-overcoat-1.jpg"
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 14,
    completeLookProductIds: ["prod-m-oatmeal-wide-trousers", "prod-m-knit-polo"],
    createdAt: "2024-11-15T10:05:00Z"
  },
  {
    id: "prod-m-minimalist-suit",
    name: "Minimalist Beige Wool Atelier Suit Jacket",
    slug: "minimalist-beige-wool-atelier-suit-jacket",
    sku: "VEL-M-JKT-003",
    description: "Modern single-breasted suit jacket crafted in lightweight super-130s wool twill. Soft natural shoulders and clean notched lapels offer quiet formality.",
    details: [
      "100% Italian Super 130s Wool Twill",
      "Soft unpadded natural shoulder construction",
      "Horn two-button front with kissing cuff buttons",
      "Dual side vents and partial cupro butterfly lining",
      "Crafted in Biella, Italy"
    ],
    fabricCare: [
      "100% Virgin Wool",
      "Dry clean only by garment specialist"
    ],
    fitInfo: [
      "Tailored modern silhouette, slim body fit",
      "Model is 185 cm / 6'1\" and wears size 48"
    ],
    price: 42500,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Sand Oatmeal", hex: "#D4C7B5" },
      { name: "Cream", hex: "#F3EDE2" }
    ],
    images: [
      "/images/products/men/minimalist-suit-1.jpg",
      "/images/products/men/minimalist-suit-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 22,
    completeLookProductIds: ["prod-m-tailored-crease-trousers", "prod-m-oxford-shirt"],
    createdAt: "2024-11-15T10:10:00Z"
  },
  {
    id: "prod-m-stone-blazer",
    name: "Stone Beige Unstructured Atelier Blazer",
    slug: "stone-beige-unstructured-atelier-blazer",
    sku: "VEL-M-JKT-004",
    description: "An effortless sartorial staple tailored from washed virgin wool and silk faille. Unlined body, patch pockets, and hand-rolled lapels embrace relaxed elegance.",
    details: [
      "75% Virgin Wool, 25% Silk Faille (310 GSM)",
      "Unstructured deconstructed atelier make",
      "Curved barchetta chest pocket and rounded patch hip pockets",
      "Real smoked mother-of-pearl buttons",
      "Crafted in Naples, Italy"
    ],
    fabricCare: [
      "Delicate luxury dry clean only",
      "Hang to aerate between wears"
    ],
    fitInfo: [
      "Relaxed tailored fit with natural drape",
      "Model is 186 cm and wears size 50"
    ],
    price: 36000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-2",
    collectionName: "The Seasonal Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Stone Beige", hex: "#D8CFC4" },
      { name: "Pebble Taupe", hex: "#BFAF9E" }
    ],
    images: [
      "/images/products/men/stone-blazer-1.jpg",
      "/images/products/men/stone-blazer-2.jpg",
      "/images/products/men/stone-blazer-3.jpg"
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 19,
    completeLookProductIds: ["prod-m-linen-trousers", "prod-m-brown-linen-shirt"],
    createdAt: "2024-11-15T10:15:00Z"
  },
  {
    id: "prod-m-linen-jacket",
    name: "Artisanal Slub Linen Tailored Jacket",
    slug: "artisanal-slub-linen-tailored-jacket",
    sku: "VEL-M-JKT-005",
    description: "Masterfully woven from French Normandy flax linen with high tactile slub texture. Cut with relaxed architectural ease for warm seasons.",
    details: [
      "100% French Normandy Linen (340 GSM)",
      "Breathable unlined construction with taped contrast seams",
      "Three-roll-two front button closure",
      "Patch pockets and double rear vents",
      "Crafted in Normandy & Milan"
    ],
    fabricCare: [
      "100% Pure Flax Linen",
      "Gentle dry clean or cold hand wash",
      "Embrace natural creasing characteristic of pure linen"
    ],
    fitInfo: [
      "Relaxed silhouette with comfortable room through chest",
      "Model is 184 cm and wears size 48"
    ],
    price: 34000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-2",
    collectionName: "The Seasonal Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52"],
    colors: [
      { name: "Raw Oatmeal", hex: "#DDD2C3" },
      { name: "Sunlit Linen", hex: "#ECE4D6" }
    ],
    images: [
      "/images/products/men/artisanal-linen-jacket-1.jpg",
      "/images/products/men/artisanal-linen-jacket-2.jpg",
      "/images/products/men/artisanal-linen-jacket-3.jpg"
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 12,
    completeLookProductIds: ["prod-m-linen-trousers", "prod-m-brown-linen-shirt"],
    createdAt: "2024-11-15T10:20:00Z"
  },
  {
    id: "prod-m-noir-jacket",
    name: "Contemporary Noir Minimalist Jacket",
    slug: "contemporary-noir-minimalist-jacket",
    sku: "VEL-M-JKT-006",
    description: "A dark architectural statement cut in deep pitch-noir virgin wool cavalry twill. Sleek, sharp collar line and hidden placket for quiet modernism.",
    details: [
      "100% Virgin Wool Cavalry Twill (400 GSM)",
      "Concealed button front with matte oxidized hardware",
      "Discrete vertical slash pockets integrated into princess seams",
      "Silky breathable cupro lining",
      "Crafted in Como, Italy"
    ],
    fabricCare: [
      "100% Virgin Wool",
      "Specialist dry clean only",
      "Store away from direct light"
    ],
    fitInfo: [
      "Clean boxy silhouette with dropped shoulder ease",
      "Model is 188 cm and wears size 50"
    ],
    price: 38500,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-4",
    collectionName: "The Monochrome Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/men/noir-jacket-1.jpg",
      "/images/products/men/noir-jacket-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 26,
    completeLookProductIds: ["prod-m-charcoal-trousers", "prod-m-black-satin-shirt"],
    createdAt: "2024-11-15T10:25:00Z"
  },
  {
    id: "prod-m-studio-shacket",
    name: "Relaxed Wool-Blend Studio Shacket",
    slug: "relaxed-wool-blend-studio-shacket",
    sku: "VEL-M-JKT-007",
    description: "Versatile transitional outer layer crafted from double-cloth wool and cashmere. Square camp collar, generous patch pockets, and straight hem.",
    details: [
      "85% Virgin Wool, 15% Cashmere",
      "Dual oversized chest utility patch pockets",
      "Horn button closures with reinforced inner taping",
      "Straight workwear-inspired hem with side split vents"
    ],
    fabricCare: [
      "Delicate dry clean only"
    ],
    fitInfo: [
      "Easy, relaxed boxy cut suitable for layering over tees or knits",
      "Model is 185 cm and wears size M"
    ],
    price: 28000,
    salePrice: null,
    categoryId: "cat-m-jackets",
    categoryName: "Jackets",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mocha Brown", hex: "#5C4033" },
      { name: "Beige Cream", hex: "#E8E0D2" }
    ],
    images: [
      "/images/products/men/studio-shacket-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 15,
    completeLookProductIds: ["prod-m-chocolate-trousers", "prod-m-ivory-poplin-shirt"],
    createdAt: "2024-11-15T10:30:00Z"
  },
  {
    id: "prod-m-black-satin-shirt",
    name: "Fluid Silk-Satin Evening Shirt",
    slug: "fluid-silk-satin-evening-shirt",
    sku: "VEL-M-SHT-008",
    description: "Sensuous silk crepe-back satin cut with relaxed fluid drape. Subtle luster in dim evening light, concealed button placket, and French cuffs.",
    details: [
      "100% Pure Mulberry Silk Crepe-Back Satin (19 mm)",
      "Concealed front button placket for uninterrupted drape",
      "Minimalist small spread collar with removable collar stays",
      "Mother-of-pearl buttons under placket",
      "Crafted in Como, Italy"
    ],
    fabricCare: [
      "100% Pure Silk",
      "Delicate dry clean only or gentle silk hand wash",
      "Low steam on reverse"
    ],
    fitInfo: [
      "Fluid tailored cut designed to drape naturally against the torso",
      "Model is 187 cm and wears size 48"
    ],
    price: 18500,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-4",
    collectionName: "The Monochrome Edit",
    gender: "men",
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/men/black-satin-shirt-1.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 20,
    completeLookProductIds: ["prod-m-noir-jacket", "prod-m-charcoal-trousers"],
    createdAt: "2024-11-15T10:35:00Z"
  },
  {
    id: "prod-m-brown-linen-shirt",
    name: "Mocha Brown Pure Linen Studio Shirt",
    slug: "mocha-brown-pure-linen-studio-shirt",
    sku: "VEL-M-SHT-009",
    description: "Garment-washed pure European flax linen in rich mocha brown. Relaxed fit with soft camp collar and genuine shell buttons.",
    details: [
      "100% European Flax Linen (180 GSM)",
      "Enzyme-washed for immediate broken-in softness",
      "Convertible camp collar designed to be worn open",
      "Single chest patch pocket and split back yoke"
    ],
    fabricCare: [
      "Machine wash delicate cold or gentle hand wash",
      "Line dry in shade to preserve color depth"
    ],
    fitInfo: [
      "Relaxed cut with casual drape",
      "Model is 186 cm and wears size L"
    ],
    price: 16500,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-2",
    collectionName: "The Seasonal Edit",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mocha Brown", hex: "#4E3629" }
    ],
    images: [
      "/images/products/men/brown-linen-shirt-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 31,
    completeLookProductIds: ["prod-m-linen-trousers", "prod-m-stone-blazer"],
    createdAt: "2024-11-15T10:40:00Z"
  },
  {
    id: "prod-m-twill-overshirt",
    name: "Structured Heavy Twill Overshirt",
    slug: "structured-heavy-twill-overshirt",
    sku: "VEL-M-SHT-010",
    description: "Rugged yet refined overshirt woven in 320 GSM organic cotton twill. Double flap chest pockets and tortoiseshell horn buttons.",
    details: [
      "100% GOTS Certified Organic Cotton Twill (320 GSM)",
      "Double chest bellows pockets with button flap closure",
      "Reinforced elbow patches and durable flat-felled seam construction",
      "Horn buttons throughout"
    ],
    fabricCare: [
      "Machine wash 30°C delicate cycle",
      "Hang to air dry"
    ],
    fitInfo: [
      "Substantial overshirt cut intended to fit over t-shirts and light knits",
      "Model is 185 cm and wears size M"
    ],
    price: 21000,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Warm Umber", hex: "#634735" },
      { name: "Beige Twill", hex: "#C7B7A2" }
    ],
    images: [
      "/images/products/men/twill-overshirt-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.8,
    reviewCount: 16,
    completeLookProductIds: ["prod-m-chocolate-trousers", "prod-m-leather-belt"],
    createdAt: "2024-11-15T10:45:00Z"
  },
  {
    id: "prod-m-ivory-poplin-shirt",
    name: "Crisp Ivory Studio Poplin Shirt",
    slug: "crisp-ivory-studio-poplin-shirt",
    sku: "VEL-M-SHT-011",
    description: "Foundational tailored shirt crafted from 120/2 two-ply Giza Egyptian cotton poplin. Pristine ivory finish with sharp semi-spread collar.",
    details: [
      "100% Extra-Long Staple Egyptian Giza Cotton (120/2 yarn)",
      "Mother-of-pearl buttons sewn with lily-stitch threading",
      "Clean French placket and curved hemline",
      "Removable brass collar stiffeners",
      "Crafted in Bergamo, Italy"
    ],
    fabricCare: [
      "100% Egyptian Cotton",
      "Machine wash 40°C, warm iron with starch or steam"
    ],
    fitInfo: [
      "Tailored modern cut with comfortable armhole pitch",
      "Model is 187 cm and wears size 40 (15.75\")"
    ],
    price: 15500,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "Ivory White", hex: "#FAF8F5" }
    ],
    images: [
      "/images/products/men/ivory-poplin-shirt-1.jpg",
      "/images/products/men/ivory-poplin-shirt-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 42,
    completeLookProductIds: ["prod-m-camel-overcoat", "prod-m-charcoal-trousers"],
    createdAt: "2024-11-15T10:50:00Z"
  },
  {
    id: "prod-m-striped-shirt",
    name: "Fine Striped Atelier Poplin Shirt",
    slug: "fine-striped-atelier-poplin-shirt",
    sku: "VEL-M-SHT-012",
    description: "Understated hairline banker stripe woven in crisp 100% long-staple cotton poplin. Perfect balance of traditional haberdashery and modern luxury.",
    details: [
      "100% Long-Staple Compact Cotton",
      "Subtle 1mm sand-and-ivory alternating stripe",
      "Reinforced side seam gussets with embroidered VELORA monogram",
      "Clean bevelled single-button cuffs"
    ],
    fabricCare: [
      "Machine wash cold, tumble dry low or line dry"
    ],
    fitInfo: [
      "Classic tailored regular fit",
      "Model is 186 cm and wears size 40"
    ],
    price: 16000,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["39", "40", "41", "42", "43"],
    colors: [
      { name: "Sand & White Stripe", hex: "#D9CEC1" }
    ],
    images: [
      "/images/products/men/striped-poplin-shirt-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 23,
    completeLookProductIds: ["prod-m-tailored-crease-trousers", "prod-m-minimalist-suit"],
    createdAt: "2024-11-15T10:55:00Z"
  },
  {
    id: "prod-m-oxford-shirt",
    name: "Sand Washed Oxford Button-Down Shirt",
    slug: "sand-washed-oxford-button-down-shirt",
    sku: "VEL-M-SHT-013",
    description: "Classic Ivy League silhouette reimagined in heavy uncombed basketweave Oxford cloth with garment tumble wash for a soft sand finish.",
    details: [
      "100% Heavyweight Cotton Oxford Cloth (240 GSM)",
      "Unlined button-down collar with natural rolling arch",
      "Box pleat with locker loop at center back yoke",
      "Genuine river shell buttons"
    ],
    fabricCare: [
      "Machine wash 30°C, hang dry"
    ],
    fitInfo: [
      "Slightly relaxed traditional fit",
      "Model is 185 cm and wears size M"
    ],
    price: 15000,
    salePrice: null,
    categoryId: "cat-m-shirts",
    categoryName: "Shirts",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand Beige", hex: "#D6C7B2" }
    ],
    images: [
      "/images/products/men/sand-oxford-shirt-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.8,
    reviewCount: 17,
    completeLookProductIds: ["prod-m-chocolate-trousers", "prod-m-leather-belt"],
    createdAt: "2024-11-15T11:00:00Z"
  },
  {
    id: "prod-m-knit-polo",
    name: "Fine Merino Ribbed Knit Polo Shirt",
    slug: "fine-merino-ribbed-knit-polo-shirt",
    sku: "VEL-M-KNT-014",
    description: "Knit from ultra-fine 18.5-micron Australian merino wool in a delicate 16-gauge rib. Features a seamless knitted collar and buttonless Johnny polo neck.",
    details: [
      "100% Extra-Fine Australian Merino Wool (16-gauge)",
      "Naturally thermo-regulating, anti-odor and breathable",
      "Seamless fully-fashioned knit collar",
      "Ribbed cuffs and ribbed bottom band",
      "Knit in Biella, Italy"
    ],
    fabricCare: [
      "100% Pure Merino Wool",
      "Hand wash cold with wool detergent or dry clean",
      "Dry flat, never hang"
    ],
    fitInfo: [
      "Tailored slim knitwear fit with gentle stretch",
      "Model is 186 cm and wears size M"
    ],
    price: 22500,
    salePrice: null,
    categoryId: "cat-m-knitwear",
    categoryName: "Knitwear",
    department: "men",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Warm Taupe", hex: "#9E8E81" },
      { name: "Oatmeal", hex: "#D4C7B8" }
    ],
    images: [
      "/images/products/men/taupe-knit-polo-1.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 29,
    completeLookProductIds: ["prod-m-oatmeal-wide-trousers", "prod-m-taupe-overcoat"],
    createdAt: "2024-11-15T11:05:00Z"
  },
  {
    id: "prod-m-charcoal-trousers",
    name: "Charcoal Pleated Virgin Wool Trousers",
    slug: "charcoal-pleated-virgin-wool-trousers",
    sku: "VEL-M-TRS-015",
    description: "High-waisted trousers cut from dense 340 GSM Italian virgin wool flannel. Forward single pleats, side buckle adjusters, and a clean straight leg.",
    details: [
      "100% Italian Virgin Wool Flannel (340 GSM)",
      "High-rise waistband with extended tab and brass side adjusters (no belt loops required)",
      "Crisp front creases and slanted side pockets",
      "Interior curtain waistband for sartorial longevity",
      "Unfinished hem for bespoke length alteration"
    ],
    fabricCare: [
      "Specialist luxury dry clean only"
    ],
    fitInfo: [
      "High rise, comfortable through seat, straight leg profile",
      "Model is 187 cm / 32\" waist and wears size 48"
    ],
    price: 24000,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-4",
    collectionName: "The Monochrome Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Charcoal Melange", hex: "#383838" },
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/men/charcoal-trousers-1.jpg"
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 33,
    completeLookProductIds: ["prod-m-camel-overcoat", "prod-m-ivory-poplin-shirt"],
    createdAt: "2024-11-15T11:10:00Z"
  },
  {
    id: "prod-m-chocolate-trousers",
    name: "Chocolate Brown Fluid Wide-Leg Trousers",
    slug: "chocolate-brown-fluid-wide-leg-trousers",
    sku: "VEL-M-TRS-016",
    description: "Sumptuous chocolate brown trousers cut with fluid double front pleats and generous wide-leg profile in Italian wool-mohair twill.",
    details: [
      "85% Virgin Wool, 15% Kid Mohair (300 GSM)",
      "Double reverse front pleats creating architectural drape",
      "Full floor-skimming wide-leg cut with 24 cm hem opening",
      "Rear welt pockets with horn buttons"
    ],
    fabricCare: [
      "Dry clean only"
    ],
    fitInfo: [
      "Generous wide-leg silhouette, relaxed through the thigh",
      "Model is 186 cm and wears size 50"
    ],
    price: 23500,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Chocolate Brown", hex: "#3B281E" }
    ],
    images: [
      "/images/products/men/chocolate-trousers-1.jpg",
      "/images/products/men/chocolate-trousers-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 19,
    completeLookProductIds: ["prod-m-studio-shacket", "prod-m-twill-overshirt"],
    createdAt: "2024-11-15T11:15:00Z"
  },
  {
    id: "prod-m-ivory-wide-trousers",
    name: "Ivory Silk-Wool Relaxed Pleated Trousers",
    slug: "ivory-silk-wool-relaxed-pleated-trousers",
    sku: "VEL-M-TRS-017",
    description: "Ethereal ivory tailoring crafted from custom-spun virgin wool and mulberry silk. Unmatched drape, natural movement, and a quiet statement of supreme refinement.",
    details: [
      "70% Italian Virgin Wool, 30% Mulberry Silk",
      "Double deep pleats for fluid volume",
      "Discreet hook-and-bar concealed closure",
      "Half lined in lightweight breathable cupro"
    ],
    fabricCare: [
      "Specialist luxury dry clean only"
    ],
    fitInfo: [
      "High-rise, relaxed fluid wide leg",
      "Model is 188 cm and wears size 48"
    ],
    price: 26000,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-3",
    collectionName: "The Signature Edit",
    gender: "men",
    sizes: ["46", "48", "50", "52"],
    colors: [
      { name: "Ivory Cream", hex: "#FAF6EF" }
    ],
    images: [
      "/images/products/men/ivory-wide-trousers-1.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 15,
    completeLookProductIds: ["prod-m-minimalist-suit", "prod-m-leather-belt"],
    createdAt: "2024-11-15T11:20:00Z"
  },
  {
    id: "prod-m-linen-trousers",
    name: "Bespoke Oatmeal Slub Linen Trousers",
    slug: "bespoke-oatmeal-slub-linen-trousers",
    sku: "VEL-M-TRS-018",
    description: "Pure European linen woven with distinct artisanal slub texture. Features an elasticated back waistband with clean tailored front waistband.",
    details: [
      "100% French Flax Linen (280 GSM)",
      "Hybrid tailored waistband: clean flat front with discreet inner drawstring",
      "Deep slash pockets and back jet pockets with horn button",
      "Pre-washed to minimize shrinkage and enhance softness"
    ],
    fabricCare: [
      "100% Pure Linen",
      "Machine wash cold delicate or gentle hand wash",
      "Line dry in shade"
    ],
    fitInfo: [
      "Relaxed tapered cut with natural ankle break",
      "Model is 184 cm and wears size M"
    ],
    price: 22000,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-2",
    collectionName: "The Seasonal Edit",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Linen", hex: "#DED6C9" }
    ],
    images: [
      "/images/products/men/linen-trousers-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 27,
    completeLookProductIds: ["prod-m-linen-jacket", "prod-m-brown-linen-shirt"],
    createdAt: "2024-11-15T11:25:00Z"
  },
  {
    id: "prod-m-tailored-crease-trousers",
    name: "Tailored Creased Straight-Leg Trousers",
    slug: "tailored-creased-straight-leg-trousers",
    sku: "VEL-M-TRS-019",
    description: "The definitive everyday trouser. Tailored from seasonless 280 GSM tropical wool with sharp permanent center press creases and clean belt loops.",
    details: [
      "100% Seasonless Italian Tropical Wool (280 GSM)",
      "Sharp permanent pressed front and rear creases",
      "Hand-finished blind hem",
      "Dual slant pockets and two back welt button pockets"
    ],
    fabricCare: [
      "Dry clean only",
      "Press with warm steam along crease line"
    ],
    fitInfo: [
      "Regular mid-rise, straight leg from knee to hem",
      "Model is 186 cm and wears size 48"
    ],
    price: 24500,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Sand Melange", hex: "#C8B9A6" },
      { name: "Dark Taupe", hex: "#7D6F63" }
    ],
    images: [
      "/images/products/men/tailored-trousers-1.jpg",
      "/images/products/men/tailored-trousers-2.jpg",
      "/images/products/men/tailored-trousers-3.jpg"
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 35,
    completeLookProductIds: ["prod-m-minimalist-suit", "prod-m-striped-shirt"],
    createdAt: "2024-11-15T11:30:00Z"
  },
  {
    id: "prod-m-oatmeal-wide-trousers",
    name: "Oatmeal Wide-Leg Studio Trousers",
    slug: "oatmeal-wide-leg-studio-trousers",
    sku: "VEL-M-TRS-020",
    description: "Relaxed tailored wide trousers in a tactile oatmeal virgin wool and cotton blend. High waist with wide belt loops and clean sculptural volume.",
    details: [
      "60% Virgin Wool, 40% Organic Cotton (320 GSM)",
      "High architectural waist with double-width belt loops",
      "Deep front single pleat and fluid wide-leg fall",
      "Handcrafted in Italy"
    ],
    fabricCare: [
      "Dry clean only"
    ],
    fitInfo: [
      "Wide-leg cut with generous volume",
      "Model is 187 cm and wears size 50"
    ],
    price: 25000,
    salePrice: null,
    categoryId: "cat-m-trousers",
    categoryName: "Trousers",
    department: "men",
    collectionId: "col-1",
    collectionName: "The Essentials",
    gender: "men",
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "Oatmeal Melange", hex: "#D4C5B3" },
      { name: "Warm Pebble", hex: "#B8AA99" }
    ],
    images: [
      "/images/products/men/oatmeal-wide-trousers-1.jpg",
      "/images/products/men/oatmeal-wide-trousers-2.jpg",
      "/images/products/men/oatmeal-wide-trousers-3.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewCount: 18,
    completeLookProductIds: ["prod-m-knit-polo", "prod-m-taupe-overcoat"],
    createdAt: "2024-11-15T11:35:00Z"
  },
  {
    id: "prod-m-leather-belt",
    name: "Hand-Burnished Bridle Leather Belt",
    slug: "hand-burnished-bridle-leather-belt",
    sku: "VEL-M-ACC-021",
    description: "Handcrafted from 4mm full-grain English bridle leather with hand-waxed edges and custom solid brass buckle with brushed matte finish.",
    details: [
      "100% Full-Grain Vegetable-Tanned Bridle Leather (32 mm width)",
      "Custom solid brass buckle with subtle brushed matte finish",
      "Hand-burnished and beveled edges sealed with natural beeswax",
      "Five teardrop adjustment holes",
      "Handcrafted in Northamptonshire, England"
    ],
    fabricCare: [
      "Condition annually with neutral beeswax leather cream",
      "Wipe clean with dry soft cotton cloth"
    ],
    fitInfo: [
      "Width: 32 mm (1.25 inches)",
      "Order your trouser waist size + 2 inches for optimal fit"
    ],
    price: 12500,
    salePrice: null,
    categoryId: "cat-m-acc",
    categoryName: "Accessories",
    department: "men",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["80 cm (30\")", "85 cm (32\")", "90 cm (34\")", "95 cm (36\")", "100 cm (38\")"],
    colors: [
      { name: "Rich Cognac", hex: "#7E4822" },
      { name: "Pitch Noir", hex: "#171717" }
    ],
    images: [
      "/images/products/men/classic-leather-belt-1.jpg",
      "/images/products/men/classic-leather-belt-2.jpg",
      "/images/products/men/classic-leather-belt-3.jpg",
      "/images/products/men/classic-leather-belt-4.jpg",
      "/images/products/men/classic-leather-belt-5.jpg"
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 47,
    completeLookProductIds: ["prod-m-tailored-crease-trousers", "prod-m-minimalist-suit"],
    createdAt: "2024-11-15T11:40:00Z"
  },
  {
    id: "prod-m-classic-watch",
    name: "The Minimalist Automatic Horology Watch",
    slug: "the-minimalist-automatic-horology-watch",
    sku: "VEL-M-ACC-022",
    description: "Refined minimalist horology featuring a 38mm brushed 316L stainless steel case, clean sand-blasted dial with recessed hour markers, and Swiss automatic movement.",
    details: [
      "Swiss-Made Automatic Calibre movement with 42-hour power reserve",
      "38 mm diameter x 9.8 mm slim profile in brushed 316L medical stainless steel",
      "Double-domed anti-reflective scratch-resistant sapphire crystal",
      "Italian hand-stitched Tuscan calfskin strap with quick-release spring bars",
      "Water resistant to 50 meters (5 ATM)",
      "Assembled in Geneve, Switzerland"
    ],
    fabricCare: [
      "Avoid exposure to extreme magnetic fields",
      "Wipe case with provided lint-free polishing cloth"
    ],
    fitInfo: [
      "38 mm case diameter, 20 mm lug width",
      "Strap fits wrists 160 mm to 205 mm circumference"
    ],
    price: 65000,
    salePrice: null,
    categoryId: "cat-m-acc",
    categoryName: "Accessories",
    department: "men",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Brushed Steel & Warm Tan", hex: "#9E8268" },
      { name: "Noir & Black Leather", hex: "#1A1A1A" }
    ],
    images: [
      "/images/products/men/minimalist-watch-1.jpg",
      "/images/products/men/minimalist-watch-2.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 38,
    completeLookProductIds: ["prod-m-minimalist-suit", "prod-m-leather-portfolio"],
    createdAt: "2024-11-15T11:45:00Z"
  },
  {
    id: "prod-m-sunglasses",
    name: "Hand-Polished Acetate Clubmaster Sunglasses",
    slug: "hand-polished-acetate-clubmaster-sunglasses",
    sku: "VEL-M-ACC-023",
    description: "Classic mid-century silhouette hand-carved from custom Italian Mazzucchelli acetate and titanium wire. Mineral glass polarized lenses provide 100% UV protection.",
    details: [
      "Hand-polished Italian Mazzucchelli cellulose acetate",
      "Hypoallergenic Japanese titanium brow-line core wire and nose pads",
      "Barberini mineral glass polarized lenses with anti-reflective interior coating",
      "100% UVA/UVB Category 3 optical protection",
      "Includes structured calfskin leather hard case and microfiber cleaning cloth",
      "Crafted in Cadore, Italy"
    ],
    fabricCare: [
      "Rinse with warm fresh water if exposed to salt or sand",
      "Clean with provided microfiber optical cloth"
    ],
    fitInfo: [
      "Frame width: 142 mm, Lens: 50 mm, Bridge: 20 mm, Temple: 145 mm",
      "Universally flattering medium fit"
    ],
    price: 18000,
    salePrice: null,
    categoryId: "cat-m-acc",
    categoryName: "Accessories",
    department: "men",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Havana Tortoise & Gold", hex: "#634731" },
      { name: "Pitch Noir & Silver", hex: "#1A1A1A" }
    ],
    images: [
      "/images/products/men/clubmaster-sunglasses-1.jpg"
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewCount: 22,
    completeLookProductIds: ["prod-m-linen-jacket", "prod-m-linen-trousers"],
    createdAt: "2024-11-15T11:50:00Z"
  },
  {
    id: "prod-m-ribbed-socks",
    name: "Mercerized Cotton Ribbed Ankle Socks Trio",
    slug: "mercerized-cotton-ribbed-ankle-socks-trio",
    sku: "VEL-M-ACC-024",
    description: "Trio pack of sartorial dress socks knitted on 200-needle Italian machinery from double-mercerized Fil d'Ecosse Scottish lisle cotton.",
    details: [
      "90% Fil d'Ecosse Mercerized Cotton, 10% Polyamide for shape retention",
      "200-needle fine knit with hand-linked seamless toe closure to prevent pressure points",
      "Gentle ribbed cuff designed to stay up without constriction",
      "Set includes: Oatmeal, Warm Camel, and Soft Sand",
      "Knitted in Brescia, Italy"
    ],
    fabricCare: [
      "Machine wash 30°C delicate, wash inside out",
      "Air dry to prolong elasticity"
    ],
    fitInfo: [
      "Pack includes 3 pairs",
      "M fits EU 40-42 (US 7-9), L fits EU 43-45 (US 10-12)"
    ],
    price: 4200,
    salePrice: null,
    categoryId: "cat-m-acc",
    categoryName: "Accessories",
    department: "men",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "men",
    sizes: ["M (EU 40-42)", "L (EU 43-45)"],
    colors: [
      { name: "Neutral Trio (Oatmeal, Camel, Sand)", hex: "#C7B8A1" }
    ],
    images: [
      "/images/products/men/ribbed-socks-1.jpg",
      "/images/products/men/ribbed-socks-2.jpg",
      "/images/products/men/ribbed-socks-3.jpg"
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.8,
    reviewCount: 54,
    completeLookProductIds: ["prod-m-leather-belt", "prod-m-tailored-crease-trousers"],
    createdAt: "2024-11-15T11:55:00Z"
  },
  {
    id: "prod-m-leather-portfolio",
    name: "Full-Grain Calfskin Atelier Portfolio & Small Leather Goods",
    slug: "full-grain-calfskin-atelier-portfolio",
    sku: "VEL-M-ACC-025",
    description: "Sculptural zippered folio crafted from vegetable-tanned French calfskin. Fits 13-inch laptop, legal documents, and atelier notebook with discreet pen slots.",
    details: [
      "100% Full-Grain French Box Calfskin with soft natural grain",
      "Supple unlined natural calf suede interior lining",
      "Solid brass two-way Excella zipper with leather pull tags",
      "Accommodates up to 14-inch MacBook and legal folders",
      "Hand-painted and burnished raw edges",
      "Crafted in Florence, Italy"
    ],
    fabricCare: [
      "100% Vegetable-Tanned Calfskin",
      "Nourish annually with natural organic leather cream",
      "Store in provided velvet-lined cotton dust pouch"
    ],
    fitInfo: [
      "External dimensions: 35 cm width x 25 cm height x 3 cm depth",
      "Fits 13\" / 14\" laptop and documents"
    ],
    price: 29500,
    salePrice: null,
    categoryId: "cat-m-acc",
    categoryName: "Accessories",
    department: "men",
    collectionId: "col-accessories",
    collectionName: "The Accessories",
    gender: "unisex",
    sizes: ["One Size"],
    colors: [
      { name: "Espresso Brown", hex: "#3D2B1F" },
      { name: "Warm Chestnut", hex: "#6E472A" }
    ],
    images: [
      "/images/products/men/leather-portfolio-1.jpg",
      "/images/products/men/leather-portfolio-2.jpg",
      "/images/products/men/leather-portfolio-3.jpg"
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    rating: 5.0,
    reviewCount: 28,
    completeLookProductIds: ["prod-m-classic-watch", "prod-m-minimalist-suit"],
    createdAt: "2024-11-15T12:00:00Z"
  }
];

// Read existing seedData.ts
const seedPath = 'src/data/seedData.ts';
let code = fs.readFileSync(seedPath, 'utf8');

// We want to append menProducts inside ALL_INITIAL_PRODUCTS
// Let's find the closing bracket of ALL_INITIAL_PRODUCTS
const insertMarker = '    createdAt: "2024-11-12T10:30:00Z"\n  }\n];';
if (!code.includes(insertMarker)) {
  console.error('Could not find insertMarker');
  process.exit(1);
}

const menCode = menProducts.map(p => '  ' + JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')).join(',\n');

const replacement = '    createdAt: "2024-11-12T10:30:00Z"\n  },\n' + menCode + '\n];';
code = code.replace(insertMarker, replacement);

// Also remove the accessories-only filter so all products (women, men, accessories) are exported in INITIAL_PRODUCTS!
const oldExport = `export const INITIAL_PRODUCTS: Product[] = ALL_INITIAL_PRODUCTS.filter(
  (product) => product.department === "accessories"
);`;
const newExport = `export const INITIAL_PRODUCTS: Product[] = ALL_INITIAL_PRODUCTS;`;

if (code.includes(oldExport)) {
  code = code.replace(oldExport, newExport);
  console.log('Replaced accessories-only filter with full ALL_INITIAL_PRODUCTS export');
} else {
  console.log('oldExport not found, checking fallback');
}

fs.writeFileSync(seedPath, code, 'utf8');
console.log('Successfully added all 25 menswear products to src/data/seedData.ts!');
