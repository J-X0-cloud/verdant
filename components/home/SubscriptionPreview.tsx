import { Pouch } from "@/components/art/Pouch";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/commerce/money";
import type { Product } from "@/lib/commerce/types";
import { DEFAULT_FREQUENCY, nextDeliveryDate } from "@/lib/subscriptions";

const weekdayDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/** Illustrative account card: what managing a subscription looks like. */
export function SubscriptionPreview({ product }: { product: Product }) {
  const variant = product.variants[0]!;
  const price = variant.pricing.subscription ?? variant.pricing.oneTime;

  return (
    <div className="subcard" aria-label="Example subscription dashboard">
      <div className="subcard-top">
        <span className="pill-live">Active</span>
        <span>Every {DEFAULT_FREQUENCY} days</span>
      </div>
      <div className="subcard-item">
        <div className="mini">
          <Pouch />
        </div>
        <div>
          <b>{product.title}</b>
          <span>
            {variant.title} · {product.servings} servings
          </span>
        </div>
        <b className="subcard-price">{formatPrice(price)}</b>
      </div>
      <div className="subcard-next">
        <Icon name="calendar" size={18} />
        <div>
          <span>Next delivery</span>
          <b>{weekdayDate.format(nextDeliveryDate(DEFAULT_FREQUENCY))}</b>
        </div>
      </div>
      <div className="subcard-actions">
        <button type="button" tabIndex={-1}>
          <Icon name="refresh" size={16} />
          Skip
        </button>
        <button type="button" tabIndex={-1}>
          <Icon name="swap" size={16} />
          Swap flavor
        </button>
        <button type="button" tabIndex={-1}>
          <Icon name="pause" size={16} />
          Pause
        </button>
      </div>
    </div>
  );
}
