import React from 'react';
import { View, Text } from 'react-native';


interface DashboardCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}


export default function DashboardCard({ label, value, valueClassName = "" }: DashboardCardProps) {

    return (
    <View className="bg-secondary rounded-lg p-4 mb-2">
      <Text className="text-accent text-xs mb-1">{label}</Text>
      <Text className={`text-lg font-bold ${valueClassName}`}>{value}</Text>
    </View>
  );
}
