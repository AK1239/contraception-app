export interface FertilePeriodResult {
  shortestCycle: number;
  longestCycle: number;
  earliestFertileDay: number;
  latestFertileDay: number;
  fertilePeriodDays: number;
}

export interface CalendarResult {
  lastPeriodDate: Date;
  fertileStartDate: Date;
  fertileEndDate: Date;
  safeStartDate: Date;
  safeEndDate: Date;
  nextPeriodDate: Date;
}

export function calculateFertilePeriod(cycles: number[]): FertilePeriodResult {
  if (cycles.length < 6) {
    throw new Error('At least 6 cycles are required');
  }

  const invalidCycles = cycles.filter(cycle => cycle < 26 || cycle > 32);
  if (invalidCycles.length > 0) {
    throw new Error('All cycles must be between 26 and 32 days');
  }

  const shortestCycle = Math.min(...cycles);
  const longestCycle = Math.max(...cycles);
  
  const earliestFertileDay = shortestCycle - 18;
  const latestFertileDay = longestCycle - 11;
  
  const fertilePeriodDays = latestFertileDay - earliestFertileDay + 1;

  return {
    shortestCycle,
    longestCycle,
    earliestFertileDay,
    latestFertileDay,
    fertilePeriodDays,
  };
}

export function calculateCalendarDates(
  lastPeriodDate: Date,
  fertilePeriod: FertilePeriodResult
): CalendarResult {
  const fertileStartDate = new Date(lastPeriodDate);
  fertileStartDate.setDate(fertileStartDate.getDate() + fertilePeriod.earliestFertileDay - 1);
  
  const fertileEndDate = new Date(lastPeriodDate);
  fertileEndDate.setDate(fertileEndDate.getDate() + fertilePeriod.latestFertileDay - 1);
  
  const safeStartDate = new Date(lastPeriodDate);
  
  const safeEndDate = new Date(fertileStartDate);
  safeEndDate.setDate(safeEndDate.getDate() - 1);
  
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + fertilePeriod.longestCycle);

  return {
    lastPeriodDate,
    fertileStartDate,
    fertileEndDate,
    safeStartDate,
    safeEndDate,
    nextPeriodDate,
  };
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getDayOfCycle(date: Date, lastPeriodDate: Date): number {
  const diffTime = date.getTime() - lastPeriodDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
