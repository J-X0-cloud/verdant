import { Disclosure } from "@/components/ui/Disclosure";
import type { Product } from "@/lib/commerce/types";
import { shippingCopy, starterKitCopy } from "@/lib/data/product-content";

export function ProductDetails({
  product,
  subscribable,
}: {
  product: Product;
  subscribable: boolean;
}) {
  return (
    <div className="acc">
      {product.howToTake ? (
        <Disclosure summary="How to take it" open>
          {product.howToTake}
        </Disclosure>
      ) : (
        <Disclosure summary="Details" open>
          {product.description}
        </Disclosure>
      )}
      {subscribable ? (
        <Disclosure summary="What's in the Starter Kit">{starterKitCopy}</Disclosure>
      ) : null}
      <Disclosure summary="Shipping & returns">{shippingCopy}</Disclosure>
    </div>
  );
}
