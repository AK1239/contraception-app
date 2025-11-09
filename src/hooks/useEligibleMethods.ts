import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getEligibleMethods } from "../services/eligibilityEngine";
import { ContraceptiveMethodKey } from "../types";
import { handleError, ErrorCode } from "../services/errorHandler";
import { logger } from "../services/logger";

/**
 * Custom hook to manage eligible methods checking and redirect logic
 * Handles parsing from route params, Redux store, and redirects to medical safety if needed
 */
export const useEligibleMethods = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { mecScores } = useSelector((state: RootState) => state.results);
  
  const [eligibleMethods, setEligibleMethods] = useState<ContraceptiveMethodKey[]>([]);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Prevent redirecting multiple times
    if (hasRedirected.current) {
      return;
    }

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

    // If no params, try to get from Redux store (if user has completed medical questionnaire)
    if (mecScores) {
      try {
        const methods = getEligibleMethods(mecScores) as ContraceptiveMethodKey[];
        if (methods && Array.isArray(methods) && methods.length > 0) {
          setEligibleMethods(methods);
          setIsCheckingEligibility(false);
          return;
        }
      } catch (error) {
        handleError(
          error,
          ErrorCode.ELIGIBILITY_CALCULATION_FAILED,
          "useEligibleMethods.getEligibleMethodsFromMECScores"
        );
        logger.error("Error extracting eligible methods from MEC scores", error, {
          mecScores,
        });
      }
    }

    // If neither params nor Redux store has eligible methods, redirect to medical safety
    if (!params.eligibleMethods) {
      if (!mecScores) {
        // No MEC scores - user hasn't completed questionnaire
        setIsCheckingEligibility(false);
        hasRedirected.current = true;
        router.replace("/(drawer)/medical-safety");
      } else {
        // MEC scores exist but check if there are any eligible methods
        try {
          const methods = getEligibleMethods(mecScores) as ContraceptiveMethodKey[];
          if (methods.length === 0) {
            // No eligible methods - redirect to medical safety
            setIsCheckingEligibility(false);
            hasRedirected.current = true;
            router.replace("/(drawer)/medical-safety");
          } else {
            // Methods found - set them
            setEligibleMethods(methods);
            setIsCheckingEligibility(false);
          }
        } catch (error) {
          // Error extracting methods - redirect to medical safety
          handleError(
            error,
            ErrorCode.ELIGIBILITY_CALCULATION_FAILED,
            "useEligibleMethods.getEligibleMethods"
          );
          logger.error("Error extracting eligible methods", error, {
            mecScores,
          });
          setIsCheckingEligibility(false);
          hasRedirected.current = true;
          router.replace("/(drawer)/medical-safety");
        }
      }
    }
  }, [params.eligibleMethods, mecScores, router]);

  return {
    eligibleMethods,
    isCheckingEligibility,
  };
};

