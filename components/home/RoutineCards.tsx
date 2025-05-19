import clsx from "clsx";
import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { Icon } from "@/components/ui/Icon";
import { MonthlyPrice } from "@/components/ui/Price";
import { SectionHead } from "@/components/ui/SectionHead";
import { formatAmount } from "@/lib/commerce/money";
import type { Product } from "@/lib/commerce/types";
import { routineOptions } from "@/lib/data/home";
import { perServing } from "@/lib/subscriptions";

export function RoutineCards({ products }: { products: Product[] }) {
  return (
    <section className="sec" id="routine">
      <div className="wrap">
        <SectionHead
          layout="center"
          eyebrow="Find your routine"
          title="Three ways to make greens a habit"
        >
          Every option is the same 42-ingredient blend. Pick the format that fits your day — you can
          switch any time.
        </SectionHead>
        <div className="rgrid">
          {routineOptions.map((option) => {
            const product = products.find((p) => p.handle === option.handle);
            const pricing = product?.variants[0]?.pricing;
            if (!product || !pricing?.subscription) return null;
            const href =
              product.category === "bundles"
                ? `/collections/all#${product.handle}`
                : `/products/${product.handle}`;

            return (
              <article
                className={clsx("rcard", option.highlight && "rcard-hi")}
                key={option.handle}
              >
                <div className="rcard-media">
                  <ProductArt art={product.art} />
                  <span className="badge">{option.tag}</span>
                </div>
                <div className="rcard-body">
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                  <ul className="ticks">
                    {option.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Icon name="check" size={16} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="rcard-foot">
                    <MonthlyPrice price={pricing.subscription} compareAt={pricing.oneTime} />
                    {product.servings ? (
                      <span className="serv">
                        {formatAmount(perServing(pricing.subscription, product.servings))} per
                        serving
                      </span>
                    ) : null}
                  </div>
                  <Link
                    className={clsx("btn btn-block", option.highlight ? "btn-sun" : "btn-ink")}
                    href={href}
                  >
                    Choose {option.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
