import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";

/**
 * Syncs the persisted language from Redux into i18next on app startup.
 * Must be rendered inside both <ReduxProvider> and the i18next context.
 * Renders no UI — purely a side-effect component.
 */
export default function LanguageSyncProvider() {
  const { i18n } = useTranslation();
  const code = useSelector((state: RootState) => state.language?.code);

  useEffect(() => {
    if (code && i18n.language !== code) {
      i18n.changeLanguage(code);
    }
  }, [code, i18n]);

  return null;
}
