import { ReviewCard } from "@/components/ui/ReviewCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stars } from "@/components/ui/Stars";
import { reviews, storeRating } from "@/lib/data/home";

export function HomeReviews() {
  return (
    <section className="sec sec-cream">
      <div className="wrap">
        <SectionHead
          layout="row"
          eyebrow="Reviews"
          title="Loved by people who hated greens"
          aside={
            <div className="score">
              <Stars size={18} />
              <p>
                <b>{storeRating.average} out of 5</b> · {storeRating.count.toLocaleString("en-US")}{" "}
                verified reviews
              </p>
            </div>
          }
        />
        <div className="rev-grid">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
