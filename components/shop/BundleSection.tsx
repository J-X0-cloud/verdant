import { SectionHead } from "@/components/ui/SectionHead";
import type { Product } from "@/lib/commerce/types";
import { subscriptionSavings } from "@/lib/subscriptions";
import { BundleCard } from "./BundleCard";

export function BundleSection({ bundles }: { bundles: Product[] }) {
  const bestPercent = Math.max(
    ...bundles.map((bundle) => subscriptionSavings(bundle.variants[0]!.pricing)?.percent ?? 0),
  );

  return (
    <section className="sec sec-cream" id="bundles">
      <div className="wrap">
        <SectionHead layout="row" eyebrow="Bundle & save" title="Better together, priced that way">
          Every bundle ships as one subscription with one delivery date, the free Starter Kit, and
          up to {bestPercent}% off one-time prices.
        </SectionHead>
        <div className="bgrid">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}
