import { TextInput, TextInputProps } from "react-native";
import { useState } from "react";
import { cn } from "@/utils";

interface AppTextInputProps extends TextInputProps {
}

export default function AppTextInput(props: AppTextInputProps) {
  const [focused, setFocused] = useState(false);
  return <TextInput
    {...props}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    className={cn(
      'border border-neutrals800 rounded-lg px-4 py-2.5 text-base-white text-base font-sans-medium',
      focused && 'border border-primary',
      props.className,
    )}
  />
}
