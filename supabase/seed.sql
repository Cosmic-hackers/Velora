-- VELORA Luxury Fashion E-Commerce Seed Data SQL
-- Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url, display_order)
VALUES
('b7d15a20-41bf-4f6e-9824-3450974e4c01', 'Outerwear & Coats', 'outerwear', 'Architectural trench coats, double-faced cashmere overcoats and tailored wool bombers.', 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop', 1),
('b7d15a20-41bf-4f6e-9824-3450974e4c02', 'Tailoring & Suiting', 'tailoring', 'Sculpted Italian wool blazers, relaxed double-breasted jackets and pleat-front trousers.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop', 2),
('b7d15a20-41bf-4f6e-9824-3450974e4c03', 'Knitwear & Cashmere', 'knitwear', 'Grade-A Mongolian cashmere turtlenecks, heavy ribbed sweaters and featherlight silk-wool knits.', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop', 3),
('b7d15a20-41bf-4f6e-9824-3450974e4c04', 'Minimal Essentials', 'essentials', 'Supima cotton tailored t-shirts, poplin studio shirts and draped silk trousers.', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert Collections
INSERT INTO public.collections (id, name, slug, description, image_url, is_featured, display_order)
VALUES
('c7d15a20-41bf-4f6e-9824-3450974e4c01', 'Essentials', 'essentials', 'Foundational garments stripped of ornament. Pure proportions, archival fabrics, forever relevance.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', true, 1),
('c7d15a20-41bf-4f6e-9824-3450974e4c02', 'Contemporary', 'contemporary', 'Fluid tailoring and bold proportions reflecting contemporary urban life.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop', true, 2),
('c7d15a20-41bf-4f6e-9824-3450974e4c03', 'Timeless Classics', 'timeless-classics', 'Heirloom craftsmanship, double-faced wool, handcrafted mother-of-pearl buttons.', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert Coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_value, max_discount, usage_limit, is_active)
VALUES
('VELORA10', 'percentage', 10, 500000, 1000000, 1000, true),
('LUXURY50', 'fixed', 500000, 2500000, NULL, 500, true),
('FIRSTORDER', 'percentage', 15, 800000, 750000, 2000, true)
ON CONFLICT (code) DO NOTHING;

