import {
  Product,
  Category,
  Collection,
  Coupon,
  Order,
  Review,
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  STORE_SETTINGS,
} from "@/data/seedData";

const STORAGE_KEYS = {
  PRODUCTS: "velora_products_v4",
  ORDERS: "velora_orders_v1",
  COUPONS: "velora_coupons_v1",
  REVIEWS: "velora_reviews_v1",
  SETTINGS: "velora_settings_v1",
  NEWSLETTER: "velora_newsletter_v1",
  CATEGORIES: "velora_categories_v2",
  COLLECTIONS: "velora_collections_v2",
  RECENTLY_VIEWED: "velora_recently_viewed_v1",
  INVENTORY: "velora_inventory_v1",
};

// Safe localStorage access helper
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// In-memory runtime state for server-side / SSR requests
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryCollections: Collection[] = [...INITIAL_COLLECTIONS];
let memoryOrders: Order[] = [...INITIAL_ORDERS];
let memoryCoupons: Coupon[] = [...INITIAL_COUPONS];
let memoryReviews: Review[] = [...INITIAL_REVIEWS];
let memorySettings = { ...STORE_SETTINGS };
let memorySubscribers: string[] = ["concierge@velora-couture.com", "vip@velora.com"];
let memoryRecentlyViewed: string[] = [];

