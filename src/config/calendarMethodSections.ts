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
        id: 'cycle-1',
        text: 'Enter the length of your most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
        },
      },
      {
        id: 'cycle-2',
        text: 'Enter the length of your 2nd most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
        },
      },
      {
        id: 'cycle-3',
        text: 'Enter the length of your 3rd most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
        },
      },
      {
        id: 'cycle-4',
        text: 'Enter the length of your 4th most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
        },
      },
      {
        id: 'cycle-5',
        text: 'Enter the length of your 5th most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
        },
      },
      {
        id: 'cycle-6',
        text: 'Enter the length of your 6th most recent cycle (in days)',
        type: 'numeric',
        required: true,
        validation: {
          min: 21,
          max: 35,
        },
        metadata: {
          unit: 'days',
          helpText: 'Must be between 21 and 35 days',
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
