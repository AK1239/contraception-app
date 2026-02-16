/**
 * Calendar Method (Ogino-Knaus / Rhythm Method) Calculator Sections
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

import { Section } from '../types/sections';
import { CalendarMethodSectionKey } from '../types/calendarMethod';

export const calendarMethodSections: Record<CalendarMethodSectionKey, Section> = {
  'eligibility-info': {
    key: 'eligibility-info' as any,
    title: 'Eligibility Information',
    questions: [
      {
        id: 'ready-to-start',
        text: 'Before we begin:\n\nThis method requires relatively regular menstrual cycles. If your cycles are consistently shorter than 21 days or longer than 35 days, calendar-based methods may be unreliable.\n\nYou will be asked to enter the length of your last 6 menstrual cycles.\n\nCycle length is the number of days from the first day of one period to the first day of the next period.\n\nAre you ready to continue?',
        type: 'yes-no',
        required: true,
      },
    ],
  },
  'cycle-lengths': {
    key: 'cycle-lengths' as any,
    title: 'Enter Your Last 6 Menstrual Cycles',
    questions: [
      {
        id: 'cycle-durations',
        text: 'Enter the duration of your last 6 menstrual cycles (in days)',
        type: 'cycle-durations',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Enter cycle lengths from most recent to oldest. Each cycle must be between 21 and 35 days.',
        },
      },
    ],
  },
  'lmp-date': {
    key: 'lmp-date' as any,
    title: 'Last Menstrual Period',
    questions: [
      {
        id: 'lmp-date',
        text: 'Select the first day of your last menstrual period (LMP)',
        type: 'date',
        required: true,
        validation: {
          maxDate: new Date(), // Can't be in the future
        },
        metadata: {
          helpText: 'Select the first day of your last period',
        },
      },
    ],
  },
};

/**
 * Get section by key
 */
export function getCalendarMethodSection(key: CalendarMethodSectionKey): Section {
  return calendarMethodSections[key];
}

/**
 * Get all section keys in order
 */
export function getCalendarMethodSectionKeys(): CalendarMethodSectionKey[] {
  return ['eligibility-info', 'cycle-lengths', 'lmp-date'];
}
