/**
 * Standard Days Method (SDM) Calculator Types
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

export type SDMSectionKey = 'eligibility-info' | 'cycle-lengths' | 'lmp-date';

/**
 * User answers for SDM calculator
 */
export interface SDMAnswers {
  cycleLengths: (number | null)[];
  lmpDate: Date | null;
}

/**
 * Eligibility and calculation result
 */
export interface SDMEligibilityResult {
  eligible: boolean;
  avgCycleLength: number | null;
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
}

/**
 * SDM State
 */
export interface SDMState {
  answers: SDMAnswers;
  currentSection: SDMSectionKey | null;
  evaluationResult: SDMEligibilityResult | null;
  isComplete: boolean;
}
