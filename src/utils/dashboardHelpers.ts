export function sanitizePL(item: any) {
  // Ensure pl is never null for PL calculations
  return { ...item, pl: item.pl === null ? undefined : item.pl };
}

export function getSafeChartPeriod(period: any): '1w' | '1m' | '2m' {
  return ['1w', '1m', '2m'].includes(period) ? period : '1w';
}
// Utility helpers for Dashboard logic (SOLID extraction)

export function getSafeSortType(sortType: any): 'plPercent' | 'weight' | 'price' | undefined {
  return ['plPercent', 'weight', 'price'].includes(sortType)
    ? (sortType as 'plPercent' | 'weight' | 'price')
    : undefined;
}

export function getSafePlFilter(value: string | number | undefined): number | undefined {
  if (value === '' || value === undefined) return undefined;
  if (typeof value === 'string') {
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  }
  return value;
}

export function sanitizePortfolioItem(item: any) {
  return { ...item, price: item.price === null ? undefined : item.price };
}
