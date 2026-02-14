/**
 * Calendar Method (Ogino-Knaus / Rhythm Method) Calculator Types
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

export type CalendarMethodSectionKey = 'eligibility-info' | 'cycle-lengths' | 'lmp-date';

/**
 * User answers for Calendar Method calculator
 */
export interface CalendarMethodAnswers {
  cycleLengths: (number | null)[];
  lmpDate: Date | null;
}

/**
 * Eligibility and calculation result
 */
export interface CalendarMethodEligibilityResult {
  eligible: boolean;
  shortestCycle: number | null;
  longestCycle: number | null;
  earliestFertileDay: number | null; // Day 'a' in cycle
  latestFertileDay: number | null; // Day 'b' in cycle
  fertileWindow?: {
    start: Date;
    end: Date;
    calendarDates: {
      fertileStart: string; // formatted date
      fertileEnd: string; // formatted date
    };
  };
  safeWindow?: {
    beforeFertile: {
      start: Date;
      end: Date;
    };
    afterFertile: {
      start: Date;
    };
  };
  message: string;
  educationalMessage: string;
  warning?: string;
}

/**
 * Calendar Method State
 */
export interface CalendarMethodState {
  answers: CalendarMethodAnswers;
  currentSection: CalendarMethodSectionKey | null;
  evaluationResult: CalendarMethodEligibilityResult | null;
  isComplete: boolean;
}
