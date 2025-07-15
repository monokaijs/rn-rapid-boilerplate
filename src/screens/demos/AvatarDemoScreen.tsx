import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar } from '@/components/ui';
import { User, Heart, Star, Home, Settings } from 'lucide-react-native';

const AvatarDemoScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Avatar Component</Text>

        <Text className="text-neutrals400 mb-4">
          Avatar component supports text, image, and icon display with multiple size and color variants.
        </Text>

        {/* Text Avatars */}
        <View className="mb-8">
          <Text className="section-title mb-4">Text Avatars</Text>
          <View className="flex-row flex-wrap gap-4 mb-4">
            <View className="items-center">
              <Avatar size="sm" text="John Doe" />
              <Text className="text-neutrals400 text-xs mt-2">Small</Text>
            </View>
            <View className="items-center">
              <Avatar size="md" text="Jane Smith" />
              <Text className="text-neutrals400 text-xs mt-2">Medium</Text>
            </View>
            <View className="items-center">
              <Avatar size="lg" text="Bob Wilson" />
              <Text className="text-neutrals400 text-xs mt-2">Large</Text>
            </View>
            <View className="items-center">
              <Avatar size="xl" text="Alice Johnson" />
              <Text className="text-neutrals400 text-xs mt-2">Extra Large</Text>
            </View>
          </View>
        </View>

        {/* Color Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Color Variants</Text>
          <View className="flex-row flex-wrap gap-4 mb-4">
            <View className="items-center">
              <Avatar text="Default" variant="default" />
              <Text className="text-neutrals400 text-xs mt-2">Default</Text>
            </View>
            <View className="items-center">
              <Avatar text="Primary" variant="primary" />
              <Text className="text-neutrals400 text-xs mt-2">Primary</Text>
            </View>
            <View className="items-center">
              <Avatar text="Secondary" variant="secondary" />
              <Text className="text-neutrals400 text-xs mt-2">Secondary</Text>
            </View>
          </View>
        </View>

        {/* Icon Avatars */}
        <View className="mb-8">
          <Text className="section-title mb-4">Icon Avatars</Text>
          <View className="flex-row flex-wrap gap-4 mb-4">
            <View className="items-center">
              <Avatar size="sm" icon={<User />} />
              <Text className="text-neutrals400 text-xs mt-2">User</Text>
            </View>
            <View className="items-center">
              <Avatar size="md" icon={<Heart />} variant="primary" />
              <Text className="text-neutrals400 text-xs mt-2">Heart</Text>
            </View>
            <View className="items-center">
              <Avatar size="lg" icon={<Star />} variant="secondary" />
              <Text className="text-neutrals400 text-xs mt-2">Star</Text>
            </View>
            <View className="items-center">
              <Avatar size="xl" icon={<Settings />} />
              <Text className="text-neutrals400 text-xs mt-2">Settings</Text>
            </View>
          </View>
        </View>

        {/* Image Avatars */}
        <View className="mb-8">
          <Text className="section-title mb-4">Image Avatars</Text>
          <View className="flex-row flex-wrap gap-4 mb-4">
            <View className="items-center">
              <Avatar
                size="sm"
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
                alt="Profile picture"
              />
              <Text className="text-neutrals400 text-xs mt-2">Small</Text>
            </View>
            <View className="items-center">
              <Avatar
                size="md"
                source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?w=100&h=100&fit=crop&crop=face' }}
                alt="Profile picture"
              />
              <Text className="text-neutrals400 text-xs mt-2">Medium</Text>
            </View>
            <View className="items-center">
              <Avatar
                size="lg"
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                alt="Profile picture"
              />
              <Text className="text-neutrals400 text-xs mt-2">Large</Text>
            </View>
            <View className="items-center">
              <Avatar
                size="xl"
                source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }}
                alt="Profile picture"
              />
              <Text className="text-neutrals400 text-xs mt-2">Extra Large</Text>
            </View>
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>

          {/* User Profile */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-2">User Profile</Text>
            <View className="flex-row items-center">
              <Avatar text="John Doe" size="lg" variant="primary" />
              <View className="ml-3">
                <Text className="text-foreground font-sans-semibold">John Doe</Text>
                <Text className="text-neutrals400">john.doe@example.com</Text>
              </View>
            </View>
          </View>

          {/* Comment Section */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-2">Comment Section</Text>
            <View className="flex-row">
              <Avatar text="Jane Smith" size="md" />
              <View className="ml-3 flex-1">
                <Text className="text-foreground font-sans-medium">Jane Smith</Text>
                <Text className="text-neutrals300 text-sm">Great work on this feature!</Text>
              </View>
            </View>
          </View>

          {/* Team List */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-2">Team Members</Text>
            <View className="flex-row -space-x-2">
              <Avatar text="Alice" size="md" variant="primary" />
              <Avatar text="Bob" size="md" variant="secondary" />
              <Avatar text="Charlie" size="md" />
              <Avatar text="+5" size="md" variant="default" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AvatarDemoScreen;
