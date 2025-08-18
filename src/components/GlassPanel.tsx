"use client";

import type { PropsWithChildren, HTMLAttributes, ElementType } from "react";

type GlassPanelProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    as?: ElementType;
  }
>;

export default function GlassPanel({
  as: Tag = "div",
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    // Note: keep shadow and rounded consistent across the app
    <Tag className={cn("glass rounded-2xl", className)} {...props}>
      {children}
    </Tag>
  );
}

// Simple className join helper without bringing a utility lib
function cn(...values: Array<string | undefined | false | null>) {
  return values.filter(Boolean).join(" ");
}


