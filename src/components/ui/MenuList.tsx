import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import Icon from "@/components/ui/Icon.tsx";
import AppText from "@/components/ui/AppText.tsx";

interface MenuListItem {
  title: string;
  value?: string | React.ReactNode;
  icon: () => JSX.Element;
  onPress?: () => void;
}

interface MenuListProps {
  data: MenuListItem[];
}

export default function MenuList(props: MenuListProps) {
  return <View className={'flex flex-col gap-2'}>
    {props.data.map((item, index) => (
      <Pressable onPress={item.onPress} key={index} className={'flex flex-row gap-4 py-1 items-center'}>
        <View className={'bg-neutrals1000 w-16 h-16 rounded-2xl border border-neutrals900 flex items-center justify-center'}>
          <item.icon />
        </View>
        <View className={"flex-1"}>
          <Text className={'text-lg font-sans-regular text-foreground'}>
            {item.title}
          </Text>
        </View>
        <View className={"flex-row items-center"}>
          {item.value !== undefined && (typeof item.value === 'string' ? (
            <Text className={'text-sm font-sans-regular text-neutrals300'}>
              {item.value}
            </Text>
          ): item.value)}
          <Icon
            name={'ChevronRight'}
            className={'text-neutrals600 w-6'}
          />
        </View>
      </Pressable>
    ))}
  </View>
}
