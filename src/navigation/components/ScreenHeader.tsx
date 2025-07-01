import {useColors} from "@/hooks";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft} from "lucide-react-native";
import React from "react";

export default function CustomScreenHeader({navigation, route, options, back}: any) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      className={'bg-base-black px-4 py-3 pt-safe-offset-3 flex-row items-center border-b border-neutrals1000'}
    >
      {back && (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{marginRight: 12}}
        >
          <ChevronLeft size={24} color={colors.baseBaseWhite}/>
        </TouchableOpacity>
      )}
      <Text className={'text-base-white text-lg font-sans-semibold'}>
        {options.title || route.name}
      </Text>
    </View>
  );
}
