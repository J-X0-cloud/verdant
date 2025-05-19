import { productFlavours } from "@/lib/commerce/catalog";
import type { Product } from "@/lib/commerce/types";

export function FlavourDots({ product }: { product: Product }) {
  const flavours = productFlavours(product);
  if (flavours.length === 0) return <div className="dots" />;

  return (
    <div className="dots">
      {flavours.map((flavour) => (
        <span
          key={flavour.id}
          className="dot"
          style={{ background: flavour.palette.body }}
          title={flavour.name}
        />
      ))}
      <span className="dots-label">
        {flavours.length > 1 ? `${flavours.length} flavors` : flavours[0]!.name}
      </span>
    </div>
  );
}
