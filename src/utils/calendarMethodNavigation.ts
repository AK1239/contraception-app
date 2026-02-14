/**
 * Calendar Method Navigation Utilities
 */

import { CalendarMethodSectionKey, CalendarMethodAnswers } from '../types/calendarMethod';
import { getCalendarMethodSectionKeys } from '../config/calendarMethodSections';

/**
 * Get the next section key based on current section
 * Skip LMP date section if not eligible
 */
export function getNextCalendarMethodSection(
  currentSection: CalendarMethodSectionKey,
  _answers: CalendarMethodAnswers,
  eligible: boolean
): CalendarMethodSectionKey | null {
  const sectionKeys = getCalendarMethodSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex === -1) {
    return null;
  }
  
  // If on cycle-lengths section, check eligibility before proceeding
  if (currentSection === 'cycle-lengths') {
    // Only proceed to LMP date if eligible
    if (eligible) {
      return 'lmp-date';
    }
    // Not eligible, no next section
    return null;
  }
  
  // For other sections, just go to next in order
  const nextIndex = currentIndex + 1;
  return nextIndex < sectionKeys.length ? sectionKeys[nextIndex] : null;
}

/**
 * Get the previous section key
 */
export function getPreviousCalendarMethodSection(
  currentSection: CalendarMethodSectionKey
): CalendarMethodSectionKey | null {
  const sectionKeys = getCalendarMethodSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return sectionKeys[currentIndex - 1];
}

/**
 * Get the first section key
 */
export function getFirstCalendarMethodSection(): CalendarMethodSectionKey {
  return getCalendarMethodSectionKeys()[0];
}

/**
 * Check if current section is the last section
 */
export function isLastCalendarMethodSection(
  currentSection: CalendarMethodSectionKey,
  eligible: boolean
): boolean {
  const sectionKeys = getCalendarMethodSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  // If on cycle-lengths and not eligible, this is the last section
  if (currentSection === 'cycle-lengths' && !eligible) {
    return true;
  }
  
  // Otherwise, check if this is the actual last section
  return currentIndex === sectionKeys.length - 1;
}

/**
 * Check if all required questions in a section are answered
 */
export function isCalendarMethodSectionComplete(
  sectionKey: CalendarMethodSectionKey,
  answers: CalendarMethodAnswers
): boolean {
  switch (sectionKey) {
    case 'eligibility-info':
      // Info section has no required answers
      return true;
      
    case 'cycle-lengths':
      // All 6 cycle lengths must be provided
      return answers.cycleLengths.every(length => length !== null);
      
    case 'lmp-date':
      // LMP date must be provided
      return answers.lmpDate !== null;
      
    default:
      return false;
  }
}

/**
 * Calculate progress percentage
 */
export function calculateCalendarMethodProgress(
  currentSection: CalendarMethodSectionKey,
  eligible: boolean
): number {
  const sectionKeys = getCalendarMethodSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex === -1) {
    return 0;
  }
  
  // If not eligible after cycle-lengths, treat as 100% complete
  if (currentSection === 'cycle-lengths' && !eligible) {
    return 100;
  }
  
  // Calculate based on position
  return Math.round(((currentIndex + 1) / sectionKeys.length) * 100);
}
