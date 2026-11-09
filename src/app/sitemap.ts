import { MetadataRoute } from "next";
import { StoreService } from "@/lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velora-luxury.vercel.app";
  const products = StoreService.getProducts();
  const collections = StoreService.getCollections();

  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/returns",
    "/tracking",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
