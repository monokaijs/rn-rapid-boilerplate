import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Checkbox } from '@/components/ui';

const CheckboxDemoScreen: React.FC = () => {
  const [basicCheckbox, setBasicCheckbox] = useState(false);
  const [primaryCheckbox, setPrimaryCheckbox] = useState(true);
  const [smallCheckbox, setSmallCheckbox] = useState(false);
  const [largeCheckbox, setLargeCheckbox] = useState(true);
  
  // Todo list example
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project documentation', completed: false },
    { id: 2, text: 'Review pull requests', completed: true },
    { id: 3, text: 'Update dependencies', completed: false },
    { id: 4, text: 'Write unit tests', completed: false },
    { id: 5, text: 'Deploy to staging', completed: true },
  ]);

  // Settings example
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
    newsletter: true,
  });

  // Permissions example
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    location: true,
    contacts: false,
    storage: true,
  });

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-foreground text-2xl font-sans-bold mb-6">Checkbox Component</Text>
        
        <Text className="text-neutrals400 mb-4">
          Checkbox component with smooth animations, multiple sizes, and variants.
        </Text>

        {/* Basic Checkboxes */}
        <View className="mb-8">
          <Text className="section-title mb-4">Basic Checkboxes</Text>
          <View className="gap-4">
            <Checkbox
              checked={basicCheckbox}
              onValueChange={setBasicCheckbox}
              label="Default checkbox"
            />
            <Checkbox
              checked={primaryCheckbox}
              onValueChange={setPrimaryCheckbox}
              label="Primary checkbox"
              variant="primary"
            />
            <Checkbox
              checked={true}
              onValueChange={() => {}}
              label="Disabled checked"
              disabled
            />
            <Checkbox
              checked={false}
              onValueChange={() => {}}
              label="Disabled unchecked"
              disabled
            />
          </View>
        </View>

        {/* Size Variants */}
        <View className="mb-8">
          <Text className="section-title mb-4">Size Variants</Text>
          <View className="gap-4">
            <Checkbox
              checked={smallCheckbox}
              onValueChange={setSmallCheckbox}
              label="Small checkbox"
              size="sm"
            />
            <Checkbox
              checked={basicCheckbox}
              onValueChange={setBasicCheckbox}
              label="Medium checkbox (default)"
              size="md"
            />
            <Checkbox
              checked={largeCheckbox}
              onValueChange={setLargeCheckbox}
              label="Large checkbox"
              size="lg"
            />
          </View>
        </View>

        {/* Without Labels */}
        <View className="mb-8">
          <Text className="section-title mb-4">Without Labels</Text>
          <View className="flex-row items-center gap-4">
            <Checkbox
              checked={basicCheckbox}
              onValueChange={setBasicCheckbox}
            />
            <Checkbox
              checked={primaryCheckbox}
              onValueChange={setPrimaryCheckbox}
              variant="primary"
            />
            <Checkbox
              checked={true}
              onValueChange={() => {}}
              disabled
            />
          </View>
        </View>

        {/* Usage Examples */}
        <View className="mb-8">
          <Text className="section-title mb-4">Usage Examples</Text>
          
          {/* Todo List */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">Todo List</Text>
            <View className="gap-3">
              {todos.map((todo) => (
                <Checkbox
                  key={todo.id}
                  checked={todo.completed}
                  onValueChange={() => toggleTodo(todo.id)}
                  label={todo.text}
                  variant="primary"
                  labelClassName={todo.completed ? 'line-through text-neutrals500' : ''}
                />
              ))}
            </View>
          </View>

          {/* Settings */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">App Settings</Text>
            <View className="gap-4">
              <Checkbox
                checked={settings.notifications}
                onValueChange={() => updateSetting('notifications')}
                label="Push notifications"
              />
              <Checkbox
                checked={settings.darkMode}
                onValueChange={() => updateSetting('darkMode')}
                label="Dark mode"
              />
              <Checkbox
                checked={settings.autoSave}
                onValueChange={() => updateSetting('autoSave')}
                label="Auto-save documents"
              />
              <Checkbox
                checked={settings.analytics}
                onValueChange={() => updateSetting('analytics')}
                label="Share analytics data"
              />
              <Checkbox
                checked={settings.newsletter}
                onValueChange={() => updateSetting('newsletter')}
                label="Subscribe to newsletter"
              />
            </View>
          </View>

          {/* Permissions */}
          <View className="bg-neutrals900 p-4 rounded-xl mb-4">
            <Text className="text-neutrals300 text-sm mb-3">App Permissions</Text>
            <View className="gap-4">
              <Checkbox
                checked={permissions.camera}
                onValueChange={() => updatePermission('camera')}
                label="Camera access"
                variant="primary"
              />
              <Checkbox
                checked={permissions.microphone}
                onValueChange={() => updatePermission('microphone')}
                label="Microphone access"
                variant="primary"
              />
              <Checkbox
                checked={permissions.location}
                onValueChange={() => updatePermission('location')}
                label="Location services"
                variant="primary"
              />
              <Checkbox
                checked={permissions.contacts}
                onValueChange={() => updatePermission('contacts')}
                label="Contacts access"
                variant="primary"
              />
              <Checkbox
                checked={permissions.storage}
                onValueChange={() => updatePermission('storage')}
                label="Storage access"
                variant="primary"
              />
            </View>
          </View>

          {/* Form Example */}
          <View className="bg-neutrals900 p-4 rounded-xl">
            <Text className="text-neutrals300 text-sm mb-3">Terms & Conditions</Text>
            <View className="gap-3">
              <Checkbox
                checked={false}
                onValueChange={() => {}}
                label="I agree to the Terms of Service"
                size="sm"
              />
              <Checkbox
                checked={false}
                onValueChange={() => {}}
                label="I agree to the Privacy Policy"
                size="sm"
              />
              <Checkbox
                checked={false}
                onValueChange={() => {}}
                label="I want to receive marketing emails"
                size="sm"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckboxDemoScreen;
