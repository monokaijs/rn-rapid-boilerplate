import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import {useColors} from "@/hooks/useColors.ts";

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  disabled?: boolean;
  closable?: boolean;
  onPress?: () => void;
  onClose?: () => void;
  className?: string;
  textClassName?: string;
  icon?: React.ReactElement;
}

const chipVariants = cva(
  'flex-row items-center justify-center rounded-full border gap-1.5',
  {
    variants: {
      variant: {
        default: 'bg-neutrals700 border-neutrals600',
        primary: 'bg-primary border-primary',
        secondary: 'bg-secondary border-secondary',
        outline: 'bg-transparent border-neutrals600',
      },
      size: {
        sm: 'px-2.5 py-1 min-h-7',
        md: 'px-3 py-1.5 min-h-8',
        lg: 'px-4 py-2 min-h-10',
      },
      selected: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: true,
        class: 'bg-primary border-primary',
      },
      {
        variant: 'outline',
        selected: true,
        class: 'bg-primary border-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      selected: false,
      disabled: false,
    },
  }
);

const chipTextVariants = cva(
  'font-sans-medium text-center',
  {
    variants: {
      variant: {
        default: 'text-neutrals100',
        primary: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        outline: 'text-foreground',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: ['default', 'outline'],
        selected: true,
        class: 'text-white',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      selected: false,
    },
  }
);

const getIconSize = (size: 'sm' | 'md' | 'lg'): number => {
  switch (size) {
    case 'sm': return 12;
    case 'md': return 14;
    case 'lg': return 16;
    default: return 14;
  }
};

export default function Chip({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  disabled = false,
  closable = false,
  onPress,
  onClose,
  className,
  textClassName,
  icon,
}: ChipProps) {
  const colors = useColors();
  const getTextColor = () => {
    switch (variant) {
      case 'primary': return colors.primaryForeground;
      case 'secondary': return colors.secondaryForeground;
      case 'outline': return colors.foreground;
      default: return colors.foreground;
    }
  };

  const getIconColor = () => {
    return getTextColor();
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const handleClose = () => {
    if (!disabled && onClose) {
      onClose();
    }
  };

  const content = (
    <>
      {icon && React.cloneElement(icon as any, {
        size: getIconSize(size),
        color: getIconColor(),
      })}

      {typeof children === 'string' ? (
        <Text
          className={cn(
            chipTextVariants({ variant, size, selected }),
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}

      {closable && (
        <Pressable
          onPress={handleClose}
          disabled={disabled}
          className="ml-1"
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <X size={getIconSize(size)} color={getIconColor()} />
        </Pressable>
      )}
    </>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        className={cn(
          chipVariants({ variant, size, selected, disabled }),
          'active:opacity-80',
          className
        )}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      className={cn(
        chipVariants({ variant, size, selected, disabled }),
        className
      )}
    >
      {content}
    </View>
  );
}
