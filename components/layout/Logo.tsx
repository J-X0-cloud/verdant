import clsx from "clsx";
import Link from "next/link";
import { SproutMark } from "@/components/art/Sprout";

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <Link className={clsx("logo", large && "logo-lg")} href="/" aria-label="Verdant home">
      <SproutMark size={large ? 30 : 24} />
      <span>verdant</span>
    </Link>
  );
}
