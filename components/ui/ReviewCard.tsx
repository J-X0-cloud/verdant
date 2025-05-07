import type { Review } from "@/lib/commerce/types";
import { Stars } from "./Stars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review">
      <Stars />
      <h3>{review.title}</h3>
      <p>{review.body}</p>
      <footer>
        <b>{review.author}</b>
        <span>{review.location} · Verified subscriber</span>
      </footer>
    </article>
  );
}
