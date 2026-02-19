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
  lmpDate?: Date;
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
      end: Date;
      calendarDates: {
        start: string;
        end: string;
      };
    };
  };
  nextPeriod?: {
    predictedDate: Date;
    formattedDate: string;
  };
  recalculationDate?: {
    date: Date;
    formattedDate: string;
  };
  calendarDates?: Array<{
    date: Date;
    formattedDate: string;
    type: 'safe' | 'fertile' | 'expected-period';
    dayNumber: number;
  }>;
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
