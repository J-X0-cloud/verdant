import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/CartProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCurrentCart } from "@/lib/cart-session";
import { site } from "@/lib/data/site";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/inter-tight-400.woff2", weight: "400" },
    { path: "./fonts/inter-tight-700.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const serif = localFont({
  src: "./fonts/newsreader-400.woff2",
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Verdant — Daily greens powder, delivered on your schedule",
    template: "%s | Verdant",
  },
  description:
    "Verdant is a daily greens powder with 42 whole-food greens, fruits, roots and minerals. Subscribe & save 20%, free shipping, skip or cancel anytime.",
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await getCurrentCart();

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <CartProvider initialCart={cart ?? null}>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
