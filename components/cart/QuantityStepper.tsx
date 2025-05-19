"use client";

import { Icon } from "@/components/ui/Icon";

interface QuantityStepperProps {
  value: number;
  onChange(value: number): void;
  max?: number;
}

export function QuantityStepper({ value, onChange, max = 12 }: QuantityStepperProps) {
  return (
    <div className="qty">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        <Icon name="minus" size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
