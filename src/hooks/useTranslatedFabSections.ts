import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { FABSection } from "../config/fabSections";
import { FAB_SECTIONS } from "../config/fabSections";

/**
 * Returns FAB_SECTIONS with all user-facing text translated via i18n.
 */
export function useTranslatedFabSections(): FABSection[] {
  const { t } = useTranslation();

  return useMemo(() => {
    return FAB_SECTIONS.map((section) => ({
      ...section,
      title: t(`fab.sections.${section.key}`),
      questions: section.questions.map((q) => ({
        ...q,
        text: t(`fab.questions.${q.id}`),
        metadata: q.metadata
          ? {
              ...q.metadata,
              placeholder: q.metadata.placeholder
                ? t(`fab.placeholders.${q.id}`)
                : undefined,
              helpText: q.metadata.helpText
                ? t(`fab.help.${q.id}`)
                : undefined,
              options: q.metadata.options?.map((opt) => ({
                ...opt,
                label:
                  t(`fab.options.${q.id}.${opt.value}`) !==
                  `fab.options.${q.id}.${opt.value}`
                    ? t(`fab.options.${q.id}.${opt.value}`)
                    : opt.label,
              })),
            }
          : undefined,
      })),
    }));
  }, [t]);
}
