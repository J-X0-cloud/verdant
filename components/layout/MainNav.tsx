"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/data/site";

/** Desktop nav; the fifth item (Ingredients) lives in the mobile menu only. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="main-nav" aria-label="Primary">
      {mainNav.slice(0, 4).map((item) => {
        const path = item.href.split("#")[0]!;
        const active = !item.href.includes("#") && pathname.startsWith(path);
        return (
          <Link key={item.label} href={item.href} className={active ? "on" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