export const StoreService = {
  // PRODUCTS
  getProducts(): Product[] {
    if (typeof window !== "undefined") {
      return getStored<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }
    return memoryProducts;
  },

  getProductBySlug(slug: string): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.slug === slug);
  },

  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.id === id);
  },

  createProduct(productData: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount">): Product {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
    };

    const current = this.getProducts();
    const updated = [newProduct, ...current];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.PRODUCTS, updated);
    }
    memoryProducts = updated;
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const current = this.getProducts();
    const index = current.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProduct = { ...current[index], ...updates };
    current[index] = updatedProduct;

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.PRODUCTS, [...current]);
    }
    memoryProducts = [...current];
    return updatedProduct;
  },

  deleteProduct(id: string): boolean {
    const current = this.getProducts();
    const filtered = current.filter((p) => p.id !== id);
    if (filtered.length === current.length) return false;

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.PRODUCTS, filtered);
    }
    memoryProducts = filtered;
    return true;
  },

  // CATEGORIES & COLLECTIONS
  getCategories(): Category[] {
    if (typeof window !== "undefined") {
      return getStored<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    return memoryCategories;
  },

  getCategoriesByDepartment(department: 'women' | 'men' | 'accessories'): Category[] {
    const categories = this.getCategories();
    return categories.filter((c) => c.department === department);
  },

  createCategory(categoryData: Omit<Category, "id">): Category {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    const current = this.getCategories();
    const updated = [...current, newCategory];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.CATEGORIES, updated);
    }
    memoryCategories = updated;
    return newCategory;
  },

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const current = this.getCategories();
    const index = current.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const updated = { ...current[index], ...updates };
    current[index] = updated;
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.CATEGORIES, [...current]);
    }
    memoryCategories = [...current];
    return updated;
  },

  deleteCategory(id: string): boolean {
    const current = this.getCategories();
    const filtered = current.filter((c) => c.id !== id);
    if (filtered.length === current.length) return false;
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.CATEGORIES, filtered);
    }
    memoryCategories = filtered;
    return true;
  },

  getCollections(): Collection[] {
    if (typeof window !== "undefined") {
      return getStored<Collection[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
    }
    return memoryCollections;
  },

  createCollection(collectionData: Omit<Collection, "id">): Collection {
    const newCol: Collection = {
      ...collectionData,
      id: `col-${Date.now()}`,
    };
    const current = this.getCollections();
    const updated = [...current, newCol];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.COLLECTIONS, updated);
    }
    memoryCollections = updated;
    return newCol;
  },

  updateCollection(id: string, updates: Partial<Collection>): Collection | null {
    const current = this.getCollections();
    const index = current.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const updated = { ...current[index], ...updates };
    current[index] = updated;
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.COLLECTIONS, [...current]);
    }
    memoryCollections = [...current];
    return updated;
  },

  deleteCollection(id: string): boolean {
    const current = this.getCollections();
    const filtered = current.filter((c) => c.id !== id);
    if (filtered.length === current.length) return false;
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.COLLECTIONS, filtered);
    }
    memoryCollections = filtered;
    return true;
  },

  // RECENTLY VIEWED PRODUCTS
  recordProductView(productId: string): void {
    if (typeof window === "undefined") return;
    try {
      const stored = getStored<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
      const filtered = stored.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8); // Keep last 8 products
      setStored(STORAGE_KEYS.RECENTLY_VIEWED, updated);
    } catch {}
  },

  getRecentlyViewed(currentProductId?: string): Product[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = getStored<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
      const all = this.getProducts();
      return stored
        .filter((id) => id !== currentProductId)
        .map((id) => all.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));
    } catch {
      return [];
    }
  },

  // DEPARTMENT & COLLECTION HELPERS
  getProductsByDepartment(department: string): Product[] {
    const all = this.getProducts();
    if (department === "women") return all.filter((p) => p.gender === "women" || p.gender === "unisex" || p.department === "women");
    if (department === "men") return all.filter((p) => p.gender === "men" || p.gender === "unisex" || p.department === "men");
    if (department === "accessories") return all.filter((p) => p.department === "accessories" || p.categoryId.includes("cat-a"));
    return all;
  },

  getProductsByCollection(collectionSlug: string): Product[] {
    const all = this.getProducts();
    const collections = this.getCollections();
    const col = collections.find((c) => c.slug === collectionSlug);
    if (!col) return all;
    return all.filter((p) => p.collectionId === col.id);
  },

  // ORDERS
  getOrders(): Order[] {
    if (typeof window !== "undefined") {
      return getStored<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    }
    return memoryOrders;
  },

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id);
  },

  getOrderByNumber(orderNumber: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  },

  getOrdersByUserId(userId: string): Order[] {
    const orders = this.getOrders();
    return orders.filter((o) => o.userId === userId);
  },

  getOrdersByEmail(email: string): Order[] {
    const orders = this.getOrders();
    return orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
  },

  createOrder(orderData: Omit<Order, "id" | "createdAt" | "orderNumber">): Order {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `VEL-${year}-${random}`;

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    const current = this.getOrders();
    const updated = [newOrder, ...current];

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.ORDERS, updated);
    }
    memoryOrders = updated;
    return newOrder;
  },

  updateOrderStatus(
    orderId: string,
    status: Order["orderStatus"],
    tracking?: { carrier?: string; trackingNumber?: string }
  ): Order | null {
    const current = this.getOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    current[index] = {
      ...current[index],
      orderStatus: status,
      ...(tracking?.carrier ? { trackingCarrier: tracking.carrier } : {}),
      ...(tracking?.trackingNumber ? { trackingNumber: tracking.trackingNumber } : {}),
    };

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.ORDERS, [...current]);
    }
    memoryOrders = [...current];
    return current[index];
  },

  updatePaymentStatus(orderId: string, paymentStatus: Order["paymentStatus"]): Order | null {
    const current = this.getOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    current[index] = {
      ...current[index],
      paymentStatus,
      ...(paymentStatus === "paid" && current[index].orderStatus === "pending"
        ? { orderStatus: "confirmed" }
        : {}),
    };

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.ORDERS, [...current]);
    }
    memoryOrders = [...current];
    return current[index];
  },

  cancelOrder(orderId: string, reason: string): Order | null {
    const current = this.getOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    current[index] = {
      ...current[index],
      orderStatus: "cancelled",
      cancellationReason: reason,
    };

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.ORDERS, [...current]);
    }
    memoryOrders = [...current];
    return current[index];
  },

  requestReturn(orderId: string, reason: string): Order | null {
    const current = this.getOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    current[index] = {
      ...current[index],
      orderStatus: "return_requested",
      returnReason: reason,
    };

    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.ORDERS, [...current]);
    }
    memoryOrders = [...current];
    return current[index];
  },

  // COUPONS
  getCoupons(): Coupon[] {
    if (typeof window !== "undefined") {
      return getStored<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
    }
    return memoryCoupons;
  },

  validateCoupon(code: string, subtotal: number): { valid: boolean; message: string; discount: number; coupon?: Coupon } {
    const coupons = this.getCoupons();
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

    if (!found) {
      return { valid: false, message: "Invalid promotional code.", discount: 0 };
    }

    if (!found.isActive) {
      return { valid: false, message: "This promotional code is no longer active.", discount: 0 };
    }

    if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
      return { valid: false, message: "This promotional code has expired.", discount: 0 };
    }

    if (subtotal < found.minOrderValue) {
      return {
        valid: false,
        message: `Order minimum of ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(found.minOrderValue)} required for this code.`,
        discount: 0,
      };
    }

    let discount = 0;
    if (found.discountType === "percentage") {
      discount = Math.round((subtotal * found.discountValue) / 100);
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.discountValue;
    }

    return {
      valid: true,
      message: `Promotional code ${found.code} applied successfully.`,
      discount,
      coupon: found,
    };
  },

  createCoupon(couponData: Omit<Coupon, "id" | "timesUsed">): Coupon {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      timesUsed: 0,
    };
    const current = this.getCoupons();
    const updated = [newCoupon, ...current];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.COUPONS, updated);
    }
    memoryCoupons = updated;
    return newCoupon;
  },

  deleteCoupon(id: string): boolean {
    const current = this.getCoupons();
    const filtered = current.filter((c) => c.id !== id);
    if (filtered.length === current.length) return false;
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.COUPONS, filtered);
    }
    memoryCoupons = filtered;
    return true;
  },

  // REVIEWS
  getReviews(productId?: string): Review[] {
    const reviews = typeof window !== "undefined"
      ? getStored<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
      : memoryReviews;

    if (productId) {
      return reviews.filter((r) => r.productId === productId && r.status === "approved");
    }
    return reviews;
  },

  getAllReviewsForAdmin(): Review[] {
    if (typeof window !== "undefined") {
      return getStored<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    }
    return memoryReviews;
  },

  addReview(reviewData: Omit<Review, "id" | "createdAt" | "status">): Review {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: "approved",
      createdAt: new Date().toISOString(),
    };
    const current = this.getAllReviewsForAdmin();
    const updated = [newReview, ...current];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.REVIEWS, updated);
    }
    memoryReviews = updated;
    return newReview;
  },

  updateReviewStatus(id: string, status: "approved" | "rejected"): Review | null {
    const current = this.getAllReviewsForAdmin();
    const index = current.findIndex((r) => r.id === id);
    if (index === -1) return null;
    current[index] = { ...current[index], status };
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.REVIEWS, [...current]);
    }
    memoryReviews = [...current];
    return current[index];
  },

  // NEWSLETTER
  subscribeNewsletter(email: string): { success: boolean; message: string } {
    if (!email || !email.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }
    const subscribers = typeof window !== "undefined"
      ? getStored<string[]>(STORAGE_KEYS.NEWSLETTER, memorySubscribers)
      : memorySubscribers;

    if (subscribers.includes(email.toLowerCase())) {
      return { success: true, message: "You are already subscribed to the VELORA private editorial." };
    }

    const updated = [email.toLowerCase(), ...subscribers];
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.NEWSLETTER, updated);
    }
    memorySubscribers = updated;
    return { success: true, message: "Welcome to VELORA. You will receive private previews and editorial notes." };
  },

  getNewsletterSubscribers(): string[] {
    if (typeof window !== "undefined") {
      return getStored<string[]>(STORAGE_KEYS.NEWSLETTER, memorySubscribers);
    }
    return memorySubscribers;
  },

  // SETTINGS
  getStoreSettings() {
    if (typeof window !== "undefined") {
      return getStored(STORAGE_KEYS.SETTINGS, STORE_SETTINGS);
    }
    return memorySettings;
  },

  updateStoreSettings(updates: Partial<typeof STORE_SETTINGS>) {
    const current = this.getStoreSettings();
    const updated = { ...current, ...updates };
    if (typeof window !== "undefined") {
      setStored(STORAGE_KEYS.SETTINGS, updated);
    }
    memorySettings = updated;
    return updated;
  },
};

