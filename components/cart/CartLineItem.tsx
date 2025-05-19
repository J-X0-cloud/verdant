"use client";

import { useState } from "react";
import { ProductArt } from "@/components/art/ProductArt";
import { Icon } from "@/components/ui/Icon";
import { artForVariant } from "@/lib/commerce/catalog";
import { formatAmount } from "@/lib/commerce/money";
import type { CartLine } from "@/lib/commerce/types";
import {
  DEFAULT_FREQUENCY,
  FREQUENCIES,
  SUBSCRIBE_AND_SAVE_RATE,
  frequencyLabel,
  isFrequency,
} from "@/lib/subscriptions";
import { QuantityStepper } from "./QuantityStepper";
import { useCart } from "./CartProvider";

function variantLine(line: CartLine): string {
  const { product, variant } = line.merchandise;
  const parts = [variant.title !== "Default" ? variant.title : null];
  if (product.servings && product.category !== "bundles")
    parts.push(`${product.servings} servings`);
  return parts.filter(Boolean).join(" · ") || product.title;
}

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, setPurchase, removeLine } = useCart();
  const [editingFrequency, setEditingFrequency] = useState(false);
  const { product, variant } = line.merchandise;
  const subscription = line.purchase.type === "subscription" ? line.purchase : null;
  const canSubscribe = Boolean(variant.pricing.subscription);
  const showCompare = line.cost.compareAt.amount > line.cost.total.amount;

  return (
    <li className="line">
      <div className="line-media">
        <ProductArt art={artForVariant(product.art, variant)} />
      </div>
      <div className="line-info">
        <h3>{product.title}</h3>
        <p>{line.isGift ? variant.title : variantLine(line)}</p>
        <span className={subscription ? "plan plan-sub" : "plan"}>
          <Icon name={subscription ? "refresh" : line.isGift ? "gift" : "check"} size={14} />
          {subscription
            ? `Subscription · ${frequencyLabel(subscription.frequencyDays)}`
            : line.isGift
              ? "Free with first subscription"
              : "One-time purchase"}
        </span>

        {subscription ? (
          editingFrequency ? (
            <label className="line-freq">
              Deliver every
              <select
                value={subscription.frequencyDays}
                onChange={(event) => {
                  const days = Number(event.target.value);
                  if (isFrequency(days))
                    setPurchase(line.id, { type: "subscription", frequencyDays: days });
                  setEditingFrequency(false);
                }}
              >
                {FREQUENCIES.map((frequency) => (
                  <option key={frequency.days} value={frequency.days}>
                    {frequency.days} days
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <button type="button" className="line-link" onClick={() => setEditingFrequency(true)}>
              Change delivery frequency
            </button>
          )
        ) : !line.isGift && canSubscribe ? (
          <button
            type="button"
            className="line-link"
            onClick={() =>
              setPurchase(line.id, { type: "subscription", frequencyDays: DEFAULT_FREQUENCY })
            }
          >
            Switch to Subscribe &amp; Save — save {Math.round(SUBSCRIBE_AND_SAVE_RATE * 100)}%
          </button>
        ) : null}
      </div>

      <div className="line-qty">
        {line.isGift ? (
          <span className="qty-fixed">Qty 1</span>
        ) : (
          <>
            <QuantityStepper
              value={line.quantity}
              onChange={(quantity) => setQuantity(line.id, quantity)}
            />
            <button type="button" className="rm" onClick={() => removeLine(line.id)}>
              Remove
            </button>
          </>
        )}
      </div>

      <div className="line-price">
        {line.isGift ? <b className="free">Free</b> : <b>{formatAmount(line.cost.total)}</b>}
        {showCompare ? <s>{formatAmount(line.cost.compareAt)}</s> : null}
      </div>
    </li>
  );
}
