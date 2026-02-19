/**
 * Standard Days Method (SDM) Eligibility Engine
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

import { SDMAnswers, SDMEligibilityResult } from '../types/standardDayMethod';

/**
 * Calculate average cycle length from 6 cycles (rounded to nearest integer)
 */
function calculateAverageCycleLength(cycleLengths: (number | null)[]): number | null {
  const validCycles = cycleLengths.filter((length): length is number => length !== null);
  
  if (validCycles.length !== 6) {
    return null;
  }
  
  const sum = validCycles.reduce((total, length) => total + length, 0);
  const average = sum / 6;
  return Math.round(average); // Round to nearest integer per WHO guidelines
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
 * Safe before: Day 1-7
 * Safe after: Day 20 until day before next period
 */
function calculateSafeWindow(lmpDate: Date, avgCycleLength: number) {
  const safeBeforeEnd = new Date(lmpDate);
  safeBeforeEnd.setDate(safeBeforeEnd.getDate() + 6); // Day 7
  
  const afterFertileStart = new Date(lmpDate);
  afterFertileStart.setDate(afterFertileStart.getDate() + 19); // Day 20
  
  // Calculate safe days end (day before next predicted cycle)
  const nextCycleStart = new Date(lmpDate);
  nextCycleStart.setDate(nextCycleStart.getDate() + avgCycleLength);
  
  const safeAfterEnd = new Date(nextCycleStart);
  safeAfterEnd.setDate(safeAfterEnd.getDate() - 1); // Day before next cycle
  
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
      start: afterFertileStart, // Day 20
      end: safeAfterEnd, // Day before next cycle
      calendarDates: {
        start: formatDate(afterFertileStart),
        end: formatDate(safeAfterEnd),
      },
    },
  };
}

/**
 * Calculate next predicted period
 */
function calculateNextPeriod(lmpDate: Date, avgCycleLength: number) {
  const predictedDate = new Date(lmpDate);
  predictedDate.setDate(predictedDate.getDate() + avgCycleLength);
  
  return {
    predictedDate,
    formattedDate: formatDate(predictedDate),
  };
}

/**
 * Calculate recalculation reminder date (same as next period date)
 */
function calculateRecalculationDate(lmpDate: Date, avgCycleLength: number) {
  const date = new Date(lmpDate);
  date.setDate(date.getDate() + avgCycleLength);
  
  return {
    date,
    formattedDate: formatDate(date),
  };
}

/**
 * Generate calendar dates for visualization
 */
function generateCalendarDates(
  lmpDate: Date,
  avgCycleLength: number
): Array<{
  date: Date;
  formattedDate: string;
  type: 'safe' | 'fertile' | 'expected-period';
  dayNumber: number;
}> {
  const calendarDates = [];
  
  // Generate dates for the entire cycle plus a few days to show next period
  for (let day = 0; day < avgCycleLength + 7; day++) {
    const currentDate = new Date(lmpDate);
    currentDate.setDate(currentDate.getDate() + day);
    
    let type: 'safe' | 'fertile' | 'expected-period';
    
    if (day === avgCycleLength) {
      type = 'expected-period';
    } else if (day >= 7 && day <= 18) { // Day 8-19 (0-indexed: 7-18)
      type = 'fertile';
    } else {
      type = 'safe';
    }
    
    calendarDates.push({
      date: currentDate,
      formattedDate: formatDate(currentDate),
      type,
      dayNumber: day + 1,
    });
  }
  
  return calendarDates;
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
  const baseMessage = 'Standard Days Method requires cycles consistently 26–32 days long.\n\n';
  const effectiveness = 'Typical-use effectiveness ≈ 88%.\n\n';
  const protection = 'Does not protect against sexually transmitted infections.';
  
  if (!eligible) {
    return baseMessage + 'You may want to consider other contraceptive methods that are more suitable for irregular cycles.\n\n' + protection;
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
        : `Your average cycle length is ${avgCycleLength} days. The Standard Days Method is validated only for women with cycles between 26 and 32 days.`,
      educationalMessage: buildEducationalMessage(false),
    };
  }
  
  // If eligible but no LMP date provided yet
  if (!answers.lmpDate) {
    return {
      eligible: true,
      avgCycleLength,
      message: `Your average cycle length is ${avgCycleLength} days. You are eligible for the Standard Days Method! Please select your last menstrual period date to continue.`,
      educationalMessage: buildEducationalMessage(true),
    };
  }
  
  // Calculate all date-based information
  const fertileWindow = calculateFertileWindow(answers.lmpDate);
  const safeWindow = calculateSafeWindow(answers.lmpDate, avgCycleLength);
  const nextPeriod = calculateNextPeriod(answers.lmpDate, avgCycleLength);
  const recalculationDate = calculateRecalculationDate(answers.lmpDate, avgCycleLength);
  const calendarDates = generateCalendarDates(answers.lmpDate, avgCycleLength);
  
  return {
    eligible: true,
    avgCycleLength,
    lmpDate: answers.lmpDate,
    fertileWindow,
    safeWindow,
    nextPeriod,
    recalculationDate,
    calendarDates,
    message: `Based on your average cycle length of ${avgCycleLength} days and your last menstrual period, your fertile and safe days have been calculated.`,
    educationalMessage: buildEducationalMessage(true),
  };
}
