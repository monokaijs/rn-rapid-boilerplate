import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from '@/navigation/types';
import {MenuList} from "@/components/ui";
import Icon from "@/components/ui/Icon.tsx";
import {useTranslation} from "react-i18next";

type Props = RootStackScreenProps<'ComponentsDemo'>;

const ComponentsDemo: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const componentsList = [
    {
      name: 'Button',
      route: 'AppButtonDemo' as const,
      icon: () => <Icon
        name={'RectangleHorizontal'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: t('APP_TEXT'),
      route: 'AppTextDemo' as const,
      icon: () => <Icon
        name={'Type'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: t('AVATAR'),
      route: 'AvatarDemo' as const,
      icon: () => <Icon
        name={'User'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: t('BADGE'),
      route: 'BadgeDemo' as const,
      icon: () => <Icon
        name={'Award'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: t('CHECKBOX'),
      route: 'CheckboxDemo' as const,
      icon: () => <Icon
        name={'Check'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Chip',
      route: 'ChipDemo' as const,
      icon: () => <Icon
        name={'Tags'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'ProgressBar',
      route: 'ProgressBarDemo' as const,
      icon: () => <Icon
        name={'LoaderCircle'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Select',
      route: 'SelectDemo' as const,
      icon: () => <Icon
        name={'MousePointerClick'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: 'Slider',
      route: 'SliderDemo' as const,
      icon: () => <Icon
        name={'SlidersHorizontal'}
        className={"size-22 text-neutrals100"}
      />,
    },
    {
      name: t('SWITCH'),
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
            onPress: () => handleComponentPress(c.route),
          }))}
        />
      </View>
    </ScrollView>
  );
};

export default ComponentsDemo;
