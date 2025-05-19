import type { ArtSpec } from "@/lib/commerce/types";
import { Canister } from "./Canister";
import { GiftCard } from "./GiftCard";
import { Pouch } from "./Pouch";
import { Scoop } from "./Scoop";
import { Shaker } from "./Shaker";
import { Stick } from "./Stick";

const groupClass = {
  duo: "duo",
  pair: "pair",
  "pair-sm": "pair pair-sm",
  kit: "kit",
  "kit-sm": "kit kit-sm",
} as const;

/** Renders catalog art specs as inline SVG packaging. */
export function ProductArt({ art }: { art: ArtSpec }) {
  switch (art.type) {
    case "pouch":
      return <Pouch flavour={art.flavour} title={art.title} caption={art.caption} />;
    case "stick":
      return <Stick flavour={art.flavour} label={art.label} />;
    case "canister":
      return <Canister flavour={art.flavour} />;
    case "shaker":
      return <Shaker />;
    case "scoop":
      return <Scoop />;
    case "giftcard":
      return <GiftCard amount={art.amount} />;
    case "group":
      return (
        <div className={groupClass[art.layout]}>
          {art.items.map((item, index) => (
            <ProductArt key={index} art={item} />
          ))}
        </div>
      );
  }
}
