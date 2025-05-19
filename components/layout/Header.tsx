import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/data/site";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="site-head">
      <div className="wrap head-row">
        <MobileNav />
        <Logo />
        <MainNav />
        <div className="head-actions">
          <Link href="/search" className="ha-link hide-sm" aria-label="Search">
            <Icon name="search" />
          </Link>
          <a href={site.accountUrl} className="ha-link hide-sm">
            <Icon name="user" />
            <span>Account</span>
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
