import React from 'react';

import { View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_TITLE, APP_AUTHOR } from '../constants/app';

export default function Header() {
  return (
    <SafeAreaView edges={["top"]} className="bg-primary">
      <View className="pt-4 px-4">
        <Text className="text-white text-xl font-bold">{APP_TITLE}</Text>
      </View>
      <View className="py-2 px-4">
        <Text className="text-white text-sm">{APP_AUTHOR}</Text>
      </View>
    </SafeAreaView>
  );
}
