import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AppButton, AppInput } from '@/components/ui';
import { Download, Heart, Settings, Send, Plus, Trash2 } from 'lucide-react-native';

const AppButtonDemoScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    primary: false,
    ghost: false,
    outline: false,
    link: false,
  });

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleVariantLoading = (variant: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [variant]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [variant]: false }));
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Button Component</Text>

        <Text className="text-neutrals400 mb-4">
          AppButton component with multiple variants, loading states, and smooth animations.
        </Text>

        {/* Basic Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Button Variants</Text>
          <View className="gap-3">
            <AppButton variant="default">Default Button</AppButton>
            <AppButton variant="primary">Primary Button</AppButton>
            <AppButton variant="ghost">Ghost Button</AppButton>
            <AppButton variant="outline">Outline Button</AppButton>
            <AppButton variant="link">Link Button</AppButton>
          </View>
        </View>

        {/* Button Sizes */}
        <View className="mb-8">
          <Text className="section-title mb-4">Button Sizes</Text>
          <View className="gap-3">
            <AppButton size="sm">Small Button</AppButton>
            <AppButton size="default">Default Size</AppButton>
            <AppButton size="lg">Large Button</AppButton>
          </View>
        </View>

        {/* Buttons with Icons */}
        <View className="mb-8">
          <Text className="section-title mb-4">Buttons with Icons</Text>
          <View className="gap-3">
            <AppButton
              variant="primary"
              icon={<Download size={16} color="white" />}
            >
              Download
            </AppButton>
            <AppButton
              variant="outline"
              icon={<Heart size={16} color="#e85a5a" />}
            >
              Like
            </AppButton>
            <AppButton
              variant="link"
              icon={<Settings size={16} color="#e85a5a" />}
            >
              Settings
            </AppButton>
          </View>
        </View>

        {/* Loading States */}
        <View className="mb-8">
          <Text className="section-title mb-4">Loading States</Text>
          <View className="gap-3">
            <AppButton
              variant="primary"
              loading={loadingStates.primary}
              onPress={() => handleVariantLoading('primary')}
            >
              {loadingStates.primary ? 'Loading...' : 'Load Primary'}
            </AppButton>
            <AppButton
              variant="ghost"
              loading={loadingStates.ghost}
              onPress={() => handleVariantLoading('ghost')}
            >
              {loadingStates.ghost ? 'Loading...' : 'Load Ghost'}
            </AppButton>
            <AppButton
              variant="outline"
              loading={loadingStates.outline}
              onPress={() => handleVariantLoading('outline')}
            >
              {loadingStates.outline ? 'Loading...' : 'Load Outline'}
            </AppButton>
            <AppButton
              variant="link"
              loading={loadingStates.link}
              onPress={() => handleVariantLoading('link')}
            >
              {loadingStates.link ? 'Loading...' : 'Load Link'}
            </AppButton>
          </View>
        </View>

        {/* Disabled States */}
        <View className="mb-8">
          <Text className="section-title mb-4">Disabled States</Text>
          <View className="gap-3">
            <AppButton variant="default" disabled>Disabled Default</AppButton>
            <AppButton variant="primary" disabled>Disabled Primary</AppButton>
            <AppButton variant="ghost" disabled>Disabled Ghost</AppButton>
            <AppButton variant="outline" disabled>Disabled Outline</AppButton>
            <AppButton variant="link" disabled>Disabled Link</AppButton>
          </View>
        </View>

        {/* Interactive Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Interactive Examples</Text>

          {/* Action Buttons */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Action Buttons</Text>
            <View className="flex-row gap-2 mb-3">
              <AppButton
                variant="primary"
                size="sm"
                icon={<Plus size={14} color="white" />}
                onPress={() => Alert.alert('Success', 'Item added!')}
              >
                Add
              </AppButton>
              <AppButton
                variant="ghost"
                size="sm"
                icon={<Trash2 size={14} color="#e85a5a" />}
                onPress={() => Alert.alert('Warning', 'Item deleted!')}
              >
                Delete
              </AppButton>
            </View>
          </View>

          {/* Form Example */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Form Example</Text>
            <AppInput
              label="Email"
              placeholder="Enter your email"
              className="mb-3"
            />
            <AppInput
              label="Message"
              placeholder="Enter your message"
              variant="textarea"
              className="mb-4"
            />
            <View className="flex-row gap-2">
              <AppButton
                variant="primary"
                icon={<Send size={16} color="white" />}
                loading={loading}
                onPress={handleLoadingDemo}
                className="flex-1"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </AppButton>
              <AppButton variant="outline" className="flex-1">
                Cancel
              </AppButton>
            </View>
          </View>
        </View>

        {/* Animation Demo */}
        <View className="mb-8">
          <Text className="section-title mb-4">Animation Demo</Text>
          <Text className="text-neutrals400 text-sm mb-3">
            Press and hold buttons to see scale animations. Ghost, outline, and link variants also have opacity animations.
          </Text>
          <View className="flex-row gap-2">
            <AppButton
              variant="primary"
              onPress={() => Alert.alert('Animated!', 'Button pressed with animation')}
            >
              Press Me
            </AppButton>
            <AppButton
              variant="outline"
              onPress={() => Alert.alert('Animated!', 'Outline button with opacity animation')}
            >
              Outline
            </AppButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppButtonDemoScreen;
