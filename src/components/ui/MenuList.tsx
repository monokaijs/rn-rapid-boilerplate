import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import Icon from "@/components/ui/Icon.tsx";

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
        <Text className={'text-lg font-sans-regular text-foreground flex-1'}>{item.title}</Text>
        <Icon
          name={'ChevronRight'}
          className={'text-neutrals600'}
        />
      </Pressable>
    ))}
  </View>
}
