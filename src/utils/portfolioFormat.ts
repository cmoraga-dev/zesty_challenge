// Utility for formatting currency and profit/loss display
export function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getPLClassName(pl: number) {
  if (pl > 0) return 'text-success';
  if (pl < 0) return 'text-danger';
  return '';
}
