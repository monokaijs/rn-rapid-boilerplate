import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from '@/navigation/types';
import {MenuList} from "@/components/ui";
import Icon from "@/components/ui/Icon.tsx";

type Props = RootStackScreenProps<'ComponentsDemo'>;

const ComponentsDemo: React.FC<Props> = () => {
  const navigation = useNavigation();

  // List of all UI components with their navigation routes
  const componentsList = [
    {
      name: 'Avatar',
      description: 'Display user or content avatars with text, image, or icon',
      route: 'AvatarDemo' as const,
      icon: () => <Icon
        name={'User'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Badge',
      description: 'Small status indicators with various styles',
      route: 'BadgeDemo' as const,
      icon: () => <Icon
        name={'Award'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Checkbox',
      description: 'Interactive checkboxes with animations',
      route: 'CheckboxDemo' as const,
      icon: () => <Icon
        name={'Check'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Chip',
      description: 'Interactive tags with selection states',
      route: 'ChipDemo' as const,
      icon: () => <Icon
        name={'Tags'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'ProgressBar',
      description: 'Animated progress indicators',
      route: 'ProgressBarDemo' as const,
      icon: () => <Icon
        name={'LoaderCircle'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Select',
      description: 'Dropdown selection with single and multiple modes',
      route: 'SelectDemo' as const,
      icon: () => <Icon
        name={'MousePointerClick'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Slider',
      description: 'Interactive sliders with gesture support',
      route: 'SliderDemo' as const,
      icon: () => <Icon
        name={'SlidersHorizontal'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Switch',
      description: 'Toggle switches with animations',
      route: 'SwitchDemo' as const,
      icon: () => <Icon
        name={'ToggleRight'}
        className={"size-22 text-neutrals100"}
      />,
    },
  ];

  const handleComponentPress = (route: string) => {
    navigation.navigate(route as any);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-2">UI Components</Text>
        <Text className="text-neutrals400 mb-6">
          Explore our collection of reusable UI components with interactive demos.
        </Text>

        <MenuList
          data={componentsList.map(c => ({
            icon: c.icon,
            title: c.name,
            description: c.description,
            onPress: () => handleComponentPress(c.route),
          }))}
        />
      </View>
    </ScrollView>
  );
};

export default ComponentsDemo;
