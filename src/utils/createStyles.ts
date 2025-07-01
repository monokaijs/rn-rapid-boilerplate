import {StyleSheet} from "react-native";
import { useInsets } from "@/hooks/useInsets";
import {useMemo} from "react";
import {useColors} from "@/hooks/useColors.ts";
import {AppColors} from "@/config/colors.ts";

type Insets = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  styleCreator: (dependencies: { colors: typeof AppColors; insets: Insets }) => T
) {
  return function useCreatedStyles(): T {
    const colors = useColors();
    const insets = useInsets();
    return useMemo(() => StyleSheet.create(styleCreator({ colors, insets })), [colors, insets]);
  };
}
