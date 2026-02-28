import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Section } from "../types/sections";
import { SECTIONS } from "../config/sections";

/**
 * Returns SECTIONS with all user-facing text translated via i18n.
 * Section titles, question text, placeholders, help text, and option labels
 * are resolved using questionnaire.* keys.
 */
export function useTranslatedSections(): Section[] {
  const { t } = useTranslation();

  return useMemo(() => {
    return SECTIONS.map((section) => ({
      ...section,
      title: t(`questionnaire.sections.${section.key}`),
      questions: section.questions.map((q) => ({
        ...q,
        text: t(`questionnaire.questions.${q.id}`),
        metadata: q.metadata
          ? {
              ...q.metadata,
              placeholder: q.metadata.placeholder
                ? t(`questionnaire.placeholders.${q.id}`)
                : undefined,
              helpText: q.metadata.helpText
                ? t(`questionnaire.help.${q.id}`)
                : undefined,
              options: q.metadata.options?.map((opt) => ({
                ...opt,
                label: t(`questionnaire.options.${q.id}.${opt.value}`),
              })),
            }
          : undefined,
      })),
    }));
  }, [t]);
}
