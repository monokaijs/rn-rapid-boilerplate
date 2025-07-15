import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Select, SelectOption } from '@/components/ui';

const SelectDemoScreen: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | number>('');
  const [selectedColor, setSelectedColor] = useState<string | number>('blue');
  const [selectedAnimals, setSelectedAnimals] = useState<(string | number)[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>('en');
  const [selectedPriority, setSelectedPriority] = useState<string | number>('medium');
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>(['work']);

  // Options data
  const countryOptions: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
  ];

  const colorOptions: SelectOption[] = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
  ];

  const animalOptions: SelectOption[] = [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Bird', value: 'bird' },
    { label: 'Fish', value: 'fish' },
    { label: 'Rabbit', value: 'rabbit' },
    { label: 'Hamster', value: 'hamster' },
  ];

  const languageOptions: SelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Japanese', value: 'ja' },
  ];

  const priorityOptions: SelectOption[] = [
    { label: 'Low Priority', value: 'low' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'High Priority', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  const categoryOptions: SelectOption[] = [
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Health', value: 'health' },
    { label: 'Finance', value: 'finance' },
    { label: 'Education', value: 'education' },
    { label: 'Travel', value: 'travel' },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Select Component</Text>
        
        <Text className="text-neutrals400 mb-4">
          Select component with single and multiple selection modes, search functionality, and customizable appearance.
        </Text>

        {/* Basic Select */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Select</Text>
          <View className="gap-4">
            <Select
              label="Country"
              placeholder="Select a country"
              options={countryOptions}
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              helperText="Choose your country of residence"
            />
            
            <Select
              label="Favorite Color"
              placeholder="Pick a color"
              options={colorOptions}
              value={selectedColor}
              onValueChange={setSelectedColor}
            />
          </View>
        </View>

        {/* Multiple Selection */}
        <View className="mb-8">
          <Text className="section-title mb-4">Multiple Selection</Text>
          <Select
            label="Favorite Animals"
            placeholder="Select multiple animals"
            options={animalOptions}
            value={selectedAnimals}
            onValueChange={setSelectedAnimals}
            multiple
            helperText="You can select multiple options"
          />
        </View>

        {/* With Search */}
        <View className="mb-8">
          <Text className="section-title mb-4">With Search</Text>
          <Select
            label="Language"
            placeholder="Search and select language"
            options={languageOptions}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            searchable
            helperText="Type to search for languages"
          />
        </View>

        {/* Disabled State */}
        <View className="mb-8">
          <Text className="section-title mb-4">Disabled State</Text>
          <Select
            label="Disabled Select"
            placeholder="Cannot select"
            options={colorOptions}
            value=""
            onValueChange={() => {}}
            disabled
            helperText="This select is disabled"
          />
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>
          
          {/* User Profile Form */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-4">User Profile Form</Text>
            <View className="gap-4">
              <Select
                label="Country"
                placeholder="Select your country"
                options={countryOptions}
                value={selectedCountry}
                onValueChange={setSelectedCountry}
                searchable
              />
              
              <Select
                label="Preferred Language"
                placeholder="Choose language"
                options={languageOptions}
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              />
            </View>
          </View>

          {/* Task Management */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-4">Task Management</Text>
            <View className="gap-4">
              <Select
                label="Priority Level"
                placeholder="Set priority"
                options={priorityOptions}
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              />
              
              <Select
                label="Categories"
                placeholder="Select categories"
                options={categoryOptions}
                value={selectedCategories}
                onValueChange={setSelectedCategories}
                multiple
              />
            </View>
          </View>

          {/* Filter Example */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-4">Content Filters</Text>
            <View className="gap-4">
              <Select
                label="Filter by Category"
                placeholder="All categories"
                options={categoryOptions}
                value={selectedCategories}
                onValueChange={setSelectedCategories}
                multiple
                helperText="Filter content by multiple categories"
              />
              
              <Select
                label="Sort by Priority"
                placeholder="Default sorting"
                options={priorityOptions}
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              />
            </View>
          </View>
        </View>

        {/* Current Selections Display */}
        <View className="mb-8">
          <Text className="section-title mb-4">Current Selections</Text>
          <View className="bg-neutrals900 p-4 rounded-xl">
            <View className="gap-2">
              <Text className="text-neutrals300 text-sm">
                Country: <Text className="text-foreground">{selectedCountry || 'None'}</Text>
              </Text>
              <Text className="text-neutrals300 text-sm">
                Color: <Text className="text-foreground">{selectedColor}</Text>
              </Text>
              <Text className="text-neutrals300 text-sm">
                Animals: <Text className="text-foreground">{selectedAnimals.length > 0 ? selectedAnimals.join(', ') : 'None'}</Text>
              </Text>
              <Text className="text-neutrals300 text-sm">
                Language: <Text className="text-foreground">{selectedLanguage}</Text>
              </Text>
              <Text className="text-neutrals300 text-sm">
                Priority: <Text className="text-foreground">{selectedPriority}</Text>
              </Text>
              <Text className="text-neutrals300 text-sm">
                Categories: <Text className="text-foreground">{selectedCategories.join(', ')}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SelectDemoScreen;
