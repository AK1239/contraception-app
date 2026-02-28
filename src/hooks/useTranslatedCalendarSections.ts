import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Section } from "../types/sections";
import { calendarMethodSections } from "../config/calendarMethodSections";

/**
 * Returns calendar method sections with all user-facing text translated via i18n.
 */
export function useTranslatedCalendarSections(): Record<string, Section> {
  const { t } = useTranslation();

  return useMemo(() => {
    const keys = Object.keys(calendarMethodSections) as (keyof typeof calendarMethodSections)[];
    const result: Record<string, Section> = {};

    for (const key of keys) {
      const section = calendarMethodSections[key];
      result[key] = {
        ...section,
        title: t(`calendar.sections.${key}`),
        questions: section.questions.map((q) => ({
          ...q,
          text: t(`calendar.questions.${q.id}`),
          metadata: q.metadata
            ? {
                ...q.metadata,
                helpText: q.metadata.helpText
                  ? t(`calendar.placeholders.${q.id}`)
                  : undefined,
              }
            : undefined,
        })),
      };
    }

    return result;
  }, [t]);
}
