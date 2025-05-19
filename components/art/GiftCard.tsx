import { sansText, serifText } from "./fonts";
import { SproutPaths } from "./Sprout";
import { useSvgId } from "./useSvgId";

export function GiftCard({
  amount = 75,
  className = "art",
}: {
  amount?: number;
  className?: string;
}) {
  const id = useSvgId("gc");

  return (
    <svg
      className={className}
      viewBox="0 0 320 220"
      role="img"
      aria-label="Verdant digital gift card"
    >
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3E5A2C" />
          <stop offset="1" stopColor="#22301A" />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 160 110)">
        <rect x="20" y="20" width="280" height="176" rx="16" fill={`url(#${id}g)`} />
        <circle cx="268" cy="44" r="80" fill="#E7A33E" opacity={0.16} />
        <g transform="translate(40 44)" fill="none" style={{ color: "#E7A33E" }}>
          <SproutPaths />
        </g>
        <text x="40" y="112" fill="#F4EEDF" style={serifText} fontSize="46">
          verdant
        </text>
        <text
          x="42"
          y="170"
          fill="#F4EEDF"
          fillOpacity={0.8}
          style={sansText}
          fontSize="11"
          fontWeight={700}
          letterSpacing="2.2"
        >
          GIFT CARD
        </text>
        <text x="278" y="172" textAnchor="end" fill="#E7A33E" style={serifText} fontSize="34">
          ${amount}
        </text>
      </g>
    </svg>
  );
}
