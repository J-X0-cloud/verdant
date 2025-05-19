"use client";

import { Icon } from "@/components/ui/Icon";
import { formatAmount } from "@/lib/commerce/money";
import type { FrequencyDays, PurchaseOption, VariantPricing } from "@/lib/commerce/types";
import {
  FREQUENCIES,
  STARTER_KIT,
  isFrequency,
  perServing,
  subscriptionSavings,
} from "@/lib/subscriptions";

interface SubscriptionSelectorProps {
  pricing: VariantPricing;
  servings?: number;
  value: PurchaseOption;
  onChange(purchase: PurchaseOption): void;
  /** Bundles ship as one subscription and have no one-time option. */
  subscriptionOnly?: boolean;
}

/**
 * Purchase options with Subscribe & Save first and pre-selected. The frequency
 * is remembered while the shopper flips between options.
 */
export function SubscriptionSelector({
  pricing,
  servings,
  value,
  onChange,
  subscriptionOnly,
}: SubscriptionSelectorProps) {
  const savings = subscriptionSavings(pricing);
  const frequencyDays: FrequencyDays =
    value.type === "subscription" ? value.frequencyDays : FREQUENCIES[0]!.days;
  const subscribed = value.type === "subscription";

  if (!pricing.subscription || !savings) return null;

  const selectSubscription = (days: FrequencyDays = frequencyDays) =>
    onChange({ type: "subscription", frequencyDays: days });

  return (
    <fieldset>
      <legend>Purchase option</legend>
      <label className="opt opt-sub">
        <input
          type="radio"
          name="plan"
          value="subscription"
          checked={subscribed}
          onChange={() => selectSubscription()}
        />
        <span className="opt-main">
          <span className="opt-top">
            <b>Subscribe &amp; Save</b>
            <span className="save-tag">Save {savings.percent}%</span>
            <span className="opt-price">
              <b>{formatAmount(pricing.subscription)}</b>
              <s>{formatAmount(pricing.oneTime)}</s>
            </span>
          </span>
          <span className="opt-sub-meta">
            {servings
              ? `${formatAmount(perServing(pricing.subscription, servings))} per serving · `
              : ""}
            billed each delivery
          </span>
          <ul className="opt-perks">
            <li>
              <Icon name="gift" size={15} />
              Free Starter Kit (${STARTER_KIT.value} value)
            </li>
            <li>
              <Icon name="truck" size={15} />
              Free shipping on every order
            </li>
            <li>
              <Icon name="refresh" size={15} />
              Skip, swap or cancel anytime
            </li>
          </ul>
          <span className="freq">
            <span>Deliver every</span>
            <select
              name="frequency"
              aria-label="Delivery frequency"
              value={frequencyDays}
              onChange={(event) => {
                const days = Number(event.target.value);
                if (isFrequency(days)) selectSubscription(days);
              }}
            >
              {FREQUENCIES.map((frequency) => (
                <option key={frequency.days} value={frequency.days}>
                  {frequency.label}
                </option>
              ))}
            </select>
          </span>
        </span>
      </label>

      {subscriptionOnly ? null : (
        <label className="opt">
          <input
            type="radio"
            name="plan"
            value="one-time"
            checked={!subscribed}
            onChange={() => onChange({ type: "one-time" })}
          />
          <span className="opt-main">
            <span className="opt-top">
              <b>One-time purchase</b>
              <span className="opt-price">
                <b>{formatAmount(pricing.oneTime)}</b>
              </span>
            </span>
            <span className="opt-sub-meta">
              {servings
                ? `${formatAmount(perServing(pricing.oneTime, servings))} per serving · `
                : ""}
              shipping calculated at checkout
            </span>
          </span>
        </label>
      )}
    </fieldset>
  );
}
