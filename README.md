# VELORA — Haute Garde-Robe
> **"Wear less. Mean more."**

A complete, production-ready full-stack luxury fashion and lifestyle editorial e-commerce platform built with Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL & Auth, and Razorpay test mode payment integration.

---

## 1. Visual & Editorial Identity

- **Design Philosophy:** High-fashion quiet luxury, editorial campaign photography, high-contrast serif typography (*Cormorant Garamond* & *Playfair Display*), clean monospace metadata accents, generous whitespace, cardless minimalism.
- **Editorial Diptych Hero:** Inspired by the iconic KHAITE Pre-Fall campaign featuring *The Roth Trench* — full-bleed close-up campaign portrait (~62.5% width) paired seamlessly with a full-length silhouette stride (~37.5% width), with interactive corner garment callouts and currency selection.
- **Color Palette:**
  - Background: `#F8F7F4` (Warm Studio Ivory)
  - Primary text: `#171717` (Pitch Noir)
  - Secondary text: `#77736E` (Warm Charcoal)
  - Accent: `#A18A70` (Warm Tuscan Bronze / Camel)
  - Borders: `#E9E6E0` (Fine Sandstone)
  - White: `#FFFFFF`
- **Typography:** *Cormorant Garamond* for editorial headlines and the centered VELORA wordmark, *Plus Jakarta Sans* for clean body typography, and tabular numerals for pricing.

---

## 2. Complete Routes Inventory (46 Routes)

### Public Client Boutique & Editorial
1. **Homepage** (`/`) — Editorial campaign diptych hero (*The Roth Trench*), 3 Curated Chapters, New Arrivals showcase, Brand Manifesto ("The Beauty of Less"), "Made to Last" Atelier Banner, Gazette Subscription, and full luxury footer.
2. **Shop All** (`/shop`) — Complete catalog with real-time category, price range, gender, size, color filters, and multi-mode sorting.
3. **Men's Atelier** (`/shop?gender=men`) — Dedicated tailoring and menswear collections.
4. **Women's Atelier** (`/shop?gender=women`) — Double-faced wool, cashmere knitwear and silk garments.
5. **New Arrivals** (`/shop?tag=new-arrivals`) — Seasonal release pieces.
6. **Collections Directory** (`/collections`) — The three pillars: *The Essentials*, *Modern Tailoring*, and *Signature Silhouettes*.
7. **Collection Detail** (`/collections/[slug]`) — Curatorial narrative and lookbook gallery.
8. **Product Details** (`/product/[slug]`) — Multi-angle photographic zoom gallery, Schema.org JSON-LD structured data for Google Rich Snippets, color picker, size selector, size guide drawer, stock availability, verified client impressions, and related creations.
9. **Editorial Journal** (`/journal`) — Fashion essays, seasonal lookbooks, and textile provenance monographs.
10. **Journal Essay** (`/journal/[slug]`) — Full editorial read experience with pull quotes and related reading.
11. **Search Results** (`/search`) — Instant keyword search matching titles, descriptions, categories, and SKUs.
12. **Wishlist** (`/wishlist`) — Saved pieces with direct "Move to Bag" capability.
13. **Shopping Bag** (`/cart`) — Quantity controls, promotional code validator (`VELORA10`, `LUXURY50`, `FIRSTORDER`), free delivery progress bar, and totals recalculation.
14. **Checkout** (`/checkout`) — Centralized Zod-validated client coordinates, saved address autofill, Razorpay online payment test integration, and Cash on Delivery (COD).
15. **Order Confirmation** (`/order-confirmation/[orderId]`) — Full receipt dossier, live waybill tracking link, and printable invoice.
16. **Customer Login** (`/login`) — Authenticated session with remember-me and role redirection.
17. **Customer Register** (`/register`) — Client registration with Zod validation, password matching, and terms acceptance.
18. **Forgot Password** (`/forgot-password`) — Secure password recovery protocol.
19. **Reset Password** (`/reset-password`) — Secure credential update.
20. **Email Verification** (`/verify-email`) — Supabase verification guidance.
21. **Client Sanctuary / Account** (`/account`) — Account overview, privilege tier, lifetime consignments, recent orders.
22. **Profile Settings** (`/account/profile`) — Edit name, phone number, and preferences.
23. **Saved Addresses** (`/account/addresses`) — Add, remove, and assign default delivery addresses.
24. **Consignment History** (`/account/orders`) — Filterable orders with cancel and return request workflows.
25. **Consignment Details** (`/account/orders/[id]`) — Individual order dossier with printable receipt.
26. **Order Tracking** (`/tracking`) — Live progress stepper (*Confirmed → Tailoring Assembly → In Transit → Delivered*).
27. **About Maison** (`/about`) — Sustainable cashmere sourcing, Biella wool mills, and Kojima denim history.
28. **Concierge & Appointments** (`/contact`) — Private styling requests and flagship contact coordinates.
29. **Frequently Asked Questions** (`/faq`) — Interactive accordion addressing shipping, returns, and garment care.
30. **Privacy Policy** (`/privacy`) — Client data confidentiality and PCI-DSS compliance.
31. **Terms & Conditions** (`/terms`) — Atelier consignment policies.
32. **Return & Refund Policy** (`/returns`) — 14-day complimentary courier returns.

