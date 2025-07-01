import {useState} from 'react';
import {Text, View} from 'react-native';
import AppButton from "@/components/ui/AppButton.tsx";

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View className={'flex-1 p-4 pt-safe-offset-4'}>
      <Text className={'screen-title'}>
        Home
      </Text>
      <Text className={'font-sans-regular text-neutrals100'}>
        Welcome to the React Native Boilerplate!
      </Text>
      <View className={'flex-1 items-center justify-center'}>
        <AppButton variant={'primary'} onPress={() => setCount(count + 1)}>
          Count {count}
        </AppButton>
      </View>
    </View>
  );
};
