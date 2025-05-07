import { formatPrice } from "@/lib/commerce/money";
import type { Money, VariantPricing } from "@/lib/commerce/types";
import { SUBSCRIBE_AND_SAVE_RATE } from "@/lib/subscriptions";

interface PriceProps {
  pricing: VariantPricing;
  /** Show "Subscribe & save 20%" under subscription prices. */
  showSaveNote?: boolean;
  /** Prefix one-time-only prices with "From" (gift cards). */
  from?: boolean;
}

/** Subscription-first price: "$64/mo $80", or "$18 one-time" for items that can't repeat. */
export function Price({ pricing, showSaveNote = false, from = false }: PriceProps) {
  if (pricing.subscription) {
    return (
      <div className="price">
        <b>{formatPrice(pricing.subscription)}</b>
        <span className="per">/mo</span>
        <s>{formatPrice(pricing.oneTime)}</s>
        {showSaveNote ? (
          <em>Subscribe &amp; save {Math.round(SUBSCRIBE_AND_SAVE_RATE * 100)}%</em>
        ) : null}
      </div>
    );
  }
  return (
    <div className="price">
      {from ? <span className="per">From</span> : null}
      <b>{formatPrice(pricing.oneTime)}</b>
      <span className="per">one-time</span>
    </div>
  );
}

export function MonthlyPrice({ price, compareAt }: { price: Money; compareAt?: Money }) {
  return (
    <div className="price">
      <b>{formatPrice(price)}</b>
      <span className="per">/mo</span>
      {compareAt ? <s>{formatPrice(compareAt)}</s> : null}
    </div>
  );
}
