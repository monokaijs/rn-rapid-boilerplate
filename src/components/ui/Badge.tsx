import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
}

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border',
  {
    variants: {
      variant: {
        default: 'bg-neutrals700 border-neutrals600 text-neutrals100',
        primary: 'bg-primary border-primary text-white',
        secondary: 'bg-secondary border-secondary text-neutrals800',
        success: 'bg-success200 border-success200 text-white',
        warning: 'bg-warning200 border-warning200 text-white',
        error: 'bg-error200 border-error200 text-white',
      },
      size: {
        sm: 'px-2 py-0.5 min-h-5',
        md: 'px-2.5 py-1 min-h-6',
        lg: 'px-3 py-1.5 min-h-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const badgeTextVariants = cva(
  'font-sans-medium text-center',
  {
    variants: {
      variant: {
        default: 'text-neutrals100',
        primary: 'text-white',
        secondary: 'text-neutrals800',
        success: 'text-white',
        warning: 'text-white',
        error: 'text-white',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  textClassName,
}: BadgeProps) {
  return (
    <View
      className={cn(
        badgeVariants({ variant, size }),
        className
      )}
    >
      {typeof children === 'string' ? (
        <Text
          className={cn(
            badgeTextVariants({ variant, size }),
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
