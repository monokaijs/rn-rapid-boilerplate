import {View} from "react-native";
import {AppText} from "@/components/ui";
import {PairIconImg, usePairPrice} from "@/components/providers/OkxProvider.tsx";
import {cn} from "@/utils";
import {usePrevious} from "@/hooks/usePrevious.ts";
import {useEffect, useState} from "react";

export default function PairItem({pair}: { pair: `${string}-${string}` }) {
  const price = usePairPrice(pair);
  const lastPrice = usePrevious(price?.price ?? 0)!;
  const [status, setStatus] = useState<'up' | 'down' | 'flat'>('flat');

  useEffect(() => {
    const currentPrice = price?.price ?? 0;
    if (currentPrice > lastPrice) {
      setStatus('up');
    } else if (currentPrice < lastPrice) {
      setStatus('down');
    }
  }, [price?.price, lastPrice]);

  return <View className={'flex flex-row p-4 gap-2 bg-neutrals1000 rounded-full border border-neutrals900'}>
    <View className={''}>
      <PairIconImg pair={pair} size={40}/>
    </View>
    <View className={'flex-1'}>
      <AppText className={'text-lg font-sans-medium'}>
        {pair.replace('-', '/')}
      </AppText>
      <AppText className={cn(
        'text-sm font-sans-regular text-neutrals100',
        status === 'up' ? 'text-primary' : status == 'down' ? 'text-error' : ''
      )}>
        {price?.price.toFixed(2)}
      </AppText>
    </View>
  </View>;
}
