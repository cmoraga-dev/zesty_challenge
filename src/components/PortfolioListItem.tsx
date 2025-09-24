import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { formatCurrency, getPLClassName } from '../utils/portfolioFormat';

type PortfolioItem = {
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  price?: number;
  pl?: number | null;
  plPercent?: number | null;
  weight?: number | null;
};

type PortfolioListItemProps = {
  item: PortfolioItem;
  isSelected: boolean;
  onPress: (item: PortfolioItem) => void;
};

export default function PortfolioListItem({ item, isSelected, onPress }: PortfolioListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.8}
      className={`flex-row justify-between items-center bg-white p-3 mb-2 rounded-lg ${isSelected ? 'border-2 border-primary' : ''}`}
    >
      <View>
        <Text className={`font-semibold ${isSelected ? 'text-primary' : 'text-accent'}`}>{item.ticker}</Text>
        <Text className="text-text-muted text-xs">{item.name}</Text>
        <Text className="text-xs text-text-muted">Qty: {item.quantity} | Avg: ${item.avgPrice}</Text>
      </View>
      <View className="items-end">
        <Text className="font-bold">{item.price ? formatCurrency(item.price) : '--'}</Text>
        <Text className={getPLClassName(item.pl ?? 0)}>
          {item.pl !== null && item.pl !== undefined ? `${item.pl >= 0 ? '+' : ''}${item.pl.toFixed(2)} (${item.plPercent?.toFixed(2) ?? '--'}%)` : '--'}
        </Text>
        <Text className="text-xs text-text-muted">{item.weight !== null && item.weight !== undefined ? (item.weight * 100).toFixed(1) + '%' : '--'} del portafolio</Text>
      </View>
    </TouchableOpacity>
  );
}
