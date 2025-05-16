/**
 * Storefront domain types. Shapes follow headless-commerce conventions
 * (handles, variants, money objects, cart lines, selling plans) so the UI
 * never depends on a particular backend.
 */

export type CurrencyCode = "USD";

export interface Money {
  amount: number;
  currencyCode: CurrencyCode;
}

export interface StoreImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export type FlavourId = "original" | "mint" | "berry" | "reds" | "protein" | "minerals";

export interface Flavour {
  id: FlavourId;
  name: string;
  note: string;
  /** Packaging colours used by the SVG product art. */
  palette: { body: string; deep: string; ink: string; accent: string };
}

/** Packaging drawn in code: new SKUs need data, not photography. */
export type ArtSpec =
  | { type: "pouch"; title?: string; caption?: string; flavour?: FlavourId }
  | { type: "stick"; label?: string; flavour?: FlavourId }
  | { type: "canister"; flavour?: FlavourId }
  | { type: "shaker" }
  | { type: "scoop" }
  | { type: "giftcard"; amount?: number }
  | { type: "group"; layout: "duo" | "pair" | "pair-sm" | "kit" | "kit-sm"; items: ArtSpec[] };

export interface VariantPricing {
  oneTime: Money;
  /** Subscribe & Save price per delivery. Absent for one-time-only items. */
  subscription?: Money;
}

export interface ProductVariant {
  id: string;
  title: string;
  flavour?: FlavourId;
  sku: string;
  pricing: VariantPricing;
  available: boolean;
}

export type ProductCategory = "greens" | "pairs" | "accessories" | "bundles";

export interface IngredientGroup {
  name: string;
  grams: string;
  ingredients: string;
}

export interface Review {
  author: string;
  location: string;
  title: string;
  body: string;
}

export interface ReviewSummary {
  average: number;
  count: number;
  /** Share of reviews per star rating, 5 down to 1, in percent. */
  distribution?: [number, number, number, number, number];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  /** Short name used in cart lines and the sticky bar, e.g. "Daily Greens". */
  shortTitle: string;
  category: ProductCategory;
  blurb: string;
  description: string;
  badge?: string;
  servings?: number;
  /** "30 servings · 13.3 oz (378 g)" style line printed on the pack. */
  packSize?: string;
  art: ArtSpec;
  variants: ProductVariant[];
  /** Products that ship as one subscription (bundles) can't be bought once. */
  subscriptionOnly?: boolean;
  bundle?: { components: string[]; perks: string[] };
  howToTake?: string;
  ingredients?: { caption: string; groups: IngredientGroup[] };
  reviews: ReviewSummary;
  seo: { title: string; description: string };
}

export interface Collection {
  handle: string;
  title: string;
  description: string;
  categories: ProductCategory[];
  seo: { title: string; description: string };
}

export interface CollectionWithProducts extends Collection {
  products: Product[];
}

export type PurchaseOption =
  | { type: "one-time" }
  | { type: "subscription"; frequencyDays: FrequencyDays };

export type FrequencyDays = 30 | 45 | 60;

export interface CartLine {
  id: string;
  quantity: number;
  purchase: PurchaseOption;
  /** Promotional lines (the Starter Kit) are added by the cart, not the shopper. */
  isGift: boolean;
  merchandise: {
    variant: ProductVariant;
    product: Pick<
      Product,
      "id" | "handle" | "title" | "shortTitle" | "art" | "servings" | "category"
    >;
  };
  cost: {
    /** What the shopper pays for this line. */
    total: Money;
    /** One-time price for the same quantity, used to show savings. */
    compareAt: Money;
  };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  discountCodes: string[];
  checkoutUrl: string;
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
  purchase: PurchaseOption;
}

export interface CartLineUpdate {
  lineId: string;
  quantity?: number;
  purchase?: PurchaseOption;
}

export type SortKey = "featured" | "best-selling" | "price-asc" | "price-desc";

/** Everything the storefront UI needs from a commerce backend. */
export interface Storefront {
  getProduct(handle: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getCollection(handle: string): Promise<CollectionWithProducts | undefined>;
  getCollections(): Promise<Collection[]>;
  getBundles(): Promise<Product[]>;
  getRecommendations(handle: string, limit?: number): Promise<Product[]>;

  createCart(lines?: CartLineInput[]): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | undefined>;
  addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart>;
  updateCartLines(cartId: string, updates: CartLineUpdate[]): Promise<Cart>;
  removeCartLines(cartId: string, lineIds: string[]): Promise<Cart>;
  applyDiscountCode(cartId: string, code: string): Promise<Cart>;
}
