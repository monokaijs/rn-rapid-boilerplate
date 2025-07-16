# 🚀 React Native Rapid Boilerplate

A production-ready React Native boilerplate with modern architecture and comprehensive UI components. Built with TypeScript, Redux Toolkit, NativeWind, and React Navigation.

## ✨ Key Features

- **🧩 Rich UI Components** - 13+ pre-built components (Button, Input, Avatar, Badge, Checkbox, Switch, etc.)
- **🌍 Internationalization** - Multi-language support with react-i18next (English, Vietnamese)
- **🎨 Theme System** - Dark/Light mode with automatic detection and 100+ color tokens
- **📱 Type-safe Navigation** - React Navigation 7 with TypeScript integration
- **💾 MMKV Storage** - High-performance storage (10x faster than AsyncStorage)
- **🎯 Form Validation** - Zod schemas with TypeScript integration
- **🔄 Redux Toolkit** - State management with persistence
- **🎭 Animations** - Smooth animations with Reanimated 3
- **🛠️ Developer Tools** - ESLint, TypeScript, path aliases, custom hooks

## 🧩 UI Components

**13+ Pre-built Components with Variants:**
- `AppButton` - Multiple variants (primary, secondary, outline, ghost)
- `AppInput` - Text input with validation and icons
- `AppText` - Typography with i18n support and variants
- `Avatar` - User avatars with fallbacks
- `Badge` - Status indicators and labels
- `Checkbox` - Animated checkboxes with custom styling
- `Chip` - Tags and filters
- `Icon` - Lucide icons integration
- `MenuList` - Navigation and action lists
- `ProgressBar` - Animated progress indicators
- `Select` - Dropdown selections
- `Slider` - Range inputs
- `Switch` - Toggle controls with animations

## 🌍 Internationalization

- **Multi-language support** with react-i18next
- **Automatic language detection** from device settings
- **Built-in translations** for English and Vietnamese
- **Easy to extend** - just add new locale files
- **Component integration** - AppText automatically translates strings

## 🎨 Theme & Styling

- **Dark/Light mode** with system preference detection
- **100+ color tokens** with semantic naming
- **NativeWind 4** - Tailwind CSS for React Native
- **Typography system** with Source Sans Pro font
- **Class Variance Authority** for component variants

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native development environment
- Yarn 4.9.1+

### Installation

```bash
# Clone and install
git clone <your-repo-url>
cd react-native-boilerplate
yarn install

# iOS setup
cd ios && bundle install && bundle exec pod install && cd ..

# Start development
yarn start
yarn android  # or yarn ios
```

## 📁 Architecture

```
src/
├── components/
│   ├── ui/                 # 13+ UI components
│   ├── auth/              # Auth-specific components
│   └── helpers/           # Helper components
├── config/
│   ├── colors.ts          # Theme colors
│   ├── i18n.ts           # Internationalization
│   └── locales/          # Translation files
├── hooks/                 # Custom React hooks
├── navigation/            # Type-safe navigation
├── screens/              # Screen components
├── services/             # API services
├── store/                # Redux store + slices
├── types/                # TypeScript definitions
├── utils/                # Helper functions
└── validations/          # Zod schemas
```

**Key Features:**
- Modular component architecture
- Type-safe navigation with React Navigation 7
- Redux Toolkit with MMKV persistence
- Comprehensive validation with Zod
- Multi-language support with i18next

## 🛠️ Usage Examples

### Using UI Components

```tsx
import { AppButton, AppInput, AppText, Badge } from '@/components/ui';

// Button with variants
<AppButton variant="primary" size="lg">
  Primary Button
</AppButton>

// Input with validation
<AppInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  errorText={errors.email}
/>

// Text with i18n support
<AppText variant="heading1">WELCOME_MESSAGE</AppText>

// Badge with status
<Badge variant="success">Active</Badge>
```

### Theme & Colors

```tsx
import { useColors } from '@/hooks/useColors';

const MyComponent = () => {
  const colors = useColors(); // Auto theme-aware

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.primary }}>Themed content</Text>
    </View>
  );
};
```

### Internationalization

```tsx
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/config/i18n';

const LanguageSelector = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('SELECT_LANGUAGE')}</Text>
      <AppButton onPress={() => changeLanguage('vi')}>
        Tiếng Việt
      </AppButton>
    </View>
  );
};
```

### Form Validation

```tsx
import { z } from 'zod';
import { loginFormSchema } from '@/validations/common';

const LoginForm = () => {
  const handleSubmit = (data: unknown) => {
    const result = loginFormSchema.safeParse(data);
    if (result.success) {
      // Data is validated and typed
      login(result.data);
    }
  };
};
```

## 🔧 Scripts

```bash
yarn start              # Start Metro bundler
yarn android            # Run on Android
yarn ios               # Run on iOS
yarn generate-theme     # Generate theme files
```

## 📦 Tech Stack

**Core:** React Native 0.80, TypeScript 5.0, React 19.1
**State:** Redux Toolkit, MMKV Storage, Redux Persist
**Navigation:** React Navigation 7 (Stack + Tabs)
**Styling:** NativeWind 4, Tailwind CSS, Class Variance Authority
**UI:** Lucide Icons, React Native SVG, Reanimated 3
**i18n:** react-i18next, react-native-localize
**Validation:** Zod schemas
**Tools:** ESLint, Babel, Metro

## 🎣 Custom Hooks

- `useColors()` - Theme-aware color access
- `useInsets()` - Safe area insets management
- `useAppState()` - App foreground/background state
- `useAsyncStorage()` - MMKV storage with React state sync
- `useDebounce()` - Value debouncing for search/input

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Ready to build something amazing? Start customizing this boilerplate for your next project!**
