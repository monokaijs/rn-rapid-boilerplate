import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {toggleTheme} from '@/store/slices/appSlice';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.app);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View className='flex-1'>
      <View className="p-4">
        <View className='mb-4'>
          <Text className="section-title">Appearance</Text>
        </View>

        <TouchableOpacity
          className="flex-row justify-between items-center py-4 px-4 bg-neutrals800 rounded-lg mb-2"
          onPress={handleToggleTheme}
        >
          <Text className="text-base-white text-base font-sans-semibold">Theme</Text>
          <Text className="text-neutrals300 text-sm font-sans-regular">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
