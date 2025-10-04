import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import {cn} from '@/utils';
import {cva} from 'class-variance-authority';

interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
  fillClassName?: string;
  label?: string;
  labelClassName?: string;
}

const sliderVariants = cva(
  'relative justify-center',
  {
    variants: {
      size: {
        sm: 'h-6',
        md: 'h-8',
        lg: 'h-10',
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

const trackVariants = cva(
  'absolute w-full rounded-full bg-neutrals800',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-1.5',
        lg: 'h-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const fillVariants = cva(
  'absolute rounded-full bg-primary',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-1.5',
        lg: 'h-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'absolute bg-white border-2 border-primary rounded-full shadow-lg',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export default function Slider({
                                 value,
                                 onValueChange,
                                 minimumValue = 0,
                                 maximumValue = 100,
                                 step = 1,
                                 disabled = false,
                                 showValue = false,
                                 size = 'md',
                                 className,
                                 trackClassName,
                                 thumbClassName,
                                 fillClassName,
                                 label,
                                 labelClassName,
                               }: SliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(value ?? 0);
  const scale = useSharedValue(1);
  const sliderWidth = useSharedValue(0);

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(minimumValue, Math.min(maximumValue, newValue));
      const steppedValue = Math.round(clampedValue / step) * step;
      onValueChange?.(steppedValue);
      setSliderValue(steppedValue);
    },
    [minimumValue, maximumValue, step, onValueChange]
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      scale.value = 1.2;
    })
    .onChange((event) => {
      const progress = event.x / sliderWidth.value;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const newValue = minimumValue + clampedProgress * (maximumValue - minimumValue);
      runOnJS(updateValue)(newValue);
    })
    .onFinalize(() => {
      scale.value = 1;
    })
    .enabled(!disabled);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const thumbSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
    const progress = (sliderValue - minimumValue) / (maximumValue - minimumValue);

    const translateValue = interpolate(
      progress,
      [0, 1],
      [0, sliderWidth.value - thumbSize],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {translateX: translateValue},
        {scale: scale.value},
      ],
    };
  });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const progress = (sliderValue - minimumValue) / (maximumValue - minimumValue);
    return {
      width: `${progress * 100}%`,
    };
  });

  useEffect(() => {
    setSliderValue(value ?? 0);
  }, [value]);

  return (
    <View className={cn('w-full', className)}>
      {label && (
        <Text className={cn('text-foreground font-sans-medium mb-2', labelClassName)}>
          {label}
        </Text>
      )}

      <View className="flex-row items-center">
        <GestureDetector gesture={pan}>
          <Animated.View
            className={cn(sliderVariants({size, disabled}))}
            style={{flex: 1}}
            onLayout={(event) => {
              sliderWidth.value = event.nativeEvent.layout.width;
            }}
          >
            <View className={cn(trackVariants({size}), trackClassName)}/>

            <Animated.View
              style={fillAnimatedStyle}
              className={cn(fillVariants({size}), fillClassName)}
            />

            <Animated.View
              style={thumbAnimatedStyle}
              className={cn(thumbVariants({size}), thumbClassName)}
            />
          </Animated.View>
        </GestureDetector>

        {showValue && (
          <Text className="text-foreground font-sans-medium ml-3 min-w-12 text-right">
            {sliderValue}
          </Text>
        )}
      </View>
    </View>
  );
}
