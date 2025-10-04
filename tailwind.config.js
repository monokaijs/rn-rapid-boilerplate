// tailwind.config.js
const plugin = require('tailwindcss/plugin');
const {AppColors} = require('./src/config/colors');

function toKebab(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

const colorsConfig = Object.fromEntries(
  Object.entries(AppColors).map(([k, v]) => [toKebab(k), `rgb(var(--color-${toKebab(k)}) / <alpha-value>)`])
);

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
      colors: colorsConfig
    }
  },
};
