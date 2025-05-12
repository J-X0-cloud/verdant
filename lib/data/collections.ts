import type { Collection } from "@/lib/commerce/types";

const shopSeo = {
  title: "Shop Greens, Bundles & Accessories",
  description:
    "Shop Verdant daily greens, travel sticks, Beet & Berry Reds, plant protein, bundles and accessories. Subscribe & save 20% on every order.",
};

export const collections: Collection[] = [
  {
    handle: "all",
    title: "All products",
    description:
      "Daily greens and the blends that pair with them. Subscribe to any product to save 20%, get free shipping, and manage every delivery from your account.",
    categories: ["greens", "pairs", "accessories"],
    seo: shopSeo,
  },
  {
    handle: "daily-greens",
    title: "Daily greens",
    description:
      "The 42-ingredient Daily Greens blend in a pouch or travel sticks, in three flavors. Subscribe to save 20%.",
    categories: ["greens"],
    seo: { ...shopSeo, title: "Daily Greens Powder & Travel Sticks" },
  },
  {
    handle: "pairs-well",
    title: "Pairs well",
    description:
      "Companion blends that ship in the same box as your greens, on the same date: reds, protein and minerals.",
    categories: ["pairs"],
    seo: { ...shopSeo, title: "Companion Blends" },
  },
  {
    handle: "accessories",
    title: "Accessories",
    description: "Shakers, canisters, scoops and gift cards for the daily greens habit.",
    categories: ["accessories"],
    seo: { ...shopSeo, title: "Accessories & Gift Cards" },
  },
];

/** Chip rail on the shop page. Bundles jump to the bundle section below the grid. */
export const shopChips = [
  { label: "All products", href: "/collections/all", handle: "all" },
  { label: "Daily greens", href: "/collections/daily-greens", handle: "daily-greens" },
  { label: "Pairs well", href: "/collections/pairs-well", handle: "pairs-well" },
  { label: "Bundles", href: "/collections/all#bundles", handle: "bundles" },
  { label: "Accessories", href: "/collections/accessories", handle: "accessories" },
] as const;

/** Hand-merchandised rails: "Pairs well with" on product pages and the cart upsell grid. */
export const merchandisedRails: Record<string, string[]> = {
  "daily-greens": ["beet-berry-reds", "plant-protein", "glass-shaker", "refill-canister"],
  "travel-sticks": ["beet-berry-reds", "daily-minerals", "glass-shaker", "travel-sticks-7-pack"],
  cart: ["plant-protein", "daily-minerals", "glass-shaker", "refill-canister"],
};

/** The product offered as "Add to your subscription" in the cart. */
export const cartUpsellHandle = "beet-berry-reds";
