
import { useMemo } from 'react';

type PortfolioPosition = {
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  [key: string]: any;
};

type LiveData = {
  ticker: string;
  price?: number;
  history?: any[];
  [key: string]: any;
};

type PortfolioItem = PortfolioPosition & {
  price: number | null;
  history: any[];
  value: number | null;
  invested: number;
  pl: number | null;
  plPercent: number | null;
  weight?: number | null;
};

function mergePortfolioWithLiveData(
  userPortfolio: PortfolioPosition[],
  wsData: LiveData[]
): PortfolioItem[] {
  return userPortfolio.map((pos) => {
    const live = wsData.find((d) => d.ticker === pos.ticker);
    const price = live?.price ?? null;
    const history = live?.history ?? [];
    const value = price ? price * pos.quantity : null;
    const invested = pos.avgPrice * pos.quantity;
    const pl = price ? (price - pos.avgPrice) * pos.quantity : null;
    const plPercent = price ? ((price - pos.avgPrice) / pos.avgPrice) * 100 : null;
    return {
      ...pos,
      name: pos.name, // Ensure name is always present
      price,
      history,
      value,
      invested,
      pl,
      plPercent,
    };
  });
}

function addWeights(items: PortfolioItem[], totalValue: number): PortfolioItem[] {
  return items.map((p) => ({
    ...p,
    weight: totalValue > 0 && p.value ? p.value / totalValue : null,
  }));
}

export function usePortfolioMetrics(
  userPortfolioMock: PortfolioPosition[],
  wsData: LiveData[]
) {
  // 1. Merge static and live data
  const mergedPortfolio = useMemo(
    () => mergePortfolioWithLiveData(userPortfolioMock, wsData),
    [userPortfolioMock, wsData]
  );

  // 2. Calculate total value
  const totalValue = useMemo(
    () => mergedPortfolio.reduce((acc, p) => acc + (p.value ?? 0), 0),
    [mergedPortfolio]
  );

  // 3. Add weights
  const items = useMemo(
    () => addWeights(mergedPortfolio, totalValue),
    [mergedPortfolio, totalValue]
  );

  return { mergedPortfolio, totalValue, items };
}
