import Link from "next/link";
import { footerNav, legalNav, site } from "@/lib/data/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

function FooterLink({ href, label }: { href: string; label: string }) {
  return /^(https?:|mailto:)/.test(href) ? (
    <a href={href}>{label}</a>
  ) : (
    <Link href={href}>{label}</Link>
  );
}

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-top">
        <div className="foot-brand">
          <Logo large />
          <p>{site.tagline}</p>
          <NewsletterForm />
        </div>
        {footerNav.map((column) => (
          <div className="fcol" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>
        ))}
      </div>
      <div className="wrap foot-legal">
        <p className="disclaimer">{site.disclaimer}</p>
        <div className="legal-row">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          {legalNav.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
