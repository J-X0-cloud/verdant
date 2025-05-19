"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import type { Product, SortKey } from "@/lib/commerce/types";
import { cardPrice } from "@/lib/commerce/catalog";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const sorted = [...products];
  const price = (p: Product) => cardPrice(p).price.amount;
  switch (sort) {
    case "best-selling":
      return sorted.sort((a, b) => b.reviews.count - a.reviews.count);
    case "price-asc":
      return sorted.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return sorted.sort((a, b) => price(b) - price(a));
    default:
      return sorted;
  }
}

interface ShopBrowserProps {
  products: Product[];
  /** Pre-rendered product cards keyed by handle, so cards stay server components. */
  cards: Record<string, ReactNode>;
  chips: ReactNode;
  /** Editorial tile shown after the fourth card when sorted by "Featured". */
  promo?: ReactNode;
}

export function ShopBrowser({ products, cards, chips, promo }: ShopBrowserProps) {
  const [sort, setSort] = useState<SortKey>("featured");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="toolbar">
        {chips}
        <label className="sort">
          <span>Sort</span>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="count-line">
        {products.length} products · Prices shown with Subscribe &amp; Save
      </p>
      <div className="pgrid">
        {sorted.map((product, index) => (
          <Fragment key={product.handle}>
            {promo && sort === "featured" && index === 4 ? promo : null}
            {cards[product.handle]}
          </Fragment>
        ))}
      </div>
    </>
  );
}
