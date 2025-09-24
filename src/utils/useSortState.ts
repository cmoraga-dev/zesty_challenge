// Utility hook for sort state in PortfolioFilters
import React from 'react';

type SortKey = 'plPercent' | 'weight' | 'price';
type SortDirection = 'asc' | 'desc';

interface UseSortStateProps {
  initialSort?: SortKey;
  onSort: (type: SortKey) => void;
  onDirectionChange?: (dir: SortDirection) => void;
}

export function useSortState({ initialSort = 'plPercent', onSort, onDirectionChange }: UseSortStateProps) {
  const [activeSort, setActiveSort] = React.useState<SortKey>(initialSort);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  React.useEffect(() => {
    if (!activeSort) {
      setActiveSort('plPercent');
      onSort('plPercent');
    }
  }, [activeSort, onSort]);

  const selectSort = (key: SortKey) => {
    if (activeSort === key) {
      setSortDirection(dir => {
        const newDir = dir === 'desc' ? 'asc' : 'desc';
        if (onDirectionChange) onDirectionChange(newDir);
        return newDir;
      });
    } else {
      setActiveSort(key);
      setSortDirection('desc');
      onSort(key);
      if (onDirectionChange) onDirectionChange('desc');
    }
  };

  return { activeSort, sortDirection, selectSort };
}
