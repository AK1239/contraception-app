/**
 * Female Sterilization Eligibility Types
 *
 * Categories: A = Accept, C = Caution, D = Delay, S = Special (refer to specialist)
 * Hierarchy: S > D > C > A (most restrictive wins)
 */

export type SterilizationCategory = "A" | "C" | "D" | "S";

/** Result for sterilization eligibility */
export interface SterilizationEligibilityResult {
  /** Final eligibility category */
  category: SterilizationCategory;
  /** User-friendly category label */
  categoryLabel: string;
  /** Detailed explanation of the result */
  explanation: string;
  /** Clinical action required */
  clinicalAction: string;
  /** List of conditions that triggered the category */
  reasons: string[];
  /** STI advisory if applicable */
  stiAdvisory?: string;
  /** Whether counselling confirmation is completed */
  counsellingConfirmed?: boolean;
}

/** Advisory messages (STI/HIV protection) */
export interface SterilizationAdvisory {
  id: string;
  type: "sti";
  message: string;
}

/** Female sterilization section keys for questionnaire flow */
export type FemaleSterilizationSectionKey =
  | "fs-exclude-delay"
  | "fs-postpartum"
  | "fs-post-abortion"
  | "fs-cardiovascular"
  | "fs-thromboembolism"
  | "fs-hiv-immunology"
  | "fs-endocrine"
  | "fs-haematology"
  | "fs-respiratory"
  | "fs-gynecologic"
  | "fs-counselling-check"
  | "fs-sti-risk";
