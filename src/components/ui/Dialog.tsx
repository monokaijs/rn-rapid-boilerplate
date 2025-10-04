import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColors } from '@/hooks/useColors';
import { useInsets } from '@/hooks/useInsets';
import AppButton from './AppButton';
import { cn } from '@/utils';

export type DialogType = 'message' | 'confirm' | 'loading';

export interface DialogButton {
  text: string;
  onPress?: () => void | Promise<void>;
  variant?: 'default' | 'primary' | 'ghost' | 'outline' | 'link';
  loading?: boolean;
  disabled?: boolean;
}

export interface DialogOptions {
  type?: DialogType;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  buttons?: DialogButton[];
  dismissable?: boolean;
  onDismiss?: () => void;
  buttonLayout?: 'horizontal' | 'vertical' | 'auto';
}

export interface DialogRef {
  show: (options: DialogOptions) => void;
  hide: () => void;
  hideAll: () => void;
}

interface DialogInstance {
  id: string;
  options: DialogOptions;
  buttonLoadingStates: Record<number, boolean>;
}

const Dialog = forwardRef<DialogRef>((_, ref) => {
  const colors = useColors();
  const insets = useInsets();

  const [dialogs, setDialogs] = useState<DialogInstance[]>([]);
  const dialogRefs = React.useRef<Map<string, React.RefObject<BottomSheetModal>>>(new Map());

  useImperativeHandle(ref, () => ({
    show: (newOptions: DialogOptions) => {
      const id = `dialog-${Date.now()}-${Math.random()}`;
      const dialogRef = React.createRef<BottomSheetModal>();
      dialogRefs.current.set(id, dialogRef as any);

      const newDialog: DialogInstance = {
        id,
        options: {
          type: 'message',
          dismissable: true,
          buttonLayout: 'auto',
          ...newOptions,
        },
        buttonLoadingStates: {},
      };

      setDialogs(prev => [...prev, newDialog]);

      // Present the dialog after it's added to state
      setTimeout(() => {
        dialogRef.current?.present();
      }, 50);
    },
    hide: () => {
      if (dialogs.length > 0) {
        const lastDialog = dialogs[dialogs.length - 1];
        const dialogRef = dialogRefs.current.get(lastDialog.id);
        dialogRef?.current?.dismiss();
      }
    },
    hideAll: () => {
      dialogs.forEach(dialog => {
        const dialogRef = dialogRefs.current.get(dialog.id);
        dialogRef?.current?.dismiss();
      });
    },
  }));

  const handleDismiss = useCallback((dialogId: string) => {
    setDialogs(prev => {
      const dialog = prev.find(d => d.id === dialogId);
      if (dialog) {
        dialog.options.onDismiss?.();
      }
      return prev.filter(d => d.id !== dialogId);
    });
    dialogRefs.current.delete(dialogId);
  }, []);

  const handleButtonPress = useCallback(async (
    dialogId: string,
    button: DialogButton,
    index: number
  ) => {
    const dialog = dialogs.find(d => d.id === dialogId);
    if (!dialog || button.disabled || dialog.buttonLoadingStates[index]) return;

    if (button.onPress) {
      const result = button.onPress();

      if (result instanceof Promise) {
        // Set loading state for this button
        setDialogs(prev => prev.map(d =>
          d.id === dialogId
            ? { ...d, buttonLoadingStates: { ...d.buttonLoadingStates, [index]: true } }
            : d
        ));

        try {
          await result;
          const dialogRef = dialogRefs.current.get(dialogId);
          dialogRef?.current?.dismiss();
        } catch (error) {
          console.error('Dialog button action error:', error);
          const dialogRef = dialogRefs.current.get(dialogId);
          dialogRef?.current?.dismiss();
        } finally {
          setDialogs(prev => prev.map(d =>
            d.id === dialogId
              ? { ...d, buttonLoadingStates: { ...d.buttonLoadingStates, [index]: false } }
              : d
          ));
        }
      } else {
        const dialogRef = dialogRefs.current.get(dialogId);
        dialogRef?.current?.dismiss();
      }
    } else {
      const dialogRef = dialogRefs.current.get(dialogId);
      dialogRef?.current?.dismiss();
    }
  }, [dialogs]);

  const renderBackdrop = useCallback(
    (dismissable: boolean) => (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={dismissable ? 'close' : 'none'}
      />
    ),
    []
  );

  const getDefaultButtons = (type?: DialogType): DialogButton[] => {
    if (type === 'loading') {
      return [];
    }

    if (type === 'confirm') {
      return [
        {
          text: 'Cancel',
          variant: 'outline',
          onPress: () => {},
        },
        {
          text: 'Confirm',
          variant: 'primary',
          onPress: () => {},
        },
      ];
    }

    return [
      {
        text: 'OK',
        variant: 'primary',
        onPress: () => {},
      },
    ];
  };

  const getButtonLayout = (options: DialogOptions, buttons: DialogButton[]): 'horizontal' | 'vertical' => {
    if (options.buttonLayout === 'horizontal') return 'horizontal';
    if (options.buttonLayout === 'vertical') return 'vertical';
    return buttons.length <= 2 ? 'horizontal' : 'vertical';
  };

  return (
    <>
      {dialogs.map(dialog => {
        const dialogRef = dialogRefs.current.get(dialog.id);
        if (!dialogRef) return null;

        const buttons = dialog.options.buttons && dialog.options.buttons.length > 0
          ? dialog.options.buttons
          : getDefaultButtons(dialog.options.type);

        const buttonLayout = getButtonLayout(dialog.options, buttons);

        return (
          <BottomSheetModal
            key={dialog.id}
            ref={dialogRef}
            backdropComponent={renderBackdrop(dialog.options.dismissable !== false)}
            enablePanDownToClose={dialog.options.dismissable !== false && dialog.options.type !== 'loading'}
            enableContentPanningGesture={dialog.options.dismissable !== false && dialog.options.type !== 'loading'}
            enableDynamicSizing
            backgroundStyle={{ backgroundColor: colors.neutrals1000 }}
            handleIndicatorStyle={{ backgroundColor: colors.neutrals400 }}
            onDismiss={() => handleDismiss(dialog.id)}
          >
            <BottomSheetView
              style={{
                paddingBottom: insets.bottom || 16,
              }}
            >
              <View className="px-6 py-4">
                {/* Icon */}
                {dialog.options.icon && (
                  <View className="items-center mb-4">
                    {dialog.options.icon}
                  </View>
                )}

                {/* Loading State */}
                {dialog.options.type === 'loading' && (
                  <View className="items-center py-6">
                    <ActivityIndicator size="large" color={colors.primary} />
                    {dialog.options.title && (
                      <Text className="text-foreground font-sans-semibold text-lg mt-4 text-center">
                        {dialog.options.title}
                      </Text>
                    )}
                    {dialog.options.message && (
                      <Text className="text-neutrals300 font-sans-regular text-sm mt-2 text-center">
                        {dialog.options.message}
                      </Text>
                    )}
                  </View>
                )}

                {/* Message/Confirm State */}
                {dialog.options.type !== 'loading' && (
                  <>
                    {/* Title */}
                    {dialog.options.title && (
                      <Text className="text-foreground font-sans-bold text-xl mb-3 text-center">
                        {dialog.options.title}
                      </Text>
                    )}

                    {/* Message */}
                    {dialog.options.message && (
                      <Text className="text-neutrals300 font-sans-regular text-base mb-6 text-center">
                        {dialog.options.message}
                      </Text>
                    )}

                    {/* Buttons */}
                    {buttons.length > 0 && (
                      <View className={cn(
                        'gap-3',
                        buttonLayout === 'vertical' ? 'flex-col' : 'flex-row'
                      )}>
                        {buttons.map((button, index) => (
                          <View key={index} className={buttonLayout === 'horizontal' ? 'flex-1' : ''}>
                            <AppButton
                              variant={button.variant || 'default'}
                              onPress={() => handleButtonPress(dialog.id, button, index)}
                              disabled={button.disabled || dialog.buttonLoadingStates[index]}
                              loading={dialog.buttonLoadingStates[index]}
                              className="w-full"
                            >
                              {button.text}
                            </AppButton>
                          </View>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        );
      })}
    </>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;

