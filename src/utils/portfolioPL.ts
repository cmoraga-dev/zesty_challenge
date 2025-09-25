export function getTotalPL(items: { ticker: string; pl?: number }[]) {
  return items.reduce((acc, p) => acc + (p.pl ?? 0), 0);
}

export function getSelectedPL(
  selectedTicker: string | null,
  items: { ticker: string; pl?: number }[],
  totalPL: number
) {
  if (!selectedTicker) return totalPL;
  const found = items.find((item) => item.ticker === selectedTicker);
  return found?.pl ?? 0;
}
