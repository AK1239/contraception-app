import { ContraceptiveMethodKey, UserAnswers } from "../types";
import { METHOD_FREQUENCY } from "../constants";
import { logger } from "./logger";
import { handleError, ErrorCode, createError, withSyncErrorHandling } from "./errorHandler";

/**
 * Personalization engine for filtering contraceptive methods
 * Based on user preferences and lifestyle factors
 */

export interface PersonalizationFilters {
  wantsFuturePregnancy?: boolean;
  okayWithIrregularPeriods?: boolean;
  wantsSurgicalMethod?: boolean;
  wantsToContinueWithLongTerm?: boolean;
  preferredFrequency?:
    | "daily"
    | "every-3-weeks"
    | "every-3-months"
    | "every-3-years"
    | "every-8-years";
  currentBMI?: number;
}

/**
 * Validate personalization filters
 */
function validateFilters(filters: PersonalizationFilters): void {
  if (!filters || typeof filters !== 'object') {
    throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
      reason: 'Filters must be an object',
      provided: typeof filters,
    });
  }

  // Validate BMI if provided
  if (filters.currentBMI !== undefined && filters.currentBMI !== null) {
    const bmi = Number(filters.currentBMI);
    if (isNaN(bmi) || bmi < 0 || bmi > 100) {
      throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
        reason: 'BMI must be a valid number between 0 and 100',
        provided: filters.currentBMI,
      });
    }
  }
}

/**
 * Filter eligible methods based on personalization preferences
 * New algorithm flow:
 * 1. Q1: Future pregnancy? Yes → eliminate h, No → ask about surgery
 *    - If surgery = Yes → return only h
 *    - If surgery = No → continue
 * 2. Q2: Irregular periods okay? No → keep only a, i, j, k
 * 3. Q3: Frequency preference → filter to only available methods for that frequency
 * 
 * @param eligibleMethods - Array of eligible method keys
 * @param filters - Personalization filters
 * @returns Filtered recommendations with notices and eliminated methods
 * @throws AppError if filtering fails or input is invalid
 */
