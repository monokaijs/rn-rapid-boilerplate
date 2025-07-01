import { Pressable, PressableProps, Text } from "react-native";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import {JSX, ReactNode} from "react";

interface AppButtonProps extends PressableProps {
  variant?: "default" | "primary";
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  textClassname?: string;
  children: ReactNode;
  icon?: JSX.Element;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center px-4 gap-2 whitespace-nowrap rounded-xl text-sm font-medium",
  {
    variants: {
      isMenu: {
        true: "w-full cursor-pointer justify-start"
      },
      variant: {
        default: "bg-neutrals800 text-white font-semibold shadow",
        primary: "bg-primary text-white font-semibold shadow"
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 px-3 text-xs",
        lg: "h-14 px-8",
        icon: "h-9 w-9"
      },
      disabled: {
        true: "bg-neutrals800"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const buttonTextVariants = cva("font-sans-medium", {
  variants: {
    variant: {
      default: "text-neutrals100",
      primary: "text-white"
    },
    size: {
      default: "text-regular",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-sm"
    },
    disabled: {
      true: "text-neutrals100"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export default function AppButton(props: AppButtonProps) {
  const { variant, size, className, disabled, onPress, ...rest } = props;
  return <Pressable
    className={cn(
      buttonVariants({ variant, size, className, disabled: disabled }),
      className
    )}
    disabled={disabled}
    onPress={onPress}
    {...rest}
  >
    {props.icon && props.icon}
    <Text className={cn(
      buttonTextVariants({ variant, disabled: disabled, size }),
      props.textClassname
    )}>
      {props.children}
    </Text>
  </Pressable>;
}
