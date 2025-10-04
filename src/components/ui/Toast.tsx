import React, {useEffect, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming,} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppText, Icon} from '@/components/ui';
import {useColors} from '@/hooks/useColors';
import {cn} from "@/utils";

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onDismiss: (id: string) => void;
  position?: 'top' | 'bottom';
  index?: number;
  closable?: boolean;
  onPress?: () => void;
}

const Toast: React.FC<ToastProps> = ({
                                       id,
                                       type,
                                       title,
                                       message,
                                       duration = 4000,
                                       onDismiss,
                                       position = 'top',
                                       index = 0,
                                       closable = true,
                                       onPress,
                                     }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  const baseOffset = 16;
  const stackOffset = index * 80;
  const initialPosition = position === 'top'
    ? insets.top + baseOffset + stackOffset
    : insets.bottom + baseOffset + stackOffset;

  const positionY = useSharedValue(initialPosition);

  // Local state for text content to enable smooth updates
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentMessage, setCurrentMessage] = useState(message);

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'CircleCheck';
      case 'error':
        return 'CircleX';
      case 'warning':
        return 'TriangleAlert';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return "text-success";
      case 'error':
        return "text-error";
      case 'warning':
        return "text-warning";
      case 'info':
      default:
        return "text-primary";
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const style: any = {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };

    if (position === 'top') {
      style.top = positionY.value;
    } else {
      style.bottom = positionY.value;
    }

    return style;
  });

  const handleDismiss = () => {
    translateY.value = withTiming(position === 'top' ? -100 : 100, {duration: 300});
    opacity.value = withTiming(0, {duration: 300}, () => {
      runOnJS(onDismiss)(id);
    });
  };

  useEffect(() => {
    // Enter animation
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(1, {duration: 300});

    // Auto dismiss - only if duration is greater than 0
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, []);

  // Animate position changes when index changes
  useEffect(() => {
    const baseOffset = 16;
    const stackOffset = index * 80;
    const newPosition = position === 'top'
      ? insets.top + baseOffset + stackOffset
      : insets.bottom + baseOffset + stackOffset;

    positionY.value = withSpring(newPosition, {
      damping: 15,
      stiffness: 150,
    });
  }, [index, position, insets]);

  // Update text content when props change
  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);

  const ToastContainer = onPress ? Pressable : View;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          left: 16,
          right: 16,
          zIndex: 9999,
        },
      ]}
    >
      <ToastContainer
        className="flex-row items-start p-4 rounded-xl shadow-lg"
        style={{
          backgroundColor: colors.neutrals1000,
          borderWidth: 1,
          borderColor: colors.neutrals800,
        }}
        onPress={onPress}
        {...(onPress && {activeOpacity: 0.8})}
      >
        {/* Icon */}
        <View className="mr-3 mt-0.5">
          <Icon
            name={getIconName()}
            className={cn("w-5 h-5", getIconColor())}
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <AppText
            variant="body"
            weight="semibold"
            className="mb-1 text-foreground"
            raw
          >
            {currentTitle}
          </AppText>
          {currentMessage && (
            <AppText
              variant="bodySmall"
              className="leading-5 text-neutrals100"
              raw
            >
              {currentMessage}
            </AppText>
          )}
        </View>

        {/* Close button - only show if closable */}
        {closable && (
          <TouchableOpacity
            onPress={handleDismiss}
            className="ml-2 p-1"
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
          >
            <Icon
              name="X"
              className="w-4 h-4 text-neutrals100"
            />
          </TouchableOpacity>
        )}
      </ToastContainer>
    </Animated.View>
  );
};

export default Toast;
