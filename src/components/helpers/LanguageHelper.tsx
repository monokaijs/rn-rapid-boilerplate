import {useAppSelector} from "@/store/hooks.ts";
import {useEffect} from "react";
import {changeLanguage} from "@/config/i18n.ts";

export const LanguageHelper = () => {
  const {language} = useAppSelector(state => state.app);

  useEffect(() => {
    changeLanguage(language).then(() => {
      console.log('Changed to', language);
    })
  }, [language]);

  return <></>;
}
