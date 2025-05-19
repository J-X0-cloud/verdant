"use client";

import { useId, useState, type FormEvent } from "react";
import { useCart } from "./CartProvider";

export function PromoCode() {
  const id = useId();
  const { cart, applyDiscount, error } = useCart();
  const [code, setCode] = useState("");
  const [tried, setTried] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) return;
    setTried(true);
    if (await applyDiscount(code)) setCode("");
  }

  const applied = cart?.discountCodes[0];

  return (
    <form className="promo-code" onSubmit={submit}>
      <label htmlFor={id}>Promo code</label>
      <div className="news-row">
        <input
          id={id}
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn-line" type="submit">
          Apply
        </button>
      </div>
      {tried && error ? (
        <p className="promo-msg err" role="alert">
          {error}
        </p>
      ) : applied ? (
        <p className="promo-msg">{applied} will be applied at checkout.</p>
      ) : null}
    </form>
  );
}
