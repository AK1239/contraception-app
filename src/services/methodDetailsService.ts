import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';

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
    rating?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  advantages?: string[];
  disadvantages?: string[];
  howToUse?: string;
  timeToWork?: string;
  sideNotes?: string;
  commonErrors?: string[];
}

// This service provides method details for comparison
// In a production app, this would fetch from a database or API
// For now, we'll create a structure that can be populated from the detail pages
export const getAllMethods = () => {
  return ALL_COMPARISON_METHODS;
};

// Get method details by key
// This is a placeholder - in production, this would fetch actual data
// For now, we'll return basic info and the comparison can work with what's available
export const getMethodDetails = (methodKey: string): MethodDetails | null => {
  const method = ALL_COMPARISON_METHODS.find(m => m.key === methodKey);
  
  if (!method) {
    return null;
  }

  // Return basic structure with description from constants
  // Detailed fields (efficacy, advantages, etc.) will be added as we extract from detail pages
  const details: MethodDetails = {
    key: method.key,
    description: method.description || 'No description available',
  };

  // TODO: Add detailed method data here as we extract from individual method pages
  // For now, returning basic structure that can be extended
  
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

