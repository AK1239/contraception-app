import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ContraceptiveMethodKey, MECScore } from "../types";
import { CONTRACEPTIVE_METHODS } from "../constants/contraceptiveMethods";
import { handleError, ErrorCode } from "../services/errorHandler";
import { logger } from "../services/logger";

const ALL_METHOD_KEYS: ContraceptiveMethodKey[] = CONTRACEPTIVE_METHODS.map(
  (m) => m.key as ContraceptiveMethodKey
);

/**
 * Custom hook to manage eligible methods for personalization
 * Priority: 1) mecEvaluationResult (MEC 1 + 2 from questionnaire), 2) route params, 3) all methods
 */
export const useEligibleMethods = () => {
  const params = useLocalSearchParams();
  const mecEvaluationResult = useSelector(
    (state: RootState) => state.questionnaire.mecEvaluationResult
  );

  const [eligibleMethods, setEligibleMethods] = useState<ContraceptiveMethodKey[]>([]);
  const [mecScores, setMecScores] = useState<Record<ContraceptiveMethodKey, MECScore>>({} as Record<ContraceptiveMethodKey, MECScore>);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(true);

  useEffect(() => {
    // First: use MEC evaluation result (suggested + greaterBenefit = MEC 1 & 2)
    if (mecEvaluationResult) {
      const fromMEC = [
        ...mecEvaluationResult.suggested,
        ...mecEvaluationResult.greaterBenefit,
      ];
      if (fromMEC.length > 0) {
        // Build MEC scores map from evaluation result
        const scoresMap: Record<ContraceptiveMethodKey, MECScore> = {} as Record<ContraceptiveMethodKey, MECScore>;
        mecEvaluationResult.mecResults.forEach((result) => {
          scoresMap[result.methodKey] = result.score;
        });
        
        setEligibleMethods(fromMEC);
        setMecScores(scoresMap);
        setIsCheckingEligibility(false);
        return;
      }
    }

    // Second: try route params
    if (params.eligibleMethods) {
      try {
        const methods = JSON.parse(params.eligibleMethods as string);
        if (methods && Array.isArray(methods) && methods.length > 0) {
          setEligibleMethods(methods);
          // If no MEC scores available, assume all are MEC 1 (safest assumption)
          const defaultScores: Record<ContraceptiveMethodKey, MECScore> = {} as Record<ContraceptiveMethodKey, MECScore>;
          methods.forEach((m: ContraceptiveMethodKey) => {
            defaultScores[m] = 1;
          });
          setMecScores(defaultScores);
          setIsCheckingEligibility(false);
          return;
        }
      } catch (error) {
        handleError(
          error,
          ErrorCode.DATA_INVALID_FORMAT,
          "useEligibleMethods.parseEligibleMethodsFromParams"
        );
        logger.error("Error parsing eligible methods from params", error, {
          eligibleMethods: params.eligibleMethods,
        });
      }
    }

    // Fallback: all contraceptive methods (e.g. when navigating to personalize without MEC)
    const defaultScores: Record<ContraceptiveMethodKey, MECScore> = {} as Record<ContraceptiveMethodKey, MECScore>;
    ALL_METHOD_KEYS.forEach((m) => {
      defaultScores[m] = 1;
    });
    setEligibleMethods(ALL_METHOD_KEYS);
    setMecScores(defaultScores);
    setIsCheckingEligibility(false);
  }, [mecEvaluationResult, params.eligibleMethods]);

  return {
    eligibleMethods,
    mecScores,
    isCheckingEligibility,
  };
};
