import { ContraceptiveMethodKey, UserAnswers } from "../types";
import { METHOD_FREQUENCY } from "../constants";

/**
 * Personalization engine for filtering contraceptive methods
 * Based on user preferences and lifestyle factors
 */

export interface PersonalizationFilters {
  wantsFuturePregnancy?: boolean;
  okayWithIrregularPeriods?: boolean;
  wantsSurgicalMethod?: boolean;
  preferredFrequency?:
    | "daily"
    | "every-3-weeks"
    | "every-3-months"
    | "every-3-years"
    | "every-8-years";
  currentBMI?: number;
}

/**
 * Filter eligible methods based on personalization preferences
 * New algorithm flow:
 * 1. Q1: Future pregnancy? Yes → eliminate h, No → ask about surgery
 *    - If surgery = Yes → return only h
 *    - If surgery = No → continue
 * 2. Q2: Irregular periods okay? No → keep only a, i, j, k
 * 3. Q3: Frequency preference → filter to only available methods for that frequency
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
  let filteredMethods = [...eligibleMethods];
  const eliminated: { method: ContraceptiveMethodKey; reason: string }[] = [];
  const notices: string[] = [];
  let shouldShowPermanentMethods = false;

  // Add additional methods for personalization (h, i, j, k)
  const additionalMethods: ContraceptiveMethodKey[] = ["h", "i", "j", "k"];
  additionalMethods.forEach((method) => {
    if (!filteredMethods.includes(method)) {
      filteredMethods.push(method);
    }
  });

  // Filter 1: Future pregnancy plans (Question 1)
  if (filters.wantsFuturePregnancy === true) {
    // Yes - eliminate h and proceed to question 2
    if (filteredMethods.includes("h")) {
      eliminated.push({
        method: "h",
        reason: "Wants future pregnancy - sterilization is permanent",
      });
      filteredMethods = filteredMethods.filter((m) => m !== "h");
    }
  } else if (filters.wantsFuturePregnancy === false) {
    // No - ask about surgery
    if (filters.wantsSurgicalMethod === true) {
      // User wants surgical method - suggest only h
      if (filteredMethods.includes("h")) {
        shouldShowPermanentMethods = true;
        return {
          recommended: ["h"],
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
      // User doesn't want surgical method - remove h and continue
      if (filteredMethods.includes("h")) {
        eliminated.push({ method: "h", reason: "Does not want surgical method" });
        filteredMethods = filteredMethods.filter((m) => m !== "h");
      }
    }
    // If wantsSurgicalMethod is undefined, continue without filtering h
  }

  // Filter 2: Regular periods preference (Question 2)
  if (filters.okayWithIrregularPeriods === false) {
    // Only keep methods that maintain regular periods: a, i, j, k
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
        // Suggest a, b, k (only if still available)
        frequencyMethods = ["a", "b", "k"];
        break;
      case "every-3-weeks":
        // Check BMI for patch (method 'i') first
        if (filters.currentBMI && filters.currentBMI > 30) {
          notices.push(
            "Unfortunately, there's no safe method that can be used every 3 weeks for BMI >30"
          );
          shouldExcludeAllMethods = true;
        } else {
          frequencyMethods = ["i"]; // patch
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

  return {
    recommended: filteredMethods,
    notices,
    eliminated,
    shouldShowPermanentMethods,
  };
};

/**
 * Generate personalized recommendations based on answers
 */
export const generatePersonalizedRecommendations = (
  eligibleMethods: ContraceptiveMethodKey[],
  answers: UserAnswers
): {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
} => {
  const filters: PersonalizationFilters = {
    wantsFuturePregnancy: answers.wantsFuturePregnancy as boolean,
    okayWithIrregularPeriods: answers.okayWithIrregularPeriods as boolean,
    wantsSurgicalMethod: answers.wantsSurgicalMethod as boolean,
    preferredFrequency: answers.preferredFrequency as PersonalizationFilters["preferredFrequency"],
    currentBMI: answers.currentBMI as number,
  };

  return personalizeRecommendations(eligibleMethods, filters);
};

/**
 * Get method comparison data for daily methods
 */
export const getDailyMethodsComparison = (availableMethods: ContraceptiveMethodKey[]) => {
  const dailyMethods = availableMethods.filter(
    (method) => METHOD_FREQUENCY.daily.includes(method) || method === "k"
  );

  return {
    methods: dailyMethods,
    shouldShowComparison: dailyMethods.length > 1,
  };
};

/**
 * Get IUD comparison data
 */
export const getIUDComparison = (availableMethods: ContraceptiveMethodKey[]) => {
  const iudMethods = availableMethods.filter((method) => ["f", "g"].includes(method));

  return {
    methods: iudMethods,
    shouldShowComparison: iudMethods.length > 1,
  };
};

/**
 * Check if user needs STI protection notice
 */
export const needsSTIProtectionNotice = (): string => {
  return "None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.";
};
