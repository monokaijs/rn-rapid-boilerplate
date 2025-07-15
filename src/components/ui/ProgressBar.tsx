import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

interface ProgressBarProps {
  value: number; // 0-100
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  label?: string;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const progressContainerVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressTrackVariants = cva(
  'w-full rounded-full bg-neutrals800 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressFillVariants = cva(
  'h-full rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-neutrals400',
        primary: 'bg-primary',
        success: 'bg-success200',
        warning: 'bg-warning200',
        error: 'bg-error200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  'font-sans-medium',
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

const valueVariants = cva(
  'font-sans-medium text-right',
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

export default function ProgressBar({
  value,
  variant = 'default',
  size = 'md',
  animated = true,
  showValue = false,
  label,
  className,
  trackClassName,
  fillClassName,
  labelClassName,
  valueClassName,
}: ProgressBarProps) {
  const progress = useSharedValue(0);
  const scale = useSharedValue(0.95);

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(clampedValue, { duration: 500 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else {
      progress.value = clampedValue;
      scale.value = 1;
    }
  }, [clampedValue, animated, progress, scale]);

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      progress.value,
      [0, 100],
      [0, 100],
      Extrapolate.CLAMP
    );

    return {
      width: `${width}%`,
      transform: [{ scale: scale.value }],
    };
  });

  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View className={cn(progressContainerVariants({ size }), className)}>
      {/* Header with label and value */}
      {(label || showValue) && (
        <View className="flex-row justify-between items-center">
          {label && (
            <Text
              className={cn(
                labelVariants({ size }),
                'text-foreground',
                labelClassName
              )}
            >
              {label}
            </Text>
          )}
          
          {showValue && (
            <Text
              className={cn(
                valueVariants({ size }),
                'text-neutrals400',
                valueClassName
              )}
            >
              {Math.round(clampedValue)}%
            </Text>
          )}
        </View>
      )}

      {/* Progress track */}
      <Animated.View
        style={trackAnimatedStyle}
        className={cn(
          progressTrackVariants({ size }),
          trackClassName
        )}
      >
        {/* Progress fill */}
        <Animated.View
          style={fillAnimatedStyle}
          className={cn(
            progressFillVariants({ variant }),
            fillClassName
          )}
        />
      </Animated.View>
    </View>
  );
}
