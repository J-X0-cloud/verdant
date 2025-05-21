import type { Metadata } from "next";
import Form from "next/form";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";
import { searchProducts } from "@/lib/search";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = ((await searchParams).q ?? "").trim();
  const results = query ? searchProducts(await storefront.getProducts(), query) : [];

  return (
    <section className="sec sec-tight">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <h1 className="page-title">Search</h1>
        <Form action="/search" className="search-form news-row">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Try “mint”, “sticks” or “protein”"
            aria-label="Search products"
          />
          <button type="submit" className="btn btn-ink">
            Search
          </button>
        </Form>
        {query ? (
          <p className="count-line">
            {results.length} {results.length === 1 ? "product" : "products"} for “{query}”
          </p>
        ) : null}
        {results.length > 0 ? (
          <div className="pgrid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
