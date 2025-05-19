"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { totalQuantity } = useCart();
  return (
    <Link href="/cart" className="ha-cart" aria-label={`Cart, ${totalQuantity} items`}>
      <Icon name="cart" />
      <span className="count">{totalQuantity}</span>
    </Link>
  );
}
