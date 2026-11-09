import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "VELORA — Wear less. Mean more. | Luxury Fashion & Lifestyle",
  description:
    "International luxury fashion atelier. Architectural outerwear, double-faced cashmere, sculpted Italian tailoring, and foundational minimalist garments.",
  keywords: [
    "luxury fashion",
    "minimalist outerwear",
    "cashmere coat",
    "Italian tailoring",
    "quiet luxury",
    "designer apparel",
  ],
  authors: [{ name: "VELORA Maison" }],
  openGraph: {
    title: "VELORA — Wear less. Mean more.",
    description: "International luxury fashion atelier. Hand-finished coats, cashmere, and suiting.",
    url: "https://velora-luxury.vercel.app",
    siteName: "VELORA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "VELORA Luxury Atelier",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELORA — Haute Garde-Robe",
    description: "Wear less. Mean more. Luxury minimalist fashion.",
    images: ["https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F5F0E8] text-[#171717] min-h-screen flex flex-col font-sans selection:bg-[#9B8065] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Header />
              <main className="flex-1">{children}</main>
              <CartDrawer />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
