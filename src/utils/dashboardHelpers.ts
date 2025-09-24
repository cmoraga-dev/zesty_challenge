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
  // Ensure price is never null for PortfolioListItem
  return { ...item, price: item.price === null ? undefined : item.price };
}
