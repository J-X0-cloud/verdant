import Link from "next/link";
import { Canister } from "@/components/art/Canister";

export function StarterKitPromo() {
  return (
    <article className="promo">
      <div>
        <p className="eyebrow eyebrow-sun">New subscribers</p>
        <h3>Get the Starter Kit free</h3>
        <p>Shaker, canister and scoop with your first subscription order.</p>
        <Link className="btn btn-sun btn-sm" href="/products/daily-greens">
          Start subscribing
        </Link>
      </div>
      <div className="promo-art">
        <Canister />
      </div>
    </article>
  );
}
