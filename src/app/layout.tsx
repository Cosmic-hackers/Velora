import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionSystem } from "@/components/layout/MotionSystem";
import { Preloader } from "@/components/layout/Preloader";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELORA — Haute Garde-Robe | Wear less. Mean more.",
  description:
    "International luxury fashion house. Considered silhouettes. Thoughtful details. Pieces designed to remain.",
  keywords: [
    "luxury fashion",
    "minimalist fashion",
    "high fashion editorial",
    "quiet luxury",
    "signature collection",
    "modern tailoring",
  ],
  authors: [{ name: "VELORA" }],
  openGraph: {
    title: "VELORA — Wear less. Mean more.",
    description: "International luxury fashion house. Considered silhouettes. Thoughtful details.",
    url: "https://velora-luxury.vercel.app",
    siteName: "VELORA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1600&auto=format&fit=crop",
        width: 1600,
        height: 900,
        alt: "VELORA High Fashion Editorial",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELORA — Haute Garde-Robe",
    description: "Wear less. Mean more. International luxury fashion house.",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1600&auto=format&fit=crop"],
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F7F4] text-[#171717] min-h-screen flex flex-col font-sans selection:bg-[#A18A70] selection:text-white">
        <Preloader />
        <MotionSystem />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <CartDrawer />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
