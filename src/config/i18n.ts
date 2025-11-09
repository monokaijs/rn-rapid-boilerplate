import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import vi from './locales/vi.json';
import bn from './locales/bn.json';
import cn from './locales/cn.json';
import fil from './locales/fil.json';
import fr from './locales/fr.json';
import hi from './locales/hi.json';
import id from './locales/id.json';
import ar from './locales/ar.json';

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    schema: en,
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    schema: vi,
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    schema: bn,
  },
  cn: {
    code: 'cn',
    name: 'Chinese',
    nativeName: '中文',
    schema: cn,
  },
  fil: {
    code: 'fil',
    name: 'Filipino',
    nativeName: 'Filipino',
    schema: fil,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    schema: fr,
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    schema: hi,
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    schema: id,
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    schema: ar,
  },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

const getDeviceLanguage = (): LanguageCode => {
  const locales = RNLocalize.getLocales();

  if (locales.length > 0) {
    const deviceLanguage = locales[0].languageCode as LanguageCode;

    if (Object.keys(LANGUAGES).includes(deviceLanguage)) {
      return deviceLanguage;
    }
  }

  return 'en';
};

const resources = {
  en: {translation: en},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    keySeparator: '.',
    nsSeparator: ':',
    returnEmptyString: false,
  });



Object.values(LANGUAGES).forEach(lang => {
  if (Object.keys(lang.schema).length > 0) {
    i18n.addResourceBundle(lang.code, 'translation', lang.schema, true, true);
  }
});

export const changeLanguage = async (languageCode: LanguageCode): Promise<void> => {
  await i18n.changeLanguage(languageCode);
};

export const getAvailableLanguages = () => {
  return Object.entries(LANGUAGES).map(([code, info]) => ({
    ...info,
  }));
};

export default i18n;
