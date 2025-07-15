import React from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MainTabScreenProps} from "@/navigation/types";
import {useColors} from "@/hooks/useColors";
import {Settings} from "lucide-react-native";
import MenuList from "@/components/ui/MenuList.tsx";
import Icon from "@/components/ui/Icon.tsx";
import {Avatar} from "@/components/ui";

type Props = MainTabScreenProps<"More">;

const MoreScreen: React.FC<Props> = () => {
  const colors = useColors();
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleComponentsDemo = () => {
    navigation.navigate("ComponentsDemo");
  };

  return (
    <View className='flex-1 p-4 pt-safe-offset-4'>
      <Text className={"screen-title"}>More</Text>

      <View className={'bg-neutrals1000 flex flex-row p-4 rounded-3xl'}>
        <Avatar
          text={'John Doe'}
          size={'xl'}
        />
        <View className={'flex-1 justify-center ml-4'}>
          <Text className={'text-foreground font-sans-bold text-lg'}>
            John Doe
          </Text>
          <Text className={'text-neutrals500 font-sans-regular text-md'}>
            john@doe.com
          </Text>
        </View>
      </View>
      <View className={'py-4'}>
        <Text className={'section-title'}>App</Text>
      </View>
      <MenuList
        data={[
          {
            icon: () => <Icon
              name={'Settings'}
              className={"size-22 text-neutrals100"}
            />,
            title: "Settings",
            onPress: handleSettings
          },
          {
            icon: () => <Icon
              name={'Palette'}
              className={"size-22 text-neutrals100"}
            />,
            title: "Components Demo",
            onPress: handleComponentsDemo
          }
        ]}
      />
    </View>
  );
};

export default MoreScreen;
