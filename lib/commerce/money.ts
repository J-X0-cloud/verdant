import type { Money } from "./types";

const whole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const cents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const amountOf = (money: Money | number) => (typeof money === "number" ? money : money.amount);

/** "$64" on cards; falls back to cents when the amount isn't whole. */
export function formatPrice(money: Money | number): string {
  const amount = amountOf(money);
  return Number.isInteger(amount) ? whole.format(amount) : cents.format(amount);
}

/** "$64.00" in the buy box and order summary. */
export function formatAmount(money: Money | number): string {
  return cents.format(amountOf(money));
}
