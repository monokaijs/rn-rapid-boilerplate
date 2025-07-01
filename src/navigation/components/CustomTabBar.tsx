import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors.ts';
import { Home, Menu } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  switch (name) {
    case 'Home':
      return <Home size={size} color={color} fill={color} />;
    case 'More':
      return <Menu size={size} color={color} fill={color} />;
    default:
      return <Home size={size} color={color} fill={color} />;
  }
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      className={'bg-background flex-row py-2 border-t border-neutrals900'}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconColor = isFocused
          ? colors.primaryPrimary
          : colors.neutralsNeutrals400;

        const labelColor = isFocused
          ? colors.primaryPrimary
          : colors.neutralsNeutrals400;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={.9}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              borderRadius: 12,
              marginHorizontal: 4,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
              }}
            >
              <TabIcon
                name={route.name}
                color={iconColor}
                size={24}
              />
            </View>

            <Text
              style={{
                color: labelColor,
                fontSize: 12,
                fontWeight: isFocused ? '600' : '400',
                textAlign: 'center',
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
