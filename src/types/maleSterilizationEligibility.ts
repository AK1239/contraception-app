/**
 * Male Sterilization (Vasectomy) Eligibility Types
 *
 * Categories: A = Accept, C = Caution, D = Delay, S = Special setting required
 * Hierarchy: S > D > C > A (most restrictive wins)
 */

export type MaleSterilizationCategory = "A" | "C" | "D" | "S";

/** Result for male sterilization eligibility */
export interface MaleSterilizationEligibilityResult {
  /** Final eligibility category */
  category: MaleSterilizationCategory;
  /** User-friendly category label */
  categoryLabel: string;
  /** Detailed explanation of the result */
  explanation: string;
  /** Clinical recommendation */
  clinicalRecommendation: string;
  /** List of conditions that triggered the category */
  reasons: string[];
  /** STI advisory (always shown) */
  stiAdvisory: string;
  /** Counselling alerts */
  counsellingAlerts: string[];
  /** Whether temporary contraception is recommended */
  temporaryContraceptionRecommended: boolean;
  /** Whether referral is required */
  referralRequired: boolean;
}

/** Male sterilization section keys for questionnaire flow */
export type MaleSterilizationSectionKey =
  | "ms-reproductive-intent"
  | "ms-personal-characteristics"
  | "ms-hiv-status"
  | "ms-endocrine"
  | "ms-anaemia"
  | "ms-genital-conditions"
  | "ms-systemic-conditions"
  | "ms-scrotal-structural";
