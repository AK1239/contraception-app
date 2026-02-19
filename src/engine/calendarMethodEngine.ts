/**
 * Calendar Method (Ogino-Knaus / Rhythm Method) Eligibility Engine
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 * Updated with complete date calculations and WHO requirements
 */

import { CalendarMethodAnswers, CalendarMethodEligibilityResult, CalendarDateData } from '../types/calendarMethod';

/**
 * Get shortest, longest, and average cycle from 6 cycles
 */
function getCycleStatistics(cycleLengths: (number | null)[]): {
  shortest: number | null;
  longest: number | null;
  average: number | null;
} {
  const validCycles = cycleLengths.filter((length): length is number => length !== null);
  
  if (validCycles.length !== 6) {
    return { shortest: null, longest: null, average: null };
  }
  
  const sum = validCycles.reduce((acc, val) => acc + val, 0);
  const average = Math.round(sum / validCycles.length); // WHO: Round to nearest integer
  
  return {
    shortest: Math.min(...validCycles),
    longest: Math.max(...validCycles),
    average,
  };
}

/**
 * Determine if cycles are regular enough for calendar method
 * WHO: Cycles consistently <21 or >35 days may be unreliable
 */
function areCyclesRegular(cycleLengths: (number | null)[]): boolean {
  const validCycles = cycleLengths.filter((length): length is number => length !== null);
  
  if (validCycles.length !== 6) {
    return false;
  }
  
  // Check if any cycle is outside the regular range
  return validCycles.every(cycle => cycle >= 21 && cycle <= 35);
}

/**
 * Calculate fertile window based on Calendar Method formula
 * WHO Evidence-Based Formula:
 * a = shortest cycle - 18 (earliest fertile day)
 * b = longest cycle - 11 (latest fertile day)
 * If a < 1, set a = 1
 */
function calculateFertileWindow(
  shortestCycle: number,
  longestCycle: number
): { earliestDay: number; latestDay: number; valid: boolean } {
  let earliestDay = shortestCycle - 18;
  const latestDay = longestCycle - 11;
  
  // If a < 1, set a = 1
  if (earliestDay < 1) {
    earliestDay = 1;
  }
  
  // If a > b, cycle variability is too high
  const valid = earliestDay <= latestDay;
  
  return { earliestDay, latestDay, valid };
}

/**
 * Calculate calendar dates for fertile window based on LMP
 */
