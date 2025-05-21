import type { MetadataRoute } from "next";
import { storefront } from "@/lib/commerce";
import { policies } from "@/lib/data/policies";
import { site } from "@/lib/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    storefront.getProducts(),
    storefront.getCollections(),
  ]);
  const entry = (path: string, priority: number) => ({ url: `${site.url}${path}`, priority });

  return [
    entry("", 1),
    ...collections.map((c) => entry(`/collections/${c.handle}`, 0.8)),
    ...products.map((p) =>
      entry(`/products/${p.handle}`, p.handle === "daily-greens" ? 0.95 : 0.8),
    ),
    ...policies.map((p) => entry(`/policies/${p.slug}`, 0.2)),
  ];
}