export const personalizeRecommendations = (
  eligibleMethods: ContraceptiveMethodKey[],
  filters: PersonalizationFilters
): {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
  shouldShowPermanentMethods?: boolean;
} => {
  try {
    // Validate inputs
    if (!Array.isArray(eligibleMethods)) {
      throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
        reason: 'Eligible methods must be an array',
        provided: typeof eligibleMethods,
      });
    }

    validateFilters(filters);

    // Log personalization start
    logger.debug('Starting personalization', {
      eligibleMethodCount: eligibleMethods.length,
      filters,
    });

    let filteredMethods = [...eligibleMethods];
    const eliminated: { method: ContraceptiveMethodKey; reason: string }[] = [];
    const notices: string[] = [];
    let shouldShowPermanentMethods = false;

    // Filter 1: Future pregnancy plans (Question 1)
    // Eliminate h (female) and o (male sterilization) when user wants future pregnancy
    if (filters.wantsFuturePregnancy === true) {
      if (filteredMethods.includes("h")) {
        eliminated.push({
          method: "h",
          reason: "Wants future pregnancy - female sterilization is permanent",
        });
        filteredMethods = filteredMethods.filter((m) => m !== "h");
      }
      if (filteredMethods.includes("o")) {
        eliminated.push({
          method: "o",
          reason: "Wants future pregnancy - male sterilization is permanent",
        });
        filteredMethods = filteredMethods.filter((m) => m !== "o");
      }
    } else if (filters.wantsFuturePregnancy === false) {
      // No - ask about surgery (h = female, o = male sterilization)
      if (filters.wantsSurgicalMethod === true) {
        // User wants surgical method - suggest h and/or o if eligible
        const surgicalMethods = filteredMethods.filter((m) => m === "h" || m === "o");
        if (surgicalMethods.length > 0) {
          shouldShowPermanentMethods = true;
          return {
            recommended: surgicalMethods,
            notices: ["Sterilization is permanent and fertility is not reversible"],
            eliminated,
            shouldShowPermanentMethods: true,
          };
        } else {
          notices.push(
            "Sterilization may not be medically suitable for you based on your health profile"
          );
          return {
            recommended: [],
            notices,
            eliminated,
          };
        }
      } else if (filters.wantsSurgicalMethod === false) {
        // User doesn't want surgical method - remove h and o
        if (filteredMethods.includes("h")) {
          eliminated.push({ method: "h", reason: "Does not want surgical method" });
          filteredMethods = filteredMethods.filter((m) => m !== "h");
        }
        if (filteredMethods.includes("o")) {
          eliminated.push({ method: "o", reason: "Does not want surgical method" });
          filteredMethods = filteredMethods.filter((m) => m !== "o");
        }
        
        // Check if user wants to continue with long-term options
        if (filters.wantsToContinueWithLongTerm === false) {
          // User doesn't want to continue - end algorithm, return empty results
          filteredMethods.forEach((method) => {
            eliminated.push({
              method,
              reason: "User chose not to continue with long-term options",
            });
          });
          return {
            recommended: [],
            notices: ["You chose not to continue with long-term contraceptive options."],
            eliminated,
          };
        }
        // If wantsToContinueWithLongTerm is true or undefined, continue
      }
      // If wantsSurgicalMethod is undefined, continue without filtering h
    }

    // Filter 2: Regular periods preference (Question 2)
    // Spec: eliminate ALL except a, i, j, k when user wants regular periods
    if (filters.okayWithIrregularPeriods === false) {
      const regularPeriodMethods: ContraceptiveMethodKey[] = ["a", "i", "j", "k"];
      const methodsToEliminate = filteredMethods.filter(
        (m) => !regularPeriodMethods.includes(m)
      );

      methodsToEliminate.forEach((method) => {
        eliminated.push({ method, reason: "May cause irregular or no periods" });
      });

      filteredMethods = filteredMethods.filter((m) => regularPeriodMethods.includes(m));
    }

    // Filter 3: Frequency preference (Question 3)
    // Only suggest methods that are still available after previous filters
    if (filters.preferredFrequency) {
      let frequencyMethods: ContraceptiveMethodKey[] = [];
      let shouldExcludeAllMethods = false;

      switch (filters.preferredFrequency) {
        case "daily":
          // Suggest a, c, k (only if still available)
          frequencyMethods = ["a", "c", "k"];
          break;
        case "every-3-weeks":
          // Patch (i) and ring (k) - check BMI for patch
          if (filters.currentBMI && filters.currentBMI > 30) {
            notices.push(
              "Unfortunately, there's no safe method that can be used every 3 weeks for BMI >30"
            );
            shouldExcludeAllMethods = true;
          } else {
            frequencyMethods = ["i", "k"]; // patch and vaginal ring
          }
          break;
        case "every-3-months":
          frequencyMethods = ["d"]; // DMPA injection
          break;
        case "every-3-years":
          frequencyMethods = ["e"]; // implant
          break;
        case "every-8-years":
          frequencyMethods = ["f", "g"]; // IUDs
          break;
      }

      if (shouldExcludeAllMethods) {
        // When specific frequency requirement can't be met (like BMI >30 for patch)
        filteredMethods.forEach((method) => {
          eliminated.push({
            method,
            reason: "No safe methods available for your preferred frequency with your BMI",
          });
        });
        filteredMethods = [];
      } else if (frequencyMethods.length > 0) {
        // Filter to only include preferred frequency methods that are still available
        // Only suggest methods that haven't been eliminated in previous questions
        const availableFrequencyMethods = frequencyMethods.filter((m) =>
          filteredMethods.includes(m)
        );

        // Eliminate methods that don't match frequency (but keep barrier method j if available)
        const nonFrequencyMethods = filteredMethods.filter(
          (m) => !availableFrequencyMethods.includes(m) && m !== "j"
        );
        nonFrequencyMethods.forEach((method) => {
          eliminated.push({
            method,
            reason: `Does not match preferred frequency: ${filters.preferredFrequency}`,
          });
        });

        // Set filtered methods to only available frequency methods + barrier method if available
        filteredMethods = filteredMethods.filter(
          (m) => availableFrequencyMethods.includes(m) || m === "j"
        );

        // If no frequency methods are available (were filtered out earlier), show notice
        if (availableFrequencyMethods.length === 0) {
          notices.push(
            `None of the methods matching your preferred frequency (${filters.preferredFrequency}) are available based on your previous answers.`
          );
        }
      }
    }

    // Add barrier methods for STI protection, but only if we haven't excluded all methods
    if (filteredMethods.length > 0 && !filteredMethods.includes("j")) {
      filteredMethods.push("j");
    }

    // Log personalization completion
    logger.debug('Personalization completed', {
      recommendedCount: filteredMethods.length,
      eliminatedCount: eliminated.length,
      noticesCount: notices.length,
    });

    return {
      recommended: filteredMethods,
      notices,
      eliminated,
      shouldShowPermanentMethods,
    };
  } catch (error) {
    // Log error with context
    logger.error('Error in personalizeRecommendations', error, {
      eligibleMethods,
      filters,
    });

    // Re-throw as AppError if it's not already
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }

    throw handleError(
      error,
      ErrorCode.PERSONALIZATION_FAILED,
      'personalizeRecommendations'
    );
  }
};

