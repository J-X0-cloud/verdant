import { flavours } from "@/lib/data/flavours";
import type { Product } from "@/lib/commerce/types";

const normalise = (value: string) => value.toLowerCase().replace(/&/g, "and");

/** Every term must appear in the title, blurb, category or a flavour name. */
export function searchProducts(products: Product[], query: string): Product[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return products.filter((product) => {
    const flavourNames = product.variants.flatMap((v) =>
      v.flavour ? [flavours[v.flavour].name] : [],
    );
    const haystack = normalise(
      [product.title, product.blurb, product.category, ...flavourNames].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}
