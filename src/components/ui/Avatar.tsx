import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import {ClassValue} from "clsx";
import {useColors} from "@/hooks/useColors.ts";

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
  className?: ClassValue;
  textClassName?: ClassValue;
  // Content props - only one should be provided
  text?: string;
  source?: ImageSourcePropType;
  icon?: React.ReactElement;
  // Optional props
  alt?: string;
}

const avatarVariants = cva(
  'rounded-full items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
      },
      variant: {
        default: 'bg-neutrals700',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const avatarTextVariants = cva(
  'font-sans-semibold text-center',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      variant: {
        default: 'text-neutrals100',
        primary: 'text-white',
        secondary: 'text-neutrals800',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const getInitials = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getIconSize = (size: 'sm' | 'md' | 'lg' | 'xl'): number => {
  switch (size) {
    case 'sm': return 12;
    case 'md': return 20;
    case 'lg': return 28;
    case 'xl': return 36;
    default: return 20;
  }
};

export default function Avatar({
  size = 'md',
  variant = 'default',
  className,
  textClassName,
  text,
  source,
  icon,
  alt,
}: AvatarProps) {
  const colors = useColors();
  const renderContent = () => {
    // Priority: image > icon > text
    if (source) {
      return (
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          accessibilityLabel={alt || 'Avatar image'}
        />
      );
    }

    if (icon) {
      return React.cloneElement(icon as any, {
        size: getIconSize(size),
        color: variant === 'default' ? colors.foreground : variant === 'primary' ? colors.primaryForeground : colors.secondaryForeground,
      });
    }

    if (text) {
      return (
        <Text
          className={cn(
            avatarTextVariants({ size, variant }),
            textClassName
          )}
        >
          {getInitials(text)}
        </Text>
      );
    }

    // Fallback to empty avatar
    return null;
  };

  return (
    <View
      className={cn(
        avatarVariants({ size, variant }),
        className
      )}
    >
      {renderContent()}
    </View>
  );
}
