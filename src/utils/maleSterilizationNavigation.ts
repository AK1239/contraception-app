import type { MaleSterilizationSectionKey } from "../types/maleSterilizationEligibility";
import type { MaleSterilizationAnswerState } from "../config/maleSterilizationSections";

/**
 * Check if client does not desire permanent contraception (early exit)
 */
function doesNotDesirePermanent(answers: MaleSterilizationAnswerState): boolean {
  return answers["ms-desires-permanent-contraception"] === false;
}

/**
 * Get the next section based on current section and answers.
 * Returns null when at the end or when early exit conditions are met.
 */
export function getNextMaleSterilizationSection(
  currentSection: MaleSterilizationSectionKey | null,
  answers: MaleSterilizationAnswerState
): MaleSterilizationSectionKey | null {
  // After Section 1: Check if client desires permanent contraception
  if (currentSection === "ms-reproductive-intent") {
    if (doesNotDesirePermanent(answers)) {
      // Early exit - still show result but with "not eligible" message
      return null;
    }
    return "ms-personal-characteristics";
  }

  // Linear progression through remaining sections
  if (currentSection === "ms-personal-characteristics") {
    return "ms-hiv-status";
  }

  if (currentSection === "ms-hiv-status") {
    return "ms-endocrine";
  }

  if (currentSection === "ms-endocrine") {
    return "ms-anaemia";
  }

  if (currentSection === "ms-anaemia") {
    return "ms-genital-conditions";
  }

  if (currentSection === "ms-genital-conditions") {
    return "ms-systemic-conditions";
  }

  if (currentSection === "ms-systemic-conditions") {
    return "ms-scrotal-structural";
  }

  // End of questionnaire
  if (currentSection === "ms-scrotal-structural") {
    return null;
  }

  // Default: start from beginning
  if (!currentSection) {
    return "ms-reproductive-intent";
  }

  return null;
}

/**
 * Get the previous section
 */
export function getPreviousMaleSterilizationSection(
  currentSection: MaleSterilizationSectionKey | null
): MaleSterilizationSectionKey | null {
  if (!currentSection) return null;

  // Reverse mapping
  if (currentSection === "ms-reproductive-intent") {
    return null; // First section
  }

  if (currentSection === "ms-personal-characteristics") {
    return "ms-reproductive-intent";
  }

  if (currentSection === "ms-hiv-status") {
    return "ms-personal-characteristics";
  }

  if (currentSection === "ms-endocrine") {
    return "ms-hiv-status";
  }

  if (currentSection === "ms-anaemia") {
    return "ms-endocrine";
  }

  if (currentSection === "ms-genital-conditions") {
    return "ms-anaemia";
  }

  if (currentSection === "ms-systemic-conditions") {
    return "ms-genital-conditions";
  }

  if (currentSection === "ms-scrotal-structural") {
    return "ms-systemic-conditions";
  }

  return null;
}

/**
 * Get the first section
 */
export function getFirstMaleSterilizationSection(): MaleSterilizationSectionKey {
  return "ms-reproductive-intent";
}

/**
 * Get ordered list of sections that will be shown for current answers.
 * Used for progress display.
 */
export function getMaleSterilizationSectionOrderForAnswers(
  answers: MaleSterilizationAnswerState
): MaleSterilizationSectionKey[] {
  const order: MaleSterilizationSectionKey[] = [];
  let current: MaleSterilizationSectionKey | null = "ms-reproductive-intent";

  // Limit iterations to prevent infinite loops
  let iterations = 0;
  const maxIterations = 20;

  while (current && iterations < maxIterations) {
    order.push(current);
    current = getNextMaleSterilizationSection(current, answers);
    iterations++;
  }

  return order;
}
