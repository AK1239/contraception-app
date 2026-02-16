/**
 * Standard Days Method (SDM) Eligibility Engine
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

import { SDMAnswers, SDMEligibilityResult } from '../types/standardDayMethod';

/**
 * Calculate average cycle length from 6 cycles
 */
function calculateAverageCycleLength(cycleLengths: (number | null)[]): number | null {
  const validCycles = cycleLengths.filter((length): length is number => length !== null);
  
  if (validCycles.length !== 6) {
    return null;
  }
  
  const sum = validCycles.reduce((total, length) => total + length, 0);
  return sum / 6;
}

/**
 * Determine eligibility based on average cycle length
 * WHO/CDC: Average must be between 26-32 days inclusive
 */
function isEligible(avgCycleLength: number | null): boolean {
  if (avgCycleLength === null) {
    return false;
  }
  
  return avgCycleLength >= 26 && avgCycleLength <= 32;
}

/**
 * Calculate fertile window based on LMP
 * WHO SDM Rule: Fertile days = Day 8 through Day 19 (inclusive)
 */
function calculateFertileWindow(lmpDate: Date): {
  start: Date;
  end: Date;
  calendarDates: { fertileStart: string; fertileEnd: string };
} {
  const fertileStart = new Date(lmpDate);
  fertileStart.setDate(fertileStart.getDate() + 7); // Day 8 (0-indexed, so +7)
  
  const fertileEnd = new Date(lmpDate);
  fertileEnd.setDate(fertileEnd.getDate() + 18); // Day 19 (0-indexed, so +18)
  
  return {
    start: fertileStart,
    end: fertileEnd,
    calendarDates: {
      fertileStart: formatDate(fertileStart),
      fertileEnd: formatDate(fertileEnd),
    },
  };
}

/**
 * Calculate safe window periods
 */
function calculateSafeWindow(lmpDate: Date) {
  const safeBeforeEnd = new Date(lmpDate);
  safeBeforeEnd.setDate(safeBeforeEnd.getDate() + 6); // Day 7
  
  const afterFertileStart = new Date(lmpDate);
  afterFertileStart.setDate(afterFertileStart.getDate() + 19); // Day 20
  
  return {
    beforeFertile: {
      start: new Date(lmpDate), // Day 1
      end: safeBeforeEnd, // Day 7
      calendarDates: {
        start: formatDate(new Date(lmpDate)),
        end: formatDate(safeBeforeEnd),
      },
    },
    afterFertile: {
      start: afterFertileStart, // Day 20 onward
      calendarDate: formatDate(afterFertileStart),
    },
  };
}

/**
 * Format date as DD/MM/YYYY
 */
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Build educational message based on eligibility
 */
function buildEducationalMessage(eligible: boolean): string {
  const baseMessage = 'Standard Days Method requires consistent tracking and cycles 26–32 days long.\n\n';
  const effectiveness = 'Typical-use effectiveness is approximately 87%.\n\n';
  const protection = 'Does not protect against sexually transmitted infections.';
  
  if (!eligible) {
    return baseMessage + 'You may want to consider other contraceptive methods that are more suitable for irregular cycles. ' + protection;
  }
  
  return baseMessage + effectiveness + protection;
}

/**
 * Main evaluation function for Standard Days Method eligibility
 */
export function evaluateSDM(answers: SDMAnswers): SDMEligibilityResult {
  const avgCycleLength = calculateAverageCycleLength(answers.cycleLengths);
  const eligible = isEligible(avgCycleLength);
  
  // Base result for non-eligible cases
  if (!eligible || avgCycleLength === null) {
    return {
      eligible: false,
      avgCycleLength,
      message: avgCycleLength === null 
        ? 'Please provide all 6 cycle lengths to determine eligibility.'
        : `Your average cycle length is ${avgCycleLength.toFixed(1)} days. The Standard Days Method is validated only for women with cycles between 26 and 32 days.`,
      educationalMessage: buildEducationalMessage(false),
    };
  }
  
  // If eligible but no LMP date provided yet
  if (!answers.lmpDate) {
    return {
      eligible: true,
      avgCycleLength,
      message: `Your average cycle length is ${avgCycleLength.toFixed(1)} days. You are eligible for the Standard Days Method!`,
      educationalMessage: buildEducationalMessage(true),
    };
  }
  
  // Calculate fertile and safe windows
  const fertileWindow = calculateFertileWindow(answers.lmpDate);
  const safeWindow = calculateSafeWindow(answers.lmpDate);
  
  return {
    eligible: true,
    avgCycleLength,
    fertileWindow,
    safeWindow,
    message: `Based on your average cycle length of ${avgCycleLength.toFixed(1)} days and your last menstrual period, your fertile window has been calculated.`,
    educationalMessage: buildEducationalMessage(true),
  };
}
