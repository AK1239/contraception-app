import type { SectionKey } from "../types/rules";
import type { AnswerState } from "../types/rules";
import { MEDICAL_SECTIONS } from "../config/sections";

/** Ordered list of medical section keys for navigation */
export const SECTION_ORDER: SectionKey[] = MEDICAL_SECTIONS.map((s) => s.key);

/**
 * Get the next section key in order.
 * Returns null if at the last section.
 * Note: Section skip logic (e.g. Section 2 when never pregnant) is handled
 * within each section - fewer questions are shown, not section skip.
 */
export function getNextSection(
  currentSection: SectionKey | null,
  _answers?: AnswerState
): SectionKey | null {
  const idx = currentSection ? SECTION_ORDER.indexOf(currentSection) : -1;
  if (idx < 0) return SECTION_ORDER[0] ?? null;
  if (idx >= SECTION_ORDER.length - 1) return null;
  return SECTION_ORDER[idx + 1] ?? null;
}

/**
 * Get the previous section key.
 * Returns null if at the first section.
 */
export function getPreviousSection(
  currentSection: SectionKey | null
): SectionKey | null {
  if (!currentSection) return null;
  const idx = SECTION_ORDER.indexOf(currentSection);
  if (idx <= 0) return null;
  return SECTION_ORDER[idx - 1] ?? null;
}

/**
 * Get the first section to show.
 */
export function getFirstSection(_answers?: AnswerState): SectionKey {
  return SECTION_ORDER[0] ?? "menstrual-history";
}

/**
 * Check if we've completed all medical sections (at last section)
 */
export function hasCompletedAllSections(
  currentSection: SectionKey | null,
  _answers?: AnswerState
): boolean {
  const next = getNextSection(currentSection ?? null);
  return next === null;
}
