import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  products: Product[];
  link?: { href: string; label: string };
}

export function ProductRail({ eyebrow, title, products, link }: ProductRailProps) {
  return (
    <section className="sec sec-cream">
      <div className="wrap">
        <SectionHead
          layout="row"
          eyebrow={eyebrow}
          title={title}
          aside={
            link ? (
              <Link className="link-arrow" href={link.href}>
                {link.label} <Icon name="arrow" size={16} />
              </Link>
            ) : (
              <span />
            )
          }
        />
        <div className="pgrid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
