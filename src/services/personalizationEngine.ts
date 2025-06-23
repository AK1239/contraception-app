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
 */
export const personalizeRecommendations = (
  eligibleMethods: ContraceptiveMethodKey[],
  filters: PersonalizationFilters
): {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
} => {
  let filteredMethods = [...eligibleMethods];
  const eliminated: { method: ContraceptiveMethodKey; reason: string }[] = [];
  const notices: string[] = [];

  // Add additional methods for personalization (h, i, j, k)
  const additionalMethods: ContraceptiveMethodKey[] = ["h", "i", "j", "k"];
  additionalMethods.forEach((method) => {
    if (!filteredMethods.includes(method)) {
      filteredMethods.push(method);
    }
  });

  // Filter 1: Future pregnancy plans
  if (filters.wantsFuturePregnancy === true) {
    if (filteredMethods.includes("h")) {
      eliminated.push({
        method: "h",
        reason: "Wants future pregnancy - sterilization is permanent",
      });
      filteredMethods = filteredMethods.filter((m) => m !== "h");
    }
  }

  // Filter 2: Regular periods preference
  if (filters.okayWithIrregularPeriods === false) {
    // Only keep methods that maintain regular periods: a, i, j, k
    const irregularMethods: ContraceptiveMethodKey[] = ["b", "c", "d", "e", "f", "g", "h"];

    irregularMethods.forEach((method) => {
      if (filteredMethods.includes(method)) {
        eliminated.push({ method, reason: "May cause irregular or no periods" });
        filteredMethods = filteredMethods.filter((m) => m !== method);
      }
    });
  }

  // Filter 3: Surgical method preference
  if (filters.wantsSurgicalMethod === true) {
    // Only suggest sterilization if available
    if (filteredMethods.includes("h")) {
      return {
        recommended: ["h"],
        notices: ["Sterilization is permanent and fertility is not reversible"],
        eliminated,
      };
    } else {
      notices.push(
        "Sterilization may not be medically suitable for you based on your health profile"
      );
    }
  } else if (filters.wantsSurgicalMethod === false) {
    // Remove sterilization
    if (filteredMethods.includes("h")) {
      eliminated.push({ method: "h", reason: "Does not want surgical method" });
      filteredMethods = filteredMethods.filter((m) => m !== "h");
    }
  }

  // Filter 4: Frequency preference
  if (filters.preferredFrequency) {
    let frequencyMethods: ContraceptiveMethodKey[] = [];
    let shouldExcludeAllMethods = false;

    switch (filters.preferredFrequency) {
      case "daily":
        frequencyMethods = METHOD_FREQUENCY.daily; // ['a', 'c']
        break;
      case "every-3-weeks":
        // Check BMI for patch (method 'i') first
        if (filters.currentBMI && filters.currentBMI > 30) {
          notices.push(
            "Unfortunately, there's no safe method that can be used every 3 weeks for BMI >30"
          );
          shouldExcludeAllMethods = true;
        } else {
          frequencyMethods = METHOD_FREQUENCY.weekly; // ['i'] - patch
        }
        break;
      case "every-3-months":
        frequencyMethods = METHOD_FREQUENCY.quarterly; // ['d']
        break;
      case "every-3-years":
        frequencyMethods = ["e"]; // implant
        break;
      case "every-8-years":
        frequencyMethods = ["f", "g"]; // IUDs
        break;
    }

    if (shouldExcludeAllMethods) {
      // When specific frequency requirement can't be met (like BMI >30 for patch), eliminate all methods
      filteredMethods.forEach((method) => {
        eliminated.push({
          method,
          reason: "No safe methods available for your preferred frequency with your BMI",
        });
      });
      filteredMethods = [];
    } else if (frequencyMethods.length > 0) {
      // Filter to only include preferred frequency methods
      const nonFrequencyMethods = filteredMethods.filter(
        (m) => !frequencyMethods.includes(m) && m !== "j"
      );
      nonFrequencyMethods.forEach((method) => {
        eliminated.push({
          method,
          reason: `Does not match preferred frequency: ${filters.preferredFrequency}`,
        });
      });

      filteredMethods = filteredMethods.filter((m) => frequencyMethods.includes(m) || m === "j");
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
