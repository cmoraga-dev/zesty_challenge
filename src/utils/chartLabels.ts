export function getDateLabels(history: number[]): string[] {
  const today = new Date();
  return history.map((_, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (history.length - 1 - idx));
    if (d.getDay() === 1) {
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      return `${day}-${month}`;
    }
    return '';
  });
}

export function getYAxisLabels(history: number[]): string[] {
  const min = Math.min(...history);
  const max = Math.max(...history);
  const mid = (min + max) / 2;
  const formatUSD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  return [formatUSD(max), formatUSD(mid), formatUSD(min)];
}
