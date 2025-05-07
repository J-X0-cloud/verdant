import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** "center" for centred intros, "row" for title-left / aside-right. */
  layout?: "center" | "row";
  aside?: ReactNode;
}

export function SectionHead({ eyebrow, title, children, layout, aside }: SectionHeadProps) {
  if (layout === "row") {
    return (
      <div className="sec-head row">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {aside ?? (children ? <p>{children}</p> : null)}
      </div>
    );
  }
  return (
    <div className={clsx("sec-head", layout === "center" && "center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
