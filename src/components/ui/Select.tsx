import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Pressable, Text, View} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {cn} from '@/utils';
import {cva} from 'class-variance-authority';
import Icon from './Icon';
import {useColors} from "@/hooks/useColors.ts";
import {useInsets} from "@/hooks/useInsets.ts";
import AppInput from "@/components/ui/AppInput.tsx";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectBaseProps {
  value: string | number;
  onValueChange: (value: string | number) => void;
}

interface SelectMultipleProps {
  value: (string | number)[];
  onValueChange: (value: (string | number)[]) => void;
}

type SelectPropsWithType = SelectBaseProps | SelectMultipleProps;

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  renderSelector?: React.ReactElement;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
  required?: boolean;
  maxHeight?: number; // e.g., '60vh', '400px', '50%'
} & SelectPropsWithType;

const selectVariants = cva(
  'flex-row items-center justify-between border rounded-lg bg-background',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 min-h-9',
        md: 'px-4 py-2.5 min-h-11',
        lg: 'px-4 py-3 min-h-12',
      },
      state: {
        default: 'border-neutrals800',
        focused: 'border-primary',
        error: 'border-error',
        disabled: 'border-neutrals800 opacity-50',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

const labelVariants = cva(
  'font-sans-medium text-foreground mb-1.5',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      required: {
        true: "after:content-['*'] after:text-error after:ml-1",
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const helperVariants = cva(
  'font-sans-regular mt-1.5',
  {
    variants: {
      type: {
        helper: 'text-neutrals100',
        error: 'text-error',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      type: 'helper',
      size: 'md',
    },
  }
);

export default function Select({
                                 options,
                                 value,
                                 onValueChange,
                                 placeholder = 'Select an option',
                                 label,
                                 helperText,
                                 errorText,
                                 disabled = false,
                                 searchable = false,
                                 multiple = false,
                                 size = 'md',
                                 className,
                                 containerClassName,
                                 labelClassName,
                                 helperClassName,
                                 errorClassName,
                                 required,
                                 maxHeight = 60,
                                 renderSelector,
                               }: SelectProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {height: screenHeight} = Dimensions.get('screen');
  const colors = useColors();
  const insets = useInsets();

  const hasError = !!errorText;
  const state = disabled ? 'disabled' : hasError ? 'error' : 'default';
  // Handle both single and multiple selection
  const selectedValues = multiple
    ? (Array.isArray(value) ? value : [])
    : (value !== undefined ? [value] : []);

  const selectedOptions = options.filter(option =>
    selectedValues.includes(option.value)
  );

  const isSelected = useCallback((optionValue: string | number) => {
    return selectedValues.includes(optionValue);
  }, [selectedValues]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  const handlePresentModalPress = useCallback(() => {
    if (disabled) return;
    bottomSheetModalRef.current?.present();
  }, [disabled]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setSearchQuery('');
    }
  }, []);

  const handleOptionSelect = useCallback((optionValue: string | number) => {
    if (multiple) {
      // For multiple selection, toggle the selected value
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];

      onValueChange(newValue as any);
    } else {
      // For single selection, just set the value and dismiss
      onValueChange(optionValue as any);
      bottomSheetModalRef.current?.dismiss();
      setSearchQuery('');
    }
  }, [multiple, onValueChange, selectedValues]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const renderOption = ({item, index}: { item: SelectOption, index: number }) => {
    const itemSelected = isSelected(item.value);

    return (
      <Pressable
        onPress={() => handleOptionSelect(item.value)}
        disabled={item.disabled}
        className={cn(
          'flex-row items-center px-4 py-3 border-b border-neutrals900',
          item.disabled && 'opacity-50',
          itemSelected && 'bg-primary/10 border-primary/10',
          index === filteredOptions.length - 1 && 'border-b-0'
        )}
      >
        {multiple && (
          <View className={cn(
            'w-5 h-5 rounded border-2 mr-3 items-center justify-center',
            itemSelected ? 'bg-primary border-primary' : 'border-neutrals400'
          )}>
            {itemSelected && (
              <Icon name="Check" className="w-3 h-3 text-white"/>
            )}
          </View>
        )}
        <Text
          className={cn(
            'flex-1 text-foreground font-sans-medium',
            itemSelected && 'text-primary'
          )}
        >
          {item.label}
        </Text>
        {!multiple && itemSelected && (
          <Icon name="Check" className="w-5 h-5 text-primary"/>
        )}
      </Pressable>
    );
  };

  return (
    <>
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text
            className={cn(
              labelVariants({size, required}),
              labelClassName
            )}
          >
            {label}
          </Text>
        )}
        {renderSelector ? React.cloneElement(renderSelector as any, {
          onPress: handlePresentModalPress,
          disabled,
        }) : <>
          <Pressable
            onPress={handlePresentModalPress}
            disabled={disabled}
            className={cn(
              selectVariants({size, state}),
              className
            )}
          >
            <Text
              className={cn(
                'flex-1 font-sans-medium',
                selectedOptions.length > 0 ? 'text-foreground' : 'text-neutrals100'
              )}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {multiple
                ? selectedOptions.length > 0
                  ? selectedOptions.length === 1
                    ? selectedOptions[0].label
                    : `${selectedOptions[0].label} +${selectedOptions.length - 1} more`
                  : placeholder
                : selectedOptions.length > 0 ? selectedOptions[0].label : placeholder
              }
            </Text>
            <Icon
              name="ChevronDown"
              className="w-5 h-5 text-neutrals100"
            />
          </Pressable>

          {(helperText || errorText) && (
            <Text
              className={cn(
                helperVariants({
                  type: hasError ? 'error' : 'helper',
                  size,
                }),
                hasError ? errorClassName : helperClassName
              )}
            >
              {errorText || helperText}
            </Text>
          )}
        </>}
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        enableContentPanningGesture
        enableDynamicSizing
        backgroundStyle={{backgroundColor: colors.background}}
        handleIndicatorStyle={{backgroundColor: colors.neutrals400}}
      >
        <BottomSheetView
          style={{
            maxHeight: maxHeight / 100 * screenHeight,
          }}
        >
          <View className="px-4 py-3 border-b border-neutrals900">
            <Text className="text-foreground text-lg font-sans-bold mb-3">
              {label || 'Select Option'}
            </Text>
            {searchable && (
              <AppInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search options..."
                placeholderTextColor="#949494"
                className="border rounded-lg px-3 py-2 text-foreground bg-background"
              />
            )}
          </View>
          <FlatList
            data={filteredOptions}
            renderItem={renderOption}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
