import {View} from 'react-native';
import AppButton from "@/components/ui/AppButton.tsx";
import {useTranslation} from "react-i18next";
import {AppText} from "@/components/ui";

export default function HomeScreen() {
  const {t} = useTranslation();

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
        <AppButton className={'flex-1'} variant={'primary'}>
          {t('LOGIN')}
        </AppButton>
        <AppButton className={'flex-1'} variant={'default'}>
          {t('REGISTER')}
        </AppButton>
      </View>
    </View>
  );
};
