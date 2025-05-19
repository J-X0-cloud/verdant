import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/commerce/money";
import type { Money } from "@/lib/commerce/types";
import { images } from "@/lib/data/home";

export function ClosingBand({ startingPrice }: { startingPrice: Money }) {
  return (
    <section
      className="band"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(31,40,22,.88),rgba(31,40,22,.35)),url(${images.field.url})`,
      }}
    >
      <div className="wrap band-inner">
        <h2>
          Greens you&apos;ll actually
          <br />
          keep drinking.
        </h2>
        <p>Save 20% on every order, plus a free Starter Kit with your first box.</p>
        <Link className="btn btn-sun btn-lg" href="/products/daily-greens">
          Start for {formatPrice(startingPrice)}/mo <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}
