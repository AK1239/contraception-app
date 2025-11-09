/**
 * Utility functions for comparison views
 */

import { ComparisonField } from '../services/methodDetailsService';
import { ContraceptiveMethodData } from './contraceptiveMethodsData';

/**
 * Get field value from method data
 */
export function getFieldValue(methodData: ContraceptiveMethodData | null | undefined, field: ComparisonField): any {
  if (!methodData) return null;
  
  switch (field) {
    case 'description':
      return methodData.description;
    case 'efficacy':
      return methodData.efficacy;
    case 'advantages':
      return methodData.advantages;
    case 'disadvantages':
      return methodData.disadvantages;
    case 'howToUse':
      return methodData.howToUse;
    case 'timeToWork':
      return methodData.timeToWork;
    case 'sideNotes':
      return methodData.sideNotes;
    case 'commonErrors':
      return methodData.commonErrors;
    default:
      return null;
  }
}

