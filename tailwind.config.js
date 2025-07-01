// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'sans-thin': ['"SourceSans3-Thin"'],
        'sans-extralight': ['"SourceSans3-ExtraLight"'],
        'sans-light': ['"SourceSans3-Light"'],
        'sans-regular': ['"SourceSans3-Regular"'],
        'sans-medium': ['"SourceSans3-Medium"'],
        'sans-semibold': ['"SourceSans3-SemiBold"'],
        'sans-bold': ['"SourceSans3-Bold"'],
        'sans-extrabold': ['"SourceSans3-ExtraBold"'],
        'sans-black': ['"SourceSans3-Black"'],
      },
      fontSize: {
        xs: 12,
        sm: 13,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
        '5xl': 36,
      },
      colors: {
        // Theme-aware colors using CSS custom properties
        'base-black': 'rgb(var(--color-base-black) / <alpha-value>)',
        'base-white': 'rgb(var(--color-base-white) / <alpha-value>)',

        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'primary100': 'rgb(var(--color-primary100) / <alpha-value>)',
        'primary200': 'rgb(var(--color-primary200) / <alpha-value>)',
        'primary300': 'rgb(var(--color-primary300) / <alpha-value>)',
        'primary400': 'rgb(var(--color-primary400) / <alpha-value>)',
        'primary500': 'rgb(var(--color-primary500) / <alpha-value>)',
        'primary600': 'rgb(var(--color-primary600) / <alpha-value>)',
        'primary700': 'rgb(var(--color-primary700) / <alpha-value>)',
        'primary800': 'rgb(var(--color-primary800) / <alpha-value>)',
        'primary900': 'rgb(var(--color-primary900) / <alpha-value>)',
        'primary1000': 'rgb(var(--color-primary1000) / <alpha-value>)',

        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',

        'neutrals100': 'rgb(var(--color-neutrals100) / <alpha-value>)',
        'neutrals200': 'rgb(var(--color-neutrals200) / <alpha-value>)',
        'neutrals300': 'rgb(var(--color-neutrals300) / <alpha-value>)',
        'neutrals400': 'rgb(var(--color-neutrals400) / <alpha-value>)',
        'neutrals500': 'rgb(var(--color-neutrals500) / <alpha-value>)',
        'neutrals600': 'rgb(var(--color-neutrals600) / <alpha-value>)',
        'neutrals700': 'rgb(var(--color-neutrals700) / <alpha-value>)',
        'neutrals800': 'rgb(var(--color-neutrals800) / <alpha-value>)',
        'neutrals900': 'rgb(var(--color-neutrals900) / <alpha-value>)',
        'neutrals1000': 'rgb(var(--color-neutrals1000) / <alpha-value>)',

        // Static colors (same in both themes)
        'success': '#a4f4e7',
        'warning': '#f4c790',
        'error': '#e4626f',
        'green': '#2fa450',
        'pink': '#ef5491',
        'locket-primary': '#EFAC01',
      }
    }
  },
};
