# 🚀 React Native Boilerplate

A production-ready React Native boilerplate with modern architecture, comprehensive tooling, and best practices. Built with TypeScript, Redux Toolkit, NativeWind, and React Navigation.

## ✨ Features

### 🏗️ **Modern Architecture**
- **React Native 0.80** with full TypeScript support
- **Redux Toolkit** with MMKV persistence for lightning-fast storage
- **React Navigation 7** with type-safe navigation (Stack + Tab)
- **NativeWind 4** - Tailwind CSS for React Native with dark mode support
- **Modular folder structure** with clear separation of concerns

### 🎨 **UI & Theming**
- **Dark/Light theme system** with automatic system preference detection
- **Custom color palette** with comprehensive color tokens
- **Typography system** with Source Sans Pro font family
- **Responsive design utilities** with safe area handling
- **Class Variance Authority** for component variants

### 🔧 **Developer Experience**
- **Path aliases** (`@/` for src folder) configured in Metro, Babel, and TypeScript
- **Custom hooks** for common patterns (storage, debounce, app state)
- **Utility functions** for styling, validation, and helpers
- **ESLint & Prettier** with React Native specific rules
- **Hot reload** and fast refresh for rapid development

### 📱 **Production Ready**
- **Type-safe navigation** with proper TypeScript integration
- **Form validation** with Zod schemas
- **API service layer** with error handling
- **MMKV storage** for high-performance data persistence
- **Safe area context** for modern device support

## 📱 What's Included

### 🏠 **Screens**
- **Home Screen** - Welcome screen showcasing boilerplate features
- **Settings Screen** - Theme switching and app configuration
- **More Screen** - Navigation hub with additional options

### 🧩 **Components**
- **UI Components** - Reusable components with variant support
  - `AppButton` - Customizable button with multiple variants
  - `LoadingScreen` - Elegant loading state component
- **Layout Components** - Screen wrappers and containers

### 🎣 **Custom Hooks**
- `useColors()` - Theme-aware color access
- `useInsets()` - Safe area insets management
- `useAppState()` - App foreground/background state
- `useAsyncStorage()` - MMKV storage with React state sync
- `useDebounce()` - Value debouncing for search/input

### 🛠️ **Utilities**
- **Styling utilities** - `createStyles()` for theme-aware styles
- **Typography system** - Predefined text styles and font weights
- **Helper functions** - Common utilities for data manipulation
- **Validation schemas** - Zod-based form and data validation

### ⚙️ **Configuration**
- **Metro config** - Path aliases and NativeWind integration
- **Babel config** - Module resolution and NativeWind preset
- **TypeScript config** - Strict typing with path mapping
- **Tailwind config** - Custom fonts, colors, and responsive design

## 🛠 Getting Started

### Prerequisites

Ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide for your target platform(s).

