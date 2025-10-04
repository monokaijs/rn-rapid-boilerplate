# 🚀 React Native Rapid Boilerplate

A production-ready React Native boilerplate with modern architecture and comprehensive UI components. Built with TypeScript, Redux Toolkit, NativeWind, and React Navigation.

## 📖 How to Use This Boilerplate

### Customize Your App

After cloning this boilerplate, follow these steps to make it your own:

#### 1. Change App Name and Bundle ID

Use `react-native-rename` to rename your app:

```bash
# Install react-native-rename globally
npm install -g react-native-rename

# Rename your app
npx react-native-rename "Your App Name" -b com.yourcompany.yourapp

# For iOS, you may need to run pod install again
cd ios && bundle exec pod install && cd ..
```

**Note:** This will update:
- App display name
- Bundle identifier (iOS)
- Package name (Android)
- Project files and configurations

#### 2. Change App Icon

Use `rn-app-icons` to generate app icons from a single source image:

```bash
# Install the package
yarn add -D rn-app-icons

# Generate icons from your source image
npx rn-app-icons --input ./path/to/your-icon.png

# Generate for specific platform only
npx rn-app-icons --input ./icon.png --platforms ios
npx rn-app-icons --input ./icon.png --platforms android

# Generate with notification icons and Play Store icon
npx rn-app-icons --input ./icon.png --notification --playstore

# Clear output directory before generating
npx rn-app-icons --input ./icon.png --clear
```

**Icon Requirements:**
- Format: PNG (recommended)
- Size: At least 1024x1024px
- Square image required for best results
- Auto-detects React Native project structure and places icons in correct locations

**What Gets Generated:**
- iOS: All required app icon sizes + App Store icon (1024x1024) + Contents.json
- Android: All density variants (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) + round icons
- Optional: Notification icons (--notification flag)
- Optional: Play Store icon 512x512 (--playstore flag)

See [rn-app-icons documentation](https://www.npmjs.com/package/rn-app-icons) for more options.

#### 3. Update About Screen

Edit `src/screens/AboutScreen.tsx` to reflect your project information:
- Project name and author
- Contact information
- Links (GitHub, website, social media)

Update translations in:
- `src/config/locales/en.json`
- `src/config/locales/vi.json`

## ✨ Key Features

- **🧩 Rich UI Components** - 13+ pre-built components (Button, Input, Avatar, Badge, Checkbox, Switch, etc.)
- **📝 Form System** - Complete form management inspired by react-hook-form & shadcn/ui
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

**Form Components:**
- `Form` - Root form context provider
- `FormField` - Controller with render prop pattern
- `FormItem` - Layout wrapper for form fields
- `FormLabel` - Label with error state styling
- `FormControl` - Input wrapper component
- `FormDescription` - Helper text display
- `FormMessage` - Error message component

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

**Pre-built Screens:**
- Home - Dashboard with sample content
- More - Settings and navigation hub
- Settings - Theme and language preferences
- About - Project information and contact links
- Components Demo - Interactive UI component showcase
- Auth Screens - Login and Register examples

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

### Form System

```tsx
import { useForm } from '@/hooks/useForm';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, AppInput, AppButton } from '@/components/ui';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;

function LoginForm() {
  const form = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    validationSchema: formSchema,
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <AppInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <AppButton onPress={form.handleSubmit(onSubmit)}>Submit</AppButton>
    </Form>
  );
}
```

See [Form Documentation](docs/FORMS.md) for complete guide.

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
