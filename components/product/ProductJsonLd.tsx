import type { Product } from "@/lib/commerce/types";
import { site } from "@/lib/data/site";

export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviews.average,
      reviewCount: product.reviews.count,
    },
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      name: variant.title,
      price: variant.pricing.oneTime.amount,
      priceCurrency: variant.pricing.oneTime.currencyCode,
      availability: variant.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/products/${product.handle}${variant.flavour ? `?flavor=${variant.flavour}` : ""}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
