import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ContraceptiveMethodKey } from "../types";
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
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(true);

  useEffect(() => {
    // First: use MEC evaluation result (suggested + greaterBenefit = MEC 1 & 2)
    if (mecEvaluationResult) {
      const fromMEC = [
        ...mecEvaluationResult.suggested,
        ...mecEvaluationResult.greaterBenefit,
      ];
      if (fromMEC.length > 0) {
        setEligibleMethods(fromMEC);
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
    setEligibleMethods(ALL_METHOD_KEYS);
    setIsCheckingEligibility(false);
  }, [mecEvaluationResult, params.eligibleMethods]);

  return {
    eligibleMethods,
    isCheckingEligibility,
  };
};
