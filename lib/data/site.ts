export const site = {
  name: "Verdant",
  legalName: "Verdant Nutrition Co.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://verdant.com",
  accountUrl: process.env.NEXT_PUBLIC_ACCOUNT_URL ?? "https://account.verdant.com",
  email: "hello@verdant.com",
  themeColor: "#2F3D22",
  tagline: "Daily greens, made simple. Blended in small batches and shipped on your schedule.",
  shipCutoff: "1 pm PT",
  disclaimer:
    "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Verdant is a food supplement and not a substitute for a varied, balanced diet.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Shop all", href: "/collections/all" },
  { label: "Daily Greens", href: "/products/daily-greens" },
  { label: "Bundles", href: "/collections/all#bundles" },
  { label: "How subscribing works", href: "/#how" },
  { label: "Ingredients", href: "/#inside" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Daily Greens", href: "/products/daily-greens" },
      { label: "Travel Sticks", href: "/products/travel-sticks" },
      { label: "Beet & Berry Reds", href: "/products/beet-berry-reds" },
      { label: "Bundles", href: "/collections/all#bundles" },
      { label: "Accessories", href: "/collections/accessories" },
    ],
  },
  {
    title: "Subscriptions",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Manage my subscription", href: `${site.accountUrl}/subscriptions` },
      { label: "Skip or pause a delivery", href: `${site.accountUrl}/subscriptions#next-delivery` },
      { label: "Gift a subscription", href: "/products/gift-card" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Shipping & returns", href: "/#faq" },
      { label: "Track an order", href: `${site.accountUrl}/orders` },
      { label: "hello@verdant.com", href: "mailto:hello@verdant.com" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Subscription terms", href: "/policies/subscriptions" },
  { label: "Accessibility", href: "/policies/accessibility" },
];
