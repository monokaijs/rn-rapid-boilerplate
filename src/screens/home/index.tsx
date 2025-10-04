import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import {useTranslation} from "react-i18next";
import {AppButton, AppText, Avatar, Icon} from "@/components/ui";
import HomeStroke from "@/components/other/HomeStroke.tsx";
import {ArrowRightLeftIcon, WalletMinimalIcon} from "lucide-react-native";
import {OkxPriceProvider} from "@/components/providers/OkxProvider.tsx";
import PairItem from "@/screens/home/PairItem.tsx";
import {TopPairs} from "@/screens/home/config.ts";
import {useToast} from "@/components/ui/ToastProvider.tsx";

export default function HomeScreen() {
  const {t} = useTranslation();
  const screen = Dimensions.get('screen');
  const {showSuccess} = useToast();

  const handleSwap = () => {
    showSuccess(t('SWAP_SUCCESS'), t('SWAP_DETAILS', {amount: ~~(Math.random() * 1000)}), {
      position: 'bottom',
    });
  };

  return (
    <OkxPriceProvider>
      <ScrollView className={'flex-1'}>
        <View className={'absolute left-0 top-0 right-0'}>
          <HomeStroke
            width={screen.width}
            height={screen.width}
            style={{opacity: .7}}
          />
        </View>
        <View className={"p-8 pt-safe-offset-4 flex-row justify-between"}>
          <Avatar text={'John Doe'} size={'lg'}/>

          <View className={'flex flex-row gap-2'}>
            <Pressable
              className={'bg-background border border-neutrals900 w-16 h-16 rounded-full justify-center items-center'}
            >
              <Icon name={'Search'} className={'text-foreground w-6 h-6'}/>
            </Pressable>
            <Pressable
              className={'bg-background border border-neutrals900 w-16 h-16 rounded-full justify-center items-center'}
            >
              <Icon name={'Bell'} className={'text-foreground w-6 h-6'}/>
            </Pressable>
          </View>
        </View>
        <View className={'px-8 mt-8'}>
          <View className={'gap-4'}>
            <AppText>
              {t('NET_WORTH')}
            </AppText>
            <AppText className={'text-6xl font-sans-bold'}>
              $1,000,000
            </AppText>
            <View className={'flex flex-row items-center'}>
              <Icon name={'ArrowUpRight'} className={'text-primary w-6'}/>
              <AppText className={'text-primary font-sans-bold'}>
                +10%
              </AppText>
              <AppText className={'text-neutrals100 ml-1'}>
                since yesterday
              </AppText>
            </View>
          </View>
        </View>
        <View className={'p-8 flex-row gap-4'}>
          <AppButton
            variant={'primary'}
            className={'flex-1 rounded-full'}
            icon={<WalletMinimalIcon/>}
          >
            {t('TOP_UP')}
          </AppButton>
          <AppButton
            className={'flex-1 rounded-full'}
            icon={<ArrowRightLeftIcon/>}
            onPress={handleSwap}
          >
            {t('SWAP')}
          </AppButton>
        </View>
        <View className={'px-8'}>
          <AppText className={'text-foreground text-xl font-sans-bold'}>
            {t('TOP_PAIRS')}
          </AppText>
        </View>
        <View className={'gap-4 p-4'}>
          {TopPairs.map(pair => (
            <PairItem key={pair} pair={pair}/>
          ))}
        </View>
      </ScrollView>
    </OkxPriceProvider>
  );
};
