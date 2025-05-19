import { ProductArt } from "@/components/art/ProductArt";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { MonthlyPrice } from "@/components/ui/Price";
import { formatPrice } from "@/lib/commerce/money";
import type { Product } from "@/lib/commerce/types";
import { DEFAULT_FREQUENCY, subscriptionSavings } from "@/lib/subscriptions";

export function BundleCard({ bundle }: { bundle: Product }) {
  const variant = bundle.variants[0]!;
  const { subscription, oneTime } = variant.pricing;
  const savings = subscriptionSavings(variant.pricing);
  if (!subscription || !savings) return null;

  return (
    <article className="bundle" id={bundle.handle}>
      <div className="bundle-media">
        <ProductArt art={bundle.art} />
        {bundle.badge ? <span className="badge">{bundle.badge}</span> : null}
      </div>
      <div className="bundle-body">
        <h3>{bundle.title}</h3>
        <p>{bundle.blurb}</p>
        <div className="bundle-foot">
          <MonthlyPrice price={subscription} compareAt={oneTime} />
          <span className="save-tag">Save {formatPrice(savings.amount)}</span>
        </div>
        <AddToCartButton
          className="btn-ink btn-block"
          variantId={variant.id}
          purchase={{ type: "subscription", frequencyDays: DEFAULT_FREQUENCY }}
        >
          Add bundle to cart
        </AddToCartButton>
      </div>
    </article>
  );
}
