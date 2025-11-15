/**
 * Utility functions for Natural Standard Day Method Calculator
 * 
 * The Standard Days Method identifies days 8-19 of the menstrual cycle as "danger days"
 * where pregnancy is most likely to occur. Days outside this range are considered "safe days".
 */

export interface StandardDayResult {
  firstDayOfPeriod: Date;
  dangerStartDate: Date;
  dangerEndDate: Date;
  safeDaysBefore: {
    startDate: Date;
    endDate: Date;
  };
  safeDaysAfter: {
    startDate: Date;
    endDate: Date;
  };
  cycleDay: number;
}

/**
 * Calculates danger days and safe days based on the first day of the last period
 * @param firstDayOfPeriod The first day of the last menstrual period
 * @returns StandardDayResult with calculated dates
 */
export function calculateStandardDays(firstDayOfPeriod: Date): StandardDayResult {
  // Create a copy to avoid mutating the original date
  const periodDate = new Date(firstDayOfPeriod);
  periodDate.setHours(0, 0, 0, 0);

  // Danger days are from day 8 through day 19 of the cycle
  // Day 1 is the first day of the period
  const dangerStartDate = new Date(periodDate);
  dangerStartDate.setDate(dangerStartDate.getDate() + 7); // Day 8 (0-indexed, so +7)

  const dangerEndDate = new Date(periodDate);
  dangerEndDate.setDate(dangerEndDate.getDate() + 18); // Day 19 (0-indexed, so +18)

  // Safe days before danger period (days 1-7)
  const safeDaysBefore = {
    startDate: new Date(periodDate),
    endDate: new Date(periodDate),
  };
  safeDaysBefore.endDate.setDate(safeDaysBefore.endDate.getDate() + 6); // Day 7

  // Safe days after danger period (days 20-32, assuming a 32-day cycle)
  const safeDaysAfter = {
    startDate: new Date(periodDate),
    endDate: new Date(periodDate),
  };
  safeDaysAfter.startDate.setDate(safeDaysAfter.startDate.getDate() + 19); // Day 20
  safeDaysAfter.endDate.setDate(safeDaysAfter.endDate.getDate() + 31); // Day 32

  return {
    firstDayOfPeriod: periodDate,
    dangerStartDate,
    dangerEndDate,
    safeDaysBefore,
    safeDaysAfter,
    cycleDay: 1, // Starting from day 1
  };
}

/**
 * Formats a date to a readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "November 9, 2025")
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Formats a date to a short format (e.g., "09/11/2025")
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Checks if a date falls within the danger period
 * @param date The date to check
 * @param result The StandardDayResult containing danger period dates
 * @returns true if the date is within the danger period
 */
export function isDangerDay(date: Date, result: StandardDayResult): boolean {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  const dangerStart = new Date(result.dangerStartDate);
  dangerStart.setHours(0, 0, 0, 0);
  const dangerEnd = new Date(result.dangerEndDate);
  dangerEnd.setHours(0, 0, 0, 0);

  return checkDate >= dangerStart && checkDate <= dangerEnd;
}

/**
 * Checks if a date falls within the safe period
 * @param date The date to check
 * @param result The StandardDayResult containing safe period dates
 * @returns true if the date is within the safe period
 */
export function isSafeDay(date: Date, result: StandardDayResult): boolean {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  const safeBeforeStart = new Date(result.safeDaysBefore.startDate);
  safeBeforeStart.setHours(0, 0, 0, 0);
  const safeBeforeEnd = new Date(result.safeDaysBefore.endDate);
  safeBeforeEnd.setHours(0, 0, 0, 0);
  
  const safeAfterStart = new Date(result.safeDaysAfter.startDate);
  safeAfterStart.setHours(0, 0, 0, 0);
  const safeAfterEnd = new Date(result.safeDaysAfter.endDate);
  safeAfterEnd.setHours(0, 0, 0, 0);

  return (
    (checkDate >= safeBeforeStart && checkDate <= safeBeforeEnd) ||
    (checkDate >= safeAfterStart && checkDate <= safeAfterEnd)
  );
}

