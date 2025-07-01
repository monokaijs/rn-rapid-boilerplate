import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AppColors } from '@/config/colors';
import { getTextStyles } from '@/utils/getTextStyles';
import { StyleSheet } from 'react-native';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColors.primaryPrimary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.baseBackground,
  },
  text: {
    ...getTextStyles('mobileFeatureStandard'),
    color: AppColors.baseForeground,
    marginTop: 16,
  },
});

export default LoadingScreen;
