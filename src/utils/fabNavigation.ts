import type { FABSectionKey } from "../types/fabEligibility";
import type { FABAnswerState } from "../config/fabSections";
import { FAB_SECTION_ORDER } from "../config/fabSections";

/**
 * Check if client is pregnant (early exit - no more sections)
 */
function isPregnant(answers: FABAnswerState): boolean {
  return answers["fab-currently-pregnant"] === "yes";
}

/**
 * Get the next FAB section based on current section and answers.
 * Returns null when at the end or when early exit (pregnant).
 */
export function getNextFABSection(
  currentSection: FABSectionKey | null,
  answers: FABAnswerState
): FABSectionKey | null {
  const idx = currentSection ? FAB_SECTION_ORDER.indexOf(currentSection) : -1;

  if (idx < 0) return FAB_SECTION_ORDER[0] ?? null;

  // After section 1 (current pregnancy): if pregnant, stop
  if (currentSection === "fab-current-pregnancy" && isPregnant(answers)) {
    return null;
  }

  // Find next section - may need to skip postpartum if not postpartum
  if (currentSection === "fab-current-pregnancy") {
    return "fab-postpartum";
  }
  if (currentSection === "fab-postpartum") {
    // Always go to recent abortion next
    return "fab-recent-abortion";
  }
  if (currentSection === "fab-recent-abortion") {
    return "fab-life-stage";
  }
  if (currentSection === "fab-life-stage") {
    return "fab-menstrual-infection";
  }
  if (currentSection === "fab-menstrual-infection") {
    return "fab-drugs-medical";
  }
  if (currentSection === "fab-drugs-medical") {
    return "fab-sti-risk";
  }
  if (currentSection === "fab-sti-risk") {
    return "fab-pregnancy-risk";
  }
  if (currentSection === "fab-pregnancy-risk") {
    return null;
  }

  return null;
}

/**
 * Get the previous FAB section
 */
export function getPreviousFABSection(
  currentSection: FABSectionKey | null
): FABSectionKey | null {
  if (!currentSection) return null;

  const order: FABSectionKey[] = [
    "fab-current-pregnancy",
    "fab-postpartum",
    "fab-recent-abortion",
    "fab-life-stage",
    "fab-menstrual-infection",
    "fab-drugs-medical",
    "fab-sti-risk",
    "fab-pregnancy-risk",
  ];
  const idx = order.indexOf(currentSection);
  if (idx <= 0) return null;
  return order[idx - 1];
}

/**
 * Get the first FAB section
 */
export function getFirstFABSection(): FABSectionKey {
  return "fab-current-pregnancy";
}

/**
 * Get ordered list of sections that will be shown for current answers.
 * Used for progress display.
 */
export function getFABSectionOrderForAnswers(
  answers: FABAnswerState
): FABSectionKey[] {
  const order: FABSectionKey[] = [];
  let current: FABSectionKey | null = "fab-current-pregnancy";

  while (current) {
    order.push(current);
    current = getNextFABSection(current, answers);
  }

  return order;
}
