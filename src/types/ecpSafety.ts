/**
 * Emergency Contraception Safety (ECP) - WHO MEC 2025
 *
 * Types for checkbox-driven ECP safety assessment.
 * Ticked = yes = 1, Unticked = no = 0.
 */

/** MEC categories per WHO */
export type MECCategory = 1 | 2 | 3 | 4;

/** ECP method types */
export type ECPMethod = "LNG" | "UPA" | "COC";

/** Eligibility status based on time window and MEC */
export type EligibilityStatus =
  | "ELIGIBLE"
  | "PREFERRED"
  | "LESS_EFFECTIVE"
  | "NOT_INDICATED"
  | "NOT_RECOMMENDED";

/** Final safety classification for display */
export type SafetyClassification = "SAFE" | "USE_WITH_CAUTION" | "AVOID";

/** Per-method result with MEC and eligibility */
export interface ECPMethodResult {
  method: ECPMethod;
  methodName: string;
  methodNameKey: string;
  mec: MECCategory;
  eligibility: EligibilityStatus;
  safetyClassification: SafetyClassification;
  /** WHO MEC reasoning for this input */
  mecReasoning?: string;
}

/** Warning or advisory message */
export interface ECPWarning {
  id: string;
  type: "warning" | "advisory" | "reminder";
  message: string;
  messageKey: string;
}

/** ECP Safety evaluation result */
export interface ECPSafetyResult {
  /** Pregnancy blocks all ECPs */
  notApplicable: boolean;
  notApplicableMessage?: string;
  notApplicableMessageKey?: string;

  /** Per-method results (LNG, UPA, COC) */
  lng: ECPMethodResult | null;
  upa: ECPMethodResult | null;
  coc: ECPMethodResult | null;

  /** Recommended option based on time + MEC */
  recommendedOption: string;
  recommendedOptionKey: string;

  /** Alternative options */
  alternativeOptions: string[];
  alternativeOptionsKeys: string[];

  /** Warnings (breastfeeding, CYP3A4, CVD, etc.) */
  warnings: ECPWarning[];

  /** Dose instructions */
  doseInstructions: {
    lng: string;
    lngKey: string;
    upa: string;
    upaKey: string;
    coc: string;
    cocKey: string;
  };

  /** Clinical reminders */
  clinicalReminders: string[];
  clinicalRemindersKeys: string[];
}
