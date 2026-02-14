import type { FemaleSterilizationSectionKey } from "../types/sterilizationEligibility";
import type { FemaleSterilizationAnswerState } from "../config/femaleSterilizationSections";

/**
 * Check if any immediate delay conditions are met (early exit)
 */
function hasImmediateDelay(answers: FemaleSterilizationAnswerState): boolean {
  const pregnant = answers["fs-currently-pregnant"] === true;
  const unexplainedBleeding = answers["fs-unexplained-vaginal-bleeding"] === true;
  const systemicInfection = answers["fs-systemic-infection"] === true;
  
  return pregnant || unexplainedBleeding || systemicInfection;
}

/**
 * Get the next section based on current section and answers.
 * Returns null when at the end or when early exit conditions are met.
 */
export function getNextFemaleSterilizationSection(
  currentSection: FemaleSterilizationSectionKey | null,
  answers: FemaleSterilizationAnswerState
): FemaleSterilizationSectionKey | null {
  // After Section 1: Check for immediate delay conditions
  if (currentSection === "fs-exclude-delay") {
    if (hasImmediateDelay(answers)) {
      // Skip to STI risk and then counselling
      return "fs-sti-risk";
    }
    return "fs-postpartum";
  }

  // After postpartum
  if (currentSection === "fs-postpartum") {
    return "fs-post-abortion";
  }

  // After post-abortion
  if (currentSection === "fs-post-abortion") {
    return "fs-cardiovascular";
  }

  // Continue through remaining sections in order
  if (currentSection === "fs-cardiovascular") {
    return "fs-thromboembolism";
  }

  if (currentSection === "fs-thromboembolism") {
    return "fs-hiv-immunology";
  }

  if (currentSection === "fs-hiv-immunology") {
    return "fs-endocrine";
  }

  if (currentSection === "fs-endocrine") {
    return "fs-haematology";
  }

  if (currentSection === "fs-haematology") {
    return "fs-respiratory";
  }

  if (currentSection === "fs-respiratory") {
    return "fs-gynecologic";
  }

  if (currentSection === "fs-gynecologic") {
    return "fs-sti-risk";
  }

  if (currentSection === "fs-sti-risk") {
    return "fs-counselling-check";
  }

  // End of questionnaire
  if (currentSection === "fs-counselling-check") {
    return null;
  }

  // Default: start from beginning
  if (!currentSection) {
    return "fs-exclude-delay";
  }

  return null;
}

/**
 * Get the previous section
 */
export function getPreviousFemaleSterilizationSection(
  currentSection: FemaleSterilizationSectionKey | null,
  answers: FemaleSterilizationAnswerState
): FemaleSterilizationSectionKey | null {
  if (!currentSection) return null;

  // Reverse mapping
  if (currentSection === "fs-exclude-delay") {
    return null; // First section
  }

  if (currentSection === "fs-postpartum") {
    return "fs-exclude-delay";
  }

  if (currentSection === "fs-post-abortion") {
    return "fs-postpartum";
  }

  if (currentSection === "fs-cardiovascular") {
    return "fs-post-abortion";
  }

  if (currentSection === "fs-thromboembolism") {
    return "fs-cardiovascular";
  }

  if (currentSection === "fs-hiv-immunology") {
    return "fs-thromboembolism";
  }

  if (currentSection === "fs-endocrine") {
    return "fs-hiv-immunology";
  }

  if (currentSection === "fs-haematology") {
    return "fs-endocrine";
  }

  if (currentSection === "fs-respiratory") {
    return "fs-haematology";
  }

  if (currentSection === "fs-gynecologic") {
    return "fs-respiratory";
  }

  if (currentSection === "fs-sti-risk") {
    // Check if we came from immediate delay or normal flow
    if (hasImmediateDelay(answers)) {
      return "fs-exclude-delay";
    }
    return "fs-gynecologic";
  }

  if (currentSection === "fs-counselling-check") {
    return "fs-sti-risk";
  }

  return null;
}

/**
 * Get the first section
 */
export function getFirstFemaleSterilizationSection(): FemaleSterilizationSectionKey {
  return "fs-exclude-delay";
}

/**
 * Get ordered list of sections that will be shown for current answers.
 * Used for progress display.
 */
export function getFemaleSterilizationSectionOrderForAnswers(
  answers: FemaleSterilizationAnswerState
): FemaleSterilizationSectionKey[] {
  const order: FemaleSterilizationSectionKey[] = [];
  let current: FemaleSterilizationSectionKey | null = "fs-exclude-delay";

  // Limit iterations to prevent infinite loops
  let iterations = 0;
  const maxIterations = 20;

  while (current && iterations < maxIterations) {
    order.push(current);
    current = getNextFemaleSterilizationSection(current, answers);
    iterations++;
  }

  return order;
}
