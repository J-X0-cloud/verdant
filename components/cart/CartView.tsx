"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/lib/commerce/types";
import { cartTotals } from "@/lib/subscriptions";
import { CartLineItem } from "./CartLineItem";
import { CartUpsell } from "./CartUpsell";
import { OrderSummary } from "./OrderSummary";
import { ShippingBar } from "./ShippingBar";
import { useCart } from "./CartProvider";

export function CartView({ upsell }: { upsell?: Product }) {
  const { cart, totalQuantity, error } = useCart();
  const paidLines = cart?.lines.filter((line) => !line.isGift) ?? [];

  if (!cart || paidLines.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <p>Subscribe to any product to save 20%, get free shipping and a free Starter Kit.</p>
        <Link className="btn btn-sun btn-lg" href="/products/daily-greens">
          Start with Daily Greens <Icon name="arrow" size={18} />
        </Link>
      </div>
    );
  }

  const totals = cartTotals(cart);

  return (
    <>
      <div className="cart-head">
        <h1>
          Your cart <span>({totalQuantity} items)</span>
        </h1>
        <Link className="link-arrow" href="/collections/all">
          Continue shopping <Icon name="arrow" size={16} />
        </Link>
      </div>
      <div className="cart-grid">
        <div className="cart-main">
          <ShippingBar freeShipping={totals.freeShipping} />
          {error ? (
            <p className="cart-error" role="alert">
              {error}
            </p>
          ) : null}
          <ul className="lines">
            {cart.lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
          {upsell ? <CartUpsell product={upsell} cart={cart} /> : null}
        </div>
        <OrderSummary cart={cart} totals={totals} />
      </div>
    </>
  );
}
