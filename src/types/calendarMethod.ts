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
 * Calendar date data for visual display
 */
export interface CalendarDateData {
  date: Date;
  formattedDate: string; // e.g., "Mon 15"
  type: 'safe' | 'fertile' | 'expected-period';
  dayNumber: number; // Day of cycle
}

/**
 * Eligibility and calculation result
 */
export interface CalendarMethodEligibilityResult {
  eligible: boolean;
  shortestCycle: number | null;
  longestCycle: number | null;
  avgCycleLength: number | null; // Rounded average
  earliestFertileDay: number | null; // Day 'a' in cycle
  latestFertileDay: number | null; // Day 'b' in cycle
  lmpDate: Date | null; // Last menstrual period date
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
      calendarDates: {
        start: string;
        end: string;
      };
    };
    afterFertile: {
      start: Date;
      end: Date; // NEW: End date of safe window
      calendarDates: {
        start: string;
        end: string; // NEW: Formatted end date
      };
    };
  };
  nextPeriod?: {
    predictedDate: Date;
    formattedDate: string; // e.g., "Monday, March 15, 2026"
  };
  recalculationDate?: {
    date: Date;
    formattedDate: string;
  };
  calendarDates?: CalendarDateData[]; // Array of all days for visual calendar
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
