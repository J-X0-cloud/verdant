import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { ProductRail } from "@/components/product/ProductRail";
import { storefront } from "@/lib/commerce";
import { cartUpsellHandle } from "@/lib/data/collections";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Verdant order: subscriptions, one-time items and your free Starter Kit.",
  robots: { index: false },
};

export default async function CartPage() {
  const [upsell, recommendations] = await Promise.all([
    storefront.getProduct(cartUpsellHandle),
    storefront.getRecommendations("cart", 4),
  ]);

  return (
    <>
      <section className="sec sec-tight cart-sec">
        <div className="wrap">
          <CartView upsell={upsell} />
        </div>
      </section>
      <ProductRail
        eyebrow="You might also like"
        title="Round out your box"
        products={recommendations}
      />
    </>
  );
}
