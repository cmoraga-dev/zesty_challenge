
import React, { useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

interface PositionListProps {
  items: Array<{
    id: string;
    ticker: string;
    name: string;
    price: number;
    quantity: number;
    pl: number;
    plPercent: number;
    weight: number;
    history: number[];
  }>;
  loading?: boolean;
}


const PositionList = React.memo(function PositionList({ items, loading }: PositionListProps) {
  const renderItem = useCallback(({ item }: { item: PositionListProps['items'][0] }) => (
    <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded-lg">
      <View>
        <Text className="text-accent font-semibold">{item.ticker}</Text>
        <Text className="text-text-muted text-xs">{item.name}</Text>
      </View>
      <View className="items-end">
        <Text className="font-bold">${item.price.toFixed(2)}</Text>
        <Text className={item.pl >= 0 ? 'text-success' : 'text-danger'}>
          {item.pl >= 0 ? '+' : ''}{item.pl} ({item.plPercent}%)
        </Text>
      </View>
    </View>
  ), []);

  if (loading) {
    return <ActivityIndicator className="my-8" size="large" color="#6D4AFF" />;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={<Text className="text-center text-text-muted my-8">Sin posiciones</Text>}
    />
  );
});

export default PositionList;
