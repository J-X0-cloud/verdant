import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { images, scoopFacts } from "@/lib/data/home";

export function InsideTheScoop() {
  const photo = images.powderDish;

  return (
    <section className="sec sec-cream" id="inside">
      <div className="wrap split">
        <div className="split-media">
          <Image
            className="cover"
            src={photo.url}
            alt={photo.altText}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </div>
        <div className="split-copy">
          <p className="eyebrow">What&apos;s in a scoop</p>
          <h2>
            42 ingredients.
            <br />
            One 12 g scoop.
          </h2>
          <p>
            We start with leafy greens and grasses, add fruit and berries for flavor and color, then
            round it out with roots, botanicals and a mineral blend. Every ingredient and amount is
            printed on the label — no proprietary guesswork.
          </p>
          <dl className="facts">
            {scoopFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
          <Link className="link-arrow" href="/products/daily-greens#ingredients">
            See the full ingredient panel <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
