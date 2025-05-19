import type { CSSProperties } from "react";

/** SVG text uses the same self-hosted faces as the page, via their CSS variables. */
export const serifText: CSSProperties = { fontFamily: "var(--serif)" };
export const sansText: CSSProperties = { fontFamily: "var(--sans)" };
