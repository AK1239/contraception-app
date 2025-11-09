import { useMemo } from 'react';
import { ComparisonField } from '../services/methodDetailsService';
import { getMethodDetails } from '../services/methodDetailsService';
import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';

/**
 * Custom hook to memoize comparison data calculations
 * Prevents recalculation when props haven't changed
 * 
 * @param firstMethodKey - Key of the first method to compare
 * @param secondMethodKey - Key of the second method to compare
 * @param selectedFields - Fields to compare
 * @returns Memoized method data and details
 */
export function useMemoizedComparison(
  firstMethodKey: string | null,
  secondMethodKey: string | null,
  selectedFields: ComparisonField[]
) {
  const firstMethod = useMemo(() => {
    return firstMethodKey
      ? ALL_COMPARISON_METHODS.find((m) => m.key === firstMethodKey) || null
      : null;
  }, [firstMethodKey]);

  const secondMethod = useMemo(() => {
    return secondMethodKey
      ? ALL_COMPARISON_METHODS.find((m) => m.key === secondMethodKey) || null
      : null;
  }, [secondMethodKey]);

  const firstDetails = useMemo(() => {
    return firstMethodKey ? getMethodDetails(firstMethodKey) : null;
  }, [firstMethodKey]);

  const secondDetails = useMemo(() => {
    return secondMethodKey ? getMethodDetails(secondMethodKey) : null;
  }, [secondMethodKey]);

  const isValid = useMemo(() => {
    return (
      firstMethod !== null &&
      secondMethod !== null &&
      selectedFields.length > 0 &&
      firstMethodKey !== null &&
      secondMethodKey !== null
    );
  }, [firstMethod, secondMethod, selectedFields.length, firstMethodKey, secondMethodKey]);

  return {
    firstMethod,
    secondMethod,
    firstDetails,
    secondDetails,
    isValid,
  };
}

