"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { artForVariant } from "@/lib/commerce/catalog";
import { formatAmount, formatPrice } from "@/lib/commerce/money";
import type { Product, PurchaseOption, StoreImage } from "@/lib/commerce/types";
import { site } from "@/lib/data/site";
import { DEFAULT_FREQUENCY, subscriptionSavings, unitPrice } from "@/lib/subscriptions";
import { FlavourPicker } from "./FlavourPicker";
import { ProductGallery } from "./ProductGallery";
import { StickyAddToCart } from "./StickyAddToCart";
import { SubscriptionSelector } from "./SubscriptionSelector";

interface ProductViewProps {
  product: Product;
  initialVariantId: string;
  photos: StoreImage[];
  /** Server-rendered accordions below the form. */
  details: ReactNode;
}

export function ProductView({ product, initialVariantId, photos, details }: ProductViewProps) {
  const router = useRouter();
  const { addLines, error } = useCart();
  const [variant, setVariant] = useState(
    () => product.variants.find((v) => v.id === initialVariantId) ?? product.variants[0]!,
  );
  const subscribable = Boolean(variant.pricing.subscription);
  // Subscribe & Save is the default wherever it's offered.
  const [purchase, setPurchase] = useState<PurchaseOption>(
    subscribable
      ? { type: "subscription", frequencyDays: DEFAULT_FREQUENCY }
      : { type: "one-time" },
  );
  const [adding, setAdding] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const price = unitPrice(variant.pricing, purchase);
  const savings = subscriptionSavings(variant.pricing);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  function selectVariant(next: typeof variant) {
    setVariant(next);
    if (next.flavour) {
      const url = new URL(window.location.href);
      url.searchParams.set("flavor", next.flavour);
      window.history.replaceState(null, "", url);
    }
  }

  async function addToCart() {
    setAdding(true);
    const ok = await addLines([{ variantId: variant.id, quantity: 1, purchase }]);
    setAdding(false);
    if (ok) router.push("/cart");
  }

  const stickyDetail =
    purchase.type === "subscription" && savings
      ? `${formatPrice(price)}/mo · Save ${savings.percent}%`
      : `${formatPrice(price)} one-time`;

  return (
    <section className="pdp wrap">
      <ProductGallery
        art={artForVariant(product.art, variant)}
        photos={photos}
        showKit={product.category === "greens" && subscribable}
      />
      <div className="buy">
        <div className="buy-inner">
          {product.badge ? <span className="badge badge-static">{product.badge}</span> : null}
          <h1>{product.shortTitle}</h1>
          <div className="buy-rating">
            <Stars rating={product.reviews.average} />
            <a href="#reviews">
              <b>{product.reviews.average}</b> · {product.reviews.count.toLocaleString("en-US")}{" "}
              reviews
            </a>
          </div>
          <p className="buy-lede">{product.description}</p>

          <form
            className="buy-form"
            onSubmit={(event) => {
              event.preventDefault();
              void addToCart();
            }}
          >
            {product.variants.length > 1 ? (
              <FlavourPicker
                variants={product.variants}
                value={variant.id}
                onChange={selectVariant}
              />
            ) : null}
            {subscribable ? (
              <SubscriptionSelector
                pricing={variant.pricing}
                servings={product.servings}
                value={purchase}
                onChange={setPurchase}
                subscriptionOnly={product.subscriptionOnly}
              />
            ) : null}
            <button
              ref={buttonRef}
              className="btn btn-sun btn-lg btn-block atc"
              type="submit"
              disabled={adding}
            >
              {adding ? "Adding…" : "Add to cart"} · <span>{formatAmount(price)}</span>
            </button>
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
            <p className="buy-note">
              <Icon name="truck" size={16} /> Order by {site.shipCutoff}, ships today ·{" "}
              <Icon name="smile" size={16} /> 30-day taste promise
            </p>
          </form>
          {details}
        </div>
      </div>
      <StickyAddToCart
        visible={stickyVisible}
        title={product.shortTitle}
        detail={stickyDetail}
        disabled={adding}
        onAdd={addToCart}
      />
    </section>
  );
}
