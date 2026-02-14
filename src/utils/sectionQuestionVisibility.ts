import type { SectionQuestion } from "../types/sections";
import type { AnswerState } from "../types/rules";

/**
 * Check if a question should be visible based on its conditional logic
 */
export function isQuestionVisible(
  question: SectionQuestion,
  answers: AnswerState
): boolean {
  if (!question.conditional) return true;

  const { dependsOn, expectedValue } = question.conditional;
  const dependentValue = answers[dependsOn];

  return dependentValue === expectedValue;
}

/**
 * Get visible questions for a section based on current answers
 * Questions are filtered by conditional dependencies in order
 */
export function getVisibleSectionQuestions(
  questions: SectionQuestion[],
  answers: AnswerState
): SectionQuestion[] {
  const visible: SectionQuestion[] = [];

  for (const question of questions) {
    if (isQuestionVisible(question, answers)) {
      visible.push(question);
    }
  }

  return visible;
}
