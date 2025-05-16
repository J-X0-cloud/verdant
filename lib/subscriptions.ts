import type {
  Cart,
  CartLine,
  FrequencyDays,
  Money,
  PurchaseOption,
  VariantPricing,
} from "@/lib/commerce/types";

/**
 * Subscribe & Save rules.
 *
 * Everything that decides what a subscriber pays or saves lives here, so the
 * product page, cart and order summary can never disagree.
 */

export const SUBSCRIBE_AND_SAVE_RATE = 0.2;

export const FREQUENCIES: readonly { days: FrequencyDays; label: string; recommended?: boolean }[] =
  [
    { days: 30, label: "30 days (recommended)", recommended: true },
    { days: 45, label: "45 days" },
    { days: 60, label: "60 days" },
  ];

export const DEFAULT_FREQUENCY: FrequencyDays = 30;

/** Free with the first subscription order: glass shaker, refill canister & scoop. */
export const STARTER_KIT = {
  handle: "starter-kit",
  variantId: "starter-kit--default",
  value: 42,
} as const;

/** One-time orders ship free above this; subscriptions always ship free. */
export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING = 6.95;

const round2 = (value: number) => Math.round(value * 100) / 100;

export const usd = (amount: number): Money => ({ amount: round2(amount), currencyCode: "USD" });

/** Standard Subscribe & Save pricing for a one-time price: 20% off, to the cent. */
export function subscribeAndSave(oneTime: number): VariantPricing {
  return { oneTime: usd(oneTime), subscription: usd(oneTime * (1 - SUBSCRIBE_AND_SAVE_RATE)) };
}

export function isFrequency(days: number): days is FrequencyDays {
  return FREQUENCIES.some((frequency) => frequency.days === days);
}

export function frequencyLabel(days: FrequencyDays): string {
  return `every ${days} days`;
}

/** Price for one unit under the chosen purchase option. */
export function unitPrice(pricing: VariantPricing, purchase: PurchaseOption): Money {
  if (purchase.type === "subscription") {
    if (!pricing.subscription) throw new Error("This item isn't available as a subscription");
    return pricing.subscription;
  }
  return pricing.oneTime;
}

export interface Savings {
  amount: number;
  /** Whole-number percentage off the one-time price. */
  percent: number;
}

export function subscriptionSavings(pricing: VariantPricing): Savings | null {
  if (!pricing.subscription) return null;
  const amount = round2(pricing.oneTime.amount - pricing.subscription.amount);
  return { amount, percent: Math.round((amount / pricing.oneTime.amount) * 100) };
}

/** "$2.13" per serving: price divided by servings, to the cent. */
export function perServing(price: Money | number, servings: number): number {
  const amount = typeof price === "number" ? price : price.amount;
  return round2(amount / servings);
}

/** The date the next delivery ships, counting from `from` (the order date). */
export function nextDeliveryDate(frequencyDays: FrequencyDays, from: Date = new Date()): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + frequencyDays);
  return next;
}

export function hasSubscription(lines: Pick<CartLine, "purchase">[]): boolean {
  return lines.some((line) => line.purchase.type === "subscription");
}

export interface CartTotals {
  /** Sum of one-time prices for everything the shopper pays for. */
  subtotal: Money;
  subscriptionDiscount: Money;
  starterKitValue: Money;
  shipping: Money;
  total: Money;
  /** Subscription discount plus the value of free gifts. */
  totalSavings: Money;
  freeShipping: {
    unlocked: boolean;
    remaining: number;
    progress: number;
    reason: "subscription" | "threshold" | null;
  };
}

export function cartTotals(cart: Pick<Cart, "lines">): CartTotals {
  const paid = cart.lines.filter((line) => !line.isGift);
  const subtotal = paid.reduce((sum, line) => sum + line.cost.compareAt.amount, 0);
  const total = paid.reduce((sum, line) => sum + line.cost.total.amount, 0);
  const subscriptionDiscount = subtotal - total;
  const starterKitValue = cart.lines
    .filter((line) => line.isGift)
    .reduce((sum, line) => sum + line.cost.compareAt.amount, 0);

  const subscribed = hasSubscription(paid);
  const unlocked = subscribed || total >= FREE_SHIPPING_THRESHOLD;
  const shipping = unlocked || paid.length === 0 ? 0 : STANDARD_SHIPPING;

  return {
    subtotal: usd(subtotal),
    subscriptionDiscount: usd(subscriptionDiscount),
    starterKitValue: usd(starterKitValue),
    shipping: usd(shipping),
    total: usd(total + shipping),
    totalSavings: usd(subscriptionDiscount + starterKitValue),
    freeShipping: {
      unlocked,
      remaining: unlocked ? 0 : round2(FREE_SHIPPING_THRESHOLD - total),
      progress: unlocked ? 1 : Math.min(1, total / FREE_SHIPPING_THRESHOLD),
      reason: subscribed ? "subscription" : unlocked ? "threshold" : null,
    },
  };
}

export interface RenewalNotice {
  productTitle: string;
  frequencyDays: FrequencyDays;
  price: Money;
  nextDate: Date;
}

/** The renewal the shopper is signing up for, shown under the checkout button. */
export function renewalNotice(
  cart: Pick<Cart, "lines">,
  from: Date = new Date(),
): RenewalNotice | null {
  const line = cart.lines.find((l) => !l.isGift && l.purchase.type === "subscription");
  if (!line || line.purchase.type !== "subscription") return null;
  return {
    productTitle: line.merchandise.product.shortTitle,
    frequencyDays: line.purchase.frequencyDays,
    price: line.cost.total,
    nextDate: nextDeliveryDate(line.purchase.frequencyDays, from),
  };
}
