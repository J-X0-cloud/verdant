import { createMockStorefront } from "./mock-storefront";
import type { Storefront } from "./types";

/**
 * The storefront the app talks to. Pages and route handlers depend only on the
 * `Storefront` interface, so the catalog backend can be swapped in one place.
 */
export const storefront: Storefront = createMockStorefront();

export { CartError } from "./mock-storefront";
