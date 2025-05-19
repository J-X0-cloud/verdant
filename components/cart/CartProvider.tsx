"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Cart, CartLineInput, PurchaseOption } from "@/lib/commerce/types";

interface CartContextValue {
  cart: Cart | null;
  totalQuantity: number;
  busy: boolean;
  error: string | null;
  addLines(lines: CartLineInput[]): Promise<boolean>;
  setQuantity(lineId: string, quantity: number): Promise<boolean>;
  setPurchase(lineId: string, purchase: PurchaseOption): Promise<boolean>;
  removeLine(lineId: string): Promise<boolean>;
  applyDiscount(code: string): Promise<boolean>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (method: "POST" | "PATCH" | "DELETE", body: unknown) => {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as { cart?: Cart | null; error?: string };
      if (!response.ok) {
        setError(data.error ?? "Something went wrong with your cart");
        return false;
      }
      setCart(data.cart ?? null);
      return true;
    } catch {
      setError("We couldn’t reach the store. Check your connection and try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      totalQuantity: cart?.totalQuantity ?? 0,
      busy,
      error,
      addLines: (lines) => request("POST", { lines }),
      setQuantity: (lineId, quantity) => request("PATCH", { updates: [{ lineId, quantity }] }),
      setPurchase: (lineId, purchase) => request("PATCH", { updates: [{ lineId, purchase }] }),
      removeLine: (lineId) => request("DELETE", { lineIds: [lineId] }),
      applyDiscount: (discountCode) => request("PATCH", { discountCode }),
    }),
    [cart, busy, error, request],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
