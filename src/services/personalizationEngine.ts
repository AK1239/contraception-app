import { ContraceptiveMethodKey } from "../types";
import { logger } from "./logger";
import { ErrorCode, createError, withSyncErrorHandling } from "./errorHandler";

/**
 * Personalization engine - strictly per ContraSafe algorithm
 * Input: eligible methods (MEC 1 + 2 from WHO questionnaire)
 * Flow: Q1 future pregnancy → Q1b surgery (if No) → Q2 irregular periods → Q3 frequency → Q3b height/weight (if every-3-weeks)
 */

export interface PersonalizationFilters {
  wantsFuturePregnancy?: boolean;
  wantsSurgicalMethod?: boolean;
  okayWithIrregularPeriods?: boolean;
  preferredFrequency?: "daily" | "every-3-weeks" | "every-3-months" | "every-3-years" | "every-8-years";
  height?: number;
  weight?: number;
  currentBMI?: number;
}

function computeBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Per spec: Filter eligible methods and suggest based on preferences
 */
export const personalizeRecommendations = (
  eligibleMethods: ContraceptiveMethodKey[],
  filters: PersonalizationFilters
): {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
  shouldShowPermanentMethods?: boolean;
  bmiTooHighFor3Weeks?: boolean;
} => {
  if (!Array.isArray(eligibleMethods)) {
    throw createError(ErrorCode.PERSONALIZATION_INVALID_FILTERS, {
      reason: "Eligible methods must be an array",
      provided: typeof eligibleMethods,
    });
  }

  let filtered = [...eligibleMethods];
  const eliminated: { method: ContraceptiveMethodKey; reason: string }[] = [];
  const notices: string[] = [];
  let shouldShowPermanentMethods = false;
  let bmiTooHighFor3Weeks = false;

  // Q1: Future pregnancy - eliminate h and o
  if (filters.wantsFuturePregnancy === true) {
    ["h", "o"].forEach((m) => {
      if (filtered.includes(m as ContraceptiveMethodKey)) {
        eliminated.push({
          method: m as ContraceptiveMethodKey,
          reason: "Wants future pregnancy - sterilization is permanent",
        });
        filtered = filtered.filter((x) => x !== m);
      }
    });
  }

  // Q1b: No future pregnancy + wants surgery → early exit with h and o
  if (filters.wantsFuturePregnancy === false && filters.wantsSurgicalMethod === true) {
    const surgical = filtered.filter((m) => m === "h" || m === "o");
    if (surgical.length > 0) {
      return {
        recommended: surgical,
        notices: ["Sterilization is permanent and fertility is not reversible"],
        eliminated,
        shouldShowPermanentMethods: true,
      };
    }
    return {
      recommended: [],
      notices: ["Sterilization may not be medically suitable based on your health profile"],
      eliminated,
    };
  }

  // Q1b: No future pregnancy + no surgery - remove h and o
  if (filters.wantsFuturePregnancy === false && filters.wantsSurgicalMethod === false) {
    ["h", "o"].forEach((m) => {
      if (filtered.includes(m as ContraceptiveMethodKey)) {
        eliminated.push({ method: m as ContraceptiveMethodKey, reason: "Does not want surgical method" });
        filtered = filtered.filter((x) => x !== m);
      }
    });
  }

  // Q2: Irregular periods - keep only a, i, j, k
  if (filters.okayWithIrregularPeriods === false) {
    const keep: ContraceptiveMethodKey[] = ["a", "i", "j", "k"];
    filtered.forEach((m) => {
      if (!keep.includes(m)) {
        eliminated.push({ method: m, reason: "May cause irregular or no periods" });
      }
    });
    filtered = filtered.filter((m) => keep.includes(m));
  }

  // Q3: Frequency - suggest only methods matching preference that are still available
  const freq = filters.preferredFrequency;
  if (freq) {
    let freqMethods: ContraceptiveMethodKey[] = [];

    switch (freq) {
      case "daily":
        freqMethods = ["a", "b", "c"];
        break;
      case "every-3-weeks":
        freqMethods = ["i", "k"];
        break;
      case "every-3-months":
        freqMethods = ["d"];
        break;
      case "every-3-years":
        freqMethods = ["e"];
        break;
      case "every-8-years":
        freqMethods = ["f", "g"];
        break;
    }

    // For every-3-weeks: check BMI
    if (freq === "every-3-weeks") {
      let bmi: number | undefined;
      if (filters.currentBMI !== undefined && filters.currentBMI !== null) {
        bmi = Number(filters.currentBMI);
      } else if (
        filters.height !== undefined &&
        filters.weight !== undefined &&
        filters.height > 0 &&
        filters.weight > 0
      ) {
        bmi = computeBMI(filters.height, filters.weight);
      }
      if (bmi !== undefined && bmi > 30) {
        notices.push(
          "Unfortunately there's no safe method that can be used every 3 weeks for BMI >30"
        );
        bmiTooHighFor3Weeks = true;
        freqMethods = [];
      }
    }

    // Filter to only methods that are still in filtered (from previous steps)
    const available = freqMethods.filter((m) => filtered.includes(m));
    filtered = available;

    if (available.length === 0 && !bmiTooHighFor3Weeks) {
      notices.push(
        `None of the methods matching your preferred frequency are available based on your previous answers.`
      );
    }
  }

  logger.debug("Personalization completed", {
    recommendedCount: filtered.length,
    eliminatedCount: eliminated.length,
  });

  return {
    recommended: filtered,
    notices,
    eliminated,
    shouldShowPermanentMethods,
    bmiTooHighFor3Weeks,
  };
};

/** STI notice per spec */
export const needsSTIProtectionNotice = (): string => {
  return "None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.";
};

/** UserAnswers type for personalization */
export interface PersonalizationAnswers {
  wantsFuturePregnancy?: boolean;
  wantsSurgicalMethod?: boolean;
  okayWithIrregularPeriods?: boolean;
  preferredFrequency?: string;
  heightWeight?: { height?: number; weight?: number };
  currentBMI?: number;
}

/**
 * Generate personalized recommendations from answers
 */
export const generatePersonalizedRecommendations = withSyncErrorHandling(
  (
    eligibleMethods: ContraceptiveMethodKey[],
    answers: Record<string, unknown>
  ): {
    recommended: ContraceptiveMethodKey[];
    notices: string[];
    eliminated: { method: ContraceptiveMethodKey; reason: string }[];
    shouldShowPermanentMethods?: boolean;
    bmiTooHighFor3Weeks?: boolean;
  } => {
    const hw = answers.heightWeight as { height?: number; weight?: number } | undefined;
    let bmi: number | undefined;
    if (hw?.height && hw?.weight && hw.height > 0 && hw.weight > 0) {
      bmi = computeBMI(hw.height, hw.weight);
    }

    const filters: PersonalizationFilters = {
      wantsFuturePregnancy: answers.wantsFuturePregnancy as boolean,
      wantsSurgicalMethod: answers.wantsSurgicalMethod as boolean,
      okayWithIrregularPeriods: answers.okayWithIrregularPeriods as boolean,
      preferredFrequency: answers.preferredFrequency as PersonalizationFilters["preferredFrequency"],
      height: hw?.height,
      weight: hw?.weight,
      currentBMI: bmi,
    };

    return personalizeRecommendations(eligibleMethods, filters);
  },
  ErrorCode.PERSONALIZATION_FAILED,
  "generatePersonalizedRecommendations"
);
