import { flavours } from "@/lib/data/flavours";
import type { FlavourId } from "@/lib/commerce/types";
import { sansText, serifText } from "./fonts";
import { useSvgId } from "./useSvgId";

export function Canister({
  flavour = "original",
  className = "art",
}: {
  flavour?: FlavourId;
  className?: string;
}) {
  const id = useSvgId("can");
  const { body, deep, ink } = flavours[flavour].palette;

  return (
    <svg
      className={className}
      viewBox="0 0 220 300"
      role="img"
      aria-label="Verdant refill canister"
    >
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.22} />
          <stop offset=".3" stopColor="#fff" stopOpacity={0.02} />
          <stop offset=".75" stopColor="#000" stopOpacity={0.06} />
          <stop offset="1" stopColor="#000" stopOpacity={0.32} />
        </linearGradient>
      </defs>
      <rect x="24" y="14" width="172" height="46" rx="10" fill="#E9E1CE" />
      <rect x="24" y="48" width="172" height="12" fill="#D8CDB4" />
      <rect x="30" y="58" width="160" height="230" rx="14" fill={deep} />
      <rect x="30" y="108" width="160" height="126" fill={body} />
      <g transform="translate(110 160)" fill={ink}>
        <text textAnchor="middle" style={serifText} fontSize="40">
          verdant
        </text>
        <text
          y="30"
          textAnchor="middle"
          style={sansText}
          fontSize="9"
          fontWeight={700}
          letterSpacing="2.4"
          fillOpacity={0.85}
        >
          REFILL CANISTER
        </text>
      </g>
      <rect x="24" y="14" width="172" height="46" rx="10" fill={`url(#${id}s)`} />
      <rect x="30" y="58" width="160" height="230" rx="14" fill={`url(#${id}s)`} />
    </svg>
  );
}
