import {useAppSelector} from "@/store/hooks.ts";

export const useInsets = () => {
  const {insets} = useAppSelector(state => state.app);
  return insets;
};
