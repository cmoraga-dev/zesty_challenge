import { useState } from 'react';

export function useDashboardFilters() {
  const [ticker, setTicker] = useState('');
  const [plFilter, setPlFilter] = useState('');
  const [sortType, setSortType] = useState('');
  const [plFilterMin, setPlFilterMin] = useState<number | ''>('');
  const [plFilterMax, setPlFilterMax] = useState<number | ''>('');

  return {
    ticker,
    setTicker,
    plFilter,
    setPlFilter,
    sortType,
    setSortType,
    plFilterMin,
    setPlFilterMin,
    plFilterMax,
    setPlFilterMax,
  };
}

export function useDashboardSelection() {
  const [selectedTicker, setSelectedTicker] = useState(null);
  return {
    selectedTicker,
    setSelectedTicker,
  };
}

export function useDashboardChartPeriod() {
  const [chartPeriod, setChartPeriod] = useState('today');
  return {
    chartPeriod,
    setChartPeriod,
  };
}
