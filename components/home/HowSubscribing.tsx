import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { images, subscriptionSteps } from "@/lib/data/home";
import { SubscriptionPreview } from "./SubscriptionPreview";

export function HowSubscribing({ product }: { product: Product }) {
  const photo = images.scoop;

  return (
    <section className="sec sec-moss" id="how">
      <div className="wrap how">
        <div className="how-copy">
          <p className="eyebrow eyebrow-sun">How subscribing works</p>
          <h2>Set it once. Change it whenever.</h2>
          <ol className="steps">
            {subscriptionSteps.map((step, index) => (
              <li key={step.title}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="btn btn-sun" href="/products/daily-greens">
            Build my subscription
          </Link>
        </div>
        <div className="how-visual">
          <div className="how-photo">
            <Image
              className="cover"
              src={photo.url}
              alt={photo.altText}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </div>
          <SubscriptionPreview product={product} />
        </div>
      </div>
    </section>
  );
}
