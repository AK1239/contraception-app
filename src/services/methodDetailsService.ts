import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';
import { getContraceptiveMethodById } from '../utils/contraceptiveMethodsData';

export type ComparisonField = 
  | 'description'
  | 'efficacy'
  | 'advantages'
  | 'disadvantages'
  | 'howToUse'
  | 'timeToWork'
  | 'sideNotes'
  | 'commonErrors';

export interface MethodDetails {
  key: string;
  description?: string;
  efficacy?: {
    typicalUse?: string;
    perfectUse?: string;
    label?: 'Excellent' | 'Good' | 'Perfect';
  };
  advantages?: string[];
  disadvantages?: string[];
  howToUse?: string;
  timeToWork?: string;
  sideNotes?: string;
  commonErrors?: string[];
}

// This service provides method details for comparison
export const getAllMethods = () => {
  return ALL_COMPARISON_METHODS;
};

// Get method details by key from contraceptiveMethodsData
export const getMethodDetails = (methodKey: string): MethodDetails | null => {
  // First try to get from contraceptiveMethodsData
  const methodData = getContraceptiveMethodById(methodKey);
  
  if (methodData) {
    // Map the data structure from contraceptiveMethodsData to MethodDetails
    const details: MethodDetails = {
      key: methodData.id,
      description: methodData.description,
      efficacy: methodData.efficacy ? {
        typicalUse: methodData.efficacy.typicalUse,
        perfectUse: methodData.efficacy.perfectUse,
        label: methodData.efficacy.label,
      } : undefined,
      advantages: methodData.advantages,
      disadvantages: methodData.disadvantages,
      howToUse: methodData.howToUse,
      timeToWork: methodData.timeToWork,
      sideNotes: methodData.sideNotes,
      commonErrors: methodData.commonErrors,
    };
    return details;
  }

  // Fallback to ALL_COMPARISON_METHODS if not found in detailed data
  const method = ALL_COMPARISON_METHODS.find(m => m.key === methodKey);
  
  if (!method) {
    return null;
  }

  // Return basic structure with description from constants
  const details: MethodDetails = {
    key: method.key,
    description: method.description || 'No description available',
  };
  
  return details;
};

// Available comparison fields with their labels and icons
export const COMPARISON_FIELDS: Array<{
  key: ComparisonField;
  label: string;
  icon: string;
}> = [
  { key: 'description', label: 'Description', icon: '📝' },
  { key: 'efficacy', label: 'Efficacy', icon: '📊' },
  { key: 'advantages', label: 'Advantages', icon: '✅' },
  { key: 'disadvantages', label: 'Disadvantages', icon: '⚠️' },
  { key: 'howToUse', label: 'How to Use', icon: '📋' },
  { key: 'timeToWork', label: 'Time to Work', icon: '⏰' },
  { key: 'sideNotes', label: 'Side Notes', icon: '📌' },
  { key: 'commonErrors', label: 'Common Errors', icon: '❌' },
];

// Get human-readable label for a comparison field
export function getFieldLabel(field: ComparisonField): string {
  const fieldConfig = COMPARISON_FIELDS.find(f => f.key === field);
  return fieldConfig?.label || field;
}

