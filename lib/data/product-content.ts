import type { IconName } from "@/components/ui/Icon";

/** Shared merchandising copy for subscribable product pages. */
export const subscribePerks: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "gift",
    title: "Free Starter Kit",
    text: "Shaker, canister & scoop — a $42 value — in your first box.",
  },
  {
    icon: "truck",
    title: "Free shipping, always",
    text: "Every subscription order ships free to all 50 states.",
  },
  {
    icon: "calendar",
    title: "Your schedule",
    text: "Deliveries every 30, 45 or 60 days. Change it anytime.",
  },
  {
    icon: "refresh",
    title: "Skip, swap or cancel",
    text: "Manage everything from your account or by text.",
  },
];

export const starterKitCopy =
  "A 16 oz glass shaker with a leak-proof lid, an airtight refill canister that holds one pouch, and a stainless steel scoop. It ships with your first subscription order at no extra cost.";

export const shippingCopy =
  "Free shipping on subscriptions and on one-time orders over $75. Most orders arrive in 2–4 business days. Not a fan of the taste? Email us within 30 days for a refund on your first pouch.";

/** Pouch vs. sticks comparison, shown on the two Daily Greens formats. */
export const formatComparison = {
  columns: ["daily-greens", "travel-sticks"],
  rows: [
    { label: "Servings", values: ["30 scoops", "30 sticks"] },
    { label: "Best for", values: ["Home routine", "Travel & office"] },
  ],
};

export const shopStrip: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "Free shipping", text: "On all subscriptions" },
  { icon: "calendar", title: "Flexible deliveries", text: "Every 30, 45 or 60 days" },
  { icon: "swap", title: "Swap anytime", text: "Flavors, formats, bundles" },
  { icon: "smile", title: "30-day taste promise", text: "Refund on your first pouch" },
];

export const cartAssurances = [
  "Skip, pause or cancel anytime",
  "No minimum number of orders",
  "30-day taste promise",
];
