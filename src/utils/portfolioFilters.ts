// Utility for filtering and sorting portfolio items
type PortfolioItem = {
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  price?: number | null;
  pl?: number | null;
  plPercent?: number | null;
  weight?: number | null;
  history?: Array<number | { close?: number }>;
};

type PortfolioFilterOptions = {
  ticker?: string;
  plFilterMin?: number;
  plFilterMax?: number;
  sortType?: 'plPercent' | 'weight' | 'price';
  sortDirection?: 'asc' | 'desc';
};


function filterByTicker(items: PortfolioItem[], ticker?: string): PortfolioItem[] {
  if (!ticker) return items;
  return items.filter((item) => item.ticker.toLowerCase().includes(ticker.toLowerCase()));
}

function filterByPLRange(items: PortfolioItem[], min?: number, max?: number): PortfolioItem[] {
  const minValid = typeof min === 'number' && !isNaN(min);
  const maxValid = typeof max === 'number' && !isNaN(max);
  if (minValid && maxValid) {
    return items.filter((item) => {
      const pl = item.pl ?? 0;
      return pl >= min && pl <= max;
    });
  } else if (minValid) {
    return items.filter((item) => (item.pl ?? 0) >= min);
  } else if (maxValid) {
    return items.filter((item) => (item.pl ?? 0) <= max);
  }
  return items;
}

function sortPortfolio(
  items: PortfolioItem[],
  sortType?: 'plPercent' | 'weight' | 'price',
  sortDirection: 'asc' | 'desc' = 'desc'
): PortfolioItem[] {
  if (!sortType) return items;
  let sorted = [...items];
  const dir = sortDirection === 'asc' ? 1 : -1;
  if (sortType === 'plPercent') {
    sorted.sort((a, b) => dir * ((a.plPercent ?? 0) - (b.plPercent ?? 0)));
  } else if (sortType === 'weight') {
    sorted.sort((a, b) => dir * ((a.weight ?? 0) - (b.weight ?? 0)));
  } else if (sortType === 'price') {
    sorted.sort((a, b) => dir * ((a.price ?? 0) - (b.price ?? 0)));
  }
  return sorted;
}

export function filterAndSortPortfolio(
  items: PortfolioItem[],
  { ticker, plFilterMin, plFilterMax, sortType, sortDirection }: PortfolioFilterOptions
): PortfolioItem[] {
  let result = filterByTicker(items, ticker);
  result = filterByPLRange(result, plFilterMin, plFilterMax);
  result = sortPortfolio(result, sortType, sortDirection);
  return result;
}
