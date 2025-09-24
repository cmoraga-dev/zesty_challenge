import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useSortState } from '../utils/useSortState';
type SortKey = 'plPercent' | 'weight' | 'price';

interface PortfolioFiltersProps {
  ticker: string;
  setTicker: (v: string) => void;
  plFilterMin: number | '';
  setPlFilterMin: (v: number | '') => void;
  plFilterMax: number | '';
  setPlFilterMax: (v: number | '') => void;
  onSort: (type: 'plPercent' | 'weight' | 'price') => void;
  sortType?: 'plPercent' | 'weight' | 'price';
  sortDirection?: 'asc' | 'desc';
  onDirectionChange?: (dir: 'asc' | 'desc') => void;
}

export default function PortfolioFilters({ ticker, setTicker, plFilterMin, setPlFilterMin, plFilterMax, setPlFilterMax, onSort, sortType, sortDirection = 'desc', onDirectionChange }: PortfolioFiltersProps) {
  const { activeSort, selectSort } = useSortState({
    initialSort: sortType || 'plPercent',
    onSort,
    onDirectionChange,
  });

  const validPLFilters = React.useMemo(() => {
    if (plFilterMin === '' || plFilterMax === '') {
      return true;
    }
    if (typeof plFilterMin === 'number' && typeof plFilterMax === 'number') {
      return plFilterMin <= plFilterMax;
    }
    return false;
  }, [plFilterMin, plFilterMax]);

  return (
    <View className="mb-4">
      <View className="flex-row gap-2 mb-2 items-center">
        <TextInput
          className="flex-1 border border-gray-300 rounded px-2 py-1"
          placeholder="TICKER"
          value={ticker}
          autoCapitalize="characters"
          onChangeText={text => {
            const upper = text.toUpperCase().replace(/[^A-Z]/g, '');
            setTicker(upper);
          }}
        />
        <TextInput
          className="w-24 border border-gray-300 rounded px-2 py-1"
          placeholder="P&L min"
          value={plFilterMin === '' ? '' : String(plFilterMin)}
          onChangeText={text => {
            const num = text === '' ? '' : Number(text);
            if (num === '' || (!isNaN(num) && isFinite(num))) setPlFilterMin(num);
          }}
          keyboardType="numeric"
        />
        <TextInput
          className="w-24 border border-gray-300 rounded px-2 py-1"
          placeholder="P&L max"
          value={plFilterMax === '' ? '' : String(plFilterMax)}
          onChangeText={text => {
            const num = text === '' ? '' : Number(text);
            if (num === '' || (!isNaN(num) && isFinite(num))) setPlFilterMax(num);
          }}
          keyboardType="numeric"
        />
      </View>
      {!validPLFilters && (
        <Text className="text-danger text-xs mb-2">Valores inválidos para filtro Profit Loss</Text>
      )}
      <View className="flex-row gap-2 items-center">
        {[
          { key: 'plPercent', label: 'P&L %' },
          { key: 'weight', label: 'Peso' },
          { key: 'price', label: 'Precio' },
        ].map(({ key, label }) => {
          const isActive = activeSort === key;
          const arrow = isActive ? (sortDirection === 'desc' ? '↓' : '↑') : '';
          return (
            <TouchableOpacity
              key={key}
              className={`px-3 py-1 rounded ${isActive ? 'bg-primary' : 'bg-secondary'}`}
              onPress={() => selectSort(key as SortKey)}
            >
              <Text className={isActive ? 'text-white text-xs font-bold' : 'text-accent text-xs font-bold'}>
                {label} {arrow}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
