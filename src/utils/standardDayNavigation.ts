/**
 * Standard Days Method (SDM) Navigation Utilities
 */

import { SDMSectionKey, SDMAnswers } from '../types/standardDayMethod';
import { getSDMSectionKeys } from '../config/standardDaySections';

/**
 * Get the next section key based on current section and answers
 * Skip LMP date section if not eligible
 */
export function getNextSDMSection(
  currentSection: SDMSectionKey,
  _answers: SDMAnswers,
  avgCycleLength: number | null
): SDMSectionKey | null {
  const sectionKeys = getSDMSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex === -1) {
    return null;
  }
  
  // If on cycle-lengths section, check eligibility before proceeding
  if (currentSection === 'cycle-lengths') {
    // Only proceed to LMP date if eligible (avg between 26-32)
    if (avgCycleLength !== null && avgCycleLength >= 26 && avgCycleLength <= 32) {
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
export function getPreviousSDMSection(
  currentSection: SDMSectionKey
): SDMSectionKey | null {
  const sectionKeys = getSDMSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return sectionKeys[currentIndex - 1];
}

/**
 * Get the first section key
 */
export function getFirstSDMSection(): SDMSectionKey {
  return getSDMSectionKeys()[0];
}

/**
 * Check if current section is the last section
 */
export function isLastSDMSection(
  currentSection: SDMSectionKey,
  avgCycleLength: number | null
): boolean {
  const sectionKeys = getSDMSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  // If on cycle-lengths and not eligible, this is the last section
  if (currentSection === 'cycle-lengths') {
    if (avgCycleLength === null || avgCycleLength < 26 || avgCycleLength > 32) {
      return true;
    }
  }
  
  // Otherwise, check if this is the actual last section
  return currentIndex === sectionKeys.length - 1;
}

/**
 * Check if all required questions in a section are answered
 */
export function isSDMSectionComplete(
  sectionKey: SDMSectionKey,
  answers: SDMAnswers
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
export function calculateSDMProgress(
  currentSection: SDMSectionKey,
  avgCycleLength: number | null
): number {
  const sectionKeys = getSDMSectionKeys();
  const currentIndex = sectionKeys.indexOf(currentSection);
  
  if (currentIndex === -1) {
    return 0;
  }
  
  // If not eligible after cycle-lengths, treat as 100% complete
  if (currentSection === 'cycle-lengths' && avgCycleLength !== null) {
    if (avgCycleLength < 26 || avgCycleLength > 32) {
      return 100;
    }
  }
  
  // Calculate based on position
  return Math.round(((currentIndex + 1) / sectionKeys.length) * 100);
}
