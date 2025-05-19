import { serifText } from "./fonts";
import { useSvgId } from "./useSvgId";

export function Scoop({ className = "art" }: { className?: string }) {
  const id = useSvgId("scp");

  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      role="img"
      aria-label="Stainless steel measuring scoop"
    >
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F4F0" />
          <stop offset=".45" stopColor="#B9BBB4" />
          <stop offset=".7" stopColor="#E6E7E1" />
          <stop offset="1" stopColor="#8E918A" />
        </linearGradient>
        <radialGradient id={`${id}p`} cx=".45" cy=".4" r=".6">
          <stop offset="0" stopColor="#9DB45F" />
          <stop offset="1" stopColor="#5E7A32" />
        </radialGradient>
      </defs>
      <g transform="rotate(-32 150 150)">
        <rect x="150" y="138" width="150" height="22" rx="11" fill={`url(#${id}m)`} />
        <circle cx="284" cy="149" r="4.5" fill="#7D8079" />
        <circle cx="112" cy="149" r="62" fill={`url(#${id}m)`} />
        <circle cx="112" cy="149" r="52" fill="#6F7169" />
        <circle cx="112" cy="149" r="50" fill={`url(#${id}p)`} />
        <g fill="#C5D48E" opacity={0.55}>
          <circle cx="96" cy="136" r="2" />
          <circle cx="124" cy="160" r="1.6" />
          <circle cx="108" cy="170" r="1.4" />
          <circle cx="130" cy="132" r="1.8" />
          <circle cx="90" cy="158" r="1.3" />
        </g>
        <text x="232" y="153" textAnchor="middle" fill="#6F7169" style={serifText} fontSize="15">
          verdant
        </text>
      </g>
    </svg>
  );
}
