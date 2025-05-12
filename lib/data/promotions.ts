/**
 * Codes accepted in the cart. Discounts are applied by the checkout; the cart
 * only validates the code and carries it through.
 */
export const promotions: Record<string, { description: string }> = {
  FIRSTDIBS: { description: "10% off your first one-time order" },
  GREENSFRIEND: { description: "Referral: a free 7-pack in your next box" },
};
