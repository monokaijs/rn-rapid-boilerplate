import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface MenuListItem {
  title: string;
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
        <View className={'bg-neutrals900 w-16 h-16 rounded-full flex items-center justify-center'}>
          <item.icon />
        </View>
        <Text className={'text-lg font-sans-regular text-base-white flex-1'}>{item.title}</Text>
        <ChevronRight
          size={22}
          className={'text-neutral-600'}
        />
      </Pressable>
    ))}
  </View>
}
