import React, {useEffect, useState} from 'react';
import {Pressable, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {cn} from '@/utils';
import {cva} from 'class-variance-authority';
import {Check} from 'lucide-react-native';

interface CheckboxProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  label?: string | React.ReactElement;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary';
  className?: string;
  boxClassName?: string;
  labelClassName?: string;
}

const checkboxContainerVariants = cva(
  'flex-row items-center',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const checkboxVariants = cva(
  'items-center justify-center rounded-md border-2',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      variant: {
        default: 'border-neutrals600',
        primary: 'border-primary',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        checked: true,
        variant: 'default',
        class: 'bg-neutrals600 border-neutrals600',
      },
      {
        checked: true,
        variant: 'primary',
        class: 'bg-primary border-primary',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      checked: false,
    },
  }
);

const labelVariants = cva(
  'font-sans-medium ml-2',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export default function Checkbox({
                                   checked,
                                   onValueChange,
                                   label,
                                   disabled = false,
                                   size = 'md',
                                   variant = 'default',
                                   className,
                                   boxClassName,
                                   labelClassName,
                                 }: CheckboxProps) {
  const scale = useSharedValue(1);
  const [isChecked, setIsChecked] = useState(checked);
  const progress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, {duration: 150});
  }, [isChecked, progress]);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = progress.value;
    const checkScale = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, 0.7, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{scale: checkScale}],
    };
  });

  const boxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePress = () => {
    if (disabled) return;

    scale.value = withTiming(0.9, {duration: 100}, () => {
      scale.value = withTiming(1, {duration: 100});
    });

    onValueChange?.(!isChecked);
    setIsChecked(!isChecked);
  };

  const getCheckSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        checkboxContainerVariants({disabled}),
        className
      )}
      accessibilityRole="checkbox"
      accessibilityState={{checked, disabled}}
    >
      <Animated.View
        style={boxAnimatedStyle}
        className={cn(
          checkboxVariants({size, variant, checked: isChecked}),
          boxClassName
        )}
      >
        <Animated.View style={animatedStyle}>
          <Check size={getCheckSize()} color="#ffffff" strokeWidth={3}/>
        </Animated.View>
      </Animated.View>

      {label && (typeof label === 'string' ? (
        <Text
          className={cn(
            labelVariants({size}),
            'text-foreground',
            labelClassName
          )}
        >
          {label}
        </Text>
      ): label)}
    </Pressable>
  );
}
