import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppDispatch} from "@/store/hooks.ts";
import {useEffect} from "react";
import {setInsets} from "@/store/slices/appSlice.ts";

export default function InsetsHelper() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInsets(insets));
  }, [insets, dispatch]);
  return <></>
}
