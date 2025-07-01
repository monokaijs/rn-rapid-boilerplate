import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {AppColors} from '@/config/colors';

export default function LoadingScreen() {
  return (
    <View className={'flex-1 bg-background items-center justify-center'}>
      <ActivityIndicator size="large" color={AppColors.primary}/>
      <Text className={'text-foreground font-sans-regular mt-4'}>Loading...</Text>
    </View>
  );
}
