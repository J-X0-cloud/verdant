import { randomUUID } from "node:crypto";
import { collections, merchandisedRails } from "@/lib/data/collections";
import { bundles, products, starterKit } from "@/lib/data/products";
import { promotions } from "@/lib/data/promotions";
import { STARTER_KIT, hasSubscription, unitPrice, usd } from "@/lib/subscriptions";
import type {
  Cart,
  CartLine,
  CartLineInput,
  CartLineUpdate,
  Collection,
  CollectionWithProducts,
  Product,
  PurchaseOption,
  Storefront,
} from "./types";

const MAX_QUANTITY = 12;
const catalog = [...products, ...bundles, starterKit];

interface StoredLine {
  id: string;
  variantId: string;
  quantity: number;
  purchase: PurchaseOption;
}

interface StoredCart {
  id: string;
  lines: StoredLine[];
  discountCodes: string[];
}

/** Pinned to globalThis so dev-server hot reloads keep carts alive. */
const store = globalThis as typeof globalThis & { __verdantCarts?: Map<string, StoredCart> };
const carts = (store.__verdantCarts ??= new Map<string, StoredCart>());

export class CartError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 404 | 409 = 400,
  ) {
    super(message);
    this.name = "CartError";
  }
}

function findByVariant(variantId: string) {
  for (const product of catalog) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

function lineId(variantId: string, purchase: PurchaseOption): string {
  return purchase.type === "subscription"
    ? `line_${variantId}_sub${purchase.frequencyDays}`
    : `line_${variantId}_once`;
}

function validatePurchase(product: Product, purchase: PurchaseOption) {
  const subscribable = product.variants.some((v) => v.pricing.subscription);
  if (purchase.type === "subscription" && !subscribable) {
    throw new CartError(`${product.title} can't be added as a subscription`, 409);
  }
  if (purchase.type === "one-time" && product.subscriptionOnly) {
    throw new CartError(`${product.title} is only available as a subscription`, 409);
  }
}

/** The Starter Kit rides along, free, whenever the cart contains a subscription. */
function syncStarterKit(cart: StoredCart) {
  const paid = cart.lines.filter((line) => line.variantId !== STARTER_KIT.variantId);
  cart.lines = hasSubscription(paid)
    ? [
        ...paid,
        {
          id: "line_starter_kit",
          variantId: STARTER_KIT.variantId,
          quantity: 1,
          purchase: { type: "one-time" },
        },
      ]
    : paid;
}

function mergeLine(cart: StoredCart, next: StoredLine) {
  const existing = cart.lines.find((line) => line.id === next.id);
  if (existing) {
    existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + next.quantity);
  } else {
    cart.lines.push({ ...next, quantity: Math.min(MAX_QUANTITY, next.quantity) });
  }
}

function checkoutUrl(cartId: string): string {
  const base = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://checkout.verdant.com/c";
  return `${base}?cart=${encodeURIComponent(cartId)}`;
}

function hydrate(stored: StoredCart): Cart {
  const lines: CartLine[] = stored.lines.flatMap((line) => {
    const found = findByVariant(line.variantId);
    if (!found) return [];
    const { product, variant } = found;
    const isGift = variant.id === STARTER_KIT.variantId;
    const unit = isGift ? 0 : unitPrice(variant.pricing, line.purchase).amount;
    return [
      {
        id: line.id,
        quantity: line.quantity,
        purchase: line.purchase,
        isGift,
        merchandise: {
          variant,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            shortTitle: product.shortTitle,
            art: product.art,
            servings: product.servings,
            category: product.category,
          },
        },
        cost: {
          total: usd(unit * line.quantity),
          compareAt: usd(variant.pricing.oneTime.amount * line.quantity),
        },
      },
    ];
  });

  return {
    id: stored.id,
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    discountCodes: stored.discountCodes,
    checkoutUrl: checkoutUrl(stored.id),
  };
}

