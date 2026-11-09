# VELORA — Haute Garde-Robe
> **"Wear less. Mean more."**

A complete, production-ready full-stack luxury fashion and lifestyle e-commerce platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL & Auth, and Razorpay test mode payment integration.

---

## 1. Visual & Architectural Identity

- **Design Philosophy:** Luxury minimalism, editorial fashion photography, refined serif and sans typography, generous whitespace, understated luxury micro-interactions.
- **Color Palette:**
  - Background: `#F5F0E8` (Warm Oat / Ivory)
  - Primary text: `#171717` (Pitch Noir)
  - Secondary text: `#77716A` (Muted Warm Charcoal)
  - Accent: `#9B8065` (Warm Tuscan Bronze / Camel)
  - Borders: `#DED8CF` (Sand Grain)
  - White: `#FFFFFF`
- **Typography:** *Playfair Display* for editorial headings, *Plus Jakarta Sans* for precise body typography.

---

## 2. Complete Routes Inventory

### Public Client Boutique (29 Pages)
1. **Homepage** (`/`) — Editorial cinematic hero, 3 collections showcase, new arrivals, brand manifesto, featured atelier pieces, lookbook banner, gazette subscription.
2. **Shop All** (`/shop`) — Complete catalog with real-time category, price range, gender, size, color filters, and multi-mode sorting.
3. **Men's Atelier** (`/shop?gender=men`) — Dedicated tailoring and menswear collections.
4. **Women's Atelier** (`/shop?gender=women`) — Double-faced wool, cashmere knitwear and silk garments.
5. **New Arrivals** (`/shop?tag=new-arrivals`) — Seasonal release pieces.
6. **Collections Directory** (`/collections`) — The three pillars: *Essentials*, *Contemporary*, and *Timeless Classics*.
7. **Collection Detail** (`/collections/[slug]`) — Curatorial narrative and lookbook gallery.
8. **Product Details** (`/product/[slug]`) — Multi-angle photographic zoom gallery, color picker, size selector, size guide drawer, stock availability, verified client impressions, and related creations.
9. **Search Results** (`/search`) — Instant keyword search matching titles, descriptions, categories, and SKUs.
10. **Wishlist** (`/wishlist`) — Saved pieces with direct "Move to Bag" capability.
11. **Shopping Bag** (`/cart`) — Quantity controls, promotional code validator (`VELORA10`, `LUXURY50`, `FIRSTORDER`), free delivery progress bar, and totals recalculation.
12. **Checkout** (`/checkout`) — Multi-step client coordinates, saved address autofill, Razorpay online payment test integration, and Cash on Delivery (COD).
13. **Order Confirmation** (`/order-confirmation/[orderId]`) — Full receipt dossier, live waybill tracking link, and printable invoice.
14. **Customer Login** (`/login`) — Authenticated session with remember-me and role redirection.
15. **Customer Register** (`/register`) — Client registration with password matching and terms acceptance.
16. **Forgot Password** (`/forgot-password`) — Secure password recovery protocol.
17. **Reset Password** (`/reset-password`) — Secure credential update.
18. **Email Verification** (`/verify-email`) — Supabase verification guidance.
19. **Client Sanctuary / Account** (`/account`) — Account overview, privilege tier, lifetime consignments, recent orders.
20. **Profile Settings** (`/account/profile`) — Edit name, phone number, and preferences.
21. **Saved Addresses** (`/account/addresses`) — Add, remove, and assign default delivery addresses.
22. **Consignment History** (`/account/orders`) — Filterable orders with cancel and return request workflows.
23. **Consignment Details** (`/account/orders/[id]`) — Individual order dossier with printable receipt.
24. **Order Tracking** (`/tracking`) — Live progress stepper (*Confirmed → Tailoring Assembly → In Transit → Delivered*).
25. **About Maison** (`/about`) — Sustainable cashmere sourcing, Biella wool mills, and Kojima denim history.
26. **Concierge & Appointments** (`/contact`) — Private styling requests and flagship contact coordinates.
27. **Frequently Asked Questions** (`/faq`) — Interactive accordion addressing shipping, returns, and garment care.
28. **Privacy Policy** (`/privacy`) — Client data confidentiality and PCI-DSS compliance.
29. **Terms & Conditions** (`/terms`) — Atelier consignment policies.
30. **Return & Refund Policy** (`/returns`) — 14-day complimentary courier returns.

### Administrative Command Center (15 Pages)
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
- **Maison Settings** (`/admin/settings`) — Modify flagship coordinates, contact details, and complimentary shipping thresholds.

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
