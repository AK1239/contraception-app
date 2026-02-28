import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";
import { setLanguage } from "../store/slices/language";
import type { LanguageCode } from "../i18n/config";
import { SUPPORTED_LANGUAGES } from "../i18n/config";

/**
 * Returns the current language code and a setter that updates both Redux
 * (for persistence) and i18next (for immediate UI update).
 */
export function useLanguage() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const code = useSelector((state: RootState) => state.language?.code) ?? "en";

  const changeLanguage = useCallback(
    (lang: LanguageCode) => {
      i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
    },
    [dispatch, i18n]
  );

  return {
    language: code as LanguageCode,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}