**Required:**
- Node.js 18+ (LTS recommended)
- Yarn 4.9.1+ (configured as package manager)
- React Native CLI
- Xcode 14+ (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-native-boilerplate
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup** (iOS only)
   ```bash
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   yarn start
   ```

5. **Run the application**
   ```bash
   # Android
   yarn android

   # iOS
   yarn ios
   ```

### 🔧 Troubleshooting

**Metro bundler issues:**
```bash
# Clear Metro cache
yarn start --reset-cache

# Clean and rebuild
yarn android --clean  # or yarn ios --clean
```

**iOS build issues:**
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
rm -rf ios/build

# Reinstall pods
cd ios && bundle exec pod deintegrate && bundle exec pod install && cd ..
```

**Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Android project
cd android && ./gradlew cleanBuildCache && cd ..
```

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── ui/                 # Basic UI components (buttons, inputs, etc.)
│   │   └── AppButton.tsx   # Customizable button with variants
│   ├── LoadingScreen.tsx   # App loading state component
│   └── index.ts           # Component exports
├── config/                 # App configuration
│   ├── colors.ts          # Theme color definitions (dark/light)
│   └── global.css         # Global Tailwind CSS styles
├── hooks/                  # Custom React hooks
│   ├── useAppState.ts     # App foreground/background state
│   ├── useAsyncStorage.ts # MMKV storage with React state
│   ├── useColors.ts       # Theme-aware color access
│   ├── useDebounce.ts     # Value debouncing utility
│   ├── useInsets.ts       # Safe area insets access
│   └── index.ts           # Hook exports
├── navigation/             # Navigation configuration
│   ├── MainTabNavigator.tsx # Bottom tab navigation
│   ├── RootNavigator.tsx   # Root stack navigation
│   └── types.ts           # Navigation type definitions
├── screens/               # Screen components
│   ├── HomeScreen.tsx     # Main welcome screen
│   ├── MoreScreen.tsx     # More options screen
│   └── SettingsScreen.tsx # App settings screen
├── services/              # External service integrations
│   └── api.service.ts     # HTTP API service layer
├── store/                 # Redux store configuration
│   ├── slices/           # Redux Toolkit slices
│   │   └── appSlice.ts   # App state (theme, insets, etc.)
│   ├── hooks.ts          # Typed Redux hooks
│   └── index.ts          # Store configuration with persistence
├── types/                 # TypeScript type definitions
│   └── common.ts         # Shared type definitions
├── utils/                 # Utility functions
│   ├── createStyles.ts   # Theme-aware style creation
│   ├── getTextStyles.ts  # Typography style definitions
│   ├── helpers.ts        # Common helper functions
│   └── index.ts          # Utility exports
└── validations/           # Form validation schemas
    └── common.ts         # Zod validation schemas
```

### 🏗️ Architecture Overview

This boilerplate follows a **feature-based architecture** with clear separation of concerns:

- **Components**: Reusable UI components with variant support using Class Variance Authority
- **Hooks**: Custom React hooks for common patterns and state management
- **Navigation**: Type-safe navigation with React Navigation 7
- **Store**: Redux Toolkit with MMKV persistence for optimal performance
- **Services**: External API integration layer with error handling
- **Utils**: Helper functions and styling utilities
- **Validation**: Zod-based schemas for type-safe data validation

## 🎨 Customization Guide

### 1. 🏷️ App Name & Branding

Update your app identity across all platforms:

**Core Configuration:**
```bash
# Update package.json
"name": "your-app-name"

# Update app.json
{
  "name": "YourAppName",
  "displayName": "Your App Display Name"
}
```

**Platform-specific:**
- **Android**: `android/app/src/main/res/values/strings.xml`
- **iOS**: `ios/ReactNativeBoilerplate/Info.plist` (CFBundleDisplayName)

### 2. 🎨 Colors & Theme System

The boilerplate includes a comprehensive color system with dark/light mode support:

```typescript
// src/config/colors.ts
export const AppColors = {
  // Primary brand colors
  primaryPrimary: '#e85a5a',        // Main brand color
  background: '#fafafa',            // Background color
  foreground: '#0a0b0a',            // Foreground color

  // Semantic colors
  successSuccess: '#a4f4e7',        // Success states
  warningWarning: '#f4c790',        // Warning states
  errorError: '#e4626f',            // Error states

  // Neutral palette
  neutralsNeutrals800: '#1d1d1d',   // Dark surfaces
  neutralsNeutrals400: '#6e6e6e',   // Muted text
  // ... 100+ color tokens
};
```

**Using colors in components:**
```tsx
import { useColors } from '@/hooks/useColors';

const MyComponent = () => {
  const colors = useColors(); // Automatically theme-aware

  return (
    <View style={{ backgroundColor: colors.baseBackground }}>
      <Text style={{ color: colors.primaryPrimary }}>
        Themed content
      </Text>
    </View>
  );
};
```

### 3. 📱 Adding New Screens

**Step 1: Create the screen component**
```tsx
// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RootStackScreenProps } from '@/navigation/types';

type Props = RootStackScreenProps<'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
```

**Step 2: Add route types**
```tsx
// src/navigation/types.ts
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
  Profile: { userId: string }; // Add your new route
};
```

**Step 3: Add to navigator**
```tsx
// src/navigation/RootNavigator.tsx
import ProfileScreen from '@/screens/ProfileScreen';

// Add to Stack.Navigator
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{ title: "Profile" }}
/>
```

### 4. 🗄️ Adding Redux State

**Step 1: Create a new slice**
```tsx
// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
```

**Step 2: Add to store**
```typescript
// src/store/index.ts
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice, // Add your slice
});
```

**Step 3: Create custom hook**
```typescript
// src/hooks/useUser.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, setLoading } from '@/store/slices/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector(state => state.user);

  const updateUser = (user: User) => {
    dispatch(setUser(user));
  };

  return {
    currentUser,
    isLoading,
    updateUser,
  };
};
```

## 🔧 Available Scripts

```bash
# Development
yarn start              # Start Metro bundler
yarn start --reset-cache # Start Metro with cache reset

# Platform-specific builds
yarn android            # Run on Android device/emulator
yarn android --clean    # Clean build for Android
yarn ios               # Run on iOS simulator
yarn ios --clean       # Clean build for iOS

# Code quality
yarn lint              # Run ESLint
yarn lint --fix        # Fix ESLint issues automatically
yarn test             # Run Jest tests
yarn test --watch     # Run tests in watch mode

