import { flavours } from "@/lib/data/flavours";
import type { FlavourId } from "@/lib/commerce/types";
import { sansText, serifText } from "./fonts";
import { SproutPaths } from "./Sprout";
import { useSvgId } from "./useSvgId";

interface PouchProps {
  flavour?: FlavourId;
  title?: string;
  caption?: string;
  className?: string;
}

const OUTLINE = "M44 30Q44 16 58 16H262Q276 16 276 30L282 358Q284 398 250 400H70Q36 398 38 358Z";

export function Pouch({
  flavour = "original",
  title = "Daily Greens",
  caption = "30 servings · 13.3 oz (378 g)",
  className = "art",
}: PouchProps) {
  const id = useSvgId("pouch");
  const f = flavours[flavour];
  const { body, deep, ink, accent } = f.palette;
  const pillWidth = f.name.length * 8.2 + 34;

  return (
    <svg
      className={className}
      viewBox="0 0 320 420"
      role="img"
      aria-label={`Verdant ${title} pouch, ${f.name}`}
    >
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.22} />
          <stop offset=".22" stopColor="#fff" stopOpacity={0.05} />
          <stop offset=".6" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.28} />
        </linearGradient>
        <linearGradient id={`${id}v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity={0.18} />
          <stop offset=".16" stopColor="#000" stopOpacity={0} />
          <stop offset=".86" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.22} />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <path d={OUTLINE} />
        </clipPath>
      </defs>
      <path d={OUTLINE} fill={body} />
      <g clipPath={`url(#${id}c)`}>
        <rect x="0" y="0" width="320" height="54" fill={deep} />
        <path d="M44 46H276" stroke={ink} strokeOpacity={0.35} strokeDasharray="3 5" />
        <circle cx="70" cy="33" r="5" fill={body} opacity={0.9} />
        <path d="M30 372Q160 350 290 372V420H30Z" fill={deep} opacity={0.55} />
        <g transform="translate(160 118)" fill={ink}>
          <g transform="translate(-13 -40) scale(1.1)" fill="none" style={{ color: ink }}>
            <SproutPaths />
          </g>
          <text y="30" textAnchor="middle" style={serifText} fontSize="56" letterSpacing="-1">
            verdant
          </text>
        </g>
        <text
          x="160"
          y="196"
          textAnchor="middle"
          fill={ink}
          style={sansText}
          fontSize="15"
          fontWeight={700}
          letterSpacing="3"
        >
          {title.toUpperCase()}
        </text>
        <path d="M104 214H216" stroke={ink} strokeOpacity={0.4} />
        <text
          x="160"
          y="236"
          textAnchor="middle"
          fill={ink}
          fillOpacity={0.82}
          style={sansText}
          fontSize="11.5"
          letterSpacing=".6"
        >
          Greens · Fruits · Roots · Minerals
        </text>
        <rect
          x={(160 - pillWidth / 2).toFixed(1)}
          y="274"
          width={pillWidth.toFixed(1)}
          height="30"
          rx="15"
          fill={accent}
        />
        <text
          x="160"
          y="293.5"
          textAnchor="middle"
          fill={deep}
          style={sansText}
          fontSize="11"
          fontWeight={700}
          letterSpacing="1.4"
        >
          {f.name.toUpperCase()}
        </text>
        <text
          x="160"
          y="352"
          textAnchor="middle"
          fill={ink}
          fillOpacity={0.75}
          style={sansText}
          fontSize="9.5"
          letterSpacing=".8"
        >
          {caption}
        </text>
        <rect width="320" height="420" fill={`url(#${id}s)`} />
        <rect width="320" height="420" fill={`url(#${id}v)`} />
        <path
          d="M92 60Q86 210 96 390"
          stroke="#fff"
          strokeOpacity={0.1}
          strokeWidth={10}
          fill="none"
        />
      </g>
    </svg>
  );
}
