import { describe, expect, it } from "vitest";
import type { CartLine, PurchaseOption } from "@/lib/commerce/types";
import {
  STARTER_KIT,
  cartTotals,
  isFrequency,
  nextDeliveryDate,
  perServing,
  renewalNotice,
  subscribeAndSave,
  subscriptionSavings,
  unitPrice,
  usd,
} from "./subscriptions";

function line(
  title: string,
  oneTime: number,
  paid: number,
  purchase: PurchaseOption,
  isGift = false,
): CartLine {
  return {
    id: title,
    quantity: 1,
    purchase,
    isGift,
    merchandise: {
      variant: {
        id: `${title}--v`,
        title,
        sku: title,
        available: true,
        pricing: { oneTime: usd(oneTime) },
      },
      product: {
        id: title,
        handle: title,
        title,
        shortTitle: title,
        art: { type: "shaker" },
        category: "greens",
      },
    },
    cost: { total: usd(paid), compareAt: usd(oneTime) },
  };
}

const monthly: PurchaseOption = { type: "subscription", frequencyDays: 30 };
const once: PurchaseOption = { type: "one-time" };

describe("subscribeAndSave", () => {
  it("takes 20% off the one-time price", () => {
    expect(subscribeAndSave(80).subscription?.amount).toBe(64);
    expect(subscribeAndSave(90).subscription?.amount).toBe(72);
    expect(subscribeAndSave(55).subscription?.amount).toBe(44);
  });

  it("rounds to the cent", () => {
    expect(subscribeAndSave(19.99).subscription?.amount).toBe(15.99);
  });
});

describe("subscriptionSavings", () => {
  it("reports the saving in dollars and whole percent", () => {
    expect(subscriptionSavings(subscribeAndSave(80))).toEqual({ amount: 16, percent: 20 });
  });

  it("handles bundles with their own subscription price", () => {
    const bundle = { oneTime: usd(135), subscription: usd(98) };
    expect(subscriptionSavings(bundle)).toEqual({ amount: 37, percent: 27 });
    const travelSet = { oneTime: usd(130), subscription: usd(86) };
    expect(subscriptionSavings(travelSet)?.percent).toBe(34);
  });

  it("returns null for one-time-only items", () => {
    expect(subscriptionSavings({ oneTime: usd(18) })).toBeNull();
  });
});

describe("unitPrice", () => {
  it("picks the price for the purchase option", () => {
    const pricing = subscribeAndSave(80);
    expect(unitPrice(pricing, monthly).amount).toBe(64);
    expect(unitPrice(pricing, once).amount).toBe(80);
  });

  it("refuses to subscribe to one-time-only items", () => {
    expect(() => unitPrice({ oneTime: usd(9) }, monthly)).toThrow();
  });
});

describe("perServing", () => {
  it("matches the prices quoted on the site", () => {
    expect(perServing(64, 30)).toBe(2.13);
    expect(perServing(80, 30)).toBe(2.67);
    expect(perServing(72, 30)).toBe(2.4);
    expect(perServing(98, 60)).toBe(1.63);
  });
});

describe("frequencies", () => {
  it("only allows 30, 45 or 60 days", () => {
    expect(isFrequency(30)).toBe(true);
    expect(isFrequency(45)).toBe(true);
    expect(isFrequency(14)).toBe(false);
  });

  it("schedules the next delivery from the order date", () => {
    const next = nextDeliveryDate(30, new Date(2026, 8, 24));
    expect(next.toDateString()).toBe(new Date(2026, 9, 24).toDateString());
  });
});

describe("cartTotals", () => {
  const cart = {
    lines: [
      line("Daily Greens", 80, 64, monthly),
      line("Travel Sticks 7 pack", 22, 22, once),
      line("Starter Kit", STARTER_KIT.value, 0, once, true),
    ],
  };

  it("reproduces the order summary: subtotal, discount, gift and total", () => {
    const totals = cartTotals(cart);
    expect(totals.subtotal.amount).toBe(102);
    expect(totals.subscriptionDiscount.amount).toBe(16);
    expect(totals.starterKitValue.amount).toBe(42);
    expect(totals.shipping.amount).toBe(0);
    expect(totals.total.amount).toBe(86);
    expect(totals.totalSavings.amount).toBe(58);
  });

  it("ships subscriptions free regardless of order value", () => {
    const totals = cartTotals({ lines: [line("Minerals", 35, 28, monthly)] });
    expect(totals.freeShipping).toMatchObject({ unlocked: true, reason: "subscription" });
    expect(totals.shipping.amount).toBe(0);
  });

  it("charges shipping on small one-time orders and tracks progress", () => {
    const totals = cartTotals({ lines: [line("Shaker", 18, 18, once), line("Scoop", 9, 9, once)] });
    expect(totals.shipping.amount).toBe(6.95);
    expect(totals.total.amount).toBe(33.95);
    expect(totals.freeShipping.remaining).toBe(48);
    expect(totals.freeShipping.progress).toBeCloseTo(0.36);
  });

  it("unlocks free shipping on one-time orders over the threshold", () => {
    const totals = cartTotals({ lines: [line("Greens", 80, 80, once)] });
    expect(totals.freeShipping).toMatchObject({ unlocked: true, reason: "threshold" });
  });

  it("charges nothing for an empty cart", () => {
    expect(cartTotals({ lines: [] }).total.amount).toBe(0);
  });
});

describe("renewalNotice", () => {
  it("describes the first subscription in the cart", () => {
    const notice = renewalNotice(
      { lines: [line("Daily Greens", 80, 64, monthly)] },
      new Date(2026, 8, 24),
    );
    expect(notice).toMatchObject({ productTitle: "Daily Greens", frequencyDays: 30 });
    expect(notice?.price.amount).toBe(64);
    expect(notice?.nextDate.getDate()).toBe(24);
  });

  it("is null when nothing renews", () => {
    expect(renewalNotice({ lines: [line("Shaker", 18, 18, once)] })).toBeNull();
  });
});
