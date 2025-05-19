import Link from "next/link";
import { HeroScene } from "@/components/art/HeroScene";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { hero, images, storeRating } from "@/lib/data/home";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${images.heroTexture.url})` }} />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-sun">{hero.eyebrow}</p>
          <h1>
            Your daily greens, <em>one easy scoop.</em>
          </h1>
          <p className="lede">{hero.lede}</p>
          <div className="cta-row">
            <Link className="btn btn-sun btn-lg" href="/products/daily-greens">
              Start my subscription <Icon name="arrow" size={18} />
            </Link>
            <Link className="btn btn-ghost btn-lg" href="/collections/all">
              Shop all
            </Link>
          </div>
          <ul className="hero-points">
            {hero.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                {point}
              </li>
            ))}
          </ul>
          <div className="hero-rating">
            <Stars />
            <span>
              <b>{storeRating.average}</b> from {storeRating.count.toLocaleString("en-US")} reviews
            </span>
          </div>
        </div>
        <HeroScene />
      </div>
    </section>
  );
}
