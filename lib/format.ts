export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

export const formatPercent = (n: number, withSign = false) =>
  `${withSign && n > 0 ? "+" : ""}${n.toFixed(1)}%`;

export const formatRatio = (n: number) => `${n.toFixed(1)}x`;

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
