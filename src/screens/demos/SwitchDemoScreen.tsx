import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Switch} from '@/components/ui';
import {Bell, Bluetooth, Moon, PlaneIcon, Wifi} from 'lucide-react-native';
import {AppText as Text} from '@/components/ui';

const SwitchDemoScreen: React.FC = () => {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [primarySwitch, setPrimarySwitch] = useState(true);
  const [smallSwitch, setSmallSwitch] = useState(false);
  const [largeSwitch, setLargeSwitch] = useState(true);

  // Settings example
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    wifi: true,
    bluetooth: false,
    airplaneMode: false,
    autoSave: true,
    locationServices: false,
    faceId: true,
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Switch Component</Text>

        <Text className="text-neutrals400 mb-4">
          Switch component with smooth animations, multiple sizes, and customizable appearance.
        </Text>

        {/* Basic Switches */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Switches</Text>
          <View className="flex-col gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Default Switch (Off)</Text>
              <Switch
                value={basicSwitch}
                onValueChange={setBasicSwitch}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Default Switch (On)</Text>
              <Switch
                value={primarySwitch}
                onValueChange={setPrimarySwitch}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Disabled Switch (Off)</Text>
              <Switch
                value={false}
                onValueChange={() => {
                }}
                disabled
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Disabled Switch (On)</Text>
              <Switch
                value={true}
                onValueChange={() => {
                }}
                disabled
              />
            </View>
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="flex-col gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Small Switch</Text>
              <Switch
                value={smallSwitch}
                onValueChange={setSmallSwitch}
                size="sm"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Medium Switch (Default)</Text>
              <Switch
                value={basicSwitch}
                onValueChange={setBasicSwitch}
                size="md"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-foreground">Large Switch</Text>
              <Switch
                value={largeSwitch}
                onValueChange={setLargeSwitch}
                size="lg"
              />
            </View>
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>

          {/* App Settings */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-4">App Settings</Text>
            <View className="flex-col gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Bell size={20} color="#949494"/>
                  <View className="ml-3">
                    <Text className="text-foreground">Push Notifications</Text>
                    <Text className="text-neutrals400 text-sm">Receive app notifications</Text>
                  </View>
                </View>
                <Switch
                  value={settings.notifications}
                  onValueChange={() => updateSetting('notifications')}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Moon size={20} color="#949494"/>
                  <View className="ml-3">
                    <Text className="text-foreground">Dark Mode</Text>
                    <Text className="text-neutrals400 text-sm">Use dark theme</Text>
                  </View>
                </View>
                <Switch
                  value={settings.darkMode}
                  onValueChange={() => updateSetting('darkMode')}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-foreground">Auto-save Documents</Text>
                  <Text className="text-neutrals400 text-sm">Automatically save changes</Text>
                </View>
                <Switch
                  value={settings.autoSave}
                  onValueChange={() => updateSetting('autoSave')}
                />
              </View>
            </View>
          </View>

          {/* System Settings */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-4">System Settings</Text>
            <View className="flex-col gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Wifi size={20} color="#949494"/>
                  <Text className="text-foreground ml-3">Wi-Fi</Text>
                </View>
                <Switch
                  value={settings.wifi}
                  onValueChange={() => updateSetting('wifi')}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Bluetooth size={20} color="#949494"/>
                  <Text className="text-foreground ml-3">Bluetooth</Text>
                </View>
                <Switch
                  value={settings.bluetooth}
                  onValueChange={() => updateSetting('bluetooth')}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <PlaneIcon size={20} color="#949494"/>
                  <Text className="text-foreground ml-3">Airplane Mode</Text>
                </View>
                <Switch
                  value={settings.airplaneMode}
                  onValueChange={() => updateSetting('airplaneMode')}
                />
              </View>
            </View>
          </View>

          {/* Privacy Settings */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-4">Privacy & Security</Text>
            <View className="flex-col gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-foreground">Location Services</Text>
                  <Text className="text-neutrals400 text-sm">Allow apps to access your location</Text>
                </View>
                <Switch
                  value={settings.locationServices}
                  onValueChange={() => updateSetting('locationServices')}
                  size="sm"
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-foreground">Face ID</Text>
                  <Text className="text-neutrals400 text-sm">Use Face ID to unlock</Text>
                </View>
                <Switch
                  value={settings.faceId}
                  onValueChange={() => updateSetting('faceId')}
                  size="sm"
                />
              </View>
            </View>
          </View>

          {/* Feature Toggles */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-4">Feature Toggles</Text>
            <View className="flex-col gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Beta Features</Text>
                <Switch
                  value={false}
                  onValueChange={() => {
                  }}
                  size="sm"
                />
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Analytics</Text>
                <Switch
                  value={true}
                  onValueChange={() => {
                  }}
                  size="sm"
                />
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Crash Reporting</Text>
                <Switch
                  value={true}
                  onValueChange={() => {
                  }}
                  size="sm"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SwitchDemoScreen;
