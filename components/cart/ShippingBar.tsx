import { Icon } from "@/components/ui/Icon";
import { formatAmount } from "@/lib/commerce/money";
import type { CartTotals } from "@/lib/subscriptions";

export function ShippingBar({ freeShipping }: { freeShipping: CartTotals["freeShipping"] }) {
  const { unlocked, remaining, progress, reason } = freeShipping;

  return (
    <div className="ship-bar">
      <div className="ship-txt">
        <Icon name="truck" size={18} />
        {unlocked ? (
          <span>
            <b>You&apos;ve unlocked free shipping.</b>{" "}
            {reason === "subscription"
              ? "Your subscription always ships free."
              : "Your order ships free."}
          </span>
        ) : (
          <span>
            Add <b>{formatAmount(remaining)}</b> for free shipping, or subscribe to any product and
            it ships free.
          </span>
        )}
      </div>
      <div
        className="meter"
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <i style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
