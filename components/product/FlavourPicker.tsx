"use client";

import { flavours } from "@/lib/data/flavours";
import type { ProductVariant } from "@/lib/commerce/types";

interface FlavourPickerProps {
  variants: ProductVariant[];
  value: string;
  onChange(variant: ProductVariant): void;
}

export function FlavourPicker({ variants, value, onChange }: FlavourPickerProps) {
  const selected = variants.find((variant) => variant.id === value);

  return (
    <fieldset>
      <legend>
        Flavor: <b>{selected?.title}</b>
      </legend>
      <div className="fl-grid">
        {variants.map((variant) => {
          const flavour = variant.flavour ? flavours[variant.flavour] : undefined;
          return (
            <label className="fl-opt" key={variant.id}>
              <input
                type="radio"
                name="variant"
                value={variant.id}
                checked={variant.id === value}
                onChange={() => onChange(variant)}
              />
              <span
                className="fl-sw"
                style={{ background: flavour?.palette.body ?? "var(--oat)" }}
              />
              <span className="fl-txt">
                <b>{variant.title}</b>
                {flavour ? <small>{flavour.note}</small> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