/**
 * Generate personalized recommendations based on answers
 * 
 * @param eligibleMethods - Array of eligible method keys
 * @param answers - User answers from personalization questionnaire
 * @returns Personalized recommendations
 * @throws AppError if generation fails
 */
export const generatePersonalizedRecommendations = withSyncErrorHandling(
  (
    eligibleMethods: ContraceptiveMethodKey[],
    answers: UserAnswers
  ): {
    recommended: ContraceptiveMethodKey[];
    notices: string[];
    eliminated: { method: ContraceptiveMethodKey; reason: string }[];
  } => {
    if (!answers || typeof answers !== 'object') {
      throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
        reason: 'Answers must be an object',
        provided: typeof answers,
      });
    }

    const filters: PersonalizationFilters = {
      wantsFuturePregnancy: answers.wantsFuturePregnancy as boolean,
      okayWithIrregularPeriods: answers.okayWithIrregularPeriods as boolean,
      wantsSurgicalMethod: answers.wantsSurgicalMethod as boolean,
      wantsToContinueWithLongTerm: answers.wantsToContinueWithLongTerm as boolean,
      preferredFrequency: answers.preferredFrequency as PersonalizationFilters["preferredFrequency"],
      currentBMI: answers.currentBMI as number,
    };

    const result = personalizeRecommendations(eligibleMethods, filters);
    
    // Extract only the fields needed for this function's return type
    return {
      recommended: result.recommended,
      notices: result.notices,
      eliminated: result.eliminated,
    };
  },
  ErrorCode.PERSONALIZATION_FAILED,
  'generatePersonalizedRecommendations'
);

/**
 * Get method comparison data for daily methods
 * 
 * @param availableMethods - Array of available method keys
 * @returns Daily methods comparison data
 */
export const getDailyMethodsComparison = withSyncErrorHandling(
  (availableMethods: ContraceptiveMethodKey[]) => {
    if (!Array.isArray(availableMethods)) {
      throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
        reason: 'Available methods must be an array',
        provided: typeof availableMethods,
      });
    }

    const dailyMethods = availableMethods.filter(
      (method) => METHOD_FREQUENCY.daily.includes(method) || method === "k"
    );

    logger.debug('Get daily methods comparison', { count: dailyMethods.length });

    return {
      methods: dailyMethods,
      shouldShowComparison: dailyMethods.length > 1,
    };
  },
  ErrorCode.PERSONALIZATION_FAILED,
  'getDailyMethodsComparison'
);

/**
 * Get IUD comparison data
 * 
 * @param availableMethods - Array of available method keys
 * @returns IUD methods comparison data
 */
export const getIUDComparison = withSyncErrorHandling(
  (availableMethods: ContraceptiveMethodKey[]) => {
    if (!Array.isArray(availableMethods)) {
      throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
        reason: 'Available methods must be an array',
        provided: typeof availableMethods,
      });
    }

    const iudMethods = availableMethods.filter((method) => ["f", "g"].includes(method));

    logger.debug('Get IUD comparison', { count: iudMethods.length });

    return {
      methods: iudMethods,
      shouldShowComparison: iudMethods.length > 1,
    };
  },
  ErrorCode.PERSONALIZATION_FAILED,
  'getIUDComparison'
);

/**
 * Check if user needs STI protection notice
 */
export const needsSTIProtectionNotice = (): string => {
  return "None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.";
};
