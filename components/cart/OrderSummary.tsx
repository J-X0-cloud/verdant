"use client";

import { Icon } from "@/components/ui/Icon";
import { formatAmount } from "@/lib/commerce/money";
import type { Cart } from "@/lib/commerce/types";
import { cartAssurances } from "@/lib/data/product-content";
import { SUBSCRIBE_AND_SAVE_RATE, type CartTotals, renewalNotice } from "@/lib/subscriptions";
import { PromoCode } from "./PromoCode";

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function OrderSummary({ cart, totals }: { cart: Cart; totals: CartTotals }) {
  const renewal = renewalNotice(cart);

  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Order summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatAmount(totals.subtotal)}</dd>
        </div>
        {totals.subscriptionDiscount.amount > 0 ? (
          <div className="save">
            <dt>Subscribe &amp; Save ({Math.round(SUBSCRIBE_AND_SAVE_RATE * 100)}%)</dt>
            <dd>−{formatAmount(totals.subscriptionDiscount)}</dd>
          </div>
        ) : null}
        {totals.starterKitValue.amount > 0 ? (
          <div className="save">
            <dt>Starter Kit</dt>
            <dd>Free</dd>
          </div>
        ) : null}
        <div>
          <dt>Shipping</dt>
          <dd>{totals.shipping.amount === 0 ? "Free" : formatAmount(totals.shipping)}</dd>
        </div>
        <div>
          <dt>Estimated tax</dt>
          <dd>Calculated at checkout</dd>
        </div>
      </dl>
      <PromoCode />
      <div className="total">
        <span>Total today</span>
        <b>{formatAmount(totals.total)}</b>
      </div>
      {totals.totalSavings.amount > 0 ? (
        <p className="you-save">
          You&apos;re saving {formatAmount(totals.totalSavings)} on this order
        </p>
      ) : null}
      <a className="btn btn-sun btn-lg btn-block" href={cart.checkoutUrl}>
        <Icon name="lock" size={18} /> Secure checkout
      </a>
      {renewal ? (
        <div className="renew">
          <Icon name="calendar" size={18} />
          <p>
            Your {renewal.productTitle} renews every {renewal.frequencyDays} days at{" "}
            <b>{formatAmount(renewal.price)}</b>, next on <b>{longDate.format(renewal.nextDate)}</b>
            . We&apos;ll text you 3 days before so you can skip or change it.
          </p>
        </div>
      ) : null}
      <ul className="assure">
        {cartAssurances.map((item) => (
          <li key={item}>
            <Icon name="check" size={15} />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
