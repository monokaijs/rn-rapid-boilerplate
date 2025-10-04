import {ActivityIndicator, Pressable, PressableProps, Text} from "react-native";
import {cn} from "@/utils";
import {cva} from "class-variance-authority";
import React, {JSX, ReactNode} from "react";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming,} from 'react-native-reanimated';
import {useColors} from "@/hooks/useColors.ts";

interface AppButtonProps extends PressableProps {
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline" | "link";
  disabled?: boolean;
  loading?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  textClassname?: string;
  children: ReactNode;
  icon?: JSX.Element;
}

const buttonVariants = cva(
  "flex-row items-center justify-center px-4 gap-2 rounded-xl text-sm font-medium",
  {
    variants: {
      isMenu: {
        true: "w-full cursor-pointer justify-start"
      },
      variant: {
        default: "bg-neutrals800 text-foreground font-semibold shadow",
        primary: "bg-primary text-primary-foreground font-semibold shadow",
        secondary: "bg-secondary text-secondary-foreground font-semibold shadow",
        ghost: "bg-transparent text-foreground font-semibold hover:bg-neutrals900",
        outline: "bg-transparent text-foreground font-semibold border border-neutrals700 hover:bg-neutrals900",
        link: "bg-transparent text-primary font-semibold underline"
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 px-3 text-xs",
        lg: "h-14 px-8",
        icon: "h-9 w-9"
      },
      disabled: {
        true: "opacity-50"
      },
      loading: {
        true: "opacity-80"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const buttonTextVariants = cva("font-sans-medium text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      outline: "text-foreground",
      link: "text-primary"
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-sm"
    },
    disabled: {
      true: "text-neutrals400",
    }
  },
  compoundVariants: [
    {
      variant: "primary",
      disabled: true,
      class: "text-primary-foreground/50"
    }
  ],
  defaultVariants: {
    variant: "default"
  }
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AppButton(props: AppButtonProps) {
  const {variant, size, className, disabled, loading, onPress, ...rest} = props;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const colors = useColors();

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primaryForeground;
      case 'ghost':
        return colors.foreground;
      case 'outline':
        return colors.foreground;
      case 'link':
        return colors.primary;
      default:
        return colors.foreground;
    }
  };

  const getIconSize = (size: AppButtonProps['size']): number => {
    switch (size) {
      case 'sm':
        return 12;
      case 'lg':
        return 16;
      case 'icon':
        return 18;
      default:
        return 14;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {damping: 15, stiffness: 300});
    if (variant === 'ghost' || variant === 'outline' || variant === 'link') {
      opacity.value = withTiming(0.7, {duration: 150});
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 300});
    opacity.value = withTiming(1, {duration: 150});
  };

  const handlePress = (event: any) => {
    if (loading || disabled) return;
    onPress?.(event);
  };

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn(
        buttonVariants({variant, size, disabled: isDisabled, loading}),
        className
      )}
      disabled={isDisabled}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' || variant === 'outline' || variant === 'link' ? '#e85a5a' : '#ffffff'}
        />
      )}
      {!loading && props.icon && React.cloneElement(props.icon as any, {
        size: getIconSize(size),
        color: getIconColor(),
      })}
      <Text className={cn(
        buttonTextVariants({variant, disabled: isDisabled, size}),
        props.textClassname
      )}>
        {props.children}
      </Text>
    </AnimatedPressable>
  );
}
