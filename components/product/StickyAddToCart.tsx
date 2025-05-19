"use client";

import clsx from "clsx";

interface StickyAddToCartProps {
  visible: boolean;
  title: string;
  detail: string;
  disabled: boolean;
  onAdd(): void;
}

/** Mobile bar that appears once the main add-to-cart button scrolls out of view. */
export function StickyAddToCart({ visible, title, detail, disabled, onAdd }: StickyAddToCartProps) {
  return (
    <div className={clsx("sticky-atc", visible && "show")} aria-hidden={!visible}>
      <div>
        <b>{title}</b>
        <span>{detail}</span>
      </div>
      <button
        type="button"
        className="btn btn-sun"
        onClick={onAdd}
        disabled={disabled}
        tabIndex={visible ? 0 : -1}
      >
        Add to cart
      </button>
    </div>
  );
}
