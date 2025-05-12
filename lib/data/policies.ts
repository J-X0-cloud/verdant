export interface Policy {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export const policies: Policy[] = [
  {
    slug: "subscriptions",
    title: "Subscription terms",
    updated: "2026-06-01",
    sections: [
      {
        heading: "Pricing",
        body: "Subscribe & Save orders are 20% off the one-time price and always ship free to all 50 US states. Bundles are priced as shown on the bundle and ship as one subscription with one delivery date.",
      },
      {
        heading: "Deliveries",
        body: "Choose a delivery every 30, 45 or 60 days. We text you 3 days before each order ships, so you can skip, swap flavors, change your date or pause from the message or your account.",
      },
      {
        heading: "Starter Kit",
        body: "Your first subscription order includes the Starter Kit (glass shaker, refill canister and scoop) at no charge. One Starter Kit per household.",
      },
      {
        heading: "Cancelling",
        body: "There are no minimum orders. Cancel any time from your account before your next order is processed and you won't be charged again.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    updated: "2026-03-12",
    sections: [
      {
        heading: "What we collect",
        body: "Your name, shipping address, email, phone number for delivery reminders, and order history. Payment details are handled by our payment processor and never stored on our servers.",
      },
      {
        heading: "Messages",
        body: "We send delivery reminders by text and a short email when new flavors launch. Reply STOP or use the unsubscribe link at any time.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    updated: "2026-03-12",
    sections: [
      {
        heading: "Orders",
        body: "Orders placed before 1 pm PT ship the same business day. Most arrive in 2–4 business days. One-time orders over $75 ship free.",
      },
      {
        heading: "30-day taste promise",
        body: "If Verdant isn't for you, email us within 30 days of your first order and we'll refund your first pouch. No need to send it back.",
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    updated: "2026-03-12",
    sections: [
      {
        heading: "Our commitment",
        body: "The store is built to WCAG 2.2 AA: real form controls, visible focus states, and pages that work without JavaScript.",
      },
      {
        heading: "Need a hand?",
        body: "Email hello@verdant.com and our team will help you place or manage an order, usually within one business day.",
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((policy) => policy.slug === slug);
}
