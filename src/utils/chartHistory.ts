// Utility to get chart history for a given period
export function getChartHistory(
  chartItem: { history: Array<{ close?: number } | number> } | undefined,
  chartPeriod: '1w' | '1m' | '2m'
) {
  if (!chartItem || !Array.isArray(chartItem.history)) return [];
  const periodMap = {
    '1w': 5,
    '1m': 21,
    '2m': 42,
  };
  const sliceCount = periodMap[chartPeriod] || 1;
  // Filter out invalid closes
  return chartItem.history
    .slice(-sliceCount)
    .map(h => (typeof h === 'object' && h !== null && 'close' in h ? h.close : h))
    .filter(v => typeof v === 'number' && !isNaN(v));
}
