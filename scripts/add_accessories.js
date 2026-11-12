const fs = require('fs');

const content = fs.readFileSync('src/data/seedData.ts', 'utf8');

const newProductsCode = `  {
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
  }`;

const lastCloseBracket = content.lastIndexOf('];\n\nexport const INITIAL_COUPONS');
if (lastCloseBracket === -1) {
  console.error('Closing bracket not found');
  process.exit(1);
}

const updated = content.slice(0, lastCloseBracket) + ',\n' + newProductsCode + '\n' + content.slice(lastCloseBracket);
fs.writeFileSync('src/data/seedData.ts', updated, 'utf8');
console.log('Successfully updated src/data/seedData.ts');
