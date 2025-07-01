import React from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MainTabScreenProps} from "@/navigation/types";
import {useColors} from "@/hooks/useColors";
import {Settings} from "lucide-react-native";
import MenuList from "@/components/ui/MenuList.tsx";
import Icon from "@/components/ui/Icon.tsx";

type Props = MainTabScreenProps<"More">;

const MoreScreen: React.FC<Props> = () => {
  const colors = useColors();
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View className='flex-1 p-4 pt-safe-offset-4'>
      <Text className={"screen-title"}>More</Text>

      <View className={'py-4'}>
        <Text className={'section-title'}>App</Text>
      </View>
      <MenuList
        data={[{
          icon: () => <Icon
            name={'Settings'}
            className={"size-22 text-neutrals100"}
          />,
          title: "Settings",
          onPress: handleSettings
        }]}
      />
    </View>
  );
};

export default MoreScreen;
