import { PersonalizationQuestion, PERSONALIZATION_QUESTIONS } from "../constants/questions";
import { PersonalizationState } from "../types";

/**
 * Get visible questions based on current personalization answers
 * Per ContraSafe algorithm:
 * Q1: Future pregnancy → Q1b (surgery, only if Q1=No) → Q2 (irregular periods) → Q3 (frequency) → Q3b (height/weight if every-3-weeks)
 */
export const getVisibleQuestions = (
  answers: PersonalizationState["answers"]
): PersonalizationQuestion[] => {
  const questions: PersonalizationQuestion[] = [];

  // Q1: Always show wantsFuturePregnancy
  const q1 = PERSONALIZATION_QUESTIONS.find((q) => q.id === "wantsFuturePregnancy");
  if (q1) questions.push(q1);

  const wantsFuturePregnancy = answers.wantsFuturePregnancy as boolean | undefined;

  // Q1b: Only if Q1 = No (doesn't want future pregnancy)
  if (wantsFuturePregnancy === false) {
    const q1b = PERSONALIZATION_QUESTIONS.find((q) => q.id === "wantsSurgicalMethod");
    if (q1b) questions.push(q1b);

    const wantsSurgicalMethod = answers.wantsSurgicalMethod as boolean | undefined;
    // If wants surgery, we're done - no more questions (early exit to results)
    if (wantsSurgicalMethod === true) {
      return questions;
    }
  }

  // Q2: Irregular periods (when: future pregnancy=Yes, OR future=No and surgery=No)
  const q2 = PERSONALIZATION_QUESTIONS.find((q) => q.id === "okayWithIrregularPeriods");
  if (q2) questions.push(q2);

  // Q3: Preferred frequency
  const q3 = PERSONALIZATION_QUESTIONS.find((q) => q.id === "preferredFrequency");
  if (q3) questions.push(q3);

  // Q3b: Height/weight only if every-3-weeks selected (for BMI check)
  const preferredFrequency = answers.preferredFrequency as string | undefined;
  if (preferredFrequency === "every-3-weeks") {
    const q3b = PERSONALIZATION_QUESTIONS.find((q) => q.id === "heightWeight");
    if (q3b) questions.push(q3b);
  }

  return questions;
};
