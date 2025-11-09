import { useMemo } from 'react';
import { MECScores, MECScore } from '../types';
import { categorizeRecommendations, getEligibleMethods } from '../services/eligibilityEngine';

/**
 * Custom hook to memoize expensive eligibility calculations
 * Prevents recalculation on every render
 * 
 * @param mecScores - MEC scores from the eligibility engine
 * @returns Memoized categorized recommendations and eligible methods
 */
export function useMemoizedResults(mecScores: MECScores | null) {
  const categorizedResults = useMemo(() => {
    if (!mecScores) {
      return { safe: [], acceptable: [], avoid: [] };
    }
    return categorizeRecommendations(mecScores);
  }, [mecScores]);

  const eligibleMethods = useMemo(() => {
    if (!mecScores) {
      return [];
    }
    return getEligibleMethods(mecScores);
  }, [mecScores]);

  const sortedAvoidMethods = useMemo(() => {
    if (!mecScores || categorizedResults.avoid.length === 0) {
      return [];
    }
    // Create a copy before sorting to avoid mutating the original array
    return [...categorizedResults.avoid].sort((a, b) => {
      const scoreA = mecScores[a as keyof typeof mecScores] as MECScore;
      const scoreB = mecScores[b as keyof typeof mecScores] as MECScore;
      return scoreA - scoreB;
    });
  }, [mecScores, categorizedResults.avoid]);

  return {
    ...categorizedResults,
    eligibleMethods,
    sortedAvoidMethods,
  };
}

