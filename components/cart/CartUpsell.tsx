"use client";

import { ProductArt } from "@/components/art/ProductArt";
import { Icon } from "@/components/ui/Icon";
import { MonthlyPrice } from "@/components/ui/Price";
import type { Cart, Product } from "@/lib/commerce/types";
import { DEFAULT_FREQUENCY } from "@/lib/subscriptions";
import { AddToCartButton } from "./AddToCartButton";

/**
 * "Add to your subscription": offers the companion blend on the same
 * frequency as the subscription already in the cart, so it ships in one box.
 */
export function CartUpsell({ product, cart }: { product: Product; cart: Cart }) {
  const variant = product.variants[0];
  const inCart = cart.lines.some((line) => line.merchandise.product.handle === product.handle);
  if (!variant?.pricing.subscription || inCart) return null;

  const existing = cart.lines.find((line) => line.purchase.type === "subscription")?.purchase;
  const frequencyDays =
    existing?.type === "subscription" ? existing.frequencyDays : DEFAULT_FREQUENCY;

  return (
    <div className="upsell">
      <div className="upsell-media">
        <ProductArt art={product.art} />
      </div>
      <div className="upsell-body">
        <p className="eyebrow">Add to your subscription</p>
        <h3>{product.title}</h3>
        <p>Pair it with your greens and it ships in the same box, on the same date.</p>
      </div>
      <div className="upsell-cta">
        <MonthlyPrice price={variant.pricing.subscription} compareAt={variant.pricing.oneTime} />
        <AddToCartButton
          className="btn-ink btn-sm"
          variantId={variant.id}
          purchase={{ type: "subscription", frequencyDays }}
        >
          <Icon name="plus" size={14} /> Add
        </AddToCartButton>
      </div>
    </div>
  );
}
