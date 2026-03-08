import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ECP_SECTIONS } from "../config/ecpSections";

export interface ECPSectionConfig {
  key: string;
  title: string;
  questions: import("../types/sections").SectionQuestion[];
}

/**
 * Returns ECP_SECTIONS with all user-facing text translated via i18n.
 */
export function useTranslatedEcpSections(): ECPSectionConfig[] {
  const { t } = useTranslation();

  return useMemo(() => {
    return ECP_SECTIONS.map((section) => ({
      ...section,
      title: t(`ecp.sections.${section.key}`),
      questions: section.questions.map((q) => ({
        ...q,
        text: t(`ecp.questions.${q.id}`),
        metadata: q.metadata
          ? {
              ...q.metadata,
              placeholder: q.metadata.placeholder
                ? t(`ecp.placeholders.${q.id}`)
                : undefined,
            }
          : undefined,
      })),
    }));
  }, [t]);
}
