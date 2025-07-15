import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

const switchVariants = cva(
  'relative rounded-full border-2 border-transparent',
  {
    variants: {
      size: {
        sm: 'w-10 h-6',
        md: 'w-12 h-7',
        lg: 'w-14 h-8',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

const thumbVariants = cva(
  'absolute rounded-full bg-white shadow-sm',
  {
    variants: {
      size: {
        sm: 'w-4 h-4 top-0.5',
        md: 'w-5 h-5 top-0.5',
        lg: 'w-6 h-6 top-0.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export default function Switch({
  value,
  onValueChange,
  disabled = false,
  size = 'md',
  className,
  trackClassName,
  thumbClassName,
}: SwitchProps) {
  const translateX = useSharedValue(value ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX.value = withSpring(value ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value, translateX]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 1],
      ['rgb(113, 113, 122)', 'rgb(232, 90, 90)'] // neutrals500 to primary
    );

    return {
      backgroundColor,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const maxTranslateX = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
    
    return {
      transform: [
        {
          translateX: translateX.value * maxTranslateX,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const handlePress = () => {
    if (disabled) return;
    
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    });
    
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn('active:opacity-80', disabled && 'cursor-not-allowed')}
    >
      <Animated.View
        style={trackAnimatedStyle}
        className={cn(
          switchVariants({ size, disabled }),
          className,
          trackClassName
        )}
      >
        <Animated.View
          style={thumbAnimatedStyle}
          className={cn(
            thumbVariants({ size }),
            thumbClassName
          )}
        />
      </Animated.View>
    </Pressable>
  );
}
