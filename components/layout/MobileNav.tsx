"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/lib/data/site";

export function MobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const { totalQuantity } = useCart();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details className="mnav" ref={ref}>
      <summary aria-label="Open menu">
        <Icon name="menu" size={22} />
      </summary>
      <nav className="mnav-panel" aria-label="Mobile">
        {mainNav.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/cart">Cart ({totalQuantity})</Link>
      </nav>
    </details>
  );
}
