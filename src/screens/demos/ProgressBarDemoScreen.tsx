import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProgressBar, AppButton } from '@/components/ui';

const ProgressBarDemoScreen: React.FC = () => {
  const [dynamicProgress, setDynamicProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulate dynamic progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicProgress(prev => {
        const next = prev + Math.random() * 10;
        return next >= 100 ? 0 : next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const simulateDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const next = prev + Math.random() * 12;
        if (next >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">ProgressBar Component</Text>
        
        <Text className="text-neutrals400 mb-4">
          ProgressBar component with smooth animations, multiple variants, and customizable appearance.
        </Text>

        {/* Basic Progress Bars */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Progress Bars</Text>
          <View className="space-y-4">
            <ProgressBar value={25} label="Default Progress" showValue />
            <ProgressBar value={50} variant="primary" label="Primary Progress" showValue />
            <ProgressBar value={75} variant="success" label="Success Progress" showValue />
            <ProgressBar value={60} variant="warning" label="Warning Progress" showValue />
            <ProgressBar value={30} variant="error" label="Error Progress" showValue />
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="space-y-4">
            <ProgressBar value={40} size="sm" label="Small Progress" showValue />
            <ProgressBar value={65} size="md" label="Medium Progress" showValue />
            <ProgressBar value={80} size="lg" label="Large Progress" showValue />
          </View>
        </View>

        {/* Without Labels */}
        <View className="mb-8">
          <Text className="section-title mb-4">Without Labels</Text>
          <View className="space-y-3">
            <ProgressBar value={20} />
            <ProgressBar value={45} variant="primary" />
            <ProgressBar value={70} variant="success" />
            <ProgressBar value={90} variant="warning" />
          </View>
        </View>

        {/* Dynamic Progress */}
        <View className="mb-8">
          <Text className="section-title mb-4">Dynamic Progress</Text>
          <ProgressBar 
            value={dynamicProgress} 
            variant="primary" 
            label="Auto-updating Progress" 
            showValue 
          />
        </View>

        {/* Interactive Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Interactive Examples</Text>
          
          {/* File Upload Simulation */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">File Upload</Text>
            <ProgressBar 
              value={uploadProgress} 
              variant="primary" 
              label="Uploading document.pdf" 
              showValue 
              className="mb-3"
            />
            <AppButton 
              onPress={simulateUpload} 
              disabled={isUploading}
              variant="primary"
              size="sm"
            >
              {isUploading ? 'Uploading...' : 'Start Upload'}
            </AppButton>
          </View>

          {/* File Download Simulation */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">File Download</Text>
            <ProgressBar 
              value={downloadProgress} 
              variant="success" 
              label="Downloading app-update.zip" 
              showValue 
              className="mb-3"
            />
            <AppButton 
              onPress={simulateDownload} 
              disabled={isDownloading}
              variant="primary"
              size="sm"
            >
              {isDownloading ? 'Downloading...' : 'Start Download'}
            </AppButton>
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>
          
          {/* Profile Completion */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Profile Completion</Text>
            <ProgressBar 
              value={60} 
              variant="primary" 
              label="Complete your profile" 
              showValue 
            />
            <Text className="text-neutrals400 text-xs mt-2">
              Add a profile picture and bio to reach 100%
            </Text>
          </View>

          {/* Skill Levels */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Skill Levels</Text>
            <View className="space-y-3">
              <ProgressBar value={90} variant="success" label="React Native" showValue size="sm" />
              <ProgressBar value={75} variant="primary" label="TypeScript" showValue size="sm" />
              <ProgressBar value={60} variant="warning" label="GraphQL" showValue size="sm" />
              <ProgressBar value={40} variant="error" label="Swift" showValue size="sm" />
            </View>
          </View>

          {/* Project Status */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Project Progress</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-foreground text-sm mb-2">Mobile App Development</Text>
                <ProgressBar value={85} variant="success" showValue />
              </View>
              <View>
                <Text className="text-foreground text-sm mb-2">API Integration</Text>
                <ProgressBar value={45} variant="warning" showValue />
              </View>
              <View>
                <Text className="text-foreground text-sm mb-2">Testing & QA</Text>
                <ProgressBar value={20} variant="error" showValue />
              </View>
            </View>
          </View>

          {/* Storage Usage */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Storage Usage</Text>
            <ProgressBar 
              value={78} 
              variant="warning" 
              label="Storage Used: 7.8 GB of 10 GB" 
              showValue 
            />
            <Text className="text-neutrals400 text-xs mt-2">
              Consider upgrading your plan or cleaning up old files
            </Text>
          </View>

          {/* Battery Level */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-3">Battery Status</Text>
            <ProgressBar 
              value={25} 
              variant="error" 
              label="Battery Level" 
              showValue 
              size="lg"
            />
            <Text className="text-neutrals400 text-xs mt-2">
              Low battery - consider charging your device
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgressBarDemoScreen;
