import React, { createContext, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import Toast, { ToastProps, ToastType } from './Toast';

interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  closable?: boolean;
  onPress?: () => void;
}

interface ToastContextType {
  showToast: (options: Omit<ToastProps, 'id' | 'onDismiss'>) => string;
  showSuccess: (title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => string;
  showError: (title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => string;
  showWarning: (title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => string;
  showInfo: (title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => string;
  updateToast: (id: string, updates: { title?: string; message?: string }) => void;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  defaultPosition?: 'top' | 'bottom';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
  defaultPosition = 'top'
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((options: Omit<ToastProps, 'id' | 'onDismiss'>) => {
    const id = generateId();
    const newToast: ToastProps = {
      position: defaultPosition,
      ...options,
      id,
      onDismiss: dismissToast,
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      // Keep only the latest maxToasts
      return updated.slice(0, maxToasts);
    });

    return id;
  }, [dismissToast, maxToasts, defaultPosition]);

  const updateToast = useCallback((id: string, updates: { title?: string; message?: string }) => {
    setToasts(prev => prev.map(toast =>
      toast.id === id
        ? { ...toast, ...updates }
        : toast
    ));
  }, []);

  const showSuccess = useCallback((title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => {
    return showToast({ type: 'success', title, message, ...options });
  }, [showToast]);

  const showError = useCallback((title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => {
    return showToast({ type: 'error', title, message, ...options });
  }, [showToast]);

  const showWarning = useCallback((title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => {
    return showToast({ type: 'warning', title, message, ...options });
  }, [showToast]);

  const showInfo = useCallback((title: string, message?: string, options?: Omit<ToastOptions, 'title' | 'message'>) => {
    return showToast({ type: 'info', title, message, ...options });
  }, [showToast]);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    updateToast,
    dismissToast,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast Container */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="box-none">
        {toasts.map((toast) => {
          // Calculate index within the same position group
          const samePositionToasts = toasts.filter(t => t.position === toast.position);
          const index = samePositionToasts.findIndex(t => t.id === toast.id);

          return (
            <Toast
              key={toast.id}
              {...toast}
              index={index}
            />
          );
        })}
      </View>
    </ToastContext.Provider>
  );
};
