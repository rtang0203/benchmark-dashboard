import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-line text-ink-muted">
      {children}
    </span>
  );
}
