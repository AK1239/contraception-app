import { PersonalizationQuestion, PERSONALIZATION_QUESTIONS } from "../constants/questions";
import { PersonalizationState } from "../types";

/**
 * Get visible questions based on current personalization answers
 * This implements the conditional logic for showing/hiding questions
 */
export const getVisibleQuestions = (
  answers: PersonalizationState["answers"]
): PersonalizationQuestion[] => {
  const questions: PersonalizationQuestion[] = [];

  // Question 1: Always show wantsFuturePregnancy
  const wantsFuturePregnancyQuestion = PERSONALIZATION_QUESTIONS.find(
    (q) => q.id === "wantsFuturePregnancy"
  );
  if (wantsFuturePregnancyQuestion) {
    questions.push(wantsFuturePregnancyQuestion);
  }

  const wantsFuturePregnancy = answers.wantsFuturePregnancy;

  if (wantsFuturePregnancy === false) {
    // Show surgical method question
    const wantsSurgicalMethodQuestion = PERSONALIZATION_QUESTIONS.find(
      (q) => q.id === "wantsSurgicalMethod"
    );
    if (wantsSurgicalMethodQuestion) {
      questions.push(wantsSurgicalMethodQuestion);
    }

    // If user doesn't want surgery, show continue with long-term question
    if (answers.wantsSurgicalMethod === false) {
      const wantsToContinueQuestion = PERSONALIZATION_QUESTIONS.find(
        (q) => q.id === "wantsToContinueWithLongTerm"
      );
      if (wantsToContinueQuestion) {
        questions.push(wantsToContinueQuestion);
      }

      // Only continue with remaining questions if user wants to continue
      if (answers.wantsToContinueWithLongTerm === true) {
        const okayWithIrregularPeriodsQuestion = PERSONALIZATION_QUESTIONS.find(
          (q) => q.id === "okayWithIrregularPeriods"
        );
        if (okayWithIrregularPeriodsQuestion) {
          questions.push(okayWithIrregularPeriodsQuestion);
        }

        const preferredFrequencyQuestion = PERSONALIZATION_QUESTIONS.find(
          (q) => q.id === "preferredFrequency"
        );
        if (preferredFrequencyQuestion) {
          questions.push(preferredFrequencyQuestion);
        }

        // Add BMI question only if user selected "every 3 weeks"
        if (answers.preferredFrequency === "every-3-weeks") {
          const currentBMIQuestion = PERSONALIZATION_QUESTIONS.find(
            (q) => q.id === "currentBMI"
          );
          if (currentBMIQuestion) {
            questions.push(currentBMIQuestion);
          }
        }
      }
    }
  } else if (wantsFuturePregnancy === true) {
    // If wantsFuturePregnancy = true, skip surgical question and go to regular questions
    const okayWithIrregularPeriodsQuestion = PERSONALIZATION_QUESTIONS.find(
      (q) => q.id === "okayWithIrregularPeriods"
    );
    if (okayWithIrregularPeriodsQuestion) {
      questions.push(okayWithIrregularPeriodsQuestion);
    }

    const preferredFrequencyQuestion = PERSONALIZATION_QUESTIONS.find(
      (q) => q.id === "preferredFrequency"
    );
    if (preferredFrequencyQuestion) {
      questions.push(preferredFrequencyQuestion);
    }

    // Add BMI question only if user selected "every 3 weeks"
    if (answers.preferredFrequency === "every-3-weeks") {
      const currentBMIQuestion = PERSONALIZATION_QUESTIONS.find(
        (q) => q.id === "currentBMI"
      );
      if (currentBMIQuestion) {
        questions.push(currentBMIQuestion);
      }
    }
  }

  return questions;
};

