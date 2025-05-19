import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/commerce/money";
import type { Product } from "@/lib/commerce/types";
import { formatComparison } from "@/lib/data/product-content";
import { perServing } from "@/lib/subscriptions";

/** Pouch vs. sticks: prices and per-serving costs come straight from the catalog. */
export function FormatCompare({ formats }: { formats: Product[] }) {
  const priced = formats.map((product) => {
    const pricing = product.variants[0]!.pricing;
    const subscription = pricing.subscription ?? pricing.oneTime;
    return {
      name: product.handle === "daily-greens" ? "Pouch" : product.shortTitle,
      monthly: `${formatPrice(subscription)}/mo`,
      perServing: product.servings ? formatPrice(perServing(subscription, product.servings)) : "—",
    };
  });

  return (
    <section className="sec sec-moss">
      <div className="wrap compare">
        <div className="compare-copy">
          <p className="eyebrow eyebrow-sun">Pouch or sticks?</p>
          <h2>Same blend, two formats</h2>
          <p>
            Switch between them from your account at any time — your price and delivery date stay
            the same.
          </p>
        </div>
        <table className="ctable">
          <thead>
            <tr>
              <th />
              {priced.map((format) => (
                <th scope="col" key={format.name}>
                  {format.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{formatComparison.rows[0]!.label}</th>
              {formatComparison.rows[0]!.values.map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Subscribe &amp; Save</th>
              {priced.map((format) => (
                <td key={format.name}>{format.monthly}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Per serving</th>
              {priced.map((format) => (
                <td key={format.name}>{format.perServing}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">{formatComparison.rows[1]!.label}</th>
              {formatComparison.rows[1]!.values.map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Starter Kit</th>
              {priced.map((format) => (
                <td key={format.name}>
                  <Icon name="check" size={18} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
