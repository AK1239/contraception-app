import { useCallback } from "react";
import type { Section } from "../types/sections";
import type { AnswerState } from "../types/rules";
import type { AnswerValue } from "../types/questionnaire";
import { getVisibleSectionQuestions } from "../utils/sectionQuestionVisibility";
import { validateAnswer } from "../validators/answerValidators";

/**
 * Hook to validate section answers before proceeding
 */
export function useSectionValidation() {
  const validateSection = useCallback(
    (section: Section, answers: AnswerState): Record<string, string> => {
      const errors: Record<string, string> = {};
      const visibleQuestions = getVisibleSectionQuestions(section.questions, answers);

      for (const question of visibleQuestions) {
        const value = answers[question.id];
        const result = validateAnswer(question, value as AnswerValue | undefined);
        if (!result.valid && result.error) {
          errors[question.id] = result.error;
        }
      }

      return errors;
    },
    []
  );

  const isSectionValid = useCallback(
    (section: Section, answers: AnswerState): boolean => {
      const errors = validateSection(section, answers);
      return Object.keys(errors).length === 0;
    },
    [validateSection]
  );

  return { validateSection, isSectionValid };
}
