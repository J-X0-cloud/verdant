import { sansText } from "./fonts";
import { useSvgId } from "./useSvgId";

const BOTTLE = "M22 70Q22 60 32 60H108Q118 60 118 70V308Q118 322 104 322H36Q22 322 22 308Z";

export function Shaker({
  liquid = "#6F8B3A",
  className = "art",
}: {
  liquid?: string;
  className?: string;
}) {
  const id = useSvgId("shk");

  return (
    <svg className={className} viewBox="0 0 140 330" role="img" aria-label="Glass shaker bottle">
      <defs>
        <linearGradient id={`${id}g`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.55} />
          <stop offset=".25" stopColor="#fff" stopOpacity={0.12} />
          <stop offset=".8" stopColor="#fff" stopOpacity={0.05} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity={0.92} />
          <stop offset="1" stopColor="#2E4220" />
        </linearGradient>
      </defs>
      <rect x="30" y="8" width="80" height="54" rx="10" fill="#23291C" />
      <rect x="36" y="16" width="16" height="38" rx="4" fill="#fff" opacity={0.1} />
      <path d={BOTTLE} fill="#E8EFE0" fillOpacity={0.45} stroke="#fff" strokeOpacity={0.6} />
      <path d="M24 132H116V308Q116 320 104 320H36Q24 320 24 308Z" fill={`url(#${id}l)`} />
      <ellipse cx="70" cy="132" rx="46" ry="5" fill="#9DB45F" opacity={0.7} />
      <path d={BOTTLE} fill={`url(#${id}g)`} />
      <g fill="#fff" fillOpacity={0.5} style={sansText} fontSize="7">
        <path d="M98 180h12M98 220h12M98 260h12" stroke="#fff" strokeOpacity={0.6} />
        <text x="84" y="183">
          16oz
        </text>
        <text x="84" y="223">
          12oz
        </text>
        <text x="86" y="263">
          8oz
        </text>
      </g>
    </svg>
  );
}
