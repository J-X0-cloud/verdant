import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Price } from "@/components/ui/Price";
import { defaultVariant, productUrl } from "@/lib/commerce/catalog";
import type { Product } from "@/lib/commerce/types";
import { DEFAULT_FREQUENCY } from "@/lib/subscriptions";
import { FlavourDots } from "./FlavourDots";

export function ProductCard({ product }: { product: Product }) {
  const variant = defaultVariant(product);
  const href = productUrl(product);
  const subscribable = Boolean(variant.pricing.subscription);

  return (
    <article className="pcard">
      <Link className="pcard-media" href={href} aria-label={product.title}>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        <ProductArt art={product.art} />
      </Link>
      <div className="pcard-body">
        <h3>
          <Link href={href}>{product.title}</Link>
        </h3>
        <p>{product.blurb}</p>
        <FlavourDots product={product} />
        <div className="pcard-foot">
          <Price pricing={variant.pricing} showSaveNote from={product.handle === "gift-card"} />
          <AddToCartButton
            className="btn-ink btn-sm"
            variantId={variant.id}
            purchase={
              subscribable
                ? { type: "subscription", frequencyDays: DEFAULT_FREQUENCY }
                : { type: "one-time" }
            }
          >
            Add
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
