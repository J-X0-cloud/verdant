/** The Verdant sprout mark, drawn on a 24px grid in currentColor. */
export function SproutPaths() {
  return (
    <>
      <path d="M12 22V11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M12 12C12 7 8.5 4 3.5 4c0 5 3.5 8 8.5 8Z" fill="currentColor" />
      <path d="M12 10.5c0-4 2.8-6.5 7-6.5 0 4-2.8 6.5-7 6.5Z" fill="currentColor" opacity={0.72} />
    </>
  );
}

export function SproutMark({
  size = 22,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color }}
      aria-hidden="true"
    >
      <SproutPaths />
    </svg>
  );
}
