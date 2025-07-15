import {LanguageCode} from "@/config/i18n.ts";
import * as RNLocalize from "react-native-localize";

export const getDeviceLanguage = (): LanguageCode => {
  const locales = RNLocalize.getLocales();

  if (locales.length > 0) {
    const deviceLanguage = locales[0].languageCode as LanguageCode;

    // Check if device language is supported
    if (['en', 'es', 'fr'].includes(deviceLanguage)) {
      return deviceLanguage;
    }
  }

  // Fallback to English
  return 'en';
};
