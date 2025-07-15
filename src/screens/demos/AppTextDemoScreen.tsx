import React from 'react';
import { View, ScrollView } from 'react-native';
import AppText from '@/components/ui/AppText';

const AppTextDemoScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <AppText variant="heading1" className="mb-6">Typography</AppText>
        
        <AppText variant="body" color="muted" className="mb-6">
          AppText component provides consistent typography with various variants, weights, and colors.
        </AppText>

        {/* Display Variants */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Display Variants</AppText>
          <View className="space-y-4">
            <AppText variant="display1">Display 1</AppText>
            <AppText variant="display2">Display 2</AppText>
            <AppText variant="display3">Display 3</AppText>
          </View>
        </View>

        {/* Heading Variants */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Heading Variants</AppText>
          <View className="space-y-3">
            <AppText variant="heading1">Heading 1</AppText>
            <AppText variant="heading2">Heading 2</AppText>
            <AppText variant="heading3">Heading 3</AppText>
            <AppText variant="heading4">Heading 4</AppText>
            <AppText variant="heading5">Heading 5</AppText>
          </View>
        </View>

        {/* Body Variants */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Body Variants</AppText>
          <View className="space-y-3">
            <AppText variant="bodyLarge">
              Body Large - This is larger body text for important paragraphs or introductions.
            </AppText>
            <AppText variant="body">
              Body - This is the standard body text used for most content. It provides good readability for paragraphs and general information.
            </AppText>
            <AppText variant="bodySmall">
              Body Small - This is smaller body text that can be used for less important information or when space is limited.
            </AppText>
          </View>
        </View>

        {/* Label & Caption Variants */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Label & Caption Variants</AppText>
          <View className="space-y-3">
            <AppText variant="label">Label - Used for form labels and section titles</AppText>
            <AppText variant="labelSmall">Label Small - Smaller labels for compact UIs</AppText>
            <AppText variant="caption">Caption - Used for image captions and supplementary text</AppText>
            <AppText variant="overline">Overline - Used for category headers</AppText>
          </View>
        </View>

        {/* Font Weights */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Font Weights</AppText>
          <View className="space-y-3">
            <AppText variant="body" weight="regular">Regular weight text (400)</AppText>
            <AppText variant="body" weight="medium">Medium weight text (500)</AppText>
            <AppText variant="body" weight="semibold">Semibold weight text (600)</AppText>
            <AppText variant="body" weight="bold">Bold weight text (700)</AppText>
          </View>
        </View>

        {/* Text Colors */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Text Colors</AppText>
          <View className="space-y-3">
            <AppText variant="body" color="default">Default text color</AppText>
            <AppText variant="body" color="primary">Primary text color</AppText>
            <AppText variant="body" color="secondary">Secondary text color</AppText>
            <AppText variant="body" color="muted">Muted text color</AppText>
            <AppText variant="body" color="success">Success text color</AppText>
            <AppText variant="body" color="warning">Warning text color</AppText>
            <AppText variant="body" color="error">Error text color</AppText>
          </View>
        </View>

        {/* Text Alignment */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Text Alignment</AppText>
          <View className="space-y-3">
            <AppText variant="body" align="left">Left aligned text (default)</AppText>
            <AppText variant="body" align="center">Center aligned text</AppText>
            <AppText variant="body" align="right">Right aligned text</AppText>
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">Usage Examples</AppText>
          
          {/* Article Example */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <AppText variant="overline" color="primary" className="mb-2">ARTICLE</AppText>
            <AppText variant="heading2" className="mb-2">Building Better Typography</AppText>
            <AppText variant="bodySmall" color="muted" className="mb-3">Published on May 15, 2023</AppText>
            <AppText variant="body" className="mb-3">
              Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
            </AppText>
            <AppText variant="label" color="primary">Read more →</AppText>
          </View>

          {/* Card Example */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <AppText variant="heading4" className="mb-2">Product Card</AppText>
            <AppText variant="body" className="mb-2">Premium Wireless Headphones</AppText>
            <AppText variant="heading3" color="primary" className="mb-1">$299.99</AppText>
            <AppText variant="caption" color="muted">Free shipping • In stock</AppText>
          </View>

          {/* Form Example */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <AppText variant="heading4" className="mb-4">Form Elements</AppText>
            <View className="mb-3">
              <AppText variant="label" className="mb-1">Email Address</AppText>
              <View className="h-10 bg-neutrals800 rounded-md" />
              <AppText variant="caption" color="muted" className="mt-1">We'll never share your email with anyone else.</AppText>
            </View>
            <View>
              <AppText variant="label" className="mb-1">Password</AppText>
              <View className="h-10 bg-neutrals800 rounded-md" />
              <AppText variant="caption" color="error" className="mt-1">Password must be at least 8 characters long.</AppText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppTextDemoScreen;
