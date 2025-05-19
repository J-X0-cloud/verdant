import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import type { Product, Review } from "@/lib/commerce/types";
import { site } from "@/lib/data/site";

export function ProductReviews({ product, reviews }: { product: Product; reviews: Review[] }) {
  const { average, count, distribution } = product.reviews;

  return (
    <section className="sec" id="reviews">
      <div className="wrap">
        <div className="rev-head">
          <div className="rev-summary">
            <p className="eyebrow">Reviews</p>
            <div className="big-score">{average}</div>
            <Stars rating={average} size={20} />
            <p>Based on {count.toLocaleString("en-US")} verified reviews</p>
            {distribution ? (
              <ul className="bars">
                {distribution.map((percent, index) => (
                  <li key={index}>
                    <span>{5 - index}★</span>
                    <i>
                      <em style={{ width: `${percent}%` }} />
                    </i>
                    <span>{percent}%</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <a
              className="btn btn-ink btn-sm"
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Review: ${product.title}`)}`}
            >
              Write a review
            </a>
          </div>
          <div className="rev-grid rev-grid-2">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
