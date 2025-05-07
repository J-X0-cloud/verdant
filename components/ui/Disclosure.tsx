import clsx from "clsx";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  open?: boolean;
  className?: string;
}

/** Native <details> with the plus/cross marker, so it works without JavaScript. */
export function Disclosure({ summary, children, open, className }: DisclosureProps) {
  return (
    <details className={clsx(className)} open={open}>
      <summary>
        {summary}
        <span className="pm">
          <Icon name="plus" size={18} />
        </span>
      </summary>
      {typeof children === "string" ? <p>{children}</p> : children}
    </details>
  );
}
