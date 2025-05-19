import { flavours } from "@/lib/data/flavours";
import type { FlavourId } from "@/lib/commerce/types";
import { sansText, serifText } from "./fonts";
import { useSvgId } from "./useSvgId";

interface StickProps {
  flavour?: FlavourId;
  label?: string;
  className?: string;
}

// Crimped (zig-zag) seals at the top and bottom of the stick.
const TOP_SEAL = Array.from({ length: 9 }, (_, i) => `L${i * 8 + 4} 10L${i * 8 + 8} 16`).join("");
const BOTTOM_SEAL = Array.from(
  { length: 9 },
  (_, i) => `L${72 - i * 8 - 4} 350L${72 - i * 8 - 8} 344`,
).join("");
const OUTLINE = `M0 16${TOP_SEAL}V344${BOTTOM_SEAL}Z`;

export function Stick({
  flavour = "original",
  label = "Daily Greens",
  className = "art",
}: StickProps) {
  const id = useSvgId("stick");
  const f = flavours[flavour];
  const { body, deep, ink, accent } = f.palette;

  return (
    <svg
      className={className}
      viewBox="0 0 80 360"
      role="img"
      aria-label={`Verdant travel stick, ${f.name}`}
    >
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.2} />
          <stop offset=".35" stopColor="#fff" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.3} />
        </linearGradient>
      </defs>
      <g transform="translate(4 0)">
        <path d={OUTLINE} fill={body} />
        <rect y="16" width="72" height="30" fill={deep} />
        <rect y="314" width="72" height="30" fill={deep} />
        <g transform="translate(44 180) rotate(-90)" fill={ink}>
          <text x="0" y="0" textAnchor="middle" style={serifText} fontSize="34">
            verdant
          </text>
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            style={sansText}
            fontSize="8"
            fontWeight={700}
            letterSpacing="2"
            fillOpacity={0.85}
          >
            {`${label.toUpperCase()} · ${f.name.toUpperCase()}`}
          </text>
        </g>
        <rect x="46" y="92" width="14" height="14" rx="7" fill={accent} />
        <path d={OUTLINE} fill={`url(#${id}s)`} />
      </g>
    </svg>
  );
}
