import React from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MenuList from "@/components/ui/MenuList.tsx";
import Icon from "@/components/ui/Icon.tsx";
import {AppText, Avatar} from "@/components/ui";


const MoreScreen = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleComponentsDemo = () => {
    navigation.navigate("ComponentsDemo");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View className='flex-1 p-4 pt-safe-offset-4'>
      <AppText variant={'heading1'}>
        MORE
      </AppText>

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
          },
          {
            icon: () => <Icon
              name={'LogIn'}
              className={"size-22 text-neutrals100"}
            />,
            title: "Login Demo",
            onPress: handleLogin
          },
          {
            icon: () => <Icon
              name={'UserPlus'}
              className={"size-22 text-neutrals100"}
            />,
            title: "Register Demo",
            onPress: handleRegister
          }
        ]}
      />
    </View>
  );
};

export default MoreScreen;
