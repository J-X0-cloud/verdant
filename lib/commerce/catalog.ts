import { flavours } from "@/lib/data/flavours";
import type { ArtSpec, Flavour, Product, ProductVariant } from "./types";

export function defaultVariant(product: Product): ProductVariant {
  return product.variants[0]!;
}

export function findVariant(product: Product, id: string | undefined): ProductVariant | undefined {
  return product.variants.find((variant) => variant.id === id);
}

export function findVariantByFlavour(
  product: Product,
  flavour: string | undefined,
): ProductVariant | undefined {
  return product.variants.find((variant) => variant.flavour === flavour);
}

export function productFlavours(product: Product): Flavour[] {
  return product.variants.flatMap((variant) =>
    variant.flavour ? [flavours[variant.flavour]] : [],
  );
}

export function isSubscribable(product: Product): boolean {
  return product.variants.some((variant) => variant.pricing.subscription !== undefined);
}

/** Lowest price to show on a card: the subscription price when there is one. */
export function cardPrice(product: Product) {
  const pricing = defaultVariant(product).pricing;
  return {
    price: pricing.subscription ?? pricing.oneTime,
    compareAt: pricing.subscription ? pricing.oneTime : undefined,
  };
}

/** Art for a specific variant: flavour-less pouches and sticks take the variant's flavour. */
export function artForVariant(art: ArtSpec, variant?: ProductVariant): ArtSpec {
  if (!variant) return art;
  if (art.type === "giftcard") return { ...art, amount: variant.pricing.oneTime.amount };
  if (
    (art.type === "pouch" || art.type === "stick" || art.type === "canister") &&
    !art.flavour &&
    variant.flavour
  ) {
    return { ...art, flavour: variant.flavour };
  }
  return art;
}

export function productUrl(
  product: Pick<Product, "handle" | "category">,
  variant?: ProductVariant,
): string {
  if (product.category === "bundles") return `/collections/all#${product.handle}`;
  return variant?.flavour
    ? `/products/${product.handle}?flavor=${variant.flavour}`
    : `/products/${product.handle}`;
}
