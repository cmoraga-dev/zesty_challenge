
import React, { useEffect, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import PortfolioChartWithSelector from '../components/PortfolioChartWithSelector';
import { useWebSocket } from '../hooks/useWebSocket';
import { userPortfolioMock } from '../utils/userPortfolioMock';
import { usePortfolioMetrics } from '../hooks/usePortfolioMetrics';
import { usePortfolioStore } from '../store/usePortfolioStore';
import PortfolioFilters from '../components/PortfolioFilters';
import PortfolioListItem from '../components/PortfolioListItem';
import { useDashboardFilters, useDashboardSelection, useDashboardChartPeriod } from '../hooks/useDashboardState';
import { filterAndSortPortfolio } from '../utils/portfolioFilters';
import { getChartHistory } from '../utils/chartHistory';
import { getTotalPL, getSelectedPL } from '../utils/portfolioPL';
import { formatCurrency, getPLClassName } from '../utils/portfolioFormat';
import { getSafeSortType, getSafePlFilter, sanitizePortfolioItem, sanitizePL, getSafeChartPeriod } from '../utils/dashboardHelpers';



export default function Dashboard() {
  const { data: wsData, connected, error } = useWebSocket('ws://localhost:8099');
  const { setPortfolio } = usePortfolioStore();

  useEffect(() => {
    if (wsData.length > 0) {
      setPortfolio(wsData);
    } else {
      console.log('[Dashboard] wsData:', wsData);
    }
  }, [wsData, setPortfolio]);


  const { totalValue, items } = usePortfolioMetrics(userPortfolioMock, wsData);

  const { ticker, setTicker, sortType, setSortType, plFilterMin, setPlFilterMin, plFilterMax, setPlFilterMax } = useDashboardFilters();
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  const { selectedTicker, setSelectedTicker } = useDashboardSelection();
  const { chartPeriod, setChartPeriod } = useDashboardChartPeriod();


  const filteredItems = useMemo(() => {
    return filterAndSortPortfolio(items, {
      ticker,
      plFilterMin: getSafePlFilter(plFilterMin),
      plFilterMax: getSafePlFilter(plFilterMax),
      sortType: getSafeSortType(sortType),
      sortDirection,
    });
  }, [items, ticker, plFilterMin, plFilterMax, sortType, sortDirection]);


  type ChartPeriod = '1w' | '1m' | '2m';
  const chartItem = useMemo(() => {
    if (!selectedTicker) return undefined;
    return items.find((item: any) => item.ticker === selectedTicker) || undefined;
  }, [items, selectedTicker]);
  const safeChartPeriod: ChartPeriod = getSafeChartPeriod(chartPeriod);
  const chartHistoryRaw = getChartHistory(chartItem, safeChartPeriod);
  const chartHistory = Array.isArray(chartHistoryRaw) ? chartHistoryRaw.filter((v): v is number => typeof v === 'number' && !isNaN(v)) : [];

  // Profit/Loss calculations
  const totalPL = useMemo(() => getTotalPL(filteredItems.map(sanitizePL)), [filteredItems]);
  const selectedPL = useMemo(() => getSelectedPL(selectedTicker, items.map(sanitizePL), totalPL), [selectedTicker, items, totalPL]);

  const profitLossValueForDisplay = useMemo(() => {
    return {
      value: formatCurrency(selectedPL),
      className: getPLClassName(selectedPL),
    };
  }, [selectedPL]);

  const profitLossLabel = useMemo(() => {
    return selectedTicker ? `Profit Loss ${selectedTicker}` : 'Profit Loss Total';
  }, [selectedTicker]);

  const totalPortfolioValue = useMemo(() => formatCurrency(totalValue), [totalValue]);


  const handlePress = (item: any) => {
    const isSelected = selectedTicker === item.ticker;
    if (isSelected) {
      setSelectedTicker(null);
    } else {
      setSelectedTicker(item.ticker);
    }
  };

  return (
    <View className="flex-1 bg-bg">
      <Header />
      <FlatList
        className="p-4"
        data={filteredItems}
  keyExtractor={(_, idx) => String(idx)}
        ListHeaderComponent={
          <>
            {[
              {
                key: 'pl',
                label: profitLossLabel,
                value: profitLossValueForDisplay.value,
                valueClassName: profitLossValueForDisplay.className,
              },
              {
                key: 'totalValue',
                label: 'Valor total portafolio',
                value: totalPortfolioValue,
              },
            ].map(card => (
              <DashboardCard
                key={card.key}
                label={card.label}
                value={card.value}
                valueClassName={card.valueClassName}
              />
            ))}
            {error && <DashboardCard label="Error" value={error} />}
            {!connected && <DashboardCard label="Estado" value="Sin conexión WS (mock)" />}
            <PortfolioFilters
              ticker={ticker}
              setTicker={setTicker}
              plFilterMin={plFilterMin}
              setPlFilterMin={setPlFilterMin}
              plFilterMax={plFilterMax}
              setPlFilterMax={setPlFilterMax}
              onSort={setSortType}
              sortType={sortType as 'plPercent' | 'weight' | 'price'}
              sortDirection={sortDirection}
              onDirectionChange={setSortDirection}
            />
            <PortfolioChartWithSelector
              history={chartHistory}
              chartPeriod={chartPeriod}
              setChartPeriod={setChartPeriod}
              selectedTicker={selectedTicker}
            />
          </>
        }
        renderItem={({ item }) => (
          <PortfolioListItem
            item={sanitizePortfolioItem(item)}
            isSelected={selectedTicker === item.ticker}
            onPress={handlePress}
          />
        )}
        ListEmptyComponent={
          error ? (
            <Text className="text-center text-danger my-8">No se pudo cargar el portafolio. {error}</Text>
          ) : (
            <Text className="text-center text-text-muted my-8">Sin posiciones</Text>
          )
        }
      />
    </View>
  );
}
