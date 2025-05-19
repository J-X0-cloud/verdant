"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { PurchaseOption } from "@/lib/commerce/types";
import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  variantId: string;
  purchase: PurchaseOption;
  className?: string;
  children: ReactNode;
  /** Go to the cart after adding (product pages); stay put for quick-add buttons. */
  redirect?: boolean;
}

export function AddToCartButton({
  variantId,
  purchase,
  className,
  children,
  redirect = false,
}: AddToCartButtonProps) {
  const { addLines } = useCart();
  const router = useRouter();
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  async function add() {
    setState("adding");
    const ok = await addLines([{ variantId, quantity: 1, purchase }]);
    setState(ok ? "added" : "idle");
    if (ok && redirect) router.push("/cart");
    if (ok && !redirect) setTimeout(() => setState("idle"), 1600);
  }

  return (
    <button
      type="button"
      className={clsx("btn", className)}
      onClick={add}
      disabled={state === "adding"}
      aria-live="polite"
    >
      {state === "added" && !redirect ? "Added" : children}
    </button>
  );
}
