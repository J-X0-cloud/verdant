import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/shop.html", destination: "/collections/all", permanent: true },
      { source: "/product.html", destination: "/products/daily-greens", permanent: true },
      { source: "/cart.html", destination: "/cart", permanent: true },
      { source: "/shop", destination: "/collections/all", permanent: false },
    ];
  },
};

export default nextConfig;
