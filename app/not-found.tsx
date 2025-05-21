import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap cart-empty">
        <p className="eyebrow">404</p>
        <h1>This page wandered off</h1>
        <p>The link may be old or mistyped. Your greens are right where you left them.</p>
        <Link className="btn btn-sun btn-lg" href="/collections/all">
          Shop all <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}
