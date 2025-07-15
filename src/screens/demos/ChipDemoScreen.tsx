import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Chip } from '@/components/ui';
import { Home, Star, Heart, User, Settings, Filter } from 'lucide-react-native';

const ChipDemoScreen: React.FC = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['react', 'typescript']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleChip = (chipId: string, stateArray: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev =>
      prev.includes(chipId)
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  const removeChip = (chipId: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => prev.filter(id => id !== chipId));
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Chip Component</Text>

        <Text className="text-neutrals400 mb-4">
          Chip component provides interactive tags with optional close button, selection states, and icons.
        </Text>

        {/* Basic Chips */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Chips</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Chip>Default</Chip>
            <Chip variant="primary">Primary</Chip>
            <Chip variant="secondary">Secondary</Chip>
            <Chip variant="outline">Outline</Chip>
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="flex-row flex-wrap items-center gap-2 mb-4">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </View>
        </View>

        {/* Selectable Chips */}
        <View className="mb-8">
          <Text className="section-title mb-4">Selectable Chips</Text>
          <Text className="text-neutrals400 text-sm mb-3">Click to select/deselect</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['react', 'typescript', 'javascript', 'nodejs', 'python'].map((tech) => (
              <Chip
                key={tech}
                selected={selectedChips.includes(tech)}
                onPress={() => toggleChip(tech, selectedChips, setSelectedChips)}
              >
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </Chip>
            ))}
          </View>
        </View>

        {/* Chips with Icons */}
        <View className="mb-8">
          <Text className="section-title mb-4">Chips with Icons</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            <Chip icon={<Home />}>Home</Chip>
            <Chip icon={<Star />} variant="primary">Favorites</Chip>
            <Chip icon={<Heart />} variant="secondary">Liked</Chip>
            <Chip icon={<User />} variant="outline">Profile</Chip>
            <Chip icon={<Settings />}>Settings</Chip>
          </View>
        </View>

        {/* Closable Chips */}
        <View className="mb-8">
          <Text className="section-title mb-4">Closable Chips</Text>
          <Text className="text-neutrals400 text-sm mb-3">Click X to remove</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {selectedTags.length === 0 ? (
              <Text className="text-neutrals500 italic">No tags selected</Text>
            ) : (
              selectedTags.map((tag) => (
                <Chip
                  key={tag}
                  closable
                  onClose={() => removeChip(tag, setSelectedTags)}
                  variant="primary"
                >
                  {tag}
                </Chip>
              ))
            )}
          </View>
          <Text className="text-neutrals400 text-sm mb-2">Add tags:</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Design', 'Development', 'Testing', 'Documentation'].map((tag) => (
              <Chip
                key={tag}
                onPress={() => {
                  if (!selectedTags.includes(tag)) {
                    setSelectedTags(prev => [...prev, tag]);
                  }
                }}
                variant="outline"
                disabled={selectedTags.includes(tag)}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </View>

        {/* Filter Chips */}
        <View className="mb-8">
          <Text className="section-title mb-4">Filter Chips</Text>
          <View className="flex-row items-center mb-3">
            <Filter size={16} color="#949494" />
            <Text className="text-neutrals400 text-sm ml-2">Filter by category:</Text>
          </View>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['all', 'work', 'personal', 'urgent', 'completed'].map((filter) => (
              <Chip
                key={filter}
                selected={selectedFilters.includes(filter)}
                onPress={() => toggleChip(filter, selectedFilters, setSelectedFilters)}
                variant="outline"
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Chip>
            ))}
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>

          {/* Skills Section */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">User Skills</Text>
            <View className="flex-row flex-wrap gap-2">
              <Chip variant="primary" size="sm">React Native</Chip>
              <Chip variant="primary" size="sm">TypeScript</Chip>
              <Chip variant="secondary" size="sm">UI/UX Design</Chip>
              <Chip variant="secondary" size="sm">Node.js</Chip>
              <Chip size="sm">GraphQL</Chip>
            </View>
          </View>

          {/* Article Tags */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-2">Article Tags</Text>
            <Text className="text-foreground mb-3">Building Modern Mobile Apps</Text>
            <View className="flex-row flex-wrap gap-2">
              <Chip variant="outline" size="sm">Mobile</Chip>
              <Chip variant="outline" size="sm">Development</Chip>
              <Chip variant="outline" size="sm">Tutorial</Chip>
              <Chip variant="outline" size="sm">Beginner</Chip>
            </View>
          </View>

          {/* Status Chips */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-3">Project Status</Text>
            <View className="flex-col gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">Mobile App Redesign</Text>
                <Chip variant="primary" size="sm">In Progress</Chip>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">API Documentation</Text>
                <Chip variant="secondary" size="sm">Completed</Chip>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground">User Testing</Text>
                <Chip variant="outline" size="sm">Pending</Chip>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChipDemoScreen;
