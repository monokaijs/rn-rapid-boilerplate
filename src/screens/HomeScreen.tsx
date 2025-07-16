import {View} from 'react-native';
import AppButton from "@/components/ui/AppButton.tsx";
import {useTranslation} from "react-i18next";
import {AppText} from "@/components/ui";
import {useNavigation} from "@react-navigation/native";

export default function HomeScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View className={'flex-1 p-4 pt-safe-offset-4'}>
      <AppText variant={'heading1'}>
        HOME
      </AppText>
      <AppText className={'font-sans-regular text-neutrals100'}>
        WELCOME
      </AppText>
      <View className={'bg-neutrals900 p-4 rounded-xl mt-4'}>
        <AppText className={'text-neutrals100'}>
          APP_INTRODUCTION
        </AppText>
      </View>
      <View className={'mt-4 flex-row gap-2'}>
        <AppButton className={'flex-1'} variant={'primary'} onPress={() => navigation.navigate('Login')}>
          {t('LOGIN')}
        </AppButton>
        <AppButton className={'flex-1'} variant={'default'} onPress={() => navigation.navigate('Register')}>
          {t('REGISTER')}
        </AppButton>
      </View>
    </View>
  );
};
