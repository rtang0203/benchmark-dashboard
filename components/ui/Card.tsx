import type { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-sm p-4 ${className}`}>
      {children}
    </div>
  );
}
