import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="wrap">
        <Icon name="gift" size={16} />
        <span>
          <b>Free Starter Kit</b> with your first subscription order — glass shaker, refill canister
          &amp; scoop.
        </span>
        <Link href="/products/daily-greens">Start today</Link>
      </div>
    </div>
  );
}
