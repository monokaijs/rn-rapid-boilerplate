import {AppColors, AppColorsLight} from "../config/colors.ts";
import {useAppSelector} from "@/store/hooks.ts";

export function useColors() {
  const {theme} = useAppSelector(state => state.app);
  if (theme === 'light') return AppColorsLight;
  return AppColors;
}