function calculateFertileDates(
  lmpDate: Date,
  earliestDay: number,
  latestDay: number
): {
  start: Date;
  end: Date;
  calendarDates: { fertileStart: string; fertileEnd: string };
} {
  const fertileStart = new Date(lmpDate);
  fertileStart.setDate(fertileStart.getDate() + earliestDay - 1); // Day a
  
  const fertileEnd = new Date(lmpDate);
  fertileEnd.setDate(fertileEnd.getDate() + latestDay - 1); // Day b
  
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
 * Calculate safe window periods with end date
 */
function calculateSafeWindow(lmpDate: Date, earliestDay: number, latestDay: number, avgCycleLength: number) {
  const safeBeforeEnd = new Date(lmpDate);
  safeBeforeEnd.setDate(safeBeforeEnd.getDate() + earliestDay - 2); // Day before earliest fertile day
  
  const afterFertileStart = new Date(lmpDate);
  afterFertileStart.setDate(afterFertileStart.getDate() + latestDay); // Day after latest fertile day
  
  // Safe window ENDS the day before the next period
  const afterFertileEnd = new Date(lmpDate);
  afterFertileEnd.setDate(afterFertileEnd.getDate() + avgCycleLength - 1);
  
  return {
    beforeFertile: {
      start: new Date(lmpDate), // Day 1
      end: safeBeforeEnd, // Day (a-1)
      calendarDates: {
        start: formatDate(new Date(lmpDate)),
        end: formatDate(safeBeforeEnd),
      },
    },
    afterFertile: {
      start: afterFertileStart, // Day (b+1)
      end: afterFertileEnd, // Day before next cycle
      calendarDates: {
        start: formatDate(afterFertileStart),
        end: formatDate(afterFertileEnd),
      },
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
 * Format date with full day name and month (e.g., "Monday, March 15, 2026")
 */
function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate next period prediction
 */
function calculateNextPeriod(lmpDate: Date, avgCycleLength: number) {
  const nextPeriodDate = new Date(lmpDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + avgCycleLength);
  
  return {
    predictedDate: nextPeriodDate,
    formattedDate: formatLongDate(nextPeriodDate),
  };
}

/**
 * Calculate recalculation date (same as next period)
 */
function calculateRecalculationDate(lmpDate: Date, avgCycleLength: number) {
  const recalcDate = new Date(lmpDate);
  recalcDate.setDate(recalcDate.getDate() + avgCycleLength);
  
  return {
    date: recalcDate,
    formattedDate: formatLongDate(recalcDate),
  };
}

/**
 * Generate array of calendar dates for visual display
 */
function generateCalendarDates(
  lmpDate: Date,
  avgCycleLength: number,
  earliestDay: number,
  latestDay: number
): CalendarDateData[] {
  const calendarDates: CalendarDateData[] = [];
  
  for (let day = 1; day <= avgCycleLength; day++) {
    const currentDate = new Date(lmpDate);
    currentDate.setDate(currentDate.getDate() + day - 1);
    
    let type: 'safe' | 'fertile' | 'expected-period' = 'safe';
    
    // Determine type
    if (day >= earliestDay && day <= latestDay) {
      type = 'fertile';
    } else if (day === avgCycleLength) {
      type = 'expected-period';
    }
    
    // Format as "Mon 15" or "Tue 16"
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = currentDate.getDate();
    
    calendarDates.push({
      date: currentDate,
      formattedDate: `${dayName} ${dayNum}`,
      type,
      dayNumber: day,
    });
  }
  
  return calendarDates;
}

/**
 * Build educational message with WHO/CDC effectiveness data
 */
function buildEducationalMessage(): string {
  return 'Fertility awareness methods require consistent tracking and correct use.\n\n' +
    'Typical-use effectiveness: ~76–88%.\n\n' +
    'Perfect-use effectiveness: up to ~95%.\n\n' +
    'Does not protect against sexually transmitted infections.';
}

/**
 * Main evaluation function for Calendar Method eligibility
 */
export function evaluateCalendarMethod(answers: CalendarMethodAnswers): CalendarMethodEligibilityResult {
  const { shortest, longest, average } = getCycleStatistics(answers.cycleLengths);
  const cyclesRegular = areCyclesRegular(answers.cycleLengths);
  
  // Base result for incomplete data
  if (shortest === null || longest === null || average === null) {
    return {
      eligible: false,
      shortestCycle: null,
      longestCycle: null,
      avgCycleLength: null,
      earliestFertileDay: null,
      latestFertileDay: null,
      lmpDate: null,
      message: 'Please provide all 6 cycle lengths to calculate your fertile window.',
      educationalMessage: buildEducationalMessage(),
    };
  }
  
  // Check if cycles are irregular
  if (!cyclesRegular) {
    return {
      eligible: false,
      shortestCycle: shortest,
      longestCycle: longest,
      avgCycleLength: average,
      earliestFertileDay: null,
      latestFertileDay: null,
      lmpDate: answers.lmpDate,
      message: 'Your cycles may be irregular. Calendar-based methods may not be reliable.',
      educationalMessage: buildEducationalMessage(),
      warning: 'One or more of your cycles is outside the typical range (21-35 days).',
    };
  }
  
  // Calculate fertile window
  const { earliestDay, latestDay, valid } = calculateFertileWindow(shortest, longest);
  
  // Check if cycle variability is too high
  if (!valid) {
    return {
      eligible: false,
      shortestCycle: shortest,
      longestCycle: longest,
      avgCycleLength: average,
      earliestFertileDay: earliestDay,
      latestFertileDay: latestDay,
      lmpDate: answers.lmpDate,
      message: 'Cycle variability is high. Calendar method may not be reliable.',
      educationalMessage: buildEducationalMessage(),
      warning: 'The difference between your shortest and longest cycles is too large for accurate prediction.',
    };
  }
  
  // Eligible but no LMP date provided yet
  if (!answers.lmpDate) {
    return {
      eligible: true,
      shortestCycle: shortest,
      longestCycle: longest,
      avgCycleLength: average,
      earliestFertileDay: earliestDay,
      latestFertileDay: latestDay,
      lmpDate: null,
      message: `Based on your cycles (shortest: ${shortest} days, longest: ${longest} days), you are eligible for the Calendar Method!`,
      educationalMessage: buildEducationalMessage(),
    };
  }
  
  // Calculate all date-specific values
  const fertileWindow = calculateFertileDates(answers.lmpDate, earliestDay, latestDay);
  const safeWindow = calculateSafeWindow(answers.lmpDate, earliestDay, latestDay, average);
  const nextPeriod = calculateNextPeriod(answers.lmpDate, average);
  const recalculationDate = calculateRecalculationDate(answers.lmpDate, average);
  const calendarDates = generateCalendarDates(answers.lmpDate, average, earliestDay, latestDay);
  
  return {
    eligible: true,
    shortestCycle: shortest,
    longestCycle: longest,
    avgCycleLength: average,
    earliestFertileDay: earliestDay,
    latestFertileDay: latestDay,
    lmpDate: answers.lmpDate,
    fertileWindow,
    safeWindow,
    nextPeriod,
    recalculationDate,
    calendarDates,
    message: `Based on your cycles, your fertile window is from Day ${earliestDay} to Day ${latestDay} of your cycle.`,
    educationalMessage: buildEducationalMessage(),
  };
}
