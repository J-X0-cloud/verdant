import clsx from "clsx";
import Link from "next/link";
import { shopChips } from "@/lib/data/collections";

export function ShopChips({ active }: { active: string }) {
  return (
    <nav className="chips" aria-label="Product categories">
      {shopChips.map((chip) => (
        <Link
          key={chip.handle}
          href={chip.href}
          className={clsx("chip", chip.handle === active && "on")}
          aria-current={chip.handle === active ? "page" : undefined}
        >
          {chip.label}
        </Link>
      ))}
    </nav>
  );
}
