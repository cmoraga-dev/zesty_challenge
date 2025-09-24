import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PortfolioChart from './PortfolioChart';
import { StyleSheet } from 'react-native';

interface PortfolioChartWithSelectorProps {
  history: number[];
  chartPeriod: string;
  setChartPeriod: (period: string) => void;
  selectedTicker?: string | null;
}

const PERIODS = [
  { key: '1w', label: '1S' },
  { key: '1m', label: '1M' },
  { key: '2m', label: '2M' },
];

export default function PortfolioChartWithSelector({ history, chartPeriod, setChartPeriod, selectedTicker }: PortfolioChartWithSelectorProps) {
  React.useEffect(() => {
    if (!chartPeriod) setChartPeriod('1w');
  }, [chartPeriod, setChartPeriod]);

  const noPeriodSelected = !PERIODS.some(p => p.key === chartPeriod);
  const noTickerSelected = !selectedTicker;

  const getPeriodButtonClass = (active: boolean) =>
    `px-3 py-1 rounded ${active ? 'bg-primary' : 'bg-secondary'}`;

  const getPeriodTextClass = (active: boolean) =>
    active ? 'text-white font-bold' : 'text-accent';

  return (
    <View>
      <View className="flex-row gap-2 mb-2">
        {PERIODS.map(({ key, label }) => {
          const isActive = chartPeriod === key;
          return (
            <TouchableOpacity
              key={key}
              className={getPeriodButtonClass(isActive)}
              onPress={() => setChartPeriod(key)}
            >
              <Text className={getPeriodTextClass(isActive)}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {noTickerSelected && (
        <View style={styles.skeleton} className="my-4 bg-white rounded p-2 border border-gray-200 justify-center items-center">
          <Text className="text-info text-center">Selecciona un ticker para ver el gráfico</Text>
        </View>
      )}
      {!noTickerSelected && noPeriodSelected && (
        <View style={styles.skeleton} className="my-4 bg-white rounded p-2 border border-gray-200 justify-center items-center">
          <Text className="text-info text-center">Sin periodo seleccionado</Text>
        </View>
      )}
      {!noTickerSelected && !noPeriodSelected && <PortfolioChart history={history} />}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    height: 120,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
