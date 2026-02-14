/**
 * Standard Days Method (SDM) Calculator Sections
 * Based on WHO Fertility Awareness Methods Handbook and CDC guidance
 */

import { Section } from '../types/sections';
import { SDMSectionKey } from '../types/standardDayMethod';

export const standardDaySections: Record<SDMSectionKey, Section> = {
  'eligibility-info': {
    key: 'eligibility-info' as any,
    title: 'Eligibility Information',
    questions: [
      {
        id: 'ready-to-start',
        text: 'Before we begin:\n\nThe Standard Days Method is validated only for women with menstrual cycles between 26 and 32 days.\n\nYou will be asked to enter the length of your last 6 menstrual cycles to determine if this method is suitable for you.\n\nCycle length is the number of days from the first day of one period to the first day of the next period.\n\nAre you ready to continue?',
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
export function getSDMSection(key: SDMSectionKey): Section {
  return standardDaySections[key];
}

/**
 * Get all section keys in order
 */
export function getSDMSectionKeys(): SDMSectionKey[] {
  return ['eligibility-info', 'cycle-lengths', 'lmp-date'];
}