### Administrative Command Center (14 Pages)
- **Admin Login** (`/admin/login`) — Role-restricted administrative gateway.
- **Executive Dashboard** (`/admin`) — Real-time revenue metrics, weekly sales charts, pending orders, and fast actions.
- **Product Catalog** (`/admin/products`) — Searchable table, publish/draft visibility toggle, edit, and deletion.
- **Catalog New Creation** (`/admin/products/new`) — Add product with automatic slug/SKU generation, image URL manager, sizing, and colors.
- **Edit Creation** (`/admin/products/[id]/edit`) — Real-time catalog update.
- **Categories** (`/admin/categories`) — Category taxonomy manager.
- **Collections** (`/admin/collections`) — Seasonal lookbook and chapter manager.
- **Inventory Ledger** (`/admin/inventory`) — Warehouse stock tracking with low-stock warnings and quick-restock controls.
- **Consignments / Orders** (`/admin/orders`) — Update order status, attach carrier waybills, and mark COD payments collected.
- **Customer Registry** (`/admin/customers`) — Patron directory with lifetime spend tracking.
- **Payment Records** (`/admin/payments`) — Razorpay electronic settlements vs. COD collections.
- **Coupons & Concessions** (`/admin/coupons`) — Issue percentage and fixed-value promotional codes.
- **Curatorial Reviews** (`/admin/reviews`) — Approve or reject client testimonials.
- **Gazette Subscribers** (`/admin/newsletter`) — View subscribers and export CSV dossier.
- **Maison Settings** (`/admin/settings`) — Hero Campaign Selector (*The Roth Trench Diptych* vs *Editorial Split* vs *Studio Portrait*), coordinates, contact details, and complimentary shipping thresholds.

### Secure API Endpoints
- `/api/razorpay/create-order` — Server-side Razorpay order generation with receipt tagging.
- `/api/razorpay/verify-payment` — HMAC-SHA256 signature verification.
- `/api/webhooks/razorpay` — Raw body HMAC-SHA256 signature verification with event idempotency protection and order status synchronization.

---

## 3. Database Architecture (Supabase PostgreSQL)

The project includes complete SQL migrations in `supabase/migrations/20241109000000_velora_schema.sql` and seed data in `supabase/seed.sql` covering all 21 tables:

1. `profiles` (links with Supabase Auth, roles: customer, staff, admin, super_admin)
2. `addresses`
3. `categories`
4. `collections`
5. `products`
6. `product_images`
7. `product_variants`
8. `inventory`
9. `carts`
10. `cart_items`
11. `wishlists`
12. `wishlist_items`
13. `coupons`
14. `orders`
15. `order_items`
16. `payments`
17. `shipping_records`
18. `reviews`
19. `newsletter_subscribers`
20. `site_settings`
21. `admin_audit_logs`

Row-Level Security (RLS) policies are declared for customer data isolation, public read access to published items, and role-based administrative control.

---

## 4. Test Credentials

### Administrative Access (`/admin/login`)
- **Super Admin:** `admin@velora.com`
- **Password:** `VeloraLuxury2025!`
- **Role:** Super Admin

- **Staff / Concierge:** `concierge@velora.com`
- **Password:** `VeloraStaff2025!`
- **Role:** Staff

### Client Sanctuary (`/login`)
- **Demo Client:** `elena@example.com`
- **Password:** `VeloraCustomer2025!`

### Active Promotional Codes
- `VELORA10` — 10% off on consignments above ₹5,000
- `LUXURY50` — ₹5,000 off on consignments above ₹25,000
- `FIRSTORDER` — 15% off first order

---

## 5. Local Setup & Running

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (copy .env.example)
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## 6. Vercel Deployment Guide

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete VELORA luxury e-commerce platform"
   git remote add origin https://github.com/<your-username>/velora-luxury.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and import the repository.
3. Under **Environment Variables**, provide:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = `your-supabase-anon-key`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your-supabase-service-key`
   - `RAZORPAY_KEY_ID` = `rzp_test_...`
   - `RAZORPAY_KEY_SECRET` = `your_secret`
   - `RAZORPAY_WEBHOOK_SECRET` = `your_webhook_secret`
4. Tap **Deploy**. Next.js will build all 42 static and dynamic routes automatically.

