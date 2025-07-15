import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Slider } from '@/components/ui';
import { Volume2, VolumeX, Sun, Moon, Zap } from 'lucide-react-native';

const SliderDemoScreen: React.FC = () => {
  const [basicValue, setBasicValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [brightnessValue, setBrightnessValue] = useState(60);
  const [temperatureValue, setTemperatureValue] = useState(22);
  const [zoomValue, setZoomValue] = useState(1);
  const [opacityValue, setOpacityValue] = useState(100);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Slider Component</Text>
        
        <Text className="text-neutrals400 mb-4">
          Slider component with gesture-based value changes, customizable appearance, and smooth animations.
        </Text>

        {/* Basic Sliders */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Sliders</Text>
          <View className="space-y-6">
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="Basic Slider"
              showValue
            />
            
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="With Custom Range"
              minimumValue={-50}
              maximumValue={50}
              showValue
            />
            
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="With Step (10)"
              step={10}
              showValue
            />
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="space-y-6">
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="Small Slider"
              size="sm"
              showValue
            />
            
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="Medium Slider (Default)"
              size="md"
              showValue
            />
            
            <Slider
              value={basicValue}
              onValueChange={setBasicValue}
              label="Large Slider"
              size="lg"
              showValue
            />
          </View>
        </View>

        {/* Disabled State */}
        <View className="mb-8">
          <Text className="section-title mb-4">Disabled State</Text>
          <Slider
            value={25}
            onValueChange={() => {}}
            label="Disabled Slider"
            disabled
            showValue
          />
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>
          
          {/* Volume Control */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Volume Control</Text>
            <View className="flex-row items-center mb-2">
              <VolumeX size={20} color="#949494" />
              <View className="flex-1 mx-3">
                <Slider
                  value={volumeValue}
                  onValueChange={setVolumeValue}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                />
              </View>
              <Volume2 size={20} color="#949494" />
            </View>
            <Text className="text-neutrals400 text-xs text-center">
              Volume: {volumeValue}%
            </Text>
          </View>

          {/* Brightness Control */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Brightness Control</Text>
            <View className="flex-row items-center mb-2">
              <Moon size={20} color="#949494" />
              <View className="flex-1 mx-3">
                <Slider
                  value={brightnessValue}
                  onValueChange={setBrightnessValue}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                />
              </View>
              <Sun size={20} color="#949494" />
            </View>
            <Text className="text-neutrals400 text-xs text-center">
              Brightness: {brightnessValue}%
            </Text>
          </View>

          {/* Temperature Control */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Temperature Control</Text>
            <Slider
              value={temperatureValue}
              onValueChange={setTemperatureValue}
              minimumValue={16}
              maximumValue={30}
              step={0.5}
              label="Temperature"
              showValue
            />
            <Text className="text-neutrals400 text-xs text-center mt-1">
              {temperatureValue}°C
            </Text>
          </View>

          {/* Zoom Control */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Zoom Control</Text>
            <Slider
              value={zoomValue}
              onValueChange={setZoomValue}
              minimumValue={0.5}
              maximumValue={3}
              step={0.1}
              label="Zoom Level"
            />
            <Text className="text-neutrals400 text-xs text-center mt-1">
              {zoomValue.toFixed(1)}x
            </Text>
          </View>

          {/* Power Usage */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Power Usage</Text>
            <View className="flex-row items-center">
              <Zap size={20} color="#949494" />
              <View className="flex-1 ml-3">
                <Slider
                  value={75}
                  onValueChange={() => {}}
                  minimumValue={0}
                  maximumValue={100}
                  disabled
                  label="Current Power Usage"
                />
                <Text className="text-neutrals400 text-xs mt-1">
                  75W - Normal usage
                </Text>
              </View>
            </View>
          </View>

          {/* Opacity Control */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-3">Opacity Control</Text>
            <Slider
              value={opacityValue}
              onValueChange={setOpacityValue}
              minimumValue={0}
              maximumValue={100}
              step={5}
              label="Layer Opacity"
              showValue
            />
            <View 
              className="h-20 bg-primary rounded-lg mt-3"
              style={{ opacity: opacityValue / 100 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SliderDemoScreen;
