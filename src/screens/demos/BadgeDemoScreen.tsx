import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Badge, Avatar } from '@/components/ui';
import { Bell, Mail, ShoppingCart } from 'lucide-react-native';

const BadgeDemoScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Badge Component</Text>
        
        <Text className="text-neutrals400 mb-4">
          Badge component provides small status indicators with various color variants and sizes.
        </Text>

        {/* Basic Badges */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Badges</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="flex-row flex-wrap items-center gap-2 mb-4">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </View>
        </View>

        {/* Number Badges */}
        <View className="mb-8">
          <Text className="section-title mb-4">Number Badges</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Badge variant="primary">1</Badge>
            <Badge variant="error">5</Badge>
            <Badge variant="warning">12</Badge>
            <Badge variant="success">99+</Badge>
            <Badge variant="secondary">New</Badge>
          </View>
        </View>

        {/* Status Badges */}
        <View className="mb-8">
          <Text className="section-title mb-4">Status Badges</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Badge variant="success">Online</Badge>
            <Badge variant="warning">Away</Badge>
            <Badge variant="error">Offline</Badge>
            <Badge variant="primary">Active</Badge>
            <Badge variant="secondary">Inactive</Badge>
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>
          <Text className="text-neutrals400 text-sm mb-4">
            Common use cases for badges in your app:
          </Text>
          
          {/* Notification Badge */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Notification Badge</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Bell size={24} color="#949494" />
                <Text className="text-foreground ml-3">Notifications</Text>
              </View>
              <Badge variant="error">3</Badge>
            </View>
          </View>

          {/* Shopping Cart */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Shopping Cart</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <ShoppingCart size={24} color="#949494" />
                <Text className="text-foreground ml-3">Cart</Text>
              </View>
              <Badge variant="primary">5</Badge>
            </View>
          </View>

          {/* User Status */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">User Status</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Avatar text="John Doe" size="md" />
                <View className="ml-3">
                  <Text className="text-foreground">John Doe</Text>
                  <Text className="text-neutrals400 text-sm">Software Engineer</Text>
                </View>
              </View>
              <Badge variant="success">Online</Badge>
            </View>
          </View>

          {/* Message Badge */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Unread Messages</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Mail size={24} color="#949494" />
                <Text className="text-foreground ml-3">Messages</Text>
              </View>
              <Badge variant="error">12</Badge>
            </View>
          </View>

          {/* Priority Levels */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-3">Task Priority</Text>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Fix critical bug</Text>
                <Badge variant="error">High</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Update documentation</Text>
                <Badge variant="warning">Medium</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Code cleanup</Text>
                <Badge variant="secondary">Low</Badge>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BadgeDemoScreen;
