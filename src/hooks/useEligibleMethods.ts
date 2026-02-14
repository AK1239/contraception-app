import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ContraceptiveMethodKey } from "../types";
import { CONTRACEPTIVE_METHODS } from "../constants/contraceptiveMethods";
import { handleError, ErrorCode } from "../services/errorHandler";
import { logger } from "../services/logger";

const ALL_METHOD_KEYS: ContraceptiveMethodKey[] = CONTRACEPTIVE_METHODS.map(
  (m) => m.key as ContraceptiveMethodKey
);

/**
 * Custom hook to manage eligible methods for personalization
 * Reads from route params when available, otherwise returns all contraceptive methods
 */
export const useEligibleMethods = () => {
  const params = useLocalSearchParams();

  const [eligibleMethods, setEligibleMethods] = useState<ContraceptiveMethodKey[]>([]);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(true);

  useEffect(() => {
    // First, try to get eligible methods from route params
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

    // No params or parse failed - use all contraceptive methods
    setEligibleMethods(ALL_METHOD_KEYS);
    setIsCheckingEligibility(false);
  }, [params.eligibleMethods]);

  return {
    eligibleMethods,
    isCheckingEligibility,
  };
};
