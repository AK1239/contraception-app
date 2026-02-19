/**
 * Natural Method (FAB) Eligibility Types
 *
 * FAB = Fertility Awareness-Based methods
 * SYM = Symptoms-Based Method
 * CAL = Calendar-Based Method
 * Categories: A = Accept, C = Caution, D = Delay
 */

export type FABCategory = "A" | "C" | "D";

export type FABMethod = "SYM" | "CAL";

/** Contributing factor that led to C or D category */
export interface FABContributingFactor {
  condition: string;
  category: FABCategory;
}

/** Result for a single FAB method (SYM or CAL) */
export interface FABMethodResult {
  method: FABMethod;
  methodName: string;
  category: FABCategory;
  categoryLabel: string;
  explanation: string;
  actionRequired?: string;
  /** List of conditions that contributed to C or D category (empty for A) */
  contributingFactors?: FABContributingFactor[];
}

/** Advisory messages (STI/HIV, high-risk pregnancy) */
export interface FABAdvisory {
  id: string;
  type: "sti" | "high-risk-pregnancy" | "medication-evaluation";
  message: string;
}

/** Full FAB eligibility evaluation result */
export interface FABEligibilityResult {
  /** Not applicable when client is pregnant */
  notApplicable: boolean;
  notApplicableMessage?: string;
  /** SYM (Symptoms-Based Method) result */
  sym: FABMethodResult | null;
  /** CAL (Calendar-Based Method) result */
  cal: FABMethodResult | null;
  /** Advisories to display (STI/HIV, high-risk pregnancy) */
  advisories: FABAdvisory[];
}

/** FAB section keys for questionnaire flow */
export type FABSectionKey =
  | "fab-current-pregnancy"
  | "fab-postpartum"
  | "fab-recent-abortion"
  | "fab-life-stage"
  | "fab-menstrual-infection"
  | "fab-drugs-medical"
  | "fab-sti-risk"
  | "fab-pregnancy-risk";