# Utilities
yarn reset-cache       # Clear Metro and npm cache
yarn clean-install     # Clean node_modules and reinstall
```

## 📦 Key Dependencies

### 🏗️ **Core Framework**
- **react-native@0.80** - Latest React Native with New Architecture support
- **react@19.1** - Latest React with concurrent features
- **typescript@5.0** - Type safety and developer experience

### 🗄️ **State Management**
- **@reduxjs/toolkit@2.8** - Modern Redux with less boilerplate
- **react-redux@9.2** - React bindings for Redux
- **redux-persist@6.0** - Persist Redux state across app launches
- **react-native-mmkv@3.3** - High-performance storage (10x faster than AsyncStorage)

### 🧭 **Navigation**
- **@react-navigation/native@7.1** - Routing and navigation
- **@react-navigation/native-stack@7.3** - Native stack navigator
- **@react-navigation/bottom-tabs@7.4** - Bottom tab navigator
- **react-native-screens@4.11** - Native screen optimization
- **react-native-safe-area-context@5.4** - Safe area handling

### 🎨 **Styling & UI**
- **nativewind@4.1** - Tailwind CSS for React Native
- **tailwindcss@3.4** - Utility-first CSS framework
- **class-variance-authority@0.7** - Component variant management
- **lucide-react-native@0.525** - Beautiful, customizable icons
- **react-native-svg@15.12** - SVG support for React Native

### 🛠️ **Development Tools**
- **@react-native/eslint-config@0.80** - ESLint configuration for React Native
- **@react-native/typescript-config@0.80** - TypeScript configuration
- **babel-plugin-module-resolver@5.0** - Path alias support
- **react-native-reanimated@3.18** - Smooth animations and gestures

### ✅ **Validation & Utilities**
- **zod@3.25** - TypeScript-first schema validation
- **clsx@2.1** - Conditional className utility
- **tailwind-merge@3.3** - Merge Tailwind classes intelligently

## 🚀 Advanced Features

### 🎨 Theme System

The boilerplate includes a sophisticated theme system with automatic dark/light mode detection:

```typescript
// Toggle theme programmatically
import { useAppDispatch } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/appSlice';

const dispatch = useAppDispatch();
dispatch(toggleTheme()); // Switches between light/dark
```

### 💾 MMKV Storage

High-performance storage that's 10x faster than AsyncStorage:

```typescript
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

const [userData, setUserData, removeUserData, loading] = useAsyncStorage('user', null);

// Automatically synced with React state
setUserData({ name: 'John', email: 'john@example.com' });
```

### 🎣 Custom Hooks

**useDebounce** - Optimize search and input performance:
```typescript
import { useDebounce } from '@/hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 300);

// API call only triggers after 300ms of no typing
useEffect(() => {
  if (debouncedSearchTerm) {
    searchAPI(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

**useAppState** - Handle app foreground/background:
```typescript
import { useAppState } from '@/hooks/useAppState';

const appState = useAppState();

useEffect(() => {
  if (appState === 'active') {
    // Refresh data when app comes to foreground
    refreshData();
  }
}, [appState]);
```

### 🎯 Form Validation

Type-safe form validation with Zod:

```typescript
import { validateData, loginFormSchema } from '@/validations/common';

const handleLogin = (formData: unknown) => {
  const result = validateData(loginFormSchema, formData);

  if (result.isValid) {
    // Form data is now typed and validated
    login(result.data);
  } else {
    // Show validation errors
    setErrors(result.errors);
  }
};
```

## 🎯 Development Workflow

### 1. **Project Setup**
- Clone and install dependencies
- Configure your IDE with TypeScript and ESLint
- Set up your development environment

### 2. **Feature Development**
- Create feature branch from main
- Add screens, components, and logic
- Write tests for critical functionality
- Update documentation as needed

### 3. **Code Quality**
- Run ESLint and fix issues
- Ensure TypeScript compilation
- Test on both iOS and Android
- Review performance implications

### 4. **Deployment Preparation**
- Update app version and build numbers
- Test on physical devices
- Optimize bundle size
- Prepare store assets

## 🔧 Configuration Files

### **Metro Configuration** (`metro.config.js`)
- Path aliases (`@/` → `src/`)
- NativeWind integration
- Asset resolution

### **Babel Configuration** (`babel.config.js`)
- Module resolver for path aliases
- NativeWind preset
- React Native preset

### **TypeScript Configuration** (`tsconfig.json`)
- Strict type checking
- Path mapping for imports
- React JSX support

### **Tailwind Configuration** (`tailwind.config.js`)
- Custom font families (Source Sans Pro)
- Extended color palette
- Dark mode support
- Custom font sizes and spacing

## 📚 Learn More

### **Official Documentation**
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [NativeWind Documentation](https://www.nativewind.dev/)

### **Advanced Topics**
- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [MMKV Performance Guide](https://github.com/mrousavy/react-native-mmkv)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [TypeScript React Native Guide](https://reactnative.dev/docs/typescript)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the coding standards** (ESLint, Prettier, TypeScript)
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to the branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### **Code Standards**
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the React Native community**

Ready to build something amazing? Start customizing this boilerplate for your next project!