function requireCart(cartId: string): StoredCart {
  const cart = carts.get(cartId);
  if (!cart) throw new CartError("Cart not found", 404);
  return cart;
}

function addLines(cart: StoredCart, inputs: CartLineInput[]) {
  for (const input of inputs) {
    const found = findByVariant(input.variantId);
    if (!found || found.variant.id === STARTER_KIT.variantId) {
      throw new CartError(`Unknown product ${input.variantId}`, 404);
    }
    if (!found.variant.available)
      throw new CartError(`${found.product.title} is out of stock`, 409);
    validatePurchase(found.product, input.purchase);
    mergeLine(cart, {
      id: lineId(input.variantId, input.purchase),
      variantId: input.variantId,
      quantity: input.quantity,
      purchase: input.purchase,
    });
  }
  syncStarterKit(cart);
}

const toCollection = ({ handle, title, description, categories, seo }: Collection): Collection => ({
  handle,
  title,
  description,
  categories,
  seo,
});

export function createMockStorefront(): Storefront {
  return {
    async getProducts() {
      return products;
    },

    async getProduct(handle) {
      return [...products, ...bundles].find((product) => product.handle === handle);
    },

    async getCollections() {
      return collections.map(toCollection);
    },

    async getCollection(handle): Promise<CollectionWithProducts | undefined> {
      const collection = collections.find((c) => c.handle === handle);
      if (!collection) return undefined;
      return {
        ...toCollection(collection),
        products: products.filter((product) => collection.categories.includes(product.category)),
      };
    },

    async getBundles() {
      return bundles;
    },

    async getRecommendations(handle, limit = 4) {
      const rail = merchandisedRails[handle];
      const source = products.find((p) => p.handle === handle);
      const picks = rail
        ? rail.flatMap((h) => products.filter((p) => p.handle === h))
        : products.filter((p) => p.handle !== handle && p.category !== source?.category);
      return picks.slice(0, limit);
    },

    async createCart(lines = []) {
      const cart: StoredCart = { id: `cart_${randomUUID()}`, lines: [], discountCodes: [] };
      addLines(cart, lines);
      carts.set(cart.id, cart);
      return hydrate(cart);
    },

    async getCart(cartId) {
      const cart = carts.get(cartId);
      return cart ? hydrate(cart) : undefined;
    },

    async addCartLines(cartId, lines) {
      const cart = requireCart(cartId);
      addLines(cart, lines);
      return hydrate(cart);
    },

    async updateCartLines(cartId, updates: CartLineUpdate[]) {
      const cart = requireCart(cartId);
      for (const update of updates) {
        const line = cart.lines.find((l) => l.id === update.lineId);
        if (!line || line.variantId === STARTER_KIT.variantId)
          throw new CartError("Line not found", 404);

        if (update.purchase) {
          const found = findByVariant(line.variantId)!;
          validatePurchase(found.product, update.purchase);
          // Changing the plan changes the line's identity; fold it into any matching line.
          cart.lines = cart.lines.filter((l) => l !== line);
          mergeLine(cart, {
            ...line,
            id: lineId(line.variantId, update.purchase),
            purchase: update.purchase,
          });
        } else if (update.quantity !== undefined) {
          line.quantity = Math.min(MAX_QUANTITY, update.quantity);
        }
      }
      cart.lines = cart.lines.filter((line) => line.quantity > 0);
      syncStarterKit(cart);
      return hydrate(cart);
    },

    async removeCartLines(cartId, lineIds) {
      const cart = requireCart(cartId);
      cart.lines = cart.lines.filter((line) => !lineIds.includes(line.id));
      syncStarterKit(cart);
      return hydrate(cart);
    },

    async applyDiscountCode(cartId, code) {
      const cart = requireCart(cartId);
      const normalized = code.trim().toUpperCase();
      if (!(normalized in promotions)) throw new CartError("That code isn’t valid or has expired.");
      cart.discountCodes = [normalized];
      return hydrate(cart);
    },
  };
}
