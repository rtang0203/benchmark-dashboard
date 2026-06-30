import { ArrowUp, ArrowDown } from "@/components/ui/icons";
import { formatPercent } from "@/lib/format";

export default function Delta({ value }: { value: number }) {
  const color = value >= 0 ? "text-pos" : "text-neg";
  const Arrow = value >= 0 ? ArrowUp : ArrowDown;
  return (
    <div className={`mt-1 flex items-center gap-1 text-xs font-mono tabular-nums ${color}`}>
      <Arrow className="h-3 w-3" />
      <span>{formatPercent(value, true)}</span>
      <span className="text-ink-faint">vs last week</span>
    </div>
  );
}
